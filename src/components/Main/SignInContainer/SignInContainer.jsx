import React, { useState, useRef } from "react";
import { auth } from "./../../../firebase";
import { signIn } from "../../../actions";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./SignInContainer.css";

//Media
import ScrollRack from "../../../multimedia/Scroll-Rack.jpg";

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
    <div className="landing-card flex-row center w-100">
      <div className="flex-column  landing-content w-50 center">
        <h2 className="main-heading">Sign In</h2>

        <form className="signIn-form" onSubmit={fnOnSubmit}>
          <input
            type="text"
            placeholder="Email"
            className="signIn-input"
            ref={oEmail}
            autoFocus
          ></input>
          <input
            type="password"
            placeholder="Password"
            className="signIn-input"
            ref={oPassword}
          ></input>
          <button className="btn btn-submit" onClick={fnOnSubmit}>
            Sign In
          </button>
        </form>
        <div>
          <Link to="/forgot" className="signIn-link sub-heading">
            Forgot Password
          </Link>
          <Link to="/signUp" className="signIn-link sub-heading">
            Sign Up
          </Link>
        </div>
        {sError ? <div className="error-flag">{sError}</div> : null}
      </div>
      <div>
        <img
          src={ScrollRack}
          className="landing-mtg-card w-50"
          alt="Scroll Rack"
        />
      </div>
    </div>
  );
}
