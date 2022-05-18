import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header"
import Body from "./components/Body"
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Body />
        <Footer />
      </Router>
    </div>
  )
}

export default App;