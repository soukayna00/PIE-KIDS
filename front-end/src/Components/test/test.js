import React from 'react';
import './hero.css';


const Hero = () => {
  return (
    <>
    <section className="hero">
    {/* =========================================================================== */}     
     <div className="Cards">
{/* --------------------------------------------------------------------------- */}

     <div className='Card'>
       <img id='money-cat' src="/assets/bk1.jpg" alt="Cute animal" />
        <div className='bottom'>
            <h3>Ipsum is 01 25</h3>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,</p>
            <button className='CtaBtn1'>Learn More <img id='row' src="/assets/row.png" alt="Cute animal" /></button>
        </div>
     </div>
{/* --------------------------------------------------------------------------- */}
     <div className='Card'>
       <img id='money-cat' src="/assets/bk1.jpg" alt="Cute animal" />
        <div className='bottom'>
            <h3>Ipsum is 01 25</h3>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,</p>
            <button className='CtaBtn1'>Learn More <img id='row' src="/assets/row.png" alt="Cute animal" /></button>
        </div>
     </div>
{/* --------------------------------------------------------------------------- */}

     <div className='Card'>
       <img id='money-cat' src="/assets/bk1.jpg" alt="Cute animal" />
        <div className='bottom'>
            <h3>Ipsum is 01 25</h3>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,</p>
            <button className='CtaBtn1'>Learn More <img id='row' src="/assets/row.png" alt="Cute animal" /></button>
        </div>
     </div>
{/* --------------------------------------------------------------------------- */}

     </div>


   {/* =========================================================================== */}
   
    </section>
  
    </>
  );
};

export default Hero;
