import React from 'react';
import './App.css';
import {MarginCallList} from "./Components/MarginCallListPage/MarginCallList";
import {Route, Switch, useHistory} from "react-router-dom";
import {oktaConfig} from "./lib/oktaConfig";
import {OktaAuth, toRelativeUrl} from "@okta/okta-auth-js";
import {LoginCallback, Security} from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";
import {HomePage} from "./Components/HomePage/HomePage";

const oktaAuth = new OktaAuth(oktaConfig);
export const App = () => {

    const customAuthHandler = () => {
        history.push('/login')
    }

    const history = useHistory();

    const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
        history.replace(toRelativeUrl(originalUri || '/', window.location.origin))
    }

    return (
        <div className="container">
            <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
                <Switch>
                    <Route path='/' exact>
                      <HomePage/>
                    </Route>

                    <Route path='/margin-call'>
                        <MarginCallList/>
                    </Route>

                    <Route path='/login' render={
                        () => <LoginWidget config={oktaConfig}/>
                    }/>

                    <Route path='/login/callback' component={LoginCallback}/>
                </Switch>
            </Security>
        </div>
    );
}

