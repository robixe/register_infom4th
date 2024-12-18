import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Link } from 'react-router-dom';


export default function FormLoginAdmin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (email && password) {
            try {
                const hashedPassword = CryptoJS.MD5(password).toString();
                const response = await fetch('https://infom4th-api-v2.robixe.online/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email, pass: hashedPassword }),
                });


                if (response.ok) {
                    const data = await response.json();

                    console.log(data)
                    localStorage.setItem("token", data.token);

                    if (data.role == "root") {
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("role", data.role);
                        localStorage.setItem("loginTimestamp", Date.now());
                        window.location.href = '/root/dashboard';
                    }else{
                        window.location.href = '/';
                    }
                } else {
                    handleResponseError(response);
                }
            } catch (error) {
                setError(error.message || 'An unexpected error occurred.');
            }
        } else {
            setError('Please fill in both email and password fields.');
        }
    };

    const handleResponseError = (response) => {
        if (response.status === 400) {
            setError('Bad Request: Missing credentials.');
        } else if (response.status === 401) {
            setError('Unauthorized: Incorrect email or password.');
        } else if (response.status === 500) {
            setError('Server error. Please try again later.');
        } else {
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (      
            <div className="w-full md:w-1/2 relative min-h-screen">
            <div className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/bg.jpeg')" }}>
             <div className="absolute inset-0 bg-blue-900 opacity-50  w-full" />
                    <div className=" flex flex-col justify-center items-center h-full w-full p-10 text-white relative">
                        <h2 className="lg:text-3xl text-2xl font-bold mb-9 lg:ml-0 text-center">CONNEXION ADMINISTRATEUR</h2>
                        <form className="flex flex-col md:w-2/3 w-full  " onSubmit={handleSubmit}>
                            <label className="text-1xl font-bold mb-2">Email</label>
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
                                <button type="submit" className="bg-blue-800 text-white lg:px-6 py-2 px-3 rounded-md w-full">CONNEXION</button>
                            </div>
                        </form>
                        <div className="mt-6 text-[12px] lg:-ml-[50%] ml-[20%]">
                            <Link to="/forget">
                                <span className="underline hover:no-underline mb-1 block">Mot de passe oublié ?</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
    );
}
