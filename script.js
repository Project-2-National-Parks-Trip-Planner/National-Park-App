//App goals *** 
//on page load 
    //use the NPS api to get all park data 

//on submit of form 
    //1. get the value of the state element 
    //use that value to get relevant park data from Api 
    //hold that refined data as a new object 
    //2. get the value of the budget element 
    //use that value to get relevant data from new state object 
    //hold that refined data as new object 
    //3. get the value of the activity element 
    //use that value to get relevant data from new object 
//display title, img, and description on the page of relevant data 



const parkApp = {};

//save relevant API info 
parkApp.apiUrl = "https://developer.nps.gov/api/v1/parks"
parkApp.apiKey = "sIbVeWuJQGDB0ggBcZ6WYl17B68jGWLccRhQajRG"
parkApp.form = document.querySelector('#form');
parkApp.parksInfoDiv = document.querySelector('#parksInfo');


parkApp.getParks = function (query, query2) {
    //fetch request for park info 
    const url = new URL(parkApp.apiUrl);
    url.search = new URLSearchParams({
        api_key: parkApp.apiKey,
        limit: 500,
        statecode: query,
        q: query2,
        // q: "cost:%2030.00"
    });

    //make our Api call
    fetch(url)
    .then(results => {
        return results.json();
    }).then(parkData =>{
        // parkApp.parkInfo.innerHTML = '';
        const parkDataArray = parkData.data;
        parkApp.parksInfoDiv.innerHTML = '';
        parkApp.displayParks(parkDataArray);
    })

//         parkApp.filterResults();

//         parkApp.parkActivities(object);
//         parkApp.openingHours(object);
    
}



parkApp.displayParks = function(parkDataArray) {
    for(let i=0, l = parkDataArray.length; i < l; i++) {
    const object=parkDataArray[i]; 
    console.log(object);
    // console.log(object.addresses[0].stateCode); example of how to get state code. 
    const title = document.createElement ('h2');
    title.innerText = object.fullName;

    const image = document.createElement('img');
    image.src = object.images[0].url;
    image.alt = object.images[0].altText;

    const description = document.createElement('p');
    description.innerText = object.description;

    const parkInfo = document.createElement('div');
    parkInfo.classList.add('info');
    parkInfo.appendChild(title);
    parkInfo.appendChild(image);
    parkInfo.appendChild(description);

    // console.log(displayPark.freeParks);

    // const fees = object.entranceFees[0];
    // console.log(fees);

    //append HTMl to the #parksInfo element
    document.querySelector('#parksInfo').appendChild(parkInfo);
    }

    // const freeParks = object.filter((object) => {
    //     return park.EntranceFees[0].cost = "0.00";
    // })
}

parkApp.eventListener = function () {
    parkApp.form.addEventListener('submit', function (e) {
        e.preventDefault();

        const userStateChoice = document.querySelector('#chosenState').value;

        // const userBudgetChoice = document.querySelector('input[name="cost"]:checked').value;

        const userActivityChoice = document.querySelector('#activity').value;

        console.log(userStateChoice, userActivityChoice);
        parkApp.getParks (userStateChoice, userActivityChoice);
    })
    }







// //RETURNS ARRAY OF 466 PARKS (object)

// parkApp.parkActivities = function (object){
//     const parkActivities = object.map( ({activities}) => {
//         return activities;
//     })
    
//     console.log(parkActivities);
// }

// //RETURNS ACTIVITIES FOR EACH PARK AS NEW ARRAY 


// parkApp.openingHours = function (object) {
//     const openingHours = object.map( ({operatingHours}) => {
//         return operatingHours;
//     });
//     const daysOpen = openingHours.map( () => {
//         return openingHours[0];
//     });
//     const weekdays = daysOpen.map( () => {
//         return daysOpen[0];
//     })
//     const hours = weekdays.map( ({standardHours}) => {
//         return standardHours;
//     })

//     console.log(hours);
// }

// //function to filter on submit 

// parkApp.filterResults = function (object) {
//     const submitButton = document.querySelector("button");
//     submitButton.addEventListener('submit', function (e) {
//         e.preventDefault();
//         //filter by state 
//         //filter by budget
//         //filter by activities 
//         alert('you have clicked submit');



//     })
// }

//function to display results of filter 

parkApp.init = function(){
    //code to kickoff app goes here
    parkApp.eventListener();
    parkApp.getParks(); 
    
};


parkApp.init();

