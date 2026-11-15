import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Play,
  RotateCcw,
  Lightbulb,
  Bug,
  Sparkles,
  Trophy,
  Flame,
  Volume2,
  VolumeX,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  SkipForward,
  Pause,
  Table2,
  Terminal,
  Eye,
  Database,
  Code2,
  Compass,
  Award
} from 'lucide-react';
import {
  CodeForFunBadge,
  CodeForFunExecutionOutcome,
  CodeForFunItem,
  CodeForFunLanguage,
  CodeForFunMode,
  CodeForFunPlayerState,
  CodeForFunTestResult,
  CodeForFunTrack,
  VisualCanvasCommand
} from '../types.ts';
import { executeCodeForFun, playFunSound } from '../utils/codeForFunEngines.ts';
import { CodeForFunEditor } from './CodeForFunEditor.tsx';
import { AdUnit } from './AdUnit.tsx';
import { useLanguage, useTranslationNamespace } from '../i18n/LanguageContext.tsx';
import { buildCodeForFunItems, buildSqlPlaygroundTables } from '../i18n/codeForFunBuilder.ts';

const STORAGE_KEY = 'codecompare_code_for_fun_v1';

const DEFAULT_PLAYER_STATE: CodeForFunPlayerState = {
  xp: 0,
  streak: 0,
  bestStreak: 0,
  completedIds: [],
  unlockedBadges: [],
  soundEnabled: true,
  savedCodeById: {}
};

function renderBadgeIcon(iconName: CodeForFunBadge['iconName']) {
  switch (iconName) {
    case 'flame':
      return <Flame size={16} className="text-amber-500" />;
    case 'bug':
      return <Bug size={16} className="text-rose-500" />;
    case 'database':
      return <Database size={16} className="text-emerald-500" />;
    case 'trophy':
      return <Trophy size={16} className="text-amber-400" />;
    case 'sparkles':
      return <Sparkles size={16} className="text-violet-400" />;
    default:
      return <Terminal size={16} className="text-cyan-400" />;
  }
}

export const CodeForFunView: React.FC = () => {
  const { t } = useLanguage();
  const { data: cffNs } = useTranslationNamespace('codeForFun');

  // Persisted player progression
  const [playerState, setPlayerState] = useState<CodeForFunPlayerState>(() => {
    if (typeof window === 'undefined') return DEFAULT_PLAYER_STATE;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<CodeForFunPlayerState>;
        return { ...DEFAULT_PLAYER_STATE, ...parsed };
      }
    } catch {
      // Ignore storage read errors
    }
    return DEFAULT_PLAYER_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(playerState));
    } catch {
      // Ignore storage write errors
    }
  }, [playerState]);

  // Filters & selected item
  const [activeMode, setActiveMode] = useState<'all' | CodeForFunMode>('all');
  const [activeTrack, setActiveTrack] = useState<'all' | CodeForFunTrack>('all');
  const [activeLang, setActiveLang] = useState<'all' | CodeForFunLanguage>('all');
  const [selectedId, setSelectedId] = useState<string>('cf-js-fizzbuzz-cafe');

  // Workspace UI states
  const [showBadgesPanel, setShowBadgesPanel] = useState(false);
  const [showSqlTables, setShowSqlTables] = useState(false);
  const [revealedHintsCount, setRevealedHintsCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [outcome, setOutcome] = useState<CodeForFunExecutionOutcome | null>(null);
  const [testResults, setTestResults] = useState<CodeForFunTestResult[] | null>(null);
  const [celebrationTick, setCelebrationTick] = useState(0);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<CodeForFunBadge | null>(null);

  // Step-by-step Trace playback state (Python & SQL)
  const [traceIndex, setTraceIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sqlPlaygroundTables = useMemo(
    () => (cffNs ? buildSqlPlaygroundTables(cffNs) : []),
    [cffNs]
  );

  const allItems = useMemo(
    () => (cffNs ? buildCodeForFunItems(cffNs) : []),
    [cffNs]
  );

  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      if (activeMode !== 'all' && item.mode !== activeMode) return false;
      if (activeTrack !== 'all' && item.track !== activeTrack) return false;
      if (activeLang !== 'all' && item.language !== activeLang) return false;
      return true;
    });
  }, [allItems, activeMode, activeTrack, activeLang]);

  const currentItem: CodeForFunItem | null = useMemo(() => {
    if (allItems.length === 0) return null;
    const exact = allItems.find(i => i.id === selectedId);
    if (exact) return exact;
    return filteredItems[0] || allItems[0];
  }, [allItems, selectedId, filteredItems]);

  // Switch active item cleanly
  const selectItem = (item: CodeForFunItem) => {
    setSelectedId(item.id);
    setRevealedHintsCount(0);
    setOutcome(null);
    setTestResults(null);
    setTraceIndex(0);
    setIsAutoPlaying(false);
    setShowSqlTables(item.language === 'sql');
  };

  // Keep selected item synced when filters change
  useEffect(() => {
    if (filteredItems.length > 0 && !filteredItems.some(i => i.id === selectedId)) {
      selectItem(filteredItems[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredItems]);

  // Draw visual canvas commands when JS sandbox produces draw.* calls
  useEffect(() => {
    if (!currentItem?.hasVisualStage || !canvasRef.current || !cffNs) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const commands: VisualCanvasCommand[] = outcome?.visualScene || [
      { kind: 'clear', color: '#090d16' },
      { kind: 'text', text: cffNs.ui.canvasInitialMsg, x: 56, y: 114, color: '#94a3b8', size: 13 }
    ];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const cmd of commands) {
      if (cmd.kind === 'clear') {
        ctx.fillStyle = cmd.color || '#090d16';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (cmd.kind === 'rect') {
        ctx.fillStyle = cmd.color || '#22d3ee';
        ctx.fillRect(cmd.x ?? 0, cmd.y ?? 0, cmd.w ?? 20, cmd.h ?? 20);
      } else if (cmd.kind === 'circle') {
        ctx.beginPath();
        ctx.arc(cmd.x ?? 0, cmd.y ?? 0, cmd.r ?? 10, 0, Math.PI * 2);
        ctx.fillStyle = cmd.color || '#a78bfa';
        ctx.fill();
      } else if (cmd.kind === 'line') {
        ctx.beginPath();
        ctx.moveTo(cmd.x ?? 0, cmd.y ?? 0);
        ctx.lineTo(cmd.x2 ?? 50, cmd.y2 ?? 50);
        ctx.strokeStyle = cmd.color || '#38bdf8';
        ctx.lineWidth = cmd.size ?? 2;
        ctx.stroke();
      } else if (cmd.kind === 'text') {
        ctx.fillStyle = cmd.color || '#f8fafc';
        ctx.font = `600 ${cmd.size ?? 14}px "JetBrains Mono", monospace`;
        ctx.fillText(cmd.text || '', cmd.x ?? 10, cmd.y ?? 20);
      }
    }
  }, [outcome, currentItem?.hasVisualStage, cffNs]);

  // Auto-play timer for step-by-step trace
  useEffect(() => {
    if (!isAutoPlaying || !outcome?.traceSteps || outcome.traceSteps.length === 0) return;
    if (traceIndex >= outcome.traceSteps.length - 1) {
      setIsAutoPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setTraceIndex(prev => prev + 1);
      playFunSound('step', playerState.soundEnabled);
    }, 850);
    return () => window.clearTimeout(timer);
  }, [isAutoPlaying, traceIndex, outcome, playerState.soundEnabled]);

  const activeTraceStep = useMemo(() => {
    if (!outcome?.traceSteps || outcome.traceSteps.length === 0) return null;
    const clamped = Math.min(Math.max(0, traceIndex), outcome.traceSteps.length - 1);
    return outcome.traceSteps[clamped];
  }, [outcome, traceIndex]);

  const relevantSqlTables = useMemo(() => {
    if (!currentItem || currentItem.language !== 'sql') return [];
    if (!currentItem.sqlTables || currentItem.sqlTables.length === 0) return sqlPlaygroundTables;
    return sqlPlaygroundTables.filter(t => currentItem.sqlTables!.includes(t.name));
  }, [currentItem, sqlPlaygroundTables]);

  if (!cffNs || !currentItem) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm text-slate-400">
        {t.common.loadingTranslation}
      </div>
    );
  }

  const { ui, modeLabels, trackLabels, langLabels, levelTitles, badges } = cffNs;
  const currentCode = playerState.savedCodeById[currentItem.id] ?? currentItem.starterCode;

  const updateCurrentCode = (nextCode: string) => {
    setPlayerState(prev => ({
      ...prev,
      savedCodeById: {
        ...prev.savedCodeById,
        [currentItem.id]: nextCode
      }
    }));
  };

  // Run code & evaluate challenge assertions
  const handleRun = async (enterStepMode = false) => {
    setIsRunning(true);
    setIsAutoPlaying(false);
    setNewlyUnlockedBadge(null);

    const execOutcome = await executeCodeForFun(
      currentCode,
      currentItem.language,
      sqlPlaygroundTables,
      cffNs.engineMessages
    );
    setOutcome(execOutcome);

    if (execOutcome.traceSteps && execOutcome.traceSteps.length > 0) {
      setTraceIndex(enterStepMode ? 0 : execOutcome.traceSteps.length - 1);
      if (enterStepMode) {
        playFunSound('step', playerState.soundEnabled);
      }
    } else {
      setTraceIndex(0);
    }

    if (currentItem.validate) {
      const checks = execOutcome.ok
        ? currentItem.validate(execOutcome, currentCode)
        : [
            {
              label: ui.syntaxCheckFailLabel,
              passed: false,
              detail: execOutcome.errorFriendly || ui.syntaxCheckFailDetail
            }
          ];
      setTestResults(checks);

      const allPassed = execOutcome.ok && checks.every(c => c.passed);
      if (allPassed) {
        const isFirstCompletion = !playerState.completedIds.includes(currentItem.id);
        setCelebrationTick(t => t + 1);
        playFunSound('success', playerState.soundEnabled);

        setPlayerState(prev => {
          const nextCompleted = isFirstCompletion
            ? [...prev.completedIds, currentItem.id]
            : prev.completedIds;
          const nextStreak = isFirstCompletion ? prev.streak + 1 : prev.streak;
          const nextBest = Math.max(prev.bestStreak, nextStreak);
          const nextXp = isFirstCompletion ? prev.xp + currentItem.xp : prev.xp;

          // Check newly unlocked badges
          const completedItems = allItems.filter(it => nextCompleted.includes(it.id));
          const distinctLangs = new Set(completedItems.map(it => it.language));
          const bugHuntWins = completedItems.filter(it => it.mode === 'bug-hunt').length;
          const hasSqlWin = completedItems.some(it => it.language === 'sql');
          const hasSeniorWin = completedItems.some(it => it.track === 'senior-trap');

          const candidateBadges = [...prev.unlockedBadges];
          const tryUnlock = (id: string) => {
            if (!candidateBadges.includes(id)) {
              candidateBadges.push(id);
              const found = badges.find(b => b.id === id);
              if (found) {
                setNewlyUnlockedBadge(found);
                playFunSound('badge', prev.soundEnabled);
              }
            }
          };

          if (nextCompleted.length >= 1) tryUnlock('first-spark');
          if (bugHuntWins >= 2) tryUnlock('bug-hunter');
          if (nextStreak >= 3) tryUnlock('streak-3');
          if (distinctLangs.size >= 2) tryUnlock('polyglot');
          if (hasSqlWin) tryUnlock('sql-master');
          if (hasSeniorWin) tryUnlock('senior-survivor');

          return {
            ...prev,
            xp: nextXp,
            streak: nextStreak,
            bestStreak: nextBest,
            completedIds: nextCompleted,
            unlockedBadges: candidateBadges
          };
        });
      } else {
        playFunSound('error', playerState.soundEnabled);
        if (!playerState.completedIds.includes(currentItem.id)) {
          setPlayerState(prev => ({ ...prev, streak: 0 }));
        }
      }
    } else {
      // Sandbox mode: award exploration XP once per sandbox item on successful run
      setTestResults(null);
      if (execOutcome.ok) {
        const isFirstSandbox = !playerState.completedIds.includes(currentItem.id);
        if (isFirstSandbox) {
          setCelebrationTick(t => t + 1);
          playFunSound('success', playerState.soundEnabled);
          setPlayerState(prev => ({
            ...prev,
            xp: prev.xp + currentItem.xp,
            completedIds: [...prev.completedIds, currentItem.id]
          }));
        } else {
          playFunSound('step', playerState.soundEnabled);
        }
      } else {
        playFunSound('error', playerState.soundEnabled);
      }
    }

    setIsRunning(false);
  };

  const handleReset = () => {
    updateCurrentCode(currentItem.starterCode);
    setOutcome(null);
    setTestResults(null);
    setTraceIndex(0);
    setIsAutoPlaying(false);
    setRevealedHintsCount(0);
  };

  const handleShowSolution = () => {
    updateCurrentCode(currentItem.solutionCode);
  };

  const levelInfo =
    levelTitles.find(l => playerState.xp < l.maxXp) ||
    levelTitles[levelTitles.length - 1];
  const levelProgressPct = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        ((playerState.xp - levelInfo.currentFloorXp) /
          Math.max(1, levelInfo.nextLevelXp - levelInfo.currentFloorXp)) *
          100
      )
    )
  );

  const isCompleted = playerState.completedIds.includes(currentItem.id);
  const allChecksPassed = Boolean(testResults && testResults.length > 0 && testResults.every(item => item.passed));
  const showAhaCard =
    (currentItem.mode === 'sandbox' && outcome?.ok) ||
    allChecksPassed ||
    isCompleted;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* ================================================================ */}
      {/* CABEÇALHO DO HUB + PROGRESSO DO JOGADOR                         */}
      {/* ================================================================ */}
      <header className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span>{ui.kickerLeft}</span>
              <span aria-hidden="true">·</span>
              <span>{ui.kickerRight}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
              {ui.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {ui.subtitle}
            </p>
          </div>

          {/* Painel Compacto de Gamificação */}
          <div className="w-full lg:w-[390px] shrink-0 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {ui.levelPrefix} {levelInfo.level} · {levelInfo.title}
                </div>
                <div className="text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
                  {playerState.xp} {ui.xpLabel}
                  <span className="ml-2 text-xs font-normal text-slate-500 dark:text-slate-400">
                    / {levelInfo.nextLevelXp} {ui.xpLabel}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowBadgesPanel(prev => !prev)}
                  className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-cyan-500/50 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                  title={ui.badgesTitleAttr}
                >
                  <Award size={14} className="text-amber-500" />
                  <span className="tabular-nums">
                    {playerState.unlockedBadges.length}/{badges.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setPlayerState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))
                  }
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-cyan-500 transition-colors cursor-pointer"
                  aria-label={playerState.soundEnabled ? ui.soundMuteAria : ui.soundUnmuteAria}
                  title={playerState.soundEnabled ? ui.soundOnTitle : ui.soundOffTitle}
                >
                  {playerState.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
              </div>
            </div>

            {/* Barra de Progresso de XP */}
            <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${levelProgressPct}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 tabular-nums">
              <span className="flex items-center gap-1.5">
                <Flame size={13} className="text-amber-500" />
                {ui.streakLabel}: <strong className="text-slate-800 dark:text-slate-200">{playerState.streak}</strong>
              </span>
              <span>
                {ui.completedLabel}: <strong className="text-slate-800 dark:text-slate-200">{playerState.completedIds.length}/{allItems.length}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Gaveta de Medalhas (Badges) */}
        {showBadgesPanel && (
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {badges.map(badge => {
              const unlocked = playerState.unlockedBadges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`p-3.5 rounded-xl border transition-colors flex items-start gap-3 ${
                    unlocked
                      ? 'border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 opacity-60'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0">
                    {renderBadgeIcon(badge.iconName)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="truncate">{badge.title}</span>
                      {unlocked && (
                        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                          {ui.unlockedLabel}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </header>

      {/* ================================================================ */}
      {/* BARRA DE MODOS, TRILHAS E SELETOR DE ATIVIDADES                  */}
      {/* ================================================================ */}
      <section className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Segmented Mode Control */}
          <div
            role="tablist"
            aria-label={ui.filterModeAria}
            className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit"
          >
            {(
              [
                { id: 'all', label: ui.modeTabAll },
                { id: 'challenge', label: modeLabels.challenge },
                { id: 'bug-hunt', label: modeLabels['bug-hunt'] },
                { id: 'sandbox', label: modeLabels.sandbox }
              ] as const
            ).map(tab => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeMode === tab.id}
                onClick={() => setActiveMode(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeMode === tab.id
                    ? 'bg-white dark:bg-cyan-500 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filtros de Trilha e Linguagem */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label={ui.filterTrackAria}
              value={activeTrack}
              onChange={e => setActiveTrack(e.target.value as 'all' | CodeForFunTrack)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="all">{ui.trackFilterOptions.all}</option>
              <option value="warmup">{ui.trackFilterOptions.warmup}</option>
              <option value="hands-on">{ui.trackFilterOptions['hands-on']}</option>
              <option value="senior-trap">{ui.trackFilterOptions['senior-trap']}</option>
            </select>

            <select
              aria-label={ui.filterLangAria}
              value={activeLang}
              onChange={e => setActiveLang(e.target.value as 'all' | CodeForFunLanguage)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="all">{ui.langFilterOptions.all}</option>
              <option value="javascript">{ui.langFilterOptions.javascript}</option>
              <option value="typescript">{ui.langFilterOptions.typescript}</option>
              <option value="python">{ui.langFilterOptions.python}</option>
              <option value="sql">{ui.langFilterOptions.sql}</option>
            </select>
          </div>
        </div>

        {/* Lista Horizontal / Grid de Atividades */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredItems.map(item => {
              const selected = item.id === currentItem.id;
              const done = playerState.completedIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectItem(item)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                    selected
                      ? 'border-cyan-500 bg-cyan-50/70 dark:bg-cyan-950/30 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="truncate">
                        {langLabels[item.language]} · {trackLabels[item.track]}
                      </span>
                      {done && <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />}
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {item.title}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 tabular-nums pt-1">
                    <span>{modeLabels[item.mode]}</span>
                    <span className="font-mono font-semibold text-cyan-600 dark:text-cyan-400">
                      +{item.xp} {ui.xpLabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-center space-y-2">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {ui.emptyFilterMsg}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveMode('all');
                setActiveTrack('all');
                setActiveLang('all');
              }}
              className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold cursor-pointer"
            >
              {ui.clearFiltersBtn}
            </button>
          </div>
        )}
      </section>

      {/* ================================================================ */}
      {/* PALCO INTERATIVO EM DUAS ZONAS (EDITOR + OUTPUT / TRACE / AHA)   */}
      {/* ================================================================ */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ZONA ESQUERDA (60%): Enunciado, Schema SQL opcional e Editor */}
        <div className="lg:col-span-7 space-y-4">
          {/* Card do Desafio Atual */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                  {modeLabels[currentItem.mode]}
                </span>
                <span aria-hidden="true">·</span>
                <span>{langLabels[currentItem.language]}</span>
                <span aria-hidden="true">·</span>
                <span>{trackLabels[currentItem.track]}</span>
                <span aria-hidden="true">·</span>
                <span>{ui.minPrefix}{currentItem.estimatedMinutes} {ui.estimatedMinSuffix}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  +{currentItem.xp} {ui.xpLabel}
                </span>
              </div>

              {isCompleted && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={14} />
                  {ui.completedTag}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white text-balance">
                {currentItem.title}
              </h2>
              <p className="text-xs sm:text-sm italic text-slate-500 dark:text-slate-400">
                "{currentItem.funnyHook}"
              </p>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentItem.prompt}
            </p>

            {/* Tabelas SQL Disponíveis (colapsável) */}
            {currentItem.language === 'sql' && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowSqlTables(prev => !prev)}
                  className="px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-cyan-500/50 transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <Table2 size={14} className="text-emerald-500" />
                  <span>{showSqlTables ? ui.sqlTablesHide : ui.sqlTablesShow}</span>
                </button>

                {showSqlTables && (
                  <div className="mt-3 space-y-3">
                    {relevantSqlTables.map(tbl => (
                      <div
                        key={tbl.name}
                        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 overflow-hidden"
                      >
                        <div className="px-3.5 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            {tbl.name}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 truncate">
                            {tbl.description}
                          </span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs font-mono">
                            <thead className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
                              <tr>
                                {tbl.columns.map(col => (
                                  <th key={col} className="px-3 py-1.5 font-semibold whitespace-nowrap">
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/70 text-slate-700 dark:text-slate-300">
                              {tbl.rows.map((r, rIdx) => (
                                <tr key={rIdx}>
                                  {tbl.columns.map(col => (
                                    <td key={col} className="px-3 py-1.5 whitespace-nowrap">
                                      {r[col] === null ? (
                                        <span className="text-rose-500 italic">NULL</span>
                                      ) : (
                                        String(r[col])
                                      )}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Editor Interativo */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-mono">
                  <Code2 size={14} className="text-cyan-500" />
                  <span>{langLabels[currentItem.language]}</span>
                </span>
                <span className="hidden sm:inline">{ui.editorShortcutHint}</span>
              </div>

              <CodeForFunEditor
                value={currentCode}
                onChange={updateCurrentCode}
                language={currentItem.language}
                activeLine={activeTraceStep ? activeTraceStep.line : null}
                onRunShortcut={() => handleRun(false)}
                ariaLabel={`${ui.editorAriaLabel} ${currentItem.title}`}
              />

              {/* Barra de Ações do Editor */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRun(false)}
                    disabled={isRunning}
                    className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
                  >
                    <Play size={14} />
                    <span>{isRunning ? ui.runBtnRunning : ui.runBtnIdle}</span>
                  </button>

                  {(currentItem.language === 'python' || currentItem.language === 'sql') && (
                    <button
                      type="button"
                      onClick={() => handleRun(true)}
                      disabled={isRunning}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-xs transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Compass size={14} className="text-violet-500" />
                      <span>{ui.stepModeBtn}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setRevealedHintsCount(prev => Math.min(currentItem.hints.length, prev + 1))
                    }
                    disabled={revealedHintsCount >= currentItem.hints.length}
                    className="px-3.5 py-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 disabled:opacity-50 text-amber-700 dark:text-amber-300 font-semibold text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Lightbulb size={14} />
                    <span className="tabular-nums">
                      {ui.hintBtnPrefix} ({revealedHintsCount}/{currentItem.hints.length})
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                    title={ui.resetTitle}
                  >
                    <RotateCcw size={13} />
                    <span>{ui.resetBtn}</span>
                  </button>

                  {currentItem.mode !== 'sandbox' && (
                    <button
                      type="button"
                      onClick={handleShowSolution}
                      className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                      title={ui.loadSolutionTitle}
                    >
                      <Eye size={13} />
                      <span>{ui.loadSolutionBtn}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Dicas Progressivas */}
            {revealedHintsCount > 0 && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20 p-4 space-y-2">
                <div className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                  <Lightbulb size={14} />
                  <span>{ui.hintsHeader}</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc pl-4">
                  {currentItem.hints.slice(0, revealedHintsCount).map((hint, idx) => (
                    <li key={idx} className="leading-relaxed whitespace-pre-line">
                      {hint}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ZONA DIREITA (40%): Console, Palco Visual, Trace, Testes e "Aha!" */}
        <div className="lg:col-span-5 space-y-4">
          {/* Efeito Celebratório Leve (GPU transform/opacity) */}
          {celebrationTick > 0 && (allChecksPassed || (currentItem.mode === 'sandbox' && outcome?.ok)) && (
            <div
              key={celebrationTick}
              className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-emerald-800 dark:text-emerald-200"
              style={{ animation: 'cff-pop 220ms cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                {[
                  { tx: '-90px', ty: '-45px', rot: '-120deg', color: '#22d3ee' },
                  { tx: '-40px', ty: '-65px', rot: '90deg', color: '#34d399' },
                  { tx: '25px', ty: '-70px', rot: '-80deg', color: '#fbbf24' },
                  { tx: '85px', ty: '-40px', rot: '140deg', color: '#a78bfa' },
                  { tx: '-65px', ty: '35px', rot: '110deg', color: '#38bdf8' },
                  { tx: '70px', ty: '35px', rot: '-140deg', color: '#f472b6' }
                ].map((p, i) => (
                  <span
                    key={i}
                    className="absolute w-2 h-2 rounded-xs"
                    style={
                      {
                        backgroundColor: p.color,
                        '--tx': p.tx,
                        '--ty': p.ty,
                        '--rot': p.rot,
                        animation: 'cff-confetti 750ms ease-out forwards'
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Trophy size={18} className="text-amber-500 shrink-0" />
                  <div>
                    <div className="text-xs font-extrabold">
                      {ui.celebrateTitle}
                    </div>
                    <div className="text-xs opacity-90">
                      {newlyUnlockedBadge
                        ? `${ui.celebrateBadgePrefix} ${newlyUnlockedBadge.title}`
                        : ui.celebrateXpPrefix.replace('{xp}', String(currentItem.xp))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Palco Visual Canvas (para Sandbox de Arte Generativa) */}
          {currentItem.hasVisualStage && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>{ui.canvasTitle}</span>
                <span className="font-mono text-[11px] text-slate-500">draw.* API</span>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#090d16] flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={360}
                  height={220}
                  className="max-w-full h-auto block"
                />
              </div>
            </div>
          )}

          {/* Painel de Saída / Console / Tabela SQL */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white">
                <Terminal size={15} className="text-cyan-500" />
                <span>
                  {currentItem.language === 'sql' ? ui.sqlResultTitle : ui.consoleTitle}
                </span>
              </div>

              {outcome && (
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                  {outcome.durationMs} ms
                </span>
              )}
            </div>

            {!outcome ? (
              <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
                {ui.emptyOutputPrompt}
              </div>
            ) : (
              <div className="space-y-3">
                {/* Mensagem de erro amigável */}
                {!outcome.ok && outcome.errorFriendly && (
                  <div className="p-3.5 rounded-xl border border-rose-500/40 bg-rose-500/10 text-xs text-rose-700 dark:text-rose-300 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <XCircle size={14} className="shrink-0" />
                      <span>{ui.errorBannerTitle}</span>
                    </div>
                    <p className="leading-relaxed">{outcome.errorFriendly}</p>
                  </div>
                )}

                {/* Logs de Console */}
                {outcome.logs.length > 0 && (
                  <div className="rounded-xl bg-slate-950 border border-slate-800 p-3.5 font-mono text-xs space-y-1.5 max-h-56 overflow-y-auto">
                    {outcome.logs.map((entry, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-2 leading-relaxed ${
                          entry.type === 'error'
                            ? 'text-rose-400'
                            : entry.type === 'warn'
                            ? 'text-amber-300'
                            : entry.type === 'info'
                            ? 'text-cyan-300'
                            : 'text-slate-200'
                        }`}
                      >
                        <span className="text-slate-600 select-none tabular-nums w-5 text-right shrink-0">
                          {idx + 1}
                        </span>
                        <span className="whitespace-pre-wrap break-words">{entry.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Valor de Retorno (JS/TS) */}
                {outcome.returnValue !== undefined && (
                  <div className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono flex items-center justify-between gap-2">
                    <span className="text-slate-500">return:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold truncate">
                      {String(outcome.returnValue)}
                    </span>
                  </div>
                )}

                {/* Tabela de Resultado SQL */}
                {outcome.sqlResult && (
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    {outcome.sqlResult.rows.length === 0 ? (
                      <div className="p-4 text-xs text-slate-500 text-center">
                        {ui.sqlEmptyRows}
                      </div>
                    ) : (
                      <div className="overflow-x-auto max-h-60">
                        <table className="w-full text-left text-xs font-mono">
                          <thead className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                            <tr>
                              {outcome.sqlResult.columns.map(col => (
                                <th key={col} className="px-3 py-2 font-semibold whitespace-nowrap">
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                            {outcome.sqlResult.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                {outcome.sqlResult!.columns.map(col => (
                                  <td key={col} className="px-3 py-2 whitespace-nowrap">
                                    {row[col] === null ? (
                                      <span className="text-rose-500 italic">NULL</span>
                                    ) : (
                                      String(row[col])
                                    )}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Empty logs notice */}
                {outcome.ok &&
                  outcome.logs.length === 0 &&
                  outcome.returnValue === undefined &&
                  !outcome.sqlResult && (
                    <div className="text-xs text-slate-500 italic">
                      {ui.emptyLogsNotice}
                    </div>
                  )}
              </div>
            )}
          </div>

          {/* Inspetor de Trace Passo a Passo (Python e Ordem Lógica SQL) */}
          {outcome?.traceSteps && outcome.traceSteps.length > 0 && activeTraceStep && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {currentItem.language === 'sql'
                      ? ui.traceSqlTitle
                      : ui.traceMemTitle}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
                    {ui.traceStepOf} {traceIndex + 1} / {outcome.traceSteps.length}
                    {activeTraceStep.phase
                      ? ` · ${ui.tracePhasePrefix} ${activeTraceStep.phase}`
                      : ` · ${ui.traceLinePrefix} ${activeTraceStep.line}`}
                  </div>
                </div>

                {/* Controles de Reprodução do Trace */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setTraceIndex(0);
                    }}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-cyan-500 cursor-pointer"
                    title={ui.traceRestartTitle}
                    aria-label={ui.traceRestartTitle}
                  >
                    <RotateCcw size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setTraceIndex(i => Math.max(0, i - 1));
                    }}
                    disabled={traceIndex === 0}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:border-cyan-500 cursor-pointer"
                    title={ui.tracePrevTitle}
                    aria-label={ui.tracePrevTitle}
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAutoPlaying(p => !p)}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-cyan-600 dark:text-cyan-400 hover:border-cyan-500 cursor-pointer"
                    title={isAutoPlaying ? ui.tracePauseTitle : ui.tracePlayTitle}
                    aria-label={isAutoPlaying ? ui.tracePauseTitle : ui.tracePlayTitle}
                  >
                    {isAutoPlaying ? <Pause size={14} /> : <SkipForward size={14} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setTraceIndex(i => Math.min(outcome.traceSteps!.length - 1, i + 1));
                      playFunSound('step', playerState.soundEnabled);
                    }}
                    disabled={traceIndex >= outcome.traceSteps.length - 1}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:border-cyan-500 cursor-pointer"
                    title={ui.traceNextTitle}
                    aria-label={ui.traceNextTitle}
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Explicação do passo atual */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                {activeTraceStep.note}
              </div>

              {/* Estado das variáveis / contexto */}
              {Object.keys(activeTraceStep.variables).length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {ui.traceMemStateLabel}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.entries(activeTraceStep.variables).map(([k, v]) => (
                      <div
                        key={k}
                        className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs flex items-center justify-between gap-2"
                      >
                        <span className="text-cyan-600 dark:text-cyan-400 font-semibold truncate">{k}</span>
                        <span className="text-slate-800 dark:text-slate-200 truncate">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Checklist de Validação (Desafios e Bug-Hunt) */}
          {testResults && testResults.length > 0 && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {ui.validationTitle}
              </div>
              <div className="space-y-2">
                {testResults.map((res, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                      res.passed
                        ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-800 dark:text-emerald-200'
                        : 'border-rose-500/30 bg-rose-500/5 text-rose-800 dark:text-rose-200'
                    }`}
                  >
                    {res.passed ? (
                      <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={15} className="text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-0.5">
                      <div className="font-bold">{res.label}</div>
                      <div className="opacity-85 leading-snug">{res.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cartão Educativo Informal "Aha! Por que isso acontece?" */}
          {showAhaCard && (
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-50/70 dark:bg-cyan-950/20 p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-700 dark:text-cyan-300">
                <Sparkles size={15} />
                <span>{ui.ahaPrefix} · {currentItem.ahaTitle}</span>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentItem.ahaExplanation.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* AdSense Unit Discreto no Rodapé da Seção */}
      <AdUnit slot="1234554321" format="auto" label={ui.adLabel} />
    </div>
  );
};
