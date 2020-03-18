import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap'
import EventAddModal from './modals/event-add-modal'
import AllEventsModal from './modals/show-date-events-modal'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

      today: new Date(),
      current_month: new Date().getMonth(),
      current_year: new Date().getFullYear(),
      month_name: this.getMonthName(new Date().getMonth()),
      active_year: new Date().getFullYear(),
      event_add_modal_display: false,
      all_events_modal_display: false,
      date: "",
      date_event: "", 
      events: null,
      day_events:null


    }
    this.endpoint = 'ws://127.0.0.1:8000/eventConsumer/'
    this.socket = new WebSocket(this.endpoint)
    this.socket.onmessage = (e) => {
      let data = JSON.parse(e.data)
      this.setState({events:data})
      
      if(this.state.date_event){
        this.setState({day_events:this.state.events.filter(event=>event.day.replace(/\b0/g, '')===this.state.date_event)})
        
      }
    }
    this.socket.onopen = function (e) {

      console.log("message", e)

    }


    this.socket.onerror = function (e) {
      console.log("message", e)
    }
    this.socket.onclose = function (e) {
      console.log("message", e)
    }
  }

 


  getMonthName = (month) => {

    if (month < 0) {
      while (true) {
        month += 12
        if (month > 0) {
          break
        }
      }
    }

    if (month >= 12) {
      while (true) {
        month -= 12
        if (month < 12) {
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
      default:
        return null

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
      default:
        return null
    }
  }




  getDays = () => {


    let worker = new Date(this.state.current_year, this.state.current_month + 1, 0)
    let number_of_days = worker.getDate()
    let days = []


    for (let day = 1; day <= number_of_days; day++) {
      let date = new Date(this.state.current_year, this.state.current_month, day)

      let day_string = String(date.getFullYear()) + '-' + String(date.getMonth() + 1) + '-' + String(date.getDate())
      let day_name = this.getDayName(date.getDay())
      days.push({ day_string, day_name })
    }
    return days
  }

  next = () => {


    this.setState({ current_month: this.state.current_month + 1 })
    this.setState({ month_name: this.getMonthName(this.state.current_month + 1) })
    this.setState({ active_year: new Date(this.state.current_year, this.state.current_month + 1, 1).getFullYear() })


  }

  prev = () => {
    this.setState({ current_month: this.state.current_month - 1 })
    this.setState({ month_name: this.getMonthName(this.state.current_month - 1) })
    this.setState({ active_year: new Date(this.state.current_year, this.state.current_month - 1, 1).getFullYear() })


  }




  event_add_modal_close = () => {
    this.setState({ event_add_modal_display: false })

  }


  all_events_modal_close = () => {
    this.setState({ all_events_modal_display: false })
  }

  add_event = (data) => {



    data.day = this.state.date

    this.socket.send(JSON.stringify(data))



    

  }

  delete_event = (data) =>{
    data.action = true
    this.socket.send(JSON.stringify(data))
  }

  render() {
    this.getDays()
    const makeGrid = this.getDays().map((data, index) => {
      let events = null;
      if(this.state.events){
       events = this.state.events.filter(event=>event.day.replace(/\b0/g, '')===data.day_string)
      }

    





      return (
        <div className="cal-card" key={index}>
          <Card >

            <Card.Body>
              <Card.Title><strong>{data.day_name}</strong></Card.Title>
              <Card.Text >

                <strong className="date">{data.day_string.split('-')[2]}</strong>
                <br></br>
                <button variant="dark" onClick={() => {
                  this.setState({ event_add_modal_display: true })
                  this.setState({ date: data.day_string })


                }} className="btn btn-dark btn-circle" style={{ borderRadius: "30px" }}><strong>+</strong></button>
              </Card.Text>

            </Card.Body>
            <Button variant="dark" onClick={() => {
              this.setState({ all_events_modal_display: true })
              this.setState({ date_event: data.day_string })
              this.setState({day_events:events})
            }} >Scheduled Events</Button>
          </Card>
        </div>

      )


    })


    return (
      <div id="myContainer">
        <h1 id="year">{this.state.active_year}</h1>
        <h1 id="month"><strong>{this.state.month_name}</strong></h1>
        <div id="buttons">
          <Button variant="dark" onClick={this.prev} >Prev</Button>
          <Button variant="dark" onClick={this.next} >Next</Button>
        </div>
        <br></br>
        <br></br>
        <div id="cal-grid">
          {makeGrid}
        </div>

        <EventAddModal  display={this.state.event_add_modal_display} close={this.event_add_modal_close} add={this.add_event} />
        <AllEventsModal  display={this.state.all_events_modal_display} close={this.all_events_modal_close} events={this.state.day_events} delete={this.delete_event} />



      </div>
    )
  }
}

export default App;
