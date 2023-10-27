import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Add the import for BrowserRouter (or HashRouter)

import LoginComponent from './components/Login/Login';
import SignUpComponent from './components/SignUp/SignUp';

function App() {
  return (
    <div className="App">
      <Router> {/* Wrap your routes with the Router component */}
        <div>
          <Switch>
            <Route exact path="/login" component={LoginComponent} />
            <Route path="/signup" component={SignUpComponent} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
