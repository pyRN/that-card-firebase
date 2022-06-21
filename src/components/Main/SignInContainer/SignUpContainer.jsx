import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { signIn } from "../../../actions";
import { useDispatch } from "react-redux";
import { auth } from "./../../../firebase";
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./SignInContainer.css";

//Media
import SignInBlood from "../../../multimedia/Sign-In-Blood.jpg";

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
    <div className="landing-card flex-row center w-50">
      <div className="flex-column  landing-content w-50 center">
        <h2 className="main-heading">Sign Up</h2>

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
          <input
            type="password"
            placeholder="Password"
            className="signIn-input"
            ref={oConfirmPass}
          ></input>
          <button className="btn btn-submit" onClick={fnOnSubmit}>
            Sign In
          </button>
        </form>
        <div>
          <Link to="/forgot" className="signIn-link sub-heading">
            Forgot Password
          </Link>
          <Link to="/signIn" className="signIn-link sub-heading">
            Sign In
          </Link>
        </div>
        {sError ? <div className="error-flag">{sError}</div> : null}
      </div>
      <div>
        <img
          src={SignInBlood}
          className="landing-mtg-card w-50"
          alt="Sign In Blood"
        />
      </div>
    </div>
  );
}
