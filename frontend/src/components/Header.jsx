import { useState } from 'react'
import { Link } from 'react-router-dom'

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
  const width = window.innerWidth/3
  
  const activeText = 'text-white cursor-default'
  const inactiveText = 'text-green-900 hover:text-white transition duration-300'
  const activeBackground = 'bg-emerald-500'
  const inactiveBackground = ''
  const activeCursor = 'cursor-default'
  const inactiveCursor = 'cursor-pointer'

  const changeActive = (e) => {
    if (active !== e.target.innerHTML){
      setActive(e.target.innerHTML)
    }
  }

  return (
    <nav className="bg-emerald-300">
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
        </div>
      </div>
    </nav>
  )
}

export default Header