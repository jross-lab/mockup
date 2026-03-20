/**
 * screens-feed.js
 * Discovery & Feed screens: Groups Tab, Home Feed, Segment Challenge.
 * Also contains ScreenRouter.
 * ─────────────────────────────────────────────────────────────
 * EDIT THIS FILE when: modifying the Groups Tab, Home Feed cards,
 * Segment Challenge, or adding new discovery/feed screens.
 */

const { T, FALLBACK_COLORS,
        Facepile, HeroBadge, OrangeBtn, InfoRows,
        ScreenNotJoined, ScreenJoined, ScreenTakeover, ScreenMilestone,
} = window.MT;

// --- Screen: Groups Tab / Challenges -----------------------------------------
function VerticalCard({ badgeImg, title, goal, brandName }) {
  return (
    <div style={{ background: T.bgSurface, borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
      <div style={{ width: 53, height: 53, borderRadius: "50%", background: "#E8E8E8", overflow: "hidden" }}>{badgeImg && <img src={badgeImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>}</div>
      <div style={{ fontFamily: T.font, fontSize: 14, fontWeight: 700, lineHeight: "18px" }}>{title || "Challenge Name"}</div>
      <div style={{ fontFamily: T.font, fontSize: 12, color: T.textSec, lineHeight: "16px" }}>{goal || "Complete the goal"}</div>
      <div style={{ fontFamily: T.font, fontSize: 11, color: T.textTer }}>{brandName || "Brand"}</div>
      <button style={{ height: 32, borderRadius: 16, background: T.orange, border: "none", fontFamily: T.font, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "default", marginTop: 4 }}>Join</button>
    </div>
  );
}

function ScreenGroupsTab({ data }) {
  const { heroImg, badgeImg, title, goal, brandName, startDate } = data;
  return (
    <div style={{ display: "flex", flexDirection: "column", background: T.bgSunken }}>
      <div style={{ background: T.bgSurface, display: "flex", borderBottom: `0.5px solid ${T.divider}` }}>
        {["Challenges","Clubs","Events"].map((t,i) => (
          <div key={t} style={{ flex: 1, textAlign: "center", padding: "14px 0", borderBottom: i === 0 ? `2px solid ${T.orange}` : "none" }}>
            <span style={{ fontFamily: T.font, fontSize: 16, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? T.textPri : T.textTer }}>{t}</span>
          </div>
        ))}
      </div>
      <div style={{ background: T.bgSurface, marginBottom: 8 }}>
        <div style={{ width: "100%", height: 185, background: "#C8C8C8", overflow: "hidden" }}>
          {heroImg ? <img src={heroImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/> : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#d0d0d0,#a8a8a8)" }}/>}
        </div>
        <div style={{ padding: "16px 24px" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#E8E8E8", flexShrink: 0, overflow: "hidden" }}>{badgeImg && <img src={badgeImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>}</div>
            <div>
              <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", marginBottom: 4 }}>{title || "Challenge Title"}</div>
              <div style={{ fontFamily: T.font, fontSize: 13, color: T.textSec }}>{goal || "Challenge goal"}</div>
              <div style={{ fontFamily: T.font, fontSize: 12, color: T.textTer, marginTop: 2 }}>{startDate || "Apr 1"} · {brandName || "Brand"}</div>
            </div>
          </div>
          <OrangeBtn label="Join Challenge"/>
        </div>
      </div>
      <div style={{ background: T.bgSurface, padding: "16px 8px" }}>
        <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, padding: "0 16px 12px" }}>Recommended</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: "0 8px" }}>
          {[1,2,3,4].map(i => <VerticalCard key={i} badgeImg={i===1?badgeImg:null} title={i===1?title:`Challenge ${i}`} goal={i===1?goal:"Complete the goal"} brandName={i===1?brandName:"Brand"}/>)}
        </div>
      </div>
      <div style={{ height: 24 }}/>
    </div>
  );
}

// --- Screen: Home Feed (Follower + In-Unit) ----------------------------------
function ScreenHomeFeed({ data, variant }) {
  const { badgeImg, brandName, title, goal } = data;
  return (
    <div style={{ display: "flex", flexDirection: "column", background: T.bgSunken }}>
      <div style={{ background: T.bgSurface, marginBottom: 8 }}>
        <div style={{ padding: "16px 24px", display: "flex", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#C8D8E8", flexShrink: 0 }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, marginBottom: 2 }}>Sarah Johnson</div>
            <div style={{ fontFamily: T.font, fontSize: 13, color: T.textTer }}>Ran 8.2 km · 2h ago</div>
            <div style={{ fontFamily: T.font, fontSize: 13, color: T.textSec, marginTop: 8 }}>Morning run in the park 🏃</div>
          </div>
        </div>
      </div>
      <div style={{ background: T.bgSurface, marginBottom: 8 }}>
        <div style={{ padding: "10px 24px 8px", borderBottom: `0.5px solid ${T.divider}` }}>
          <div style={{ fontFamily: T.font, fontSize: 12, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {variant === "follower" ? "Your friends are joining" : "Featured Challenge"}
          </div>
        </div>
        <div style={{ padding: "12px 24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#E8E8E8", flexShrink: 0, overflow: "hidden" }}>{badgeImg && <img src={badgeImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", marginBottom: 4 }}>{title || "Challenge Title"}</div>
            <div style={{ fontFamily: T.font, fontSize: 13, color: T.textSec, marginBottom: 4 }}>{goal || "Challenge goal"}</div>
            <div style={{ fontFamily: T.font, fontSize: 12, color: T.textTer, marginBottom: 12 }}>{brandName || "Brand"}</div>
            <button style={{ height: 34, borderRadius: 17, background: T.orange, border: "none", fontFamily: T.font, fontSize: 15, fontWeight: 700, color: "#fff", cursor: "default", padding: "0 24px" }}>Join Challenge</button>
          </div>
        </div>
      </div>
      <div style={{ background: T.bgSurface }}>
        <div style={{ padding: "16px 24px", display: "flex", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#D8C8E8", flexShrink: 0 }}/>
          <div>
            <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, marginBottom: 2 }}>Marcus Chen</div>
            <div style={{ fontFamily: T.font, fontSize: 13, color: T.textTer }}>Cycled 42 km · 4h ago</div>
          </div>
        </div>
      </div>
      <div style={{ height: 24 }}/>
    </div>
  );
}

// --- Screen: Segment Challenge -----------------------------------------------
function FeedPost({ avatar, name, time, text }) {
  return (
    <div style={{ background: T.bgSurface, marginBottom: 8 }}>
      <div style={{ padding: "16px 24px", display: "flex", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: avatar, flexShrink: 0 }}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: T.fontMaison, fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{name}</div>
          <div style={{ fontFamily: T.fontMaison, fontSize: 11, color: T.textTer }}>{time}</div>
          {text && <div style={{ fontFamily: T.font, fontSize: 15, color: T.textSec, marginTop: 6 }}>{text}</div>}
        </div>
      </div>
      <div style={{ display: "flex", borderTop: `0.5px solid ${T.divider}`, padding: "0 24px" }}>
        {["👍 Kudo","💬 Comment","↗ Share"].map(lbl => (
          <div key={lbl} style={{ flex: 1, textAlign: "center", padding: "10px 0", fontFamily: T.fontMaison, fontSize: 13, color: T.textSec }}>{lbl}</div>
        ))}
      </div>
    </div>
  );
}

function ScreenSegmentChallenge({ data }) {
  const { badgeImg, mapImg, brandName, title, goal, startDate, endDate } = data;
  const dateRange = startDate && endDate ? `${startDate} - ${endDate}` : "Jan 2 - Jan 31, 2026";
  return (
    <div style={{ display: "flex", flexDirection: "column", background: T.bgSunken }}>
      <FeedPost avatar="#C8D8E8" name="Sarah Johnson" time="2h ago" text="Morning run in the park 🏃"/>
      <div style={{ background: T.bgSunken, padding: "24px 24px" }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: T.font, fontSize: 20, fontWeight: 700, lineHeight: "24px", color: T.textPri, marginBottom: 6 }}>{title || "A Segment Challenge near you."}</div>
          <div style={{ fontFamily: T.font, fontSize: 15, color: T.textSec, lineHeight: "20px" }}>{goal || "Run the segment for a reward in the brand range."}</div>
        </div>
        <div style={{ background: T.bgSurface, borderRadius: 16, overflow: "hidden", boxShadow: "0px 2px 6px rgba(0,0,0,0.11)" }}>
          <div style={{ width: "100%", height: 170, background: "#D8E4D0", overflow: "hidden", position: "relative", flexShrink: 0 }}>
            {mapImg ? <img src={mapImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/> : (
              <div style={{ width: "100%", height: "100%", background: "#D8E4D0", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6 }}>
                <svg width="80" height="60" viewBox="0 0 80 60" fill="none"><rect width="80" height="60" fill="#C8DCBC"/><rect x="0" y="22" width="80" height="16" fill="#E8F0E0"/><rect x="24" y="0" width="14" height="60" fill="#E8F0E0"/><path d="M20 30 Q32 18 45 26 Q56 34 65 20" stroke="#FC5200" strokeWidth="3" strokeLinecap="round" fill="none"/><circle cx="20" cy="30" r="4" fill="#3A8A3A" stroke="white" strokeWidth="1.5"/><circle cx="65" cy="20" r="4" fill="#FC5200" stroke="white" strokeWidth="1.5"/></svg>
                <span style={{ fontFamily: T.font, fontSize: 11, color: "#7A9A6A", opacity: 0.8 }}>Segment Map</span>
              </div>
            )}
          </div>
          <div style={{ padding: "14px 16px 16px", display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#E8E8E8", flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {badgeImg ? <img src={badgeImg} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }}/> : <span style={{ fontFamily: T.font, fontSize: 8, color: "#999", textAlign: "center", padding: 4 }}>Badge</span>}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, lineHeight: "20px", color: T.textPri, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{brandName ? `${brandName} Segment Challenge` : "Segment challenge name"}</div>
              <div style={{ fontFamily: T.font, fontSize: 15, color: T.textSec, lineHeight: "20px" }}>{dateRange}</div>
            </div>
          </div>
          <div style={{ padding: "0 16px 16px" }}>
            <button style={{ width: "100%", height: 44, borderRadius: 22, background: T.orange, border: "none", fontFamily: T.font, fontSize: 17, fontWeight: 700, color: "#fff", cursor: "default" }}>Join Challenge</button>
          </div>
        </div>
      </div>
      {/* Club post below */}
      <div style={{ background: T.bgSurface, marginTop: 8 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "16px 24px", position: "relative" }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{ width: 40, height: 40, borderRadius: 4, background: T.orange, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0px 1.25px 2.5px rgba(0,0,0,0.1)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M10.8 0L0 19.2h6.4L10.8 11l4.4 8.2H21.6L10.8 0z" fill="white"/><path d="M15.2 11l2.8 5.2 2.8-5.2h-5.6z" fill="rgba(255,255,255,0.6)"/></svg>
            </div>
            <div style={{ position: "absolute", top: -2, left: -2, width: 12, height: 12, borderRadius: "50%", background: "#FC5200", border: "1.5px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="7" height="6" viewBox="0 0 8 7" fill="none"><path d="M1 3.5L3 5.5L7 1.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, lineHeight: "18px", color: T.textPri }}>The Strava Club</div>
            <div style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px", marginTop: 4 }}>Today at 9:31 AM</div>
          </div>
          <div style={{ position: "absolute", right: 24, top: 16, display: "flex", gap: 3 }}>{[0,1,2].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: T.textPri }}/>)}</div>
        </div>
        <div style={{ padding: "0 24px", marginBottom: 16 }}>
          <div style={{ fontFamily: T.font, fontSize: 20, fontWeight: 700, lineHeight: "24px", color: T.textPri, marginBottom: 8 }}>Probably the most beautiful ride I've ever been on</div>
          <div style={{ fontFamily: T.font, fontSize: 15, color: T.textSec, lineHeight: "20px", marginBottom: 4 }}>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Praesent commodo cursus</div>
          <div style={{ fontFamily: T.fontMaison, fontSize: 12, color: T.textTer, lineHeight: "16px" }}>Read more...</div>
        </div>
        <div style={{ width: "100%", height: 200, background: "linear-gradient(135deg, #6B9E78, #3D6B52)", position: "relative", overflow: "hidden", marginBottom: 0 }}>
          <div style={{ position: "absolute", top: 12, left: 12, background: "white", borderRadius: 2, padding: "2px 6px", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}><span style={{ fontFamily: T.font, fontSize: 11, color: T.textPri, lineHeight: "13px" }}>Workout</span></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Facepile/><span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec }}>12 gave kudos</span></div>
          <span style={{ fontFamily: T.fontMaison, fontSize: 11, color: T.textSec }}>1 comment</span>
        </div>
        <div style={{ display: "flex", borderTop: `0.5px solid ${T.divider}` }}>
          {[
            { label: "Kudo", icon: <svg width="22" height="23" viewBox="0 0 22 23" fill="none"><path d="M1 9h3v12H1V9zm5-1.5C6 6.1 7.1 5 8.5 5H14l-1 4h5.5c.8 0 1.5.7 1.5 1.5v2c0 .2 0 .4-.1.6l-2.5 6c-.3.7-1 1.1-1.7 1.1H8.5C7.1 20.2 6 19.1 6 17.7V7.5z" stroke="#43423F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
            { label: "Comment", icon: <svg width="24" height="21" viewBox="0 0 24 21" fill="none"><path d="M21 1H3C1.9 1 1 1.9 1 3v13c0 1.1.9 2 2 2h4v3l4-3h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2z" stroke="#43423F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
            { label: "Share", icon: <svg width="20" height="23" viewBox="0 0 20 23" fill="none"><path d="M10 1v15M4 7l6-6 6 6M1 17v4h18v-4" stroke="#43423F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
          ].map(({ label, icon }) => (
            <div key={label} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 0", gap: 0 }}>{icon}</div>
          ))}
        </div>
      </div>
      <div style={{ height: 12 }}/>
    </div>
  );
}

// --- Screen Router -----------------------------------------------------------
const GROUPS_TAB_SCREENS = new Set(["not-joined","joined","takeover","groups-tab"]);

function ScreenRouter({ screen, data }) {
  switch(screen) {
    case "not-joined":     return <ScreenNotJoined data={data}/>;
    case "joined":         return <ScreenJoined data={data}/>;
    case "milestone":      return <ScreenMilestone data={data}/>;
    case "takeover":       return <ScreenTakeover data={data}/>;
    case "groups-tab":     return <ScreenGroupsTab data={data}/>;
    case "feed-follower":  return <ScreenHomeFeed data={data} variant="follower"/>;
    case "feed-inunit":    return <ScreenHomeFeed data={data} variant="inunit"/>;
    case "segment":        return <ScreenSegmentChallenge data={data}/>;
    default:               return <ScreenNotJoined data={data}/>;
  }
}

// --- Register ----------------------------------------------------------------
Object.assign(window.MT, { ScreenRouter, GROUPS_TAB_SCREENS });
