import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateQRCode from './Components/CreateQRCode';
import ViewQRCodes from './Components/ViewQRCodes';
import './App.css'

function App() {
  return (
      <Router>
          <nav>
              <ul>
                  <li><Link to="/">Create QR Code</Link></li>
                  <li><Link to="/view">View All QR Codes</Link></li>
              </ul>
          </nav>
          <Routes>
              <Route path="/" element={<CreateQRCode />} />
              <Route path="/view" element={<ViewQRCodes />} />
          </Routes>
      </Router>
  );
}

export default App;