import { useState } from 'React'

class Spot {
  constructor() {
    this.number = 0
  }

  plus(that) {
    return new Spot(this.number + that.number)
  }

  toString() {
    if (this.number <= 0) return ' '
    else return this.number.toString()
  }
}

function App() {

  useState()

  return (
    <>
      <h1>Hello, World!</h1>
    </>
  );
}

export default App;
