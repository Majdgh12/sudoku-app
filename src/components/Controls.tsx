import React from 'react';
import { DifficultyLevel } from '../utils/sudokuUtils';

interface ControlsProps {
  difficulty: DifficultyLevel;
  setDifficulty: React.Dispatch<React.SetStateAction<DifficultyLevel>>;
  generatePuzzle: () => void;
}

const Controls: React.FC<ControlsProps> = ({ difficulty, setDifficulty, generatePuzzle }) => (
  <div className="controls">
    <label>Select Difficulty: </label>
    <select onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)} value={difficulty}>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
    <button onClick={generatePuzzle} className="generate-button">Generate Puzzle</button>
  </div>
);

export default Controls;
