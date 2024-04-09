/* eslint-disable @typescript-eslint/no-explicit-any */
import './App.css'
import './styles/Form.css'
import './styles/VistaPreguntas.css'
import FormRegister from './Components/FormRegister'
//import VistaPreguntas  from './Components/VistaPreguntas'
import Home from './Components/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import FormLogin from './Components/FormLogin'
import ChoosingCategory from './Components/ChoosingCategory'
import React from 'react'

export const USERCONTEXT = React.createContext({});

function App() {

  // STATES, VARS
  const [user, setUser] = React.useState((val: any) => {
    if (localStorage.getItem("user") !== null) {
      val = localStorage.getItem("user");
    }
    else {
      //localStorage.setItem("user", JSON.stringify({}));
      val = localStorage.getItem("user"); 
    }

    return JSON.parse(val);
  })

  // FUNCTIONS
  const returnSetUser = (value: any) => {
    return setUser((val: any) => {

      const user = JSON.stringify(value);
      localStorage.setItem("user", user);
      val = user;
      return JSON.parse(val);

    })
  }

  // USE STATES
  React.useEffect(() => {


    // CLEANING FUNCTION
    return () => { };

  }, [])

  return (
    <USERCONTEXT.Provider value={{
      user, returnSetUser
    }} >
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={
            user?.registrationNumber === null || user === null
            ?
            <FormRegister /> 
            :
            <Navigate to="/login/choose-category" replace={true} />
        } />


        <Route path="/login" element={
            user?.registrationNumber === null || user === null
            ? 
            <FormLogin />
            :
            <Navigate to="/login/choose-category" replace={true} />
        } />


        <Route path="/login/choose-category" element={
          user?.registrationNumber === null  || user === null
            ?
            <Navigate to="/login" replace={true} />
            :
            <ChoosingCategory />}
        />


      </Routes>
    </USERCONTEXT.Provider>
  )
}

export default App;  