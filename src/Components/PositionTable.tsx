import React from 'react';

// INTERFACES
interface TableProps
{
    nombre: string,
    puntuacion: number
}

export default function PositionTable() {

    // VARS
    const [usuarios] = React.useState<any>(null);

    // USE EFFECTS
    React.useEffect(() => {

        const fetchingData = async () => {
            
            const categoria = localStorage.getItem("categoria")
            
            try {
                const resp = await fetch(`http://localhost:5091/ChallengeResult/${1}`);
                console.log(resp)

                if (!resp.ok) {
                  throw new Error('Error al obtener los usuarios');
                }
                
              } catch (error) {
                console.error('Error al obtener las preguntas:', error);
                // Manejo de errores, si es necesario
              }
        }

        fetchingData();

    }, [])
  
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
                    <h1 className="text-3xl font-bold mt-8">
                        Tabla de posicionamiento:
                    </h1>

                    {/* This is a divider */}
                    <div className="w-full border border-1 my-4">
                    </div>

                </section>

                {/* CATEGORY SECTION */}
                <section className="!w-5/6 flex flex-col md:flex-row justify-evenly lg:flex-nowrap items-center gap-5">

                <div className="relative overflow-x-auto w-full"> 
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3 rounded-s-lg">
                                    Lugar
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3 rounded-e-lg">
                                    Puntuación
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                                // Mapping an array
                                usuarios?.map((value: TableProps, index: number) => {
                                    return <tr className="bg-white border-b" key={index}>
                                         <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                             {index+1}
                                         </th>
                                         <td className="px-6 py-4">
                                             {value?.nombre}
                                         </td>
                                         <td className="px-6 py-4">
                                             {value?.puntuacion}
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