/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
//import { Link, useNavigate } from 'react-router-dom';
import { MySwal } from '../classes/MySwal';
import { USERCONTEXT } from '../App';
import { url } from './Url';

// INTERFACES
interface RegisterProps {
    nombre: string,
    apellido: string,
    matricula: string,
    contraseña: string,
    confirmacion: string 
} 



export default function FormRegister() {

    // VARS
    const [registerData, setRegisterData] = React.useState<RegisterProps>({
        nombre: "",
        apellido: "",
        matricula: "",
        contraseña: "",
        confirmacion: ""
    })
    const [regEx] = React.useState<RegExp>(new RegExp(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/))
    const userContext = React.useContext<any>(USERCONTEXT);
    //const navigation = useNavigate();

    // FUNCTIONS
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        // HOOK
        setRegisterData((value) => {
            value = {
                ...value,
                [e?.target?.name]: e?.target?.value
            }

            // RETURNING VALUE
            return value;
        })
    }

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        // Preventing default behavior
        e?.preventDefault();

        // Conditions
        if (registerData?.nombre === "" || registerData?.nombre.length === 0) {
          MySwal.errorMessage("El campo nombre no está completado de manera correcta.")
          return;
        }

        if (registerData?.apellido === "" || registerData?.apellido?.length === 0) { 
          MySwal.errorMessage("El campo apellido no está completado de manera correcta.")
          return;
        }

        if (registerData?.matricula?.length === 0 || registerData?.matricula?.length < 8) {
          MySwal.errorMessage("El campo matrícula no está lleno de manera correcta.")
          return;
        }

        if (registerData?.contraseña === "" || registerData?.contraseña?.length === 0) {
          MySwal.errorMessage("El campo contraseña no está lleno de manera correcta.")
          return;
        }

        if (registerData?.confirmacion === "" || registerData?.confirmacion?.length === 0) {
          MySwal.errorMessage("El campo confirmación no está lleno de manera correcta.")
          return;
        }

        // Tus credenciales
        /*
        const username = '11171726';
        const password = '60-dayfreetrial';

        // Codificación en Base64 de tus credenciales
        const base64Credentials = btoa(`${username}:${password}`);
*/
        // const user = { 
        //   firstName: registerData?.nombre, 
        //   lastName: registerData?.apellido,
        //   registrationNumber: registerData?.matricula,
        //   passWord: registerData?.contraseña
        // }

        MySwal.informationMessage("Espere, solicitud de registro en progreso.")

        await fetch(url+`/Users`, {
          method: "POST",
          headers: {
           // 'Authorization': `Basic ${base64Credentials}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            firstName: registerData?.nombre, 
            lastName: registerData?.apellido,
            registrationNumber: registerData?.matricula,
            passWord: registerData?.contraseña
          }),        
        
        })
        .then((res) => res.json())
        .then((data) => {
          //console.log(data)
          if(data?.hasError === true)
          {
            MySwal.errorMessage("Algo ha ocurrido con los datos suministrados... por favor... intentelo de nuevo.")
            return;
          } 

          userContext?.returnSetUser(data)
          MySwal.successMessage(`Bienvenido ${data?.firstName}`);
          userContext?.viewNavigate("/login/choose-category")
        })
        .catch((err) => console.error(err))

    }

    return (
        <div 
          className="flex flex-row justify-center items-center flex-wrap min-h-[91.4vh]"
        >
      <div className="max-w-md w-full  md:flex-shrink-0 md:mr-4 mb-4 md:mb-0">
        <div className="max-w-md relative flex flex-col p-2 rounded-md text-black bg-gradient-to-r from-[#F87FFE] to-[#A890E1] mt-5">

          <div className="w-full bg-white p-3 rounded">

            {/* ICON */}
            <section className="absolute items-center -top-[45px] border-8 border-white left-[35%] w-32 h-32 rounded-full bg-white overflow-hidden">
                <div className="bg-[#7747ff] w-full h-full flex justify-center items-center">
                  <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
                    <path className="text-white" d="M10.5 14.49v.5h.5v-.5h-.5zm-10 0H0v.5h.5v-.5zm7-4.996v.5-.5zm-4 0v-.5.5zM8 3.498a2.499 2.499 0 01-2.5 2.498v1C7.433 6.996 9 5.43 9 3.498H8zM5.5 5.996A2.499 2.499 0 013 3.498H2a3.499 3.499 0 003.5 3.498v-1zM3 3.498A2.499 2.499 0 015.5 1V0A3.499 3.499 0 002 3.498h1zM5.5 1A2.5 2.5 0 018 3.498h1A3.499 3.499 0 005.5 0v1zm5 12.99H.5v1h10v-1zm-9.5.5v-1.996H0v1.996h1zm2.5-4.496h4v-1h-4v1zm6.5 2.5v1.996h1v-1.997h-1zm-2.5-2.5a2.5 2.5 0 012.5 2.5h1a3.5 3.5 0 00-3.5-3.5v1zm-6.5 2.5a2.5 2.5 0 012.5-2.5v-1a3.5 3.5 0 00-3.5 3.5h1zM12 5v5h1V5h-1zm-2 3h5V7h-5v1z" fill="currentColor"></path>
                  </svg>
                </div>
            </section>

            {/* TITLE */}
            <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center mt-[70px]">
              Bienvenido a <span className="text-[#7747ff]">App</span>
            </div>
            
            {/* REGISTRATION FORM */}
              <form className="flex flex-col gap-3" onSubmit={handleOnSubmit}>

                {/* Name Field */}
                <div className="block relative">
                  <label htmlFor="text" className="block text-gray-600 cursor-text leading-[140%] font-normal mb-2 text-left">Nombre</label>
                  <input
                    type="text"
                    id="text"
                    className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] transition-all duration-300 appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                    required
                    name="nombre"
                    placeholder='Ej.Juan pablo duarte'
                    onChange={(e) => handleOnChange(e)}
                  />
                  {registerData?.nombre.length !== 0 && registerData?.nombre.length < 3 &&
                    <small className="text-red-500 w-full">¡Oops! Este campo es obligatorio</small>
                  }

                </div>

                {/* Lastname Field */}
                <div className="block relative">
                  <label htmlFor="text" className="text-left block text-gray-600 cursor-text leading-[140%] font-normal mb-2">Apellido</label>
                  <input
                    type="text"
                    id="text"
                    className="transition-all duration-300 rounded border border-gray-200 w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                    required
                    name="apellido"
                    placeholder='Ej.Juan pablo duarte'
                    onChange={(e) => handleOnChange(e)}
                  />
                  {registerData?.apellido.length !== 0 && registerData?.apellido.length < 3 &&
                    <small className="text-red-500 w-full">¡Oops! Este campo es obligatorio</small>
                  }

                </div>

                {/* RegistrationNumber Field */}
                <div className="block relative">
                  <label className="text-left block text-gray-600 cursor-text leading-[140%] font-normal mb-2">Matricula</label>
                  <input
                    type="text"
                    className="transition-all duration-300 rounded border border-gray-200 w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                    required
                    name="matricula"
                    placeholder='Ej: 20220102'
                    onChange={(e) => handleOnChange(e)}
                  />
                  {registerData?.matricula.length === 0 || registerData?.matricula.length >= 8 
                    ?
                      null 
                    :
                    <small className="text-red-500 w-full">¡Oops! Este campo require ser mínimo de 8 números</small>
                  }
                </div>

                {/* Password Field */}
                <div className="block relative">
                  <label className="text-left block text-gray-600 cursor-text leading-[140%] font-normal mb-2">Contraseña</label>
                  <input
                    type="password"
                    name="contraseña"
                    id="password"
                    className="rounded transition-all duration-300 border border-gray-200 w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                    required
                    placeholder='contraseña'
                    onChange={(e) => handleOnChange(e)}
                  />

                  {registerData?.contraseña.length === 0 || regEx.test(registerData?.contraseña) === true ?
                    null :
                    <small className="text-red-500 w-full">¡Oops! La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.</small>
                  }
                </div>

                {/* Confirmation Field */}
                <div className="block relative">
                  <label htmlFor="password" className="text-left block text-gray-600 cursor-text leading-[140%] font-normal mb-2">Repita Contraseña</label>
                  <input
                    type="password"
                    name="confirmacion"
                    id="password"
                    className="rounded transition-all duration-300 border border-gray-200 w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                    required
                    placeholder='repita la contraseña'
                    onChange={(e) => handleOnChange(e)}
                  />
                  {registerData?.confirmacion.length === 0 || (regEx.test(registerData?.confirmacion) === true && registerData?.confirmacion === registerData?.contraseña) ?
                    null :
                    <small className="text-red-500 w-full">¡Oops! Parece que sus contraseñas no coinciden</small>
                  }
                </div>

                {/* Submit Button */}
                <button type="submit" className="mt-5 bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Participar</button>

                {/* This is a divider */}
                <div className="w-full border border-1 my-2">
                </div>

              </form>

            {/* GO TO LOGIN LINK */}
            <section className="text-sm text-center">
              ¿Ya has participado? <button onClick={() => userContext?.viewNavigate("/login")} className="text-sm text-[#7747ff]">Inicia Sesion</button>
            </section>
          </div>
          
        
        </div>
      </div>

      {/* IMAGE SECTION CONTAINER */}
      <div className="max-w-md w-96 md:w-auto md:flex-shrink-0 md:ml-4">
        <img src="/home.png" alt="." className="rounded w-full" />
      </div>
    </div>
    )
}