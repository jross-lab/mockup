/**
 * app.js
 * App component: control panel, state management, export logic,
 * and ReactDOM.render.
 * ─────────────────────────────────────────────────────────────
 * EDIT THIS FILE when: adding new control panel fields, changing
 * export behaviour, or modifying the overall app layout.
 */

const { useState, useRef, useCallback, useEffect, useMemo } = React;
const { T, useFonts, useHtml2Canvas, IcoStrava, IcoDownload,
        Field, Input, UploadBox,
        TopNav, TopNavHome, TopNavGroups, PhoneShell, BottomNav,
        ScreenRouter, GROUPS_TAB_SCREENS, ACTIVITY_TYPES,
} = window.MT;

// --- Walkthrough tooltip component -------------------------------------------
const TOUR_STEPS = [
  { title: "Upload your assets", body: "Drop in your hero image, challenge badge, and brand logo. These will appear across all screen types.", pos: "right" },
  { title: "Customise details", body: "Set the challenge title, description, dates, and reward. Changes update the preview instantly.", pos: "right" },
  { title: "Challenge progress", body: "Set the current distance, goal total, and unit to control the progress bar on the Joined and Completed screens.", pos: "right" },
  { title: "Live preview", body: "This is a pixel-perfect preview of how the screen will look on an iPhone. What you see is what gets exported.", pos: "left" },
  { title: "Switch screens", body: "Click any thumbnail to switch between screen types. Each one uses your content and images.", pos: "left" },
  { title: "Choose a background", body: "Pick white, black, or Strava orange as the background colour behind the phone frame.", pos: "bottom" },
  { title: "Download your mockups", body: "Export the current screen as a PNG, or download all screens at once as a ZIP file.", pos: "bottom" },
];

function Walkthrough({ step, total, onNext, onSkip, targetRef }) {
  const [pos, setPos] = useState(null);
  const bubbleRef = useRef();

  useEffect(() => {
    if (!targetRef?.current) return;
    const update = () => {
      const r = targetRef.current.getBoundingClientRect();
      const stepCfg = TOUR_STEPS[step];
      const bw = 280;
      const bh = bubbleRef.current ? bubbleRef.current.offsetHeight : 140;
      let top, left;
      if (stepCfg.pos === "right") {
        left = r.right + 16;
        top = r.top + r.height / 2 - bh / 2;
      } else if (stepCfg.pos === "bottom") {
        left = r.left + r.width / 2 - bw / 2;
        top = r.bottom + 12;
      } else {
        left = r.left - bw - 16;
        top = r.top + r.height / 2 - bh / 2;
      }
      // Clamp to viewport
      top = Math.max(12, Math.min(top, window.innerHeight - bh - 12));
      left = Math.max(12, Math.min(left, window.innerWidth - bw - 12));
      setPos({ top, left, arrowSide: stepCfg.pos });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [step, targetRef]);

  if (!pos) return null;

  const arrowStyle = pos.arrowSide === "right"
    ? { position: "absolute", left: -8, top: "50%", marginTop: -8, width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderRight: "8px solid #fff" }
    : pos.arrowSide === "bottom"
    ? { position: "absolute", top: -8, left: "50%", marginLeft: -8, width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: "8px solid #fff" }
    : { position: "absolute", right: -8, top: "50%", marginTop: -8, width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderLeft: "8px solid #fff" };

  return (
    <>
      {/* Scrim overlay */}
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 9998 }} onClick={onSkip}/>
      {/* Spotlight cutout on target */}
      {targetRef?.current && (() => {
        const r = targetRef.current.getBoundingClientRect();
        return <div style={{ position: "fixed", left: r.left - 6, top: r.top - 6, width: r.width + 12, height: r.height + 12, borderRadius: 12, boxShadow: "0 0 0 9999px rgba(0,0,0,0.35)", zIndex: 9998, pointerEvents: "none" }}/>;
      })()}
      {/* Tooltip bubble */}
      <div ref={bubbleRef} style={{
        position: "fixed", top: pos.top, left: pos.left, width: 280, zIndex: 9999,
        background: "#fff", borderRadius: 12, padding: "20px 20px 16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1)",
      }}>
        <div style={arrowStyle}/>
        <div style={{ fontFamily: T.font, fontSize: 14, fontWeight: 700, color: T.textPri, marginBottom: 6 }}>{TOUR_STEPS[step].title}</div>
        <div style={{ fontFamily: T.font, fontSize: 13, color: T.textSec, lineHeight: "19px", marginBottom: 16 }}>{TOUR_STEPS[step].body}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: T.font, fontSize: 11, color: T.textTer }}>{step + 1} of {total}</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onSkip} style={{ background: "none", border: "none", fontFamily: T.font, fontSize: 13, color: T.textTer, cursor: "pointer", padding: "6px 10px" }}>Skip</button>
            <button onClick={onNext} style={{ background: T.orange, border: "none", borderRadius: 16, fontFamily: T.font, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", padding: "6px 16px" }}>
              {step < total - 1 ? "Next" : "Got it"}
            </button>
          </div>
        </div>
        {/* Step dots */}
        <div style={{ display: "flex", gap: 4, justifyContent: "center", marginTop: 12 }}>
          {Array.from({ length: total }, (_, i) => (
            <div key={i} style={{ width: 6, height: 6, borderRadius: 3, background: i === step ? T.orange : "#E0E0DE" }}/>
          ))}
        </div>
      </div>
    </>
  );
}

const SCREEN_GROUPS = [
  { group: "Detail", items: [
    { key: "not-joined", label: "Not Joined" },
    { key: "reward", label: "Reward" },
    { key: "joined", label: "Joined" },
    { key: "completed", label: "Completed" },
    { key: "takeover", label: "Takeover" },
    { key: "old-design", label: "Old Design" },
  ]},
  { group: "Discovery", items: [
    { key: "groups-tab", label: "Gallery" },
    { key: "milestone", label: "Milestone" },
    { key: "follower-infeed", label: "Follower" },
    { key: "custom-infeed", label: "Custom in-feed" },
    { key: "segment", label: "Segment" },
  ]},
];

const ALL_SCREENS = [
  "not-joined", "reward", "joined", "completed", "takeover", "old-design",
  "groups-tab", "milestone", "follower-infeed", "custom-infeed", "segment",
];

// Helper: renders the correct nav + screen content for a given screen key
function ScreenPhoneContent({ screenKey, data }) {
  const tab = GROUPS_TAB_SCREENS.has(screenKey) ? "groups" : "home";
  const noTopNav = screenKey === "not-joined" || screenKey === "reward" || screenKey === "joined" || screenKey === "completed" || screenKey === "old-design";
  const homeNav = screenKey === "milestone" || screenKey === "takeover" || screenKey === "groups-tab" || screenKey === "follower-infeed" || screenKey === "custom-infeed" || screenKey === "segment";
  return (
    <>
      {noTopNav ? null : homeNav ? <TopNavHome/> : <TopNav title="Challenge" back="Groups"/>}
      <ScreenRouter screen={screenKey} data={data}/>
      <BottomNav activeTab={tab}/>
    </>
  );
}

function App() {
  useFonts();
  const h2cReady = useHtml2Canvas();
  const screenRef = useRef();
  const [screen, setScreen] = useState("not-joined");
  const [busy, setBusy] = useState(false);
  const [bgColor, setBgColor] = useState("#FFFFFF");

  // Tour state
  const tourImagesRef = useRef();
  const tourPanelRef = useRef();
  const tourProgressRef = useRef();
  const tourPhoneRef = useRef();
  const tourGalleryRef = useRef();
  const tourBgRef = useRef();
  const tourDownloadRef = useRef();
  const tourRefs = [tourImagesRef, tourPanelRef, tourProgressRef, tourPhoneRef, tourGalleryRef, tourBgRef, tourDownloadRef];
  const [tourStep, setTourStep] = useState(-1);
  const startTour = () => setTourStep(0);
  const dismissTour = () => {
    setTourStep(-1);
  };
  const advanceTour = () => {
    if (tourStep >= TOUR_STEPS.length - 1) dismissTour();
    else setTourStep(s => s + 1);
  };
  const [data, setData] = useState({
    brandName: "[Brand name] goes here", title: "[Challenge title] goes here",
    goal: "[Goal] goes here",
    description: "[Description] goes here",
    reward: "[Reward] goes here",
    startDate: "[Start date] goes here", endDate: "[End date] goes here",
    participants: "[Participants] goes here", activityTypes: ["Run", "Ride"],
    heroImg: null, badgeImg: null, logoImg: null, mapImg: null,
    progressDistance: "[Progress] goes here", progressTotal: "[Total] goes here", progressUnit: "[Unit] goes here",
    ctaText: "",
  });
  const set = k => v => setData(d => ({ ...d, [k]: v }));

  const captureScreen = async (node) => {
    await document.fonts.ready;
    // dom-to-image-more doesn't preserve scrollTop, so we fake it:
    // expand the scroll container to full content height, apply negative
    // margin-top equal to scrollTop, and let the parent viewport's
    // overflow:hidden clip it to show exactly the scrolled view.
    const sc = node.querySelector('[data-phone-scroll]');
    const scrollTop = sc ? sc.scrollTop : 0;
    const needsShift = sc && scrollTop > 0;
    let origHeight, origOverflow, origMarginTop;
    if (needsShift) {
      origHeight = sc.style.height;
      origOverflow = sc.style.overflowY;
      origMarginTop = sc.style.marginTop;
      sc.style.height = "auto";
      sc.style.overflowY = "visible";
      sc.style.marginTop = `-${scrollTop}px`;
      sc.scrollTop = 0;
    }
    try {
      return await window.domtoimage.toPng(node, {
        width: node.scrollWidth * 1.75,
        height: node.scrollHeight * 1.75,
        style: { transform: "scale(1.75)", transformOrigin: "top left" },
        quality: 1,
      });
    } finally {
      if (needsShift) {
        sc.style.height = origHeight;
        sc.style.overflowY = origOverflow;
        sc.style.marginTop = origMarginTop;
        sc.scrollTop = scrollTop;
      }
    }
  };

  const dl = async () => {
    if (!h2cReady) { alert("Export library still loading -- try again in a moment."); return; }
    if (!screenRef.current) return;
    setBusy(true);
    try {
      const url = await captureScreen(screenRef.current);
      const a = document.createElement("a");
      a.href = url;
      a.download = `strava-${screen}-mockup.png`;
      a.click();
    } catch(e) { alert("Export failed: " + e.message); }
    finally { setBusy(false); }
  };

  const dlAll = async () => {
    if (!h2cReady) { alert("Export library still loading -- try again in a moment."); return; }
    if (!screenRef.current) return;
    setBusy(true);
    const originalScreen = screen;
    try {
      const zip = new JSZip();
      for (const key of ALL_SCREENS) {
        setScreen(key);
        await new Promise(r => setTimeout(r, 300));
        const dataUrl = await captureScreen(screenRef.current);
        const base64 = dataUrl.split(",")[1];
        zip.file(`strava-${key}-mockup.png`, base64, { base64: true });
      }
      setScreen(originalScreen);
      const blob = await zip.generateAsync({ type: "blob" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "strava-mockups.zip";
      a.click();
      URL.revokeObjectURL(a.href);
    } catch(e) { alert("Export failed: " + e.message); }
    finally { setScreen(originalScreen); setBusy(false); }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: T.font, overflowX: "clip", overflowY: "hidden" }}>

      {/* Header banner */}
      <div style={{ background: "#fff", borderBottom: "1px solid #DFDFE8", padding: "10px 20px", flexShrink: 0, display: "flex", alignItems: "center", gap: 16 }}>
        <svg width="90" height="33" viewBox="0 0 591 217" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M176.452 91.14V3.71999L219.356 3.71999C235.104 3.71999 245.024 7.68799 251.224 13.64C256.432 18.972 259.16 25.42 259.16 34.472V34.72C259.16 47.492 252.588 56.296 241.924 61.504L259.16 86.552L304.296 -2.38419e-06L351.912 91.14H320.292L304.296 59.272L288.3 91.14H262.384H228.656L212.164 66.216H205.84V91.14H176.452ZM45.136 92.752C27.404 92.752 11.16 87.792 -4.10378e-05 77.996L15.748 59.396C25.296 66.712 36.332 69.688 46.624 69.688C51.832 69.688 54.188 68.2 54.188 65.968V65.72C54.188 63.116 51.336 61.876 41.912 59.892C22.196 55.924 4.83596 50.344 4.83596 31.868L4.83596 31.62C4.83596 15.004 17.98 2.10799 42.16 2.10799C59.272 2.10799 71.796 6.07599 81.964 14.012L67.704 33.852C59.396 27.776 49.476 25.172 41.168 25.172C36.828 25.172 34.72 26.66 34.72 28.768V29.016C34.72 31.496 37.2 32.86 46.5 34.72C69.068 38.812 84.196 45.384 84.196 62.868V63.116C84.196 81.592 68.944 92.752 45.136 92.752ZM113.46 91.14L113.46 28.396L87.544 28.396V3.71999L168.764 3.71999V28.396L142.972 28.396V91.14L113.46 91.14ZM218.488 45.384C225.68 45.384 229.896 42.284 229.896 36.828V36.58C229.896 31 225.556 28.148 218.612 28.148H205.84V45.384H218.488ZM374.108 94.736L326.616 3.596L358.112 3.596L374.108 35.464L390.104 3.596L421.724 3.596L374.108 94.736ZM396.428 91.14L443.92 -2.38419e-06L491.536 91.14L459.916 91.14L443.92 59.272L427.924 91.14H396.428Z" fill="#FC5200"/>
          <path d="M6.07596 215.14L6.07596 127.72L58.032 127.72C76.632 127.72 86.428 136.896 86.428 150.164C86.428 159.836 80.6 166.532 70.06 169.136V169.756C81.84 171.988 88.784 179.924 88.784 191.084C88.784 204.848 78.74 215.14 59.768 215.14H6.07596ZM56.172 200.632C64.108 200.632 68.572 196.292 68.572 188.976C68.572 181.536 63.984 177.196 55.924 177.196H25.42L25.42 200.632H56.172ZM25.42 163.432H54.188C62 163.432 66.216 158.968 66.216 152.644C66.216 146.32 62.124 142.228 54.56 142.228H25.42L25.42 163.432ZM166.274 151.28V215.14H148.542V206.336H148.046C142.342 213.528 134.406 217 124.734 217C109.358 217 99.4383 207.7 99.4383 189.224V151.28H117.914V186C117.914 196.664 122.626 202.244 131.554 202.244C139.862 202.244 144.946 197.284 147.798 193.44V151.28H166.274ZM210.919 217C191.947 217 178.927 210.056 176.447 199.392L195.295 195.672C197.155 201.376 203.479 204.352 211.663 204.352C220.715 204.352 225.303 201.252 225.303 196.416C225.303 192.696 222.575 190.712 216.499 190.216L201.123 188.976C185.995 187.86 178.803 180.668 178.803 170.996C178.803 158.224 191.203 149.42 211.291 149.42C228.899 149.42 240.803 155.62 244.151 166.16L225.799 170.252C223.691 164.548 218.483 162.068 210.671 162.068C202.363 162.068 197.899 165.168 197.899 169.384C197.899 172.856 200.751 174.716 206.703 175.212L223.195 176.7C237.951 177.816 244.399 184.884 244.399 194.68C244.399 208.072 231.627 217 210.919 217ZM255.308 215.14L255.308 151.28L273.784 151.28L273.784 215.14L255.308 215.14ZM264.608 142.352C258.16 142.352 253.944 138.26 253.944 132.556C253.944 126.976 258.16 122.76 264.608 122.76C270.808 122.76 275.148 126.976 275.148 132.556C275.148 138.26 270.808 142.352 264.608 142.352ZM287.703 215.14L287.703 151.28H305.435V160.084H305.931C311.759 152.892 319.943 149.42 330.235 149.42C345.983 149.42 356.399 158.72 356.399 177.196L356.399 215.14H337.923L337.923 180.42C337.923 169.756 332.715 164.176 323.291 164.176C314.611 164.176 309.031 169.136 306.179 172.98L306.179 215.14H287.703ZM404.455 217C381.143 217 366.511 203.98 366.511 183.148C366.511 162.688 381.143 149.42 403.835 149.42C426.031 149.42 440.663 161.572 440.663 180.42C440.663 183.396 440.291 186 439.919 188.108L385.359 188.108C385.483 197.532 393.047 203.732 404.951 203.732C411.647 203.732 417.847 201.5 420.947 195.424L439.175 200.012C434.091 210.8 421.815 217 404.455 217ZM385.359 176.948H421.443C421.195 166.78 414.127 161.944 403.835 161.944C393.047 161.944 385.855 167.896 385.359 176.948ZM481.694 217C462.722 217 449.702 210.056 447.222 199.392L466.07 195.672C467.93 201.376 474.254 204.352 482.438 204.352C491.49 204.352 496.078 201.252 496.078 196.416C496.078 192.696 493.35 190.712 487.274 190.216L471.898 188.976C456.77 187.86 449.578 180.668 449.578 170.996C449.578 158.224 461.978 149.42 482.066 149.42C499.674 149.42 511.578 155.62 514.926 166.16L496.574 170.252C494.466 164.548 489.258 162.068 481.446 162.068C473.138 162.068 468.674 165.168 468.674 169.384C468.674 172.856 471.526 174.716 477.478 175.212L493.97 176.7C508.726 177.816 515.174 184.884 515.174 194.68C515.174 208.072 502.402 217 481.694 217ZM556.836 217C537.864 217 524.844 210.056 522.364 199.392L541.212 195.672C543.072 201.376 549.396 204.352 557.58 204.352C566.632 204.352 571.22 201.252 571.22 196.416C571.22 192.696 568.492 190.712 562.416 190.216L547.04 188.976C531.912 187.86 524.72 180.668 524.72 170.996C524.72 158.224 537.12 149.42 557.208 149.42C574.816 149.42 586.72 155.62 590.068 166.16L571.716 170.252C569.608 164.548 564.4 162.068 556.588 162.068C548.28 162.068 543.816 165.168 543.816 169.384C543.816 172.856 546.668 174.716 552.62 175.212L569.112 176.7C583.868 177.816 590.316 184.884 590.316 194.68C590.316 208.072 577.544 217 556.836 217Z" fill="black"/>
        </svg>
        <div style={{ height: 24, width: 1, background: "#DFDFE8", flexShrink: 0 }}/>
        <span style={{ fontFamily: T.font, fontSize: 14, fontWeight: 700, color: T.textPri }}>Interactive Mockup Tool</span>
        <span style={{ fontFamily: T.font, fontSize: 13, color: T.textSec }}>Build branded Strava challenge screens — pick a template, drop in your assets, and download a pixel-perfect PNG.</span>
        <div style={{ marginLeft: "auto", flexShrink: 0 }}>
          <button onClick={startTour} style={{ background: "none", border: "1.5px solid #DFDFE8", borderRadius: 16, padding: "5px 14px", fontFamily: T.font, fontSize: 12, fontWeight: 600, color: T.textSec, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#64635E" strokeWidth="1.5"/><path d="M7.25 7H8.75V11.5H7.25V7Z" fill="#64635E"/><circle cx="8" cy="5" r="0.9" fill="#64635E"/></svg>
            Take a tour
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>

      {/* Left panel */}
      <div style={{ width: 460, flexShrink: 0, background: "#fff", borderRight: "1px solid #DFDFE8", display: "flex", flexDirection: "column", padding: 16 }}>

        {/* Image uploads — 3 across in a row */}
        <div ref={tourImagesRef}>
          <div style={{ fontSize: 12, fontFamily: T.font, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "#4A4A4A", marginBottom: 8 }}>Images</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <div style={{ flex: 1 }}><UploadBox label="Hero" preview={data.heroImg} onUpload={set("heroImg")} aspect="1/1"/></div>
            <div style={{ flex: 1 }}><UploadBox label="Badge" preview={data.badgeImg} onUpload={set("badgeImg")} aspect="1/1"/></div>
            <div style={{ flex: 1 }}><UploadBox label="Logo" preview={data.logoImg} onUpload={set("logoImg")} aspect="1/1"/></div>
          </div>
        </div>

        <div style={{ height: 1, background: "#DFDFE8", margin: "0 0 13px", flexShrink: 0 }}/>

        {/* Text fields */}
        <div ref={tourPanelRef} style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1 }}><Field label="Brand Name"><Input value={data.brandName} onChange={set("brandName")} placeholder="[Brand name] goes here"/></Field></div>
          </div>
          {/* Activity Type pill toggles */}
          <div style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 10, fontFamily: T.font, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6D6D78", marginBottom: 5 }}>Activity Types</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {ACTIVITY_TYPES.map(({ key, label, Icon }) => {
                const active = (data.activityTypes || []).includes(key);
                return (
                  <button key={key} onClick={() => {
                    const current = data.activityTypes || [];
                    const next = active ? current.filter(k => k !== key) : [...current, key];
                    set("activityTypes")(next);
                  }} style={{
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "5px 12px", borderRadius: 16,
                    background: active ? T.orange : "#F5F5F3",
                    color: active ? "#fff" : T.textPri,
                    border: active ? "none" : "1px solid #E0E0DE",
                    fontFamily: T.font, fontSize: 12, fontWeight: 600,
                    cursor: "pointer", transition: "all 0.15s ease",
                  }}>
                    <Icon size={14} color={active ? "#fff" : T.textSec}/>
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
          <Field label="Challenge Title"><Input value={data.title} onChange={set("title")} placeholder="[Challenge title] goes here"/></Field>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1 }}><Field label="Goal"><Input value={data.goal} onChange={set("goal")} placeholder="[Goal] goes here"/></Field></div>
            <div style={{ flex: 1 }}><Field label="Participants"><Input value={data.participants} onChange={set("participants")} placeholder="[Participants] goes here"/></Field></div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1 }}><Field label="Start Date"><Input value={data.startDate} onChange={set("startDate")} placeholder="[Start date] goes here"/></Field></div>
            <div style={{ flex: 1 }}><Field label="End Date"><Input value={data.endDate} onChange={set("endDate")} placeholder="[End date] goes here"/></Field></div>
            <div style={{ flex: 1 }}><Field label="In-feed CTA"><Input value={data.ctaText} onChange={set("ctaText")} placeholder="Check it out"/></Field></div>
          </div>
          <div ref={tourProgressRef}>
            <div style={{ fontSize: 12, fontFamily: T.font, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "#4A4A4A", marginBottom: 4, marginTop: 8 }}>Challenge Progress</div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1 }}><Field label="Progress"><Input value={data.progressDistance} onChange={set("progressDistance")} placeholder="[Progress] goes here"/></Field></div>
              <div style={{ flex: 1 }}><Field label="Goal Total"><Input value={data.progressTotal} onChange={set("progressTotal")} placeholder="[Goal total] goes here"/></Field></div>
              <div style={{ flex: 1 }}><Field label="Unit"><Input value={data.progressUnit} onChange={set("progressUnit")} placeholder="[Unit] goes here"/></Field></div>
            </div>
          </div>
          {/* Reward + Description — flex to fill remaining panel height */}
          <div style={{ display: "flex", gap: 8, flex: 1, minHeight: 80 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 10, fontFamily: T.font, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6D6D78", marginBottom: 5 }}>Reward</div>
              <textarea value={data.reward} onChange={e => set("reward")(e.target.value)} placeholder="[Reward] goes here"
                style={{ flex: 1, width: "100%", fontFamily: T.font, fontSize: 13, color: "#242428", background: "#FAFAFA", border: "1.5px solid #E8E8E5", borderRadius: 8, padding: "10px 12px", outline: "none", resize: "none", lineHeight: "18px" }}/>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 10, fontFamily: T.font, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6D6D78", marginBottom: 5 }}>Description</div>
              <textarea value={data.description} onChange={e => set("description")(e.target.value)} placeholder="[Description] goes here"
                style={{ flex: 1, width: "100%", fontFamily: T.font, fontSize: 13, color: "#242428", background: "#FAFAFA", border: "1.5px solid #E8E8E5", borderRadius: 8, padding: "10px 12px", outline: "none", resize: "none", lineHeight: "18px" }}/>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: toolbar + phone + gallery */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Toolbar: background picker + download buttons */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", background: "#fff", borderBottom: "1px solid #DFDFE8", flexShrink: 0 }}>
          {/* Background picker */}
          <div ref={tourBgRef} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, fontFamily: T.font, fontWeight: 700, color: T.textPri, lineHeight: "14px" }}>Background</div>
              <div style={{ fontSize: 10, fontFamily: T.font, color: T.textTer, lineHeight: "13px", marginTop: 1 }}>Preview colour</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {[["#FFFFFF","White"],["#000000","Black"],["#FC5200","Orange"]].map(([color, label]) => (
                <button key={color} onClick={() => setBgColor(color)} style={{
                  width: 28, height: 28, borderRadius: 6, border: bgColor === color ? "2px solid #FC5200" : "1.5px solid #DFDFE8",
                  background: color, cursor: "pointer", padding: 0,
                }} title={label}/>
              ))}
            </div>
          </div>
          {/* Download buttons */}
          <div ref={tourDownloadRef} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, fontFamily: T.font, fontWeight: 700, color: T.textPri, lineHeight: "14px" }}>Download</div>
              <div style={{ fontSize: 10, fontFamily: T.font, color: T.textTer, lineHeight: "13px", marginTop: 1 }}>Export as PNG</div>
            </div>
            {!h2cReady && <span style={{ fontFamily: T.font, fontSize: 11, color: T.textTer }}>Loading...</span>}
            <button onClick={dl} disabled={busy || !h2cReady}
              style={{ height: 36, borderRadius: 18, background: (busy || !h2cReady) ? "#aaa" : T.orange, border: "none", fontFamily: T.font, fontSize: 12, fontWeight: 700, color: "#fff", cursor: (busy || !h2cReady) ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "0 16px" }}>
              <IcoDownload/>{busy ? "..." : "This screen"}
            </button>
            <button onClick={dlAll} disabled={busy || !h2cReady}
              style={{ height: 36, borderRadius: 18, background: (busy || !h2cReady) ? "#aaa" : T.textPri, border: "none", fontFamily: T.font, fontSize: 12, fontWeight: 700, color: "#fff", cursor: (busy || !h2cReady) ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "0 16px" }}>
              <IcoDownload/>{busy ? "..." : "All screens (ZIP)"}
            </button>
          </div>
        </div>

      {/* Phone preview + screen gallery */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 8, overflow: "hidden", gap: 32, background: bgColor }}>
        <div ref={tourPhoneRef} style={{ flexShrink: 0, transform: "scale(0.85)", transformOrigin: "center center" }}>
          <PhoneShell screenRef={screenRef} bgColor={bgColor}>
            <ScreenPhoneContent screenKey={screen} data={data}/>
          </PhoneShell>
        </div>

        {/* Screen picker gallery — 2-column grid */}
        <div ref={tourGalleryRef} style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 10, padding: "12px 0", alignSelf: "center" }}>
          <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, color: T.textPri, letterSpacing: "0.02em" }}>Screens</div>
          {SCREEN_GROUPS.map(({ group, items }) => (
            <div key={group}>
              <div style={{ fontFamily: T.font, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: T.textTer, marginBottom: 8 }}>{group}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {items.map(({ key, label }) => {
                  const active = screen === key;
                  const legacy = key === "old-design";
                  return (
                    <button key={key} onClick={() => setScreen(key)} style={{
                      width: 100, padding: "12px 8px", borderRadius: 10, cursor: "pointer", transition: "all 0.15s ease",
                      border: active ? "2px solid " + T.orange : legacy ? "1.5px dashed #C8C8C8" : "1.5px solid #DFDFE8",
                      background: active ? "#FFF4EE" : legacy ? "#F7F7F5" : "#fff",
                      opacity: (!active && legacy) ? 0.7 : 1,
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                    }}>
                      {/* Mini phone silhouette */}
                      <svg width="28" height="46" viewBox="0 0 28 46" fill="none">
                        <rect x="0.5" y="0.5" width="27" height="45" rx="6.5" stroke={active ? T.orange : "#C8C8C8"} strokeWidth="1"/>
                        <rect x="3" y="3" width="22" height="33" rx="1.5" fill={active ? "#FDDCC8" : "#F2F2F0"}/>
                        <circle cx="14" cy="42" r="1.5" fill={active ? T.orange : "#D0D0CE"}/>
                      </svg>
                      <span style={{ fontFamily: T.font, fontSize: 11, fontWeight: active ? 700 : 500, color: active ? T.orange : T.textSec, lineHeight: "13px", whiteSpace: "nowrap", textAlign: "center" }}>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      </div>

      {/* Tooltip walkthrough */}
      {tourStep >= 0 && tourStep < TOUR_STEPS.length && (
        <Walkthrough
          step={tourStep}
          total={TOUR_STEPS.length}
          onNext={advanceTour}
          onSkip={dismissTour}
          targetRef={tourRefs[tourStep]}
        />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
