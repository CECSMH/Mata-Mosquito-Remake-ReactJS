
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

function timer(duration, type, callback) {
    if (type !== "progressive" && type !== "regressive") return;
    let timesec, minutes, seconds;

    timesec = type === "progressive" ? 0 : Number(duration);

    const interval = setInterval(() => {
        minutes = Math.floor(timesec / 60);
        seconds = timesec % 60;

        if(typeof callback === "function") callback(minutes, seconds);

        if ((timesec === 0 && type === "regressive") ||
            (timesec === duration && type === "progressive")) {
            clearInterval(interval);
        };

        type === "progressive" ? timesec++ : timesec--;
    }, 1000);
    return interval;
};

export { getRandomInt, timer }