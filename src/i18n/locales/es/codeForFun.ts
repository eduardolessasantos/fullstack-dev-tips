import { CodeForFunLocale } from '../../types.ts';

const codeForFunEs: CodeForFunLocale = {
  ui: {
    kickerLeft: 'Laboratorio Interactivo',
    kickerRight: 'Código en la Práctica',
    title: 'Code for Fun',
    subtitle:
      'Escribe, ejecuta, rompe y descubre por qué funcionan las cosas en JavaScript, TypeScript, Python y SQL — con humor dev y explicaciones al grano.',
    xpLabel: 'XP',
    levelPrefix: 'Nv.',
    streakLabel: 'Racha',
    completedLabel: 'Completados',
    badgesBtn: 'Insignias',
    badgesTitleAttr: 'Ver logros desbloqueados',
    soundOnTitle: 'Efectos de sonido activados (clic para silenciar)',
    soundOffTitle: 'Efectos de sonido desactivados (clic para activar)',
    soundMuteAria: 'Silenciar efectos de sonido',
    soundUnmuteAria: 'Activar efectos de sonido',
    nextLevelBefore: 'Siguiente nivel en',
    nextLevelAfter: 'XP',
    maxLevelReached: '¡Nivel máximo alcanzado!',
    badgesPanelTitle: 'Logros del Laboratorio',
    unlockedLabel: 'Desbloqueada',
    lockedLabel: 'Bloqueada',
    filterModeLabel: 'Modo',
    filterTrackLabel: 'Ruta',
    filterLangLabel: 'Lenguaje',
    filterModeAria: 'Filtrar por modo',
    filterTrackAria: 'Filtrar por ruta',
    filterLangAria: 'Filtrar por lenguaje',
    modeTabAll: 'Todos',
    trackFilterOptions: {
      all: 'Todas',
      warmup: 'Calentamiento',
      'hands-on': 'Manos a la Obra',
      'senior-trap': 'Trampas Senior'
    },
    langFilterOptions: {
      all: 'Todos',
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      python: 'Python',
      sql: 'SQL'
    },
    challengesCountSuffix: 'retos',
    completedTag: 'Completado',
    estimatedMinSuffix: 'min',
    minPrefix: '~',
    emptyFilterMsg: 'Ningún reto coincide con estos filtros.',
    clearFiltersBtn: 'Limpiar filtros',
    sqlTablesShow: 'Ver Tablas',
    sqlTablesHide: 'Ocultar Tablas',
    sqlTablesHeading: 'Tablas disponibles en memoria:',
    sqlTablesColumnsLabel: 'Columnas:',
    editorShortcutHint: 'Ctrl+Enter / Cmd+Enter para ejecutar',
    editorAriaLabel: 'Editor de código:',
    runBtnRunning: 'Ejecutando...',
    runBtnIdle: 'Ejecutar Código',
    stepModeBtn: 'Paso a Paso',
    hintBtnPrefix: 'Pista',
    resetBtn: 'Reiniciar',
    resetTitle: 'Restaurar código inicial',
    loadSolutionBtn: 'Ver Solución',
    loadSolutionTitle: 'Cargar solución comentada en el editor',
    hintsHeader: 'Pistas Progresivas',
    canvasTitle: 'Escenario Visual (Canvas API)',
    canvasInitialMsg: '¡Haz clic en Ejecutar para dibujar!',
    sqlResultTitle: 'Resultado de la Consulta SQL',
    consoleTitle: 'Consola / Salida',
    emptyOutputPrompt: 'Haz clic en "Ejecutar Código" (o pulsa Ctrl+Enter) para ver la salida en vivo.',
    errorBannerTitle: '¡Ups, algo falló durante la ejecución!',
    sqlEmptyRows: 'Consulta ejecutada, pero devolvió 0 filas.',
    emptyLogsNotice: '(Ejecución finalizada sin salida de texto en consola)',
    traceSqlTitle: 'Orden Lógico de Ejecución SQL',
    traceMemTitle: 'Inspector de Memoria Viva',
    traceStepOf: 'Paso',
    tracePhasePrefix: 'Fase:',
    traceLinePrefix: 'Línea:',
    traceRestartTitle: 'Reiniciar traza',
    tracePrevTitle: 'Paso anterior',
    tracePlayTitle: 'Reproducir automáticamente',
    tracePauseTitle: 'Pausar',
    traceNextTitle: 'Siguiente paso',
    traceMemStateLabel: 'Estado de Variables en Memoria',
    validationTitle: 'Validación Automática',
    ahaPrefix: '¿Por qué funciona?',
    celebrateTitle: '¡Reto Completado!',
    celebrateBadgePrefix: 'Nueva insignia:',
    celebrateXpPrefix: '+{xp} XP',
    adLabel: 'Publicidad',
    syntaxCheckFailLabel: 'Ejecución sin errores de sintaxis',
    syntaxCheckFailDetail: 'Corrige el error mostrado arriba para validar las pruebas.'
  },
  modeLabels: {
    challenge: 'Retos Guiados',
    'bug-hunt': 'Caza de Bugs',
    sandbox: 'Sandbox Libre'
  },
  trackLabels: {
    warmup: 'Calentamiento Divertido',
    'hands-on': 'Manos a la Obra',
    'senior-trap': 'Trampas Senior'
  },
  langLabels: {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python (Trace)',
    sql: 'SQL (En Memoria)'
  },
  levelTitles: [
    { maxXp: 100, level: 1, title: 'Aprendiz Curioso', nextLevelXp: 100, currentFloorXp: 0 },
    { maxXp: 250, level: 2, title: 'Maestro del Console.log', nextLevelXp: 250, currentFloorXp: 100 },
    { maxXp: 450, level: 3, title: 'Domador de Bugs', nextLevelXp: 450, currentFloorXp: 250 },
    { maxXp: 700, level: 4, title: 'Arquitecto del Event Loop', nextLevelXp: 700, currentFloorXp: 450 },
    { maxXp: Number.POSITIVE_INFINITY, level: 5, title: 'Leyenda del Deploy en Viernes', nextLevelXp: 1000, currentFloorXp: 700 }
  ],
  badges: [
    {
      id: 'first-spark',
      title: 'Primer Console.log',
      description: 'Completaste tu primer reto o caza de bugs en el laboratorio.',
      iconName: 'terminal'
    },
    {
      id: 'bug-hunter',
      title: 'Exterminador de Bugs',
      description: 'Resolviste 2 retos en el modo Caza de Bugs.',
      iconName: 'bug'
    },
    {
      id: 'streak-3',
      title: 'Racha Imparable',
      description: 'Acertaste 3 retos seguidos sin errores.',
      iconName: 'flame'
    },
    {
      id: 'polyglot',
      title: 'Políglota Curioso',
      description: 'Completaste retos en al menos 2 lenguajes distintos.',
      iconName: 'sparkles'
    },
    {
      id: 'sql-master',
      title: 'Maestro de los Joins',
      description: 'Dominaste una consulta SQL en la base en memoria.',
      iconName: 'database'
    },
    {
      id: 'senior-survivor',
      title: 'Superviviente de Trampas',
      description: 'Superaste un reto de la ruta Trampas Senior.',
      iconName: 'trophy'
    }
  ],
  sqlTableDescriptions: {
    devs_e_cafes: 'Registro del equipo de ingeniería y su consumo diario de cafeína.',
    bugs_producao: 'Incidentes divertidos registrados el último viernes a las 17:55.',
    pedidos_pizza: 'Pedidos oficiales de la squad durante la sprint review.'
  },
  items: {
    'cf-js-fizzbuzz-cafe': {
      title: 'FizzBuzz del Café Matutino',
      funnyHook: 'Nada de Fizz y Buzz aburridos — ¡aquí medimos la productividad en tazas de café y deploys!',
      prompt:
        'Haz un bucle del 1 al 15 e imprime con console.log: "¡Café en Deploy!" para múltiplos de 3 y 5, "Café" para múltiplos de 3, "Deploy" para múltiplos de 5, o el número en los demás casos.',
      starterCode: `// Misión: ¡cuenta del 1 al 15 e imprime el ritmo del equipo!
for (let i = 1; i <= 15; i++) {
  // Pista: comprueba primero si es múltiplo de 3 Y 5 (i % 15 === 0)
  if (i % 3 === 0) {
    console.log("Café");
  } else {
    console.log(i);
  }
}`,
      solutionCode: `for (let i = 1; i <= 15; i++) {
  if (i % 15 === 0) {
    console.log("¡Café en Deploy!");
  } else if (i % 3 === 0) {
    console.log("Café");
  } else if (i % 5 === 0) {
    console.log("Deploy");
  } else {
    console.log(i);
  }
}`,
      hints: [
        'Usa el operador módulo `%`: si `i % 5 === 0`, el número es divisible por 5.',
        '¡El orden de los `if` importa! Si validas `i % 3 === 0` antes que `i % 15 === 0`, el 15 caerá en "Café" antes de tiempo.',
        'Estructura completa: `if (i % 15 === 0) ... else if (i % 3 === 0) ... else if (i % 5 === 0) ... else ...`'
      ],
      ahaTitle: '¡El orden de los `if` lo cambia todo en la lógica!',
      ahaExplanation: [
        'El número 15 es divisible por 3 y por 5 al mismo tiempo. Poner la condición más específica (`i % 15 === 0`) arriba evita que la regla general capture el caso especial antes de tiempo.',
        '¡Exactamente esta idea aplica en rutas de API, middlewares y reglas de descuentos!'
      ],
      expectedStrings: {
        fizz: 'Café',
        buzz: 'Deploy',
        fizzbuzz: '¡Café en Deploy!',
        empty: 'vacío'
      },
      checkLabels: [
        'Imprimió exactamente 15 líneas (del 1 al 15)',
        'Múltiplos de 3, 5 y 15 correctos ("Café", "Deploy", "¡Café en Deploy!")'
      ],
      checkDetailsPass: ['15 líneas emitidas en consola.', '¡Secuencia perfecta!'],
      checkDetailsFail: ['Se emitieron {count} líneas.', 'El elemento 15 salió como "{val}".']
    },
    'cf-ts-tipagem-rpg': {
      title: 'Calculadora de Daño en TypeScript',
      funnyHook: 'Tu heroína Kira entró en la mazmorra de producción, pero el cálculo de daño crítico no suma su arma.',
      prompt:
        'Completa la función tipada `calcularDanio(heroe: Heroe, critico: boolean): number`. Si `critico` es true, devuelve `(ataque + arma) * 2`; de lo contrario, `ataque + arma`. Luego imprime el daño para Kira (esperado: 140).',
      starterCode: `interface Heroe {
  nombre: string;
  ataque: number;
  arma: number;
}

function calcularDanio(heroe: Heroe, critico: boolean): number {
  // ¡Corrige el cálculo abajo!
  const base = heroe.ataque;
  return critico ? base * 2 : base;
}

const kira: Heroe = { nombre: "Kira", ataque: 45, arma: 25 };
const danio = calcularDanio(kira, true);
console.log("Daño de Kira:", danio);`,
      solutionCode: `interface Heroe {
  nombre: string;
  ataque: number;
  arma: number;
}

function calcularDanio(heroe: Heroe, critico: boolean): number {
  const base = heroe.ataque + heroe.arma;
  return critico ? base * 2 : base;
}

const kira: Heroe = { nombre: "Kira", ataque: 45, arma: 25 };
const danio = calcularDanio(kira, true);
console.log("Daño de Kira:", danio);`,
      hints: [
        '¡Fíjate en que `heroe.arma` quedó fuera de la variable `base`!',
        'Suma `heroe.ataque + heroe.arma` antes de multiplicar por 2 cuando `critico` sea true.',
        'Con `ataque: 45` y `arma: 25`, la base es `70` y el crítico lo duplica a `140`.'
      ],
      ahaTitle: '¡Las interfaces dejan los contratos evidentes incluso sin ejecutar!',
      ahaExplanation: [
        'La interfaz `Heroe` documenta al instante qué campos existen (`nombre`, `ataque`, `arma`), evitando olvidar propiedades o escribir `heroe.fuerza` por error.',
        'En el navegador, las anotaciones de TypeScript se eliminan al transpilar — por eso este laboratorio quita los tipos y ejecuta el JavaScript resultante en milisegundos.'
      ],
      expectedStrings: { empty: 'vacía' },
      checkLabels: [
        'Incluyó el bono del arma en el cálculo crítico (140)',
        'Mantuvo el log informativo con Kira'
      ],
      checkDetailsPass: ['¡Daño crítico calculado en 140!', 'Nombre mostrado correctamente.'],
      checkDetailsFail: ['Salida actual: "{output}"', 'Mantén "Kira" en el console.log.']
    },
    'cf-py-ranking-memes': {
      title: 'Filtro de Cafeína en Python (Con Traza)',
      funnyHook: 'RRHH quiere saber cuántas tazas EXTRA (por encima de 2 por persona) se tomaron en el sprint.',
      prompt:
        'Corrige el bucle `for` en Python para sumar solo el excedente sobre 2 tazas de cada elemento en `tazas`, imprimiendo `Total extra: 6`. ¡Pulsa "Paso a Paso" para ver cada variable cambiar!',
      starterCode: `tazas = [1, 4, 2, 5, 3]
extra = 0

for q in tazas:
    # Si q es mayor que 2, ¡suma (q - 2) a extra!
    if q > 10:
        extra += q - 2

print(f"Total extra: {extra}")`,
      solutionCode: `tazas = [1, 4, 2, 5, 3]
extra = 0

for q in tazas:
    if q > 2:
        extra += q - 2

print(f"Total extra: {extra}")`,
      hints: [
        'La condición `if q > 10:` nunca es verdadera porque nadie tomó más de 10 cafés.',
        'Cambia `if q > 10:` por `if q > 2:`.',
        'Sumando: 4-2 = 2, 5-2 = 3, 3-2 = 1 → total `2 + 3 + 1 = 6`!'
      ],
      ahaTitle: '¡Visualizar la memoria línea por línea elimina bugs invisibles!',
      ahaExplanation: [
        'Al pulsar "Paso a Paso", ves exactamente los valores de `q` y `extra` en cada iteración — detectando al instante por qué `if q > 10:` nunca entraba al bloque.',
        'En Python real, f-strings como `f"Total extra: {extra}"` hacen el formato muy legible sin concatenar `+ str(extra)`.'
      ],
      expectedStrings: { totalLine: 'Total extra: 6', empty: 'nada' },
      checkLabels: ['Calculó e imprimió "Total extra: 6"'],
      checkDetailsPass: ['Suma exacta: (4-2) + (5-2) + (3-2) = 6!'],
      checkDetailsFail: ['Imprimió: "{output}"']
    },
    'cf-sql-pizzaria-top': {
      title: 'Ranking del Viernes en la Pizzería',
      funnyHook: '¡Hora de dividir la cuenta de la sprint review! Lista los pedidos en grupo (2 o más pizzas) del más caro al más barato.',
      prompt:
        'Escribe una consulta sobre `pedidos_pizza` seleccionando `cliente, sabor, valor_total` donde `quantidade >= 2`, ordenando por mayor `valor_total` (`DESC`).',
      starterCode: `-- Pista: revisa las columnas haciendo clic en "Ver Tablas"
SELECT cliente, sabor, valor_total
FROM pedidos_pizza
WHERE quantidade >= 5
ORDER BY valor_total ASC;`,
      solutionCode: `SELECT cliente, sabor, valor_total
FROM pedidos_pizza
WHERE quantidade >= 2
ORDER BY valor_total DESC;`,
      hints: [
        'El filtro actual `quantidade >= 5` no devuelve nada porque el mayor pedido fue de 3 pizzas.',
        'Cambia el filtro a `WHERE quantidade >= 2`.',
        'Para mostrar el más caro arriba, cambia `ASC` por `DESC` en `ORDER BY valor_total`.'
      ],
      ahaTitle: '¡SQL ejecuta el WHERE mucho antes que el ORDER BY!',
      ahaExplanation: [
        'Mira la traza lógica: primero lee la tabla (`FROM`), descarta pedidos individuales (`WHERE`), proyecta 3 columnas (`SELECT`) y al final ordena (`ORDER BY`).',
        'Como `WHERE` filtra antes de ordenar, ¡cuanto mejor sea tu filtro e índices, menos filas ordena el motor!'
      ],
      expectedStrings: { empty: 'ninguna' },
      checkLabels: [
        'Devolvió las columnas cliente, sabor y valor_total',
        'Filtró pedidos con quantidade >= 2 (3 pedidos) ordenados por mayor valor'
      ],
      checkDetailsPass: ['Columnas correctas.', '¡Carla (186), Diego (128) y Ana (118) en el podio!'],
      checkDetailsFail: [
        'Columnas devueltas: {cols}',
        'Devolvió {count} fila(s); esperado: Carla, Diego, Ana.'
      ]
    },
    'cf-bug-js-soma-string': {
      title: 'El Misterio de "100" + "20" = "10020"',
      funnyHook: 'Un cliente compró un teclado de 100 con 20 de envío... ¡y el sistema cobró 10.020!',
      prompt:
        '¡El `<input>` envió `"20"` como string! Corrige `sumarCarrito(precio, envio)` para convertir ambos a número y devolver `120` (como number).',
      starterCode: `function sumarCarrito(precio, envio) {
  // BUG: en JS, ¡número + string se convierte en concatenación!
  return precio + envio;
}

const total = sumarCarrito(100, "20");
console.log("Total:", total, "| Tipo:", typeof total);
return total;`,
      solutionCode: `function sumarCarrito(precio, envio) {
  return Number(precio) + Number(envio);
}

const total = sumarCarrito(100, "20");
console.log("Total:", total, "| Tipo:", typeof total);
return total;`,
      hints: [
        'En JavaScript, el operador `+` sirve tanto para sumar números como para unir texto.',
        'Convierte ambos parámetros con `Number(precio) + Number(envio)`.',
        'Si todo sale bien, verás `Total: 120 | Tipo: number`.'
      ],
      ahaTitle: '¡La coerción implícita es la trampa clásica de JavaScript!',
      ahaExplanation: [
        'Cuando un lado del `+` es string (`"20"`), JavaScript convierte el otro lado en texto y los pega: `"100" + "20" = "10020"`.',
        'Con `Number(...)` explícito (o validación Zod/TypeScript en la entrada), ¡evitas sustos en el checkout!'
      ],
      checkLabels: ['Devolvió el valor numérico 120 (en vez de "10020")'],
      checkDetailsPass: ['¡Bug aplastado! Valor 120 como number.'],
      checkDetailsFail: ['Resultado actual: {ret} ({log})']
    },
    'cf-bug-py-lista-fantasma': {
      title: 'La Mochila Compartida en Python',
      funnyHook: 'Ana metió su portátil en su mochila, ¡pero Bruno abrió la suya y encontró el portátil de Ana dentro!',
      prompt:
        'Ejecuta para ver el bug en vivo: `mochila=[]` como valor por defecto hace que todas las llamadas compartan LA MISMA lista en memoria. Corrige usando `mochila=None` y creando `[]` dentro de la función.',
      starterCode: `def agregar_item(item, mochila=[]):
    mochila.append(item)
    return mochila

ana = agregar_item("Portátil")
bruno = agregar_item("Auriculares")

print("Ana:", ana)
print("Bruno:", bruno)`,
      solutionCode: `def agregar_item(item, mochila=None):
    if mochila is None:
        mochila = []
    mochila.append(item)
    return mochila

ana = agregar_item("Portátil")
bruno = agregar_item("Auriculares")

print("Ana:", ana)
print("Bruno:", bruno)`,
      hints: [
        'En Python, los argumentos por defecto (`mochila=[]`) se crean UNA sola vez cuando se lee `def`, ¡no en cada llamada!',
        'Cambia la firma a `def agregar_item(item, mochila=None):`.',
        'Dentro de la función añade:\n`if mochila is None:\n    mochila = []`'
      ],
      ahaTitle: '¡Los argumentos por defecto en Python se evalúan en `def`, no al llamar!',
      ahaExplanation: [
        'Es una de las preguntas más famosas de entrevistas senior en Python. Como listas (`[]`) y diccionarios (`{}`) son mutables, usarlos como valor por defecto oculta un estado compartido.',
        'La convención pythónica oficial es usar siempre `None` e instanciar una lista nueva dentro del cuerpo.'
      ],
      expectedStrings: {
        anaLine: "Ana: ['Portátil']",
        brunoLine: "Bruno: ['Auriculares']",
        empty: 'vacía'
      },
      checkLabels: [
        "Ana quedó solo con ['Portátil']",
        "Bruno quedó solo con ['Auriculares']"
      ],
      checkDetailsPass: ['Mochila de Ana aislada.', '¡Mochila de Bruno aislada!'],
      checkDetailsFail: ['Salida de Ana: {out}', 'Salida de Bruno: {out}']
    },
    'cf-bug-js-event-loop': {
      title: 'Carrera Loca en el Event Loop',
      funnyHook: 'Alguien intentó imprimir 1, 2, 3, 4 usando setTimeout y Promise... ¡y la cola salió desordenada!',
      prompt:
        'Ejecuta el código inicial para ver el orden real del Event Loop (`1`, `4`, `3`, `2`). Luego corrígelo con `async/await` para imprimir `1`, `2`, `3`, `4` en orden exacto.',
      starterCode: `// Ejecuta una vez para ver el orden real: 1 -> 4 -> 3 -> 2
// Después usa await / Promises para imprimir 1, 2, 3, 4 en secuencia.
console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

Promise.resolve().then(() => {
  console.log(3);
});

console.log(4);`,
      solutionCode: `console.log(1);

await new Promise(resolve => {
  setTimeout(() => {
    console.log(2);
    resolve();
  }, 0);
});

await Promise.resolve().then(() => {
  console.log(3);
});

console.log(4);`,
      hints: [
        'El código síncrono (`1` y `4`) siempre se ejecuta antes que cualquier callback asíncrono.',
        '`Promise.then` va a la cola de Microtasks (alta prioridad), mientras que `setTimeout` va a Macrotasks (menor prioridad).',
        'Envuelve el `setTimeout` en `await new Promise(r => setTimeout(() => { console.log(2); r(); }, 0))` y usa `await` antes de la Promise de `3`.'
      ],
      ahaTitle: 'Call Stack → Microtasks (Promises) → Macrotasks (setTimeout)',
      ahaExplanation: [
        'Incluso con `0ms`, un `setTimeout` nunca adelanta a una `Promise` ya resuelta. El Event Loop solo toma la siguiente Macrotask cuando el Call Stack y toda la cola de Microtasks están vacías.',
        'Dominar esta jerarquía evita race conditions difíciles en React, Node.js y animaciones!'
      ],
      checkLabels: ['Imprimió exactamente 1, 2, 3, 4 en orden'],
      checkDetailsPass: ['¡Event Loop domado con éxito!'],
      checkDetailsFail: ['Orden actual: [{order}]']
    },
    'cf-bug-sql-null-trap': {
      title: 'La Desaparición del Becario (Trampa del NULL)',
      funnyHook: 'Diego no toma café (`tipo_cafe` es NULL) ¡y la consulta actual lo borró silenciosamente del informe!',
      prompt:
        'En SQL, `tipo_cafe != \'Descafeinado\'` devuelve UNKNOWN para filas `NULL`. Corrige la consulta sobre `devs_e_cafes` para devolver los 4 devs que NO toman descafeinado (incluido Diego con NULL).',
      starterCode: `-- BUG: ¡Diego tiene tipo_cafe = NULL y desaparece del resultado!
SELECT nome, nivel, tipo_cafe
FROM devs_e_cafes
WHERE tipo_cafe != 'Descafeinado';`,
      solutionCode: `SELECT nome, nivel, tipo_cafe
FROM devs_e_cafes
WHERE tipo_cafe != 'Descafeinado' OR tipo_cafe IS NULL;`,
      hints: [
        'En SQL, `NULL` no es texto vacío: significa "desconocido". ¡Cualquier `NULL != "algo"` resulta en UNKNOWN!',
        'Para incluir nulos explícitamente, usa `IS NULL` (nunca `= NULL`).',
        '¡Añade `OR tipo_cafe IS NULL` en tu cláusula `WHERE`!'
      ],
      ahaTitle: 'En SQL, `NULL = NULL` no es verdadero — ¡es UNKNOWN!',
      ahaExplanation: [
        'La lógica booleana de SQL tiene tres valores: `TRUE`, `FALSE` y `UNKNOWN`. Como `WHERE` solo conserva filas donde la expresión es `TRUE`, ¡las filas con `NULL` se descartan en silencio!',
        'Por eso existen `IS NULL` e `IS NOT NULL`: un detalle que salva reportes financieros todos los días.'
      ],
      checkLabels: [
        'Incluyó a Diego (tipo_cafe NULL) en el resultado',
        'Mantuvo los 4 devs que no toman Descafeinado (excluyó a Elena)'
      ],
      checkDetailsPass: ['¡Diego apareció!', '¡Ana, Bruno, Carla y Diego listados!'],
      checkDetailsFail: [
        'Diego sigue desaparecido por culpa de NULL.',
        'Devolvió {count} fila(s): {names}'
      ]
    },
    'cf-sandbox-js-canvas': {
      title: 'Arte Generativo en Canvas con JS',
      funnyHook: '¡Usa la API `draw` para dibujar constelaciones, espirales o gráficos directo en el escenario visual!',
      prompt:
        'Experimenta libremente con `draw.clear()`, `draw.circle(x, y, r, color)`, `draw.rect(x, y, w, h, color)`, `draw.line(x1, y1, x2, y2, color)` y `draw.text(txt, x, y, color)`. ¡Cambia el código y mira cómo cobra vida!',
      starterCode: `// Escenario Canvas 360x220 — ¡cambia números, colores y bucles!
draw.clear("#090d16");

const colores = ["#22d3ee", "#38bdf8", "#818cf8", "#c084fc", "#34d399"];

for (let i = 0; i < 18; i++) {
  const angulo = i * 0.45;
  const radio = 12 + i * 4.5;
  const x = 180 + Math.cos(angulo) * radio;
  const y = 110 + Math.sin(angulo) * (radio * 0.72);
  const color = colores[i % colores.length];

  draw.line(180, 110, x, y, "rgba(148, 163, 184, 0.25)", 1);
  draw.circle(x, y, 4 + (i % 5), color);
}

draw.text("Code for Fun ✨", 122, 204, "#e2e8f0", 13);
console.log("¡Espiral generada con 18 nodos!");`,
      solutionCode: `draw.clear("#090d16");
draw.circle(180, 110, 48, "#22d3ee");
draw.text("¡Arte listo!", 142, 115, "#020617", 14);`,
      hints: [
        'El escenario mide 360px de ancho por 220px de alto.',
        'Prueba cambiar `Math.cos(angulo)` por `Math.cos(angulo * 2)` para formar pétalos geométricos.'
      ],
      ahaTitle: 'Matemáticas + Bucles = ¡Arte Visual Instantáneo!',
      ahaExplanation: [
        'Seno y coseno convierten un simple contador `i` en órbitas, espirales y ondas suaves.',
        'Prueba alterar el multiplicador del ángulo o el paso del radio para ver patrones nuevos en tiempo real.'
      ]
    },
    'cf-sandbox-py-trace': {
      title: 'Laboratorio Python: Memoria Viva',
      funnyHook: '¡Escribe bucles, list comprehensions y funciones y observa cada variable cambiar en el inspector!',
      prompt:
        'Sandbox libre de Python con simulador paso a paso. Prueba funciones, diccionarios, bucles y list comprehensions y pulsa "Paso a Paso" para inspeccionar la memoria línea a línea.',
      starterCode: `# ¡Prueba list comprehensions, diccionarios y bucles en vivo!
squad = ["Ana", "Bruno", "Carla"]
puntos = {"Ana": 120, "Bruno": 95, "Carla": 150}

doble = [puntos[nombre] * 2 for nombre in squad]
print("Doble de puntos:", doble)

campeon = ""
mayor = 0
for dev in squad:
    if puntos[dev] > mayor:
        mayor = puntos[dev]
        campeon = dev

print(f"Líder del sprint: {campeon} con {mayor} pts!")`,
      solutionCode: `print("¡Usa este espacio para experimentar con Python!")`,
      hints: [
        'Puedes crear funciones con `def`, usar `range(1, 10)`, `sum(...)`, `len(...)` y `sorted(...)`.',
        'Haz clic en "Paso a Paso" para avanzar o retroceder línea a línea.'
      ],
      ahaTitle: 'Las List Comprehensions condensan bucles sin perder legibilidad',
      ahaExplanation: [
        'La expresión `[puntos[nombre] * 2 for nombre in squad]` transforma una lista en una sola línea expresiva — una de las funciones más queridas de Python.'
      ]
    },
    'cf-sandbox-sql-lab': {
      title: 'SQL Playground: Devs, Cafés y Bugs',
      funnyHook: '¡Cruza el equipo de desarrollo con los bugs del viernes usando JOIN, GROUP BY y COUNT!',
      prompt:
        'Consulta libremente `devs_e_cafes`, `bugs_producao` y `pedidos_pizza`. Prueba `INNER JOIN`, `LEFT JOIN`, `COUNT(*)`, `SUM(...)`, `GROUP BY` y `ORDER BY`.',
      starterCode: `-- ¿Quién resolvió más bugs en producción?
SELECT d.nome, d.nivel, COUNT(b.id) AS total_bugs
FROM devs_e_cafes d
LEFT JOIN bugs_producao b ON d.id = b.dev_id
GROUP BY d.nome, d.nivel
ORDER BY total_bugs DESC;`,
      solutionCode: `SELECT d.nome, d.nivel, COUNT(b.id) AS total_bugs
FROM devs_e_cafes d
LEFT JOIN bugs_producao b ON d.id = b.dev_id
GROUP BY d.nome, d.nivel
ORDER BY total_bugs DESC;`,
      hints: [
        'Cambia `LEFT JOIN` por `INNER JOIN` para ver quién desaparece si tiene 0 bugs.',
        'Haz clic en "Ver Tablas" para consultar todas las columnas disponibles en las 3 tablas.'
      ],
      ahaTitle: 'COUNT(columna) ignora NULLs — ¡y eso es un superpoder!',
      ahaExplanation: [
        'Con `LEFT JOIN`, los devs sin bugs quedan con `b.id = NULL`. Como `COUNT(b.id)` ignora los `NULL`, devuelve `0` correctamente — mientras `COUNT(*)` contaría la fila como `1`.'
      ]
    }
  },
  engineMessages: {
    timeoutError: '¡Ups! Tu código tardó demasiado (> 1.5s). ¿Habrá algún bucle infinito escondido?',
    timeoutRaw: 'Timeout: Bucle infinito detectado (> 1500ms)',
    isNotDefinedError: name =>
      `¡Ups! "${name}" no fue declarado antes de usarse. Revisa la ortografía o decláralo con let/const.`,
    isNotFunctionError:
      'Intentaste llamar algo como función `()`, pero ese valor no es una función (puede ser undefined, número u objeto).',
    nullPropertyError:
      'Intento de leer una propiedad de null o undefined. ¿Qué tal usar `?.` (optional chaining) o validar antes?',
    constAssignError:
      'Intentaste reasignar una variable `const`. Si necesita cambiar, ¡cámbiala a `let`!',
    syntaxError: raw => `Error de sintaxis: ¿faltó cerrar algún paréntesis, llave o comilla? (${raw})`,
    runtimeError: raw => `Ocurrió un error durante la ejecución: ${raw}`,
    noWorkerError: 'Tu navegador actual no soporta Web Workers aislados para la ejecución.',
    unknownError: 'Error desconocido',
    anonFnLabel: 'anónima',
    defaultVarLabel: 'una variable',
    python: {
      maxStepsError: 'Límite de 220 pasos alcanzado en el simulador Python (evitando bucle infinito).',
      nameError: name => `NameError: el nombre '${name}' no está definido`,
      nonIterableComprehension: 'Objeto no iterable en la list comprehension',
      missingArgError: (fnName, argName) => `TypeError: falta el argumento requerido '${argName}' en ${fnName}()`,
      unknownExprError: expr => `Expresión Python no reconocida: "${expr}"`,
      syntaxErrorLine: (line, raw) => `SyntaxError en la línea ${line}: ${raw}`,
      forNonIterableError: line => `Objeto no iterable en la línea ${line}`,
      defNote: (fnName, hasDefaults) =>
        `Definió la función "${fnName}"${hasDefaults ? ' (atención: ¡los valores por defecto se evaluaron ahora en la definición!)' : ''}.`,
      returnNote: val => `Devolvió ${val} de la función.`,
      elseNote: 'Entró al bloque else.',
      condEvalNote: (cond, ok) => `Evaluó "${cond}" → ${ok ? 'True (entra al bloque)' : 'False (salta)'}.`,
      forIterNote: (target, val) => `Iteración del bucle: ${target} = ${val}`,
      whileTrueNote: cond => `La condición "${cond}" es True — ejecutando bucle.`,
      whileDoneNote: cond => `La condición "${cond}" pasó a False — salió del while.`,
      augAssignNote: (varName, val) => `Actualizó "${varName}" a ${val}.`,
      indexAssignNote: (val, lhs) => `Asignó ${val} en ${lhs}.`,
      unpackNote: lhs => `Desempaquetó valores en ${lhs}.`,
      assignNote: (lhs, val) => `Guardó ${lhs} = ${val}.`,
      printNote: text => `Imprimió en consola: "${text}"`,
      exprNote: (raw, val) => `Ejecutó "${raw}"${val !== null ? ` → ${val}` : ''}.`,
      errorFriendlyPrefix: raw => `Error en el simulador Python: ${raw}`
    },
    sql: {
      emptyQueryError: '¡Escribe una consulta SELECT para ejecutar en la base en memoria!',
      onlySelectError:
        'En este laboratorio interactivo usa consultas SELECT (con FROM, JOIN, WHERE, GROUP BY, ORDER BY, LIMIT).',
      invalidFromError: clause => `Cláusula FROM inválida: "${clause}"`,
      tableNotFoundError: (name, available) => `Tabla "${name}" no encontrada. Disponibles: ${available}`,
      invalidJoinError: clause => `Sintaxis de JOIN inválida: "${clause}"`,
      joinTableNotFoundError: name => `Tabla de JOIN "${name}" no encontrada.`,
      colNotFoundJoinError: col => `La columna "${col}" no existe en las tablas seleccionadas.`,
      colNotFoundSelectError: col => `Columna "${col}" no encontrada.`,
      invalidWhereError: cond => `Condición WHERE no reconocida: "${cond}"`,
      fromPhase: '1. FROM',
      leftJoinPhase: '2. LEFT JOIN',
      innerJoinPhase: '2. INNER JOIN',
      wherePhase: '3. WHERE',
      groupPhase: '4. GROUP BY',
      selectPhase: '5. SELECT',
      orderPhase: '6. ORDER BY',
      limitPhase: '7. LIMIT',
      varTable: 'tabla',
      varRows: 'filas',
      varFilter: 'filtro',
      varBefore: 'antes',
      varAfter: 'después',
      varGroups: 'grupos',
      varColumns: 'columnas',
      varOrder: 'orden',
      varLimit: 'límite',
      fromStepNote: (rowsCount, tableName) => `Cargó ${rowsCount} fila(s) de la tabla "${tableName}".`,
      joinStepNote: (isLeft, rowsCount) =>
        `${isLeft ? 'LEFT JOIN conservó toda la izquierda' : 'INNER JOIN cruzó coincidencias'} → ${rowsCount} fila(s).`,
      whereStepNote: (clause, after, before) => `Filtró con WHERE (${clause}): quedaron ${after} de ${before} fila(s).`,
      groupStepNote: (groupsCount, clause) => `Agrupó las filas en ${groupsCount} grupo(s) distintos por ${clause}.`,
      selectStepNote: (cols, rowsCount) => `Proyectó las columnas [${cols}] con ${rowsCount} fila(s).`,
      orderStepNote: clause => `Ordenó el resultado por ${clause}.`,
      limitStepNote: limit => `Limitó la salida a las primeras ${limit} fila(s).`,
      successInfoLog: rowsCount => `Consulta ejecutada con éxito: ${rowsCount} fila(s) devuelta(s).`
    }
  }
};

export default codeForFunEs;
