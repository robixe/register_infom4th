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
        const response = await fetch('https://infom4th-api.robixe.online/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, pass: hashedPassword }),
        });


        if (response.status === 200) {
          const data = await response.json();

          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);
          localStorage.setItem("loginTimestamp", Date.now()); // Save current timestamp

          // Check authentication status

          if (data.role === "user") {
            window.location.href = '/dashboard';
          } else {
            window.location.href = '/root/';
          }
        } else if (response.status === 409) {
          handleErrorResponse("virifier votre compte");
        } else {
          handleErrorResponse(response);
        }
      } catch (error) {
        setError(error.message || 'An unexpected error occurred.');
      }
    } else {
      setError('Please fill in both email and password fields.');
    }
  };

  const handleErrorResponse = (response) => {
    if (response.status === 400) {
      throw new Error('Bad Request: Missing credentials.');
    } else if (response.status === 401) {
      throw new Error('Unauthorized: Incorrect email or password.');
    } else if (response.status === 500) {
      throw new Error('Server error. Please try again later.');
    } else {
      throw new Error('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="w-full md:w-1/2 relative min-h-screen">
      <div
        className="absolute flex flex-col align-center  inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpeg')" }}
      >
        <div className="absolute inset-0 bg-blue-900 opacity-50" />
        <div className=" flex flex-col justify-center items-center h-full w-full p-10 text-white relative">
          <h2 className="text-3xl font-bold mb-9 ">CONNEXION</h2>
          <form className="flex flex-col lg:w-2/3 w-full" onSubmit={handleSubmit}>
            <label className="text-1xl font-bold mb-2">Email</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              className="p-2  mb-5 text-black rounded-md"
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
              <button type="submit" className="bg-blue-800 text-white lg:px-6 py-2 px-3 rounded-md ">CONNEXION</button>
              <span className="mx-2">OU</span>
              <Link to="/register">
                <button
                  type="button"
                  className="border-2 border-white lg:px-6 py-2 px-3 hover:bg-white hover:text-black rounded-md">INSCRIPTION</button>
              </Link>
            </div>
            <div className="mt-6 text-[12px] flex flex-col items-start w-full">
              <a href="#" className="underline hover:no-underline mb-1 block">Mot de passe oublié ?</a>
              <a href="/root/" className="underline hover:no-underline mb-1 block">Se connecter en Admin</a>
              <a href="#" className="underline hover:no-underline mb-1 block">
                Vous n'avez pas reçu le courriel de confirmation ?
              </a>
              <Link to="/terms" className="underline hover:no-underline block">Informations légales</Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
