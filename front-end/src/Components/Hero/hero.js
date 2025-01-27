import React from 'react';
import './hero.css';

const Hero = () => {
  return (
    <>
      <section className="hero">
        <img id='money-cat' src="/assets/mario.png" alt="Cute animal" />
        <p>Teach Your kids Money Habits </p>
      </section>

      <section className="our-objective">
        <div className="containert">
          <h2>Our Objective</h2>
          <p>Our objective is to instill healthy money habits in children from an early age. We believe that by providing engaging educational content and interactive experiences, we can empower children to develop a strong financial mindset that will benefit them throughout their lives.</p>
        </div>
        <img id='mario-throw' src="/assets/mario-punch.png" alt="Cute animal" />

      </section>

      <section className="features">
        <div className="containerte">
        <img id='toad' src="/assets/toad.png" alt="Cute animal" />

        <div className='test'>

          <h2>Key Features</h2>
          <ul>
            <li>Interactive lessons on financial literacy</li>
            <li>Engaging activities and games</li>
            <li>Progress tracking for parents and educators</li>
            <li>Community forums for sharing tips and experiences</li>
          </ul>
          </div>

        </div>
      </section>

      <section className="how-it-works">
        <div className="containert">
          <h2>How It Works ?</h2>
          <p>Our platform offers a user-friendly interface where children can explore various topics related to money management. They can access interactive lessons, complete activities, and track their progress over time. Parents and educators can also monitor their child's achievements and provide support as needed.</p>
        </div>
      </section>

      {/* Add more sections as needed */}
    </>
  );
};

export default Hero;
