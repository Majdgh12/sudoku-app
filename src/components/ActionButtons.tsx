import React from 'react';

interface ActionButtonsProps {
  checkSolution: () => void;
  solveBoard: () => void;
  giveHint: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ checkSolution, solveBoard, giveHint }) => (
  <div className="action-buttons">
    <button onClick={checkSolution} className="check-button">Check Solution</button>
    <button onClick={solveBoard} className="solve-button">Solve</button>
    <button onClick={giveHint} className="hint-button">Hint</button>
  </div>
);

export default ActionButtons;
