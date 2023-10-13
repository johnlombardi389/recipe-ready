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
            <div className="top-section">
              <h2>Add Ingredient</h2>
              <span className="close" onClick={closeModal}>
                &times;
              </span>
            </div>
            <StyledForm onSubmit={handleSubmit} id="modal">
              <div>
                <div>
                  <label htmlFor="name">Name</label>
                </div>
                <div>
                  <input
                    type="text"
                    id="name"
                    placeholder="Type Ingredient"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>
            </StyledForm>
            <FormButtons>
              <button className="cancel-butt" onClick={closeModal}>
                Cancel
              </button>
              <button className="submit-butt" form="modal">
                Submit
              </button>
            </FormButtons>
          </div>
        </StyledModal>
      ) : null}
    </>
  );
};

export default IngredientModal;

const StyledButton = styled.button`
  background-color: yellow;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 8px;
  border-style: none;
  box-shadow: rgba(39, 174, 96, 0.15) 0 4px 9px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s;
  &:hover {
    background-color: white;
    box-shadow: rgba(39, 174, 96, 0.2) 0 6px 12px;
  }
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
    padding: 2rem;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

    .top-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;

      h2 {
        font-size: 2rem;
        color: pink;
      }

      span {
        font-size: 1.5rem;
      }
    }
  }

  .close {
    cursor: pointer;
  }
`;

const StyledForm = styled.form`
  width: 75vw;

  label {
    display: block;
    margin-bottom: 0.25rem;
  }

  input {
    width: 100%;
    padding: 12px 16px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 1rem;
    background-color: #f7f7f7;
    color: #333;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const FormButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 2rem;

  button {
    font-size: 1rem;
    padding: 0.5rem 1.25rem;
    cursor: pointer;
  }

  .cancel-butt {
    background: none;
  }

  .submit-butt {
    margin-left: 1rem;
    background-color: pink;
  }
`;
