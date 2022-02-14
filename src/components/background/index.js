import React, { Component } from 'react';
import './styles.css';

import bgArr from '../../utils/bgArr.js';

export default class Background extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bgI: 0
        };
    }

    componentDidUpdate(prev) {
        if (this.props.bgI !== prev.bgI) {
            this.setState({ bgI: this.props.bgI })
        };
    };

    render() {
        return (
            <div className="bg">
                <img src={bgArr[this.state.bgI]} alt="background" />
            </div>
        );
    };
};