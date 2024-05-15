import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./screens/Home/Home";

function App() {
  return (
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </Layout>
      </Router>
  );
}


export default App;
