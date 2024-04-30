
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dataprocessing from './pages/Dataprocessing';
import Dashbord from './pages/Dashbord';
import SideBar from './components/SideBar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import NewProject from './components/NewProject';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import UploadDataProcessing from './components/UploadDataProcessing';


const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/uploadDataProcessing" element={<UploadDataProcessing />} />
      <Route path='/' element={<SideBar />}>
        <Route path='/' element={
          <ProtectedRoute>
            <Home />

          </ProtectedRoute>}
        />
        <Route path='/newProject' element={
          <ProtectedRoute>
            <NewProject />

          </ProtectedRoute>}
        />
        <Route path='/dataprocessing' element={
          <ProtectedRoute>
            <Dataprocessing />
          </ProtectedRoute>}
        />
        <Route path='/dashbord' element={
          <ProtectedRoute>
            <Dashbord />
          </ProtectedRoute>}
        />
      </Route>
    </Routes>
  );
};

export default App;
