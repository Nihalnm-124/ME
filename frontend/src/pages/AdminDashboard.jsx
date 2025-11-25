import React, { useEffect, useState } from 'react';
import {
  adminFetchNGOs,
  adminVerifyNGO,
  adminFetchDonations,
  adminFetchUsers,
  adminAnalytics
} from '../utils/api';

export default function AdminDashboard(){
  const [ngos, setNgos] = useState([]);
  const [donations, setDonations] = useState([]);
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadAll(){
    setLoading(true);
    try{
      const [nRes, dRes, uRes, aRes] = await Promise.all([
        adminFetchNGOs(),
        adminFetchDonations(),
        adminFetchUsers(),
        adminAnalytics()
      ]);
      setNgos(nRes.data);
      setDonations(dRes.data.donations || []);
      setUsers(uRes.data);
      setAnalytics(aRes.data);
    }catch(err){
      console.error(err);
      alert('Failed to load admin data. Make sure you are logged in as admin.');
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{ loadAll(); }, []);

  const toggleVerify = async (id, v) => {
    try{
      await adminVerifyNGO(id, v);
      await loadAll();
    }catch(err){
      console.error(err);
      alert('Failed to update NGO status');
    }
  };

  return (
    <div className="page">
      <h2>Admin Dashboard</h2>
      {loading && <p>Loading...</p>}

      <section style={{marginTop:20}}>
        <h3>Analytics</h3>
        {analytics ? (
          <div style={{display:'flex',gap:12}}>
            <div className="card">NGOs: {analytics.ngosCount}</div>
            <div className="card">Verified: {analytics.verifiedCount}</div>
            <div className="card">Users: {analytics.usersCount}</div>
            <div className="card">Donations: {analytics.donationsSummary.count} ({analytics.donationsSummary.total})</div>
          </div>
        ) : <p>No analytics</p>}
      </section>

      <section style={{marginTop:24}}>
        <h3>Pending / All NGOs</h3>
        <div>
          {ngos.length===0 ? <p>No NGOs</p> : ngos.map(n => (
            <div key={n._id} style={{border:'1px solid #eee', padding:12, marginBottom:8, borderRadius:6}}>
              <strong>{n.name}</strong> — <span style={{color:'#666'}}>{n.cause} • {n.location}</span>
              <p>{n.description}</p>
              <div>
                <span style={{marginRight:8}}>Verified: {n.verified ? 'Yes' : 'No'}</span>
                <button onClick={()=>toggleVerify(n._id, true)} style={{marginRight:8}}>Approve</button>
                <button onClick={()=>toggleVerify(n._id, false)}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{marginTop:24}}>
        <h3>Recent Donations</h3>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{textAlign:'left'}}>
              <th>Donor</th><th>Amount</th><th>NGO</th><th>Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map(d => (
              <tr key={d._id}>
                <td>{d.donorName} ({d.donorEmail || '-'})</td>
                <td>{d.amount}</td>
                <td>{d.ngo ? d.ngo.name : '—'}</td>
                <td>{new Date(d.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{marginTop:24}}>
        <h3>Users</h3>
        <div>
          {users.map(u => (
            <div key={u._id} style={{border:'1px solid #f0f0f0', padding:8, borderRadius:6, marginBottom:6}}>
              <strong>{u.name}</strong> — {u.email} — <em>{u.role}</em>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}



