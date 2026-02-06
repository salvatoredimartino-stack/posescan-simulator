import React, { useCallback, useEffect, useMemo, useState } from "react";

/* =========================================
   ASSET PATHS (CRITICAL)
   ========================================= */
const ASSET = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, "")}`;

/* =========================================
   YOUR DATA (KEEP AS-IS)
   Paste your existing BASE_GENRES here.
   IMPORTANT: keep img: ASSET("...") exactly as you have.
   ========================================= */
const BASE_GENRES = [
  // === KEEP YOUR CURRENT BASE_GENRES CONTENT HERE (unchanged) ===
];

/* =========================================
   SIMPLE RHYTHMS (Clear labels)
   ========================================= */
const RHYTHMS = [
  { id: "slow", label: "Slow", seconds: 10 },
  { id: "normal", label: "Normal", seconds: 8 },
  { id: "fast", label: "Fast", seconds: 6 },
];

const REHEARSAL_PLAN_7_DAYS = [
  { day: "Day 1", text: "Set 1 (Seated stool) only — run 3 times" },
  { day: "Day 2", text: "Set 2 (Standing) — run 3 times" },
  { day: "Day 3", text: "Set 3 (Wall) — run 3 times" },
  { day: "Day 4", text: "Set 4 (Table) — run 3 times" },
  { day: "Day 5", text: "Set 5 (Box) — run 3 times" },
  { day: "Day 6", text: "Full session (Sets 1–5) once, slow" },
  { day: "Day 7", text: "Full session once, normal pace" },
];

const STORAGE_KEY = "pose_rehearsal_app_state_css_v1";

function safeJsonParse(str, fallback) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
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

/* =========================================
   UI: zero Tailwind dependency.
   All styling below is plain CSS.
   ========================================= */
function Styles() {
  return (
    <style>{`
      :root{
        --bg0:#fff7fb;
        --bg1:#ffffff;
        --bg2:#f2f6ff;
        --ink:#0f172a;
        --muted:#475569;
        --line:rgba(15,23,42,.14);
        --card:rgba(255,255,255,.86);
        --shadow: 0 20px 45px rgba(15,23,42,.12);
        --shadow2: 0 10px 25px rgba(15,23,42,.10);
        --radius: 22px;
        --radius2: 28px;
        --grad: linear-gradient(90deg,#4f46e5,#d946ef,#fb7185);
        --grad2: linear-gradient(135deg,#fff7fb,#ffffff,#f2f6ff);
      }

      *{ box-sizing:border-box; }
      body{ margin:0; background:var(--grad2); color:var(--ink); font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }

      .wrap{ max-width: 980px; margin: 0 auto; padding: 24px 16px 44px; }
      .pill{ display:inline-flex; align-items:center; gap:8px; padding:6px 10px; border:1px solid var(--line); background:rgba(255,255,255,.85); border-radius:999px; font-size:12px; color:var(--muted); box-shadow: 0 2px 10px rgba(15,23,42,.06); }
      .dot{ width:8px; height:8px; border-radius:999px; background:#f59e0b; }
      .h1{ font-size: clamp(36px, 6vw, 64px); line-height: 1.02; margin: 14px 0 8px; letter-spacing:-0.03em; }
      .sub{ margin:0; font-size: 16px; color: var(--muted); }

      .card{
        margin-top: 18px;
        border:1px solid var(--line);
        background: var(--card);
        border-radius: var(--radius2);
        box-shadow: var(--shadow);
        backdrop-filter: blur(10px);
        overflow: hidden;
      }
      .cardInner{ padding: 18px; }
      @media (min-width: 860px){ .cardInner{ padding: 22px; } }

      .grid{ display:grid; grid-template-columns: 1fr; gap: 14px; }
      @media (min-width: 860px){ .grid{ grid-template-columns: 1fr 1fr 1fr; } }

      .label{ font-size:12px; font-weight: 700; color: var(--muted); }
      .control{
        margin-top:8px;
        width:100%;
        height: 46px;
        border-radius: 16px;
        border:1px solid var(--line);
        background: rgba(255,255,255,.96);
        padding: 0 14px;
        font-size: 14px;
        color: var(--ink);
        outline: none;
        box-shadow: 0 2px 12px rgba(15,23,42,.06);
      }
      .control:focus{ border-color: rgba(79,70,229,.45); box-shadow: 0 0 0 5px rgba(79,70,229,.18), 0 2px 12px rgba(15,23,42,.06); }

      .row{ display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top: 12px; }
      .check{ display:flex; align-items:center; gap:10px; color:var(--muted); font-size:14px; }
      .check input{ width:18px; height:18px; accent-color: #4f46e5; }

      .btn{
        height: 44px;
        padding: 0 14px;
        border-radius: 16px;
        border:1px solid var(--line);
        background: rgba(255,255,255,.95);
        color: var(--ink);
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 8px 18px rgba(15,23,42,.08);
      }
      .btn:hover{ background: rgba(255,255,255,1); }
      .btn:disabled{ opacity:.45; cursor: not-allowed; }

      .btnPrimary{
        border: none;
        background: var(--grad);
        color: white;
      }
      .btnPrimary:hover{ filter: brightness(1.06); }

      .btnIcon{
        width: 46px;
        padding:0;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size: 18px;
      }

      .actions{ margin-top: 14px; display:flex; gap:10px; flex-wrap:wrap; }
      .footerActions{ margin-top: 16px; display:flex; justify-content:flex-end; }

      /* Rehearsal plan grid */
      .planGrid{ margin-top:14px; display:grid; grid-template-columns: 1fr; gap: 10px; }
      @media (min-width: 860px){ .planGrid{ grid-template-columns: 1fr 1fr; } }
      .planItem{
        border:1px solid var(--line);
        background: rgba(255,255,255,.92);
        border-radius: 18px;
        padding: 14px;
        box-shadow: 0 8px 18px rgba(15,23,42,.06);
      }
      .planDay{ font-size:12px; font-weight: 800; color: var(--muted); }
      .planText{ margin-top:6px; font-size: 15px; font-weight: 700; color: var(--ink); }

      /* SESSION overlay */
      .session{
        position: fixed; inset: 0; z-index: 9999;
        background: var(--grad2);
        color: var(--ink);
      }
      .topBar{
        position: fixed; left:0; right:0; top:0; z-index: 2;
        padding-top: env(safe-area-inset-top);
        background: rgba(255,255,255,.9);
        border-bottom: 1px solid var(--line);
        backdrop-filter: blur(10px);
      }
      .topInner{ padding: 12px 14px; }
      .topRow{ display:flex; align-items:center; justify-content:space-between; gap: 12px; }
      .progLabel{ font-size:12px; font-weight: 800; color: var(--muted); }
      .progNums{ font-size:12px; color: var(--muted); margin-top: 4px; }
      .bar{
        margin-top:10px;
        height: 16px;
        border-radius: 999px;
        background: rgba(15,23,42,.06);
        border: 1px solid var(--line);
        overflow:hidden;
      }
      .barFill{
        height:100%;
        width: 0%;
        background: var(--grad);
        border-radius: 999px;
        transition: width .18s ease;
      }

      .topControls{ display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
      .smallToggle{
        display:flex; align-items:center; gap:8px; font-size: 13px; color: var(--muted);
        padding: 8px 10px; border: 1px solid var(--line); border-radius: 999px;
        background: rgba(255,255,255,.9);
      }
      .smallToggle input{ width:18px; height:18px; accent-color:#4f46e5; }

      .main{
        position:absolute; inset:0;
        padding-top: calc(env(safe-area-inset-top) + 112px);
        padding-bottom: calc(env(safe-area-inset-bottom) + 96px);
      }
      .mainPad{ height:100%; padding: 14px; }
      .stage{
        height:100%;
        border-radius: var(--radius2);
        border: 1px solid var(--line);
        background: rgba(255,255,255,.88);
        box-shadow: var(--shadow);
        backdrop-filter: blur(10px);
        position: relative;
        overflow:hidden;
        display:flex;
        align-items:center;
        justify-content:center;
        padding: 22px;
      }

      /* Small reference image (never dominates) */
      .ref{
        position:absolute;
        right: 14px;
        top: 14px;
        width: 110px;
        height: 110px;
        border-radius: 18px;
        border:1px solid var(--line);
        background: rgba(255,255,255,.95);
        box-shadow: var(--shadow2);
        padding: 8px;
        display:flex;
        align-items:center;
        justify-content:center;
      }
      .ref img{ max-width:100%; max-height:100%; object-fit:contain; border-radius: 14px; }

      /* HERO cue text */
      .cueWrap{
        width: 100%;
        max-width: 24ch; /* keeps lines short */
        text-align: left;
      }
      .cue{
        font-size: clamp(44px, 6.4vw, 82px);
        line-height: 1.02;
        font-weight: 900;
        letter-spacing: -0.03em;
        white-space: pre-line;
      }

      .nextBox{
        margin-top: 18px;
        border-radius: 18px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,.94);
        padding: 12px 14px;
        box-shadow: 0 10px 22px rgba(15,23,42,.08);
      }
      .nextLabel{ font-size:12px; font-weight: 900; color: var(--muted); }
      .nextCue{ margin-top:6px; font-size: 20px; font-weight: 800; white-space: pre-line; line-height: 1.18; }

      .hint{ margin-top: 16px; font-size: 14px; color: var(--muted); }

      .bottomBar{
        position: fixed; left:0; right:0; bottom:0; z-index: 2;
        padding-bottom: env(safe-area-inset-bottom);
        background: rgba(255,255,255,.9);
        border-top: 1px solid var(--line);
        backdrop-filter: blur(10px);
      }
      .bottomInner{ padding: 12px 14px; }
      .navRow{ display:flex; gap: 12px; }
      .navBtn{
        flex: 1;
        height: 62px;               /* thumb-friendly */
        border-radius: 20px;
        font-size: 18px;
        font-weight: 900;
      }

      .tapZone{
        position:absolute; inset:0;
      }
    `}</style>
  );
}

export default function App() {
  const persisted = useMemo(() => safeJsonParse(localStorage.getItem(STORAGE_KEY), null), []);

  const [showFullLibrary, setShowFullLibrary] = useState(!!persisted?.showFullLibrary);
  const [favorites, setFavorites] = useState(persisted?.favorites ?? {});
  const [userBasesBySet, setUserBasesBySet] = useState(persisted?.userBasesBySet ?? {});
  const [lastSelection, setLastSelection] = useState(persisted?.lastSelection ?? null);

  const GENRES = useMemo(() => mergeUserBasesIntoGenres(BASE_GENRES, userBasesBySet), [userBasesBySet]);

  const [mode, setMode] = useState("prep"); // prep | session

  const [genreId, setGenreId] = useState(() => lastSelection?.genreId ?? GENRES[0]?.id ?? "beauty");
  const genre = useMemo(() => GENRES.find((g) => g.id === genreId) ?? GENRES[0], [GENRES, genreId]);

  const [setId, setSetId] = useState(() => {
    const byLast = lastSelection?.setId;
    if (byLast && genre?.sets?.some((s) => s.id === byLast)) return byLast;
    return genre?.sets?.[0]?.id ?? "";
  });

  useEffect(() => {
    const byLast = lastSelection?.setId;
    const nextSet = byLast && genre?.sets?.some((s) => s.id === byLast) ? byLast : genre?.sets?.[0]?.id ?? "";
    setSetId(nextSet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreId, lastSelection, genre?.sets]);

  const selectedSet = useMemo(
    () => genre?.sets?.find((s) => s.id === setId) ?? genre?.sets?.[0] ?? null,
    [genre, setId]
  );

  const availableBases = useMemo(() => {
    const bases = selectedSet?.bases ?? [];
    if (showFullLibrary) return bases;
    const curated = bases.filter((b) => b.curated);
    return curated.length ? curated : bases;
  }, [selectedSet, showFullLibrary]);

  const [baseId, setBaseId] = useState(() => {
    const basesAll = selectedSet?.bases ?? [];
    const fav = favorites?.[setId];
    if (fav && basesAll.some((b) => b.id === fav)) return fav;

    const byLast = lastSelection?.baseId;
    if (byLast && basesAll.some((b) => b.id === byLast)) return byLast;

    return availableBases?.[0]?.id ?? "";
  });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setId, selectedSet?.bases, favorites, lastSelection, availableBases]);

  const selectedBase = useMemo(() => {
    const all = selectedSet?.bases ?? [];
    return all.find((b) => b.id === baseId) ?? availableBases?.[0] ?? null;
  }, [selectedSet, baseId, availableBases]);

  const flow = useMemo(() => selectedBase?.flow ?? [], [selectedBase]);

  // Session state
  const [idx, setIdx] = useState(0);
  const [isOver, setIsOver] = useState(false);

  // Clear replacement for “Hold”:
  // Auto = auto-advance through cues. Off = manual.
  const [autoOn, setAutoOn] = useState(false);
  const [rhythmId, setRhythmId] = useState("normal");
  const rhythm = useMemo(() => RHYTHMS.find((r) => r.id === rhythmId) ?? RHYTHMS[1], [rhythmId]);

  // Reference image should be SMALL and optional
  const [showRefImage, setShowRefImage] = useState(persisted?.showRefImage ?? true);

  // Next hint: optional, but useful (and not confusing)
  const [showNextPreview, setShowNextPreview] = useState(persisted?.showNextPreview ?? true);

  const current = useMemo(() => {
    if (!flow.length) return null;
    const clamped = Math.max(0, Math.min(idx, flow.length - 1));
    return flow[clamped] ?? null;
  }, [flow, idx]);

  const nextStep = useMemo(() => {
    if (!flow.length) return null;
    const ni = idx + 1;
    if (ni >= flow.length) return null;
    return flow[ni] ?? null;
  }, [flow, idx]);

  const stepNow = useMemo(() => {
    if (!flow.length) return 0;
    return isOver ? flow.length : Math.min(idx + 1, flow.length);
  }, [flow.length, idx, isOver]);

  const progressPct = useMemo(() => {
    if (!flow.length) return 0;
    return Math.round((stepNow / flow.length) * 100);
  }, [flow.length, stepNow]);

  const restartFlow = useCallback(() => {
    setIdx(0);
    setIsOver(false);
    setAutoOn(false);
  }, []);

  const advance = useCallback(() => {
    if (!flow.length) return;
    if (isOver) return;

    const ni = idx + 1;
    if (ni >= flow.length) {
      setIsOver(true);
      setAutoOn(false);
      return;
    }
    setIdx(ni);
  }, [flow.length, idx, isOver]);

  const back = useCallback(() => {
    if (!flow.length) return;

    if (isOver) {
      setIsOver(false);
      setIdx(flow.length - 1);
      return;
    }

    const pi = idx - 1;
    if (pi < 0) return;
    setIdx(pi);
  }, [flow.length, idx, isOver]);

  // Auto-advance timer
  useEffect(() => {
    if (mode !== "session") return;
    if (!autoOn) return;
    if (isOver) return;
    if (!flow.length) return;

    const ms = (rhythm?.seconds ?? 8) * 1000;
    const t = setInterval(() => {
      setIdx((prev) => {
        const ni = prev + 1;
        if (ni >= flow.length) {
          setIsOver(true);
          setAutoOn(false);
          return prev;
        }
        return ni;
      });
    }, ms);

    return () => clearInterval(t);
  }, [mode, autoOn, isOver, flow.length, rhythm]);

  // Favorite toggle
  const isFavorite = favorites?.[setId] === baseId;
  const toggleFavorite = () => {
    setFavorites((prev) => {
      const next = { ...(prev || {}) };
      if (next[setId] === baseId) delete next[setId];
      else next[setId] = baseId;
      return next;
    });
  };

  // Duplicate (kept — actual value feature)
  const duplicateAnchor = () => {
    if (!selectedBase || !selectedSet) return;
    const copy = deepClone(selectedBase);
    copy.id = makeId("my_base");
    copy.name = `My ${selectedBase.name || "Base Pose"}`;
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

  // Reset session when selection changes
  useEffect(() => {
    setIdx(0);
    setIsOver(false);
    setAutoOn(false);
  }, [genreId, setId, baseId]);

  // Persist
  useEffect(() => {
    const payload = {
      showFullLibrary,
      favorites,
      userBasesBySet,
      lastSelection: { genreId, setId, baseId },
      showRefImage,
      showNextPreview,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [showFullLibrary, favorites, userBasesBySet, genreId, setId, baseId, showRefImage, showNextPreview]);

  const beginSession = () => {
    setLastSelection({ genreId, setId, baseId });
    setMode("session");
    restartFlow();
  };

  const exitSession = () => {
    setMode("prep");
    setIsOver(false);
    setAutoOn(false);
  };

  return (
    <>
      <Styles />

      {/* PREP */}
      {mode === "prep" && (
        <div className="wrap">
          <div className="pill">
            <span className="dot" />
            Prep
          </div>

          <h1 className="h1">Pose Flow Operator</h1>
          <p className="sub">Big cues. Fast navigation. No confusion.</p>

          <div className="card">
            <div className="cardInner">
              <div className="grid">
                <div>
                  <div className="label">Genre</div>
                  <select className="control" value={genreId} onChange={(e) => setGenreId(e.target.value)}>
                    {GENRES.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="label">Set</div>
                  <select className="control" value={setId} onChange={(e) => setSetId(e.target.value)}>
                    {(genre.sets ?? []).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="label">Base</div>
                  <select className="control" value={baseId} onChange={(e) => setBaseId(e.target.value)}>
                    {availableBases.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>

                  <div className="row">
                    <label className="check">
                      <input type="checkbox" checked={showFullLibrary} onChange={(e) => setShowFullLibrary(e.target.checked)} />
                      Show full library
                    </label>

                    <button className={`btn btnIcon`} onClick={toggleFavorite} title="Favorite this base">
                      {isFavorite ? "★" : "☆"}
                    </button>
                  </div>

                  <div className="actions">
                    <button className="btn" onClick={duplicateAnchor} disabled={!selectedBase}>
                      Duplicate
                    </button>
                  </div>
                </div>
              </div>

              <div className="footerActions">
                <button className="btn btnPrimary" onClick={beginSession} disabled={!flow.length}>
                  Begin session
                </button>
              </div>
            </div>
          </div>

          {/* Rehearsal plan (card-based; no wall of text) */}
          <div className="card">
            <div className="cardInner">
              <div className="label" style={{ fontSize: 14, fontWeight: 900, color: "var(--ink)" }}>
                Rehearsal plan (Session in a week)
              </div>
              <p className="sub" style={{ marginTop: 6 }}>
                Follow this 7-day plan to make it testable in a week without changing your core system.
              </p>

              <div className="planGrid">
                {REHEARSAL_PLAN_7_DAYS.map((x) => (
                  <div key={x.day} className="planItem">
                    <div className="planDay">{x.day}</div>
                    <div className="planText">{x.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SESSION (full-screen, huge text, small image, big buttons) */}
      {mode === "session" && (
        <div className="session">
          {/* Top bar */}
          <div className="topBar">
            <div className="topInner">
              <div className="topRow">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="progLabel">Progress</div>
                  <div className="progNums">
                    <strong style={{ color: "var(--ink)" }}>{stepNow}</strong> / {flow.length || 0} ({progressPct}%)
                  </div>
                  <div className="bar">
                    <div className="barFill" style={{ width: `${progressPct}%` }} />
                  </div>
                </div>

                <div className="topControls">
                  <label className="smallToggle" title="Auto-advance through cues">
                    <input type="checkbox" checked={autoOn} onChange={(e) => setAutoOn(e.target.checked)} disabled={isOver} />
                    Auto
                  </label>

                  <select className="control" style={{ height: 42, width: 150 }} value={rhythmId} onChange={(e) => setRhythmId(e.target.value)} disabled={!autoOn || isOver}>
                    {RHYTHMS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label} ({r.seconds}s)
                      </option>
                    ))}
                  </select>

                  <label className="smallToggle" title="Show small reference image">
                    <input type="checkbox" checked={showRefImage} onChange={(e) => setShowRefImage(e.target.checked)} />
                    Image
                  </label>

                  <label className="smallToggle" title="Show next cue hint">
                    <input type="checkbox" checked={showNextPreview} onChange={(e) => setShowNextPreview(e.target.checked)} />
                    Next
                  </label>

                  <button className="btn" onClick={exitSession}>
                    Exit
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="main">
            <div className="mainPad">
              <div className="stage">
                {/* Tap anywhere to advance */}
                <div
                  className="tapZone"
                  onClick={() => {
                    if (!isOver) advance();
                  }}
                  role="button"
                  tabIndex={0}
                />

                {showRefImage && current?.img ? (
                  <div className="ref" aria-hidden="true">
                    <img src={current.img} alt="" draggable={false} />
                  </div>
                ) : null}

                {!isOver ? (
                  <div className="cueWrap" style={{ position: "relative", zIndex: 1 }}>
                    <div className="cue">{current?.cue ?? ""}</div>

                    {showNextPreview && nextStep?.cue ? (
                      <div className="nextBox">
                        <div className="nextLabel">Next</div>
                        <div className="nextCue">{nextStep.cue}</div>
                      </div>
                    ) : null}

                    <div className="hint">Tap anywhere to go Next.</div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <div className="progLabel" style={{ fontSize: 14 }}>Flow complete</div>
                    <div style={{ fontSize: 42, fontWeight: 900, marginTop: 8 }}>—</div>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
                      <button className="btn" onClick={restartFlow}>Restart</button>
                      <button className="btn btnPrimary" onClick={exitSession}>Exit</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom nav: ONLY two big buttons */}
          <div className="bottomBar">
            <div className="bottomInner">
              <div className="navRow">
                <button className="btn navBtn" onClick={back} disabled={!flow.length || (!isOver && idx <= 0)}>
                  Back
                </button>
                <button className="btn btnPrimary navBtn" onClick={advance} disabled={!flow.length || isOver}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
