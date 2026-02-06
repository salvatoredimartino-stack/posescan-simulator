import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* ================================
   NOTE
   - This version wires ONE sketch per base.
   - Every step in that base points to the same image path.
   - Paths match the structure you showed, after renaming to step1.png:
     /public/poses/beauty/<set>/<base>/step1.png
   ================================ */

const BASE_GENRES = [
  {
    id: "beauty",
    name: "Beauty",
    sets: [
      {
        id: "beauty_set1_seated_stool",
        name: "SET 1 — SEATED (STOOL)",
        bases: [
          {
            id: "beauty_seated_base1",
            name: "Base Pose 1",
            curated: true,
            flow: [
              {
                uid: "beauty_seated_base1_step1",
                label: "Base Pose 1",
                cue: "Edge of stool, 45°, feet down, hands flat",
                img: "/poses/beauty/set1-seated/base1/step1.png",
              },
              {
                uid: "beauty_seated_base1_step2",
                label: "Pose 2",
                cue: "Hands between legs, elbows relaxed inward",
                img: "/poses/beauty/set1-seated/base1/step1.png",
              },
              {
                uid: "beauty_seated_base1_step3",
                label: "Pose 3",
                cue: "Rotate side-on, maintain torso length",
                img: "/poses/beauty/set1-seated/base1/step1.png",
              },
              {
                uid: "beauty_seated_base1_step4",
                label: "Pose 4",
                cue: "Change composition, tighten crop",
                img: "/poses/beauty/set1-seated/base1/step1.png",
              },
              {
                uid: "beauty_seated_base1_step5",
                label: "Pose 5",
                cue: "Horizontal camera, same body position",
                img: "/poses/beauty/set1-seated/base1/step1.png",
              },
              {
                uid: "beauty_seated_base1_step6",
                label: "Pose 6",
                cue: "Alternate composition, hold expression",
                img: "/poses/beauty/set1-seated/base1/step1.png",
              },
            ],
          },

          {
            id: "beauty_seated_base2",
            name: "Base Pose 2",
            curated: true,
            flow: [
              {
                uid: "beauty_seated_base2_step1",
                label: "Base Pose 2",
                cue: "Left foot raised, elbow on knee, torso forward",
                img: "/poses/beauty/set1-seated/base2/step1.png",
              },
              {
                uid: "beauty_seated_base2_step2",
                label: "Pose 2",
                cue: "Cup fingers softly, relax wrists",
                img: "/poses/beauty/set1-seated/base2/step1.png",
              },
              {
                uid: "beauty_seated_base2_step3",
                label: "Pose 3",
                cue: "Right hand back pocket, chest open",
                img: "/poses/beauty/set1-seated/base2/step1.png",
              },
              {
                uid: "beauty_seated_base2_step4",
                label: "Pose 4",
                cue: "Hands between legs, weight grounded",
                img: "/poses/beauty/set1-seated/base2/step1.png",
              },
              {
                uid: "beauty_seated_base2_step5",
                label: "Pose 5",
                cue: "Lean back slightly, tilt, compose wide",
                img: "/poses/beauty/set1-seated/base2/step1.png",
              },
              {
                uid: "beauty_seated_base2_step6",
                label: "Pose 6",
                cue: "Elbow out, knee support maintained",
                img: "/poses/beauty/set1-seated/base2/step1.png",
              },
              {
                uid: "beauty_seated_base2_step7",
                label: "Pose 7",
                cue: "Hands forward, connect elbows visually",
                img: "/poses/beauty/set1-seated/base2/step1.png",
              },
            ],
          },

          {
            id: "beauty_seated_base3",
            name: "Base Pose 3",
            curated: true,
            flow: [
              {
                uid: "beauty_seated_base3_step1",
                label: "Base Pose 3",
                cue: "Open to camera, elbow on knee, hand on thigh",
                img: "/poses/beauty/set1-seated/base3/step1.png",
              },
              {
                uid: "beauty_seated_base3_step2",
                label: "Pose 2",
                cue: "Hand to chin, thoughtful pause",
                img: "/poses/beauty/set1-seated/base3/step1.png",
              },
              {
                uid: "beauty_seated_base3_step3",
                label: "Pose 3",
                cue: "Big smile, hold structure",
                img: "/poses/beauty/set1-seated/base3/step1.png",
              },
              {
                uid: "beauty_seated_base3_step4",
                label: "Pose 4",
                cue: "Tilt head, smile, hands crossed low",
                img: "/poses/beauty/set1-seated/base3/step1.png",
              },
            ],
          },

          {
            id: "beauty_seated_base4",
            name: "Base Pose 4",
            curated: true,
            flow: [
              {
                uid: "beauty_seated_base4_step1",
                label: "Base Pose 4",
                cue: "Body forward, legs crossed, arms staggered",
                img: "/poses/beauty/set1-seated/base4/step1.png",
              },
              {
                uid: "beauty_seated_base4_step2",
                label: "Pose 2",
                cue: "Hand to chin, other grounded",
                img: "/poses/beauty/set1-seated/base4/step1.png",
              },
              {
                uid: "beauty_seated_base4_step3",
                label: "Pose 3",
                cue: "Smoking-style fingers, relaxed wrist",
                img: "/poses/beauty/set1-seated/base4/step1.png",
              },
              {
                uid: "beauty_seated_base4_step4",
                label: "Pose 4",
                cue: "Hands down, big smile, head tilt",
                img: "/poses/beauty/set1-seated/base4/step1.png",
              },
            ],
          },
        ],
      },

      {
        id: "beauty_set2_standing",
        name: "SET 2 — STANDING",
        bases: [
          {
            id: "beauty_standing_base1",
            name: "Base Pose 1",
            curated: true,
            flow: [
              {
                uid: "beauty_standing_base1_step1",
                label: "Base Pose 1",
                cue: "Feet apart, hip rocked, hands on hips",
                img: "/poses/beauty/set2-standing/base1/step1.png",
              },
              {
                uid: "beauty_standing_base1_step2",
                label: "Pose 2",
                cue: "Change composition, shoot low",
                img: "/poses/beauty/set2-standing/base1/step1.png",
              },
            ],
          },

          {
            id: "beauty_standing_base2",
            name: "Base Pose 2",
            curated: true,
            flow: [
              {
                uid: "beauty_standing_base2_step1",
                label: "Base Pose 2",
                cue: "Rotate body, foot elevated, chin 45°",
                img: "/poses/beauty/set2-standing/base2/step1.png",
              },
              {
                uid: "beauty_standing_base2_step2",
                label: "Pose 2",
                cue: "Elbow tucked, slight left tilt",
                img: "/poses/beauty/set2-standing/base2/step1.png",
              },
              {
                uid: "beauty_standing_base2_step3",
                label: "Pose 3",
                cue: "Chin back to camera",
                img: "/poses/beauty/set2-standing/base2/step1.png",
              },
              {
                uid: "beauty_standing_base2_step4",
                label: "Pose 4",
                cue: "Rotate, look back, keep breast line",
                img: "/poses/beauty/set2-standing/base2/step1.png",
              },
            ],
          },
        ],
      },

      {
        id: "beauty_set3_wall",
        name: "SET 3 — WALL",
        bases: [
          {
            id: "beauty_wall_base1",
            name: "Base Pose 1",
            curated: true,
            flow: [
              {
                uid: "beauty_wall_base1_step1",
                label: "Base Pose 1",
                cue: "45° to camera, weight back, knee forward",
                img: "/poses/beauty/set3-wall/base1/step1.png",
              },
              {
                uid: "beauty_wall_base1_step2",
                label: "Pose 2",
                cue: "Same pose, tighter composition",
                img: "/poses/beauty/set3-wall/base1/step1.png",
              },
              {
                uid: "beauty_wall_base1_step3",
                label: "Pose 3",
                cue: "Hands crossed, left under",
                img: "/poses/beauty/set3-wall/base1/step1.png",
              },
            ],
          },

          {
            id: "beauty_wall_base2",
            name: "Base Pose 2",
            curated: true,
            flow: [
              {
                uid: "beauty_wall_base2_step1",
                label: "Base Pose 2",
                cue: "Rotate body, shift weight forward",
                img: "/poses/beauty/set3-wall/base2/step1.png",
              },
              {
                uid: "beauty_wall_base2_step2",
                label: "Pose 2",
                cue: "Face wall, flatten shoulders",
                img: "/poses/beauty/set3-wall/base2/step1.png",
              },
              {
                uid: "beauty_wall_base2_step3",
                label: "Pose 3",
                cue: "Change composition, widen frame",
                img: "/poses/beauty/set3-wall/base2/step1.png",
              },
              {
                uid: "beauty_wall_base2_step4",
                label: "Pose 4",
                cue: "Hands down, soften posture",
                img: "/poses/beauty/set3-wall/base2/step1.png",
              },
            ],
          },
        ],
      },

      {
        id: "beauty_set4_table",
        name: "SET 4 — TABLE",
        bases: [
          {
            id: "beauty_table_base1",
            name: "Base Pose 1",
            curated: true,
            flow: [
              {
                uid: "beauty_table_base1_step1",
                label: "Base Pose 1",
                cue: "Symmetric elbows, tapered arms",
                img: "/poses/beauty/set4-table/base1/step1.png",
              },
              { uid: "beauty_table_base1_step2", label: "Pose 2", cue: "Asymmetric, right elbow out", img: "/poses/beauty/set4-table/base1/step1.png" },
              { uid: "beauty_table_base1_step3", label: "Pose 3", cue: "Hands up, right higher, tilt", img: "/poses/beauty/set4-table/base1/step1.png" },
              { uid: "beauty_table_base1_step4", label: "Pose 4", cue: "Elbows together, frame face", img: "/poses/beauty/set4-table/base1/step1.png" },
              { uid: "beauty_table_base1_step5", label: "Pose 5", cue: "Chest away, neck long", img: "/poses/beauty/set4-table/base1/step1.png" },
              { uid: "beauty_table_base1_step6", label: "Pose 6", cue: "Hands out, crossing lightly", img: "/poses/beauty/set4-table/base1/step1.png" },
              { uid: "beauty_table_base1_step7", label: "Pose 7", cue: "Smoking hands, elbows in", img: "/poses/beauty/set4-table/base1/step1.png" },
              { uid: "beauty_table_base1_step8", label: "Pose 8", cue: "Hands behind hair, elbows crossed", img: "/poses/beauty/set4-table/base1/step1.png" },
              { uid: "beauty_table_base1_step9", label: "Pose 9", cue: "Elbow one way, hands across", img: "/poses/beauty/set4-table/base1/step1.png" },
              { uid: "beauty_table_base1_step10", label: "Pose 10", cue: "Body out, head left", img: "/poses/beauty/set4-table/base1/step1.png" },
              { uid: "beauty_table_base1_step11", label: "Pose 11", cue: "Hand in hair, body sideways", img: "/poses/beauty/set4-table/base1/step1.png" },
              { uid: "beauty_table_base1_step12", label: "Pose 12", cue: "Both hands up", img: "/poses/beauty/set4-table/base1/step1.png" },
              { uid: "beauty_table_base1_step13", label: "Pose 13", cue: "Hands tucked, tight composition", img: "/poses/beauty/set4-table/base1/step1.png" },
              { uid: "beauty_table_base1_step14", label: "Pose 14", cue: "Hugging motion, one hand off", img: "/poses/beauty/set4-table/base1/step1.png" },
              { uid: "beauty_table_base1_step15", label: "Pose 15", cue: "Double hug, compress shape", img: "/poses/beauty/set4-table/base1/step1.png" },
              { uid: "beauty_table_base1_step16", label: "Pose 16", cue: "Elbow off, one up one down, tilt", img: "/poses/beauty/set4-table/base1/step1.png" },
            ],
          },
        ],
      },

      {
        id: "beauty_set5_staggered_box",
        name: "SET 5 — STAGGERED SEATING (BOX)",
        bases: [
          {
            id: "beauty_box_base1",
            name: "Base Pose 1",
            curated: true,
            flow: [
              { uid: "beauty_box_base1_step1", label: "Base Pose 1", cue: "Recline on box, elbow down, body relaxed", img: "/poses/beauty/set5-box/base1/step1.png" },
              { uid: "beauty_box_base1_step2", label: "Pose 2", cue: "Hands inside, elbows supported", img: "/poses/beauty/set5-box/base1/step1.png" },
              { uid: "beauty_box_base1_step3", label: "Pose 3", cue: "Hand behind hair", img: "/poses/beauty/set5-box/base1/step1.png" },
              { uid: "beauty_box_base1_step4", label: "Pose 4", cue: "Triangle shape, elbow anchored", img: "/poses/beauty/set5-box/base1/step1.png" },
              { uid: "beauty_box_base1_step5", label: "Pose 5", cue: "Elbows together, hands on chin", img: "/poses/beauty/set5-box/base1/step1.png" },
              { uid: "beauty_box_base1_step6", label: "Pose 6", cue: "Rotate body around elbows", img: "/poses/beauty/set5-box/base1/step1.png" },
              { uid: "beauty_box_base1_step7", label: "Pose 7", cue: "Feet on box, hug knees", img: "/poses/beauty/set5-box/base1/step1.png" },
              { uid: "beauty_box_base1_step8", label: "Pose 8", cue: "Remove box, horizontal tilt", img: "/poses/beauty/set5-box/base1/step1.png" },
              { uid: "beauty_box_base1_step9", label: "Pose 9", cue: "Big smile, tilt, hold", img: "/poses/beauty/set5-box/base1/step1.png" },
              { uid: "beauty_box_base1_step10", label: "Pose 10", cue: "One knee hugged, elbow down", img: "/poses/beauty/set5-box/base1/step1.png" },
            ],
          },

          {
            id: "beauty_box_base2",
            name: "Base Pose 2",
            curated: true,
            flow: [
              { uid: "beauty_box_base2_step1", label: "Base Pose 2", cue: "Seated sideways on box, torso upright, knees angled", img: "/poses/beauty/set5-box/base2/step1.png" },
              { uid: "beauty_box_base2_step2", label: "Pose 2", cue: "Elbow resting on knee, hand relaxed", img: "/poses/beauty/set5-box/base2/step1.png" },
              { uid: "beauty_box_base2_step3", label: "Pose 3", cue: "Lean slightly forward, keep spine long", img: "/poses/beauty/set5-box/base2/step1.png" },
              { uid: "beauty_box_base2_step4", label: "Pose 4", cue: "Hands together, soften shoulders", img: "/poses/beauty/set5-box/base2/step1.png" },
              { uid: "beauty_box_base2_step5", label: "Pose 5", cue: "Chin around, small tilt", img: "/poses/beauty/set5-box/base2/step1.png" },
              { uid: "beauty_box_base2_step6", label: "Pose 6", cue: "Change composition, tighter crop", img: "/poses/beauty/set5-box/base2/step1.png" },
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

const STORAGE_KEY = "pose_rehearsal_app_state_v3";

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

  useEffect(() => {
    setIdx(0);
    setIsOver(false);
    setHold(false);
    setRhythmOn(false);
    setWhisperVisible(false);
  }, [genreId, setId, baseId]);

  useEffect(() => {
    const payload = {
      showFullLibrary,
      favorites,
      userBasesBySet,
      lastSelection: { genreId, setId, baseId },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [showFullLibrary, favorites, userBasesBySet, genreId, setId, baseId]);

  const beginSession = () => {
    setLastSelection({ genreId, setId, baseId });
    setMode("session");
    restartFlow();
  };

  const exitSession = () => {
    setMode("prep");
    setIsOver(false);
    setHold(false);
    setRhythmOn(false);
    setWhisperVisible(false);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-neutral-500">{mode === "prep" ? "Prep" : "Session"}</div>
            <h1 className="text-2xl font-semibold">Pose Flow Operator</h1>
          </div>

          {mode === "session" ? (
            <button onClick={exitSession} className="border rounded-xl px-3 py-2 text-sm">
              Exit session
            </button>
          ) : null}
        </div>

        {mode === "prep" && (
          <div className="mt-6 border rounded-2xl p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <div className="text-xs text-neutral-500">Genre</div>
                <select className="mt-1 w-full border rounded-xl p-2" value={genreId} onChange={(e) => setGenreId(e.target.value)}>
                  {GENRES.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="text-xs text-neutral-500">Set</div>
                <select className="mt-1 w-full border rounded-xl p-2" value={setId} onChange={(e) => setSetId(e.target.value)}>
                  {(genre.sets ?? []).map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="text-xs text-neutral-500">Base</div>
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

                <div className="mt-2 flex flex-wrap gap-2">
                  <button onClick={duplicateAnchor} className="border rounded-xl px-3 py-2 text-sm" disabled={!selectedBase}>
                    Duplicate
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end">
              <button onClick={beginSession} className="border rounded-xl px-4 py-2 text-sm" disabled={!flow.length}>
                Begin
              </button>
            </div>
          </div>
        )}

        {mode === "session" && (
          <div className="mt-6 border rounded-2xl p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs text-neutral-500">Rhythm</div>

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
                className="p-6 min-h-[360px] flex flex-col justify-center select-none"
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
                    {current?.img ? (
                      <div className="mb-4 flex justify-center">
                        <img
                          src={current.img}
                          alt=""
                          className="max-h-[380px] w-auto object-contain"
                          draggable={false}
                        />
                      </div>
                    ) : null}

                    <div className={`text-2xl md:text-3xl font-semibold leading-snug whitespace-pre-line ${hold ? "opacity-70" : ""}`}>
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
