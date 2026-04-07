/**
 * screen-share-sheet.js
 * Sharing screens: Share Sheet (post-completion share flow).
 * ─────────────────────────────────────────────────────────────
 * EDIT THIS FILE when: modifying the share sheet layout.
 */

const { T } = window.MT;

// Strava wordmark — white, official SVG provided by design team
function StravaLogoWhite() {
  return (
    <svg width="54" height="11" viewBox="0 0 54 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40.4424 3.86719L42.168 0.391602H45.5811L40.4434 10.332L35.3037 0.391602H38.7168L40.4424 3.86719ZM4.55762 0.223633C6.39395 0.223684 7.75457 0.659965 8.85645 1.53223L7.30469 3.68555C6.40705 3.0315 5.33236 2.74512 4.44824 2.74512C3.97233 2.74514 3.75488 2.90897 3.75488 3.14062V3.16797C3.75515 3.42676 4.0135 3.59035 5.01953 3.78125C7.45456 4.23087 9.08691 4.93965 9.08691 6.86133V6.8877C9.08691 8.89122 7.44127 10.1181 4.88379 10.1182C2.95218 10.1182 1.21077 9.57298 0 8.50977L1.7002 6.47949C2.73399 7.27002 3.91779 7.59666 5.0332 7.59668C5.60443 7.59668 5.84944 7.44713 5.84961 7.18848V7.16113C5.84961 6.88849 5.55032 6.73868 4.53027 6.53418C2.39472 6.09832 0.516777 5.48452 0.516602 3.46777V3.44043C0.516602 1.62788 1.93193 0.223633 4.55762 0.223633ZM18.2451 3.09961H15.4424V9.94141H12.2598V3.09961H9.45703V0.401367H18.2451V3.09961ZM38.0312 9.94141H34.6172L32.8916 6.46484L31.166 9.94141H24.7256L22.9297 7.21582H22.25V9.94141H19.0664V0.401367H23.7188C25.4055 0.401367 26.4808 0.823439 27.1475 1.49121C27.7189 2.0637 28.0176 2.77279 28.0176 3.75391V3.78125C28.0175 5.17115 27.297 6.13953 26.1406 6.69824L28.0127 9.4375L32.8916 0L38.0312 9.94141ZM53.127 9.94141H49.7139L47.9883 6.46484L46.2627 9.94141H42.8496L47.9883 0L53.127 9.94141ZM22.25 4.93945H23.624C24.3855 4.93942 24.8485 4.59848 24.8486 4.0127V3.98535C24.8485 3.37229 24.3719 3.07231 23.6377 3.07227H22.25V4.93945Z" fill="white"/>
    </svg>
  );
}

// Shareable card — shown in the carousel
function ShareableCard({ badgeImg, tagline, heroImg, cardBg }) {
  const stats = [
    { value: "8",       label: "Activities" },
    { value: "21 mi",   label: "Distance" },
    { value: "2:54:08", label: "Time" },
  ];
  return (
    <div style={{
      width: 214, height: 380,
      borderRadius: 12,
      overflow: "hidden",
      position: "relative",
      background: cardBg || "#1A1A1A",
      flexShrink: 0,
      boxShadow: "0px 4px 16px rgba(0,0,0,0.35)",
    }}>
      {/* Background image */}
      {heroImg && (
        <img src={heroImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}/>
      )}
      {/* Dark overlay gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.78) 100%)",
      }}/>

      {/* Badge — centred, upper area */}
      <div style={{
        position: "absolute",
        top: 60,
        left: "50%",
        transform: "translateX(-50%)",
        width: 56, height: 56,
        borderRadius: "50%",
        overflow: "hidden",
        background: "rgba(255,255,255,0.15)",
      }}>
        {badgeImg
          ? <img src={badgeImg} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }}/>
          : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/></svg>
            </div>
        }
      </div>

      {/* Content: tagline + stats + logo — pinned to bottom */}
      <div style={{
        position: "absolute", bottom: 16, left: 16, right: 16,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
      }}>
        {/* Tagline */}
        <div style={{
          fontFamily: T.font, fontSize: 11, fontWeight: 700,
          color: "#fff", textAlign: "center", lineHeight: "15px",
        }}>
          {tagline || "Custom tagline here."}
        </div>

        {/* Stats — stacked, centred */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", alignItems: "center" }}>
          {stats.map(({ value, label }, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <div style={{
                fontFamily: T.font, fontSize: 16.43, fontWeight: 700,
                color: "#fff", textAlign: "center", lineHeight: "21px",
              }}>{value}</div>
              <div style={{
                fontFamily: T.font, fontSize: 9, fontWeight: 700,
                color: "rgba(255,255,255,0.85)", lineHeight: "12px", textAlign: "center",
              }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Strava wordmark */}
        <StravaLogoWhite/>
      </div>
    </div>
  );
}

// Share destination icon button
function ShareDestBtn({ icon, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 64, flexShrink: 0 }}>
      <div style={{
        width: 56, height: 56, borderRadius: "50%",
        background: "#F2F2F0", border: "0.5px solid rgba(0,0,0,0.10)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {icon}
      </div>
      <span style={{
        fontFamily: T.font, fontSize: 11, color: T.textPri,
        textAlign: "center", lineHeight: "14px", whiteSpace: "pre-line",
      }}>{label}</span>
    </div>
  );
}

function ScreenShareSheet({ data }) {
  const { badgeImg, title, heroImg } = data;
  const [activeCard, setActiveCard] = React.useState(1);
  const tagline = title || "Custom tagline here.";
  const cards = [0, 1, 2];
  const cardBgs = ["#1C2B3A", "#2A1A1A", "#1A2A1A"];

  return (
    <div style={{ display: "flex", flexDirection: "column", background: "#fff", minHeight: "100%" }}>

      {/* ── Status bar — white icons on black ── */}
      <div style={{ position: "relative", flexShrink: 0, background: "#000" }}>
        <svg width="375" height="54" viewBox="0 0 375 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M55.9091 24.7231C58.4658 24.7231 60.6904 26.541 60.6904 30.8574V30.874C60.6904 34.9082 58.8725 37.2988 55.8593 37.2988C53.6596 37.2988 52.0161 35.9956 51.6342 34.1611L51.6176 34.0698H53.726L53.7509 34.1528C54.0663 34.9912 54.8051 35.5391 55.8593 35.5391C57.7602 35.5391 58.5654 33.6797 58.6567 31.3887C58.6567 31.2974 58.665 31.2061 58.665 31.1147H58.499C58.059 32.061 57.0131 32.8994 55.3696 32.8994C53.0703 32.8994 51.4599 31.2227 51.4599 28.9482V28.9316C51.4599 26.4995 53.311 24.7231 55.9091 24.7231ZM55.9008 31.2559C57.2538 31.2559 58.2914 30.2764 58.2914 28.9233V28.9067C58.2914 27.5371 57.2538 26.4663 55.9257 26.4663C54.6059 26.4663 53.5517 27.5205 53.5517 28.8569V28.8735C53.5517 30.2598 54.5395 31.2559 55.9008 31.2559ZM64.0509 29.2388C63.2956 29.2388 62.7311 28.6577 62.7311 27.9272C62.7311 27.1885 63.2956 26.6157 64.0509 26.6157C64.8146 26.6157 65.3707 27.1885 65.3707 27.9272C65.3707 28.6577 64.8146 29.2388 64.0509 29.2388ZM64.0509 35.3979C63.2956 35.3979 62.7311 34.8252 62.7311 34.0864C62.7311 33.3477 63.2956 32.7749 64.0509 32.7749C64.8146 32.7749 65.3707 33.3477 65.3707 34.0864C65.3707 34.8252 64.8146 35.3979 64.0509 35.3979ZM73.222 37V34.7007H67.3617V32.9492C68.9139 30.2515 70.6156 27.4956 72.2425 25.022H75.2723V32.9326H76.8827V34.7007H75.2723V37H73.222ZM69.3539 32.9824H73.2552V26.7319H73.1307C71.9022 28.6079 70.516 30.8242 69.3539 32.8579V32.9824ZM81.4385 37V27.1304H81.2974L78.3174 29.2388V27.2217L81.4468 25.022H83.5801V37H81.4385Z" fill="white"/>
          <path opacity="0.35" d="M322.435 23.5H339.435C341.368 23.5 342.935 25.067 342.935 27V32C342.935 33.933 341.368 35.5 339.435 35.5H322.435C320.502 35.5 318.935 33.933 318.935 32V27C318.935 25.067 320.502 23.5 322.435 23.5Z" stroke="white"/>
          <path opacity="0.4" d="M344.435 28V32.2203C345.284 31.8629 345.836 31.0314 345.836 30.1102C345.836 29.1889 345.284 28.3574 344.435 28Z" fill="white"/>
          <path d="M320.435 27C320.435 25.8954 321.33 25 322.435 25H339.435C340.54 25 341.435 25.8954 341.435 27V32C341.435 33.1046 340.54 34 339.435 34H322.435C321.33 34 320.435 33.1046 320.435 32V27Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M303.206 26.104C305.693 26.1041 308.085 27.0262 309.887 28.6796C310.023 28.8073 310.24 28.8057 310.374 28.676L311.671 27.4126C311.739 27.3468 311.777 27.2577 311.776 27.165C311.775 27.0724 311.737 26.9837 311.668 26.9187C306.937 22.544 299.473 22.544 294.742 26.9187C294.674 26.9837 294.635 27.0723 294.634 27.165C294.634 27.2577 294.671 27.3468 294.739 27.4126L296.037 28.676C296.17 28.8059 296.388 28.8075 296.523 28.6796C298.326 27.0261 300.718 26.104 303.206 26.104ZM303.202 30.3243C304.56 30.3242 305.868 30.8359 306.875 31.76C307.011 31.8912 307.225 31.8883 307.358 31.7536L308.645 30.4343C308.713 30.3651 308.75 30.2712 308.749 30.1737C308.748 30.0761 308.709 29.9831 308.64 29.9153C305.576 27.0244 300.831 27.0244 297.767 29.9153C297.698 29.9831 297.659 30.0762 297.658 30.1738C297.657 30.2714 297.695 30.3652 297.762 30.4343L299.049 31.7536C299.182 31.8883 299.396 31.8912 299.533 31.76C300.538 30.8365 301.846 30.3248 303.202 30.3243ZM305.727 33.1178C305.729 33.2232 305.692 33.3247 305.624 33.3985L303.448 35.8533C303.384 35.9254 303.297 35.966 303.206 35.966C303.115 35.966 303.028 35.9254 302.964 35.8533L300.787 33.3985C300.72 33.3247 300.683 33.2231 300.685 33.1177C300.687 33.0124 300.728 32.9126 300.798 32.842C302.188 31.5281 304.224 31.5281 305.614 32.842C305.684 32.9127 305.725 33.0125 305.727 33.1178Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M287.135 24.682C287.135 24.0489 286.657 23.5358 286.068 23.5358H285.002C284.413 23.5358 283.935 24.0489 283.935 24.682V34.616C283.935 35.249 284.413 35.7622 285.002 35.7622H286.068C286.657 35.7622 287.135 35.249 287.135 34.616V24.682ZM279.701 25.981H280.768C281.357 25.981 281.834 26.5065 281.834 27.1548V34.5884C281.834 35.2367 281.357 35.7622 280.768 35.7622H279.701C279.112 35.7622 278.634 35.2367 278.634 34.5884V27.1548C278.634 26.5065 279.112 25.981 279.701 25.981ZM275.369 28.6301H274.303C273.713 28.6301 273.236 29.1623 273.236 29.8188V34.5735C273.236 35.23 273.713 35.7622 274.303 35.7622H275.369C275.958 35.7622 276.436 35.23 276.436 34.5735V29.8188C276.436 29.1623 275.958 28.6301 275.369 28.6301ZM270.068 31.0754H269.002C268.413 31.0754 267.935 31.6 267.935 32.2471V34.5905C267.935 35.2376 268.413 35.7622 269.002 35.7622H270.068C270.657 35.7622 271.135 35.2376 271.135 34.5905V32.2471C271.135 31.6 270.657 31.0754 270.068 31.0754Z" fill="white"/>
        </svg>
      </div>

      {/* ── Header bar: narrow pill with shadow ── */}
      <div style={{
        position: "relative", flexShrink: 0,
        height: 44, display: "flex", alignItems: "center", justifyContent: "center",
        background: "#fff",
        boxShadow: "0px 0.5px 0px rgba(0,0,0,0.15), 0px 2px 8px rgba(0,0,0,0.08)",
      }}>
        <span style={{ position: "absolute", left: 24, fontFamily: T.font, fontSize: 17, fontWeight: 400, color: "#000" }}>Close</span>
        <span style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, color: "#000" }}>Share achievement</span>
      </div>

      {/* ── Carousel area — white background ── */}
      <div style={{ position: "relative", flexShrink: 0, background: "#fff" }}>

        {/* Carousel */}
        <div style={{ position: "relative", paddingTop: 16, paddingBottom: 0 }}>
          <div style={{ display: "flex", gap: 12, paddingLeft: 80, paddingRight: 80 }}>
            {cards.map((_, i) => (
              <div
                key={i}
                onClick={() => setActiveCard(i)}
                style={{
                  flexShrink: 0,
                  transform: i === activeCard ? "scale(1)" : "scale(0.92)",
                  opacity: i === activeCard ? 1 : 0.65,
                  transition: "transform 0.2s ease, opacity 0.2s ease",
                  cursor: "pointer",
                }}
              >
                <ShareableCard
                  badgeImg={badgeImg}
                  tagline={tagline}
                  heroImg={heroImg}
                  cardBg={cardBgs[i]}
                />
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 14, marginBottom: 4 }}>
            {Array.from({ length: 9 }).map((_, i) => {
              const isActive = i === activeCard + 1;
              return (
                <div key={i} style={{
                  width: isActive ? 8 : 6, height: isActive ? 8 : 6,
                  borderRadius: "50%",
                  background: isActive ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.22)",
                  transition: "all 0.2s ease",
                }}/>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── White share panel ── */}
      <div style={{ background: "#fff", paddingTop: 20, paddingBottom: 32, flex: 1 }}>
        <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, color: T.textPri, paddingLeft: 24, marginBottom: 16 }}>
          Share to
        </div>
        <div style={{ display: "flex", gap: 20, paddingLeft: 24, paddingRight: 24, overflowX: "auto", scrollbarWidth: "none" }}>

          {/* Instagram Story */}
          <ShareDestBtn
            label={"Instagram Story"}
            icon={
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="9" fill="#E1306C"/>
                <rect x="4" y="4" width="24" height="24" rx="7" fill="#F77737" opacity="0.6"/>
                <rect x="4" y="4" width="24" height="24" rx="7" fill="#FCAF45" opacity="0.4"/>
                <rect x="6" y="6" width="20" height="20" rx="5.5" stroke="white" strokeWidth="1.8" fill="none"/>
                <circle cx="16" cy="16" r="5" stroke="white" strokeWidth="1.8" fill="none"/>
                <circle cx="22" cy="10" r="1.4" fill="white"/>
              </svg>
            }
          />

          {/* Copy to Clipboard */}
          <ShareDestBtn
            label={"Copy to Clipboard"}
            icon={
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <rect x="8" y="8" width="13" height="13" rx="2" stroke="#000" strokeWidth="1.5" fill="none"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              </svg>
            }
          />

          {/* Save */}
          <ShareDestBtn
            label="Save"
            icon={
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M12 3v13M7 11l5 5 5-5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 19h16" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            }
          />

          {/* Copy Link */}
          <ShareDestBtn
            label="Copy Link"
            icon={
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            }
          />

          {/* More */}
          <ShareDestBtn
            label="More"
            icon={
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M12 3v11M7 9l5 5 5-5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="17" width="18" height="4" rx="1.5" stroke="#000" strokeWidth="1.5" fill="none"/>
              </svg>
            }
          />

        </div>
      </div>

    </div>
  );
}

// Register
Object.assign(window.MT, { ScreenShareSheet });



