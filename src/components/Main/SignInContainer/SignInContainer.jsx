import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { signIn } from "../../../actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./SignInContainer.css";

export default function SignInContainer() {
  const firebaseApp = initializeApp({
    apiKey: "AIzaSyDgGTGxg0YAohZugcenYtadnrJvCzqaXGo",
    authDomain: "do-i-have-that-card.firebaseapp.com",
    projectId: "do-i-have-that-card",
    storageBucket: "do-i-have-that-card.appspot.com",
    messagingSenderId: "1017228611963",
    appId: "1:1017228611963:web:adac839707eeb5b2d8adde",
    measurementId: "G-98YT8VMVL2",
  });

  const auth = getAuth(firebaseApp);
  const [sLayoutType, fnSetLayoutType] = useState("signIn-btn");
  const [sError, fnSetError] = useState("");
  const fnHistory = useHistory();
  const fnDispatch = useDispatch();

  const fnChangeType = (event) => {
    //Function rerenders component based on signIn/Sign Up/resetPassword
    event.preventDefault();
    fnSetLayoutType(event.target.id);
    fnSetError("");
  };

  const fnSignIn = (event) => {
    event.preventDefault();
    const sEmail = document.getElementById("email-input").value;
    const sPassword = document.getElementById("password-input").value;

    if (!sEmail) {
      fnSetError("Email Address Required");
    } else if (!sPassword) {
      fnSetError("Password Required");
    } else {
      signInWithEmailAndPassword(auth, sEmail, sPassword)
        .then((userCredential) => {
          // Signed in
          fnDispatch(signIn(userCredential.user));
          fnHistory.push("/cards");
        })
        .catch((error) => {
          fnSetError("Incorrect Email or Password");
          console.log("error: ", error);
        });
    }
  };

  const fnResetPassword = (event) => {
    event.preventDefault();
    const sEmail = document.getElementById("email-input").value;

    if (!sEmail) {
      fnSetError("Email Address Required");
    } else {
      //Send email message
    }
  };

  const fnSignUp = (event) => {
    event.preventDefault();
    const sEmail = document.getElementById("email-input").value;
    const sPassword = document.getElementById("password-input").value;
    const sConfirmPassword = document.getElementById(
      "confirm-password-input"
    ).value;

    if (sEmail && sPassword === sConfirmPassword) {
      createUserWithEmailAndPassword(auth, sEmail, sPassword)
        .then((userCredential) => {
          // Registration successful and signed in
          fnDispatch(signIn(userCredential.user));
          fnHistory.push("/cards");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            fnSetError("Email already in use");
          } else {
            fnSetError("An error occurred signing up");
          }
        });
    } else if (!sEmail) {
      fnSetError("Email Address Required");
    } else if (sPassword !== sConfirmPassword) {
      fnSetError("Passwords do not match");
    }
  };

  return (
    <div className="page-container">
      <div className="responsive-card">
        {sLayoutType === "signIn-btn" ? (
          <h1 className="card-title-text">Sign In</h1>
        ) : sLayoutType === "resetPass-btn" ? (
          <h1 className="card-title-text">Reset Password</h1>
        ) : (
          <h1 className="card-title-text">Sign Up</h1>
        )}
        {/* <div className="row"> */}
        {sError ? <div className="alert-flag">{sError}</div> : null}
        {/* </div> */}
        <div className="col">
          <input
            aria-describedby="emailHelp"
            autoFocus
            className="signIn-input-field"
            id="email-input"
            name="email-input"
            placeholder="Email Address"
            required
            type="email"
          />
          {sLayoutType === "resetPass-btn" ? null : (
            <input
              aria-describedby="passwordHelp"
              className="signIn-input-field"
              id="password-input"
              name="password-input"
              placeholder="Password"
              autoComplete="off"
              required
              type="password"
            />
          )}
          {sLayoutType === "signUp-btn" ? (
            <input
              aria-describedby="passwordHelp"
              className="signIn-input-field"
              id="confirm-password-input"
              name="confirm-password-input"
              placeholder="Confirm Password"
              autoComplete="off"
              required
              type="password"
            />
          ) : null}
        </div>
        {/* <div className="row"> */}
        {sLayoutType === "signIn-btn" ? (
          <button
            className="submit-btn"
            id="submitBtn"
            type="submit"
            onClick={fnSignIn}
          >
            Sign In
          </button>
        ) : sLayoutType === "resetPass-btn" ? (
          <button
            className="submit-btn"
            id="resetPassBtn"
            type="submit"
            onClick={fnResetPassword}
          >
            Reset Password
          </button>
        ) : (
          <button
            className="submit-btn"
            id="signUpBtn"
            type="submit"
            onClick={fnSignUp}
          >
            Sign Up
          </button>
        )}
        {/* </div> */}
        <div className="row">
          {sLayoutType === "signIn-btn" || sLayoutType === "resetPass-btn" ? (
            <button
              className="outline-btn"
              id="signUp-btn"
              onClick={fnChangeType}
            >
              Sign Up
            </button>
          ) : null}

          {sLayoutType === "signUp-btn" || sLayoutType === "resetPass-btn" ? (
            <button
              className="outline-btn"
              id="signIn-btn"
              onClick={fnChangeType}
            >
              Sign In
            </button>
          ) : null}

          {sLayoutType === "signIn-btn" || sLayoutType === "signUp-btn" ? (
            <button
              className="outline-btn"
              id="resetPass-btn"
              onClick={fnChangeType}
            >
              Reset Password
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
