import React from 'react';
import CreateQRCode from './Components/CreateQRCode';
import ViewQRCodes from './Components/ViewQRCodes';

function App() {
    return (
        <div>
            <h1>QR Dashboard</h1>
            <CreateQRCode />
            <ViewQRCodes />
        </div>
    );
}

export default App;
