import React, { useRef, useEffect, ChangeEvent, MouseEvent } from "react";

type AddressInputProps = {
  searchTerm: string;
  onInputChange: (value: string) => void;
};

const AddressInput: React.FC<AddressInputProps> = ({
  searchTerm,
  onInputChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      onInputChange("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="input-group mb-3">
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        placeholder="Enter a UK address"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default AddressInput;
