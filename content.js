chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
      var image = new Image();
      image.src = request.data;
      addOverlay(image);
      sendResponse({ success: 'true' });
});

function addOverlay(image) {
	var overlayDiv = document.createElement("div");
	overlayDiv.id = "overlay";
	overlayDiv.style.width = "100vw";
	overlayDiv.style.height = "100vh";
    overlayDiv.style.backgroundImage  = 'url(\'' + image.src + '\')';
	overlayDiv.style.backgroundSize = "100vw 100vh";
	overlayDiv.style.opacity = "0.3";
	overlayDiv.style.position = "fixed";
	overlayDiv.style.top = "0px";
	overlayDiv.style.bottom = "0px";
	overlayDiv.style.left = "0px";
	overlayDiv.style.right = "0px";
	// overlayDiv.addEventListener("click",removeOverlay);
	document.body.appendChild(overlayDiv);

	var btn = document.createElement("BUTTON");        // Create a <button> element
	var t = document.createTextNode("CLOSE");       // Create a text node
	btn.appendChild(t);                                // Append the text to <button>
	btn.style.zIndex = 10;
	document.getElementById("overlay").appendChild(btn);                    // Append <button> to <body>
	btn.addEventListener("click",removeOverlay);

}

function removeOverlay(){
	document.getElementById("overlay").remove();
}
