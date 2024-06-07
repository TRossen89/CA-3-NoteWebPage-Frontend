import { BASE_URL } from "../utils/globalVariables";

const loginOrCreateUser = async (
  userDetailsAsObject,
  endOfEndpoint,
  callback,
  settingAnError
) => {
  try {
    const result = await fetch(`${BASE_URL}/auth/${endOfEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetailsAsObject),
    });

    const dataFromFetch = await result.json();

    if (endOfEndpoint === "register") {
      if (dataFromFetch.msg) {
        settingAnError(dataFromFetch.msg);
      } else {
        callback();
      }
    }

    if (endOfEndpoint === "login") {
      if (dataFromFetch.msg) {
        settingAnError(dataFromFetch.msg);
      } else {
        console.log(dataFromFetch.token);
        callback(dataFromFetch);
      }
    }
  } catch (error) {
    console.error("Error creating entity:", error);
    return error;
  }
};

function createUser(userDetailsEntered) {
  // Initiate the fetch request

  const result = fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetailsEntered),
  })
    .then((result) => {
      return result.json();
    })
    .catch((error) => {
      console.error("Error creating entity:", error);
      throw error;
    });

  return result;
}
/*
function createUser(userDetailsEntered) {
  // Initiate the fetch request

  return fetch(`${BASE_URL}/auth/register`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetailsEntered), 
  })
    
    .then((result) => {
     
      return result.json(); 
    })
    .catch((error) => {
      
      console.error("Error creating entity:", error); 
      throw error; 
    });
}
*/

const login = async (username, password) => {
  try {
    const result = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    });

    const data = await result.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      return data;
    } else {
      //console.log(data);
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

export { login };
export { createUser, loginOrCreateUser };
