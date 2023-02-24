//search global variables 
let searchBar = document.querySelector('[data-search]');
let suggestions = document.querySelector('[data-searchSuggestion]');
//searching list from user input 
let toSearch = [];

//search mechanism render list of planets based on the search word in the input field 
 function search(data) {
    toSearch = [];
    suggestions.style.display = 'none';
    searchBar.addEventListener('input', (e) => {
        toSearch = []; // clear the Searched Array before push to it new letters
        suggestions.innerHTML = '';
        suggestions.style.display = 'flex';
        e.preventDefault();
        let searchInput = e.target.value.toLowerCase();

        // looping through the fetched data array and check if there is match with user input
        //and pushes the results to list array 
        data.forEach(element => {
            if (element.name.toLowerCase().includes(searchInput) && searchInput !== '') {
                toSearch.push(element);
            }else if(searchInput === ''){
                suggestions.style.display = 'none';
            }
        });
        //render UI the list of searched data 
        for (let i = 0; i < toSearch.length; i++) {
            if(toSearch.length > 0 ){
                //dropdown list on the search bar 
                renderSuggestionsList(toSearch[i]);
            }
            
        }


    });

}


function renderSuggestionsList(searched){
    let listEl = document.createElement('li'); 
        listEl.innerText = searched.name;
        listEl.addEventListener('click',()=>{
            suggestions.style.display = 'none';
             popUp(searched.id,toSearch);
        });
        suggestions.appendChild(listEl);
}

// renders the popup window from planet object { }
function popUp(searchedPlanetID,Arr) {
    //searchedPlanetID == solen.id selected
    let popupWindow = document.querySelector('[data-popup]'); 
    let card = document.querySelector('[data-popup-card]'); 
    popupWindow.style.display = 'flex';
    //the index of the searched objects
    let indexInSearched = Arr.findIndex(el => el.id === searchedPlanetID); 
    card.innerHTML = popUpHTML(Arr[indexInSearched]);
    window.addEventListener('click',(e)=>{
        e.preventDefault();
        if(e.target === popupWindow){
            popupWindow.style.display = 'none'; 
        }
    });
    Pagnition(card,Arr);
}


function Pagnition(card,data){
    let preButton = document.querySelector('[data-previous]'); 
    let nextButton = document.querySelector('[data-next]'); 
    let counter = 0 ; 
    
        preButton.addEventListener('click', ()=>{
            card.innerHTML = ''; 
            counter--;
            if(counter < 0 ) counter = data.length - 1;
            card.innerHTML = popUpHTML(data[counter]);
            
        });  

        nextButton.addEventListener('click', ()=>{
            card.innerHTML = ''; 
            counter++; 
            if(counter > data.length -1 ) counter = 0; 
            card.innerHTML = popUpHTML(data[counter]);
            
        });

        
        
        
}


function popUpHTML(planet) {
    let moons = '' ;
    planet.moons.forEach(moon=>{
        moons += moon + ' | '; 
    });
    return `
        <section class="popup__header">
            <h1 class="popup__title">${planet.name}</h1>
            <h4 class="popup__title-latin">${planet.latinName}</h4>
            <p class="popup__description">${planet.desc}</p>
        </section>
        
        <section class="popup__footer">
            <section class="popup__footer_sepc">
                <article>
                    <h3>OMKRETS</h3>
                    <p>${planet.circumference} km</p>
                </article>
                <article>
                    <h3>MAX TEMPERATUR</h3>
                    <p>${planet.temp.day}C</p>
                </article>
                <article>
                    <h3>KM FRÅN SOLEN</h3>
                    <p>149 600 000 km</p>
                </article>
                <article>
                    <h3>MIN TEMPERATUR</h3>
                    <p>${planet.temp.night}C</p>
                </article>
            </section>

            <section class="popup__footer_moons">
                <article>
                    <h3>MÅNAR</h3>
                    <p>${moons}</p>
                </article>
            </section>

        </section>
   

`;

}

export {search,renderSuggestionsList,popUp}
       