import React, { Component } from 'react';
import './styles.css';

import flyArr from '../../utils/flyArr.js';
import fly_by_J from '../../game/animation';

const size = ['md', 'bgg', 'sm'];

export default class Flys extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flying: false
        };
    };


    componentDidMount() {
        if (this.props.randomSpawn) {
            let { x, y } = fly_by_J.randomPosition(this.props.area);
            document.querySelector('#' + this.props.id).style = `left:${x}px; top:${y}px`;
        }
        if (this.props.flying) {
            fly_by_J.flyAnimation(this.props.area, '#' + this.props.id, Number(this.props.speed));
        };
    };


    render() {
        return (
            <img className={`${size[Number(this.props.size)]} ${this.props.className}`}
                src={flyArr[this.props.frI]}
                id={this.props.id}
                alt="fly"
                onDrop={(e) => e.preventDefault()}
            />
        )
    }
}