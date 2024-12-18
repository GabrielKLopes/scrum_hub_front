import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Register } from "../pages/register";
import { Login } from "../pages/login";
import { Home } from "../pages/home";
import ProtectedRoute from "./ProtectedRoute";
import Settings from "../pages/settings";
import User from "../pages/user";
import CreateUserPage from "../pages/user/createUser";
import DetailsUser from "../pages/user/detailsUser";
import Squads from "../pages/squads";
import DetailSquad from "../pages/squads/detailSquad";
import Projects from "../pages/projects";
import DetailProject from "../pages/projects/detailProject";

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-user"
          element={
            <ProtectedRoute>
              <CreateUserPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/details-user/:id"
          element={
            <ProtectedRoute>
              <DetailsUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/squads"
          element={
            <ProtectedRoute>
              <Squads />
            </ProtectedRoute>
          }
        />
        <Route
          path="/squads/:squadId"
          element={
            <ProtectedRoute>
              <DetailSquad />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

<Route
          path="/projects/:projectId"
          element={
            <ProtectedRoute>
              <DetailProject />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};
