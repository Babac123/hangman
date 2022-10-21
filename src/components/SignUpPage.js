import React, { useState } from "react";


import "../App.css";

import { useDispatch } from "react-redux";
import { saveUser } from "../redux/actions/appActions";


import {
  BrowserRouter as Router,
  useNavigate
} from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(name)
    dispatch(saveUser(name));
    navigate("/main");
  };

  const handleChangeName = (text) => {
    setName(text);
  };
  return (
    <div className="container margin-top">
      <div className="LoginBox">
        <form onSubmit={handleSubmitForm}>
          <text>Please enter your username</text>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => handleChangeName(e.target.value)}
            placeholder="Username"
          />
          <div className="button">
            <button
              type="submit"
              style={{
                backgroundColor: name ? "grey" : "#cccccc",
                color: name ? "white" : "black",
              }}
              disabled={!name}
            >
              ENTER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
