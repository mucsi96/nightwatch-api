import React from 'react';
import styled from 'styled-components';
import { contributors } from '../../.all-contributorsrc';

const Avatar = styled.img`
  width: 100px;
  display: block;
  overflow: hidden;
  border-radius: 50%;
  opacity: inherit;
  transition: inherit;
`;

const ContributorContainer = styled.li`
  text-align: center;
  padding: 15px;
  width: 100px;
`;

const Link = styled('a')`
  color: inherit;
  text-decoration: none;

  transition: opacity 0.1s ease;
  :hover {
    opacity: 0.5;
  }
`;

const Contributor = ({ login, name, avatar_url, profile }) => (
  <ContributorContainer key={login}>
    <Link href={profile} title={login}>
      <Avatar src={avatar_url} />
      {name}
    </Link>
  </ContributorContainer>
);

const ContributorsContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-left: 0;
  font-size: 12px;
`;

const Contributors = () => (
  <ContributorsContainer>{contributors.map(Contributor)}</ContributorsContainer>
);

export default Contributors;
