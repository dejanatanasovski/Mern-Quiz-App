import React from 'react';
import './App.css';
import axios from 'axios';
import allPlayers from './allPlayers';

class App extends React.Component {
    state = {
      form_name: '',
      form_email: '',
      form_password: '',
      quiz: [],
      score: 0,
      timerOn: false,
      timerStart: 0,
      timerTime: 0
    }

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
  };
  stopTimer = () => {
    this.setState({
      timerOn: false
    });
    clearInterval(this.timer);
  };
  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0
    });
  };

componentDidMount = async () => {
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=5"
    );
    console.log(response.data);

    this.setState({
      quiz: response.data.results
    });
  }
myFunction = () => {
    console.log("Button Clicked");
  };


formData = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
}

submitForm = async (e) =>{
  e.preventDefault();

  const config ={
    headers:{
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({
    user_name:  this.state.form_name,
    user_email: this.state.form_email,
    user_password: this.state.form_password,
    score: this.state.score,
    timerTime: this.state.timerTime
  })

  const res = await axios.post('/register', body, config);
  console.log(res.data);

}
  score = () => {         // function
    console.log("button clicked")
    
    this.setState({
        ...this.state,    // to grab everything from before in the api and adding + 1
        score: this.state.score + 1
    })
  }


  render() {
  const { timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);

  const allQuestions = this.state.quiz && this.state.quiz.map( (choice) => {
    return (
      <div>
        <ol className="questions">{choice.question}</ol>
        <li onClick={this.score}>{choice.correct_answer}</li>
        <li>{choice.incorrect_answers[0]}</li>
        <li>{choice.incorrect_answers[1]}</li>
        <li>{choice.incorrect_answers[2]}</li>
      </div>
    ) 
  });
  

    console.log(this.state.score); 
    return (
      <div>
      <h1 className="title">Welcome to my Quiz-App</h1>
        <form onSubmit={this.submitForm}>
                <label HtmlFor="form_name">User Name</label>
                <input type="text" name="form_name" onChange={this.formData}/>

                <label HtmlFor="form_email">User Email</label>
                <input type="email" name="form_email" onChange={this.formData}/>

                <label HtmlFor="form_password">User Password</label>
                <input type="password" name="form_password" onChange={this.formData}/>

                <button type="submit">Register User</button>
        </form>

          <h1 className="time">{minutes} : {seconds} : {centiseconds}</h1>
              {this.state.timerOn === false && this.state.timerTime === 0 && (
                <button onClick={this.startTimer}>Start</button>
              )}
              {this.state.timerOn === true && (
                <button onClick={this.stopTimer}>Stop</button>
              )}
              {this.state.timerOn === false && this.state.timerTime > 0 && (
                <button onClick={this.startTimer}>Resume</button>
              )}
              {this.state.timerOn === false && this.state.timerTime > 0 && (
                <button onClick={this.resetTimer}>Reset</button>
              )}
      <div>
          <h1 className="score"> My Score {this.state.score}</h1>
            
          </div>
          <div>
                <button onClick={this.componentDidMount}>Question</button>
          </div>
          {allQuestions}
          <allPlayers />
      </div>
    )
  }
};
export default App;