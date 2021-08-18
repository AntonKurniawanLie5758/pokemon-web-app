/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";
import PokeOpen from "../assets/images/poke-open.png";
import {Image} from "react-bootstrap";

export function Escaped(props) {

    function handleSuccessfull() {
        props.handleSuccessful(null);
        props.handleChildData("");
    }

    return (
        <div css={EscapedWrapper}>
            <div>
                <Image css={PokeballIcon} src={PokeOpen} alt={"poke-open-image"}/>
            </div>
            <div css={EscapedText}>FAILED</div>
            <div css={BackButton} className={"nes-btn"} onClick={handleSuccessfull}>BACK</div>
        </div>
    )
}

const EscapedWrapper = css `
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

const EscapedText = css `
    font-size: 31px;
`;

const BackButton = css `
    margin-top: 1rem;
    min-width: 200px;
`