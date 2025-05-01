import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Signin} from './Signin';

function App() {
  return (
   <div>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signin />}/>
      </Routes>

</BrowserRouter>
   </div>
  );
}

export default App;