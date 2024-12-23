import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18+ uses createRoot
import App from './App';  // Your main component
import './index.css'; // Your CSS file (if needed)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />  {/* Your main App component */}
  </React.StrictMode>
);
