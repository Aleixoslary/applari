import React from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

import { Title, Form, Repos, Error } from './styles';
import logo from '../../assets/logo_.png';
import { LogoStyle } from '../../styles/global';
import { FiChevronRight } from 'react-icons/fi';

interface GitHubRepository {
  full_name: string,
  description: string,
  owner: {
    login: string;
    avatar_url: string;
  };
};

export const Dashboard: React.FC = () => {
  // Criando os states com Hook useState;
  const [repos, setRepos] = React.useState<GitHubRepository[]>(() => {
    const storageRepos = localStorage.getItem('@appLari:repositories');

    if (storageRepos) {
      return JSON.parse(storageRepos)
    }

    return [];
  });
  const [newRepo, setNewRepo] = React.useState('');
  const [inputError, setInputError] = React.useState('');


  // Utilizando o Hook useEfect para setar o conteúdo do array repos no localStorage;
  React.useEffect(() => {
    localStorage.setItem('@appLari:repositories', JSON.stringify(repos))
  }, [repos]);

  // Setando o valor do input no state setNewRepo quando o input for alterado
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewRepo(event.target.value);
  };

  // HTTP GET para buscar os dados da api
  async function handleAddRepo(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();


    //Verificando se o state newRepo possui valor SE NÃO (MENSAGEM PARA O USER) SE SIM (EXECUTA A REQUISIÇÃO)
    if (!newRepo) {
      setInputError('Informe o username/repositório');

      Promise.resolve();
    } else {

      setInputError('');

      const response = await api.get<GitHubRepository>(`repos/${newRepo}`)
        //catch inserido para informar que o repo não foi encontrado
        .catch((error) => {
          setInputError('Opsss... nenhum repositório encontrado');
          return Promise.reject(error)
        }
        )

      //criando a constante e armazenando a response (No axios a info vem no .data)  
      const repository = response.data;

      // Adicionando ao array a nova response
      setRepos([repository, ...repos])

      //limpando o state  
      setNewRepo('');
    }
  };

  return (
    <>
      <LogoStyle src={logo} alt="GitCollection" />
      <Title>Catálogo de repositórios do Github</Title>

      {/* Criando uma props no styled component para definir quando o input está com erro */}
      <Form hasError={Boolean(inputError)} onSubmit={handleAddRepo}>
        <input placeholder="username/repository_name" onChange={handleInputChange} />
        <button type="submit">Buscar</button>
      </Form>
      
      {inputError && <Error>{inputError}</Error>}

      <Repos>
        {
          // Exibindo o array repos
          repos.map(repository => (
            <Link
              to={`/repositories/${repository.full_name}`}
              key={repository.full_name}
            >
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>
              <FiChevronRight size={20} />
            </Link>
          ))
        }
      </Repos>
    </>
  );
};
