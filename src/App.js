import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
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

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [isLogIn, setIsLogIn] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname == "/login";
  const isHomePage = location.pathname == "/";
  const navigate = useNavigate();

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  useEffect(() => {
    const data = localStorage.getItem("userEmail");
    if (isLoginPage && data && data.length > 0) {
      navigate("/");
    }
    if (isHomePage && !data) {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login isLoginData={setIsLogIn} />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/newSignUp" element={<NewSignUp />} />
      <Route path="/ForgetPassword" element={<ForgetPassword />} />

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
          path="/newProject"
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
