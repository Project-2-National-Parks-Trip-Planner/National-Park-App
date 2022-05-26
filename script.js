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
  const url = new URL(parkApp.apiUrl);
  
  url.search = new URLSearchParams({
    api_key: parkApp.apiKey,
    limit: 466,
  })
 
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      const data = jsonResponse.data;
      parkApp.parkStates(data);
    })
}

parkApp.state = '';

parkApp.parkStates = function(data) {
  console.log(data);

  const selectElement = document.getElementById('chosenState');
  selectElement.addEventListener('change', () => {
    const selectedValue = selectElement.value;
    parkApp.state = selectedValue;    

    //IF MY OBJECT INCLUDES! SELECTED VALUE, GIVE IT TO ME
    parkApp.selectedState = data.filter((item) => {
      return item.states.includes(selectedValue);
    })

    parkApp.filterByCost = parkApp.selectedState;
  
  })

  
  const formElement = document.getElementById('form');
  const parkCosts = data[0].entranceFees //array of park fees  

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedValue = selectElement.value;
    parkApp.state = selectedValue;  
    
    
    parkApp.filterByPrice = function(parkData, inputCost) {
      if (inputCost === 'cheap') {
        const listOfFees = parkApp.selectedState.map((cheapFee) => {
          //cheapFee.entranceFees ->  this is the array we need to filter 
          const filterCheapFee = cheapFee.entranceFees.filter((el) => {
            return el.cost <= '15' && el.lenght !== 0; // put in my new array property cost less or equal than 15 AND items with something inside (not empty);
          })

          return filterCheapFee; 
        })
        console.log(listOfFees);
      }
      else if(inputCost === 'medium') {
        const listOfFees = parkApp.selectedState.map((mediumFee) => {
          return mediumFee;
        })
        console.log(listOfFees);
      }else if(inputCost === 'expensive' ) {
        const listOfFees = parkApp.selectedState.map((expensiveFee) => {
          return expensiveFee;
        })
        console.log(listOfFees); 
      }
      
      
      
      
    }
    
    


    //IF MY OBJECT INCLUDES! SELECTED VALUE, GIVE IT TO ME
    parkApp.selectedState = data.filter((item) => {
      return item.states.includes(selectedValue);
    })

    parkApp.filterByCost = parkApp.selectedState;


    

    console.log('Array from state filter ', parkApp.selectedState);

    const inputCost = document.querySelector('input[name = "price"]:checked').value;
    console.log(inputCost);
    
    parkApp.filterByPrice(parkApp.selectedState, inputCost);

  })



  




  //PARK NAMES
  // const parkNames = data.map((name) => {
  //   return name.fullName;
  // })
  // console.log(parkNames);

  //PARK ACTIVITIES
  // const parkActivities = data.map((activitie) => {
  //   // return activitie.activities;
  // })
  // console.log(parkActivities);

  //PARK FEES
  // const parkFees = data.map((fee) => {
  //   return fee.entranceFees;
  // })
  // console.log(parkFees);
  
} 









//call the init method to kickstart our app
parkApp.init();

// console.log(parkApp);


