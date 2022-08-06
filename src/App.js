import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

//Hooks
import {useEffect, useState} from 'react';

//Pages
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import SignUp from './components/SignUp'
import { useSelector } from 'react-redux';

//Routes
import { ProtectedRoute } from './routes/ProtectedRoute';
import { getCookie } from './utils/helpers/auth';


function App() {
  const { user } = useSelector((states) => states);
  const token = getCookie('token');

  return (
    <>
      <Routes>
        {/* <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} redirectPath={'/'} token={token} />}>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
        </Route> */}
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route element={<ProtectedRoute redirectPath={'/signup'} token={token} />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
