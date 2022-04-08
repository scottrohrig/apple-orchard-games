import { gql } from '@apollo/client';

export const QUERY_ITEMS = gql`
  {
    items
  }
`;

// me

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      money
      appleCount
      gemCount
      orchards {
        _id
      }
      trees {
        _id
      }
      juicers {
        _id
      }
      mashers {
        _id
      }
      ovens {
        _id
      }
    }
  }
`;

// // get orchards
// export const GET_ORCHARDS = gql`
//   query {

//   }
// `;

// // get mashers
// export const GET_MASHERS = gql`
//   query {

//   }
// `;

// // get juicers
// export const GET_JUICERS = gql`
//   query {

//   }
// `;
// // get ovens
// export const GET_OVENS = gql`
//   query {

//   }
// `;
// // get trees
// export const GET_TREES = gql`
//   query {

//   }
// `;
