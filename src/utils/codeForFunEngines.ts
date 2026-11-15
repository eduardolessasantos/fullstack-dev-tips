import {
  CodeForFunExecutionOutcome,
  CodeForFunLanguage,
  SqlQueryResult,
  SqlTableData,
  TraceStep
} from '../types.ts';
import type { CodeForFunLocale } from '../i18n/types.ts';

type EngineMessages = CodeForFunLocale['engineMessages'];

const FALLBACK_ENGINE_MESSAGES: EngineMessages = {
  timeoutError: 'Opa! Seu código demorou demais (mais de 1.5s). Será que rolou um loop infinito por aí?',
  timeoutRaw: 'Timeout: Loop infinito detectado (> 1500ms)',
  isNotDefinedError: name =>
    `Ops! "${name}" ainda não foi declarado antes de ser usado. Confira a ortografia ou declare com let/const.`,
  isNotFunctionError:
    'Você tentou chamar algo como função `()`, mas esse valor não é uma função (pode ser undefined, número ou objeto).',
  nullPropertyError:
    'Tentativa de acessar propriedade em um valor nulo ou undefined. Que tal checar com `?.` (optional chaining) ou validar antes?',
  constAssignError:
    'Você tentou reatribuir um valor a uma variável `const`. Se ela precisa mudar, troque para `let`!',
  syntaxError: raw => `Erro de sintaxe: faltou fechar algum parêntese, chave ou aspas? (${raw})`,
  runtimeError: raw => `Aconteceu um erro durante a execução: ${raw}`,
  noWorkerError: 'Seu navegador atual não suporta Web Workers isolados para execução.',
  unknownError: 'Erro desconhecido',
  anonFnLabel: 'anônima',
  defaultVarLabel: 'uma variável',
  python: {
    maxStepsError: 'Limite de 220 passos atingido no simulador Python (evitando loop infinito).',
    nameError: name => `NameError: nome '${name}' não foi definido`,
    nonIterableComprehension: 'Objeto não iterável na list comprehension',
    missingArgError: (fnName, argName) => `TypeError: ${fnName}() argumento obrigatório '${argName}' ausente`,
    unknownExprError: expr => `Expressão Python não reconhecida: "${expr}"`,
    syntaxErrorLine: (line, raw) => `SyntaxError na linha ${line}: ${raw}`,
    forNonIterableError: line => `Objeto não iterável na linha ${line}`,
    defNote: (fnName, hasDefaults) =>
      `Definiu a função "${fnName}"${hasDefaults ? ' (atenção: os valores padrão foram avaliados agora na definição!)' : ''}.`,
    returnNote: val => `Retornou ${val} da função.`,
    elseNote: 'Entrou no bloco else.',
    condEvalNote: (cond, ok) => `Avaliou "${cond}" → ${ok ? 'True (entra no bloco)' : 'False (pula)'}.`,
    forIterNote: (target, val) => `Iteração do loop: ${target} = ${val}`,
    whileTrueNote: cond => `Condição "${cond}" é True — executando laço.`,
    whileDoneNote: cond => `Condição "${cond}" ficou False — saiu do while.`,
    augAssignNote: (varName, val) => `Atualizou "${varName}" para ${val}.`,
    indexAssignNote: (val, lhs) => `Atribuiu ${val} em ${lhs}.`,
    unpackNote: lhs => `Desempacotou valores em ${lhs}.`,
    assignNote: (lhs, val) => `Guardou ${lhs} = ${val}.`,
    printNote: text => `Imprimiu no console: "${text}"`,
    exprNote: (raw, val) => `Executou "${raw}"${val !== null ? ` → ${val}` : ''}.`,
    errorFriendlyPrefix: raw => `Erro no simulador Python: ${raw}`
  },
  sql: {
    emptyQueryError: 'Digite uma consulta SELECT para executar no banco em memória!',
    onlySelectError:
      'Neste laboratório interativo, use consultas SELECT (com FROM, JOIN, WHERE, GROUP BY, ORDER BY, LIMIT).',
    invalidFromError: clause => `Cláusula FROM inválida: "${clause}"`,
    tableNotFoundError: (name, available) => `Tabela "${name}" não encontrada. Disponíveis: ${available}`,
    invalidJoinError: clause => `Sintaxe de JOIN inválida: "${clause}"`,
    joinTableNotFoundError: name => `Tabela de JOIN "${name}" não encontrada.`,
    colNotFoundJoinError: col => `Coluna "${col}" não existe nas tabelas selecionadas.`,
    colNotFoundSelectError: col => `Coluna "${col}" não encontrada.`,
    invalidWhereError: cond => `Condição WHERE não compreendida: "${cond}"`,
    fromPhase: '1. FROM',
    leftJoinPhase: '2. LEFT JOIN',
    innerJoinPhase: '2. INNER JOIN',
    wherePhase: '3. WHERE',
    groupPhase: '4. GROUP BY',
    selectPhase: '5. SELECT',
    orderPhase: '6. ORDER BY',
    limitPhase: '7. LIMIT',
    varTable: 'tabela',
    varRows: 'linhas',
    varFilter: 'filtro',
    varBefore: 'antes',
    varAfter: 'depois',
    varGroups: 'grupos',
    varColumns: 'colunas',
    varOrder: 'ordenação',
    varLimit: 'limite',
    fromStepNote: (rowsCount, tableName) => `Carregou ${rowsCount} linha(s) da tabela "${tableName}".`,
    joinStepNote: (isLeft, rowsCount) =>
      `${isLeft ? 'LEFT JOIN preservou todas da esquerda' : 'INNER JOIN cruzou correspondências'} → ${rowsCount} linha(s).`,
    whereStepNote: (clause, after, before) => `Filtrou com WHERE (${clause}): restaram ${after} de ${before} linha(s).`,
    groupStepNote: (groupsCount, clause) => `Agrupou as linhas em ${groupsCount} grupo(s) distintos por ${clause}.`,
    selectStepNote: (cols, rowsCount) => `Projetou as colunas [${cols}] com ${rowsCount} linha(s).`,
    orderStepNote: clause => `Ordenou o resultado por ${clause}.`,
    limitStepNote: limit => `Limitou a exibição às primeiras ${limit} linha(s).`,
    successInfoLog: rowsCount => `Consulta executada com sucesso: ${rowsCount} linha(s) retornada(s).`
  }
};

// ============================================================================
// 1. WEB AUDIO API - EFEITOS SONOROS LEVES (OPCIONAL / MUDO)
// ============================================================================

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new Ctx();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

export function playFunSound(kind: 'success' | 'step' | 'error' | 'badge', enabled: boolean) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const playTone = (freq: number, start: number, duration: number, type: OscillatorType = 'sine', gainVal = 0.08) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(gainVal, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration + 0.02);
    };

    if (kind === 'step') {
      playTone(540, now, 0.06, 'triangle', 0.04);
    } else if (kind === 'error') {
      playTone(220, now, 0.12, 'sawtooth', 0.04);
      playTone(185, now + 0.1, 0.16, 'sawtooth', 0.035);
    } else if (kind === 'success') {
      playTone(523.25, now, 0.12, 'triangle', 0.08);
      playTone(659.25, now + 0.08, 0.12, 'triangle', 0.08);
      playTone(783.99, now + 0.16, 0.22, 'triangle', 0.09);
    } else if (kind === 'badge') {
      playTone(587.33, now, 0.1, 'sine', 0.08);
      playTone(739.99, now + 0.08, 0.1, 'sine', 0.08);
      playTone(880.0, now + 0.16, 0.12, 'sine', 0.08);
      playTone(1174.66, now + 0.24, 0.28, 'sine', 0.09);
    }
  } catch {
    // Ignore audio errors
  }
}

// ============================================================================
// 2. JAVASCRIPT / TYPESCRIPT SANDBOX WORKER
// ============================================================================

export function stripTypeScriptAnnotations(tsCode: string): string {
  let code = tsCode;

  code = code.replace(/^\s*export\s+(?=(interface|type|const|let|var|function|class))/gm, '');
  code = code.replace(/^\s*interface\s+\w+(?:<[^>]*>)?\s*(?:extends\s+[^{]+)?\{[\s\S]*?\n?\}/gm, '');
  code = code.replace(/^\s*type\s+\w+(?:<[^>]*>)?\s*=\s*[^;]+;/gm, '');
  code = code.replace(
    /(\b(?:const|let|var)\s+\w+)\s*:\s*[A-Za-z0-9_<>\[\]\|\s&'".,?]+(?=\s*=)/g,
    '$1'
  );
  code = code.replace(
    /(\bfunction(?:\s+\w+)?\s*\()([^()]*)(\))(?:\s*:\s*[A-Za-z0-9_<>\[\]\|\s&'".,?]+)?(?=\s*\{)/g,
    (_m, open, params: string, close) => {
      const cleaned = params.replace(
        /(\b\w+\??)\s*:\s*[A-Za-z0-9_<>\[\]\|\s&'".,?]+(?=\s*(?:,|=|$))/g,
        '$1'
      );
      return `${open}${cleaned}${close}`;
    }
  );
  code = code.replace(
    /(?<![a-zA-Z0-9_$.])(\()([^()]*)(\))(?:\s*:\s*[A-Za-z0-9_<>\[\]\|\s&'".,?]+)?(?=\s*=>)/g,
    (_m, open, params: string, close) => {
      const cleaned = params.replace(
        /(\b\w+\??)\s*:\s*[A-Za-z0-9_<>\[\]\|\s&'".,?]+(?=\s*(?:,|=|$))/g,
        '$1'
      );
      return `${open}${cleaned}${close}`;
    }
  );
  code = code.replace(/\s+as\s+[A-Za-z0-9_<>\[\]\|]+/g, '');

  return code;
}

function translateJsErrorFriendly(raw: string, messages: EngineMessages): string {
  if (raw.includes('Timeout') || raw === messages.timeoutRaw) {
    return messages.timeoutError;
  }
  if (raw.includes('is not defined')) {
    const match = raw.match(/(\w+)\s+is not defined/);
    const name = match ? match[1] : messages.defaultVarLabel;
    return messages.isNotDefinedError(name);
  }
  if (raw.includes('is not a function')) {
    return messages.isNotFunctionError;
  }
  if (raw.includes('Cannot read properties of undefined') || raw.includes('Cannot read properties of null')) {
    return messages.nullPropertyError;
  }
  if (raw.includes('Assignment to constant variable')) {
    return messages.constAssignError;
  }
  if (raw.includes('Unexpected token') || raw.includes('SyntaxError')) {
    return messages.syntaxError(raw);
  }
  return messages.runtimeError(raw);
}

export async function runJsTsInSandbox(
  rawCode: string,
  language: 'javascript' | 'typescript',
  messages: EngineMessages = FALLBACK_ENGINE_MESSAGES
): Promise<CodeForFunExecutionOutcome> {
  const start = performance.now();
  const executableCode = language === 'typescript' ? stripTypeScriptAnnotations(rawCode) : rawCode;

  if (typeof Worker === 'undefined') {
    return {
      ok: false,
      language,
      logs: [],
      durationMs: 0,
      errorFriendly: messages.noWorkerError
    };
  }

  const workerSource = `
    const logs = [];
    const visualScene = [];
    let pendingTimers = 0;
    const ANON_FN_LABEL = ${JSON.stringify(messages.anonFnLabel)};

    function formatArg(val) {
      if (val === undefined) return 'undefined';
      if (val === null) return 'null';
      if (typeof val === 'number' && Number.isNaN(val)) return 'NaN';
      if (typeof val === 'function') return '[Function ' + (val.name || ANON_FN_LABEL) + ']';
      if (typeof val === 'symbol') return val.toString();
      if (typeof val === 'object') {
        try {
          const seen = new WeakSet();
          return JSON.stringify(val, function(k, v) {
            if (typeof v === 'object' && v !== null) {
              if (seen.has(v)) return '[Circular]';
              seen.add(v);
            }
            if (typeof v === 'function') return '[Function]';
            if (v === undefined) return 'undefined';
            return v;
          }, 2);
        } catch (e) {
          return String(val);
        }
      }
      return String(val);
    }

    const customConsole = {
      log: (...args) => logs.push({ type: 'log', text: args.map(formatArg).join(' ') }),
      info: (...args) => logs.push({ type: 'info', text: args.map(formatArg).join(' ') }),
      warn: (...args) => logs.push({ type: 'warn', text: args.map(formatArg).join(' ') }),
      error: (...args) => logs.push({ type: 'error', text: args.map(formatArg).join(' ') }),
      table: (data) => logs.push({ type: 'info', text: formatArg(data) })
    };

    const draw = {
      clear: (color = '#020617') => visualScene.push({ kind: 'clear', color }),
      rect: (x, y, w, h, color = '#22d3ee') => visualScene.push({ kind: 'rect', x, y, w, h, color }),
      circle: (x, y, r, color = '#a78bfa') => visualScene.push({ kind: 'circle', x, y, r, color }),
      line: (x, y, x2, y2, color = '#38bdf8', size = 2) => visualScene.push({ kind: 'line', x, y, x2, y2, color, size }),
      text: (text, x, y, color = '#f8fafc', size = 14) => visualScene.push({ kind: 'text', text: String(text), x, y, color, size })
    };

    const nativeSetTimeout = self.setTimeout.bind(self);
    const wrappedSetTimeout = (fn, ms = 0, ...args) => {
      pendingTimers++;
      return nativeSetTimeout(() => {
        try {
          if (typeof fn === 'function') fn(...args);
        } catch (err) {
          logs.push({ type: 'error', text: err && err.message ? err.message : String(err) });
        } finally {
          pendingTimers--;
        }
      }, Math.min(Math.max(0, Number(ms) || 0), 250));
    };

    self.onmessage = async function(ev) {
      const code = ev.data.code;
      try {
        const AsyncFn = Object.getPrototypeOf(async function(){}).constructor;
        const fn = new AsyncFn('console', 'draw', 'setTimeout', '"use strict";\\n' + code);
        const returnVal = await fn(customConsole, draw, wrappedSetTimeout);

        const waitStart = Date.now();
        while (pendingTimers > 0 && Date.now() - waitStart < 180) {
          await new Promise(r => nativeSetTimeout(r, 15));
        }
        await new Promise(r => nativeSetTimeout(r, 10));

        self.postMessage({
          ok: true,
          logs,
          visualScene,
          returnValue: returnVal === undefined ? undefined : formatArg(returnVal)
        });
      } catch (err) {
        self.postMessage({
          ok: false,
          logs,
          visualScene,
          errorRaw: err && err.message ? err.message : String(err)
        });
      }
    };
  `;

  return new Promise<CodeForFunExecutionOutcome>(resolve => {
    const blob = new Blob([workerSource], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    let settled = false;

    const cleanup = () => {
      worker.terminate();
      URL.revokeObjectURL(url);
    };

    const timeoutId = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve({
        ok: false,
        language,
        logs: [],
        durationMs: Math.round(performance.now() - start),
        errorRaw: messages.timeoutRaw,
        errorFriendly: messages.timeoutError
      });
    }, 1500);

    worker.onmessage = (e: MessageEvent) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      cleanup();
      const durationMs = Math.round((performance.now() - start) * 10) / 10;
      const data = e.data;
      if (data.ok) {
        resolve({
          ok: true,
          language,
          logs: data.logs || [],
          returnValue: data.returnValue,
          visualScene: data.visualScene && data.visualScene.length > 0 ? data.visualScene : undefined,
          durationMs
        });
      } else {
        resolve({
          ok: false,
          language,
          logs: data.logs || [],
          visualScene: data.visualScene && data.visualScene.length > 0 ? data.visualScene : undefined,
          durationMs,
          errorRaw: data.errorRaw,
          errorFriendly: translateJsErrorFriendly(data.errorRaw || messages.unknownError, messages)
        });
      }
    };

    worker.onerror = (err: ErrorEvent) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      cleanup();
      const raw = err.message || 'SyntaxError';
      resolve({
        ok: false,
        language,
        logs: [],
        durationMs: Math.round(performance.now() - start),
        errorRaw: raw,
        errorFriendly: translateJsErrorFriendly(raw, messages)
      });
    };

    worker.postMessage({ code: executableCode });
  });
}

// ============================================================================
// 3. SIMULADOR PYTHON COM TRACE PASSO A PASSO E MEMÓRIA VIVA
// ============================================================================

type PyValue =
  | number
  | string
  | boolean
  | null
  | PyValue[]
  | { __pyDict: true; entries: Map<string, PyValue> }
  | { __pyFunc: true; name: string; params: { name: string; defaultVal?: PyValue }[]; body: PyNode[] };

interface PyNode {
  line: number;
  indent: number;
  raw: string;
}

function isPyDict(v: PyValue): v is { __pyDict: true; entries: Map<string, PyValue> } {
  return typeof v === 'object' && v !== null && !Array.isArray(v) && '__pyDict' in v;
}

function isPyFunc(v: PyValue): v is { __pyFunc: true; name: string; params: { name: string; defaultVal?: PyValue }[]; body: PyNode[] } {
  return typeof v === 'object' && v !== null && !Array.isArray(v) && '__pyFunc' in v;
}

export function formatPyValue(v: PyValue): string {
  if (v === null) return 'None';
  if (typeof v === 'boolean') return v ? 'True' : 'False';
  if (typeof v === 'number') return String(v);
  if (typeof v === 'string') return `'${v}'`;
  if (Array.isArray(v)) return `[${v.map(formatPyValue).join(', ')}]`;
  if (isPyDict(v)) {
    const pairs: string[] = [];
    v.entries.forEach((val, key) => {
      pairs.push(`'${key}': ${formatPyValue(val)}`);
    });
    return `{${pairs.join(', ')}}`;
  }
  if (isPyFunc(v)) return `<function ${v.name}>`;
  return String(v);
}

function pyToPrintString(v: PyValue): string {
  if (typeof v === 'string') return v;
  return formatPyValue(v);
}

function pyTruthy(v: PyValue): boolean {
  if (v === null || v === false || v === 0 || v === '') return false;
  if (Array.isArray(v)) return v.length > 0;
  if (isPyDict(v)) return v.entries.size > 0;
  return true;
}

function splitTopLevel(expr: string, sep: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let quote: string | null = null;
  let cur = '';
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (quote) {
      cur += ch;
      if (ch === quote && expr[i - 1] !== '\\') quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      cur += ch;
      continue;
    }
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    else if (ch === ')' || ch === ']' || ch === '}') depth--;

    if (depth === 0 && expr.slice(i, i + sep.length) === sep) {
      parts.push(cur.trim());
      cur = '';
      i += sep.length - 1;
      continue;
    }
    cur += ch;
  }
  if (cur.trim() !== '' || parts.length > 0) parts.push(cur.trim());
  return parts;
}

function findTopLevelKeyword(expr: string, kw: string): number {
  let depth = 0;
  let quote: string | null = null;
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (quote) {
      if (ch === quote && expr[i - 1] !== '\\') quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    else if (ch === ')' || ch === ']' || ch === '}') depth--;
    if (depth === 0) {
      if (expr.slice(i, i + kw.length) === kw) {
        const prev = i === 0 ? ' ' : expr[i - 1];
        const next = i + kw.length >= expr.length ? ' ' : expr[i + kw.length];
        const isAlphaKw = /^[a-zA-Z]/.test(kw);
        if (!isAlphaKw || (!/[a-zA-Z0-9_]/.test(prev) && !/[a-zA-Z0-9_]/.test(next))) {
          return i;
        }
      }
    }
  }
  return -1;
}

class PyReturnSignal {
  constructor(public value: PyValue) {}
}

export function runPythonSimulation(
  code: string,
  messages: EngineMessages = FALLBACK_ENGINE_MESSAGES
): CodeForFunExecutionOutcome {
  const pyMsg = messages.python;
  const start = performance.now();
  const rawLines = code.split('\n');
  const nodes: PyNode[] = [];

  for (let i = 0; i < rawLines.length; i++) {
    const lineStr = rawLines[i];
    let clean = '';
    let quote: string | null = null;
    for (let j = 0; j < lineStr.length; j++) {
      const ch = lineStr[j];
      if (quote) {
        clean += ch;
        if (ch === quote && lineStr[j - 1] !== '\\') quote = null;
      } else if (ch === '"' || ch === "'") {
        quote = ch;
        clean += ch;
      } else if (ch === '#') {
        break;
      } else {
        clean += ch;
      }
    }
    const trimmed = clean.trim();
    if (!trimmed) continue;
    const indent = lineStr.search(/\S/);
    nodes.push({ line: i + 1, indent: indent === -1 ? 0 : indent, raw: trimmed });
  }

  const globalEnv: Record<string, PyValue> = {};
  const outputLines: string[] = [];
  const traceSteps: TraceStep[] = [];
  const MAX_STEPS = 220;
  let stepCount = 0;

  const snapshotVars = (env: Record<string, PyValue>): Record<string, string> => {
    const snap: Record<string, string> = {};
    for (const [k, v] of Object.entries(env)) {
      if (!isPyFunc(v)) {
        snap[k] = formatPyValue(v);
      }
    }
    return snap;
  };

  const recordStep = (line: number, env: Record<string, PyValue>, note: string) => {
    stepCount++;
    if (stepCount > MAX_STEPS) {
      throw new Error(pyMsg.maxStepsError);
    }
    traceSteps.push({
      stepNumber: stepCount,
      line,
      variables: snapshotVars(env),
      output: [...outputLines],
      note
    });
  };

  const resolveVar = (name: string, env: Record<string, PyValue>): PyValue => {
    if (name in env) return env[name];
    if (name in globalEnv) return globalEnv[name];
    throw new Error(pyMsg.nameError(name));
  };

  const evalExpr = (rawExpr: string, env: Record<string, PyValue>): PyValue => {
    let expr = rawExpr.trim();
    if (!expr) return null;

    while (expr.startsWith('(') && expr.endsWith(')')) {
      let depth = 0;
      let quote: string | null = null;
      let wrapsAll = true;
      for (let i = 0; i < expr.length; i++) {
        const ch = expr[i];
        if (quote) {
          if (ch === quote && expr[i - 1] !== '\\') quote = null;
          continue;
        }
        if (ch === '"' || ch === "'") {
          quote = ch;
          continue;
        }
        if (ch === '(') depth++;
        else if (ch === ')') depth--;
        if (depth === 0 && i < expr.length - 1) {
          wrapsAll = false;
          break;
        }
      }
      if (wrapsAll) expr = expr.slice(1, -1).trim();
      else break;
    }

    if (expr === 'True') return true;
    if (expr === 'False') return false;
    if (expr === 'None') return null;
    if (/^-?\d+(\.\d+)?$/.test(expr)) return Number(expr);

    if ((expr.startsWith('f"') && expr.endsWith('"')) || (expr.startsWith("f'") && expr.endsWith("'"))) {
      const inner = expr.slice(2, -1);
      return inner.replace(/\{([^}]+)\}/g, (_, inside) => pyToPrintString(evalExpr(inside, env)));
    }

    if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
      let closedEarly = false;
      const q = expr[0];
      for (let i = 1; i < expr.length - 1; i++) {
        if (expr[i] === q && expr[i - 1] !== '\\') {
          closedEarly = true;
          break;
        }
      }
      if (!closedEarly) return expr.slice(1, -1);
    }

    if (expr.startsWith('[') && expr.endsWith(']')) {
      let depth = 0;
      let quote: string | null = null;
      let singleBracket = true;
      for (let i = 0; i < expr.length; i++) {
        const ch = expr[i];
        if (quote) {
          if (ch === quote && expr[i - 1] !== '\\') quote = null;
          continue;
        }
        if (ch === '"' || ch === "'") { quote = ch; continue; }
        if (ch === '[') depth++;
        else if (ch === ']') depth--;
        if (depth === 0 && i < expr.length - 1) {
          singleBracket = false;
          break;
        }
      }
      if (singleBracket) {
        const inner = expr.slice(1, -1).trim();
        if (!inner) return [];
        const forIdx = findTopLevelKeyword(inner, 'for');
        if (forIdx !== -1) {
          const itemExpr = inner.slice(0, forIdx).trim();
          const rest = inner.slice(forIdx + 3).trim();
          const inIdx = findTopLevelKeyword(rest, 'in');
          if (inIdx !== -1) {
            const loopVar = rest.slice(0, inIdx).trim();
            let iterPart = rest.slice(inIdx + 2).trim();
            let condExpr: string | null = null;
            const ifIdx = findTopLevelKeyword(iterPart, 'if');
            if (ifIdx !== -1) {
              condExpr = iterPart.slice(ifIdx + 2).trim();
              iterPart = iterPart.slice(0, ifIdx).trim();
            }
            const iterVal = evalExpr(iterPart, env);
            if (!Array.isArray(iterVal)) throw new Error(pyMsg.nonIterableComprehension);
            const outList: PyValue[] = [];
            for (const item of iterVal) {
              const localEnv = { ...env, [loopVar]: item };
              if (!condExpr || pyTruthy(evalExpr(condExpr, localEnv))) {
                outList.push(evalExpr(itemExpr, localEnv));
              }
            }
            return outList;
          }
        }
        return splitTopLevel(inner, ',').map(p => evalExpr(p, env));
      }
    }

    if (expr.startsWith('{') && expr.endsWith('}')) {
      const inner = expr.slice(1, -1).trim();
      const map = new Map<string, PyValue>();
      if (inner) {
        for (const pair of splitTopLevel(inner, ',')) {
          const [kRaw, vRaw] = splitTopLevel(pair, ':');
          const kVal = evalExpr(kRaw, env);
          map.set(pyToPrintString(kVal), evalExpr(vRaw, env));
        }
      }
      return { __pyDict: true, entries: map };
    }

    const orIdx = findTopLevelKeyword(expr, 'or');
    if (orIdx !== -1) {
      const left = evalExpr(expr.slice(0, orIdx), env);
      return pyTruthy(left) ? left : evalExpr(expr.slice(orIdx + 2), env);
    }
    const andIdx = findTopLevelKeyword(expr, 'and');
    if (andIdx !== -1) {
      const left = evalExpr(expr.slice(0, andIdx), env);
      return !pyTruthy(left) ? left : evalExpr(expr.slice(andIdx + 3), env);
    }
    if (expr.startsWith('not ')) {
      return !pyTruthy(evalExpr(expr.slice(4), env));
    }

    const compOps = ['==', '!=', '<=', '>=', '<', '>', 'not in', 'in', 'is not', 'is'];
    for (const op of compOps) {
      const idx = findTopLevelKeyword(expr, op);
      if (idx !== -1) {
        const l = evalExpr(expr.slice(0, idx), env);
        const r = evalExpr(expr.slice(idx + op.length), env);
        if (op === '==') return JSON.stringify(l) === JSON.stringify(r);
        if (op === '!=') return JSON.stringify(l) !== JSON.stringify(r);
        if (op === '<') return Number(l) < Number(r);
        if (op === '<=') return Number(l) <= Number(r);
        if (op === '>') return Number(l) > Number(r);
        if (op === '>=') return Number(l) >= Number(r);
        if (op === 'is') return l === r;
        if (op === 'is not') return l !== r;
        if (op === 'in') {
          if (typeof r === 'string') return r.includes(String(l));
          if (Array.isArray(r)) return r.some(x => x === l);
          if (isPyDict(r)) return r.entries.has(pyToPrintString(l));
        }
        if (op === 'not in') {
          if (typeof r === 'string') return !r.includes(String(l));
          if (Array.isArray(r)) return !r.some(x => x === l);
          if (isPyDict(r)) return !r.entries.has(pyToPrintString(l));
        }
      }
    }

    let depth = 0;
    let quote: string | null = null;
    for (let i = expr.length - 1; i > 0; i--) {
      const ch = expr[i];
      if (quote) {
        if (ch === quote && expr[i - 1] !== '\\') quote = null;
        continue;
      }
      if (ch === '"' || ch === "'") { quote = ch; continue; }
      if (ch === ')' || ch === ']' || ch === '}') depth++;
      else if (ch === '(' || ch === '[' || ch === '{') depth--;
      if (depth === 0 && (ch === '+' || ch === '-')) {
        const prevChar = expr.slice(0, i).trim().slice(-1);
        if (prevChar && !'+-*/%(,[='.includes(prevChar)) {
          const l = evalExpr(expr.slice(0, i), env);
          const r = evalExpr(expr.slice(i + 1), env);
          if (ch === '+') {
            if (Array.isArray(l) && Array.isArray(r)) return [...l, ...r];
            if (typeof l === 'string' || typeof r === 'string') return String(l) + String(r);
            return Number(l) + Number(r);
          }
          return Number(l) - Number(r);
        }
      }
    }

    depth = 0;
    quote = null;
    for (let i = expr.length - 1; i > 0; i--) {
      const ch = expr[i];
      if (quote) {
        if (ch === quote && expr[i - 1] !== '\\') quote = null;
        continue;
      }
      if (ch === '"' || ch === "'") { quote = ch; continue; }
      if (ch === ')' || ch === ']' || ch === '}') depth++;
      else if (ch === '(' || ch === '[' || ch === '{') depth--;
      if (depth === 0) {
        if (expr.slice(i - 1, i + 1) === '//') {
          const l = evalExpr(expr.slice(0, i - 1), env);
          const r = evalExpr(expr.slice(i + 1), env);
          return Math.floor(Number(l) / Number(r));
        }
        if (expr.slice(i - 1, i + 1) === '**') {
          const l = evalExpr(expr.slice(0, i - 1), env);
          const r = evalExpr(expr.slice(i + 1), env);
          return Math.pow(Number(l), Number(r));
        }
        if (ch === '*' && expr[i - 1] !== '*' && expr[i + 1] !== '*') {
          const l = evalExpr(expr.slice(0, i), env);
          const r = evalExpr(expr.slice(i + 1), env);
          if (typeof l === 'string' && typeof r === 'number') return l.repeat(r);
          if (Array.isArray(l) && typeof r === 'number') {
            const out: PyValue[] = [];
            for (let k = 0; k < r; k++) out.push(...l);
            return out;
          }
          return Number(l) * Number(r);
        }
        if (ch === '/' && expr[i - 1] !== '/' && expr[i + 1] !== '/') {
          const l = evalExpr(expr.slice(0, i), env);
          const r = evalExpr(expr.slice(i + 1), env);
          return Number(l) / Number(r);
        }
        if (ch === '%') {
          const l = evalExpr(expr.slice(0, i), env);
          const r = evalExpr(expr.slice(i + 1), env);
          return Number(l) % Number(r);
        }
      }
    }

    if (expr.endsWith(')')) {
      let parenDepth = 0;
      let openIdx = -1;
      let q2: string | null = null;
      for (let i = expr.length - 1; i >= 0; i--) {
        const ch = expr[i];
        if (q2) {
          if (ch === q2 && expr[i - 1] !== '\\') q2 = null;
          continue;
        }
        if (ch === '"' || ch === "'") { q2 = ch; continue; }
        if (ch === ')') parenDepth++;
        else if (ch === '(') {
          parenDepth--;
          if (parenDepth === 0) {
            openIdx = i;
            break;
          }
        }
      }
      if (openIdx > 0) {
        const callee = expr.slice(0, openIdx).trim();
        const argsRaw = expr.slice(openIdx + 1, -1).trim();
        const argVals = argsRaw ? splitTopLevel(argsRaw, ',').map(a => evalExpr(a, env)) : [];

        const lastDot = callee.lastIndexOf('.');
        if (lastDot !== -1 && !callee.includes('(')) {
          const targetExpr = callee.slice(0, lastDot).trim();
          const methodName = callee.slice(lastDot + 1).trim();
          const targetVal = evalExpr(targetExpr, env);

          if (Array.isArray(targetVal)) {
            if (methodName === 'append') { targetVal.push(argVals[0]); return null; }
            if (methodName === 'pop') return targetVal.pop() ?? null;
            if (methodName === 'sort') { targetVal.sort((a, b) => Number(a) - Number(b)); return null; }
            if (methodName === 'reverse') { targetVal.reverse(); return null; }
          }
          if (typeof targetVal === 'string') {
            if (methodName === 'upper') return targetVal.toUpperCase();
            if (methodName === 'lower') return targetVal.toLowerCase();
            if (methodName === 'strip') return targetVal.trim();
            if (methodName === 'split') return targetVal.split(argVals[0] ? String(argVals[0]) : ' ');
            if (methodName === 'join' && Array.isArray(argVals[0])) {
              return argVals[0].map(pyToPrintString).join(targetVal);
            }
          }
          if (isPyDict(targetVal)) {
            if (methodName === 'get') {
              const k = pyToPrintString(argVals[0]);
              return targetVal.entries.has(k) ? targetVal.entries.get(k)! : (argVals[1] ?? null);
            }
            if (methodName === 'keys') return Array.from(targetVal.entries.keys());
            if (methodName === 'values') return Array.from(targetVal.entries.values());
          }
        }

        if (callee === 'print') {
          outputLines.push(argVals.map(pyToPrintString).join(' '));
          return null;
        }
        if (callee === 'len') {
          const target = argVals[0];
          if (typeof target === 'string' || Array.isArray(target)) return target.length;
          if (isPyDict(target)) return target.entries.size;
          return 0;
        }
        if (callee === 'range') {
          let rStart = 0;
          let rStop = 0;
          let rStep = 1;
          if (argVals.length === 1) rStop = Number(argVals[0]);
          else if (argVals.length === 2) { rStart = Number(argVals[0]); rStop = Number(argVals[1]); }
          else if (argVals.length >= 3) { rStart = Number(argVals[0]); rStop = Number(argVals[1]); rStep = Number(argVals[2]); }
          const arr: number[] = [];
          if (rStep > 0) for (let k = rStart; k < rStop; k += rStep) arr.push(k);
          else if (rStep < 0) for (let k = rStart; k > rStop; k += rStep) arr.push(k);
          return arr;
        }
        if (callee === 'sum' && Array.isArray(argVals[0])) {
          return argVals[0].reduce((acc: number, x) => acc + Number(x), 0);
        }
        if (callee === 'min' && Array.isArray(argVals[0])) {
          return Math.min(...argVals[0].map(Number));
        }
        if (callee === 'max' && Array.isArray(argVals[0])) {
          return Math.max(...argVals[0].map(Number));
        }
        if (callee === 'sorted' && Array.isArray(argVals[0])) {
          return [...argVals[0]].sort((a, b) => Number(a) - Number(b));
        }
        if (callee === 'enumerate' && Array.isArray(argVals[0])) {
          return argVals[0].map((v, idx) => [idx, v]);
        }
        if (callee === 'str') return pyToPrintString(argVals[0]);
        if (callee === 'int') return Math.trunc(Number(argVals[0]));
        if (callee === 'float') return Number(argVals[0]);
        if (callee === 'bool') return pyTruthy(argVals[0]);
        if (callee === 'round') return Number(Number(argVals[0]).toFixed(Number(argVals[1] ?? 0)));
        if (callee === 'abs') return Math.abs(Number(argVals[0]));
        if (callee === 'id') {
          return Math.abs(JSON.stringify(argVals[0]).split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0));
        }

        const fnVal = resolveVar(callee, env);
        if (isPyFunc(fnVal)) {
          const fnEnv: Record<string, PyValue> = {};
          fnVal.params.forEach((p, idx) => {
            if (idx < argVals.length) {
              fnEnv[p.name] = argVals[idx];
            } else if (p.defaultVal !== undefined) {
              fnEnv[p.name] = p.defaultVal;
            } else {
              throw new Error(pyMsg.missingArgError(fnVal.name, p.name));
            }
          });
          try {
            execBlock(fnVal.body, fnEnv);
          } catch (sig) {
            if (sig instanceof PyReturnSignal) return sig.value;
            throw sig;
          }
          return null;
        }
      }
    }

    if (expr.endsWith(']')) {
      const openBracket = expr.lastIndexOf('[');
      if (openBracket > 0) {
        const target = evalExpr(expr.slice(0, openBracket), env);
        const keyRaw = expr.slice(openBracket + 1, -1).trim();
        if (keyRaw.includes(':')) {
          const [sRaw, eRaw] = keyRaw.split(':');
          if (Array.isArray(target) || typeof target === 'string') {
            const s = sRaw ? Number(evalExpr(sRaw, env)) : 0;
            const e = eRaw ? Number(evalExpr(eRaw, env)) : target.length;
            return target.slice(s, e);
          }
        }
        const idxVal = evalExpr(keyRaw, env);
        if (Array.isArray(target) || typeof target === 'string') {
          let idx = Number(idxVal);
          if (idx < 0) idx = target.length + idx;
          return target[idx] ?? null;
        }
        if (isPyDict(target)) {
          const k = pyToPrintString(idxVal);
          return target.entries.get(k) ?? null;
        }
      }
    }

    if (/^[a-zA-Z_]\w*$/.test(expr)) {
      return resolveVar(expr, env);
    }

    throw new Error(pyMsg.unknownExprError(expr));
  };

  const collectBlock = (blockNodes: PyNode[], startIdx: number, parentIndent: number): [PyNode[], number] => {
    const body: PyNode[] = [];
    let idx = startIdx;
    while (idx < blockNodes.length && blockNodes[idx].indent > parentIndent) {
      body.push(blockNodes[idx]);
      idx++;
    }
    return [body, idx];
  };

  const execBlock = (blockNodes: PyNode[], env: Record<string, PyValue>) => {
    let i = 0;
    while (i < blockNodes.length) {
      const node = blockNodes[i];
      const raw = node.raw;

      if (raw.startsWith('def ') && raw.endsWith(':')) {
        const match = raw.match(/^def\s+(\w+)\(([^)]*)\):$/);
        if (!match) throw new Error(pyMsg.syntaxErrorLine(node.line, raw));
        const fnName = match[1];
        const paramsStr = match[2].trim();
        const params = paramsStr
          ? splitTopLevel(paramsStr, ',').map(p => {
              const eqIdx = p.indexOf('=');
              if (eqIdx === -1) return { name: p.trim() };
              const name = p.slice(0, eqIdx).trim();
              const defaultVal = evalExpr(p.slice(eqIdx + 1).trim(), env);
              return { name, defaultVal };
            })
          : [];
        const [body, nextIdx] = collectBlock(blockNodes, i + 1, node.indent);
        env[fnName] = { __pyFunc: true, name: fnName, params, body };
        recordStep(
          node.line,
          env,
          pyMsg.defNote(fnName, params.some(p => p.defaultVal !== undefined))
        );
        i = nextIdx;
        continue;
      }

      if (raw === 'return' || raw.startsWith('return ')) {
        const expr = raw === 'return' ? 'None' : raw.slice(7).trim();
        const val = evalExpr(expr, env);
        recordStep(node.line, env, pyMsg.returnNote(formatPyValue(val)));
        throw new PyReturnSignal(val);
      }

      if (raw.startsWith('if ') && raw.endsWith(':')) {
        const branches: { condExpr: string | null; body: PyNode[]; line: number }[] = [];
        const firstCond = raw.slice(3, -1).trim();
        const [firstBody, afterFirst] = collectBlock(blockNodes, i + 1, node.indent);
        branches.push({ condExpr: firstCond, body: firstBody, line: node.line });
        let cursor = afterFirst;

        while (cursor < blockNodes.length && blockNodes[cursor].indent === node.indent) {
          const nextRaw = blockNodes[cursor].raw;
          if (nextRaw.startsWith('elif ') && nextRaw.endsWith(':')) {
            const c = nextRaw.slice(5, -1).trim();
            const [b, nxt] = collectBlock(blockNodes, cursor + 1, node.indent);
            branches.push({ condExpr: c, body: b, line: blockNodes[cursor].line });
            cursor = nxt;
          } else if (nextRaw === 'else:') {
            const [b, nxt] = collectBlock(blockNodes, cursor + 1, node.indent);
            branches.push({ condExpr: null, body: b, line: blockNodes[cursor].line });
            cursor = nxt;
            break;
          } else {
            break;
          }
        }

        for (const br of branches) {
          if (br.condExpr === null) {
            recordStep(br.line, env, pyMsg.elseNote);
            execBlock(br.body, env);
            break;
          }
          const ok = pyTruthy(evalExpr(br.condExpr, env));
          recordStep(br.line, env, pyMsg.condEvalNote(br.condExpr, ok));
          if (ok) {
            execBlock(br.body, env);
            break;
          }
        }
        i = cursor;
        continue;
      }

      if (raw.startsWith('for ') && raw.endsWith(':')) {
        const match = raw.match(/^for\s+(.+?)\s+in\s+(.+):$/);
        if (!match) throw new Error(pyMsg.syntaxErrorLine(node.line, raw));
        const varTarget = match[1].trim();
        const iterVal = evalExpr(match[2].trim(), env);
        const [body, nextIdx] = collectBlock(blockNodes, i + 1, node.indent);
        if (!Array.isArray(iterVal)) throw new Error(pyMsg.forNonIterableError(node.line));

        for (const item of iterVal) {
          if (varTarget.includes(',')) {
            const names = varTarget.split(',').map(s => s.trim());
            if (Array.isArray(item)) {
              names.forEach((n, k) => {
                env[n] = item[k] ?? null;
              });
            }
          } else {
            env[varTarget] = item;
          }
          recordStep(node.line, env, pyMsg.forIterNote(varTarget, formatPyValue(item)));
          execBlock(body, env);
        }
        i = nextIdx;
        continue;
      }

      if (raw.startsWith('while ') && raw.endsWith(':')) {
        const cond = raw.slice(6, -1).trim();
        const [body, nextIdx] = collectBlock(blockNodes, i + 1, node.indent);
        while (pyTruthy(evalExpr(cond, env))) {
          recordStep(node.line, env, pyMsg.whileTrueNote(cond));
          execBlock(body, env);
        }
        recordStep(node.line, env, pyMsg.whileDoneNote(cond));
        i = nextIdx;
        continue;
      }

      const augMatch = raw.match(/^([a-zA-Z_]\w*)\s*(\+=|-=|\*=)\s*(.+)$/);
      if (augMatch) {
        const [, varName, op, rhs] = augMatch;
        const cur = resolveVar(varName, env);
        const add = evalExpr(rhs, env);
        if (op === '+=') {
          env[varName] = Array.isArray(cur) && Array.isArray(add)
            ? [...cur, ...add]
            : typeof cur === 'string'
            ? cur + String(add)
            : Number(cur) + Number(add);
        } else if (op === '-=') {
          env[varName] = Number(cur) - Number(add);
        } else if (op === '*=') {
          env[varName] = Number(cur) * Number(add);
        }
        recordStep(node.line, env, pyMsg.augAssignNote(varName, formatPyValue(env[varName])));
        i++;
        continue;
      }

      let eqPos = -1;
      let quote: string | null = null;
      let depth = 0;
      for (let k = 0; k < raw.length; k++) {
        const ch = raw[k];
        if (quote) {
          if (ch === quote && raw[k - 1] !== '\\') quote = null;
          continue;
        }
        if (ch === '"' || ch === "'") { quote = ch; continue; }
        if (ch === '(' || ch === '[' || ch === '{') depth++;
        else if (ch === ')' || ch === ']' || ch === '}') depth--;
        if (depth === 0 && ch === '=' && raw[k + 1] !== '=' && !'!<>=+-*'.includes(raw[k - 1])) {
          eqPos = k;
          break;
        }
      }

      if (eqPos !== -1) {
        const lhs = raw.slice(0, eqPos).trim();
        const rhs = raw.slice(eqPos + 1).trim();
        const val = evalExpr(rhs, env);

        if (lhs.endsWith(']')) {
          const openB = lhs.lastIndexOf('[');
          const targetObj = evalExpr(lhs.slice(0, openB), env);
          const keyVal = evalExpr(lhs.slice(openB + 1, -1), env);
          if (Array.isArray(targetObj)) {
            targetObj[Number(keyVal)] = val;
          } else if (isPyDict(targetObj)) {
            targetObj.entries.set(pyToPrintString(keyVal), val);
          }
          recordStep(node.line, env, pyMsg.indexAssignNote(formatPyValue(val), lhs));
        } else if (lhs.includes(',')) {
          const targets = lhs.split(',').map(t => t.trim());
          if (Array.isArray(val)) {
            targets.forEach((t, idx) => { env[t] = val[idx] ?? null; });
          }
          recordStep(node.line, env, pyMsg.unpackNote(lhs));
        } else {
          env[lhs] = val;
          recordStep(node.line, env, pyMsg.assignNote(lhs, formatPyValue(val)));
        }
        i++;
        continue;
      }

      const val = evalExpr(raw, env);
      const isPrint = raw.startsWith('print(');
      recordStep(
        node.line,
        env,
        isPrint
          ? pyMsg.printNote(outputLines[outputLines.length - 1] ?? '')
          : pyMsg.exprNote(raw, val !== null ? formatPyValue(val) : null)
      );
      i++;
    }
  };

  try {
    execBlock(nodes, globalEnv);
    return {
      ok: true,
      language: 'python',
      logs: outputLines.map(text => ({ type: 'log', text })),
      durationMs: Math.round((performance.now() - start) * 10) / 10,
      traceSteps
    };
  } catch (err) {
    const raw = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      language: 'python',
      logs: outputLines.map(text => ({ type: 'log', text })),
      durationMs: Math.round((performance.now() - start) * 10) / 10,
      traceSteps,
      errorRaw: raw,
      errorFriendly: pyMsg.errorFriendlyPrefix(raw)
    };
  }
}

// ============================================================================
// 4. MOTOR SQL EM MEMÓRIA + TRACE DE ORDEM LÓGICA DE EXECUÇÃO
// ============================================================================

type SqlRow = Record<string, string | number | boolean | null>;

function evalSqlCondition(row: SqlRow, condRaw: string, sqlMsg: EngineMessages['sql']): boolean {
  const cond = condRaw.trim();
  if (!cond) return true;

  const orParts = splitSqlTopLevel(cond, 'OR');
  if (orParts.length > 1) {
    return orParts.some(p => evalSqlCondition(row, p, sqlMsg));
  }

  const andParts = splitSqlTopLevel(cond, 'AND');
  if (andParts.length > 1) {
    return andParts.every(p => evalSqlCondition(row, p, sqlMsg));
  }

  const clean = cond.startsWith('(') && cond.endsWith(')') ? cond.slice(1, -1).trim() : cond;

  const resolveField = (token: string): string | number | boolean | null => {
    const t = token.trim();
    if (/^NULL$/i.test(t)) return null;
    if (/^TRUE$/i.test(t)) return true;
    if (/^FALSE$/i.test(t)) return false;
    if (/^-?\d+(\.\d+)?$/.test(t)) return Number(t);
    if ((t.startsWith("'") && t.endsWith("'")) || (t.startsWith('"') && t.endsWith('"'))) {
      return t.slice(1, -1);
    }
    if (t in row) return row[t];
    const unprefixed = t.includes('.') ? t.split('.')[1] : t;
    if (unprefixed in row) return row[unprefixed];
    const suffixKey = Object.keys(row).find(k => k.endsWith(`.${unprefixed}`));
    if (suffixKey) return row[suffixKey];
    throw new Error(sqlMsg.colNotFoundJoinError(t));
  };

  const isNotNull = clean.match(/^(.+?)\s+IS\s+NOT\s+NULL$/i);
  if (isNotNull) return resolveField(isNotNull[1]) !== null;

  const isNull = clean.match(/^(.+?)\s+IS\s+NULL$/i);
  if (isNull) return resolveField(isNull[1]) === null;

  const inMatch = clean.match(/^(.+?)\s+(NOT\s+)?IN\s*\((.+)\)$/i);
  if (inMatch) {
    const val = resolveField(inMatch[1]);
    const list = inMatch[3].split(',').map(x => resolveField(x));
    const found = list.includes(val);
    return inMatch[2] ? !found : found;
  }

  const likeMatch = clean.match(/^(.+?)\s+(NOT\s+)?LIKE\s+(.+)$/i);
  if (likeMatch) {
    const val = String(resolveField(likeMatch[1]) ?? '');
    const pat = String(resolveField(likeMatch[3]) ?? '');
    const regex = new RegExp('^' + pat.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '.*').replace(/_/g, '.') + '$', 'i');
    const ok = regex.test(val);
    return likeMatch[2] ? !ok : ok;
  }

  const opMatch = clean.match(/^(.+?)\s*(!=|<>|>=|<=|=|>|<)\s*(.+)$/);
  if (opMatch) {
    const left = resolveField(opMatch[1]);
    const op = opMatch[2];
    const right = resolveField(opMatch[3]);
    if (left === null || right === null) return false;
    if (op === '=') return left === right;
    if (op === '!=' || op === '<>') return left !== right;
    if (op === '>') return Number(left) > Number(right);
    if (op === '<') return Number(left) < Number(right);
    if (op === '>=') return Number(left) >= Number(right);
    if (op === '<=') return Number(left) <= Number(right);
  }

  throw new Error(sqlMsg.invalidWhereError(cond));
}

function splitSqlTopLevel(text: string, kw: 'AND' | 'OR'): string[] {
  const parts: string[] = [];
  let depth = 0;
  let quote: string | null = null;
  let cur = '';
  const regex = new RegExp(`^\\s+${kw}\\s+`, 'i');

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quote) {
      cur += ch;
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === "'" || ch === '"') { quote = ch; cur += ch; continue; }
    if (ch === '(') depth++;
    else if (ch === ')') depth--;

    if (depth === 0) {
      const rest = text.slice(i);
      const m = rest.match(regex);
      if (m) {
        parts.push(cur.trim());
        cur = '';
        i += m[0].length - 1;
        continue;
      }
    }
    cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

export function runSqlInMemory(
  queryRaw: string,
  tables: SqlTableData[],
  messages: EngineMessages = FALLBACK_ENGINE_MESSAGES
): CodeForFunExecutionOutcome {
  const sqlMsg = messages.sql;
  const start = performance.now();
  const traceSteps: TraceStep[] = [];

  try {
    const cleaned = queryRaw
      .split('\n')
      .map(l => l.replace(/--.*$/, ''))
      .join(' ')
      .replace(/;\s*$/, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleaned) {
      return {
        ok: false,
        language: 'sql',
        logs: [],
        durationMs: 0,
        errorFriendly: sqlMsg.emptyQueryError
      };
    }

    const selectMatch = cleaned.match(
      /^SELECT\s+(DISTINCT\s+)?(.+?)\s+FROM\s+(.+?)(?:\s+WHERE\s+(.+?))?(?:\s+GROUP\s+BY\s+(.+?))?(?:\s+HAVING\s+(.+?))?(?:\s+ORDER\s+BY\s+(.+?))?(?:\s+LIMIT\s+(\d+))?$/i
    );

    if (!selectMatch) {
      return {
        ok: false,
        language: 'sql',
        logs: [],
        durationMs: Math.round(performance.now() - start),
        errorFriendly: sqlMsg.onlySelectError
      };
    }

    const isDistinct = Boolean(selectMatch[1]);
    const selectClause = selectMatch[2].trim();
    const fromClause = selectMatch[3].trim();
    const whereClause = selectMatch[4]?.trim();
    const groupByClause = selectMatch[5]?.trim();
    const havingClause = selectMatch[6]?.trim();
    const orderByClause = selectMatch[7]?.trim();
    const limitVal = selectMatch[8] ? Number(selectMatch[8]) : undefined;

    const joinSplit = fromClause
      .replace(/\s+(?=(?:INNER\s+JOIN|LEFT\s+(?:OUTER\s+)?JOIN)\s+)/gi, '\u0000')
      .replace(/(?<!INNER|LEFT|OUTER)\s+(?=JOIN\s+)/gi, '\u0000')
      .split('\u0000');
    const baseSpec = joinSplit[0].trim().match(/^(\w+)(?:\s+(?:AS\s+)?(\w+))?$/i);
    if (!baseSpec) throw new Error(sqlMsg.invalidFromError(joinSplit[0]));
    const baseTableName = baseSpec[1];
    const baseAlias = baseSpec[2] || baseTableName;
    const baseTable = tables.find(t => t.name.toLowerCase() === baseTableName.toLowerCase());
    if (!baseTable) {
      throw new Error(sqlMsg.tableNotFoundError(baseTableName, tables.map(t => t.name).join(', ')));
    }

    let workingRows: SqlRow[] = baseTable.rows.map(r => {
      const prefixed: SqlRow = { ...r };
      Object.entries(r).forEach(([k, v]) => {
        prefixed[`${baseAlias}.${k}`] = v;
        prefixed[`${baseTable.name}.${k}`] = v;
      });
      return prefixed;
    });

    traceSteps.push({
      stepNumber: 1,
      line: 1,
      phase: sqlMsg.fromPhase,
      variables: { [sqlMsg.varTable]: baseTable.name, [sqlMsg.varRows]: String(workingRows.length) },
      output: [],
      note: sqlMsg.fromStepNote(workingRows.length, baseTable.name)
    });

    for (let j = 1; j < joinSplit.length; j++) {
      const jMatch = joinSplit[j].match(/^(LEFT\s+(?:OUTER\s+)?JOIN|(?:INNER\s+)?JOIN)\s+(\w+)(?:\s+(?:AS\s+)?(\w+))?\s+ON\s+(.+)$/i);
      if (!jMatch) throw new Error(sqlMsg.invalidJoinError(joinSplit[j]));
      const isLeft = jMatch[1].toUpperCase().startsWith('LEFT');
      const joinTableName = jMatch[2];
      const joinAlias = jMatch[3] || joinTableName;
      const onClause = jMatch[4].trim();

      const joinTable = tables.find(t => t.name.toLowerCase() === joinTableName.toLowerCase());
      if (!joinTable) throw new Error(sqlMsg.joinTableNotFoundError(joinTableName));

      const nextRows: SqlRow[] = [];
      for (const leftRow of workingRows) {
        let matchedAny = false;
        for (const rightRaw of joinTable.rows) {
          const combined: SqlRow = { ...leftRow };
          Object.entries(rightRaw).forEach(([k, v]) => {
            if (!(k in combined)) combined[k] = v;
            combined[`${joinAlias}.${k}`] = v;
            combined[`${joinTable.name}.${k}`] = v;
          });
          if (evalSqlCondition(combined, onClause, sqlMsg)) {
            nextRows.push(combined);
            matchedAny = true;
          }
        }
        if (isLeft && !matchedAny) {
          const nullCombined: SqlRow = { ...leftRow };
          joinTable.columns.forEach(c => {
            if (!(c in nullCombined)) nullCombined[c] = null;
            nullCombined[`${joinAlias}.${c}`] = null;
            nullCombined[`${joinTable.name}.${c}`] = null;
          });
          nextRows.push(nullCombined);
        }
      }
      workingRows = nextRows;
      traceSteps.push({
        stepNumber: traceSteps.length + 1,
        line: 2,
        phase: isLeft ? sqlMsg.leftJoinPhase : sqlMsg.innerJoinPhase,
        variables: { [sqlMsg.varTable]: joinTable.name, [sqlMsg.varRows]: String(workingRows.length) },
        output: [],
        note: sqlMsg.joinStepNote(isLeft, workingRows.length)
      });
    }

    if (whereClause) {
      const before = workingRows.length;
      workingRows = workingRows.filter(r => evalSqlCondition(r, whereClause, sqlMsg));
      traceSteps.push({
        stepNumber: traceSteps.length + 1,
        line: 3,
        phase: sqlMsg.wherePhase,
        variables: { [sqlMsg.varFilter]: whereClause, [sqlMsg.varBefore]: String(before), [sqlMsg.varAfter]: String(workingRows.length) },
        output: [],
        note: sqlMsg.whereStepNote(whereClause, workingRows.length, before)
      });
    }

    const selectItems = splitTopLevel(selectClause, ',').map(item => {
      const asMatch = item.match(/^(.+?)\s+AS\s+(\w+)$/i);
      const expr = asMatch ? asMatch[1].trim() : item.trim();
      const alias = asMatch
        ? asMatch[2].trim()
        : expr.includes('.') && !expr.includes('(')
        ? expr.split('.')[1]
        : expr;
      return { expr, alias };
    });

    const hasAggregate = selectItems.some(s => /^(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(s.expr));

    const computeAggregate = (expr: string, groupRows: SqlRow[]): number | string | null => {
      const aggMatch = expr.match(/^(COUNT|SUM|AVG|MIN|MAX)\s*\(\s*(.+?)\s*\)$/i);
      if (!aggMatch) return null;
      const fn = aggMatch[1].toUpperCase();
      const arg = aggMatch[2].trim();
      if (fn === 'COUNT' && arg === '*') return groupRows.length;

      const vals = groupRows
        .map(r => (arg in r ? r[arg] : r[arg.split('.')[1] || arg]))
        .filter(v => v !== null && v !== undefined);

      if (fn === 'COUNT') return vals.length;
      if (fn === 'SUM') return vals.reduce<number>((acc, v) => acc + Number(v), 0);
      if (fn === 'AVG') {
        if (vals.length === 0) return 0;
        const sum = vals.reduce<number>((acc, v) => acc + Number(v), 0);
        return Math.round((sum / vals.length) * 100) / 100;
      }
      if (fn === 'MIN') return vals.length ? Math.min(...vals.map(Number)) : null;
      if (fn === 'MAX') return vals.length ? Math.max(...vals.map(Number)) : null;
      return null;
    };

    let projectedRows: SqlRow[] = [];
    let outColumns: string[] = [];

    if (groupByClause || hasAggregate) {
      const groupCols = groupByClause ? groupByClause.split(',').map(c => c.trim()) : [];
      const groups = new Map<string, SqlRow[]>();

      for (const row of workingRows) {
        const keyParts = groupCols.map(c => {
          const v = c in row ? row[c] : row[c.split('.')[1] || c];
          return String(v ?? 'NULL');
        });
        const key = keyParts.join('||');
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key)!.push(row);
      }

      if (groupCols.length === 0 && groups.size === 0) {
        groups.set('__all__', []);
      }

      if (groupByClause) {
        traceSteps.push({
          stepNumber: traceSteps.length + 1,
          line: 4,
          phase: sqlMsg.groupPhase,
          variables: { [sqlMsg.varGroups]: String(groups.size), [sqlMsg.varColumns]: groupByClause },
          output: [],
          note: sqlMsg.groupStepNote(groups.size, groupByClause)
        });
      }

      for (const [, gRows] of groups) {
        const sample = gRows[0] || {};
        const outRow: SqlRow = {};
        for (const item of selectItems) {
          if (/^(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(item.expr)) {
            outRow[item.alias] = computeAggregate(item.expr, gRows);
          } else {
            outRow[item.alias] = item.expr in sample ? sample[item.expr] : (sample[item.expr.split('.')[1] || item.expr] ?? null);
          }
        }
        if (!havingClause || evalSqlCondition(outRow, havingClause, sqlMsg)) {
          projectedRows.push(outRow);
        }
      }
      outColumns = selectItems.map(s => s.alias);
    } else {
      if (selectClause === '*') {
        const rawCols = baseTable.columns.filter(c => !c.includes('.'));
        const extraCols: string[] = [];
        if (workingRows[0]) {
          Object.keys(workingRows[0]).forEach(k => {
            if (!k.includes('.') && !rawCols.includes(k)) extraCols.push(k);
          });
        }
        outColumns = [...rawCols, ...extraCols];
        projectedRows = workingRows.map(r => {
          const cleanRow: SqlRow = {};
          outColumns.forEach(c => {
            cleanRow[c] = r[c] ?? null;
          });
          return cleanRow;
        });
      } else {
        outColumns = selectItems.map(s => s.alias);
        projectedRows = workingRows.map(r => {
          const cleanRow: SqlRow = {};
          for (const item of selectItems) {
            if (item.expr in r) {
              cleanRow[item.alias] = r[item.expr];
            } else {
              const short = item.expr.includes('.') ? item.expr.split('.')[1] : item.expr;
              if (short in r) cleanRow[item.alias] = r[short];
              else throw new Error(sqlMsg.colNotFoundSelectError(item.expr));
            }
          }
          return cleanRow;
        });
      }
    }

    if (isDistinct) {
      const seen = new Set<string>();
      projectedRows = projectedRows.filter(r => {
        const sig = JSON.stringify(r);
        if (seen.has(sig)) return false;
        seen.add(sig);
        return true;
      });
    }

    traceSteps.push({
      stepNumber: traceSteps.length + 1,
      line: 5,
      phase: sqlMsg.selectPhase,
      variables: { [sqlMsg.varColumns]: outColumns.join(', '), [sqlMsg.varRows]: String(projectedRows.length) },
      output: [],
      note: sqlMsg.selectStepNote(outColumns.join(', '), projectedRows.length)
    });

    if (orderByClause) {
      const orderSpecs = orderByClause.split(',').map(o => {
        const parts = o.trim().split(/\s+/);
        return { col: parts[0], desc: (parts[1] || '').toUpperCase() === 'DESC' };
      });
      projectedRows.sort((a, b) => {
        for (const spec of orderSpecs) {
          const va = a[spec.col] ?? a[spec.col.split('.')[1] || spec.col];
          const vb = b[spec.col] ?? b[spec.col.split('.')[1] || spec.col];
          if (va === vb) continue;
          if (va === null) return 1;
          if (vb === null) return -1;
          const cmp = typeof va === 'number' && typeof vb === 'number' ? va - vb : String(va).localeCompare(String(vb));
          return spec.desc ? -cmp : cmp;
        }
        return 0;
      });
      traceSteps.push({
        stepNumber: traceSteps.length + 1,
        line: 6,
        phase: sqlMsg.orderPhase,
        variables: { [sqlMsg.varOrder]: orderByClause },
        output: [],
        note: sqlMsg.orderStepNote(orderByClause)
      });
    }

    if (limitVal !== undefined) {
      projectedRows = projectedRows.slice(0, limitVal);
      traceSteps.push({
        stepNumber: traceSteps.length + 1,
        line: 7,
        phase: sqlMsg.limitPhase,
        variables: { [sqlMsg.varLimit]: String(limitVal) },
        output: [],
        note: sqlMsg.limitStepNote(limitVal)
      });
    }

    const sqlResult: SqlQueryResult = {
      columns: outColumns,
      rows: projectedRows,
      rowCount: projectedRows.length
    };

    return {
      ok: true,
      language: 'sql',
      logs: [{ type: 'info', text: sqlMsg.successInfoLog(projectedRows.length) }],
      sqlResult,
      traceSteps,
      durationMs: Math.round((performance.now() - start) * 10) / 10
    };
  } catch (err) {
    const raw = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      language: 'sql',
      logs: [],
      traceSteps,
      durationMs: Math.round((performance.now() - start) * 10) / 10,
      errorRaw: raw,
      errorFriendly: raw
    };
  }
}

export async function executeCodeForFun(
  code: string,
  language: CodeForFunLanguage,
  sqlTables: SqlTableData[],
  messages: EngineMessages = FALLBACK_ENGINE_MESSAGES
): Promise<CodeForFunExecutionOutcome> {
  if (language === 'javascript' || language === 'typescript') {
    return runJsTsInSandbox(code, language, messages);
  }
  if (language === 'python') {
    return runPythonSimulation(code, messages);
  }
  return runSqlInMemory(code, sqlTables, messages);
}
