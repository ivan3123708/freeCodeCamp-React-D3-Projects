import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.getRecent = this.getRecent.bind(this);
    this.getAlltime = this.getAlltime.bind(this);
    this.state = {
      data: [],
      selected: 'recent'
    }
  }

  getRecent() {
    axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
      .then((res) => {
        this.setState({ data: res.data, selected: 'recent' });
      });
  }

  getAlltime() {
    axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
      .then((res) => {
        this.setState({ data: res.data, selected: 'alltime' });
      });
  }

  componentDidMount() {
    this.getRecent();
  }

  render() {
    if(this.state.data.length > 0) {
      const userlist = this.state.data.map((item, index) => {
        return <User data={this.state.data} index={index} key={index}/>
      });
      return (
        <div className="App">
          <div className="wrapper">
            <div className="header">
              <p>FreeCodeCamp Leaderboard</p>
            </div>
            <Headings recent={this.getRecent} alltime={this.getAlltime} selected={this.state.selected}/>
            <div>{userlist}</div>
          </div>
        </div>
      );
    } else {
      return <p className="loading">LOADING...</p>
    }
  }
}

class Headings extends Component {
  render() {
    return (
      <div className="headings">
        <div className="number">#</div>
        <div className="camper-name">Camper Name</div>
        <div 
          className="thirty-days-points" 
          onClick={this.props.recent}
        >
          Points in the past 30 days {this.props.selected === 'recent' && <span>&#9660;</span>}
        </div>
        <div 
          className="all-time-points" 
          onClick={this.props.alltime}
        >
          All time points {this.props.selected === 'alltime' && <span>&#9660;</span>}
        </div>
      </div>
    );
  }
}

class User extends Component {
  render() {
    return (
      <div className="user">
        <div className="number">{this.props.index + 1}</div>
        <div className="camper-name">
          <img className="avatar" src={this.props.data[this.props.index].img} alt="User avatar" />
          <a href={'https://www.freecodecamp.org/' + this.props.data[this.props.index].username} target="blank">{this.props.data[this.props.index].username}</a>
        </div>
        <div className="thirty-days-points">{this.props.data[this.props.index].recent}</div>
        <div className="all-time-points">{this.props.data[this.props.index].alltime}</div>
      </div>
    );
  }
}

export default App;
