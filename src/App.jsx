import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path='/auth' element={<Auth />} />
          <Route exact path='/analytics' element={<Analytics />} />
          <Route exact path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
