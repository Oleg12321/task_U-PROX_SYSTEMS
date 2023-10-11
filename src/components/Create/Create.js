import { Fragment, useState } from "react";
import { addUser } from "../../Store/UserReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./Create.css";

export const Create = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [nameError, setNameError] = useState(""); 
  const [textError, setTextError] = useState(""); 

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setNameError("");
    setTextError("");

    if (name.trim() === "") {
      setNameError("Name is required");
      isValid = false;
    }

    if (text.length < 3) {
      setTextError("Description must be at least 3 characters");
      isValid = false;
    }

    return isValid;
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(
        addUser({
          id: uuidv4(),
          name,
          text,
          userStatus: false,
        })
      );

      navigate("/");
    }
  };

  return (
    <Fragment>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="form--bg w-50 border text-white p-5">
          <h3 className="form--heading">Add new user</h3>
          <form onSubmit={handlerSubmit}>
            <div className="input__wrapper">
              <label>
                <input
                  type="text"
                  className={`form-control ${nameError ? "is-invalid" : ""}`}
                  value={name}
                  name="Title"
                  onChange={(e) => setName(e.target.value)}
                />
                {nameError && (
                  <div className="invalid-feedback">{nameError}</div>
                )}
              </label>
            </div>
            <div>
              <label>
                <textarea
                  type="text"
                  className={`form-control ${textError ? "is-invalid" : ""}`}
                  cols={30}
                  rows={4}
                  value={text}
                  name="Description"
                  onChange={(e) => setText(e.target.value)}
                />
                {textError && (
                  <div className="invalid-feedback">{textError}</div>
                )}
              </label>
            </div>
            <button type="submit" className="btn btn-info">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
