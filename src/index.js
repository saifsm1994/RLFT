import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar1 from './components/subComponents/Navbar1';

import './App.css';
import {
  Route,
  NavLink,
  HashRouter,
  Switch,
  BrowserRouter
} from "react-router-dom";
import HomePage from './components/HomePage';
import Lookup from './components/Lookup';
import HCPC from './components/HCPC';
import Formatter from './components/Formatter';
import MasterPAFormatter from './components/MasterPAFormatter';
import GSheetFormatter from './components/GSheetFormatter';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <div>
      <Navbar1 
      Home={<NavLink to="/" style={{color: "black",textDecoration: 'none'}}>Home</NavLink>}
      lookupLink={<NavLink to="/Lookup">Lookup</NavLink>}
      HCPC={<NavLink to="/HCPC">HCPC Range Expander</NavLink>}
      Policies={<NavLink to="/Formatter">Policies</NavLink>}
      GSheet={<NavLink to="/GSheetFormatter">GSheet</NavLink>}
      MasterPA={<NavLink to="/MasterPAFormatter">MasterPA</NavLink>}
      />
        <div className="content">
          <Route exact path="/" render={(props) => <HomePage 

          lookupLink={<NavLink style={{color:"white"}} to="/Lookup">Lookup</NavLink>}

          HCPC={<NavLink style={{color:"white"}} to="/HCPC">HCPC Range Expander</NavLink>}

          Policies={<NavLink  style={{color:"white"}} to="/Formatter">Policies</NavLink>}

          GSheet={<NavLink  style={{color:"white"}} to="/GSheetFormatter">GSheet</NavLink>}

          MasterPA={<NavLink  style={{color:"white"}} to="/MasterPAFormatter">MasterPA</NavLink>}

          />} />
          <Route exact path="/Lookup" render={(props) => <Lookup />} />
          <Route exact path="/HCPC" render={(props) => <HCPC />} />
          <Route exact path="/Formatter" render={(props) => <Formatter />} />
          <Route exact path="/MasterPAFormatter" render={(props) => <MasterPAFormatter />} />
          <Route exact path="/GSheetFormatter" render={(props) => <GSheetFormatter />} />
        </div>
      </div>

    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
