import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Categories from './layout/categories/Categories';
import CurrentOrder from './routes/CurrentOrder';
import PastOrder from './routes/PastOrder';
import MenuModify from './routes/MenuModify';

function App() {
  return (
    <div className='wrapper'>
      <Router>
          <Categories/>
          <Routes>
            <Route path='/' element={<Navigate to='/current_order'/>}/>
            <Route path='/current_order' element={<CurrentOrder/>}/>
            <Route path='/past_order' element={<PastOrder/>}/>
            <Route path='/menu_modify' element={<MenuModify/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;