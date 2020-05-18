import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import StyledWrapper from "./Styles";
import LogIn from "./login";

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
