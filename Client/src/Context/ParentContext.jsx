import React, { createContext, useRef, useState } from "react";

export const AppContext = createContext();

const ParentContext = ({ children }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [login, setLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState("");
  const footerRef = useRef(null);
  const aboutRef = useRef(null);

  const setCookies = (name, value, expiry) => {
    const date = new Date();
    date.setTime(date.getTime() + expiry * 24 * 60 * 60 * 1000);
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  };

  const getCookie = (name) => {
    const cDecoded = decodeURIComponent(document.cookie);
    const cArray = cDecoded.split("; ");
    let result = null;
    cArray.forEach((elem) => {
      if (elem.indexOf(name) == 0) {
        result = elem.substring(name.length + 1);
      }
    });
    return result;
  };

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        login,
        setLogin,
        setCookies,
        errorMessage,
        setErrorMessage,
        getCookie,
        user,
        setUser,
        value,
        setValue,
        aboutRef,
        footerRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ParentContext;
