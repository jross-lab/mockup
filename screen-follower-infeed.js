/**
 * screen-follower-infeed.js
 * Challenge Detail — Follower In-Feed screen.
 */
const { T, Facepile, DANTE_AVATAR, MILESTONE_MAP_IMG } = window.MT;

function ScreenFollowerInFeed({ data }) {
  const { badgeImg, title, goal, description } = data;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, background: T.bgSunken }}>
      {/* ── Module 1: Activity Entry ── */}
      <div style={{ background: T.bgSurface, display: "flex", flexDirection: "column" }}>
        {/* Feed Owner Header */}
        <div style={{ padding: 24, display: "flex", gap: 12, alignItems: "flex-start", position: "relative" }}>
          <div style={{ position: "relative", flexShrink: 0, width: 48, height: 48, overflow: "visible" }}>
            <img src={DANTE_AVATAR} alt="" style={{ width: 48, height: 48, display: "block" }}/>
            <div style={{ position: "absolute", top: -3, right: -3, width: 14, height: 14 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="#FC5200"/><path d="M4 7L6 9L10 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, lineHeight: "18px", color: T.textPri }}>Dante Young</div>
            <div style={{ height: 4 }}/>
            <div style={{ display: "flex", gap: 4, alignItems: "center", height: 16 }}>
              <div style={{ width: 16, height: 16, flexShrink: 0, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 2 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.9"><path d="M4 4V6H5.70532L7.13287 8.4982L6.29703 10.1699C5.88339 10.0591 5.44859 10 5 10C2.23858 10 0 12.2386 0 15C0 17.7614 2.23858 20 5 20C7.41896 20 9.43671 18.2822 9.89998 16H11C11.3589 16 11.6902 15.8077 11.8682 15.4961L15.4755 9.18338L16.114 10.9165C14.835 11.8221 14 13.3135 14 15C14 17.7614 16.2386 20 19 20C21.7614 20 24 17.7614 24 15C24 12.2386 21.7614 10 19 10C18.6393 10 18.2876 10.0382 17.9486 10.1107L16.4341 6H19.5C19.7761 6 20 6.22386 20 6.5C20 6.77614 19.7761 7 19.5 7H19V9H19.5C20.8807 9 22 7.88071 22 6.5C22 5.11929 20.8807 4 19.5 4H15C14.673 4 14.3667 4.15984 14.1797 4.42803C13.9927 4.69623 13.9486 5.03891 14.0617 5.34571L14.6711 7H8.58025L8.00882 6H9V4H4ZM8.32544 10.5852L10.2768 14H6.61803L8.32544 10.5852ZM11.5 12.1095L9.72311 9H13.2768L11.5 12.1095ZM5 12C5.12549 12 5.24919 12.0077 5.37063 12.0227L4.10557 14.5528C3.95058 14.8628 3.96714 15.2309 4.14935 15.5257C4.33156 15.8205 4.65342 16 5 16H7.82929C7.41746 17.1652 6.30622 18 5 18C3.34315 18 2 16.6569 2 15C2 13.3431 3.34315 12 5 12ZM16.8483 12.9095L17.9074 15.784L19.784 15.0926L18.652 12.02C18.7662 12.0068 18.8823 12 19 12C20.6569 12 22 13.3431 22 15C22 16.6569 20.6569 18 19 18C17.3431 18 16 16.6569 16 15C16 14.1871 16.3233 13.4498 16.8483 12.9095Z" fill="black"/></g></svg>
              </div>
              <span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px" }}>Today at 9:31 AM · Los Angeles, California</span>
            </div>
          </div>
          <div style={{ position: "absolute", right: 24, top: 24, width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="5" viewBox="0 0 16 5" fill="none"><circle cx="2" cy="2.5" r="1.5" fill="#000"/><circle cx="8" cy="2.5" r="1.5" fill="#000"/><circle cx="14" cy="2.5" r="1.5" fill="#000"/></svg>
          </div>
        </div>
        {/* Text */}
        <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontFamily: T.font, fontSize: 20, fontWeight: 700, lineHeight: "24px", color: T.textPri }}>Probably the most beautiful ride I've ever been on</div>
        </div>
        <div style={{ height: 16 }}/>
        {/* Stats row */}
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
        <div style={{ height: 12 }}/>
        {/* Social Summary */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", minHeight: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Facepile/><span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px" }}>12 gave kudos</span></div>
          <span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px", textAlign: "right" }}>1 comment</span>
        </div>
      </div>

      {/* ── Module 2: Challenge Join Card ── */}
      <div style={{ background: T.bgSurface, display: "flex", flexDirection: "column" }}>
        {/* Entry context header */}
        <div style={{ padding: "24px 24px", display: "flex", gap: 16, alignItems: "center" }}>
          <p style={{ flex: 1, fontFamily: T.font, fontSize: 13, lineHeight: "18px", color: T.textPri }}>Victor Townsend joined a challenge</p>
        </div>
        {/* Card content: badge + copy + button */}
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "0 24px 24px" }}>
          <div style={{ width: 64, height: 64, flexShrink: 0, overflow: "hidden" }}>
            {badgeImg
              ? <img src={badgeImg} alt="" style={{ width: 64, height: 64, objectFit: "contain" }}/>
              : <div style={{ width: 64, height: 64, background: "#E8E8E8", borderRadius: 2 }}/>}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontFamily: T.font, fontSize: 22, fontWeight: 700, lineHeight: "28px", color: T.textPri, width: 250 }}>
                {title || "Jess's Biggest Challenge Yet so big it's on two lines"}
              </div>
              <div style={{ fontFamily: T.font, fontSize: 15, lineHeight: "20px", color: T.textSec, overflow: "hidden", textOverflow: "ellipsis" }}>
                {description || goal || "Log 10 active days outside in June to unlock Boots summer prizes!"}
              </div>
            </div>
            <button style={{ width: "100%", height: 48, borderRadius: 24, background: T.orange, border: "none", fontFamily: T.font, fontSize: 15, fontWeight: 700, color: "#fff", cursor: "default" }}>Join Challenge</button>
          </div>
        </div>
      </div>

      {/* ── Module 3: Post Card ── */}
      <div style={{ background: T.bgSurface, display: "flex", flexDirection: "column" }}>
        {/* Media carousel */}
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
        {/* Social Summary */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", minHeight: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Facepile/><span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px" }}>12 gave kudos</span></div>
          <span style={{ fontFamily: T.font, fontSize: 11, color: T.textSec, lineHeight: "13px", textAlign: "right" }}>1 comment</span>
        </div>
        <div style={{ height: 12 }}/>
      </div>
    </div>
  );
}

// --- Register ----------------------------------------------------------------

Object.assign(window.MT, { ScreenFollowerInFeed });
