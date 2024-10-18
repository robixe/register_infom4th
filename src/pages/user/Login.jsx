"use client";

import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (email && password) {
      try {
        const hashedPassword = CryptoJS.MD5(password).toString(); 
        const response = await fetch('https://infom4th-api.robixe.online/log-in', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, pass: hashedPassword }), 
        });

        console.log({ email: email, pass: hashedPassword });
        console.log(response);

       
        if (response.status === 200) {
          const data = await response.json();
          console.log('Login successful:', data);
          localStorage.setItem("Token",data.token);
          // window.location.href = '/form';
        } else if (response.status === 400) {
          throw new Error('Bad Request: Missing credentials.');
        } else if (response.status === 401) {
          throw new Error('Unauthorized: Incorrect email or password.');
        } else if (response.status === 500) {
          throw new Error('Server error. Please try again later.');
        } else {
          throw new Error('An unexpected error occurred. Please try again.');
        }
      } catch (error) {
        setError(error.message || 'An unexpected error occurred.');
      }
    } else {
      setError('Please fill in both email and password fields.');
    }
  };

 
 
  return (
    <div className="flex flex-col md:flex-row bg-white h-screen">
    <div className="w-full md:w-1/2  flex flex-col justify-center items-center p-10">
      <img src="/logo.png" alt="Logo" className="w-[130px] h-[130px] mb-6" />
      <div className="relative mb-6">
          <span className="block w-[100px] h-[8px] bg-blue-600 absolute -bottom-0 -left-12"></span>
        </div>
      <h1 className="text-5xl font-bold text-blue-600 mb-4">BIENVENUE</h1>
      <p className="text-center text-2xl text-gray-900 font-bold mb-8">
        SUR LE PORTAIL DÉDIÉ AUX CANDIDATS !
      </p>
      <p className="text-center text-gray-600 mb-10">
        Tu as sans doute toutes les meilleures raisons du monde pour
        t’inscrire à INFOM4th, ne perds plus de temps.
      </p>
      <button className="bg-black  font-bold text-white px-6 py-3 ">
        DÉPOSE TA CANDIDATURE
      </button>
    </div>

    <div className="w-full md:w-1/2 relative min-h-screen">
    <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/bg.jpeg')" }}
    >
    <div className="absolute inset-0 bg-blue-900 opacity-50" /> 
    <div className="flex flex-col top-5 justify-center items-center p-10 text-white relative mt-20 z-10 ">
      <h2 className="text-3xl font-bold mb-9 ">CONNEXION</h2>
      <form className="flex flex-col w-2/3" onSubmit={handleSubmit}>
      <label className="text-1xl font-bold mb-2" >Email</label>
      <input
         id="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         required
          type="email"
          className="p-2 mb-5 text-black rounded-md"
        />
         <label className="text-1xl font-bold mb-2">Mot de passe</label>
        <input
           id="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           required
          type="password"
          className="p-2 mb-4 text-black rounded-md"
        />
         {error && <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded mb-4">{error}</div>}
        <div className="flex items-center justify-between font-bold lg:text-[17px] text-[14px] rounded-md">
          <button  type="submit" className="bg-blue-800 text-white lg:px-6 py-2 px-3 rounded-md ">CONNEXION</button>
          <span className="mx-2">OU</span>
          <Link to="/register" >
          <button 
          type="button"
          className="border-2 border-white lg:px-6 py-2 px-3 hover:bg-white hover:text-black rounded-md">INSCRIPTION</button>
          </Link>
        </div>
      </form>
      <div className="mt-6 text-[12px] lg:-ml-[22%] ml-[10%]">
       <a href="#" className="underline hover:no-underline mb-1 block">Mot de passe oublié ?</a>
       <a href="/root/" className="underline hover:no-underline mb-1 block">Se connecter en Admin</a>
       <a href="#" className="underline hover:no-underline mb-1 block">
        Vous n'avez pas reçu le courriel de confirmation ?
       </a>
       <Link to="/terms" className="underline hover:no-underline block">Informations légales</Link>
      </div>

    </div>
  </div>
  </div>
</div>
  );
}