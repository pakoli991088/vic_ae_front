import React from 'react';
import './App.css';
import {LoginPage} from "./Components/LoginPage/LoginPage";
import {MarginCallList} from "./Components/MarginCallListPage/MarginCallList";
import {Route, Switch, useHistory} from "react-router-dom";
import { oktaConfig} from "./lib/oktaConfig";
import { OktaAuth , toRelativeUrl } from "@okta/okta-auth-js";
const oktaAuth = new OktaAuth(oktaConfig);
export const App = () => {

  const customAuthHandler = () => {
    history.push('/login')
  }

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth :any , originalUri : any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin))
  }

  return (
    <div className="container">
      <Switch>
        <Route path='/' exact>
          <LoginPage/>
        </Route>
        <Route path='/margin-call'>
          <MarginCallList/>
        </Route>
      </Switch>
    </div>
  );
}

