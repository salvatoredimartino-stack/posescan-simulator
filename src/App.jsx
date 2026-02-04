import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * PoseScan Simulator v0.2
 * - Base poses: standing, wall, seated, table
 * - Base pose setup checklist (training)
 * - Clear phase transitions: SETUP -> BASE SCAN -> MUTATION
 * - Mutation auto-roll + banner
 * - Mutations filtered per base
 * - Audio recording per step (no word limit). Text input remains <= 7 words.
 */

const ZONES = [
  { key: "feet", label: "Feet & Weight", hint: "Stance + weight" },
  { key: "hips", label: "Hips & Torso", hint: "Angle + posture" },
  { key: "arms", label: "Shoulders, Arms & Hands", hint: "Asymmetry + shape" },
  { key: "head", label: "Head, Chin & Expression", hint: "Chin + emotion" },
  { key: "motion", label: "Motion & Camera", hint: "Still/move + height/crop" },
];

const BASE_POSES = [
  {
    id: "standing",
    name: "Standing Base",
    description: "Neutral stance. Comfortable, boring, repeatable.",
    setup: [
      "Stand tall. Feet shoulder width.",
      "Weight 60/40 (not 50/50).",
      "Shoulders down. Neck long.",
      "Hands neutral (no fists).",
      "Face neutral. Exhale once.",
    ],
  },
  {
    id: "wall",
    name: "Wall Base",
    description: "Soft lean to a wall. One knee relaxed.",
    setup: [
      "Stand near wall (hip or shoulder close).",
      "Soft lean (not slouch).",
      "One knee unlocked (soft).",
      "Shoulders down. Chin forward 1cm.",
      "Neutral face. Exhale once.",
    ],
  },
  {
    id: "seated",
    name: "Seated Base",
    description: "Seated on chair/stool. Tall spine, slight forward intent.",
    setup: [
      "Sit on front third of chair/stool.",
      "Feet planted; one foot slightly forward.",
      "Spine tall; hinge from hips if leaning.",
      "Shoulders down; hands rest softly.",
      "Neutral face. Slow exhale.",
    ],
  },
  {
    id: "table",
    name: "Table Base",
    description: "Forearms lightly on table (standing or seated).",
    setup: [
      "Forearms on table (light pressure).",
      "Shoulders down (no hiking).",
      "Angle torso slightly (not square).",
      "Hands relaxed; fingers separated.",
      "Chin forward; neutral expression.",
    ],
  },
];

// Mutations filtered per base pose (each tagged by zone for correctness)
const MUTATIONS_BY_BASE = {
  standing: [
    { zone: "feet", text: "Change weight (front/back)" },
    { zone: "feet", text: "Change stance (flat/staggered)" },
    { zone: "hips", text: "Angle hips a touch" },
    { zone: "hips", text: "Lean slightly (forward/back)" },
    { zone: "arms", text: "Change hand placement" },
    { zone: "arms", text: "Change arm relationship" },
    { zone: "head", text: "Chin forward (not up)" },
    { zone: "head", text: "Change head tilt" },
    { zone: "motion", text: "Add micro-motion (breath/shift)" },
    { zone: "motion", text: "Change camera height (imagined)" },
  ],
  wall: [
    { zone: "feet", text: "Switch which leg is soft" },
    { zone: "hips", text: "Change lean amount (softer/stronger)" },
    { zone: "arms", text: "Add hand to wall / remove hand" },
    { zone: "arms", text: "Cross arms lightly / uncross" },
    { zone: "head", text: "Turn face slightly toward light" },
    { zone: "motion", text: "Micro step in/out from wall" },
  ],
  seated: [
    { zone: "feet", text: "Switch which foot is forward" },
    { zone: "hips", text: "Lean forward 2cm / sit back" },
    { zone: "arms", text: "Hands on thighs / hands together" },
    { zone: "arms", text: "Elbow on knee / remove" },
    { zone: "head", text: "Chin forward 1cm" },
    { zone: "motion", text: "Shift on seat (edge/settle)" },
  ],
  table: [
    { zone: "arms", text: "Forearms down / one forearm only" },
    { zone: "arms", text: "Hands clasped / hands separated" },
    { zone: "hips", text: "Angle torso more / less" },
    { zone: "head", text: "Head tilt slightly" },
    { zone: "motion", text: "Slide elbows 2cm / return" },
  ],
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clampWords(s, maxWords) {
  const words = s.trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return { ok: true, words: words.length };
  return { ok: false, words: words.length };
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

function useAudioRecorder() {
  const [supported, setSupported] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mrRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    setSupported(
      typeof window !== "undefined" &&
        !!window.MediaRecorder &&
        !!navigator?.mediaDevices?.getUserMedia
    );
  }, []);

  const start = async () => {
    if (!supported || isRecording) return;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);
    chunksRef.current = [];
    mr.ondataavailable = (e) => {
      if (e.data?.size) chunksRef.current.push(e.data);
    };
    mrRef.current = mr;
    mr.start();
    setIsRecording(true);
  };

  const stop = async () => {
    if (!isRecording || !mrRef.current) return null;
    const mr = mrRef.current;

    return new Promise((resolve) => {
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        // stop mic tracks
        mr.stream.getTracks().forEach((t) => t.stop());
        setIsRecording(false);
        resolve(blob);
      };
      mr.stop();
    });
  };

  return { supported, isRecording, start, stop };
}

function Banner({ title, body, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-lg rounded-2xl bg-white border border-neutral-200 shadow-lg p-5">
        <div className="text-lg font-semibold">{title}</div>
        <div className="mt-2 text-sm text-neutral-700 whitespace-pre-line">
          {body}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="rounded-lg border border-neutral-900 px-4 py-2 text-sm"
            onClick={onClose}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function StickFigure({ baseId, highlight }) {
  const zoneStyle = (zone) =>
    highlight === zone
      ? { strokeWidth: 10, opacity: 1 }
      : { strokeWidth: 6, opacity: 0.35 };

  const isWall = baseId === "wall";
  const isSeated = baseId === "seated";
  const isTable = baseId === "table";

  const cx = 150;
  const headY = isSeated ? 90 : 70;
  const torsoTop = isSeated ? 115 : 96;
  const torsoBottom = isSeated ? 190 : 185;
  const hipsY = isSeated ? 200 : 190;

  return (
    <svg viewBox="0 0 320 320" className="w-full h-full">
      {isWall && (
        <line
          x1={270}
          y1={40}
          x2={270}
          y2={300}
          stroke="currentColor"
          opacity="0.25"
          strokeWidth="8"
        />
      )}

      {isSeated && (
        <>
          <line
            x1={85}
            y1={230}
            x2={235}
            y2={230}
            stroke="currentColor"
            opacity="0.25"
            strokeWidth="10"
          />
          <line
            x1={110}
            y1={230}
            x2={110}
            y2={290}
            stroke="currentColor"
            opacity="0.25"
            strokeWidth="8"
          />
          <line
            x1={210}
            y1={230}
            x2={210}
            y2={290}
            stroke="currentColor"
            opacity="0.25"
            strokeWidth="8"
          />
        </>
      )}

      {isTable && (
        <>
          <line
            x1={40}
            y1={185}
            x2={280}
            y2={185}
            stroke="currentColor"
            opacity="0.25"
            strokeWidth="10"
          />
          <line
            x1={70}
            y1={185}
            x2={70}
            y2={300}
            stroke="currentColor"
            opacity="0.25"
            strokeWidth="8"
          />
          <line
            x1={250}
            y1={185}
            x2={250}
            y2={300}
            stroke="currentColor"
            opacity="0.25"
            strokeWidth="8"
          />
        </>
      )}

      <circle
        cx={cx}
        cy={headY}
        r={26}
        fill="none"
        stroke="currentColor"
        style={zoneStyle("head")}
      />

      <line
        x1={cx}
        y1={torsoTop}
        x2={cx}
        y2={torsoBottom}
        stroke="currentColor"
        style={zoneStyle("hips")}
      />

      <line
        x1={cx - 35}
        y1={torsoTop + 24}
        x2={cx + 35}
        y2={torsoTop + 24}
        stroke="currentColor"
        style={zoneStyle("arms")}
      />

      <line
        x1={cx - 25}
        y1={torsoTop + 24}
        x2={cx - 45}
        y2={torsoTop + 80}
        stroke="currentColor"
        style={zoneStyle("arms")}
      />

      <line
        x1={cx + 25}
        y1={torsoTop + 24}
        x2={isTable ? cx + 60 : cx + 55}
        y2={isTable ? 185 : torsoTop + 70}
        stroke="currentColor"
        style={zoneStyle("arms")}
      />

      <circle
        cx={cx}
        cy={hipsY}
        r={10}
        fill="currentColor"
        opacity={highlight === "hips" ? 0.9 : 0.25}
      />

      {!isTable && (
        <>
          <line
            x1={cx}
            y1={hipsY + 10}
            x2={cx - 25}
            y2={280}
            stroke="currentColor"
            style={zoneStyle("feet")}
          />
          <line
            x1={cx}
            y1={hipsY + 10}
            x2={cx + 25}
            y2={280}
            stroke="currentColor"
            style={zoneStyle("feet")}
          />
        </>
      )}

      {isSeated && (
        <>
          <line
            x1={cx - 25}
            y1={hipsY + 10}
            x2={cx - 50}
            y2={290}
            stroke="currentColor"
            style={zoneStyle("feet")}
          />
          <line
            x1={cx + 25}
            y1={hipsY + 10}
            x2={cx + 60}
            y2={290}
            stroke="currentColor"
            style={zoneStyle("feet")}
          />
        </>
      )}

      <g opacity={highlight === "motion" ? 1 : 0.35}>
        <rect
          x={20}
          y={235}
          width={70}
          height={55}
          rx={10}
          fill="none"
          stroke="currentColor"
          strokeWidth={highlight === "motion" ? 6 : 4}
        />
        <circle
          cx={55}
          cy={262}
          r={12}
          fill="none"
          stroke="currentColor"
          strokeWidth={highlight === "motion" ? 6 : 4}
        />
      </g>
    </svg>
  );
}

export default function App() {
  const { supported: ttsSupported, speak } = useSpeech();
  const recorder = useAudioRecorder();

  // phase: setup -> base -> mutation
  const [phase, setPhase] = useState("setup");
  const [basePose, setBasePose] = useState(BASE_POSES[0].id);
  const [stepIndex, setStepIndex] = useState(0);

  const [banner, setBanner] = useState(null);

  const [instruction, setInstruction] = useState("");
  const wordCap = 7;

  const [audioByStep, setAudioByStep] = useState({});
  const [mutation, setMutation] = useState(null);
  const [completedBaseScans, setCompletedBaseScans] = useState(0);

  const currentZone = ZONES[stepIndex];
  const baseMeta = useMemo(
    () => BASE_POSES.find((p) => p.id === basePose),
    [basePose]
  );

  const mutationPool = useMemo(
    () => MUTATIONS_BY_BASE[basePose] ?? MUTATIONS_BY_BASE.standing,
    [basePose]
  );

  const wordCheck = useMemo(
    () => clampWords(instruction, wordCap),
    [instruction]
  );

  const audioKey = `${phase}:${stepIndex}`;
  const hasAudio = !!audioByStep[audioKey];

  const canAdvance = useMemo(() => {
    const okByAudio = hasAudio;
    const okByText = instruction.trim() && wordCheck.ok;
    if (!(okByAudio || okByText)) return false;
    if (phase === "mutation" && !mutation) return false;
    return true;
  }, [hasAudio, instruction, wordCheck.ok, phase, mutation]);

  // Reset when changing base pose
  useEffect(() => {
    setPhase("setup");
    setStepIndex(0);
    setInstruction("");
    setAudioByStep({});
    setMutation(null);
    setCompletedBaseScans(0);
    setBanner(null);
  }, [basePose]);

  // Clear per-step input on move
  useEffect(() => {
    setInstruction("");
  }, [stepIndex, phase]);

  const resetAll = () => {
    setPhase("setup");
    setStepIndex(0);
    setInstruction("");
    setAudioByStep({});
    setMutation(null);
    setCompletedBaseScans(0);
    setBanner(null);
  };

  const resetScan = () => {
    setStepIndex(0);
    setInstruction("");
    setAudioByStep({});
  };

  const startBaseScan = () => {
    setPhase("base");
    setStepIndex(0);
    setInstruction("");
    setAudioByStep({});
    setMutation(null);
    setBanner({
      title: "BASE SCAN START",
      body:
        "Rules:\n• Fixed scan order\n• One instruction per zone\n• Speak it out loud\n\nGoal: complete ONE full base scan cleanly.",
    });
  };

  const enterMutationRound = () => {
    const m = pickRandom(mutationPool);
    setMutation(m);
    setPhase("mutation");
    setStepIndex(0);
    setInstruction("");
    setAudioByStep({});
    setBanner({
      title: "MUTATION ROUND",
      body:
        `ONE change only for the entire scan:\n\n• ${m.text}\n(zone: ${m.zone})\n\nEverything else must stay the same.`,
    });
  };

  const next = () => {
    if (!canAdvance) return;

    const spoken = instruction.trim()
      ? `${currentZone.label}. ${instruction.trim()}`
      : `${currentZone.label}.`;
    speak(spoken);

    // advance step
    if (stepIndex < ZONES.length - 1) {
      setStepIndex((i) => i + 1);
      return;
    }

    // finished scan: transition logic
    if (phase === "base") {
      setCompletedBaseScans((n) => n + 1);
      enterMutationRound();
      return;
    }

    if (phase === "mutation") {
      setPhase("base");
      setStepIndex(0);
      setInstruction("");
      setAudioByStep({});
      setMutation(null);
      setBanner({
        title: "MUTATION COMPLETE",
        body:
          "Good.\nReturn to BASE SCAN.\nComplete one clean base scan to trigger a new mutation.",
      });
      return;
    }
  };

  const recordToggle = async () => {
    if (!recorder.supported) return;
    if (!recorder.isRecording) {
      await recorder.start();
      return;
    }
    const blob = await recorder.stop();
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    setAudioByStep((prev) => ({ ...prev, [audioKey]: { url, blob } }));
  };

  const playAudio = () => {
    const a = audioByStep[audioKey];
    if (!a?.url) return;
    const audio = new Audio(a.url);
    audio.play();
  };

  const phaseLabel =
    phase === "setup" ? "SETUP" : phase === "base" ? "BASE SCAN" : "MUTATION";

  return (
    <div className="min-h-screen w-full bg-white text-neutral-900 p-4 md:p-8">
      {banner && (
        <Banner
          title={banner.title}
          body={banner.body}
          onClose={() => setBanner(null)}
        />
      )}

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-neutral-200 shadow-sm p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm uppercase tracking-wide text-neutral-500">
                Training Simulator
              </div>
              <h1 className="text-2xl font-semibold">PoseScan Simulator</h1>
              <p className="text-sm text-neutral-600 mt-1">
                Fixed scan order. One instruction per zone. Base scan triggers a
                mutation round.
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-neutral-500">Phase</div>
              <div className="text-lg font-semibold">{phaseLabel}</div>
              <div className="text-xs text-neutral-500 mt-1">
                Step {stepIndex + 1}/{ZONES.length}
              </div>
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
                {baseMeta?.description}
              </div>
            </div>

            <div className="rounded-xl border border-neutral-200 p-3">
              <div className="text-xs text-neutral-500">Progress</div>
              <div className="mt-1 text-sm">
                Base scans completed:{" "}
                <span className="font-semibold">{completedBaseScans}</span>
              </div>
              <div className="text-xs text-neutral-500 mt-2">
                Rule: complete 1 base scan → mutation starts automatically.
              </div>
            </div>
          </div>

          {phase === "setup" && (
            <div className="mt-4 rounded-xl border border-neutral-200 p-4">
              <div className="text-sm font-semibold">
                Base pose setup (do this first)
              </div>
              <ul className="mt-2 text-sm text-neutral-700 list-disc ml-5 space-y-1">
                {baseMeta?.setup?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              <div className="mt-4 flex gap-2">
                <button
                  className="rounded-lg border border-neutral-900 px-4 py-2 text-sm"
                  onClick={startBaseScan}
                >
                  I’m set — start base scan
                </button>
                <button
                  className="rounded-lg border border-neutral-300 px-4 py-2 text-sm"
                  onClick={resetAll}
                >
                  Reset
                </button>
              </div>

              <div className="text-xs text-neutral-500 mt-3">
                Mirror mode: phone at eye height; speak every instruction out
                loud.
              </div>
            </div>
          )}

          {phase !== "setup" && (
            <div className="mt-4 rounded-xl border border-neutral-200 p-4">
              <div className="text-xs uppercase tracking-wide text-neutral-500">
                Current zone
              </div>
              <div className="mt-1 text-lg font-semibold">
                {currentZone.label}
              </div>
              <div className="text-sm text-neutral-600">{currentZone.hint}</div>

              {phase === "mutation" && mutation && (
                <div className="mt-3 rounded-xl border border-neutral-200 p-3 bg-neutral-50">
                  <div className="text-xs uppercase tracking-wide text-neutral-500">
                    Locked mutation
                  </div>
                  <div className="mt-1 text-sm">
                    <span className="font-semibold">{mutation.text}</span>
                    <span className="text-neutral-500">
                      {" "}
                      — zone: {mutation.zone}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500 mt-2">
                    Rule: ONLY this change is allowed for the entire scan.
                  </div>
                </div>
              )}

              <div className="mt-4 grid grid-cols-1 gap-3">
                <div className="rounded-xl border border-neutral-200 p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-neutral-500">
                      Option A: Record instruction (no limit)
                    </div>
                    <div className="text-xs text-neutral-500">
                      Mic: {recorder.supported ? "ok" : "not supported"}
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      className={`rounded-lg px-4 py-2 text-sm border ${
                        recorder.supported
                          ? "border-neutral-900"
                          : "border-neutral-200 text-neutral-400"
                      }`}
                      onClick={recordToggle}
                      disabled={!recorder.supported}
                    >
                      {recorder.isRecording ? "Stop recording" : "Start recording"}
                    </button>

                    <button
                      className={`rounded-lg px-4 py-2 text-sm border ${
                        hasAudio
                          ? "border-neutral-900"
                          : "border-neutral-200 text-neutral-400"
                      }`}
                      onClick={playAudio}
                      disabled={!hasAudio}
                    >
                      Play
                    </button>

                    {hasAudio && (
                      <span className="text-xs text-neutral-500 self-center">
                        Recorded ✓
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-neutral-500 mt-2">
                    Record exactly what you’d say to a client. Keep it concrete.
                  </div>
                </div>

                <div className="rounded-xl border border-neutral-200 p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-neutral-500">
                      Option B: Type short instruction (≤{wordCap} words)
                    </div>
                    <div
                      className={`text-xs ${
                        wordCheck.ok ? "text-neutral-500" : "text-red-600"
                      }`}
                    >
                      {instruction.trim()
                        ? instruction.trim().split(/\s+/).filter(Boolean).length
                        : 0}{" "}
                      words
                    </div>
                  </div>

                  <input
                    className={`mt-2 w-full rounded-lg border p-2 ${
                      wordCheck.ok ? "border-neutral-300" : "border-red-400"
                    }`}
                    placeholder="Example: “Shift weight slightly back”"
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                  />

                  {!wordCheck.ok && (
                    <div className="text-xs text-red-600 mt-1">
                      Too long. Cut explanations; keep only action.
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  className={`rounded-lg px-4 py-2 text-sm border ${
                    canAdvance
                      ? "border-neutral-900"
                      : "border-neutral-200 text-neutral-400"
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
                  TTS: {ttsSupported ? "on" : "off"}
                </div>
              </div>

              <div className="mt-3 text-xs text-neutral-500">
                Discipline: no skipping. No multi-changes. One instruction per
                zone.
              </div>
            </div>
          )}

          <div className="mt-4 rounded-xl bg-neutral-50 border border-neutral-200 p-4">
            <div className="text-sm font-semibold">How to practice (mirror)</div>
            <ol className="mt-2 text-sm text-neutral-700 list-decimal ml-5 space-y-1">
              <li>Set the base pose using the checklist.</li>
              <li>Zone by zone: speak a single instruction.</li>
              <li>Base scan completes → mutation starts automatically.</li>
              <li>Mutation scan: only the locked change is allowed.</li>
            </ol>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 shadow-sm p-5">
          <div className="text-sm uppercase tracking-wide text-neutral-500">
            Base pose sketch
          </div>

          <div className="mt-2 aspect-square rounded-2xl border border-neutral-200 flex items-center justify-center">
            <StickFigure baseId={basePose} highlight={currentZone.key} />
          </div>

          <div className="mt-4 rounded-xl border border-neutral-200 p-4">
            <div className="text-sm font-semibold">Mutation pool for this base</div>
            <div className="mt-2 text-sm text-neutral-700">
              {mutationPool.map((m, i) => (
                <div
                  key={i}
                  className="py-1 border-b border-neutral-100 last:border-b-0"
                >
                  <span className="font-medium">{m.zone}:</span> {m.text}
                </div>
              ))}
            </div>
            <div className="text-xs text-neutral-500 mt-2">
              Mutations are filtered to match the selected base pose.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
