import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import App from "./App";
// import PrivateRoute from "./router/route";

function Distribute() {
  const [select,setselect]=useState({});
  if(Object.keys(select).length!==0){
    window.localStorage.setItem('info',JSON.stringify(select));
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/employee-database/login" element={<Login setselect={setselect} />} />
          <Route path="/employee-database/" element={<SignUp />} />
          <Route path="/employee-database/data" element={<App select={select}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default Distribute;