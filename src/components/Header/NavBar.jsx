import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOutUser } from "../../actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function NavBar() {
  const oUser = useSelector((state) => state.oUserReducer.oUser);
  const fnDispatch = useDispatch();
  const fnHistory = useHistory();

  //Functions
  const fnSignOut = (event) => {
    event.preventDefault();

    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        fnDispatch(signOutUser());
        fnHistory.push("/signIn");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <h3 className="navbar-brand text-primary">Do I Have That Card?</h3>
        <button
          className="navbar-toggler bg-primary"
          data-bs-toggle="collapse"
          data-bs-target="#navBarContent"
          aria-controls="navBarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navBarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="btn">
              <Link className="nav-link text-primary" to="/">
                Main
              </Link>
            </li>
            <li className="btn">
              <Link className="nav-link text-primary" to="/sets">
                Sets
              </Link>
            </li>
            <li className="btn">
              <Link className="nav-link text-primary" to="/cards">
                Cards
              </Link>
            </li>
            {oUser ? (
              <>
                <li className="btn">
                  <Link className="nav-link text-primary" to="/decks">
                    Decks
                  </Link>
                </li>
                <li className="btn">
                  <Link className="nav-link text-primary" to="/resources">
                    Resources
                  </Link>
                </li>
              </>
            ) : null}
            <li className="btn">
              {oUser ? (
                <button className="btn btn-danger" onClick={fnSignOut}>
                  Sign Out
                </button>
              ) : (
                <Link className="nav-link text-primary" to="/signIn">
                  Sign In
                </Link>
              )}
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-1 border border-success"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ backgroundColor: "#222", color: "green" }}
            />
            <button className="btn btn-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
