/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { USERCONTEXT } from '../App';

interface Prop{
    iniciar:boolean;
}

function Cronometro({ iniciar }: Prop) {
  const navigation = useNavigate();
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(10);
  const [horas, setHoras] = useState(0);
  const [corriendo] = useState(iniciar);
  const userContext = React.useContext<any>(USERCONTEXT)

  useEffect(() => {
    let intervalo: any;

    if (corriendo) {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos - 1);
      }, 1000);
    } else {
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [corriendo]);

  useEffect(() => {
    if (segundos === 0) {
      setTimeout(() => {
        setSegundos(59);
        setMinutos(minutos => minutos - 1);
        userContext?.returnTime()
      }, 1000)
    }
    if (minutos === 60) {
      setMinutos(0);
      setHoras(horas => horas - 1);
    }

    if(segundos === 0 && minutos === 0)
    {
      
      userContext?.returnTime()
      setTimeout(() => {
        navigation("/message", {
          replace: true,
          state: {
            isCompleted: false
          }
        })
      }, 1000)
      
    }
  }, [segundos, minutos, horas]);

  /*
  const iniciarCronometro = () => {
    setCorriendo(true);
  };

  const detenerCronometro = () => {
    setCorriendo(false);
  };

  const reiniciarCronometro = () => {
    setSegundos(0);
    setMinutos(0);
    setHoras(0);
    setCorriendo(false);
  };
  */

  return (
    <div className="flex justify-center items-center ">
      <div className="text-center flex flex-row justify-between items-center">
        <h1 className="text-2xl text-black font-bold mb-4">
          Tiempo restante:
        </h1>
        <div className="text-2xl text-black mb-4 font-bold">
          {minutos > 10 ? `1${minutos}` : minutos}:{segundos < 10 ? `0${segundos}` : segundos}
        </div> 
{/*
 {horas < 10 ? `0${horas}` : horas} :

        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded" onClick={iniciarCronometro}>
            Iniciar
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded" onClick={detenerCronometro}>
            Detener
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded" onClick={reiniciarCronometro}>
            Reiniciar
          </button>
        </div>
        */}
      </div>
    </div>
  );
}

export default Cronometro;
