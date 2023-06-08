import React from 'react';

type AddressDropdownProps = {
  predictions: string[];
  onPredictionClick: (prediction: string, index: number) => void;
};

const AddressDropdown: React.FC<AddressDropdownProps> = ({ predictions, onPredictionClick }) => {
  return (
    <ul className="list-group mt-2">
      {predictions.map((prediction, index) => (
        <li
          key={index}
          className="list-group-item"
          onClick={() => onPredictionClick(prediction, index)}
          style={{ cursor: 'pointer' }}
        >
          {prediction}
        </li>
      ))}
    </ul>
  );
};

export default AddressDropdown;
