import { useState, useEffect } from 'react'
import logo from '../media/logo.jpg'
import profilePic from '../media/profile-pic.jpg'

const Home = () => {
  const [divHeight, setHeight] = useState('640')
  const [boxHeight, setBoxHeight] = useState('auto')
  const [marginTop, setMarginTop] = useState('0')
  const [imageMargin, setImageMargin] = useState('0')

  useEffect(() => {
    const screenHeight = window.innerHeight - document.getElementsByClassName('nav-fix')[0].offsetHeight
    setHeight(screenHeight)
    if (window.innerWidth >= 768) {
      setBoxHeight(`${screenHeight}px`)
    }
  }, [])

  const setMargins = () => {
    const imageHeight = document.getElementById('profile-pic').offsetHeight
    const descriptionHeight = document.getElementById('profile-description').offsetHeight
    
    if (window.innerWidth >= 768) {
      if (imageHeight > descriptionHeight) {
        setMarginTop((imageHeight - descriptionHeight)/2)
      }
      else {
        setImageMargin((descriptionHeight - imageHeight)/2)
      }
    }
  }

  return (
    <div>
      <div className="bg-shade-1">
        <div className="flex flex-col items-center justify-center" style={{height: `${divHeight}px`}}>
          <img src={logo} className="w-1/2 md:w-1/3 block" alt="The Curious Melody Logo" />
          <p className="text-white cassandra tagline-font">There is always something bigger hidden</p>
        </div>
      </div>

      <div className="bg-shade-3">
        <div style={{height: `${divHeight}px`}}>
          {/* Recent Posts */}
        </div>
      </div>

      <div className="bg-shade-2">
        <div className="flex flex-row items-center md:justify-center" style={{height: `${boxHeight}`}}>
          <div className="grid grid-cols-1 md:grid-cols-3 my-16">
            <div className="w-1/2 mx-auto profile-width" style={{marginTop: `${imageMargin}px`}}>
              <img src={profilePic} className="rounded-border my-4 md:my-0" alt="My Profile Pic" id="profile-pic" onLoad={setMargins} />
            </div>

            <div className="md:col-span-2 h-full">
              <div style={{marginTop: `${marginTop}px`}}>
                <p className="text-left patrick-hand text-lg md:text-2xl text-white mx-4 md:mx-8" id="profile-description">
                  Hello, and welcome to 'The Curious Melody'. <br/>
                  My name is Shubham, and I am an engineer. Writing is one of my old hobbies. It started as an
                  activity to jot down my thoughts, and following the process over the years, I now have a collection
                  I would like to share. Thank you for stopping by, and I hope you enjoy the site.
                </p>
              </div>
            </div>
          </div>          
        </div>
      </div>
    </div>
  )
}

export default Home
