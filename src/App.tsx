import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";


import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> save to reload.
        </p>
        Learn React
      </header>
    </div>
  );
}

export default withAuthenticator(App);
