import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * FLOW‑BASED POSE TRAINER v1.1
 * ---------------------------------
 * PURPOSE
 * • Start from a base pose
 * • Move through a predefined flow of pose changes
 * • No typing, no decisions, no randomness
 * • Click NEXT and the app walks you through the session
 * • Endless loop (last step → back to base)
 *
 * ADDITIONS (v1.1)
 * • Operator cues tightened to 7–10 words (display only)
 * • Autoplay toggle (6–10 seconds)
 * • Full‑screen button (session use)
 * • Flow map strip (next 3 steps)
 */

/* =========================
   FLOW DEFINITIONS
   ========================= */

// Rule: cues are 7–10 words, imperative, no theory.
const FLOWS = {
  seated: {
    name: "Seated Flow (Stool)",
    base: {
      title: "Base — Seated on Stool",
      cue: "Sit tall. Feet down. Hands resting on lap.",
      highlight: "feet",
    },
    steps: [
      { id: 1, cue: "Slide hands between legs. Keep shoulders down.", highlight: "arms" },
      { id: 2, cue: "Rotate side‑on. Keep spine tall, chin forward.", highlight: "hips" },
      { id: 3, cue: "Tighten crop: mid‑arms to top of head.", highlight: "motion" },
      { id: 4, cue: "Turn camera horizontal. Hold pose. Breathe once.", highlight: "motion" },
      { id: 5, cue: "Left foot on box. Lean torso slightly forward.", highlight: "feet" },
      { id: 6, cue: "Arms on left knee. Right hand flat thigh.", highlight: "arms" },
      { id: 7, cue: "Right hand to left elbow. Bring left hand forward.", highlight: "arms" },
      { id: 8, cue: "Left hand to chin. Soften jaw, eyes steady.", highlight: "head" },
      { id: 9, cue: "Big smile. Add small head tilt. Hold.", highlight: "head" },
      { id: 10, cue: "Lean forward. Cross legs. Stagger arms on knee.", highlight: "hips" },
    ],
  },

  wall: {
    name: "Wall Flow",
    base: {
      title: "Base — Wall",
      cue: "Stand 45°. Weight back foot. Soft wall lean.",
      highlight: "hips",
    },
    steps: [
      { id: 1, cue: "Kick front knee forward. Keep hips back.", highlight: "feet" },
      { id: 2, cue: "Switch to composition 3. Keep pose unchanged.", highlight: "motion" },
      { id: 3, cue: "Cross arms softly. Drop shoulders. Exhale.", highlight: "arms" },
      { id: 4, cue: "Shift weight to front foot. Keep lean.", highlight: "feet" },
      { id: 5, cue: "Rotate to face wall. Keep chest line.", highlight: "hips" },
      { id: 6, cue: "Hands down. Relax wrists. Chin forward.", highlight: "arms" },
    ],
  },

  table: {
    name: "Table Flow",
    base: {
      title: "Base — Table",
      cue: "Elbows on table. Symmetry. Shoulders down. Neck long.",
      highlight: "arms",
    },
    steps: [
      { id: 1, cue: "Right elbow out. Create asymmetry. Keep shoulders down.", highlight: "arms" },
      { id: 2, cue: "Right hand in hair. Add small head tilt.", highlight: "head" },
      { id: 3, cue: "Both hands up. Frame face. Light touch.", highlight: "arms" },
      { id: 4, cue: "Chest slightly away. Chin down. Eyes up.", highlight: "hips" },
      { id: 5, cue: "Hands cross to right side. Keep neck long.", highlight: "arms" },
      { id: 6, cue: "Smoking hands. Elbows in. Soft mouth.", highlight: "arms" },
    ],
  },
};

/* =========================
   SIMPLE SKETCH
   ========================= */

function StickFigure({ highlight }) {
  const style = (z) => ({
    strokeWidth: highlight === z ? 10 : 6,
    opacity: highlight === z ? 1 : 0.35,
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

/* =========================
   FULLSCREEN HELPERS
   ========================= */

function requestFullscreen(el) {
  if (!el) return;
  const fn =
    el.requestFullscreen ||
    el.webkitRequestFullscreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullscreen;
  if (fn) fn.call(el);
}

function exitFullscreen() {
  const fn =
    document.exitFullscreen ||
    document.webkitExitFullscreen ||
    document.mozCancelFullScreen ||
    document.msExitFullscreen;
  if (fn) fn.call(document);
}

function isFullscreen() {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
}

/* =========================
   APP
   ========================= */

export default function App() {
  const [flowKey, setFlowKey] = useState("seated");
  const flow = FLOWS[flowKey];

  const [step, setStep] = useState(-1); // -1 = base pose

  // Autoplay
  const [autoplayOn, setAutoplayOn] = useState(false);
  const [autoplaySec, setAutoplaySec] = useState(8); // 6–10
  const timerRef = useRef(null);

  // Fullscreen
  const shellRef = useRef(null);
  const [fs, setFs] = useState(false);

  useEffect(() => {
    const handler = () => setFs(!!isFullscreen());
    document.addEventListener("fullscreenchange", handler);
    document.addEventListener("webkitfullscreenchange", handler);
    return () => {
      document.removeEventListener("fullscreenchange", handler);
      document.removeEventListener("webkitfullscreenchange", handler);
    };
  }, []);

  const current = useMemo(() => {
    if (step === -1) return flow.base;
    return flow.steps[step];
  }, [step, flow]);

  const next = () => {
    if (step < flow.steps.length - 1) {
      setStep(step + 1);
    } else {
      setStep(-1); // loop back to base
    }
  };

  const prev = () => {
    if (step > -1) setStep(step - 1);
  };

  const resetToBase = () => setStep(-1);

  // Autoplay interval
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (!autoplayOn) return;

    timerRef.current = setInterval(() => {
      setStep((s) => {
        if (s < flow.steps.length - 1) return s + 1;
        return -1;
      });
    }, autoplaySec * 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [autoplayOn, autoplaySec, flowKey]);

  // Reset state on flow change
  useEffect(() => {
    setStep(-1);
    setAutoplayOn(false);
  }, [flowKey]);

  // Highlight mapping (base can still highlight a zone)
  const highlight = current.highlight || "arms";

  // Flow map: next 3 steps
  const nextThree = useMemo(() => {
    const steps = flow.steps;
    const start = step;

    // define "current index" in the steps array
    // base (-1) is treated as "before step 0"
    const currentIndex = start;

    const pick = (offset) => {
      if (steps.length === 0) return null;
      // if base: next is step 0
      const baseIndex = currentIndex === -1 ? -1 : currentIndex;
      const idx = (baseIndex + offset + steps.length) % steps.length;
      return { idx, step: steps[idx] };
    };

    return [pick(1), pick(2), pick(3)].filter(Boolean);
  }, [flow.steps, step]);

  const toggleFullscreen = () => {
    if (fs) exitFullscreen();
    else requestFullscreen(shellRef.current);
  };

  return (
    <div ref={shellRef} className="min-h-screen bg-white p-6 text-neutral-900">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-2xl p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm text-neutral-500">Flow Trainer</div>
              <h1 className="text-2xl font-semibold">Pose Flow Simulator</h1>
            </div>
            <button
              onClick={toggleFullscreen}
              className="border rounded-lg px-3 py-2 text-sm"
              title="Full screen"
            >
              {fs ? "Exit full screen" : "Full screen"}
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-neutral-500">Flow</div>
              <select
                className="mt-1 w-full border rounded-lg p-2"
                value={flowKey}
                onChange={(e) => {
                  setFlowKey(e.target.value);
                  setStep(-1);
                }}
              >
                {Object.entries(FLOWS).map(([k, f]) => (
                  <option key={k} value={k}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="border rounded-xl p-3">
              <div className="text-xs text-neutral-500">Autoplay</div>
              <div className="mt-2 flex items-center justify-between gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={autoplayOn}
                    onChange={(e) => setAutoplayOn(e.target.checked)}
                  />
                  On
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-600">Every</span>
                  <select
                    className="border rounded-lg p-2 text-sm"
                    value={autoplaySec}
                    onChange={(e) => setAutoplaySec(Number(e.target.value))}
                    disabled={!autoplayOn}
                  >
                    {[6, 7, 8, 9, 10].map((s) => (
                      <option key={s} value={s}>
                        {s}s
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-2 text-xs text-neutral-500">Mirror drill: set 8s, loop repeatedly.</div>
            </div>
          </div>

          {/* FLOW MAP: NEXT 3 */}
          <div className="mt-4 border rounded-xl p-4">
            <div className="text-xs uppercase text-neutral-500">Next movements</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {nextThree.map((x, i) => (
                <div
                  key={`${x.step.id}-${i}`}
                  className="rounded-full border px-3 py-1 text-xs bg-neutral-50"
                >
                  <span className="font-semibold">#{x.step.id}</span> {x.step.cue}
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={resetToBase} className="border rounded-lg px-3 py-2 text-sm">
                Back to base
              </button>
            </div>
          </div>

          {/* CURRENT STEP CARD */}
          <div className="mt-4 border rounded-xl p-4">
            <div className="text-xs uppercase text-neutral-500">
              {step === -1 ? "Base Pose" : `Step ${step + 1} of ${flow.steps.length}`}
            </div>
            <div className="mt-2 text-lg font-semibold">{current.title || ""}</div>
            <p className="mt-2 text-base text-neutral-900 font-medium">{current.cue}</p>
            <div className="mt-3 text-xs text-neutral-500">Operator cue = 7–10 words. Do exactly that.</div>
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={prev} className="border rounded-lg px-4 py-2 text-sm">
              Back
            </button>
            <button onClick={next} className="border rounded-lg px-4 py-2 text-sm">
              Next movement
            </button>
          </div>

          <div className="mt-4 text-xs text-neutral-500">
            Looping flow. Last step returns to base pose.
          </div>
        </div>

        <div className="border rounded-2xl p-5">
          <div className="text-sm text-neutral-500">Movement Guide</div>
          <div className="mt-2 aspect-square border rounded-xl flex items-center justify-center">
            <StickFigure highlight={highlight === "base" ? "hips" : highlight} />
          </div>
          <div className="mt-3 text-xs text-neutral-500">
            Highlight shows what changes from the previous pose.
          </div>
        </div>
      </div>
    </div>
  );
}
