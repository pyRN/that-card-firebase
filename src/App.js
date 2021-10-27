import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

//Components
import NavBar from "./components/Header/NavBar";

//Containers
import CardsContainer from "./components/Main/CardsContainer/CardsContainer";
import DecksContainer from "./components/Main/DecksContainer/DecksContainer";
import MainContainer from "./components/Main/MainContainer/MainContainer";
import ResourcesContainer from "./components/Main/ResourcesContainer/ResourcesContainer";
import ExpansionsContainer from "./components/Main/ExpansionsContainer/ExpansionsContainer";
import SignInContainer from "./components/Main/SignInContainer/SignInContainer";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <div className="mainContainer">
          <Route path="/" exact render={(props) => <MainContainer />} />
          <Route
            path="/expansions"
            exact
            render={(props) => <ExpansionsContainer />}
          />
          <Route path="/cards" exact render={(props) => <CardsContainer />} />
          <Route path="/signIn" exact render={(props) => <SignInContainer />} />
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
