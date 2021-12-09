import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
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
