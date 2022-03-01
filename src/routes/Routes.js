import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';


function App() {
  
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard/>}/>
          <Route exact path="/" element={<Products/>}/>            
        </Routes>

    </BrowserRouter>
    
  );
}

export default App;