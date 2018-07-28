import React from 'react';
import styled from 'styled-components';
import { withContributors } from './ContributorsProvider';
import Link from './Link';

const Avatar = styled.img`
  width: 100px;
  display: block;
  overflow: hidden;
  border-radius: 50%;
`;

const ContributorContainer = styled.li`
  text-align: center;
  padding: 15px;
  width: 100px;
`;

const Contributor = ({ login, name, avatar_url, profile }) => (
  <ContributorContainer>
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

const Contributors = ({ contributors }) => (
  <ContributorsContainer>{contributors.map(Contributor)}</ContributorsContainer>
);

export default withContributors(Contributors);
