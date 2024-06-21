import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Dataprocessing from "./pages/Dataprocessing";
import Dashbord from "./pages/Dashbord";
import SideBar from "./components/SideBar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import NewProject from "./components/NewProject";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import UploadDataProcessing from "./components/UploadDataProcessing";
import ForgetPassword from "./components/ForgetPassword";
import NewSignUp from "./components/NewSignUp";
import OtpModel from "./components/OtpModel";
import LoadingScreen from "./components/LoadingScreen";
import api from './services'
import { startTokenRefreshInterval } from "./helper/refreshToken";
const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLogIn, setIsLogIn] = useState(true);
  const getUserProfile = async () => {
    setLoading(true)
    try {
      const res = await api.dashboardApi.getUserProfile()
      if (res.status === 200) {
        console.log('use profile response',res.data)
        if(!localStorage.getItem('intervalId')){
          startTokenRefreshInterval()
        }
        localStorage.setItem("auth-user", JSON.stringify(res.data))
        setLoading(false)
      }
    } catch (error) {
      console.error('Error while calling user data')
      setLoading(false)
      localStorage.removeItem("auth-user")

    }
  }

  useEffect(() => {
    getUserProfile()
    console.log('app run')
  }, [])

  if (loading) return <LoadingScreen />


  return (
    <Routes>
      <Route path="/login" element={<Login isLoginData={setIsLogIn} />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/newSignUp" element={<NewSignUp />} />
      <Route path="/ForgetPassword" element={<ForgetPassword />} />
      <Route path="/otp" element={<OtpModel />} />
      <Route path="/uploadDataProcessing" element={<UploadDataProcessing />} />
      
      <Route path="/" element={<SideBar />}>
        <Route
          path="/"
          element={
            <ProtectedRoute LogInstatus={isLogIn}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/new"
          element={
            <ProtectedRoute>
              <NewProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dataprocessing"
          element={
            <ProtectedRoute>
              <Dataprocessing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashbord"
          element={
            <ProtectedRoute>
              <Dashbord />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
