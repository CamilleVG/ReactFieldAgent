import { useHistory } from "react-router-dom";

function Error() {
  const history = useHistory();

  return <main><h2>🙅🏾‍♂️ Error {history.location.state ? ` - ${history.location.state.msg}` : ""}</h2></main>;
}

export default Error;