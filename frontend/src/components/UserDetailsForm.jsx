import React, { useState } from 'react';
import { addUser } from '../config/services/userDetails';

const UserDetailsForm = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // Form validation can be added here if needed
      const params = {
        firstName: firstName,
        lastName: lastName,
        email: email,
      };

      let userDetails = await addUser(params)



      // Optionally, you can reset the form fields after submission
      setFirstName('');
      setLastName('');
      setEmail('');
    }
    catch (err) {
      console.error(err, '..error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserDetailsForm;
