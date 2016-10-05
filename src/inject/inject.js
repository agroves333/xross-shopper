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

// Inject HTML into page
var xmlHttp = null;

xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", chrome.extension.getURL ("src/inject/inject.html"), false );
xmlHttp.send( null );

var inject  = document.createElement("div");
inject.innerHTML = xmlHttp.responseText;
document.body.insertBefore (inject, document.body.firstChild);

// Inject Ad
var imgURL = chrome.extension.getURL("src/images/ad.png");
document.getElementById("kbb-ext-ad").src = imgURL;

function getPriceAdvisor() {
	var specs = document.getElementsByClassName("spec-key");
	var vin = '';

	for(var i = 0; i < specs.length; i++) {
		if(specs[i].innerText === 'VIN:') {
			vin = specs[i].nextElementSibling.innerText;
		}
	}
	var pa_src = '';

	// if (window.btData.stock === 'new') {
	// 	pa_src = 'http://panc.syndication.kbb.com/priceadvisornewcar/fairpurchaseprice?APIKey=00000000-0000-0000-0000-000000000000&NewCarVIN='+vin+'&DisplayMSRP=true&DisplayAskingPrice=true&DisplayFPP=false&DisplayICO=true&DisplayTI=false&DisplaySRP=true';
  //
	// } else if (window.btData.stock === 'used' || window.btData.stock === 'cpo') {
	// 	pa_src = 'http://pauc.syndication.kbb.com/priceadvisorusedcar/fairpurchaseprice?APIKey=00000000-0000-0000-0000-000000000000&NewCarVIN='+vin+'&DisplaySRP=true&DisplayAskingPrice=true';
	// }

	document.getElementById('kbb-ext-pa').setAttribute('src', pa_src);
}

setTimeout(function() {
	getPriceAdvisor();

	// Get keywords
	var metakeywords = getMetaKeywords();

	if(metakeywords.length > 0) {
		checkForKeywords(metakeywords);
	}else{
		console.log(document.title);
		checkForKeywords(document.title);
	}
	
	console.log("Year/Make/Model", year+ " " + make+ " " + model);
	document.getElementById("year").value = year;
	document.getElementById("make").value = make;
	document.getElementById("model").value = model;
}, 3000);