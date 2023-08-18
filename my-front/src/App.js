import React from 'react';
import { AdminPanel } from "./service/AdminPanel";
import  AdminEditUser  from "./service/AdminUserEdit"
import { Home } from './service/Home';


import {Route, Routes} from "react-router-dom";





function App() {
  return (
      <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path="/admin/user/:id/edit" element={<AdminEditUser />} />
      </Routes>
);
}

export default App;
