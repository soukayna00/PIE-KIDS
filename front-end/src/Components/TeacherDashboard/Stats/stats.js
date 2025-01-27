import React from 'react';
import './stats.css'

const Stats = () => {
  return (
    <section className="stats">
      <div className="card">
        <h3>Mario Dance</h3>
        <img id='mario-dance' src="/assets/dance.gif" alt="Cute animal" />
      </div>
      <div className="card">
        <h3>Average Rating</h3>
        <p>4.8/5</p>
      </div>
      <div className="card">
        <h3>Total Students</h3>
        <p>5622</p>
      </div>
    </section>
  );
};

export default Stats;
