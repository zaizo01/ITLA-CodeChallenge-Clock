/* eslint-disable @typescript-eslint/no-explicit-any */

import { USERCONTEXT } from "../App";
import React from "react"

export default function Home() {

    // VARS, STATES
    const userContext = React.useContext<any>(USERCONTEXT);

    // FUNCTION
    const handleOnNavigation = () => {
        userContext?.viewNavigate("/register");
    }

    return (
        // Returning the next section div
        <div className="w-full min-h-[91.4vh] flex flex-col items-center justify-center">
            
            {/* Image Section */}
            <section className="w-4/6 my-5 rounded-2xl overflow-hidden shadow-4xl">
                <img src="./home.png" className="w-full rounded-4xl" alt="Any" />
            </section>

            {/* Button Section */}
            <section className="w-4/6 my-5 rounded overflow-hidden">

                {/* TODO: Por favor, no se si es posible pero recuerda cambiar el color de este botón con este código hexagecimal F87FFE */}
                <button
                    onClick={() => handleOnNavigation()}                
                    className="mt-6 px-8 z-30 py-3 w-72 bg-purple-400 rounded-md text-white relative font-semibold font-sans after:-z-20 after:absolute after:h-1 after:w-1 after:bg-blue-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#be123c;] hover:[text-shadow:2px_2px_2px_#fda4af] text-2xl"
                
                >
                    Quiero Parcipar
                </button>
            </section>


        </div>
    )
}