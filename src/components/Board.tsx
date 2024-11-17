import React from 'react';
import './SudokuBoard.css';

interface BoardProps {
  board: number[][];
  conflicts: { row: number; col: number }[];
  onCellClick: (row: number, col: number) => void;
  isGeneratedCell: (row: number, col: number) => boolean;
}

const Board: React.FC<BoardProps> = ({ board, conflicts, onCellClick, isGeneratedCell }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isConflict = conflicts.some(
            (conflict) => conflict.row === rowIndex && conflict.col === colIndex
          );
          const cellClasses = `cell ${isGeneratedCell(rowIndex, colIndex) ? 'generated-cell' : ''} ${
            isConflict ? 'conflict-cell' : ''
          }`;

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={cellClasses}
              onClick={() => onCellClick(rowIndex, colIndex)}
            >
              {cell !== 0 ? cell : ''}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Board;
