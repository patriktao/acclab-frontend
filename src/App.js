import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.js";
import Login from "./components/Login/LoginPage.js";
import Inventory from "./components/Inventory/Inventory.js";
/* import { createBrowserHistory } from "history";

const history = createBrowserHistory(); */

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/inventory" component={Inventory} />
      </Switch>
    </Router>
  );
};

export default App;
