/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from '@emotion/react'
import PokedexIcon from "../../assets/images/pokedex.jpeg";
import BackpackIcon from "../../assets/images/backpack.png";
import {useHistory, useLocation} from 'react-router-dom';
import {Image} from "react-bootstrap";

const breakpoints = [480, 768, 1024, 1440]

const mq = breakpoints.map(
    bp => `@media (max-width: ${bp}px)`
)

export function Header() {
    const location = useLocation();
    let history = useHistory();

    const handleBack = () => {
        history.push('/')
    }

    return (
        <>
            <div css={HeaderWrapper}>
                <a href={"#"} onClick={handleBack}>
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
                        css={logo} alt={"logo-icon"}/>
                </a>
                <div css={MenuWrapper}>
                    <a href={"#"} onClick={handleBack} css={MenuItemWrapper} className={location.pathname === "/" ? "type-active" : ""}>
                        <div css={MenuIcon}>
                            <Image src={PokedexIcon} alt={"pokdex-logo"}/>
                        </div>
                        <div css={MenuLabel}>
                            Pokedex
                        </div>
                    </a>

                    <a href={"/my-pokemon-list"} css={MenuItemWrapper}
                       className={location.pathname === "/my-pokemon-list" ? "type-active" : ""}>
                        <div css={MenuIcon}>
                            <Image src={BackpackIcon} alt={"backpack-icon"}/>
                        </div>
                        <div css={MenuLabel}>
                            My Pokemon List
                        </div>
                    </a>
                </div>
            </div>

            <div css={MenuMobile}>
                <a href={"#"} onClick={handleBack} css={MenuMobileWrapper} className={location.pathname === "/" ? "type-active" : ""}>
                    <div css={MenuMobileLogoWrapper}>
                        <Image src={PokedexIcon} alt={"pokdex-icon"}/>
                    </div>
                    <div css={MenuLabelMobile}>
                        Pokedex
                    </div>
                </a>

                <a href={"/my-pokemon-list"} css={MenuMobileWrapper}
                   className={location.pathname === "/my-pokemon-list" ? "type-active" : ""}>
                    <div css={MenuMobileLogoWrapper}>
                        <Image src={BackpackIcon} alt="backpack-icon"/>
                    </div>
                    <div css={MenuLabelMobile}>
                        My Pokemon List
                    </div>
                </a>

            </div>
        </>
    );
}


const MenuMobile = css`
    display: none;
    ${mq[0]} {
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba( 255, 255, 255, 0.25 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 4px );
        -webkit-backdrop-filter: blur( 4px );
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 5px;
        z-index: 999;
    }
`;

const MenuMobileWrapper = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 1 50%;
    filter: grayscale(1);
    transition: all 0.5s ease-in-out;
    
    &.type-active {
        pointer-events: none;
        filter: grayscale(0);
    }
`

const MenuMobileLogoWrapper = css`
    padding-bottom: 5px;
    img {
       object-fit: contain;
       width: 25px;
    }
`;

const MenuLabelMobile = css`
    font-size: 0.6rem;
    color: #333;
    font-weight: bold;
    text-transform: uppercase;
`;


const HeaderWrapper = css`
    position: absolute;
    top:0;
    width: 100%;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    
     ${mq[0]} {
        justify-content: center;
     }
`;

const logo = css`
    height: 40px;
    object-fit: contain;    
`;

const MenuWrapper = css`
    display:flex;
    justify-content: flex-end;
    align-items: center;
    ${mq[0]} {
        display: none;
    }
`;

const MenuItemWrapper = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 1rem;
    position: relative;
    
    &:before {
       content: '';
       position: absolute;
       right: 0;
       bottom: 0;
       width: 0px;
       transition: all 0.5s ease-in-out;
        border-bottom: 2px solid #3B4CCA;
    } 
    
    &:hover {
        &:before {
            transition: all 0.5s ease-in-out;
            width: 50%;
        }
    }
    
    &.type-active {
           pointer-events: none;
           &:before {
            transition: all 0.5s ease-in-out;
            width: 50%;
        }
    }
    
`;

const MenuIcon = css`
    margin-right: 5px;
    
    img { 
        width: 30px;
        height: 30px;
        object-fit: contain;
    }
`

const MenuLabel = css`
    font-size: 0.6rem;
    color: #333;
    font-weight: bold;
    text-transform: capitalize;
`;

