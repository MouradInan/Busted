var query;
function quest(){
    var body = document.body;
    var h1 = body.getElementsByTagName("h1");
    query = document.getElementById("query").value;
    call();

}


function call(){

    var url = 'https://newsapi.org/v2/everything?' +
              'q='+ query + '&' +
              'language=fr&' +
              'apiKey=1d196f582fa84a40943803b4f6843690';
    fetch(url)
    .then(function(response) {
        response.json().then(function(data){
            result = data;
            for(i=0;i<result.articles.length; i++){

                var card = document.createElement("div");
                card.setAttribute("class", "card col s4");

                var cardImg = document.createElement("div");
                cardImg.setAttribute("class", "card-image");
                var img = document.createElement("img");
                img.setAttribute("src", result.articles[i].urlToImage);

                var cardContent = document.createElement("div");
                cardContent.setAttribute("class", "card-content");
                var p = document.createElement("p");
                p.innerHTML = result.articles[i].title;

                var cardAction = document.createElement("div");
                cardAction.setAttribute("class", "card-action");
                var a = document.createElement("a");
                a.setAttribute("href", result.articles[i].urlToImage);
                a.innerHTML = result.articles[i].title;

                document.getElementById("article").appendChild(card);
                cardImg.appendChild(img);
                card.appendChild(cardImg);
                card.appendChild(cardContent);
                card.appendChild(cardAction);
                cardContent.appendChild(p);
                cardAction.appendChild(a);
            }
        })
    });
}
function myFunction(content, text, id) {
    var h = document.createElement(content);
    var t = document.createTextNode(text.title);
    document.getElementById("articles").appendChild(h);
    h.setAttribute("class", "col s4 article");
    h.setAttribute("id", "li" + id);
    var img = document.createElement("img");

    document.getElementsByClassName("card-image").appendChild(img);
    h.appendChild(t);
}
