import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-aspect-ratio/aspect-ratio.css";

Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
