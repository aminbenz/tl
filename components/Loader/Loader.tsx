import styles from "./Loader.module.css"

function Loader() {
  return (
    <div>
      <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-30">
        <div className="flex flex-col items-center rounded-lg border bg-white px-5 py-2">
          <div className={`${styles.LoaderDots} relative mt-2 block h-5 w-20`}>
            <div className="absolute top-0 mt-1 h-3 w-3 rounded-full bg-green-500"></div>
            <div className="absolute top-0 mt-1 h-3 w-3 rounded-full bg-green-500"></div>
            <div className="absolute top-0 mt-1 h-3 w-3 rounded-full bg-green-500"></div>
            <div className="absolute top-0 mt-1 h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="mt-2 text-center text-xs font-light text-gray-500">
            Please wait...
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader
