import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

      today: new Date(),
      current_month: new Date().getMonth(),
      current_year: new Date().getFullYear(),
      month_name: this.getMonthName(new Date().getMonth()),
      active_year: new Date().getFullYear()


    }
  }

  getMonthName = (month) => {

    if(month<0){
      while(true){
        month+=12
        if(month>0){
          break
        }
      }
    }

    if(month>=12){
      while(true){
        month-=12
        if(month<12){
          break
        }
      }
    }
    switch (month) {
      case 0:
        return "January"
      case 1:
        return "February"
      case 2:
        return "March"
      case 3:
        return "April"
      case 4:
        return "May"
      case 5:
        return "June"
      case 6:
        return "July"
      case 7:
        return "August"
      case 8:
        return "September"
      case 9:
        return "October"
      case 10:
        return "November"
      case 11:
        return "December"

    }
  }

  getDayName = (day) => {
    switch (day) {
      case 0:
        return "Sunday"
      case 1:
        return "Monday"
      case 2:
        return "Tuesday"
      case 3:
        return "Wednesday"
      case 4:
        return "Thursday"
      case 5:
        return "Friday"
      case 6:
        return "Saturday"
    }
  }




  getDays = () => {
    console.log(this.state.current_month)


    let worker = new Date(this.state.current_year, this.state.current_month + 1, 0)
    let number_of_days = worker.getDate()
    let days = []
    // console.log(this.current_year)
    // console.log(this.current_month)
    console.log(number_of_days)

    for (let day = 1; day <= number_of_days; day++) {
      let date = new Date(this.state.current_year, this.state.current_month, day)

      let day_string = String(date.getFullYear()) + '-' + String(date.getMonth() + 1) + '-' + String(date.getDate())
      let day_name = this.getDayName(date.getDay())
      days.push({ day_string, day_name })
    }
    console.log(days)
  }

  next = () => {


    this.setState({ current_month: this.state.current_month + 1 })
    this.setState({ month_name: this.getMonthName(this.state.current_month+1) })
    this.setState({active_year: new Date(this.state.current_year, this.state.current_month+1,1).getFullYear()})
    
    
  }

  prev = () => {
    this.setState({ current_month: this.state.current_month - 1 })
    this.setState({ month_name: this.getMonthName(this.state.current_month-1) })
    this.setState({active_year: new Date(this.state.current_year, this.state.current_month-1,1).getFullYear()})


  }

  render() {
    this.getDays()
    // console.log(this.state)
    return (
      <div>
        <h1>{this.state.active_year}</h1>
        <h1>{this.state.month_name}</h1>
        <button onClick={this.prev} >Previous</button>
        <button onClick={this.next} >Next</button>
      </div>
    )
  }
}

export default App;
