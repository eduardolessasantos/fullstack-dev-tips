import { CodeForFunLocale } from '../../types.ts';

const codeForFunEn: CodeForFunLocale = {
  ui: {
    kickerLeft: 'Interactive Lab',
    kickerRight: 'Hands-On Coding',
    title: 'Code for Fun',
    subtitle:
      'Type, run, break, and discover how things really work in JavaScript, TypeScript, Python, and SQL — with dev humor and straight-to-the-point explanations.',
    xpLabel: 'XP',
    levelPrefix: 'Lv.',
    streakLabel: 'Streak',
    completedLabel: 'Completed',
    badgesBtn: 'Badges',
    badgesTitleAttr: 'View unlocked achievements',
    soundOnTitle: 'Sound effects on (click to mute)',
    soundOffTitle: 'Sound effects off (click to unmute)',
    soundMuteAria: 'Mute sound effects',
    soundUnmuteAria: 'Unmute sound effects',
    nextLevelBefore: 'Next level in',
    nextLevelAfter: 'XP',
    maxLevelReached: 'Maximum level reached!',
    badgesPanelTitle: 'Lab Achievements',
    unlockedLabel: 'Unlocked',
    lockedLabel: 'Locked',
    filterModeLabel: 'Mode',
    filterTrackLabel: 'Track',
    filterLangLabel: 'Language',
    filterModeAria: 'Filter by mode',
    filterTrackAria: 'Filter by track',
    filterLangAria: 'Filter by language',
    modeTabAll: 'All',
    trackFilterOptions: {
      all: 'All',
      warmup: 'Warmup',
      'hands-on': 'Hands-On',
      'senior-trap': 'Senior Traps'
    },
    langFilterOptions: {
      all: 'All',
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      python: 'Python',
      sql: 'SQL'
    },
    challengesCountSuffix: 'challenges',
    completedTag: 'Completed',
    estimatedMinSuffix: 'min',
    minPrefix: '~',
    emptyFilterMsg: 'No challenge matches these filters.',
    clearFiltersBtn: 'Clear filters',
    sqlTablesShow: 'Show Tables',
    sqlTablesHide: 'Hide Tables',
    sqlTablesHeading: 'Available in-memory tables:',
    sqlTablesColumnsLabel: 'Columns:',
    editorShortcutHint: 'Ctrl+Enter / Cmd+Enter to run',
    editorAriaLabel: 'Code editor:',
    runBtnRunning: 'Running...',
    runBtnIdle: 'Run Code',
    stepModeBtn: 'Step-by-Step',
    hintBtnPrefix: 'Hint',
    resetBtn: 'Reset',
    resetTitle: 'Restore starter code',
    loadSolutionBtn: 'Show Solution',
    loadSolutionTitle: 'Load commented solution into editor',
    hintsHeader: 'Progressive Hints',
    canvasTitle: 'Visual Stage (Canvas API)',
    canvasInitialMsg: 'Click Run to draw!',
    sqlResultTitle: 'SQL Query Result',
    consoleTitle: 'Console / Output',
    emptyOutputPrompt: 'Click "Run Code" (or press Ctrl+Enter) to see the live output.',
    errorBannerTitle: 'Oops, something went wrong during execution!',
    sqlEmptyRows: 'Query executed, but returned 0 rows.',
    emptyLogsNotice: '(Execution finished with no text output in console)',
    traceSqlTitle: 'SQL Logical Execution Order',
    traceMemTitle: 'Live Memory Inspector',
    traceStepOf: 'Step',
    tracePhasePrefix: 'Phase:',
    traceLinePrefix: 'Line:',
    traceRestartTitle: 'Restart trace',
    tracePrevTitle: 'Previous step',
    tracePlayTitle: 'Auto-play',
    tracePauseTitle: 'Pause',
    traceNextTitle: 'Next step',
    traceMemStateLabel: 'Variables in Memory',
    validationTitle: 'Automated Validation',
    ahaPrefix: 'Why does it work?',
    celebrateTitle: 'Challenge Completed!',
    celebrateBadgePrefix: 'New badge:',
    celebrateXpPrefix: '+{xp} XP',
    adLabel: 'Advertisement',
    syntaxCheckFailLabel: 'Executed without syntax errors',
    syntaxCheckFailDetail: 'Fix the error shown above to validate the tests.'
  },
  modeLabels: {
    challenge: 'Guided Challenges',
    'bug-hunt': 'Bug Hunt',
    sandbox: 'Free Sandbox'
  },
  trackLabels: {
    warmup: 'Fun Warmup',
    'hands-on': 'Hands-On',
    'senior-trap': 'Senior Traps'
  },
  langLabels: {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python (Trace)',
    sql: 'SQL (In-Memory)'
  },
  levelTitles: [
    { maxXp: 100, level: 1, title: 'Curious Intern', nextLevelXp: 100, currentFloorXp: 0 },
    { maxXp: 250, level: 2, title: 'Console.log Master', nextLevelXp: 250, currentFloorXp: 100 },
    { maxXp: 450, level: 3, title: 'Bug Tamer', nextLevelXp: 450, currentFloorXp: 250 },
    { maxXp: 700, level: 4, title: 'Event Loop Architect', nextLevelXp: 700, currentFloorXp: 450 },
    { maxXp: Number.POSITIVE_INFINITY, level: 5, title: 'Friday Deploy Legend', nextLevelXp: 1000, currentFloorXp: 700 }
  ],
  badges: [
    {
      id: 'first-spark',
      title: 'First Console.log',
      description: 'Completed your first challenge or bug hunt in the lab.',
      iconName: 'terminal'
    },
    {
      id: 'bug-hunter',
      title: 'Bug Exterminator',
      description: 'Solved 2 challenges in Bug Hunt mode.',
      iconName: 'bug'
    },
    {
      id: 'streak-3',
      title: 'Unstoppable Streak',
      description: 'Solved 3 challenges in a row without mistakes.',
      iconName: 'flame'
    },
    {
      id: 'polyglot',
      title: 'Curious Polyglot',
      description: 'Completed challenges in at least 2 different languages.',
      iconName: 'sparkles'
    },
    {
      id: 'sql-master',
      title: 'Master of Joins',
      description: 'Conquered a SQL query on the in-memory database.',
      iconName: 'database'
    },
    {
      id: 'senior-survivor',
      title: 'Trap Survivor',
      description: 'Cleared a challenge from the Senior Traps track.',
      iconName: 'trophy'
    }
  ],
  sqlTableDescriptions: {
    devs_e_cafes: 'Engineering team roster and their daily caffeine preferences.',
    bugs_producao: 'Hilarious production incidents logged last Friday at 5:55 PM.',
    pedidos_pizza: 'Official squad pizza orders during sprint review.'
  },
  items: {
    'cf-js-fizzbuzz-cafe': {
      title: 'Morning Coffee FizzBuzz',
      funnyHook: 'No boring Fizz and Buzz here — we measure engineering output in cups of coffee and deploys!',
      prompt:
        'Loop from 1 to 15 and print with console.log: "Coffee on Deploy!" for multiples of both 3 and 5, "Coffee" for multiples of 3, "Deploy" for multiples of 5, or the number itself otherwise.',
      starterCode: `// Mission: count from 1 to 15 and log the team's rhythm!
for (let i = 1; i <= 15; i++) {
  // Hint: check multiples of both 3 AND 5 first (i % 15 === 0)
  if (i % 3 === 0) {
    console.log("Coffee");
  } else {
    console.log(i);
  }
}`,
      solutionCode: `for (let i = 1; i <= 15; i++) {
  if (i % 15 === 0) {
    console.log("Coffee on Deploy!");
  } else if (i % 3 === 0) {
    console.log("Coffee");
  } else if (i % 5 === 0) {
    console.log("Deploy");
  } else {
    console.log(i);
  }
}`,
      hints: [
        'Use the modulo operator `%`: if `i % 5 === 0`, the number is divisible by 5.',
        'The order of `if` branches matters! If you check `i % 3 === 0` before `i % 15 === 0`, 15 will match "Coffee" too early.',
        'Full structure: `if (i % 15 === 0) ... else if (i % 3 === 0) ... else if (i % 5 === 0) ... else ...`'
      ],
      ahaTitle: 'The order of `if` checks changes everything!',
      ahaExplanation: [
        'The number 15 is divisible by both 3 and 5. Placing the most specific condition (`i % 15 === 0`) at the top prevents the broader rule from intercepting the special case early.',
        'This exact principle applies to API route matching, Express middlewares, and checkout discount rules!'
      ],
      expectedStrings: {
        fizz: 'Coffee',
        buzz: 'Deploy',
        fizzbuzz: 'Coffee on Deploy!',
        empty: 'empty'
      },
      checkLabels: [
        'Printed exactly 15 lines (from 1 to 15)',
        'Correct multiples of 3, 5, and 15 ("Coffee", "Deploy", "Coffee on Deploy!")'
      ],
      checkDetailsPass: ['15 lines printed to console.', 'Flawless sequence!'],
      checkDetailsFail: ['Printed {count} lines.', '15th item printed as "{val}".']
    },
    'cf-ts-tipagem-rpg': {
      title: 'TypeScript RPG Damage Calculator',
      funnyHook: 'Your hero Kira stepped into the production dungeon, but her critical hit math is missing weapon damage.',
      prompt:
        'Complete the typed function `calculateDamage(hero: Hero, critical: boolean): number`. When `critical` is true, return `(attack + weapon) * 2`; otherwise return `attack + weapon`. Log Kira’s damage (expected: 140).',
      starterCode: `interface Hero {
  name: string;
  attack: number;
  weapon: number;
}

function calculateDamage(hero: Hero, critical: boolean): number {
  // Fix the calculation below!
  const base = hero.attack;
  return critical ? base * 2 : base;
}

const kira: Hero = { name: "Kira", attack: 45, weapon: 25 };
const damage = calculateDamage(kira, true);
console.log("Kira's damage:", damage);`,
      solutionCode: `interface Hero {
  name: string;
  attack: number;
  weapon: number;
}

function calculateDamage(hero: Hero, critical: boolean): number {
  const base = hero.attack + hero.weapon;
  return critical ? base * 2 : base;
}

const kira: Hero = { name: "Kira", attack: 45, weapon: 25 };
const damage = calculateDamage(kira, true);
console.log("Kira's damage:", damage);`,
      hints: [
        'Notice that `hero.weapon` was left out of the `base` variable!',
        'Add `hero.attack + hero.weapon` before doubling when `critical` is true.',
        'With `attack: 45` and `weapon: 25`, `base` equals `70`, and critical doubles it to `140`.'
      ],
      ahaTitle: 'Interfaces make data contracts obvious at a glance!',
      ahaExplanation: [
        'The `Hero` interface documents immediately which fields exist (`name`, `attack`, `weapon`), preventing forgotten attributes or typos like `hero.strength`.',
        'In the browser, TypeScript type annotations are stripped away before execution — so this lab strips types and runs the resulting JavaScript in milliseconds.'
      ],
      expectedStrings: { empty: 'empty' },
      checkLabels: [
        'Included the weapon bonus in the critical calculation (140)',
        'Kept the hero name Kira in the console output'
      ],
      checkDetailsPass: ['Critical damage calculated as 140!', 'Hero name logged properly.'],
      checkDetailsFail: ['Current output: "{output}"', 'Keep "Kira" in your console.log.']
    },
    'cf-py-ranking-memes': {
      title: 'Python Caffeine Filter (With Trace)',
      funnyHook: 'HR wants to count how many EXTRA cups (above 2 per developer) were consumed this sprint.',
      prompt:
        'Fix the Python `for` loop to sum only the excess above 2 cups for each item in `cups`, printing `Total extra: 6`. Click "Step-by-Step" to watch every variable change in memory!',
      starterCode: `cups = [1, 4, 2, 5, 3]
extra = 0

for q in cups:
    # If q is greater than 2, add (q - 2) to extra!
    if q > 10:
        extra += q - 2

print(f"Total extra: {extra}")`,
      solutionCode: `cups = [1, 4, 2, 5, 3]
extra = 0

for q in cups:
    if q > 2:
        extra += q - 2

print(f"Total extra: {extra}")`,
      hints: [
        'The condition `if q > 10:` is never true because nobody drank more than 10 cups.',
        'Change `if q > 10:` to `if q > 2:`.',
        'Counting: 4-2 = 2, 5-2 = 3, 3-2 = 1 → total `2 + 3 + 1 = 6`!'
      ],
      ahaTitle: 'Stepping through memory line by line kills invisible bugs!',
      ahaExplanation: [
        'When you click "Step-by-Step", you see the exact value of `q` and `extra` on every loop iteration — immediately revealing why `if q > 10:` never entered the block.',
        'In real Python, f-strings like `f"Total extra: {extra}"` make string formatting clean without manual `+ str(extra)` concatenation.'
      ],
      expectedStrings: { totalLine: 'Total extra: 6', empty: 'nothing' },
      checkLabels: ['Computed and printed "Total extra: 6"'],
      checkDetailsPass: ['Exact sum: (4-2) + (5-2) + (3-2) = 6!'],
      checkDetailsFail: ['Printed: "{output}"']
    },
    'cf-sql-pizzaria-top': {
      title: 'Friday Pizza Leaderboard',
      funnyHook: 'Time to split the sprint review tab! List group orders (2 or more pizzas) from most expensive to cheapest.',
      prompt:
        'Write a query on `pedidos_pizza` selecting `cliente, sabor, valor_total` where `quantidade >= 2`, ordered by highest `valor_total` (`DESC`).',
      starterCode: `-- Hint: inspect table columns by clicking "Show Tables"
SELECT cliente, sabor, valor_total
FROM pedidos_pizza
WHERE quantidade >= 5
ORDER BY valor_total ASC;`,
      solutionCode: `SELECT cliente, sabor, valor_total
FROM pedidos_pizza
WHERE quantidade >= 2
ORDER BY valor_total DESC;`,
      hints: [
        'The current filter `quantidade >= 5` returns nobody because the largest order had 3 pizzas.',
        'Update the filter to `WHERE quantidade >= 2`.',
        'To rank the highest bill at the top, change `ASC` to `DESC` in `ORDER BY valor_total`.'
      ],
      ahaTitle: 'SQL executes WHERE long before ORDER BY!',
      ahaExplanation: [
        'Look at the Logical Trace panel: first the engine reads the table (`FROM`), discards single-pizza orders (`WHERE`), projects 3 columns (`SELECT`), and only then sorts (`ORDER BY`).',
        'Because `WHERE` filters before sorting, better predicates and indexes mean far fewer rows for the database to sort!'
      ],
      expectedStrings: { empty: 'none' },
      checkLabels: [
        'Returned columns cliente, sabor, and valor_total',
        'Filtered orders with quantidade >= 2 (3 orders) sorted by highest total'
      ],
      checkDetailsPass: ['Correct columns.', 'Carla (186), Diego (128), and Ana (118) on the podium!'],
      checkDetailsFail: [
        'Returned columns: {cols}',
        'Returned {count} row(s); expected: Carla, Diego, Ana.'
      ]
    },
    'cf-bug-js-soma-string': {
      title: 'The Mystery of "100" + "20" = "10020"',
      funnyHook: 'A customer bought a $100 keyboard with $20 shipping... and checkout charged $10,020!',
      prompt:
        'The HTML `<input>` sent `"20"` as a string! Fix `sumCart(price, shipping)` to convert both arguments to numbers and return `120` (as a number).',
      starterCode: `function sumCart(price, shipping) {
  // BUG: in JS, number + string turns into text concatenation!
  return price + shipping;
}

const total = sumCart(100, "20");
console.log("Total:", total, "| Type:", typeof total);
return total;`,
      solutionCode: `function sumCart(price, shipping) {
  return Number(price) + Number(shipping);
}

const total = sumCart(100, "20");
console.log("Total:", total, "| Type:", typeof total);
return total;`,
      hints: [
        'In JavaScript, the `+` operator both adds numbers and concatenates strings.',
        'Convert both arguments explicitly using `Number(price) + Number(shipping)`.',
        'Once fixed, the console should print `Total: 120 | Type: number`.'
      ],
      ahaTitle: 'Implicit type coercion is the classic JavaScript trap!',
      ahaExplanation: [
        'Whenever either operand of `+` is a string (`"20"`), JavaScript converts the other operand into a string too and glues them together: `"100" + "20" = "10020"`.',
        'Explicitly casting with `Number(...)` (or validating API payloads with Zod/TypeScript) prevents scary checkout bugs!'
      ],
      checkLabels: ['Returned numeric value 120 (instead of "10020")'],
      checkDetailsPass: ['Bug squashed! Returned 120 as a number.'],
      checkDetailsFail: ['Current result: {ret} ({log})']
    },
    'cf-bug-py-lista-fantasma': {
      title: 'The Shared Backpack in Python',
      funnyHook: 'Ana put a laptop in her backpack, then Bruno opened his and found Ana’s laptop inside!',
      prompt:
        'Run the code first to watch the bug live: `bag=[]` as a default parameter makes every call share THE SAME list in memory! Fix it with `bag=None` and initialize `[]` inside the function.',
      starterCode: `def add_item(item, bag=[]):
    bag.append(item)
    return bag

ana = add_item("Laptop")
bruno = add_item("Headset")

print("Ana:", ana)
print("Bruno:", bruno)`,
      solutionCode: `def add_item(item, bag=None):
    if bag is None:
        bag = []
    bag.append(item)
    return bag

ana = add_item("Laptop")
bruno = add_item("Headset")

print("Ana:", ana)
print("Bruno:", bruno)`,
      hints: [
        'In Python, default parameter values (`bag=[]`) are evaluated ONCE when `def` runs, not on every call!',
        'Change the signature to `def add_item(item, bag=None):`.',
        'Inside the function, add:\n`if bag is None:\n    bag = []`'
      ],
      ahaTitle: 'Python default arguments are evaluated at `def` time, not call time!',
      ahaExplanation: [
        'This is one of the most famous senior Python interview questions! Because lists (`[]`) and dicts (`{}`) are mutable, using them as default arguments leaks shared state across calls.',
        'The idiomatic Python convention is always `None` as default, creating a fresh list inside the function body.'
      ],
      expectedStrings: {
        anaLine: "Ana: ['Laptop']",
        brunoLine: "Bruno: ['Headset']",
        empty: 'empty'
      },
      checkLabels: [
        "Ana ended up with only ['Laptop']",
        "Bruno ended up with only ['Headset']"
      ],
      checkDetailsPass: ["Ana's backpack isolated.", "Bruno's backpack isolated!"],
      checkDetailsFail: ['Ana output: {out}', 'Bruno output: {out}']
    },
    'cf-bug-js-event-loop': {
      title: 'Event Loop Wacky Race',
      funnyHook: 'Someone tried logging 1, 2, 3, 4 using setTimeout and Promise... and the queue printed completely out of order!',
      prompt:
        'Run the starter code to see the real Event Loop order (`1`, `4`, `3`, `2`). Then refactor using `async/await` so the console logs `1`, `2`, `3`, `4` in exact sequence!',
      starterCode: `// Run once to see the real order: 1 -> 4 -> 3 -> 2!
// Then use await / Promises to print 1, 2, 3, 4 in sequence.
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
        'Synchronous code (`1` and `4`) always executes before any async callback.',
        '`Promise.then` enters the high-priority Microtask Queue, while `setTimeout` enters the lower-priority Macrotask Queue.',
        'Wrap `setTimeout` in `await new Promise(r => setTimeout(() => { console.log(2); r(); }, 0))` and `await` the Promise for `3`!'
      ],
      ahaTitle: 'Call Stack → Microtasks (Promises) → Macrotasks (setTimeout)',
      ahaExplanation: [
        'Even with `0ms`, a `setTimeout` callback never jumps ahead of an already-resolved `Promise`. The Event Loop only picks the next Macrotask after both the Call Stack and the entire Microtask Queue are empty.',
        'Mastering this hierarchy prevents tricky race conditions in React, Node.js, and UI animations!'
      ],
      checkLabels: ['Printed 1, 2, 3, 4 in exact order'],
      checkDetailsPass: ['Event Loop tamed!'],
      checkDetailsFail: ['Current order: [{order}]']
    },
    'cf-bug-sql-null-trap': {
      title: 'The Missing Intern (NULL Trap)',
      funnyHook: 'Diego drinks zero coffee (`tipo_cafe` is NULL) and the current query silently wiped him out of the report!',
      prompt:
        'In SQL, `tipo_cafe != \'Descafeinado\'` evaluates to UNKNOWN for `NULL` rows! Fix the query on `devs_e_cafes` to return ALL 4 devs who do NOT drink Decaf (including Diego with NULL).',
      starterCode: `-- BUG: Diego has tipo_cafe = NULL and disappears from the result!
SELECT nome, nivel, tipo_cafe
FROM devs_e_cafes
WHERE tipo_cafe != 'Descafeinado';`,
      solutionCode: `SELECT nome, nivel, tipo_cafe
FROM devs_e_cafes
WHERE tipo_cafe != 'Descafeinado' OR tipo_cafe IS NULL;`,
      hints: [
        'In SQL, `NULL` does not mean an empty string — it means "unknown". Any `NULL != "something"` comparison evaluates to UNKNOWN!',
        'To include null records explicitly, use `IS NULL` (never `= NULL`).',
        'Add `OR tipo_cafe IS NULL` to your `WHERE` clause!'
      ],
      ahaTitle: 'In SQL, `NULL = NULL` is NOT true — it is UNKNOWN!',
      ahaExplanation: [
        'SQL uses three-valued boolean logic: `TRUE`, `FALSE`, and `UNKNOWN`. Since `WHERE` only keeps rows that evaluate to `TRUE`, rows with `NULL` get silently dropped!',
        'That is why `IS NULL` and `IS NOT NULL` exist — knowing this saves financial reports and customer queries every day.'
      ],
      checkLabels: [
        'Included Diego (NULL tipo_cafe) in the result',
        'Kept all 4 non-Decaf devs (excluded Elena)'
      ],
      checkDetailsPass: ['Diego appeared!', 'Ana, Bruno, Carla, and Diego listed!'],
      checkDetailsFail: [
        'Diego is still missing because of NULL.',
        'Returned {count} row(s): {names}'
      ]
    },
    'cf-sandbox-js-canvas': {
      title: 'Generative Canvas Art with JS',
      funnyHook: 'Use the `draw` API to paint constellations, spirals, or charts straight onto the visual stage!',
      prompt:
        'Play freely with `draw.clear()`, `draw.circle(x, y, r, color)`, `draw.rect(x, y, w, h, color)`, `draw.line(x1, y1, x2, y2, color)`, and `draw.text(txt, x, y, color)`. Edit the code and watch your drawing come alive!',
      starterCode: `// Canvas Stage 360x220 — tweak numbers, colors, and loops!
draw.clear("#090d16");

const colors = ["#22d3ee", "#38bdf8", "#818cf8", "#c084fc", "#34d399"];

for (let i = 0; i < 18; i++) {
  const angle = i * 0.45;
  const radius = 12 + i * 4.5;
  const x = 180 + Math.cos(angle) * radius;
  const y = 110 + Math.sin(angle) * (radius * 0.72);
  const color = colors[i % colors.length];

  draw.line(180, 110, x, y, "rgba(148, 163, 184, 0.25)", 1);
  draw.circle(x, y, 4 + (i % 5), color);
}

draw.text("Code for Fun ✨", 122, 204, "#e2e8f0", 13);
console.log("Spiral rendered with 18 nodes!");`,
      solutionCode: `draw.clear("#090d16");
draw.circle(180, 110, 48, "#22d3ee");
draw.text("Art ready!", 146, 115, "#020617", 14);`,
      hints: [
        'The visual stage measures 360px wide by 220px tall.',
        'Try changing `Math.cos(angle)` to `Math.cos(angle * 2)` to create geometric flower petals!'
      ],
      ahaTitle: 'Math + Loops = Instant Visual Art!',
      ahaExplanation: [
        'Sine and cosine turn a simple counter `i` into smooth orbits, spirals, and waves.',
        'Try modifying the angle multiplier or radius step to watch brand-new geometric patterns emerge in real time.'
      ]
    },
    'cf-sandbox-py-trace': {
      title: 'Python Lab: Live Memory',
      funnyHook: 'Write loops, list comprehensions, and functions and watch every variable update inside the inspector!',
      prompt:
        'Free Python sandbox with a step-by-step simulator. Experiment with functions, dicts, loops, and list comprehensions, then click "Step-by-Step" to inspect memory line by line.',
      starterCode: `# Test list comprehensions, dicts, and loops live!
squad = ["Ana", "Bruno", "Carla"]
points = {"Ana": 120, "Bruno": 95, "Carla": 150}

doubled = [points[name] * 2 for name in squad]
print("Doubled points:", doubled)

champion = ""
best = 0
for dev in squad:
    if points[dev] > best:
        best = points[dev]
        champion = dev

print(f"Sprint leader: {champion} with {best} pts!")`,
      solutionCode: `print("Use this space to experiment with Python!")`,
      hints: [
        'You can define functions with `def`, and use `range(1, 10)`, `sum(...)`, `len(...)`, and `sorted(...)`.',
        'Click "Step-by-Step" to step forward or backward through each line.'
      ],
      ahaTitle: 'List comprehensions condense loops without losing readability',
      ahaExplanation: [
        'The expression `[points[name] * 2 for name in squad]` creates a transformed list in a single expressive line — one of Python’s most beloved features.'
      ]
    },
    'cf-sandbox-sql-lab': {
      title: 'SQL Playground: Devs, Coffee & Bugs',
      funnyHook: 'Cross-reference the developer roster with Friday’s production bugs using JOIN, GROUP BY, and COUNT!',
      prompt:
        'Query `devs_e_cafes`, `bugs_producao`, and `pedidos_pizza` freely. Try `INNER JOIN`, `LEFT JOIN`, `COUNT(*)`, `SUM(...)`, `GROUP BY`, and `ORDER BY`.',
      starterCode: `-- Who resolved the most production bugs?
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
        'Swap `LEFT JOIN` for `INNER JOIN` to see who disappears when they have 0 bugs.',
        'Click "Show Tables" to inspect every column across all 3 tables.'
      ],
      ahaTitle: 'COUNT(column) ignores NULLs — and that is a superpower!',
      ahaExplanation: [
        'When using `LEFT JOIN`, devs without bugs get `b.id = NULL`. Because `COUNT(b.id)` ignores `NULL`, it accurately returns `0` — whereas `COUNT(*)` would count the row as `1`!'
      ]
    }
  },
  engineMessages: {
    timeoutError: 'Whoa! Your code took too long (> 1.5s). Could there be an infinite loop hiding in there?',
    timeoutRaw: 'Timeout: Infinite loop detected (> 1500ms)',
    isNotDefinedError: name =>
      `Oops! "${name}" was not declared before use. Check spelling or declare it with let/const.`,
    isNotFunctionError:
      'You tried calling something as a function `()`, but that value is not a function (it might be undefined, a number, or an object).',
    nullPropertyError:
      'Tried reading a property on null or undefined. Try using optional chaining `?.` or validating first.',
    constAssignError:
      'You tried reassigning a `const` variable. If it needs to change, declare it with `let`!',
    syntaxError: raw => `Syntax error: missing parenthesis, brace, or quote? (${raw})`,
    runtimeError: raw => `An error occurred during execution: ${raw}`,
    noWorkerError: 'Your current browser does not support isolated Web Workers for execution.',
    unknownError: 'Unknown error',
    anonFnLabel: 'anonymous',
    defaultVarLabel: 'a variable',
    python: {
      maxStepsError: 'Reached the 220-step limit in the Python simulator (preventing infinite loop).',
      nameError: name => `NameError: name '${name}' is not defined`,
      nonIterableComprehension: 'Non-iterable object in list comprehension',
      missingArgError: (fnName, argName) => `TypeError: ${fnName}() missing required argument '${argName}'`,
      unknownExprError: expr => `Unrecognized Python expression: "${expr}"`,
      syntaxErrorLine: (line, raw) => `SyntaxError on line ${line}: ${raw}`,
      forNonIterableError: line => `Non-iterable object on line ${line}`,
      defNote: (fnName, hasDefaults) =>
        `Defined function "${fnName}"${hasDefaults ? ' (heads up: default argument values were evaluated now at definition time!)' : ''}.`,
      returnNote: val => `Returned ${val} from function.`,
      elseNote: 'Entered else branch.',
      condEvalNote: (cond, ok) => `Evaluated "${cond}" → ${ok ? 'True (enters block)' : 'False (skips)'}.`,
      forIterNote: (target, val) => `Loop iteration: ${target} = ${val}`,
      whileTrueNote: cond => `Condition "${cond}" is True — running loop body.`,
      whileDoneNote: cond => `Condition "${cond}" became False — exited while loop.`,
      augAssignNote: (varName, val) => `Updated "${varName}" to ${val}.`,
      indexAssignNote: (val, lhs) => `Assigned ${val} to ${lhs}.`,
      unpackNote: lhs => `Unpacked values into ${lhs}.`,
      assignNote: (lhs, val) => `Stored ${lhs} = ${val}.`,
      printNote: text => `Printed to console: "${text}"`,
      exprNote: (raw, val) => `Executed "${raw}"${val !== null ? ` → ${val}` : ''}.`,
      errorFriendlyPrefix: raw => `Python simulator error: ${raw}`
    },
    sql: {
      emptyQueryError: 'Type a SELECT query to run on the in-memory database!',
      onlySelectError:
        'In this interactive lab, use SELECT queries (with FROM, JOIN, WHERE, GROUP BY, ORDER BY, LIMIT).',
      invalidFromError: clause => `Invalid FROM clause: "${clause}"`,
      tableNotFoundError: (name, available) => `Table "${name}" not found. Available: ${available}`,
      invalidJoinError: clause => `Invalid JOIN syntax: "${clause}"`,
      joinTableNotFoundError: name => `JOIN table "${name}" not found.`,
      colNotFoundJoinError: col => `Column "${col}" does not exist in the selected tables.`,
      colNotFoundSelectError: col => `Column "${col}" not found.`,
      invalidWhereError: cond => `Unrecognized WHERE condition: "${cond}"`,
      fromPhase: '1. FROM',
      leftJoinPhase: '2. LEFT JOIN',
      innerJoinPhase: '2. INNER JOIN',
      wherePhase: '3. WHERE',
      groupPhase: '4. GROUP BY',
      selectPhase: '5. SELECT',
      orderPhase: '6. ORDER BY',
      limitPhase: '7. LIMIT',
      varTable: 'table',
      varRows: 'rows',
      varFilter: 'filter',
      varBefore: 'before',
      varAfter: 'after',
      varGroups: 'groups',
      varColumns: 'columns',
      varOrder: 'order',
      varLimit: 'limit',
      fromStepNote: (rowsCount, tableName) => `Loaded ${rowsCount} row(s) from table "${tableName}".`,
      joinStepNote: (isLeft, rowsCount) =>
        `${isLeft ? 'LEFT JOIN preserved all left rows' : 'INNER JOIN matched pairs'} → ${rowsCount} row(s).`,
      whereStepNote: (clause, after, before) => `Filtered with WHERE (${clause}): ${after} of ${before} row(s) remained.`,
      groupStepNote: (groupsCount, clause) => `Grouped rows into ${groupsCount} distinct group(s) by ${clause}.`,
      selectStepNote: (cols, rowsCount) => `Projected columns [${cols}] across ${rowsCount} row(s).`,
      orderStepNote: clause => `Sorted result by ${clause}.`,
      limitStepNote: limit => `Limited output to the first ${limit} row(s).`,
      successInfoLog: rowsCount => `Query executed successfully: ${rowsCount} row(s) returned.`
    }
  }
};

export default codeForFunEn;
