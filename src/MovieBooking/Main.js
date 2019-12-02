
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
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';



const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));



function ShowMessage(props){
      const classes = useStyles();
      return (
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.ShowMessage}
        autoHideDuration={2000}
        onClose={props.handleCloseMesage}
      >
        <SnackbarContent
          className={clsx(classes[props.variant], PropTypes.string)}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              {props.message}
            </span>
          }
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={props.handleCloseMesage}>
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>

      );
}

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
           onSubmit={props.handleSubmit}
           onError={errors => console.log(errors)}>
                <TextValidator
                  variant="outlined"
                  validators={['required', 'isEmail']}
                  margin="normal"
                  fullWidth
                  label="Email"
                  placeholder="Enter Email"
                  name="email"              
                  autoFocus                
                  errorMessages={['*Required', 'Email is not valid.']}
                  value={props.field.email} onChange={props.handleChange}
                />

                <TextValidator 
                    label="Name " 
                    margin="normal"                        
                    value={props.field.name} onChange={props.handleChange} 
                    name="name"
                    validators={['required']}
                    autoFocus
                    errorMessages={['*Required']} 
                    fullWidth={true}
                    placeholder="Enter Name"
                    variant="outlined"/>

                <TextValidator 
                    label="Phone" 
                    margin="normal"                        
                    value={props.field.phone} onChange={props.handleChange} 
                    name="phone"
                    autoFocus
                    validators={['required']}
                    errorMessages={['*Required']} 
                    fullWidth={true}
                    placeholder="Enter phone"
                    variant="outlined"/>

              <DialogActions>
                    <Button  color="primary" autoFocus type="submit" value="submit">
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
        variant:"info",
        ShowMessage:false,
        seatAvailable: [],
        seatReserved: [],
        seatBooked:[],        
        message:"",
        field:{
          name:"",
          phone:"",
          email:""        
        }
      }
    }

    async UNSAFE_componentWillMount(){
      let result=await getAllSeats();      
      this.setState({
        seat:result.map((seat)=>seat.SeatName),
        seatAvailable:result.filter((seats)=>seats.is_reserved===false).map((seat)=>seat.SeatName),
        seatBooked:result.filter((seats)=>seats.is_reserved===true).map((seat)=>seat.SeatName),
        seatReserved:result.filter((seats)=>seats.is_reserved===true).map((seat)=>seat.SeatName)
      })      
    }
    

    handleSubmit=async(e)=>{
      let data=this.state.seatReserved.filter(dt=>!(this.state.seatBooked.includes(dt)))   
      try{
        let result=await SetReservedSeat({"data":data,"field":this.state.field})      
        let msg= "Updated successfully"
        if (result.status!==200){
          msg= "Can not be updated"
          this.setState({            
            ShowMessage:true,
            openDialogBox:false,
            message:msg,
            variant:"error"
            })
          return
        }            
        this.setState({
          seatBooked:this.state.seatBooked.concat(data),
          ShowMessage:true,
          openDialogBox:false,
          message:msg,
          variant:"success"
          })
      }
      catch(e){
        this.setState({          
          ShowMessage:true,
          openDialogBox:false,
          message:"Error",
          variant:"error"
          })                          
      }

    }

    handleChange=(e)=>{
      let field=this.state.field
      field[e.target.name]=e.target.value;      
      this.setState({
        field:field
      })
    
    }

    handleCloseMesage=()=>{
      this.setState({
        ShowMessage:false
      })
    }

    CloseDialogBox=()=>{
      this.setState({
        openDialogBox:false
      })
    }

    onClickData=(seat) =>{
      if(this.state.seatReserved.indexOf(seat) > -1 ) {
        if (this.state.seatBooked.indexOf(seat) > -1 ){
          this.setState({
            ShowMessage:true,
            message:"Seat is already booked !",
            variant:"info"
          })
          return 
        }
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
        <div id="test">
          <h1>Movie Ticket Reservation</h1>
          <Button  onClick={()=>{
            if(this.state.seatReserved.filter(dt=>!(this.state.seatBooked.includes(dt))).length!==0){            
            this.setState({openDialogBox:true})
            return
            }
            this.setState({
              ShowMessage:true,
              message:"No seat is selected .",
              variant:"error"
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
            {this.state.ShowMessage?<ShowMessage {...this.state} handleCloseMesage={this.handleCloseMesage} />:""}
            {this.state.openDialogBox?<Dialogbox {...this.state}  handleSubmit={this.handleSubmit}
          CloseDialogBox={this.CloseDialogBox}  handleChange={this.handleChange}/>:""}
        </div>
      )
    }
  }
  
export default Main