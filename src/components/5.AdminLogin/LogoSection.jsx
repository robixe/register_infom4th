import React from 'react';

export default function LogoSection() {
    return (
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10">
        <img src="/logo.png" alt="Logo" className="w-[130px] h-[130px] mb-6" />
        <div className="relative mb-6">
            <span className="block w-[100px] h-[8px] bg-blue-600 absolute -bottom-0 -left-12"></span>
        </div>
        <h1 className="text-5xl font-bold text-blue-600 mb-4 text-center">BIENVENUE ADMIN</h1>
        <p className="text-center text-2xl text-gray-900 font-bold mb-8">
            SUR LE PORTAIL DÉDIÉ AUX ADMINISTRATEURS !
        </p>
        <p className="text-center text-gray-600 mb-10">
            Connectez-vous pour gérer les fonctionnalités de l'application.
        </p>
       <div className="lg:bottom-4 justify-center items-center ">
        <a
         href="https://www.instagram.com/robixe.online/"
         target="_blank"
         rel="noopener noreferrer"
         className="flex space-x-2 hover:text-blue-800" >
       <img src="/Robixe.png" alt="Robixe Logo" className="w-6 h-6 -mt-1 " />
        <span className="text-[12px] font-bold ">Developed by Robixe</span>
      </a>
    </div>
     </div>
    )

}
