import { ImCross } from "react-icons/im";

const SideBar = ({sideState, changeState}) => {
  return (
    <div className={`fixed top-0 bg-color-2 w-3/4 md:w-1/2 h-screen z-30 ${sideState}`}>
      <div className="absolute top-3 right-3">
        <ImCross className="text-lg md:text-xl hover:cursor-pointer text-color-1" onClick={changeState}/>
      </div>
    </div>
  )
}

export default SideBar
