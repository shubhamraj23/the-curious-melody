import { ImCross } from "react-icons/im";
import Logo from '../media/profile-image.jpg'

const SideBar = ({sideState, changeState}) => {
  return (
    <div className={`fixed top-0 bg-color-2 w-3/4 md:w-1/2 h-screen z-30 ${sideState}`}>
      <div className="absolute top-3 right-3">
        <ImCross className="text-lg md:text-xl hover:cursor-pointer text-color-1" onClick={changeState}/>
      </div>

      <div className="mt-10">
        <img src={Logo} className="mx-auto w-1/2 md:w-1/3 rounded-full mb-4" alt="The Curious Melody Logo" />
        <p className="text-color-1 roboto italic side-tag">Look beneath the obvious.</p>
        <p className="text-color-1 roboto italic side-tag">There is always something bigger hidden.</p>
      </div>

      <div className="my-6 flex justify-center">
        <button className="profile-button roboto font-semibold">View Profile</button>
      </div>
    </div>
  )
}

export default SideBar
