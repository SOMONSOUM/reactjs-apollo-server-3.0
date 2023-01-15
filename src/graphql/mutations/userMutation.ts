import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation UserRegister($input: UserRegisterInput!){
    registerUser(input: $input){
      id
      name
      email
      role
      isAdmin
      isActive
      token
    }
  }
`

const LOGIN_USER= gql`
  mutation UserLogin($input: UserLogInput!){
    logInUser(input: $input){
      id
      name
      email
      role
      isAdmin
      isActive
      token
    }
  }
  # mutation UserLogin($email: String!, $password: String! ){
  #   logInUser(input: { email: $email, password: $password }){
  #     id
  #     name
  #     email
  #     role
  #     isAdmin
  #     isActive
  #     token
  #   }
  # }
`

const LOGOUT_USER = gql`
  mutation LogoutUser{
    logOutUser{
      id
      name
      email
      isActive
      isAdmin
      role
    }
  }
`

export { REGISTER_USER, LOGOUT_USER, LOGIN_USER }