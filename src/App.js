import React from 'react';
import './App.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Student from './components/Student';
import ClickedTeacher from './components/ClickedTeacher';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';

function App() {
  return (
    <Router >
    <Provider store={store}>
    <div className="App">
          <Route 
            path="/" 
            exact               
            render={props => (
                  <React.Fragment>
                    <Home/>
                  </React.Fragment>
                )} 
            />

          <Route path="/SignUp" component={SignUp} />
          <Route path="/Student"             render={props => (
                  <React.Fragment>
                    <Student/>
                  </React.Fragment>
                )} />
          <Route path="/ClickedTeacher" component={ClickedTeacher} />
    </div>
    </Provider>
    </Router>
  );
}

export default App;
