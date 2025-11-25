import React from 'react';
import { Link } from 'react-router-dom';

export default function NGOCard({ ngo }){
  const summary = (ngo.description || '').slice(0, 120);
  return (
    <div className="ngo-card">
      <img src={ngo.image || '/placeholder.png'} alt={ngo.name} className="ngo-thumb" />
      <div className="badge">{ngo.cause || 'Impact'}</div>
      {ngo.verified && <div className="badge success">Verified</div>}
      <div className="ngo-info">
        <h3><Link to={`/ngos/${ngo._id}`}>{ngo.name}</Link></h3>
        <p className="muted">{ngo.location || 'Across India'}</p>
        <p className="desc">
          {summary}{ngo.description && ngo.description.length > 120 ? '…' : ''}
        </p>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:12}}>
          <span className="muted">{ngo.contactEmail || 'Contact details on profile'}</span>
          <Link to={`/ngos/${ngo._id}`} className="ghost-btn" style={{padding:'6px 14px'}}>View</Link>
        </div>
      </div>
    </div>
  );
}


