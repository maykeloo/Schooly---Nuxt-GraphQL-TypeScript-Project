import { defineNuxtPlugin } from "#app"
import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client/core"
import { DefaultApolloClient } from "@vue/apollo-composable"
import {setContext} from "@apollo/client/link/context";

export default defineNuxtPlugin((nuxtApp) => {

  const httpLink = createHttpLink({
    uri: "http://localhost:4000"
  })

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token")

    return {
      headers: {
        ...headers,
        authorization: token
      }
    }
  })

  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
  })
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})