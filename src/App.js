import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Dashboard from "./screens/Dashboard/Dashboard";
import Login from "./screens/Login/LoginPage";
import Inventory from "./screens/Inventory/Inventory";
import RawMaterial from "./screens/RawMaterial/RawMaterial";
import { useAuth } from "./auth-context";

const App = () => {
  const { loggedIn } = useAuth();

  return loggedIn ? (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/inventory" component={Inventory} />
        <Route path="/inventory/:id" component={RawMaterial} />
      </Switch>
    </Router>
  ) : (
    <Router>
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
