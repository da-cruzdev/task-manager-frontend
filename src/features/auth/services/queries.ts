import gql from "graphql-tag"

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation($username: String!, $email: String!, $password: String!) {
    Signup(signupInput: { username: $username, email: $email, password: $password }) {
      accessToken
      refreshToken
    }
  }
`

export const SIGNIN_MUTATION = gql`
  mutation SigninMutation($email: String!, $password: String!) {
    Signin(signinInput: { email: $email, password: $password }) {
      accessToken
      refreshToken
    }
  }
`

export const LOGOUT = gql`
  mutation logout($id: Float!) {
    Logout(id: $id) {
      loggedOut
    }
  }
`
