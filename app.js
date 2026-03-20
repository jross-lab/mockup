/**
 * app.js
 * App component: control panel, state management, export logic,
 * and ReactDOM.render.
 * ─────────────────────────────────────────────────────────────
 * EDIT THIS FILE when: adding new control panel fields, changing
 * export behaviour, or modifying the overall app layout.
 */

const { useState, useRef, useCallback, useEffect } = React;
const { T, useFonts, useHtml2Canvas, IcoStrava, IcoDownload,
        Field, Input, UploadBox,
        TopNav, PhoneShell, BottomNav,
        ScreenRouter, GROUPS_TAB_SCREENS,
} = window.MT;

function App() {
  useFonts();
  const h2cReady = useHtml2Canvas();
  const screenRef = useRef();
  const [screen, setScreen] = useState("not-joined");
  const [busy, setBusy] = useState(false);
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [data, setData] = useState({
    brandName: "The North Face", title: "Reach New Heights with The North Face",
    goal: "Run 30km in one month",
    description: "Challenge yourself to run 30 kilometers in a single month and earn an exclusive reward from The North Face. Every kilometer counts -- lace up and get moving.",
    reward: "Complete the challenge to unlock 20% off The North Face's latest apparel.",
    startDate: "Apr 1, 2026", endDate: "Apr 30, 2026",
    participants: "12,847", activityType: "Run, Virtual Run, Walk",
    heroImg: null, badgeImg: null, logoImg: null, mapImg: null,
  });
  const set = k => v => setData(d => ({ ...d, [k]: v }));

  const dl = async () => {
    if (!h2cReady) { alert("Export library still loading -- try again in a moment."); return; }
    if (!screenRef.current) return;
    setBusy(true);
    try {
      const canvas = await window.html2canvas(screenRef.current, {
        scale: 2, useCORS: true, allowTaint: true,
        backgroundColor: null, logging: false, scrollY: -window.scrollY,
      });
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `strava-${screen}-mockup.png`;
      a.click();
    } catch(e) { alert("Export failed: " + e.message); }
    finally { setBusy(false); }
  };

  const activeTab = GROUPS_TAB_SCREENS.has(screen) ? "groups" : "home";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: T.font, overflowX: "clip", overflowY: "hidden" }}>

      {/* Header banner */}
      <div style={{ background: "#fff", borderBottom: "1px solid #DFDFE8", padding: "14px 28px", flexShrink: 0, display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ flexShrink: 0 }}>
          <svg width="120" height="44" viewBox="0 0 591 217" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M176.452 91.14V3.71999L219.356 3.71999C235.104 3.71999 245.024 7.68799 251.224 13.64C256.432 18.972 259.16 25.42 259.16 34.472V34.72C259.16 47.492 252.588 56.296 241.924 61.504L259.16 86.552L304.296 -2.38419e-06L351.912 91.14H320.292L304.296 59.272L288.3 91.14H262.384H228.656L212.164 66.216H205.84V91.14H176.452ZM45.136 92.752C27.404 92.752 11.16 87.792 -4.10378e-05 77.996L15.748 59.396C25.296 66.712 36.332 69.688 46.624 69.688C51.832 69.688 54.188 68.2 54.188 65.968V65.72C54.188 63.116 51.336 61.876 41.912 59.892C22.196 55.924 4.83596 50.344 4.83596 31.868L4.83596 31.62C4.83596 15.004 17.98 2.10799 42.16 2.10799C59.272 2.10799 71.796 6.07599 81.964 14.012L67.704 33.852C59.396 27.776 49.476 25.172 41.168 25.172C36.828 25.172 34.72 26.66 34.72 28.768V29.016C34.72 31.496 37.2 32.86 46.5 34.72C69.068 38.812 84.196 45.384 84.196 62.868V63.116C84.196 81.592 68.944 92.752 45.136 92.752ZM113.46 91.14L113.46 28.396L87.544 28.396V3.71999L168.764 3.71999V28.396L142.972 28.396V91.14L113.46 91.14ZM218.488 45.384C225.68 45.384 229.896 42.284 229.896 36.828V36.58C229.896 31 225.556 28.148 218.612 28.148H205.84V45.384H218.488ZM374.108 94.736L326.616 3.596L358.112 3.596L374.108 35.464L390.104 3.596L421.724 3.596L374.108 94.736ZM396.428 91.14L443.92 -2.38419e-06L491.536 91.14L459.916 91.14L443.92 59.272L427.924 91.14H396.428Z" fill="#FC5200"/>
            <path d="M6.07596 215.14L6.07596 127.72L58.032 127.72C76.632 127.72 86.428 136.896 86.428 150.164C86.428 159.836 80.6 166.532 70.06 169.136V169.756C81.84 171.988 88.784 179.924 88.784 191.084C88.784 204.848 78.74 215.14 59.768 215.14H6.07596ZM56.172 200.632C64.108 200.632 68.572 196.292 68.572 188.976C68.572 181.536 63.984 177.196 55.924 177.196H25.42L25.42 200.632H56.172ZM25.42 163.432H54.188C62 163.432 66.216 158.968 66.216 152.644C66.216 146.32 62.124 142.228 54.56 142.228H25.42L25.42 163.432ZM166.274 151.28V215.14H148.542V206.336H148.046C142.342 213.528 134.406 217 124.734 217C109.358 217 99.4383 207.7 99.4383 189.224V151.28H117.914V186C117.914 196.664 122.626 202.244 131.554 202.244C139.862 202.244 144.946 197.284 147.798 193.44V151.28H166.274ZM210.919 217C191.947 217 178.927 210.056 176.447 199.392L195.295 195.672C197.155 201.376 203.479 204.352 211.663 204.352C220.715 204.352 225.303 201.252 225.303 196.416C225.303 192.696 222.575 190.712 216.499 190.216L201.123 188.976C185.995 187.86 178.803 180.668 178.803 170.996C178.803 158.224 191.203 149.42 211.291 149.42C228.899 149.42 240.803 155.62 244.151 166.16L225.799 170.252C223.691 164.548 218.483 162.068 210.671 162.068C202.363 162.068 197.899 165.168 197.899 169.384C197.899 172.856 200.751 174.716 206.703 175.212L223.195 176.7C237.951 177.816 244.399 184.884 244.399 194.68C244.399 208.072 231.627 217 210.919 217ZM255.308 215.14L255.308 151.28L273.784 151.28L273.784 215.14L255.308 215.14ZM264.608 142.352C258.16 142.352 253.944 138.26 253.944 132.556C253.944 126.976 258.16 122.76 264.608 122.76C270.808 122.76 275.148 126.976 275.148 132.556C275.148 138.26 270.808 142.352 264.608 142.352ZM287.703 215.14L287.703 151.28H305.435V160.084H305.931C311.759 152.892 319.943 149.42 330.235 149.42C345.983 149.42 356.399 158.72 356.399 177.196L356.399 215.14H337.923L337.923 180.42C337.923 169.756 332.715 164.176 323.291 164.176C314.611 164.176 309.031 169.136 306.179 172.98L306.179 215.14H287.703ZM404.455 217C381.143 217 366.511 203.98 366.511 183.148C366.511 162.688 381.143 149.42 403.835 149.42C426.031 149.42 440.663 161.572 440.663 180.42C440.663 183.396 440.291 186 439.919 188.108L385.359 188.108C385.483 197.532 393.047 203.732 404.951 203.732C411.647 203.732 417.847 201.5 420.947 195.424L439.175 200.012C434.091 210.8 421.815 217 404.455 217ZM385.359 176.948H421.443C421.195 166.78 414.127 161.944 403.835 161.944C393.047 161.944 385.855 167.896 385.359 176.948ZM481.694 217C462.722 217 449.702 210.056 447.222 199.392L466.07 195.672C467.93 201.376 474.254 204.352 482.438 204.352C491.49 204.352 496.078 201.252 496.078 196.416C496.078 192.696 493.35 190.712 487.274 190.216L471.898 188.976C456.77 187.86 449.578 180.668 449.578 170.996C449.578 158.224 461.978 149.42 482.066 149.42C499.674 149.42 511.578 155.62 514.926 166.16L496.574 170.252C494.466 164.548 489.258 162.068 481.446 162.068C473.138 162.068 468.674 165.168 468.674 169.384C468.674 172.856 471.526 174.716 477.478 175.212L493.97 176.7C508.726 177.816 515.174 184.884 515.174 194.68C515.174 208.072 502.402 217 481.694 217ZM556.836 217C537.864 217 524.844 210.056 522.364 199.392L541.212 195.672C543.072 201.376 549.396 204.352 557.58 204.352C566.632 204.352 571.22 201.252 571.22 196.416C571.22 192.696 568.492 190.712 562.416 190.216L547.04 188.976C531.912 187.86 524.72 180.668 524.72 170.996C524.72 158.224 537.12 149.42 557.208 149.42C574.816 149.42 586.72 155.62 590.068 166.16L571.716 170.252C569.608 164.548 564.4 162.068 556.588 162.068C548.28 162.068 543.816 165.168 543.816 169.384C543.816 172.856 546.668 174.716 552.62 175.212L569.112 176.7C583.868 177.816 590.316 184.884 590.316 194.68C590.316 208.072 577.544 217 556.836 217Z" fill="black"/>
          </svg>
        </div>
        <div style={{ borderLeft: "1px solid #DFDFE8", paddingLeft: 24 }}>
          <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri, marginBottom: 3 }}>Mockup Tool</div>
          <div style={{ fontFamily: T.font, fontSize: 13, lineHeight: "18px", color: T.textSec, maxWidth: 520 }}>
            Upload your hero image, challenge badge, and brand logo on the left. Customise the text fields, select a screen type, then hit "Download PNG" to export.
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ display: "flex", flex: 1, minHeight: 0, background: bgColor }}>

      {/* Left panel */}
      <div style={{ width: 280, flexShrink: 0, background: "#fff", borderRight: "1px solid #DFDFE8", overflowY: "auto", padding: 18 }}>

        <Field label="Challenge Screen">
          <select value={screen} onChange={e => setScreen(e.target.value)}
            style={{ width: "100%", fontFamily: T.font, fontSize: 13, background: "#fff", border: "1px solid #DFDFE8", borderRadius: 6, padding: "7px 10px", outline: "none", cursor: "pointer" }}>
            <optgroup label="Challenge Detail">
              <option value="not-joined">Not Joined</option>
              <option value="joined">Joined</option>
              <option value="milestone">Challenge Milestone</option>
              <option value="takeover">Challenge Takeover</option>
            </optgroup>
            <optgroup label="Discovery">
              <option value="groups-tab">Groups Tab / Challenges</option>
            </optgroup>
            <optgroup label="Home Feed">
              <option value="feed-follower">Home Feed / Follower Promotion</option>
              <option value="feed-inunit">Home Feed / In-Feed Unit</option>
              <option value="segment">Home Feed / Segment Challenge</option>
            </optgroup>
          </select>
        </Field>

        <div style={{ height: 1, background: "#DFDFE8", margin: "4px 0 13px" }}/>

        <div style={{ marginBottom: 13 }}>
          <div style={{ fontSize: 10, fontFamily: T.font, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6D6D78", marginBottom: 8 }}>Background</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[["#FFFFFF","White"],["#000000","Black"],["#FC5200","Orange"]].map(([color, label]) => (
              <button key={color} onClick={() => setBgColor(color)} style={{
                flex: 1, height: 32, borderRadius: 6, border: bgColor === color ? "2px solid #FC5200" : "2px solid #DFDFE8",
                background: color, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: T.font, fontSize: 10, fontWeight: 700, color: color === "#000000" ? "#fff" : color === "#FC5200" ? "#fff" : "#242428" }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: "#DFDFE8", margin: "4px 0 13px" }}/>

        <UploadBox label="Hero Image (2:1 ratio)" preview={data.heroImg} onUpload={set("heroImg")} aspect="2/1"/>
        <UploadBox label="Challenge Badge" preview={data.badgeImg} onUpload={set("badgeImg")} aspect="1/1"/>
        <UploadBox label="Brand / Club Logo" preview={data.logoImg} onUpload={set("logoImg")} aspect="1/1"/>
        {screen === "segment" && (
          <UploadBox label="Segment Map Image" preview={data.mapImg} onUpload={set("mapImg")} aspect="329/170"/>
        )}

        <div style={{ height: 1, background: "#DFDFE8", margin: "4px 0 13px" }}/>

        <Field label="Brand / Sponsor Name"><Input value={data.brandName} onChange={set("brandName")} placeholder="e.g. The North Face"/></Field>
        <Field label="Challenge Title"><Input value={data.title} onChange={set("title")} placeholder="e.g. Reach New Heights"/></Field>
        <Field label="Goal / One-liner"><Input value={data.goal} onChange={set("goal")} placeholder="e.g. Run 30km in one month"/></Field>
        <Field label="Reward"><Input value={data.reward} onChange={set("reward")} placeholder="e.g. Unlock 20% off..." multiline/></Field>
        <Field label="Description"><Input value={data.description} onChange={set("description")} placeholder="Full challenge description..." multiline/></Field>

        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1 }}><Field label="Start Date"><Input value={data.startDate} onChange={set("startDate")} placeholder="Apr 1, 2026"/></Field></div>
          <div style={{ flex: 1 }}><Field label="End Date"><Input value={data.endDate} onChange={set("endDate")} placeholder="Apr 30, 2026"/></Field></div>
        </div>
        <Field label="Participants"><Input value={data.participants} onChange={set("participants")} placeholder="e.g. 12,847"/></Field>
        <Field label="Qualifying Activities"><Input value={data.activityType} onChange={set("activityType")} placeholder="Run, Virtual Run, Walk"/></Field>

        <div style={{ height: 1, background: "#DFDFE8", margin: "8px 0 13px" }}/>

        {!h2cReady && (
          <div style={{ fontFamily: T.font, fontSize: 11, color: T.textTer, marginBottom: 8, textAlign: "center" }}>Loading export library...</div>
        )}

        <button onClick={dl} disabled={busy || !h2cReady}
          style={{ width: "100%", height: 44, borderRadius: 22, background: (busy || !h2cReady) ? "#aaa" : T.orange, border: "none", fontFamily: T.font, fontSize: 15, fontWeight: 700, color: "#fff", cursor: (busy || !h2cReady) ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <IcoDownload/>{busy ? "Exporting..." : "Download PNG"}
        </button>
      </div>

      {/* Phone preview */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 32, overflowY: "auto", overflowX: "clip" }}>
        <div style={{ flexShrink: 0 }}>
          <PhoneShell screenRef={screenRef} bgColor={bgColor}>
            {screen === "not-joined"
              ? null
              : screen === "segment" || screen === "milestone"
              ? <TopNav title="Home" back=""/>
              : screen === "takeover"
                ? <TopNav title="Groups" back=""/>
                : <TopNav title="Challenge" back="Groups"/>
            }
            <ScreenRouter screen={screen} data={data}/>
            <BottomNav activeTab={activeTab}/>
          </PhoneShell>
        </div>
      </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
