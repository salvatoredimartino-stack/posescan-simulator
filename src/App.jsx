import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";

const GENRES = [
  // -------------------------
  // GENRE — Beauty (ORIGINAL)
  // -------------------------
  {
    id: "beauty",
    name: "Beauty",
    sets: [
      {
        id: "beauty_set1_seated_stool",
        name: "SET 1 — SEATED (STOOL)",
        bases: [
          {
            id: "beauty_base1",
            name: "Base Pose 1",
            flow: [
              { uid: "beauty_base1_step1", label: "Base Pose 1", cue: "Edge of stool, 45°, feet down, hands flat" },
              { uid: "beauty_base1_step2", label: "Pose 2", cue: "Hands between legs, elbows relaxed inward" },
              { uid: "beauty_base1_step3", label: "Pose 3", cue: "Rotate side-on, maintain torso length" },
              { uid: "beauty_base1_step4", label: "Pose 4", cue: "Change composition, tighten crop" },
              { uid: "beauty_base1_step5", label: "Pose 5", cue: "Horizontal camera, same body position" },
              { uid: "beauty_base1_step6", label: "Pose 6", cue: "Alternate composition, hold expression" },
            ],
          },
          {
            id: "beauty_base2",
            name: "Base Pose 2",
            flow: [
              { uid: "beauty_base2_step1", label: "Base Pose 2", cue: "Left foot raised, elbow on knee, torso forward" },
              { uid: "beauty_base2_step2", label: "Pose 10", cue: "Cup fingers softly, relax wrists" },
              { uid: "beauty_base2_step3", label: "Pose 11", cue: "Right hand back pocket, chest open" },
              { uid: "beauty_base2_step4", label: "Pose 12", cue: "Hands between legs, weight grounded" },
              { uid: "beauty_base2_step5", label: "Pose 13", cue: "Lean back slightly, tilt, compose wide" },
              { uid: "beauty_base2_step6", label: "Pose 14", cue: "Elbow out, knee support maintained" },
              { uid: "beauty_base2_step7", label: "Pose 15", cue: "Hands forward, connect elbows visually" },
            ],
          },
          {
            id: "beauty_base3",
            name: "Base Pose 3",
            flow: [
              { uid: "beauty_base3_step1", label: "Base Pose 3", cue: "Open to camera, elbow on knee, hand on thigh" },
              { uid: "beauty_base3_step2", label: "Pose 17", cue: "Hand to chin, thoughtful pause" },
              { uid: "beauty_base3_step3", label: "Pose 18", cue: "Big smile, hold structure" },
              { uid: "beauty_base3_step4", label: "Pose 19", cue: "Tilt head, smile, hands crossed low" },
            ],
          },
          {
            id: "beauty_base4",
            name: "Base Pose 4",
            flow: [
              { uid: "beauty_base4_step1", label: "Base Pose 4", cue: "Body forward, legs crossed, arms staggered" },
              { uid: "beauty_base4_step2", label: "Pose 21", cue: "Hand to chin, other grounded" },
              { uid: "beauty_base4_step3", label: "Pose 22", cue: "Smoking-style fingers, relaxed wrist" },
              { uid: "beauty_base4_step4", label: "Pose 23", cue: "Hands down, big smile, head tilt" },
            ],
          },
        ],
      },
      {
        id: "beauty_set2_standing",
        name: "SET 2 — STANDING",
        bases: [
          {
            id: "beauty_base79",
            name: "Base Pose 79",
            flow: [
              { uid: "beauty_base79_step1", label: "Base Pose 79", cue: "Feet apart, hip rocked, hands on hips" },
              { uid: "beauty_base79_step2", label: "Pose 80", cue: "Change composition, shoot low" },
            ],
          },
          {
            id: "beauty_base81",
            name: "Base Pose 81",
            flow: [
              { uid: "beauty_base81_step1", label: "Base Pose 81", cue: "Rotate body, foot elevated, chin 45°" },
              { uid: "beauty_base81_step2", label: "Pose 82", cue: "Elbow tucked, slight left tilt" },
              { uid: "beauty_base81_step3", label: "Pose 83", cue: "Chin back to camera" },
              { uid: "beauty_base81_step4", label: "Pose 84", cue: "Rotate, look back, keep breast line" },
            ],
          },
        ],
      },
      {
        id: "beauty_set3_wall",
        name: "SET 3 — WALL",
        bases: [
          {
            id: "beauty_base72",
            name: "Base Pose 72",
            flow: [
              { uid: "beauty_base72_step1", label: "Base Pose 72", cue: "45° to camera, weight back, knee forward" },
              { uid: "beauty_base72_step2", label: "Pose 73", cue: "Same pose, tighter composition" },
              { uid: "beauty_base72_step3", label: "Pose 74", cue: "Hands crossed, left under" },
            ],
          },
          {
            id: "beauty_base75",
            name: "Base Pose 75",
            flow: [
              { uid: "beauty_base75_step1", label: "Base Pose 75", cue: "Rotate body, shift weight forward" },
              { uid: "beauty_base75_step2", label: "Pose 76", cue: "Face wall, flatten shoulders" },
              { uid: "beauty_base75_step3", label: "Pose 77", cue: "Change composition, widen frame" },
              { uid: "beauty_base75_step4", label: "Pose 78", cue: "Hands down, soften posture" },
            ],
          },
        ],
      },
      {
        id: "beauty_set4_table",
        name: "SET 4 — TABLE",
        bases: [
          {
            id: "beauty_base94",
            name: "Base Pose 94",
            flow: [
              { uid: "beauty_base94_step1", label: "Base Pose 94", cue: "Symmetric elbows, tapered arms" },
              { uid: "beauty_base94_step2", label: "Pose 95", cue: "Asymmetric, right elbow out" },
              { uid: "beauty_base94_step3", label: "Pose 96", cue: "Hands up, right higher, tilt" },
              { uid: "beauty_base94_step4", label: "Pose 97", cue: "Elbows together, frame face" },
              { uid: "beauty_base94_step5", label: "Pose 98", cue: "Chest away, neck long" },
              { uid: "beauty_base94_step6", label: "Pose 99", cue: "Hands out, crossing lightly" },
              { uid: "beauty_base94_step7", label: "Pose 100", cue: "Smoking hands, elbows in" },
              { uid: "beauty_base94_step8", label: "Pose 101", cue: "Hands behind hair, elbows crossed" },
              { uid: "beauty_base94_step9", label: "Pose 102", cue: "Elbow one way, hands across" },
              { uid: "beauty_base94_step10", label: "Pose 103", cue: "Body out, head left" },
              { uid: "beauty_base94_step11", label: "Pose 104", cue: "Hand in hair, body sideways" },
              { uid: "beauty_base94_step12", label: "Pose 105", cue: "Both hands up" },
              { uid: "beauty_base94_step13", label: "Pose 106", cue: "Hands tucked, tight composition" },
              { uid: "beauty_base94_step14", label: "Pose 107", cue: "Hugging motion, one hand off" },
              { uid: "beauty_base94_step15", label: "Pose 108", cue: "Double hug, compress shape" },
              { uid: "beauty_base94_step16", label: "Pose 109", cue: "Elbow off, one up one down, tilt" },
            ],
          },
        ],
      },
      {
        id: "beauty_set5_staggered_box",
        name: "SET 5 — STAGGERED SEATING (BOX)",
        bases: [
          {
            id: "beauty_base111",
            name: "Base Pose 111",
            flow: [
              { uid: "beauty_base111_step1", label: "Base Pose 111", cue: "Recline on box, elbow down, body relaxed" },
              { uid: "beauty_base111_step2", label: "Pose 112", cue: "Hands inside, elbows supported" },
              { uid: "beauty_base111_step3", label: "Pose 113", cue: "Hand behind hair" },
              { uid: "beauty_base111_step4", label: "Pose 114", cue: "Triangle shape, elbow anchored" },
              { uid: "beauty_base111_step5", label: "Pose 115", cue: "Elbows together, hands on chin" },
              { uid: "beauty_base111_step6", label: "Pose 116", cue: "Rotate body around elbows" },
              { uid: "beauty_base111_step7", label: "Pose 117", cue: "Feet on box, hug knees" },
              { uid: "beauty_base111_step8", label: "Pose 118", cue: "Remove box, horizontal tilt" },
              { uid: "beauty_base111_step9", label: "Pose 119", cue: "Big smile, tilt, hold" },
              { uid: "beauty_base111_step10", label: "Pose 120", cue: "One knee hugged, elbow down" },
            ],
          },
        ],
      },
    ],
  },

  // ------------
  // GENRE — 50+
  // ------------
  {
    id: "fifty_plus",
    name: "50+",
    sets: [
      {
        id: "50p_set1_apple_box_bright_gold",
        name: "SET 1 — APPLE BOX (BRIGHT / GOLD)",
        bases: [
          {
            id: "50p_base1",
            name: "Base Pose 1",
            flow: [
              { uid: "50p_set1_base1_step1", label: "Base Pose 1", cue: "Seated tall, apple box, chin around, fingertips light" },
              {
                uid: "50p_set1_base1_step2",
                label: "Pose 2",
                cue: `Hands together and down and forward
Shoulders dropped
Remove the second box`,
              },
              { uid: "50p_set1_base1_step3", label: "Pose 3", cue: "Comp 1 Baby smile" },
              { uid: "50p_set1_base1_step4", label: "Pose 4", cue: "Comp 2" },
            ],
          },
        ],
      },
      {
        id: "50p_set2_wall_white_bright",
        name: "SET 2 — WALL (WHITE / BRIGHT)",
        bases: [
          {
            id: "50p_base2",
            name: "Base Pose 2",
            flow: [
              {
                uid: "50p_set2_base2_step1",
                label: "Base Pose 2",
                cue: `Take your body away from the wall
45 degrees
Touch body with your hands
Lean with your body
Touch up and back
Chin around
Tilt the camera`,
              },
              { uid: "50p_set2_base2_step2", label: "Pose 3", cue: "Chin around, soften eyes" },
              { uid: "50p_set2_base2_step3", label: "Pose 4", cue: "Chin down, baby smile" },
              { uid: "50p_set2_base2_step4", label: "Pose 5", cue: "Chin down and horizontal" },
              {
                uid: "50p_set2_base2_step5",
                label: "Pose 6",
                cue: `Keep your shoulder drop to me
Roll your shoulder back to the wall
Change weight to the other foot`,
              },
              {
                uid: "50p_set2_base2_step6",
                label: "Pose 7",
                cue: `Hold hands around the body
Shoulders down to me`,
              },
            ],
          },
        ],
      },
      {
        id: "50p_set5_standing_bright_gold",
        name: "SET 5 — STANDING (BRIGHT / GOLD)",
        bases: [
          {
            id: "50p_base5",
            name: "Base Pose 5",
            flow: [
              {
                uid: "50p_set5_base5_step1",
                label: "Base Pose 5",
                cue: `Hands down
Touch
Elbow back
Foot towards me
Chin forward and down
Drop shoulder down
Tilt camera`,
              },
              { uid: "50p_set5_base5_step2", label: "Pose 6", cue: "Horizontal" },
              { uid: "50p_set5_base5_step3", label: "Pose 7", cue: "Chin forward and down" },
              { uid: "50p_set5_base5_step4", label: "Pose 8", cue: "More air, chin around" },
            ],
          },
        ],
      },
    ],
  },

  // -----------------------------
  // GENRE — Personal Branding (Man)
  // -----------------------------
  {
    id: "personal_branding_man",
    name: "Personal Branding (Man)",
    sets: [
      {
        id: "pbm_set1_stool_dark_side_light",
        name: "SET 1 — STOOL (DARK / SIDE LIGHT)",
        bases: [
          {
            id: "pbm_base1",
            name: "Base Pose 1",
            flow: [
              {
                uid: "pbm_set1_base1_step1",
                label: "Base Pose 1",
                cue: `Sitting on a stool
45 degrees
One foot raised
Hands together
Sit upright
Chin towards me`,
              },
              { uid: "pbm_set1_base1_step2", label: "Pose 2", cue: "Step back, easy smile" },
              {
                uid: "pbm_set1_base1_step3",
                label: "Pose 3",
                cue: `Lean onto that knee a bit more
Drop right back shoulder
Chin forward
Soft smile`,
              },
              { uid: "pbm_set1_base1_step4", label: "Pose 4", cue: "Relax your posture and chin around to me" },
              { uid: "pbm_set1_base1_step5", label: "Pose 5", cue: "More smile" },
              { uid: "pbm_set1_base1_step6", label: "Pose 6", cue: "Hands on your thigh, easy smile" },
            ],
          },
        ],
      },
      {
        id: "pbm_set2_real_casual_armani",
        name: "SET 2 — REAL CASUAL (ARMANI)",
        bases: [
          {
            id: "pbm_base2",
            name: "Base Pose 2",
            flow: [
              { uid: "pbm_set2_base2_step1", label: "Base Pose 2", cue: "Same pose but go down, fingers together" },
              { uid: "pbm_set2_base2_step2", label: "Pose 3", cue: "Hands together" },
              { uid: "pbm_set2_base2_step3", label: "Pose 4", cue: "Easy smile, show me some teeth" },
            ],
          },
        ],
      },
      {
        id: "pbm_set3_more_casual_wall_standing",
        name: "SET 3 — MORE CASUAL LOOK, STANDING ON THE WALL",
        bases: [
          {
            id: "pbm_base3",
            name: "Base Pose 3",
            flow: [
              { uid: "pbm_set3_base3_step1", label: "Base Pose 3", cue: "45 degrees, weight on the back foot, arms crossed" },
              { uid: "pbm_set3_base3_step2", label: "Pose 4", cue: "Arms crossed low, weight settled" },
              { uid: "pbm_set3_base3_step3", label: "Pose 5", cue: "Arms down, open shoulders" },
              {
                uid: "pbm_set3_base3_step4",
                label: "Pose 6",
                cue: `Stand away from the wall
Feet apart
Shoulders to me`,
              },
            ],
          },
        ],
      },
      {
        id: "pbm_set4_seated_chair",
        name: "SET 4 — SEATED (CHAIR)",
        bases: [
          {
            id: "pbm_base4",
            name: "Base Pose 4",
            flow: [
              {
                uid: "pbm_set4_base4_step1",
                label: "Base Pose 4",
                cue: `Sit tall, 45 degrees
Back foot on a half box
Hands on thigh, loose`,
              },
              { uid: "pbm_set4_base4_step2", label: "Pose 5", cue: "Rotate a bit more, relax into that posture" },
              { uid: "pbm_set4_base4_step3", label: "Pose 6", cue: "Easy smile" },
            ],
          },
        ],
      },
    ],
  },
];

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

function useAutoplay({ enabled, seconds, onTick }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      clearInterval(ref.current);
      ref.current = null;
    }
    if (!enabled) return;

    ref.current = setInterval(() => onTick(), seconds * 1000);

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

  // -------------------------
  // Selection state (stable)
  // -------------------------
  const [genreId, setGenreId] = useState(GENRES[0].id);

  const genre = useMemo(() => GENRES.find((g) => g.id === genreId) ?? GENRES[0], [genreId]);

  const [setId, setSetId] = useState(genre.sets[0]?.id ?? "");
  const [baseId, setBaseId] = useState(genre.sets[0]?.bases[0]?.id ?? "");

  // -------------------------
  // Robust validity guards:
  // prevent stale set/base IDs after edits
  // -------------------------
  useEffect(() => {
    if (!genre?.sets?.length) {
      setSetId("");
      setBaseId("");
      return;
    }
    const hasSet = genre.sets.some((s) => s.id === setId);
    const nextSetId = hasSet ? setId : genre.sets[0].id;
    if (nextSetId !== setId) setSetId(nextSetId);
  }, [genre, setId]);

  const selectedSet = useMemo(() => {
    if (!genre?.sets?.length) return null;
    return genre.sets.find((s) => s.id === setId) ?? genre.sets[0] ?? null;
  }, [genre, setId]);

  useEffect(() => {
    if (!selectedSet?.bases?.length) {
      setBaseId("");
      return;
    }
    const hasBase = selectedSet.bases.some((b) => b.id === baseId);
    const nextBaseId = hasBase ? baseId : selectedSet.bases[0].id;
    if (nextBaseId !== baseId) setBaseId(nextBaseId);
  }, [selectedSet, baseId]);

  const selectedBase = useMemo(() => {
    if (!selectedSet?.bases?.length) return null;
    return selectedSet.bases.find((b) => b.id === baseId) ?? selectedSet.bases[0] ?? null;
  }, [selectedSet, baseId]);

  const flow = selectedBase?.flow ?? [];

  // -------------------------
  // Flow state
  // -------------------------
  const [idx, setIdx] = useState(0);
  const [ended, setEnded] = useState(false);

  const [autoplayOn, setAutoplayOn] = useState(false);
  const [autoplaySec, setAutoplaySec] = useState(8);

  // Reset flow when selection changes
  useEffect(() => {
    setIdx(0);
    setEnded(false);
    setAutoplayOn(false);
  }, [genreId, setId, baseId]);

  // Fullscreen listener
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

  const getValidIndex = useCallback(
    (start) => {
      if (!flow || flow.length === 0) return -1;
      let i = start;
      while (i < flow.length && !flow[i]) i += 1;
      if (i >= flow.length) return -1;
      return i;
    },
    [flow]
  );

  const advance = useCallback(() => {
    if (!flow || flow.length === 0) {
      setEnded(true);
      setAutoplayOn(false);
      return;
    }

    const nextValid = getValidIndex(idx + 1);

    if (nextValid === -1) {
      setEnded(true);
      setAutoplayOn(false);
      return;
    }

    setIdx(nextValid);
  }, [flow, getValidIndex, idx]);

  const back = useCallback(() => {
    if (!flow || flow.length === 0) return;
    let i = idx - 1;
    while (i >= 0 && !flow[i]) i -= 1;
    if (i >= 0) setIdx(i);
  }, [flow, idx]);

  useAutoplay({
    enabled: autoplayOn && !ended,
    seconds: autoplaySec,
    onTick: advance,
  });

  const currentIndex = useMemo(() => {
    if (!flow || flow.length === 0) return -1;
    const valid = getValidIndex(idx);
    if (valid === -1) return -1;
    return valid;
  }, [flow, idx, getValidIndex]);

  const current = currentIndex >= 0 ? flow[currentIndex] : null;

  const strip = useMemo(() => {
    if (!flow || flow.length === 0) return [];
    const out = [];

    const addAt = (i) => {
      if (i < 0) return;
      const vi = getValidIndex(i);
      if (vi === -1) return;
      const item = flow[vi];
      if (!item) return;
      out.push({ index: vi, label: item.label, cue: item.cue });
    };

    addAt(currentIndex);
    addAt(currentIndex + 1);
    addAt(currentIndex + 2);
    addAt(currentIndex + 3);

    return out;
  }, [flow, currentIndex, getValidIndex]);

  // Touch swipe (kept)
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

  // Failsafe init when base/flow changes
  useEffect(() => {
    if (!selectedBase || !flow || flow.length === 0) {
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
  }, [selectedBase, flow, getValidIndex]);

  return (
    <div ref={shellRef} className="min-h-screen bg-white p-6 text-neutral-900">
      <div className="max-w-5xl mx-auto grid grid-cols-1 gap-6">
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

          {/* If you have Device + Dominant Hand controls, wrap them like this:
              <div onClick={(e)=>e.stopPropagation()} onTouchStart={(e)=>e.stopPropagation()} onTouchEnd={(e)=>e.stopPropagation()}>
                ...device / dominant hand UI...
              </div>
          */}

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <div className="text-xs text-neutral-500">Genre</div>
              <select
                className="mt-1 w-full border rounded-lg p-2"
                value={genreId}
                onChange={(e) => setGenreId(e.target.value)}
              >
                {GENRES.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="text-xs text-neutral-500">Set</div>
              <select
                className="mt-1 w-full border rounded-lg p-2"
                value={setId}
                onChange={(e) => setSetId(e.target.value)}
              >
                {(genre.sets ?? []).map((s) => (
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
                {(selectedSet?.bases ?? []).map((b) => (
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
                  key={`${x.index}-${x.label}`}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    x.index === currentIndex ? "bg-neutral-900 text-white" : "bg-neutral-50"
                  }`}
                >
                  <span className="font-semibold">{x.label}</span>{" "}
                  <span className="whitespace-pre-line">{x.cue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FLOW CARD: click-to-advance + Next/Back buttons (laptop-safe) */}
          <div
            className="mt-4 border rounded-xl p-5 select-none"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onClick={() => {
              if (autoplayOn) return;
              if (ended) return;
              advance();
            }}
          >
            {!ended && current && (
              <>
                <div className="text-xs text-neutral-500">{current.label}</div>
                <div className="mt-2 text-xl font-semibold whitespace-pre-line">{current.cue}</div>

                <div className="mt-4 flex gap-2">
                  <button
                    className="border rounded-lg px-3 py-2 text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      back();
                    }}
                    disabled={autoplayOn || currentIndex <= 0}
                  >
                    Back
                  </button>

                  <button
                    className="border rounded-lg px-3 py-2 text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      advance();
                    }}
                    disabled={autoplayOn || ended}
                  >
                    Next
                  </button>
                </div>
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
      </div>
    </div>
  );
}
