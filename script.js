

const parkApp = {};

parkApp.apiUrl = "https://developer.nps.gov/api/v1/parks"
parkApp.apiKey = "sIbVeWuJQGDB0ggBcZ6WYl17B68jGWLccRhQajRG"
parkApp.form = document.querySelector('#form');
parkApp.parksInfoDiv = document.querySelector('#parksInfo');


parkApp.getParks = function (stateChoice, activityChoice) {
    const url = new URL(parkApp.apiUrl);
    url.search = new URLSearchParams({
        api_key: parkApp.apiKey,
        limit: 6,
        statecode: stateChoice,
        q: activityChoice
    });

    fetch(url)
    .then(results => {
        return results.json();
    }).then(parkData =>{
        const parkDataArray = parkData.data;
        // console.log(parkDataArray);
        parkApp.parksInfoDiv.innerHTML = '';
        if (parkDataArray.length > 0) {
        parkApp.displayParks(parkDataArray);
        const pageHeight = window.innerHeight;
        window.scrollBy(0, pageHeight);
        } else {
            const error = document.createElement ('h3');
            const pageHeight = window.innerHeight;
            window.scrollBy(0, pageHeight);
            error.innerText = "Looks like your search returned 0 results, you may wish to alter your search.";
            document.querySelector('#parksInfo').appendChild(error);
        }
    })
    
}

parkApp.displayParks = function(parkDataArray) {
    for(let i=0, l = parkDataArray.length; i < l; i++) {
    const object=parkDataArray[i]; 
   
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

    //new div for info and map wrap
    const elementWrapper = document.createElement('div');
    elementWrapper.classList.add('elWrapper');

    //new div for map
    const parkMap = document.createElement('div');
    parkMap.classList.add('map');

    const mapTag = `
    <iframe
        class="parkMap"
        title="mapa"   
        src="https://maps.google.com/maps?q=${object.latitude},${object.longitude}&t=&z=10&ie=UTF8&iwloc=&output=embed" 
        width="450" 
        height="450"
        loading="lazy">
    </iframe>
    `;    

    const parkInfo = document.createElement('div');
    parkInfo.classList.add('info');

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('parkInfoContainer');
    
    const imgContainerPark = document.createElement('div');
    imgContainerPark.classList.add('parkImgContainer');

    //appending new elements
    elementWrapper.appendChild(parkInfo);
    elementWrapper.appendChild(parkMap);

    parkMap.innerHTML += mapTag;
   
    parkInfo.appendChild(infoContainer);
    parkInfo.appendChild(imgContainerPark);

    infoContainer.appendChild(title);
    infoContainer.appendChild(description);
    infoContainer.appendChild(hyperlink);
    imgContainerPark.appendChild(image);

    document.querySelector('#parksInfo').appendChild(elementWrapper);

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

parkApp.scrollToSearch = function () {
    document.addEventListener("scroll", handleScroll);

    const searchAgain = document.querySelector('#searchAgain');

    function handleScroll() {
        const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollDistance = 0.1;

        if ((document.documentElement.scrollTop / scrollableHeight ) > scrollDistance) {
            searchAgain.style.display = "block";
        } else {
            searchAgain.style.display = "none";
        }
    }

    searchAgain.addEventListener("click", scrollToTop);

    function scrollToTop() {
        window.scrollTo({
            top: 0, 
            behavior: "smooth"
        });
    }
}

parkApp.init = function(){
    parkApp.eventListener();
    parkApp.scrollToSearch();
};


parkApp.init();

