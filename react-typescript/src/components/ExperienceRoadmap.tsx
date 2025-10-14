import React from 'react';

const roadmapItems = [
  {
    title: 'Shared Domain Models',
    detail:
      'Export TypeScript interfaces for Products, Orders, and Users so Flutter (Dart) clients can generate matching models.'
  },
  {
    title: 'Firebase Federation',
    detail:
      'Use Firebase Authentication + Firestore to synchronize inventory and orders between web and mobile touchpoints.'
  },
  {
    title: 'Analytics Bridge',
    detail:
      'Emit privacy-aware events to Firebase Analytics / BigQuery while keeping the static preview isolated for experimentation.'
  }
] as const;

export const ExperienceRoadmap: React.FC = () => (
  <section aria-labelledby="roadmap-title">
    <h2 id="roadmap-title">Cross-Platform Delivery Roadmap</h2>
    <ul>
      {roadmapItems.map((item) => (
        <li key={item.title}>
          <strong>{item.title}:</strong> {item.detail}
        </li>
      ))}
    </ul>
  </section>
);
