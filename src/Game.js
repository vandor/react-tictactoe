import React from 'react';
import Board from './Board';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        lastMove: null,
      }],
      stepNumber: 0,
      xIsNext: true,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    const curStep = this.state.stepNumber;
    const history = this.state.history.slice(0, curStep + 1);
    const current = history[curStep];
    const squares = current.squares.slice();
    if (this.calculateWinningSquares(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares,
        lastMove: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

 calculateWinningSquares(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return lines[i];
      }
    }
    return null;
  }

  getRowAndCol(squareIndex) {
    const row = Math.floor(squareIndex / this.props.gridSize) + 1;
    const col = (squareIndex % this.props.gridSize) + 1;
    return {row, col};
  }

  render() {
    const history = this.state.history
    const curStep = this.state.stepNumber;
    const current = history[curStep];
    const winningSquares = this.calculateWinningSquares(current.squares);

    const moves = history.map((step, move) => {
      const {row, col} = this.getRowAndCol(step.lastMove);
      const desc = move ?
        `Go to move #${move} (${row}, ${col})` :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winningSquares) {
      status = 'Winner: ' + current.squares[winningSquares[0]];
    } else if (current.squares.every(x => x)) {
      status = "It's a draw!";
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            gridSize={this.props.gridSize}
            squares={current.squares}
            winningSquares={winningSquares}
            onClick={this.handleClick}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
