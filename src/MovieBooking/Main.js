
import React from 'react';
import DrawGrid from "./DrawGrid";
import "./styles/GlobalStyles.css"
import { getAllSeats, SetReservedSeat } from './services/seatsServices';
import {  Button} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';



function Dialogbox(props) {
  console.log("Inside dialog box");  
  const handleClose = () => {
    props.CloseDialogBox();
  };

  return (
    <Dialog
      open={props.openDialogBox}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirm Seat Booking "}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Please enter email to receive ticket

          <ValidatorForm
           onSubmit={props.handleEmailSubmit}
           onError={errors => console.log(errors)}>
              <TextValidator
                variant="outlined"
                validators={['required', 'isEmail']}
                margin="normal"
                fullWidth
                id="emailid"
                label="Email"
                placeholder="Enter Email"
                name="emailid"              
                autoFocus                
                errorMessages={['*Required', 'Email is not valid.']}
                value={props.email} onChange={props.handleEmailChange}
              />
                <DialogActions>
                    <Button type="submit" color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
          </ValidatorForm>        
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

class Main extends React.Component {
  
    constructor() {
      super();
        this.state = {
        openDialogBox:false,
        seat: [],
        seatAvailable: [],
        seatReserved: [],
        email:""
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
    

    handleEmailSubmit=async(e)=>{
      let result=await SetReservedSeat({"data":this.state.seatReserved,
      "email":this.state.email})
      let msg= "Updated successfully"
      if (result.status!==200){
        msg= "Can not update"
      }      
      this.setState({
        openDialogBox:false
      })
      return msg
    }

    handleEmailChange=(e)=>{
      this.setState({
        email:e.target.value
      })
    
    }

    CloseDialogBox=()=>{
      this.setState({
        openDialogBox:false
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
      if (this.state.openDialogBox){
        return (<Dialogbox {...this.state}  handleEmailSubmit={this.handleEmailSubmit}
          CloseDialogBox={this.CloseDialogBox}  handleEmailChange={this.handleEmailChange}/>)
      }

      return (
        <div>
          <h1>Movie Ticket Reservation</h1>
          <Button type='Submit' onClick={()=>{
            this.setState({
              openDialogBox:true,
              email:""
            })
          }} variant="contained" size="large" color="primary" className="button" >
            Book Ticket
          </Button>

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