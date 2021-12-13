import ReactDOM from "react-dom";
import "./index.css";
import "./styles/inputfields.scss";
import "./styles/table.scss";
import App from "./App";
import { AuthProvider } from "./auth-context";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

ReactDOM.render(
  <Router {...{ history }}>
    <AuthProvider>
      <App />,
    </AuthProvider>
    ,
  </Router>,
  document.getElementById("root")
);
