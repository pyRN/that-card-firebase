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
import SetsContainer from "./components/Main/SetsContainer/SetsContainer";
import SignInContainer from "./components/Main/SignInContainer/SignInContainer";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Route path="/" exact render={(props) => <MainContainer />} />
        <Route path="/sets" exact render={(props) => <SetsContainer />} />
        <Route path="/cards" exact render={(props) => <CardsContainer />} />
        <Route path="/signIn" exact render={(props) => <SignInContainer />} />
        <Route path="/decks" exact render={(props) => <DecksContainer />} />
        <Route
          path="/resources"
          exact
          render={(props) => <ResourcesContainer />}
        />
      </Router>
    </Provider>
  );
}

export default App;
