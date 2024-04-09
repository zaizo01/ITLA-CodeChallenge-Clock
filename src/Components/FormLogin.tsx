import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MySwal } from '../classes/MySwal';
import { USERCONTEXT } from '../App';

// INTERFACES
interface RegisterProps {
    usuario: string,
    contraseña: string,
}

export default function FormLogin() {

    // VARS
    const [loginData, setLoginData] = React.useState<RegisterProps>({
        usuario: "",
        contraseña: "",
    })
    const navigation = useNavigate();
    const userContext = React.useContext<any>(USERCONTEXT);
    const [regEx] = React.useState<RegExp>(new RegExp(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/))
    

    // FUNCTIONS
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        // HOOK
        setLoginData((value) => {
            value = {
                ...value,
                [e?.target?.name]: e?.target?.value
            }

            // RETURNING VALUE
            return value;
        })
    }

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        if (loginData?.usuario === "" ||loginData?.usuario.length === 0) {
            // Preventing default behavior
            e?.preventDefault();
        }

        if (loginData?.contraseña === "" || regEx.test(loginData?.contraseña) === false) {
            // Preventing default behavior
            e?.preventDefault();
        }

        e?.preventDefault();
        await fetch(`https://localhost:7010/Users/Login`, {
          method: "POST",
          body: JSON.stringify({ 
            userName: loginData?.usuario, 
            passWord: loginData?.contraseña
          }),
          mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((data) => {
          if(data?.hasError === true)
          {
            MySwal.errorMessage("Credenciales Incorrectas")
            return;
          }

          userContext?.returnSetUser(data)
          MySwal.successMessage(`Bienvenido ${data?.firstName}`);
          navigation("/register/choose-category", {
            replace: true,
          })
        })
        .catch((err) => console.error(err))

    }

    return (
        <div 
          className="flex flex-row justify-center items-center flex-wrap min-h-[91vh] w-screen"
           
        >
              <section className="max-w-md md:mt-0 mt-12 w-full md:flex-shrink-0 md:mr-4 mb-4 md:mb-0">
                <div className="max-w-md relative flex flex-col p-4 rounded-md text-black bg-white">
                  
                  {/* Icon */}
                  <section className="absolute items-center -top-[70px] border-8 border-white left-[35%] w-32 h-32 rounded-full bg-white overflow-hidden">
                      <div className="bg-[#7747ff] w-full h-full flex justify-center items-center">
                        <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
                          <path className="text-white" d="M3 13v.5h1V13H3zm8 0v.5h1V13h-1zm-7 0v-.5H3v.5h1zm2.5-3h2V9h-2v1zm4.5 2.5v.5h1v-.5h-1zM8.5 10a2.5 2.5 0 012.5 2.5h1A3.5 3.5 0 008.5 9v1zM4 12.5A2.5 2.5 0 016.5 10V9A3.5 3.5 0 003 12.5h1zM7.5 3A2.5 2.5 0 005 5.5h1A1.5 1.5 0 017.5 4V3zM10 5.5A2.5 2.5 0 007.5 3v1A1.5 1.5 0 019 5.5h1zM7.5 8A2.5 2.5 0 0010 5.5H9A1.5 1.5 0 017.5 7v1zm0-1A1.5 1.5 0 016 5.5H5A2.5 2.5 0 007.5 8V7zm0 7A6.5 6.5 0 011 7.5H0A7.5 7.5 0 007.5 15v-1zM14 7.5A6.5 6.5 0 017.5 14v1A7.5 7.5 0 0015 7.5h-1zM7.5 1A6.5 6.5 0 0114 7.5h1A7.5 7.5 0 007.5 0v1zm0-1A7.5 7.5 0 000 7.5h1A6.5 6.5 0 017.5 1V0z" fill="currentColor">
                          </path>
                        </svg>
                      </div>
                  </section>

                  {/* Title */}
                  <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center mt-[50px]">
                    Bienvenido a <span className="text-[#7747ff]">App</span>
                  </div>
                  
                  <form className="flex flex-col gap-3 relative" onSubmit={handleOnSubmit}>

                    {/* USERNAME FIELD */}
                    <div className="block relative">
                      <label htmlFor="text" className="block text-gray-600 cursor-text leading-[140%] font-normal mb-2">Usuario</label>
                      <input
                        type="text"
                        id="text"
                        className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] transition-all duration-300  focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                        required
                        name="usuario"
                        placeholder='Ej.Juan pablo duarte'
                        onChange={(e) => handleOnChange(e)}
                      />
                      {loginData?.usuario.length !== 0 && loginData?.usuario.length < 3 &&
                        <small className="text-red-500 w-full">¡Oops! Este campo es obligatorio</small>
                      }

                    </div>

                    {/* PASSWORD FIELD */}
                    <div className="block relative">
                      <label className="block text-gray-600 cursor-text leading-[140%] font-normal mb-2 !outline-none">Contraseña</label>
                      <input
                        type="password"
                        name="contraseña"
                        id="password"
                        className="rounded border border-gray-200 w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] transition-all duration-300 focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                        required
                        placeholder='contraseña'
                        onChange={(e) => handleOnChange(e)}
                      />

                      {loginData?.contraseña.length === 0 || regEx.test(loginData?.contraseña) === true ?
                        null :
                        <small className="text-red-500 w-full">¡Oops! La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.</small>
                      }
                    </div>

                    {/* This button perfoms the login method */}
                    <button type="submit" className="mt-5 bg-[#7747ff] w-full m-auto px-6 py-2 rounded text-white text-sm font-normal">
                        Iniciar Sesión
                    </button>

                    {/* This is a divider */}
                    <div className="w-full border border-1 mt-5">
                    </div>

                    {/* This link redirects user to register */}
                    <Link to="/register" className="mt-5 border border-2 border-[#7747ff] text-[#7747ff] w-full m-auto px-6 py-2 rounded text-sm font-normal">
                        Registrate
                    </Link>

                  </form>

                  
                </div>
              </section>

              
          <section className="max-w-md w-96 md:w-auto md:flex-shrink-0 md:ml-4 rounded-3xl overflow-hidden">
            <img src="/home.png" alt="." className="rounded w-full" />
          </section>
        </div>
    )
}