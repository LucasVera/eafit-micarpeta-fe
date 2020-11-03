import React from 'react';
import Home from "./Home";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../components/Header';
import Register from "./Register";
import CacheContext, { defaultCache } from "../CacheContext";
import { useState } from "react";

function App() {
  const [cache, setCache] = useState(defaultCache);

  // performance: Make sure that React only re-renders consumer
  // components when "cache" has changed.
  const value = React.useMemo(() => ({
    cache,
    setCache
  }), [cache]);

  return (
    <div className="App">
      <CacheContext.Provider value={value}>
        <Router>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
        </Router>
      </CacheContext.Provider>
    </div>
  );
}

export default App;
