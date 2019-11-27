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
  