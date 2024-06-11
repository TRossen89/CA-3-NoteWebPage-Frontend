import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { Route, Routes, useNavigate } from "react-router-dom";

import About from "./page/About.jsx";
import Notes from "./page/Notes.jsx";
import PageNotFound from "./page/PageNotFound.jsx";
import Login from "./features/Login.jsx";
import AddNote from "./page/AddNote.jsx";
import AppLayout from "./layout/AppLayout.jsx";
import CreateUser from "./features/CreateUser.jsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import UserOverview from "./page/UserOverview.jsx";

import MyNotes from "./page/MyNotes.jsx";
import MySingleNote from "./page/MySingleNote.jsx";
import MyNotesAsList from "./page/MyNotesAsListTobias.jsx";
import MyNotesTobias from "./page/MyNotesTobias.jsx";
import ErrorBoundaryMyNotes from "./errorBoundaries/ErrorBoundaryMyNotes.jsx";
import ErrorBoundaryMyNotesClass from "./errorBoundaries/ErrorClassBoundary.jsx";
import SingleNote from "./page/SingleNote.jsx";

//PUSH
function App() {
  const [userJustCreated, setUserJustCreated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingCredentials, setCheckingCredentials] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({
    email: "",
    name: "",
    roles: ["user"],
  });
  const [notesForList, setNotesForlist] = useState([]);
  const [tokenStored, setTokenStored] = useState(false);

  const navigate = useNavigate();

  const checkTokenExpiry = (exp) => {
    return Date.now() >= exp * 1000;
  };

  const checkToken = () => {
    const token = localStorage.getItem("token");
    console.log("Checking token: " + token);

    if (token) {
      try {
        console.log("Decoding token");
        const decodedToken = jwtDecode(token);

        if (!checkTokenExpiry(decodedToken.exp)) {
          console.log("Token is not expired");
          setIsLoggedIn(true);
          setLoggedInUser({
            email: decodedToken.email,
            name: decodedToken.name,
            roles: decodedToken.roles,
          });
        } else {
          console.log("Token has expired");
          setIsLoggedIn(false);

          setErrorMessage("Your session has expired. Please log in again.");
          localStorage.clear();
        }
      } catch (e) {
        console.log("Some error happened when checking token");
        setIsLoggedIn(false);
      }
    } else {
      console.log("There was no token");
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    let timer;
    
    console.log("Login status: " + isLoggedIn);

    //checkToken();

    const token = localStorage.getItem("token");

    if (token) {
      console.log("Token is retrieved from localStorage");
      

      try {
        const decodedToken = jwtDecode(token);
        console.log("Setting isLoggedIn to true");
        setIsLoggedIn(true);

        
        setLoggedInUser({
          email: decodedToken.email,
          name: decodedToken.name,
          roles: decodedToken.roles,
        });

        const timeForExp = decodedToken.exp * 1000 - Date.now() + 200;

        timer = setTimeout(() => {
          //console.log("token is being checked again");
          console.log("Token has expired");
          setIsLoggedIn(false);

          setErrorMessage("Your session has expired. Please log in again.");
          localStorage.clear();
          //checkToken();
        }, timeForExp);

      } catch (error) {

        console.log(
          "Some error happened when checking token. This is the error: " +
            error +
            " And this is the error message: " +
            error.message
        );
        setIsLoggedIn(false);
      }

    } else {
      
      console.log("There was no token");
      setIsLoggedIn(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);




  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoutes
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
            setCheckingCredentials={setCheckingCredentials}
          />
        }
      >
        <Route index element={<MyNotes />} />
        <Route path="myNotesTobias" element={<MyNotesTobias />} />
        <Route path="/adminPage" element={<UserOverview />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/notesAsList/*"
          element={
            <ErrorBoundaryMyNotesClass>
              <MyNotesAsList
                notesForList={notesForList}
                setNotesForlist={setNotesForlist}
              />
            </ErrorBoundaryMyNotesClass>
          }
        >
          <Route
            path=":singleNoteId"
            element={<SingleNote notesForList={notesForList} />}
          />
        </Route>

        <Route
          path="/singleNote/:noteId"
          element={<MySingleNote notesForList={notesForList} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Route>

      <Route
        path="/login"
        element={
          <Login
            setTokenStored={setTokenStored}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            setIsLoggedIn={setIsLoggedIn}
            setLoggedInUser={setLoggedInUser}
            userJustCreated={userJustCreated}
            setUserJustCreated={setUserJustCreated}
            checkingCredentials={checkingCredentials}
            setCheckingCredentials={setCheckingCredentials}
          />
        }
      />
      <Route
        path="/createUser"
        element={<CreateUser setUserJustCreated={setUserJustCreated} />}
      />
    </Routes>
  );
}

export default App;
