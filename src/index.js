import ReactDOM from "react-dom";
import "./index.css";
import "./styles/inputfields.scss"
import "./styles/table.scss"
import App from "./App";
import { AuthProvider } from "./auth-context"

ReactDOM.render(
  <AuthProvider>
    <App />,
  </AuthProvider>,
  document.getElementById("root")
);
