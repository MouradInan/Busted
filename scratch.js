var key="ee43a99b93e33ab5579123dc84a94031";
var result;
var a='Geneva';
fetch('http://api.openweathermap.org/data/2.5/weather?q='+a+'&appid='+key)
    .then( function(response){ response.json()
        .then(function(data){result = data;console.log(result)}) } );