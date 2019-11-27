import React from 'react';
import "./styles/GlobalStyles.css"

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
    constructor(props){
        super(props)
        console.log("props ",props);        
    }

    
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
            </tbody>
          </table>
          
          <AvailableList available = { this.props.available } />
          <ReservedList reserved = { this.props.reserved } />
         </div>
      )
    }
    
  
  }
  

export default DrawGrid