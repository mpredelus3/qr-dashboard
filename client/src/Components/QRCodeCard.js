import React from 'react';

function QRCodeCard({ qrCode }) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '200px' }}>
            <h3>{qrCode.QRId}</h3>
            <p><strong>URL:</strong> {qrCode.RedirectURL}</p>
            <p><strong>Square Color:</strong> {qrCode.SquareColor}</p>
            <p><strong>Eye Color:</strong> {qrCode.EyeColor}</p>
            <p><strong>Created At:</strong> {qrCode.CreatedAt}</p>
            <img src={`http://localhost:5001/qr/${qrCode.QRId}`} alt="QR Code" />
        </div>
    );
}

export default QRCodeCard;
