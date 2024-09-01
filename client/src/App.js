// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CreateQRCode from './Components/CreateQRCode';
import ViewQRCodes from './Components/ViewQRCodes'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Create QR Code</Link>
            </li>
            <li>
              <Link to="/view">View All QR Codes</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact component={CreateQRCode} />
          <Route path="/view" component={ViewQRCodes} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
