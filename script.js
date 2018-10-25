var url = 'https://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2018-10-25&' +
          'sortBy=popularity&' +
          'apiKey=1d196f582fa84a40943803b4f6843690';

var req = new Request(url);
var result;
fetch(url)
    .then(function(response) {
        response.json().then(function(data){
			result = data;
 


  function addElement (x) { 
  // creé la div
  var newDiv = document.createElement("h2"); 

  // ajouter du text dans le h2
  var newContent = document.createTextNode(x); 
  // 
  newDiv.appendChild(newContent);  

  // Mettre le titre dans le DOM
  var currentDiv = document.getElementById("div1"); 
  document.body.insertBefore(newDiv, currentDiv); 

  newDiv.setAttribute("href", x);

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
    console.log(result.articles[i].author);
    addElement(result.articles[i].title);
    addAuthor(result.articles[i].author);


  }
     

    });
      });



