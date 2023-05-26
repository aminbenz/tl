import Link from "next/link"
import routes, { routeIsActive } from "routes/sidebar"
import * as Icons from "icons"
import { IIcon } from "icons"
import SidebarSubmenu from "./SidebarSubmenu"
import { Button } from "@roketid/windmill-react-ui"
import { useRouter } from "next/router"

function Icon({ icon, ...props }: IIcon) {
  // @ts-ignore
  const Icon = Icons[icon]
  return <Icon {...props} />
}

interface ISidebarContent {
  linkClicked: () => void
}

function SidebarContent({ linkClicked }: ISidebarContent) {
  const { pathname } = useRouter()
  const appName = process.env.NEXT_PUBLIC_APP_NAME

  return (
    <div className="text-gray-500 dark:text-gray-400">
      <Link
        className="text-lg font-bold text-gray-800 dark:text-gray-200"
        href="/#"
        passHref
      >
        <div className="ml-6 py-6">{appName}</div>
      </Link>
      <ul>
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu
              route={route}
              key={route.name}
              linkClicked={linkClicked}
            />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <Link
                onClick={linkClicked}
                href={route.path || "#"}
                className={`inline-flex w-full items-center text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
                  routeIsActive(pathname, route)
                    ? "text-gray-800 dark:text-gray-100"
                    : ""
                }`}
                scroll={false}
              >
                {routeIsActive(pathname, route) && (
                  <span
                    className="absolute inset-y-0 left-0 w-1 rounded-r-lg bg-purple-600"
                    aria-hidden="true"
                  ></span>
                )}

                <Icon
                  className="h-5 w-5"
                  aria-hidden="true"
                  icon={route.icon || ""}
                />
                <span className="ml-4">{route.name}</span>
              </Link>
            </li>
          )
        )}
      </ul>
      <div className="my-6 px-6">
        <Button>
          Create account
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
      </div>
    </div>
  )
}

export default SidebarContent
