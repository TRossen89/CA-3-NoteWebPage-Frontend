import MainNav from "./MainNav.jsx";

function Header({setIsLoggedIn, loggedInUser, setLoggedInUser, setCheckingCredentials}) {
    return (
      <>
        <MainNav setIsLoggedIn={setIsLoggedIn} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} setCheckingCredentials={setCheckingCredentials}/>
      </>
    );
  }

  export default Header;