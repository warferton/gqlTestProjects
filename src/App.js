import React from 'react';
import {ApolloProvider} from '@apollo/client';
import {ApolloClient, HttpLink, InMemoryCache, split} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities'
import {WebSocketLink} from '@apollo/client/link/ws'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Planet from './components/planet.component'
import PlanetSearch from './components/planetSearch.component'


const GRAPHQL_URI = 'planets.hasura.app/v1/graphql';

//TODO: move Hsura key to a server api later (maybe)
const httpLink = new HttpLink({
    uri: `https://${GRAPHQL_URI}`,
    headers:{"x-hasura-admin-secret" : process.env.REACT_APP_X_ADMIN_SECRET}
  })
 
const wsLink = new WebSocketLink({
  uri: `wss://planets.hasura.app/v1/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_X_ADMIN_SECRET}`
          }
    },
  }
})

const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return(
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

const App = () =>{
  return(
  <Router>
    <ApolloProvider client = {client}>
      <Switch>
        <Route path="/planet/:id" exact component={Planet}/>
        <Route path='/' exact component={PlanetSearch} />
      </Switch>
    </ApolloProvider>
  </Router>
  )
}

export default App