const parkApp = {};

parkApp.init = function(){
    //code to kickoff app goes here
    parkApp.getParks(); 
};

//test the API to determine whether it's working and to ensure we're getting the expected data back 

//save relevant API info 
parkApp.apiUrl = "https://developer.nps.gov/api/v1/parks"
parkApp.apiKey = "sIbVeWuJQGDB0ggBcZ6WYl17B68jGWLccRhQajRG"

parkApp.getParks = function () {
    //fetch request for park info 
    const url = new URL(parkApp.apiUrl);
    url.search = new URLSearchParams({
        api_key: parkApp.apiKey,
        limit: 500
    });

    fetch(url)
    .then(results => {
        return results.json();
    }).then(parkData =>{
        const object = parkData.data;
        console.log(object);

        parkApp.parkActivities(object);
        parkApp.openingHours(object);
    })
}
//RETURNS ARRAY OF 466 PARKS 

parkApp.parkActivities = function (object){
    const parkActivities = object.map( ({activities}) => {
        return activities;
    })
    
    console.log(parkActivities);
}

//RETURNS ACTIVITIES FOR EACH PARK AS NEW ARRAY 


parkApp.openingHours = function (object) {
    const openingHours = object.map( ({operatingHours}) => {
        return operatingHours;
    });
    const daysOpen = openingHours.map( () => {
        return openingHours[0];
    });
    const weekdays = daysOpen.map( () => {
        return daysOpen[0];
    })
    const hours = weekdays.map( ({standardHours}) => {
        return standardHours;
    })

    console.log(hours);
}



parkApp.init();

