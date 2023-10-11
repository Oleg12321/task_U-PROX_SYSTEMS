import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../../Store/UserReducer";

export const Update = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();


  const existingUser = users.find((user) => user.id === id);
  const [userName, setUserName] = useState(existingUser.name);
  const [description, setDescription] = useState(existingUser.text);
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setNameError("");
    setDescriptionError("");

    if (userName.trim() === "") {
      setNameError("Name is required");
      isValid = false;
    }

    if (description.length < 3) {
      setDescriptionError("Description must be at least 3 characters");
      isValid = false;
    }

    return isValid;
  };

  const handlerUpdate = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(
        updateUser({
          id,
          name: userName,
          text: description,
          userStatus: false,
        })
      );

      navigate("/");
    }
  };

  return (
    <div className="d-flex vh-100 w-100 justify-content-center align-items-center">
      <div className="form--bg w-50 border text-white p-5">
        <h3 className="form--heading">Update User</h3>
        <form onSubmit={handlerUpdate}>
          <div className="input__wrapper">
            <label>
              <input
                type="text"
                className={`form-control ${nameError ? "is-invalid" : ""}`}
                name="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              {nameError && <div className="invalid-feedback">{nameError}</div>}
            </label>
          </div>
          <div>
            <label>
              <textarea
                type="text"
                className={`form-control ${
                  descriptionError ? "is-invalid" : ""
                }`}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {descriptionError && (
                <div className="invalid-feedback">{descriptionError}</div>
              )}
            </label>
          </div>
          <button type="submit" className="btn btn-info">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};
