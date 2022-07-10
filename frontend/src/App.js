import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";

const App = () => {
  const [sideState, setSideState] = useState('side-hide')

  const toggleSideState = () => {
    if (sideState === 'side-hide') {
      setSideState('side-show')
    }
    else {
      setSideState('side-hide')
    }
  }

  return (
    <div>
      <SideBar sideState={sideState} changeState={toggleSideState} />
      <Header changeState={toggleSideState} />
      <Footer />
    </div>
  )
}

export default App;