import React from 'react';
import "./styles/GlobalStyles.css"
import { Grid } from '@material-ui/core';






function AvailableList(props){
    const seatCount = props.available.length;
    return (
        <div className="left">
        <h4>Available Seats: ({seatCount === 0? 'No seats available' : seatCount})</h4>
        <ul>
          {props.available.map( res => <li key={res} >{res}</li> )}
        </ul>
      </div>
    )
}


function ReservedList(props){
    return(
        <div className="right">
          <h4>Reserved Seats: ({props.reserved.length})</h4>
          <ul>
            {props.reserved.map(res => <li key={res} >{res}</li>) }
          </ul>
        </div>
      )  
}

class DrawGrid extends React.Component {

  
    render() {
      return (
         <div className="container">          
          <table className="grid">
            <tbody>
                <tr>
                  { this.props.seat.map( row =>
                    <td 
                      className={this.props.reserved.indexOf(row) > -1? 'reserved': 'available'}
                      key={row} onClick = {e => this.props.onClickData(row)}>{row} </td>) }
                </tr>
                <Grid container spacing={2} >
                  <Grid item xs={6} sm={6}>
                    <AvailableList available = { this.props.available } />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <ReservedList reserved = { this.props.reserved } />
                  </Grid>
                </Grid>
            </tbody>
          </table>                                      
         </div>
      )
    }
    
  
  }
  

export default DrawGrid