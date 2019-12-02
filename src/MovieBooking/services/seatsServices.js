import { throwError } from "rxjs";

export async function getAllSeats() {
    let url = `${process.env.REACT_APP_API_URL}/seats`;
    return fetch(url, {
        method: "GET",
        headers:{
          'Content-Type': "application/json",
        }
      })
      .then(response=>{
        console.log("response =>",response);
        if (!response.ok) {
          console.log("HTTP error, status = " + response.status);
        }
        return response.json()  
      })
  }


export async function SetReservedSeat(data){
  let url = `${process.env.REACT_APP_API_URL}/seats`;
  return fetch(url, {
    method: "PUT",
    headers:{
      'Content-Type': "application/json",
    },
    body:JSON.stringify(data)
  }).then(response=>{
    console.log("response =>",response);
    if (!response.ok) {
      throwError("No data")
    }
    return response.json() 
  })
 

}