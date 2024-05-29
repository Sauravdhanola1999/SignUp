import React, { FormEvent, useState } from 'react';
import PopUp from './PopUp';
import * as yup from 'yup';
import './index.css';


const SignUp: React.FC = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // Define the validation schema
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required('Password is required'),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      await schema.validate({ email, password }, { abortEarly: false });
      setMessage('You Have Been Logged In Successfully');
      setIsPopUpOpen(true);
      setLoggedIn(true);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(err.errors.join(' '));
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
    setEmail('');
    setPassword('');
    setMessage('');
    setError('');
  };


  return (
    <div className="flex justify-center items-center h-screen bg-blue-500">
      <form className="bg-white w-[300px] shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        {loggedIn? <p className="text-green-500 text-xs italic">You Are Logged in</p> : 
        <p className="text-red-500 text-xs italic">You Are Not Logged In</p>}
        <div className="flex items-center justify-between mt-5">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign In
          </button>
        </div>
      </form>
      <PopUp message={message} isOpen={isPopUpOpen} onClose={closePopUp} />
    </div>
  );
};

export default SignUp;
