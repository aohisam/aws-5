import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Amplify, Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App() {
  const signOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(Auth);
    return Auth.signOut;
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> save to reload.
        </p>
        <button onClick={((e) => signOut(e))}>
          Sign Out
        </button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
