import React from 'react';

import { Title, Form, Repos } from './styles'
import logo from '../../assets/logo_.png';
import { LogoStyle } from '../../styles/global'
import { FiChevronRight } from 'react-icons/fi'



export const Dashboard: React.FC = () => {
  return (
    <>
      <LogoStyle src={logo} alt="GitCollection" />
      <Title>Catálogo de repositórios do Github</Title>

      <Form>
        <input placeholder="username/repository_name" />
        <button type="submit">Buscar</button>
      </Form>

      <Repos>
        <a href="/repositories">
          <img src={logo} alt="Repositório"/>
          <div>
            <strong>Aleixoslary/applari</strong>
            <p>Repositório do curso</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repos>
    </>
  );
};
