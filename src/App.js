import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from './views/Main';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Main}/>
      </Switch>
    </Router>
  );
}

export default App;