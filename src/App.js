import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./firebase";
import store from "./store";

//Components
import NavBar from "./components/Header/NavBar";

//Containers
import CardsContainer from "./components/Main/CardsContainer/CardsContainer";
import DecksContainer from "./components/Main/DecksContainer/DecksContainer";
import ExpansionsContainer from "./components/Main/ExpansionsContainer/ExpansionsContainer";
import ForgotContainer from "./components/Main/SignInContainer/ForgotContainer";
import MainContainer from "./components/Main/MainContainer/MainContainer";
import Modal from "./components/Main/Modal";
import ResourcesContainer from "./components/Main/ResourcesContainer/ResourcesContainer";
import SignInContainer from "./components/Main/SignInContainer/SignInContainer";
import SignUpContainer from "./components/Main/SignInContainer/SignUpContainer";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Modal />
        <div className="mainContainer">
          <Route path="/" exact render={(props) => <MainContainer />} />
          <Route
            path="/expansions"
            exact
            render={(props) => <ExpansionsContainer />}
          />
          <Route path="/cards" exact render={(props) => <CardsContainer />} />
          <Route path="/signIn" exact render={(props) => <SignInContainer />} />
          <Route path="/signUp" exact render={(props) => <SignUpContainer />} />
          <Route path="/forgot" exact render={(props) => <ForgotContainer />} />
          <Route path="/decks" exact render={(props) => <DecksContainer />} />
          <Route
            path="/resources"
            exact
            render={(props) => <ResourcesContainer />}
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
