/* script.js > le script qui permet de creer les éléments de la page html qui vont permettre d'afficher correctement les données récupérées */

/*  Fonction call est appelé lors de la recherche des actualités
    par rapport à un terme recherché dans la barre de recherche
    Elle appelle l'api pour récupérer les données et les renvoie vers createStructure.
*/
function call(){
    //Supresssion de l'ancienne recherche si elle existe
    removeLastSearch();
    var query = document.getElementById("query").value;
    var url = 'https://newsapi.org/v2/everything?' +
              'q='+ query + '&' +
              'language=fr&' +
              'apiKey=1d196f582fa84a40943803b4f6843690';
    fetch(url)
    .then(function(response) {
        response.json().then(function(data){
            result = data;
            createStructure(result);
        }).catch(function(error){
            console.log("Erreur lors de la prise des données en json");
        });
    }).catch(function(error){
        console.log("Il y a eu un problème lors de l'appel de l'Api");
    });
}
/* Fonction createStructure s'occupe de créer à partir des données reçues de call() des éléments de la page html
    paramètre : result : resultat de l'api News */
function createStructure(result){
    // Boucle sur les articles de la requête
    for(i=0;i<result.articles.length; i++){
        // création d'une div card , div card-image, div card-content, div-action (voir materialize)
        var card = document.createElement("div");
        card.setAttribute("class", "card small col s4");

        var cardImg = document.createElement("div");
        cardImg.setAttribute("class", "card-image");
        var img = document.createElement("img");
        img.setAttribute("src", result.articles[i].urlToImage == '' ? "https://cdn.browshot.com/static/images/not-found.png" : result.articles[i].urlToImage);
        img.setAttribute("id", "img" + i);
        img.style.height = result.articles[i].urlToImage == '' ? "200px" : "auto";

        var cardContent = document.createElement("div");
        cardContent.setAttribute("class", "card-content");
        var p = document.createElement("p");
        p.innerHTML = result.articles[i].title;

        var cardAction = document.createElement("div");
        cardAction.setAttribute("class", "card-action");
        var a = document.createElement("a");
        a.setAttribute("href", result.articles[i].url);
        a.innerHTML = "Consulter l'article";

        // Construction de l'hiérarchie de l'arbre des éléments html
        document.getElementById("article").appendChild(card);
        cardImg.appendChild(img);
        card.appendChild(cardImg);
        card.appendChild(cardContent);
        card.appendChild(cardAction);
        cardContent.appendChild(p);
        cardAction.appendChild(a);
    }
}

function removeLastSearch(){
    var article = document.getElementById("article");
    article.innerHTML = '';
}
