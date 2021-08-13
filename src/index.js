import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route,BrowserRouter} from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Study from './Study';
import {CookiesProvider} from 'react-cookie';

function Router(){
  return(
    <CookiesProvider>
    <BrowserRouter>
      <Route exact path = "/" component={Login}/>
      <Route exact path = "/StudyBoard" component={App}/>
      <Route exact path = "/Study" component={Study}/>
    </BrowserRouter>
    </CookiesProvider>
  )
}

ReactDOM.render(
  <Router />,
  document.getElementById('root')
);
reportWebVitals();