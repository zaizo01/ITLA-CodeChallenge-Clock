import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { USERCONTEXT } from '../App';

// INTERFACES
interface TableProps
{
    nombre: string,
    puntuacion: number
}

export default function FinalMessageForm() {

    // VARS
    const userContext = React.useContext<any>(USERCONTEXT);
    const location = useLocation();
    const data: any = location.state;
  
    return (
        <section className="flex flex-row justify-center items-center  min-h-[91vh] h-auto">
          
            <div className="p-4 py-8 !w-5/6 !h-4/6 rounded-3xl bg-white flex flex-col justify-between items-center md:flex-nowrap">

                {/* TITLE SECTION */}
                <section className="!w-2/3 text-center relative">
                    
                    {/* Icon */}
                    <div className="absolute items-center -top-[100px] border-8 border-white left-[25%] md:left-[40%] w-32 h-32 rounded-full bg-white overflow-hidden">
                        <section className="bg-[#F87FFE] w-full h-full flex justify-center items-center">
                            <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
                                <path className="text-white" d="M.5 4.5h14m-10-4v14m-3-14h12a1 1 0 011 1v12a1 1 0 01-1 1h-12a1 1 0 01-1-1v-12a1 1 0 011-1z" stroke="currentColor">
                                </path>
                            </svg>
                        </section>
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl font-bold mt-8">
                        {
                            // using our location
                            data?.isCompleted !== undefined && data?.isCompleted === true
                            ?
                                "🎈¡Felicidades!🎉"
                            :
                            "¡Oh vaya! Suerte para la próxima.😭"
                        }
                    </h1>

                    {/* This is a divider */}
                    <div className="w-full border border-1 my-4">
                    </div>

                </section>

                {/* CATEGORY SECTION */}
                <section className="!w-5/6 flex flex-col justify-evenly lg:flex-nowrap items-center gap-5">
                    {
                        // using our location
                        data?.isCompleted === undefined || data?.isCompleted === false
                        ?
                            <p className="text-md text-gray-500/90">
                                Luce ser que, intentaste volver hacia atrás o bien, que no resolvista todas las preguntas... suerte para la próxima.
                            </p>
                        :
                        <p className="text-md text-gray-500/90">
                            ¡Excelente! Has completado el exámen, en tiempo record, ve ahora al tablero y mira a ver cómo te fue. 😁
                        </p>
                    }

                    
                    <button onClick={() => userContext?.viewNavigate("/ranking")} className="mt-5 bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">
                        Ir al tablero
                    </button>
                </section>
            </div>

        </section>
    )
}