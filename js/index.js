import {search,renderSuggestionsList,popUp} from "./search.js";

let URL_API = 'https://majazocom.github.io/Data/solaris.json';



// fetching function that return data from Planet API 
async function fetchPlanets(){

    try{
        let response = await fetch(URL_API); 
        let data = await response.json();
        console.log(response);
        return data;

    }catch(error){
        console.log(error);
    }

    

}

async function setup(){
    let data = await fetchPlanets();
    search(data);
    renderPlanetsUI(data);
}

function renderPlanetsUI(dataArray){
    let planetsHTML = document.querySelector('[data-planets]'); 
        planetsHTML.innerHTML = ''; 
        dataArray.forEach(planet => {
            // planetsHTML.innerHTML += `<div data-id="${planet.id}" class="planet solarsystem__${planet.name}"></div> `
            
            let div = document.createElement('div'); 
            div.setAttribute('data-id',planet.id); 
            div.setAttribute('class',`planet solarsystem__${planet.name}` );
            div.addEventListener('click',()=>{
                popUp(planet.id,dataArray);
            })
    
            planetsHTML.appendChild(div);
        });


    
}



setup();