// client/src/components/ViewQRCodes.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QRCodeCard from './QRCodeCard';

const ViewQRCodes = () => {
  const [qrCodes, setQrCodes] = useState([]);

  useEffect(() => {
    const fetchQRCodes = async () => {
      try {
        const response = await axios.get('/api/qrcodes');
        setQrCodes(response.data);
      } catch (error) {
        console.error('Error fetching QR codes:', error);
        alert('Failed to fetch QR codes.');
      }
    };

    fetchQRCodes();
  }, []);

  return (
    <div>
      <h2>All QR Codes</h2>
      <div>
        {qrCodes.map((qr) => (
          <QRCodeCard key={qr.QRId} qr={qr} />
        ))}
      </div>
    </div>
  );
};

export default ViewQRCodes;
