import React from 'react';
import { useNavigate } from 'react-router-dom';
import easy from '../CategoriasIcon/easy.svg'
import medium from '../CategoriasIcon/medium.svg'
import high from '../CategoriasIcon/high.svg'
import { USERCONTEXT } from '../App';


// INTERFACES


export default function ChoosingCategory() {

    // VARS
    const navigation = useNavigate();
    const userContext = React.useContext<any>(USERCONTEXT);

    // FUNCTIONS
    const handleOnSelectCategory = (id: number) => {
        localStorage.setItem("categoria", id.toString())
        userContext?.viewNavigate(`/question/${id}`)
    }


    return (
        <section className="flex flex-row justify-center items-center  min-h-[91vh] h-auto">
            
            <div className=" p-4 py-8 !w-5/6 !h-4/6 rounded-3xl bg-white flex flex-col justify-between items-center md:flex-nowrap">

                {/* TITLE SECTION */}
                <section className="!w-2/3 text-center relative">

                    {/* Icon */}
                    <div className="absolute items-center -top-[100px] border-8 border-white left-[25%] md:left-[40%] w-32 h-32 rounded-full bg-white overflow-hidden">
                        <section className="bg-[#F87FFE] w-full h-full flex justify-center items-center">
                            <svg className="mx-auto" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
                                <path className="m-auto text-white" d="M15 3.5H6.5m0 0a2 2 0 10-4 0m4 0a2 2 0 11-4 0m0 0H0m15 8h-2.5m0 0a2 2 0 10-4 0m4 0a2 2 0 11-4 0m0 0H0" stroke="currentColor">
                                </path>
                            </svg>
                        </section>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold mt-8">
                        Seleccione una categoría:
                    </h1>

                    {/* This is a divider */}
                    <div className="w-full border border-1 my-4">
                    </div>

                </section>


                {/* CATEGORY SECTION */}
                <section className=" flex flex-col md:flex-row justify-evenly lg:flex-nowrap items-center gap-5">
                    <button
                    onClick={() => handleOnSelectCategory(1)}
                        className="flex text-center flex-row p-4 border-2 rounded-3xl group/anim hover:border-[#F87FFE] transition-all duration-300"
                    >
                        <div className="w-full flex flex-row justify-center items-center ">
                            <img className="w-20" src={easy} alt="." />
                            <h3 className="text-lg text-green-500 group-hover/anim:text-[#F87FFE] transition-all duration-300">BEBE</h3>
                        </div>
                    </button>

                    <button
                          onClick={() => handleOnSelectCategory(2)}
                        className="flex text-center flex-row p-4 border-2 rounded-3xl group/anim hover:border-[#F87FFE] transition-all duration-300"
                    >
                        <div className="w-full flex flex-row justify-center items-center ">
                            <img className="w-20" src={medium} alt="." />
                            <h3 className="text-lg text-yellow-500 group-hover/anim:text-[#F87FFE] transition-all duration-300">Nivel Medio</h3>
                        </div>
                    </button>

                    <button
                          onClick={() => handleOnSelectCategory(3)}
                        className="flex text-center flex-row p-4 border-2 rounded-3xl group/anim hover:border-[#F87FFE] transition-all duration-300"
                    >
                        <div className="w-full flex flex-row justify-center items-center ">
                            <img className="w-20" src={high} alt="." />
                            <h3 className="text-lg text-red-500 group-hover/anim:text-[#F87FFE] transition-all duration-300">NIvel Dios!!!</h3>
                        </div>
                    </button>

                </section>
            </div>

        </section>
    )
}