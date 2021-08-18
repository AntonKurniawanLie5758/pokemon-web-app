/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from '@emotion/react'

const breakpoints = [480, 768, 1024, 1440]

const mq = breakpoints.map(
    bp => `@media (max-width: ${bp}px)`
)

export function PokemonList(props) {
    const cardHandler = () => {
        props.passGrandChildData(props.pokemon.name);
    };


    return (
        <div css={PokemonCard} key={props.pokemon.index} onClick={cardHandler}>
            <div css={PokemonImageWrapper}>
                <img src={props.pokemon.image} alt={props.pokemon.name}/>
            </div>
        </div>
    )
}


const PokemonCard = css`
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 10rem;
    padding: 15px;
    position: relative;
    border-bottom: 2px solid #3B4CCA;
    transition: all 0.5s ease-in-out;
    
    &:hover {
        background-color: rgba(223,232,247,1);
        img {
            transform: scale(1.2);
        }
    }
    
    &:before {
      content: "";
      border-bottom: 2px solid #CC0000;
      position: absolute;
      display: block;
      bottom: 4px;
      left: 0;
      width: 30%;
    }
    
    ${mq[0]} {
        border: 1px solid transparent;
        margin: 0 10px;
        min-height: 128px;
        padding: 10px;
        background: #FFF;
        border-radius: 15px;
        -webkit-box-shadow: 0px 0px 15px -7px #000000; 
        box-shadow: 0px 0px 15px -10px #000000;
        
        &:before {
            display: none;
        }
    }
    
`

const PokemonImageWrapper = css`
    display:flex;
    justify-content: center;
    align-items: center;
    
    img {
      transform: scale(1);
      transition: all 0.5s ease-in-out;
    }
`;