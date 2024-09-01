// server/index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const QRCode = require('qrcode');
const mssql = require('mssql');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database configuration
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// Connect to the database
mssql.connect(dbConfig).then(pool => {
    if (pool.connecting) {
        console.log('Connecting to the database...');
    }
    if (pool.connected) {
        console.log('Connected to the database.');
    }
    return pool;
}).catch(err => console.error('Database Connection Failed! Bad Config: ', err));

// Endpoint to create a QR Code
app.post('/api/create-qr', async (req, res) => {
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
            .query(`INSERT INTO QRCodes (QRId, RedirectURL, SquareColor, EyeColor)
                    VALUES (@QRId, @RedirectURL, @SquareColor, @EyeColor)`);

        res.json({ qrDataURL });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating QR Code.' });
    }
});

// Endpoint to get all QR Codes
app.get('/api/qrcodes', async (req, res) => {
    try {
        const pool = await mssql.connect(dbConfig);
        const result = await pool.request()
            .query(`SELECT QRId, RedirectURL, SquareColor, EyeColor, CreatedAt FROM QRCodes ORDER BY CreatedAt DESC`);
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching QR Codes.' });
    }
});

// Endpoint to handle QR Code scans
app.get('/scan/:qrId', async (req, res) => {
    const { qrId } = req.params;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const scannerIdentifier = `${ip}-${userAgent}`;

    try {
        const pool = await mssql.connect(dbConfig);
        const qrResult = await pool.request()
            .input('QRId', mssql.NVarChar(100), qrId)
            .query(`SELECT RedirectURL FROM QRCodes WHERE QRId = @QRId`);

        if (qrResult.recordset.length === 0) {
            return res.status(404).send('QR Code not found.');
        }

        const redirectURL = qrResult.recordset[0].RedirectURL;

        const geoResponse = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.GOOGLE_API_KEY}`);
        const { lat, lng } = geoResponse.data.location;

        const reverseGeoResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`);
        let country = '';
        let city = '';
        const results = reverseGeoResponse.data.results;
        for (let result of results) {
            for (let component of result.address_components) {
                if (component.types.includes('country')) {
                    country = component.long_name;
                }
                if (component.types.includes('locality')) {
                    city = component.long_name;
                }
            }
            if (country && city) break;
        }

        await pool.request()
            .input('QRId', mssql.NVarChar(100), qrId)
            .input('DeviceInfo', mssql.NVarChar(512), userAgent)
            .input('Country', mssql.NVarChar(100), country)
            .input('City', mssql.NVarChar(100), city)
            .input('ScannerIdentifier', mssql.NVarChar(100), scannerIdentifier)
            .query(`INSERT INTO QRScanLogs (QRId, DeviceInfo, Country, City, ScannerIdentifier)
                    VALUES (@QRId, @DeviceInfo, @Country, @City, @ScannerIdentifier)`);

        res.redirect(redirectURL);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing QR Code scan.');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
