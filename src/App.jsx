import { useCallback, useEffect, useState } from 'react';
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
    this.number = number || 0;
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

  const gridInit = {
    size: 4,
    cells: Array(4 ** 2).fill(new Cell()),

    get(x, y) {
      return this.cells[this.size * y + x];
    },

    set(x, y, value) {
      this.cells[this.size * y + x] = new Cell(value);
    },
  };

  const [grid, setGrid] = useState(gridInit);

  function addNRandomCells(n) {
    const avalaible = Array.from(grid.cells.keys())
      .filter(index => grid.cells[index].isEmpty());
    if (avalaible.length === 0)
      return;
    setGrid(({ ...grid }) => {
      for (let i = 0; i < n; i++) {
        const rand = Math.floor(Math.random() * avalaible.length);
        const index = avalaible.splice(rand, 1).shift();
        grid.cells[index] = new Cell(2);
      }
      return grid;
    });
  }

  useEffect(() => {
    let previousX = 0, previousY = 0;
    const threshhold = (window.screen.width >= window.screen.height ? window.screen.height : window.screen.width) / 10;

    document.addEventListener('touchstart', event => {
      previousX = event.changedTouches[0].screenX;
      previousY = event.changedTouches[0].screenY;
    });

    const listener = event => {
      const currentX = event.changedTouches[0].screenX;
      const currentY = event.changedTouches[0].screenY;

      const xDiff = previousX - currentX;
      const yDiff = previousY - currentY;

      if (Math.abs(xDiff) + Math.abs(yDiff) < threshhold) {
        return;
      }

      if (Math.abs(xDiff) >= Math.abs(yDiff)) {
        if (xDiff >= 0) {
          alert('left')
        } else {
          alert('right')
        }
      } else {
        if (yDiff >= 0) {
          alert('up')
        } else {
          alert('down')
        }
      }
    };

    document.addEventListener('touchend', listener);

    if (grid.cells.filter(cell => !cell.isEmpty()) < 2)
      addNRandomCells(2);

    return () => {
      document.removeEventListener('touchend', listener);
    }
  }, []);

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
