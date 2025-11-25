import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div className="home page">
      <section className="hero">
        <p className="stat-label">Citizen-to-NGO bridge</p>
        <h1>Discover, support, and amplify grassroots impact in minutes.</h1>
        <p>
          JanConnect brings together curated NGOs, transparent donation tracking, and
          volunteering opportunities so every good intention turns into action.
        </p>
        <div className="cta-row">
          <Link to="/ngos" className="primary-btn">Explore verified NGOs</Link>
          <Link to="/register" className="ghost-btn">Create an account</Link>
        </div>
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-label">Active NGOs</span>
            <span className="stat-value">100+</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Citizens engaged</span>
            <span className="stat-value">8K+</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Raised so far</span>
            <span className="stat-value">₹2.4Cr</span>
          </div>
        </div>
      </section>

      <section className="feature-grid">
        <div className="feature-card">
          <h3>Smart discovery</h3>
          <p>Filter NGOs by cause, city, or SDG focus and bookmark your favourites.</p>
        </div>
        <div className="feature-card">
          <h3>Volunteer journeys</h3>
          <p>Track opportunities and stay notified about upcoming drives and events.</p>
        </div>
        <div className="feature-card">
          <h3>Transparent donations</h3>
          <p>Every donation is logged with instant receipts and NGO acknowledgements.</p>
        </div>
        <div className="feature-card">
          <h3>Admin moderation</h3>
          <p>NGO submissions are reviewed and verified to keep the platform trustworthy.</p>
        </div>
      </section>
    </div>
  );
}


