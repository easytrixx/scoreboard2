import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Score from './pages/Score'
import Create from './pages/Create'
import SorarePlayer from './pages/SorarePlayer'
import Data from './pages/Data'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Create />
        </Route>
        <Route path="/score">
          <Score />
        </Route>
        <Route path="/sorareplayer">
          <SorarePlayer />
        </Route>
        <Route path="/data/:id">
          <Data />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;