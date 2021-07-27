import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { WorkShift } from './pages/WorkShift'
import { WorkShiftList } from './pages/WorkShiftList'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/workshift/update'>
          <WorkShift />
        </Route>
        <Route exact path='/workshift/list'>
          <WorkShiftList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
