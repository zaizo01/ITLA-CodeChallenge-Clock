/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import easy from '../CategoriasIcon/easy.svg'
import medium from '../CategoriasIcon/medium.svg'
import high from '../CategoriasIcon/high.svg'
import linea from "../../public/linea.png";

import { USERCONTEXT } from '../App';

// INTERFACES
export default function ChoosingCategory() {

    // VARS
    const userContext = React.useContext<any>(USERCONTEXT);

    // FUNCTIONS
    const handleOnSelectCategory = (id: number) => {
        localStorage.setItem("categoria", id.toString())
        userContext?.viewNavigate(`/question/${id}`)
    }

    // 
    return (
        <section className="flex flex-row justify-center items-center  min-h-[91vh] h-auto">
            
            <div className=" p-4 py-8 !w-5/6 !h-4/6 rounded-3xl flex flex-row justify-between items-center md:flex-nowrap">

                {/* TITLE SECTION */}
                <section className="!w-2/6 text-center relative">

                    <div className="w-full">
                        <img src="../../public/grafico.png" alt='.' />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl w-full font-bold mt-8 text-white">
                        Seleccione una categoría:
                    </h1>

                </section>


                {/* CATEGORY SECTION */}
                <section className="w-2/4 m-5 ml-8 flex flex-col md:flex-col justify-evenly lg:flex-nowrap items-center gap-5">
                    <button
                        onClick={() => handleOnSelectCategory(1)}
                        className="w-full flex text-center bg-black flex-row p-5 rounded-full transition-all duration-300 group/anim"
                    >
                        <div className="w-full flex flex-row justify-evenly items-center ">
                            <h3 className=" text-white group-hover/anim:text-[#F87FFE] transition-all duration-300 text-xl">PROGRAMADOR NOVATO</h3>
                            <img className="w-20" src={easy} alt="." />
                        </div>
                    </button>

                    {/* Divider */}
                    <img className="w-5/6 my-5" src={linea} alt="." />

                    <button
                        onClick={() => handleOnSelectCategory(2)}
                        className="w-full flex text-center bg-black flex-row p-5 rounded-full transition-all duration-300 group/anim"
                    >
                        <div className="w-full flex flex-row justify-evenly items-center ">
                            <h3 className=" text-white group-hover/anim:text-[#F87FFE] transition-all duration-300 text-xl">YA SE PROGRAMAR</h3>
                            <img className="w-20" src={medium} alt="." />
                        </div>
                    </button>

                    
                    {/* Divider */}
                    <img className="w-5/6 my-5" src={linea} alt="." />

                    <button
                        onClick={() => handleOnSelectCategory(3)}
                        className="w-full flex text-center bg-black flex-row p-5 rounded-full transition-all duration-300 group/anim"
                    >
                        <div className="w-full flex flex-row justify-evenly items-center ">
                            <h3 className=" text-white group-hover/anim:text-[#F87FFE] transition-all duration-300 text-xl">PROGRAMADOR DEDICADO</h3>
                            <img className="w-20" src={high} alt="." />
                        </div>
                    </button>

                </section>
            </div>

        </section>
    )
}