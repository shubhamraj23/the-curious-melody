import { useState, useEffect } from "react"

const Body = () => {
  const [topMargin, setTopMargin] = useState('50px')
  
  useEffect(() => {
    setTopMargin(document.getElementsByClassName('nav-fix')[0].offsetHeight)
  }, [])
  
  return (
    <div style={{marginTop: `${topMargin}px`}}>
      
    </div>
  )
}

export default Body