import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Find the root element
const rootElement = document.getElementById('root');

// Create a root and render the App component
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
