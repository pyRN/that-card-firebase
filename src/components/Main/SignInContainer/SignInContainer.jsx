import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

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

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    //TODO: Once user is logged in, change reducer
    console.log("logged in!  ", user);
  } else {
    console.log("No user");
  }
});

const fnSignIn = (event) => {
  event.preventDefault();
  console.log("made it");
  const sEmail = document.getElementById("email-input").value;
  const sPassword = document.getElementById("password-input").value;

  signInWithEmailAndPassword(auth, sEmail, sPassword)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("signed in: ", user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error: ", errorCode, errorMessage);
    });
};

export default function SignInContainer() {
  return (
    <div
      align="center"
      className="justify-content-center m-5 ps-5 pe-5 pt-2 pb-2 bg-dark rounded"
    >
      <form className="form-signin" onSubmit={fnSignIn}>
        <h1 className="h3 mb-3 text-primary">Sign In</h1>
        <input
          aria-describedby="emailHelp"
          autoFocus
          className="form-control mb-1"
          id="email-input"
          name="email-input"
          placeholder="Email address"
          required
          type="email"
        />
        <input
          aria-describedby="passwordHelp"
          className="form-control"
          id="password-input"
          name="password-input"
          placeholder="Password"
          autoComplete="off"
          required
          type="password"
        />
        <button
          className="btn btn-lg btn-success btn-block mt-3"
          id="registerBtn"
          type="submit"
          onClick={fnSignIn}
        >
          Sign In
        </button>
        {/* <div className="row">
          <Link
            className="d-flex nav-link text-primary justify-content-start col"
            to="/register"
          >
            Register
          </Link>
          <Link
            className="d-flex nav-link text-primary justify-content-end col"
            to="/forgotPass"
          >
            Forgot Password
          </Link>
        </div> */}
      </form>
    </div>
  );
}
