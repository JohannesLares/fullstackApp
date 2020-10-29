import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges{
        node{ 
          id
          name
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          watchersCount
          forksCount
          openIssuesCount
          url
          ownerAvatarUrl
          ownerName
          description
          language
        }
      }
    }
  }
`;

export const LOGIN = gql`
  mutation authorize($username: String!, $password: String!) {
    authorize(credentials: {username: $username, password: $password}) {
      accessToken
    }
  }
`;

export const AUTHORIZED = gql`
query {
  authorizedUser {
    id
    username
  }
}
`;