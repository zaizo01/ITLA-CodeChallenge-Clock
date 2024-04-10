import React from 'react';

function Navbar() {
    const [usuario] = React.useState(() => {
        const val = localStorage.getItem("user");
        if (val) {
          try {
            return JSON.parse(val).firstName ?? null;
          } catch (error) {
            console.error("Error parsing user data:", error);
          }
        }
        return null;
      });

if(usuario == null){
    return ;
}




  return (
    <nav className="bg-white w-60  rounded-5 border-gray-200 dark:bg-gray-900">
      <div className="w-20 flex flex-wrap items-center justify-between  p-4">

        <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
          <div className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
            <img src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="." className="w-10" />
            <label className="ml-2"> {usuario} </label> 
          </div>
    
        </div>
        
      </div>
    </nav>
  );
}

export default Navbar;
