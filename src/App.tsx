import React, { useEffect, useState } from 'react';
import './App.css';
import { Amplify, Auth, DataStore } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import awsExports from "./aws-exports";
import { Board } from './models';
import { Person } from './models';
import RegisterInput from './components/RegisterInput';
Amplify.configure(awsExports);

function App() {
  const signOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    Auth.signOut();
  }

  const [handleTexts, setHandleTexts] = useState<string>("");
  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText: string = e.target.value;
    setHandleTexts(inputText);
  };



  type boards = {
    id: string,
    message: string,
    name: string,
    personID: string,
  }
  const [content1, setContent1] = useState<boards[] | Board[]>([])
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const findText: string = handleTexts;
    DataStore.query(Board, ab => ab.message("contains", findText))
      .then(values => {
        setContent1(values);
      });
  };

  type persons = {
    id: string,
    name: string,
    email: string,
    age: number,
  }
  const [personInfo, setPersonInfo] = useState<persons[] | Person[]>([])
  useEffect(() => {
    content1.map(item =>
      DataStore.query(Person, pe => pe.id("eq", item.personID)).then(values => {
        setPersonInfo(values);
      }
      ));
    console.log(personInfo);
  }, [content1])

  useEffect(() => {
    DataStore.query(Board).then(values => {
      setContent1(values);
    });
  }, [])

  useEffect(() => {
    console.log(content1);
  }, [content1]);


  return (
    <div className="App">
      <header className="App-header">
        <input type="text" onChange={(e) => handleText(e)} />
        <button onClick={(e) => handleClick(e)} />
        <ol className="my-3 list-group">
          {content1.map(({ id, message, name }) => (
            <li key={id} className="list-group">
              {message}
              ({name})
              {personInfo.map(({ email, age }) => (
                <>
                  <div>
                    {email}
                  </div>
                  <div>
                    {age}
                  </div>
                </>
              ))}
            </li>
          ))}
        </ol>
        <div>
          <RegisterInput />
        </div>
        <button onClick={((e) => signOut(e))}>
          Sign Out
        </button>
      </header>
    </div>
  );
}

export default App;
