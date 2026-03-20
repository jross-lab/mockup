/**
 * screens-detail.js
 * Challenge Detail screens: Not Joined, Joined, Takeover, Milestone.
 * ─────────────────────────────────────────────────────────────
 * EDIT THIS FILE when: modifying the Challenge Detail Page,
 * Joined view, Takeover modal, or Milestone feed card.
 */

const { T, FALLBACK_COLORS, MILESTONE_AVATAR,
        IcoDate, IcoActivityType, IcoReward,
        Facepile, HeroBadge, InfoRow, OrangeBtn, SponsorCard, InfoRows,
        StatsGrid, FeaturedAthletes, ProgressCard, Leaderboard, DescriptionSection,
} = window.MT;

// --- Screen: Not Joined (Challenge Detail) -----------------------------------
function ScreenNotJoined({ data }) {
  const { heroImg, badgeImg, brandName, title, goal, description, participants } = data;
  return (
    <div style={{ display: "flex", flexDirection: "column", background: T.bgSunken }}>
      <HeroBadge heroImg={heroImg} badgeImg={badgeImg}/>
      <div style={{ height: 60, background: T.bgSurface }}/>
      <div style={{ background: T.bgSurface, padding: "8px 24px 0", textAlign: "center" }}>
        <div style={{ fontFamily: T.font, fontSize: 22, fontWeight: 700, lineHeight: "28px", marginBottom: 8 }}>{title || "Challenge Title"}</div>
        <div style={{ fontFamily: T.font, fontSize: 15, color: T.textSec, lineHeight: "20px", marginBottom: 24 }}>{goal || "Challenge goal"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", paddingBottom: 16 }}>
          <OrangeBtn label="Join Challenge"/><OrangeBtn label="Invite Friends" outline/>
        </div>
      </div>
      <div style={{ background: T.bgSurface, padding: "12px 24px", display: "flex", alignItems: "center", gap: 10 }}>
        <Facepile/><span style={{ fontFamily: T.font, fontSize: 13, color: T.textSec }}>{participants ? `${participants} athletes have joined` : "Athletes have joined"}</span>
      </div>
      <InfoRows data={data}/>
      <SponsorCard brandName={brandName} badgeImg={badgeImg}/>
      <DescriptionSection title={title} description={description}/>
      <div style={{ height: 24 }}/>
    </div>
  );
}

// --- Screen: Joined ----------------------------------------------------------
function ScreenJoined({ data }) {
  const { heroImg, badgeImg, brandName, title, goal, description } = data;
  return (
    <div style={{ display: "flex", flexDirection: "column", background: T.bgSunken }}>
      <HeroBadge heroImg={heroImg} badgeImg={badgeImg}/>
      <div style={{ height: 60, background: T.bgSurface }}/>
      <div style={{ background: T.bgSurface, padding: "8px 24px 20px", textAlign: "center" }}>
        <div style={{ fontFamily: T.font, fontSize: 22, fontWeight: 700, lineHeight: "28px", marginBottom: 8 }}>{title || "Challenge Title"}</div>
        <div style={{ fontFamily: T.font, fontSize: 15, color: T.textSec, lineHeight: "20px", marginBottom: 20 }}>{goal || "Challenge goal"}</div>
        <div style={{ margin: "0 auto" }}><ProgressCard label="17 km" total="80 km" pct={21} right="3 days left"/></div>
      </div>
      <InfoRows data={data}/>
      <SponsorCard brandName={brandName} badgeImg={badgeImg}/>
      <StatsGrid/>
      <FeaturedAthletes/>
      <div style={{ background: T.bgSurface, padding: "20px 24px" }}>
        <div style={{ fontFamily: T.font, fontSize: 12, color: T.textSec, lineHeight: "16px" }}>
          Any qualifying activity, whether private or not, will count towards your private progress, badges, and rewards for this challenge. Only activities marked as visible to Everyone will be applied toward leaderboard rankings.
        </div>
      </div>
      <Leaderboard/>
      <DescriptionSection title={title} description={description}/>
      <div style={{ height: 24 }}/>
    </div>
  );
}

// --- Screen: Challenge Takeover (completion modal) ---------------------------
function ScreenTakeover({ data }) {
  const { badgeImg, brandName, title } = data;
  return (
    <div style={{ display: "flex", flexDirection: "column", background: T.bgSunken, minHeight: 680, position: "relative" }}>
      <div style={{ background: T.bgSurface, borderBottom: `0.5px solid ${T.divider}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px" }}>
          <span style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700 }}>Groups</span>
          <div style={{ display: "flex", gap: 16 }}>
            {[...Array(2)].map((_, i) => (<div key={i} style={{ width: 24, height: 24, borderRadius: 4, background: "#E8E8E8" }}/>))}
          </div>
        </div>
        <div style={{ display: "flex", borderBottom: `0.5px solid ${T.divider}` }}>
          {[{ label: "Active", active: false }, { label: "Challenges", active: true }, { label: "Clubs", active: false }].map(({ label, active }) => (
            <div key={label} style={{ flex: 1, textAlign: "center", padding: "14px 0", borderBottom: active ? `2px solid ${T.orange}` : "none" }}>
              <span style={{ fontFamily: T.font, fontSize: 15, fontWeight: active ? 700 : 400, color: active ? T.textPri : T.textTer }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Background content (blurred) */}
      <div style={{ opacity: 0.35, pointerEvents: "none" }}>
        <div style={{ background: T.bgSurface, padding: "10px 16px", display: "flex", gap: 8, overflowX: "hidden" }}>
          {["Running", "Cycling", "Walking", "All"].map((chip, i) => (
            <div key={chip} style={{ height: 32, borderRadius: 8, border: `1px solid ${i === 0 ? T.orange : "#C2C1BB"}`, padding: "0 12px", display: "flex", alignItems: "center", background: "#fff", flexShrink: 0 }}>
              <span style={{ fontFamily: T.font, fontSize: 12, color: i === 0 ? T.orange : T.textPri }}>{chip}</span>
            </div>
          ))}
        </div>
        <div style={{ width: "100%", height: 140, background: "linear-gradient(135deg,#c8c8c8,#a0a0a0)" }}/>
        <div style={{ background: T.bgSurface, padding: "16px 24px", display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: 4, background: "#E8E8E8", flexShrink: 0 }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, lineHeight: "22px", marginBottom: 4 }}>Get Sponsored by {brandName || "Brand"}</div>
            <div style={{ fontFamily: T.font, fontSize: 12, color: T.textSec }}>17 km / 80 km</div>
          </div>
          <button style={{ height: 34, borderRadius: 17, background: T.orange, border: "none", fontFamily: T.font, fontSize: 13, fontWeight: 700, color: "#fff", padding: "0 16px" }}>Join</button>
        </div>
        <div style={{ background: T.bgSurface, padding: "12px 24px" }}>
          <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Active Challenges</div>
          <div style={{ display: "flex", gap: 16 }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#E8E8E8", border: `3px solid ${["#88CF25","#FC5200","#4A7FA5"][i]}` }}/>
                <div style={{ fontFamily: T.font, fontSize: 10, color: T.textSec, textAlign: "center", width: 72, lineHeight: "12px" }}>Challenge {i+1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Scrim */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1 }}/>
      {/* Modal */}
      <div style={{ position: "absolute", left: 16, right: 16, top: "50%", transform: "translateY(-50%)", background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", zIndex: 2 }}>
        <div style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="#64635E" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
        <div style={{ padding: "32px 24px 0", display: "flex", justifyContent: "center" }}>
          <div style={{ width: 150, height: 150, borderRadius: "50%", background: "#E8E8E8", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #F0F0EE" }}>
            {badgeImg ? <img src={badgeImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/> : <span style={{ fontFamily: T.font, fontSize: 11, color: "#999", textAlign: "center", padding: 8 }}>Challenge Badge</span>}
          </div>
        </div>
        <div style={{ padding: "16px 24px 8px" }}>
          <p style={{ fontFamily: T.font, fontSize: 17, color: T.textSec, lineHeight: "22px", textAlign: "left" }}>
            Congratulations! You completed{" "}<span style={{ fontWeight: 700, color: T.textPri }}>{title || "the challenge"}</span>{brandName ? ` powered by ${brandName}` : ""}!
          </p>
        </div>
        <div style={{ padding: "8px 24px 24px", display: "flex", gap: 8 }}>
          <button style={{ flex: 1, height: 50, borderRadius: 25, background: "transparent", border: `1.5px solid ${T.divider}`, fontFamily: T.font, fontSize: 17, color: T.orange, fontWeight: 700, cursor: "default" }}>Dismiss</button>
          <button style={{ flex: 1, height: 50, borderRadius: 25, background: T.orange, border: "none", fontFamily: T.font, fontSize: 17, fontWeight: 700, color: "#fff", cursor: "default" }}>Redeem</button>
        </div>
      </div>
    </div>
  );
}

// --- Screen: Milestone (Feed Card) -------------------------------------------
function ScreenMilestone({ data }) {
  const { badgeImg, brandName, title } = data;
  return (
    <div style={{ display: "flex", flexDirection: "column", background: T.bgSurface }}>
      <div style={{ padding: "16px 24px", display: "flex", gap: 12, alignItems: "flex-start", position: "relative", background: T.bgSurface }}>
        <div style={{ position: "relative", flexShrink: 0, width: 48, height: 48, overflow: "visible" }}>
          <img src={MILESTONE_AVATAR} alt="" style={{ width: 48, height: 48, display: "block" }}/>
          <div style={{ position: "absolute", top: -3, right: -3, width: 14, height: 14 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="#FC5200"/><path d="M4 7L6 9L10 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, lineHeight: "18px", color: T.textPri, marginBottom: 3 }}>Dante Young</div>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <div style={{ width: 16, height: 16, flexShrink: 0, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 2 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2.00004 2.99988H6.00004V4.24988H5.43413L5.8627 4.99988H9.83496L9.41263 3.83847C9.34295 3.64686 9.37112 3.43331 9.48808 3.26632C9.60505 3.09932 9.79612 2.99988 10 2.99988H13.5C14.3284 2.99988 15 3.67145 15 4.49988C15 5.32831 14.3284 5.99988 13.5 5.99988H13V4.74988H13.5C13.6381 4.74988 13.75 4.63795 13.75 4.49988C13.75 4.36181 13.6381 4.24988 13.5 4.24988H10.8923L11.9103 7.04934C12.102 7.01682 12.299 6.99988 12.5 6.99988C14.433 6.99988 16 8.56688 16 10.4999C16 12.4329 14.433 13.9999 12.5 13.9999C10.567 13.9999 9 12.4329 9 10.4999C9 9.21035 9.69737 8.08371 10.7356 7.47652L10.4107 6.58312L7.98846 10.6923C7.87609 10.8829 7.67131 10.9999 7.45004 10.9999H6.96457C6.72199 12.6961 5.26326 14 3.5 14C1.567 14 0 12.433 0 10.5C0 8.56696 1.567 6.99996 3.5 6.99996C3.87529 6.99996 4.23678 7.05903 4.57569 7.16837L5.09112 6.16906L3.99444 4.24988H2.00004V2.99988ZM5.83035 7.46271L4.65065 9.74988H7.09296L7.11547 9.71168L5.83035 7.46271ZM7.84651 8.47153L9.15611 6.24988H6.57699L7.84651 8.47153ZM3.5 8.24996C2.25736 8.24996 1.25 9.25732 1.25 10.5C1.25 11.7426 2.25736 12.75 3.5 12.75C4.57082 12.75 5.46693 12.0019 5.69426 10.9999H3.62504C3.40703 10.9999 3.20478 10.8863 3.09133 10.7001C2.97789 10.514 2.96964 10.2821 3.06958 10.0884L3.99019 8.30351C3.83239 8.26845 3.66836 8.24996 3.5 8.24996ZM11.1739 8.682C10.6138 9.09126 10.25 9.75308 10.25 10.4999C10.25 11.7425 11.2574 12.7499 12.5 12.7499C13.7426 12.7499 14.75 11.7425 14.75 10.4999C14.75 9.25724 13.7426 8.24988 12.5 8.24988C12.4491 8.24988 12.3987 8.25156 12.3487 8.25489L13.301 10.8737L12.1262 11.3008L11.1739 8.682Z" fill="#43423F"/></svg>
            </div>
            <span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px" }}>Today at 9:31 AM · Los Angeles, California</span>
          </div>
        </div>
        <div style={{ position: "absolute", right: 24, top: 24, width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="5" viewBox="0 0 16 5" fill="none"><circle cx="2" cy="2.5" r="1.5" fill="#000"/><circle cx="8" cy="2.5" r="1.5" fill="#000"/><circle cx="14" cy="2.5" r="1.5" fill="#000"/></svg>
        </div>
      </div>
      <div style={{ padding: "0 24px 12px" }}>
        <div style={{ fontFamily: T.font, fontSize: 20, fontWeight: 700, lineHeight: "24px", color: T.textPri }}>Probably the most beautiful ride I've ever been on</div>
      </div>
      <div style={{ padding: "0 24px 12px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 24 }}>
          {[["Distance","18.33 mi"],["Time","2h 20m"],["Elevation","2,033 ft"]].map(([label, val]) => (
            <div key={label}><div style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px", marginBottom: 2 }}>{label}</div><div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px" }}>{val}</div></div>
          ))}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px", marginBottom: 2 }}>Achievements</div>
          <div style={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "flex-end" }}>
            <span style={{ fontSize: 14 }}>🏆</span><span style={{ fontSize: 14 }}>🏆</span><span style={{ fontSize: 14 }}>🏆</span>
            <span style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700 }}>3</span>
          </div>
        </div>
      </div>
      <div style={{ padding: "0 24px 12px" }}>
        <div style={{ background: "#fff", borderRadius: 8, padding: "12px 16px 12px 12px", display: "flex", gap: 12, alignItems: "flex-start", boxShadow: "0px 2px 6px 0px rgba(0,0,0,0.11)" }}>
          <div style={{ width: 32, height: 32, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {badgeImg ? <img src={badgeImg} alt="" style={{ width: 32, height: 32, objectFit: "contain" }}/> : <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#E8E8E8" }}/>}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, lineHeight: "18px", color: T.textPri, marginBottom: 2 }}>
              {brandName ? `${brandName} Challenge milestone reached!` : "Mark just became the Local Legend of Pso De Florencio Climb"}
            </div>
            <div style={{ fontFamily: T.font, fontSize: 11, fontWeight: 400, lineHeight: "13px", color: T.textSec }}>{title || "Most segment efforts in the last 90 days"}</div>
          </div>
        </div>
      </div>
      <div style={{ padding: "0 0 0 24px", marginBottom: 0 }}>
        <div style={{ display: "flex", gap: 8, height: 220, overflow: "hidden" }}>
          <div style={{ width: 280, height: 220, borderRadius: 8, flexShrink: 0, overflow: "hidden", position: "relative", background: "#D8EACF" }}>
            <svg width="280" height="220" viewBox="0 0 280 220" style={{ position: "absolute", inset: 0 }}>
              <rect width="280" height="220" fill="#D8EACF"/><rect x="0" y="80" width="280" height="50" fill="#EAF0E6"/><rect x="90" y="0" width="50" height="220" fill="#EAF0E6"/>
              <path d="M60 160 Q90 130 120 110 Q150 90 170 70 Q190 50 210 60 Q230 70 240 90" stroke="#FC5200" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
              <circle cx="60" cy="160" r="5" fill="#3A8A3A" stroke="white" strokeWidth="1.5"/><circle cx="240" cy="90" r="5" fill="#FC5200" stroke="white" strokeWidth="1.5"/>
            </svg>
            <div style={{ position: "absolute", top: 10, left: 10, background: "white", borderRadius: 2, padding: "2px 6px", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}><span style={{ fontFamily: T.font, fontSize: 11, fontWeight: 700 }}>Workout</span></div>
          </div>
          <div style={{ width: 220, height: 220, borderRadius: 8, flexShrink: 0, overflow: "hidden", position: "relative", background: "linear-gradient(160deg, #7BA888 0%, #4A7A5A 50%, #2D5C3E 100%)" }}>
            <div style={{ position: "absolute", top: 10, left: 10, background: "white", borderRadius: 2, padding: "2px 6px", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}><span style={{ fontFamily: T.font, fontSize: 11, fontWeight: 700 }}>Workout</span></div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Facepile/><span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec }}>12 gave kudos</span></div>
        <span style={{ fontFamily: T.fontMaison, fontSize: 11, color: T.textSec }}>1 comment</span>
      </div>
      <div style={{ height: 12 }}/>
    </div>
  );
}

// --- Register ----------------------------------------------------------------
Object.assign(window.MT, {
  ScreenNotJoined, ScreenJoined, ScreenTakeover, ScreenMilestone,
});
