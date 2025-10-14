import React from 'react';

export const Landing: React.FC = () => (
  <section aria-labelledby="landing-title">
    <h1 id="landing-title">Marxia Café Ops – React Prototype</h1>
    <p>
      This React shell mirrors the static preview experience and will evolve into the authenticated commerce surface.
      Inventory, cart, and checkout logic will connect to Firebase and Cloudflare Workers while keeping PCI data off the client.
    </p>
  </section>
);
