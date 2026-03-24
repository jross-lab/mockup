/**
 * screen-old-design.js
 * Challenge Detail — Old Design (pre-2025 CDP layout).
 * Based on Figma node 15:44205.
 *
 * Key differences from the current not-joined screen:
 * - Standard top nav (not floating over hero)
 * - 185px hero with centered 120px badge overlay
 * - Center-aligned title + subtitle
 * - Two-button CTA (Join + Invite Friends)
 * - Social summary row (facepile + "X Friends have joined")
 * - Classic info rows with dividers
 * - Sponsor card + description section at bottom
 */
const { T, FALLBACK_COLORS, Facepile,
        IcoDate, IcoActivityType, IcoReward,
        DescriptionSection,
} = window.MT;

function ScreenOldDesign({ data }) {
  const { heroImg, badgeImg, logoImg, brandName, title, goal, description,
          startDate, endDate, activityType, reward } = data;

  return (
    <div style={{ display: "flex", flexDirection: "column", background: T.bgSunken }}>

      {/* ── Status bar (standard, dark text on white) ── */}
      <svg width="375" height="54" viewBox="0 0 375 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="375" height="54" fill="white"/>
        <text x="30" y="37" fill="black" fontFamily="SF Pro Text, Helvetica, sans-serif" fontSize="17" fontWeight="600" letterSpacing="-0.4">9:41</text>
        <path opacity="0.35" d="M322.435 23.5H339.435C341.368 23.5 342.935 25.067 342.935 27V32C342.935 33.933 341.368 35.5 339.435 35.5H322.435C320.502 35.5 318.935 33.933 318.935 32V27C318.935 25.067 320.502 23.5 322.435 23.5Z" stroke="black"/>
        <path opacity="0.4" d="M344.435 28V32.2203C345.284 31.8629 345.836 31.0314 345.836 30.1102C345.836 29.1889 345.284 28.3574 344.435 28Z" fill="black"/>
        <path d="M320.435 27C320.435 25.8954 321.33 25 322.435 25H339.435C340.54 25 341.435 25.8954 341.435 27V32C341.435 33.1046 340.54 34 339.435 34H322.435C321.33 34 320.435 33.1046 320.435 32V27Z" fill="black"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M303.206 26.104C305.693 26.1041 308.085 27.0262 309.887 28.6796C310.023 28.8073 310.24 28.8057 310.374 28.676L311.671 27.4126C311.739 27.3468 311.777 27.2577 311.776 27.165C311.775 27.0724 311.737 26.9837 311.668 26.9187C306.937 22.544 299.473 22.544 294.742 26.9187C294.674 26.9837 294.635 27.0723 294.634 27.165C294.634 27.2577 294.671 27.3468 294.739 27.4126L296.037 28.676C296.17 28.8059 296.388 28.8075 296.523 28.6796C298.326 27.0261 300.718 26.104 303.206 26.104ZM303.202 30.3243C304.56 30.3242 305.868 30.8359 306.875 31.76C307.011 31.8912 307.225 31.8883 307.358 31.7536L308.645 30.4343C308.713 30.3651 308.75 30.2712 308.749 30.1737C308.748 30.0761 308.709 29.9831 308.64 29.9153C305.576 27.0244 300.831 27.0244 297.767 29.9153C297.698 29.9831 297.659 30.0762 297.658 30.1738C297.657 30.2714 297.695 30.3652 297.762 30.4343L299.049 31.7536C299.182 31.8883 299.396 31.8912 299.533 31.76C300.538 30.8365 301.846 30.3248 303.202 30.3243ZM305.727 33.1178C305.729 33.2232 305.692 33.3247 305.624 33.3985L303.448 35.8533C303.384 35.9254 303.297 35.966 303.206 35.966C303.115 35.966 303.028 35.9254 302.964 35.8533L300.787 33.3985C300.72 33.3247 300.683 33.2231 300.685 33.1177C300.687 33.0124 300.728 32.9126 300.798 32.842C302.188 31.5281 304.224 31.5281 305.614 32.842C305.684 32.9127 305.725 33.0125 305.727 33.1178Z" fill="black"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M287.135 24.682C287.135 24.0489 286.657 23.5358 286.068 23.5358H285.002C284.413 23.5358 283.935 24.0489 283.935 24.682V34.616C283.935 35.249 284.413 35.7622 285.002 35.7622H286.068C286.657 35.7622 287.135 35.249 287.135 34.616V24.682ZM279.701 25.981H280.768C281.357 25.981 281.834 26.5065 281.834 27.1548V34.5884C281.834 35.2367 281.357 35.7622 280.768 35.7622H279.701C279.112 35.7622 278.634 35.2367 278.634 34.5884V27.1548C278.634 26.5065 279.112 25.981 279.701 25.981ZM275.369 28.6301H274.303C273.713 28.6301 273.236 29.1623 273.236 29.8188V34.5735C273.236 35.23 273.713 35.7622 274.303 35.7622H275.369C275.958 35.7622 276.436 35.23 276.436 34.5735V29.8188C276.436 29.1623 275.958 28.6301 275.369 28.6301ZM270.068 31.0754H269.002C268.413 31.0754 267.935 31.6 267.935 32.2471V34.5905C267.935 35.2376 268.413 35.7622 269.002 35.7622H270.068C270.657 35.7622 271.135 35.2376 271.135 34.5905V32.2471C271.135 31.6 270.657 31.0754 270.068 31.0754Z" fill="black"/>
      </svg>

      {/* ── Top nav: "< Groups   Challenge   [icons]" ── */}
      <div style={{ height: 48, background: T.bgSurface, display: "flex", alignItems: "center", position: "relative", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        {/* Back button */}
        <div style={{ position: "absolute", left: 0, display: "flex", alignItems: "center", gap: 4, padding: "12px 8px 12px 12px" }}>
          <svg width="17" height="22" viewBox="0 0 17 22" fill="none"><path d="M11.5858 20.4142L3.58579 12.4142C2.80474 11.6332 2.80474 10.3668 3.58579 9.58579L11.5858 1.58579L13 3L5 11L13 19L11.5858 20.4142Z" fill="black"/></svg>
          <span style={{ fontFamily: T.font, fontSize: 17, fontWeight: 400, color: T.textPri }}>Groups</span>
        </div>
        {/* Center title */}
        <div style={{ position: "absolute", left: 130, right: 130, textAlign: "center" }}>
          <span style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, color: T.textPri }}>Challenge</span>
        </div>
        {/* Trailing icons */}
        <div style={{ position: "absolute", right: 0, display: "flex", alignItems: "center", gap: 16, padding: "12px 24px" }}>
          {/* Share icon */}
          <svg width="24" height="23" viewBox="0 0 24 24" fill="none"><path d="M12 2V14" stroke="black" strokeWidth="2" strokeLinecap="round"/><path d="M8 6L12 2L16 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 12V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V12" stroke="black" strokeWidth="2" strokeLinecap="round"/></svg>
          {/* More icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="2" fill="black"/><circle cx="12" cy="12" r="2" fill="black"/><circle cx="12" cy="19" r="2" fill="black"/></svg>
        </div>
      </div>

      {/* ── Hero image (185px) ── */}
      <div style={{ width: "100%", height: 185, overflow: "hidden", flexShrink: 0, position: "relative", background: "#C8C8C8" }}>
        {heroImg
          ? <img src={heroImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
          : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#d0d0d0,#a8a8a8)" }}/>}
      </div>

      {/* ── Content below hero ── */}
      <div style={{ background: T.bgSurface, display: "flex", flexDirection: "column" }}>

        {/* Badge overlay (120px circle, centered, overlaps hero by 60px) */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: -60 }}>
          <div style={{ width: 120, height: 120, flexShrink: 0, overflow: "hidden" }}>
            {badgeImg
              ? <img src={badgeImg} alt="" style={{ width: 120, height: 120, objectFit: "contain" }}/>
              : <div style={{ width: 120, height: 120, borderRadius: "50%", background: "#E8E8E8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: T.font, fontSize: 11, color: "#999" }}>Badge</span>
                </div>}
          </div>
        </div>

        {/* Vertical spacer (71px in Figma, minus 60px badge overlap = 11px extra) */}
        <div style={{ height: 11 }}/>

        {/* Title + subtitle (center aligned) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", padding: "0 24px" }}>
          <div style={{ fontFamily: T.font, fontSize: 22, fontWeight: 700, lineHeight: "28px", color: T.textPri, textAlign: "center" }}>
            {title || "Challenge Title"}
          </div>
          <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textSec, textAlign: "center" }}>
            {goal || "Challenge goal description"}
          </div>
        </div>

        {/* Spacer */}
        <div style={{ height: 32 }}/>

        {/* Two-button CTA: Join Challenge + Invite Friends */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "0 24px", alignItems: "center" }}>
          <button style={{ width: "100%", height: 48, borderRadius: 24, background: T.orange, border: "none", fontFamily: T.font, fontSize: 15, fontWeight: 700, color: "#fff", cursor: "default" }}>
            Join Challenge
          </button>
          <button style={{ width: "100%", height: 48, borderRadius: 24, background: "transparent", border: `1.5px solid ${T.orange}`, fontFamily: T.font, fontSize: 15, fontWeight: 700, color: T.orange, cursor: "default" }}>
            Invite Friends
          </button>
        </div>

        {/* Social summary row */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 24px", minHeight: 56 }}>
          <Facepile/>
          <span style={{ fontFamily: T.font, fontSize: 13, color: T.textSec, lineHeight: "18px" }}>
            18 Friends have joined
          </span>
        </div>

        {/* ── Info rows (classic stacked layout) ── */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Date row */}
          <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 24px", minHeight: 64, borderBottom: `0.5px solid ${T.divider}` }}>
            <div style={{ width: 24, height: 24, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IcoDate/>
            </div>
            <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textPri, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {startDate && endDate ? `${startDate} to ${endDate}` : "March 1, 2024 to March 31 2024"}
            </div>
          </div>

          {/* Activity/Goal row */}
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 24px", minHeight: 64, borderBottom: `0.5px solid ${T.divider}` }}>
            <div style={{ width: 24, height: 24, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 0 }}>
              <IcoActivityType/>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
              <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textPri }}>
                {goal || "Complete a 5 km (3.1 mi) run."}
              </div>
              <div style={{ fontFamily: T.font, fontSize: 13, lineHeight: "18px", color: T.textTer }}>
                Qualifying Activities: {activityType || "Run, Virtual Run, Walk"}
              </div>
            </div>
          </div>

          {/* Reward row */}
          <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 24px", minHeight: 64, borderBottom: `0.5px solid ${T.divider}` }}>
            <div style={{ width: 24, height: 24, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IcoReward/>
            </div>
            <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textPri, flex: 1 }}>
              {reward || "Earn a digital finisher's badge for your Trophy Case."}
            </div>
          </div>

          {/* Details and Eligibility link */}
          <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 24px", minHeight: 64 }}>
            <div style={{ width: 24, height: 24, flexShrink: 0 }}/>
            <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, lineHeight: "20px", color: T.orange }}>
              Details and Eligibility
            </div>
          </div>
        </div>
      </div>

      {/* ── Sponsor card ── */}
      <div style={{ background: T.bgSurface, marginTop: 8, padding: 24, display: "flex", gap: 16, alignItems: "flex-start" }}>
        {/* Club logo (64×64, rounded) */}
        <div style={{ width: 64, height: 64, flexShrink: 0, overflow: "hidden" }}>
          {logoImg
            ? <img src={logoImg} alt="" style={{ width: 64, height: 64, objectFit: "cover" }}/>
            : <div style={{ width: 64, height: 64, background: "#E8E8E8", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: T.font, fontSize: 9, color: "#999" }}>Logo</span>
              </div>}
        </div>
        {/* Copy */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontFamily: T.font, fontSize: 10, lineHeight: "14px", color: T.textPri, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Organizing club
            </div>
            <div style={{ fontFamily: T.font, fontSize: 22, fontWeight: 700, lineHeight: "28px", color: T.textPri }}>
              {brandName || "Brand Name"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Bike icon */}
              <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.9 }}>
                <svg width="32" height="21" viewBox="0 0 32 21" fill="none"><path d="M7.5 18C4.46 18 2 15.54 2 12.5C2 9.46 4.46 7 7.5 7C10.54 7 13 9.46 13 12.5C13 15.54 10.54 18 7.5 18ZM7.5 8.5C5.29 8.5 3.5 10.29 3.5 12.5C3.5 14.71 5.29 16.5 7.5 16.5C9.71 16.5 11.5 14.71 11.5 12.5C11.5 10.29 9.71 8.5 7.5 8.5ZM24.5 18C21.46 18 19 15.54 19 12.5C19 9.46 21.46 7 24.5 7C27.54 7 30 9.46 30 12.5C30 15.54 27.54 18 24.5 18ZM24.5 8.5C22.29 8.5 20.5 10.29 20.5 12.5C20.5 14.71 22.29 16.5 24.5 16.5C26.71 16.5 28.5 14.71 28.5 12.5C28.5 10.29 26.71 8.5 24.5 8.5ZM16 12.5L20.5 3H18L14.5 10L11.5 5H8V6.5H10.5L13.5 11.5L14.5 12.5H16ZM21 3L24.5 12.5H22L19 5H21Z" fill={T.textSec}/></svg>
              </div>
              <span style={{ fontFamily: T.font, fontSize: 13, lineHeight: "18px", color: T.textSec }}>
                5,678 Athletes
              </span>
            </div>
          </div>
          {/* Follow button */}
          <button style={{ width: "100%", height: 44, borderRadius: 22, background: T.orange, border: "none", fontFamily: T.font, fontSize: 15, fontWeight: 700, color: "#fff", cursor: "default" }}>
            Follow
          </button>
        </div>
      </div>

      {/* ── Description section ── */}
      <div style={{ background: T.bgSurface, marginTop: 8, padding: 24, overflow: "hidden" }}>
        <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, lineHeight: "22px", color: T.textPri, marginBottom: 8 }}>
          {title ? `The ${brandName || "Brand"} Challenge` : "About this Challenge"}
        </div>
        <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textSec, whiteSpace: "pre-wrap" }}>
          {description || "The arrival of Equinox on March 19th and 20th, brings an opportunity to reflect on our relationship with the light around us as we move into the season ahead.\n\nThe days are extending for some and shortening for others, but on this day riders in the Southern and Northern Hemisphere experience roughly twelve hours of light and twelve of darkness."}
        </div>
      </div>

    </div>
  );
}

// --- Register ----------------------------------------------------------------
Object.assign(window.MT, { ScreenOldDesign });
