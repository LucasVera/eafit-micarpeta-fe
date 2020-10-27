import Home from "./Home";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../components/Header';
import Register from "./Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
      </Router>
    </div>
  );
}

export default App;
