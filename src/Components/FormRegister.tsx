/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MySwal } from '../classes/MySwal';
import { USERCONTEXT } from '../App';


// INTERFACES
interface RegisterProps {
    nombre: string,
    apellido: string,
    matricula: string,
    contraseña: string,
    confirmacion: string
}

interface ErrorsProps {
    errNombre: boolean,
    errApellido: boolean,
    errMatricula: boolean,
    errContraseña: boolean,
    errConfirmacion: boolean
}

export default function FormRegister() {

    // VARS
    const navigation = useNavigate();
    const userContext = React.useContext<any>(USERCONTEXT);


    const [registerData, setRegisterData] = React.useState<RegisterProps>({
        nombre: "",
        apellido: "",
        matricula: "",
        contraseña: "",
        confirmacion: ""
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [regEx, setRegEx] = React.useState<RegExp>(new RegExp(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/))
    const [errData, setErrData] = React.useState<ErrorsProps>({
        errNombre: false,
        errApellido: false,
        errMatricula: false,
        errContraseña: false,
        errConfirmacion: false
    })

    // FUNCTIONS
    /*
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
    */

    const handleOnSubmit =async (e: React.FormEvent<HTMLFormElement>) => {



        if (registerData?.nombre === "" || registerData?.nombre.length === 0) {
            // Preventing default behavior
            e?.preventDefault();
            setErrData((value) => value = { ...value, errNombre: true });
        }

        if (registerData?.apellido === "" || registerData?.apellido?.length === 0) {
            // Preventing default behavior
            e?.preventDefault();
            setErrData((value) => value = { ...value, errApellido: true });
        }

        if (registerData?.matricula?.length === 0 || registerData?.matricula?.includes("-") === false) {
            // Preventing default behavior
            e?.preventDefault();
            setErrData((value) => value = { ...value, errMatricula: true });
        }

        if (registerData?.contraseña === "" || registerData?.contraseña?.length === 0) {
            setErrData((value) => value = { ...value, errContraseña: true });
        }

        if (registerData?.confirmacion === "" || registerData?.confirmacion?.length === 0) {
            setErrData((value) => value = { ...value, errConfirmacion: true });
        }

        const data = Object.values(errData);
        
        if (data.includes(true)) {
          return;
      }

      e?.preventDefault();
        await fetch(`http://localhost:5091/Users`, {
          method: "POST",
          body: JSON.stringify({ 
            firstName: registerData.nombre,
            lastName: registerData.apellido,
            registrationNumber: registerData.matricula,
            passWord: registerData.contraseña
          }),
          //mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((data) => {
          if(data?.hasError === true)
          {
            console.log(registerData)
            MySwal.errorMessage(data.error)
            return;
          }
          console.log(registerData)
          console.log(data)

          userContext?.returnSetUser(data)
          MySwal.successMessage(`Bienvenido ${data?.firstName}`);

         
          navigation("/login/choose-category", {
            replace: true,
          })
         

        }) 
        .catch((err) => console.error(err))  
 

    }

    return (
        <div 
          className="flex flex-row justify-center items-center flex-wrap min-h-[91vh]"
        >
      <div className="max-w-md w-full  md:flex-shrink-0 md:mr-4 mb-4 md:mb-0">
        <div className="max-w-md relative flex flex-col p-4 rounded-md text-black bg-white">
          <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Bienvenido a <span className="text-[#7747ff]">App</span></div>
          <form className="flex flex-col gap-3" onSubmit={handleOnSubmit}>

            <div className="block relative">
              <label htmlFor="text" className="text-left block text-blue leading-[140%] font-normal mb-2">Nombre</label>
              <input
                type="text"
        
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                required
                name="nombre"
                placeholder='Ej.Juan '
                onChange={(e) => setRegisterData({...registerData,nombre:e.target.value})}
              />
              {registerData?.nombre.length !== 0 && registerData?.nombre.length < 3 &&
                <small className="text-red-500 w-full">¡Oops! Este campo es obligatorio</small>
              }

            </div>

            <div className="block relative">
              <label htmlFor="text" className="text-left block text-blue leading-[140%] font-normal mb-2">Apellido</label>
              <input
                type="text"
             
                className="rounded border border-gray-200 w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                required
                name="apellido"
                placeholder='Ej.pablo duarte'
                onChange={(e) => setRegisterData({...registerData,apellido:e.target.value})}
              />
              {registerData?.apellido.length !== 0 && registerData?.apellido.length < 3 &&
                <small className="text-red-500 w-full">¡Oops! Este campo es obligatorio</small>
              }

            </div>

            <div className="block relative">
              <label className="text-left block text-blue leading-[140%] font-normal mb-2">Matricula</label>
              <input
                type="text"
                className="rounded border border-gray-200 w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                required
                name="matricula"
                placeholder='Ej.20220102'
                onChange={(e) => setRegisterData({...registerData,matricula:e.target.value})}
              />
              {registerData?.matricula.length === 0 || registerData?.matricula.length >= 9 && registerData?.matricula.includes("-") ?
                null :
                <small className="text-red-500 w-full">¡Oops! Este campo require ser mínimo de 8 números y un guión</small>
              }
            </div>

            <div className="block relative">
              <label className="text-left block text-blue leading-[140%] font-normal mb-2">Contraseña</label>
              <input
                type="password"
                name="contraseña"

                className="rounded border border-gray-200 w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                required
                placeholder='contraseña'
                onChange={(e) => setRegisterData({...registerData,contraseña:e.target.value})}
              />

              {registerData?.contraseña.length === 0 || regEx.test(registerData?.contraseña) === true ?
                null :
                <small className="text-red-500 w-full">¡Oops! La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.</small>
              }
            </div>

            <div className="block relative">
              <label htmlFor="password" className="text-left block text-blue leading-[140%] font-normal mb-2">Repita Contraseña</label>
              <input
                type="password"
                name="confirmacion"

                className="rounded border border-gray-200 w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                required
                placeholder='repita la contraseña'
                onChange={(e) => setRegisterData({...registerData,confirmacion:e.target.value})}
              />
              {registerData?.confirmacion.length === 0 || (regEx.test(registerData?.confirmacion) === true && registerData?.confirmacion === registerData?.contraseña) ?
                null :
                <small className="text-red-500 w-full">¡Oops! Parece que sus contraseñas no coinciden</small>
              }
            </div>

            <button type="submit" className="mt-5 bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Registrarse</button>
          </form>

          <div className="text-sm text-center mt-[1.6rem]">¿Ya tienes cuenta? <Link to="/login" className="text-sm text-[#7747ff]">Iniciar Sesion</Link></div>
        </div>
      </div>
      <div className="max-w-md w-96 md:w-auto md:flex-shrink-0 md:ml-4">
        <img src="/home.png" alt="." className="rounded w-full" />
      </div>
    </div>
    )
}