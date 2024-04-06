import React, { useState } from 'react';

function VistaPreguntas() {
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);

    const handleRespuestaSeleccionada = (e: { target: { value: React.SetStateAction<null>; }; }) => {
        setRespuestaSeleccionada(e.target.value);
    };

    const verificarRespuesta = () => {
        if (respuestaSeleccionada === '2') {
            alert('¡Respuesta correcta!');
        } else {
            alert('Respuesta incorrecta. Inténtalo de nuevo.');
        }
    };

    return (
        <div>
            <div className="flex items-start gap-2.5">
                <div className="flex rounded-lg flex flex-col items-center justify-center w-full bg-gray-100 text-gray-800 p-10 h-screen">
                    <div className="flex flex-col border-black border-4 flex-grow w-full rounded-lg overflow-hidden" style={{ backgroundColor: '#1e293b' }}>
                        <div className="flex flex-col w-full flex-grow p-4 overflow-auto">
                            <div className="overflow-y-auto" style={{ maxHeight: "760px" }}>
                                <h1 className="text-black text-4xl">Problema</h1>
                                <div className="p-5">
                                    <div className="p-5 border-4 border-red-200 border-dashed rounded-lg dark:border-gray-700">
                                        <h1 className="text-black text-3xl">¿Cuál es el resultado de 2 + 2?</h1>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="p-5 border-4 border-red-200 border-dashed rounded-lg dark:border-gray-700">
                                        <h1 className="text-black text-3xl">Respuestas</h1>
                                        <div className="text-left">
                                            <form className="form mt-5">
                                                <label htmlFor="01">
                                                    <input id="01" type="radio" name="r" value="1" checked={respuestaSeleccionada === '1'} onChange={handleRespuestaSeleccionada} />
                                                    Respuesta 3
                                                </label>
                                                <br />
                                                <label htmlFor="02">
                                                    <input id="02" type="radio" name="r" value="2" checked={respuestaSeleccionada === '2'} onChange={handleRespuestaSeleccionada} />
                                                    Respuesta 4  
                                                </label>
                                                <br />
                                                <label htmlFor="03">
                                                    <input id="03" type="radio" name="r" value="3" checked={respuestaSeleccionada === '3'} onChange={handleRespuestaSeleccionada} />
                                                    Respuesta 5
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
    )
}

export default VistaPreguntas;
