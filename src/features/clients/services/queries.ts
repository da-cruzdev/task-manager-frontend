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

export const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfo($username: String!, $email: String!, $oldPassword: String!, $newPassword: String!) {
    updateUser(data: { username: $username, email: $email, oldPassword: $oldPassword, newPassword: $newPassword }) {
      updatedUser {
        id
        username
        email
        role
      }
      accessToken
      refreshToken
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
export const UPDATE_TASK = gql`
  mutation UpdateTask($id: Int!, $title: String!, $description: String!, $status: String!, $assignedTo: Float!, $deadline: DateTime!) {
    updateTask(id: $id, data: { title: $title, description: $description, status: $status, assignedTo: $assignedTo, deadline: $deadline }) {
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

export const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    removeTask(id: $id) {
      id
      title
    }
  }
`
