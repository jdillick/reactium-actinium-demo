import React, { Component } from 'react';
import Parse from 'appdir/api';

/**
 * -----------------------------------------------------------------------------
 * React Component: Bar
 * -----------------------------------------------------------------------------
 */
export default class Bar extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            foo: 'not loaded'
        };
    }

    componentDidMount() {
        Parse.Cloud.run('bar')
        .then(result => this.setState(result))
        .catch(error => console.error(error))
    }


    render() {
        const { foo } = this.state;
        return (
            <>
                {foo}
            </>
        );
    }
}
