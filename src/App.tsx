import React from 'react';
import SudokuBoard from './components/SudokuBoard'

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Sudoku Game</h1>
      <SudokuBoard />
    </div>
  );
};

export default App;
