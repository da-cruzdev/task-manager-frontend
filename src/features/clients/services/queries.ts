import gql from "graphql-tag"

export const GET_USER = gql`
  query GetUserQuery($email: String!) {
    user(email: $email) {
      id
      username
      email
      role
    }
  }
`
export const GET_USER_INFO = gql`
  query GetUserInfo {
    getUserInfo {
      id
      username
      email
      role
    }
  }
`
