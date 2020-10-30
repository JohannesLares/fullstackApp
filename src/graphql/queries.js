import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String){
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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
query authorizedUser($includeReviews: Boolean = false) {
  authorizedUser {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          text
          rating
          createdAt
          repository {
            fullName
          }
        }
      }
    }
  }
}
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!) {
    repository(id: $id) {
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
        url
    }
  }
`;

export const GET_REVIEWS = gql`
query repository($id: ID!, $first: Int, $after: String) {
  repository(id: $id) {
    id
    reviews(first: $first, after: $after) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        totalCount
        startCursor
        endCursor
      }
    }
  }
}
`;

export const REVIEW = gql`
  mutation createReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
    createReview(review: {repositoryName: $repositoryName, ownerName: $ownerName, rating: $rating, text: $text}) {
      id
      repositoryId
    }
  }
`;

export const SIGNUP = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(user: {username: $username, password: $password}) {
      id
    }
  }
`;