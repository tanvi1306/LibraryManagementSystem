import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { LoginProvider } from "./context/LoginContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoginProvider>
      <App />
  </LoginProvider>
);