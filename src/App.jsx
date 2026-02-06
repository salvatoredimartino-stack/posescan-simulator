import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* =========================================
   ASSET PATHS (CRITICAL)
   Dev server mounted at:
     http://localhost:5177/posescan-simulator/
   Assets MUST resolve via BASE_URL.
   Example working URL:
     /posescan-simulator/poses/beauty/...
   ========================================= */
const ASSET = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, "")}`;

/* ================================
   DATA
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
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
              {
                uid: "beauty_seated_base1_step2",
                label: "Pose 2",
                cue: "Hands between legs, elbows relaxed inward",
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
              {
                uid: "beauty_seated_base1_step3",
                label: "Pose 3",
                cue: "Rotate side-on, maintain torso length",
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
              {
                uid: "beauty_seated_base1_step4",
                label: "Pose 4",
                cue: "Change composition, tighten crop",
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
              {
                uid: "beauty_seated_base1_step5",
                label: "Pose 5",
                cue: "Horizontal camera, same body position",
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
              {
                uid: "beauty_seated_base1_step6",
                label: "Pose 6",
                cue: "Alternate composition, hold expression",
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
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
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
              {
                uid: "beauty_seated_base2_step2",
                label: "Pose 2",
                cue: "Cup fingers softly, relax wrists",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
              {
                uid: "beauty_seated_base2_step3",
                label: "Pose 3",
                cue: "Right hand back pocket, chest open",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
              {
                uid: "beauty_seated_base2_step4",
                label: "Pose 4",
                cue: "Hands between legs, weight grounded",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
              {
                uid: "beauty_seated_base2_step5",
                label: "Pose 5",
                cue: "Lean back slightly, tilt, compose wide",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
              {
                uid: "beauty_seated_base2_step6",
                label: "Pose 6",
                cue: "Elbow out, knee support maintained",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
              },
              {
                uid: "beauty_seated_base2_step7",
                label: "Pose 7",
                cue: "Hands forward, connect elbows visually",
                img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
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
                img: ASSET("poses/beauty/set1-seated/base3/step1.png"),
              },
              {
                uid: "beauty_seated_base3_step2",
                label: "Pose 2",
                cue: "Hand to chin, thoughtful pause",
                img: ASSET("poses/beauty/set1-seated/base3/step1.png"),
              },
              {
                uid: "beauty_seated_base3_step3",
                label: "Pose 3",
                cue: "Big smile, hold structure",
                img: ASSET("poses/beauty/set1-seated/base3/step1.png"),
              },
              {
                uid: "beauty_seated_base3_step4",
                label: "Pose 4",
                cue: "Tilt head, smile, hands crossed low",
                img: ASSET("poses/beauty/set1-seated/base3/step1.png"),
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
                img: ASSET("poses/beauty/set1-seated/base4/step1.png"),
              },
              {
                uid: "beauty_seated_base4_step2",
                label: "Pose 2",
                cue: "Hand to chin, other grounded",
                img: ASSET("poses/beauty/set1-seated/base4/step1.png"),
              },
              {
                uid: "beauty_seated_base4_step3",
                label: "Pose 3",
                cue: "Smoking-style fingers, relaxed wrist",
                img: ASSET("poses/beauty/set1-seated/base4/step1.png"),
              },
              {
                uid: "beauty_seated_base4_step4",
                label: "Pose 4",
                cue: "Hands down, big smile, head tilt",
                img: ASSET("poses/beauty/set1-seated/base4/step1.png"),
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
                img: ASSET("poses/beauty/set2-standing/base1/step1.png"),
              },
              {
                uid: "beauty_standing_base1_step2",
                label: "Pose 2",
                cue: "Change composition, shoot low",
                img: ASSET("poses/beauty/set2-standing/base1/step1.png"),
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
                img: ASSET("poses/beauty/set2-standing/base2/step1.png"),
              },
              {
                uid: "beauty_standing_base2_step2",
                label: "Pose 2",
                cue: "Elbow tucked, slight left tilt",
                img: ASSET("poses/beauty/set2-standing/base2/step1.png"),
              },
              {
                uid: "beauty_standing_base2_step3",
                label: "Pose 3",
                cue: "Chin back to camera",
                img: ASSET("poses/beauty/set2-standing/base2/step1.png"),
              },
              {
                uid: "beauty_standing_base2_step4",
                label: "Pose 4",
                cue: "Rotate, look back, keep breast line",
                img: ASSET("poses/beauty/set2-standing/base2/step1.png"),
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
                img: ASSET("poses/beauty/set3-wall/base1/step1.png"),
              },
              {
                uid: "beauty_wall_base1_step2",
                label: "Pose 2",
                cue: "Same pose, tighter composition",
                img: ASSET("poses/beauty/set3-wall/base1/step1.png"),
              },
              {
                uid: "beauty_wall_base1_step3",
                label: "Pose 3",
                cue: "Hands crossed, left under",
                img: ASSET("poses/beauty/set3-wall/base1/step1.png"),
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
                img: ASSET("poses/beauty/set3-wall/base2/step1.png"),
              },
              {
                uid: "beauty_wall_base2_step2",
                label: "Pose 2",
                cue: "Face wall, flatten shoulders",
                img: ASSET("poses/beauty/set3-wall/base2/step1.png"),
              },
              {
                uid: "beauty_wall_base2_step3",
                label: "Pose 3",
                cue: "Change composition, widen frame",
                img: ASSET("poses/beauty/set3-wall/base2/step1.png"),
              },
              {
                uid: "beauty_wall_base2_step4",
                label: "Pose 4",
                cue: "Hands down, soften posture",
                img: ASSET("poses/beauty/set3-wall/base2/step1.png"),
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
              { uid: "beauty_table_base1_step1", label: "Base Pose 1", cue: "Symmetric elbows, tapered arms", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step2", label: "Pose 2", cue: "Asymmetric, right elbow out", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step3", label: "Pose 3", cue: "Hands up, right higher, tilt", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step4", label: "Pose 4", cue: "Elbows together, frame face", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step5", label: "Pose 5", cue: "Chest away, neck long", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step6", label: "Pose 6", cue: "Hands out, crossing lightly", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step7", label: "Pose 7", cue: "Smoking hands, elbows in", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step8", label: "Pose 8", cue: "Hands behind hair, elbows crossed", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step9", label: "Pose 9", cue: "Elbow one way, hands across", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step10", label: "Pose 10", cue: "Body out, head left", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step11", label: "Pose 11", cue: "Hand in hair, body sideways", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step12", label: "Pose 12", cue: "Both hands up", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step13", label: "Pose 13", cue: "Hands tucked, tight composition", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step14", label: "Pose 14", cue: "Hugging motion, one hand off", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step15", label: "Pose 15", cue: "Double hug, compress shape", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
              { uid: "beauty_table_base1_step16", label: "Pose 16", cue: "Elbow off, one up one down, tilt", img: ASSET("poses/beauty/set4-table/base1/step1.png") },
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
              { uid: "beauty_box_base1_step1", label: "Base Pose 1", cue: "Recline on box, elbow down, body relaxed", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
              { uid: "beauty_box_base1_step2", label: "Pose 2", cue: "Hands inside, elbows supported", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
              { uid: "beauty_box_base1_step3", label: "Pose 3", cue: "Hand behind hair", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
              { uid: "beauty_box_base1_step4", label: "Pose 4", cue: "Triangle shape, elbow anchored", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
              { uid: "beauty_box_base1_step5", label: "Pose 5", cue: "Elbows together, hands on chin", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
              { uid: "beauty_box_base1_step6", label: "Pose 6", cue: "Rotate body around elbows", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
              { uid: "beauty_box_base1_step7", label: "Pose 7", cue: "Feet on box, hug knees", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
              { uid: "beauty_box_base1_step8", label: "Pose 8", cue: "Remove box, horizontal tilt", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
              { uid: "beauty_box_base1_step9", label: "Pose 9", cue: "Big smile, tilt, hold", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
              { uid: "beauty_box_base1_step10", label: "Pose 10", cue: "One knee hugged, elbow down", img: ASSET("poses/beauty/set5-box/base1/step1.png") },
            ],
          },

          {
            id: "beauty_box_base2",
            name: "Base Pose 2",
            curated: true,
            flow: [
              { uid: "beauty_box_base2_step1", label: "Base Pose 2", cue: "Seated sideways on box, torso upright, knees angled", img: ASSET("poses/beauty/set5-box/base2/step1.png") },
              { uid: "beauty_box_base2_step2", label: "Pose 2", cue: "Elbow resting on knee, hand relaxed", img: ASSET("poses/beauty/set5-box/base2/step1.png") },
              { uid: "beauty_box_base2_step3", label: "Pose 3", cue: "Lean slightly forward, keep spine long", img: ASSET("poses/beauty/set5-box/base2/step1.png") },
              { uid: "beauty_box_base2_step4", label: "Pose 4", cue: "Hands together, soften shoulders", img: ASSET("poses/beauty/set5-box/base2/step1.png") },
              { uid: "beauty_box_base2_step5", label: "Pose 5", cue: "Chin around, small tilt", img: ASSET("poses/beauty/set5-box/base2/step1.png") },
              { uid: "beauty_box_base2_step6", label: "Pose 6", cue: "Change composition, tighter crop", img: ASSET("poses/beauty/set5-box/base2/step1.png") },
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
              { uid: "50p_set2_base2_step6", label: "Pose 7", cue: `Hold hands around the body\nShoulders down to me` },
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
              { uid: "pbm_set3_base3_step4", label: "Pose 6", cue: `Stand away from the wall\nFeet apart\nShoulders to me` },
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

const REHEARSAL_PLAN_7_DAYS = [
  { day: "Day 1", text: "Set 1 (Seated stool) only — run 3 times" },
  { day: "Day 2", text: "Set 2 (Standing) — run 3 times" },
  { day: "Day 3", text: "Set 3 (Wall) — run 3 times" },
  { day: "Day 4", text: "Set 4 (Table) — run 3 times" },
  { day: "Day 5", text: "Set 5 (Box) — run 3 times" },
  { day: "Day 6", text: "Full session (Sets 1–5) once, slow" },
  { day: "Day 7", text: "Full session once, normal pace" },
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
  }, [genreId, lastSelection, genre?.sets]);

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
  }, [setId, selectedSet?.bases, favorites, lastSelection, availableBases]);

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

  // NEW: progress values for peripheral-vision UI
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
  }, [flow.length, idx, hold, isOver]);

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
  }, [flow.length, idx, hold, isOver]);

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
  }, [mode, rhythmOn, hold, isOver, flow.length, rhythm]);

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

  const copyRehearsalPlan = async () => {
    const text = [
      "7-Day Rehearsal Plan (Session in a Week)",
      "",
      ...REHEARSAL_PLAN_7_DAYS.map((x) => `${x.day}: ${x.text}`),
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      revealWhisperBriefly(); // tiny feedback reuse (non-blocking)
    } catch {
      // no-op: clipboard may be blocked; still fine
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-6 md:py-10">
        {/* Top bar (prep only). Session is full-screen overlay below. */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              <span className={`h-2 w-2 rounded-full ${mode === "prep" ? "bg-amber-400" : "bg-emerald-400"}`} />
              {mode === "prep" ? "Prep" : "Session"}
            </div>

            <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Pose Flow Operator</h1>
            <p className="mt-1 text-sm text-slate-300">Clean flow. Clear cues. No improvising.</p>
          </div>

          {mode === "prep" ? null : (
            <button
              onClick={exitSession}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 shadow-sm hover:bg-white/10 transition"
            >
              Exit session
            </button>
          )}
        </div>

        {/* PREP */}
        {mode === "prep" && (
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="p-5 md:p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Genre */}
                <div>
                  <div className="text-xs font-medium text-slate-300">Genre</div>
                  <select
                    className="mt-2 w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none shadow-sm hover:bg-white/10 focus:border-indigo-400/50 focus:ring-4 focus:ring-indigo-500/20 transition"
                    value={genreId}
                    onChange={(e) => setGenreId(e.target.value)}
                  >
                    {GENRES.map((g) => (
                      <option key={g.id} value={g.id} className="bg-slate-900">
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Set */}
                <div>
                  <div className="text-xs font-medium text-slate-300">Set</div>
                  <select
                    className="mt-2 w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none shadow-sm hover:bg-white/10 focus:border-indigo-400/50 focus:ring-4 focus:ring-indigo-500/20 transition"
                    value={setId}
                    onChange={(e) => setSetId(e.target.value)}
                  >
                    {(genre.sets ?? []).map((s) => (
                      <option key={s.id} value={s.id} className="bg-slate-900">
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Base */}
                <div>
                  <div className="text-xs font-medium text-slate-300">Base</div>
                  <select
                    className="mt-2 w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none shadow-sm hover:bg-white/10 focus:border-indigo-400/50 focus:ring-4 focus:ring-indigo-500/20 transition"
                    value={baseId}
                    onChange={(e) => setBaseId(e.target.value)}
                  >
                    {availableBases.map((b) => (
                      <option key={b.id} value={b.id} className="bg-slate-900">
                        {b.name}
                      </option>
                    ))}
                  </select>

                  {/* toggles row */}
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <label className="flex items-center gap-2 text-sm text-slate-200 select-none">
                      <input
                        type="checkbox"
                        checked={showFullLibrary}
                        onChange={(e) => setShowFullLibrary(e.target.checked)}
                        className="h-4 w-4 rounded border-white/20 bg-white/10 text-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                      />
                      <span className="text-slate-200">Show full library</span>
                      <span className="text-xs text-slate-400">(Prep only)</span>
                    </label>

                    <button
                      onClick={toggleFavorite}
                      className={`h-10 w-12 rounded-2xl border transition shadow-sm
                        ${
                          isFavorite
                            ? "border-fuchsia-400/40 bg-fuchsia-500/15 text-fuchsia-200 hover:bg-fuchsia-500/20"
                            : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                        }`}
                      title="Favorite this base"
                    >
                      <span className="text-lg leading-none">{isFavorite ? "★" : "☆"}</span>
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={duplicateAnchor}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10 transition disabled:opacity-40 disabled:hover:bg-white/5"
                      disabled={!selectedBase}
                    >
                      Duplicate
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end">
                <button
                  onClick={beginSession}
                  disabled={!flow.length}
                  className="rounded-2xl px-5 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-900/30 transition
                    bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 hover:brightness-110
                    disabled:opacity-40 disabled:hover:brightness-100"
                >
                  Begin session
                </button>
              </div>

              {/* Rehearsal plan */}
              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-100">Rehearsal plan (Session in a week)</div>
                    <div className="mt-1 text-xs text-slate-300">
                      Testable in 7 days without changing the core system.
                    </div>
                  </div>

                  <button
                    onClick={copyRehearsalPlan}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10 transition"
                    title="Copy plan"
                  >
                    Copy
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
                  {REHEARSAL_PLAN_7_DAYS.map((x) => (
                    <div key={x.day} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-medium text-slate-300">{x.day}</div>
                      <div className="mt-1 text-sm text-slate-100">{x.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SESSION: full-screen operator overlay */}
        {mode === "session" && (
          <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100">
            {/* TOP BAR (peripheral-visible progress) */}
            <div
              className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl"
              style={{ paddingTop: "env(safe-area-inset-top)" }}
            >
              <div className="px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <div className="text-xs font-medium text-slate-300">Session</div>
                      <div className="text-xs text-slate-400">
                        <span className="text-slate-100 font-semibold">{stepNow}</span>
                        <span className="text-slate-400"> / </span>
                        <span className="text-slate-200">{flow.length || 0}</span>
                        <span className="ml-2 text-slate-400">({progressPct}%)</span>
                      </div>
                    </div>

                    {/* Big progress bar for peripheral vision */}
                    <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 transition-all"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={exitSession}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10 transition"
                    >
                      Exit
                    </button>

                    <button
                      onClick={() => {
                        setHold((v) => !v);
                        setRhythmOn(false);
                        setWhisperVisible(false);
                      }}
                      className={`rounded-2xl border px-4 py-2 text-sm font-medium transition
                        ${
                          hold
                            ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-200"
                            : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                        }`}
                      title="Hold"
                    >
                      {hold ? "Hold: ON" : "Hold"}
                    </button>
                  </div>
                </div>

                {/* Rhythm (secondary) */}
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="text-xs font-medium text-slate-300">Rhythm</div>

                    <label className="flex items-center gap-2 text-sm text-slate-200 select-none">
                      <input
                        type="checkbox"
                        checked={rhythmOn}
                        onChange={(e) => setRhythmOn(e.target.checked)}
                        disabled={isOver || hold}
                        className="h-4 w-4 rounded border-white/20 bg-white/10 text-indigo-500 focus:ring-4 focus:ring-indigo-500/20 disabled:opacity-40"
                      />
                      On
                    </label>

                    <select
                      className="appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 outline-none hover:bg-white/10 focus:border-indigo-400/50 focus:ring-4 focus:ring-indigo-500/20 transition disabled:opacity-40"
                      value={rhythmId}
                      onChange={(e) => setRhythmId(e.target.value)}
                      disabled={!rhythmOn || isOver || hold}
                    >
                      {RHYTHMS.map((r) => (
                        <option key={r.id} value={r.id} className="bg-slate-900">
                          {r.label} ({r.seconds}s)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="text-xs text-slate-400">Press & hold to preview next cue</div>
                </div>
              </div>
            </div>

            {/* MAIN (no scroll; padded for fixed bars + safe areas) */}
            <div
              className="absolute inset-0"
              style={{
                paddingTop: "calc(env(safe-area-inset-top) + 112px)",
                paddingBottom: "calc(env(safe-area-inset-bottom) + 96px)",
              }}
            >
              <div className="h-full px-4">
                <div
                  className="h-full rounded-3xl border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/30 backdrop-blur-xl overflow-hidden"
                  onMouseDown={() => {
                    if (!hold) setWhisperVisible(true);
                  }}
                  onMouseUp={() => setWhisperVisible(false)}
                  onTouchStart={() => {
                    if (!hold) setWhisperVisible(true);
                  }}
                  onTouchEnd={() => setWhisperVisible(false)}
                  onClick={() => {
                    // Tap anywhere to advance (one-hand operation)
                    if (!hold && !isOver) advance();
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="h-full p-6 md:p-10 flex flex-col justify-center select-none">
                    {isOver ? (
                      <div className="flex flex-col items-center justify-center gap-6 text-center">
                        <div className="text-sm text-slate-300">Flow complete</div>
                        <div className="text-3xl font-semibold text-slate-100">—</div>

                        <div className="flex flex-wrap items-center justify-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              restartFlow();
                            }}
                            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 hover:bg-white/10 transition"
                          >
                            Restart
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              exitSession();
                            }}
                            className="rounded-2xl px-5 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-900/30 transition
                              bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 hover:brightness-110"
                          >
                            Exit
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {current?.img ? (
                          <div className="mb-6 flex justify-center">
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-3 shadow-xl shadow-black/25">
                              <img
                                src={current.img}
                                alt=""
                                className="max-h-[280px] md:max-h-[340px] w-auto object-contain rounded-2xl"
                                draggable={false}
                              />
                            </div>
                          </div>
                        ) : null}

                        {/* HUGE cue text + short lines (controlled line length) */}
                        <div className="mx-auto w-full max-w-[22ch] md:max-w-[26ch]">
                          <div className={`text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] whitespace-pre-line ${hold ? "opacity-70" : ""}`}>
                            {current?.cue ?? ""}
                          </div>

                          {/* Whisper (next cue) */}
                          <div
                            className={`mt-6 text-base md:text-lg whitespace-pre-line transition-opacity duration-200 ${
                              whisperVisible && !hold ? "opacity-70 text-slate-300" : "opacity-0 text-slate-300"
                            }`}
                          >
                            {nextWhisper?.cue ?? ""}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM NAV (2 buttons fixed, thumb-friendly) */}
            <div
              className="fixed left-0 right-0 bottom-0 z-50 border-t border-white/10 bg-black/30 backdrop-blur-xl"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <div className="px-4 py-4">
                <div className="mx-auto max-w-5xl flex items-center gap-3">
                  <button
                    onClick={back}
                    disabled={hold || (!isOver && idx <= 0)}
                    className="flex-1 h-14 rounded-2xl border border-white/10 bg-white/5 text-slate-100 text-lg font-medium
                      hover:bg-white/10 transition disabled:opacity-40 disabled:hover:bg-white/5"
                  >
                    Back
                  </button>

                  <button
                    onClick={advance}
                    disabled={hold || isOver || !flow.length}
                    className="flex-1 h-14 rounded-2xl text-white text-lg font-semibold shadow-lg shadow-indigo-900/30 transition
                      bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 hover:brightness-110
                      disabled:opacity-40 disabled:hover:brightness-100"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* tiny footer (prep only) */}
        {mode === "prep" ? (
          <div className="mt-8 text-xs text-slate-400">
            Tip: press-and-hold during session reveals the next cue.
          </div>
        ) : null}
      </div>
    </div>
  );
}
