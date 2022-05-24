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

        parkApp.parkActivities(object);
    })
}
//RETURNS ARRAY OF 466 PARKS 

parkApp.parkActivities = function (object){
    const activities = object.map(function(activities){
        return object[''].activities;
    })
    console.log(activities);
}


// parkApp.displayRelevantParks = (dataFromApi) => {
//     const ul = document.querySelector('ul');
//     const relevantActivity = dataFromApi.filter ((datum) => {
//         return datum[0].activity;
//     })
//     console.log(relevantActivity);
// }

parkApp.init();

console.log(parkApp);