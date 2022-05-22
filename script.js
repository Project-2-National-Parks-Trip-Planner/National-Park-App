

// create app object

const parkApp = {};

// create an initialization method
parkApp.init = () => {
    //calling the method which makes the request to the API
    parkApp.getData();

    
  }

//save relevant API info 
parkApp.apiUrl = "https://developer.nps.gov/api/v1/parks"
parkApp.apiKey = "sIbVeWuJQGDB0ggBcZ6WYl17B68jGWLccRhQajRG"



// create a method (AKA function on the app object) which requests information from the API
// logs it to the console
parkApp.getData = () => {
  //use the URL constructor to specify the parameters we wish to include in our API endpoint (AKA in the request we are making to the API)
  const url = new URL(parkApp.apiUrl);
  
  url.search = new URLSearchParams({
    // pass in our API key as a parameter
    api_key: parkApp.apiKey
  })
 
  

  // using the fetch API to make a request to the NPS Parks API photos endpoint
  // pass in new URL featuring params provided by the URLSearchParams constructor
  fetch(url)
    .then((response) => {
      // parse this response into JSON
      // return JSON response so that it can be used in the next function
      return response.json();
    })
    //parse the JSON Promise response and log out readable data (AKA data in JSON format)
    .then((jsonResponse) => {
      const data = jsonResponse.data;
      
      parkApp.displayStates(data);
    })

}



parkApp.state = '';
parkApp.displayStates = function(data) {
  console.log(data);
  
  
  data.map((item) => {
    
    
  })
  //QUERY SELECT FROM THE DOM AND ADD ON CHANGE EVENT TO IT
  const selectElement = document.getElementById('chosenState');
 
  selectElement.addEventListener('change', () => {
    const selectedValue = selectElement.value;
    parkApp.state = selectedValue;

    //IF MY OBJECT INCLUDES! SELECTED VALUE, GIVE IT TO ME
    parkApp.selectedState = data.filter((item) => {
      return item.states.includes(selectedValue);
    })

    console.log(parkApp.selectedState);
    
  })

  //PARK NAMES
  const parkNames = data.map((name) => {
    return name.fullName;
  })
  console.log(parkNames);

  //PARK ACTIVITIES
  const parkActivities = data.map((activitie) => {
    return activitie.activities;
  })
  console.log(parkActivities);

  //PARK FEES
  const parkFees = data.map((fee) => {
    return fee.entranceFees;
  })
  console.log(parkFees);
  
} 







//call the init method to kickstart our app
parkApp.init();

console.log(parkApp);


