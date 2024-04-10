/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Cronometro from './cronometro';

interface Pregunta {
  description: string;
  level: number;
  incorrectAnswser1: string;
  incorrectAnswser2: string;
  incorrectAnswser3: string;
  correctAnswer: string;
}

function VistaPreguntas() {
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState("");
  const [respuestasCorrectas, setRespuestasCorrectas] = useState<number[]>([]);
  const [respuestasIncorrectas, setRespuestasIncorrectas] = useState<number[]>([]);
  const [corriendo, setCorriendo] = useState(false);
  const [nivel, setNivel] = useState("");
  const [userId,setIdUser] = useState("");

  const enviarPuntuacion = async () => {
    const resultado = {
        userId: userId,
        level: nivel,
        correctAnswersCount: respuestasCorrectas.length,
        minutiesElapsed: 5 // Cambiar a la variable correspondiente si es necesario
      }

      console.log(resultado)
    try {
      const response = await fetch('http://localhost:5091/ChallengeResult', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(resultado)
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar la puntuación');
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al enviar la puntuación:', error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
        const user = localStorage.getItem('user');

        if (!user) {
          window.location.href = '/login';
          return; // Detiene la ejecución si redirecciona
        }
        
        const nivel = localStorage.getItem("categoria");
        
        if (!nivel) {
          window.location.href = '/login/choose-category';
          return; // Detiene la ejecución si redirecciona
        }
        
        setNivel(nivel);
        setIdUser(JSON.parse(user).id);


      try {
        const resp = await fetch('http://localhost:5091/Question/GetQuestionsByLevel' + nivel);
        if (!resp.ok) {
          throw new Error('Error al obtener las preguntas');
        }
        const preguntas = await resp.json();
        setPreguntas(preguntas);
        setCorriendo(true);
      } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        // Manejo de errores, si es necesario
      }
    };

    fetchData();
  }, []);

  const handleRespuestaSeleccionada = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRespuestaSeleccionada(e.target.value);
  };

  const verificarRespuesta = () => {
    const preguntaActual = preguntas[indicePregunta];
    if (respuestaSeleccionada === preguntaActual.correctAnswer) {
      setRespuestasCorrectas([...respuestasCorrectas, indicePregunta]);
      alert('¡Respuesta correcta!');
    } else {
      setRespuestasIncorrectas([...respuestasIncorrectas, indicePregunta]);
      alert('Respuesta incorrecta. Inténtalo de nuevo.');
    }

    if (indicePregunta < preguntas.length - 1) {
      setIndicePregunta(indicePregunta + 1);
      setRespuestaSeleccionada(""); // Limpiar la respuesta seleccionada para la siguiente pregunta
    } else {
        
        //aqui envia se envia al backend cuando termine de contestar las preguntas
        enviarPuntuacion();
        
        // Redirigir al usuario a otra vista cuando termina todas las preguntas
        // Aquí puedes establecer la lógica de redireccionamiento
        //window.location.href = '/ranking';
      
    }
  };

  if (preguntas.length === 0) {
    return <div>Cargando preguntas...</div>;
  }

  const preguntaActual = preguntas[indicePregunta];

  return (
    <div>
      <div className="flex items-start gap-2.5">
        <div className="flex rounded-lg flex flex-col items-center justify-center w-full bg-gray-100 text-gray-800 p-10 h-screen">
          {corriendo && <Cronometro iniciar={corriendo} />}
          <div className="flex flex-col border-black border-4 flex-grow w-full rounded-lg overflow-hidden" style={{ backgroundColor: '#1e293b' }}>
            <div className="flex flex-col w-full flex-grow p-4 overflow-auto">
              <div className="overflow-y-auto" style={{ maxHeight: "760px" }}>
                <h1 className="text-black text-4xl">Problema</h1>
                <div className="p-5">
                  <div className="p-5 border-4 border-red-200 border-dashed rounded-lg dark:border-gray-700">
                    <h1 className="text-black text-3xl">{preguntaActual.description}</h1>
                  </div>
                </div>
                <div className="p-5">
                  <div className="p-5 border-4 border-red-200 border-dashed rounded-lg dark:border-gray-700">
                    <h1 className="text-black text-3xl">Respuestas</h1>
                    <div className="text-left">
                      <form className="form mt-5">
                        <label htmlFor="respuesta1" className="text-green-500 ">
                          <input id="respuesta1" type="radio" name="respuesta" value={preguntaActual.correctAnswer} checked={respuestaSeleccionada === preguntaActual.correctAnswer} onChange={handleRespuestaSeleccionada} />
                          {preguntaActual.correctAnswer}
                        </label>
                        <br />
                        <label htmlFor="respuesta2" className="text-red-500 ">
                          <input id="respuesta2" type="radio" name="respuesta" value={preguntaActual.incorrectAnswser1} checked={respuestaSeleccionada === preguntaActual.incorrectAnswser1} onChange={handleRespuestaSeleccionada} />
                          {preguntaActual.incorrectAnswser1}
                        </label>
                        <br />
                        <label htmlFor="respuesta3" className="text-red-500 ">
                          <input id="respuesta3" type="radio" name="respuesta" value={preguntaActual.incorrectAnswser2} checked={respuestaSeleccionada === preguntaActual.incorrectAnswser2} onChange={handleRespuestaSeleccionada} />
                          {preguntaActual.incorrectAnswser2}
                        </label>
                        <br />
                        <label htmlFor="respuesta4" className="text-red-500 ">
                          <input id="respuesta4" type="radio" name="respuesta" value={preguntaActual.incorrectAnswser3} checked={respuestaSeleccionada === preguntaActual.incorrectAnswser3} onChange={handleRespuestaSeleccionada} />
                          {preguntaActual.incorrectAnswser3}
                        </label>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-300 border-black border-4 p-4 flex items-center">
              <button
                className="ml-3 bg-blue-500 text-white px-6 py-2 rounded-md font-bold hover:bg-blue-700"
                onClick={verificarRespuesta}
              >
                Verificar respuesta
                <i className="ml-2 fa-regular fa-hand-point-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VistaPreguntas;
