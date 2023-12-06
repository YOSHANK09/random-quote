// LoginSignup.js
import React, { useState } from 'react';
import './LoginSignup.css'; // You can create a separate CSS file for styling

// Functional component for handling login/signup
const LoginSignup = ({ onClose, onLogin }) => {
  // State variables for username, password, and login/signup mode
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Function to toggle between login and signup modes
  const handleToggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  // Function to handle form submission (login or signup)
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // You can add your authentication logic here
    // For simplicity, let's assume the login is successful

    // In a real-world scenario, you would typically connect to a backend server for authentication
    // For demonstration purposes, let's just pass a dummy user object to the onLogin callback

    const user = {
      username,
      // Additional user details if needed
    };

    // Call the onLogin callback with the user object
    onLogin(user);
  };

  // JSX for rendering the component
  return (
    <div className="login-signup-container">
      {/* Close button */}
      <button className="close-button" onClick={onClose}>
        &#10006; {/* This is the HTML entity for the 'x' symbol */}
      </button>

      {/* Form for login/signup */}
      <form onSubmit={handleFormSubmit}>
        <h2>{isLoginMode ? 'Login' : 'Sign Up'}</h2>
        {/* Input field for entering the username */}
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {/* Input field for entering the password */}
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {/* Button for submitting the form (login or signup) */}
        <button type="submit">{isLoginMode ? 'Login' : 'Sign Up'}</button>
        {/* Message to switch between login and signup modes */}
        <p onClick={handleToggleMode}>
          {isLoginMode ? 'Don\'t have an account? Sign up here.' : 'Already have an account? Login here.'}
        </p>
      </form>
    </div>
  );
};

export default LoginSignup;
