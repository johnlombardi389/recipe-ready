import { useState, useEffect } from "react";
import axios from "axios";
// Style
import styled from "styled-components";

const EditIngredientModal = ({
  id,
  ingName,
  purchase_date,
  deleteIngredients,
  fetchIngredients,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(ingName);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/api/ingredients/${id}/`,
        { name }
      );
    } catch (error) {
      console.error("Error updating ingredient", error);
    }

    fetchIngredients();
    closeModal();
  };

  return (
    <>
      <StyledButton onClick={openModal}>Edit</StyledButton>

      {isOpen ? (
        <StyledModal>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Edit Ingredient</h2>
            <form onSubmit={handleSubmit} id="modal">
              <div>
                <div>
                  <label htmlFor="name">Name</label>
                </div>
                <div>
                  <input
                    type="text"
                    id="name"
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

export default EditIngredientModal;

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
