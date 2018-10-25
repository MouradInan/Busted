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
            document.getElementById("lol").innerHTML ="In "+result.name+", the weather is "+result.weather[0].main;}) } );