import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ImCross } from 'react-icons/im';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import Logo from '../media/profile-image.jpg';
import Spinner from '../media/spinner.gif';

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
  const [fetchStatus, setFetchStatus] = useState(false)
  const [divStatus, setDivStatus] = useState('')
  const [divCursor, setDivCursor] = useState('cursor-pointer')

  // Disable clicking the button when the contents are loading.
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
  
  // Trigger the actions that happen when the drop down button is clicked.
  const changeDropDown = () => {
    if (dropDown === 'hidden') {
      if (!fetchStatus) {           // Fetch the data only if it hasn't been done before. 
        fetchCount()
      }
      else {
        updateFetch()
      }
    } 
    else {
      setDropDown('hidden')
      setDownArrow('')
      setUpArrow('hidden')
      setDropDownHeight('0')
    }
  }

  // Fetch the data from the backend.
  const fetchCount = async () => {
    try {
      setLoading(true)
      const data = await axios.get('/countAll')
      if (data.status !== 200){
        throw new Error()
      }
      
      // Set all the values from the fetched data.
      setArticles(data.data.article)
      setPoems(data.data.poem)
      setStories(data.data.story)
      setMicrotales(data.data.microtale)
      setFetchStatus(true)
      updateFetch()

    } catch (e) {
      setLoading(false)
      setError(true)
    }
  }

  // Change the states after successful fetch
  const updateFetch = () => {
    setError(false)
    setLoading(false)
    setDropDown('')
    setDownArrow('hidden')
    setUpArrow('')
    setDropDownHeight('auto')
  }

  return (
    <div className={`fixed top-0 bg-color-2 w-3/4 md:w-1/2 h-screen z-30 overflow-scroll ${sideState}`} id="sidebar">
      <div className="absolute top-3 right-3">
        <ImCross className="text-lg md:text-xl hover:cursor-pointer text-color-1" onClick={changeState}/>
      </div>

      <div className="mt-10">
        <img src={Logo} className="mx-auto w-1/2 md:w-1/3 rounded-full mb-4" alt="The Author" />
        <p className="spirax italic side-tag">Look beneath the obvious</p>
        <p className="spirax italic side-tag">There is always something bigger hidden</p>
      </div>

      <div className="my-6 flex justify-center">
        <Link to="/profile">
          <button className="profile-button roboto">View Profile</button>
        </Link>
      </div>

      <div className={`bg-color-3-shade-1 py-2 pl-4 relative ${divStatus} ${divCursor}`} onClick={changeDropDown}>
        <p className="text-white">View the entire collection</p>
        <AiFillCaretDown className={`text-white absolute right-4 md:right-10 top-2.5 text-xl ${downArrow}`}></AiFillCaretDown>
        <AiFillCaretUp className={`text-white absolute right-4 md:right-10 top-2.5 text-xl ${upArrow}`}></AiFillCaretUp>
      </div>

      <div className="overflow-hidden" style={{height: `${dropDownHeight}`}}>
        <div className="bg-color-3 py-2 pl-8 relative table-bottom table-top">
          <p>Articles</p>
          <p className="absolute top-2 right-8 md:right-20 text-white font-semibold">{articles}</p>
        </div>

        <div className="bg-color-3-shade-2 py-2 pl-8 relative table-bottom">
          <p>Poems</p>
          <p className="absolute top-2 right-8 md:right-20 text-white font-semibold">{poems}</p>
        </div>

        <div className="bg-color-3 py-2 pl-8 relative table-bottom">
          <p>Stories</p>
          <p className="absolute top-2 right-8 md:right-20 text-white font-semibold">{stories}</p>
        </div>

        <div className="bg-color-3-shade-2 py-2 pl-8 relative table-bottom">
          <p>Microtales</p>
          <p className="absolute top-2 right-8 md:right-20 text-white font-semibold">{microtales}</p>
        </div>
      </div>

      {/* Display only when loading is true. */}
      {loading && 
        <div className="mt-4">
          <img src={Spinner} className="mx-auto" alt="Loading" />
        </div>
      }

      {/* Display only when error is true. */}
      {error &&
        <div className="mt-10 px-4">
          <p className="text-center text-sm">Something unexpected happened. Please try again after a while.</p>
        </div>
      }

    </div>
  )
}

export default SideBar
