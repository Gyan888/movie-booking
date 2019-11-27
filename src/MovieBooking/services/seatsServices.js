export async function getSalesforceUsers(params) {
    let url = `localhost:3000/seats`;
    return fetch(url, {
        method: "GET",
        headers:{
          'Content-Type': "application/json",
        },
        body:JSON.stringify(params)
      })
      .then(response=>{
        return response.json()
      })
      .catch(error=>{
        return Promise.reject(error)
      })
  }
  