import { gql } from "@apollo/client";

export interface CategoryObjectType{
  id:string,
  title:string,
  user: {
    id: string,
    name:string,
    email:string
  }
  createdAt: Date,
}
export interface Paginator{
  itemCount: number,
  pageCount: number,
  page: number,
  limit: number
  allPages: number[],
  pagination: { 
    prev: {
      page: number
    },
    next:{
      page: number
    }
  }
}
export interface Category{
  loading?:boolean,
  error: any,
  data?:{
    allCategories: {
      data: CategoryObjectType[]
    }
    categories?: {
      data: CategoryObjectType[] | null,
      pagination: Paginator,
      errors: { message: string }[]
    }
  }
}


const GET_CATEGORIES = gql`
  query GetCategories($text: String, $page: Int, $limit: Int){
    categories(text: $text, page: $page, limit: $limit){
      errors{
        message
      }
      pagination{
        itemCount
        pageCount
        page
        limit
        allPages
        pagination {
          next {
            page
          }
          prev {
            page
          }
        }
      }
      data{
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
  }
`

const GET_ALL_CATEGORIES = gql`
  query getAllCategories{
    allCategories{
      errors{
        message
      }
      data{
        id
        title
        user{
          id
          name
          email
        }
        createdAt
      }
    }
  }
`

export { GET_CATEGORIES, GET_ALL_CATEGORIES }