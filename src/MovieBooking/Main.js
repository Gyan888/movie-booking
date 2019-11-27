
import React from 'react';
import DrawGrid from "./DrawGrid";
import "./styles/GlobalStyles.css"
import { getAllSeats } from './services/seatsServices';
class Main extends React.Component {
  
    constructor() {
      super();
        this.state = {
        seat: [],
        seatAvailable: [],
        seatReserved: []
      }
    }

    async UNSAFE_componentWillMount(){
      let result=await getAllSeats();
      console.log(result);
      this.setState({
        seat:result.map((seat)=>seat.SeatName),
        seatAvailable:result.filter((seats)=>seats.is_reserved===false).map((seat)=>seat.SeatName),
        seatReserved:result.filter((seats)=>seats.is_reserved===true).map((seat)=>seat.SeatName)
      })      
    }
    
    onClickData=(seat) =>{
      if(this.state.seatReserved.indexOf(seat) > -1 ) {
        this.setState({
          seatAvailable: this.state.seatAvailable.concat(seat),
          seatReserved: this.state.seatReserved.filter(res => res !== seat)
        })
      } else {
        this.setState({
          seatReserved: this.state.seatReserved.concat(seat),
          seatAvailable: this.state.seatAvailable.filter(res => res !== seat)
        })
      }
    }
    
    render() {
      return (
        <div>
          <h1>Seat Reservation System</h1>
          <DrawGrid 
            seat = { this.state.seat }
            available = { this.state.seatAvailable }
            reserved = { this.state.seatReserved }
            onClickData = { this.onClickData }
            />
        </div>
      )
    }
  }
  
export default Main