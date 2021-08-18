import React from "react";
import './App.css';
import {ApolloClient, ApolloProvider, InMemoryCache,} from '@apollo/client';
import {Header} from "./components/layout/Header";
import {GlobalStyles} from "./components/GlobalStyles";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Home from "./pages/Home";
import MyPokemonList from './pages/MyPokemonList';
import PokemonDetailPage from './pages/PokemonDetailPage';


function App() {
    const client = new ApolloClient({
        uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
        cache: new InMemoryCache(),
    })

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <GlobalStyles/>
                <Header/>
                <div className={'default-section type-no-bottom'}>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/my-pokemon-list" exact component={MyPokemonList} />
                        <Route path="/pokemon-detail/:id/:species"
                            render={(props) => (
                                <PokemonDetailPage {...props} />
                            )}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        </ApolloProvider>
  );
}

export default App;
