import axios from 'axios';
import { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Logo from '../media/profile-image.jpg'
import Spinner from '../media/spinner.gif'

const SideBar = ({sideState, changeState}) => {
  const [dropDown, setDropDown] = useState('hidden')
  const [downArrow, setDownArrow] = useState('')
  const [upArrow, setUpArrow] = useState('hidden')
  const [dropDownHeight, setDropDownHeight] = useState('0')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [articles, setArticles] = useState(0)
  const [poems, setPoems] = useState(0)
  const [stories, setStories] = useState(0)
  const [microtales, setMicrotales] = useState(0)
  const [divStatus, setDivStatus] = useState('')
  const [divCursor, setDivCursor] = useState('cursor-pointer')

  useEffect(() => {
    if (loading) {
      setDivStatus('pointer-events-none')
      setDivCursor('cursor-default')
    }
    else {
      setDivStatus('')
      setDivCursor('cursor-pointer')
    }
  }, [loading])
  
  const changeDropDown = () => {
    if (dropDown === 'hidden') {
      fetchCount()
    } 
    else {
      setDropDown('hidden')
      setDownArrow('')
      setUpArrow('hidden')
      setDropDownHeight('0')
    }
  }

  const fetchCount = async () => {
    try {
      setLoading(true)
      const data = await axios.get('/countAll')
      if (data.status !== 200){
        throw new Error()
      }
      setArticles(data.data.article)
      setPoems(data.data.poem)
      setStories(data.data.story)
      setMicrotales(data.data.microtale)
      setError(false)
      setLoading(false)
      setDropDown('')
      setDownArrow('hidden')
      setUpArrow('')
      setDropDownHeight('auto')

    } catch (e) {
      setLoading(false)
      setError(true)
    }
  }

  return (
    <div className={`fixed top-0 bg-color-2 w-3/4 md:w-1/2 h-screen z-30 overflow-scroll ${sideState}`} id="sidebar">
      <div className="absolute top-3 right-3">
        <ImCross className="text-lg md:text-xl hover:cursor-pointer text-color-1" onClick={changeState}/>
      </div>

      <div className="mt-10">
        <img src={Logo} className="mx-auto w-1/2 md:w-1/3 rounded-full mb-4" alt="The Author" />
        <p className="roboto italic side-tag">Look beneath the obvious</p>
        <p className="roboto italic side-tag">There is always something bigger hidden</p>
      </div>

      <div className="my-6 flex justify-center">
        <button className="profile-button roboto">View Profile</button>
      </div>

      <div className={`bg-color-3-shade-1 py-2 pl-4 relative ${divStatus} ${divCursor}`} onClick={changeDropDown}>
        <p className="text-white">View the entire collection</p>
        <AiFillCaretDown className={`text-white absolute right-4 md:right-10 top-2.5 text-xl ${downArrow}`}></AiFillCaretDown>
        <AiFillCaretUp className={`text-white absolute right-4 md:right-10 top-2.5 text-xl ${upArrow}`}></AiFillCaretUp>
      </div>

      <div className="overflow-hidden" style={{height: `${dropDownHeight}`}}>
        <div className="bg-color-3 py-2 pl-8 relative">
          <p>Articles</p>
          <p className="absolute top-2 right-8 md:right-20 text-white font-semibold">{articles}</p>
        </div>

        <div className="bg-color-3-shade-2 py-2 pl-8 relative">
          <p>Poems</p>
          <p className="absolute top-2 right-8 md:right-20 text-white font-semibold">{poems}</p>
        </div>

        <div className="bg-color-3 py-2 pl-8 relative">
          <p>Stories</p>
          <p className="absolute top-2 right-8 md:right-20 text-white font-semibold">{stories}</p>
        </div>

        <div className="bg-color-3-shade-2 py-2 pl-8 relative">
          <p>Microtales</p>
          <p className="absolute top-2 right-8 md:right-20 text-white font-semibold">{microtales}</p>
        </div>
      </div>

      {loading && 
        <div className="mt-4">
          <img src={Spinner} className="mx-auto" alt="Loading" />
        </div>
      }

      {error &&
        <div className="mt-10 px-4">
          <p className="text-center text-sm">Something unexpected happened. Please try again after a while.</p>
        </div>
      }

    </div>
  )
}

export default SideBar
