import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h2>Do I Have That Card?</h2>
      </div>
      <Router>
        {/* <Route path="/" exact render={(props) => <MainComponent />} /> */}
      </Router>
    </Provider>
  );
}

export default App;
