import React, { useState } from "react";
import './styles.css';

import logo from '../../assets/img/logo.png';

import Flys from "../../components/flys";
import Background from "../../components/background/index.js";
import { getRandomInt } from "../../game/utilities.js";

export default function Home() {
    const [bgi, setBgi] = useState(0);
    const [difficulty, setDifficulty] = useState(0);

    const game_session = JSON.parse(sessionStorage.getItem('gameSession'));
    
    window.onload = () => {
        if (!game_session) return;
        setBgi(game_session.background);
        setDifficulty(game_session.difficulty);
    };


    function changeBG(e) {
        if (e.target.value === "") return;
        setBgi(Number(e.target.value));
    };


    function changeDf(e) {
        if (e.target.value === "") return;
        setDifficulty(Number(e.target.value));
    };


    function start() {
        if (difficulty === 0) {
            alert('Selecione a dificuldade para continuar!');
            return;
        };
        let obj = JSON.stringify({
            background: bgi,
            difficulty: difficulty
        });

        sessionStorage.setItem('gameSession', obj);
        window.location.href = '/playing';
    };


    return (
        <>
            <section className='container'>
                <div>
                    <Flys className="l-side" frI={getRandomInt(0, 5)} size={1} />
                    <img className="logo" src={logo} alt="logo" />
                    <Flys className="r-side" frI={getRandomInt(0, 5)} size={0} />
                </div>
                <div className="ops">
                    <select onChange={changeDf} className="opt" value={difficulty}>
                        <option value="">Dificuldade</option>
                        <option value="1">Facíl</option>
                        <option value="2">Médio</option>
                        <option value="3">Dificil</option>
                        <option value="4">Muito Dificil</option>
                    </select>
                    <Flys className="center-fly" frI={getRandomInt(0, 5)} size={2} />
                    <select onChange={changeBG} className="opt" value={bgi}>
                        <option value="0">Cenário 1</option>
                        <option value="1">Cenário 2</option>
                        <option value="2">Cenário 3</option>
                        <option value="3">Cenário 4</option>
                        <option value="4">Cenário 5</option>
                    </select>
                </div>
                <div>
                    
                    <button onClick={start} className="btn-start">Iniciar</button>
                </div>
            </section>
            <Background bgI={bgi} />
        </>
    );
};