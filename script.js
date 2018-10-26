


//var langue=["fr","us","cn","ru","gb"]




var url = 'https://newsapi.org/v2/top-headlines?country=fr&apiKey=1d196f582fa84a40943803b4f6843690';

var req = new Request(url);
var result;
fetch(url)
    .then(function(response) {
      response.json().then(function(data){
			result = data;
 


  function addElement (x, lien) { 
  // creé la div h2 et a
        var newDiv = document.createElement("h5"); 
        var newDiv1 = document.createElement("a"); 

         newDiv.appendChild(newDiv1); 

  // ajouter du text dans le h2
        var newContent = document.createTextNode(x); 
  // 
        newDiv1.appendChild(newContent); 
  

  // Mettre le titre dans le DOM
        var currentDiv = document.getElementById("div1"); 
        document.body.insertBefore(newDiv, currentDiv); 

        newDiv1.setAttribute("href", lien );

}

  function addAuthor(x, url){

        var newDiv = document.createElement("p");
        var newDiv1 = document.createElement("img"); 
        newDiv.appendChild(newDiv1); 


        var newContent = document.createTextNode(x); 

  
        newDiv.appendChild(newContent);  


  
        var currentDiv = document.getElementById("p"); 
        document.body.insertBefore(newDiv, currentDiv); 
        newDiv1.setAttribute("src", url);
        newDiv1.setAttribute("width","300px");
        newDiv1.setAttribute("height","300px");
         

  }

  for (var i = 0; i < result.articles.length; i++) {

              addElement(result.articles[i].title, result.articles[i].url);

              if(result.articles[i].publishedAt!=null ){

              addAuthor(result.articles[i].publishedAt, result.articles[i].urlToImage);

          } else { addAuthor(result.articles[i].Author, result.articles[i].urlToImage);}
              


      }
     

    });
 });



 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });



$(document).ready(function(){
    $('select').formSelect();
  });



