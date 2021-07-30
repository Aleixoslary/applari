import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { api } from "../../services/api";

import logo from "../../assets/logo_.png";
import { LogoStyle } from "../../styles/global";
import { Header, RepoInfos, Issues } from "./styles";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

//Criando uma interface para tipar o fullname (que vem do parâmetro) do repositório;
interface RepositoryParams {
  repository: string;
}

interface GitHubRepository {
  full_name: string;
  description: string;
  forks_count: number;
  open_issues_count: number;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}
interface GitHubIssues {
  id: number;
  title: number;
  html_url: string;
  user: {
    login: string;
  };
}

const Repo: React.FC = () => {
  // Criando os states repository/issues
  // Setando a interface ou um valor null que inicia como null (o que está ente parênsetes)
  const [repository, setRepository] = React.useState<GitHubRepository | null>(
    null
  );
  // Setando a interface ou um array vazio que inicia como array vazio tb(o que está ente parênsetes)
  const [issues, setIssues] = React.useState<GitHubIssues[]>([]);

  //Criando um generic para passar a interface para o params;
  //Recenbendo por parâmetro qual a rota que foi acessada;
  const { params } = useRouteMatch<RepositoryParams>();

  // Criando chamada da API usando o Hook useEffect
  // *primeiro parâmetro - Função que será executada assim que o componente é criado
  // *segundo parâmetro - Array de dependências, pode estar vazio, ou caso tenha 1 ou mais dependencia, ele executa o método novamente quando esta dependência for alterada;
  //Usando o params como dependência, assim o metodo será executado quando o componente for montado e quando o parâmetro da rota mudar
  React.useEffect(() => {
    api
      .get(`repos/${params.repository}`)
      .then((response) => setRepository(response.data));

    api
      .get(`repos/${params.repository}/issues`)
      .then((response) => setIssues(response.data));
  }, [params.repository]);

  return (
    <>
      <Header>
        <LogoStyle src={logo} alt="GitCollection" />
        <Link to="/">
          <FiChevronLeft />
          Voltar
        </Link>
      </Header>

      {/* Verificando se estive valor em repository - se sim exibirá o conteúdo senão ficará oculto  */}
      {repository && (
        <RepoInfos>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.owner.login}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepoInfos>
      )}

      <Issues>
        {issues.map((issue) => (
          <a
            href={issue.html_url}
            key={issue.id}
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repo;