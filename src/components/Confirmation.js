import { useHistory } from "react-router-dom";

function Confirmation() {
  const history = useHistory();

  return <main><h2>Success! CRUD ✅ {history.location.state ? ` - ${history.location.state.msg}` : ""}</h2></main>;
}

export default Confirmation;