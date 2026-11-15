import { CodeForFunItem, SqlTableData } from '../types.ts';
import { CodeForFunLocale } from './types.ts';

function interpolate(template: string, vars: Record<string, string | number>): string {
  let out = template;
  for (const [k, v] of Object.entries(vars)) {
    out = out.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
  }
  return out;
}

export function buildSqlPlaygroundTables(locale: CodeForFunLocale): SqlTableData[] {
  const desc = locale.sqlTableDescriptions;
  return [
    {
      name: 'devs_e_cafes',
      description: desc.devs_e_cafes ?? '',
      columns: ['id', 'nome', 'nivel', 'xicaras_dia', 'tipo_cafe'],
      rows: [
        { id: 1, nome: 'Ana', nivel: 'Sênior', xicaras_dia: 4, tipo_cafe: 'Expresso' },
        { id: 2, nome: 'Bruno', nivel: 'Pleno', xicaras_dia: 2, tipo_cafe: 'Coado' },
        { id: 3, nome: 'Carla', nivel: 'Staff', xicaras_dia: 5, tipo_cafe: 'Expresso' },
        { id: 4, nome: 'Diego', nivel: 'Júnior', xicaras_dia: 0, tipo_cafe: null },
        { id: 5, nome: 'Elena', nivel: 'Pleno', xicaras_dia: 3, tipo_cafe: 'Descafeinado' }
      ]
    },
    {
      name: 'bugs_producao',
      description: desc.bugs_producao ?? '',
      columns: ['id', 'dev_id', 'titulo', 'severidade', 'resolvido'],
      rows: [
        { id: 101, dev_id: 1, titulo: 'Botão de logout fazia login', severidade: 'Alta', resolvido: true },
        { id: 102, dev_id: 3, titulo: 'Loop infinito no dark mode', severidade: 'Crítica', resolvido: true },
        { id: 103, dev_id: 2, titulo: 'Preço exibido em centavos negativos', severidade: 'Média', resolvido: false },
        { id: 104, dev_id: 1, titulo: 'Cache devolvia pizza de ontem', severidade: 'Baixa', resolvido: true }
      ]
    },
    {
      name: 'pedidos_pizza',
      description: desc.pedidos_pizza ?? '',
      columns: ['id', 'cliente', 'sabor', 'quantidade', 'valor_total'],
      rows: [
        { id: 1, cliente: 'Ana', sabor: 'Calabresa', quantidade: 2, valor_total: 118 },
        { id: 2, cliente: 'Bruno', sabor: 'Marguerita', quantidade: 1, valor_total: 54 },
        { id: 3, cliente: 'Carla', sabor: 'Quatro Queijos', quantidade: 3, valor_total: 186 },
        { id: 4, cliente: 'Diego', sabor: 'Portuguesa', quantidade: 2, valor_total: 128 },
        { id: 5, cliente: 'Elena', sabor: 'Frango Catupiry', quantidade: 1, valor_total: 62 }
      ]
    }
  ];
}

export function buildCodeForFunItems(locale: CodeForFunLocale): CodeForFunItem[] {
  const it = locale.items;

  const fizz = it['cf-js-fizzbuzz-cafe'];
  const rpg = it['cf-ts-tipagem-rpg'];
  const pyRank = it['cf-py-ranking-memes'];
  const sqlPizza = it['cf-sql-pizzaria-top'];
  const bugSum = it['cf-bug-js-soma-string'];
  const bugPy = it['cf-bug-py-lista-fantasma'];
  const bugLoop = it['cf-bug-js-event-loop'];
  const bugNull = it['cf-bug-sql-null-trap'];
  const sCanvas = it['cf-sandbox-js-canvas'];
  const sPy = it['cf-sandbox-py-trace'];
  const sSql = it['cf-sandbox-sql-lab'];

  return [
    {
      id: 'cf-js-fizzbuzz-cafe',
      title: fizz.title,
      mode: 'challenge',
      track: 'warmup',
      language: 'javascript',
      xp: 50,
      estimatedMinutes: 3,
      funnyHook: fizz.funnyHook,
      prompt: fizz.prompt,
      starterCode: fizz.starterCode ?? '',
      solutionCode: fizz.solutionCode ?? '',
      hints: fizz.hints,
      ahaTitle: fizz.ahaTitle,
      ahaExplanation: fizz.ahaExplanation,
      validate: outcome => {
        const lines = outcome.logs.map(l => l.text.trim());
        const exp = fizz.expectedStrings ?? {};
        const fizzWord = exp.fizz ?? 'Café';
        const buzzWord = exp.buzz ?? 'Deploy';
        const fizzBuzzWord = exp.fizzbuzz ?? 'Café no Deploy!';
        const emptyWord = exp.empty ?? 'vazio';
        const expected = [
          '1', '2', fizzWord, '4', buzzWord,
          fizzWord, '7', '8', fizzWord, buzzWord,
          '11', fizzWord, '13', '14', fizzBuzzWord
        ];
        const exactCount = lines.length === 15;
        const matchesAll = exactCount && expected.every((v, idx) => lines[idx] === v);
        return [
          {
            label: fizz.checkLabels?.[0] ?? '',
            passed: exactCount,
            detail: exactCount
              ? fizz.checkDetailsPass?.[0] ?? ''
              : interpolate(fizz.checkDetailsFail?.[0] ?? '{count}', { count: lines.length })
          },
          {
            label: fizz.checkLabels?.[1] ?? '',
            passed: matchesAll,
            detail: matchesAll
              ? fizz.checkDetailsPass?.[1] ?? ''
              : interpolate(fizz.checkDetailsFail?.[1] ?? '{val}', { val: lines[14] ?? emptyWord })
          }
        ];
      }
    },
    {
      id: 'cf-ts-tipagem-rpg',
      title: rpg.title,
      mode: 'challenge',
      track: 'hands-on',
      language: 'typescript',
      xp: 75,
      estimatedMinutes: 4,
      funnyHook: rpg.funnyHook,
      prompt: rpg.prompt,
      starterCode: rpg.starterCode ?? '',
      solutionCode: rpg.solutionCode ?? '',
      hints: rpg.hints,
      ahaTitle: rpg.ahaTitle,
      ahaExplanation: rpg.ahaExplanation,
      validate: outcome => {
        const joined = outcome.logs.map(l => l.text).join(' ');
        const has140 = /\b140\b/.test(joined);
        const hasKira = joined.toLowerCase().includes('kira');
        const emptyWord = rpg.expectedStrings?.empty ?? 'vazia';
        return [
          {
            label: rpg.checkLabels?.[0] ?? '',
            passed: has140,
            detail: has140
              ? rpg.checkDetailsPass?.[0] ?? ''
              : interpolate(rpg.checkDetailsFail?.[0] ?? '{output}', { output: joined || emptyWord })
          },
          {
            label: rpg.checkLabels?.[1] ?? '',
            passed: hasKira,
            detail: hasKira ? rpg.checkDetailsPass?.[1] ?? '' : rpg.checkDetailsFail?.[1] ?? ''
          }
        ];
      }
    },
    {
      id: 'cf-py-ranking-memes',
      title: pyRank.title,
      mode: 'challenge',
      track: 'hands-on',
      language: 'python',
      xp: 80,
      estimatedMinutes: 4,
      funnyHook: pyRank.funnyHook,
      prompt: pyRank.prompt,
      starterCode: pyRank.starterCode ?? '',
      solutionCode: pyRank.solutionCode ?? '',
      hints: pyRank.hints,
      ahaTitle: pyRank.ahaTitle,
      ahaExplanation: pyRank.ahaExplanation,
      validate: outcome => {
        const text = outcome.logs.map(l => l.text.trim()).join('\n');
        const target = pyRank.expectedStrings?.totalLine ?? 'Total extra: 6';
        const emptyWord = pyRank.expectedStrings?.empty ?? 'nada';
        const ok = text.includes(target);
        return [
          {
            label: pyRank.checkLabels?.[0] ?? '',
            passed: ok,
            detail: ok
              ? pyRank.checkDetailsPass?.[0] ?? ''
              : interpolate(pyRank.checkDetailsFail?.[0] ?? '{output}', { output: text || emptyWord })
          }
        ];
      }
    },
    {
      id: 'cf-sql-pizzaria-top',
      title: sqlPizza.title,
      mode: 'challenge',
      track: 'hands-on',
      language: 'sql',
      xp: 85,
      estimatedMinutes: 4,
      funnyHook: sqlPizza.funnyHook,
      prompt: sqlPizza.prompt,
      sqlTables: ['pedidos_pizza'],
      starterCode: sqlPizza.starterCode ?? '',
      solutionCode: sqlPizza.solutionCode ?? '',
      hints: sqlPizza.hints,
      ahaTitle: sqlPizza.ahaTitle,
      ahaExplanation: sqlPizza.ahaExplanation,
      validate: outcome => {
        const rows = outcome.sqlResult?.rows || [];
        const cols = outcome.sqlResult?.columns || [];
        const hasCols = cols.includes('cliente') && cols.includes('sabor') && cols.includes('valor_total');
        const rightCount = rows.length === 3;
        const rightOrder =
          rightCount && rows[0]?.cliente === 'Carla' && rows[1]?.cliente === 'Diego' && rows[2]?.cliente === 'Ana';
        const emptyCols = sqlPizza.expectedStrings?.empty ?? 'nenhuma';
        return [
          {
            label: sqlPizza.checkLabels?.[0] ?? '',
            passed: hasCols,
            detail: hasCols
              ? sqlPizza.checkDetailsPass?.[0] ?? ''
              : interpolate(sqlPizza.checkDetailsFail?.[0] ?? '{cols}', { cols: cols.join(', ') || emptyCols })
          },
          {
            label: sqlPizza.checkLabels?.[1] ?? '',
            passed: rightOrder,
            detail: rightOrder
              ? sqlPizza.checkDetailsPass?.[1] ?? ''
              : interpolate(sqlPizza.checkDetailsFail?.[1] ?? '{count}', { count: rows.length })
          }
        ];
      }
    },
    {
      id: 'cf-bug-js-soma-string',
      title: bugSum.title,
      mode: 'bug-hunt',
      track: 'warmup',
      language: 'javascript',
      xp: 60,
      estimatedMinutes: 3,
      funnyHook: bugSum.funnyHook,
      prompt: bugSum.prompt,
      starterCode: bugSum.starterCode ?? '',
      solutionCode: bugSum.solutionCode ?? '',
      hints: bugSum.hints,
      ahaTitle: bugSum.ahaTitle,
      ahaExplanation: bugSum.ahaExplanation,
      validate: outcome => {
        const ret = outcome.returnValue;
        const logText = outcome.logs.map(l => l.text).join(' ');
        const numericCheck = ret === '120' || /\bTotal:\s*120\b/.test(logText);
        const passed = Boolean(numericCheck && logText.includes('number'));
        return [
          {
            label: bugSum.checkLabels?.[0] ?? '',
            passed,
            detail: passed
              ? bugSum.checkDetailsPass?.[0] ?? ''
              : interpolate(bugSum.checkDetailsFail?.[0] ?? '{ret} ({log})', {
                  ret: ret ?? 'undefined',
                  log: logText
                })
          }
        ];
      }
    },
    {
      id: 'cf-bug-py-lista-fantasma',
      title: bugPy.title,
      mode: 'bug-hunt',
      track: 'senior-trap',
      language: 'python',
      xp: 110,
      estimatedMinutes: 5,
      funnyHook: bugPy.funnyHook,
      prompt: bugPy.prompt,
      starterCode: bugPy.starterCode ?? '',
      solutionCode: bugPy.solutionCode ?? '',
      hints: bugPy.hints,
      ahaTitle: bugPy.ahaTitle,
      ahaExplanation: bugPy.ahaExplanation,
      validate: outcome => {
        const output = outcome.logs.map(l => l.text.trim());
        const exp = bugPy.expectedStrings ?? {};
        const anaTarget = exp.anaLine ?? "Ana: ['Notebook']";
        const brunoTarget = exp.brunoLine ?? "Bruno: ['Fone']";
        const emptyWord = exp.empty ?? 'vazia';
        const anaOk = output.some(l => l === anaTarget);
        const brunoOk = output.some(l => l === brunoTarget);
        return [
          {
            label: bugPy.checkLabels?.[0] ?? '',
            passed: anaOk,
            detail: anaOk
              ? bugPy.checkDetailsPass?.[0] ?? ''
              : interpolate(bugPy.checkDetailsFail?.[0] ?? '{out}', { out: output[0] ?? emptyWord })
          },
          {
            label: bugPy.checkLabels?.[1] ?? '',
            passed: brunoOk,
            detail: brunoOk
              ? bugPy.checkDetailsPass?.[1] ?? ''
              : interpolate(bugPy.checkDetailsFail?.[1] ?? '{out}', { out: output[1] ?? emptyWord })
          }
        ];
      }
    },
    {
      id: 'cf-bug-js-event-loop',
      title: bugLoop.title,
      mode: 'bug-hunt',
      track: 'senior-trap',
      language: 'javascript',
      xp: 120,
      estimatedMinutes: 5,
      funnyHook: bugLoop.funnyHook,
      prompt: bugLoop.prompt,
      starterCode: bugLoop.starterCode ?? '',
      solutionCode: bugLoop.solutionCode ?? '',
      hints: bugLoop.hints,
      ahaTitle: bugLoop.ahaTitle,
      ahaExplanation: bugLoop.ahaExplanation,
      validate: outcome => {
        const lines = outcome.logs.map(l => l.text.trim());
        const ok = lines.length === 4 && lines[0] === '1' && lines[1] === '2' && lines[2] === '3' && lines[3] === '4';
        return [
          {
            label: bugLoop.checkLabels?.[0] ?? '',
            passed: ok,
            detail: ok
              ? bugLoop.checkDetailsPass?.[0] ?? ''
              : interpolate(bugLoop.checkDetailsFail?.[0] ?? '{order}', { order: lines.join(' -> ') })
          }
        ];
      }
    },
    {
      id: 'cf-bug-sql-null-trap',
      title: bugNull.title,
      mode: 'bug-hunt',
      track: 'senior-trap',
      language: 'sql',
      xp: 100,
      estimatedMinutes: 5,
      funnyHook: bugNull.funnyHook,
      prompt: bugNull.prompt,
      sqlTables: ['devs_e_cafes'],
      starterCode: bugNull.starterCode ?? '',
      solutionCode: bugNull.solutionCode ?? '',
      hints: bugNull.hints,
      ahaTitle: bugNull.ahaTitle,
      ahaExplanation: bugNull.ahaExplanation,
      validate: outcome => {
        const rows = outcome.sqlResult?.rows || [];
        const names = rows.map(r => r.nome);
        const hasDiego = names.includes('Diego');
        const noElena = !names.includes('Elena');
        const rightLen = rows.length === 4;
        return [
          {
            label: bugNull.checkLabels?.[0] ?? '',
            passed: hasDiego,
            detail: hasDiego ? bugNull.checkDetailsPass?.[0] ?? '' : bugNull.checkDetailsFail?.[0] ?? ''
          },
          {
            label: bugNull.checkLabels?.[1] ?? '',
            passed: rightLen && noElena,
            detail:
              rightLen && noElena
                ? bugNull.checkDetailsPass?.[1] ?? ''
                : interpolate(bugNull.checkDetailsFail?.[1] ?? '{count}: {names}', {
                    count: rows.length,
                    names: names.join(', ')
                  })
          }
        ];
      }
    },
    {
      id: 'cf-sandbox-js-canvas',
      title: sCanvas.title,
      mode: 'sandbox',
      track: 'warmup',
      language: 'javascript',
      xp: 40,
      estimatedMinutes: 5,
      hasVisualStage: true,
      funnyHook: sCanvas.funnyHook,
      prompt: sCanvas.prompt,
      starterCode: sCanvas.starterCode ?? '',
      solutionCode: sCanvas.solutionCode ?? '',
      hints: sCanvas.hints,
      ahaTitle: sCanvas.ahaTitle,
      ahaExplanation: sCanvas.ahaExplanation
    },
    {
      id: 'cf-sandbox-py-trace',
      title: sPy.title,
      mode: 'sandbox',
      track: 'hands-on',
      language: 'python',
      xp: 40,
      estimatedMinutes: 5,
      funnyHook: sPy.funnyHook,
      prompt: sPy.prompt,
      starterCode: sPy.starterCode ?? '',
      solutionCode: sPy.solutionCode ?? '',
      hints: sPy.hints,
      ahaTitle: sPy.ahaTitle,
      ahaExplanation: sPy.ahaExplanation
    },
    {
      id: 'cf-sandbox-sql-lab',
      title: sSql.title,
      mode: 'sandbox',
      track: 'hands-on',
      language: 'sql',
      xp: 40,
      estimatedMinutes: 5,
      funnyHook: sSql.funnyHook,
      prompt: sSql.prompt,
      sqlTables: ['devs_e_cafes', 'bugs_producao', 'pedidos_pizza'],
      starterCode: sSql.starterCode ?? '',
      solutionCode: sSql.solutionCode ?? '',
      hints: sSql.hints,
      ahaTitle: sSql.ahaTitle,
      ahaExplanation: sSql.ahaExplanation
    }
  ];
}
