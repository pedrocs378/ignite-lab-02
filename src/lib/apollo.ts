import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4opv9t00mh601xx8ejwdbec/master',
  cache: new InMemoryCache()
})