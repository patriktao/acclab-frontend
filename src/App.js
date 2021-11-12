import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard/";
import Login from "./pages/Login/";
import Inventory from "./pages/Inventory/";
import RawMaterial from "./pages/RawMaterial/RawMaterial";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/inventory" component={Inventory} />
        <Route path="/inventory/:id" component={RawMaterial} />
      </Switch>
    </Router>
  );
};

export default App;
