import React from 'react';

interface NumberSelectorProps {
  selectedNumber: number | null;
  setSelectedNumber: React.Dispatch<React.SetStateAction<number | null>>;
}

const NumberSelector: React.FC<NumberSelectorProps> = ({ selectedNumber, setSelectedNumber }) => (
  <div className="number-selector">
    {Array.from({ length: 9 }, (_, i) => i + 1).map((number) => (
      <button
        key={number}
        className={`number-button ${selectedNumber === number ? 'selected' : ''}`}
        onClick={() => setSelectedNumber(number)}
      >
        {number}
      </button>
    ))}
  </div>
);

export default NumberSelector;
