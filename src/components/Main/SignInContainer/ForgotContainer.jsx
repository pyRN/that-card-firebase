import React, { useState, useRef } from "react";
import { auth } from "./../../../firebase";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";

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
    <div className="page-container">
      <div className="static-card">
        <h2>Forgot Password</h2>
        <form onSubmit={fnOnSubmit} className="signIn-form">
          <input
            type="text"
            placeholder="Email"
            className="signIn-input"
            ref={oEmail}
          ></input>
          <button className="submit-btn" onClick={fnOnSubmit}>
            Reset
          </button>
        </form>
        <div>
          <Link to="/signIn" className="signIn-link">
            Sign In
          </Link>
          <Link to="/signUp" className="signIn-link">
            Sign Up
          </Link>
        </div>
        {sError ? <div className="error-flag">{sError}</div> : null}
        {sMessage ? <div className="message-flag">{sMessage}</div> : null}
      </div>
    </div>
  );
}
