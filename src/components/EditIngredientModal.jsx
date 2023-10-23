import { useState, useEffect } from "react";
import axios from "axios";
// Style
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditIngredientModal = ({
  id,
  ingName,
  purchase_date,
  deleteIngredients,
  fetchIngredients,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(ingName);
  const [newDate, setNewDate] = useState(new Date(purchase_date));

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const getToken = () => {
    return localStorage.getItem("access_token");
  };

  const getUserId = () => {
    return localStorage.getItem("user_id");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedDate = newDate.toISOString().split("T")[0];
      const userToken = getToken();
      const userId = getUserId();
      const response = await axios.put(
        `http://localhost:8000/api/ingredients/${id}/`,
        { name, purchase_date: formattedDate, user: userId },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating ingredient", error);
    }

    fetchIngredients();
    closeModal();
  };

  const deleteCurrent = () => {
    deleteIngredients(id);
    closeModal();
  };

  return (
    <>
      <StyledButton onClick={openModal}>Edit</StyledButton>

      {isOpen ? (
        <StyledModal>
          <div className="modal-content">
            <div className="top-section">
              <h2>Edit Ingredient</h2>
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
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <div>
                  <label htmlFor="purchase_date">Purchase Date</label>
                </div>
                <div>
                  <DatePicker
                    id="purchase_date"
                    selected={newDate}
                    onChange={(date) => setNewDate(date)}
                    dateFormat="MMMM d, yyyy"
                  />
                </div>
              </div>
            </StyledForm>
            <FormButtons>
              <button onClick={deleteCurrent} className="delete-butt">
                Delete
              </button>
              <div className="edit-butts">
                <button className="cancel-butt" onClick={closeModal}>
                  Cancel
                </button>
                <button className="submit-butt" form="modal">
                  Submit
                </button>
              </div>
            </FormButtons>
          </div>
        </StyledModal>
      ) : null}
    </>
  );
};

export default EditIngredientModal;

const StyledButton = styled.button`
  background: none;
  border: none;
  color: #f4b183;
  text-decoration: underline;
  font-size: 0.85rem;
  cursor: pointer;
  font-family: "Mukta Vaani", sans-serif;
  font-weight: 400;
  transition: all 0.3s;
  &:hover {
    color: purple;
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
  justify-content: space-between;
  margin-top: 2rem;

  .delete-butt {
    padding: 0.25rem 1rem;
    border: none;
    cursor: pointer;
    font-family: "Mukta Vaani", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    transition: all 0.3s;
    margin-left: 1rem;
    color: white;
    background-color: #0073e6;
    padding: 0.5rem 1rem;
    text-decoration: none;
    padding: 0.25rem 1rem;
    border: none;
    border-radius: 0.5rem;
    &:hover {
      background-color: yellow;
      color: purple;
    }
  }

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
    background-color: #0073e6;
    padding: 0.5rem 1rem;
    text-decoration: none;
    padding: 0.25rem 1rem;
    border: none;
    border-radius: 0.5rem;
    &:hover {
      background-color: yellow;
      color: purple;
    }
  }
`;
