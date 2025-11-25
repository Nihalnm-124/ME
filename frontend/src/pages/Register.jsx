import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../utils/api';

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('citizen');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password, role });
      alert('Registration successful');
      nav('/login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="page auth-page">
      <h2>Register</h2>
      <form onSubmit={submit} className="auth-form">
        <input required placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
        <input required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="citizen">Citizen</option>
          <option value="volunteer">Volunteer</option>
          <option value="ngo">NGO</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}



