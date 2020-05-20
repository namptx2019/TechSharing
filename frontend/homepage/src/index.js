import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import StyledWrapper from "./Styles";
import LogIn from "./login";
import ApiService from './services/api.service'

ApiService.init(process.env.REACT_APP_API_URL);

function App() {
  return (
    <div className="App">
      <StyledWrapper>
        <LogIn />
      </StyledWrapper>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
