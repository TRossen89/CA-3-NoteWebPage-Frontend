import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AppLayout from "../layout/AppLayout";

export default function ProtectedRoutes({ children, isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser, setCheckingCredentials }) {

  const navigate = useNavigate();

  useEffect(() => {
    
    if(!isLoggedIn) {
      return navigate("/login" );
    }
    else {
      console.log("navigate to /")
      return navigate("/");
    }
  }, [isLoggedIn]);

  if(isLoggedIn) {return (<>
    <h1>Hej</h1>
    <AppLayout 
              setIsLoggedIn={setIsLoggedIn}
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
              setCheckingCredentials={setCheckingCredentials}
            />
    {children}
    <h2>Farvel</h2>
  </>)
}}


ProtectedRoutes.propTypes = {
  isLoggedIn: PropTypes.bool,
};
