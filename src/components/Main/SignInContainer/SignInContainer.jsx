import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { signIn } from "../../../actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
  };

  const fnSignIn = (event) => {
    event.preventDefault();
    const sEmail = document.getElementById("email-input").value;
    const sPassword = document.getElementById("password-input").value;

    signInWithEmailAndPassword(auth, sEmail, sPassword)
      .then((userCredential) => {
        // Signed in
        fnDispatch(signIn(userCredential.user));
        fnHistory.push("/cards");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error: ", errorCode, errorMessage);
      });

    // onAuthStateChanged(auth, (user) => {
    //   if (user != null) {
    //     //TODO: Once user is logged in, change reducer
    //     console.log("logged in!  ", user);
    //   } else {
    //     console.log("No user");
    //   }
    // });
  };

  const fnResetPassword = (event) => {
    event.preventDefault();
    // const sEmail = document.getElementById("email-input").value;
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
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } else {
      fnSetError("Passwords do no match");
    }
  };

  return (
    <div
      align="center"
      className="card bg-dark rounded-3 container mt-5"
      style={{ width: "300px" }}
    >
      <div className="card-body">
        {sLayoutType === "signIn-btn" ? (
          <h1 className="card-title text-primary">Sign In</h1>
        ) : sLayoutType === "resetPass-btn" ? (
          <h1 className="card-title text-primary">Reset Password</h1>
        ) : (
          <h1 className="card-title text-primary">Sign Up</h1>
        )}

        <form className="form-signin mt-4" onSubmit={fnSignIn}>
          <input
            aria-describedby="emailHelp"
            autoFocus
            className="form-control  mb-1"
            id="email-input"
            name="email-input"
            placeholder="Email address"
            required
            type="email"
          />
          {sLayoutType === "resetPass-btn" ? null : (
            <input
              aria-describedby="passwordHelp"
              className="form-control mb-1"
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
              className="form-control  mb-1"
              id="confirm-password-input"
              name="confirm-password-input"
              placeholder="Confirm Password"
              autoComplete="off"
              required
              type="password"
            />
          ) : null}

          <div className="d-grid gap-2">
            {sLayoutType === "signIn-btn" ? (
              <button
                className="btn btn-success mt-2 mb-2"
                id="submitBtn"
                type="submit"
                onClick={fnSignIn}
              >
                Sign In
              </button>
            ) : sLayoutType === "resetPass-btn" ? (
              <button
                className="btn btn-success mt-2 mb-2"
                id="resetPassBtn"
                type="submit"
                onClick={fnResetPassword}
              >
                Reset Password
              </button>
            ) : (
              <button
                className="btn btn-success mt-2 mb-2"
                id="signUpBtn"
                type="submit"
                onClick={fnSignUp}
              >
                Sign Up
              </button>
            )}
          </div>
          <div>
            {sLayoutType === "signIn-btn" || sLayoutType === "resetPass-btn" ? (
              <button
                className="btn btn-sm btn-outline-primary m-1"
                id="signUp-btn"
                onClick={fnChangeType}
              >
                Sign Up
              </button>
            ) : null}

            {sLayoutType === "signUp-btn" || sLayoutType === "resetPass-btn" ? (
              <button
                className="btn btn-sm btn-outline-primary m-1"
                id="signIn-btn"
                onClick={fnChangeType}
              >
                Sign In
              </button>
            ) : null}

            {sLayoutType === "signIn-btn" || sLayoutType === "signUp-btn" ? (
              <button
                className="btn btn-sm btn-outline-primary m-1"
                id="resetPass-btn"
                onClick={fnChangeType}
              >
                Reset Password
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
