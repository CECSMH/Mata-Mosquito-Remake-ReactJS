import React from "react";
import reactDom from "react-dom";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

function timer(duration, container, type) {
    if (type !== "progressive" && type !== "regressive") return;
    let timesec, minutes, seconds, span;

    timesec = type === "progressive" ? 0 : Number(duration);

    const interval = setInterval(() => {
        minutes = Math.floor(timesec / 60);
        minutes = minutes < 10 ? "0" + minutes : minutes;

        seconds = timesec % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        span = (<span>{`${minutes}:${seconds}`}</span>);
        reactDom.render(span, document.querySelector(container));

        if ((timesec === 0 && type === "regressive")
            || (timesec === duration && type === "progressive")) {
            clearInterval(interval);
        };

        type === "progressive" ? timesec++ : timesec--;
    }, 1000);
    return interval;
};

export { getRandomInt, timer }