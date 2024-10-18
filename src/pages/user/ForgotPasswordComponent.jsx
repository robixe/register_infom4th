import React, { useState } from 'react';

const ForgotPasswordComponent = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Veuillez entrer une adresse e-mail valide.');
      return;
    }

    try {
      // Prepare the WhatsApp message
      const messageToSend = `J'ai oublié mon mot de passe. Mon adresse e-mail est : ${email}`;
      const phoneNumber = '+212688267253'; // WhatsApp phone number
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(messageToSend)}`;
      
      // Open WhatsApp with the prepared message
      window.open(whatsappUrl, '_blank');

      setMessage('Un lien de réinitialisation de mot de passe a été envoyé à votre WhatsApp');
    } catch (error) {
      // Handle any potential errors
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Error sending WhatsApp message:', error);
    }
  };

  return (
    <div className="max-w-md m-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Mot de passe oublié</h1>

      {message && <div className="text-green-600 mb-4">{message}</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Adresse e-mail
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Entrez votre adresse e-mail"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Réinitialiser le mot de passe
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordComponent;
