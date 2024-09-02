require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import the create-qr route
const createQrRoute = require('./api/createQr');

const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

// Use the create-qr route
app.use('/api', createQrRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
