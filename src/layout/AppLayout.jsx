import Header from "./Header.jsx";
import { Outlet } from "react-router-dom";

function AppLayout({setIsLoggedIn, loggedInUser, setLoggedInUser, setCheckingCredentials}) {
    return (
      <>
        <Header setIsLoggedIn={setIsLoggedIn} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} setCheckingCredentials={setCheckingCredentials}/>
        <Outlet />
      </>
    );
  }

  export default AppLayout;