import { Route, BrowserRouter as Router, Switch,  useLocation, useHistory  } from "react-router-dom";
import Dashboard from "./screens/Dashboard/Dashboard";
import LoginPage from "./screens/LoginPage/LoginPage";
import Inventory from "./screens/Inventory/Inventory";
import RawMaterial from "./screens/RawMaterial/RawMaterial";
import { useAuth } from "./auth-context";

const App = () => {
  const { loggedIn } = useAuth();

  return loggedIn ? (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/inventory" component={Inventory} />
        <Route path="/inventory/:id" component={RawMaterial} />
      </Switch>
    </Router>
  ) : (
    <Router>
      <Switch>
        <Route path="/" component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default App;
