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
  const [navItems, setNavItems] = useState("nav-hide")
  const width = window.innerWidth/3
  
  const activeText = 'text-white cursor-default'
  const inactiveText = 'text-black hover:text-white transition duration-300'
  const activeBackground = 'nav-active'
  const inactiveBackground = ''
  const activeCursor = 'cursor-default'
  const inactiveCursor = 'cursor-pointer'
  const activeNav = 'text-white'
  const inactiveNav = 'text-black transition duration-300'

  const changeActive = (e) => {
    if (active !== e.target.innerHTML){
      setActive(e.target.innerHTML)
    }
  }

  const toggleNav = () => {
    if (navItems === "nav-hide"){
      setNavItems("nav-show")
    }
    else {
      setNavItems("nav-hide")
    }
  }

  const changeActiveSmall = (e) => {
    toggleNav()
    changeActive(e)
  }

  return (
    <div>
      <nav className="nav-base nav-fix w-full">
        <div className="mx-auto">
          <div className="flex justify-between">
            <div className="hidden md:flex">
              <div className="flex">
                <div 
                  className={active === "Home" ? `${activeBackground} ${activeCursor}` : `${inactiveBackground} ${inactiveCursor}`}
                  style={{"width": `${width}px`}}
                >
                  <Link to="/" onClick={changeActive}>
                    <p className={`mx-auto py-4 text-center text-lg permanent-marker ${active === "Home" ? activeText : inactiveText}`}>
                      Home
                    </p>
                  </Link>
                </div>

                <div
                  className={`border-x-2 ${active === "Blog" ? `${activeBackground} ${activeCursor}` : `${inactiveBackground} ${inactiveCursor}`}`}
                  style={{"width": `${width}px`}}
                >
                  <Link to="/blog" onClick={changeActive}>
                    <p className={`mx-auto py-4 text-center text-lg permanent-marker ${active === "Blog" ? activeText : inactiveText}`}>
                      Blog
                    </p>
                  </Link>
                </div>

                <div
                  className={active === "Leave a Review" ? `${activeBackground} ${activeCursor}` : `${inactiveBackground} ${inactiveCursor}`}
                  style={{"width": `${width}px`}}
                >
                  <Link to="/review" onClick={changeActive}>
                    <p className={`mx-auto py-4 text-center text-lg permanent-marker ${active === "Leave a Review"? activeText : inactiveText}`}>
                      Leave a Review
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="md:hidden">
              <div className="flex">
                <div className="p-4" style={{height: "50px"}} onClick={toggleNav}>
                  <button className="outline-none">
                    <FaBars className={`text-lg ${navItems === "nav-hide" ? inactiveNav : activeNav}`}/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="md:hidden">
        <ul className={`${navItems} w-full nav-base`}>
          <li className={active === "Home" ? activeBackground : inactiveBackground}>
            <Link to="/" onClick={changeActiveSmall}>
              <p className={`px-4 py-2 text-left text-base permanent-marker ${active === "Home" ? activeText : inactiveText}`}>
                Home
              </p>
            </Link>
          </li>

          <li className={active === "Blog" ? activeBackground : inactiveBackground}>
            <Link to="/blog" onClick={changeActiveSmall}>
              <p className={`px-4 py-2 text-left text-base permanent-marker ${active === "Blog" ? activeText : inactiveText}`}>
                Blog
              </p>
            </Link>
          </li>

          <li className={active === "Leave a Review" ? activeBackground : inactiveBackground}>
            <Link to="/review" onClick={changeActiveSmall}>
              <p className={`px-4 py-2 text-left text-base permanent-marker ${active === "Leave a Review" ? activeText : inactiveText}`}>
                Leave a Review
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header