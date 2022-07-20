import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import SideBar from './components/SideBar';
import Profile from './components/Profile';

const App = () => {
  const [sideState, setSideState] = useState('side-hide')

  // Function to toggle the state of the side bar.
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
      <Router>
        <Routes>
          {/* Default route to the home page. */}
          <Route path="/" element={
            <>
              <SideBar sideState={sideState} changeState={toggleSideState} />
              <Header changeState={toggleSideState} />
              <Body />
              <Footer />
            </>
          }></Route>

          {/* Route to the profile page. */}
          <Route path="/profile" element={
            <>
              <Profile />
              <Footer />
            </>
          }></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;