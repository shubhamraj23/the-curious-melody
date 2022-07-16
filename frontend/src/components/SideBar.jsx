import { useState } from "react";
import { ImCross } from "react-icons/im";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Logo from '../media/profile-image.jpg'

const SideBar = ({sideState, changeState}) => {
  const [dropDown, setDropDown] = useState('hidden')
  const [downArrow, setDownArrow] = useState('')
  const [upArrow, setUpArrow] = useState('hidden')
  const [dropDownHeight, setDropDownHeight] = useState('0')

  const changeDropDown = () => {
    if (dropDown === 'hidden') {
      setDropDown('')
      setDownArrow('hidden')
      setUpArrow('')
      setDropDownHeight('auto')
    } 
    else {
      setDropDown('hidden')
      setDownArrow('')
      setUpArrow('hidden')
      setDropDownHeight('0')
    }
  }

  return (
    <div className={`fixed top-0 bg-color-2 w-3/4 md:w-1/2 h-screen z-30 ${sideState}`}>
      <div className="absolute top-3 right-3">
        <ImCross className="text-lg md:text-xl hover:cursor-pointer text-color-1" onClick={changeState}/>
      </div>

      <div className="mt-10">
        <img src={Logo} className="mx-auto w-1/2 md:w-1/3 rounded-full mb-4" alt="The Curious Melody Logo" />
        <p className="roboto italic side-tag">Look beneath the obvious</p>
        <p className="roboto italic side-tag">There is always something bigger hidden</p>
      </div>

      <div className="my-6 flex justify-center">
        <button className="profile-button roboto">View Profile</button>
      </div>

      <div className="bg-color-3-shade-1 py-2 pl-4 cursor-pointer relative" onClick={changeDropDown}>
        <p className="text-white">View the entire collection</p>
        <AiFillCaretDown className={`text-white absolute right-4 md:right-10 top-2.5 text-xl ${downArrow}`}></AiFillCaretDown>
        <AiFillCaretUp className={`text-white absolute right-4 md:right-10 top-2.5 text-xl ${upArrow}`}></AiFillCaretUp>
      </div>

      <div className="overflow-hidden" style={{height: `${dropDownHeight}`}}>
        <div className="bg-color-3 py-2 pl-8">
          <p>Articles</p>
        </div>

        <div className="bg-color-3-shade-2 py-2 pl-8">
          <p>Poems</p>
        </div>

        <div className="bg-color-3 py-2 pl-8">
          <p>Stories</p>
        </div>

        <div className="bg-color-3-shade-2 py-2 pl-8">
          <p>Microtales</p>
        </div>
      </div>
    </div>
  )
}

export default SideBar
