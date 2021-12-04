import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./App.less";
import General from "./layouts/General";

const App: React.FC = () => (
  <HelmetProvider>
    <Router>
      <General />
    </Router>
  </HelmetProvider>
);
export default App;
