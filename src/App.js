import React from "react";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Root from "./components/Root";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </div>
  );
}

export default App;
