//import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard  from '../pages/Dashboard'
import Register from '../pages/Register'
import Proyectos from '../pages/Proyectos'
import Historias from '../pages/Historias'
import RegistrarHistoria from '../pages/RegistrarHistoria'
import EditarHistoria from '../pages/EditarHistoria'
import TicketsHistoria from '../pages/TicketsHistoria'
import EditarTicket from '../pages/EditarTicket'
import RegistrarTicket from '../pages/RegistrarTicket'

import ProtectedRoute from '../components/ProtectedRoute'

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/proyectos"
        element={
          <ProtectedRoute>
            <Proyectos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/historias"
        element={
          <ProtectedRoute>
            <Historias />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reg/historia"
        element={
          <ProtectedRoute>
            <RegistrarHistoria />
          </ProtectedRoute>
        }
      />
      <Route
        path="/historias/editar"
        element={
          <ProtectedRoute>
            <EditarHistoria />
          </ProtectedRoute>
        }
      />
      <Route
        path="/historias/ticket"
        element={
          <ProtectedRoute>
            <TicketsHistoria />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ticket/editar"
        element={
          <ProtectedRoute>
            <EditarTicket />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reg/ticket"
        element={
          <ProtectedRoute>
            <RegistrarTicket />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default RouterConfig
