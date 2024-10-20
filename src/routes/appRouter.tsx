import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Register } from '../pages/register';
import { Login } from '../pages/login';
import { Home } from '../pages/home';


export const AppRouter: React.FC = () =>{
    return(
            <Router>
              <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path="/register" element={<Register />} />       
                <Route path="/home" element={<Home/>} /> 
              </Routes>
            </Router>
    )

}