import React, { useState } from 'react';
import MD5 from 'crypto-js/md5'; 
import { Link } from 'react-router-dom';

export default function Register() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (user && email && password) {
      const hashedPassword = MD5(password).toString();
    try {
      const response = await fetch('https://infom4th-api.robixe.online/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user, email: email, pass: hashedPassword }),
      });

      // Check for successful registration
      if (response.status === 201) {
        window.location.href = '/'; 
      } else {
        // Handle non-successful responses
        const errorData = await response;
        console.error('Error data:', errorData);
        setError('Registration failed: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Registration failed. Please try again.');
    }
  } else {
    setError('Please fill all fields.');
  }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
    <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-10">
      <img src="/logo.png" alt="Logo" className="w-[130px] h-[130px] mb-6" />
      <div className="relative mb-6">
          <span className="block w-[100px] h-[8px] bg-blue-600 absolute -bottom-0 -left-12"></span>
        </div>
      <h1 className="text-5xl font-bold text-blue-600 mb-4">BIENVENUE</h1>
      <p className="text-center text-2xl font- font-bold mb-8">
        SUR LE PORTAIL DÉDIÉ AUX CANDIDATS !
      </p>
      <p className="text-center text-gray-600 mb-10">
        Tu as sans doute toutes les meilleures raisons du monde pour
        t’inscrire à INFOM4th, ne perds plus de temps.
      </p>
      <button className="bg-black  font-bold text-white px-6 py-3 ">
        DÉPOSE TA CANDIDATURE
      </button> 
      <div className="justify-center items-center mt-8">
           <a
            href="https://www.instagram.com/robixe.online/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex space-x-2 hover:text-blue-800"
            >
           <img src="/Robixe.png" alt="Robixe Logo" className="w-6 h-6  -mt-1 " />
            <span className="text-[12px] font-bold ">Developed by Robixe</span>
          </a>
       </div>
    </div>

    <div className="w-full md:w-1/2 relative min-h-screen">
    <div
    className="absolute inset-0 bg-cover bg-center w-full"
    style={{ backgroundImage: "url('/bg.jpeg')" }}
    >
    <div className="absolute inset-0 bg-blue-900 opacity-60" /> 
    <div className="flex flex-col justify-center items-center p-10 text-white relative lg:mt-2 mt-[60px] z-10 ">
      <h2 className="text-3xl font-bold mb-9 ">INSCRIPTION</h2>
      <form className="flex flex-col lg:w-2/3 w-[100%]  " onSubmit={handleSubmit}>
      <label className="text-[13px] font-bold mb-2" >Name</label>
        <input
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          type='text'
         required
         className="p-1 mb-4 text-black rounded-md"
        />
      <label className="text-[13px] font-bold mb-2" >Email</label>
        <input
         id="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         type="email"
         required
         className="p-1 mb-4 text-black rounded-md"
        />
      <label className="text-[13px] font-bold mb-2">Mot de passe</label>
        <input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          className="p-1 mb-4 text-black rounded-md"
        />
      <label className="text-[13px] font-bold mb-2">Confirmation du mot de passe</label>
      <input
         id="confirmPassword"
         value={confirmPassword}
         required
         onChange={(e) => setConfirmPassword(e.target.value)}
        type="password" className="p-1 mb-4 text-black rounded-md"/>
        
       {error && <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded mb-4">{error}</div>}
      <div className="flex items-center mb-4">
      <input required type="checkbox" className="mr-2"/>
      <label  className="text-[12px]">
        J'ai lu, compris et accepté les{" "}
        <a href='/terms' className="text-blue-400 underline hover:no-underline hover:cursor-pointer" >
          politiques et conditions
        </a>{" "}
        de la plateforme.
      </label>
      </div>
        <div className="flex items-center justify-between font-bold lg:text-[15px] text-[14px] rounded-md">
          <button type="submit" className="bg-blue-800 text-white lg:px-6 py-2 px-3 rounded-md ">INSCRIPTION</button>
          <span className="mx-2">OU</span>
          <Link to="/" >
          <button 
          type="button"
          className="border-2 border-white lg:px-6 py-2 px-3 hover:bg-white hover:text-black rounded-md">CONNEXION</button>
          </Link>
        </div>
      </form>
      <div className="mt-6 text-[12px] lg:-ml-[22%] -ml-[1%]">
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