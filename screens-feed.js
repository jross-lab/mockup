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
  const { badgeImg, title, goal, brandName, startDate, endDate } = data;
  const dateRange = startDate && endDate ? `${startDate} to ${endDate}` : "March 1, 2026 to March 31 2026";
  // Card data: card 1 is dynamic, cards 2-4 use hardcoded sample brands
  const cards = [
    { badge: badgeImg, name: title || "Challenge\nName", goal: goal || "Complete a 5 km (3.1 mi) run.", date: dateRange, joined: false },
    { badge: "assets/badge_prime.png", name: "Prime Fast Track Challenge", goal: "Log a top 3 fastest 5K of all time", date: dateRange, joined: true },
    { badge: "assets/badge_nike.png", name: "The Big Run Powered by Nike...", goal: "Complete a 5 km (3.1 mi) run.", date: "March 1 to March 31, 2024", joined: false },
    { badge: "assets/badge_adidas.png", name: "You Got This: 100 Days powered by adidas", goal: "Complete a 5 km (3.1 mi) run.", date: "March 1 to March 31, 2024", joined: false },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", background: T.bgSunken }}>
      {/* Tabs: Active | Challenges | Clubs */}
      <div style={{ background: T.bgSurface, display: "flex", padding: "0 24px", position: "relative" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "#E0E0DE" }}/>
        {[
          { label: "Active", active: false },
          { label: "Challenges", active: true },
          { label: "Clubs", active: false },
        ].map(({ label, active }) => (
          <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 56, padding: "16px 0", borderBottom: active ? `2px solid ${T.orange}` : "none" }}>
            <span style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, lineHeight: "21px", color: active ? T.textPri : T.textTer, textAlign: "center" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Chip bar */}
      <div style={{ background: T.bgSurface, display: "flex", gap: 8, padding: "16px 24px", overflowX: "auto", boxShadow: "0px 2px 6px rgba(0,0,0,0.11)" }}>
        {[
          { label: "Label", selected: true },
          { label: "Label", selected: false },
          { label: "Label", selected: false },
          { label: "Label", selected: false },
        ].map((chip, i) => (
          <div key={i} style={{ height: 32, borderRadius: 8, border: `1px solid ${chip.selected ? T.orange : "#C2C1BB"}`, padding: "0 12px", display: "flex", alignItems: "center", gap: 8, background: "#fff", flexShrink: 0 }}>
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none"><path d="M8 0C3.58 0 0 3.36 0 7.5S3.58 15 8 15s8-3.36 8-7.5S12.42 0 8 0zm0 13.5c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" fill={chip.selected ? T.orange : "black"}/></svg>
            <span style={{ fontFamily: T.font, fontSize: 12, lineHeight: "16px", color: chip.selected ? T.orange : T.textPri, whiteSpace: "nowrap" }}>{chip.label}</span>
          </div>
        ))}
      </div>

      {/* Row: Past Group Challenges */}
      <div style={{ background: T.bgSurface, minHeight: 64, paddingLeft: 24, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", flex: 1, gap: 12, padding: "12px 0" }}>
          <div style={{ width: 24, height: 24, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="13" viewBox="0 0 16 13" fill="none"><path d="M5.08587 0.8599C5.45023 0.322114 6.05755 0 6.70714 0H7.33329C7.61693 0 7.865 0.190996 7.93752 0.465204L8.50587 2.61428C8.92534 4.20042 10.1402 5.45382 11.7125 5.92257L14.125 6.64181C15.2375 6.97348 16 7.99651 16 9.15739V9.40945C16 9.62683 15.9743 9.88685 15.8663 10.1475C15.7023 10.5433 15.3244 11.259 14.5547 11.8777C13.7752 12.5044 12.6321 13 11 13H9.33333C9.27917 13 9.22523 12.993 9.17288 12.9791L6.86634 12.3664L6.45508 12.8034C6.33697 12.9288 6.17229 13 5.99996 13H2.625C1.17525 13 0 11.8247 0 10.375V10.1344C0 9.68969 0.151331 9.25826 0.429103 8.91103L0.852738 8.38146L1.26798 3.78224C1.35909 2.77303 2.20506 2 3.21838 2H4.31344L5.08587 0.8599Z" fill="black"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textPri }}>Past Group Challenges</div>
            <div style={{ fontFamily: T.font, fontSize: 13, lineHeight: "18px", color: T.textSec }}>3</div>
          </div>
        </div>
        <div style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", padding: 10, marginRight: 24 }}>
          <svg width="6.8" height="12.77" viewBox="0 0 6.80202 12.768" fill="none"><path d="M0.884129 12.768L6.47252 7.17962C6.91186 6.74028 6.91186 6.02797 6.47252 5.58863L0.883883 0L0 0.883884L5.50024 6.38413L0.000245102 11.8841L0.884129 12.768Z" fill="#64635E"/></svg>
        </div>
      </div>

      {/* Recommended for You header */}
      <div style={{ display: "flex", gap: 16, alignItems: "center", padding: "16px 24px" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#C8C8C8", flexShrink: 0 }}/>
        <div>
          <div style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, lineHeight: "21px", color: T.textPri }}>Recommended for You</div>
          <div style={{ fontFamily: T.font, fontSize: 13, lineHeight: "18px", color: T.textSec }}>Based on your activities</div>
        </div>
      </div>

      {/* 2-column card grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "0 8px" }}>
        {cards.map((card, i) => (
          <div key={i} style={{ background: T.bgSurface, borderRadius: 16, padding: 16, width: "calc(50% - 4px)", height: 279, display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", boxSizing: "border-box" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Badge */}
              <div style={{ width: 55, height: 55, flexShrink: 0, overflow: "hidden" }}>
                {card.badge
                  ? <img src={card.badge} alt="" style={{ width: 55, height: 55, objectFit: "contain" }}/>
                  : <div style={{ width: 55, height: 55, background: "#E8E8E8", borderRadius: 2 }}/>}
              </div>
              {/* Title + details */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, lineHeight: "18px", color: T.textPri, width: 144, whiteSpace: "pre-wrap" }}>{card.name}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {/* Activity type icon */}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8.99018 7.38246L7.6373 9.74999L7.04164 9.74998L7.04161 11L8.3627 11L9.00982 9.86754L10.9899 13.2089L12.3493 11L13 11L13 9.74998L11.6507 9.75001L11.0101 10.7911L8.99018 7.38246Z" fill="#43423F"/><path d="M11.1237 2.87619C10.0698 1.15129 8.16935 0 6 0C2.68629 0 0 2.68629 0 6C0 8.16941 1.15136 10.0699 2.87635 11.1238C3.3743 11.9388 4.06123 12.6257 4.87623 13.1237C5.9301 14.8487 7.83059 16 10 16C13.3137 16 16 13.3137 16 10C16 7.83066 14.8487 5.93021 13.1238 4.87632C12.6258 4.06121 11.9388 3.37418 11.1237 2.87619ZM6 1.25C6.96397 1.25 7.86088 1.53715 8.60985 2.03059C8.40933 2.01035 8.20589 1.99998 8.00004 1.99998C4.68633 1.99998 2.00004 4.68627 2.00004 7.99998C2.00004 8.2059 2.01042 8.40939 2.03067 8.60997C1.53718 7.86098 1.25 6.96403 1.25 6C1.25 3.37665 3.37665 1.25 6 1.25ZM4 10C4 10.2059 4.01037 10.4093 4.03061 10.6098C3.53719 9.86083 3.25004 8.96394 3.25004 7.99998C3.25004 5.37663 5.37669 3.24998 8.00004 3.24998C8.96405 3.24998 9.86099 3.53715 10.61 4.03062C10.4094 4.01037 10.2059 4 10 4C6.68629 4 4 6.68629 4 10ZM10 5.25C12.6234 5.25 14.75 7.37665 14.75 10C14.75 12.6234 12.6234 14.75 10 14.75C7.37665 14.75 5.25 12.6234 5.25 10C5.25 7.37665 7.37665 5.25 10 5.25Z" fill="#43423F"/></svg>
                  <div style={{ fontFamily: T.font, fontSize: 12, lineHeight: "16px", color: T.textSec, width: 143 }}>{card.goal}</div>
                  <div style={{ fontFamily: T.font, fontSize: 12, lineHeight: "16px", color: T.textSec, width: 142 }}>{card.date}</div>
                </div>
              </div>
            </div>
            {/* Button */}
            <button style={{ width: "100%", minHeight: 32, borderRadius: 8, background: card.joined ? "transparent" : T.orange, border: card.joined ? `1.5px solid ${T.divider}` : "none", fontFamily: T.font, fontSize: 11, fontWeight: 500, lineHeight: "13px", color: card.joined ? T.orange : "#fff", cursor: "default", textAlign: "center" }}>{card.joined ? "Joined" : "Join"}</button>
          </div>
        ))}
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
const GROUPS_TAB_SCREENS = new Set(["not-joined","joined","completed","takeover","groups-tab"]);

function ScreenRouter({ screen, data }) {
  switch(screen) {
    case "not-joined":     return <ScreenNotJoined data={data}/>;
    case "joined":         return <ScreenJoined data={data}/>;
    case "completed":      return <ScreenCompleted data={data}/>;
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
