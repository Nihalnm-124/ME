import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMe } from '../utils/api';

export default function Navbar(){
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(()=>{
    if (!token) return;
    (async ()=>{
      try{
        const res = await getMe();
        if (res.data?.role === 'admin') setIsAdmin(true);
      }catch(err){
        setIsAdmin(false);
      }
    })();
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">JanConnect</Link>
        <Link to="/ngos" className="nav-link">Discover</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
      </div>
      <div className="nav-right">
        {isAdmin && <Link to="/admin" className="nav-link">Admin</Link>}
        {token ? (
          <button className="ghost-btn" onClick={logout}>Sign out</button>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="primary-btn">Join JanConnect</Link>
          </>
        )}
      </div>
    </nav>
  );
}

