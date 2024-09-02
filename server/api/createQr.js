const express = require('express');
const QRCode = require('qrcode');
const mssql = require('mssql');
const router = express.Router();

// Database configuration
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true, // Use encryption if your database requires it
        trustServerCertificate: true // Set to true if you're using a self-signed certificate
    }
};


// /api/create-qr endpoint
router.post('/create-qr', async (req, res) => {
    const { qrId, redirectURL, squareColor, eyeColor } = req.body;

    if (!qrId || !redirectURL || !squareColor || !eyeColor) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const qrOptions = {
            color: {
                dark: squareColor,
                light: '#FFFFFF'
            }
        };
        const qrDataURL = await QRCode.toDataURL(redirectURL, qrOptions);

        const pool = await mssql.connect(dbConfig);
        await pool.request()
            .input('QRId', mssql.NVarChar(100), qrId)
            .input('RedirectURL', mssql.NVarChar(2048), redirectURL)
            .input('SquareColor', mssql.NVarChar(7), squareColor)
            .input('EyeColor', mssql.NVarChar(7), eyeColor)
            .query(`INSERT INTO dbo.QRCodes (QRId, RedirectURL, SquareColor, EyeColor)
                    VALUES (@QRId, @RedirectURL, @SquareColor, @EyeColor)`);

        res.json({ qrDataURL });
    } catch (error) {
        console.error('Error creating QR Code:', error);
        res.status(500).json({ message: 'Error creating QR Code.' });
    }
});

module.exports = router;
