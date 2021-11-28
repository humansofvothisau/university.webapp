import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.less";
import General from "./layouts/General";

const App: React.FC = () => (
  <Router>
    <General />
  </Router>
);
export default App;
