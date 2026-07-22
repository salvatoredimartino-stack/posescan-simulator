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
   ASSET PATHS
   ========================================= */
const ASSET = (p) =>
  `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, "")}`;

/* =========================================
   DATA (Women + Corporate Men; 50+ removed)
   ========================================= */
const BASE_GENRES = [
  {
    id: "womens_poses",
    name: "Women’s Poses",
    imgPrefix: "beauty",
    sets: [
      {
        id: "womens_set1_seated_stool",
        name: "SET 1 — SEATED (STOOL)",
        bases: [
          {
            id: "womens_seated_base1",
            name: "Base Pose 1",
            num: 1,
            curated: true,
            img: ASSET("poses/beauty/set1-seated/base1/step1.png"),
            flow: [
              { uid: "w_s1_b1_p1", num: 1, cue: "Sit on the edge of the stool, 45° from the camera. Both feet down, hands flat on your lap." },
              { uid: "w_s1_b1_p2", num: 2, cue: "Hands go inside your legs." },
              { uid: "w_s1_b1_p3", num: 3, cue: "Rotate side on.", comp: 4 },
              { uid: "w_s1_b1_p6", num: 6, cue: "Hold exactly that — I’m changing the framing.", comp: 2 },
              { uid: "w_s1_b1_p7", num: 7, cue: "Stay still, I’m turning the camera horizontal.", comp: 4 },
              { uid: "w_s1_b1_p8", num: 8, cue: "Same again — hold it.", comp: 2 },
            ],
          },
          {
            id: "womens_seated_base9",
            name: "Base Pose 9",
            num: 9,
            curated: true,
            img: ASSET("poses/beauty/set1-seated/base2/step1.png"),
            flow: [
              { uid: "w_s1_b9_p9", num: 9, cue: "Left foot up on the box. Left elbow rests on your left knee, right hand flat on your thigh, torso forward." },
              { uid: "w_s1_b9_p10", num: 10, cue: "Cup your fingers." },
              { uid: "w_s1_b9_p11", num: 11, cue: "Right hand back into your right pocket. Left elbow stays on the knee." },
              { uid: "w_s1_b9_p12", num: 12, cue: "Hands in between your legs." },
              { uid: "w_s1_b9_p13", num: 13, cue: "Same pose — tilt, and lean back.", comp: 4 },
              { uid: "w_s1_b9_p14", num: 14, cue: "Elbow out, left elbow on the knee." },
              { uid: "w_s1_b9_p15", num: 15, cue: "Same again — right hand forward onto your left elbow, left hand comes forward." },
            ],
          },
          {
            id: "womens_seated_base16",
            name: "Base Pose 16",
            num: 16,
            curated: true,
            img: ASSET("poses/beauty/set1-seated/base3/step1.png"),
            flow: [
              { uid: "w_s1_b16_p16", num: 16, cue: "Side pose — open up to the camera. Right hand on your thigh, left elbow on your left knee." },
              { uid: "w_s1_b16_p17", num: 17, cue: "Same pose — left hand up to your chin." },
              { uid: "w_s1_b16_p18", num: 18, cue: "Same pose — big smile." },
              { uid: "w_s1_b16_p19", num: 19, cue: "Same pose with a tilt — big smile, hands down and crossed." },
            ],
          },
          {
            id: "womens_seated_base20",
            name: "Base Pose 20",
            num: 20,
            curated: true,
            img: ASSET("poses/beauty/set1-seated/base4/step1.png"),
            flow: [
              { uid: "w_s1_b20_p20", num: 20, cue: "Body forward, straight to the camera. Cross your legs, arms staggered on the knee." },
              { uid: "w_s1_b20_p21", num: 21, cue: "Body stays forward — left hand up to your chin, right hand stays down." },
              { uid: "w_s1_b20_p22", num: 22, cue: "Same pose — left hand like a smoking hand." },
              { uid: "w_s1_b20_p23", num: 23, cue: "Both hands down, big smile, tilt your head." },
            ],
          },
        ],
      },

      {
        id: "womens_set2_standing",
        name: "SET 2 — STANDING",
        bases: [
          {
            id: "womens_standing_base79",
            name: "Base Pose 79",
            num: 79,
            curated: true,
            img: ASSET("poses/beauty/set2-standing/base1/step1.png"),
            flow: [
              { uid: "w_s2_b79_p79", num: 79, cue: "Feet apart, rock your hip to one side. One shoulder up, one down. Both hands on your hips — one up, one down.", note: "Shoot low" },
              { uid: "w_s2_b79_p80", num: 80, cue: "Hold that — I’m changing the framing.", comp: 3 },
            ],
          },
          {
            id: "womens_standing_base81",
            name: "Base Pose 81",
            num: 81,
            curated: true,
            img: ASSET("poses/beauty/set2-standing/base2/step1.png"),
            flow: [
              { uid: "w_s2_b81_p81", num: 81, cue: "Left foot up on the box. Right hand on your right hip, left hand down, chin 45° to the camera.", note: "Rotation series starts here" },
              { uid: "w_s2_b81_p82", num: 82, cue: "Elbow tucked in, tilt a little to your left." },
              { uid: "w_s2_b81_p83", num: 83, cue: "Chin back round to the camera." },
              { uid: "w_s2_b81_p84", num: 84, cue: "Rotate and look back at me.", note: "Keep the breast line", comp: 3 },
            ],
          },
        ],
      },

      {
        id: "womens_set3_wall",
        name: "SET 3 — WALL",
        bases: [
          {
            id: "womens_wall_base72",
            name: "Base Pose 72",
            num: 72,
            curated: true,
            img: ASSET("poses/beauty/set3-wall/base1/step1.png"),
            flow: [
              { uid: "w_s3_b72_p72", num: 72, cue: "45° to the camera, feet apart. Weight on your back foot, kick the front knee forward, lean back." },
              { uid: "w_s3_b72_p73", num: 73, cue: "Same pose — hold it.", comp: 3 },
              { uid: "w_s3_b72_p74", num: 74, cue: "Hands across, left hand underneath.", comp: 3 },
            ],
          },
          {
            id: "womens_wall_base75",
            name: "Base Pose 75",
            num: 75,
            curated: true,
            img: ASSET("poses/beauty/set3-wall/base2/step1.png"),
            flow: [
              { uid: "w_s3_b75_p75", num: 75, cue: "Change your weight from the back foot onto the front foot.", note: "Rotation" },
              { uid: "w_s3_b75_p76", num: 76, cue: "Turn and face the wall." },
              { uid: "w_s3_b75_p77", num: 77, cue: "Same pose — hold it.", comp: 4 },
              { uid: "w_s3_b75_p78", num: 78, cue: "Hands down." },
            ],
          },
        ],
      },

      {
        id: "womens_set4_table",
        name: "SET 4 — TABLE",
        bases: [
          {
            id: "womens_table_base",
            name: "Base Pose",
            curated: true,
            img: ASSET("poses/beauty/set4-table/base1/step1.png"),
            flow: [
              { uid: "w_s4_base", cue: "Sit behind the table. Arms on the table, crossed asymmetrically." },
              { uid: "w_s4_p94", num: 94, cue: "Elbows tapered in, symmetrical." },
              { uid: "w_s4_p95", num: 95, cue: "Go asymmetric — right elbow out." },
              { uid: "w_s4_p96", num: 96, cue: "Hands up — right hand up, and tilt." },
              { uid: "w_s4_p97", num: 97, cue: "Elbows together, hands framing your face." },
              { uid: "w_s4_p99", num: 99, cue: "Hands out, touching across." },
              { uid: "w_s4_p100", num: 100, cue: "Smoking hands — elbows in." },
              { uid: "w_s4_p101", num: 101, cue: "Hands behind your hair, elbows across." },
              { uid: "w_s4_p102", num: 102, cue: "Elbow one way, hands across." },
              { uid: "w_s4_p103", num: 103, cue: "Body comes out, head to the left." },
              { uid: "w_s4_p104", num: 104, cue: "Hand behind your hair, body sideways." },
              { uid: "w_s4_p105", num: 105, cue: "Both hands up.", comp: 2 },
              { uid: "w_s4_p106", num: 106, cue: "Hands tucked in.", comp: 2 },
              { uid: "w_s4_p107", num: 107, cue: "Hug yourself — one hand off the table." },
              { uid: "w_s4_p108", num: 108, cue: "Double hug." },
              { uid: "w_s4_p109", num: 109, cue: "Elbow off the table, one hand up and one down, tilt right." },
            ],
          },
        ],
      },

      {
        id: "womens_set5_staggered_box",
        name: "SET 5 — STAGGERED SEATING (BOX)",
        bases: [
          {
            id: "womens_box_base111",
            name: "Base Pose 111",
            num: 111,
            curated: true,
            img: ASSET("poses/beauty/set5-box/base1/step1.png"),
            flow: [
              { uid: "w_s5_p111", num: 111, cue: "Recline your body onto the box. Right elbow on the box, that hand down. Left hand rests on your arm." },
              { uid: "w_s5_p112", num: 112, cue: "Arm goes onto the elbow, hand goes inside." },
              { uid: "w_s5_p113", num: 113, cue: "Hand behind your hair." },
              { uid: "w_s5_p114", num: 114, cue: "Triangle — elbow into the box, left arm onto your thigh." },
              { uid: "w_s5_p115", num: 115, cue: "Elbows together, hands on your chin." },
              { uid: "w_s5_p116", num: 116, cue: "Rotate your body around — both elbows onto the box." },
              { uid: "w_s5_p117", num: 117, cue: "Both feet up on the box, arms hugging your knees." },
              { uid: "w_s5_p118", num: 118, cue: "We’ll take the box away. Horizontal tilt.", note: "Box removed", img: ASSET("poses/beauty/set5-box/base2/step1.png") },
              { uid: "w_s5_p119", num: 119, cue: "Big smile — tilt, and smile." },
              { uid: "w_s5_p120", num: 120, cue: "One knee up, left elbow down — hug just the right one." },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "flow_posing_cards",
    name: "Flow Posing Cards",
    imgPrefix: "flow",
    sets: [
      {
        id: "flow_sitting",
        name: "SITTING",
        bases: [
          {
            id: "flow_sitting_base",
            name: "Full Flow",
            curated: true,
            flow: [
              { uid: "flow_p1", num: 1, title: "Cover Girl", cue: "Seat her facing camera. Bring her feet forward to lower her knees out of frame.", details: { expression: "Drop her chin to open her eyes. Relaxing the mouth and lifting the chin creates a fashion look.", composition: "Top of hairline to top of hips. Top of head to slightly above hips. Move in closer. Use lens angle to alter composition.", angles: "For someone long and lean, shoot low and square on. Experiment with your angles – below the eyeline, above her face, at chin level. Notice how the angle and height of the lens changes the composition.", tip: "This magazine-style face shot is a simple way to warm up your client, so it’s a great pose to begin with. Frame asymmetrically, so it doesn’t look like a passport photo." } },
              { uid: "flow_p2", num: 2, title: "Bring in the Legs", cue: "With her seated facing camera, place her left foot on an apple box and left arm over the left knee. Hold the skirt down with a hand for modesty.", details: { expression: "Light up the eyes with a baby smile.", composition: "Above the head to just beneath her hands.", angles: "Experiment with angles from just at her eye line to below it.", tip: "Use mirror posing rather than saying right or left. Clients use their eyes before their ears, so demonstrate movement as if you are their mirror reflection. It will be easier for both of you." } },
              { uid: "flow_p3", num: 3, title: "Rotation", cue: "Seat her 45-degrees to camera with feet flat on the floor. Clasp hands gently in lap with one facing up, one facing down.", details: { expression: "This is her natural, relaxed expression.", composition: "Crop at or just below the knees.", angles: "Shooting below the eyeline, square up the angle. When going much lower below her eyeline, open the shoulders and project the chin up.", tip: "Put a little bump in the shoulder to give it action and engagement. Just be careful you don't close off the neck. Make sure there is an inch or two showing." } },
              { uid: "flow_p4", num: 4, title: "Look Back", cue: "Bring her side on to camera. Soften the torso and work the shoulder.", details: { expression: "Ask for gorgeous, sexy eyes.", composition: "Above the head to the lap. Top of the hairline to just above the elbow.", angles: "Experiment with angles from below the eyeline to right at the eyeline. Try moving away from her, keeping an eye on the backdrop and light.", tip: "Saying “front arm” or “back arm” is easier to understand than “left” or “right.” You can also point at a limb and say, \"this hand.\" To really move a limb, say, \"mirror me,\" and direct the limbs that way." } },
              { uid: "flow_p5", num: 5, title: "Look Back - Landscape", cue: "With her side to camera, bring her feet forward to get her knees below the hips. Soften the back.", details: { expression: "This is her natural, relaxed expression.", composition: "Above the head to the top of the head. Mid-arm to just above the elbow.", angles: "Camera is at eye level.", tip: "These poses are the same as the previous card but horizontal rather than vertical." } },
              { uid: "flow_p6", num: 6, title: "Profile", cue: "Seat her 45 degrees to camera. Turn her face toward the light, looking straight up into it.", details: { expression: "This is her natural, relaxed expression.", composition: "Above the head to just below the elbow.", angles: "Stand facing her side with camera right at her eye level.", tip: "Not everyone likes their profiles, but I think you should still take a shot, so they can see it, and then maybe they’ll like it." } },
              { uid: "flow_p7", num: 7, title: "Side Hourglass", cue: "Face her directly to the side with her right foot on pointed toe on an apple box. Her right elbow goes all the way forward, touching the right knee.", details: { expression: "Direct her eyes to camera.", composition: "Above the head to below the knee.", angles: "Sit across from her at eye level. Experiment with leaning back.", tip: "Create space between the torso and knee by having your client relax, soften, or curl the back. Use lots of chin and shoulder engagement in this pose." } },
              { uid: "flow_p8", num: 8, title: "Side Hourglass - Hands Hidden", cue: "Face her directly to the side with her right foot on pointed toe on an apple box. Curl the back, having her hug the back knee with both arms and fingers clasped.", details: { expression: "Soften the mouth.", composition: "Above the head to mid-calf. Above the head to below the knee. Top of head to below the waist.", angles: "Play with bringing camera up and down. Use tilts and angles when people are sitting.", tip: "As you play with angles, go into live view and watch as you bring your angle from high to low. Make sure they adjust their chin and eye movement for your camera angle. You'll find magic in there." } },
              { uid: "flow_p9", num: 9, title: "Cover Girl 2", cue: "Have her face camera. Scoot her to the edge of the seat so she can slightly hinge forward at her hips and project the chin forward.", details: { expression: "This is all about her gorgeous face. Experiment with different levels of smiling.", composition: "Above the head just to her hips.", angles: "Start just below eye level square on. Experiment with zooming in and out. Bring the angle up and tilt the camera forward.", tip: "Shoot on a wide lens to slim the face." } },
              { uid: "flow_p10", num: 10, title: "Cover Girl with Hands", cue: "Have her face camera. Scoot her to the edge of the seat so she can slightly hinge forward at the hips and project her chin forward.", details: { expression: "Experiment with different levels of smiling – from a baby smile to a big grin.", composition: "Above the head just to her hips.", angles: "Shoot just below the eyes. Then a tiny bit above the eyes and slightly angled down. Also, shoot from further back.", tip: "Fabric like tulle is wonderful for framing the face." } },
              { uid: "flow_p11", num: 11, title: "Rotation - Landscape", cue: "With the chair angled just beyond 45-degrees to camera, scoot her to the seat’s edge and tilt forward. Rest both hands along her side.", details: { expression: "Connect the eyes to camera. Experiment with levels of smiling – from none to a little to big.", composition: "Above the head to above the elbow. Above the head to just below the elbow.", angles: "Shoot level with her eyes. Also, shoot from just above her eyes, angled just to her eyeline.", tip: "When people sit deep in their seat, it’s hard for them to come forward without getting squished in the middle. Coming to the edge of the seat makes it easy to lever forward." } },
              { uid: "flow_p12", num: 12, title: "Rotation", cue: "With the chair angled just beyond 45-degrees to camera, scoot her to the seat’s edge and tilt forward. Rest both hands along her side.", details: { expression: "This is her natural, relaxed expression.", composition: "Top of the head to just below the waist. Above the head to above the knee. Above the head to just below the knee.", angles: "From right next to the light, shoot a little above her eyeline and lean the camera forward. Then, bring the angle down.", tip: "Shooting just above the eyeline with the camera tilted forward, there is a beautiful space where it does not appear that you are shooting from above her." } },
              { uid: "flow_p13", num: 13, title: "Bring in the Hands", cue: "With the chair angled just beyond 45-degrees to camera, sit her upright with the near shoulder dropped to lengthen the neck. Tilt chin slightly, projecting it toward her shoulder and camera.", details: { expression: "Begin with her natural expression and then bring in a beautiful smile.", composition: "Above the head to the knee. Above the head to just below the waist.", angles: "Shoot from just a touch above her eyeline and angled forward. Also, shoot from further back.", tip: "We want fabric to flow with natural motion in our photographs, so gathering it up in the hands makes a big difference." } },
              { uid: "flow_p14", num: 14, title: "Back Hand Out of Frame", cue: "With the chair angled just beyond 45-degrees to camera, sit her upright with the near shoulder dropped to lengthen the neck. Front hand rests on an apple box for stability and comfort.", details: { expression: "Begin with her natural, relaxed expression and then ask for an easy smile without spending it all at once.", composition: "Above the head to just below the waist. Above the head to just above the knees. Above the head to just below the knees.", angles: "Come in for closer shots. Start with the camera high and then work your way down.", tip: "Using a mirror, see how many ways you can smile – from itty-bitty, barely-there to a big, full grin. Think of ways to describe these smiles to your clients." } },
              { uid: "flow_p15", num: 15, title: "Explore Motion", cue: "With the chair angled just beyond 45-degrees to camera, sit her upright with the near shoulder dropped to lengthen the neck. Front hand rests on an apple box for stability and comfort.", details: { expression: "Experiment with different expressions at the peak of the motion – from a little smile to different sizes of laughter.", composition: "Above the head to just below the knee. Above the head to below the elbow. Above the head to mid-forearm. Shoot at the peak of the movement.", angles: "Shoot from just a touch above her eyeline and angled forward.", tip: "If my client is having trouble relaxing and smiling or laughing, I'll go into a big fake laugh, which always gets us both genuinely laughing before long." } },
              { uid: "flow_p16", num: 16, title: "Look Back - Landscape", cue: "With the chair angled just beyond 45-degrees to camera, sit her upright with the near shoulder dropped to lengthen the neck. Front hand rests on an apple box for stability and comfort.", details: { expression: "From different levels of smiling to her natural, relaxed expression.", composition: "Top of head to just above the elbow. Top of head to just below the elbow.", angles: "Shoot from just a touch above her eyeline and angled forward.", tip: "An apple box can also change the level of the knee. Bring it forward to lower the knee. Bring it nearer to make the knee higher. Adding an apple box can also create space to bring in family members." } },
              { uid: "flow_p17", num: 17, title: "On the 45", cue: "Turn her 45 degrees to camera. Walk her feet out a little, to bring the knees lower than the hips.", details: { expression: "This is her natural, relaxed expression with just a hint of a smile.", composition: "Above the head to just below the elbow. Above the head to just above the knee.", angles: "Experiment with how close camera is to her. Go behind the light and sit on an apple box. Shoot from just below her eyeline and angled slightly forward.", tip: "Move your client and you to find their best angles – where they look comfortable and where they look like they believe it and own the pose, looking gorgeous, comfortable, and relaxed." } },
              { uid: "flow_p18", num: 18, title: "Cover Girl 3", cue: "Facing forward, put the right foot on an apple box. Right elbow goes on the knee with the wrist down.", details: { expression: "Begin with a natural expression. Bring in a little smile. Relax the mouth with lips together. Confident gaze with a baby smile and then a big, beautiful smile.", composition: "Above the head to just below the knees.", angles: "Camera is well below her eyes with no tilt. The modifier is right on top of my head, and I’m seated.", tip: "Sit when the client sits. Stand when they stand. Lie down when they lie down. Always keep the bottom of the light modifier at the bottom of her chin. Move yourself around and stay at eye level." } },
              { uid: "flow_p19", num: 19, title: "Look Back", cue: "Face her directly to the side and at the edge of her seat. Slide the front elbow back along her torso.", details: { expression: "Begin with a natural, relaxed expression. Then, light up with a smile.", composition: "Above the head to below the hip. Just above the head to above the elbow. Above the head to below the elbow.", angles: "Below her eyeline. Bring the angle down to connect to the chin. Experiment with leaning back and coming forward.", tip: "As she rotates, pay attention to how much space she has in the neck, so she doesn’t lose it. Bringing her forward, she can engage her shoulder without losing her neck." } },
              { uid: "flow_p20", num: 20, title: "Look Back - Landscape", cue: "Face her directly to the side and near the edge of her seat with her arms along her sides. Move back foot away from the body, lean toward the knee, rotate her shoulder away, and look back to camera.", details: { expression: "Begin with a natural, relaxed expression and then bring in a smile.", composition: "Above the head to below the elbow.", angles: "Shoot below the eyeline with the angle down and connected to the chin. Experiment with your location in relation to the light.", tip: "When you rotate someone, you will know you have gone too far when you can’t see the bust. At that point, she can’t look back at the camera comfortably." } },
              { uid: "flow_p21", num: 21, title: "Hourglass", cue: "Face her squarely to camera with her right foot on an apple box. Rest her right elbow on the knee.", details: { expression: "Start with a tiny, soft smile. Then, no smile and a relaxed mouth slightly open.", composition: "Top of the head to just below the knees.", angles: "Shoot quite close and just beneath her eyeline. Vary the height slightly from shot to shot.", tip: "With her hand on her knee, she can touch her own throat and decolletage out to her shoulders. Her body language frames her face." } },
            ],
          },
        ],
      },
      {
        id: "flow_standing",
        name: "STANDING",
        bases: [
          {
            id: "flow_standing_base",
            name: "Full Flow",
            curated: true,
            flow: [
              { uid: "flow_p22", num: 22, title: "Cover Girl 4", cue: "With feet shoulder width apart, bring hands behind the hipline. Rock onto one hip for a perfect S-bend shape.", details: { expression: "This is her natural, relaxed expression.", composition: "Above the head to below the hips. Above the head to above the knees. Top of the head to above the hips. Top of the head to mid-hip. Top of the hairline to below the breast.", angles: "Camera is below her eyes at chin level or lower. We can angle forward as it moves up or have it square on and low. Experiment with shooting closer in and moving farther back.", tip: "Rock her from one hip to the other to see which is more flexible or comfortable to rest on. Putting the weight on one hip brings in a beautiful, asymmetrical shape." } },
              { uid: "flow_p23", num: 23, title: "Rotation", cue: "Step one foot forward, bringing the hips 45 degrees to camera. The arm on the same side comes across, resting on the opposite hip.", details: { expression: "This is her natural, relaxed expression.", composition: "Above the head to mid-thigh. Above the head to just below the waist.", angles: "Shoot just below the chin and square on. Experiment with shooting closer and shooting farther away.", tip: "With a client who is tall and lean, have her bend sideways to bring shape into the body and define the hip lines. 24.Farther Rotation" } },
              { uid: "flow_p24", num: 24, title: "Farther Rotation", cue: "With front foot stepped forward, bring the front hand to the thigh, moving that shoulder around. Bring the knee around, rotating the upper and lower bodies together.", details: { expression: "This is her natural, relaxed expression.", composition: "Top of head to top of thigh. Top of head to the belly button where the waist tapers most.", angles: "Camera is just at her chin line. Experiment with shooting farther out, coming in closer, and moving around her.", tip: "When you take tight magazine shots, not cropping on the elbow is the vital part." } },
              { uid: "flow_p25", num: 25, title: "Activate the Leg", cue: "Facing the front, place both thumbs in pockets. Use mirror posing to direct movement.", details: { expression: "This is her natural, relaxed expression.", composition: "Above the head to above the knee. Above the head to below the knee.", angles: "Camera is below the chin and slightly angled forward. Experiment with proximity to your client.", tip: "If someone has long legs, it’s nice to engage them in some movement during a standing freestyle." } },
              { uid: "flow_p26", num: 26, title: "Break the Rules", cue: "Using mirror posing, show her to crouch down with one knee up and other down but not touching the ground. Arms rest on the knees.", details: { expression: "This is her natural, relaxed expression.", composition: "Above the head to below the feet. Above the head to mid-thigh.", angles: "Sitting down, shoot low and slightly angled up. Standing up, shoot at chest level and slightly angled up.", tip: "See how natural it is to flow from standing to the floor to the wall? Once you have mastered all the different types of posing, you can flow through them organically." } },
              { uid: "flow_p27", num: 27, title: "Peekaboo", cue: "With her side to camera, rest one hand on top of the head and the other one near the other elbow. Turn her face to look through the triangle created by the arm.", details: { expression: "This is her natural, relaxed expression.", composition: "Top of the hand on top of the head to mid-waist. Top of the head to the top of the waist.", angles: "Shoot below the chin. Experiment with how close you are.", tip: "Once you get the body positions and compositions down, you really can't go wrong. Just experiment – move around the frame, see how the light touches them, and where they look their best." } },
              { uid: "flow_p28", num: 28, title: "Cover Girl 5", cue: "Bring her feet to shoulder width apart, so it is easy to move freely and stay balanced and grounded. Have her reach down, picking up part of her dress.", details: { expression: "Just a little smile.", composition: "Above the head to mid-thigh. Top of the head to above the waist.", angles: "Camera is at her eyeline and slightly angled down.", tip: "Picking up the dress as though she is going to run with it helps shape her arms around her body." } },
              { uid: "flow_p29", num: 29, title: "Activate Movement", cue: "With feet shoulder width apart, have her reach down and pick up part of her dress at each side. Using mirror posing, show her a gentle motion of swishing the dress from side to side.", details: { expression: "Start with a little smile and then light it up a little more.", composition: "Above the head to mid-thigh.", angles: "Camera is at her eyeline and slightly angled down.", tip: "People tend to speed this up and get excited when doing this motion. Make sure it is nice and slow, so you can get your shots." } },
              { uid: "flow_p30", num: 30, title: "Dancing Look Backs", cue: "From facing camera with feet shoulder width apart, use mirror posing to direct her to take one step across, bringing her to a 45-degree angle.", details: { expression: "Light it up with a gorgeous smile. Also, do a laugh.", composition: "Above the head to mid-thigh. Above the head to mid-calf.", angles: "Camera is at her eyeline and slightly angled down.", tip: "Giving people a simple motion to repeat keeps them active and engaged. Keep it simple and easy to repeat." } },
              { uid: "flow_p31", num: 31, title: "On the 45", cue: "With one foot forward face her 45 degrees to camera. Use mirror posing to direct movement.", details: { expression: "Start with an easy smile and then bring it up to a laugh that goes along with this fun movement.", composition: "Above the head to just below the knee. Above the head to mid-thigh.", angles: "Camera is at her eyeline and slightly angled down.", tip: "There are not many reasons to be standing on your own without actually posing, so bringing in simple movements with a skirt or dress helps to keep this pose looking natural. 32.Forward Shimmy" } },
              { uid: "flow_p32", num: 32, title: "Forward Shimmy", cue: "With her facing camera directly with handfuls of skirt in both hands, use mirror posing to show her how to shimmy her shoulders. Elbows should be bent and going in little circles behind her.", details: { expression: "Have her smile and laugh. Keep doing the movement again and again until she relaxes and lets go.", composition: "Above the head to below the knee. Above the head to above the knee.", angles: "Camera is at her eyeline and slightly angled down.", tip: "Many people will not feel comfortable moving and dancing in front of camera, so be sure to bring your energy up and be constantly talking, directing, and re-setting the pose to set them at ease." } },
              { uid: "flow_p33", num: 33, title: "Cover Girl 6", cue: "With feet shoulder width apart, tuck her hands high in the waistline and bring them forward. Drop shoulders down and elbows back.", details: { expression: "Start with her natural, relaxed expression and then bring in a touch of smile.", composition: "Above the head to just below the waist. Above the head to just above the knee.", angles: "Just below the eyes.", tip: "I’m always giving hands something to do because it makes them look natural. Natural hands look incredible." } },
              { uid: "flow_p34", num: 34, title: "Rotation", cue: "Turn her body 45 degrees from camera with feet shoulder width apart. Pop right hip out.", details: { expression: "Start with the natural relaxed expression. Soften it, and then give a big, beautiful smile.", composition: "Above the head to the knee. Above the head to below the knee.", angles: "Camera is just below the eyes.", tip: "When you give anyone a fun movement, such as flicking a dress with their hip, you are sure to get a big, natural smile." } },
              { uid: "flow_p35", num: 35, title: "Dancing", cue: "Demonstrate a dance step with mirror posing. Facing forward, step across with one foot, kicking the hip forward on the step.", details: { expression: "These are her natural expressions as she engages with the joy of movement.", composition: "Above the head to the knee. Above the head to below the knee.", angles: "Camera is just below the eyes.", tip: "People are going to want to speed up when in motion. Slow them down and keep repeating until you are sure you’ve got what you want." } },
              { uid: "flow_p36", num: 36, title: "Dancing with Arm Frame", cue: "With her body 90 degrees from camera and arms over her head, have her sway in place in a gentle, slow dance.", details: { expression: "Go from relaxed to laughing.", composition: "Above the head to the knees.", angles: "Camera is just below her eyes.", tip: "Just because someone knows how to dance and is relaxed in front of camera does not mean they will know how to shape their bodies for pictures. Take a bit of what they naturally do and repeat the parts you love." } },
              { uid: "flow_p37", num: 37, title: "Dancing Square to Camera", cue: "Have her move back from camera, facing it directly. Using mirror posing, direct her to step toward camera, creating an S-bend in her figure by moving her hip.", details: { expression: "Bring in big gorgeous laughs.", composition: "Above the head to mid-thigh. Above the head to the knees.", angles: "Camera is just below her eyes. Take the shot when she is closest to you.", tip: "Everyone wants to go fast! Be sure to slow her down so you can get the shots you need." } },
              { uid: "flow_p38", num: 38, title: "Dancing on the 45", cue: "Have her step back and face the light, angled 45 degrees from camera. Use mirror posing to direct her to step forward and relax her arms back – loose and free.", details: { expression: "Have her go from laughter to stillness.", composition: "Above the head to the floor. Above the head to the knees. Above the head to below the hips. Above the head to below the knees. Top of head to the waist.", angles: "Camera is just below the eyes.", tip: "I love smiles, laughs, and dancing, but for me, everything is about breath and stillness and letting the mouth completely relax. Stillness is absolutely perfect." } },
              { uid: "flow_p39", num: 39, title: "Dancing Side to Side", cue: "With mirror posing, show her a simple side-to-side step that really kicks the dress out. Keep elbows in while hands go out.", details: { expression: "This is all about fun and joy.", composition: "Above the head to below the knees.", angles: "Camera is down at chest level.", tip: "Focus in on one simple movement. Then, instead of taking 300 shots and being able to pull a few, you’ll be able to get exactly what you want." } },
            ],
          },
        ],
      },
      {
        id: "flow_wall",
        name: "WALL",
        bases: [
          {
            id: "flow_wall_base",
            name: "Full Flow",
            curated: true,
            flow: [
              { uid: "flow_p40", num: 40, title: "Basic Lean", cue: "With feet shoulder width apart, turn her 45 degrees from the wall. Bring one hip forward by leaning her front shoulder down to the elbow against the wall.", details: { expression: "This is her natural, relaxed expression.", composition: "Above the head to mid-thigh.", angles: "With someone tall, you can shoot nice and low. Camera is level with her breastbone and slightly tilted down.", tip: "When posing people standing by the wall, I want to make sure I can get at least my arm between them and the wall so they have room to kick their hip forward." } },
              { uid: "flow_p41", num: 41, title: "Arms Crossed", cue: "With feet shoulder width apart, turn her 45 degrees from the wall. Wrap the arm farthest from camera across the body, resting her hand on the side of her waist.", details: { expression: "This is her natural, relaxed expression.", composition: "Above the head to mid-thigh.", angles: "Camera is level with her breastbone and slightly tilted down.", tip: "Make sure when you're shooting from the side that you can see where the forearm goes as it wraps around the body. Don’t cut it off awkwardly. 42.Face the Wall & Reverse" } },
              { uid: "flow_p42", num: 42, title: "Face the Wall & Reverse", cue: "Facing the wall, rest both hands against it just below the breast line. Bend the back knee, moving closer till the knee touches the wall.", details: { expression: "This is her natural, relaxed expression.", composition: "Above the head to mid-thigh.", angles: "Camera is level with her breastbone and slightly tilted down.", tip: "This pose is really beautiful at the edge of a large window, using natural light." } },
              { uid: "flow_p43", num: 43, title: "Deeper Lean", cue: "With feet shoulder width apart, turn her 45 degrees from the wall. Lean her back so her front shoulder touches the wall.", details: { expression: "This is her natural, relaxed expression.", composition: "Above the head to the hips.", angles: "Camera is level with her breastbone and slightly tilted down. Experiment with moving around her.", tip: "Wall poses are a great place to start with clients because they are more comfortable and confident with a wall to lean on. Try starting your session here." } },
              { uid: "flow_p44", num: 44, title: "Explore Angles", cue: "From facing forward, have her step the foot farthest from the wall back, bringing her 45 degrees to camera. With her weight on the back foot, hinge forward at the waist.", details: { expression: "This is her natural, relaxed expression.", composition: "Above the head to mid-thigh. Above the head to below the hip.", angles: "Assess all your angles. Wherever you go, adjust her shoulders and bring her chin along -- aligned to camera. Shoot slightly above her eyeline and slightly angled down.", tip: "Walls provide a foundation for people to lean on, making them feel safe and comfortable. You can find a wall to shoot on anywhere!" } },
              { uid: "flow_p45", num: 45, title: "Shape & Expression", cue: "Facing forward with one foot stepped back and the body 45 degrees to camera, place her weight on the back foot as she hinges forward at the waist.", details: { expression: "Begin with a natural, relaxed expression. Light up with a smile.", composition: "Above the head to mid-thigh. Above the head to top of the thigh. Just above the head to the waist.", angles: "Start nice and close. Then, experiment with moving farther away and around. Open her body up and close it down as you try different angles. Camera is just above her eyeline and slightly down.", tip: "Decide how much arm and shoulder to show as you come in nice and tight. Widen the frame to include more of her shape as she engages more of her body in the pose." } },
              { uid: "flow_p46", num: 46, title: "Angles & Expression", cue: "Facing forward with one foot stepped back and the body 45 degrees to camera, her front arm leans against the wall – tucked behind with a little bend. Come up on the front toe, engaging the knee.", details: { expression: "We move from her natural, relaxed expression to some big, gorgeous smiles.", composition: "Above the head to the top of the thigh.", angles: "Camera is just above eyeline and slightly tilted down. Experiment with how near and far you are to her.", tip: "Wall poses are perfect for powerful personal branding shots. The wall is going to win every single time." } },
              { uid: "flow_p47", num: 47, title: "One Shoulder Lean", cue: "With feet parallel to the wall, brush the wall with one shoulder. Shift her weight to the outside foot, creating a slight bend at the knee of the other leg.", details: { expression: "Start with her natural, relaxed expression and move to a big, beautiful smile.", composition: "Above the head to above the hip. Above the head to above the knee.", angles: "Camera is level with chin and tilted slightly down.", tip: "Creating space between the body and the arms allows light through, accentuating those gorgeous curves." } },
              { uid: "flow_p48", num: 48, title: "Bum to Wall", cue: "With feet shoulder width apart, lean her back so both shoulders gently touch the wall. Shift weight to the foot closest to camera.", details: { expression: "This is her natural, relaxed expression.", composition: "Above the head to above the knee. Above the head to mid-thigh. Above the head to above the hip.", angles: "Camera is level with chin and tilted slightly down. Experiment with moving around her, keeping chin toward camera.", tip: "This pose allows you to play with shoulder movement and your rotation around her to create a variety of looks." } },
              { uid: "flow_p49", num: 49, title: "Personal Branding & Look Back", cue: "With feet shoulder width apart, lean her back so both shoulders gently touch the wall. Shift her weight to the back foot.", details: { expression: "Start with her natural, relaxed expression and move to a big smile.", composition: "Above the head to mid-thigh.", angles: "Camera is at eye-level and slightly tilted down. Move around the subject to capture the look back.", tip: "When shooting against the wall, be sure to rotate around your subject to capture a variety of angles and to see how the light falls from different positions. I like to go at least 90 degrees around, if not a full 180 degrees." } },
              { uid: "flow_p50", num: 50, title: "Bring in the Hands", cue: "With feet shoulder width apart, lean her back so both shoulders gently touch the wall. Shift her weight to the back foot.", details: { expression: "Start with a slight smile and move to a full smile.", composition: "Above the head to mid-thigh.", angles: "Camera is at eye-level and slightly tilted down. Rotate around the subject to capture different looks.", tip: "Make sure the subject does not lean their head against the wall. It’s natural to do this, but it is more flattering to engage the head by bringing it off the wall." } },
            ],
          },
        ],
      },
      {
        id: "flow_floor",
        name: "FLOOR",
        bases: [
          {
            id: "flow_floor_base",
            name: "Full Flow",
            curated: true,
            flow: [
              { uid: "flow_p51", num: 51, title: "Cover Girl", cue: "Facing camera, seat her on the floor on one hip with legs out to the side. Bring the hand the weight is resting on up to the fingertips and a little back with the thumb facing forward.", details: { expression: "This is her natural, relaxed expression.", composition: "Above the head to mid-thigh. Above the head to below the knee. Just above the head to the waist.", angles: "Camera is at her chest and level to the floor.", tip: "With long features, it’s important to soften the posture and bring lots of bends into their shape." } },
              { uid: "flow_p52", num: 52, title: "Half Rotation", cue: "Sitting on the floor facing camera on one hip with legs out to the side, rotate the body so thighs are parallel to camera and torso is 45 degrees to camera.", details: { expression: "Start with her natural, relaxed expression and then bring in a little smirk.", composition: "Above the head to the knees. Just above the head to the hips. Top of the head to the top of the hips.", angles: "Camera is at her chest and level to the floor. Experiment with coming closer for tighter crops. Moving around her, bring the light.", tip: "Just shrinking her down about 2 or 3 inches brings so many shapes into her body." } },
              { uid: "flow_p53", num: 53, title: "Knee Up", cue: "Sitting on the floor facing the camera on one hip with thighs parallel to camera and torso at 45 degrees, bring the top leg up with the foot facing forward. Front arm rests in the lap.", details: { expression: "This is her natural, relaxed expression.", composition: "Above the head to mid-hip. Above the head to low hip. Top of head to waist. Just above the head to the waist.", angles: "Camera is at her chest and level to the floor. As you bring it down, bring the chin with it.", tip: "People can't see themselves, so they need constant feedback. Don’t tell them what they do wrong. Focus on positive affirmations that they are doing a good job. It makes all the difference in the world for them." } },
              { uid: "flow_p54", num: 54, title: "Look Back", cue: "From seated on the floor, turn her body so the torso is 90 degrees from camera. Stack legs one on top of the other.", details: { expression: "This is her natural, relaxed expression.", composition: "Above the head to just above the elbow. Just above the head to below the elbow. Far above the head to mid-forearm. In the hairline to above the elbow.", angles: "Camera is at her chest and then just level to the floor. Experiment with going lower and moving around her. When she softens her back more, frame diagonally, so she fills it from top to bottom.", tip: "When doing a rotation shot, make sure you have a gorgeous soft shoulder in front and can see the breast line. Bring the knee down so it isn't sticking up into the frame." } },
              { uid: "flow_p55", num: 55, title: "Little Cat", cue: "Lying on her tummy, bring one hand to the front pointed away from camera. Cross the other one over at the wrist.", details: { expression: "This is her natural, relaxed expression.", composition: "Above the head to below the body on the floor. Get all her limbs in the frame.", angles: "Begin just below eye level. When you shoot lower, bring her face down along with camera.", tip: "This posture relies on core strength to lift the torso, and your client will feel the strain in their lower back. Younger people hold this more easily than older people. Don’t keep them here for too long." } },
              { uid: "flow_p56", num: 56, title: "On the Back", cue: "Have her lie on her back. Use a towel or piece of black cloth to bring her head off the floor.", details: { expression: "This is her natural, relaxed expression.", composition: "Above the head to below the hip. In the hair to above the waist.", angles: "Begin shooting high. As you flow around, have her face follow. Then, come down low.", tip: "When people lie on their backs in a relaxed position, they can lose neck definition. Putting something under the head allows them to project the chin forward, bringing back that definition, and you can hide it with their hair." } },
              { uid: "flow_p57", num: 57, title: "Arm on Apple Box", cue: "Place an apple box under the subject’s bottom. Stand another apple box on end beside the subject.", details: { expression: "Start with a natural, relaxed expression and move toward a big, beautiful smile.", composition: "Top of head to above the hips. Top of head to below the hips.", angles: "Lens is slightly above the eye level and tilted down.", tip: "When on the floor, a small white reflector helps bounce more light into the subject’s face. A piece of white foamcore works perfectly for this." } },
              { uid: "flow_p58", num: 58, title: "Little Cat", cue: "Lay 4 apple boxes or a large, firm cushion on the floor. Rest her upper body on top of it with hips on the edge and knees on the floor.", details: { expression: "Start with a natural, relaxed expression and move into a soft smile.", composition: "Fingertips to the hips.", angles: "Start with the camera slightly above eye level, but experiment with moving lower.", tip: "Communication is key. This pose can be uncomfortable to hold for some clients. Coach them through it, explaining that you are there to make them look gorgeous while still maintaining comfort and safety. Have them relax their upper body in between shots before lifting back up into the pose." } },
              { uid: "flow_p59", num: 59, title: "Hand in Hair", cue: "Lay 4 apple boxes or a large, firm cushion on the floor. Rest her upper body on top of it with hips on the edge and knees on the floor.", details: { expression: "Start with a soft smile, moving into a big, beautiful smile.", composition: "Fingertips to hips.", angles: "Lens is slightly below eye level.", tip: "When you elevate her upper body, you can drop the angle of the lens down, creating a more fashion look." } },
              { uid: "flow_p60", num: 60, title: "Hand Under Chin", cue: "Lay 4 apple boxes or a large, firm cushion on the floor. Have her rest her upper body on top of it with hips on the edge and knees on the floor.", details: { expression: "Start with a soft smile, moving into a big, beautiful smile.", composition: "Top of head to the hips.", angles: "Lens is slightly below eye level.", tip: "Body language is everything! Experiment with the angle of the chin and with connecting it to the shoulder as well as with the positioning of the hands and arms to create a variety of looks." } },
              { uid: "flow_p61", num: 61, title: "Legs on 45", cue: "Seat her on the floor, leaning on one hand. Bring feet and legs together and move them 45 degrees to camera.", details: { expression: "Start with her natural, relaxed expression. Then, add a soft smile.", composition: "Above the head to the knees. Just above the head to above the knees. Just above the head to just below the hips. Just above the head to the top of the hips.", angles: "Camera is below the chin and angled up a little bit. Start in front of her and move to the side. Move in closer.", tip: "When someone is leaning on one arm, it is easy to bunch the shoulder up. Bringing her onto her fingertips helps maintain space in the shoulder and neck area." } },
              { uid: "flow_p62", num: 62, title: "Arm on Knee", cue: "Seated on the floor with the legs together and 45 degrees from camera, bring the top leg up and lean the same elbow on it. The hand floats in space with soft fingers.", details: { expression: "Start with her natural, relaxed expression. Then bring in a soft smile.", composition: "Above the head to below the knees. Whole Body. Above the head to above the knees.", angles: "Camera is below the chin and angled up a little bit.", tip: "You never want to position the client’s hand up too high on the crotch. It just looks bad." } },
              { uid: "flow_p63", num: 63, title: "Look Back", cue: "Seated on the floor with both legs together and 90 degrees from camera, instruct her to soften her back without rolling the shoulders too far forward. Bring the chin all the way around to camera.", details: { expression: "This is her natural, relaxed expression.", composition: "Her whole body, cropping above the head. Just above the head to the elbow. Just above the head to above the elbow.", angles: "Camera is below the chin and angled up a little bit.", tip: "I don’t usually make it about the legs in the seated rotation. It’s all about the upper body for me." } },
              { uid: "flow_p64", num: 64, title: "Little Cat", cue: "Lie her on the floor diagonally. Bring one knee forward to put a little bump in her backside.", details: { expression: "This is her natural, relaxed expression.", composition: "Above her head to the knee.", angles: "Camera is quite low – just below her chin. Move around all angles to see where she looks best.", tip: "Tuck the leg in over the calf, so that it makes a beautiful shape and doesn’t look cut off by disappearing from view." } },
              { uid: "flow_p65", num: 65, title: "Hand in Hair", cue: "Lie her on the floor diagonally. Bring one knee forward to put a little bump in her backside.", details: { expression: "Start with her natural, relaxed expression. Then, bring in a nice easy smile and a big, gorgeous smile.", composition: "Above the head to the knee.", angles: "Camera is at the chin or just a little above.", tip: "As we get older, we have less flexibility in the back and ability to lift up from the core in this pose. Be mindful of your client’s flexibility and level of comfort in this pose." } },
              { uid: "flow_p66", num: 66, title: "Hip Up", cue: "Lying on the floor, come up on one hip, resting the weight on the elbows. The top knee comes forward, bringing an hourglass shape into the hip.", details: { expression: "This is her natural, relaxed expression.", composition: "Above the head to just above the knee. Above the head to below the hip.", angles: "Begin shooting above her chin. Then, come below her chin, having her bring down her face to connect with camera.", tip: "When clients are lying on the floor like this, you need to describe to them how to lift up from their core to bring their bodies off the ground. Don’t keep them there too long." } },
            ],
          },
        ],
      },
      {
        id: "flow_table",
        name: "POSING TABLE",
        bases: [
          {
            id: "flow_table_base",
            name: "Full Flow",
            curated: true,
            flow: [
              { uid: "flow_p67", num: 67, title: "Folded Arms", cue: "Sitting at a pose table, face her straight to camera. Adjust the table height, so she can lean forward in a comfortable and flattering way.", details: { expression: "This is her natural, relaxed expression.", composition: "Top of the head to top of the table.", angles: "The lens is just below eye level with no tilt.", tip: "Using a posing table is a great way to get a wide variety of seated poses that incorporate the hands in a natural way." } },
              { uid: "flow_p68", num: 68, title: "One Arm Up", cue: "Sitting at a pose table, face her 45 degrees to camera. Bring chin to camera.", details: { expression: "This is her natural, relaxed expression.", composition: "Top of head to top of the table.", angles: "Camera is just below eye level, slightly tilted down.", tip: "Adding a fan will bring beautiful movement into the hair – a lovely complement to this pose." } },
              { uid: "flow_p69", num: 69, title: "Both Arms Up", cue: "Sitting at a pose table, face her straight to camera. Bring her elbows together with one hand coming up to the side of her neck and the other to the side of her face.", details: { expression: "This is her natural, relaxed expression.", composition: "Top of head to top of table.", angles: "Camera is just below eye level and slightly tilted down.", tip: "The easiest way to prevent hands from being dominant is to move them back so the side of the hand is pointed toward camera." } },
              { uid: "flow_p70", num: 70, title: "Variations", cue: "Sitting at a pose table, face her straight to camera. With elbows resting on the table, gently cup both hands to one side of the neck.", details: { expression: "This is her natural, relaxed expression.", composition: "Top of head to top of the table.", angles: "Camera is just below eye level and slightly tilted down.", tip: "Play with the hand position, looking for asymmetry and also at what looks most natural for the subject." } },
              { uid: "flow_p71", num: 71, title: "Folded Arms", cue: "Sitting at a pose table, bring both forearms to rest on the table just beneath the chin. Sit up nice and tall.", details: { expression: "Begin with a natural, relaxed expression and then bring in a nice, easy smile.", composition: "Above the head to below the arms.", angles: "Begin at 45 degrees to her. Then, come around to face her square on. Next go a little farther. Camera is slightly above her eyeline and angled a little down.", tip: "The table shouldn’t get higher than the breast line. Make sure it is below it." } },
              { uid: "flow_p72", num: 72, title: "One Arm Up", cue: "Sitting at a pose table, bring both forearms to rest on the table just beneath the chin. Sit up nice and tall.", details: { expression: "Start with a natural, relaxed expression and then bring in the smile.", composition: "Above the head to below the arms.", angles: "Camera is slightly above the eyes and tilted down.", tip: "When getting the client to relax their fingers, I always say “ballet hands.” It helps to wiggle the fingers to keep them activated." } },
              { uid: "flow_p73", num: 73, title: "Little Cat", cue: "Sitting at a pose table, bring one arm down across the table to reach to the corner of the table. Bring the table out a little so that she can really lean on it without squishing the bosom.", details: { expression: "Start with a little smile and then light it up.", composition: "Above her head to below her arms.", angles: "Bring the camera down with her as she moves down, staying just above her eyes and slightly tilted down.", tip: "Clients will face their hands toward the camera in this pose, but don’t let them. Put hands 45 degrees to camera." } },
              { uid: "flow_p74", num: 74, title: "Hand Under Chin", cue: "Sitting at a pose table, bring both forearms to rest on the table just beneath the chin. Sit up nice and tall.", details: { expression: "These are nice, easy smiles.", composition: "Above the head to below the arms.", angles: "Camera is slightly above the eyes and tilted down.", tip: "Get nice length in the neck and then come in over the hand to lean on it." } },
              { uid: "flow_p75", num: 75, title: "Variations", cue: "Adjust posing table so she can lean on her elbows without rolling her shoulders forward. Ideally, keep waist taper visible.", details: { expression: "This is her natural, relaxed expression.", composition: "Top of head to waist.", angles: "Camera is at chin level and slightly angled up.", tip: "These beauty shots are all about the styling. Choose wardrobe and accessories that highlight your subject’s unique personality." } },
              { uid: "flow_p76", num: 76, title: "Little Cat", cue: "Resting elbows on table, bring both hands toward one corner of the table at a diagonal. Rest one hand on top of the other with soft fingers.", details: { expression: "Start with a big laugh before moving to a soft smile.", composition: "Top of head to waist.", angles: "Camera is at chin level and slightly angled up. Move around the subject to capture her from various angles, especially from 45 degrees.", tip: "It is natural for the subject to scrunch up the shoulders in this pose, so be sure to encourage her to elongate the upper body and re-engage their core as you shoot." } },
              { uid: "flow_p77", num: 77, title: "One Hand Up", cue: "Have her lean over the table while maintaining a long torso. Resting elbows on the table, bring one forearm down to rest.", details: { expression: "Move from a soft smile to a big, beautiful smile.", composition: "Top of head to waist line.", angles: "Camera is at chin level and slightly angled up.", tip: "When incorporating hands into a portrait, to avoid them dominating the image, it’s important to have the subject move them around until they find a position that looks soft and natural." } },
              { uid: "flow_p78", num: 78, title: "Arms Crossed", cue: "Lean her elbows on a posing table. Tuck one forearm close to the body.", details: { expression: "This is her natural, relaxed expression.", composition: "Top of head to waist line.", angles: "Camera is at chin level and slightly angled up.", tip: "This pose is perfect for incorporating fun accessories like flowers, scarves, and bold jewelry – anything that will frame the face and decolletage." } },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "corporate_mens_poses",
    name: "Corporate Men’s Poses",
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
                cue: "Sit on the stool at 45°. Raise back foot. Hands together. Sit upright, Comp 4. Chin gently toward me.",
              },
              {
                uid: "pbm_set1_base1_step2",
                label: "Pose 2",
                cue: "Easy smile. Hold the posture Comp 3.",
              },
              {
                uid: "pbm_set1_base1_step3",
                label: "Pose 3",
                cue: "Lean a touch more onto the knee. Drop the back shoulder slightly. Chin forward. Soft smile. Comp 3",
              },
              {
                uid: "pbm_set1_base1_step4",
                label: "Pose 4",
                cue: "Relax the posture slightly. Turn the chin around to me. Comp 2",
              },
              {
                uid: "pbm_set1_base1_step5",
                label: "Pose 5",
                cue: "A little more smile — just in the eyes. Comp 4",
              },
              {
                uid: "pbm_set1_base1_step6",
                label: "Pose 6",
                cue: "Hands on the thigh. Easy smile. Hold still. Comp 4",
              },
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

const STORAGE_KEY = "pose_operator_state_v8";

/* Optional per-pose reference fields, shown on tap. Order matters. */
const DETAIL_FIELDS = [
  ["expression", "Expression"],
  ["composition", "Composition"],
  ["angles", "Angles"],
  ["tip", "Tip"],
];

const SPEECH_RATES = [
  { id: "slow", label: "Slow", rate: 0.8 },
  { id: "normal", label: "Normal", rate: 0.95 },
  { id: "brisk", label: "Brisk", rate: 1.15 },
];

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
function capitalizeFirst(s) {
  const t = String(s ?? "").trim();
  if (!t) return "";
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function normalizeCue(s) {
  const t = String(s ?? "").replace(/\r/g, "").trim();
  return capitalizeFirst(t);
}
function clientLine(stepIndex) {
  const lines = [
    "Hold that. Great.",
    "Nice — keep it still.",
    "Good. Small breath out.",
    "Perfect. Keep the shoulders soft.",
    "That’s it. Just that one change.",
    "Lovely. Stay right there.",
    "Good. Eyes soft, jaw relaxed.",
    "Great. Keep the shape.",
    "Hold. I’m shooting this.",
    "Perfect. Don’t move.",
  ];
  return lines[stepIndex % lines.length];
}

/* =========================================
   DEVICE-LOCAL REFERENCE IMAGES
   -----------------------------------------
   Photographs from a purchased guide are licensed to one person, so they must
   never enter the repo or the deployed bundle. They live only in this browser's
   IndexedDB, on this device, imported by hand. Nothing here is ever uploaded.
   ========================================= */
const IDB_NAME = "poseflow";
const IDB_STORE = "refimages";

function idbOpen() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(IDB_STORE)) {
        req.result.createObjectStore(IDB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbTx(db, mode) {
  return db.transaction(IDB_STORE, mode).objectStore(IDB_STORE);
}

async function idbPutMany(entries) {
  const db = await idbOpen();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, "readwrite");
    const store = tx.objectStore(IDB_STORE);
    for (const [key, blob] of entries) store.put(blob, key);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

async function idbReadAll() {
  const db = await idbOpen();
  const out = await new Promise((resolve, reject) => {
    const store = idbTx(db, "readonly");
    const keysReq = store.getAllKeys();
    const valsReq = store.getAll();
    let keys = null;
    let vals = null;
    const done = () => {
      if (keys && vals) {
        const m = new Map();
        keys.forEach((k, i) => m.set(String(k), vals[i]));
        resolve(m);
      }
    };
    keysReq.onsuccess = () => { keys = keysReq.result; done(); };
    valsReq.onsuccess = () => { vals = valsReq.result; done(); };
    keysReq.onerror = () => reject(keysReq.error);
    valsReq.onerror = () => reject(valsReq.error);
  });
  db.close();
  return out;
}

/* One-time migration.
   The first version stored images under a bare pose number ("94"). Now that a
   second genre exists, keys are namespaced "<genre>:<num>". Any bare key is a
   Beauty image from before, so move it to "beauty:<num>" and delete the old
   one. Runs on every load but does nothing once migrated. */
async function idbMigrateLegacy() {
  const db = await idbOpen();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, "readwrite");
    const store = tx.objectStore(IDB_STORE);
    const req = store.openCursor();
    req.onsuccess = () => {
      const cur = req.result;
      if (!cur) return;
      const key = String(cur.key);
      if (!key.includes(":") && /^\d+$/.test(key)) {
        store.put(cur.value, `beauty:${key}`);
        store.delete(cur.key);
      }
      cur.continue();
    };
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

async function idbClearAll() {
  const db = await idbOpen();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, "readwrite");
    tx.objectStore(IDB_STORE).clear();
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

/* Known genre prefixes a filename may carry. */
const IMG_PREFIXES = ["beauty", "flow", "men"];

/* Parse an imported filename into { prefix, num }.
   "flow-009.jpg" -> {flow, 9} ; "beauty-94.jpg" -> {beauty, 94} ;
   "pose-094.jpg" / "94.jpg" -> {null, 94} (prefix supplied by caller). */
function parseImageFilename(name) {
  const base = String(name).toLowerCase();
  const num = (() => {
    const m = base.match(/(\d{1,3})(?!.*\d)/);
    if (!m) return null;
    const n = parseInt(m[1], 10);
    return Number.isFinite(n) && n > 0 ? n : null;
  })();
  if (num == null) return { prefix: null, num: null };
  const prefix = IMG_PREFIXES.find((p) => base.includes(p)) ?? null;
  return { prefix, num };
}

function imgKey(prefix, num) {
  return `${prefix}:${num}`;
}

function useDeviceImages() {
  const [urls, setUrls] = useState(() => new Map()); // "genre:num" -> objectURL
  const [ready, setReady] = useState(false);
  const urlsRef = useRef(new Map());

  const revokeAll = useCallback(() => {
    for (const u of urlsRef.current.values()) URL.revokeObjectURL(u);
    urlsRef.current = new Map();
  }, []);

  const load = useCallback(async () => {
    try {
      await idbMigrateLegacy();
      const blobs = await idbReadAll();
      revokeAll();
      const next = new Map();
      for (const [key, blob] of blobs) next.set(key, URL.createObjectURL(blob));
      urlsRef.current = next;
      setUrls(next);
    } catch {
      /* IndexedDB blocked (private mode). App still runs on bundled sketches. */
    } finally {
      setReady(true);
    }
  }, [revokeAll]);

  useEffect(() => {
    load();
    return () => revokeAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* defaultPrefix is the currently selected genre's prefix, used when a
     filename carries no genre of its own. */
  const importFiles = useCallback(
    async (fileList, defaultPrefix) => {
      const entries = [];
      const skipped = [];
      for (const f of Array.from(fileList || [])) {
        const { prefix, num } = parseImageFilename(f.name);
        if (num == null) { skipped.push(f.name); continue; }
        entries.push([imgKey(prefix ?? defaultPrefix ?? "beauty", num), f]);
      }
      if (entries.length) await idbPutMany(entries);
      await load();
      return { added: entries.length, skipped };
    },
    [load]
  );

  const clearAll = useCallback(async () => {
    await idbClearAll();
    revokeAll();
    setUrls(new Map());
  }, [revokeAll]);

  return { urls, ready, importFiles, clearAll };
}

/* =========================================
   SPEECH (Web Speech API)
   ========================================= */
const speechSupported = () =>
  typeof window !== "undefined" && "speechSynthesis" in window;

function useVoices() {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    if (!speechSupported()) return;
    const load = () => {
      const list = window.speechSynthesis.getVoices() || [];
      setVoices(list.filter((v) => String(v.lang || "").startsWith("en")));
    };
    load();
    window.speechSynthesis.addEventListener?.("voiceschanged", load);
    // Safari sometimes populates late without firing the event.
    const t = setTimeout(load, 400);
    return () => {
      window.speechSynthesis.removeEventListener?.("voiceschanged", load);
      clearTimeout(t);
    };
  }, []);

  return voices;
}

/* =========================================
   CSS
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
        --radius2: 28px;
        --grad: linear-gradient(90deg,#4f46e5,#d946ef,#fb7185);
        --bg: linear-gradient(135deg,#fff7fb,#ffffff,#f2f6ff);
        --topH: 140px;
        --bottomH: 96px;
        --prepStickyTop: 10px;
      }

      *{ box-sizing:border-box; }
      html, body{ min-height:100%; }
      body{
        margin:0;
        background:var(--bg);
        color:var(--ink);
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
        overflow-y: auto;
      }

      .wrap{
        max-width: 980px;
        margin: 0 auto;
        padding: 18px 16px calc(64px + env(safe-area-inset-bottom));
      }

      .pill{ display:inline-flex; align-items:center; gap:8px; padding:6px 10px; border:1px solid var(--line); background:rgba(255,255,255,.85); border-radius:999px; font-size:12px; color:var(--muted); box-shadow: 0 2px 10px rgba(15,23,42,.06); }
      .dot{ width:8px; height:8px; border-radius:999px; background:#f59e0b; }

      .h1{ font-size: clamp(26px, 3.8vw, 52px); line-height: 1.02; margin: 12px 0 8px; letter-spacing:-0.03em; }
      .sub{ margin:0; font-size: 16px; color: var(--muted); }

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

      .countdown{
        margin-top: 8px;
        display:flex;
        align-items:center;
        gap: 10px;
      }
      .countBar{
        flex:1;
        height: 6px;
        border-radius: 999px;
        background: rgba(15,23,42,.06);
        border: 1px solid var(--line);
        overflow:hidden;
      }
      .countFill{
        height:100%;
        width: 0%;
        background: var(--ink);
        opacity: .55;
        border-radius: 999px;
        transition: width .12s linear;
      }
      .countNum{
        font-size: 12px;
        font-weight: 900;
        color: var(--muted);
        min-width: 30px;
        text-align: right;
        font-variant-numeric: tabular-nums;
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
        padding: 16px;
      }

      /* Layout rule:
         - Mobile: text first, image below
         - Desktop: text left, image right */
      .stageInner{
        height:100%;
        display:flex;
        flex-direction: column;
        gap: 14px;
      }
      @media (min-width: 860px){
        .stageInner{
          display:grid;
          grid-template-columns: 1fr 360px;
          gap: 18px;
          align-items: start;
        }
      }

      .importRow{
        display:flex;
        align-items:center;
        gap: 12px;
        flex-wrap: wrap;
        margin-top: 12px;
      }
      .importBtn{ cursor:pointer; display:inline-flex; align-items:center; }
      .coverage{ font-size: 13px; color: var(--muted); }
      .coverage strong{ color: var(--ink); font-weight: 950; }
      .importMsg{
        margin-top: 10px;
        font-size: 13px;
        color: var(--muted);
        background: rgba(15,23,42,.04);
        border: 1px solid var(--line);
        border-radius: 12px;
        padding: 8px 12px;
      }

      .cueMeta{
        display:flex;
        align-items:center;
        flex-wrap:wrap;
        gap: 8px;
        margin-bottom: 10px;
      }
      .poseTitle{
        font-size: 13px;
        font-weight: 900;
        letter-spacing: .04em;
        text-transform: uppercase;
        color: var(--muted);
        margin-bottom: 6px;
      }
      .details{ margin-top: 12px; }
      .detailsToggle{
        appearance:none;
        border: 1px solid var(--line);
        background: rgba(15,23,42,.03);
        color: var(--ink);
        font-weight: 900;
        font-size: 13px;
        padding: 8px 14px;
        border-radius: 999px;
        cursor: pointer;
      }
      .detailsBody{
        margin-top: 10px;
        display:flex;
        flex-direction: column;
        gap: 10px;
      }
      .detailRow{
        border: 1px solid var(--line);
        border-radius: 14px;
        background: rgba(255,255,255,.7);
        padding: 10px 12px;
      }
      .detailLabel{
        font-size: 11px;
        font-weight: 950;
        letter-spacing: .04em;
        text-transform: uppercase;
        color: var(--muted);
        margin-bottom: 3px;
      }
      .detailText{ font-size: 15px; line-height: 1.4; color: var(--ink); }
      .poseNum{
        font-size: 12px;
        font-weight: 950;
        color: var(--ink);
        letter-spacing: .01em;
      }
      .poseOf{ font-weight: 800; color: var(--muted); }
      .badge{
        font-size: 11px;
        font-weight: 900;
        padding: 4px 10px;
        border-radius: 999px;
        border: 1px solid var(--line);
        white-space: nowrap;
      }
      .badgeComp{
        background: rgba(79,70,229,.10);
        border-color: rgba(79,70,229,.28);
        color: #4338ca;
      }
      .badgeNote{
        background: rgba(15,23,42,.05);
        color: var(--muted);
      }

      .refPanel{
        border-radius: 22px;
        border:1px solid var(--line);
        background: rgba(255,255,255,.95);
        box-shadow: var(--shadow2);
        padding: 12px;
        display:flex;
        align-items:center;
        justify-content:center;
        min-height: 240px;
        position: relative;
      }
      .refTag{
        position:absolute;
        left: 12px; right: 12px; bottom: 12px;
        padding: 6px 10px;
        border-radius: 999px;
        background: rgba(15,23,42,.82);
        color: #fff;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: .01em;
        text-align:center;
        pointer-events:none;
      }
      .refPanel img{
        width: 100%;
        height: auto;
        object-fit: contain;
        border-radius: 14px;
      }

      .cue{
        font-weight: 950;
        letter-spacing: -0.02em;
        white-space: pre-line;
        word-break: break-word;
      }
      .cue.t1{ font-size: clamp(26px, 4.6vw, 60px); line-height: 1.07; }
      .cue.t2{ font-size: clamp(22px, 4.0vw, 50px); line-height: 1.09; }
      .cue.t3{ font-size: clamp(18px, 3.4vw, 40px); line-height: 1.11; }
      .cue.t4{ font-size: clamp(16px, 3.0vw, 34px); line-height: 1.14; }

      .client{
        margin-top: 12px;
        padding: 12px 14px;
        border-radius: 18px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,.94);
        box-shadow: 0 10px 22px rgba(15,23,42,.06);
      }
      .clientLabel{ font-size:12px; font-weight: 900; color: var(--muted); }
      .clientText{ margin-top:6px; font-size: 16px; font-weight: 900; line-height: 1.2; }

      .nextBox{
        margin-top: 14px;
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

      .hint{ margin-top: 12px; font-size: 13px; color: var(--muted); }

      /* Tap zone: only used while flow is active (NOT over) */
      .tapZone{
        position:absolute; inset:0;
        cursor: pointer;
        z-index: 0;
      }
      .stageInner, .cueWrap, .refPanel{
        position: relative;
        z-index: 1;
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

      /* -------------------------------
         MOBILE FIX (your request)
         - Image must NOT dominate
         - Text remains readable
         - No overlap
         - Desktop untouched
         -------------------------------- */
      @media (max-width: 859px){
        /* The selection panel stacks to one column on a phone, which makes it
           taller than the viewport. Sticky positioning then pins it and nothing
           below (import card, rehearsal plan) can be scrolled to. */
        .prepSticky{
          position: static;
          box-shadow: var(--shadow2);
        }

        /* Ensure text uses full width and doesn't get "column" boxed */
        .cueWrap{
          width: 100%;
          max-width: 100%;
          /* Text gets what it needs up to a cap; the photo takes the rest. */
          flex: 0 1 auto;
          min-height: 0;
          max-height: 38vh;
          overflow: auto;
          padding-right: 6px;
        }


        /* The photo takes all remaining height and is always shown whole.
           height:100% + object-fit:contain means it scales to fit rather than
           being clipped by the panel's overflow. */
        .refPanel{
          width: 100%;
          flex: 1 1 auto;
          min-height: 34vh;
          max-height: none;
          overflow: hidden;
          padding: 8px;
        }

        .refPanel img{
          width: 100%;
          height: 100%;
          min-height: 0;
          max-height: none;
          object-fit: contain;
          display: block;
        }
      }

      /* Small-screen tweaks */
      @media (max-width: 520px){
        .topInner{ padding: 10px 10px; }
        .topControls{ gap: 8px; }
        .toggle{ padding: 6px 8px; font-size: 12px; }
        .control{ height: 44px; }
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

  const GENRES = useMemo(() => BASE_GENRES, []);

  const [mode, setMode] = useState("prep"); // prep | session
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const pushToast = useCallback((msg) => {
    setToast(String(msg));
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const [showOnboarding, setShowOnboarding] = useState(() => {
    const seen = persisted?.seenOnboarding;
    return !seen;
  });
  const [showHelp, setShowHelp] = useState(false);

  const fallbackGenreId = GENRES?.[0]?.id ?? "womens_poses";
  const [genreId, setGenreId] = useState(
    () => persisted?.lastSelection?.genreId ?? fallbackGenreId
  );
  const genre = useMemo(
    () => GENRES.find((g) => g.id === genreId) ?? GENRES[0] ?? null,
    [GENRES, genreId]
  );

  const [setId, setSetId] = useState(() => {
    const byLast = persisted?.lastSelection?.setId;
    if (byLast && genre?.sets?.some((s) => s.id === byLast)) return byLast;
    return genre?.sets?.[0]?.id ?? "";
  });

  const selectedSet = useMemo(
    () => genre?.sets?.find((s) => s.id === setId) ?? genre?.sets?.[0] ?? null,
    [genre, setId]
  );

  const [showFullLibrary, setShowFullLibrary] = useState(
    !!persisted?.showFullLibrary
  );

  const availableBases = useMemo(() => {
    const bases = selectedSet?.bases ?? [];
    if (showFullLibrary) return bases;
    const curated = bases.filter((b) => b.curated);
    return curated.length ? curated : bases;
  }, [selectedSet, showFullLibrary]);

  const [baseId, setBaseId] = useState(() => {
    const basesAll = selectedSet?.bases ?? [];
    const byLast = persisted?.lastSelection?.baseId;
    if (byLast && basesAll.some((b) => b.id === byLast)) return byLast;
    return availableBases?.[0]?.id ?? "";
  });

  useEffect(() => {
    const basesAll = selectedSet?.bases ?? [];
    const byLast = persisted?.lastSelection?.baseId;
    if (byLast && basesAll.some((b) => b.id === byLast)) {
      setBaseId(byLast);
      return;
    }
    setBaseId(availableBases?.[0]?.id ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setId, selectedSet?.bases, availableBases]);

  const selectedBase = useMemo(() => {
    const all = selectedSet?.bases ?? [];
    return all.find((b) => b.id === baseId) ?? availableBases?.[0] ?? null;
  }, [selectedSet, baseId, availableBases]);

  const flow = useMemo(() => selectedBase?.flow ?? [], [selectedBase]);

  const [idx, setIdx] = useState(0);
  const [isOver, setIsOver] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

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
  const [showClientWording, setShowClientWording] = useState(
    persisted?.showClientWording ?? true
  );

  /* Reference photographs stored on this device only */
  const deviceImages = useDeviceImages();
  const [importMsg, setImportMsg] = useState(null);

  /* Speech */
  const voices = useVoices();
  const canSpeak = speechSupported();
  const [speakOn, setSpeakOn] = useState(persisted?.speakOn ?? false);
  const [speechRateId, setSpeechRateId] = useState(
    persisted?.speechRateId ?? "normal"
  );
  const [voiceURI, setVoiceURI] = useState(persisted?.voiceURI ?? "");
  const speechRate = useMemo(
    () =>
      SPEECH_RATES.find((r) => r.id === speechRateId) ?? SPEECH_RATES[1],
    [speechRateId]
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
    pushToast("Restarted.");
  }, [pushToast]);

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

  /* Auto-advance + countdown.
     `idx` MUST be in the deps: without it the effect never re-runs after the
     timer fires, so auto-advance would move exactly one step and then stop. */
  const [remainingMs, setRemainingMs] = useState(null);

  useEffect(() => {
    if (mode !== "session" || !autoOn || isOver || !flow.length) {
      setRemainingMs(null);
      return;
    }

    const total = (rhythm?.seconds ?? 8) * 1000;
    const startedAt = Date.now();
    setRemainingMs(total);

    const tick = setInterval(() => {
      const left = total - (Date.now() - startedAt);
      if (left > 0) {
        setRemainingMs(left);
        return;
      }
      clearInterval(tick);
      setRemainingMs(0);
      setIdx((prev) => {
        const ni = prev + 1;
        if (ni >= flow.length) {
          setIsOver(true);
          setAutoOn(false);
          return prev;
        }
        return ni;
      });
    }, 100);

    return () => clearInterval(tick);
  }, [mode, autoOn, isOver, flow.length, rhythm, idx]);

  const countdownPct = useMemo(() => {
    if (remainingMs == null) return 0;
    const total = (rhythm?.seconds ?? 8) * 1000;
    return clamp(Math.round((remainingMs / total) * 100), 0, 100);
  }, [remainingMs, rhythm]);

  /* Speak the current cue */
  const speak = useCallback(
    (text) => {
      if (!canSpeak) return;
      const line = String(text ?? "").trim();
      if (!line) return;

      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(line);
      u.rate = speechRate?.rate ?? 0.95;
      u.pitch = 1;
      const v = voices.find((x) => x.voiceURI === voiceURI);
      if (v) {
        u.voice = v;
        u.lang = v.lang;
      }
      window.speechSynthesis.speak(u);
    },
    [canSpeak, speechRate, voices, voiceURI]
  );

  const stopSpeaking = useCallback(() => {
    if (!canSpeak) return;
    window.speechSynthesis.cancel();
  }, [canSpeak]);

  /* Which step we've already read out. Stops the cue being spoken twice when
     the toggle primes audio and this effect then fires for the same step, and
     stops a re-read when only the voice or speed changes. */
  const spokenKeyRef = useRef(null);

  useEffect(() => {
    if (!speakOn) return;
    if (mode !== "session") return;
    if (isOver) {
      stopSpeaking();
      return;
    }
    const key = current?.uid ?? String(idx);
    if (spokenKeyRef.current === key) return;
    spokenKeyRef.current = key;
    speak(normalizeCue(current?.cue ?? ""));
  }, [speakOn, mode, isOver, idx, current?.uid, current?.cue, speak, stopSpeaking]);

  /* Never leave a voice running behind us */
  useEffect(() => {
    if (mode !== "session" || !speakOn) stopSpeaking();
  }, [mode, speakOn, stopSpeaking]);

  useEffect(() => () => stopSpeaking(), [stopSpeaking]);

  /* Keep the screen awake during a session.
     Without this the phone locks between shots and you land on the passcode
     screen instead of your next cue. */
  const wakeLockRef = useRef(null);

  useEffect(() => {
    if (mode !== "session") return;
    if (typeof navigator === "undefined" || !navigator.wakeLock) return;

    let cancelled = false;

    const acquire = async () => {
      if (document.visibilityState !== "visible") return;
      if (wakeLockRef.current) return;
      try {
        const lock = await navigator.wakeLock.request("screen");
        if (cancelled) {
          lock.release().catch(() => {});
          return;
        }
        wakeLockRef.current = lock;
        lock.addEventListener?.("release", () => {
          wakeLockRef.current = null;
        });
      } catch {
        /* Denied (low battery, unsupported). Session still works. */
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") acquire();
    };

    acquire();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibility);
      wakeLockRef.current?.release?.().catch(() => {});
      wakeLockRef.current = null;
    };
  }, [mode]);

  /* Only reset flow when in PREP */
  useEffect(() => {
    if (mode !== "prep") return;
    setIdx(0);
    setIsOver(false);
    setAutoOn(false);
  }, [genreId, setId, baseId, mode]);

  /* Collapse the details panel whenever the step changes. */
  useEffect(() => {
    setShowDetails(false);
  }, [current?.uid]);

  /* Image priority:
     1. a photograph imported to this device for this exact pose number
     2. a sketch the step carries itself (setup genuinely changed)
     3. the base sketch, labelled so it isn't mistaken for the current step */
  const genreImgPrefix = genre?.imgPrefix ?? "beauty";

  const deviceImg = useMemo(
    () =>
      current?.num != null
        ? deviceImages.urls.get(imgKey(genreImgPrefix, current.num)) ?? null
        : null,
    [current?.num, genreImgPrefix, deviceImages.urls]
  );

  const currentImg = useMemo(
    () => deviceImg ?? current?.img ?? selectedBase?.img ?? null,
    [deviceImg, current?.img, selectedBase?.img]
  );

  const hasAnyImagesInFlow = useMemo(
    () =>
      !!selectedBase?.img ||
      (flow || []).some(
        (s) =>
          !!s?.img ||
          (s?.num != null &&
            deviceImages.urls.has(imgKey(genreImgPrefix, s.num)))
      ),
    [selectedBase?.img, flow, genreImgPrefix, deviceImages.urls]
  );

  const imgIsBaseReference = useMemo(() => {
    if (!currentImg) return false;
    if (deviceImg) return false;
    if (idx === 0) return false;
    return !current?.img && currentImg === selectedBase?.img;
  }, [currentImg, deviceImg, current?.img, selectedBase?.img, idx]);

  /* How much of this genre is covered by imported photographs. */
  const deviceCoverage = useMemo(() => {
    const nums = new Set();
    for (const s of genre?.sets ?? [])
      for (const b of s.bases ?? [])
        for (const st of b.flow ?? []) if (st?.num != null) nums.add(st.num);
    let have = 0;
    for (const n of nums)
      if (deviceImages.urls.has(imgKey(genreImgPrefix, n))) have++;
    return { have, total: nums.size };
  }, [genre, genreImgPrefix, deviceImages.urls]);

  const rehearsalPlan = useMemo(() => {
    const sets = genre?.sets ?? [];
    const usable = sets.slice(0, Math.min(5, sets.length));
    const dayItems = usable.map((s, i) => ({
      day: `Day ${i + 1}`,
      text: `${s.name} — run 3 times`,
    }));

    if (usable.length >= 2) {
      dayItems.push({
        day: `Day ${usable.length + 1}`,
        text: `Full session (${usable.map((x) => x.name).join(", ")}) once — slow`,
      });
      dayItems.push({
        day: `Day ${usable.length + 2}`,
        text: `Full session once — normal pace`,
      });
    }
    while (dayItems.length < 7) {
      dayItems.push({
        day: `Day ${dayItems.length + 1}`,
        text: `Repeat your weakest set — run 3 times`,
      });
    }
    return dayItems.slice(0, 7);
  }, [genre]);

  useEffect(() => {
    const payload = {
      showFullLibrary,
      lastSelection: { genreId, setId, baseId },
      showRefImage,
      showNextPreview,
      showClientWording,
      speakOn,
      speechRateId,
      voiceURI,
      seenOnboarding: !showOnboarding
        ? true
        : persisted?.seenOnboarding ?? false,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    showFullLibrary,
    genreId,
    setId,
    baseId,
    showRefImage,
    showNextPreview,
    showClientWording,
    speakOn,
    speechRateId,
    voiceURI,
    showOnboarding,
  ]);

  const beginSession = () => {
    setMode("session");
    setIdx(0);
    setIsOver(false);
    setAutoOn(false);
    pushToast("Session started. Use Next / Back.");
  };

  const exitSession = () => {
    stopSpeaking();
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
    setGenreId(fallbackGenreId);
    const firstSet =
      GENRES.find((g) => g.id === fallbackGenreId)?.sets?.[0]?.id ?? "";
    setSetId(firstSet);
    setBaseId("");
    setShowRefImage(true);
    setShowNextPreview(true);
    setShowClientWording(true);
    stopSpeaking();
    setSpeakOn(false);
    setSpeechRateId("normal");
    setVoiceURI("");
    setMode("prep");
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

  const importCardRef = useRef(null);

  /* Measure top/bottom bars */
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

  return (
    <>
      <Styles />

      {/* Onboarding */}
      {mode === "prep" && showOnboarding && (
        <div
          className="overlay"
          role="dialog"
          aria-modal="true"
          aria-label="How this works"
        >
          <div className="modal">
            <div className="modalInner">
              <div className="modalTitle">How this works (quick)</div>
              <div className="modalBody">
                This tool shows a base pose, then a flow of small adjustments step-by-step.
                You don’t need to memorise a full session.
              </div>
              <ul className="modalList">
                <li>
                  <strong>Genre</strong> = your shoot library.
                </li>
                <li>
                  <strong>Set</strong> = your setup (stool, wall, table…).
                </li>
                <li>
                  <strong>Base</strong> = starting pose for that setup.
                </li>
                <li>
                  Press <strong>Begin session</strong>, then use{" "}
                  <strong>Next</strong> / <strong>Back</strong>.
                </li>
              </ul>
              <div className="modalActions">
                <button
                  className="btn"
                  onClick={() => {
                    setShowOnboarding(false);
                    pushToast("Tip: Help is available anytime.");
                  }}
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Help">
          <div className="modal">
            <div className="modalInner">
              <div className="modalTitle">Help</div>
              <div className="modalBody">
                <strong>Base pose → flow:</strong> start with the base, then make small adjustments step-by-step.
              </div>
              <ul className="modalList">
                <li><strong>Next / Back</strong> changes the cue.</li>
                <li><strong>Auto-advance</strong> moves forward on a timer, with a countdown bar showing seconds left.</li>
                <li><strong>Speak cues</strong> reads each cue out loud, so you can practise with the camera up instead of reading the screen. Pick a voice and speed, or press <strong>Say again</strong> to repeat.</li>
                <li><strong>Client wording</strong> gives short phrases you can say while posing.</li>
                <li><strong>Image</strong> shows the reference image when available.</li>
              </ul>
              <div className="modalActions">
                <button className="btn btnPrimary" onClick={() => setShowHelp(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast ? (
        <div className="toastWrap" aria-live="polite" aria-atomic="true">
          <div className="toast">{toast}</div>
        </div>
      ) : null}

      {/* PREP */}
      {mode === "prep" && (
        <div className="wrap">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div className="pill">
              <span className="dot" />
              Prep
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button
                className="btn"
                style={{ height: 34, borderRadius: 999, padding: "0 12px" }}
                onClick={() =>
                  importCardRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                title="Jump to reference photographs"
                aria-label="Jump to reference photographs"
              >
                Images
              </button>
              <button
                className="btn"
                style={{ height: 34, borderRadius: 999, padding: "0 12px" }}
                onClick={() => setShowHelp(true)}
                title="Help"
                aria-label="Open help"
              >
                Help
              </button>
              <button
                className="btn"
                style={{ height: 34, borderRadius: 999, padding: "0 12px" }}
                onClick={resetApp}
                title="Reset app (clears saved state)"
                aria-label="Reset app"
              >
                Reset
              </button>
            </div>
          </div>

          <h1 className="h1">Pose Flow Operator</h1>
          <p className="sub">Base pose → a flow of small movements, step-by-step.</p>

          {noData ? (
            <div className="warn">
              DATA ERROR: GENRES is empty. Check App.jsx has the BASE_GENRES array.
            </div>
          ) : null}

          <div className="prepSticky" aria-label="Pose selection controls">
            <div className="prepStickyInner">
              <div className="grid">
                <div>
                  <div className="label">Genre</div>
                  <select
                    className="control"
                    value={genreId}
                    onChange={(e) => setGenreId(e.target.value)}
                  >
                    {GENRES.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                  <div className="helper">Pick the library you want to practice or run during a shoot.</div>
                </div>

                <div>
                  <div className="label">Set</div>
                  <select
                    className="control"
                    value={setId}
                    onChange={(e) => setSetId(e.target.value)}
                  >
                    {(genre?.sets ?? []).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <div className="helper">This matches your lighting/background/prop setup.</div>
                </div>

                <div>
                  <div className="label">Base</div>
                  <select
                    className="control"
                    value={baseId}
                    onChange={(e) => setBaseId(e.target.value)}
                  >
                    {availableBases.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>

                  <div className="row">
                    <label
                      className="check"
                      title="Off = curated bases only. On = all bases in this set."
                      aria-label="Show full library"
                    >
                      <input
                        type="checkbox"
                        checked={showFullLibrary}
                        onChange={(e) => setShowFullLibrary(e.target.checked)}
                      />
                      Show full library
                    </label>
                  </div>

                  <div className="footerActions">
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

                  {!flow.length ? (
                    <div className="warn" style={{ marginTop: 12 }}>
                      This base has no steps. Choose another base.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="card" ref={importCardRef} style={{ scrollMarginTop: 12 }}>
            <div className="cardInner">
              <div
                className="label"
                style={{ fontSize: 14, fontWeight: 950, color: "var(--ink)" }}
              >
                Reference photographs
              </div>
              <p className="sub" style={{ marginTop: 6 }}>
                Stored on this device only — never uploaded, never part of the
                published site. Photos are matched to poses by the number in the
                filename and attach to the genre selected above (
                <strong>{genre?.name ?? "this genre"}</strong>). Filenames that
                name their genre — <code>flow-009.jpg</code> — always go to that
                genre regardless of what’s selected.
              </p>

              <div className="importRow">
                <label className="btn btnPrimary importBtn">
                  Import images
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                    onChange={async (e) => {
                      const files = e.target.files;
                      if (!files?.length) return;
                      const { added, skipped } = await deviceImages.importFiles(
                        files,
                        genreImgPrefix
                      );
                      e.target.value = "";
                      setImportMsg(
                        `Imported ${added} image${added === 1 ? "" : "s"}.` +
                          (skipped.length
                            ? ` Skipped ${skipped.length} with no pose number in the filename.`
                            : "")
                      );
                      pushToast(`Imported ${added} image${added === 1 ? "" : "s"}.`);
                    }}
                  />
                </label>

                <div className="coverage">
                  <strong>{deviceCoverage.have}</strong> of {deviceCoverage.total}{" "}
                  poses in {genre?.name ?? "this genre"} have a photograph.
                </div>

                {deviceCoverage.have > 0 ? (
                  <button
                    className="btn"
                    onClick={async () => {
                      await deviceImages.clearAll();
                      setImportMsg(null);
                      pushToast("Removed all imported images from this device.");
                    }}
                    title="Delete every imported photograph from this device"
                  >
                    Remove all
                  </button>
                ) : null}
              </div>

              {importMsg ? <div className="importMsg">{importMsg}</div> : null}
            </div>
          </div>

          <div className="card">
            <div className="cardInner">
              <div
                className="label"
                style={{ fontSize: 14, fontWeight: 950, color: "var(--ink)" }}
              >
                7-day rehearsal plan
              </div>
              <p className="sub" style={{ marginTop: 6 }}>
                Practice before shoots: each day is simple and repeatable. Built from{" "}
                <strong>{genre?.name ?? "this genre"}</strong>.
              </p>

              <div className="planGrid">
                {rehearsalPlan.map((x) => (
                  <div key={x.day} className="planItem">
                    <div className="planDay">{x.day}</div>
                    <div className="planText">{x.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SESSION */}
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

                  {autoOn && !isOver && remainingMs != null ? (
                    <div className="countdown" aria-live="off">
                      <div className="countBar">
                        <div
                          className="countFill"
                          style={{ width: `${countdownPct}%` }}
                        />
                      </div>
                      <div className="countNum">
                        {Math.ceil(remainingMs / 1000)}s
                      </div>
                    </div>
                  ) : null}
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

                  <label
                    className="toggle"
                    title={
                      canSpeak
                        ? "Read each cue out loud so you can practise with the camera up."
                        : "This browser has no speech synthesis."
                    }
                    aria-label="Toggle spoken cues"
                  >
                    <input
                      type="checkbox"
                      checked={speakOn && canSpeak}
                      disabled={!canSpeak}
                      onChange={(e) => {
                        const on = e.target.checked;
                        setSpeakOn(on);
                        if (on) {
                          // Speaking inside the click unlocks audio on iOS/Safari.
                          spokenKeyRef.current = current?.uid ?? String(idx);
                          speak(normalizeCue(current?.cue ?? ""));
                        } else {
                          spokenKeyRef.current = null;
                          stopSpeaking();
                        }
                      }}
                    />
                    Speak cues
                  </label>

                  {speakOn && canSpeak ? (
                    <>
                      <select
                        className="control"
                        style={{ height: 42, width: 150, marginTop: 0 }}
                        value={speechRateId}
                        onChange={(e) => setSpeechRateId(e.target.value)}
                        title="How fast the cue is read out."
                        aria-label="Select speaking speed"
                      >
                        {SPEECH_RATES.map((r) => (
                          <option key={r.id} value={r.id}>
                            Voice: {r.label}
                          </option>
                        ))}
                      </select>

                      {voices.length ? (
                        <select
                          className="control"
                          style={{ height: 42, width: 190, marginTop: 0 }}
                          value={voiceURI}
                          onChange={(e) => setVoiceURI(e.target.value)}
                          title="Which system voice reads the cue."
                          aria-label="Select voice"
                        >
                          <option value="">Default voice</option>
                          {voices.map((v) => (
                            <option key={v.voiceURI} value={v.voiceURI}>
                              {v.name}
                            </option>
                          ))}
                        </select>
                      ) : null}

                      <button
                        className="btn"
                        onClick={() => speak(normalizeCue(current?.cue ?? ""))}
                        disabled={isOver}
                        title="Say the current cue again"
                        aria-label="Repeat current cue"
                      >
                        Say again
                      </button>
                    </>
                  ) : null}

                  <label className="toggle" title={hasAnyImagesInFlow ? "Show the reference image when available." : "No images available for this flow."} aria-label="Toggle reference image">
                    <input type="checkbox" checked={showRefImage} onChange={(e) => setShowRefImage(e.target.checked)} disabled={hasAnyImagesInFlow ? false : true} />
                    Image
                  </label>

                  <label className="toggle" title="Show the next cue preview." aria-label="Toggle next cue preview">
                    <input type="checkbox" checked={showNextPreview} onChange={(e) => setShowNextPreview(e.target.checked)} />
                    Next preview
                  </label>

                  <label className="toggle" title="Show short client-facing lines you can say while posing." aria-label="Toggle client wording">
                    <input type="checkbox" checked={showClientWording} onChange={(e) => setShowClientWording(e.target.checked)} />
                    Client wording
                  </label>

                  <button className="btn" onClick={() => setShowHelp(true)} title="Help" aria-label="Help">
                    Help
                  </button>

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
                {/* Tap zone ONLY while not over (so Restart always works) */}
                {!isOver && (
                  <div
                    className="tapZone"
                    onClick={advance}
                    role="button"
                    tabIndex={0}
                    aria-label="Advance to next cue"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        advance();
                      }
                      if (e.key === "ArrowRight") {
                        e.preventDefault();
                        advance();
                      }
                      if (e.key === "ArrowLeft") {
                        e.preventDefault();
                        back();
                      }
                    }}
                  />
                )}

                <div className="stageInner">
                  <div className="cueWrap">
                    {!isOver ? (
                      <>
                        <div className="cueMeta">
                          <span className="poseNum">
                            {current?.num != null
                              ? `Pose ${current.num}`
                              : "Base pose"}
                            <span className="poseOf"> · {stepNow} of {flow.length}</span>
                          </span>

                          {/* Camera instructions — never spoken aloud. */}
                          {current?.comp != null ? (
                            <span className="badge badgeComp" title="Composition">
                              Comp {current.comp}
                            </span>
                          ) : null}
                          {current?.note ? (
                            <span className="badge badgeNote" title="Camera note">
                              {current.note}
                            </span>
                          ) : null}
                        </div>

                        {current?.title ? (
                          <div className="poseTitle">{current.title}</div>
                        ) : null}

                        <div className={`cue ${cueTier}`}>{normalizeCue(current?.cue ?? "")}</div>

                        {current?.details &&
                        Object.keys(current.details).length ? (
                          <div className="details">
                            <button
                              className="detailsToggle"
                              onClick={() => setShowDetails((v) => !v)}
                              aria-expanded={showDetails}
                            >
                              {showDetails ? "Hide details ▲" : "Details ▾"}
                            </button>
                            {showDetails ? (
                              <div className="detailsBody">
                                {DETAIL_FIELDS.map(([key, label]) =>
                                  current.details[key] ? (
                                    <div className="detailRow" key={key}>
                                      <div className="detailLabel">{label}</div>
                                      <div className="detailText">
                                        {current.details[key]}
                                      </div>
                                    </div>
                                  ) : null
                                )}
                              </div>
                            ) : null}
                          </div>
                        ) : null}

                        {showClientWording ? (
                          <div className="client">
                            <div className="clientLabel">What to say</div>
                            <div className="clientText">{normalizeCue(clientLine(idx))}</div>
                          </div>
                        ) : null}

                        {showNextPreview && nextStep?.cue ? (
                          <div className="nextBox">
                            <div className="nextLabel">
                              Next{nextStep?.num != null ? ` · Pose ${nextStep.num}` : ""}
                              {nextStep?.comp != null ? ` · Comp ${nextStep.comp}` : ""}
                            </div>
                            <div className="nextCue">{normalizeCue(nextStep.cue)}</div>
                          </div>
                        ) : null}

                        <div className="hint">
                          Tip: use <strong>Next</strong> / <strong>Back</strong>. (← → keys also work.)
                        </div>
                      </>
                    ) : (
                      <div style={{ textAlign: "left" }}>
                        <div className="progLabel" style={{ fontSize: 14 }}>
                          Flow complete
                        </div>
                        <div style={{ fontSize: 42, fontWeight: 950, marginTop: 8 }}>—</div>
                        <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
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

                  {/* ONE image only */}
                  {showRefImage && hasAnyImagesInFlow && currentImg ? (
                    <div className="refPanel" aria-label="Reference image">
                      <img src={currentImg} alt="Reference pose" draggable={false} />
                      {imgIsBaseReference ? (
                        <div className="refTag" title="This sketch is the base pose for this set, not a picture of the current step.">
                          Base pose reference — not this step
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
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
