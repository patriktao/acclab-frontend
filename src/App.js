import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Dashboard from "./screens/Dashboard/Dashboard";
import Login from "./screens/Login/LoginPage";
import Inventory from "./screens/Inventory/Inventory";
import RawMaterial from "./screens/RawMaterial/RawMaterial";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        {/* <Route path="/dashboard" component={Dashboard} /> */}
        <Route exact path="/inventory" component={Inventory} />
        <Route path="/inventory/:id" component={RawMaterial} />

        <ProtectedRoute path="/dashboard" component={Dashboard} isAuth={isAuth}/>
      </Switch>
    </Router>
  );
};

export default App;
