/* script.js > le script qui permet de creer les éléments de la page html qui vont permettre d'afficher correctement les données récupérées */

/*  Fonction call est appelé lors de la recherche des actualités
    par rapport à un terme recherché dans la barre de recherche
    Elle appelle l'api pour récupérer les données et les renvoie vers createStructure.
*/
function call(){
    //Supresssion de l'ancienne recherche si elle existe
    var query = document.getElementById("query").value;
    var punctuationless = query.replace(/[.,\/#!$%\^&\*;:{}?=\-_`~()]/g," ");
    var finalString = punctuationless.replace(/\s{2,}/g," ");
    var url = 'https://newsapi.org/v2/everything?' +
              'q='+ finalString + '&' +
              'language=fr&' +
              'apiKey=6cd5152e27e940f091262721214a542f';
    fetch(url)
    .then(function(response) {
        response.json().then(function(data){
            if(data.articles.length == 0){
                M.toast({html: 'Il n\' y a pas d\'articles sur ce sujet actuellement ',classes: 'red darken-3'})
            }
            else{
                removeLastSearch();
                M.toast({html: data.articles.length + ' article(s) affiché(s).', classes: 'red darken-3'})
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
    for(var i=0;i<result.articles.length; i++){
        // création d'une div card , div card-image, div card-content, div-action (voir materialize)
        var card = document.createElement("div");
        card.setAttribute("class", "card small col s4");
        card.setAttribute('id', 'card-'+i);

        var cardImg = document.createElement("div");
        cardImg.setAttribute("class", "card-image");
        var img = document.createElement("img");
        img.setAttribute("src", result.articles[i].urlToImage);
        img.setAttribute("onerror", "this.src='static/images/news.jpg'");
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

// Autocompletion de la barre de recherche
var cache = {};
$( "#query" ).autocomplete({
    source: function(req, res){
        var titles = [];
        if (req.term in cache){
            res(cache[req.term]);
            return;
        }
        if(req.term.length >= 4){
            var url = 'https://newsapi.org/v2/everything?' +
                    'q='+ req.term + '&' +
                    'language=fr&' +
                    'apiKey=6cd5152e27e940f091262721214a542f';
            const response = fetch(url);
            response.then(function(resp){
                resp.json().then(json => {
                    for(i=0;i<json.articles.length; i++){
                        titles.push(json.articles[i].title);
                    }
                    cache[req.term] = titles;   
                    res(titles);
                })
            })
        }
    }
});

// Chargement de news
function loadTopHeadlines(lang){
    removeLastSearch();
    var url = 'https://newsapi.org/v2/top-headlines?country='+lang+'&apiKey=6cd5152e27e940f091262721214a542f';
    fetch(url).then(function(response) {
        response.json().then(function(data){
            createStructure(data);
        });
    });
}
// Changement de langues Fr ou US
$('.with-gap').change(function(){
    if(this.checked){
        loadTopHeadlines(this.value);
    }
})
// Catégorie de recherche
var data = {
    'Divertissement': null,
    'Général': null,
    'Santé': null,
    'Science': null,
    'Sport': null,
    'Technologie': null
};
// NEW CHIP COMMAND
$("#cmd-ChipsAjout").click(function () {
    removeLastSearch();
    var input = M.Chips.getInstance($('#lg-input')).chipsData[0].tag;
    switch(input){
        case "Divertissement":
            input = "entertainment";
            break;
        case "Général":
            input = "general";
            break;
        case "Santé":
            input = "health";
            break;
        case "Sport":
            input = "sports";
            break;
        case "Technologie":
            input = "technology";
            break;
        case "Science":
            input = "science";
            break;
        case "Business":
            input = "business";
            break;
    };
    var url = 'https://newsapi.org/v2/top-headlines?country='+$('.with-gap:checked').val()+'&category='+input+'&apiKey=6cd5152e27e940f091262721214a542f';
    fetch(url).then(function(response) {
        response.json().then(function(data){
            createStructure(data);
        });
    });
});

$("#lg-input").chips({
    autocompleteOptions: {
        data: data,
        minLength:0
    },
    placeholder: "Catégorie",
    secondaryPlaceholder: "Limite = 1",
    limit: 1
});

