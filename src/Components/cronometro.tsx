/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react';

interface Prop{
    iniciar:boolean;
}

function Cronometro({iniciar}:Prop) {
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [horas, setHoras] = useState(0);
  const [corriendo, setCorriendo] = useState(iniciar);

  useEffect(() => {
    let intervalo;

    if (corriendo) {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos + 1);
      }, 1000);
    } else {
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [corriendo]);

  useEffect(() => {
    if (segundos === 60) {
      setSegundos(0);
      setMinutos(minutos => minutos + 1);
    }
    if (minutos === 60) {
      setMinutos(0);
      setHoras(horas => horas + 1);
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
      <div className="text-center">
        <h1 className="text-2xl text-black font-bold mb-4">
          Cronómetro
        </h1>
        <div className="text-2xl text-black mb-4">
          {minutos < 10 ? `0${minutos}` : minutos} : {segundos < 10 ? `0${segundos}` : segundos}
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
