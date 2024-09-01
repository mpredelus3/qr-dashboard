// client/src/components/CreateQRCode.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateQRCode = () => {
  const [qrId, setQrId] = useState('');
  const [redirectURL, setRedirectURL] = useState('');
  const [squareColor, setSquareColor] = useState('#000000');
  const [eyeColor, setEyeColor] = useState('#000000');
  const [qrDataURL, setQrDataURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { qrId, redirectURL, squareColor, eyeColor };

    try {
      const response = await axios.post('/api/create-qr', payload);
      setQrDataURL(response.data.qrDataURL);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Failed to generate QR code.');
    }
  };

  return (
    <div>
      <h2>Create QR Code</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="QR ID"
          value={qrId}
          onChange={(e) => setQrId(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Redirect URL"
          value={redirectURL}
          onChange={(e) => setRedirectURL(e.target.value)}
          required
        />
        <label>
          Square Color:
          <input
            type="color"
            value={squareColor}
            onChange={(e) => setSquareColor(e.target.value)}
            required
          />
        </label>
        <label>
          Eye Color:
          <input
            type="color"
            value={eyeColor}
            onChange={(e) => setEyeColor(e.target.value)}
            required
          />
        </label>
        <button type="submit">Generate QR Code</button>
      </form>
      {qrDataURL && (
        <div>
          <h3>Your QR Code:</h3>
          <img src={qrDataURL} alt="Generated QR Code" />
        </div>
      )}
    </div>
  );
};

export default CreateQRCode;
