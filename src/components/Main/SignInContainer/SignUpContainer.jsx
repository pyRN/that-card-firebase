import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { signIn } from "../../../actions";
import { useDispatch } from "react-redux";
import { auth } from "./../../../firebase";
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./SignInContainer.css";

export default function SignUpContainer() {
  const [sError, fnSetError] = useState("");
  const fnHistory = useHistory();
  const fnDispatch = useDispatch();
  const db = getFirestore();
  const oEmail = useRef(null);
  const oPassword = useRef(null);
  const oConfirmPass = useRef(null);

  const fnOnSubmit = (event) => {
    event.preventDefault();
    if (
      oEmail.current.value &&
      oPassword.current.value === oConfirmPass.current.value
    ) {
      createUserWithEmailAndPassword(
        auth,
        oEmail.current.value,
        oPassword.current.value
      )
        .then((userCredential) => {
          fnDispatch(signIn(userCredential.user));
          setDoc(doc(db, userCredential.user.uid, "Information"), {
            sEmail: userCredential.user.email,
            sId: userCredential.user.uid,
            dCreated: Timestamp.now(),
          });
          fnHistory.push("/cards");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            fnSetError("Email already in use");
            console.error("Email already in use");
          } else {
            fnSetError("An error occurred signing up");
            console.error("An error occurred signing up");
          }
        });
    } else if (!oEmail.current.value) {
      fnSetError("Email Address Required");
    } else if (oPassword.current.value !== oConfirmPass.current.value) {
      fnSetError("Passwords do not match");
    }
  };

  return (
    <div className="page-container">
      <div className="static-card">
        <h2>Sign Up</h2>
        <form onSubmit={fnOnSubmit} className="signIn-form">
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
          <input
            type="password"
            placeholder="Password"
            className="signIn-input"
            ref={oConfirmPass}
          ></input>
          <button className="submit-btn" onClick={fnOnSubmit}>
            Sign Up
          </button>
        </form>
        <div>
          <Link to="/forgot" className="signIn-link">
            Forgot Password
          </Link>
          <Link to="/signIn" className="signIn-link">
            Sign In
          </Link>
        </div>
        {sError ? <div className="error-flag">{sError}</div> : null}
      </div>
    </div>
  );
}
