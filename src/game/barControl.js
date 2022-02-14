export default function barControl(current, value, max, initial = 0) {
    let val = value;
    let obj = {};

    if (val > 0) {
        if (current.bar === 100 && current.count === max) return current;
        if (current.count === max && current.bar + val > 100) val = 100 - current.bar;

        obj = { bar: current.bar + val, count: current.count };

        if (obj.bar > 100 && current.count < max) {
            obj = { bar: obj.bar - 100, count: obj.count + 1 };
        };
    } else if (val < 0) {
        val = Math.abs(val);
        if (current.bar === 0 && current.count === 0) return current;
        if (current.count === 0 && current.bar - val < 0) val = current.bar;

        obj = { bar: current.bar - val, count: current.count };

        if (obj.bar <= 0 && current.count > 0) {
            obj = { bar: obj.bar + 100, count: obj.count - 1 };
        };
    };
    return obj;
}