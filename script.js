var query;
function quest(){
    var body = document.body;
    var h1 = body.getElementsByTagName("h1");
    if(h1.length > 0){
        for(i=0; i< h1.length; i++){

            body.removeChild(h1[i]);
        }
    }
    query = document.getElementById("query").value;
    call();

}


function call(){

    var url = 'https://newsapi.org/v2/everything?' +
              'q='+ query + '&' +
              'apiKey=1d196f582fa84a40943803b4f6843690';
    fetch(url)
    .then(function(response) {
        response.json().then(function(data){
            result = data;
            for(i=0;i<result.articles.length; i++){
                myFunction("H1", result.articles[i].title)
            }
        })
    });
}
function myFunction(content, text) {
    var h = document.createElement(content);
    var t = document.createTextNode(text);
    h.appendChild(t);
    document.body.appendChild(h);
}
