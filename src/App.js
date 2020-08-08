import React, { useState, useEffect } from 'react';
import UserContext from './Context';
import './App.css';
import Router from './router';

function App(props) {
  const [user, setUser] = useState(null);

  const logIn = (user) => {
    setUser({
      ...user
    })
  }

  const logOut = () => {
    document.cookie = "x-auth-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    setUser(null);
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ user, logIn, logOut }}>
        {props.children}
        <Router />
      </UserContext.Provider>
    </div>
  );
}

export default App;
