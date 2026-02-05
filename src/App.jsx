import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Studio Flow Companion — Quiet Assistant (Sellable v0.9)
 *
 * Target devices:
 * - Android phone (portrait) ✅ optimized
 * - Android tablet ✅ supported
 * - Laptop ✅ supported
 *
 * Implements:
 * ✅ Prep → Start Ritual → Session (locked)
 * ✅ One-hand tap zones (dominant side = large Next, opposite side = small Back)
 * ✅ Device profiles (phone/tablet/laptop) controlling geometry + typography + whisper behavior
 * ✅ Whisper fades unless intentionally revealed (phone: press-and-hold; tablet: tap; laptop: mouse down)
 * ✅ Rhythm (qualitative), default OFF
 * ✅ Hold (locks movement + stops rhythm)
 * ✅ No “End” state (silence)
 * ✅ Offline-first persistence (localStorage) + Resume last session
 * ✅ Import / Export JSON (v1)
 * ✅ Duplicate anchor (create “My Anchors”)
 * ✅ Favorites (environment-level)
 *
 * Note: True PWA caching (works when not previously opened) requires manifest + service worker.
 * This component includes optional SW registration hook (commented).
 */

/* ----------------------------- Base Library ----------------------------- */

const BASE_GENRES = [
  {
    id: "beauty",
    name: "Beauty",
    sets: [
      {
        id: "beauty_set1_seated_stool",
        name: "Seated — Stool",
        bases: [
          {
            id: "beauty_base1",
            name: "Anchor",
            curated: true,
            flow: [
              { uid: "beauty_base1_step1", cue: "Stool edge. Turn slightly. Feet grounded. Hands rest.", beat: "Settle" },
              { uid: "beauty_base1_step2", cue: "Hands softly together. Let the shoulders melt.", beat: "Open" },
              { uid: "beauty_base1_step3", cue: "Rotate a touch. Keep the length through the torso.", beat: "Soften" },
              { uid: "beauty_base1_step4", cue: "Hold the shape. Stay quiet and still.", beat: "Finish" },
            ],
          },
        ],
      },
      {
        id: "beauty_set_wall",
        name: "Wall",
        bases: [
          {
            id: "beauty_wall_base1",
            name: "Anchor",
            curated: true,
            flow: [
              { uid: "beauty_wall_1", cue: "Turn slightly. Weight back. Knees soft.", beat: "Settle" },
              { uid: "beauty_wall_2", cue: "Hands close. Neck long.", beat: "Open" },
              { uid: "beauty_wall_3", cue: "Quiet eyes. Small breath.", beat: "Soften" },
              { uid: "beauty_wall_4", cue: "Hold. Soft and still.", beat: "Finish" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "fifty_plus",
    name: "50+",
    sets: [
      {
        id: "50p_set1_apple_box_bright_gold",
        name: "Apple Box — Bright / Gold",
        bases: [
          {
            id: "50p_base1",
            name: "Anchor",
            curated: true,
            flow: [
              { uid: "50p_set1_base1_step1", cue: "Sit tall on the box. Chin gently around. Fingertips light.", beat: "Settle" },
              {
                uid: "50p_set1_base1_step2",
                cue: "Hands together, softly down and forward. Let the shoulders melt. Remove the second box.",
                beat: "Open",
              },
              { uid: "50p_set1_base1_step3", cue: "Stay just there. A quiet, gentle smile.", beat: "Soften" },
              { uid: "50p_set1_base1_step4", cue: "Hold the shape. Soft and still.", beat: "Finish" },
            ],
          },
        ],
      },
      {
        id: "50p_set2_wall_white_bright",
        name: "Wall — White / Bright",
        bases: [
          {
            id: "50p_base2",
            name: "Anchor",
            curated: true,
            flow: [
              {
                uid: "50p_set2_base2_step1",
                cue: "Ease away from the wall. Turn slightly. Hands close. Lean gently. Chin around.",
                beat: "Settle",
              },
              { uid: "50p_set2_base2_step2", cue: "Soften the eyes. Stay calm.", beat: "Open" },
              { uid: "50p_set2_base2_step3", cue: "Chin slightly down. Hint of a smile.", beat: "Soften" },
              { uid: "50p_set2_base2_step4", cue: "Stay level. Breathe.", beat: "Soften" },
              { uid: "50p_set2_base2_step5", cue: "Let the near shoulder drop. Change the weight.", beat: "Empower" },
              { uid: "50p_set2_base2_step6", cue: "Wrap the hands gently. Shoulders relaxed.", beat: "Finish" },
            ],
          },
        ],
      },
      {
        id: "50p_set5_standing_bright_gold",
        name: "Standing — Bright / Gold",
        bases: [
          {
            id: "50p_base5",
            name: "Anchor",
            curated: true,
            flow: [
              {
                uid: "50p_set5_base5_step1",
                cue: "Hands resting down. Light touch. Elbow back. Front foot toward me. Chin forward and down.",
                beat: "Settle",
              },
              { uid: "50p_set5_base5_step2", cue: "Hold the shape. Quiet eyes.", beat: "Open" },
              { uid: "50p_set5_base5_step3", cue: "Chin forward and down again. Gentle.", beat: "Soften" },
              { uid: "50p_set5_base5_step4", cue: "Create a little space. Chin around.", beat: "Finish" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "personal_branding_man",
    name: "Personal Branding (Man)",
    sets: [
      {
        id: "pbm_set1_stool_dark_side_light",
        name: "Stool — Dark / Side Light",
        bases: [
          {
            id: "pbm_base1",
            name: "Anchor",
            curated: true,
            flow: [
              { uid: "pbm_set1_base1_step1", cue: "Sit tall. Turn slightly. One foot lifted. Hands together. Chin toward me.", beat: "Settle" },
              { uid: "pbm_set1_base1_step2", cue: "Stay there. Easy smile.", beat: "Open" },
              { uid: "pbm_set1_base1_step3", cue: "Lean a touch into the knee. Back shoulder soft. Chin forward. Soft smile.", beat: "Empower" },
              { uid: "pbm_set1_base1_step4", cue: "Relax the posture. Chin gently around.", beat: "Soften" },
              { uid: "pbm_set1_base1_step5", cue: "Let the smile grow a little.", beat: "Soften" },
              { uid: "pbm_set1_base1_step6", cue: "Hands resting on the thigh. Easy, natural smile.", beat: "Finish" },
            ],
          },
        ],
      },
      {
        id: "pbm_set3_wall",
        name: "Wall — Casual",
        bases: [
          {
            id: "pbm_wall_base1",
            name: "Anchor",
            curated: true,
            flow: [
              { uid: "pbm_wall_1", cue: "Turn slightly. Weight back. Arms crossed.", beat: "Settle" },
              { uid: "pbm_wall_2", cue: "Arms lower. Let the weight settle.", beat: "Open" },
              { uid: "pbm_wall_3", cue: "Arms down. Open the shoulders.", beat: "Empower" },
              { uid: "pbm_wall_4", cue: "Step away. Feet apart. Shoulders toward me.", beat: "Finish" },
            ],
          },
        ],
      },
    ],
  },
];

const RHYTHMS = [
  { id: "linger", label: "Linger", seconds: 10 },
  { id: "natural", label: "Natural", seconds: 8 },
  { id: "gentle", label: "Gentle", seconds: 6 },
];

/* ----------------------------- Device Profiles ----------------------------- */

const DEVICE_PROFILES = {
  phone: {
    id: "phone",
    label: "Android phone (portrait)",
    nextPct: 70,
    backPct: 30,
    deadBottomPx: 64, // protects Android gesture bar / palm hits
    whisperReveal: "press", // press-and-hold
    pressMs: 220,
    type: { cue: "text-3xl", cueMd: "md:text-4xl", whisper: "text-sm md:text-base" },
    minTapMs: 120,
  },
  tablet: {
    id: "tablet",
    label: "Android tablet",
    nextPct: 60,
    backPct: 40,
    deadBottomPx: 0,
    whisperReveal: "tap",
    pressMs: 0,
    type: { cue: "text-4xl", cueMd: "md:text-5xl", whisper: "text-base md:text-lg" },
    minTapMs: 0,
  },
  laptop: {
    id: "laptop",
    label: "Laptop",
    nextPct: 55,
    backPct: 45,
    deadBottomPx: 0,
    whisperReveal: "mousedown",
    pressMs: 0,
    type: { cue: "text-4xl", cueMd: "md:text-5xl", whisper: "text-base md:text-lg" },
    minTapMs: 0,
  },
};

const STORAGE_KEY = "sfc_v09_state";

/* ----------------------------- Utilities ----------------------------- */

function safeJsonParse(str, fallback) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

function requestFullscreen(el) {
  if (!el) return;
  const fn = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
  if (fn) fn.call(el);
}
function exitFullscreen() {
  const fn =
    document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
  if (fn) fn.call(document);
}
function isFullscreen() {
  return !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
}

function useInterval(enabled, ms, onTick) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      clearInterval(ref.current);
      ref.current = null;
    }
    if (!enabled) return;
    ref.current = setInterval(onTick, ms);
    return () => {
      if (ref.current) {
        clearInterval(ref.current);
        ref.current = null;
      }
    };
  }, [enabled, ms, onTick]);
}

function deepClone(x) {
  return JSON.parse(JSON.stringify(x));
}

function makeId(prefix = "id") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

function mergeUserBasesIntoGenres(baseGenres, userBasesBySet) {
  if (!userBasesBySet) return baseGenres;
  const genres = deepClone(baseGenres);
  for (const g of genres) {
    for (const s of g.sets || []) {
      const extra = userBasesBySet[s.id];
      if (Array.isArray(extra) && extra.length) {
        s.bases = [...(s.bases || []), ...extra];
      }
    }
  }
  return genres;
}

function useHaptic(enabled) {
  const vibrate = (ms = 10) => {
    if (!enabled) return;
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(ms);
      } catch {}
    }
  };
  return { vibrate };
}

/* ----------------------------- App ----------------------------- */

export default function App() {
  const shellRef = useRef(null);

  // Optional SW registration if you add /sw.js + manifest
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  // Load persisted state
  const persisted = useMemo(() => safeJsonParse(localStorage.getItem(STORAGE_KEY), null), []);

  /**
   * Persisted shape:
   * {
   *   device: "phone"|"tablet"|"laptop",
   *   handedness: "right"|"left",
   *   showFullLibrary: boolean,
   *   favorites: { [setId]: baseId },
   *   userBasesBySet: { [setId]: [baseObjects...] },
   *   lastSelection: { genreId, setId, baseId },
   *   lastSession: { device, handedness, genreId, setId, baseId, idx, silence, hold, rhythmOn, rhythmId }
   * }
   */
  const [device, setDevice] = useState(persisted?.device ?? "phone");
  const profile = useMemo(() => DEVICE_PROFILES[device] ?? DEVICE_PROFILES.phone, [device]);

  const [handedness, setHandedness] = useState(persisted?.handedness ?? "right");
  const [showFullLibrary, setShowFullLibrary] = useState(persisted?.showFullLibrary ?? false);
  const [favorites, setFavorites] = useState(persisted?.favorites ?? {});
  const [userBasesBySet, setUserBasesBySet] = useState(persisted?.userBasesBySet ?? {});
  const [lastSelection, setLastSelection] = useState(persisted?.lastSelection ?? null);
  const [lastSession, setLastSession] = useState(persisted?.lastSession ?? null);

  const GENRES = useMemo(() => mergeUserBasesIntoGenres(BASE_GENRES, userBasesBySet), [userBasesBySet]);

  // Modes
  const [mode, setMode] = useState("prep"); // "prep" | "ritual" | "session"

  // Fullscreen
  const [fs, setFs] = useState(false);
  useEffect(() => {
    const handler = () => setFs(isFullscreen());
    document.addEventListener("fullscreenchange", handler);
    document.addEventListener("webkitfullscreenchange", handler);
    return () => {
      document.removeEventListener("fullscreenchange", handler);
      document.removeEventListener("webkitfullscreenchange", handler);
    };
  }, []);

  const toggleFullscreen = () => {
    if (fs) exitFullscreen();
    else requestFullscreen(shellRef.current);
  };

  // Haptic (Android-friendly) — used only for manual taps
  const { vibrate } = useHaptic(device !== "laptop");

  // Prep selection defaults
  const initialGenreId = lastSelection?.genreId ?? GENRES[0]?.id ?? "";
  const [genreId, setGenreId] = useState(initialGenreId);
  const genre = useMemo(() => GENRES.find((g) => g.id === genreId) ?? GENRES[0], [GENRES, genreId]);

  const initialSetId = useMemo(() => {
    const byLast = lastSelection?.setId;
    if (byLast && genre?.sets?.some((s) => s.id === byLast)) return byLast;
    return genre?.sets?.[0]?.id ?? "";
  }, [genre, lastSelection]);

  const [setId, setSetId] = useState(initialSetId);

  useEffect(() => {
    const byLast = lastSelection?.setId;
    const nextSet = byLast && genre?.sets?.some((s) => s.id === byLast) ? byLast : genre?.sets?.[0]?.id ?? "";
    setSetId(nextSet);
  }, [genreId]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedSet = useMemo(() => genre?.sets?.find((s) => s.id === setId) ?? genre?.sets?.[0] ?? null, [genre, setId]);

  const availableBases = useMemo(() => {
    const bases = selectedSet?.bases ?? [];
    if (showFullLibrary) return bases;
    const curated = bases.filter((b) => b.curated);
    return curated.length ? curated : bases.slice(0, 1);
  }, [selectedSet, showFullLibrary]);

  const initialBaseId = useMemo(() => {
    const basesAll = selectedSet?.bases ?? [];
    const fav = favorites?.[setId];
    if (fav && basesAll.some((b) => b.id === fav)) return fav;

    const byLast = lastSelection?.baseId;
    if (byLast && basesAll.some((b) => b.id === byLast)) return byLast;

    return availableBases?.[0]?.id ?? "";
  }, [favorites, setId, selectedSet, availableBases, lastSelection]);

  const [baseId, setBaseId] = useState(initialBaseId);

  useEffect(() => {
    const basesAll = selectedSet?.bases ?? [];
    const fav = favorites?.[setId];
    if (fav && basesAll.some((b) => b.id === fav)) {
      setBaseId(fav);
      return;
    }
    const byLast = lastSelection?.baseId;
    if (byLast && basesAll.some((b) => b.id === byLast)) {
      setBaseId(byLast);
      return;
    }
    setBaseId(availableBases?.[0]?.id ?? "");
  }, [setId, selectedSet]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedBase = useMemo(() => {
    const all = selectedSet?.bases ?? [];
    return all.find((b) => b.id === baseId) ?? availableBases?.[0] ?? null;
  }, [selectedSet, baseId, availableBases]);

  const flow = useMemo(() => selectedBase?.flow ?? [], [selectedBase]);

  // Session state
  const [idx, setIdx] = useState(0);
  const [silence, setSilence] = useState(false);
  const [hold, setHold] = useState(false);

  // Rhythm
  const [rhythmOn, setRhythmOn] = useState(false);
  const [rhythmId, setRhythmId] = useState("natural");
  const rhythm = useMemo(() => RHYTHMS.find((r) => r.id === rhythmId) ?? RHYTHMS[1], [rhythmId]);

  // Whisper reveal
  const [whisperVisible, setWhisperVisible] = useState(false);
  const whisperTimerRef = useRef(null);
  const revealWhisperBriefly = useCallback(() => {
    setWhisperVisible(true);
    if (whisperTimerRef.current) clearTimeout(whisperTimerRef.current);
    whisperTimerRef.current = setTimeout(() => setWhisperVisible(false), 1200);
  }, []);
  useEffect(() => {
    return () => {
      if (whisperTimerRef.current) clearTimeout(whisperTimerRef.current);
    };
  }, []);

  // Press-and-hold to reveal whisper (phone)
  const pressTimerRef = useRef(null);
  const pressStartAtRef = useRef(0);

  const onPressStart = useCallback(() => {
    if (mode !== "session") return;
    if (rhythmOn || hold) return;
    if (profile.whisperReveal !== "press") return;

    pressStartAtRef.current = Date.now();
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
    pressTimerRef.current = setTimeout(() => {
      revealWhisperBriefly();
    }, profile.pressMs || 220);
  }, [mode, rhythmOn, hold, profile, revealWhisperBriefly]);

  const onPressEnd = useCallback(() => {
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
    pressTimerRef.current = null;
  }, []);

  // Persistence
  useEffect(() => {
    const payload = {
      device,
      handedness,
      showFullLibrary,
      favorites,
      userBasesBySet,
      lastSelection: { genreId, setId, baseId },
      lastSession,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [device, handedness, showFullLibrary, favorites, userBasesBySet, genreId, setId, baseId, lastSession]);

  const current = useMemo(() => {
    if (!flow.length) return null;
    return flow[Math.max(0, Math.min(idx, flow.length - 1))] ?? null;
  }, [flow, idx]);

  const nextWhisper = useMemo(() => {
    if (!flow.length) return null;
    const ni = idx + 1;
    if (ni >= flow.length) return null;
    return flow[ni] ?? null;
  }, [flow, idx]);

  const advance = useCallback(() => {
    if (!flow.length) return;
    if (hold) return;

    if (silence) {
      setSilence(false);
      setIdx(flow.length - 1);
      return;
    }

    const ni = idx + 1;
    if (ni >= flow.length) {
      setSilence(true); // no End state
      setRhythmOn(false);
      setWhisperVisible(false);
      return;
    }
    setIdx(ni);
  }, [flow, idx, silence, hold]);

  const back = useCallback(() => {
    if (!flow.length) return;
    if (hold) return;

    if (silence) {
      setSilence(false);
      setIdx(flow.length - 1);
      return;
    }

    const pi = idx - 1;
    if (pi < 0) return;
    setIdx(pi);
  }, [flow, idx, silence, hold]);

  // Rhythm tick
  useInterval(mode === "session" && rhythmOn && !silence && !hold, rhythm.seconds * 1000, () => {
    advance();
  });

  // One-hand sides
  const nextSide = handedness === "right" ? "right" : "left";
  const backSide = nextSide === "right" ? "left" : "right";

  // Tap zones with accidental-tap guard (phone)
  const lastTapRef = useRef(0);
  const guardedAction = (fn) => {
    const now = Date.now();
    if (profile.minTapMs && now - lastTapRef.current < profile.minTapMs) return;
    lastTapRef.current = now;
    fn();
  };

  const onTapZone = (action) => {
    if (mode !== "session") return;
    if (!flow.length) return;
    if (rhythmOn || hold) return;

    guardedAction(() => {
      // Whisper reveal rules:
      // - tablet: reveal on tap
      // - phone: reveal only via press-and-hold (not tap)
      // - laptop: reveal on mouse down
      if (profile.whisperReveal === "tap") revealWhisperBriefly();

      // small haptic for manual navigation (Android)
      vibrate(10);

      if (action === "back") back();
      else advance();
    });
  };

  // Touch swipe (session only; rhythm OFF; hold OFF)
  const touchRef = useRef({ x: 0, y: 0, t: 0 });
  const onTouchStart = (e) => {
    if (mode !== "session") return;
    if (rhythmOn || hold) return;

    onPressStart();

    const t = e.touches?.[0];
    if (!t) return;
    touchRef.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  };

  const onTouchEnd = (e) => {
    if (mode !== "session") return;
    if (rhythmOn || hold) return;

    onPressEnd();

    const t = e.changedTouches?.[0];
    if (!t) return;

    const dx = t.clientX - touchRef.current.x;
    const dy = t.clientY - touchRef.current.y;
    const dt = Date.now() - touchRef.current.t;

    // If it was a long press (phone whisper reveal), ignore swipe/nav intent
    if (profile.whisperReveal === "press") {
      const pressDuration = Date.now() - pressStartAtRef.current;
      if (pressDuration >= (profile.pressMs || 220)) return;
    }

    if (dt > 900) return;
    if (Math.abs(dx) < 50) return;
    if (Math.abs(dy) > 80) return;

    guardedAction(() => {
      vibrate(10);
      if (dx < 0) advance();
      else back();
    });
  };

  const onTouchCancel = () => {
    onPressEnd();
  };

  // Keyboard (laptop)
  const onKeyDown = (e) => {
    if (mode !== "session") return;
    if (rhythmOn || hold) return;

    if (e.key === "ArrowRight") {
      guardedAction(() => {
        vibrate(10);
        advance();
      });
    }
    if (e.key === "ArrowLeft") {
      guardedAction(() => {
        vibrate(10);
        back();
      });
    }
    if (e.key === " " || e.key === "Spacebar") {
      // Intentional reveal on laptop
      revealWhisperBriefly();
    }
  };

  // Start Ritual
  const startRitual = () => {
    setMode("ritual");
    setIdx(0);
    setSilence(false);
    setHold(false);
    setRhythmOn(false);
    setWhisperVisible(false);
    setLastSelection({ genreId, setId, baseId });
  };

  const beginSessionFromRitual = () => {
    setMode("session");
    setIdx(0);
    setSilence(false);
    setHold(false);
    setRhythmOn(false);
    setWhisperVisible(false);

    setLastSession({
      device,
      handedness,
      genreId,
      setId,
      baseId,
      idx: 0,
      silence: false,
      hold: false,
      rhythmOn: false,
      rhythmId,
    });
  };

  const exitSession = () => {
    setMode("prep");
    setSilence(false);
    setHold(false);
    setRhythmOn(false);
    setWhisperVisible(false);
  };

  // Update resumable session snapshot
  useEffect(() => {
    if (mode !== "session") return;
    setLastSession({
      device,
      handedness,
      genreId,
      setId,
      baseId,
      idx,
      silence,
      hold,
      rhythmOn,
      rhythmId,
    });
  }, [mode, device, handedness, genreId, setId, baseId, idx, silence, hold, rhythmOn, rhythmId]);

  const resumeLastSession = () => {
    if (!lastSession) return;

    setDevice(lastSession.device ?? device);
    setHandedness(lastSession.handedness ?? handedness);

    setGenreId(lastSession.genreId);
    setTimeout(() => {
      setSetId(lastSession.setId);
      setTimeout(() => {
        setBaseId(lastSession.baseId);
        setIdx(lastSession.idx ?? 0);
        setSilence(!!lastSession.silence);
        setHold(!!lastSession.hold);
        setRhythmId(lastSession.rhythmId ?? "natural");
        setRhythmOn(!!lastSession.rhythmOn);
        setMode("session");
      }, 0);
    }, 0);
  };

  // Favorites
  const isFavorite = favorites?.[setId] === baseId;
  const toggleFavorite = () => {
    setFavorites((prev) => {
      const next = { ...(prev || {}) };
      if (next[setId] === baseId) delete next[setId];
      else next[setId] = baseId;
      return next;
    });
  };

  // Duplicate anchor
  const duplicateAnchor = () => {
    if (!selectedBase || !selectedSet) return;
    const copy = deepClone(selectedBase);
    copy.id = makeId("my_base");
    copy.name = `My ${selectedBase.name || "Anchor"}`;
    copy.curated = true;
    copy.flow = (copy.flow || []).map((step) => ({ ...step, uid: makeId("my_step") }));

    setUserBasesBySet((prev) => {
      const next = { ...(prev || {}) };
      const arr = Array.isArray(next[selectedSet.id]) ? [...next[selectedSet.id]] : [];
      arr.push(copy);
      next[selectedSet.id] = arr;
      return next;
    });

    setTimeout(() => setBaseId(copy.id), 0);
  };

  // Import / Export
  const [ioOpen, setIoOpen] = useState(false);
  const [ioMode, setIoMode] = useState("export"); // export | import
  const [ioText, setIoText] = useState("");

  const exportPayload = useMemo(() => {
    return {
      version: "sfc_flow_v1",
      genreId,
      setId,
      base: selectedBase ? deepClone(selectedBase) : null,
    };
  }, [genreId, setId, selectedBase]);

  useEffect(() => {
    if (!ioOpen) return;
    if (ioMode === "export") setIoText(JSON.stringify(exportPayload, null, 2));
    else setIoText("");
  }, [ioOpen, ioMode, exportPayload]);

  const runImport = () => {
    const data = safeJsonParse(ioText, null);
    if (!data) return;

    const targetSetId = data.setId ?? setId;
    const baseObj = data.base ?? data;
    if (!baseObj || !Array.isArray(baseObj.flow)) return;

    const copy = deepClone(baseObj);
    copy.id = makeId("my_base");
    copy.name = copy.name ? `My ${copy.name}` : "My Anchor";
    copy.curated = true;
    copy.flow = copy.flow.map((step) => ({
      uid: makeId("my_step"),
      cue: String(step.cue ?? "").trim(),
      beat: step.beat ?? undefined,
    }));

    setUserBasesBySet((prev) => {
      const next = { ...(prev || {}) };
      const arr = Array.isArray(next[targetSetId]) ? [...next[targetSetId]] : [];
      arr.push(copy);
      next[targetSetId] = arr;
      return next;
    });

    setIoOpen(false);
    setTimeout(() => setBaseId(copy.id), 0);
  };

  /* ----------------------------- Render ----------------------------- */

  const headerModeLabel = mode === "prep" ? "Prep" : mode === "ritual" ? "Start" : "Session";

  // Tap zone widths and safe bottom
  const nextWidth = `${profile.nextPct}%`;
  const backWidth = `${profile.backPct}%`;

  const nextPos = nextSide === "right" ? { right: 0 } : { left: 0 };
  const backPos = backSide === "right" ? { right: 0 } : { left: 0 };

  return (
    <div ref={shellRef} className="min-h-screen bg-white text-neutral-900" onKeyDown={onKeyDown} tabIndex={-1}>
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-neutral-500">{headerModeLabel}</div>
            <h1 className="text-2xl font-semibold">Studio Flow Companion</h1>
            <div className="mt-1 text-sm text-neutral-600">
              {mode === "prep"
                ? "Choose your environment and anchor. Then begin."
                : mode === "ritual"
                ? "Breathe. Then begin."
                : "Stay present. Small changes. Quiet rhythm."}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleFullscreen} className="border rounded-xl px-3 py-2 text-sm">
              {fs ? "Exit full screen" : "Full screen"}
            </button>
            {mode === "session" ? (
              <button onClick={exitSession} className="border rounded-xl px-3 py-2 text-sm">
                Exit session
              </button>
            ) : null}
          </div>
        </div>

        {/* PREP */}
        {mode === "prep" && (
          <div className="mt-6 border rounded-2xl p-5">
            {/* Resume */}
            {lastSession ? (
              <div className="mb-4 flex items-center justify-between gap-3 border rounded-2xl p-4">
                <div className="text-sm text-neutral-700">
                  <div className="text-xs text-neutral-500">Resume</div>
                  <div className="font-medium text-neutral-900">Continue last session</div>
                </div>
                <button onClick={resumeLastSession} className="border rounded-xl px-4 py-2 text-sm">
                  Resume
                </button>
              </div>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <div className="text-xs text-neutral-500">Device</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Object.values(DEVICE_PROFILES).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setDevice(p.id)}
                      className={`border rounded-xl px-3 py-2 text-sm ${device === p.id ? "bg-neutral-900 text-white" : ""}`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-xs text-neutral-500">
                  Phone uses press-and-hold to reveal the whisper.
                </div>
              </div>

              <div>
                <div className="text-xs text-neutral-500">Dominant hand</div>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    className={`border rounded-xl px-3 py-2 text-sm ${handedness === "left" ? "bg-neutral-900 text-white" : ""}`}
                    onClick={() => setHandedness("left")}
                  >
                    Left
                  </button>
                  <button
                    className={`border rounded-xl px-3 py-2 text-sm ${handedness === "right" ? "bg-neutral-900 text-white" : ""}`}
                    onClick={() => setHandedness("right")}
                  >
                    Right
                  </button>
                </div>
                <div className="mt-2 text-xs text-neutral-500">
                  Next is larger on your dominant side.
                </div>
              </div>

              <div>
                <div className="text-xs text-neutral-500">Genre</div>
                <select className="mt-1 w-full border rounded-xl p-2" value={genreId} onChange={(e) => setGenreId(e.target.value)}>
                  {GENRES.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>

                <div className="mt-3 text-xs text-neutral-500">Environment</div>
                <select className="mt-1 w-full border rounded-xl p-2" value={setId} onChange={(e) => setSetId(e.target.value)}>
                  {(genre.sets ?? []).map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>

                <div className="mt-3 text-xs text-neutral-500">Anchor</div>
                <select className="mt-1 w-full border rounded-xl p-2" value={baseId} onChange={(e) => setBaseId(e.target.value)}>
                  {availableBases.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>

                <div className="mt-2 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-neutral-700">
                    <input type="checkbox" checked={showFullLibrary} onChange={(e) => setShowFullLibrary(e.target.checked)} />
                    Show full library (Prep only)
                  </label>

                  <button onClick={toggleFavorite} className="border rounded-xl px-3 py-2 text-sm" title="Favorite this anchor">
                    {isFavorite ? "★" : "☆"}
                  </button>
                </div>
              </div>
            </div>

            {/* Ownership tools + ready */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="border rounded-2xl p-4">
                <div className="text-xs text-neutral-500">Make it yours</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button onClick={duplicateAnchor} className="border rounded-xl px-3 py-2 text-sm" disabled={!selectedBase}>
                    Duplicate
                  </button>
                  <button
                    onClick={() => {
                      setIoMode("export");
                      setIoOpen(true);
                    }}
                    className="border rounded-xl px-3 py-2 text-sm"
                    disabled={!selectedBase}
                  >
                    Export
                  </button>
                  <button
                    onClick={() => {
                      setIoMode("import");
                      setIoOpen(true);
                    }}
                    className="border rounded-xl px-3 py-2 text-sm"
                  >
                    Import
                  </button>
                </div>
                <div className="mt-2 text-xs text-neutral-500">
                  Duplicate creates a “My Anchor” you can edit later.
                </div>
              </div>

              <div className="border rounded-2xl p-4">
                <div className="text-xs text-neutral-500">Ready</div>
                <div className="mt-1 text-sm text-neutral-700">
                  {flow.length ? `${flow.length} quiet steps loaded.` : "No steps available."}
                </div>
                <button onClick={startRitual} className="mt-2 border rounded-xl px-4 py-2 text-sm" disabled={!flow.length}>
                  Begin
                </button>
              </div>

              <div className="border rounded-2xl p-4">
                <div className="text-xs text-neutral-500">Notes</div>
                <div className="mt-1 text-sm text-neutral-700">
                  Phone: press-and-hold to preview the next whisper.
                </div>
                <div className="mt-1 text-sm text-neutral-700">
                  Tap dominant side for Next. Opposite side for Back.
                </div>
              </div>
            </div>

            {/* Import/Export modal */}
            {ioOpen && (
              <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
                <div className="w-full max-w-2xl bg-white border rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-neutral-500">{ioMode === "export" ? "Export" : "Import"}</div>
                      <div className="text-lg font-semibold">{ioMode === "export" ? "Copy your anchor JSON" : "Paste anchor JSON"}</div>
                    </div>
                    <button onClick={() => setIoOpen(false)} className="border rounded-xl px-3 py-2 text-sm">
                      Close
                    </button>
                  </div>

                  <textarea
                    className="mt-3 w-full h-72 border rounded-2xl p-3 text-sm font-mono"
                    value={ioText}
                    onChange={(e) => setIoText(e.target.value)}
                    placeholder={ioMode === "import" ? "Paste JSON here…" : ""}
                    readOnly={ioMode === "export"}
                  />

                  <div className="mt-3 flex justify-end gap-2">
                    {ioMode === "import" ? (
                      <button onClick={runImport} className="border rounded-xl px-4 py-2 text-sm">
                        Import
                      </button>
                    ) : (
                      <button
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(ioText);
                          } catch {}
                        }}
                        className="border rounded-xl px-4 py-2 text-sm"
                      >
                        Copy
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* START RITUAL */}
        {mode === "ritual" && (
          <div className="mt-6 border rounded-2xl p-8">
            <div className="text-xs text-neutral-500">Locked</div>
            <div className="mt-1 text-2xl font-semibold">{selectedSet?.name ?? ""}</div>
            <div className="mt-2 text-sm text-neutral-600">{selectedBase?.name ?? ""}</div>

            <div className="mt-6 text-3xl md:text-4xl font-semibold leading-snug">Breathe. Then begin.</div>

            <div className="mt-8 flex items-center justify-between">
              <button onClick={() => setMode("prep")} className="border rounded-xl px-4 py-2 text-sm">
                Back
              </button>
              <button onClick={beginSessionFromRitual} className="border rounded-xl px-4 py-2 text-sm">
                Begin
              </button>
            </div>
          </div>
        )}

        {/* SESSION */}
        {mode === "session" && (
          <div className="mt-6 border rounded-2xl p-5">
            {/* Rhythm + Hold */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs text-neutral-500">Rhythm</div>
                <div className="text-sm text-neutral-700">Optional gentle pacing.</div>
              </div>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={rhythmOn} onChange={(e) => setRhythmOn(e.target.checked)} disabled={silence || hold} />
                  On
                </label>
                <select
                  className="border rounded-xl p-2 text-sm"
                  value={rhythmId}
                  onChange={(e) => setRhythmId(e.target.value)}
                  disabled={!rhythmOn || silence || hold}
                >
                  {RHYTHMS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    setHold((v) => !v);
                    setRhythmOn(false);
                    setWhisperVisible(false);
                  }}
                  className={`border rounded-full w-10 h-10 flex items-center justify-center text-sm ${hold ? "bg-neutral-900 text-white" : ""}`}
                  title="Hold"
                >
                  ●
                </button>
              </div>
            </div>

            {/* Breath screen */}
            <div className="mt-5 border rounded-2xl overflow-hidden">
              <div
                className="relative p-6 min-h-[320px] flex flex-col justify-center select-none"
                style={{ paddingBottom: 24 + (profile.deadBottomPx || 0) }}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                onTouchCancel={onTouchCancel}
                onMouseDown={() => {
                  if (profile.whisperReveal === "mousedown" && !rhythmOn && !hold) revealWhisperBriefly();
                }}
                title={hold ? "Hold" : rhythmOn ? "Rhythm is on" : "Tap zones: Next (dominant side), Back (opposite)."}
              >
                {/* Tap zones (no buttons) */}
                <button
                  aria-label="Next"
                  onClick={() => onTapZone("next")}
                  className="absolute inset-y-0 bg-transparent"
                  style={{
                    width: nextWidth,
                    ...nextPos,
                    bottom: profile.deadBottomPx,
                    cursor: rhythmOn || hold ? "default" : "pointer",
                  }}
                />
                <button
                  aria-label="Back"
                  onClick={() => onTapZone("back")}
                  className="absolute inset-y-0 bg-transparent"
                  style={{
                    width: backWidth,
                    ...backPos,
                    bottom: profile.deadBottomPx,
                    cursor: rhythmOn || hold ? "default" : "pointer",
                  }}
                />

                {/* Silence: no End state */}
                {silence ? (
                  <div className="py-12">
                    <div className="h-10" />
                  </div>
                ) : (
                  <>
                    <div
                      className={`relative z-10 font-semibold leading-snug whitespace-pre-line ${profile.type.cue} ${profile.type.cueMd} ${
                        hold ? "opacity-70" : ""
                      }`}
                    >
                      {current?.cue ?? ""}
                    </div>

                    <div
                      className={`relative z-10 mt-6 whitespace-pre-line transition-opacity duration-500 ${profile.type.whisper} ${
                        whisperVisible && !hold ? "opacity-60 text-neutral-600" : "opacity-0 text-neutral-600"
                      }`}
                    >
                      {nextWhisper?.cue ?? ""}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
