import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// function App() {
//   const [jwtToken, setJwtToken] = useState(null);
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route
//             path="/register"
//             element={<Register jwtToken={jwtToken} setJwtToken={setJwtToken} />}
//           />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
