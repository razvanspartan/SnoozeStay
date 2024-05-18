import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Layout from "./screens/Layout/Layout";
import Landing from "./screens/Landing/Landing";
import SignUp from "./screens/SignUp/SignUp";
import SignIn from "./screens/SignIn/SignIn";
import Hotels from "./screens/Hotels/Hotels";
import HotelAbout from "./screens/AboutHotels/HotelAbout";

function App() {
  return (
      <Router>
        <Layout>
          <Routes>
              <Route path='/' element={<Landing/>}/>
              <Route path='/SignUp' element={<SignUp/>}/>
              <Route path='/SignIn' element={<SignIn/>}/>
              <Route path='/Hotels' element={<Hotels/>}/>
              <Route path='/Hotels/:hotelId' element={<HotelAbout/>}/>
          </Routes>
        </Layout>
      </Router>
  );
}


export default App;
