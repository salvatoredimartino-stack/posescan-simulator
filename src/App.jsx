import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* ================================
   GENRE SYSTEM (LOCKED)
   - Exactly 3 genres:
     Beauty
     50+
     Personal Branding (Man)
   - No shared sets / bases / flows across genres
   ================================ */

const BASE_GENRES = [
  /* ----------------
     GENRE — Beauty
     (Existing genre renamed to Beauty)
     ---------------- */
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
            curated: true,
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
            curated: true,
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
            curated: true,
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
            curated: true,
            flow: [
              { uid: "beauty_base4_step1", label: "Base Pose 4", cue: "Body forward, legs crossed, arms staggered" },
              { uid: "beauty_base4_step2", label: "Pose 21", cue: "Hand to chin, other grounded" },
              { uid: "beauty_base4_step3", label: "Pose 22", cue: "Smoking-style fingers, relaxed wrist" },
              { uid: "beauty_base4_step4", label: "Pose 23", cue: "Hands down, big smile, head tilt" },
            ],
          },
        ],
      },

      // Keep Beauty sets that existed in your app library (no cross-genre sharing)
      {
        id: "beauty_set2_standing",
        name: "SET 2 — STANDING",
        bases: [
          {
            id: "beauty_base79",
            name: "Base Pose 79",
            curated: true,
            flow: [
              { uid: "beauty_base79_step1", label: "Base Pose 79", cue: "Feet apart, hip rocked, hands on hips" },
              { uid: "beauty_base79_step2", label: "Pose 80", cue: "Change composition, shoot low" },
            ],
          },
          {
            id: "beauty_base81",
            name: "Base Pose 81",
            curated: true,
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
            curated: true,
            flow: [
              { uid: "beauty_base72_step1", label: "Base Pose 72", cue: "45° to camera, weight back, knee forward" },
              { uid: "beauty_base72_step2", label: "Pose 73", cue: "Same pose, tighter composition" },
              { uid: "beauty_base72_step3", label: "Pose 74", cue: "Hands crossed, left under" },
            ],
          },
          {
            id: "beauty_base75",
            name: "Base Pose 75",
            curated: true,
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
            curated: true,
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
            curated: true,
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

  /* ----------------
     GENRE — 50+
     Defined EXACTLY as provided
     ---------------- */
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
            curated: true,
            flow: [
              {
                uid: "50p_set1_base1_step1",
                label: "Base Pose 1",
                cue: "Seated tall, apple box, chin around, fingertips light",
              },
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
            curated: true,
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
            curated: true,
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

  /* -----------------------------
     GENRE — PERSONAL BRANDING (MAN)
     Defined EXACTLY as provided
     ----------------------------- */
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
            curated: true,
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
            curated: true,
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
            curated: true,
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
            curated: true,
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

const RHYTHMS = [
  { id: "linger", label: "Linger", seconds: 10 },
  { id: "natural", label: "Natural", seconds: 8 },
  { id: "gentle", label: "Gentle", seconds: 6 },
];

const DEVICE_PROFILES = [
  { id: "phone", label: "Android phone (portrait)" },
  { id: "tablet", label: "Android tablet" },
  { id: "laptop", label: "Laptop" },
];

const STORAGE_KEY = "pose_companion_state_v2";

/* ----------------------------- Utilities ----------------------------- */

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

/* ----------------------------- App ----------------------------- */

export default function App() {
  const persisted = useMemo(() => safeJsonParse(localStorage.getItem(STORAGE_KEY), null), []);

  const [device, setDevice] = useState(() => {
    const d = persisted?.device;
    if (DEVICE_PROFILES.some((p) => p.id === d)) return d;
    return "phone";
  });
  const [handedness, setHandedness] = useState(() => (persisted?.handedness === "left" ? "left" : "right"));

  const [showFullLibrary, setShowFullLibrary] = useState(!!persisted?.showFullLibrary);
  const [favorites, setFavorites] = useState(persisted?.favorites ?? {});
  const [userBasesBySet, setUserBasesBySet] = useState(persisted?.userBasesBySet ?? {});
  const [lastSelection, setLastSelection] = useState(persisted?.lastSelection ?? null);
  const [lastSession, setLastSession] = useState(persisted?.lastSession ?? null);

  const GENRES = useMemo(() => mergeUserBasesIntoGenres(BASE_GENRES, userBasesBySet), [userBasesBySet]);

  const [mode, setMode] = useState("prep"); // "prep" | "ritual" | "session"

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
  }, [genreId]);

  const selectedSet = useMemo(() => genre?.sets?.find((s) => s.id === setId) ?? genre?.sets?.[0] ?? null, [genre, setId]);

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
  }, [setId]);

  const selectedBase = useMemo(() => {
    const all = selectedSet?.bases ?? [];
    return all.find((b) => b.id === baseId) ?? availableBases?.[0] ?? null;
  }, [selectedSet, baseId, availableBases]);

  const flow = useMemo(() => selectedBase?.flow ?? [], [selectedBase]);

  const [idx, setIdx] = useState(0);
  const [isOver, setIsOver] = useState(false);
  const [hold, setHold] = useState(false);

  const [rhythmOn, setRhythmOn] = useState(false);
  const [rhythmId, setRhythmId] = useState("natural");
  const rhythm = useMemo(() => RHYTHMS.find((r) => r.id === rhythmId) ?? RHYTHMS[1], [rhythmId]);

  const [whisperVisible, setWhisperVisible] = useState(false);
  const whisperTimerRef = useRef(null);

  const revealWhisperBriefly = useCallback(() => {
    if (!flow.length) return;
    setWhisperVisible(true);
    if (whisperTimerRef.current) clearTimeout(whisperTimerRef.current);
    whisperTimerRef.current = setTimeout(() => setWhisperVisible(false), 1200);
  }, [flow.length]);

  useEffect(() => {
    return () => {
      if (whisperTimerRef.current) clearTimeout(whisperTimerRef.current);
    };
  }, []);

  const current = useMemo(() => {
    if (!flow.length) return null;
    const clamped = Math.max(0, Math.min(idx, flow.length - 1));
    return flow[clamped] ?? null;
  }, [flow, idx]);

  const nextWhisper = useMemo(() => {
    if (!flow.length) return null;
    const ni = idx + 1;
    if (ni >= flow.length) return null;
    return flow[ni] ?? null;
  }, [flow, idx]);

  const restartFlow = useCallback(() => {
    setIdx(0);
    setIsOver(false);
    setHold(false);
    setRhythmOn(false);
    setWhisperVisible(false);
  }, []);

  const advance = useCallback(() => {
    if (!flow.length) return;
    if (hold) return;
    if (isOver) return;

    const ni = idx + 1;
    if (ni >= flow.length) {
      setIsOver(true);
      setRhythmOn(false);
      setWhisperVisible(false);
      return;
    }
    setIdx(ni);
  }, [flow, idx, hold, isOver]);

  const back = useCallback(() => {
    if (!flow.length) return;
    if (hold) return;

    if (isOver) {
      setIsOver(false);
      setIdx(flow.length - 1);
      return;
    }

    const pi = idx - 1;
    if (pi < 0) return;
    setIdx(pi);
  }, [flow, idx, hold, isOver]);

  useEffect(() => {
    if (mode !== "session") return;
    if (!rhythmOn) return;
    if (hold) return;
    if (isOver) return;
    if (!flow.length) return;

    const ms = (rhythm?.seconds ?? 8) * 1000;
    const t = setInterval(() => {
      setIdx((prev) => {
        const ni = prev + 1;
        if (ni >= flow.length) {
          setIsOver(true);
          setRhythmOn(false);
          setWhisperVisible(false);
          return prev;
        }
        return ni;
      });
    }, ms);

    return () => clearInterval(t);
  }, [mode, rhythmOn, hold, isOver, flow, rhythm]);

  const isFavorite = favorites?.[setId] === baseId;
  const toggleFavorite = () => {
    setFavorites((prev) => {
      const next = { ...(prev || {}) };
      if (next[setId] === baseId) delete next[setId];
      else next[setId] = baseId;
      return next;
    });
  };

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

  // Import / Export JSON (v1)
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
    copy.name = copy.name ? `My ${copy.name}` : "My Base Pose";
    copy.curated = true;
    copy.flow = copy.flow.map((step) => ({
      uid: makeId("my_step"),
      label: step.label ?? "",
      cue: String(step.cue ?? "").trim(),
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

  const startRitual = () => {
    setMode("ritual");
    setLastSelection({ genreId, setId, baseId });
    setIdx(0);
    setIsOver(false);
    setHold(false);
    setRhythmOn(false);
    setWhisperVisible(false);
  };

  const beginSessionFromRitual = () => {
    setMode("session");
    restartFlow();
    setLastSession({
      device,
      handedness,
      genreId,
      setId,
      baseId,
      idx: 0,
      isOver: false,
      hold: false,
      rhythmOn: false,
      rhythmId,
    });
  };

  const exitSession = () => {
    setMode("prep");
    setIsOver(false);
    setHold(false);
    setRhythmOn(false);
    setWhisperVisible(false);
  };

  const resumeLastSession = () => {
    if (!lastSession) return;

    // device/handedness persist; only restore if current invalid
    if (!DEVICE_PROFILES.some((p) => p.id === device) && DEVICE_PROFILES.some((p) => p.id === lastSession.device)) {
      setDevice(lastSession.device);
    }
    if (handedness !== "left" && handedness !== "right") {
      setHandedness(lastSession.handedness === "left" ? "left" : "right");
    }

    setGenreId(lastSession.genreId);
    setTimeout(() => {
      setSetId(lastSession.setId);
      setTimeout(() => {
        setBaseId(lastSession.baseId);
        setMode("session");
        setIdx(typeof lastSession.idx === "number" ? lastSession.idx : 0);
        setIsOver(!!lastSession.isOver);
        setHold(!!lastSession.hold);
        setRhythmId(lastSession.rhythmId ?? "natural");
        setRhythmOn(!!lastSession.rhythmOn);
        setWhisperVisible(false);
      }, 0);
    }, 0);
  };

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

  useEffect(() => {
    if (mode !== "session") return;
    setLastSession({
      device,
      handedness,
      genreId,
      setId,
      baseId,
      idx,
      isOver,
      hold,
      rhythmOn,
      rhythmId,
    });
  }, [mode, device, handedness, genreId, setId, baseId, idx, isOver, hold, rhythmOn, rhythmId]);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-neutral-500">{mode === "prep" ? "Prep" : mode === "ritual" ? "Start" : "Session"}</div>
            <h1 className="text-2xl font-semibold">Pose Flow Operator</h1>
          </div>

          <div className="flex items-center gap-2">
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
              <div className="border rounded-2xl p-4">
                <div className="text-xs text-neutral-500">Device</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {DEVICE_PROFILES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setDevice(p.id)}
                      className={`border rounded-xl px-3 py-2 text-sm ${device === p.id ? "bg-neutral-900 text-white" : ""}`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border rounded-2xl p-4">
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
              </div>

              <div className="border rounded-2xl p-4">
                <div className="text-xs text-neutral-500">Genre</div>
                <select className="mt-1 w-full border rounded-xl p-2" value={genreId} onChange={(e) => setGenreId(e.target.value)}>
                  {GENRES.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>

                <div className="mt-3 text-xs text-neutral-500">Set</div>
                <select className="mt-1 w-full border rounded-xl p-2" value={setId} onChange={(e) => setSetId(e.target.value)}>
                  {(genre.sets ?? []).map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>

                <div className="mt-3 text-xs text-neutral-500">Base</div>
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

                  <button onClick={toggleFavorite} className="border rounded-xl px-3 py-2 text-sm" title="Favorite this base">
                    {isFavorite ? "★" : "☆"}
                  </button>
                </div>
              </div>
            </div>

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
              </div>

              <div className="border rounded-2xl p-4">
                <div className="text-xs text-neutral-500">Ready</div>
                <div className="mt-1 text-sm text-neutral-700">{flow.length ? `${flow.length} steps loaded.` : "No steps available."}</div>
                <button onClick={startRitual} className="mt-2 border rounded-xl px-4 py-2 text-sm" disabled={!flow.length}>
                  Begin
                </button>
              </div>

              <div className="border rounded-2xl p-4">
                <div className="text-xs text-neutral-500">Navigation</div>
                <div className="mt-1 text-sm text-neutral-700">Session uses Back / Next buttons only.</div>
              </div>
            </div>

            {ioOpen && (
              <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
                <div className="w-full max-w-2xl bg-white border rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-neutral-500">{ioMode === "export" ? "Export" : "Import"}</div>
                      <div className="text-lg font-semibold">{ioMode === "export" ? "Copy your base JSON" : "Paste base JSON"}</div>
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
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs text-neutral-500">Rhythm</div>
              </div>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={rhythmOn} onChange={(e) => setRhythmOn(e.target.checked)} disabled={isOver || hold} />
                  On
                </label>
                <select
                  className="border rounded-xl p-2 text-sm"
                  value={rhythmId}
                  onChange={(e) => setRhythmId(e.target.value)}
                  disabled={!rhythmOn || isOver || hold}
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

            <div className="mt-5 border rounded-2xl overflow-hidden">
              <div
                className="p-6 min-h-[320px] flex flex-col justify-center select-none"
                onMouseDown={() => {
                  if (!hold) revealWhisperBriefly();
                }}
                onTouchStart={() => {
                  if (!hold) revealWhisperBriefly();
                }}
              >
                {isOver ? (
                  <div className="flex flex-col items-center justify-center gap-6 py-10">
                    <div className="text-sm text-neutral-500">Flow over</div>
                    <div className="text-xl font-semibold text-neutral-800">—</div>
                    <div className="flex items-center gap-2">
                      <button onClick={restartFlow} className="border rounded-xl px-4 py-2 text-sm">
                        Back to start
                      </button>
                      <button onClick={exitSession} className="border rounded-xl px-4 py-2 text-sm">
                        Exit session
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={`text-3xl md:text-4xl font-semibold leading-snug whitespace-pre-line ${hold ? "opacity-70" : ""}`}>
                      {current?.cue ?? ""}
                    </div>

                    <div
                      className={`mt-6 text-sm md:text-base whitespace-pre-line transition-opacity duration-500 ${
                        whisperVisible && !hold ? "opacity-60 text-neutral-600" : "opacity-0 text-neutral-600"
                      }`}
                    >
                      {nextWhisper?.cue ?? ""}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <button onClick={back} className="border rounded-xl px-4 py-2 text-sm" disabled={hold || (!isOver && idx <= 0)}>
                Back
              </button>

              <div className="flex items-center gap-2">
                <button onClick={restartFlow} className="border rounded-xl px-4 py-2 text-sm" disabled={hold}>
                  Back to start
                </button>
                <button onClick={advance} className="border rounded-xl px-4 py-2 text-sm" disabled={hold || isOver || !flow.length}>
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
