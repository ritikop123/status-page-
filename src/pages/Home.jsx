import React from 'react';
import Hero from '../components/Hero';
import PlanCalculator from '../components/PlanCalculator';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <main>
      <Hero />
      <Testimonials />
      <PlanCalculator />
    </main>
  );
};

export default Home;
