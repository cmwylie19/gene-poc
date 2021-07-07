import { ApolloServer, gql } from "apollo-server";
import Task from "./task";
import db from "./db";
import "dotenv/config";
console.log("Hello");

const typeDefs = gql`
  type Task {
    id: ID
    name: String
    complete: Boolean
  }
  type Query {
    getTasks: [Task]
  }
  type Mutation {
    createTask(name: String!): Task
    updateTask(name: String!, complete: Boolean!): Task
  }
`;

const resolvers = {
  Query: {
    getTasks: async () => {
      const tasks = await Task.find({});
      return tasks;
    },
  },
  Mutation: {
    updateTask: async (_, { name, complete }) => {
      let result = await Task.updateOne(
        { name },
        { $set: { complete } },
        { runValidators: true }
      );
      console.log(`Result: ${JSON.stringify(result, undefined, 2)}`);
      return { name, complete };
    },
    createTask: async (_, { name, complete }) => {
      const task = new Task({ name, complete });
      const result = await task.save();
      return {
        id: result._id,
        complete: result.complete,
        name: result.name,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen({ port: 4000 })
  .then(({ url }) => console.log(`Server ready at ${url}`))
  .catch((err) => console.log(`Error: `, err));
