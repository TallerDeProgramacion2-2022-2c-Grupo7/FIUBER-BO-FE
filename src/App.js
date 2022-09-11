import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  let [text, setText] = useState("");
  let makeRequest = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/hola`)
      .then(res => res.text())
      .then(message => setText(message));
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          onClick={makeRequest}
          style={{cursor:'pointer'}}
          >
          Make request
        </a>
        <p>
          {text}
        </p>
      </header>
    </div>
  );
}

export default App;
