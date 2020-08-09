import React, { useState, useEffect } from 'react';
import UserContext from './Context';
import './App.css';
import Router from './router';
import { userService } from './servives/userService';

function App(props) {
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true);

  const logIn = (user) => {
    setUser({
      ...user
    })
  }

  const logOut = () => {
    document.cookie = "x-auth-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    setUser(null);
  }

  const authenticate = async () => {
    const response = await userService.login();
    if (response.message) {
      logOut();
      setLoading(false);
      return;
    }
    
    logIn(response);
    setLoading(false);
  }
  
  useEffect(() => {
    const token = userService.getCookie('x-auth-token');
    if(!token) {
      logOut();
      setLoading(false);
      return;
    }

    authenticate();
  }, []);

  if (loading) {
    return (
      <div>Loading....</div>
    )
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
