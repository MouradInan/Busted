/* Script pour l'api Météo avec la géolocalisation */

var apikey="ee43a99b93e33ab5579123dc84a94031";
var cityNameIfNotGeolocalized='Paris';
var urlForFetch;

// Cette fonction permet de récupérer la position de l'utilisateur pour lui fournir la météo de sa ville.
function getLocation() {
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
}
			
function showPosition(position) {
    url='https://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude
        +'&lon='+position.coords.longitude
        +'&apikey='+apikey;
    getMeteo();
}
// Si l'utilisateur ne veut pas utiliser la géolocalisation ou qu'elle n'est pas disponible
function showError(error){
    url='https://api.openweathermap.org/data/2.5/weather?q='+cityNameIfNotGeolocalized+'&apikey='+apikey;
    getMeteo();
}
function getMeteo(){

    fetch(url).then(function(response){ 
        response.json().then(function(result){
            var imgmeteo = new Image(50,50) ;
            imgmeteo.setAttribute('id', 'meteo_image');
            var resultMeteo;
            switch (result.weather[0].main) {
                case 'Mist':
                    imgmeteo.src= 'static/images/brouillard.png';
                    document.getElementById("meteo").append(imgmeteo);
                    resultMeteo = 'Brouillard';
                    break;
                case 'Clouds':
                    imgmeteo.src='static/images/nuageux.png';
                    document.getElementById("meteo").appendChild(imgmeteo);
                    resultMeteo = 'Nuageux';
                    break;
                case 'Sun':
                    imgmeteo.src='static/images/sunny.jpg';
                    document.getElementById("meteo").appendChild(imgmeteo);
                    resultMeteo = 'Clair';
                    break;
                case 'Rain':
                    imgmeteo.src='static/images/rain.jpg';
                    document.getElementById("meteo").appendChild(imgmeteo);
                    resultMeteo = 'Pluvieux';
                    break;
                case 'Clear':
                    imgmeteo.src='static/images/sunny.jpg';
                    document.getElementById("meteo").appendChild(imgmeteo);
                    resultMeteo = 'Clair';
                    break;
                case 'Drizzle':
                    imgmeteo.src='../images/nuageux.jpg';
                    document.getElementById("meteo").appendChild(imgmeteo);
                    resultMeteo = 'Couvert';    
                    break;
                default:
                    imgmeteo.src='https://www.visma.com/contentassets/e08acdfaa2c84b88961e51b7277dce09/logo_notfound.png';
                    document.getElementById("meteo").appendChild(imgmeteo);
                    resultMeteo = 'Non disponible';    
            }
            document.getElementById("meteo").innerHTML +="<span style='display:block;text-align: center;' onload='parseCoords()'><span id=\"city\">"+ result.name+ "</span>, "+resultMeteo+"</span>";
        });
    });
}

getLocation();
