import { gql } from "@apollo/client";

export interface ContentObjectTypes{
  id?: string,
  title?: string,
  description?:string,
  photo?:string,
  user?: {
    id: string,
    name: string,
    email: string,
    role:string
  },
  category?:{
    id: string,
    title: string
  }
}
export interface Content{
  error?: string,
  loading:boolean,
  data?: {
    contents?: ContentObjectTypes[] | null
    content?: ContentObjectTypes | null
  }
}

const GET_CONTENT = gql`
  query Contents{
    contents{
      id
      title
      description
      category{
        id
        title
      }
    }
  }
`

const GET_CONTENT_BY_ID = gql`
  query Content($id: ID!){
    content(id:$id){
      id
      title
      description
      photo
      user{
        id
        name
        email
        role
      }
      category{
        id
        title
      }
    }
  }
`

export { GET_CONTENT, GET_CONTENT_BY_ID }