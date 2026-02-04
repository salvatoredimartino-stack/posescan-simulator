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

function FemaleEditorialFigure({ variant = "standing", highlight = "hips", expression }) {
  // Single-state rendering only. No ghosting. No transparency stacking between frames.
  // Minimal tonal depth: base fill + subtle shadow offset + light face marks.

  const zoneOpacity = (z) => (highlight === z ? 1 : 0.35);

  const FACE = {
    relaxed: { mouth: "M154 60 Q160 62 166 60", brow: "M150 50 Q160 46 170 50" },
    smirk: { mouth: "M152 60 Q162 58 168 62", brow: "M150 50 Q160 48 170 50" },
    "smile with eyes": { mouth: "M152 58 Q160 68 168 58", brow: "M150 50 Q160 46 170 50" },
    "smile + smirk": { mouth: "M152 58 Q164 66 168 60", brow: "M150 50 Q160 46 170 50" },
    "bigger smile / laugh": { mouth: "M152 58 Q160 74 168 58", brow: "M150 50 Q160 44 170 50" },
  };

  const f = FACE[expression] ?? FACE.relaxed;

  const VAR = {
    standing: {
      g: { tx: 0, ty: 0, rot: 0 },
      hair: "M160 22 C142 22 132 34 132 52 C132 70 142 80 160 80 C178 80 188 70 188 52 C188 34 178 22 160 22 Z M136 54 C140 38 150 32 160 32 C170 32 180 38 184 54 C178 44 170 40 160 40 C150 40 142 44 136 54 Z",
      head: "M160 34 C144 34 132 46 132 62 C132 78 144 90 160 90 C176 90 188 78 188 62 C188 46 176 34 160 34 Z",
      neck: "M154 88 L166 88 L170 104 L150 104 Z",
      torso:
        "M160 104 C140 112 128 134 128 156 C128 188 146 206 160 214 C174 206 192 188 192 156 C192 134 180 112 160 104 Z",
      pelvis: "M132 206 C144 224 176 224 188 206 C182 238 174 270 160 296 C146 270 138 238 132 206 Z",
      leftArm:
        "M132 150 C118 166 112 184 114 206 L136 206 C134 190 140 172 152 160 Z",
      rightArm:
        "M188 150 C202 166 208 184 206 206 L184 206 C186 190 180 172 168 160 Z",
      leftHand: "M114 206 C110 214 112 222 120 226 C128 230 138 224 140 214 C142 204 124 198 114 206 Z",
      rightHand: "M206 206 C210 214 208 222 200 226 C192 230 182 224 180 214 C178 204 196 198 206 206 Z",
      leftLeg: "M154 224 C140 252 124 280 110 304 L132 312 C146 288 162 260 176 236 Z",
      rightLeg: "M166 236 C180 260 196 288 210 312 L232 304 C218 280 202 252 188 224 Z",
    },
    seated: {
      g: { tx: 0, ty: 8, rot: 0 },
      hair: "M160 22 C142 22 132 34 132 52 C132 70 142 80 160 80 C178 80 188 70 188 52 C188 34 178 22 160 22 Z M136 54 C140 38 150 32 160 32 C170 32 180 38 184 54 C178 44 170 40 160 40 C150 40 142 44 136 54 Z",
      head: "M160 34 C144 34 132 46 132 62 C132 78 144 90 160 90 C176 90 188 78 188 62 C188 46 176 34 160 34 Z",
      neck: "M154 88 L166 88 L170 104 L150 104 Z",
      torso:
        "M160 104 C142 114 132 134 132 154 C132 182 148 198 160 206 C172 198 188 182 188 154 C188 134 178 114 160 104 Z",
      pelvis:
        "M132 198 C144 214 176 214 188 198 C192 214 194 232 192 248 C172 256 148 256 128 248 C126 232 128 214 132 198 Z",
      leftArm:
        "M136 148 C124 162 120 178 122 194 L144 194 C142 180 148 166 156 156 Z",
      rightArm:
        "M184 148 C196 162 200 178 198 194 L176 194 C178 180 172 166 164 156 Z",
      leftHand: "M122 194 C118 202 120 210 128 214 C136 218 146 212 148 202 C150 192 132 186 122 194 Z",
      rightHand: "M198 194 C202 202 200 210 192 214 C184 218 174 212 172 202 C170 192 188 186 198 194 Z",
      leftLeg: "M150 240 C132 254 118 268 104 282 L122 300 C138 284 156 268 174 252 Z",
      rightLeg: "M170 252 C188 266 206 284 222 300 L240 282 C226 268 208 254 190 240 Z",
    },
    wall: {
      g: { tx: 0, ty: 0, rot: -6 },
      hair: "M160 22 C142 22 132 34 132 52 C132 70 142 80 160 80 C178 80 188 70 188 52 C188 34 178 22 160 22 Z M136 54 C140 38 150 32 160 32 C170 32 180 38 184 54 C178 44 170 40 160 40 C150 40 142 44 136 54 Z",
      head: "M160 34 C144 34 132 46 132 62 C132 78 144 90 160 90 C176 90 188 78 188 62 C188 46 176 34 160 34 Z",
      neck: "M154 88 L166 88 L170 104 L150 104 Z",
      torso:
        "M160 104 C142 112 130 132 130 154 C130 184 148 202 160 210 C172 202 190 184 190 154 C190 132 178 112 160 104 Z",
      pelvis: "M134 204 C146 220 174 220 186 204 C184 232 180 266 172 304 L148 304 C140 266 136 232 134 204 Z",
      leftArm:
        "M136 148 C122 160 114 174 108 190 L126 204 C136 186 146 172 156 162 Z",
      rightArm:
        "M184 148 C198 160 206 174 212 190 L194 204 C184 186 174 172 164 162 Z",
      leftHand: "M108 190 C102 198 104 208 112 214 C120 220 132 214 134 204 C136 194 118 186 108 190 Z",
      rightHand: "M212 190 C218 198 216 208 208 214 C200 220 188 214 186 204 C184 194 202 186 212 190 Z",
      leftLeg: "M154 236 C150 266 146 292 142 312 L166 312 C168 292 170 266 172 238 Z",
      rightLeg: "M172 238 C180 266 192 292 206 312 L228 304 C214 284 202 260 194 236 Z",
    },
    table: {
      g: { tx: 0, ty: 0, rot: 0 },
      hair: "M160 22 C142 22 132 34 132 52 C132 70 142 80 160 80 C178 80 188 70 188 52 C188 34 178 22 160 22 Z M136 54 C140 38 150 32 160 32 C170 32 180 38 184 54 C178 44 170 40 160 40 C150 40 142 44 136 54 Z",
      head: "M160 34 C144 34 132 46 132 62 C132 78 144 90 160 90 C176 90 188 78 188 62 C188 46 176 34 160 34 Z",
      neck: "M154 88 L166 88 L170 104 L150 104 Z",
      torso:
        "M160 104 C142 112 132 130 132 150 C132 178 148 196 160 204 C172 196 188 178 188 150 C188 130 178 112 160 104 Z",
      pelvis:
        "M136 198 C148 210 172 210 184 198 C182 214 180 234 176 258 L144 258 C140 234 138 214 136 198 Z",
      leftArm:
        "M140 146 C126 160 120 176 120 192 L146 192 C146 176 152 164 160 156 Z",
      rightArm:
        "M180 146 C194 160 200 176 200 192 L174 192 C174 176 168 164 160 156 Z",
      leftHand: "M120 192 C114 200 116 210 124 216 C132 222 146 216 148 206 C150 196 132 188 120 192 Z",
      rightHand: "M200 192 C206 200 204 210 196 216 C188 222 174 216 172 206 C170 196 188 188 200 192 Z",
      leftLeg: "M152 258 C140 278 132 294 124 312 L148 316 C156 298 164 282 172 264 Z",
      rightLeg: "M168 264 C176 282 184 298 192 316 L216 312 C208 294 200 278 188 258 Z",
    },
    box: {
      g: { tx: 0, ty: 6, rot: 4 },
      hair: "M160 22 C142 22 132 34 132 52 C132 70 142 80 160 80 C178 80 188 70 188 52 C188 34 178 22 160 22 Z M136 54 C140 38 150 32 160 32 C170 32 180 38 184 54 C178 44 170 40 160 40 C150 40 142 44 136 54 Z",
      head: "M160 34 C144 34 132 46 132 62 C132 78 144 90 160 90 C176 90 188 78 188 62 C188 46 176 34 160 34 Z",
      neck: "M154 88 L166 88 L170 104 L150 104 Z",
      torso:
        "M160 104 C144 112 134 130 134 150 C134 176 148 192 160 200 C172 192 186 176 186 150 C186 130 176 112 160 104 Z",
      pelvis:
        "M136 196 C148 206 172 206 184 196 C188 214 190 236 190 260 C170 270 150 270 130 260 C130 236 132 214 136 196 Z",
      leftArm:
        "M140 146 C128 160 124 176 126 192 L150 192 C148 178 154 166 160 156 Z",
      rightArm:
        "M180 146 C192 160 196 176 194 192 L170 192 C172 178 166 166 160 156 Z",
      leftHand: "M126 192 C120 200 122 210 130 216 C138 222 152 216 154 206 C156 196 138 188 126 192 Z",
      rightHand: "M194 192 C200 200 198 210 190 216 C182 222 168 216 166 206 C164 196 182 188 194 192 Z",
      leftLeg: "M150 258 C136 270 124 280 110 290 L128 310 C144 294 160 282 176 270 Z",
      rightLeg: "M170 270 C186 282 202 294 218 310 L236 290 C222 280 210 270 196 258 Z",
    },
  };

  const v = VAR[variant] ?? VAR.standing;

  return (
    <svg viewBox="0 0 320 320" className="w-full h-full">
      <ellipse cx="160" cy="306" rx="96" ry="11" fill="currentColor" opacity="0.06" />

      <g transform={`translate(${v.g.tx} ${v.g.ty}) rotate(${v.g.rot} 160 180)`}>
        <g opacity="0.10" transform="translate(6 6)">
          <path d={v.hair} fill="currentColor" />
          <path d={v.head} fill="currentColor" />
          <path d={v.neck} fill="currentColor" />
          <path d={v.torso} fill="currentColor" />
          <path d={v.pelvis} fill="currentColor" />
          <path d={v.leftArm} fill="currentColor" />
          <path d={v.rightArm} fill="currentColor" />
          <path d={v.leftHand} fill="currentColor" />
          <path d={v.rightHand} fill="currentColor" />
          <path d={v.leftLeg} fill="currentColor" />
          <path d={v.rightLeg} fill="currentColor" />
        </g>

        <path d={v.leftLeg} fill="currentColor" opacity={zoneOpacity("feet")} />
        <path d={v.rightLeg} fill="currentColor" opacity={zoneOpacity("feet")} />

        <path d={v.pelvis} fill="currentColor" opacity={zoneOpacity("hips")} />
        <path d={v.torso} fill="currentColor" opacity={zoneOpacity("hips")} />

        <path d={v.leftArm} fill="currentColor" opacity={zoneOpacity("arms")} />
        <path d={v.rightArm} fill="currentColor" opacity={zoneOpacity("arms")} />
        <path d={v.leftHand} fill="currentColor" opacity={zoneOpacity("arms")} />
        <path d={v.rightHand} fill="currentColor" opacity={zoneOpacity("arms")} />

        <path d={v.hair} fill="currentColor" opacity={zoneOpacity("head")} />
        <path d={v.head} fill="currentColor" opacity={zoneOpacity("head")} />
        <path d={v.neck} fill="currentColor" opacity={zoneOpacity("head")} />

        <g opacity={zoneOpacity("head") * 0.55}>
          <path d={f.brow} fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="152" cy="56" r="2.2" fill="white" />
          <circle cx="168" cy="56" r="2.2" fill="white" />
          <path d="M160 56 L160 61" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <path d={f.mouth} fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
        </g>

        <path
          d="M160 110 C152 140 154 170 160 196 C166 222 170 252 166 292"
          fill="none"
          stroke="white"
          strokeWidth="6"
          opacity="0.18"
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

  const figureVariant =
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
            <FemaleEditorialFigure variant={figureVariant} highlight={highlight} expression={expression} />
          </div>
        </div>
      </div>
    </div>
  );
}
