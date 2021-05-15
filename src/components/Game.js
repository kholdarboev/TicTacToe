import React from 'react';
import Board from './Board';

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
            XisNext: step % 2 === 0,
            history:this.state.history.slice(0,step +1),
        });
    }
    handleClick(e){
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[history.length -1];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);
        if (winner || squares[e]){
            return;
        }
        squares[e] = this.state.XisNext ? 'X' : 'O';
        this.setState({
            history: history.concat({
                squares:squares,
            }),
            XisNext: !this.state.XisNext,
            stepNumber: history.length,
        });
    }
    render(){
        const history = this.state.history;
        const current = history[history.length -1];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step,move)=>{
            const desc = move ? 'Go to #' + move : 'Start the game';
            return(
                <li key={move}>
                    <button onClick={() => {
                        this.jumpTo(move)
                    }}>{desc}</button>
                </li>
            );
        });
        let status = winner ? 'Winner is ' + winner : 'Next player is ' + (this.state.XisNext ? 'X' : 'O');
        return(
            <div className="game">
                <div className="game-board">
                    <Board onClick={(e)=> this.handleClick(e)} squares = {current.squares}></Board>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ul>{moves}</ul>
                </div>
            </div>
        )
    }

}
function calculateWinner(squares){
    const winnerLines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for (let i=0; i<winnerLines.length; i++){
        const [a,b,c] = winnerLines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
            return squares[a]
        }
    }
    return null;
}