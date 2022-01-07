import ReactDOM from "react-dom";
import "./index.css";
import "./styles/inputfields.scss";
import "./styles/table.scss";
import App from "./App";
import { AuthProvider } from "./context/auth-context";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { EditRawMaterialProvider } from "./context/edit-raw-material";

const history = createBrowserHistory();

ReactDOM.render(
  <Router {...{ history }}>
    <AuthProvider>
      <EditRawMaterialProvider>
        <App />,
      </EditRawMaterialProvider>
    </AuthProvider>
    ,
  </Router>,
  document.getElementById("root")
);
