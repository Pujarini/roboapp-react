import React, { Component } from 'react';
import SearchBox from '../components/SearchBox';
import Cardlist from '../components/Cardlist';
import Scroll from '../components/Scroll';
import './ErrorBoundary';
import './App.css';
import ErrorBoundary from '../containers/ErrorBoundary';


class App extends Component{
    constructor(){
        super()
        this.state={
            robots: [],
            searchField :''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json())
        .then(users => {this.setState({robots:users})})
    }
    onSearchChange = (event) => {
        this.setState({searchField:event.target.value})
    }

    render(){
        const {robots,searchField}=this.state;
        const filteredRobot = robots.filter(robot =>{
                return robot.name.toLowerCase().includes(searchField.toLowerCase())
            }
        )
        
        if(!robots.length){
            return <h1>Loading....</h1>
        }else{
            return(
                <div className='tc'>
                    <h1 className='f1'>Robo Search App</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                        <Cardlist robots={filteredRobot}/>
                        </ErrorBoundary>
                    
                    </Scroll>
                </div>   
            )
        }
    }
}

export default App;