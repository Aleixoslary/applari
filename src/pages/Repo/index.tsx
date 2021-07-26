import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import logo from '../../assets/logo_.png';
import { LogoStyle } from '../../styles/global';
import { Header, RepoInfos } from './styles';
import { FiChevronLeft } from 'react-icons/fi';

//Criando uma interface para tipar o fullname (que vem do parâmetro) do repositório;
interface RepositoryParams {
  repository: string;
};

export const Repo: React.FC = () => {
  //Criando um generic para passar a interface para o params;
  const { params } = useRouteMatch<RepositoryParams>();

  return (
    <>
      <Header>
        <LogoStyle src={logo} alt="GitCollection" />
        <Link to="/">
          <FiChevronLeft />
          Voltar
        </Link>
      </Header>

      <RepoInfos>
        <header>
          <img src={logo} alt="" />
          <div>
            <strong>aleixoslary/appLari</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim nec ligula sit amet facilisis. Curabitur elit mauris, vestibulum sit amet molestie vitae, rhoncus dignissim nunc.</p>
          </div>
        </header>
         <ul>
           <li>
             <strong>2238</strong>
             <span>Stars</span>
            </li>
            <li>
             <strong>210</strong>
             <span>Forks</span>
            </li>
            <li>
             <strong>10</strong>
             <span>Issues abertas</span>
            </li>
         </ul>
      </RepoInfos>
    </>
  );
};
