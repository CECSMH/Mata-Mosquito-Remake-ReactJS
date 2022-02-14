
class Fly_by_J {
    randomPosition(selector) {
        let area = document.querySelector(selector);

        let y = Math.floor(Math.random() * area.offsetHeight),
            x = Math.floor(Math.random() * area.offsetWidth);

        x = x < 90 ? x : x - 90;
        y = y < 90 ? y : y - 90;

        return { x, y };
    };

    durationCalculator(prev, next, speed) {
        let x = Math.abs(prev.x - next.x),
            y = Math.abs(prev.y - next.y);

        let m = Math.max(x, y);
        return Math.ceil(m / speed);
    };

    flyAnimation(area_selector, fly_selector, speed) {
        let randP = this.randomPosition(area_selector);
        let fly = document.querySelector(fly_selector);
        if(!fly) return ;

        let { offsetLeft: x, offsetTop: y } = fly;

        let duration = this.durationCalculator({ x, y }, randP, speed);

        fly.style = `transform: scaleX(${randP.x < x ? 1 : -1});
         left:${x}px; top:${y}px`;

        fly.animate({ top: randP.y + 'px', left: randP.x + 'px' },
            { duration, fill: 'forwards', easing: 'ease-in-out' });

        setTimeout(() => {
            this.flyAnimation(area_selector, fly_selector, speed);
        }, duration);
    };
};

export default new Fly_by_J();