import {search,renderSuggestionsList,popUp} from "./search.js";

let URL_API = 'https://majazocom.github.io/Data/solaris.json';


// fetching function that return data from Planet API 
async function fetchPlanets(){
    
    try {
        
        let response = await fetch(URL_API);
        if(!response.ok){
            let message = `${response.status}`; 
            throw message;
        }else{
            let data = await response.json();
            return data;
        }

    } catch(err){
        let errorMessage = ''; 
        switch(parseInt(err)){
            case 404: 
            errorMessage = `The JSON file not found `;
            break;

            case 401: 
            errorMessage = `Unauthorized `;
            break

        }
        document.querySelector('.main_container').innerHTML = `
            <h1 class="error">${err}.. ${errorMessage} </h1>

        `
            ;

        document.querySelector('.main_container').classList.add('error_mode');

    }
    

    

}

async function setup(){
    let data = await fetchPlanets();
        try{
            search(data);
            renderPlanetsUI(data);
        }catch{
            return
        }
        
   
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