/** @jsxImportSource @emotion/react */
import React from "react";
import {useQuery} from "@apollo/client";
import {GET_POKEMONS} from "../graphql/get-pokemons";
import {PokemonList} from "./PokemonList";
import {Loading} from "./Loading";
import {css} from "@emotion/react";

const breakpoints = [480, 768, 1024, 1440]

const mq = breakpoints.map(
    bp => `@media (max-width: ${bp}px)`
)

export function PokemonContainer(props) {
     const {data: {pokemons = []} = {}} = useQuery(GET_POKEMONS, {
         variables: {
             limit: props.limit,
             offset: 0,
         }
     });

    const buttonLimit = () => {
        props.setLimit(props.limit + 6);
    };

    return (
        <div css={ListBackground} className={pokemons.length === 0 ? "type-loading" : ""}>
         {
             pokemons.length === 0
                 ? <Loading/>
                 : <div css={PokemonWrapper}>
                     {pokemons.results.map(function(pokemon,i) { return <PokemonList pokemon={pokemon} key={i} passGrandChildData={props.passChildData}/> })}
                    <div css={PokemonCard}>
                        <button type="button" className="nes-btn" onClick={buttonLimit}>LOAD MORE</button>
                    </div>
                 </div>
         }
        </div>
 )
}

const ListBackground = css `
    background: rgba( 255, 255, 255, 0.15 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 2.0px );
    -webkit-backdrop-filter: blur( 2.0px );
    max-height: calc(100% - 6rem);
    min-width: 10rem;
    height: 70vh;
    // border-top-right-radius: 5px;
    // border-bottom-right-radius: 5px;
    
    &.type-loading {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
        
    ${mq[0]} {
        height: 100%;
        min-height: 159px;
        box-shadow: unset;
        background: transparent;
    }
`;

const PokemonWrapper = css `
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 10rem;
    overflow: scroll;
    z-index: 1;
    position: relative;
    height: 72.5vh;
    
    ${mq[0]} {
        flex-direction: row;
        width: 100%;
        height: 100%;
        padding: 15px 0 5px 0;
    }
`;

const PokemonCard = css`
    background-color: transparent;
    display: none;
    justify-content: center;
    align-items: center;
    width: 10rem;
    padding: 10px;
    position: relative;
    font-size: 12px;
    
    ${mq[0]} {
        display: flex;
        border: 1px solid transparent;
        margin: 0 10px;
        min-height: 128px;
    }
    
`
