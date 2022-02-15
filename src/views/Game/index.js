import React, { useReducer, useState } from "react";
import reactDom from "react-dom";
import './styles.css';

import Background from "../../components/background/index.js";
import Bars from "../../components/bars/index.js";
import hpImg from "../../assets/img/HPH.png";
import starImg from "../../assets/img/Star.png";
import flyArr from "../../utils/flyArr.js";
import puArr from "../../utils/puArr.js"
import { comboReducer } from "../../game/reducers.js";
import { timer } from "../../game/utilities.js";
import { spawn, pointsMeter, damageMeter } from "../../game/fly_works.js";
import barControl from "../../game/barControl.js";

const difficulties = require('../../config/difficulties.json');
const game_session = JSON.parse(sessionStorage.getItem('gameSession'));

let diffIndex = [0, "easy", "medium", "hard", "veryhard"];
if (game_session) diffIndex = diffIndex[game_session.difficulty];

let disappearTimeout = {};
let hpLife = { bar: 100, count: 0 };
let streakI = { bar: 0, count: 1 };
let combo = [];
let scoreT = 0;


function gameOver() {
    console.log('game over')
};


function flyButtonReader(e) {
    let id = e.target.parentNode.id, flyId = e.target.id;
    id = Number(id.slice(4, -4));

    let fri = Number(flyId.slice(-1)), size = Number(flyId.slice(-3, -2));
    return { id, fri, size };
};


function gameClock(minutes, seconds) {
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    reactDom.render((<span>{`${minutes}:${seconds}`}</span>),
        document.querySelector('#timer'));
};



export default function Game() {
    if (!game_session || game_session.difficulty === 0) window.location.href = '/';

    const [bgi, setBgi] = useState(0);
    const [hp, setHp] = useState(hpLife);
    const [streak, setStreak] = useState(streakI);
    const [score, setScore] = useState(scoreT);


    const [kombo, komboDispatch] = useReducer(comboReducer, { seck: [] });

    const { fly_qtd, speed, respawn_interval, lifes_max } = difficulties[diffIndex];

    window.onload = () => {
        setBgi(game_session.background);

        let inter = timer(30, 'progressive', gameClock)


        firstSpawn(750)
    };


    function firstSpawn(delay) {
        let id = 0;
        let interval = setInterval(() => {
            respawn(respawn_interval, id);
            if (id === fly_qtd) clearInterval(interval);
            id++;
        }, delay);
    };


    function respawn(delay = 0, id) {
        setTimeout(() => {
            let { size } = spawn(id, speed);
            timeDisappearFlyDamage(10000, id, size);
        }, delay);
    };


    function timeDisappearFlyDamage(time, id, size) {
        const dtimer = setTimeout(() => {
            reactDom.unmountComponentAtNode(document.querySelector(`#fly-${id}-btn`));

            let damage = Number('-' + damageMeter(size, 1));
            hpLife = barControl(hpLife, damage);
            setHp(hpLife);

            if (hpLife.bar === 0 && hpLife.count === 0) return gameOver();
            respawn(respawn_interval, id);
        }, time);
        disappearTimeout[id] = dtimer;
    };


    function areaClick(e) {
        if (e.target.id !== "area") return;

        streakI = { bar: 0, count: 1 };
        setStreak(streakI);
    };


    function flyClick(e) {
        if (e.target.tagName === "BUTTON") return;

        let { fri, size, id } = flyButtonReader(e);
        let points = pointsMeter(size, 1);

        clearTimeout(disappearTimeout[id]);

        scoreT = scoreT + points;
        streakI = barControl(streakI, points, 4);
        setScore(scoreT);
        setStreak(streakI);

        komboDispatch({ type: 'increment', value: fri })
        // console.log(kombo.seck)

        reactDom.unmountComponentAtNode(document.querySelector(`#fly-${id}-btn`));
        spawn(id, speed);
    };


    function bottonPlacer(lmt) {
        let btns = [];
        for (var i = 0; i <= lmt; i++) {
            btns.push(
                <button key={i} id={`fly-${i}-btn`} onClick={flyClick} onDragStart={flyClick}>
                </button>
            );
        };
        return btns;
    };

    return (
        <>
            <section id="area" onClick={areaClick}>

                {bottonPlacer(fly_qtd)}

            </section>
            <section className="hud">
                <div>
                    <span id="heart-span">{hp.count}</span>
                    <img id="heart" src={hpImg} alt="hp" />
                    <Bars
                        id="hp-bar"
                        height="10px"
                        width="200px"
                        percent={hp.bar}
                        colorDegree={0}
                        colorSaturation="100%"
                        colorLightness="60%"
                        backBarColor="#ccc"
                        colorPercentChange={1.2}
                    />
                </div>
                <div>
                    <span id="star-span">{streak.count}x</span>
                    <img id="star" src={starImg} alt="score" />
                    <Bars
                        id="point-bar"
                        height="8px"
                        width="100px"
                        percent={streak.bar}
                        colorDegree={216}
                        colorSaturation="50%"
                        colorLightness="50%"
                        backBarColor="#ccc"
                        colorPercentChange={false}
                    />
                </div>

                <div id="time-score">
                    <span>Score: {score}</span>
                    <span id="timer"></span>
                </div>

                <span>
                    {kombo.seck.map((el, i) => (
                        <img key={i} src={flyArr[el]} alt="fly" style={{ width: "30px" }} />
                    ))}
                </span>

                <button onClick={() => { komboDispatch({ type: 'reset'}) }}>teste</button>

            </section>
            <section className="power-up-display">

            </section>
            <Background bgI={bgi} />
        </>
    );
};