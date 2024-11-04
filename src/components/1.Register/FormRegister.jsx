import React, { useState } from 'react';
import MD5 from 'crypto-js/md5';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage(false);

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
          setSuccessMessage(true);
          // window.location.href = '/';
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
    <div className="w-full md:w-1/2 relative min-h-screen">
    <div className="absolute inset-0 bg-cover bg-center w-full" style={{ backgroundImage: "url('/bg.jpeg')" }}>
      <div className="absolute inset-0 bg-blue-900 opacity-60" />
       {/* Centered Success Message */}
       {successMessage && (
          <div className="fixed inset-0 flex items-center text-center justify-center z-50">
            <div className=" w-[22%] h-[17%]  bg-indigo-100  text-indigo-800 border border-indigo-300 p-6 rounded-xl shadow-xl relative">
              <span className='font-medium '>Check your email to verify your account before logging in.</span>
              <button onClick={() => { setSuccessMessage(false); navigate('/'); }} className="absolute top-1 right-2 text-xl font-bold">
                &times;
              </button>
            </div>
          </div>
        )}
      <div className="flex flex-col justify-center items-center w-full h-full p-10 text-white relative lg:mt-2 mt-[60px] z-10">
        <h2 className="text-3xl font-bold mb-9">INSCRIPTION</h2>
        <form className="flex flex-col lg:w-2/3 w-[100%]" onSubmit={handleSubmit}>
          {/* Input fields */}
          <label className="text-[13px] font-bold mb-2">Name</label>
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} required className="p-1 mb-4 text-black rounded-md" />

          <label className="text-[13px] font-bold mb-2">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-1 mb-4 text-black rounded-md" />

          <label className="text-[13px] font-bold mb-2">Mot de passe</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="p-1 mb-4 text-black rounded-md" />

          <label className="text-[13px] font-bold mb-2">Confirmation du mot de passe</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="p-1 mb-4 text-black rounded-md" />

          {/* Error message */}
          {error && <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded mb-4">{error}</div>}

          {/* Checkbox */}
          <div className="flex items-center mb-4">
            <input type="checkbox" required className="mr-2" />
            <label className="text-[12px]">
              J'ai lu, compris et accepté les{" "}
              <Link to="/terms" className="text-blue-400 underline">politiques et conditions</Link> de la plateforme.
            </label>
          </div>

          {/* Submit buttons */}
          <div className="flex items-center justify-between font-bold lg:text-[15px] text-[14px] rounded-md">
            <button type="submit" className="bg-blue-800 text-white lg:px-6 py-2 px-3 rounded-md">INSCRIPTION</button>
            <span className="mx-2">OU</span>
            <Link to="/">
              <button type="button" className="border-2 border-white lg:px-6 py-2 px-3 hover:bg-white hover:text-black rounded-md">CONNEXION</button>
            </Link>
          </div>
          <div className="mt-6 text-[12px] w-full">
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
