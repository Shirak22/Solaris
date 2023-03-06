import {search,renderSuggestionsList,popUp} from "./search.js";

let planets = document.querySelectorAll('[data-planet]'); 
let API_URL = 'solaris.json'; 
let solarSystem = document.querySelector('[data-solarsystem]');
let btnSpeed = document.querySelector('#btn-speed');
let btnSize = document.querySelector('#btn-size');
let btnDistance = document.querySelector('#btn-distance');
let input = document.querySelector('#zoom');
let URL_API = 'solaris.json';



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
            renderPlanets(await data);
            resetDefault(await data);
            
            btnSpeed.addEventListener('click',()=>{
                compareSpeeds(data);
            }); 
        
            btnSize.addEventListener('click',()=>{
                compareSizes(data);
            }); 
        
            btnDistance.addEventListener('click',()=>{
                compareDistance(data);
            }); 
        
            input.addEventListener('input',(e)=>{
                setCss('font-size',`${input.value}px`, '#universe');
                
            }); 
            // renderPlanetsUI(data);
           
        }catch{
            return
        }
        
   
}



setup();


function compareSpeeds(data){
   resetDefault(data);
   data.forEach(planet => {
       setCss('--orbit-speed',`${planet.orbitalPeriod/60}s`,`#${planet.name}`);
   });

   setCss('font-size',`8px`,`#universe`);

} 

function compareSizes(planets){
   resetDefault(planets);
   for (let index = 1; index < planets.length; index++) {
       const planet = planets[index];
       setCss('--size',`${convertRadius(planet.circumference)/30 }em`,`.${planet.name}`);
      }
      setCss('--size',`.2em`,`#moon`);
      setCss('--sun-size',`${convertRadius(planets[0].circumference)/30 }em`,`:root`);
      setCss('font-size',`7px`,`#universe`);


} 

function compareDistance(planets){
   //the API starts with the sun on index 0, we ignore the sun because of the huge size compared with the planets 
   //we compare the sun with the planets by the compareSize function 
   resetDefault(planets);

   for (let index = 1; index < planets.length; index++) {
       const planet = planets[index];
       let planetVar = `--${planet.name}-orbit`;
       setCss(planetVar,`${convertOrbit(planet.distance)}em`,`:root`);
       console.log(planetVar,convertOrbit(planet.distance));
      }
      setCss('--size',`.3em`,`#moon`);
      setCss('--size',`.3em`,`.Merkurius`);
      setCss('--size',`.7em`,`.Jorden`);
      setCss('--size',`.7em`,`.Venus`);

      setCss('font-size',`5px`,`#universe`);
      setCss('--sun-size',`20em`,`:root`);

}

//calculating and applying scale 1:1000  on the planets 
function convertRadius(circumference){
   let radius = circumference/(Math.PI*2); 
   return 2* Math.floor(radius/1000); 
}

function resetDefault(planets){
   let orbit = 20; 
   // resetting orbits to visiable values 
   for (let index = 1; index < planets.length; index++) {
       const planet = planets[index];
       let planetVar = `--${planet.name}-orbit`;
       orbit += 10 ;
       setCss(planetVar,`${orbit}em`,`:root`);
      }
      //reset planets Sizes 
      setCss('--sun-size',`20em`,`:root`);
      setCss('--size',`1em`,`.Merkurius`);
      setCss('--size',`3em`,`.Venus`);
      setCss('--size',`3em`,`.Jorden`);
      setCss('--size',`.5em`,`.Mars`);
      setCss('--size',`6em`,`.Jupiter`);
      setCss('--size',`4em`,`.Saturnus`);
      setCss('--size',`2em`,`.Uranus`);
      setCss('--size',`2em`,`.Neptunus`);
      setCss('--size',`.5em`,`#moon`);

    
}

//convert the distance from the sun by the scale 1:30000000
function convertOrbit(dist){
   let scale = 1/30000000; 
   return (dist*scale).toFixed(2); 
}

function renderPlanets(planets){
   solarSystem.innerHTML = '';
   solarSystem.innerHTML += `<article id="${planets[0].name}"><article class="${planets[0].name}"></article></article>`; 
  for (let index = 1; index < planets.length; index++) {
   const planet = planets[index];
   solarSystem.innerHTML +=  cardHtml(planet); 
  }
}


function cardHtml(planet){ 
   let card; 
   if(planet.name === 'Jorden'){
       card = 
       `
       <article id="${planet.name}" class="orbit">
           <article class="position">
               <aside id="moon"><aside class="moon"></aside></aside>
               <article data-planet class="${planet.name} planet">
                   <aside class="info">
                       <p>${planet.name}</br> dist: ${planet.distance/1000000}mkm</p> 
                   </aside>
               </article>
           </article>
        </article>

   `; 



   } else if(planet.name === 'Saturnus') {
       card = `
       <article id="${planet.name}" class="orbit">
           <article class="position">
              <aside class="Saturnus_ring"></aside>
               <article data-planet class="${planet.name} planet">
                   <aside class="info">
                       <p>${planet.name} <b></br> dist: ${planet.distance/1000000}</b> mkm </p> 
                   </aside>
               </article>
           </article>
        </article>

   `; 
   }else {
       card = `
       <article id="${planet.name}" class="orbit">
           <article class="position">
               <article data-planet class="${planet.name} planet">
                   <aside class="info">
                       <p>${planet.name} <b></br>dist: ${planet.distance/1000000}</b> mkm</p> 
                   </aside>
               </article>
           </article>
        </article>

   `; 
   }
   return card;
}



//getting element variabls in CSS stylesheet 
//exampel:
//-----getCssVariable('--size','.neptune'); 
function getCssVariable(variable,element){
   let rootCss = document.querySelector(element);
   let rootVar = getComputedStyle(rootCss); 
   return rootVar.getPropertyValue(variable);
}

//setting element variabls in CSS stylesheet 
//exampel:
//----- setCss('--size','10em','.neptune');
function setCss(variable,value,element){
   let rootCss = document.querySelector(element);
   rootCss.style.setProperty(variable,value);
}
