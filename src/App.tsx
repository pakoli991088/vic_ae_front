import React from 'react';
import './App.css';
import {MarginCallList} from "./layout/MarginCallListPage/MarginCallList";
import {Route, Switch} from "react-router-dom";
import {HomePage} from "./layout/HomePage/HomePage";
import {Navbar} from "./layout/NavBar/Navbar";

export const App = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar/>
            <div className='flex-grow-1'>
                <Switch>
                    <Route path="/" exact>
                        <HomePage/>
                    </Route>

                    <Route path='/margin-call'>
                        <MarginCallList/>
                    </Route>
                </Switch>
            </div>
        </div>
        // <div className="container">
        //         <Switch>
        //             <Route path='/' exact>
        //               <HomePage/>
        //             </Route>
        //
        //             <Route path='/margin-call'>
        //                 <MarginCallList/>
        //             </Route>
        //
        //             {/*<Route path='/login' render={*/}
        //             {/*    () => <LoginWidget config={oktaConfig}/>*/}
        //             {/*}/>*/}
        //
        //             {/*<Route path='/login/callback' component={LoginCallback}/>*/}
        //         </Switch>
        // </div>
    );
}

