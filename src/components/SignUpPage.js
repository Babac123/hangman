import React, { useState } from "react";

import "../App.css";

import { useDispatch } from "react-redux";
import { saveUser } from "../redux/actions/appActions";

import { BrowserRouter as Router, useNavigate } from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(name);
    dispatch(saveUser(name));
    navigate("/main");
  };

  const handleChangeName = (text) => {
    setName(text);
  };
  return (
    <div className="container center padding">
      <div className="form__group field">
        <form onSubmit={handleSubmitForm}>
          <br></br>
          <br></br>
          <input
            class="form__field"
            type="text"
            name="name"
            value={name}
            onChange={(e) => handleChangeName(e.target.value)}
            placeholder="name"
            id="name"
          />
          <label for="name" class="form__label">
            Username
          </label>
          <div className="button">
            <button type="submit" disabled={!name} className="button-6">
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
