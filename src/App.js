import Home from "./components/Home";
import AddAgent from "./components/AddAgent";
import EditAgent from "./components/EditAgent";
import NavBar from "./components/NavBar";
import AgentsList from "./components/AgentsList";
import AgentForm from "./components/AgentForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Switch>
        <Route path="/agents/edit/:id">
                    <AgentForm />
                  </Route>
        <Route path="/agents/add">
                    <AgentForm />
                  </Route>
                  <Route path="/:expand">
                                                <AgentsList />
                                              </Route>
          <Route path="/">
            <AgentsList />
          </Route>

        </Switch>
      </Router>
    </>
  );
}

export default App;
