

const parkApp = {};

parkApp.apiUrl = "https://developer.nps.gov/api/v1/parks"
parkApp.apiKey = "sIbVeWuJQGDB0ggBcZ6WYl17B68jGWLccRhQajRG"
parkApp.form = document.querySelector('#form');
parkApp.parksInfoDiv = document.querySelector('#parksInfo');


parkApp.getParks = function (stateChoice, activityChoice) {
    const url = new URL(parkApp.apiUrl);
    url.search = new URLSearchParams({
        api_key: parkApp.apiKey,
        limit: 500,
        statecode: stateChoice,
        q: activityChoice
    });

    fetch(url)
    .then(results => {
        return results.json();
    }).then(parkData =>{
        const parkDataArray = parkData.data;
        console.log(parkDataArray);
        parkApp.parksInfoDiv.innerHTML = '';
        if (parkDataArray.length > 0) {
        parkApp.displayParks(parkDataArray);
        } else {
            const error = document.createElement ('h3');
            error.innerText = "Looks like your search returned 0 results, you may wish to alter your search.";
            document.querySelector('#parksInfo').appendChild(error);
        }
    })
    
}

parkApp.displayParks = function(parkDataArray) {
    for(let i=0, l = parkDataArray.length; i < l; i++) {
    const object=parkDataArray[i]; 
    console.log(object);
   
    const title = document.createElement ('h2');
    title.innerText = object.fullName;

    const image = document.createElement('img');
    image.src = object.images[0].url;
    image.alt = object.images[0].altText;

    const description = document.createElement('p');
    description.innerText = object.description;

    const hyperlink = document.createElement('a');
    hyperlink.innerText = "Get more information here";
    hyperlink.href = object.url;

    const parkInfo = document.createElement('div');
    parkInfo.classList.add('info');

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('parkInfoContainer');
    
    const imgContainerPark = document.createElement('div');
    imgContainerPark.classList.add('parkImgContainer');
   
    parkInfo.appendChild(infoContainer);
    parkInfo.appendChild(imgContainerPark);

    infoContainer.appendChild(title);
    infoContainer.appendChild(description);
    infoContainer.appendChild(hyperlink);
    imgContainerPark.appendChild(image);

    document.querySelector('#parksInfo').appendChild(parkInfo);
    }
}

parkApp.eventListener = function () {
    parkApp.form.addEventListener('submit', function (e) {
        e.preventDefault();

        const userStateChoice = document.querySelector('#chosenState').value;

        const userActivityChoice = document.querySelector('#activity').value;

        parkApp.getParks (userStateChoice, userActivityChoice);
    })
    }

parkApp.init = function(){
    parkApp.eventListener();
    // parkApp.getParks();
};


parkApp.init();

