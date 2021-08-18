/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from "react";
import {Button, Form, Image, Modal, Tab, Tabs} from "react-bootstrap";
import PokeOpen from "../assets/images/poke-open.png";
import PokemonRename from "../assets/images/pokemon-rename.png";
import {css} from "@emotion/react";
import {useQuery} from "@apollo/client";
import {GET_POKEMON_DETAIL} from "../graphql/get-pokemon-detail";
import Localbase from "localbase";
import {useParams} from 'react-router-dom'
import {Loading} from "../components/Loading";
import ArrowIcon from "../assets/images/arrow-icon.png";


const breakpoints = [480, 768, 1024, 1440]

const mq = breakpoints.map(
    bp => `@media (max-width: ${bp}px)`
)


function PokemonDetailPage() {
    const db = new Localbase('tkpd-pokemon-db');
    let {id, species} = useParams();
    const [loading, setLoading] = useState(false);
    const [myData, setData] = useState('');
    const [owned, setOwned] = useState(0);
    const [key, setKey] = useState('abilities');
    const [showRename, setShowRename] = useState(false);
    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');

    const handleClose = () => setShowRename(false);
    const handleOpen = () => setShowRename(true);

    const {data} = useQuery(GET_POKEMON_DETAIL, {
        variables: {
            name: species
        }
    });

    useEffect(() => {
        loadData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function loadData() {
        setLoading(true);
        db.collection('my_data').doc({id: id}).get().then(result => {
            setData(result);
            setName(result.name);
        })
        setLoading(false);
    }

    if (myData.species !== "" || myData.species !== undefined) {
        getOwned();
    }

    const handleRelease = () => {
        db.collection('my_data').doc({id: id}).delete();
        window.location.href = "/my-pokemon-list";
    }

    const handleRedirect = () => {
        window.location.href = "/";
    }

    function getOwned() {
        let tempData = [];
        db.collection("my_data").get().then(data => {
            data.map((result, i) => {
                if (result.species === myData.species) {
                    tempData.push(myData.species);
                }
            })
            setOwned(tempData.length);
        });
    }

    function handleRename() {
        db.collection("my_data").doc({id: id}).update({
            name: nickname
        })
        setName(nickname);
        setNickname("");
        setShowRename(false);
    }


    return (
        <>
            <div className={"arrow-icon-wrapper type-show type-list"} onClick={handleRedirect}>
                <Image src={ArrowIcon} alt={"arrow-icon"}/>
            </div>

            {data === undefined
                ? <Loading/>
                : <>
                    <div css={PokemonMainCardWrapper}>
                        <div css={PokemonCardWrapper}>
                            <div css={PokemonImageWrapper}>
                                <div css={PokemonImage}>
                                    <Image src={data.pokemon.sprites.front_default} alt={"pokemon-image-" + data.pokemon.name}/>
                                </div>
                            </div>
                            <div css={PokemonCardInformationWrapper}>
                                <div css={PokemonName}>{name}</div>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="abilities" title="Abilities">
                                        <div css={PokemonContentWrapper}>
                                            <div css={PokemonAbilitiesWrapper}>
                                                {
                                                    data.pokemon.abilities.length === 0
                                                        ? null
                                                        : data.pokemon.abilities.map((data, i) => {
                                                            return <span className={"type-" + data.ability.name}
                                                                         key={i}>{data.ability.name} </span>
                                                        })
                                                }
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="move" title="Moves">
                                        <div css={PokemonMovesWrapper}>
                                            {
                                                data.pokemon.moves.length === 0
                                                    ? null
                                                    : data.pokemon.moves.map((move, i) => {
                                                        return <div css={PokemonMove} key={i}>{move.move.name}</div>
                                                    })
                                            }
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                            <div css={PokemonTypesWrapper}>
                                {
                                    data.pokemon.types.length === 0
                                        ? null
                                        : data.pokemon.types.map((data, i) => {
                                            return <span className={"type-" + data.type.name}
                                                         key={i}>{data.type.name} </span>
                                        })
                                }
                            </div>

                            <div css={PokeBallMobile} onClick={handleRelease}>
                                <Image src={PokeOpen} alt={"poke-open-image"}/>
                                <div className="text-center mt-1">Release</div>
                            </div>

                            <div css={RenameMobile} onClick={handleOpen}>
                                <span>Rename</span>
                            </div>

                            <div css={PokemonOwnedWrapper}>
                                <span>Owned : {loading ? "0" : owned}</span>
                            </div>

                        </div>
                    </div>
                    <div css={PokeBall} onClick={handleRelease}>
                        <Image src={PokeOpen} alt={"poke-open-image"}/>
                        <div className="text-center mt-1">Release</div>
                    </div>


                    <div css={RenameWrapper} onClick={handleOpen}>
                        <Image src={PokemonRename} alt={"poke-open-image"}/>
                        <div className="text-center mt-1">Rename</div>
                    </div>

                    <Modal
                        show={showRename}
                        onHide={handleClose}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    onChange={input => {
                                        setNickname(input.target.value);
                                    }}
                                />
                            </Form.Group>

                            <div css={ButtonModalWrapper}>
                                <Button variant="Secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={handleRename}>
                                    Save Changes
                                </Button>
                            </div>
                        </Modal.Body>
                    </Modal>
                </>
            }

        </>
    )
}





const RenameMobile = css`
    display: flex;
    font-size: 9px;
    position: absolute;
    text-transform: capitalize;
    top: 10px;
    left: 10px;
    
    span {
        margin-right: 5px;
        padding: 0.5rem;
        color: #fff;
        border-radius: 15px;
        background: rgb(0,66,66);
        background: linear-gradient(229deg, rgba(0,66,255,0.8) 0%, rgba(0,0,204,0.8) 100%);
        text-align: center;
    }
    
    ${mq[0]} {
        top: 8.5rem;
        right: 5px;
    }
`

const PokeBallMobile = css`
   display: none;
   
   ${mq[0]} {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 9px;
        text-transform: uppercase;
        padding: 5px 10px;
        background: #FFF;
        border-top-right-radius: 10px;
        z-index: 20;
        
        img {
            width: auto;
            height: 50px;
            object-fit: contain;
        }
   }
`;

const PokeBall = css`
    background: rgb(255,255,255);
    padding: 1rem 2rem;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    position: fixed;
    bottom: 37%;
    right: 0;
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    transition: all 0.3s ease-in-out;
    
    &:hover {
        -webkit-filter: grayscale(0%);
        filter: grayscale(0%);
        
        img {
            animation: spin 1.25s cubic-bezier(.36,.07,.19,.97) infinite;
        }
    }
    
    img {
        width: auto;
        height: 80px;
        padding-left: 15px;
        object-fit: contain;
    }
    
    ${mq[0]} {
        display: none;
    }
`

const PokemonMainCardWrapper = css`
    display: flex;
    justify-content: center;
    align-items:center;
    ${mq[0]} {
        padding: 0 1rem;
    }
`

const PokemonCardWrapper = css`
    display: flex;
    flex-direction: column;
    background: rgba( 255, 255, 255, 0.25 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    width: 35rem;
    position: relative;
    min-height: 512px;
    max-height: 512px;
    
    ${mq[0]} {
      max-height: 100%;
      min-height: 460px;
      width: 100%;
    }
`;

const PokemonCardInformationWrapper = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    
        
    ${mq[0]} {
        margin-top: -20px;
    }
`;

const PokemonName = css`
    text-align: center;
    text-transform: capitalize;
    background-color: rgba(59, 76, 202, 0.5);
    padding: 0.5rem 0;
    color: #FFF;
`;

const PokemonContentWrapper = css`
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
    padding: 0.5rem 0;
    font-size: 15px;
    
    &:first-of-type {
        padding: 0 0 0.5rem;
    }
   
`

const PokemonAbilitiesWrapper = css`
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
    font-size: 10px;
    max-height: 200px;
    overflow: scroll;
    
    span {
        background: rgb(255,222,0);
        background: linear-gradient(229deg, rgba(255,222,0,0.7) 0%, rgba(179,161,37,0.7) 100%);
        border-radius: 25px;
        padding: 1rem;
        margin: 0.5rem 0;
        text-align: center;
        color: #FFF;
        
    }
`;

const PokemonOwnedWrapper = css`
    display: flex;
    font-size: 9px;
    position: absolute;
    text-transform: capitalize;
    top: 10px;
    right: 10px;
    
    span {
        margin-right: 5px;
        padding: 0.5rem;
        color: #fff;
        border-radius: 15px;
        background: rgb(255,66,0);
        background: linear-gradient(229deg, rgba(255,66,0,0.8) 0%, rgba(204,0,0,0.8) 100%);
        text-align: center;
    }
    
    ${mq[0]} {
        top: 8.5rem;
        right: 5px;
    }
`

const PokemonTypesWrapper = css`
    display: flex;
    font-size: 9px;
    position: absolute;
    text-transform: capitalize;
    top: 10px;
    left: 10px;
    
    span {
        margin-right: 5px;
        padding: 0.5rem;
        color: #fff;
        border-radius: 15px;
        
        &.separator {
            background-color: #333;
        }
        
        &.type-grass {
            background-color: #78C850;
        } 
        
        &.type-fire {
            background-color: #F08030;
        }
        
        &.type-water {
            background-color: #6890F0;
        }
        
        &.type-bug {
            background-color: #A8B820;
        }
        
        &.type-normal {
            background-color: #A8A878;
        }
        
        &.type-poison {
            background-color: #A040A0;
        }
        
        &.type-electric {
            background-color: #F8D030;
        }
        
        &.type-ground {
            background-color: #E0C068;
        }
        
        &.type-fairy {
            background-color: #EE99AC;
        }
        
        &.type-fighting {
            background-color: #C03028;
        }
        
        &.type-psychic {
            background-color: #F85888;
        }
        
        &.type-rock {
            background-color: #B8A038;
        }
        
        &.type-ghost {
            background-color: #705898;
        }
        
        &.type-ice {
            background-color: #98D8D8;
        }
        
        &.type-dragon {
            background-color: #7038F8;
        }
        
        &.type-flying {
            background-color: #3D7DCA;
        }
    }
    
`;

const PokemonMovesWrapper = css`
    max-height: 210px;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-gap: 10px;
    overflow: scroll;
    padding: 0 1rem;
    position: relative;
    
    ${mq[0]} {
      grid-template-columns: repeat(2,1fr);
      max-height: 200px;
    }
`;

const PokemonMove = css`
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    padding: 0 0.2rem;
    background-color: rgba(0,0,0,0.5);
    border-radius: 25px;
    color: white;
    min-height: 50px;
    font-size: 10px;
    text-transform: capitalize;
`;

const PokemonImageWrapper = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    
    ${mq[0]} {
        padding: 1rem 0;
    }

`;

const PokemonImage = css`
    img {
        width: 150px;
        image-rendering: pixelated;
        
        ${mq[0]} {
            padding-top: 1rem;
        }
    }

`;


const ButtonModalWrapper = css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    
    button {
        margin: 0 5px;
        min-width: 150px;

    }
    
    ${mq[0]} {
        flex-direction: column;
        justify-content: center;
        
        button {
            margin: 5px 0;
            width: 100%;
            border-radius: 25px;
        }
    }
`;


const RenameWrapper = css`
    background: rgb(255,255,255);
    padding: 1rem 2rem;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    position: fixed;
    bottom: 37%;
    left: 0;
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    transition: all 0.3s ease-in-out;
    
    &:hover {
        -webkit-filter: grayscale(0%);
        filter: grayscale(0%);
 
    }
    
    img {
        width: auto;
        height: 80px;
        padding-left: 15px;
        object-fit: contain;
    }
    
    ${mq[0]} {
        display: none;
    }
`


export default PokemonDetailPage;