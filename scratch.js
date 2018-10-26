var key="ee43a99b93e33ab5579123dc84a94031";
var result;
var a='Paris';
var url='http://api.openweathermap.org/data/2.5/weather?q='+a+'&appid='+key;
if ("geolocation" in navigator) {
  /* géolocalisation possible */
} else {
  alert("Le service de géolocalisation n'est pas disponible sur votre ordinateur.");
}
fetch(url)
    .then( function(response){ response.json()
        .then(function(data){
            result = data;
            console.log(result);
            var imgmeteo= new Image(100,100) ;
            document.body.innerHTML ="<div> In "+result.name+", the weather is "+result.weather[0].main+"</div>";
            switch (result.weather[0].main) {
                case 'Mist':
                    imgmeteo.scr='https://mvistatic.com/design/images/meteo/pictos/2017/nuit_P6_a.png';
                    document.body.appendChild(imgmeteo);
                    break;
                  case 'Clouds':
                      imgmeteo.src='http://www.icône.com/images/icones/1/4/weather-overcast-2.png';
                      document.body.appendChild(imgmeteo);
                  case 'Sun':
                    imgmeteo.scr='http://archives.varmatin.com/media_varmatin/imagecache/article-taille-normale/image/ouch/2013/11/17/6819ceccc4f2587143ed626c2bff46a1.png';
                    document.body.appendChild(imgmeteo);
                    break;
                  case 'Rain':
                      imgmeteo.src='http://www.icône.com/images/icones/1/4/weather-overcast-2.png';
                      document.body.appendChild(imgmeteo);
                      break;
                case 'Clear':
                       imgmeteo.src='http://archives.varmatin.com/media_varmatin/imagecache/article-taille-normale/image/ouch/2013/11/17/6819ceccc4f2587143ed626c2bff46a1.png';
                       document.body.appendChild(imgmeteo);
                        break;
                  default:
                    console.log(imgmeteo);
                    }
        })});