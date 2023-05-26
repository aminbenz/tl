import React, { useContext, useRef } from "react"
// import SidebarContext from "@context/SidebarContext"
// import SidebarContent from "./SidebarContent"

function DesktopSidebar() {
  const sidebarRef = useRef(null)
  // const { saveScroll } = useContext(SidebarContext)

  // const linkClickedHandler = () => {
  //   saveScroll(sidebarRef.current)
  // }

  return (
    <aside
      id="desktopSidebar"
      ref={sidebarRef}
      className="z-30 hidden w-64 flex-shrink-0 overflow-y-auto bg-white dark:bg-gray-800 lg:block"
    >
      {/* <SidebarContent linkClicked={linkClickedHandler} /> */}
    </aside>
  )
}

export default DesktopSidebar
