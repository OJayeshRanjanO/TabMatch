//Dictionary object to store screenshots
var dict = new Object();

//Take a screenshot of the current active tab every 5 seconds and replace the previous screenshot for the given tab.
(function(){
    chrome.tabs.captureVisibleTab(function(screenshotUrl) {
        chrome.tabs.query({
            active:true,
            windowType:"normal",
            currentWindow: true},
            function(d){
                if(d[0]!=undefined){
                    dict[d[0].id]=screenshotUrl;
                }
            }
        )
    })
    setTimeout(arguments.callee, 5000);
})();

//Whenver a change of tab is detected compare the new tab with the previous tab and highlight the change in red using rembrandt
chrome.tabs.onActivated.addListener( function(newTab) {
    var tabId = newTab.tabId;
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function wait() {
        await sleep(1000);
        chrome.tabs.captureVisibleTab(function(screenshotUrl) {
            if(dict[tabId]){
                const rembrandt = new Rembrandt({
                    imageA: screenshotUrl,
                    imageB: dict[tabId],
                    thresholdType: Rembrandt.THRESHOLD_PERCENT,
                    maxThreshold: 0.01,
                    maxDelta: 1,
                    maxOffset: 0,
                    renderComposition: true, // Should Rembrandt render a composition image?
                    compositionMaskColor: Rembrandt.Color.RED // Color of unmatched pixels
                })

                rembrandt.compare()
                .then(function (result) {
                    console.log('Passed:', result.passed)
                    console.log('Pixel Difference:', result.differences, 'Percentage Difference', result.percentageDifference, '%')
                    console.log('Composition image buffer:', result.compositionImage)
                    var diff = result.differences;
                    if(diff>1){
                        chrome.tabs.getSelected(null, function(tab) {
                            chrome.tabs.sendMessage(tabId, {data: encode(result.compositionImage)}, function(response) {
                                console.log(response);
                            });
                        });
                    }
                })
                .catch((e) => {
                    console.error(e)
                })
            }else{
                dict[tabId]=screenshotUrl;
            }
        })
    }
    wait();

});


function encode(compositionImage) {
    var newCanvas = document.createElement("canvas");
    newCanvas.width = compositionImage.width;
    newCanvas.height = compositionImage.height;
    var newCtx = newCanvas.getContext("2d");
    newCtx.drawImage(compositionImage, 0, 0);
    return newCanvas.toDataURL("image/png");
}
