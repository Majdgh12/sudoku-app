import React, { useState, useEffect } from 'react';
import Controls from './Controls';
import NumberSelector from './NumberSelector';
import Board from './Board';
import ActionButtons from './ActionButtons';
import './SudokuBoard.css';

import {
  DifficultyLevel,
  generateCompleteBoard,
  createPuzzle,
  solveBoard,
  validateBoard,
  findEmptyCell,
} from '../utils/sudokuUtils';

const SudokuBoard: React.FC = () => {
  const [board, setBoard] = useState<number[][]>(Array.from({ length: 9 }, () => Array(9).fill(0)));
  const [conflicts, setConflicts] = useState<{ row: number; col: number }[]>([]);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy');
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [solvedBoard, setSolvedBoard] = useState<number[][] | null>(null);
  const [generatedPositions, setGeneratedPositions] = useState<{ row: number; col: number }[]>([]);
  const [isWin, setIsWin] = useState(false);


  useEffect(() => {
    generatePuzzle();
  }, []);

  const isGeneratedCell = (row: number, col: number) =>
    generatedPositions.some((pos) => pos.row === row && pos.col === col);

  const handleCellClick = (row: number, col: number) => {
    if (selectedNumber !== null && !isGeneratedCell(row, col)) {
      const updatedBoard = [...board];
      updatedBoard[row][col] = selectedNumber;
      setBoard(updatedBoard);
      setConflicts(validateBoard(updatedBoard));
    }
  };

  const generatePuzzle = () => {
    const completeBoard = generateCompleteBoard();
    const puzzleBoard = createPuzzle(completeBoard, difficulty);
    setBoard(puzzleBoard);
    setConflicts([]);
    setSolvedBoard(completeBoard);

    const initialPositions = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (puzzleBoard[row][col] !== 0) {
          initialPositions.push({ row, col });
        }
      }
    }
    setGeneratedPositions(initialPositions);
  };

  const handleSolveClick = () => {
    if (!solvedBoard) return;

    setBoard(solvedBoard);  // Fill the board with the complete solution
    setConflicts([]);       // Clear conflicts as the board is now correct
    alert("The board has been solved!");
  };

  const handleHintClick = () => {
    if (!solvedBoard) return;

    const boardCopy = board.map((row) => [...row]);
    const emptyCell = findEmptyCell(boardCopy);
    if (emptyCell) {
      const [row, col] = emptyCell;
      boardCopy[row][col] = solvedBoard[row][col];
      setBoard(boardCopy);
      setConflicts(validateBoard(boardCopy));  // Re-validate the board after placing the hint
    }
  };

  const checkSolution = () => {
    const conflicts = validateBoard(board);
    setConflicts(conflicts);
  
    if (conflicts.length === 0 && board.every((row) => row.every((cell) => cell !== 0))) {
      setIsWin(true); // Set win state
    }
    else{
      alert('the game is not completed');
    }
  };
  const playAgain = () => {
    setIsWin(false); // Reset win state
    generatePuzzle(); // Generate a new puzzle
  };
  

  return (
    <div className="sudoku-container">
    {isWin ? ( // Check if the user has won
      <div className="win-message">
        <h2>🎉 Congratulations! You solved the puzzle! 🎉</h2>
        <button onClick={playAgain} className="play-again-button">Play Again</button>
      </div>
    ) : (
      <>
        <Controls
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          generatePuzzle={generatePuzzle}
        />
        <NumberSelector
          selectedNumber={selectedNumber}
          setSelectedNumber={setSelectedNumber}
        />
        <Board
          board={board}
          conflicts={conflicts}
          onCellClick={handleCellClick}
          isGeneratedCell={isGeneratedCell}
        />
        <ActionButtons
          checkSolution={checkSolution}
          solveBoard={handleSolveClick}
          giveHint={handleHintClick}
        />
      </>
    )}
  </div>
  );
};

export default SudokuBoard;
