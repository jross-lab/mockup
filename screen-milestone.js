/**
 * screen-milestone.js
 * Challenge Detail — Milestone screen.
 */
const { T, Facepile, MILESTONE_AVATAR, MILESTONE_MAP_IMG } = window.MT;

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
          <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, lineHeight: "18px", color: T.textPri }}>Sarah Li</div>
          <div style={{ height: 4 }}/>
          <div style={{ display: "flex", gap: 4, alignItems: "center", height: 16 }}>
            <div style={{ width: 16, height: 16, flexShrink: 0, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 2 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8.68843 0C8.02519 0 7.37985 0.215115 6.84926 0.613058L3.52982 3.10263L0.683772 4.05132C0.27543 4.18743 0 4.56957 0 5C0 6.57896 0.196721 7.77215 0.566654 8.73398C0.942709 9.71172 1.4741 10.3883 2.04289 10.9571C2.34815 11.2624 2.64313 11.524 2.92865 11.7772C3.71439 12.4741 4.42845 13.1075 5.08755 14.4114C6.12048 16.9818 7.45819 19.1594 9.53364 20.6814C11.6286 22.2177 14.3564 23 18 23C20.1284 23 21.5871 22.4466 22.5488 21.589C23.5046 20.7365 23.8434 19.6954 23.9567 18.9614C24.1091 17.974 23.5681 17.1739 22.9903 16.7116L19.0976 13.5974C18.9434 13.4741 18.8292 13.3079 18.7693 13.1198L15.6746 3.39359C15.4106 2.56364 14.6397 2 13.7688 2H12.3333C11.9006 2 11.4795 2.14036 11.1333 2.4L10.5624 2.82823L10.0471 1.02486C9.8738 0.418234 9.31933 0 8.68843 0ZM8.04926 2.21306C8.11793 2.16155 8.19214 2.11886 8.27014 2.08556L9.43763 6.17177L12.3333 4H13.7688L14.7233 7H12V9H15.3597L15.6779 10H13V12H16.3142L16.8635 13.7262C17.043 14.2906 17.3857 14.7892 17.8482 15.1592L20.9541 17.6439C20.1845 17.8341 19.1757 18 18 18C16.0293 18 14.8222 17.5686 13.9543 16.913C13.0586 16.2364 12.4085 15.2379 11.7029 13.8574C11.4792 13.4196 11.2536 12.95 11.0153 12.4539C9.87512 10.0805 8.4437 7.10083 5.53063 4.10203L8.04926 2.21306ZM3.74301 5.13976C6.64458 7.99752 7.99727 10.8037 9.18432 13.2663C9.43326 13.7827 9.67493 14.2841 9.92207 14.7676C10.654 16.1996 11.4727 17.5449 12.7488 18.5089C14.0528 19.4939 15.7207 20 18 20C19.4917 20 20.7544 19.7699 21.6844 19.5211C21.5709 19.7199 21.4194 19.9164 21.2175 20.0964C20.7177 20.5421 19.7824 21 18 21C14.6436 21 12.3714 20.2823 10.7164 19.0686C9.05256 17.8485 7.89336 16.0408 6.92848 13.6286C6.91818 13.6029 6.90682 13.5776 6.89443 13.5528C6.04076 11.8454 4.94668 10.8797 4.10422 10.1361C3.86433 9.92436 3.64484 9.73062 3.45711 9.54289C3.0259 9.11169 2.68229 8.66328 2.43335 8.01602C2.2238 7.47119 2.06607 6.74505 2.01646 5.71527L3.74301 5.13976Z" fill="#43423F"/></svg>
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
        <div style={{ fontFamily: T.font, fontSize: 20, fontWeight: 700, lineHeight: "24px", color: T.textPri }}>what a run!</div>
      </div>
      {/* Vertical Margin — 16px */}
      <div style={{ height: 16 }}/>
      {/* Stats row — px-24 */}
      <div style={{ padding: "0 24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 24, height: 37, alignItems: "center" }}>
          {[["Distance","5.3 mi"],["Time","1h 05m"],["Elevation","50 ft"]].map(([label, val]) => (
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
      {/* Vertical Margin — 12px */}
      <div style={{ height: 12 }}/>
    </div>
  );
}

// --- Screen: Follower In-Feed Unit (same feed as Milestone, with challenge join card) ---

Object.assign(window.MT, { ScreenMilestone });
