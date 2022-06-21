import React, { useState, useRef } from "react";
import { auth } from "./../../../firebase";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";

//Media
import Forget from "../../../multimedia/Forget.jpg";

export default function ForgotContainer() {
  const [sError, fnSetError] = useState("");
  const [sMessage, fnSetMessage] = useState("");
  const oEmail = useRef(null);

  const fnOnSubmit = (event) => {
    event.preventDefault();
    if (!oEmail.current.value) {
      fnSetMessage("");
      fnSetError("Email Address Required");
    } else {
      sendPasswordResetEmail(auth, oEmail.current.value)
        .then(() => {
          fnSetError("");
          fnSetMessage("Check email for password reset");
        })
        .catch((error) => {
          fnSetMessage("");
          fnSetError("Email not found");
          console.error("Email not found");
        });
    }
  };

  return (
    <div className="landing-card flex-row center w-100">
      <div className="flex-column  landing-content w-50 center">
        <h2 className="main-heading">Forgot Password</h2>

        <form className="signIn-form" onSubmit={fnOnSubmit}>
          <input
            type="text"
            placeholder="Email"
            className="signIn-input"
            ref={oEmail}
            autoFocus
          ></input>
          <button className="btn btn-submit" onClick={fnOnSubmit}>
            Reset
          </button>
        </form>
        <div>
          <Link to="/signIn" className="signIn-link sub-heading">
            Sign In
          </Link>
          <Link to="/signUp" className="signIn-link sub-heading">
            Sign Up
          </Link>
        </div>
        {sError ? <div className="error-flag">{sError}</div> : null}
        {sMessage ? <div className="message-flag">{sMessage}</div> : null}
      </div>
      <div>
        <img src={Forget} className="landing-mtg-card w-50" alt="Forget" />
      </div>
    </div>
  );
}
