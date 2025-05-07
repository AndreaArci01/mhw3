const input = document.querySelector("#Search input");
const searchContainer = document.querySelector("#Search");
function handleFocus() {
    searchContainer.classList.add("SearchFocus");
}
function handleBlur() {
    searchContainer.classList.remove("SearchFocus");
}
input.addEventListener("focus", handleFocus);
input.addEventListener("blur", handleBlur);



const buttonShowLessSongs = document.querySelector(".Less");
const buttonShowMoreSongs = document.querySelector(".Other");
const showMoreSong = document.querySelector(".Songs2");

function showLess(){
    showMoreSong.classList.add("hidden");
    buttonShowLessSongs.classList.add("hidden");
    buttonShowMoreSongs.classList.remove("hidden");
}

function showMore(){
    showMoreSong.classList.remove("hidden");
    buttonShowMoreSongs.classList.add("hidden");
    buttonShowLessSongs.classList.remove("hidden");
}

buttonShowLessSongs.addEventListener("click", showLess);
buttonShowMoreSongs.addEventListener("click", showMore)

const client_id = 'secret';
const client_secret = 'secret';

let token;

fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);



function onJson(json) {
    console.log('JSON ricevuto');
    console.log(json);

    const library = document.querySelector('#searchResults');
    library.innerHTML = '';
    
    const results = json.albums.items;
    let num_results = results.length;
    
    if(num_results > 10)
      num_results = 10;
    for(let i=0; i<num_results; i++){
      const album_data = results[i];
      const title = album_data.name;
      const selected_image = album_data.images[0].url;
      const album = document.createElement('div');
      album.classList.add('Song');
      
      const img = document.createElement('img');
      img.src = selected_image;
      img.classList.add("Covers");
      
      const caption = document.createElement('span');
      caption.textContent = title;
      caption.classList.add("SongName");
      
      album.appendChild(img);
      album.appendChild(caption);
      library.appendChild(album);
    }
  }
  
  function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }


function search(event){
    event.preventDefault();

    const searchInput = document.querySelector('#search-bar');
    const searchValue = encodeURIComponent(searchInput.value);
    console.log('eseguo la ricerca: ' + searchValue);

    fetch("https://api.spotify.com/v1/search?type=track,album,artist&q=" + searchValue,
        {
          headers:
          {
            'Authorization': 'Bearer ' + token
          }
        }
).then(onResponse).then(onJson);
}

function onTokenJson(json){
  console.log(json);
  token = json.access_token;
}

function onTokenResponse(response){
  return response.json();
}

const ricerca=document.querySelector('#ricerca');
ricerca.addEventListener('submit', search);

const apiKey = 'secret';
const city = 'Catania';

function getWeather() {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=it`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const cityName = data.location.name;
            const weatherDescription = data.current.condition.text;
            const temperature = data.current.temp_c;
            document.querySelector('#city-name').textContent = `Meteo per ${cityName}`;
            document.querySelector('#weather-description').textContent = `Condizioni: ${weatherDescription}`;
            document.querySelector('#temperature').textContent = `Temperatura: ${temperature}°C`;
        })
        .catch(error => console.error("Errore nel recupero dei dati meteo", error));
}

getWeather();
