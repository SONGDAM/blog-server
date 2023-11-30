import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

interface Post {
  id: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  title: string;
}

interface CreatePostInput {
  title: string;
  content: string;
}

const typeDefs = `#graphql
 type Post {
    id: ID!
    createdAt: String!
    updatedAt: String!
    body: String!
    title: String!
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post
  }

  input CreatePostInput {
    title: String!
    content: String!
  }
`;

const posts = [
  {
    id: "1",
    createdAt: "2023-05-23T10:00:00Z",
    updatedAt: "2023-05-23T12:30:00Z",
    body: "This is the body of the first post.",
    title: "The Awakening",
  },
  {
    id: "2",
    createdAt: "2023-05-22T15:20:00Z",
    updatedAt: "2023-05-23T09:45:00Z",
    body: "This is the body of the second post.",
    title: "City of Glass",
  },
];

const resolvers = {
  Query: {
    posts: () => posts,
    post: (parent: any, { id }: any) => posts.find((post) => post.id === id),
  },
  Mutation: {
    createPost: (parent: any, { input }: { input: CreatePostInput }) => {
      const { title, content } = input;
      const newPost: Post = {
        id: String(posts.length + 1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        body: content,
        title,
      };
      posts.push(newPost);

      return newPost;
    },
  },
};

const myPlugin = {
  async requestDidStart(requestContext) {
    console.log("Request started! Query:\n" + requestContext.request.query);

    return {
      async parsingDidStart(requestContext) {
        console.log("Parsing started!");
      },

      async validationDidStart(requestContext) {
        console.log("Validation started!");
      },
    };
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // csrfPrevention: true,
  plugins: [myPlugin],
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
