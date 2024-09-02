import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QRCodeCard from './QRCodeCard';

function ViewQRCodes() {
    const [qrCodes, setQrCodes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5001/api/qrcodes')
            .then((response) => {
                setQrCodes(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>All QR Codes</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {qrCodes.map((qrCode) => (
                    <QRCodeCard key={qrCode.QRId} qrCode={qrCode} />
                ))}
            </div>
        </div>
    );
}

export default ViewQRCodes;
