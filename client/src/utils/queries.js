import { gql } from '@apollo/client';

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
      orchardId
      juicers {
        _id
        duration
      }
      mashers {
        _id
        duration
      }
      ovens {
        _id
        duration
      }
      ovenCount
      masherCount
      juicerCount
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

export const QUERY_ORCHARD = gql`
  query orchard ($id: ID!) {
    orchard(_id: $id) {
      _id
      orchard_name
      treeCount
      trees {
        _id
        duration
      }
    }
  }
`;
