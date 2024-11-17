// SudokuUtils.ts

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export const difficulties = {
  easy: 20,
  medium: 30,
  hard: 40,
};

export const isValid = (board: number[][], row: number, col: number, num: number): boolean => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
};

export const generateCompleteBoard = (): number[][] => {
  const newBoard = Array.from({ length: 9 }, () => Array(9).fill(0));

  const fillBoard = (row = 0, col = 0): boolean => {
    if (col === 9) {
      col = 0;
      row++;
      if (row === 9) return true;
    }
    if (newBoard[row][col] !== 0) return fillBoard(row, col + 1);

    for (let num = 1; num <= 9; num++) {
      if (isValid(newBoard, row, col, num)) {
        newBoard[row][col] = num;
        if (fillBoard(row, col + 1)) return true;
        newBoard[row][col] = 0;
      }
    }
    return false;
  };

  fillBoard();
  return newBoard;
};

export const createPuzzle = (board: number[][], difficulty: DifficultyLevel): number[][] => {
  const puzzle = board.map(row => [...row]);
  const cellsToRemove = difficulties[difficulty];

  let removedCells = 0;
  while (removedCells < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removedCells++;
    }
  }

  return puzzle;
};

export const findEmptyCell = (board: number[][]): [number, number] | null => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) return [row, col];
    }
  }
  return null;
};

export const solveBoard = (inputBoard: number[][]): boolean => {
  const emptyCell = findEmptyCell(inputBoard);
  if (!emptyCell) return true;
  const [row, col] = emptyCell;

  for (let num = 1; num <= 9; num++) {
    if (isValid(inputBoard, row, col, num)) {
      inputBoard[row][col] = num;
      if (solveBoard(inputBoard)) return true;
      inputBoard[row][col] = 0;
    }
  }
  return false;

  
};

// SudokuUtils.ts

// Other imports or code...

/**
 * Validates the entire board to check for conflicts and returns the positions of any conflicts found.
 * @param board - The 9x9 Sudoku board.
 * @returns Array<{ row: number, col: number }> - Array of conflict coordinates.
 */
export const validateBoard = (board: number[][]): { row: number; col: number }[] => {
  const conflicts: { row: number; col: number }[] = [];

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const num = board[row][col];
      if (num !== 0) {
        // Temporarily set the cell to 0 to avoid self-comparison during validation.
        board[row][col] = 0;
        const isValidPlacement = isValid(board, row, col, num);
        // Restore the original number in the cell.
        board[row][col] = num;
        if (!isValidPlacement) {
          conflicts.push({ row, col });
        }
      }
    }
  }
  return conflicts;
};

