import React from 'react';

function QRCodeCard({ qrCode }) {
    return (
        <div>
            <h3>{qrCode.QRId}</h3>
            <p>Redirect URL: {qrCode.RedirectURL}</p>
            <p>Square Color: {qrCode.SquareColor}</p>
            <p>Eye Color: {qrCode.EyeColor}</p>
            <p>Created At: {qrCode.CreatedAt}</p>
        </div>
    );
}

export default QRCodeCard;
