import React, { useState, useContext } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { DropdownIcon, IIcon } from "icons"
import * as Icons from "icons"
import { Transition } from "@roketid/windmill-react-ui"
// import { IRoute, routeIsActive } from "routes/sidebar"
// import SidebarContext from "context/SidebarContext"

function Icon({ icon, ...props }: IIcon) {
  // @ts-ignore
  const _Icon = Icons[icon]
  return <_Icon {...props} />
}

interface ISidebarSubmenu {
  route: any
  linkClicked: () => void
}

function SidebarSubmenu({ route, linkClicked }: ISidebarSubmenu) {
  const { pathname } = useRouter()
  // const { saveScroll } = useContext(SidebarContext)

  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(
    route.routes
      ? route.routes.filter((r) => {
          return
          // return routeIsActive(pathname, r)
        }).length > 0
      : false
  )

  function handleDropdownMenuClick() {
    setIsDropdownMenuOpen(!isDropdownMenuOpen)
  }

  return (
    <li className="relative px-6 py-3" key={route.name}>
      {isDropdownMenuOpen && (
        <span
          className="absolute inset-y-0 left-0 h-12 w-1 rounded-r-lg bg-purple-600"
          aria-hidden="true"
        ></span>
      )}
      <button
        className={`inline-flex w-full items-center justify-between text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
          isDropdownMenuOpen ? "text-gray-800 dark:text-gray-100" : ""
        }`}
        onClick={handleDropdownMenuClick}
        aria-haspopup="true"
      >
        <span className="inline-flex items-center">
          <Icon
            className="h-5 w-5"
            aria-hidden="true"
            icon={route.icon || ""}
          />
          <span className="ml-4">{route.name}</span>
        </span>
        <DropdownIcon
          className={`h-4 w-4 ${isDropdownMenuOpen ? `rotate-180` : ``}`}
          aria-hidden="true"
        />
      </button>
      <Transition
        show={isDropdownMenuOpen}
        enter="transition-all ease-in-out duration-300"
        enterFrom="opacity-25 max-h-0"
        enterTo="opacity-100 max-h-xl"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100 max-h-xl"
        leaveTo="opacity-0 max-h-0"
      >
        <ul
          className="mt-2 space-y-2 overflow-hidden rounded-md bg-gray-50 p-2 text-sm font-medium text-gray-500 shadow-inner dark:bg-gray-900 dark:text-gray-400"
          aria-label="submenu"
        >
          {route.routes &&
            route.routes.map((r) => (
              <li
                className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                key={r.name}
              >
                <Link
                  className={`inline-block w-full ${
                    // routeIsActive(pathname, r)
                    true ? "text-gray-800 dark:text-gray-100" : ""
                  }`}
                  onClick={linkClicked}
                  href={r.path || ""}
                  scroll={false}
                >
                  {r.name}
                </Link>
              </li>
            ))}
        </ul>
      </Transition>
    </li>
  )
}

export default SidebarSubmenu
