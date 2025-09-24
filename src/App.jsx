import Home from "./component/Home/Home"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Error from "./component/Shared/Error"
import Success from "./component/Shared/Success"


function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/error" element={<Error />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
      {/* <Home /> */}
    </>
  )
}

export default App
