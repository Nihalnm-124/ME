import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNGO, createDonation } from '../utils/api';

export default function NGODetail() {
  const { id } = useParams();
  const [ngo, setNgo] = useState(null);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchNGO(id);
        setNgo(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  const donate = async () => {
    try {
      await createDonation({ donorName, donorEmail, amount: Number(amount), ngoId: id });
      alert('Donation recorded (simulated). Thank you!');
      setDonorName('');
      setDonorEmail('');
      setAmount('');
    } catch (err) {
      console.error(err);
      alert('Donation failed');
    }
  };

  if (!ngo) return <div className="page">Loading...</div>;
  return (
    <div className="page detail-card">
      <div className="detail-header">
        <div>
          <p className="stat-label">{ngo.cause}</p>
          <h2>{ngo.name}</h2>
          <p className="muted">{ngo.location || 'Multiple locations'}</p>
        </div>
        {ngo.website && <a href={ngo.website} target="_blank" rel="noreferrer" className="ghost-btn">Visit website</a>}
      </div>
      <p className="desc">{ngo.description}</p>
      <div className="badge" style={{marginTop:12}}>{ngo.contactEmail || 'contact@ngo.org'}</div>

      <section className="donate-box">
        <h3>Support this NGO</h3>
        <p className="muted">Simulated flow for demo purposes.</p>
        <input placeholder="Your name" value={donorName} onChange={e => setDonorName(e.target.value)} />
        <input placeholder="Your email" value={donorEmail} onChange={e => setDonorEmail(e.target.value)} />
        <input placeholder="Amount (₹)" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        <button className="primary-btn" onClick={donate}>Donate</button>
      </section>
    </div>
  );
}


