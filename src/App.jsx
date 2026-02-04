import React, { useEffect, useMemo, useRef, useState } from "react";

const SETS = [
  {
    id: "set1_seated_stool",
    name: "SET 1 — SEATED (STOOL)",
    bases: [
      {
        id: "base1",
        name: "Base Pose 1",
        flow: [
          { id: "Base Pose 1", cue: "Edge of stool, 45°, feet down, hands flat", highlight: "feet" },
          { id: "Pose 2", cue: "Hands between legs, elbows relaxed inward", highlight: "arms" },
          { id: "Pose 3", cue: "Rotate side-on, maintain torso length", highlight: "hips" },
          { id: "Pose 4", cue: "Change composition, tighten crop", highlight: "motion" },
          { id: "Pose 5", cue: "Horizontal camera, same body position", highlight: "motion" },
          { id: "Pose 6", cue: "Alternate composition, hold expression", highlight: "motion" },
        ],
      },
      {
        id: "base2",
        name: "Base Pose 2",
        flow: [
          { id: "Base Pose 2", cue: "Left foot raised, elbow on knee, torso forward", highlight: "feet" },
          { id: "Pose 10", cue: "Cup fingers softly, relax wrists", highlight: "arms" },
          { id: "Pose 11", cue: "Right hand back pocket, chest open", highlight: "arms" },
          { id: "Pose 12", cue: "Hands between legs, weight grounded", highlight: "arms" },
          { id: "Pose 13", cue: "Lean back slightly, tilt, compose wide", highlight: "hips" },
          { id: "Pose 14", cue: "Elbow out, knee support maintained", highlight: "arms" },
          { id: "Pose 15", cue: "Hands forward, connect elbows visually", highlight: "arms" },
        ],
      },
      {
        id: "base3",
        name: "Base Pose 3",
        flow: [
          { id: "Base Pose 3", cue: "Open to camera, elbow on knee, hand on thigh", highlight: "hips" },
          { id: "Pose 17", cue: "Hand to chin, thoughtful pause", highlight: "head" },
          { id: "Pose 18", cue: "Big smile, hold structure", highlight: "head" },
          { id: "Pose 19", cue: "Tilt head, smile, hands crossed low", highlight: "head" },
        ],
      },
      {
        id: "base4",
        name: "Base Pose 4",
        flow: [
          { id: "Base Pose 4", cue: "Body forward, legs crossed, arms staggered", highlight: "hips" },
          { id: "Pose 21", cue: "Hand to chin, other grounded", highlight: "head" },
          { id: "Pose 22", cue: "Smoking-style fingers, relaxed wrist", highlight: "arms" },
          { id: "Pose 23", cue: "Hands down, big smile, head tilt", highlight: "head" },
        ],
      },
    ],
  },
  {
    id: "set2_standing",
    name: "SET 2 — STANDING",
    bases: [
      {
        id: "base79",
        name: "Base Pose 79",
        flow: [
          { id: "Base Pose 79", cue: "Feet apart, hip rocked, hands on hips", highlight: "hips" },
          { id: "Pose 80", cue: "Change composition, shoot low", highlight: "motion" },
        ],
      },
      {
        id: "base81",
        name: "Base Pose 81",
        flow: [
          { id: "Base Pose 81", cue: "Rotate body, foot elevated, chin 45°", highlight: "feet" },
          { id: "Pose 82", cue: "Elbow tucked, slight left tilt", highlight: "arms" },
          { id: "Pose 83", cue: "Chin back to camera", highlight: "head" },
          { id: "Pose 84", cue: "Rotate, look back, keep breast line", highlight: "hips" },
        ],
      },
    ],
  },
  {
    id: "set3_wall",
    name: "SET 3 — WALL",
    bases: [
      {
        id: "base72",
        name: "Base Pose 72",
        flow: [
          { id: "Base Pose 72", cue: "45° to camera, weight back, knee forward", highlight: "feet" },
          { id: "Pose 73", cue: "Same pose, tighter composition", highlight: "motion" },
          { id: "Pose 74", cue: "Hands crossed, left under", highlight: "arms" },
        ],
      },
      {
        id: "base75",
        name: "Base Pose 75",
        flow: [
          { id: "Base Pose 75", cue: "Rotate body, shift weight forward", highlight: "feet" },
          { id: "Pose 76", cue: "Face wall, flatten shoulders", highlight: "hips" },
          { id: "Pose 77", cue: "Change composition, widen frame", highlight: "motion" },
          { id: "Pose 78", cue: "Hands down, soften posture", highlight: "arms" },
        ],
      },
    ],
  },
  {
    id: "set4_table",
    name: "SET 4 — TABLE",
    bases: [
      {
        id: "base94",
        name: "Base Pose 94",
        flow: [
          { id: "Base Pose 94", cue: "Symmetric elbows, tapered arms", highlight: "arms" },
          { id: "Pose 95", cue: "Asymmetric, right elbow out", highlight: "arms" },
          { id: "Pose 96", cue: "Hands up, right higher, tilt", highlight: "head" },
          { id: "Pose 97", cue: "Elbows together, frame face", highlight: "arms" },
          { id: "Pose 98", cue: "Chest away, neck long", highlight: "hips" },
          { id: "Pose 99", cue: "Hands out, crossing lightly", highlight: "arms" },
          { id: "Pose 100", cue: "Smoking hands, elbows in", highlight: "arms" },
          { id: "Pose 101", cue: "Hands behind hair, elbows crossed", highlight: "arms" },
          { id: "Pose 102", cue: "Elbow one way, hands across", highlight: "arms" },
          { id: "Pose 103", cue: "Body out, head left", highlight: "hips" },
          { id: "Pose 104", cue: "Hand in hair, body sideways", highlight: "hips" },
          { id: "Pose 105", cue: "Both hands up", highlight: "arms" },
          { id: "Pose 106", cue: "Hands tucked, tight composition", highlight: "motion" },
          { id: "Pose 107", cue: "Hugging motion, one hand off", highlight: "arms" },
          { id: "Pose 108", cue: "Double hug, compress shape", highlight: "arms" },
          { id: "Pose 109", cue: "Elbow off, one up one down, tilt", highlight: "arms" },
        ],
      },
    ],
  },
  {
    id: "set5_staggered_box",
    name: "SET 5 — STAGGERED SEATING (BOX)",
    bases: [
      {
        id: "base111",
        name: "Base Pose 111",
        flow: [
          { id: "Base Pose 111", cue: "Recline on box, elbow down, body relaxed", highlight: "hips" },
          { id: "Pose 112", cue: "Hands inside, elbows supported", highlight: "arms" },
          { id: "Pose 113", cue: "Hand behind hair", highlight: "arms" },
          { id: "Pose 114", cue: "Triangle shape, elbow anchored", highlight: "arms" },
          { id: "Pose 115", cue: "Elbows together, hands on chin", highlight: "head" },
          { id: "Pose 116", cue: "Rotate body around elbows", highlight: "hips" },
          { id: "Pose 117", cue: "Feet on box, hug knees", highlight: "feet" },
          { id: "Pose 118", cue: "Remove box, horizontal tilt", highlight: "motion" },
          { id: "Pose 119", cue: "Big smile, tilt, hold", highlight: "head" },
          { id: "Pose 120", cue: "One knee hugged, elbow down", highlight: "feet" },
        ],
      },
    ],
  },
];

const EXPRESSION_OPTIONS = [
  "relaxed",
  "smirk",
  "smile with eyes",
  "smile + smirk",
  "bigger smile / laugh",
];

function requestFullscreen(el) {
  if (!el) return;
  const fn = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
  if (fn) fn.call(el);
}

function exitFullscreen() {
  const fn = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
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

function StickFigure({ highlight }) {
  const style = (z) => ({
    strokeWidth: highlight === z ? 10 : 6,
    opacity: highlight === z ? 1 : 0.32,
  });

  return (
    <svg viewBox="0 0 320 320" className="w-full h-full">
      <circle cx="160" cy="60" r="26" fill="none" stroke="currentColor" style={style("head")} />
      <line x1="160" y1="90" x2="160" y2="180" stroke="currentColor" style={style("hips")} />
      <line x1="120" y1="120" x2="200" y2="120" stroke="currentColor" style={style("arms")} />
      <line x1="160" y1="180" x2="130" y2="280" stroke="currentColor" style={style("feet")} />
      <line x1="160" y1="180" x2="190" y2="280" stroke="currentColor" style={style("feet")} />
      <rect x="20" y="240" width="70" height="50" rx="10" fill="none" stroke="currentColor" style={style("motion")} />
    </svg>
  );
}

function useAutoplay({ enabled, seconds, onTick }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      clearInterval(ref.current);
      ref.current = null;
    }
    if (!enabled) return;

    ref.current = setInterval(() => {
      onTick();
    }, seconds * 1000);

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
        ref.current = null;
      }
    };
  }, [enabled, seconds, onTick]);
}

export default function App() {
  const shellRef = useRef(null);
  const [fs, setFs] = useState(false);

  const [setId, setSetId] = useState(SETS[0].id);
  const selectedSet = useMemo(() => SETS.find((s) => s.id === setId) ?? SETS[0], [setId]);

  const [baseId, setBaseId] = useState(selectedSet.bases[0]?.id ?? "");

  useEffect(() => {
    setBaseId(selectedSet.bases[0]?.id ?? "");
  }, [setId]);

  const selectedBase = useMemo(() => {
    return selectedSet.bases.find((b) => b.id === baseId) ?? selectedSet.bases[0] ?? null;
  }, [selectedSet, baseId]);

  const flow = selectedBase?.flow ?? [];

  const [idx, setIdx] = useState(0);
  const [ended, setEnded] = useState(false);

  const [autoplayOn, setAutoplayOn] = useState(false);
  const [autoplaySec, setAutoplaySec] = useState(8);

  const [expression, setExpression] = useState(EXPRESSION_OPTIONS[0]);

  useEffect(() => {
    setIdx(0);
    setEnded(false);
    setAutoplayOn(false);
  }, [setId, baseId]);

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

  const getValidIndex = (start) => {
    if (!flow || flow.length === 0) return -1;
    let i = start;
    while (i < flow.length && !flow[i]) i += 1;
    if (i >= flow.length) return -1;
    return i;
  };

  const advance = () => {
    if (!flow || flow.length === 0) {
      setEnded(true);
      setAutoplayOn(false);
      return;
    }

    const nextRaw = idx + 1;
    const nextValid = getValidIndex(nextRaw);

    if (nextValid === -1) {
      setEnded(true);
      setAutoplayOn(false);
      return;
    }

    setIdx(nextValid);
  };

  const back = () => {
    if (!flow || flow.length === 0) return;
    let i = idx - 1;
    while (i >= 0 && !flow[i]) i -= 1;
    if (i >= 0) setIdx(i);
  };

  useAutoplay({
    enabled: autoplayOn && !ended,
    seconds: autoplaySec,
    onTick: () => {
      advance();
    },
  });

  const currentIndex = useMemo(() => {
    if (!flow || flow.length === 0) return -1;
    const valid = getValidIndex(idx);
    if (valid === -1) return -1;
    return valid;
  }, [flow, idx]);

  const current = currentIndex >= 0 ? flow[currentIndex] : null;
  const highlight = current?.highlight ?? "arms";

  const strip = useMemo(() => {
    if (!flow || flow.length === 0) return [];

    const out = [];

    const addAt = (i) => {
      if (i < 0) return;
      const vi = getValidIndex(i);
      if (vi === -1) return;
      const item = flow[vi];
      if (!item) return;
      out.push({ index: vi, id: item.id, cue: item.cue });
    };

    addAt(currentIndex);
    addAt(currentIndex + 1);
    addAt(currentIndex + 2);
    addAt(currentIndex + 3);

    return out;
  }, [flow, currentIndex]);

  const touchRef = useRef({ x: 0, y: 0, t: 0 });
  const onTouchStart = (e) => {
    if (autoplayOn) return;
    const t = e.touches?.[0];
    if (!t) return;
    touchRef.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  };

  const onTouchEnd = (e) => {
    if (autoplayOn) return;
    const t = e.changedTouches?.[0];
    if (!t) return;
    const dx = t.clientX - touchRef.current.x;
    const dy = t.clientY - touchRef.current.y;
    const dt = Date.now() - touchRef.current.t;

    if (dt > 900) return;
    if (Math.abs(dx) < 50) return;
    if (Math.abs(dy) > 80) return;

    if (dx < 0) advance();
    else back();
  };

  useEffect(() => {
    if (!selectedBase) {
      setEnded(true);
      setAutoplayOn(false);
      return;
    }
    if (!flow || flow.length === 0) {
      setEnded(true);
      setAutoplayOn(false);
      return;
    }

    const first = getValidIndex(0);
    if (first === -1) {
      setEnded(true);
      setAutoplayOn(false);
      return;
    }

    setIdx(first);
    setEnded(false);
  }, [selectedBase]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={shellRef} className="min-h-screen bg-white p-6 text-neutral-900">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-2xl p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm text-neutral-500">Session Flow</div>
              <h1 className="text-2xl font-semibold">Pose Flow Operator</h1>
            </div>
            <button onClick={toggleFullscreen} className="border rounded-lg px-3 py-2 text-sm" title="Full screen">
              {fs ? "Exit full screen" : "Full screen"}
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-neutral-500">Set</div>
              <select className="mt-1 w-full border rounded-lg p-2" value={setId} onChange={(e) => setSetId(e.target.value)}>
                {SETS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="text-xs text-neutral-500">Base</div>
              <select className="mt-1 w-full border rounded-lg p-2" value={baseId} onChange={(e) => setBaseId(e.target.value)}>
                {selectedSet.bases.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 border rounded-xl p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs text-neutral-500">Autoplay</div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={autoplayOn} onChange={(e) => setAutoplayOn(e.target.checked)} disabled={ended} />
                On
              </label>
              <select
                className="border rounded-lg p-2 text-sm"
                value={autoplaySec}
                onChange={(e) => setAutoplaySec(Number(e.target.value))}
                disabled={!autoplayOn || ended}
              >
                {[6, 7, 8, 9, 10].map((s) => (
                  <option key={s} value={s}>
                    {s}s
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 border rounded-xl p-4">
            <div className="flex flex-wrap gap-2">
              {strip.map((x) => (
                <div
                  key={`${x.index}-${x.id}`}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    x.index === currentIndex ? "bg-neutral-900 text-white" : "bg-neutral-50"
                  }`}
                >
                  <span className="font-semibold">{x.id}</span> {x.cue}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 border rounded-xl p-4">
            <div className="text-sm font-semibold">Expression Module Integration</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {EXPRESSION_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  className={`rounded-full border px-3 py-2 text-xs ${
                    expression === opt ? "bg-neutral-900 text-white border-neutral-900" : "bg-white border-neutral-300"
                  }`}
                  onClick={() => setExpression(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 border rounded-xl p-5" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {!ended && current && (
              <>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-neutral-500">{current.id}</div>
                  <div className="text-xs text-neutral-500">{expression}</div>
                </div>
                <div className="mt-2 text-xl font-semibold">{current.cue}</div>
              </>
            )}
            {ended && (
              <>
                <div className="text-xs text-neutral-500">End</div>
                <div className="mt-2 text-xl font-semibold">—</div>
              </>
            )}
          </div>
        </div>

        <div className="border rounded-2xl p-5">
          <div className="text-sm text-neutral-500">Guide</div>
          <div className="mt-2 aspect-square border rounded-xl flex items-center justify-center">
            <StickFigure highlight={highlight} />
          </div>
        </div>
      </div>
    </div>
  );
}

/*
4. Validation
- Internally consistent: set->base->flow remains fixed; cues unchanged.
- Changelog: added Expression Module Integration UI; added fixed expression options state; displayed expression beside pose ID.
*/
