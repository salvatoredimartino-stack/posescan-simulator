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

function GestureSilhouette({ variant = "standing", highlight = "hips" }) {
  const zoneOpacity = (z) => (highlight === z ? 1 : 0.35);

  const VAR = {
    standing: {
      g: { tx: 0, ty: 0, rot: 0 },
      torso:
        "M160 78 C148 90 142 112 144 132 C146 154 154 170 160 182 C166 170 174 154 176 132 C178 112 172 90 160 78 Z",
      hip:
        "M140 182 C148 196 172 196 180 182 C174 210 168 246 160 278 C152 246 146 210 140 182 Z",
      leftLeg:
        "M154 200 C146 226 130 268 120 294 L140 298 C150 270 162 236 170 206 Z",
      rightLeg:
        "M166 206 C174 236 186 270 196 298 L216 294 C206 268 190 226 182 200 Z",
      leftArm:
        "M144 126 C128 140 116 154 104 172 L118 184 C132 166 146 150 158 140 Z",
      rightArm:
        "M176 126 C192 140 204 154 216 172 L202 184 C188 166 174 150 162 140 Z",
    },
    seated: {
      g: { tx: 0, ty: 10, rot: 0 },
      torso:
        "M160 84 C146 98 140 120 142 138 C144 158 154 170 160 176 C166 170 176 158 178 138 C180 120 174 98 160 84 Z",
      hip:
        "M138 176 C150 190 170 190 182 176 C186 196 188 214 186 230 C166 236 154 236 134 230 C132 214 134 196 138 176 Z",
      leftLeg:
        "M150 220 C136 238 124 252 110 264 L124 278 C140 266 156 250 170 232 Z",
      rightLeg:
        "M176 224 C196 238 212 250 228 262 L214 278 C196 266 180 252 164 236 Z",
      leftArm:
        "M146 132 C134 148 130 166 132 182 L150 182 C148 168 152 152 160 142 Z",
      rightArm:
        "M174 132 C186 148 190 166 188 182 L170 182 C172 168 168 152 160 142 Z",
    },
    wall: {
      g: { tx: 0, ty: 0, rot: -6 },
      torso:
        "M160 80 C150 92 146 114 148 134 C150 154 156 170 160 180 C166 168 174 150 176 132 C178 112 172 90 160 80 Z",
      hip:
        "M142 180 C150 194 170 194 178 180 C176 204 172 236 166 276 L150 276 C146 236 142 204 142 180 Z",
      leftLeg:
        "M154 206 C148 238 142 268 138 298 L158 298 C162 270 166 240 170 210 Z",
      rightLeg:
        "M170 212 C176 238 184 268 194 298 L214 294 C202 266 190 234 182 206 Z",
      leftArm:
        "M146 126 C132 138 124 150 114 162 L128 176 C140 162 150 150 160 140 Z",
      rightArm:
        "M176 126 C190 138 202 150 212 162 L198 176 C186 162 176 150 166 140 Z",
    },
    table: {
      g: { tx: 0, ty: 0, rot: 0 },
      torso:
        "M160 86 C146 98 140 118 142 136 C144 154 154 168 160 176 C166 168 176 154 178 136 C180 118 174 98 160 86 Z",
      hip:
        "M140 176 C150 188 170 188 180 176 C178 194 176 212 172 236 L148 236 C144 212 142 194 140 176 Z",
      leftLeg:
        "M152 236 C140 258 132 276 124 296 L144 300 C152 282 160 262 168 242 Z",
      rightLeg:
        "M168 242 C178 262 188 282 198 300 L218 296 C208 276 196 258 184 236 Z",
      leftArm:
        "M146 130 C132 146 126 162 126 176 L146 176 C146 160 152 148 160 140 Z",
      rightArm:
        "M174 130 C188 146 194 162 194 176 L174 176 C174 160 168 148 160 140 Z",
    },
    box: {
      g: { tx: 0, ty: 8, rot: 4 },
      torso:
        "M160 86 C148 98 144 118 146 136 C148 154 156 166 160 172 C166 166 174 154 176 136 C178 118 172 98 160 86 Z",
      hip:
        "M140 172 C150 184 170 184 180 172 C184 190 186 212 186 236 C166 246 154 246 134 236 C134 212 136 190 140 172 Z",
      leftLeg:
        "M150 234 C138 246 126 256 112 266 L126 284 C140 272 156 258 170 244 Z",
      rightLeg:
        "M176 238 C190 250 206 262 224 274 L212 292 C194 280 178 268 164 254 Z",
      leftArm:
        "M146 130 C132 144 126 160 128 176 L146 176 C144 162 150 150 160 140 Z",
      rightArm:
        "M174 130 C188 144 194 160 192 176 L174 176 C176 162 170 150 160 140 Z",
    },
  };

  const v = VAR[variant] ?? VAR.standing;

  return (
    <svg viewBox="0 0 320 320" className="w-full h-full">
      <ellipse cx="160" cy="302" rx="86" ry="10" fill="currentColor" opacity="0.08" />

      <g transform={`translate(${v.g.tx} ${v.g.ty}) rotate(${v.g.rot} 160 180)`}>
        <g opacity="0.12" transform="translate(6 6)">
          <path d={v.torso} fill="currentColor" />
          <path d={v.hip} fill="currentColor" />
          <path d={v.leftLeg} fill="currentColor" />
          <path d={v.rightLeg} fill="currentColor" />
          <path d={v.leftArm} fill="currentColor" />
          <path d={v.rightArm} fill="currentColor" />
          <circle cx="160" cy="56" r="22" fill="currentColor" />
        </g>

        <path d={v.torso} fill="currentColor" opacity={zoneOpacity("hips")} />
        <path d={v.hip} fill="currentColor" opacity={zoneOpacity("hips")} />
        <path d={v.leftLeg} fill="currentColor" opacity={zoneOpacity("feet")} />
        <path d={v.rightLeg} fill="currentColor" opacity={zoneOpacity("feet")} />
        <path d={v.leftArm} fill="currentColor" opacity={zoneOpacity("arms")} />
        <path d={v.rightArm} fill="currentColor" opacity={zoneOpacity("arms")} />
        <circle cx="160" cy="56" r="22" fill="currentColor" opacity={zoneOpacity("head")} />

        <path
          d="M160 76 C154 104 154 130 160 160 C166 190 170 220 166 266"
          fill="none"
          stroke="white"
          strokeWidth="6"
          opacity="0.22"
          strokeLinecap="round"
        />
      </g>

      <g opacity={zoneOpacity("motion") * 0.6}>
        <rect x="18" y="238" width="78" height="58" rx="14" fill="none" stroke="currentColor" strokeWidth="6" />
        <circle cx="57" cy="267" r="12" fill="none" stroke="currentColor" strokeWidth="6" />
      </g>
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
  const highlight = current?.highlight ?? "hips";

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

  const silhouetteVariant =
    setId.includes("seated") ? "seated" :
    setId.includes("wall") ? "wall" :
    setId.includes("table") ? "table" :
    setId.includes("box") ? "box" :
    "standing";

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
              <select
                className="mt-1 w-full border rounded-lg p-2"
                value={setId}
                onChange={(e) => setSetId(e.target.value)}
              >
                {SETS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="text-xs text-neutral-500">Base</div>
              <select
                className="mt-1 w-full border rounded-lg p-2"
                value={baseId}
                onChange={(e) => setBaseId(e.target.value)}
              >
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
                <input
                  type="checkbox"
                  checked={autoplayOn}
                  onChange={(e) => setAutoplayOn(e.target.checked)}
                  disabled={ended}
                />
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
            <GestureSilhouette variant={silhouetteVariant} highlight={highlight} />
          </div>
        </div>
      </div>
    </div>
  );
}
