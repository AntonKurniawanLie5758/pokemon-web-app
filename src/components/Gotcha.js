/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";
import PokeClosed from "../assets/images/poke-closed.png";
import {Image} from "react-bootstrap";

export function Gotcha(props) {

    function handleSuccessfull() {
        props.handleSuccessful(null);
        props.handleChildData("");
    }

    return (
        <div css={GotchaWrapper}>
            <div>
                <Image css={PokeballIcon} src={PokeClosed} alt-={"pokeball-icon-image"}/>
            </div>
            <div css={GotchaText}>GOTCHA</div>
            <div css={BackButton} className={"nes-btn"} onClick={handleSuccessfull}>
                BACK
            </div>
        </div>
    )
}

const GotchaWrapper = css `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    -webkit-animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
`;

const PokeballIcon = css`
    width: auto;
    height: 100px;
    padding-right: 15px;
    object-fit: contain;
`;

const GotchaText = css `
    font-size: 31px;
`;

const BackButton = css `
    margin-top: 1rem;
    min-width: 200px;
`