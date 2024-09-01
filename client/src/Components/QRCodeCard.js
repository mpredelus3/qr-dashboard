// client/src/components/QRCodeCard.js
import React from 'react';

const QRCodeCard = ({ qr }) => {
  return (
    <div style={cardStyle}>
      <h3>{qr.QRId}</h3>
      <img src={`/scan/${encodeURIComponent(qr.QRId)}`} alt="QR Code" />
      <p>Redirect URL: <a href={qr.RedirectURL} target="_blank" rel="noopener noreferrer">{qr.RedirectURL}</a></p>
      <p>Square Color: <span style={{ backgroundColor: qr.SquareColor, padding: '5px' }}>{qr.SquareColor}</span></p>
      <p>Eye Color: <span style={{ backgroundColor: qr.EyeColor, padding: '5px' }}>{qr.EyeColor}</span></p>
      <p>Created At: {new Date(qr.CreatedAt).toLocaleString()}</p>
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '8px',
  boxShadow: '2px 2px 12px #aaa',
};

export default QRCodeCard;
