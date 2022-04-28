import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Product from '../pages/Product';
import Category from '../pages/Category';
import Packs from '../pages/Packs';
import Users from '../pages/Users';
import Orders from '../pages/Orders';
import Role from '../pages/Role';
import Login from '../pages/Login';

function App() {
  
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/dashboard" element={<Dashboard/>}/>
          <Route exact path="/product" element={<Product/>}/>
          <Route exact path="/category" element={<Category/>}/>
          <Route exact path="/packs" element={<Packs/>}/>
          <Route exact path="/users" element={<Users/>}/>
          <Route exact path="/orders" element={<Orders/>}/>
          <Route exact path="/role" element={<Role/>}/>
                  
        </Routes>

    </BrowserRouter>
    
  );
}

export default App;