import React, {useState} from "react";
import {PokemonContainer} from "../components/PokemonContainer";
import ArrowIcon from "../assets/images/arrow-icon.png";
import {PokemonDetail} from "../components/PokemonDetail";
import {Image} from "react-bootstrap";


function Home() {
    const [limit, setLimit] = useState(18);

    const buttonLimit = () => {
        setLimit(limit + 6);
    };

    const [childData, setChildData] = useState("");

    const handleList = () => {
        setChildData("");
    }

    return (
        <>
            <div className="d-flex content-mobile">
                <div className={childData ? "pokemon-list-wrapper type-detail" : "pokemon-list-wrapper"}>
                    <PokemonContainer limit={limit} passChildData={setChildData} setLimit={setLimit} limit={limit}/>
                    <div className="btn-wrapper">
                        <button type="button" className="nes-btn btn-custom" onClick={buttonLimit}>LOAD MORE</button>
                    </div>
                </div>

                <div className={childData ? "arrow-icon-wrapper type-show" : "arrow-icon-wrapper"} onClick={handleList}>
                    <Image src={ArrowIcon} alt={"arrow-icon"}/>
                </div>

                <div className="select-pokemon-wrapper">
                    {childData
                        ? <PokemonDetail name={childData} handleChildData={setChildData}/>
                        : <div className={"d-flex justify-content-center align-items-center pb-5 h-80 fade-in-text"}><h5
                            className={"text-center text-mobile"}>SELECT YOUR POKEMON</h5></div>
                    }
                </div>

            </div>
        </>
    );
}

export default Home;
