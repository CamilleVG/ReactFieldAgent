import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

const AGENT_DEFAULT = {
    agentId: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "YYYY-MM-DD",
    heightInInches: 0
};

function AgentForm() {
  const [agent, setAgent] = useState(AGENT_DEFAULT);
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  // Not using destructuring...
  // const params = useParams();
  // const id = params.id;

  // Using destructuring...
  const { id } = useParams();

  useEffect(() => {
    // Make sure that we have an "id" value...
    if (id) {
      fetch(`http://localhost:8080/api/agent/${id}`)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected status code: ${response.status}`);
          }
        })
        .then(data => setAgent(data))
        .catch(console.log);
    }
  }, [id]); // Hey React... please call my arrow function every time the "id" route parameter changes value

  const handleChange = (event) => {
    // Make a copy of the object.
    const newAgent = { ...agent };

    // Update the value of the property that just changed.
    // We can "index" into the object using square brackets (just like we can do with arrays).
    if (event.target.type === 'checkbox') {
      newAgent[event.target.name] = event.target.checked;
    } else {
      newAgent[event.target.name] = event.target.value;
    }

    setAgent(newAgent);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (id) {
      updateAgent();
    } else {
      addAgent();
    }
  };

  const addAgent = () => {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(agent)
    };

    fetch('http://localhost:8080/api/agent', init)
      .then(response => {
        if (response.status === 201 || response.status === 400) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then(data => {
        if (data.id) {
          /*

          On the happy path, "data" is an object that looks this:

          {
            "id": 30,
            "section": "The Ridge",
            "row": 202,
            "column": 201,
            "yearInstalled": 2000,
            "material": "MONO_SI",
            "tracking": true
          }

          */

          // Send the user back to the list route.
          history.push('/');
        } else {
          /*

          On the unhappy path, "data" is an array that looks this:

          [
            "SolarPanel `section` is required.",
            "SolarPanel `row` must be a positive number less than or equal to 250.",
            "SolarPanel `column` must be a positive number less than or equal to 250.",
            "SolarPanel `material` is required."
          ]

          */

          setErrors(data);
        }
      })
      .catch(console.log);
  };

  const updateAgent = () => {
    // assign an ID (this is probably needed anymore)
    agent.id = id;

    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(agent)
    };

    fetch(`http://localhost:8080/api/agent/${id}`, init)
      .then(response => {
        if (response.status === 204) {
          return null;
        } else if (response.status === 400) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then(data => {
        if (!data) {
          // Send the user back to the list route.
          history.push('/');
        } else {
          setErrors(data);
        }
      })
      .catch(console.log);
  };

  return (
    <main>
      <h2 className="mb-4">{id ? 'Update Agent' : 'Add Agent'}</h2>

      {errors.length > 0 && (
        <div className="alert alert-danger">
          <p>The following errors were found:</p>
          <ul>
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First:</label>
          <input id="first" name="first" type="text" className="form-control"
            value={agent.firstName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="middleName">Middle:</label>
          <input id="middle" name="middle" type="text" className="form-control"
            value={agent.middleName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last:</label>
          <input id="last" name="last" type="text" className="form-control"
            value={agent.lastName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="dob">DOB:</label>
          <input id="dob" name="dob" type="text" className="form-control"
            value={agent.dob} onChange={handleChange} />
        </div>
        <div className="mt-4">
          <button className="btn btn-success mr-2" type="submit">
            <i className="bi bi-file-earmark-check"></i> {id ? 'Update Agent' : 'Add Agent'}
          </button>
          <Link className="btn btn-warning" to="/">
            <i className="bi bi-stoplights"></i> Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}

export default AgentForm;
