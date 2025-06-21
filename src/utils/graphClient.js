// utils/graphqlClient.js
import { GraphQLClient } from "graphql-request";

const getGraphQLClient = () => {
  const token = JSON.parse(localStorage.getItem("auth"))?.token;
  return new GraphQLClient("https://sipelmasd-production.up.railway.app/graphql", {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

export default getGraphQLClient;
