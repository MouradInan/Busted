/* script.js > le script qui permet de creer les éléments de la page html qui vont permettre d'afficher correctement les données récupérées */

/*  Fonction call est appelé lors de la recherche des actualités
    par rapport à un terme recherché dans la barre de recherche
    Elle appelle l'api pour récupérer les données et les renvoie vers createStructure.
*/
function call(){
    //Supresssion de l'ancienne recherche si elle existe
    var query = document.getElementById("query").value;
    var url = 'https://newsapi.org/v2/everything?' +
              'q='+ query + '&' +
              'language=fr&' +
              'apiKey=6cd5152e27e940f091262721214a542f';
    fetch(url)
    .then(function(response) {
        response.json().then(function(data){
            if(data.articles.length == 0){
                M.toast({html: 'Il n\' y a pas d\'articles sur ce sujet actuellement '})
            }
            else{
                removeLastSearch();
                M.toast({html: data.articles.length + ' article(s) affiché(s).', classes: 'red darken-3'})
                console.log(data);
                createStructure(data);
            }

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
        card.setAttribute('id', 'card-'+i);

        var cardImg = document.createElement("div");
        cardImg.setAttribute("class", "card-image");
        var img = document.createElement("img");
        img.setAttribute("src", result.articles[i].urlToImage);
        img.setAttribute("onerror", "this.src='http://futuris-logistics.com/wp-content/uploads/2014/06/news.jpg'");
        img.setAttribute("id", "img" + i);
        img.setAttribute('class','articles-image')

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
        $("#card-"+i).hover(function(){
            console.log('toto');
            $(this).css('background-color', 'rgb(255,255,255,1)');
        }, function(){
            $(this).css('background-color', 'rgb(255,255,255,0.3)')
        });

    }
}
/* removeLastSearch supprime la dernière recherche effectué */
function removeLastSearch(){
    $('#article').html('');
}

function autocompletion(){
    var titles = [];
    var query = document.getElementById("query").value;
    if(query.length >= 4){
        var url = 'https://newsapi.org/v2/everything?' +
                  'q='+ query + '&' +
                  'language=fr&' +
                  'apiKey=6cd5152e27e940f091262721214a542f';
        fetch(url)
        .then(function(response) {
            response.json().then(function(result){

                for(i=0;i<result.articles.length; i++){
                    titles[i] = result.articles[i].title;
                }
            }).catch(function(error){
                console.log("Erreur lors de la prise des données en json : " + error);
            });
        }).catch(function(error){
            console.log("Il y a eu un problème lors de l'appel de l'Api");
        });
        $( "#query" ).autocomplete({
            onSelect : function(selected){
                $("#query").val(selected);
            },
            source: titles
        });
    }
}
function loadTopHeadlines(lang){
    removeLastSearch();
    var url = 'https://newsapi.org/v2/top-headlines?country='+lang+'&apiKey=6cd5152e27e940f091262721214a542f';
    var req = new Request(url);
    fetch(url)
        .then(function(response) {
            response.json().then(function(data){
                createStructure(data);
            });
        });
}
$('.with-gap').change(function(){
    if(this.checked){
        loadTopHeadlines(this.value);
    }
})
