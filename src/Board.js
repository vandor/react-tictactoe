import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
  renderSquare(i, key) {
    const winningSquares = this.props.winningSquares;
    const winner = winningSquares && winningSquares.includes(i);

    return (
      <Square
        key={key}
        value={this.props.squares[i]}
        winner={winner}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const rowSize = this.props.gridSize,
      colSize = rowSize,
      rows = [...Array(rowSize).keys()],
      cols = [...Array(colSize).keys()];

    return (
      <div>
        {rows.map(row => (
          <div className="board-row" key={row}>
            {cols.map(col => (
              this.renderSquare((rowSize * row) + col, col)
            ))}
          </div>
        ))}
      </div>
    );
  }
}
