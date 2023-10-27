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
      <StyledButton onClick={openModal}>Add Ingredient</StyledButton>
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
  text-decoration: none;
  background-color: #2368a2;
  color: white;
  padding: 0.25rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-family: "Mukta Vaani", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s;
  &:hover {
    background-color: #194870;
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
        font-size: 1.25rem;
        color: black;
        font-family: "Cambay", sans-serif;
        font-weight: 700;
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
    font-family: "Mukta Vaani", sans-serif;
    font-size: 0.95rem;
    font-weight: 200;
  }

  input {
    width: 100%;
    border: 1.25px solid #ccc;
    background-color: #f7f7f7;
    color: #333;
    transition: border-color 0.3s, box-shadow 0.3s;
    border-radius: 0.5rem;
    margin: 0.25rem 0 1.5rem 0;
    padding: 0.75rem;
    font-family: "Maven Pro", sans-serif;
    font-size: 1rem;
    font-weight: 400;
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
    padding: 0.25rem 1rem;
    border: none;
    cursor: pointer;
    font-family: "Mukta Vaani", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    transition: all 0.3s;
  }

  .cancel-butt {
    background: none;
    color: grey;
    text-decoration: underline;
    &:hover {
      color: black;
    }
  }

  .submit-butt {
    margin-left: 1rem;
    color: white;
    background-color: #2368a2;
    text-decoration: none;
    padding: 0.25rem 1rem;
    border: none;
    border-radius: 0.5rem;
    font-family: "Mukta Vaani", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s;
    &:hover {
      background-color: #194870;
    }
  }
`;
