import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  state = {
    status: 'off',
    time: '',
    timer: null,
  }

  formatTime = (seconds) => {
    if(!seconds || isNaN(seconds) || seconds < 0) {
      return null;
    } else {
      const m = Math.floor(seconds % 3600 / 60);
      const s = Math.floor(seconds % 3600 % 60);
  
      const mDisplay = m < 10 ? '0' + m : m;
      const sDisplay = s < 10 ? '0' + s : s;
      return mDisplay + ':' + sDisplay; 
    }
  }

  step = () => {
    let newTime = this.state.time - 1;

    this.setState({
      time: newTime,
    })

    if(this.state.time === 0 && this.state.status === 'work'){
      this.setState({
        status: 'rest',
        time: 3,
      }) 
      this.playBell();
    }  else if (this.state.time === 0 &&  this.state.status === 'rest'){
      this.setState({
        status: 'work',
        time: 1200,
      }) 
      this.playBell();
    }
  };

  startTimer = () => {
    this.setState({
      status: 'work',
      time: 3,
      timer: setInterval(this.step, 1000),
    });
  };

  stopTimer = () => {
    this.setState({
      status: 'off',
      time: '',
    });
    clearInterval(this.state.timer)
  }

  closeApp = () => {
    window.close()
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };
  

  render() {

    const { status, time } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && 
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{this.formatTime(time)}</div>}
        {(status === 'off') && <button onClick={this. startTimer} className="btn">Start</button>}
        {(status !== 'off') && <button onClick={this.stopTimer} className="btn">Stop</button>}
        <button onClick={this.closeApp} className="btn btn-close">X</button>
      </div>
    )
  };};

render(<App />, document.querySelector('#app'));



