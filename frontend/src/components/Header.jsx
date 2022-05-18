import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

const getActive = () => {
  const completeURL = window.location.href
  const actualURL = completeURL.split('://')[1]
  const endPoint = actualURL.split('/')[1]
  if (endPoint === '') {
    return 'Home'
  }
  else if (endPoint === 'blog'){
    return 'Blog'
  }
  return 'Leave a Review'
}

const Header = () => {
  const [active, setActive] = useState(getActive())
  const [navItems, setNavItems] = useState("nav-small-hide")
  const width = window.innerWidth/3
  
  const activeText = 'text-white cursor-default'
  const inactiveText = 'text-green-900 hover:text-white transition duration-300'
  const activeBackground = 'bg-emerald-500'
  const inactiveBackground = ''
  const activeCursor = 'cursor-default'
  const inactiveCursor = 'cursor-pointer'
  const activeNav = 'text-white'
  const inactiveNav = 'text-green-900 transition duration-300'

  const changeActive = (e) => {
    if (active !== e.target.innerHTML){
      setActive(e.target.innerHTML)
    }
  }

  const toggleNav = () => {
    if (navItems === "nav-small-hide"){
      setNavItems("nav-small-show")
    }
    else {
      setNavItems("nav-small-hide")
    }
  }

  return (
    <nav className="bg-emerald-300 nav-fix w-full">
      <div className="mx-auto">
        <div className="flex justify-between">
          <div className="hidden md:flex">
            <div className="flex">
              <div 
                className={active === "Home" ? `${activeBackground} ${activeCursor}` : `${inactiveBackground} ${inactiveCursor}`}
                style={{"width": `${width}px`}}
              >
                <Link to="/" onClick={changeActive}>
                  <p className={`mx-auto py-4 font-semibold text-center text-lg ${active === "Home" ? activeText : inactiveText}`}>
                    Home
                  </p>
                </Link>
              </div>

              <div
                className={`border-x-2 ${active === "Blog" ? `${activeBackground} ${activeCursor}` : `${inactiveBackground} ${inactiveCursor}`}`}
                style={{"width": `${width}px`}}
              >
                <Link to="/blog" onClick={changeActive}>
                  <p className={`mx-auto py-4 font-semibold text-center text-lg ${active === "Blog" ? activeText : inactiveText}`}>
                    Blog
                  </p>
                </Link>
              </div>

              <div
                className={active === "Leave a Review" ? `${activeBackground} ${activeCursor}` : `${inactiveBackground} ${inactiveCursor}`}
                style={{"width": `${width}px`}}
              >
                <Link to="/review" onClick={changeActive}>
                  <p className={`mx-auto py-4 font-semibold text-center text-lg ${active === "Leave a Review"? activeText : inactiveText}`}>
                    Leave a Review
                  </p>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="md:hidden">
            <div className="flex">
              <div className="p-4" style={{height: "50px"}}>
                <button className="outline-none" onClick={toggleNav}>
                  <FaBars className={`text-lg ${navItems === "nav-small-hide" ? inactiveNav : activeNav}`}/>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:hidden">
          <ul className={navItems}>
            <li className={active === "Home" ? activeBackground : inactiveBackground}>
              <Link to="/" onClick={changeActive}>
                <p className={`px-4 py-2 font-semibold text-left text-base ${active === "Home" ? activeText : inactiveText}`}>
                  Home
                </p>
              </Link>
            </li>

            <li className={active === "Blog" ? activeBackground : inactiveBackground}>
              <Link to="/blog" onClick={changeActive}>
                <p className={`px-4 py-2 font-semibold text-left text-base ${active === "Blog" ? activeText : inactiveText}`}>
                  Blog
                </p>
              </Link>
            </li>

            <li className={active === "Leave a Review" ? activeBackground : inactiveBackground}>
              <Link to="/review" onClick={changeActive}>
                <p className={`px-4 py-2 font-semibold text-left text-base ${active === "Leave a Review" ? activeText : inactiveText}`}>
                  Leave a Review
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header