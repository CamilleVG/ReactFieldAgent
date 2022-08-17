import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function AgentsList() {
  const [agents, setAgents] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetch('http://localhost:8080/api/agents')
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then(data => setAgents(data))
      .catch(console.log);
  }, []); // An empty dependency array tells to run our side effect once when the component is initially loaded.

  const handleDeleteAgent = (agentId) => {
    const agent = agents.find(agent => agent.id === agentId);

    if (window.confirm(`Delete agent ${agent.dob}-${agent.lastName}-${agent.firstName}?`)) {
      const init = {
        method: 'DELETE'
      };

      fetch(`http://localhost:8080/api/agent/${agentId}`, init)
        .then(response => {
          if (response.status === 204) {
            // create a copy of the solar panels array
            // remove the solar panel that we need to delete
            const newAgents = agents.filter(agent => agent.id !== agentId);

            // update the solar panels state variable
            setAgents(newAgents);
          } else {
            return Promise.reject(`Unexpected status code: ${response.status}`);
          }
        })
        .catch(console.log);
    }
  };

  return (
    <main>
          <h1>Field Agents</h1>
      <button className="btn btn-primary my-4" onClick={() => history.push('/agents/add')}>
        <i className="bi bi-plus-circle"></i> Add Field Agent
      </button>
      {/* <Link className="btn btn-primary my-4" to="/solarpanels/add">
        <i className="bi bi-plus-circle"></i> Add Solar Panel
      </Link> */}
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Column heading</th>
            <th scope="col">Column heading</th>
            <th scope="col">Column heading</th>
          </tr>
        </thead>
        <tbody>
          {agents.map(agent => (
            <tr key={agent.id}>
              <td>{agent.firstName}</td>
              <td>{agent.lastName}</td>
              <td>
                <div className="float-right mr-2">
                  <Link className="btn btn-primary btn-sm mr-2" to={`/agents/edit/${agent.id}`}>
                    <i className="bi bi-pencil-square"></i> Edit
                  </Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteAgent(agent.id)}>
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default AgentsList;