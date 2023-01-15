import { gql } from "@apollo/client";

const POST_CATEGORY= gql`
  mutation CreateCategory($input: InputCategory!){
    createCategory(input: $input){
      id
      title
      user{
        id
        name
        email
      }
    }
  }
`

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $input: InputCategory!){
    updateCategory(id: $id, input: $input){
      id
      title
      user{
        id
        name
        email
      }
    }
  }
`

const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!){
    deleteCategory(id: $id){
      id
      title
      user{
        id
        name
        email
      }
    }
  }
`

const SEARCH_CATEGORY = gql`
  mutation SearchCategory($text: String!, $page: Int, $limit: Int){
    searchCategory(text: $text, page: $page, limit: $limit){
      id
      title
      user{
        id
        name
        email
      }
      createdAt
      updatedAt
    }
  }
`

export { POST_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, SEARCH_CATEGORY }