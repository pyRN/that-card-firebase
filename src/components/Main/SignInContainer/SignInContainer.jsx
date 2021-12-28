import React, { useState, useRef } from "react";
import { auth } from "./../../../firebase";
import { signIn } from "../../../actions";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./SignInContainer.css";

export default function SignInContainer() {
  const [sError, fnSetError] = useState("");
  const fnHistory = useHistory();
  const fnDispatch = useDispatch();
  const oEmail = useRef(null);
  const oPassword = useRef(null);

  const fnOnSubmit = (event) => {
    event.preventDefault();
    if (!oEmail.current.value) {
      fnSetError("Email Address Required");
    } else if (!oPassword.current.value) {
      fnSetError("Password Required");
    } else {
      signInWithEmailAndPassword(
        auth,
        oEmail.current.value,
        oPassword.current.value
      )
        .then((userCredential) => {
          fnDispatch(signIn(userCredential.user));
          fnHistory.push("/cards");
        })
        .catch((error) => {
          fnSetError("Incorrect Email or Password");
          console.error("Error signing in: Incorrect Email or Password");
        });
    }
  };

  return (
    <div className="page-container">
      <div className="static-card">
        <h2>Sign In</h2>

        <form className="signIn-form" onSubmit={fnOnSubmit}>
          <input
            type="text"
            placeholder="Email"
            className="signIn-input"
            ref={oEmail}
          ></input>
          <input
            type="password"
            placeholder="Password"
            className="signIn-input"
            ref={oPassword}
          ></input>
          <button className="submit-btn" onClick={fnOnSubmit}>
            Sign In
          </button>
        </form>
        <div>
          <Link to="/forgot" className="signIn-link">
            Forgot Password
          </Link>
          <Link to="/signUp" className="signIn-link">
            Sign Up
          </Link>
        </div>
        {sError ? <div className="error-flag">{sError}</div> : null}
      </div>
    </div>
  );
}
