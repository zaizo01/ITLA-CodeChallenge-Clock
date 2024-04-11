/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './App.css'
import './styles/Form.css'
import './styles/VistaPreguntas.css'
import FormRegister from './Components/FormRegister'
import VistaPreguntas  from './Components/VistaPreguntas'
import Home from './Components/Home'
import { Routes, Route, Navigate,  useNavigate } from 'react-router-dom'
import FormLogin from './Components/FormLogin'
import ChoosingCategory from './Components/ChoosingCategory'
import React from 'react'
import PositionTable from './Components/PositionTable'
//import Navbar from './Components/Navbar';
import FinalMessageForm from './Components/FinalMessageComp'
//import { MySwal } from './classes/MySwal'

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

  const [time, setTime] = React.useState<number>(0);
  const navigate = useNavigate();


  // FUNCTIONS
  const returnSetUser = (value: any) => {
    return setUser((val: any) => {

      const user = JSON.stringify(value);
      localStorage.setItem("user", user);
      val = user;
      return JSON.parse(val);

    })
  }

  const returnTime = () => {
    
    return setTime((value: number) => {
      value += 1;
      return value;
    })
  }

  const viewNavigate = (newRoute: any) => {
    // Navigate to the new route
    if (!document.startViewTransition) {
      return navigate(newRoute);
    } else {
      return document.startViewTransition(() => {
        navigate(newRoute);
      });
    }
  };

// USE STATES
React.useEffect(() => {


  // CLEANING FUNCTION
  return () => { };

}, [])

React.useEffect(() => {

  if(window.location.pathname.includes("/question"))
    {
      window.onbeforeunload = () => {
        return "Si sale, su progreso no se guardará... ¿Desea continuar?";
      }
    }
    else
    {
      window.onbeforeunload = () => {
        return null;
      }
    }
})

return (
  <USERCONTEXT.Provider value={{
    user, returnSetUser, time, returnTime, viewNavigate
  }}>
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
        user?.registrationNumber === null || user === null
          ?
          <Navigate to="/login" replace={true} />
          :
          <ChoosingCategory />
        }
        />

      <Route path="/question/:id" element={
        user?.registrationNumber === null || user === null
          ?
          <Navigate to="/login" replace={true} />
          :
          <VistaPreguntas />
        }
      />


      <Route path="/register/choose-category" element={
        user === null
          ?
          <Navigate to="/register" replace={true} />
          :
          <ChoosingCategory />}
      />

      <Route path="/message" element={
        user?.registrationNumber === null || user === null
          ?
          <Navigate to="/login" replace={true} />
          :
          <FinalMessageForm />
        }
      />

      <Route path="/ranking" element={
        user === null
          ?
          <Navigate to="/login" replace={true} />
          :
          <PositionTable />}

      />


      </Routes>
  </USERCONTEXT.Provider>
)
}



export default App;  

