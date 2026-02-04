import React, { useEffect, useMemo, useState } from "react";

/**
 * PoseScan Simulator MVP
 * - Pure front-end (runs free on GitHub Pages / Netlify)
 * - Trains: scan order, single mutation, verbal direction minimalism
 * - Includes simple sketch (SVG) for base pose + highlighted zone
 */

const ZONES = [
  { key: "feet", label: "Feet & Weight", hint: "Stance + weight" },
  { key: "hips", label: "Hips & Torso", hint: "Angle + posture" },
  { key: "arms", label: "Shoulders, Arms & Hands", hint: "Asymmetry + shape" },
  { key: "head", label: "Head, Chin & Expression", hint: "Chin + emotion" },
  { key: "motion", label: "Motion & Camera", hint: "Still/move + height" },
];

const BASE_POSES = [
  {
    id: "standing",
    name: "Standing Base",
    description: "Comfortable, boring, repeatable. Neutral stance, relaxed shoulders.",
  },
  {
    id: "wall",
    name: "Wall Base",
    description: "Light lean to a wall, one knee soft, shoulders down.",
  },
];

const MUTATIONS = [
  { zone: "feet", text: "Change weight (front/back)" },
  { zone: "feet", text: "Change stance (flat/staggered)" },
  { zone: "hips", text: "Angle hips a touch" },
  { zone: "hips", text: "Lean slightly (forward/back)" },
  { zone: "arms", text: "Change arm relationship" },
  { zone: "arms", text: "Change hand placement" },
  { zone: "head", text: "Chin forward (not up)" },
  { zone: "head", text: "Change head tilt" },
  { zone: "motion", text: "Add micro-motion (breathe/shift)" },
  { zone: "motion", text: "Change camera height (imagined)" },
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clampWords(s, maxWords) {
  const words = s.trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return { ok: true, value: s.trim(), words: words.length };
  return { ok: false, value: words.slice(0, maxWords).join(" "), words: words.length };
}

function useSpeech() {
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  const speak = (text) => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  };
  return { supported, speak };
}

function StickFigure({ baseId, highlight }) {
  // Very simple sketch that changes slightly by baseId.
  const lean = baseId === "wall" ? 12 : 0;
  const wallX = 260;

  const zoneStyle = (zone) =>
    highlight === zone
      ? { strokeWidth: 10, opacity: 1 }
      : { strokeWidth: 6, opacity: 0.35 };

  return (
    <svg viewBox="0 0 320 320" className="w-full h-full">
      {/* optional wall */}
      {baseId === "wall" && (
        <line x1={wallX} y1={40} x2={wallX} y2={300} stroke="currentColor" opacity="0.25" strokeWidth="8" />
      )}

      {/* head */}
      <circle
        cx={150 + lean}
        cy={70}
        r={26}
        fill="none"
        stroke="currentColor"
        style={zoneStyle("head")}
      />

      {/* torso */}
      <line
        x1={150 + lean}
        y1={96}
        x2={150 + lean}
        y2={185}
        stroke="currentColor"
        style={zoneStyle("hips")}
      />

      {/* shoulders/arms */}
      <line
        x1={115 + lean}
        y1={120}
        x2={185 + lean}
        y2={120}
        stroke="currentColor"
        style={zoneStyle("arms")}
      />
      {/* left arm */}
      <line
        x1={125 + lean}
        y1={120}
        x2={110 + lean}
        y2={175}
        stroke="currentColor"
        style={zoneStyle("arms")}
      />
      {/* right arm */}
      <line
        x1={175 + lean}
        y1={120}
        x2={205 + lean}
        y2={165}
        stroke="currentColor"
        style={zoneStyle("arms")}
      />

      {/* hips marker */}
      <circle cx={150 + lean} cy={190} r={10} fill="currentColor" opacity={highlight === "hips" ? 0.9 : 0.25} />

      {/* legs/feet */}
      <line
        x1={150 + lean}
        y1={200}
        x2={125 + lean}
        y2={280}
        stroke="currentColor"
        style={zoneStyle("feet")}
      />
      <line
        x1={150 + lean}
        y1={200}
        x2={175 + lean}
        y2={280}
        stroke="currentColor"
        style={zoneStyle("feet")}
      />

      {/* motion/camera indicator */}
      <g opacity={highlight === "motion" ? 1 : 0.35}>
        <rect x={20} y={235} width={70} height={55} rx={10} fill="none" stroke="currentColor" strokeWidth={highlight === "motion" ? 6 : 4} />
        <circle cx={55} cy={262} r={12} fill="none" stroke="currentColor" strokeWidth={highlight === "motion" ? 6 : 4} />
      </g>
    </svg>
  );
}

export default function App() {
  const { supported: ttsSupported, speak } = useSpeech();

  const [basePose, setBasePose] = useState(BASE_POSES[0].id);
  const [mode, setMode] = useState("scan"); // scan | mutation
  const [stepIndex, setStepIndex] = useState(0);
  const [completedScans, setCompletedScans] = useState(0);

  const [mutation, setMutation] = useState(null);
  const [mutationLocked, setMutationLocked] = useState(false);

  const [instruction, setInstruction] = useState("");
  const [wordCap] = useState(7);

  const currentZone = ZONES[stepIndex];

  const canAdvance = useMemo(() => {
    // We keep it intentionally strict but simple:
    // - In scan mode: must enter an instruction (any text), <= wordCap
    // - In mutation mode: must have a mutation selected and one instruction
    const c = clampWords(instruction, wordCap);
    if (!instruction.trim()) return false;
    if (!c.ok) return false;
    if (mode === "mutation" && !mutation) return false;
    return true;
  }, [instruction, mode, mutation, wordCap]);

  const wordCheck = useMemo(() => clampWords(instruction, wordCap), [instruction, wordCap]);

  useEffect(() => {
    // auto-suggest a minimal phrasing template when step changes
    setInstruction("");
    if (mode === "scan") {
      // no template; keep the user generating their own.
    }
  }, [stepIndex, mode]);

  const resetAll = () => {
    setMode("scan");
    setStepIndex(0);
    setCompletedScans(0);
    setMutation(null);
    setMutationLocked(false);
    setInstruction("");
  };

  const resetScan = () => {
    setMode("scan");
    setStepIndex(0);
    setMutation(null);
    setMutationLocked(false);
    setInstruction("");
  };

  const next = () => {
    if (!canAdvance) return;

    // Speak the zone label + instruction (helps verbal direction practice)
    const spoken = `${currentZone.label}. ${instruction.trim()}`;
    speak(spoken);

    if (stepIndex < ZONES.length - 1) {
      setStepIndex((i) => i + 1);
      return;
    }

    // completed a full scan
    setCompletedScans((n) => n + 1);

    if (mode === "scan") {
      // Enter mutation round: exactly ONE change, then restart scan.
      setMode("mutation");
      setStepIndex(0);
      setMutation(null);
      setMutationLocked(false);
      return;
    }

    // completed the mutation scan; go back to scan mode
    setMode("scan");
    setStepIndex(0);
    setMutation(null);
    setMutationLocked(false);
  };

  const rollMutation = () => {
    if (mutationLocked) return;
    const m = pickRandom(MUTATIONS);
    setMutation(m);
  };

  const lockMutation = () => {
    if (!mutation) return;
    setMutationLocked(true);
  };

  const modeLabel = mode === "scan" ? "SCAN" : "MUTATION";

  return (
    <div className="min-h-screen w-full bg-white text-neutral-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-neutral-200 shadow-sm p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm uppercase tracking-wide text-neutral-500">Simulation</div>
              <h1 className="text-2xl font-semibold">PoseScan Simulator (MVP)</h1>
              <p className="text-sm text-neutral-600 mt-1">
                Trains scan order + single-mutation restraint + minimal verbal direction.
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-neutral-500">Mode</div>
              <div className="text-lg font-semibold">{modeLabel}</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-neutral-200 p-3">
              <div className="text-xs text-neutral-500">Base pose</div>
              <select
                className="mt-1 w-full rounded-lg border border-neutral-300 p-2"
                value={basePose}
                onChange={(e) => setBasePose(e.target.value)}
              >
                {BASE_POSES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <div className="text-xs text-neutral-600 mt-2">
                {BASE_POSES.find((p) => p.id === basePose)?.description}
              </div>
            </div>

            <div className="rounded-xl border border-neutral-200 p-3">
              <div className="text-xs text-neutral-500">Progress</div>
              <div className="mt-1 text-sm">
                Step <span className="font-semibold">{stepIndex + 1}</span> / {ZONES.length}
              </div>
              <div className="text-sm">
                Scans completed: <span className="font-semibold">{completedScans}</span>
              </div>
              <div className="text-xs text-neutral-500 mt-2">
                Tip: if you ever skip a zone in real life, hit <b>Reset Scan</b>.
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-neutral-200 p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">Current zone</div>
            <div className="mt-1 text-lg font-semibold">{currentZone.label}</div>
            <div className="text-sm text-neutral-600">{currentZone.hint}</div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-xs text-neutral-500">
                  Your instruction (max {wordCap} words)
                </div>
                <div className={`text-xs ${wordCheck.ok ? "text-neutral-500" : "text-red-600"}`}>
                  {instruction.trim() ? instruction.trim().split(/\s+/).filter(Boolean).length : 0} words
                </div>
              </div>
              <input
                className={`mt-1 w-full rounded-lg border p-2 ${
                  wordCheck.ok ? "border-neutral-300" : "border-red-400"
                }`}
                placeholder={`Example: “Shift weight slightly back”`}
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
              />
              {!wordCheck.ok && (
                <div className="text-xs text-red-600 mt-1">
                  Too long. Keep it ≤ {wordCap} words. (Cut adjectives and explanations.)
                </div>
              )}
            </div>

            {mode === "mutation" && (
              <div className="mt-4 rounded-xl border border-neutral-200 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-neutral-500">Mutation (exactly one)</div>
                    <div className="mt-1 text-sm">
                      {mutation ? (
                        <>
                          <span className="font-semibold">{mutation.text}</span>
                          <span className="text-neutral-500"> — zone: {mutation.zone}</span>
                        </>
                      ) : (
                        <span className="text-neutral-500">Roll one mutation, then lock it.</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
                      onClick={rollMutation}
                      disabled={mutationLocked}
                    >
                      Roll
                    </button>
                    <button
                      className={`rounded-lg px-3 py-2 text-sm border ${
                        mutationLocked
                          ? "border-neutral-200 text-neutral-400"
                          : "border-neutral-900"
                      }`}
                      onClick={lockMutation}
                      disabled={!mutation || mutationLocked}
                    >
                      Lock
                    </button>
                  </div>
                </div>
                <div className="text-xs text-neutral-500 mt-2">
                  Rule: you are allowed to change only this mutation for the entire next scan.
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                className={`rounded-lg px-4 py-2 text-sm border ${
                  canAdvance ? "border-neutral-900" : "border-neutral-200 text-neutral-400"
                }`}
                onClick={next}
                disabled={!canAdvance}
              >
                Next
              </button>
              <button
                className="rounded-lg border border-neutral-300 px-4 py-2 text-sm"
                onClick={resetScan}
              >
                Reset Scan
              </button>
              <button
                className="rounded-lg border border-neutral-300 px-4 py-2 text-sm"
                onClick={resetAll}
              >
                Reset All
              </button>

              <div className="ml-auto text-xs text-neutral-500 flex items-center">
                TTS: {ttsSupported ? "on" : "not supported in this browser"}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-neutral-50 border border-neutral-200 p-4">
            <div className="text-sm font-semibold">How to use (home mirror drill)</div>
            <ol className="mt-2 text-sm text-neutral-700 list-decimal ml-5 space-y-1">
              <li>Stand in front of a mirror. Pick a base pose.</li>
              <li>For each zone, physically adjust <b>only that zone</b>, then type a ≤7-word instruction.</li>
              <li>Hit <b>Next</b>. Say the instruction out loud as it plays.</li>
              <li>After one full scan, the app forces a <b>single mutation</b> scan.</li>
            </ol>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 shadow-sm p-5">
          <div className="text-sm uppercase tracking-wide text-neutral-500">Base pose sketch</div>
          <div className="mt-2 aspect-square rounded-2xl border border-neutral-200 flex items-center justify-center">
            <StickFigure baseId={basePose} highlight={currentZone.key === "motion" ? "motion" : currentZone.key} />
          </div>
          <div className="mt-4 rounded-xl border border-neutral-200 p-4">
            <div className="text-sm font-semibold">Discipline rules (the machine)</div>
            <ul className="mt-2 text-sm text-neutral-700 list-disc ml-5 space-y-1">
              <li>Scan order is fixed. No skipping.</li>
              <li>One instruction per zone.</li>
              <li>≤7 words. No explaining why.</li>
              <li>In mutation mode, change only the locked mutation.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
