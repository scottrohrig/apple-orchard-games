import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      password
    }
  }
`;

export const QUERY_USERS = gql`
  query Users {
    users {
      username
    }
  }
`;
