import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Register } from '../pages/register';
import { Login } from '../pages/login';
import { Home } from '../pages/home';
import ProtectedRoute from './ProtectedRoute'; 
import Settings from '../pages/settings';
import User from '../pages/user';
import CreateUserPage from '../pages/user/createUser';
import DetailsUser from '../pages/user/detailsUser';

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        /> 
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/users" element={<User/>}/>
        <Route path="/create-user" element={<CreateUserPage />} />
        <Route path="/details-user/:id" element={<DetailsUser />} />
        </Routes>
    </Router>
  );
};
