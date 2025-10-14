import React from 'react';
import { Landing } from './components/Landing';
import { ExperienceRoadmap } from './components/ExperienceRoadmap';

export const App: React.FC = () => {
  return (
    <div className="app-shell">
      <Landing />
      <ExperienceRoadmap />
    </div>
  );
};
