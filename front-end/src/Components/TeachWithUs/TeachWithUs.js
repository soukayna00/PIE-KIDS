import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TeachWithUs.css';

const TeachWithUs = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register-enseignant');
    };

    return (
        <div className="teach-with-us">
            <section className="heros">
                <img id='mario-shell' src="/assets/mario-shell.png" alt="mario-shell" />
                <h1>Teach With Us Unlock your potential. Share your knowledge.</h1>
                <div className='section-1'></div>
            </section>

            <section className="benefits">
                <h2>Why Teach With Us?</h2>
                <div className="benefit">
                    <h3>Reach a Global Audience</h3>
                    <p>Expand your reach beyond your local community and connect with students from around the world.</p>
                </div>
                <div className="benefit">
                    <h3>Earn Passive Income</h3>
                    <p>Generate passive income by sharing your expertise and earning royalties from your courses.</p>
                </div>
                <div className="benefit">
                    <h3>Flexible Schedule</h3>
                    <p>Create your own schedule and teach at your own pace, from anywhere in the world.</p>
                </div>
            </section>
            
            <div className="cta">
                <h2>Ready to Get Started?</h2>
                <p>Join our community of educators and start sharing your knowledge today.</p>
                <button onClick={handleRegisterClick}>Register Now</button>
            </div>
        </div>
    );
};

export default TeachWithUs;
