import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* =========================================
   ERROR BOUNDARY
   ========================================= */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  componentDidCatch(error) {
    this.setState({ error });
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 20, fontFamily: "system-ui", color: "#0f172a" }}>
          <div
            style={{
              padding: 16,
              borderRadius: 14,
              border: "1px solid rgba(15,23,42,.2)",
              background: "rgba(255,255,255,.95)",
              boxShadow: "0 10px 25px rgba(15,23,42,.12)",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 10 }}>
              App crashed (runtime error)
            </div>
            <pre
              style={{
                margin: 0,
                whiteSpace: "pre-wrap",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              }}
            >
              {String(this.state.error)}
            </pre>
            <div style={{ marginTop: 12, color: "#475569", lineHeight: 1.4 }}>
              This screen is intentional so you don’t get a blank page. Fix the error
              above and the UI will load.
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* =========================================
   ASSET PATHS (CRITICAL)
   ========================================= */
const ASSET = (p) =>
  `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, "")}`;

/* =========================================
   FULL DATA
   ========================================= */
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
                // ✅ Canonical rewrite: calm, directive, reassuring
                cue: `Sit on the edge of the stool and turn your body slightly to the side.
Keep both feet flat on the floor and rest your hands gently on your thighs.
Nice and relaxed — perfect.`,
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
              {
                uid: "beauty_seated_base1_step2",
                label: "Flow step",
                // ✅ Explicit continuity + one adjustment
                cue: `Stay exactly where you are — just bring your hands gently between your legs and let your elbows soften in.
That’s lovely.`,
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
              {
                uid: "beauty_seated_base1_step3",
                label: "Flow step",
                // ✅ Remove jargon; keep spoken, client-safe language
                cue: `From that same position, turn your body a little more to the side.
Keep your back long and your chest lifted.
Beautiful — hold that.`,
                img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
              },
              {
                uid: "beauty_seated_base1_step4",
                label: "Photographer step",
                // ✅ Camera/composition change is on photographer, not client
                cue: `Don’t move at all — this one’s for me.
I’m just coming in a little closer.`,
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
              {
                uid: "beauty_table_base1_step1",
                label: "Base Pose 1",
                cue: "Symmetric elbows, tapered arms",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step2",
                label: "Pose 2",
                cue: "Asymmetric, right elbow out",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step3",
                label: "Pose 3",
                cue: "Hands up, right higher, tilt",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step4",
                label: "Pose 4",
                cue: "Elbows together, frame face",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step5",
                label: "Pose 5",
                cue: "Chest away, neck long",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step6",
                label: "Pose 6",
                cue: "Hands out, crossing lightly",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step7",
                label: "Pose 7",
                cue: "Smoking hands, elbows in",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step8",
                label: "Pose 8",
                cue: "Hands behind hair, elbows crossed",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step9",
                label: "Pose 9",
                cue: "Elbow one way, hands across",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step10",
                label: "Pose 10",
                cue: "Body out, head left",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step11",
                label: "Pose 11",
                cue: "Hand in hair, body sideways",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step12",
                label: "Pose 12",
                cue: "Both hands up",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step13",
                label: "Pose 13",
                cue: "Hands tucked, tight composition",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step14",
                label: "Pose 14",
                cue: "Hugging motion, one hand off",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step15",
                label: "Pose 15",
                cue: "Double hug, compress shape",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
              {
                uid: "beauty_table_base1_step16",
                label: "Pose 16",
                cue: "Elbow off, one up one down, tilt",
                img: ASSET("poses/beauty/set4-table/base1/step1.png"),
              },
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
              {
                uid: "beauty_box_base1_step1",
                label: "Base Pose 1",
                cue: "Recline on box, elbow down, body relaxed",
                img: ASSET("poses/beauty/set5-box/base1/step1.png"),
              },
              {
                uid: "beauty_box_base1_step2",
                label: "Pose 2",
                cue: "Hands inside, elbows supported",
                img: ASSET("poses/beauty/set5-box/base1/step1.png"),
              },
              {
                uid: "beauty_box_base1_step3",
                label: "Pose 3",
                cue: "Hand behind hair",
                img: ASSET("poses/beauty/set5-box/base1/step1.png"),
              },
              {
                uid: "beauty_box_base1_step4",
                label: "Pose 4",
                cue: "Triangle shape, elbow anchored",
                img: ASSET("poses/beauty/set5-box/base1/step1.png"),
              },
              {
                uid: "beauty_box_base1_step5",
                label: "Pose 5",
                cue: "Elbows together, hands on chin",
                img: ASSET("poses/beauty/set5-box/base1/step1.png"),
              },
              {
                uid: "beauty_box_base1_step6",
                label: "Pose 6",
                cue: "Rotate body around elbows",
                img: ASSET("poses/beauty/set5-box/base1/step1.png"),
              },
              {
                uid: "beauty_box_base1_step7",
                label: "Pose 7",
                cue: "Feet on box, hug knees",
                img: ASSET("poses/beauty/set5-box/base1/step1.png"),
              },
              {
                uid: "beauty_box_base1_step8",
                label: "Pose 8",
                cue: "Remove box, horizontal tilt",
                img: ASSET("poses/beauty/set5-box/base1/step1.png"),
              },
              {
                uid: "beauty_box_base1_step9",
                label: "Pose 9",
                cue: "Big smile, tilt, hold",
                img: ASSET("poses/beauty/set5-box/base1/step1.png"),
              },
              {
                uid: "beauty_box_base1_step10",
                label: "Pose 10",
                cue: "One knee hugged, elbow down",
                img: ASSET("poses/beauty/set5-box/base1/step1.png"),
              },
            ],
          },
          {
            id: "beauty_box_base2",
            name: "Base Pose 2",
            curated: true,
            flow: [
              {
                uid: "beauty_box_base2_step1",
                label: "Base Pose 2",
                cue: "Seated sideways on box, torso upright, knees angled",
                img: ASSET("poses/beauty/set5-box/base2/step1.png"),
              },
              {
                uid: "beauty_box_base2_step2",
                label: "Pose 2",
                cue: "Elbow resting on knee, hand relaxed",
                img: ASSET("poses/beauty/set5-box/base2/step1.png"),
              },
              {
                uid: "beauty_box_base2_step3",
                label: "Pose 3",
                cue: "Lean slightly forward, keep spine long",
                img: ASSET("poses/beauty/set5-box/base2/step1.png"),
              },
              {
                uid: "beauty_box_base2_step4",
                label: "Pose 4",
                cue: "Hands together, soften shoulders",
                img: ASSET("poses/beauty/set5-box/base2/step1.png"),
              },
              {
                uid: "beauty_box_base2_step5",
                label: "Pose 5",
                cue: "Chin around, small tilt",
                img: ASSET("poses/beauty/set5-box/base2/step1.png"),
              },
              {
                uid: "beauty_box_base2_step6",
                label: "Pose 6",
                cue: "Change composition, tighter crop",
                img: ASSET("poses/beauty/set5-box/base2/step1.png"),
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "fifty_plus",
    name: "Age 50+",
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

/* =========================================
   UI SETTINGS
   ========================================= */
const RHYTHMS = [
  { id: "slow", label: "Slow", seconds: 10 },
  { id: "normal", label: "Normal", seconds: 8 },
  { id: "fast", label: "Fast", seconds: 6 },
];

const STORAGE_KEY = "pose_rehearsal_app_state_css_v5_system_tab";

/* =========================================
   HELPERS
   ========================================= */
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
function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}
function cueTierFromText(cue = "") {
  const text = String(cue);
  const normalized = text.replace(/\s+/g, " ").trim();
  const len = normalized.length;
  const lines = (text.match(/\n/g) || []).length + 1;
  const words = normalized ? normalized.split(" ").length : 0;

  if (lines >= 6 || len >= 180 || words >= 22) return "t4";
  if (lines >= 5 || len >= 150 || words >= 18) return "t3";
  if (lines >= 4 || len >= 120 || words >= 14) return "t2";
  return "t1";
}
function normalizeMyPrefix(name) {
  let n = String(name || "").trim();
  while (n.toLowerCase().startsWith("my ")) n = n.slice(3).trim();
  return n;
}
function makeDuplicateName(originalName, existingNames) {
  const base = normalizeMyPrefix(originalName);
  const cleanBase = base || "Base Pose";
  const prefix = `My ${cleanBase}`;

  if (!existingNames || !existingNames.length) return prefix;

  const lowerExisting = new Set(existingNames.map((x) => String(x).toLowerCase()));
  if (!lowerExisting.has(prefix.toLowerCase())) return prefix;

  let k = 2;
  while (lowerExisting.has(`${prefix} (${k})`.toLowerCase())) k += 1;
  return `${prefix} (${k})`;
}

async function copyToClipboard(text) {
  const value = String(text ?? "");
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "true");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}

/* =========================================
   NO-TAILWIND CSS
   ========================================= */
function Styles() {
  return (
    <style>{`
      :root{
        --ink:#0f172a;
        --muted:#475569;
        --line:rgba(15,23,42,.14);
        --card:rgba(255,255,255,.86);
        --shadow: 0 20px 45px rgba(15,23,42,.12);
        --shadow2: 0 10px 25px rgba(15,23,42,.10);
        --radius: 22px;
        --radius2: 28px;
        --grad: linear-gradient(90deg,#4f46e5,#d946ef,#fb7185);
        --bg: linear-gradient(135deg,#fff7fb,#ffffff,#f2f6ff);

        --topH: 140px;
        --bottomH: 96px;
        --prepStickyTop: 10px;
      }

      *{ box-sizing:border-box; }
      html, body{ height:100%; }
      body{
        margin:0;
        background:var(--bg);
        color:var(--ink);
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
        overflow-y: auto;
      }

      .wrap{ max-width: 980px; margin: 0 auto; padding: 18px 16px 44px; }

      .pill{ display:inline-flex; align-items:center; gap:8px; padding:6px 10px; border:1px solid var(--line); background:rgba(255,255,255,.85); border-radius:999px; font-size:12px; color:var(--muted); box-shadow: 0 2px 10px rgba(15,23,42,.06); }
      .dot{ width:8px; height:8px; border-radius:999px; background:#f59e0b; }

      .h1{ font-size: clamp(26px, 3.8vw, 52px); line-height: 1.02; margin: 12px 0 8px; letter-spacing:-0.03em; }
      .sub{ margin:0; font-size: 16px; color: var(--muted); }

      .tabs{
        display:flex; gap:10px; flex-wrap:wrap;
        align-items:center; justify-content:flex-start;
      }
      .tabBtn{
        height: 34px;
        border-radius: 999px;
        padding: 0 12px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,.92);
        color: var(--ink);
        font-weight: 950;
        font-size: 13px;
        cursor:pointer;
        box-shadow: 0 8px 18px rgba(15,23,42,.06);
      }
      .tabBtnActive{
        border:none !important;
        background: var(--grad) !important;
        color: #fff !important;
      }

      .card{
        margin-top: 16px;
        border:1px solid var(--line);
        background: var(--card);
        border-radius: var(--radius2);
        box-shadow: var(--shadow);
        backdrop-filter: blur(10px);
        overflow: hidden;
      }
      .cardInner{ padding: 18px; }
      @media (min-width: 860px){ .cardInner{ padding: 22px; } }

      .grid{ display:grid; grid-template-columns: 1fr; gap: 14px; }
      @media (min-width: 860px){ .grid{ grid-template-columns: 1fr 1fr 1fr; } }

      .label{ font-size:12px; font-weight: 900; color: var(--muted); display:flex; align-items:center; gap:8px; }

      .helpIcon{
        width: 18px; height: 18px;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,.92);
        color: var(--muted);
        font-weight: 950;
        font-size: 12px;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        user-select:none;
      }

      .helper{
        margin-top: 6px;
        font-size: 13px;
        color: var(--muted);
        line-height: 1.35;
      }

      .control{
        margin-top:8px;
        width:100%;
        height: 46px;
        border-radius: 16px;
        border:1px solid var(--line);
        background: rgba(255,255,255,.96);
        padding: 0 14px;
        font-size: 14px;
        color: var(--ink);
        outline: none;
        box-shadow: 0 2px 12px rgba(15,23,42,.06);
      }
      .control:focus{
        border-color: rgba(79,70,229,.55);
        box-shadow: 0 0 0 5px rgba(79,70,229,.18), 0 2px 12px rgba(15,23,42,.06);
      }

      .row{ display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top: 12px; flex-wrap:wrap; }
      .check{ display:flex; align-items:center; gap:10px; color:var(--muted); font-size:14px; user-select:none; }
      .check input{ width:18px; height:18px; accent-color: #4f46e5; }

      .btn{
        height: 44px;
        padding: 0 14px;
        border-radius: 16px;
        border:1px solid var(--line);
        background: rgba(255,255,255,.95);
        color: var(--ink);
        font-weight: 900;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 8px 18px rgba(15,23,42,.08);
      }
      .btn:hover{ background: rgba(255,255,255,1); }
      .btn:disabled{ opacity:.45; cursor: not-allowed; }

      .btnPrimary{
        border: none !important;
        background: var(--grad) !important;
        color: #ffffff !important;
      }
      .btnPrimary:hover{ filter: brightness(1.06); }
      .btnPrimary:focus-visible{
        outline: 3px solid rgba(79,70,229,.35);
        outline-offset: 2px;
      }

      .btnIcon{
        width: 46px;
        padding:0;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size: 18px;
      }

      .footerActions{ margin-top: 16px; display:flex; justify-content:flex-end; gap:10px; flex-wrap:wrap; }

      .planGrid{ margin-top:14px; display:grid; grid-template-columns: 1fr; gap: 10px; }
      @media (min-width: 860px){ .planGrid{ grid-template-columns: 1fr 1fr; } }
      .planItem{
        border:1px solid var(--line);
        background: rgba(255,255,255,.92);
        border-radius: 18px;
        padding: 14px;
        box-shadow: 0 8px 18px rgba(15,23,42,.06);
      }
      .planDay{ font-size:12px; font-weight: 900; color: var(--muted); }
      .planText{ margin-top:6px; font-size: 15px; font-weight: 900; color: var(--ink); }

      .overlay{
        position: fixed; inset: 0; z-index: 10000;
        background: rgba(15,23,42,.45);
        display:flex;
        align-items:center;
        justify-content:center;
        padding: 18px;
      }
      .modal{
        width: min(720px, 100%);
        border-radius: 22px;
        border:1px solid rgba(255,255,255,.25);
        background: rgba(255,255,255,.96);
        box-shadow: 0 30px 70px rgba(15,23,42,.28);
        overflow:hidden;
      }
      .modalInner{ padding: 18px; }
      @media (min-width: 860px){ .modalInner{ padding: 22px; } }
      .modalTitle{ font-size: 18px; font-weight: 950; }
      .modalBody{ margin-top: 10px; color: var(--muted); line-height: 1.45; font-size: 14px; }
      .modalList{ margin-top: 10px; padding-left: 18px; color: var(--muted); line-height: 1.45; font-size: 14px; }
      .modalActions{ display:flex; justify-content:flex-end; gap:10px; margin-top: 14px; flex-wrap:wrap; }

      .toastWrap{
        position: fixed;
        left: 12px;
        right: 12px;
        bottom: 12px;
        z-index: 12000;
        display:flex;
        justify-content:center;
        pointer-events:none;
      }
      .toast{
        max-width: 720px;
        border-radius: 999px;
        border: 1px solid rgba(15,23,42,.16);
        background: rgba(255,255,255,.95);
        box-shadow: 0 12px 26px rgba(15,23,42,.14);
        padding: 10px 14px;
        font-size: 13px;
        font-weight: 850;
        color: var(--ink);
      }

      .warn{
        margin-top: 14px;
        padding: 12px 14px;
        border-radius: 18px;
        border: 1px solid rgba(251,113,133,.35);
        background: rgba(251,113,133,.08);
        color: #9f1239;
        font-weight: 900;
      }

      .prepSticky{
        position: sticky;
        top: var(--prepStickyTop);
        z-index: 50;
        border: 1px solid var(--line);
        background: rgba(255,255,255,.92);
        box-shadow: 0 16px 40px rgba(15,23,42,.10);
        backdrop-filter: blur(10px);
        border-radius: var(--radius2);
        overflow: hidden;
      }
      .prepStickyInner{ padding: 14px; }
      @media (min-width: 860px){ .prepStickyInner{ padding: 18px; } }

      @media (max-width: 520px){
        :root{ --prepStickyTop: 6px; }
        .prepStickyInner{ padding: 12px; }
      }

      .floatTop{
        position: fixed;
        right: 14px;
        bottom: 14px;
        z-index: 20000;
      }

      /* SYSTEM PAGE */
      .sysGrid{ display:grid; grid-template-columns: 1fr; gap: 12px; margin-top: 16px; }
      @media (min-width: 860px){ .sysGrid{ grid-template-columns: 1fr 1fr; } }
      .sysCard{
        border:1px solid var(--line);
        background: rgba(255,255,255,.92);
        border-radius: 18px;
        padding: 14px;
        box-shadow: 0 10px 22px rgba(15,23,42,.06);
      }
      .sysTitle{ font-size: 14px; font-weight: 950; color: var(--ink); }
      .sysText{ margin-top: 8px; font-size: 14px; color: var(--muted); line-height: 1.45; white-space: pre-line; }
      .sysList{ margin-top: 8px; padding-left: 18px; color: var(--muted); line-height: 1.45; font-size: 14px; }
      .copyRow{ display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-top: 10px; }
      .monoBox{
        margin-top: 10px;
        border:1px solid var(--line);
        background: rgba(255,255,255,.95);
        border-radius: 14px;
        padding: 12px;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 13px;
        color: var(--ink);
        white-space: pre-line;
      }

      /* SESSION */
      .session{
        position: fixed; inset: 0; z-index: 9999;
        background: var(--bg);
        color: var(--ink);
      }
      .topBar{
        position: fixed; left:0; right:0; top:0; z-index: 2;
        padding-top: env(safe-area-inset-top);
        background: rgba(255,255,255,.92);
        border-bottom: 1px solid var(--line);
        backdrop-filter: blur(10px);
      }
      .topInner{ padding: 12px 14px; }
      .topRow{ display:flex; align-items:flex-start; justify-content:space-between; gap: 12px; flex-wrap:wrap; }
      .progLabel{ font-size:12px; font-weight: 900; color: var(--muted); }
      .progNums{ font-size:12px; color: var(--muted); margin-top: 4px; }
      .bar{
        margin-top:10px;
        height: 16px;
        border-radius: 999px;
        background: rgba(15,23,42,.06);
        border: 1px solid var(--line);
        overflow:hidden;
      }
      .barFill{
        height:100%;
        width: 0%;
        background: var(--grad);
        border-radius: 999px;
        transition: width .18s ease;
      }

      .topControls{ display:flex; align-items:center; gap:10px; flex-wrap:wrap; justify-content:flex-end; }
      .toggle{
        display:flex; align-items:center; gap:8px; font-size: 13px; color: var(--muted);
        padding: 8px 10px; border: 1px solid var(--line); border-radius: 999px;
        background: rgba(255,255,255,.9);
        user-select:none;
        white-space: nowrap;
      }
      .toggle input{ width:18px; height:18px; accent-color:#4f46e5; }

      .main{
        position:absolute; inset:0;
        padding-top: calc(var(--topH, 140px) + 10px);
        padding-bottom: calc(var(--bottomH, 96px) + 10px);
      }

      .mainPad{ height:100%; padding: 14px; }
      .stage{
        height:100%;
        border-radius: var(--radius2);
        border: 1px solid var(--line);
        background: rgba(255,255,255,.88);
        box-shadow: var(--shadow);
        backdrop-filter: blur(10px);
        position: relative;
        overflow:hidden;
        display:flex;
        align-items:center;
        justify-content:center;
        padding: 22px;
      }

      .ref{
        position:absolute;
        right: 14px;
        top: 14px;
        width: 160px;
        height: 160px;
        border-radius: 20px;
        border:1px solid var(--line);
        background: rgba(255,255,255,.95);
        box-shadow: var(--shadow2);
        padding: 10px;
        display:flex;
        align-items:center;
        justify-content:center;
      }
      .ref img{ max-width:100%; max-height:100%; object-fit:contain; border-radius: 14px; }

      .cueWrap{
        width: 100%;
        max-width: min(44ch, 92vw);
        text-align: left;
        position: relative;
        z-index: 1;
        overflow: visible;
        max-height: none;
      }

      .cue{
        font-weight: 950;
        letter-spacing: -0.02em;
        white-space: pre-line;
        word-break: break-word;
      }
      .cue.t1{ font-size: clamp(24px, 4.2vw, 56px); line-height: 1.07; }
      .cue.t2{ font-size: clamp(21px, 3.6vw, 46px); line-height: 1.09; }
      .cue.t3{ font-size: clamp(18px, 3.1vw, 38px); line-height: 1.11; }
      .cue.t4{ font-size: clamp(16px, 2.7vw, 32px); line-height: 1.14; }

      .microPill{
        display:inline-flex; align-items:center; gap:8px;
        padding: 6px 10px;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,.94);
        font-size: 12px;
        font-weight: 900;
        color: var(--muted);
        box-shadow: 0 10px 22px rgba(15,23,42,.06);
        margin-bottom: 10px;
      }

      .nextBox{
        margin-top: 18px;
        border-radius: 18px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,.94);
        padding: 12px 14px;
        box-shadow: 0 10px 22px rgba(15,23,42,.08);
      }
      .nextLabel{ font-size:12px; font-weight: 900; color: var(--muted); }
      .nextCue{
        margin-top:6px;
        font-size: 15px;
        font-weight: 850;
        white-space: pre-line;
        line-height: 1.22;
      }

      .hint{ margin-top: 14px; font-size: 13px; color: var(--muted); }

      .tapZone{
        position:absolute; inset:0;
        cursor: pointer;
      }

      .bottomBar{
        position: fixed; left:0; right:0; bottom:0; z-index: 2;
        padding-bottom: env(safe-area-inset-bottom);
        background: rgba(255,255,255,.92);
        border-top: 1px solid var(--line);
        backdrop-filter: blur(10px);
      }
      .bottomInner{ padding: 12px 14px; }
      .navRow{ display:flex; gap: 12px; }
      .navBtn{
        flex: 1;
        height: 62px;
        border-radius: 20px;
        font-size: 18px;
        font-weight: 950;
      }

      @media (max-width: 520px){
        .topInner{ padding: 10px 10px; }
        .topControls{ gap: 8px; }
        .toggle{ padding: 6px 8px; font-size: 12px; }
        .control{ height: 44px; }
        .stage{ padding: 16px; }
        .ref{ width: 120px; height: 120px; right: 10px; top: 10px; }
        .navBtn{ height: 58px; font-size: 17px; }
      }
    `}</style>
  );
}

/* =========================================
   APP
   ========================================= */
function AppInner() {
  const persisted = useMemo(
    () => safeJsonParse(localStorage.getItem(STORAGE_KEY), null),
    []
  );

  const [showFullLibrary, setShowFullLibrary] = useState(
    !!persisted?.showFullLibrary
  );
  const [favorites, setFavorites] = useState(persisted?.favorites ?? {});
  const [userBasesBySet, setUserBasesBySet] = useState(
    persisted?.userBasesBySet ?? {}
  );
  const [lastSelection, setLastSelection] = useState(
    persisted?.lastSelection ?? null
  );

  const GENRES = useMemo(
    () => mergeUserBasesIntoGenres(BASE_GENRES, userBasesBySet),
    [userBasesBySet]
  );

  const [mode, setMode] = useState("prep"); // prep | session
  const [page, setPage] = useState(persisted?.page ?? "prep"); // prep | system

  const [showOnboarding, setShowOnboarding] = useState(() => {
    const seen = persisted?.seenOnboarding;
    return !seen;
  });

  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const pushToast = useCallback((msg) => {
    setToast(String(msg));
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const fallbackGenreId = GENRES?.[0]?.id ?? "beauty";
  const [genreId, setGenreId] = useState(
    () => lastSelection?.genreId ?? fallbackGenreId
  );
  const genre = useMemo(
    () => GENRES.find((g) => g.id === genreId) ?? GENRES[0] ?? null,
    [GENRES, genreId]
  );

  const [setId, setSetId] = useState(() => {
    const byLast = lastSelection?.setId;
    if (byLast && genre?.sets?.some((s) => s.id === byLast)) return byLast;
    return genre?.sets?.[0]?.id ?? "";
  });

  const selectedSet = useMemo(
    () => genre?.sets?.find((s) => s.id === setId) ?? genre?.sets?.[0] ?? null,
    [genre, setId]
  );

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

  const [autoOn, setAutoOn] = useState(false);
  const [rhythmId, setRhythmId] = useState("normal");
  const rhythm = useMemo(
    () => RHYTHMS.find((r) => r.id === rhythmId) ?? RHYTHMS[1],
    [rhythmId]
  );

  const [showRefImage, setShowRefImage] = useState(
    persisted?.showRefImage ?? true
  );
  const [showNextPreview, setShowNextPreview] = useState(
    persisted?.showNextPreview ?? true
  );

  const current = useMemo(() => {
    if (!flow.length) return null;
    return flow[clamp(idx, 0, flow.length - 1)] ?? null;
  }, [flow, idx]);

  const nextStep = useMemo(() => {
    if (!flow.length) return null;
    const ni = idx + 1;
    if (ni >= flow.length) return null;
    return flow[ni] ?? null;
  }, [flow, idx]);

  const stepNow = useMemo(() => {
    if (!flow.length) return 0;
    return isOver ? flow.length : clamp(idx + 1, 1, flow.length);
  }, [flow.length, idx, isOver]);

  const progressPct = useMemo(() => {
    if (!flow.length) return 0;
    return Math.round((stepNow / flow.length) * 100);
  }, [flow.length, stepNow]);

  const restartFlow = useCallback(() => {
    setIdx(0);
    setIsOver(false);
    setAutoOn(false);
  }, []);

  const advance = useCallback(() => {
    if (!flow.length) return;
    if (isOver) return;

    const ni = idx + 1;
    if (ni >= flow.length) {
      setIsOver(true);
      setAutoOn(false);
      return;
    }
    setIdx(ni);
  }, [flow.length, idx, isOver]);

  const back = useCallback(() => {
    if (!flow.length) return;

    if (isOver) {
      setIsOver(false);
      setIdx(Math.max(0, flow.length - 1));
      return;
    }

    const pi = idx - 1;
    if (pi < 0) return;
    setIdx(pi);
  }, [flow.length, idx, isOver]);

  useEffect(() => {
    if (mode !== "session") return;
    if (!autoOn) return;
    if (isOver) return;
    if (!flow.length) return;

    const ms = (rhythm?.seconds ?? 8) * 1000;
    const t = setTimeout(() => {
      setIdx((prev) => {
        const ni = prev + 1;
        if (ni >= flow.length) {
          setIsOver(true);
          setAutoOn(false);
          return prev;
        }
        return ni;
      });
    }, ms);

    return () => clearTimeout(t);
  }, [mode, autoOn, isOver, flow.length, rhythm]);

  const isFavorite = favorites?.[setId] === baseId;
  const toggleFavorite = () => {
    setFavorites((prev) => {
      const next = { ...(prev || {}) };
      if (next[setId] === baseId) {
        delete next[setId];
        pushToast("Removed favorite for this set.");
      } else {
        next[setId] = baseId;
        pushToast("Saved favorite: this will be the default base for this set.");
      }
      return next;
    });
  };

  const duplicateAnchor = () => {
    if (!selectedBase || !selectedSet) return;

    const allNames = (selectedSet?.bases ?? [])
      .map((b) => b?.name)
      .filter(Boolean);
    const nextName = makeDuplicateName(selectedBase.name || "Base Pose", allNames);

    const copy = deepClone(selectedBase);
    copy.id = makeId("my_base");
    copy.name = nextName;
    copy.curated = true;
    copy.flow = (copy.flow || []).map((step) => ({
      ...step,
      uid: makeId("my_step"),
    }));

    setUserBasesBySet((prev) => {
      const next = { ...(prev || {}) };
      const arr = Array.isArray(next[selectedSet.id])
        ? [...next[selectedSet.id]]
        : [];
      arr.push(copy);
      next[selectedSet.id] = arr;
      return next;
    });

    setTimeout(() => setBaseId(copy.id), 0);
    pushToast("Made your version. You are now on your copy.");
  };

  /* ✅ IMPORTANT: only reset flow when in PREP, never during session */
  useEffect(() => {
    if (mode !== "prep") return;
    setIdx(0);
    setIsOver(false);
    setAutoOn(false);
  }, [genreId, setId, baseId, mode]);

  const hasAnyImagesInFlow = useMemo(
    () => (flow || []).some((s) => !!s?.img),
    [flow]
  );

  // ✅ Replace 7-day rehearsal with 48-hour proof plan (fits requirement)
  const proof48Plan = useMemo(() => {
    const sets = genre?.sets ?? [];
    const s1 = sets[0];
    const s2 = sets[1];

    const day1Focus = [s1?.name, s2?.name].filter(Boolean).join(" + ") || "1–2 sets";
    const day2Focus = [s1?.name, s2?.name].filter(Boolean).join(" + ") || "same sets";

    return [
      {
        day: "Day 1 (45 min)",
        text: `Run ${day1Focus}. Pick 2 Bases. Repeat each flow twice (Slow).`,
      },
      {
        day: "Day 2 (45 min)",
        text: `Run ${day2Focus} once (Normal). Note which cues felt unclear and mark them for editing.`,
      },
    ];
  }, [genre]);

  useEffect(() => {
    const payload = {
      showFullLibrary,
      favorites,
      userBasesBySet,
      lastSelection: { genreId, setId, baseId },
      showRefImage,
      showNextPreview,
      seenOnboarding: !showOnboarding
        ? true
        : persisted?.seenOnboarding ?? false,
      page,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    showFullLibrary,
    favorites,
    userBasesBySet,
    genreId,
    setId,
    baseId,
    showRefImage,
    showNextPreview,
    showOnboarding,
    page,
  ]);

  const beginSession = () => {
    setLastSelection({ genreId, setId, baseId });
    setMode("session");
    restartFlow();
    pushToast("Session started. Use Next / Back.");
  };

  const exitSession = () => {
    setMode("prep");
    setIsOver(false);
    setAutoOn(false);
    pushToast("Exited session.");
  };

  const resetApp = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setShowFullLibrary(false);
    setFavorites({});
    setUserBasesBySet({});
    setLastSelection(null);
    setGenreId(fallbackGenreId);
    setShowRefImage(true);
    setShowNextPreview(true);
    setMode("prep");
    setPage("prep");
    setIdx(0);
    setIsOver(false);
    setAutoOn(false);
    setShowOnboarding(true);
    pushToast("App reset. Starting fresh.");
  };

  const noData = !Array.isArray(GENRES) || GENRES.length === 0;
  const cueTier = useMemo(
    () => cueTierFromText(current?.cue ?? ""),
    [current?.cue]
  );

  /* ✅ FIX: Measure top/bottom bars so content never hides underneath */
  const topBarRef = useRef(null);
  const bottomBarRef = useRef(null);

  const syncBars = useCallback(() => {
    const root = document.documentElement;
    const th = topBarRef.current?.offsetHeight ?? 0;
    const bh = bottomBarRef.current?.offsetHeight ?? 0;
    root.style.setProperty("--topH", `${th}px`);
    root.style.setProperty("--bottomH", `${bh}px`);
  }, []);

  useLayoutEffect(() => {
    if (mode !== "session") return;

    syncBars();

    const ro = new ResizeObserver(() => syncBars());
    if (topBarRef.current) ro.observe(topBarRef.current);
    if (bottomBarRef.current) ro.observe(bottomBarRef.current);

    window.addEventListener("resize", syncBars);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncBars);
    };
  }, [mode, isOver, syncBars]);

  useEffect(() => {
    if (mode !== "session") return;
    syncBars();
  }, [mode, isOver, syncBars]);

  /* ✅ Always land at the top when entering PREP/System */
  useEffect(() => {
    if (mode !== "prep") return;
    requestAnimationFrame(() => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      } catch {
        window.scrollTo(0, 0);
      }
    });
  }, [mode, page]);

  /* ✅ floating Top button */
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 260);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const systemCopy = useMemo(() => {
    const clientScript =
      "“I’ll guide you step by step. We’ll make small adjustments and you don’t need to get anything right. If anything feels uncomfortable, tell me and we’ll adjust.”";

    const notesTemplate =
      `Client:
Genre / Set / Base:
Best cue:
What to avoid next time:`;

    return { clientScript, notesTemplate };
  }, []);

  const doCopy = useCallback(
    async (label, text) => {
      const ok = await copyToClipboard(text);
      pushToast(ok ? `${label} copied.` : `Copy failed. Select and copy manually.`);
    },
    [pushToast]
  );

  return (
    <>
      <Styles />

      {mode === "prep" && showOnboarding && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="How this works">
          <div className="modal">
            <div className="modalInner">
              <div className="modalTitle">How this works (quick)</div>
              <div className="modalBody">
                This tool shows calm, step-by-step cues so you don’t have to memorize a session.
              </div>
              <ul className="modalList">
                <li><strong>Genre</strong> = type of shoot/library.</li>
                <li><strong>Set</strong> = setup/environment (stool, wall, table…).</li>
                <li><strong>Base</strong> = starting pose for that set.</li>
                <li>
                  A session starts from one strong base pose and evolves through{" "}
                  <strong>small movements</strong> — not “new poses”.
                </li>
              </ul>
              <div className="modalActions">
                <button
                  className="btn"
                  onClick={() => {
                    setShowOnboarding(false);
                    pushToast("Help is always available via the “?” button.");
                  }}
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast ? (
        <div className="toastWrap" aria-live="polite" aria-atomic="true">
          <div className="toast">{toast}</div>
        </div>
      ) : null}

      {mode === "prep" && showTopBtn ? (
        <div className="floatTop">
          <button
            className="btn"
            style={{ borderRadius: 999, height: 44, padding: "0 14px" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            title="Back to top"
          >
            Top ↑
          </button>
        </div>
      ) : null}

      {mode === "prep" && (
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div className="pill">
              <span className="dot" />
              Prep
            </div>

            <div className="tabs" aria-label="Navigation tabs">
              <button
                className={`tabBtn ${page === "prep" ? "tabBtnActive" : ""}`}
                onClick={() => setPage("prep")}
                aria-label="Open Prep"
                title="Prep (select library and start a session)"
              >
                Prep
              </button>
              <button
                className={`tabBtn ${page === "system" ? "tabBtnActive" : ""}`}
                onClick={() => setPage("system")}
                aria-label="Open System"
                title="System (runbook, templates, handoff)"
              >
                System
              </button>

              <button
                className="tabBtn"
                onClick={() => setShowOnboarding(true)}
                title="Help / How this works"
                aria-label="Open help"
              >
                ?
              </button>
              <button
                className="tabBtn"
                onClick={resetApp}
                title="Reset app (clears saved state and copies)"
                aria-label="Reset app"
              >
                Reset
              </button>
            </div>
          </div>

          <h1 className="h1">Pose Flow Operator</h1>
          <p className="sub">
            Run a session from one strong base pose, evolving it through small, calm adjustments — so clients stay relaxed and you never improvise.
          </p>

          {noData ? (
            <div className="warn">
              DATA ERROR: GENRES is empty. Check App.jsx has the full BASE_GENRES array.
            </div>
          ) : null}

          {page === "prep" ? (
            <>
              <div className="prepSticky" aria-label="Pose selection controls">
                <div className="prepStickyInner">
                  <div className="grid">
                    <div>
                      <div className="label">
                        Genre <span className="helpIcon" title="Choose the shoot category/library.">i</span>
                      </div>
                      <select className="control" value={genreId} onChange={(e) => setGenreId(e.target.value)}>
                        {GENRES.map((g) => (
                          <option key={g.id} value={g.id}>
                            {g.name}
                          </option>
                        ))}
                      </select>
                      <div className="helper">Pick the type of shoot this pose library belongs to.</div>
                    </div>

                    <div>
                      <div className="label">
                        Set <span className="helpIcon" title="Choose the setup/environment (stool, wall, table…).">i</span>
                      </div>
                      <select className="control" value={setId} onChange={(e) => setSetId(e.target.value)}>
                        {(genre?.sets ?? []).map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                      <div className="helper">This usually matches your lighting/background/prop setup.</div>
                    </div>

                    <div>
                      <div className="label">
                        Base <span className="helpIcon" title="Choose the starting pose for this set.">i</span>
                      </div>
                      <select className="control" value={baseId} onChange={(e) => setBaseId(e.target.value)}>
                        {availableBases.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>

                      <div className="row">
                        <label className="check" title="Off = curated bases only. On = all bases in this set." aria-label="Show full library">
                          <input type="checkbox" checked={showFullLibrary} onChange={(e) => setShowFullLibrary(e.target.checked)} />
                          Show full library
                        </label>

                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span className="helper" style={{ marginTop: 0, fontSize: 13, fontWeight: 900 }}>
                            Favorite
                          </span>
                          <button className="btn btnIcon" onClick={toggleFavorite} title="Sets the default base for this set next time." aria-label="Toggle favorite base for this set">
                            {isFavorite ? "★" : "☆"}
                          </button>
                        </div>
                      </div>

                      <div className="footerActions">
                        <button
                          className="btn"
                          onClick={duplicateAnchor}
                          disabled={!selectedBase}
                          title="Create your version so you can refine cues later (original stays unchanged)."
                          aria-label="Make my version"
                        >
                          Make my version
                        </button>

                        <button
                          className="btn btnPrimary"
                          onClick={beginSession}
                          disabled={!flow.length}
                          title={flow.length ? "Start the step-by-step flow" : "No steps available for this base"}
                          aria-label="Begin session"
                        >
                          Begin session
                        </button>
                      </div>

                      <div className="helper" style={{ marginTop: 10 }}>
                        Flow principle: you start with a base pose, then make small adjustments — the client never has to “start over”.
                      </div>

                      {!flow.length ? (
                        <div className="warn" style={{ marginTop: 12 }}>
                          This base has no steps. Choose another base.
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="cardInner">
                  <div className="label" style={{ fontSize: 14, fontWeight: 950, color: "var(--ink)" }}>
                    48-hour proof plan
                  </div>
                  <p className="sub" style={{ marginTop: 6 }}>
                    Practice for <strong>48 hours</strong> — not next week — using the sets in <strong>{genre?.name ?? "this genre"}</strong>.
                  </p>

                  <div className="planGrid">
                    {proof48Plan.map((x) => (
                      <div key={x.day} className="planItem">
                        <div className="planDay">{x.day}</div>
                        <div className="planText">{x.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="card">
                <div className="cardInner">
                  <div className="label" style={{ fontSize: 14, fontWeight: 950, color: "var(--ink)" }}>
                    System
                  </div>
                  <p className="sub" style={{ marginTop: 6 }}>
                    This turns the app into a delegatable system: purpose, runbook, templates, handoff.
                  </p>

                  <div className="sysGrid">
                    <div className="sysCard">
                      <div className="sysTitle">What this system does</div>
                      <div className="sysText">
                        Pose Flow Operator lets you run a portrait session from one strong base pose, evolving it through small, calm adjustments
                        so clients stay relaxed and you never improvise.
                      </div>
                      <div className="sysText" style={{ marginTop: 10 }}>
                        Key idea: you’re not “changing poses” — you’re refining the same pose one step at a time.
                      </div>
                    </div>

                    <div className="sysCard">
                      <div className="sysTitle">Pose flow principle</div>
                      <ul className="sysList">
                        <li>A <strong>Base</strong> is the foundation.</li>
                        <li>Each step after that is a <strong>small refinement</strong>, not a new pose.</li>
                        <li>If a step doesn’t work, go <strong>Back once</strong> — don’t restart the client.</li>
                      </ul>
                    </div>

                    <div className="sysCard">
                      <div className="sysTitle">Operator runbook</div>
                      <ul className="sysList">
                        <li>Choose <strong>Genre → Set → Base</strong> (pick the first curated Base if unsure).</li>
                        <li>Turn <strong>Next Preview ON</strong>. Leave <strong>Auto-advance OFF</strong>.</li>
                        <li>Press <strong>Begin session</strong>.</li>
                        <li>Read the cue <strong>out loud</strong>, shoot 2–4 frames, press <strong>Next</strong>.</li>
                        <li>Make <strong>only</strong> the change described on screen.</li>
                        <li>If awkward: press <strong>Back once</strong>, then continue.</li>
                      </ul>
                    </div>

                    <div className="sysCard">
                      <div className="sysTitle">If something doesn’t work</div>
                      <div className="sysText">
                        Don’t correct the client. Go back one step and apply this reset:
                      </div>
                      <ul className="sysList">
                        <li>Hands down</li>
                        <li>Shoulders relaxed</li>
                        <li>Chin gently forward and down</li>
                      </ul>
                      <div className="sysText">Then continue the flow.</div>
                    </div>

                    <div className="sysCard">
                      <div className="sysTitle">Template: what to say at the start</div>
                      <div className="monoBox">{systemCopy.clientScript}</div>
                      <div className="copyRow">
                        <div className="helper" style={{ marginTop: 0 }}>Read this verbatim to reassure nervous clients.</div>
                        <button className="btn" onClick={() => doCopy("Client script", systemCopy.clientScript)}>
                          Copy
                        </button>
                      </div>
                    </div>

                    <div className="sysCard">
                      <div className="sysTitle">Template: notes after the session</div>
                      <div className="monoBox">{systemCopy.notesTemplate}</div>
                      <div className="copyRow">
                        <div className="helper" style={{ marginTop: 0 }}>Keep notes short. Don’t over-document.</div>
                        <button className="btn" onClick={() => doCopy("Notes template", systemCopy.notesTemplate)}>
                          Copy
                        </button>
                      </div>
                    </div>

                    <div className="sysCard" style={{ gridColumn: "1 / -1" }}>
                      <div className="sysTitle">Handoff note (someone else can run it tomorrow)</div>
                      <div className="sysText">
                        Your job is to follow the flow, not to invent poses. Choose a curated Base, read the cue exactly as written,
                        shoot a few frames, then go Next. If a pose fails, go Back once and continue. Do not correct the client or add
                        extra instructions that aren’t on screen.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {mode === "session" && (
        <div className="session">
          <div className="topBar" ref={topBarRef}>
            <div className="topInner">
              <div className="topRow">
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div className="progLabel">Progress</div>
                  <div className="progNums">
                    <strong style={{ color: "var(--ink)" }}>{stepNow}</strong> /{" "}
                    {flow.length || 0} ({progressPct}%)
                  </div>
                  <div className="bar">
                    <div className="barFill" style={{ width: `${progressPct}%` }} />
                  </div>
                </div>

                <div className="topControls">
                  <label className="toggle" title="Automatically go to the next cue after the chosen time." aria-label="Toggle auto-advance">
                    <input type="checkbox" checked={autoOn} onChange={(e) => setAutoOn(e.target.checked)} disabled={isOver} />
                    Auto-advance
                  </label>

                  <select
                    className="control"
                    style={{ height: 42, width: 170, marginTop: 0 }}
                    value={rhythmId}
                    onChange={(e) => setRhythmId(e.target.value)}
                    disabled={!autoOn || isOver}
                    title="Seconds per step for auto-advance."
                    aria-label="Select auto-advance speed"
                  >
                    {RHYTHMS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label} ({r.seconds}s)
                      </option>
                    ))}
                  </select>

                  <label className="toggle" title={hasAnyImagesInFlow ? "Show a reference sketch when available." : "No images available for this flow."} aria-label="Toggle reference image">
                    <input type="checkbox" checked={showRefImage} onChange={(e) => setShowRefImage(e.target.checked)} disabled={!hasAnyImagesInFlow} />
                    Image
                  </label>

                  <label className="toggle" title="Show the next cue preview." aria-label="Toggle next cue preview">
                    <input type="checkbox" checked={showNextPreview} onChange={(e) => setShowNextPreview(e.target.checked)} />
                    Next preview
                  </label>

                  <button className="btn" onClick={exitSession} title="Return to prep screen" aria-label="Exit session">
                    Exit
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="main">
            <div className="mainPad">
              <div className="stage">
                <div
                  className="tapZone"
                  onClick={() => {
                    if (!isOver) advance();
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Advance to next cue"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (!isOver) advance();
                    }
                    if (e.key === "ArrowRight") {
                      e.preventDefault();
                      if (!isOver) advance();
                    }
                    if (e.key === "ArrowLeft") {
                      e.preventDefault();
                      back();
                    }
                  }}
                />

                {showRefImage && hasAnyImagesInFlow && current?.img ? (
                  <div className="ref" aria-hidden="true">
                    <img src={current.img} alt="" draggable={false} />
                  </div>
                ) : null}

                {!isOver ? (
                  <div className="cueWrap">
                    <div className="microPill" aria-hidden="true">
                      Same pose — small adjustment
                    </div>

                    <div className={`cue ${cueTier}`}>{current?.cue ?? ""}</div>

                    {showNextPreview && nextStep?.cue ? (
                      <div className="nextBox">
                        <div className="nextLabel">Next</div>
                        <div className="nextCue">{nextStep.cue}</div>
                      </div>
                    ) : null}

                    <div className="hint">
                      Tip: use <strong>Next</strong> / <strong>Back</strong>. (← → keys also work.)
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                    <div className="progLabel" style={{ fontSize: 14 }}>
                      Flow complete
                    </div>
                    <div style={{ fontSize: 42, fontWeight: 950, marginTop: 8 }}>—</div>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
                      <button className="btn" onClick={restartFlow} aria-label="Restart flow">
                        Restart
                      </button>
                      <button className="btn btnPrimary" onClick={exitSession} aria-label="Exit session">
                        Exit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {!isOver ? (
            <div className="bottomBar" ref={bottomBarRef}>
              <div className="bottomInner">
                <div className="navRow">
                  <button className="btn navBtn" onClick={back} disabled={!flow.length || idx <= 0} aria-label="Back">
                    Back
                  </button>

                  <button className="btn btnPrimary navBtn" onClick={advance} disabled={!flow.length || isOver} aria-label="Next" title="Go to the next cue">
                    Next
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ position: "fixed", left: -9999, top: -9999 }} ref={bottomBarRef} />
          )}
        </div>
      )}
    </>
  );
}

/* =========================================
   EXPORT
   ========================================= */
export default function App() {
  return (
    <ErrorBoundary>
      <AppInner />
    </ErrorBoundary>
  );
}
