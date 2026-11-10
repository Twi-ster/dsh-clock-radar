window.__ModuleLoader__.load({
  id: 'dsh-clock-radar',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'dsh-clock-radar';
    const PANEL_ID = 'dsh-clock-radar';
    const SETTINGS_KEY = 'dsh-clock-radar/settings/v1';
    const LEGACY_SETTINGS_KEY = 'dsh-wallpaper-clock/settings/v1';
    const POMODORO_KEY = 'dsh-clock-radar/pomodoro/v1';
    const TAB_KEY = 'dsh-clock-radar/tab/v1';
    const API_PREFIX = '/clock-radar-api';

    const MIN_MINUTES = 1;
    const MAX_MINUTES = 180;
    const PRESETS = [15, 25, 45, 60];
    const DEFAULT_MINUTES = 25;
    const RING_RADIUS = 92;
    const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

    const DICT_ZH = {
      panel: '时钟事务',
      tabClock: '时钟',
      tabFocus: '番茄钟',
      tabTasks: '事务',

      settings: '时钟设置',
      close: '关闭',
      row24: '24 小时制',
      rowDate: '显示日期',
      rowDigital: '数字时间',
      rowAnalog: '指针表盘',
      rowSmooth: '秒针平滑',
      rowPlate: '玻璃底衬',
      reset: '恢复默认',
      clockAria: '本地时间',

      statusIdle: '准备开始',
      statusRunning: '专注中',
      statusPaused: '已暂停',
      statusDone: '已结束',
      minutesUnit: '分钟',
      start: '开始',
      restart: '再来一轮',
      pause: '暂停',
      resume: '继续',
      resetTimer: '重置',
      dismiss: '知道了',
      remainingAria: '剩余时间',
      focusHint: '到点会发浏览器系统通知，不响铃。计时器挂在插件上，切去对话页也照常走。',
      focusDenied: '浏览器通知被拒绝，到点只在页面内提示。',
      notifTitle: '番茄钟结束',
      notifBody: '这轮专注时间到了，歇一会儿。',

      tasksTitle: '校园事务雷达',
      subtitle: '今日、明日、逾期和未来 7 天的 DDL',
      refresh: '刷新',
      open: '打开完整看板',
      today: '今日',
      tomorrow: '明日',
      overdue: '逾期',
      within7: '7 天内',
      beyond7: '7 天外',
      undated: '未定',
      empty: '暂无',
      loading: '正在读取 Campus Radar…',
      offline: '没连上 Campus Radar',
      offlineHint: '这台机器上 127.0.0.1:3000 没有在跑 Campus Radar，所以这里没有 DDL 数据。没装它也不影响时钟和番茄钟。',
      review: '待确认',
      conflict: '冲突',
      online: '微信在线',
      offlineSource: '微信未连接',
      updated: '更新于',
      local: '本地数据',
    };

    const DICT_EN = {
      panel: 'Clock & Tasks',
      tabClock: 'Clock',
      tabFocus: 'Pomodoro',
      tabTasks: 'Tasks',

      settings: 'Clock settings',
      close: 'Close',
      row24: '24-hour time',
      rowDate: 'Show date',
      rowDigital: 'Digital time',
      rowAnalog: 'Analog dial',
      rowSmooth: 'Smooth second hand',
      rowPlate: 'Glass backing',
      reset: 'Reset defaults',
      clockAria: 'Local time',

      statusIdle: 'Ready',
      statusRunning: 'Focusing',
      statusPaused: 'Paused',
      statusDone: 'Finished',
      minutesUnit: 'min',
      start: 'Start',
      restart: 'Go again',
      pause: 'Pause',
      resume: 'Resume',
      resetTimer: 'Reset',
      dismiss: 'Got it',
      remainingAria: 'Time remaining',
      focusHint: 'A browser notification fires when time is up, with no sound. The timer lives in the plugin, so it keeps running while you chat.',
      focusDenied: 'Browser notifications are blocked, so the reminder stays on this page.',
      notifTitle: 'Pomodoro finished',
      notifBody: 'Focus time is up. Take a short break.',

      tasksTitle: 'Campus Radar',
      subtitle: 'Today, tomorrow, overdue, and the next 7 days',
      refresh: 'Refresh',
      open: 'Open full board',
      today: 'Today',
      tomorrow: 'Tomorrow',
      overdue: 'Overdue',
      within7: 'Within 7d',
      beyond7: 'Beyond 7d',
      undated: 'No date',
      empty: 'Nothing here',
      loading: 'Reading Campus Radar…',
      offline: 'Campus Radar is not connected',
      offlineHint: 'Nothing is serving 127.0.0.1:3000 on this machine, so there is no DDL data here. The clock and the pomodoro timer work without it.',
      review: 'Review',
      conflict: 'Conflict',
      online: 'WeChat online',
      offlineSource: 'WeChat offline',
      updated: 'Updated',
      local: 'Local data',
    };

    const DEFAULTS = Object.freeze({
      use24h: true,
      showDate: true,
      showDigital: true,
      showAnalog: true,
      smoothSecond: false,
      glassPlate: false,
    });

    const OPTION_ROWS = [
      ['row24', 'use24h'],
      ['rowDate', 'showDate'],
      ['rowDigital', 'showDigital'],
      ['rowAnalog', 'showAnalog'],
      ['rowSmooth', 'smoothSecond'],
      ['rowPlate', 'glassPlate'],
    ];

    const CSS = [
      '.dcr-page{position:relative;display:flex;flex-direction:column;flex:1 1 auto;align-self:stretch;width:100%;height:100%;min-height:0;overflow:hidden;background:transparent;color:var(--dsw-alias-label-primary);font-family:ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI Variable Display","Segoe UI","PingFang SC","Microsoft YaHei",system-ui,sans-serif;-webkit-user-select:none;user-select:none;}',
      '.dcr-tabs{position:relative;z-index:6;flex:none;display:flex;justify-content:center;align-items:center;gap:2px;padding:10px 14px 6px;}',
      '.dcr-tab{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border:1px solid transparent;border-radius:999px;background:transparent;color:var(--dsw-alias-label-tertiary);font:inherit;font-size:12px;letter-spacing:.06em;cursor:pointer;transition:background-color .16s ease,color .16s ease,border-color .16s ease;}',
      '.dcr-tab:hover{color:var(--dsw-alias-label-primary);background:color-mix(in srgb,var(--dsw-alias-label-primary) 7%,transparent);}',
      '.dcr-tab[aria-selected="true"]{color:var(--dsw-alias-label-primary);background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 80%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-border-l1) 64%,transparent);}',
      '.dcr-tab:focus-visible,.dcr-gear:focus-visible,.dcr-row:focus-visible,.dcr-close:focus-visible,.dcr-resetButton:focus-visible,.dcr-btn:focus-visible,.dcr-chip:focus-visible,.dcr-input:focus-visible,.dcr-bannerClose:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;}',
      '.dcr-tabDot{width:5px;height:5px;border-radius:999px;background:var(--dsw-alias-brand-primary);box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-brand-primary) 22%,transparent);}',
      '.dcr-body{position:relative;z-index:1;flex:1 1 auto;min-height:0;display:flex;}',
      '.dcr-view{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;}',

      '.dcr-banner{position:absolute;top:44px;left:50%;transform:translateX(-50%);z-index:9;display:flex;align-items:center;gap:10px;padding:8px 10px 8px 14px;border-radius:12px;border:1px solid color-mix(in srgb,var(--dsw-alias-brand-primary) 46%,transparent);background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);font-size:12.5px;line-height:1.4;box-shadow:0 18px 46px rgba(0,0,0,.22);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);animation:dcrBannerIn .22s ease;}',
      '@keyframes dcrBannerIn{from{opacity:0;transform:translate(-50%,-4px);}to{opacity:1;transform:translate(-50%,0);}}',
      '.dcr-bannerClose{flex:none;width:22px;height:22px;display:grid;place-items:center;padding:0;border:0;border-radius:7px;background:transparent;color:var(--dsw-alias-label-tertiary);cursor:pointer;}',
      '.dcr-bannerClose:hover{background:color-mix(in srgb,var(--dsw-alias-label-primary) 9%,transparent);color:var(--dsw-alias-label-primary);}',

      '.dcr-clock{position:relative;flex:1 1 auto;min-height:0;display:flex;align-items:center;justify-content:center;overflow:hidden;background:transparent;}',
      '.dcr-halo{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 46% 46% at 50% 46%,color-mix(in srgb,var(--dsw-alias-bg-layer-1) 62%,transparent) 0%,color-mix(in srgb,var(--dsw-alias-bg-layer-1) 22%,transparent) 46%,transparent 74%);}',
      '.dcr-clock[data-plate="1"] .dcr-halo{display:none;}',
      '.dcr-stage{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:clamp(8px,1.8vh,18px);padding:clamp(18px,4vh,40px) clamp(20px,4vw,48px);text-align:center;max-width:min(94vw,980px);}',
      '.dcr-stage--plate{padding:clamp(24px,4.5vh,48px) clamp(28px,5vw,64px);border-radius:34px;border:1px solid color-mix(in srgb,var(--dsw-alias-border-l1) 72%,transparent);background:color-mix(in srgb,var(--dsw-alias-bg-layer-1) 76%,transparent);-webkit-backdrop-filter:blur(28px) saturate(1.25);backdrop-filter:blur(28px) saturate(1.25);box-shadow:0 26px 80px rgba(0,0,0,.18),inset 0 1px 0 rgba(255,255,255,.18);}',
      '.dcr-date{font-size:clamp(12px,1.5vw,16px);font-weight:500;letter-spacing:.12em;line-height:1.4;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;text-shadow:0 1px 2px rgba(0,0,0,.12);}',
      '.dcr-digital{display:flex;align-items:baseline;justify-content:center;gap:.015em;max-width:100%;font-size:clamp(52px,min(13vw,16.5vh),146px);font-weight:200;line-height:.96;letter-spacing:-.015em;font-variant-numeric:tabular-nums;white-space:nowrap;color:var(--dsw-alias-label-primary);text-shadow:0 1px 1px rgba(0,0,0,.10),0 18px 60px rgba(0,0,0,.16);}',
      '.dcr-colon{opacity:.5;transform:translateY(-.055em);}',
      '.dcr-sec{color:var(--dsw-alias-brand-primary);text-shadow:0 1px 1px rgba(0,0,0,.10),0 14px 44px rgba(0,0,0,.14);}',
      '.dcr-meridiem{margin-left:.16em;font-size:.2em;font-weight:600;letter-spacing:.14em;color:var(--dsw-alias-label-tertiary);transform:translateY(-.12em);}',
      '.dcr-dial{display:block;width:clamp(168px,min(30vh,56vw),288px);height:auto;aspect-ratio:1 / 1;margin-top:clamp(0px,1vh,8px);filter:drop-shadow(0 14px 40px rgba(0,0,0,.12));}',
      '.dcr-zone{font-size:10.5px;letter-spacing:.08em;color:var(--dsw-alias-label-tertiary);opacity:.9;font-variant-numeric:tabular-nums;white-space:nowrap;}',
      '.dcr-gear{position:absolute;top:8px;right:16px;z-index:3;width:34px;height:34px;display:grid;place-items:center;padding:0;border-radius:50%;border:1px solid transparent;background:transparent;color:var(--dsw-alias-label-tertiary);cursor:pointer;opacity:.5;transition:opacity .18s ease,background-color .18s ease,color .18s ease;}',
      '.dcr-gear:hover{opacity:1;color:var(--dsw-alias-label-primary);background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 72%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-border-l1) 60%,transparent);}',
      '.dcr-panel{position:absolute;top:48px;right:16px;z-index:4;width:min(272px,calc(100vw - 28px));padding:8px 8px 10px;border-radius:16px;border:1px solid color-mix(in srgb,var(--dsw-alias-border-l2) 72%,transparent);background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);box-shadow:0 22px 60px rgba(0,0,0,.28),0 2px 8px rgba(0,0,0,.10);-webkit-backdrop-filter:blur(24px) saturate(1.2);backdrop-filter:blur(24px) saturate(1.2);}',
      '.dcr-panelHead{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:4px 4px 4px 10px;}',
      '.dcr-panelTitle{font-size:11px;font-weight:600;letter-spacing:.14em;color:var(--dsw-alias-label-tertiary);}',
      '.dcr-close{width:24px;height:24px;display:grid;place-items:center;padding:0;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-tertiary);cursor:pointer;}',
      '.dcr-close:hover{background:color-mix(in srgb,var(--dsw-alias-label-primary) 8%,transparent);color:var(--dsw-alias-label-primary);}',
      '.dcr-row{display:flex;align-items:center;justify-content:space-between;width:100%;gap:14px;padding:8px 10px;border:0;border-radius:10px;background:transparent;color:inherit;font:inherit;text-align:left;cursor:pointer;}',
      '.dcr-row:hover{background:color-mix(in srgb,var(--dsw-alias-label-primary) 7%,transparent);}',
      '.dcr-rowLabel{font-size:13px;line-height:1.35;}',
      '.dcr-track{position:relative;flex:none;width:38px;height:22px;border-radius:999px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 12%,transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--dsw-alias-border-l2) 70%,transparent);transition:background-color .16s ease,box-shadow .16s ease;}',
      '.dcr-row[aria-checked="true"] .dcr-track{background:var(--dsw-alias-brand-primary);box-shadow:inset 0 0 0 1px transparent;}',
      '.dcr-knob{position:absolute;top:3px;left:3px;transition:transform .16s ease;}',
      '.dcr-row[aria-checked="true"] .dcr-knob{transform:translateX(16px);}',
      '.dcr-resetButton{width:calc(100% - 8px);margin:8px 4px 2px;padding:8px;border-radius:10px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;cursor:pointer;}',
      '.dcr-resetButton:hover{background:color-mix(in srgb,var(--dsw-alias-label-primary) 7%,transparent);color:var(--dsw-alias-label-primary);}',

      '.dcr-focus{flex:1 1 auto;min-height:0;display:flex;align-items:center;justify-content:center;overflow:auto;padding:8px 24px 40px;}',
      '.dcr-focusStage{display:flex;flex-direction:column;align-items:center;gap:clamp(14px,2.4vh,24px);width:100%;max-width:min(92vw,440px);}',
      '.dcr-ring{position:relative;width:clamp(196px,min(38vh,58vw),268px);aspect-ratio:1 / 1;display:grid;place-items:center;}',
      '.dcr-ringSvg{position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 14px 40px rgba(0,0,0,.10));}',
      '.dcr-ringCenter{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center;}',
      '.dcr-ringTime{font-size:clamp(30px,min(7.4vh,7vw),44px);font-weight:200;line-height:1;font-variant-numeric:tabular-nums;letter-spacing:-.01em;}',
      '.dcr-ringLabel{font-size:10.5px;letter-spacing:.16em;color:var(--dsw-alias-label-tertiary);}',
      '.dcr-presets{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;}',
      '.dcr-chip{padding:5px 11px;border-radius:999px;border:1px solid color-mix(in srgb,var(--dsw-alias-border-l1) 72%,transparent);background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;cursor:pointer;font-variant-numeric:tabular-nums;}',
      '.dcr-chip:hover:not(:disabled){color:var(--dsw-alias-label-primary);background:color-mix(in srgb,var(--dsw-alias-label-primary) 7%,transparent);}',
      '.dcr-chip[aria-pressed="true"]{color:var(--dsw-alias-label-primary);border-color:color-mix(in srgb,var(--dsw-alias-brand-primary) 60%,transparent);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 14%,transparent);}',
      '.dcr-chip:disabled{opacity:.45;cursor:default;}',
      '.dcr-controls{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;}',
      '.dcr-btn{display:inline-flex;align-items:center;gap:6px;padding:7px 16px;border-radius:9px;border:1px solid color-mix(in srgb,var(--dsw-alias-border-l1) 78%,transparent);background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 82%,transparent);color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;cursor:pointer;transition:background-color .16s ease,border-color .16s ease;}',
      '.dcr-btn:hover{background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 100%,transparent);}',
      '.dcr-btn--primary{border-color:color-mix(in srgb,var(--dsw-alias-brand-primary) 62%,transparent);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,transparent);}',
      '.dcr-btn--primary:hover{background:color-mix(in srgb,var(--dsw-alias-brand-primary) 24%,transparent);}',
      '.dcr-input{width:64px;padding:6px 8px;border-radius:9px;border:1px solid color-mix(in srgb,var(--dsw-alias-border-l2) 72%,transparent);background:color-mix(in srgb,var(--dsw-alias-bg-layer-1) 72%,transparent);color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;font-variant-numeric:tabular-nums;text-align:center;}',
      '.dcr-input:disabled{opacity:.5;}',
      '.dcr-field{display:inline-flex;align-items:center;gap:6px;}',
      '.dcr-unit{font-size:12px;color:var(--dsw-alias-label-tertiary);}',
      '.dcr-hint{font-size:11px;line-height:1.6;color:var(--dsw-alias-label-tertiary);text-align:center;max-width:32em;}',
      '.dcr-hint--warn{color:var(--dsw-alias-state-warn-primary);}',

      '.dcr-tasks{flex:1 1 auto;min-height:0;overflow:auto;padding:4px 28px 40px;background:color-mix(in srgb,var(--dsw-alias-bg-base) 90%,transparent);-webkit-backdrop-filter:blur(18px) saturate(1.1);backdrop-filter:blur(18px) saturate(1.1);}',
      '@media (max-width:720px){.dcr-tasks{padding:4px 16px 32px;}}',
      '@media (prefers-reduced-motion:reduce){.dcr-page *{transition:none !important;animation:none !important;}}',
    ].join('\n');

    /** Clamp to a two-digit clock field. */
    function pad2(value) {
      return value < 10 ? '0' + value : String(value);
    }

    function clampMinutes(value) {
      const number = Math.round(Number(value));
      if (!Number.isFinite(number)) return DEFAULT_MINUTES;
      return Math.min(MAX_MINUTES, Math.max(MIN_MINUTES, number));
    }

    function formatDuration(ms) {
      const total = Math.max(0, Math.ceil(ms / 1000));
      const minutes = Math.floor(total / 60);
      return pad2(minutes) + ':' + pad2(total % 60);
    }

    /** Read the persisted clock options, falling back to the old clock key. */
    function readSettings() {
      const settings = Object.assign({}, DEFAULTS);
      const keys = [SETTINGS_KEY, LEGACY_SETTINGS_KEY];
      for (const key of keys) {
        try {
          const raw = window.localStorage.getItem(key);
          if (raw === null) continue;
          const parsed = JSON.parse(raw);
          if (parsed === null || typeof parsed !== 'object') continue;
          for (const name of Object.keys(DEFAULTS)) {
            if (typeof parsed[name] === 'boolean') settings[name] = parsed[name];
          }
          return settings;
        } catch (error) {
          /* A blocked or corrupt storage entry keeps the defaults. */
        }
      }
      return settings;
    }

    function writeSettings(settings) {
      try {
        window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      } catch (error) {
        /* Private mode or a full quota: the session keeps its in-memory value. */
      }
    }

    function readTab() {
      try {
        const raw = window.localStorage.getItem(TAB_KEY);
        if (raw === 'clock' || raw === 'focus' || raw === 'tasks') return raw;
      } catch (error) {
        /* fall through to the default tab */
      }
      return 'clock';
    }

    function writeTab(tab) {
      try {
        window.localStorage.setItem(TAB_KEY, tab);
      } catch (error) {
        /* the tab choice just stops persisting */
      }
    }

    function readPomodoro() {
      const state = {
        minutes: DEFAULT_MINUTES,
        phase: 'idle',
        endsAt: null,
        remaining: DEFAULT_MINUTES * 60000,
      };
      try {
        const raw = window.localStorage.getItem(POMODORO_KEY);
        if (raw === null) return state;
        const parsed = JSON.parse(raw);
        if (parsed === null || typeof parsed !== 'object') return state;
        if (typeof parsed.minutes === 'number') state.minutes = clampMinutes(parsed.minutes);
        if (parsed.phase === 'running' || parsed.phase === 'paused' || parsed.phase === 'done' || parsed.phase === 'idle') {
          state.phase = parsed.phase;
        }
        if (typeof parsed.endsAt === 'number' && Number.isFinite(parsed.endsAt)) state.endsAt = parsed.endsAt;
        if (typeof parsed.remaining === 'number' && Number.isFinite(parsed.remaining) && parsed.remaining >= 0) {
          state.remaining = parsed.remaining;
        }
        if (state.phase === 'running' && state.endsAt === null) state.phase = 'paused';
        if (state.phase !== 'running') state.endsAt = null;
        if (state.phase === 'idle') state.remaining = state.minutes * 60000;
        if (state.phase === 'done') state.remaining = 0;
      } catch (error) {
        /* A corrupt entry just starts a fresh timer. */
      }
      return state;
    }

    function writePomodoro(state) {
      try {
        window.localStorage.setItem(POMODORO_KEY, JSON.stringify(state));
      } catch (error) {
        /* the timer keeps running in memory */
      }
    }

    function notificationState() {
      try {
        if (typeof Notification === 'undefined') return 'unsupported';
        return Notification.permission;
      } catch (error) {
        return 'unsupported';
      }
    }

    /**
     * Pomodoro engine that lives beside the plugin, not inside the page: the
     * module loads at boot (`immediately`), so the countdown keeps running while
     * the reader is somewhere else in the GUI and the browser notification still
     * fires. State is persisted with an absolute end time, so a reload resumes
     * the same countdown instead of restarting it.
     */
    function createPomodoro(options) {
      let state = readPomodoro();
      const listeners = new Set();
      let ticker = 0;

      if (state.phase === 'running') {
        if (state.endsAt !== null && state.endsAt > Date.now()) {
          state.remaining = state.endsAt - Date.now();
        } else {
          state.phase = 'done';
          state.endsAt = null;
          state.remaining = 0;
          writePomodoro(state);
        }
      }

      const emit = () => {
        for (const listener of listeners) {
          try {
            listener();
          } catch (error) {
            /* one broken subscriber must not stop the timer */
          }
        }
      };

      const stopTicker = () => {
        if (ticker !== 0) {
          window.clearInterval(ticker);
          ticker = 0;
        }
      };

      const remainingNow = () => (
        state.phase === 'running'
          ? Math.max(0, state.endsAt - Date.now())
          : state.remaining
      );

      const startTicker = () => {
        stopTicker();
        ticker = window.setInterval(() => {
          if (state.phase !== 'running') return;
          if (remainingNow() <= 0) finish();
        }, 200);
      };

      const finish = () => {
        state.phase = 'done';
        state.endsAt = null;
        state.remaining = 0;
        stopTicker();
        writePomodoro(state);
        emit();
        try {
          options.onFinish();
        } catch (error) {
          /* a blocked notification must not break the engine */
        }
      };

      const setMinutes = (value) => {
        const minutes = clampMinutes(value);
        if (minutes === state.minutes) return;
        state.minutes = minutes;
        if (state.phase === 'idle' || state.phase === 'done') {
          state.phase = 'idle';
          state.endsAt = null;
          state.remaining = minutes * 60000;
        }
        writePomodoro(state);
        emit();
      };

      const engine = {
        getSnapshot() {
          return {
            minutes: state.minutes,
            phase: state.phase,
            remaining: remainingNow(),
            endsAt: state.endsAt,
          };
        },
        getPhase() {
          return state.phase;
        },
        subscribe(listener) {
          listeners.add(listener);
          return () => {
            listeners.delete(listener);
          };
        },
        setMinutes,
        start(value) {
          const minutes = clampMinutes(value === undefined ? state.minutes : value);
          state.minutes = minutes;
          state.phase = 'running';
          state.endsAt = Date.now() + minutes * 60000;
          state.remaining = minutes * 60000;
          startTicker();
          writePomodoro(state);
          emit();
        },
        pause() {
          if (state.phase !== 'running') return;
          state.remaining = remainingNow();
          state.endsAt = null;
          state.phase = 'paused';
          stopTicker();
          writePomodoro(state);
          emit();
        },
        resume() {
          if (state.phase !== 'paused') return;
          if (state.remaining <= 0) {
            finish();
            return;
          }
          state.phase = 'running';
          state.endsAt = Date.now() + state.remaining;
          startTicker();
          writePomodoro(state);
          emit();
        },
        reset() {
          stopTicker();
          state.phase = 'idle';
          state.endsAt = null;
          state.remaining = state.minutes * 60000;
          writePomodoro(state);
          emit();
        },
        dismiss() {
          if (state.phase !== 'done') return;
          state.phase = 'idle';
          state.remaining = state.minutes * 60000;
          writePomodoro(state);
          emit();
        },
        begin() {
          if (state.phase === 'running') startTicker();
        },
        dispose() {
          stopTicker();
          listeners.clear();
          document.removeEventListener('visibilitychange', onVisible);
        },
      };

      const onVisible = () => {
        if (document.hidden) return;
        if (state.phase === 'running') {
          if (remainingNow() <= 0) finish();
          else emit();
        }
      };
      document.addEventListener('visibilitychange', onVisible);

      return engine;
    }

    /**
     * Current time, re-derived on every wall-clock second boundary. Rescheduling
     * from Date.now() each tick keeps the display aligned to the second instead
     * of accumulating timer drift, and a visibility change resyncs after
     * background throttling.
     */
    function useNow() {
      const [now, setNow] = React.useState(() => new Date());
      React.useEffect(() => {
        let timer = 0;
        const schedule = () => {
          const delay = 1000 - (Date.now() % 1000) + 8;
          timer = window.setTimeout(() => {
            setNow(new Date());
            schedule();
          }, delay);
        };
        schedule();
        const onVisibility = () => {
          if (!document.hidden) setNow(new Date());
        };
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
          window.clearTimeout(timer);
          document.removeEventListener('visibilitychange', onVisibility);
        };
      }, []);
      return now;
    }

    /** Re-render once per animation frame while a smooth second hand is on. */
    function useFrameLoop(enabled) {
      const [, setFrame] = React.useState(0);
      React.useEffect(() => {
        if (!enabled) return undefined;
        let raf = 0;
        const loop = () => {
          setFrame((value) => (value + 1) % 1000000);
          raf = window.requestAnimationFrame(loop);
        };
        raf = window.requestAnimationFrame(loop);
        return () => window.cancelAnimationFrame(raf);
      }, [enabled]);
    }

    /** Follow locale switches and late dictionary registration. */
    function useLocaleSnapshot(locale) {
      const [snapshot, setSnapshot] = React.useState(() => locale.getSnapshot());
      React.useEffect(() => {
        const off = locale.subscribe(() => setSnapshot(locale.getSnapshot()));
        return off;
      }, [locale]);
      return snapshot;
    }

    /** Subscribe to the running phase only: a stable string bails out of re-render. */
    function usePhase(engine) {
      const [phase, setPhase] = React.useState(() => engine.getPhase());
      React.useEffect(() => {
        setPhase(engine.getPhase());
        const off = engine.subscribe(() => setPhase(engine.getPhase()));
        return off;
      }, [engine]);
      return phase;
    }

    /** Subscribe to the whole timer snapshot (the pomodoro tab only). */
    function usePomodoro(engine) {
      const [snapshot, setSnapshot] = React.useState(() => engine.getSnapshot());
      React.useEffect(() => {
        setSnapshot(engine.getSnapshot());
        const off = engine.subscribe(() => setSnapshot(engine.getSnapshot()));
        return off;
      }, [engine]);
      return snapshot;
    }

    function formatClock(date, use24h) {
      const rawHours = date.getHours();
      let hours = rawHours;
      let meridiem = '';
      if (!use24h) {
        meridiem = rawHours >= 12 ? 'PM' : 'AM';
        hours = rawHours % 12;
        if (hours === 0) hours = 12;
      }
      return {
        hours: use24h ? pad2(hours) : String(hours),
        minutes: pad2(date.getMinutes()),
        seconds: pad2(date.getSeconds()),
        meridiem,
      };
    }

    function formatDateLabel(date, langTag) {
      try {
        const dateParts = { year: 'numeric', month: 'long', day: 'numeric' };
        if (langTag.indexOf('zh') === 0) {
          const day = new Intl.DateTimeFormat(langTag, dateParts).format(date);
          const weekday = new Intl.DateTimeFormat(langTag, { weekday: 'long' }).format(date);
          return day + ' ' + weekday;
        }
        return new Intl.DateTimeFormat(langTag, Object.assign({ weekday: 'long' }, dateParts)).format(date);
      } catch (error) {
        return date.toDateString();
      }
    }

    function formatTimeLabel(date, langTag) {
      try {
        return new Intl.DateTimeFormat(langTag, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(date);
      } catch (error) {
        return date.toTimeString();
      }
    }

    function zoneLabel(date) {
      let zone = '';
      try {
        zone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      } catch (error) {
        zone = '';
      }
      const offset = -date.getTimezoneOffset();
      const sign = offset < 0 ? '-' : '+';
      const abs = Math.abs(offset);
      const stamp = 'UTC' + sign + pad2(Math.floor(abs / 60)) + ':' + pad2(abs % 60);
      return zone.length > 0 ? zone + ' \u00b7 ' + stamp : stamp;
    }

    /** Point on the dial; 0 degrees points to twelve o'clock. */
    function polar(angle, radius) {
      const radians = ((angle - 90) * Math.PI) / 180;
      return [100 + Math.cos(radians) * radius, 100 + Math.sin(radians) * radius];
    }

    const TICK_MARKS = (() => {
      const marks = [];
      for (let index = 0; index < 60; index += 1) {
        const major = index % 5 === 0;
        const inner = polar(index * 6, major ? 82 : 86);
        const outer = polar(index * 6, 91);
        marks.push(h('line', {
          key: index,
          x1: inner[0],
          y1: inner[1],
          x2: outer[0],
          y2: outer[1],
          style: {
            stroke: major ? 'var(--dsw-alias-label-secondary)' : 'var(--dsw-alias-border-l2)',
            strokeWidth: major ? 1.7 : 1,
            strokeLinecap: 'round',
            opacity: major ? 0.85 : 0.55,
          },
        }));
      }
      return h('g', null, marks);
    })();

    const NUMERALS = (() => {
      const labels = [
        ['12', 0],
        ['3', 90],
        ['6', 180],
        ['9', 270],
      ];
      return h('g', null, labels.map(([text, angle]) => {
        const point = polar(angle, 69);
        return h('text', {
          key: text,
          x: point[0],
          y: point[1],
          textAnchor: 'middle',
          dominantBaseline: 'central',
          style: {
            fill: 'var(--dsw-alias-label-secondary)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.04em',
            opacity: 0.8,
          },
        }, text);
      }));
    })();

    function handLine(angle, from, to) {
      const start = polar(angle, from);
      const end = polar(angle, to);
      return { x1: start[0], y1: start[1], x2: end[0], y2: end[1] };
    }

    function Dial(props) {
      useFrameLoop(props.smooth);
      const date = props.smooth ? new Date() : props.now;
      const hours = date.getHours() % 12;
      const minutes = date.getMinutes();
      const seconds = props.smooth
        ? date.getSeconds() + date.getMilliseconds() / 1000
        : date.getSeconds();
      const hourAngle = hours * 30 + minutes * 0.5 + seconds * (0.5 / 60);
      const minuteAngle = minutes * 6 + seconds * 0.1;
      const secondAngle = seconds * 6;
      const tip = polar(secondAngle, 76);
      return h('svg', {
        viewBox: '0 0 200 200',
        className: 'dcr-dial',
        'aria-hidden': 'true',
        focusable: 'false',
      },
        h('circle', {
          cx: 100,
          cy: 100,
          r: 96,
          fill: 'none',
          style: {
            stroke: 'var(--dsw-alias-border-l1)',
            strokeWidth: 1.2,
            opacity: 0.7,
          },
        }),
        TICK_MARKS,
        NUMERALS,
        h('line', Object.assign({
          key: 'hour-hand',
          style: {
            stroke: 'var(--dsw-alias-label-primary)',
            strokeWidth: 3.4,
            strokeLinecap: 'round',
            opacity: 0.9,
          },
        }, handLine(hourAngle, 0, 48))),
        h('line', Object.assign({
          key: 'minute-hand',
          style: {
            stroke: 'var(--dsw-alias-label-primary)',
            strokeWidth: 2,
            strokeLinecap: 'round',
            opacity: 0.72,
          },
        }, handLine(minuteAngle, 0, 67))),
        h('line', Object.assign({
          key: 'second-hand',
          style: {
            stroke: 'var(--dsw-alias-brand-primary)',
            strokeWidth: 1.1,
            strokeLinecap: 'round',
          },
        }, handLine(secondAngle, -16, 76))),
        h('circle', {
          key: 'second-tip',
          cx: tip[0],
          cy: tip[1],
          r: 2.2,
          style: { fill: 'var(--dsw-alias-brand-primary)' },
        }),
        h('circle', {
          key: 'cap',
          cx: 100,
          cy: 100,
          r: 3.2,
          style: { fill: 'var(--dsw-alias-brand-primary)' },
        }),
        h('circle', {
          key: 'cap-inner',
          cx: 100,
          cy: 100,
          r: 1.2,
          style: { fill: 'var(--dsw-alias-label-primary)', opacity: 0.9 },
        })
      );
    }

    function GearIcon() {
      return h('svg', {
        width: 18,
        height: 18,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.7,
        strokeLinecap: 'round',
        'aria-hidden': 'true',
        focusable: 'false',
      },
        h('path', { d: 'M4 7.5h9.2M17.2 7.5H20' }),
        h('circle', { cx: 15.2, cy: 7.5, r: 2 }),
        h('path', { d: 'M4 16.5h2.8M10.8 16.5H20' }),
        h('circle', { cx: 8.8, cy: 16.5, r: 2 }),
        h('path', { d: 'M4 12h6.4M14.4 12H20' }),
        h('circle', { cx: 12.4, cy: 12, r: 2 })
      );
    }

    function CloseIcon() {
      return h('svg', {
        width: 14,
        height: 14,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        strokeLinecap: 'round',
        'aria-hidden': 'true',
        focusable: 'false',
      },
        h('path', { d: 'M6 6l12 12M18 6L6 18' })
      );
    }

    function ClockIcon(props) {
      const size = typeof props.size === 'number' && props.size > 0 ? props.size : 16;
      const active = props.active === true;
      return h('svg', {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': 'true',
        focusable: 'false',
        style: {
          display: 'block',
          color: active ? 'var(--dsw-alias-label-primary)' : 'var(--dsw-alias-label-secondary)',
        },
      },
        h('circle', { cx: 12, cy: 12, r: 8.2 }),
        h('path', { d: 'M12 7.4V12l3.1 1.9' }),
        h('circle', { cx: 12, cy: 12, r: 0.9, fill: 'currentColor', stroke: 'none' })
      );
    }

    function createClockView(locale) {
      return function ClockView() {
        const t = locale.bind(NS);
        const snapshot = useLocaleSnapshot(locale);
        const now = useNow();
        const [settings, setSettings] = React.useState(readSettings);
        const [panelOpen, setPanelOpen] = React.useState(false);
        const panelRef = React.useRef(null);
        const gearRef = React.useRef(null);

        React.useEffect(() => {
          if (!panelOpen) return undefined;
          const onPointerDown = (event) => {
            const target = event.target;
            if (panelRef.current !== null && panelRef.current.contains(target)) return;
            if (gearRef.current !== null && gearRef.current.contains(target)) return;
            setPanelOpen(false);
          };
          const onKeyDown = (event) => {
            if (event.key === 'Escape') setPanelOpen(false);
          };
          document.addEventListener('pointerdown', onPointerDown, true);
          document.addEventListener('keydown', onKeyDown);
          return () => {
            document.removeEventListener('pointerdown', onPointerDown, true);
            document.removeEventListener('keydown', onKeyDown);
          };
        }, [panelOpen]);

        const update = (patch) => {
          setSettings((previous) => {
            const next = Object.assign({}, previous, patch);
            writeSettings(next);
            return next;
          });
        };

        const langTag = snapshot.active === 'zh'
          ? 'zh-CN'
          : snapshot.active === 'en'
            ? 'en-US'
            : snapshot.active;
        const clock = formatClock(now, settings.use24h);
        const iso = now.toISOString();

        const digital = settings.showDigital
          ? h('time', {
            className: 'dcr-digital',
            dateTime: iso,
            role: 'timer',
            'aria-live': 'off',
            'aria-label': formatTimeLabel(now, langTag),
          },
            h('span', null, clock.hours),
            h('span', { className: 'dcr-colon', 'aria-hidden': 'true' }, ':'),
            h('span', null, clock.minutes),
            h('span', { className: 'dcr-colon', 'aria-hidden': 'true' }, ':'),
            h('span', { className: 'dcr-sec' }, clock.seconds),
            !settings.use24h ? h('span', { className: 'dcr-meridiem' }, clock.meridiem) : null
          )
          : null;

        return h('div', { className: 'dcr-view dcr-clock', 'data-plate': settings.glassPlate ? '1' : '0' },
          h('div', { className: 'dcr-halo', 'aria-hidden': 'true' }),
          h('div', {
            className: 'dcr-stage' + (settings.glassPlate ? ' dcr-stage--plate' : ''),
          },
            settings.showDate
              ? h('time', { className: 'dcr-date', dateTime: iso }, formatDateLabel(now, langTag))
              : null,
            digital,
            settings.showAnalog
              ? h(Dial, { now: now, smooth: settings.smoothSecond })
              : null,
            h('div', { className: 'dcr-zone', 'aria-hidden': 'true' }, zoneLabel(now))
          ),
          h('button', {
            ref: gearRef,
            type: 'button',
            className: 'dcr-gear',
            'aria-label': t('settings'),
            'aria-expanded': panelOpen ? 'true' : 'false',
            onClick: () => setPanelOpen((open) => !open),
          }, h(GearIcon)),
          panelOpen
            ? h('div', {
              ref: panelRef,
              className: 'dcr-panel',
              role: 'dialog',
              'aria-label': t('settings'),
            },
              h('div', { className: 'dcr-panelHead' },
                h('span', { className: 'dcr-panelTitle' }, t('settings')),
                h('button', {
                  type: 'button',
                  className: 'dcr-close',
                  'aria-label': t('close'),
                  onClick: () => setPanelOpen(false),
                }, h(CloseIcon))
              ),
              OPTION_ROWS.map(([labelKey, settingKey]) => h('button', {
                key: settingKey,
                type: 'button',
                role: 'switch',
                'aria-checked': settings[settingKey] ? 'true' : 'false',
                className: 'dcr-row',
                onClick: () => update({ [settingKey]: !settings[settingKey] }),
              },
                h('span', { className: 'dcr-rowLabel' }, t(labelKey)),
                h('span', { className: 'dcr-track', 'aria-hidden': 'true' },
                  h('svg', {
                    className: 'dcr-knob',
                    width: 16,
                    height: 16,
                    viewBox: '0 0 16 16',
                    focusable: 'false',
                  },
                    h('circle', { cx: 8, cy: 8, r: 7.4, fill: '#fff', stroke: 'rgba(0,0,0,.30)', strokeWidth: 1 })
                  )
                )
              )),
              h('button', {
                type: 'button',
                className: 'dcr-resetButton',
                onClick: () => update(Object.assign({}, DEFAULTS)),
              }, t('reset'))
            )
            : null
        );
      };
    }

    function createFocusView(locale, engine) {
      return function FocusView() {
        const t = locale.bind(NS);
        useLocaleSnapshot(locale);
        const snapshot = usePomodoro(engine);
        const [draft, setDraft] = React.useState(() => String(snapshot.minutes));
        const [permission, setPermission] = React.useState(notificationState);

        const phase = snapshot.phase;
        const minutes = snapshot.minutes;
        const editable = phase === 'idle' || phase === 'done';
        const totalMs = minutes * 60000;
        const ratio = phase === 'idle'
          ? 1
          : totalMs > 0
            ? Math.min(1, Math.max(0, snapshot.remaining / totalMs))
            : 0;
        const offset = RING_CIRCUMFERENCE * (1 - ratio);

        React.useEffect(() => {
          setDraft(String(minutes));
        }, [minutes]);

        const status = phase === 'running'
          ? t('statusRunning')
          : phase === 'paused'
            ? t('statusPaused')
            : phase === 'done'
              ? t('statusDone')
              : t('statusIdle');

        const askPermission = () => {
          try {
            if (notificationState() !== 'default') {
              setPermission(notificationState());
              return;
            }
            const request = Notification.requestPermission();
            if (request && typeof request.then === 'function') {
              request.then(() => setPermission(notificationState())).catch(() => setPermission(notificationState()));
            } else {
              setPermission(notificationState());
            }
          } catch (error) {
            setPermission(notificationState());
          }
        };

        const onMinutesInput = (event) => {
          const raw = event.target.value;
          setDraft(raw);
          const value = Number(raw);
          if (Number.isFinite(value) && value >= MIN_MINUTES && value <= MAX_MINUTES) {
            engine.setMinutes(value);
          }
        };

        const onMinutesBlur = () => {
          setDraft(String(minutes));
        };

        const onPrimary = () => {
          if (phase === 'running') {
            engine.pause();
            return;
          }
          if (phase === 'paused') {
            engine.resume();
            return;
          }
          askPermission();
          engine.start();
        };

        const primaryLabel = phase === 'running'
          ? t('pause')
          : phase === 'paused'
            ? t('resume')
            : phase === 'done'
              ? t('restart')
              : t('start');

        return h('div', { className: 'dcr-view dcr-focus' },
          h('div', { className: 'dcr-focusStage' },
            h('div', { className: 'dcr-ring' },
              h('svg', {
                className: 'dcr-ringSvg',
                viewBox: '0 0 200 200',
                'aria-hidden': 'true',
                focusable: 'false',
              },
                h('circle', {
                  cx: 100,
                  cy: 100,
                  r: RING_RADIUS,
                  fill: 'none',
                  stroke: 'var(--dsw-alias-border-l1)',
                  strokeWidth: 1.6,
                  opacity: 0.6,
                }),
                h('circle', {
                  cx: 100,
                  cy: 100,
                  r: RING_RADIUS,
                  fill: 'none',
                  stroke: 'var(--dsw-alias-brand-primary)',
                  strokeWidth: 3,
                  strokeLinecap: 'round',
                  strokeDasharray: RING_CIRCUMFERENCE,
                  strokeDashoffset: offset,
                  transform: 'rotate(-90 100 100)',
                  style: { transition: 'stroke-dashoffset .3s linear' },
                })
              ),
              h('div', { className: 'dcr-ringCenter' },
                h('time', {
                  className: 'dcr-ringTime',
                  role: 'timer',
                  'aria-live': 'off',
                  'aria-label': t('remainingAria') + ' ' + formatDuration(snapshot.remaining),
                }, formatDuration(snapshot.remaining)),
                h('div', { className: 'dcr-ringLabel' }, status)
              )
            ),
            h('div', { className: 'dcr-presets' },
              PRESETS.map((preset) => h('button', {
                key: preset,
                type: 'button',
                className: 'dcr-chip',
                'aria-pressed': preset === minutes ? 'true' : 'false',
                disabled: !editable,
                onClick: () => engine.setMinutes(preset),
              }, preset + ' ' + t('minutesUnit')))
            ),
            h('div', { className: 'dcr-controls' },
              h('label', { className: 'dcr-field' },
                h('input', {
                  className: 'dcr-input',
                  type: 'number',
                  min: MIN_MINUTES,
                  max: MAX_MINUTES,
                  step: 1,
                  inputMode: 'numeric',
                  value: draft,
                  disabled: !editable,
                  'aria-label': t('minutesUnit'),
                  onChange: onMinutesInput,
                  onBlur: onMinutesBlur,
                }),
                h('span', { className: 'dcr-unit' }, t('minutesUnit'))
              ),
              h('button', {
                type: 'button',
                className: 'dcr-btn' + (phase === 'running' ? '' : ' dcr-btn--primary'),
                onClick: onPrimary,
              }, primaryLabel),
              phase !== 'idle'
                ? h('button', {
                  type: 'button',
                  className: 'dcr-btn',
                  onClick: () => engine.reset(),
                }, t('resetTimer'))
                : null
            ),
            h('p', { className: 'dcr-hint' }, t('focusHint')),
            permission === 'denied'
              ? h('p', { className: 'dcr-hint dcr-hint--warn' }, t('focusDenied'))
              : null
          )
        );
      };
    }

    const TASK_STYLE = {
      header: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
      },
      title: { margin: 0, fontSize: 22, lineHeight: 1.2, fontWeight: 650 },
      subtitle: {
        margin: '6px 0 0',
        fontSize: 13,
        color: 'var(--dsw-alias-label-secondary)',
      },
      actions: { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
      button: {
        border: '1px solid var(--dsw-alias-border-l1)',
        background: 'var(--dsw-alias-bg-layer-2)',
        color: 'var(--dsw-alias-label-primary)',
        borderRadius: 8,
        padding: '6px 10px',
        fontSize: 12,
        cursor: 'pointer',
      },
      linkButton: {
        border: '1px solid var(--dsw-alias-border-l1)',
        background: 'var(--dsw-alias-bg-layer-2)',
        color: 'var(--dsw-alias-brand-primary)',
        borderRadius: 8,
        padding: '6px 10px',
        fontSize: 12,
        textDecoration: 'none',
        cursor: 'pointer',
      },
      pill: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        borderRadius: 999,
        padding: '4px 9px',
        background: 'var(--dsw-alias-bg-layer-2)',
        fontSize: 11,
        color: 'var(--dsw-alias-label-secondary)',
      },
      dot: { width: 6, height: 6, borderRadius: 999, background: 'currentColor' },
      stats: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: 10,
        marginTop: 20,
      },
      stat: {
        border: '1px solid var(--dsw-alias-border-l1)',
        background: 'var(--dsw-alias-bg-layer-1)',
        borderRadius: 12,
        padding: '10px 12px',
      },
      statValue: { fontSize: 20, lineHeight: 1.1, fontWeight: 650 },
      statLabel: { marginTop: 4, fontSize: 11, color: 'var(--dsw-alias-label-secondary)' },
      section: { marginTop: 24 },
      sectionHead: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 8,
      },
      sectionTitle: { margin: 0, fontSize: 14, fontWeight: 600 },
      count: { fontSize: 11, color: 'var(--dsw-alias-label-secondary)' },
      grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
        gap: 10,
      },
      card: {
        display: 'block',
        border: '1px solid var(--dsw-alias-border-l1)',
        background: 'var(--dsw-alias-bg-layer-1)',
        borderRadius: 10,
        padding: '11px 12px',
        textDecoration: 'none',
        color: 'inherit',
      },
      cardTop: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
      badge: {
        borderRadius: 4,
        padding: '2px 5px',
        background: 'var(--dsw-alias-bg-layer-2)',
        color: 'var(--dsw-alias-label-secondary)',
        fontSize: 10,
      },
      cardTitle: {
        marginTop: 6,
        fontSize: 13,
        lineHeight: 1.45,
        fontWeight: 600,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      },
      meta: {
        marginTop: 7,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap',
        fontSize: 11,
        color: 'var(--dsw-alias-label-secondary)',
      },
      empty: {
        border: '1px dashed var(--dsw-alias-border-l1)',
        borderRadius: 10,
        padding: '10px 12px',
        fontSize: 12,
        color: 'var(--dsw-alias-label-tertiary)',
      },
      notice: {
        marginTop: 20,
        border: '1px solid var(--dsw-alias-state-error-primary)',
        background: 'var(--dsw-alias-bg-layer-1)',
        borderRadius: 12,
        padding: 14,
      },
      footer: {
        marginTop: 28,
        display: 'flex',
        justifyContent: 'space-between',
        gap: 10,
        flexWrap: 'wrap',
        fontSize: 11,
        color: 'var(--dsw-alias-label-tertiary)',
      },
    };

    function formatDue(task) {
      if (task.deadline) {
        return new Intl.DateTimeFormat('zh-CN', {
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Shanghai',
        }).format(new Date(task.deadline));
      }
      if (task.event_time_text) return task.event_time_text;
      if (task.event_start) {
        return new Intl.DateTimeFormat('zh-CN', {
          month: '2-digit',
          day: '2-digit',
          timeZone: 'Asia/Shanghai',
        }).format(new Date(task.event_start));
      }
      return '—';
    }

    function TaskCard(props) {
      const task = props.task;
      const t = props.t;
      const flags = [];
      if (task.conflict_status === 'conflict') flags.push(t('conflict'));
      else if (task.review_status === 'needs_review') flags.push(t('review'));

      return h('a', {
        href: 'http://127.0.0.1:3000/?tab=all-tasks',
        target: '_blank',
        rel: 'noreferrer',
        style: TASK_STYLE.card,
        title: task.title,
      },
        h('div', { style: TASK_STYLE.cardTop },
          h('span', { style: TASK_STYLE.badge }, task.category_name || task.task_type),
          flags.map((flag) => h('span', {
            key: flag,
            style: Object.assign({}, TASK_STYLE.badge, {
              color: flag === t('conflict')
                ? 'var(--dsw-alias-state-error-primary)'
                : 'var(--dsw-alias-state-warn-primary)',
            }),
          }, flag))
        ),
        h('div', { style: TASK_STYLE.cardTitle }, task.title),
        h('div', { style: TASK_STYLE.meta },
          h('span', null, formatDue(task)),
          task.course ? h('span', null, task.course) : null
        )
      );
    }

    function TaskGroup(props) {
      const items = props.items;
      return h('section', { style: TASK_STYLE.section },
        h('div', { style: TASK_STYLE.sectionHead },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: 7 } },
            h('span', { style: Object.assign({}, TASK_STYLE.dot, { color: props.tone }) }),
            h('h2', { style: TASK_STYLE.sectionTitle }, props.title)
          ),
          h('span', { style: TASK_STYLE.count }, String(items.length))
        ),
        items.length
          ? h('div', { style: TASK_STYLE.grid },
            items.map((task) => h(TaskCard, { key: task.id, task: task, t: props.t })))
          : h('div', { style: TASK_STYLE.empty }, props.t('empty'))
      );
    }

    function useRadarData() {
      const [state, setState] = React.useState({
        loading: true,
        error: null,
        tasks: null,
        overview: null,
        updated: null,
      });
      const [nonce, setNonce] = React.useState(0);

      React.useEffect(() => {
        let cancelled = false;

        async function load() {
          try {
            const taskRes = await fetch(API_PREFIX + '/tasks', { cache: 'no-store' });
            const taskJson = await taskRes.json();
            if (!taskJson.success) {
              throw new Error(taskJson.error || 'Campus Radar API error');
            }
            let overview = null;
            try {
              const overviewRes = await fetch(API_PREFIX + '/wechat/overview', { cache: 'no-store' });
              const overviewJson = await overviewRes.json();
              if (overviewJson.success) overview = overviewJson.data;
            } catch (error) {
              /* The task board is still useful when the bridge heartbeat fails. */
            }
            if (!cancelled) {
              setState({
                loading: false,
                error: null,
                tasks: taskJson.data,
                overview,
                updated: new Date(),
              });
            }
          } catch (error) {
            if (!cancelled) {
              setState((previous) => Object.assign({}, previous, {
                loading: false,
                error: error instanceof Error ? error.message : String(error),
              }));
            }
          }
        }

        load();
        const timer = window.setInterval(load, 30000);
        return () => {
          cancelled = true;
          window.clearInterval(timer);
        };
      }, [nonce]);

      return Object.assign({}, state, { refresh: () => setNonce((value) => value + 1) });
    }

    const TASK_GROUPS = [
      ['today', 'todayDdl', 'var(--dsw-alias-state-warn-primary)'],
      ['tomorrow', 'tomorrowDdl', 'var(--dsw-alias-state-warn-primary)'],
      ['overdue', 'overdueDdl', 'var(--dsw-alias-state-error-primary)'],
      ['within7', 'within7Ddl', 'var(--dsw-alias-brand-primary)'],
      ['beyond7', 'beyond7Ddl', 'var(--dsw-alias-label-secondary)'],
      ['undated', 'undatedDdl', 'var(--dsw-alias-label-tertiary)'],
    ];

    function createTasksView(locale) {
      return function TasksView() {
        const t = locale.bind(NS);
        useLocaleSnapshot(locale);
        const data = useRadarData();
        const sections = (data.tasks && data.tasks.sections) || {};
        const counts = (data.tasks && data.tasks.counts) || {};
        const health = data.overview && data.overview.source ? data.overview.source.health_status : null;
        const online = health === 'healthy';

        return h('div', { className: 'dcr-view dcr-tasks' },
          h('div', { style: TASK_STYLE.header },
            h('div', null,
              h('h1', { style: TASK_STYLE.title }, t('tasksTitle')),
              h('p', { style: TASK_STYLE.subtitle }, t('subtitle'))
            ),
            h('div', { style: TASK_STYLE.actions },
              h('span', { style: TASK_STYLE.pill },
                h('span', {
                  style: Object.assign({}, TASK_STYLE.dot, {
                    color: online
                      ? 'var(--dsw-alias-state-success-primary)'
                      : 'var(--dsw-alias-state-error-primary)',
                  }),
                }),
                online ? t('online') : t('offlineSource')
              ),
              h('button', {
                type: 'button',
                style: TASK_STYLE.button,
                onClick: data.refresh,
              }, t('refresh')),
              h('a', {
                href: 'http://127.0.0.1:3000',
                target: '_blank',
                rel: 'noreferrer',
                style: TASK_STYLE.linkButton,
              }, t('open'))
            )
          ),

          data.loading
            ? h('p', { style: Object.assign({}, TASK_STYLE.subtitle, { marginTop: 24 }) }, t('loading'))
            : data.error
              ? h('div', { style: TASK_STYLE.notice },
                h('strong', null, t('offline')),
                h('p', { style: TASK_STYLE.subtitle }, t('offlineHint'))
              )
              : h(React.Fragment, null,
                h('div', { style: TASK_STYLE.stats },
                  TASK_GROUPS.map(([label, key, tone]) => h('div', { key: key, style: TASK_STYLE.stat },
                    h('div', { style: Object.assign({}, TASK_STYLE.statValue, { color: tone }) },
                      counts[label] !== undefined ? counts[label] : (sections[key] || []).length
                    ),
                    h('div', { style: TASK_STYLE.statLabel }, t(label))
                  ))
                ),
                TASK_GROUPS.map(([label, key, tone]) => h(TaskGroup, {
                  key: key,
                  title: t(label),
                  items: sections[key] || [],
                  tone: tone,
                  t: t,
                })),
                h('div', { style: TASK_STYLE.footer },
                  h('span', null, t('local')),
                  h('span', null, data.updated
                    ? t('updated') + ' ' + data.updated.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                    : '')
                )
              )
        );
      };
    }

    function createPage(locale, engine) {
      const ClockView = createClockView(locale);
      const FocusView = createFocusView(locale, engine);
      const TasksView = createTasksView(locale);
      const TABS = [
        ['clock', 'tabClock'],
        ['focus', 'tabFocus'],
        ['tasks', 'tabTasks'],
      ];

      return function Page() {
        const t = locale.bind(NS);
        useLocaleSnapshot(locale);
        const [tab, setTab] = React.useState(readTab);
        const phase = usePhase(engine);

        const selectTab = (next) => {
          setTab(next);
          writeTab(next);
        };

        return h('div', { className: 'dcr-page' },
          h('style', null, CSS),
          h('div', { className: 'dcr-tabs', role: 'tablist', 'aria-label': t('panel') },
            TABS.map(([id, labelKey]) => h('button', {
              key: id,
              type: 'button',
              role: 'tab',
              'aria-selected': tab === id ? 'true' : 'false',
              className: 'dcr-tab',
              onClick: () => selectTab(id),
            },
              t(labelKey),
              id === 'focus' && phase === 'running'
                ? h('span', { className: 'dcr-tabDot', 'aria-hidden': 'true' })
                : null
            ))
          ),
          phase === 'done'
            ? h('div', { className: 'dcr-banner', role: 'status' },
              h('span', null, t('notifTitle') + ' · ' + t('notifBody')),
              h('button', {
                type: 'button',
                className: 'dcr-bannerClose',
                'aria-label': t('dismiss'),
                onClick: () => engine.dismiss(),
              }, h(CloseIcon))
            )
            : null,
          h('div', { className: 'dcr-body' },
            tab === 'clock'
              ? h(ClockView)
              : tab === 'focus'
                ? h(FocusView)
                : h(TasksView)
          )
        );
      };
    }

    return {
      name: 'dsh-clock-radar',
      inject: ['slots', 'locale'],
      apply(ctx) {
        const locale = ctx.locale;
        ctx.effect(() => {
          try {
            return locale.register(NS, 'zh', DICT_ZH);
          } catch (error) {
            return () => {};
          }
        }, 'dsh-clock-radar: zh dictionary');
        ctx.effect(() => {
          try {
            return locale.register(NS, 'en', DICT_EN);
          } catch (error) {
            return () => {};
          }
        }, 'dsh-clock-radar: en dictionary');

        const t = locale.bind(NS);

        /* The engine outlives the page, so the countdown and its notification
           keep working while the reader is in a conversation. */
        const engine = createPomodoro({
          onFinish() {
            if (notificationState() !== 'granted') return;
            try {
              const notice = new Notification(t('notifTitle'), {
                body: t('notifBody'),
                tag: 'dsh-clock-radar-pomodoro',
                silent: true,
              });
              notice.onclick = () => {
                try {
                  window.focus();
                } catch (error) {
                  /* the tab is gone */
                }
              };
            } catch (error) {
              /* the browser refuses a Notification constructor here */
            }
          },
        });
        ctx.effect(() => {
          engine.begin();
          return () => engine.dispose();
        }, 'dsh-clock-radar: pomodoro engine');

        const Page = createPage(locale, engine);

        ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist',
          id: PANEL_ID,
          order: 40,
          label: () => t('panel'),
        }, ClockIcon));

        ctx.slots.inject('main', () => ctx.slots.register({
          name: 'main',
          key: PANEL_ID,
        }, Page));
      },
    };
  },
});
