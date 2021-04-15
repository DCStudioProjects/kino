import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Header from "./Header";
import Home from "./Home";
import Film from "./Film";

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500&display=swap" rel="stylesheet" />
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/film/:film" component={Film} />
        </Switch>
      </Router>
    </HelmetProvider>
  );
}

export default App;
