import About from "./components/About";
import Home from "./components/Home";
import AddAgent from "./components/AddAgent";
import EditAgent from "./components/EditAgent";
import DeleteAgent from "./components/DeleteAgent";
import NavBar from "./components/NavBar";
import AgentsList from "./components/AgentsList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Switch>
        <Route path="/agents/delete/:id">
                    <DeleteAgent />
                  </Route>
        <Route path="/agents/edit/:id">
                    <EditAgent />
                  </Route>
        <Route path="/agents/add">
                    <AddAgent />
                  </Route>
          <Route path="/about">
            <About />
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
