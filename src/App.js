import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard/";
import Login from "./pages/Login/";
import Inventory from "./pages/Inventory/";

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
