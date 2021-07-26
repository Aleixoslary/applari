import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Repo } from '../pages/Repo';

export const Routes: React.FC = () => {
    return (
        <Switch>
            <Route component={Dashboard} path="/" exact />
            {/* Passando o parâmetro do repositório */}
            <Route component={Repo} path="/repositories/:repository+" />

        </Switch>       
    );
};
