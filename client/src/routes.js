import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Search from './Components/egyBest/search'
import Watch from './Components/egyBest/watch'
const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Search} />
            <Route path='/watch/:name' exact component={Watch} />
        </Switch>
    )
}

export default Routes;