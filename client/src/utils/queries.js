import { gql } from '@apollo/client';

export const QUERY_ITEMS = gql`
  {
    items
  }
`;

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      password
      money
      appleCount
      gemCount
      orchards {
        _id
        trees {
          _id
          duration
        }
      }
      trees {
        _id
        duration
      }
      juicers {
        _id
        duration
      }
      ovenCount
      masherCount
      juicerCount
      treeCount
      mashers {
        _id
        duration
      }
      ovens {
        _id
        duration
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query Users {
    users {
      username
      money
    }
  }
`;
