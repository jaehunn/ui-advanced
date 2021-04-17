import r from "react";
import rd from "react-dom";

import "./style.css";

const e = r.createElement;

rd.render(e(App), document.getElementById("root"));

function App() {
  return e("div", {}, "Hi");
}
