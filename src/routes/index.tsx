import React from "react";
import { Switch, Route } from "react-router-dom";
// import { Dashboard } from '../pages/Dashboard';
// import { Repo } from '../pages/Repo';


//Usando o React.lazy para dividir os pacotes na hora do bundle, isso  ajuda a carregar somente o necessário ao usuário

// A função do React.lazy permite renderizar uma importação dinâmica como se fosse um componente comum.
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Repo = React.lazy(() => import("../pages/Repo"));

export const Routes: React.FC = () => {
  return (
    <React.Suspense fallback={"Loading..."}>
      <Switch>
        <Route component={Dashboard} path="/" exact />
        {/* Passando o parâmetro do repositório */}
        <Route component={Repo} path="/repositories/:repository+" />
      </Switch>
    </React.Suspense>
  );
};
