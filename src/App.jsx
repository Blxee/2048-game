import { useState } from 'react';
import './App.css';

class Cell {
  static #colors = new Map();
  static {
    this.#colors.set(2, 7)
  }

  constructor(number) {
    this.number = number || 0;
  }

  getColor() {
    return '#ffff00';
  }

  isEmpty() {
    return this.number === 0;
  }

  plus(that) {
    return new Cell(this.number + that.number);
  }

  toString() {
    if (this.isEmpty()) return ' ';
    else return this.number.toString();
  }
}

function App() {

  const [grid, setGrid] = useState({
    size: 4,
    cells: Array(4 ** 2).fill(new Cell(2048)),

    get(x, y) {
      return this.cells[this.size * y + x];
    },

    set(x, y, value) {
      this.cells[this.size * y + x] = new Cell(value);
    },
  });

  return (
    <div className='wrapper'>
      {
        grid.cells.map(cell => {
          return (
            <div
              {...(cell.isEmpty() ?
                { className: 'empty' }
                :
                { className: 'filled', style: { backgroundColor: cell.getColor() } }
              )}
            >
              {cell.toString()}
            </div>
          );
        })
      }
    </div>
  );
}

export default App;
