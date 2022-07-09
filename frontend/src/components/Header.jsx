import { useState, useEffect } from 'react';
import Logo from '../media/logo-colorful.png'
import { HiMenu } from "react-icons/hi";

const Header = () => {
  const [headerHeight, setHeight] = useState('100vh')
  const [fixedHeight, setFixedHeight] = useState('10vh')
  const [visibility, setVisibility] = useState('hidden')

  useEffect(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    const finalHeight = Math.min(1, width/height)*100
    setHeight(`${finalHeight}vh`)

    const fixedIcon = document.getElementById('side-toggle')
    const headerHeight = fixedIcon.offsetHeight + 2*fixedIcon.getBoundingClientRect().top
    setFixedHeight(`${headerHeight}px`)
  }, [])

  useEffect(() => {
    const changeVisibility = () => {
      const fullHeader = document.getElementById('full-header')
      const headerPosition = fullHeader.getBoundingClientRect().bottom
      const minHeight = parseInt(fixedHeight.slice(0, fixedHeight.length - 2), 10)
      if (headerPosition <= minHeight) {
        setVisibility('')
      }
      else {
        setVisibility('hidden')
      }
    }

    window.addEventListener('scroll', changeVisibility, {passive: true})
    return () => window.removeEventListener('scroll', changeVisibility)
  }, [fixedHeight])

  return (
    <div className="bg-color-1">
      <div className="fixed top-2.5 left-2.5 md:top-5 md:left-5 z-20" id="side-toggle">
        <HiMenu className="text-color-2 text-2xl md:text-3xl hover:cursor-pointer" />
      </div>
      
      <div className="flex flex-col items-center justify-center py-8 md:py-12" style={{minHeight: `${headerHeight}`}} id="full-header">
        <img src={Logo} className="w-1/2 md:w-1/3 block" alt="The Curious Melody Logo" />
        <p className="text-color-2 dancing-script tagline-font mt-2">There is always something bigger hidden</p>
      </div>

      <div className={`bg-color-1 fixed top-0 w-full z-10 ${visibility}`} style={{height: `${fixedHeight}`}}>
      </div>
    </div>
  )
}

export default Header
