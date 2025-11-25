import React, { useState, useEffect } from 'react';
import { fetchNGOs } from '../utils/api';
import NGOCard from '../components/NGOCard';

export default function NGOList() {
  const [ngos, setNgos] = useState([]);
  const [q, setQ] = useState('');

  const load = async () => {
    try {
      const res = await fetchNGOs({ q });
      setNgos(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="page">
      <h2>Impact directory</h2>
      <p className="muted">Browse verified nonprofits by cause, city, or keyword.</p>
      <div className="search-row">
        <input
          placeholder="Search NGOs by name, cause or location"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <button className="primary-btn" onClick={load}>Search</button>
      </div>
      {ngos.length === 0 ? (
        <div className="panel">
          <p>No NGOs match your filters. Try a different search term.</p>
        </div>
      ) : (
        <div className="grid">
          {ngos.map(n => <NGOCard key={n._id} ngo={n} />)}
        </div>
      )}
    </div>
  );
}


