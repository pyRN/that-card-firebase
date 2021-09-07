import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

//Components
import NavBar from "./components/Header/NavBar";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        {/* <Route path="/" exact render={(props) => <MainComponent />} /> */}
      </Router>
    </Provider>
  );
}

export default App;
