import './App.css';
import React from 'react';
import {  Route, Switch, BrowserRouter } from "react-router-dom";
import HomePage from './components/HomePage';
import Lookup from './components/Lookup';
import HCPC from './components/HCPC';
import Formatter from './components/Formatter';
import MasterPAFormatter from './components/MasterPAFormatter';
import GSheetFormatter from './components/GSheetFormatter';


function App() {
  return (
    <BrowserRouter>
      <div>
        { /* Route components are rendered if the path prop matches the current URL */}
        <Switch>
          <Route path="/Home" children={<HomePage pages={["Home","Lookup","HCPC","HCPCandFilter","MasterPAFormatter","Formatter"]} />} />
          <Route path="/Lookup/:id" children={<Lookup />} />
          <Route path="/Lookup" children={<Lookup  />} />
          <Route path="/HCPC" children={<HCPC  />} />
          <Route path="/MasterPAFormatter" children={<MasterPAFormatter  />} />
          <Route path="/Formatter" children={<Formatter  />} />
          <Route path="/GSheetFormatter" children={<GSheetFormatter  />} />
          <Route path="/" children={<HomePage pages={["Home","Lookup","HCPC","HCPCandFilter","MasterPAFormatter","Formatter"]} />} />


        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

