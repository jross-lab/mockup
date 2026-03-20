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
    <div style={{ display: "flex", height: "100vh", background: bgColor, fontFamily: T.font, overflowX: "clip", overflowY: "hidden" }}>

      {/* Left panel */}
      <div style={{ width: 280, flexShrink: 0, background: "#fff", borderRight: "1px solid #DFDFE8", overflowY: "auto", padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          <IcoStrava/>
          <span style={{ fontFamily: T.font, fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Challenge Mockup</span>
        </div>

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
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
