import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Register } from '../pages/register';


export const AppRouter: React.FC = () =>{
    return(
            <Router>
              <Routes>
                <Route path="/" element={<Register />} />        
              </Routes>
            </Router>
    )

}