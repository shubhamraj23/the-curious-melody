import { useState, useEffect } from 'react'
import logo from '../media/logo.jpg'

const Home = () => {
  const [divHeight, setHeight] = useState('640')

  useEffect(() => {
    setHeight(window.innerHeight - document.getElementsByClassName('nav-fix')[0].offsetHeight)
  }, [])

  return (
    <div>
      <div className="bg-shade-1">
        <div className="flex flex-col items-center justify-center" style={{height: `${divHeight}px`}}>
          <img src={logo} className="w-1/2 md:w-1/3 block" alt="The Curious Melody Logo" />
          <p className="text-white patrick-hand tagline-font">There is always something bigger hidden</p>
        </div>
      </div>
    </div>
  )
}

export default Home
