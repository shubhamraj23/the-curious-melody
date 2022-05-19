import { Route, Routes } from "react-router-dom"
import { useState, useEffect } from "react"
import Home from "./Home"
import Blog from "./Blog"
import Review from "./Review"

const Body = () => {
  const [topMargin, setTopMargin] = useState('50px')
  
  useEffect(() => {
    setTopMargin(document.getElementsByClassName('nav-fix')[0].offsetHeight)
  }, [])
  
  return (
    <div style={{marginTop: `${topMargin}px`}}>
      <Routes>
        <Route path='/' element={ <Home /> }> </Route>
        <Route path='/blog' element={ <Blog /> }> </Route>
        <Route path='/review' element={ <Review /> }> </Route>
      </Routes>
    </div>
  )
}

export default Body