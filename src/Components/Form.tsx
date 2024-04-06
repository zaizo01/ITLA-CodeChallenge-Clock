import React from 'react';

export function Form() {

    return (
        <div>
            <form className="form">
                <p className="title">Registro Feria </p>
                <p className="message text-yellow">Por favor llenar todos los campos</p>
                <div className="flex">


                    <label>
                        <input required placeholder="" type="text" className="input" />
                        <span>Nombres</span>
                    </label>

                    <label>
                        <input required placeholder="" type="text" className="input" />
                        <span>Apellidos</span>
                    </label>
                </div>


                <label>
                    <input required placeholder="" type="text" className="input" />
                    <span>Matricula</span>
                </label>


                <label>
                    <input required placeholder="" type="text" className="input" />
                    <span>Contraseña</span>
                </label>


                <label>
                    <input required placeholder="" type="password" className="input" />
                    <span>Repita contraseña</span>
                </label>

                <label>
                    <span>Elija la Categoria</span>
                    <div className=" ">
                        <select className="block mt-2 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option selected>Logica (Media)</option>
                            <option>Codigo (Facil) </option>
                            <option>Algoritmos (Dificil)</option>
                        </select>

                    </div>

                </label>

                <button type="submit" className="submit">Registrarse</button>


            </form>
        </div>
    )
}