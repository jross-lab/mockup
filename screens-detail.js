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
// Redesigned to match Figma node 2150:19885
function ScreenNotJoined({ data }) {
  const { heroImg, badgeImg, brandName, title, goal, description, participants,
          startDate, endDate, activityType, reward } = data;
  return (
    <div style={{ display: "flex", flexDirection: "column", background: "#000" }}>

      {/* ── Cover Image ── */}
      <div style={{ width: "100%", height: 266, overflow: "hidden", flexShrink: 0, position: "relative" }}>
        {heroImg
          ? <img src={heroImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
          : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#d0d0d0,#a8a8a8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: T.font, fontSize: 12, color: "#fff", opacity: 0.6 }}>Hero Image (2:1)</span>
            </div>}
      </div>

      {/* ── CDP Details card (overlaps hero) ── */}
      <div style={{ background: "#fff", borderRadius: 32, marginTop: -36, position: "relative", zIndex: 1, boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}>
        <div style={{ padding: "32px 23px 0", display: "flex", flexDirection: "column", gap: 32 }}>

          {/* ── Badge + Title + Description + Button ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Badge (96px square, not circular) */}
              <div style={{ width: 96, height: 96, flexShrink: 0 }}>
                {badgeImg
                  ? <img src={badgeImg} alt="" style={{ width: 96, height: 96, objectFit: "contain" }}/>
                  : <div style={{ width: 96, height: 96, background: "#E8E8E8", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: T.font, fontSize: 9, color: "#999" }}>Badge</span>
                    </div>}
              </div>
              {/* Title + Goal text */}
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ fontFamily: T.font, fontSize: 22, fontWeight: 700, lineHeight: "28px", color: T.textPri }}>
                  {title || "Challenge Title"}
                </div>
                <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 400, lineHeight: "20px", color: T.textSec }}>
                  {goal || "Challenge goal"}
                </div>
              </div>
            </div>
            {/* Join button */}
            <button style={{ width: "100%", height: 48, borderRadius: 24, background: T.orange, border: "none", fontFamily: T.font, fontSize: 17, fontWeight: 700, color: "#fff", cursor: "default" }}>
              Join the Challenge
            </button>
          </div>

          {/* ── Organizing club ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri }}>
              Organizing club
            </div>
            <div style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0px 2px 6px rgba(0,0,0,0.11)", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {/* Club profile image */}
                <div style={{ width: 48, height: 48, borderRadius: 8, background: "#E8E8E8", flexShrink: 0, overflow: "hidden", boxShadow: "0px 1.5px 3px rgba(0,0,0,0.1)" }}>
                  {badgeImg
                    ? <img src={badgeImg} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 8 }}/>
                    : <span style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", fontFamily: T.font, fontSize: 9, color: "#999" }}>Logo</span>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, lineHeight: "20px", color: T.textPri, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {brandName || "Club Name"}
                  </div>
                  <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 2 }}>
                    <div style={{ width: 16, height: 16, flexShrink: 0, opacity: 0.9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8.68843 0C8.02519 0 7.37985 0.215115 6.84926 0.613058L3.52982 3.10263L0.683772 4.05132C0.27543 4.18743 0 4.56957 0 5C0 6.57896 0.196721 7.77215 0.566654 8.73398C0.942709 9.71172 1.4741 10.3883 2.04289 10.9571C2.34815 11.2624 2.64313 11.524 2.92865 11.7772C3.71439 12.4741 4.42845 13.1075 5.08755 14.4114C6.12048 16.9818 7.45819 19.1594 9.53364 20.6814C11.6286 22.2177 14.3564 23 18 23C20.1284 23 21.5871 22.4466 22.5488 21.589C23.5046 20.7365 23.8434 19.6954 23.9567 18.9614C24.1091 17.974 23.5681 17.1739 22.9903 16.7116L19.0976 13.5974C18.9434 13.4741 18.8292 13.3079 18.7693 13.1198L15.6746 3.39359C15.4106 2.56364 14.6397 2 13.7688 2H12.3333C11.9006 2 11.4795 2.14036 11.1333 2.4L10.5624 2.82823L10.0471 1.02486C9.8738 0.418234 9.31933 0 8.68843 0Z" fill="#43423F"/></svg>
                    </div>
                    <span style={{ fontFamily: T.font, fontSize: 13, color: T.textTer, lineHeight: "18px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {participants ? `${participants} Athletes` : "5,678 Athletes"}
                    </span>
                  </div>
                </div>
                {/* Join Club button */}
                <button style={{ height: 28, borderRadius: 14, background: "transparent", border: `1.5px solid ${T.orange}`, fontFamily: T.font, fontSize: 13, fontWeight: 700, color: T.orange, cursor: "default", padding: "0 12px", flexShrink: 0 }}>
                  Join Club
                </button>
              </div>
            </div>
          </div>

          {/* ── Challenge details ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri }}>
              Challenge details
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Date row */}
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ padding: 10, flexShrink: 0 }}><IcoDate/></div>
                <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textPri, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {startDate && endDate ? `${startDate} to ${endDate}` : "Start date to End date"}
                </div>
              </div>
              {/* Activity row */}
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ padding: 10, flexShrink: 0 }}><IcoActivityType/></div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textPri }}>
                    {goal || "Complete the challenge activity"}
                  </div>
                  <div style={{ fontFamily: T.font, fontSize: 13, lineHeight: "18px", color: T.textTer }}>
                    Qualifying Activities: {activityType || "Run, Virtual Run, Walk"}
                  </div>
                </div>
              </div>
              {/* Reward row */}
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ padding: 10, flexShrink: 0 }}><IcoReward/></div>
                <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textPri }}>
                  {reward || "Earn a digital finisher's badge for your Trophy Case."}
                </div>
              </div>
            </div>
          </div>

          {/* ── Challenge stats ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri }}>
                Challenge stats
              </div>
              <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textTer }}>
                These are cumulative stats across all qualifying of your activities during this challenge.
              </div>
            </div>
            {/* 3-row stats grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {[
                [{ label: "Distance", value: "147.7 mi" }, { label: "Moving Time", value: "18:02:25" }],
                [{ label: "Elevation Gain", value: "5,576 ft" }, { label: "Elapsed Time", value: "24:17:47" }],
                [{ label: "Steps", value: "45,254" }, { label: "Steps", value: "45,254" }],
              ].map((row, ri) => (
                <div key={ri} style={{ display: "flex", padding: "0 24px" }}>
                  {row.map(({ label, value }, ci) => (
                    <div key={ci} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
                      <span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px" }}>{label}</span>
                      <span style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, color: T.textPri, lineHeight: "22px" }}>{value}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ── Featured athletes ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri }}>
              Featured athletes
            </div>
            <div style={{ display: "flex", gap: 8, overflow: "hidden" }}>
              {[
                { name: "Single Name", location: "Belgium" },
                { name: "First Last but a longer name goes two lines", location: "United States" },
              ].map((a, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 16, width: 232, height: 260, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", boxShadow: "0px 3px 8px rgba(0,0,0,0.12), 0px 3px 1px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", width: "100%" }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: FALLBACK_COLORS[i % 3], flexShrink: 0 }}/>
                    <div style={{ textAlign: "center", width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri, overflow: "hidden" }}>{a.name}</div>
                      <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textSec, overflow: "hidden" }}>{a.location}</div>
                    </div>
                  </div>
                  <button style={{ width: "100%", height: 32, borderRadius: 16, background: T.orange, border: "none", fontFamily: T.font, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "default" }}>Follow</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Leaderboard section ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 32, alignItems: "center" }}>
          <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri, width: 343 }}>
            Leaderboard
          </div>
          {/* Privacy notice */}
          <div style={{ background: "#f7f7f7", borderRadius: 8, padding: "16px 18px", width: 344 }}>
            <div style={{ fontFamily: T.font, fontSize: 12, lineHeight: "16px", color: T.textSec }}>
              Any qualifying activity, whether private or not, will count towards your private progress, badges, and rewards for this challenge. To respect activity visibility settings, only activities marked as visible to Everyone will be applied toward leaderboard rankings. Manual activities will not count towards the leaderboard.
            </div>
          </div>
          {/* Tabs */}
          <div style={{ display: "flex", width: "100%", borderBottom: "1px solid #e0e0de", position: "relative", padding: "0 24px" }}>
            <div style={{ flex: 1, textAlign: "center", padding: "16px 4px", borderBottom: `2px solid ${T.orange}` }}>
              <span style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, color: T.textPri }}>Overall</span>
            </div>
            <div style={{ flex: 1, textAlign: "center", padding: "16px 4px" }}>
              <span style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, color: T.textTer }}>Following</span>
            </div>
          </div>
          {/* Column headers */}
          <div style={{ display: "flex", alignItems: "center", padding: "0 20px", width: "100%", gap: 8 }}>
            <div style={{ width: 222 }}>
              <span style={{ fontFamily: T.font, fontSize: 12, fontWeight: 700, lineHeight: "16px", color: T.textPri }}>Rank</span>
            </div>
            <div style={{ display: "flex", gap: 26, width: 126 }}>
              <span style={{ fontFamily: T.font, fontSize: 12, fontWeight: 700, lineHeight: "16px", color: T.textPri }}>Pace</span>
              <span style={{ fontFamily: T.font, fontSize: 12, fontWeight: 700, lineHeight: "16px", color: T.textPri }}>Distance</span>
            </div>
          </div>
          {/* Entries */}
          <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            {["Sarah Johnson","Marcus Chen","Amara Diallo","Tom Williams","Yuki Tanaka","Elena Rossi"].map((name, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", padding: "16px 24px", gap: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
                  <span style={{ fontFamily: T.font, fontSize: 12, color: T.textSec, padding: "0 4px", minWidth: 30 }}>{i + 1}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: `hsl(${i*55},40%,62%)`, flexShrink: 0 }}/>
                    <span style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, lineHeight: "18px", color: T.textPri, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 20 }}>
                  <span style={{ fontFamily: T.font, fontSize: 13, color: T.textSec, textAlign: "right", whiteSpace: "nowrap" }}>4:4{i} /mi</span>
                  <span style={{ fontFamily: T.font, fontSize: 13, color: T.textSec, textAlign: "right", whiteSpace: "nowrap" }}>{(13+i*1.2).toFixed(1)} km</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Description / About section ── */}
        <div style={{ padding: "40px 24px 24px", overflow: "hidden" }}>
          <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri, marginBottom: 8 }}>
            {title || "About this Challenge"}
          </div>
          <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textTer, whiteSpace: "pre-wrap" }}>
            {description || ""}
          </div>
        </div>
      </div>
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
            <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, lineHeight: "20px" }}>Challenge Title</div>
            <div style={{ fontFamily: T.font, fontSize: 13, color: T.textSec, marginTop: 2 }}>Goal summary</div>
          </div>
        </div>
      </div>
      {/* Takeover modal */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", borderTopLeftRadius: 24, borderTopRightRadius: 24, boxShadow: "0 -4px 24px rgba(0,0,0,0.2)", padding: 0, zIndex: 10 }}>
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 12, paddingBottom: 8 }}><div style={{ width: 36, height: 5, borderRadius: 3, background: "#D1D1D6" }}/></div>
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 20px" }}>
          <div style={{ width: 100, height: 100, borderRadius: "50%", background: "#E8E8E8", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
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
