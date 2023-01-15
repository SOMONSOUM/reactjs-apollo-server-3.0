import { gql } from "@apollo/client";

const CREATE_CONTENT = gql`
  mutation CreateContent($categoryId: ID!, $input: InputContent!){
    createContent(categoryId: $categoryId, input: $input){
      id
      title
      description
      photo
      user{
        id
        name
        email
      }
      category{
        id
        title
      }
    }
  }
`

const UPDATE_CONTENT = gql`
  mutation UpdateContent($id: ID!, $input: InputContent!){
    updateContent(id: $id, input: $input){
      id
      title
      description
      photo
      user{
        id
      }
      category{
        id
      }
    }
  }
`

const DELETE_CONTENT = gql`
  mutation DeleteContent($id: ID!){
    deleteContent(id: $id){
      id
    }
  }
`

export { CREATE_CONTENT, UPDATE_CONTENT, DELETE_CONTENT }