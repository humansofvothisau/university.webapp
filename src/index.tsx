import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ConfigProvider } from "antd";
import viVN from "antd/lib/locale/vi_VN";

ReactDOM.render(
  // <React.StrictMode>
  <ConfigProvider locale={viVN}>
    <App />
  </ConfigProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
