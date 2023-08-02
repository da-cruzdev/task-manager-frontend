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

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      username
      email
      role
    }
  }
`

export const CREATE_TASK = gql`
  mutation CreateTaskMutation($title: String!, $description: String!, $assignedTo: Float!, $deadline: DateTime!) {
    createTask(createTaskInput: { title: $title, description: $description, assignedTo: $assignedTo, deadline: $deadline }) {
      id
      title
      description
      status
      assignedToId
      deadline
    }
  }
`

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      status
      assignedToId
      deadline
      owner {
        id
        username
        email
        role
        createdTasks {
          id
          title
          description
          status
          assignedToId
          deadline
        }
        assignedTasks {
          id
          title
          description
          status
          deadline
        }
      }
      assignUser {
        id
        username
        email
        role
        createdTasks {
          id
          title
          description
          status
          assignedToId
          deadline
        }
        assignedTasks {
          id
          title
          description
          status
          deadline
        }
      }
    }
  }
`
