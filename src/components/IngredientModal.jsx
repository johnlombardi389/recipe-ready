import { useState } from "react";
// Style
import styled from "styled-components";

const IngredientModal = ({ newIngredient }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newIngredient(name);
    setName("");
    closeModal();
  };

  return (
    <>
      <StyledButton onClick={openModal}>+ Add Ingredient</StyledButton>

      {isOpen ? (
        <StyledModal>
          <div className="modal-content">
            <span className="close">&times;</span>
            <h2>Add Ingredient</h2>
            <form onSubmit={handleSubmit} id="modal">
              <div>
                <div>
                  <label htmlFor="name">Name</label>
                </div>
                <div>
                  <input
                    type="text"
                    id="name"
                    placeholder="Ingredient"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>
            </form>
            <button form="modal">Submit</button>
          </div>
        </StyledModal>
      ) : null}
    </>
  );
};

export default IngredientModal;

const StyledButton = styled.button`
  background-color: yellow;
`;

const StyledModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;

  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;
