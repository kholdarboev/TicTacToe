import React from 'react';

export default class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            XisNext: true,
            stepNumber : 0,
            history:[
                {squares: Array(9).fill(null)}
            ],
        }
    }
    jumpTo(step){
        this.setState({
            stepNumber: step,
            XisNext: step%2 === 0,
        });
    }
    handleClick(e){
        const
    }
}