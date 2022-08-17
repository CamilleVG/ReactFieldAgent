import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import AgentsList from "./components/AgentsList";
import AgentForm from "./components/AgentForm";
import Error from "./components/Error";
import Confirmation from "./components/Confirmation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Switch>
            <Route exact path={["/agents/edit/:id", "/agents/add"]}>
                <AgentForm />
            </Route>

            <Route path="/confirmation">
                <Confirmation />
            </Route>

            <Route path="/error">
                <Error />
            </Route>

            <Route exact path={["/", "/:expand"]}>
                <AgentsList />
            </Route>

            <Route>
                <NotFound />
            </Route>;
        </Switch>
      </Router>
    </>
  );
}

export default App;
