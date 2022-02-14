import React, { Component } from "react";
import './styles.css';

export default class Bars extends Component {
    componentDidMount() {
        let {
            height,
            width,
            percent,
            id,
            colorDegree,
            colorSaturation,
            colorLightness,
            colorPercentChange,
            backBarColor
        } = this.props;

        const bar = document.querySelector("#" + id);

        bar.style.setProperty('--height-prop', height);
        bar.style.setProperty('--width-prop', width);
        bar.style.setProperty('--back-bar-color', backBarColor);
        bar.style.setProperty('--percent', percent);
        bar.style.setProperty('--bar-color-saturation', colorSaturation);
        bar.style.setProperty('--bar-color-lightness', colorLightness);

        bar.style.setProperty('--bar-color-degree',
            colorPercentChange ?
                Number(this.props.percent) * Number(colorPercentChange) :
                colorDegree);
    };

    componentDidUpdate(prev) {
        if (this.props.percent !== prev.percent) {
            let {id, percent, colorDegree, colorPercentChange } = this.props;
            const bar = document.querySelector("#" + id);

            bar.style.setProperty('--percent', percent);
            bar.style.setProperty('--bar-color-degree',
            colorPercentChange ?
                Number(this.props.percent) * Number(colorPercentChange) :
                colorDegree);
        };
    };

    render() {
        return (
            <div id={this.props.id} className="bar" ></div>
        );
    };
};