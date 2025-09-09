import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const main = createRoot(document.getElementById("main"));
main.render(<App />);