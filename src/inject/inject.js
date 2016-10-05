chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// ----------------------------------------------------------
			// This part of the script triggers when page is done loading
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
			
			
			// ----------------------------------------------------------

		}
		}, 10);
});