import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QRCodeCard from './QRCodeCard';

function ViewQRCodes() {
    const [qrCodes, setQrCodes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/api/qrcodes')
            .then((response) => setQrCodes(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h2>All QR Codes</h2>
            <div>
                {qrCodes.map((qrCode) => (
                    <QRCodeCard key={qrCode.QRId} qrCode={qrCode} />
                ))}
            </div>
        </div>
    );
}

export default ViewQRCodes;
