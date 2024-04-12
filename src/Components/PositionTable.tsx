/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { url } from './Url';
import estrella from "../../public/estrella.png";
import { USERCONTEXT } from '../App';

// INTERFACES
interface TableProps
{
    firstName: string;
    correctAnswersCount: number;
    level: number;
}

export default function PositionTable() {

    // VARS
    const [usuarios,setUsuarios] = React.useState<any[]>([]); 
    const userContext = React.useContext<any>(USERCONTEXT)

    // USE EFFECTS
    React.useEffect(() => {

        const fetchingData = async () => {
            
            const categoria = localStorage.getItem("categoria")
            
            try {
                const resp = await fetch(url+`/ChallengeResult/${categoria}`);
                //console.log(await resp.json()) 

                if (!resp.ok) {
                  throw new Error('Error al obtener los usuarios');
                }
                const data = await resp.json();
 

                setUsuarios(data)
                localStorage.removeItem("user")
                localStorage.removeItem("categoria")
        
        
              } catch (error) {
                console.error('Error al obtener las preguntas:', error);
                // Manejo de errores, si es necesario
              }
        }

        fetchingData();

    }, [])


    const finalizar = (instagram: boolean) =>{
        if(instagram)
        {
            userContext?.viewNavigate("/")

            // Abrir nuevo tab
            var win = window.open("https://www.instagram.com/itlard/", '_blank');
                
            // Cambiar el foco al nuevo tab (punto opcional)
            win?.focus();
        }
        else
        {
           
            userContext?.viewNavigate("/") 
        }
    }
  
    return (
        <section className="flex flex-row justify-center items-center  min-h-[91vh] h-auto">


          
            <div className=" bg-[#8A8B99]/20 !w-5/6 !h-4/6 rounded-3xl flex flex-col justify-between items-center md:flex-nowrap ">

                {/* TITLE SECTION */}
                <section className="flex flex-row justify-between items-center w-full text-center p-5 text-center bg-[#809FF0]/50 !rounded-t-3xl oveflow-hidden">

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-white ">
                        Tabla de posicionamiento:
                    </h1>

                    <button onClick={() => finalizar(false)} className="border border-2 !border-white !text-white px-6 py-2 rounded text-sm font-normal">
                        Finalizar
                    </button>

                    
                    <button onClick={() => finalizar(true)} className="border border-2 !border-white !text-white px-6 py-2 rounded text-sm font-normal">
                        Ir a instagram
                    </button>

                </section>

                {/* CATEGORY SECTION */}
                <section className="!w-5/6 flex flex-col md:flex-row justify-evenly lg:flex-nowrap items-center gap-5">

                    <div className="relative overflow-x-auto w-full"> 
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <tbody>
                                
                                {
                                    // Mapping an array
                                    usuarios
                                        .sort((a, b) => b.correctAnswersCount - a.correctAnswersCount)
                                        .filter((_, idx: number) => idx < 5)
                                        .map((value: TableProps, index: number) => {
                                            return <tr className="" key={index}>

                                            {
                                                index + 1 <= 3
                                                ? 
                                                    <th scope="row" className="px-6 py-4 font-medium !text-white whitespace-nowrap relative">
                                                        <div className="w-12 h-12 -left-5 relative flex flex-col justify-center items-center">
                                                            <section className="absolute !z-50 top-3 !text-white text-lg">{index+1}</section>
                                                            <img src={estrella} className="w-12 h-12 absolute -z-1" alt='.'/>
                                                        </div>
                                                    </th>
                                                :
                                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                                    {index+1}
                                                </th>
                                            }

                                            <td className="px-6 py-4 text-white text-lg">
                                                {value?.firstName}
                                            </td>
                                            <td className="px-6 py-4 text-white text-lg">
                                                {value?.correctAnswersCount}
                                            </td>
                                            
                                            <td className="px-6 py-4 text-white text-lg">
                                                Nivel {value?.level}
                                            </td>
                                        </tr>
                                    })
                                }
                                
                            </tbody>
                        </table>
                    </div>   

                </section>
            </div>

        </section>
    )
}