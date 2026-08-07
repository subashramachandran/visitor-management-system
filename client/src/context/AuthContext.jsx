import { createContext, useContext, useState } from "react";


const AuthContext = createContext();



export const AuthProvider = ({ children }) => {


  const [user, setUser] = useState(() => {

    try {

      const storedUser =
        localStorage.getItem("user");


      if (
        !storedUser ||
        storedUser === "undefined"
      ) {

        return null;

      }


      return JSON.parse(storedUser);


    } catch(error) {


      localStorage.removeItem("user");

      return null;

    }

  });





  const login = (userData, token) => {


    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );


    localStorage.setItem(
      "token",
      token
    );


    setUser(userData);


  };






  const logout = () => {


    localStorage.removeItem("user");


    localStorage.removeItem("token");


    setUser(null);


    window.location.href="/login";


  };






  return (

    <AuthContext.Provider

      value={{
        user,
        login,
        logout
      }}

    >

      {children}

    </AuthContext.Provider>

  );


};





export const useAuth = () =>

useContext(AuthContext);