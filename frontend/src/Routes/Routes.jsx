import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../Components/Dashboard';
import Details from '../Components/Details';

export const Routes = () => {
    return (
        <>
            <Switch>
                <Route path='/' exact render={() => <Dashboard />} />
                <Route path='/teacher/:name' render={() => <Details />} />
                {/* <Route
                    path='/Details'
                    render={(props) => <Details {...props} />}
                /> */}
            </Switch>
        </>
    );
};
