import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Classes from "./pages/Classes";
import About from "./pages/About";
import Character from "./pages/Character";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

const App = () =>
  <Router>
    <div>
      <Navbar />
      <Wrapper>
        <Route exact path="/" component={About} />
        <Route exact path="/about" component={About} />
        <Route exact path="/classes" component={Classes} />
        <Route exact path="/character" component={Character} />
      </Wrapper>
      <Footer />
    </div>
  </Router>;

export default App;
