import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Layout from "./screens/Layout/Layout";
import Landing from "./screens/Landing/Landing";
import SignUp from "./screens/SignUp/SignUp";

function App() {
  return (
      <Router>
        <Layout>
          <Routes>
              <Route path='/' element={<Landing/>}/>
              <Route path='/SignUp' element={<SignUp/>}/>
          </Routes>
        </Layout>
      </Router>
  );
}


export default App;
