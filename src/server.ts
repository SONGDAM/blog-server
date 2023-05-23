import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Post {
    id: ID!
    created_At: String!
    updated_At: String!
    body: String!
    title: String!
  }

  type Query {
    posts: [Post]
  }
`;

const posts = [
  {
    id: "1",
    created_At: "2023-05-23T10:00:00Z",
    updated_At: "2023-05-23T12:30:00Z",
    body: "This is the body of the first post.",
    title: "The Awakening",
  },
  {
    id: "2",
    created_At: "2023-05-22T15:20:00Z",
    updated_At: "2023-05-23T09:45:00Z",
    body: "This is the body of the second post.",
    title: "City of Glass",
  },
];

const resolvers = {
  Query: {
    posts: () => posts,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
