const {
  ApolloServer,
  AuthenticationError,
  gql,
} = require("apollo-server-lambda");
const { Listing, User } = require("../db");
const jwt = require("jsonwebtoken");

const typeDefs = gql`
  type Query {
    listings: [Listing!]!
  }
  type Mutation {
    createListing(input: CreateListingInput!): Listing!
  }
  input CreateListingInput {
    title: String!
    description: String
    url: String!
    notes: String
  }
  type Contact {
    id: ID!
    name: String!
    company: Company
    email: String
    notes: String
  }
  type Company {
    id: ID!
    name: String!
    logo: String
    listings: [Listing!]!
    url: String
  }
  type Listing {
    id: ID!
    title: String!
    description: String
    url: String!
    notes: String
    company: Company
    contacts: [Contact!]!
  }
`;

const resolvers = {
  Query: {
      /*graphqlPlayground: (parent, args, contenxt) => {
          return "Hello from the other side"
      }*/
      listings() {
          return [
              {
                  id: 1,
                  title: "Software Developer",
                  description: "Google Cloud Platform",
                  url: "www.google.com",
                  note: null,
                  company: {
                      id: 121,
                      name: "Google",
                      url: "www.google.com",
                      listings: null
                  },
                  contacts: []
              },
              {
                  id: 2,
                  title: "Software Advocate",
                  description: "Hashicorp Multi-cloud",
                  url: "www.hashicorp.com",
                  note: null,
                  company: {
                      id: 121,
                      name: "Hashicorp",
                      url: "www.hashicorp.com",
                      listings: null
                  },
                  contacts: []
              }
          ]
      }
  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();