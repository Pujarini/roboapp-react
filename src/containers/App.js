import React, { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import Cardlist from "../components/Cardlist";
import Scroll from "../components/Scroll";
import "./ErrorBoundary";
import "./App.css";
import ErrorBoundary from "../containers/ErrorBoundary";

function App() {
  // constructor(){
  //     super()
  //     this.state={
  //         robots: [],
  //         searchField :''
  //     }
  // }
  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState("");

  // componentDidMount(){
  //     fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json())
  //     .then(users => {this.setState({robots:users})})
  // }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        setRobots(users);
      });
  },[]);
  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const filteredRobot = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });

  if (!robots.length) {
    return <h1>Loading....</h1>;
  } else {
    return (
      <div className="tc">
        <h1 className="f1">Robo Search App</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <Cardlist robots={filteredRobot} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }
}

export default App;
