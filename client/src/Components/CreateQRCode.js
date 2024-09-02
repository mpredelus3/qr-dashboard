import React, { useState } from 'react';
import axios from 'axios';

function CreateQRCode() {
    const [qrId, setQrId] = useState('');
    const [redirectURL, setRedirectURL] = useState('');
    const [squareColor, setSquareColor] = useState('#000000');
    const [eyeColor, setEyeColor] = useState('#000000');
    const [qrCode, setQrCode] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/create-qr', {
                qrId,
                redirectURL,
                squareColor,
                eyeColor
            });
            setQrCode(response.data.qrDataURL);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Create QR Code</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="QR ID" value={qrId} onChange={(e) => setQrId(e.target.value)} required />
                <input type="url" placeholder="Redirect URL" value={redirectURL} onChange={(e) => setRedirectURL(e.target.value)} required />
                <input type="color" value={squareColor} onChange={(e) => setSquareColor(e.target.value)} required />
                <input type="color" value={eyeColor} onChange={(e) => setEyeColor(e.target.value)} required />
                <button type="submit">Generate QR Code</button>
            </form>
            {qrCode && (
                <div>
                    <h3>QR Code:</h3>
                    <img src={qrCode} alt="QR Code" />
                </div>
            )}
        </div>
    );
}

export default CreateQRCode;
