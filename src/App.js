import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from './views/Main';
import Error from './views/Error';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" children={ <Error/> } />
        <Route exact path="/streamingCode/:ticket" children={ <Main/> }/>
      </Switch>
    </Router>
  );
}

export default App;