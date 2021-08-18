/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from "react";
import {Container, Image} from "react-bootstrap";
import Localbase from "localbase";
import {Loading} from "../components/Loading";
import { css } from '@emotion/react'

const breakpoints = [480, 768, 1024, 1440]

const mq = breakpoints.map(
    bp => `@media (max-width: ${bp}px)`
)


function MyPokemonList() {
    const db = new Localbase('tkpd-pokemon-db');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();

    function loadData() {
        db.collection('my_data').get({ keys: true }).then(data => {
            setData(data);
        })
    }

    useEffect(()=> {
        setLoading(true);
        loadData();
        setLoading(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <>
            <Container>
                    {loading
                        ? <Loading/>
                        : data === undefined
                            ? <Loading/>
                            : <div css={PokemonListWrapper}>
                                {data.map((result,i) => {
                                    return <CardPokemon data={result} key={i}  id={data[i].key} />
                                    })
                                }
                            </div>
                    }
            </Container>
        </>
    )
}

function CardPokemon(props) {
    const data = props.data.data;

    return (
        <a href={"/pokemon-detail/" + data.id+ "/" + data.species} css={PokemonCard}>
            <div css={PokemonCardImage}>
                <Image src={data.images} alt={"image-pokemon"}/>
            </div>
            <div css={PokemonName}>
                {data.name}
            </div>
        </a>
    )
}

const PokemonListWrapper = css `
    display: grid;
    grid-template-columns: repeat(6,1fr);
    grid-gap: 15px;
    ${mq[0]} {
        grid-template-columns: repeat(2,1fr);
        max-height: calc(83vmax - 25px);
        overflow: scroll;
    }
`;

const PokemonCard = css `
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 15px;
    background: #FFF;
    padding: 35px 0 0 0;
    ${mq[0]} {
        padding: 25px 0 0 0;
    }
`;

const PokemonCardImage = css `
   padding: 15px 35px;
   margin-top: -15px;
   img {
    object-fit: contain;
   }
   ${mq[0]} {
    min-height: 126px;
    padding: 15px;
   }
`


const PokemonName = css`
    text-align: center;
    text-transform: capitalize;
    background-color: rgba(59, 76, 202, 0.5);
    padding: 0.5rem 0;
    font-size: 10px;
    width: 100%;
    color: #FFF;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`;


export default MyPokemonList;