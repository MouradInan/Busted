/* script.js > le script qui permet de creer les éléments de la page html qui vont permettre d'afficher correctement les données récupérées */

/*  Fonction call est appelé lors de la recherche des actualités
    par rapport à un terme recherché dans la barre de recherche
    Elle appelle l'api pour récupérer les données et les renvoie vers createStructure.
*/
function call(){
    //Supresssion de l'ancienne recherche si elle existe
    removeLastSearch();
    var final = [];
    var query = document.getElementById("query").value;
    var desired = query.replace(/[.,\/#!$%\^&\*;:{}=\-_`~?()]/g," ")
    var url2 = 'https://newsapi.org/v2/everything?' +
              'q='+ desired + '&' +
              'language=fr&' +
              'apiKey=1d196f582fa84a40943803b4f6843690';
    var api2 = fetch(url2).then(function(response){
        return response.json().then(function(data){
            if(data.articles.length == 0){
                 M.toast({html: 'Il n\' a pas d\'articles sur ce sujet', displayLength: 1000, classes:'red darken-3'})
            }
             M.toast({html: data.articles.length + ' articles trouvés', displayLength: 1000, classes:'red darken-3'})
            createStructure(data);
        });
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

/* removeLastSearch supprime la dernière recherche effectuée */
function removeLastSearch(){
    var article = document.getElementById("article");
    article.innerHTML = '';
}

function autocompletion(){
    var titles = [];
    var query = document.getElementById("query").value;
    console.log(query.length)
    if(query.length > 3){
        var url2 = 'https://newsapi.org/v2/everything?' +
                      'q='+ query + '&' +
                      'language=fr&' +
                      'apiKey=1d196f582fa84a40943803b4f6843690';
        var api2 = fetch(url2).then(function(response){
            return response.json().then(function(data){
                for(var i=0; i< data.articles.length; i++){
                    if(data.articles[i].url != ''){
                        titles.push(data.articles[i].title);
                    }
                }
            });
        });
        $( "#query" ).autocomplete({
            select : function(selected){
                $("#query").val(selected);
            },
            source: titles
        });
    }
}
