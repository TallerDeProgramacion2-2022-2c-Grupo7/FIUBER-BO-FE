import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  let [text, setText] = useState("");
  let makeRequest = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000")
      .then(res => res.json())
      .then(data => setText(data["message"]));
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
