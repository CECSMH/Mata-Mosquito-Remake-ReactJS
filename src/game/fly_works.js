import React from "react";
import reactDom from "react-dom";

import Flys from "../components/flys/index.js";
import { getRandomInt } from "./utilities.js";


function spawn(id, speed) {
    let fri = getRandomInt(0, 6),
        size = getRandomInt(0, 3),
        rid = getRandomInt(0, 255);

    fri = fri > 5 ? 5 : fri;
    size = size > 2 ? 2 : size;

    const fly =
        <Flys className="fly"
            id={`fly-${rid}-${size}-${fri}`}
            frI={fri}
            size={size}
            flying={true}
            speed={speed}
            randomSpawn={true}
            area={'#area'}
        />
    reactDom.render(fly, document.querySelector(`#fly-${id}-btn`));
    return {fri, size, id};
};


function pointsMeter(size, mult) {
    switch (size) {
        case 0:
            return 20 * mult;

        case 1:
            return 10 * mult;

        case 2:
            return 30 * mult;

        default:
            return 0;
    };
};


function damageMeter(size, mult) {
    switch (size) {
        case 0:
            return 20 * mult;

        case 1:
            return 30 * mult;

        case 2:
            return 10 * mult;

        default:
            return 0;
    };
}

export { pointsMeter, spawn, damageMeter }