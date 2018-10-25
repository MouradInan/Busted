var url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=1d196f582fa84a40943803b4f6843690';

var req = new Request(url);
var result;
fetch(url)
    .then(function(response) {
      response.json().then(function(data){
			result = data;
 


  function addElement (x, lien) { 
  // creé la div h2 et a
        var newDiv = document.createElement("h2"); 
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

  function addAuthor(x){

        var newDiv = document.createElement("h4"); 

  // and give it some content 
        var newContent = document.createTextNode(x); 

  // add the text node to the newly created div
        newDiv.appendChild(newContent);  


  // add the newly created element and its content into the DOM 
        var currentDiv = document.getElementById("h4"); 
        document.body.insertBefore(newDiv, currentDiv); 


  }

  for (var i = 0; i < result.articles.length; i++) {
      if(result.articles[i].author!=null ){

              addAuthor(result.articles[i].author);

          } else { addAuthor(result.articles[i].name);}


              console.log(result.articles[i].url);

              addElement(result.articles[i].title, result.articles[i].url);

      }
     

    });
 });



