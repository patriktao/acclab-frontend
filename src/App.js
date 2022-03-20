import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Dashboard from "./screens/Dashboard/Dashboard";
import LoginPage from "./screens/LoginPage/LoginPage";
import Inventory from "./screens/Inventory/Inventory";
import RawMaterial from "./screens/RawMaterial/RawMaterial";
import { useAuth } from "./context/auth-context";
import SemiFinishedProduct from "./screens/SemiFinishedProduct";
import PageNotFound from "./screens/PageNotFound";

const App = () => {
  const { loggedIn } = useAuth();

  return loggedIn ? (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/inventory" component={Inventory} />
      <Route exact path="/inventory/rawmaterial/:id" component={RawMaterial} />
      <Route exact path="/inventory/sfp/:id" component={SemiFinishedProduct} />
      <Route component={PageNotFound} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/" component={LoginPage} />
    </Switch>
  );
};

export default App;
