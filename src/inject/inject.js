chrome.extension.sendMessage({}, function(response) {
});

chrome.extension.sendMessage({}, function(response) {
});
var year = 0;
var make = "";
var model = "";

function getMetaKeywords() { 
   var metas = document.getElementsByTagName('meta'); 
  
   for (var i=0; i<metas.length; i++) { 
      if (metas[i].getAttribute("keywords")) { 
         return metas[i].getAttribute("keywords"); 
      } 
   } 

    return "";
} 

function checkForKeywords(data) {
   data = data.toLowerCase().split(" ");
   
   console.log(JSON.stringify(data));
   if(data.length > 0){
	   year = data[0];
   }
   if(data.length > 1){
	   make = data[1];
   }
   if(data.length > 2){
	   model = data[2]
   }
}

console.log("Hello. This message was sent from src/inject/inject.js");

var xmlHttp = null;

xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", chrome.extension.getURL ("src/inject/inject.html"), false );
xmlHttp.send( null );

var inject  = document.createElement("div");
inject.innerHTML = xmlHttp.responseText;
document.body.insertBefore (inject, document.body.firstChild);

// Inject Ad
var imgURL = chrome.extension.getURL("src/images/ad.png");
console.log(imgURL)
document.getElementById("kbb-ext-ad").src = imgURL;

setTimeout(function() {
	var metakeywords = getMetaKeywords();

	if(metakeywords.length > 0) {
		checkForKeywords(metakeywords);
	}else{
		console.log(document.title);
		checkForKeywords(document.title);
	}
	
	console.log(year+ " " + make+ " " + model);
	document.getElementById("year").value = year;
	document.getElementById("make").value = make;
	document.getElementById("model").value = model;
}, 3000);