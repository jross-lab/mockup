/**
 * screens-detail.js
 * Challenge Detail screens: Not Joined, Joined, Takeover, Milestone.
 * ─────────────────────────────────────────────────────────────
 * EDIT THIS FILE when: modifying the Challenge Detail Page,
 * Joined view, Takeover modal, or Milestone feed card.
 */

const { T, FALLBACK_COLORS, MILESTONE_AVATAR, MILESTONE_MAP_IMG,
        IcoDate, IcoActivityType, IcoReward,
        IcoKudo, IcoComment, IcoShareAction,
        Facepile, HeroBadge, InfoRow, OrangeBtn, SponsorCard, InfoRows,
        StatsGrid, FeaturedAthletes, ProgressCard, Leaderboard, DescriptionSection,
} = window.MT;

// --- Screen: Not Joined (Challenge Detail) -----------------------------------
// Redesigned to match Figma node 2150:19885
function ScreenNotJoined({ data }) {
  const { heroImg, badgeImg, logoImg, brandName, title, goal, description, participants,
          startDate, endDate, activityType, reward } = data;
  return (
    <div style={{ display: "flex", flexDirection: "column", background: "#000", position: "relative" }}>

      {/* ── Floating Top Nav (status bar + action buttons) ── */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 10, pointerEvents: "none" }}>
        {/* Status bar */}
        <svg width="375" height="54" viewBox="0 0 375 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M55.9091 24.7231C58.4658 24.7231 60.6904 26.541 60.6904 30.8574V30.874C60.6904 34.9082 58.8725 37.2988 55.8593 37.2988C53.6596 37.2988 52.0161 35.9956 51.6342 34.1611L51.6176 34.0698H53.726L53.7509 34.1528C54.0663 34.9912 54.8051 35.5391 55.8593 35.5391C57.7602 35.5391 58.5654 33.6797 58.6567 31.3887C58.6567 31.2974 58.665 31.2061 58.665 31.1147H58.499C58.059 32.061 57.0131 32.8994 55.3696 32.8994C53.0703 32.8994 51.4599 31.2227 51.4599 28.9482V28.9316C51.4599 26.4995 53.311 24.7231 55.9091 24.7231ZM55.9008 31.2559C57.2538 31.2559 58.2914 30.2764 58.2914 28.9233V28.9067C58.2914 27.5371 57.2538 26.4663 55.9257 26.4663C54.6059 26.4663 53.5517 27.5205 53.5517 28.8569V28.8735C53.5517 30.2598 54.5395 31.2559 55.9008 31.2559ZM64.0509 29.2388C63.2956 29.2388 62.7311 28.6577 62.7311 27.9272C62.7311 27.1885 63.2956 26.6157 64.0509 26.6157C64.8146 26.6157 65.3707 27.1885 65.3707 27.9272C65.3707 28.6577 64.8146 29.2388 64.0509 29.2388ZM64.0509 35.3979C63.2956 35.3979 62.7311 34.8252 62.7311 34.0864C62.7311 33.3477 63.2956 32.7749 64.0509 32.7749C64.8146 32.7749 65.3707 33.3477 65.3707 34.0864C65.3707 34.8252 64.8146 35.3979 64.0509 35.3979ZM73.222 37V34.7007H67.3617V32.9492C68.9139 30.2515 70.6156 27.4956 72.2425 25.022H75.2723V32.9326H76.8827V34.7007H75.2723V37H73.222ZM69.3539 32.9824H73.2552V26.7319H73.1307C71.9022 28.6079 70.516 30.8242 69.3539 32.8579V32.9824ZM81.4385 37V27.1304H81.2974L78.3174 29.2388V27.2217L81.4468 25.022H83.5801V37H81.4385Z" fill="white"/>
          <path opacity="0.35" d="M322.435 23.5H339.435C341.368 23.5 342.935 25.067 342.935 27V32C342.935 33.933 341.368 35.5 339.435 35.5H322.435C320.502 35.5 318.935 33.933 318.935 32V27C318.935 25.067 320.502 23.5 322.435 23.5Z" stroke="white"/>
          <path opacity="0.4" d="M344.435 28V32.2203C345.284 31.8629 345.836 31.0314 345.836 30.1102C345.836 29.1889 345.284 28.3574 344.435 28Z" fill="white"/>
          <path d="M320.435 27C320.435 25.8954 321.33 25 322.435 25H339.435C340.54 25 341.435 25.8954 341.435 27V32C341.435 33.1046 340.54 34 339.435 34H322.435C321.33 34 320.435 33.1046 320.435 32V27Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M303.206 26.104C305.693 26.1041 308.085 27.0262 309.887 28.6796C310.023 28.8073 310.24 28.8057 310.374 28.676L311.671 27.4126C311.739 27.3468 311.777 27.2577 311.776 27.165C311.775 27.0724 311.737 26.9837 311.668 26.9187C306.937 22.544 299.473 22.544 294.742 26.9187C294.674 26.9837 294.635 27.0723 294.634 27.165C294.634 27.2577 294.671 27.3468 294.739 27.4126L296.037 28.676C296.17 28.8059 296.388 28.8075 296.523 28.6796C298.326 27.0261 300.718 26.104 303.206 26.104ZM303.202 30.3243C304.56 30.3242 305.868 30.8359 306.875 31.76C307.011 31.8912 307.225 31.8883 307.358 31.7536L308.645 30.4343C308.713 30.3651 308.75 30.2712 308.749 30.1737C308.748 30.0761 308.709 29.9831 308.64 29.9153C305.576 27.0244 300.831 27.0244 297.767 29.9153C297.698 29.9831 297.659 30.0762 297.658 30.1738C297.657 30.2714 297.695 30.3652 297.762 30.4343L299.049 31.7536C299.182 31.8883 299.396 31.8912 299.533 31.76C300.538 30.8365 301.846 30.3248 303.202 30.3243ZM305.727 33.1178C305.729 33.2232 305.692 33.3247 305.624 33.3985L303.448 35.8533C303.384 35.9254 303.297 35.966 303.206 35.966C303.115 35.966 303.028 35.9254 302.964 35.8533L300.787 33.3985C300.72 33.3247 300.683 33.2231 300.685 33.1177C300.687 33.0124 300.728 32.9126 300.798 32.842C302.188 31.5281 304.224 31.5281 305.614 32.842C305.684 32.9127 305.725 33.0125 305.727 33.1178Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M287.135 24.682C287.135 24.0489 286.657 23.5358 286.068 23.5358H285.002C284.413 23.5358 283.935 24.0489 283.935 24.682V34.616C283.935 35.249 284.413 35.7622 285.002 35.7622H286.068C286.657 35.7622 287.135 35.249 287.135 34.616V24.682ZM279.701 25.981H280.768C281.357 25.981 281.834 26.5065 281.834 27.1548V34.5884C281.834 35.2367 281.357 35.7622 280.768 35.7622H279.701C279.112 35.7622 278.634 35.2367 278.634 34.5884V27.1548C278.634 26.5065 279.112 25.981 279.701 25.981ZM275.369 28.6301H274.303C273.713 28.6301 273.236 29.1623 273.236 29.8188V34.5735C273.236 35.23 273.713 35.7622 274.303 35.7622H275.369C275.958 35.7622 276.436 35.23 276.436 34.5735V29.8188C276.436 29.1623 275.958 28.6301 275.369 28.6301ZM270.068 31.0754H269.002C268.413 31.0754 267.935 31.6 267.935 32.2471V34.5905C267.935 35.2376 268.413 35.7622 269.002 35.7622H270.068C270.657 35.7622 271.135 35.2376 271.135 34.5905V32.2471C271.135 31.6 270.657 31.0754 270.068 31.0754Z" fill="white"/>
        </svg>
        {/* Floating action buttons row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 17px 0" }}>
          {/* Back button */}
          <div style={{ width: 40, height: 40, borderRadius: 20, background: "#fff", boxShadow: "0px 2px 6px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none"><path d="M10.5858 19.4142L2.58579 11.4142C1.80474 10.6332 1.80474 9.36684 2.58579 8.58579L10.5858 0.585791L12 2L4 10L12 18L10.5858 19.4142Z" fill="black"/></svg>
          </div>
          {/* Info + Share buttons */}
          <div style={{ display: "flex", gap: 17 }}>
            {/* Info button (ⓘ) */}
            <div style={{ width: 40, height: 40, borderRadius: 20, background: "#fff", boxShadow: "0px 2px 6px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.25" stroke="black" strokeWidth="1.5"/><path d="M12 11V17" stroke="black" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="8" r="1" fill="black"/></svg>
            </div>
            {/* Share button (iOS share) */}
            <div style={{ width: 40, height: 40, borderRadius: 20, background: "#fff", boxShadow: "0px 2px 6px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="23" viewBox="0 0 20 23" fill="none"><path d="M10 1V14" stroke="black" strokeWidth="1.5" strokeLinecap="round"/><path d="M6 5L10 1L14 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 12V20C1 21.1046 1.89543 22 3 22H17C18.1046 22 19 21.1046 19 20V12" stroke="black" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
          </div>
        </div>
      </div>

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
            <button style={{ width: "100%", borderRadius: 12, background: T.orange, border: "none", fontFamily: T.font, fontSize: 16, fontWeight: 700, lineHeight: "21px", color: "#fff", cursor: "default", padding: "12px 24px" }}>
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
                  {logoImg
                    ? <img src={logoImg} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 8 }}/>
                    : <span style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", fontFamily: T.font, fontSize: 9, color: "#999" }}>Logo</span>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, lineHeight: "20px", color: T.textPri, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {brandName || "Club Name"}
                  </div>
                  <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 2 }}>
                    <div style={{ width: 16, height: 16, flexShrink: 0, opacity: 0.9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.9"><path d="M5.78292 1.8963e-10C5.29058 1.00138e-05 4.81429 0.175088 4.43916 0.493947L2.43902 2.19405C2.43514 2.19735 2.4307 2.19991 2.4259 2.2016L0.416987 2.91063C0.167105 2.99882 0 3.23501 0 3.5C0 4.54992 0.13411 5.33428 0.387357 5.95881C0.645232 6.59477 1.00943 7.0222 1.39571 7.37698C1.58922 7.55471 1.77703 7.70843 1.95926 7.85758C2.50374 8.30322 2.99849 8.70815 3.4473 9.59152C4.13978 11.306 5.02254 12.6847 6.40088 13.6211C7.78387 14.5608 9.58409 15 12 15C13.3678 15 14.3116 14.6941 14.9483 14.2154C15.5915 13.7318 15.8522 13.1238 15.9502 12.661C16.0892 12.004 15.7156 11.4718 15.3494 11.1775L12.7703 9.10388C12.6594 9.01471 12.5779 8.89419 12.5365 8.75803L10.4546 1.91568C10.2891 1.37176 9.78744 1 9.21889 1H8.31882C7.97051 1 7.63696 1.14067 7.39384 1.39011L6.99597 1.79832L6.66084 0.657163C6.54643 0.267576 6.18895 -8.22525e-06 5.78292 1.8963e-10ZM5.24872 1.44637C5.33534 1.37274 5.43553 1.3184 5.54266 1.28578L6.39898 4.20168L8.28898 2.26258C8.29683 2.25454 8.30759 2.25 8.31882 2.25H9.21889C9.23723 2.25 9.25342 2.26199 9.25876 2.27954L10.0865 5H8V6.25H10.4668L10.695 7H9V8.25H11.0753L11.3406 9.12188C11.4551 9.49832 11.6804 9.83152 11.9871 10.0781L13.9156 11.6286C13.4013 11.6951 12.7498 11.75 12 11.75C10.6698 11.75 9.85676 11.4797 9.27742 11.0657C8.68513 10.6425 8.26165 10.0177 7.80307 9.1464C7.65262 8.86054 7.50097 8.55256 7.3401 8.22586C6.59022 6.70298 5.64009 4.77344 3.67763 2.78179L5.24872 1.44637ZM2.59524 3.4674C4.53234 5.36695 5.42673 7.17769 6.2006 8.74442C6.36857 9.0845 6.53087 9.41309 6.69693 9.72859C7.17585 10.6385 7.71071 11.4825 8.5507 12.0827C9.40366 12.6922 10.4968 13 12 13C13.0385 13 13.9054 12.9027 14.5158 12.8046L14.5775 12.7945C14.4949 12.9371 14.3741 13.0832 14.1971 13.2163C13.8407 13.4842 13.1892 13.75 12 13.75C9.72525 13.75 8.20411 13.3351 7.10336 12.5872C6.00466 11.8407 5.24317 10.7074 4.59698 9.10019C4.5905 9.08406 4.58334 9.06821 4.57554 9.05268C3.99256 7.89268 3.23938 7.28056 2.66054 6.81012C2.50621 6.68469 2.36427 6.56934 2.24125 6.45635C1.94703 6.18612 1.71448 5.90523 1.54575 5.4891C1.40068 5.13134 1.29131 4.64479 1.25947 3.93885L2.59524 3.4674Z" fill="#64635E"/></g></svg>
                    </div>
                    <span style={{ fontFamily: T.font, fontSize: 13, color: T.textTer, lineHeight: "18px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {participants ? `${participants} Athletes` : "5,678 Athletes"}
                    </span>
                  </div>
                </div>
                {/* Join Club button */}
                <button style={{ height: 28, borderRadius: 14, background: "transparent", border: "1px solid #fd9766", fontFamily: T.font, fontSize: 11, fontWeight: 700, lineHeight: "13px", color: T.orange, cursor: "default", padding: "0 12px", flexShrink: 0 }}>
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
// Duplicate of ScreenNotJoined with progress card instead of Join button
// Progress card matches Figma node 2150:20028
function ScreenJoined({ data }) {
  const { heroImg, badgeImg, logoImg, brandName, title, goal, description, participants,
          startDate, endDate, activityType, reward } = data;
  return (
    <div style={{ display: "flex", flexDirection: "column", background: "#000", position: "relative" }}>

      {/* ── Floating Top Nav (status bar + action buttons) ── */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 10, pointerEvents: "none" }}>
        {/* Status bar */}
        <svg width="375" height="54" viewBox="0 0 375 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M55.9091 24.7231C58.4658 24.7231 60.6904 26.541 60.6904 30.8574V30.874C60.6904 34.9082 58.8725 37.2988 55.8593 37.2988C53.6596 37.2988 52.0161 35.9956 51.6342 34.1611L51.6176 34.0698H53.726L53.7509 34.1528C54.0663 34.9912 54.8051 35.5391 55.8593 35.5391C57.7602 35.5391 58.5654 33.6797 58.6567 31.3887C58.6567 31.2974 58.665 31.2061 58.665 31.1147H58.499C58.059 32.061 57.0131 32.8994 55.3696 32.8994C53.0703 32.8994 51.4599 31.2227 51.4599 28.9482V28.9316C51.4599 26.4995 53.311 24.7231 55.9091 24.7231ZM55.9008 31.2559C57.2538 31.2559 58.2914 30.2764 58.2914 28.9233V28.9067C58.2914 27.5371 57.2538 26.4663 55.9257 26.4663C54.6059 26.4663 53.5517 27.5205 53.5517 28.8569V28.8735C53.5517 30.2598 54.5395 31.2559 55.9008 31.2559ZM64.0509 29.2388C63.2956 29.2388 62.7311 28.6577 62.7311 27.9272C62.7311 27.1885 63.2956 26.6157 64.0509 26.6157C64.8146 26.6157 65.3707 27.1885 65.3707 27.9272C65.3707 28.6577 64.8146 29.2388 64.0509 29.2388ZM64.0509 35.3979C63.2956 35.3979 62.7311 34.8252 62.7311 34.0864C62.7311 33.3477 63.2956 32.7749 64.0509 32.7749C64.8146 32.7749 65.3707 33.3477 65.3707 34.0864C65.3707 34.8252 64.8146 35.3979 64.0509 35.3979ZM73.222 37V34.7007H67.3617V32.9492C68.9139 30.2515 70.6156 27.4956 72.2425 25.022H75.2723V32.9326H76.8827V34.7007H75.2723V37H73.222ZM69.3539 32.9824H73.2552V26.7319H73.1307C71.9022 28.6079 70.516 30.8242 69.3539 32.8579V32.9824ZM81.4385 37V27.1304H81.2974L78.3174 29.2388V27.2217L81.4468 25.022H83.5801V37H81.4385Z" fill="white"/>
          <path opacity="0.35" d="M322.435 23.5H339.435C341.368 23.5 342.935 25.067 342.935 27V32C342.935 33.933 341.368 35.5 339.435 35.5H322.435C320.502 35.5 318.935 33.933 318.935 32V27C318.935 25.067 320.502 23.5 322.435 23.5Z" stroke="white"/>
          <path opacity="0.4" d="M344.435 28V32.2203C345.284 31.8629 345.836 31.0314 345.836 30.1102C345.836 29.1889 345.284 28.3574 344.435 28Z" fill="white"/>
          <path d="M320.435 27C320.435 25.8954 321.33 25 322.435 25H339.435C340.54 25 341.435 25.8954 341.435 27V32C341.435 33.1046 340.54 34 339.435 34H322.435C321.33 34 320.435 33.1046 320.435 32V27Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M303.206 26.104C305.693 26.1041 308.085 27.0262 309.887 28.6796C310.023 28.8073 310.24 28.8057 310.374 28.676L311.671 27.4126C311.739 27.3468 311.777 27.2577 311.776 27.165C311.775 27.0724 311.737 26.9837 311.668 26.9187C306.937 22.544 299.473 22.544 294.742 26.9187C294.674 26.9837 294.635 27.0723 294.634 27.165C294.634 27.2577 294.671 27.3468 294.739 27.4126L296.037 28.676C296.17 28.8059 296.388 28.8075 296.523 28.6796C298.326 27.0261 300.718 26.104 303.206 26.104ZM303.202 30.3243C304.56 30.3242 305.868 30.8359 306.875 31.76C307.011 31.8912 307.225 31.8883 307.358 31.7536L308.645 30.4343C308.713 30.3651 308.75 30.2712 308.749 30.1737C308.748 30.0761 308.709 29.9831 308.64 29.9153C305.576 27.0244 300.831 27.0244 297.767 29.9153C297.698 29.9831 297.659 30.0762 297.658 30.1738C297.657 30.2714 297.695 30.3652 297.762 30.4343L299.049 31.7536C299.182 31.8883 299.396 31.8912 299.533 31.76C300.538 30.8365 301.846 30.3248 303.202 30.3243ZM305.727 33.1178C305.729 33.2232 305.692 33.3247 305.624 33.3985L303.448 35.8533C303.384 35.9254 303.297 35.966 303.206 35.966C303.115 35.966 303.028 35.9254 302.964 35.8533L300.787 33.3985C300.72 33.3247 300.683 33.2231 300.685 33.1177C300.687 33.0124 300.728 32.9126 300.798 32.842C302.188 31.5281 304.224 31.5281 305.614 32.842C305.684 32.9127 305.725 33.0125 305.727 33.1178Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M287.135 24.682C287.135 24.0489 286.657 23.5358 286.068 23.5358H285.002C284.413 23.5358 283.935 24.0489 283.935 24.682V34.616C283.935 35.249 284.413 35.7622 285.002 35.7622H286.068C286.657 35.7622 287.135 35.249 287.135 34.616V24.682ZM279.701 25.981H280.768C281.357 25.981 281.834 26.5065 281.834 27.1548V34.5884C281.834 35.2367 281.357 35.7622 280.768 35.7622H279.701C279.112 35.7622 278.634 35.2367 278.634 34.5884V27.1548C278.634 26.5065 279.112 25.981 279.701 25.981ZM275.369 28.6301H274.303C273.713 28.6301 273.236 29.1623 273.236 29.8188V34.5735C273.236 35.23 273.713 35.7622 274.303 35.7622H275.369C275.958 35.7622 276.436 35.23 276.436 34.5735V29.8188C276.436 29.1623 275.958 28.6301 275.369 28.6301ZM270.068 31.0754H269.002C268.413 31.0754 267.935 31.6 267.935 32.2471V34.5905C267.935 35.2376 268.413 35.7622 269.002 35.7622H270.068C270.657 35.7622 271.135 35.2376 271.135 34.5905V32.2471C271.135 31.6 270.657 31.0754 270.068 31.0754Z" fill="white"/>
        </svg>
        {/* Floating action buttons row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 17px 0" }}>
          <div style={{ width: 40, height: 40, borderRadius: 20, background: "#fff", boxShadow: "0px 2px 6px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none"><path d="M10.5858 19.4142L2.58579 11.4142C1.80474 10.6332 1.80474 9.36684 2.58579 8.58579L10.5858 0.585791L12 2L4 10L12 18L10.5858 19.4142Z" fill="black"/></svg>
          </div>
          <div style={{ display: "flex", gap: 17 }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: "#fff", boxShadow: "0px 2px 6px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.25" stroke="black" strokeWidth="1.5"/><path d="M12 11V17" stroke="black" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="8" r="1" fill="black"/></svg>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: "#fff", boxShadow: "0px 2px 6px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="23" viewBox="0 0 20 23" fill="none"><path d="M10 1V14" stroke="black" strokeWidth="1.5" strokeLinecap="round"/><path d="M6 5L10 1L14 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 12V20C1 21.1046 1.89543 22 3 22H17C18.1046 22 19 21.1046 19 20V12" stroke="black" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
          </div>
        </div>
      </div>

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

          {/* ── Badge + Title + Description + Progress Card ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ width: 96, height: 96, flexShrink: 0 }}>
                {badgeImg
                  ? <img src={badgeImg} alt="" style={{ width: 96, height: 96, objectFit: "contain" }}/>
                  : <div style={{ width: 96, height: 96, background: "#E8E8E8", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: T.font, fontSize: 9, color: "#999" }}>Badge</span>
                    </div>}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ fontFamily: T.font, fontSize: 22, fontWeight: 700, lineHeight: "28px", color: T.textPri }}>
                  {title || "Challenge Title"}
                </div>
                <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 400, lineHeight: "20px", color: T.textSec }}>
                  {goal || "Challenge goal"}
                </div>
              </div>
            </div>
            {/* Progress card (replaces Join button) */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0px 0.5px 4px rgba(0,0,0,0.1), 0px 6px 12px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: 17 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, lineHeight: "18px" }}>
                  <span style={{ color: T.textPri }}>17 km</span>{" "}
                  <span style={{ color: T.textTer }}>/ 80 km</span>
                </span>
                <span style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, lineHeight: "18px", color: T.textTer, textAlign: "right" }}>3 days left</span>
              </div>
              <div style={{ background: "#e0e0de", height: 4, borderRadius: 6, overflow: "hidden" }}>
                <div style={{ width: "52.26%", height: "100%", background: "#88cf25", borderRadius: 6 }}/>
              </div>
            </div>
          </div>

          {/* ── Organizing club ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri }}>
              Organizing club
            </div>
            <div style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0px 2px 6px rgba(0,0,0,0.11)", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: 8, background: "#E8E8E8", flexShrink: 0, overflow: "hidden", boxShadow: "0px 1.5px 3px rgba(0,0,0,0.1)" }}>
                  {logoImg
                    ? <img src={logoImg} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 8 }}/>
                    : <span style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", fontFamily: T.font, fontSize: 9, color: "#999" }}>Logo</span>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, lineHeight: "20px", color: T.textPri, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {brandName || "Club Name"}
                  </div>
                  <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 2 }}>
                    <div style={{ width: 16, height: 16, flexShrink: 0, opacity: 0.9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.9"><path d="M5.78292 1.8963e-10C5.29058 1.00138e-05 4.81429 0.175088 4.43916 0.493947L2.43902 2.19405C2.43514 2.19735 2.4307 2.19991 2.4259 2.2016L0.416987 2.91063C0.167105 2.99882 0 3.23501 0 3.5C0 4.54992 0.13411 5.33428 0.387357 5.95881C0.645232 6.59477 1.00943 7.0222 1.39571 7.37698C1.58922 7.55471 1.77703 7.70843 1.95926 7.85758C2.50374 8.30322 2.99849 8.70815 3.4473 9.59152C4.13978 11.306 5.02254 12.6847 6.40088 13.6211C7.78387 14.5608 9.58409 15 12 15C13.3678 15 14.3116 14.6941 14.9483 14.2154C15.5915 13.7318 15.8522 13.1238 15.9502 12.661C16.0892 12.004 15.7156 11.4718 15.3494 11.1775L12.7703 9.10388C12.6594 9.01471 12.5779 8.89419 12.5365 8.75803L10.4546 1.91568C10.2891 1.37176 9.78744 1 9.21889 1H8.31882C7.97051 1 7.63696 1.14067 7.39384 1.39011L6.99597 1.79832L6.66084 0.657163C6.54643 0.267576 6.18895 -8.22525e-06 5.78292 1.8963e-10ZM5.24872 1.44637C5.33534 1.37274 5.43553 1.3184 5.54266 1.28578L6.39898 4.20168L8.28898 2.26258C8.29683 2.25454 8.30759 2.25 8.31882 2.25H9.21889C9.23723 2.25 9.25342 2.26199 9.25876 2.27954L10.0865 5H8V6.25H10.4668L10.695 7H9V8.25H11.0753L11.3406 9.12188C11.4551 9.49832 11.6804 9.83152 11.9871 10.0781L13.9156 11.6286C13.4013 11.6951 12.7498 11.75 12 11.75C10.6698 11.75 9.85676 11.4797 9.27742 11.0657C8.68513 10.6425 8.26165 10.0177 7.80307 9.1464C7.65262 8.86054 7.50097 8.55256 7.3401 8.22586C6.59022 6.70298 5.64009 4.77344 3.67763 2.78179L5.24872 1.44637ZM2.59524 3.4674C4.53234 5.36695 5.42673 7.17769 6.2006 8.74442C6.36857 9.0845 6.53087 9.41309 6.69693 9.72859C7.17585 10.6385 7.71071 11.4825 8.5507 12.0827C9.40366 12.6922 10.4968 13 12 13C13.0385 13 13.9054 12.9027 14.5158 12.8046L14.5775 12.7945C14.4949 12.9371 14.3741 13.0832 14.1971 13.2163C13.8407 13.4842 13.1892 13.75 12 13.75C9.72525 13.75 8.20411 13.3351 7.10336 12.5872C6.00466 11.8407 5.24317 10.7074 4.59698 9.10019C4.5905 9.08406 4.58334 9.06821 4.57554 9.05268C3.99256 7.89268 3.23938 7.28056 2.66054 6.81012C2.50621 6.68469 2.36427 6.56934 2.24125 6.45635C1.94703 6.18612 1.71448 5.90523 1.54575 5.4891C1.40068 5.13134 1.29131 4.64479 1.25947 3.93885L2.59524 3.4674Z" fill="#64635E"/></g></svg>
                    </div>
                    <span style={{ fontFamily: T.font, fontSize: 13, color: T.textTer, lineHeight: "18px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {participants ? `${participants} Athletes` : "5,678 Athletes"}
                    </span>
                  </div>
                </div>
                <button style={{ height: 28, borderRadius: 14, background: "transparent", border: "1px solid #fd9766", fontFamily: T.font, fontSize: 11, fontWeight: 700, lineHeight: "13px", color: T.orange, cursor: "default", padding: "0 12px", flexShrink: 0 }}>
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
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ padding: 10, flexShrink: 0 }}><IcoDate/></div>
                <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textPri, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {startDate && endDate ? `${startDate} to ${endDate}` : "Start date to End date"}
                </div>
              </div>
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
          <div style={{ background: "#f7f7f7", borderRadius: 8, padding: "16px 18px", width: 344 }}>
            <div style={{ fontFamily: T.font, fontSize: 12, lineHeight: "16px", color: T.textSec }}>
              Any qualifying activity, whether private or not, will count towards your private progress, badges, and rewards for this challenge. To respect activity visibility settings, only activities marked as visible to Everyone will be applied toward leaderboard rankings. Manual activities will not count towards the leaderboard.
            </div>
          </div>
          <div style={{ display: "flex", width: "100%", borderBottom: "1px solid #e0e0de", position: "relative", padding: "0 24px" }}>
            <div style={{ flex: 1, textAlign: "center", padding: "16px 4px", borderBottom: `2px solid ${T.orange}` }}>
              <span style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, color: T.textPri }}>Overall</span>
            </div>
            <div style={{ flex: 1, textAlign: "center", padding: "16px 4px" }}>
              <span style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, color: T.textTer }}>Following</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", padding: "0 20px", width: "100%", gap: 8 }}>
            <div style={{ width: 222 }}>
              <span style={{ fontFamily: T.font, fontSize: 12, fontWeight: 700, lineHeight: "16px", color: T.textPri }}>Rank</span>
            </div>
            <div style={{ display: "flex", gap: 26, width: 126 }}>
              <span style={{ fontFamily: T.font, fontSize: 12, fontWeight: 700, lineHeight: "16px", color: T.textPri }}>Pace</span>
              <span style={{ fontFamily: T.font, fontSize: 12, fontWeight: 700, lineHeight: "16px", color: T.textPri }}>Distance</span>
            </div>
          </div>
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

// --- Screen: Completed -------------------------------------------------------
// Identical to Joined screen except progress card shows completed state
// Matches Figma node 2179:29633
function ScreenCompleted({ data }) {
  const { heroImg, badgeImg, logoImg, brandName, title, goal, description, participants,
          startDate, endDate, activityType, reward } = data;
  return (
    <div style={{ display: "flex", flexDirection: "column", background: "#000", position: "relative" }}>

      {/* ── Floating Top Nav (status bar + action buttons) ── */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 10, pointerEvents: "none" }}>
        <svg width="375" height="54" viewBox="0 0 375 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M55.9091 24.7231C58.4658 24.7231 60.6904 26.541 60.6904 30.8574V30.874C60.6904 34.9082 58.8725 37.2988 55.8593 37.2988C53.6596 37.2988 52.0161 35.9956 51.6342 34.1611L51.6176 34.0698H53.726L53.7509 34.1528C54.0663 34.9912 54.8051 35.5391 55.8593 35.5391C57.7602 35.5391 58.5654 33.6797 58.6567 31.3887C58.6567 31.2974 58.665 31.2061 58.665 31.1147H58.499C58.059 32.061 57.0131 32.8994 55.3696 32.8994C53.0703 32.8994 51.4599 31.2227 51.4599 28.9482V28.9316C51.4599 26.4995 53.311 24.7231 55.9091 24.7231ZM55.9008 31.2559C57.2538 31.2559 58.2914 30.2764 58.2914 28.9233V28.9067C58.2914 27.5371 57.2538 26.4663 55.9257 26.4663C54.6059 26.4663 53.5517 27.5205 53.5517 28.8569V28.8735C53.5517 30.2598 54.5395 31.2559 55.9008 31.2559ZM64.0509 29.2388C63.2956 29.2388 62.7311 28.6577 62.7311 27.9272C62.7311 27.1885 63.2956 26.6157 64.0509 26.6157C64.8146 26.6157 65.3707 27.1885 65.3707 27.9272C65.3707 28.6577 64.8146 29.2388 64.0509 29.2388ZM64.0509 35.3979C63.2956 35.3979 62.7311 34.8252 62.7311 34.0864C62.7311 33.3477 63.2956 32.7749 64.0509 32.7749C64.8146 32.7749 65.3707 33.3477 65.3707 34.0864C65.3707 34.8252 64.8146 35.3979 64.0509 35.3979ZM73.222 37V34.7007H67.3617V32.9492C68.9139 30.2515 70.6156 27.4956 72.2425 25.022H75.2723V32.9326H76.8827V34.7007H75.2723V37H73.222ZM69.3539 32.9824H73.2552V26.7319H73.1307C71.9022 28.6079 70.516 30.8242 69.3539 32.8579V32.9824ZM81.4385 37V27.1304H81.2974L78.3174 29.2388V27.2217L81.4468 25.022H83.5801V37H81.4385Z" fill="white"/>
          <path opacity="0.35" d="M322.435 23.5H339.435C341.368 23.5 342.935 25.067 342.935 27V32C342.935 33.933 341.368 35.5 339.435 35.5H322.435C320.502 35.5 318.935 33.933 318.935 32V27C318.935 25.067 320.502 23.5 322.435 23.5Z" stroke="white"/>
          <path opacity="0.4" d="M344.435 28V32.2203C345.284 31.8629 345.836 31.0314 345.836 30.1102C345.836 29.1889 345.284 28.3574 344.435 28Z" fill="white"/>
          <path d="M320.435 27C320.435 25.8954 321.33 25 322.435 25H339.435C340.54 25 341.435 25.8954 341.435 27V32C341.435 33.1046 340.54 34 339.435 34H322.435C321.33 34 320.435 33.1046 320.435 32V27Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M303.206 26.104C305.693 26.1041 308.085 27.0262 309.887 28.6796C310.023 28.8073 310.24 28.8057 310.374 28.676L311.671 27.4126C311.739 27.3468 311.777 27.2577 311.776 27.165C311.775 27.0724 311.737 26.9837 311.668 26.9187C306.937 22.544 299.473 22.544 294.742 26.9187C294.674 26.9837 294.635 27.0723 294.634 27.165C294.634 27.2577 294.671 27.3468 294.739 27.4126L296.037 28.676C296.17 28.8059 296.388 28.8075 296.523 28.6796C298.326 27.0261 300.718 26.104 303.206 26.104ZM303.202 30.3243C304.56 30.3242 305.868 30.8359 306.875 31.76C307.011 31.8912 307.225 31.8883 307.358 31.7536L308.645 30.4343C308.713 30.3651 308.75 30.2712 308.749 30.1737C308.748 30.0761 308.709 29.9831 308.64 29.9153C305.576 27.0244 300.831 27.0244 297.767 29.9153C297.698 29.9831 297.659 30.0762 297.658 30.1738C297.657 30.2714 297.695 30.3652 297.762 30.4343L299.049 31.7536C299.182 31.8883 299.396 31.8912 299.533 31.76C300.538 30.8365 301.846 30.3248 303.202 30.3243ZM305.727 33.1178C305.729 33.2232 305.692 33.3247 305.624 33.3985L303.448 35.8533C303.384 35.9254 303.297 35.966 303.206 35.966C303.115 35.966 303.028 35.9254 302.964 35.8533L300.787 33.3985C300.72 33.3247 300.683 33.2231 300.685 33.1177C300.687 33.0124 300.728 32.9126 300.798 32.842C302.188 31.5281 304.224 31.5281 305.614 32.842C305.684 32.9127 305.725 33.0125 305.727 33.1178Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M287.135 24.682C287.135 24.0489 286.657 23.5358 286.068 23.5358H285.002C284.413 23.5358 283.935 24.0489 283.935 24.682V34.616C283.935 35.249 284.413 35.7622 285.002 35.7622H286.068C286.657 35.7622 287.135 35.249 287.135 34.616V24.682ZM279.701 25.981H280.768C281.357 25.981 281.834 26.5065 281.834 27.1548V34.5884C281.834 35.2367 281.357 35.7622 280.768 35.7622H279.701C279.112 35.7622 278.634 35.2367 278.634 34.5884V27.1548C278.634 26.5065 279.112 25.981 279.701 25.981ZM275.369 28.6301H274.303C273.713 28.6301 273.236 29.1623 273.236 29.8188V34.5735C273.236 35.23 273.713 35.7622 274.303 35.7622H275.369C275.958 35.7622 276.436 35.23 276.436 34.5735V29.8188C276.436 29.1623 275.958 28.6301 275.369 28.6301ZM270.068 31.0754H269.002C268.413 31.0754 267.935 31.6 267.935 32.2471V34.5905C267.935 35.2376 268.413 35.7622 269.002 35.7622H270.068C270.657 35.7622 271.135 35.2376 271.135 34.5905V32.2471C271.135 31.6 270.657 31.0754 270.068 31.0754Z" fill="white"/>
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 17px 0" }}>
          <div style={{ width: 40, height: 40, borderRadius: 20, background: "#fff", boxShadow: "0px 2px 6px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none"><path d="M10.5858 19.4142L2.58579 11.4142C1.80474 10.6332 1.80474 9.36684 2.58579 8.58579L10.5858 0.585791L12 2L4 10L12 18L10.5858 19.4142Z" fill="black"/></svg>
          </div>
          <div style={{ display: "flex", gap: 17 }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: "#fff", boxShadow: "0px 2px 6px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.25" stroke="black" strokeWidth="1.5"/><path d="M12 11V17" stroke="black" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="8" r="1" fill="black"/></svg>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: "#fff", boxShadow: "0px 2px 6px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="23" viewBox="0 0 20 23" fill="none"><path d="M10 1V14" stroke="black" strokeWidth="1.5" strokeLinecap="round"/><path d="M6 5L10 1L14 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 12V20C1 21.1046 1.89543 22 3 22H17C18.1046 22 19 21.1046 19 20V12" stroke="black" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
          </div>
        </div>
      </div>

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

          {/* ── Badge + Title + Description + Completed Progress Card ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ width: 96, height: 96, flexShrink: 0 }}>
                {badgeImg
                  ? <img src={badgeImg} alt="" style={{ width: 96, height: 96, objectFit: "contain" }}/>
                  : <div style={{ width: 96, height: 96, background: "#E8E8E8", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: T.font, fontSize: 9, color: "#999" }}>Badge</span>
                    </div>}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ fontFamily: T.font, fontSize: 22, fontWeight: 700, lineHeight: "28px", color: T.textPri }}>
                  {title || "Challenge Title"}
                </div>
                <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 400, lineHeight: "20px", color: T.textSec }}>
                  {goal || "Challenge goal"}
                </div>
              </div>
            </div>
            {/* Completed progress card — Figma 2179:29633 */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0px 0.5px 4px rgba(0,0,0,0.1), 0px 6px 12px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: 17, alignItems: "center", justifyContent: "center" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: 297 }}>
                <span style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, lineHeight: "18px" }}>
                  <span style={{ color: T.textPri }}>80 km</span>{" "}
                  <span style={{ color: T.textTer }}>/ 80 km</span>
                </span>
                <span style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, lineHeight: "18px", color: T.textTer, textAlign: "right" }}>Completed</span>
              </div>
              <div style={{ background: "#e0e0de", height: 4, borderRadius: 6, overflow: "hidden", width: 297 }}>
                <div style={{ width: "100%", height: "100%", background: "#70cf25", borderRadius: 6 }}/>
              </div>
            </div>
          </div>

          {/* ── Everything below is identical to Joined/NotJoined ── */}

          {/* ── Organizing club ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri }}>Organizing club</div>
            <div style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0px 2px 6px rgba(0,0,0,0.11)", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: 8, background: "#E8E8E8", flexShrink: 0, overflow: "hidden", boxShadow: "0px 1.5px 3px rgba(0,0,0,0.1)" }}>
                  {logoImg ? <img src={logoImg} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 8 }}/> : <span style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", fontFamily: T.font, fontSize: 9, color: "#999" }}>Logo</span>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, lineHeight: "20px", color: T.textPri, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{brandName || "Club Name"}</div>
                  <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 2 }}>
                    <div style={{ width: 16, height: 16, flexShrink: 0, opacity: 0.9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.9"><path d="M5.78292 1.8963e-10C5.29058 1.00138e-05 4.81429 0.175088 4.43916 0.493947L2.43902 2.19405C2.43514 2.19735 2.4307 2.19991 2.4259 2.2016L0.416987 2.91063C0.167105 2.99882 0 3.23501 0 3.5C0 4.54992 0.13411 5.33428 0.387357 5.95881C0.645232 6.59477 1.00943 7.0222 1.39571 7.37698C1.58922 7.55471 1.77703 7.70843 1.95926 7.85758C2.50374 8.30322 2.99849 8.70815 3.4473 9.59152C4.13978 11.306 5.02254 12.6847 6.40088 13.6211C7.78387 14.5608 9.58409 15 12 15C13.3678 15 14.3116 14.6941 14.9483 14.2154C15.5915 13.7318 15.8522 13.1238 15.9502 12.661C16.0892 12.004 15.7156 11.4718 15.3494 11.1775L12.7703 9.10388C12.6594 9.01471 12.5779 8.89419 12.5365 8.75803L10.4546 1.91568C10.2891 1.37176 9.78744 1 9.21889 1H8.31882C7.97051 1 7.63696 1.14067 7.39384 1.39011L6.99597 1.79832L6.66084 0.657163C6.54643 0.267576 6.18895 -8.22525e-06 5.78292 1.8963e-10ZM5.24872 1.44637C5.33534 1.37274 5.43553 1.3184 5.54266 1.28578L6.39898 4.20168L8.28898 2.26258C8.29683 2.25454 8.30759 2.25 8.31882 2.25H9.21889C9.23723 2.25 9.25342 2.26199 9.25876 2.27954L10.0865 5H8V6.25H10.4668L10.695 7H9V8.25H11.0753L11.3406 9.12188C11.4551 9.49832 11.6804 9.83152 11.9871 10.0781L13.9156 11.6286C13.4013 11.6951 12.7498 11.75 12 11.75C10.6698 11.75 9.85676 11.4797 9.27742 11.0657C8.68513 10.6425 8.26165 10.0177 7.80307 9.1464C7.65262 8.86054 7.50097 8.55256 7.3401 8.22586C6.59022 6.70298 5.64009 4.77344 3.67763 2.78179L5.24872 1.44637ZM2.59524 3.4674C4.53234 5.36695 5.42673 7.17769 6.2006 8.74442C6.36857 9.0845 6.53087 9.41309 6.69693 9.72859C7.17585 10.6385 7.71071 11.4825 8.5507 12.0827C9.40366 12.6922 10.4968 13 12 13C13.0385 13 13.9054 12.9027 14.5158 12.8046L14.5775 12.7945C14.4949 12.9371 14.3741 13.0832 14.1971 13.2163C13.8407 13.4842 13.1892 13.75 12 13.75C9.72525 13.75 8.20411 13.3351 7.10336 12.5872C6.00466 11.8407 5.24317 10.7074 4.59698 9.10019C4.5905 9.08406 4.58334 9.06821 4.57554 9.05268C3.99256 7.89268 3.23938 7.28056 2.66054 6.81012C2.50621 6.68469 2.36427 6.56934 2.24125 6.45635C1.94703 6.18612 1.71448 5.90523 1.54575 5.4891C1.40068 5.13134 1.29131 4.64479 1.25947 3.93885L2.59524 3.4674Z" fill="#64635E"/></g></svg>
                    </div>
                    <span style={{ fontFamily: T.font, fontSize: 13, color: T.textTer, lineHeight: "18px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{participants ? `${participants} Athletes` : "5,678 Athletes"}</span>
                  </div>
                </div>
                <button style={{ height: 28, borderRadius: 14, background: "transparent", border: "1px solid #fd9766", fontFamily: T.font, fontSize: 11, fontWeight: 700, lineHeight: "13px", color: T.orange, cursor: "default", padding: "0 12px", flexShrink: 0 }}>Join Club</button>
              </div>
            </div>
          </div>

          {/* ── Challenge details ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri }}>Challenge details</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}><div style={{ padding: 10, flexShrink: 0 }}><IcoDate/></div><div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textPri, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{startDate && endDate ? `${startDate} to ${endDate}` : "Start date to End date"}</div></div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}><div style={{ padding: 10, flexShrink: 0 }}><IcoActivityType/></div><div style={{ display: "flex", flexDirection: "column", gap: 2 }}><div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textPri }}>{goal || "Complete the challenge activity"}</div><div style={{ fontFamily: T.font, fontSize: 13, lineHeight: "18px", color: T.textTer }}>Qualifying Activities: {activityType || "Run, Virtual Run, Walk"}</div></div></div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}><div style={{ padding: 10, flexShrink: 0 }}><IcoReward/></div><div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textPri }}>{reward || "Earn a digital finisher's badge for your Trophy Case."}</div></div>
            </div>
          </div>

          {/* ── Challenge stats ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri }}>Challenge stats</div>
              <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textTer }}>These are cumulative stats across all qualifying of your activities during this challenge.</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {[[{ label: "Distance", value: "147.7 mi" }, { label: "Moving Time", value: "18:02:25" }],[{ label: "Elevation Gain", value: "5,576 ft" }, { label: "Elapsed Time", value: "24:17:47" }],[{ label: "Steps", value: "45,254" }, { label: "Steps", value: "45,254" }]].map((row, ri) => (
                <div key={ri} style={{ display: "flex", padding: "0 24px" }}>{row.map(({ label, value }, ci) => (<div key={ci} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}><span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px" }}>{label}</span><span style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, color: T.textPri, lineHeight: "22px" }}>{value}</span></div>))}</div>
              ))}
            </div>
          </div>

          {/* ── Featured athletes ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri }}>Featured athletes</div>
            <div style={{ display: "flex", gap: 8, overflow: "hidden" }}>
              {[{ name: "Single Name", location: "Belgium" },{ name: "First Last but a longer name goes two lines", location: "United States" }].map((a, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 16, width: 232, height: 260, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", boxShadow: "0px 3px 8px rgba(0,0,0,0.12), 0px 3px 1px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", width: "100%" }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: FALLBACK_COLORS[i % 3], flexShrink: 0 }}/>
                    <div style={{ textAlign: "center", width: "100%", display: "flex", flexDirection: "column", gap: 8 }}><div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri, overflow: "hidden" }}>{a.name}</div><div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textSec, overflow: "hidden" }}>{a.location}</div></div>
                  </div>
                  <button style={{ width: "100%", height: 32, borderRadius: 16, background: T.orange, border: "none", fontFamily: T.font, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "default" }}>Follow</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Leaderboard section ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 32, alignItems: "center" }}>
          <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri, width: 343 }}>Leaderboard</div>
          <div style={{ background: "#f7f7f7", borderRadius: 8, padding: "16px 18px", width: 344 }}><div style={{ fontFamily: T.font, fontSize: 12, lineHeight: "16px", color: T.textSec }}>Any qualifying activity, whether private or not, will count towards your private progress, badges, and rewards for this challenge. To respect activity visibility settings, only activities marked as visible to Everyone will be applied toward leaderboard rankings. Manual activities will not count towards the leaderboard.</div></div>
          <div style={{ display: "flex", width: "100%", borderBottom: "1px solid #e0e0de", position: "relative", padding: "0 24px" }}><div style={{ flex: 1, textAlign: "center", padding: "16px 4px", borderBottom: `2px solid ${T.orange}` }}><span style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, color: T.textPri }}>Overall</span></div><div style={{ flex: 1, textAlign: "center", padding: "16px 4px" }}><span style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, color: T.textTer }}>Following</span></div></div>
          <div style={{ display: "flex", alignItems: "center", padding: "0 20px", width: "100%", gap: 8 }}><div style={{ width: 222 }}><span style={{ fontFamily: T.font, fontSize: 12, fontWeight: 700, lineHeight: "16px", color: T.textPri }}>Rank</span></div><div style={{ display: "flex", gap: 26, width: 126 }}><span style={{ fontFamily: T.font, fontSize: 12, fontWeight: 700, lineHeight: "16px", color: T.textPri }}>Pace</span><span style={{ fontFamily: T.font, fontSize: 12, fontWeight: 700, lineHeight: "16px", color: T.textPri }}>Distance</span></div></div>
          <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            {["Sarah Johnson","Marcus Chen","Amara Diallo","Tom Williams","Yuki Tanaka","Elena Rossi"].map((name, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", padding: "16px 24px", gap: 4 }}><div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}><span style={{ fontFamily: T.font, fontSize: 12, color: T.textSec, padding: "0 4px", minWidth: 30 }}>{i + 1}</span><div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}><div style={{ width: 32, height: 32, borderRadius: "50%", background: `hsl(${i*55},40%,62%)`, flexShrink: 0 }}/><span style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, lineHeight: "18px", color: T.textPri, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span></div></div><div style={{ display: "flex", gap: 20 }}><span style={{ fontFamily: T.font, fontSize: 13, color: T.textSec, textAlign: "right", whiteSpace: "nowrap" }}>4:4{i} /mi</span><span style={{ fontFamily: T.font, fontSize: 13, color: T.textSec, textAlign: "right", whiteSpace: "nowrap" }}>{(13+i*1.2).toFixed(1)} km</span></div></div>
            ))}
          </div>
        </div>

        {/* ── Description / About section ── */}
        <div style={{ padding: "40px 24px 24px", overflow: "hidden" }}>
          <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri, marginBottom: 8 }}>{title || "About this Challenge"}</div>
          <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textTer, whiteSpace: "pre-wrap" }}>{description || ""}</div>
        </div>
      </div>
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
    <div style={{ display: "flex", flexDirection: "column", background: T.bgSurface, flex: 1 }}>
      {/* Feed Owner Header — p-24, gap-12 */}
      <div style={{ padding: 24, display: "flex", gap: 12, alignItems: "flex-start", position: "relative", background: T.bgSurface }}>
        <div style={{ position: "relative", flexShrink: 0, width: 48, height: 48, overflow: "visible" }}>
          <img src={MILESTONE_AVATAR} alt="" style={{ width: 48, height: 48, display: "block" }}/>
          <div style={{ position: "absolute", top: -3, right: -3, width: 14, height: 14 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="#FC5200"/><path d="M4 7L6 9L10 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, lineHeight: "18px", color: T.textPri }}>Dante Young</div>
          <div style={{ height: 4 }}/>
          <div style={{ display: "flex", gap: 4, alignItems: "center", height: 16 }}>
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
      {/* Text — px-24, gap-8 */}
      <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontFamily: T.font, fontSize: 20, fontWeight: 700, lineHeight: "24px", color: T.textPri }}>Probably the most beautiful ride I've ever been on</div>
      </div>
      {/* Vertical Margin — 16px */}
      <div style={{ height: 16 }}/>
      {/* Stats row — px-24 */}
      <div style={{ padding: "0 24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 24, height: 37, alignItems: "center" }}>
          {[["Distance","18.33 mi"],["Time","2h 20m"],["Elevation","2,033 ft"]].map(([label, val]) => (
            <div key={label}><div style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px", marginBottom: 2 }}>{label}</div><div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px" }}>{val}</div></div>
          ))}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px", marginBottom: 2 }}>Achievements</div>
          <div style={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "flex-end" }}>
            <svg width="64" height="22" viewBox="0 0 64 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.6224 9.88131L2.98333 11.2422C2.67283 11.9311 2.50004 12.6954 2.50004 13.5C2.50004 16.5376 4.96247 19 8.00004 19C11.0376 19 13.5 16.5376 13.5 13.5C13.5 12.6954 13.3272 11.9311 13.0167 11.2422L14.3776 9.88131C14.7761 9.4828 15 8.9423 15 8.37871V5.125C15 3.9514 14.0486 3 12.875 3H3.125C1.95139 3 1 3.95139 1 5.125V8.37871C1 8.9423 1.22388 9.4828 1.6224 9.88131ZM2.45094 4.56705C2.61144 4.37337 2.85381 4.25 3.125 4.25H12.875C13.1462 4.25 13.3886 4.37338 13.5491 4.56707L12.1161 6.00003H3.88392L2.45094 4.56705ZM5.13392 7.25003H10.8661L9.81101 8.30514C9.24391 8.10747 8.63452 8.00003 8.00004 8.00003C7.36555 8.00003 6.75615 8.10747 6.18904 8.30515L5.13392 7.25003ZM2.25 6.13388L5.00342 8.8873C4.48394 9.22547 4.02513 9.64901 3.64689 10.138L2.50628 8.99743C2.34219 8.83334 2.25 8.61078 2.25 8.37871V6.13388ZM13.4937 8.99743L12.3532 10.138C11.9749 9.64898 11.5161 9.22544 10.9966 8.88728L13.75 6.13392V8.37871C13.75 8.61078 13.6578 8.83334 13.4937 8.99743Z" fill="#EEAF0B"/>
              <path d="M21 3.625C21 3.27982 21.2798 3 21.625 3H30.375C30.7202 3 31 3.27982 31 3.625V4.00012H32.7083C33.4217 4.00012 34 4.57842 34 5.29179V7.70846C34 9.52639 32.5263 11.0001 30.7083 11.0001H30.369C29.6363 12.566 28.3098 13.8235 26.625 14.4477V15.6688L29.8509 17.8578C30.0781 18.0119 30.178 18.2962 30.0974 18.5586C30.0168 18.8209 29.7745 19 29.5 19H22.5C22.2255 19 21.9832 18.8209 21.9026 18.5586C21.822 18.2962 21.9219 18.0119 22.1491 17.8578L25.375 15.6688V14.4477C23.6902 13.8235 22.3637 12.566 21.631 11.0001H21.2917C19.4737 11.0001 18 9.52639 18 7.70846V5.29179C18 4.57842 18.5783 4.00012 19.2917 4.00012H21V3.625ZM30.8097 9.74765C31.8902 9.6948 32.75 8.80204 32.75 7.70846V5.29179C32.75 5.26878 32.7313 5.25012 32.7083 5.25012H31V8.15957C31 8.70343 30.9344 9.23573 30.8097 9.74765ZM21 5.25012H19.2917C19.2687 5.25012 19.25 5.26878 19.25 5.29179V7.70846C19.25 8.80204 20.1098 9.6948 21.1903 9.74765C21.0656 9.23573 21 8.70342 21 8.15957V5.25012Z" fill="#8B9699"/>
              <path d="M41.9999 12V13H42.3749C42.6511 13 42.8749 12.7761 42.8749 12.5C42.8749 12.2238 42.6511 12 42.3749 12H41.9999Z" fill="#EEAF0B"/>
              <path d="M44.9999 13H45.4999C45.7761 13 45.9999 12.7761 45.9999 12.5C45.9999 12.2238 45.7761 12 45.4999 12H44.9999V13Z" fill="#EEAF0B"/>
              <path d="M38.9833 11.2422L37.6224 9.88131C37.2239 9.4828 37 8.9423 37 8.37871V5.125C37 3.95139 37.9514 3 39.125 3H48.875C50.0486 3 51 3.9514 51 5.125V8.37871C51 8.9423 50.7761 9.4828 50.3776 9.88131L49.0167 11.2422C49.3272 11.9311 49.5 12.6954 49.5 13.5C49.5 16.5376 47.0376 19 44 19C40.9625 19 38.5 16.5376 38.5 13.5C38.5 12.6954 38.6728 11.9311 38.9833 11.2422ZM39.125 4.25C38.8538 4.25 38.6114 4.37337 38.4509 4.56705L39.8839 6.00003H48.1161L49.5491 4.56707C49.3886 4.37338 49.1462 4.25 48.875 4.25H39.125ZM42.189 8.30515C42.7561 8.10747 43.3655 8.00003 44 8.00003C44.6345 8.00003 45.2439 8.10747 45.811 8.30514L46.8661 7.25003H41.1339L42.189 8.30515ZM41.0034 8.8873L38.25 6.13388V8.37871C38.25 8.61078 38.3422 8.83334 38.5063 8.99743L39.6469 10.138C40.0251 9.64901 40.4839 9.22547 41.0034 8.8873ZM48.3532 10.138L49.4937 8.99743C49.6578 8.83334 49.75 8.61078 49.75 8.37871V6.13392L46.9966 8.88728C47.5161 9.22544 47.9749 9.64898 48.3532 10.138ZM41.9999 14H42.3749C43.2033 14 43.8749 13.3284 43.8749 12.5C43.8749 11.6716 43.2033 11 42.3749 11H40.9999V16H41.9999V14ZM45.4999 11H43.9999V16H44.9999V14H45.4999C45.5533 14 45.6061 13.9972 45.6581 13.9917L46.4614 16H47.4999V15.9037L46.5621 13.5591C46.8327 13.2878 46.9999 12.9134 46.9999 12.5C46.9999 11.6716 46.3283 11 45.4999 11Z" fill="#EEAF0B"/>
              <path d="M58.9853 17.255C56.4863 17.255 54.8713 16.065 54.5313 14.11L56.9113 13.583C57.0643 14.603 57.8293 15.283 58.9343 15.283C60.0223 15.283 60.6853 14.535 60.6853 13.328C60.6853 12.019 59.9713 11.407 58.4583 11.407H57.2003V9.707L60.0393 7.089V7.004H54.9053V5.015H62.6403V7.174L59.7503 9.775V9.843C61.7733 9.775 63.2013 10.982 63.2013 13.277C63.2013 15.742 61.6373 17.255 58.9853 17.255Z" fill="black"/>
            </svg>
          </div>
        </div>
      </div>
      {/* Vertical Margin — 24px */}
      <div style={{ height: 24 }}/>
      {/* Celebration row (achievement banner) — px-24 */}
      <div style={{ padding: "0 24px" }}>
        <div style={{ background: "#fff", borderRadius: 8, padding: "12px 16px 12px 12px", display: "flex", gap: 12, alignItems: "flex-start", boxShadow: "0px 2px 6px 0px rgba(0,0,0,0.11)" }}>
          <div style={{ width: 32, height: 32, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {badgeImg ? <img src={badgeImg} alt="" style={{ width: 32, height: 32, objectFit: "contain" }}/> : <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#E8E8E8" }}/>}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, lineHeight: "18px", color: T.textPri, marginBottom: 4 }}>
              {brandName ? `${brandName} Challenge milestone reached!` : "Mark just became the Local Legend of Pso De Florencio Climb"}
            </div>
            <div style={{ fontFamily: T.font, fontSize: 11, fontWeight: 400, lineHeight: "13px", color: T.textSec }}>{title || "Most segment efforts in the last 90 days"}</div>
          </div>
        </div>
      </div>
      {/* Vertical Margin — 12px + 12px = 24px */}
      <div style={{ height: 24 }}/>
      {/* Media carousel — h-250, px-24, card w-327, gap-8 */}
      <div style={{ padding: "0 24px", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 8, height: 250 }}>
          <div style={{ width: 327, height: 250, borderRadius: 8, flexShrink: 0, overflow: "hidden", position: "relative" }}>
            <img src={MILESTONE_MAP_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
            <div style={{ position: "absolute", top: 12, left: 12, background: "white", borderRadius: 2, padding: "2px 4px", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}><span style={{ fontFamily: T.font, fontSize: 11, fontWeight: 700, lineHeight: "13px" }}>Workout</span></div>
          </div>
          <div style={{ width: 327, height: 250, borderRadius: 8, flexShrink: 0, overflow: "hidden", position: "relative", background: "linear-gradient(160deg, #7BA888 0%, #4A7A5A 50%, #2D5C3E 100%)" }}>
            <div style={{ position: "absolute", top: 12, left: 12, background: "white", borderRadius: 2, padding: "2px 4px", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}><span style={{ fontFamily: T.font, fontSize: 11, fontWeight: 700, lineHeight: "13px" }}>Workout</span></div>
          </div>
        </div>
      </div>
      {/* Social Summary — px-24, py-16, minH-56 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", minHeight: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Facepile/><span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px" }}>12 gave kudos</span></div>
        <span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px", textAlign: "right" }}>1 comment</span>
      </div>
      {/* Social Action Strip — 3 buttons with py-12 */}
      <div style={{ display: "flex", width: 374 }}>
        {[
          <svg width="22" height="23" viewBox="0 0 22 23" fill="none"><path d="M11.5 0C11.2239 0 11 0.223858 11 0.5V3H8.5C5.46243 3 3 5.46243 3 8.5C3 11.5376 5.46243 14 8.5 14H9V16.5C9 16.7022 9.11509 16.8866 9.29617 16.9715C9.47726 17.0565 9.69171 17.0269 9.84518 16.8964L15.5 12H17.5C20.5376 12 23 9.53757 23 6.5C23 3.46243 20.5376 1 17.5 1H12V0.5C12 0.223858 11.7761 0 11.5 0Z" fill="none" stroke="#43423F" strokeWidth="2"/></svg>,
          <svg width="24" height="21" viewBox="0 0 24 21" fill="none"><path d="M3 1H21C22.1046 1 23 1.89543 23 3V14C23 15.1046 22.1046 16 21 16H14.4142L10.9142 19.5C10.7893 19.625 10.6168 19.6929 10.4393 19.6857C10.0835 19.6713 9.80005 19.3718 9.80005 19.0154V16H3C1.89543 16 1 15.1046 1 14V3C1 1.89543 1.89543 1 3 1Z" fill="none" stroke="#43423F" strokeWidth="2"/></svg>,
          <svg width="20" height="23" viewBox="0 0 20 23" fill="none"><path d="M10 1V13M5 6L10 1L15 6M1 15V19C1 20.1046 1.89543 21 3 21H17C18.1046 21 19 20.1046 19 19V15" fill="none" stroke="#43423F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
        ].map((icon, i) => (
          <div key={i} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 0" }}>{icon}</div>
        ))}
      </div>
      {/* Vertical Margin — 12px */}
      <div style={{ height: 12 }}/>
      {/* Flex spacer to push bottom nav down */}
      <div style={{ flex: 1 }}/>
    </div>
  );
}

// --- Register ----------------------------------------------------------------
Object.assign(window.MT, {
  ScreenNotJoined, ScreenJoined, ScreenCompleted, ScreenTakeover, ScreenMilestone,
});
