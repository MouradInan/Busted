var key="ee43a99b93e33ab5579123dc84a94031";
var result;
var a='Montpellier';
var url;
			function getLocation() {
			  if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
              }
			}
			
			function showPosition(position) {
                console.log(position.coords.latitude);
                url='https://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+
                position.coords.longitude+'&apikey='+key;
                getMeteo();
            }
            function showError(error){
                url='https://api.openweathermap.org/data/2.5/weather?q='+a+'&apikey='+key;
                getMeteo();
            }
function getMeteo(){
    fetch(url)
        .then( function(response){ response.json()
            .then(function(data){
                result = data;
                console.log(result);
                var imgmeteo= new Image(100,100) ;
                var resultMeteo;
                switch (result.weather[0].main) {
                    case 'Mist':
                        imgmeteo.src='https://mvistatic.com/design/images/meteo/pictos/2017/nuit_P6_a.png';
                        document.getElementById("meteo").append(imgmeteo);
                        resultMeteo = 'Brouillard';
                        break;
                    case 'Clouds':
                        imgmeteo.src='http://archives.nicematin.com/media_nicematin/imagecache/article-taille-normale-nm/image/ouch/2013/11/17/b8af1a5900556d2e5f4a643b11199ff7.png&hash=abcdeafad';
                        document.getElementById("meteo").appendChild(imgmeteo);
                        resultMeteo = 'Nuageux';
                        break;
                    case 'Sun':
                        imgmeteo.scr='http://archives.varmatin.com/media_varmatin/imagecache/article-taille-normale/image/ouch/2013/11/17/6819ceccc4f2587143ed626c2bff46a1.png&hash=abcdeafad';
                        document.getElementById("meteo").appendChild(imgmeteo);
                        resultMeteo = 'Clair';
                        break;
                    case 'Rain':
                        imgmeteo.src='http://www.icône.com/images/icones/1/4/weather-overcast-2.png&hash=abcdeafad';
                        document.getElementById("meteo").appendChild(imgmeteo);
                        resultMeteo = 'Pluvieux';
                        break;
                    case 'Clear':
                        imgmeteo.src='http://archives.varmatin.com/media_varmatin/imagecache/article-taille-normale/image/ouch/2013/11/17/6819ceccc4f2587143ed626c2bff46a1.png&hash=abcdeafad';
                        document.getElementById("meteo").appendChild(imgmeteo);
                        resultMeteo = 'Clair';
                        break;
                    case 'Drizzle':
                        imgmeteo.src='http://archives.nicematin.com/media_nicematin/imagecache/article-taille-normale-nm/image/ouch/2013/11/17/b8af1a5900556d2e5f4a643b11199ff7.png&hash=abcdeafad';
                        document.getElementById("meteo").appendChild(imgmeteo);
                        resultMeteo = 'Couvert';    
                        break;
                    default:
                        console.log(imgmeteo);
                        }
                        document.getElementById("meteo").innerHTML +="<div onload='parseCoords()'><span id=\"city\">"+ result.name+ "</span>, "+resultMeteo+"</div>";
            })});
}