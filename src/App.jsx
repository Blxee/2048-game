import { useState } from 'react';
import './App.css';

class Cell {
  static #colors = new Map();
  static {
    this.#colors.set(2 ** 1, {
      primary: '#8ec07c',
      secondary: '#689d6a',
    });
    this.#colors.set(2 ** 2, {
      primary: '#d3869b',
      secondary: '#b16286',
    });
    this.#colors.set(2 ** 3, {
      primary: '#83a598',
      secondary: '#458588',
    });
    this.#colors.set(2 ** 4, {
      primary: '#fabd2f',
      secondary: '#d79921',
    });
    this.#colors.set(2 ** 5, {
      primary: '#b8bb26',
      secondary: '#98971a',
    });
    this.#colors.set(2 ** 6, {
      primary: '#fe8019',
      secondary: '#d65d0e',
    });
    this.#colors.set(2 ** 7, {
      primary: '#fb4934',
      secondary: '#cc241d',
    });
  };

  constructor(number) {
    this.number = number || 2;
  }

  getPrimaryColor() {
    return Cell.#colors.get(this.number).primary;
  }

  getSecondaryColor() {
    return Cell.#colors.get(this.number).secondary;
  }

  static #getRandColor() {
    return '#000000';
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
    cells: Array(4 ** 2).fill(new Cell(2)),

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
                {
                  className: 'filled',
                  style: {
                    backgroundColor: cell.getPrimaryColor(),
                    border: `2px solid ${cell.getSecondaryColor()}`,
                    boxShadow: `0 4px 0 ${cell.getSecondaryColor()}`
                  }
                }
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
