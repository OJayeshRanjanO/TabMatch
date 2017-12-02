alert("Hello");

function addOverlay() {
	var overlayDiv = document.createElement("div");
	overlayDiv.id = "overlay";
	overlayDiv.style.width = "100vw";
	overlayDiv.style.height = "100vh";
	image = "https://www.w3schools.com/css/trolltunga.jpg";//Replace this
	image = "\'" + image + "\'";
	overlayDiv.style.backgroundImage = "url("+ image +")";
	overlayDiv.style.backgroundSize = "100vw 100vh";
	overlayDiv.style.opacity = "0.3";
	overlayDiv.style.position = "fixed";
	overlayDiv.style.top = "0px";
	overlayDiv.style.bottom = "0px";
	overlayDiv.style.left = "0px";
	overlayDiv.style.right = "0px";
	// overlayDiv.style.zIndex = "10000 !important";
	// overlayDiv.innerHTML = '<p> Another Test </p>';
	overlayDiv.addEventListener("click",removeOverlay);
	document.body.appendChild(overlayDiv);
}

function removeOverlay(){
	document.getElementById("overlay").remove();
}

addOverlay()

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//     var image = request.reeting;
// 	function addOverlay() {
// 		var overlayDiv = document.createElement("div");
// 		overlayDiv.id = "overlay";
// 		overlayDiv.style.width = "100vw";
// 		overlayDiv.style.height = "100vh";
// 		image = "./test_image.JPG";
// 		image = "\'" + image + "\'";
// 		overlayDiv.style.backgroundImage = "url("+ image +")";
// 		overlayDiv.style.backgroundSize = "100vw 100vh";
// 		overlayDiv.style.opacity = "0.3";
// 		overlayDiv.style.position = "fixed";
// 		overlayDiv.style.top = "0px";
// 		overlayDiv.style.bottom = "0px";
// 		overlayDiv.style.left = "0px";
// 		overlayDiv.style.right = "0px";
// 		// overlayDiv.innerHTML = '<p> Another Test </p>';
// 		overlayDiv.addEventListener("click",removeOverlay);
// 		document.body.appendChild(overlayDiv);
// 	}

// 	function removeOverlay(){
// 		document.getElementById("overlay").remove();
// 	}

// 	// sendResponse({farewell: "goodbye"});
//     // if (request.greeting == "hello"){
//     //   sendResponse({farewell: "goodbye"});
//     // }

//     alert("Hello");
//   });