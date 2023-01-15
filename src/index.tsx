import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { URI } from "./constant/constant";
import { UserObjectType } from "./features/user/userSlice";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import "./asset/scss/style.scss";
import "./asset/scss/responsive.scss";

const container = document.getElementById("root")!;
const root = createRoot(container);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        contents: {
          merge(_existing, incoming) {
            return incoming;
          },
        },
        categories: {
          merge(_existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const httpLink = createHttpLink({
  uri: URI,
});

const authenticationLink = setContext((_: any, { headers }: any) => {
  const user = (
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null
  ) as UserObjectType;

  return {
    headers: {
      ...headers,
      authorization: user ? user.token : "",
    },
  };
});

const client = new ApolloClient({
  link: authenticationLink.concat(httpLink),
  cache,
  // defaultOptions: {
  //   query: {
  //     fetchPolicy: "network-only",
  //   },
  //   watchQuery: {
  //     fetchPolicy: "network-only",
  //   },
  // },
});

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);
