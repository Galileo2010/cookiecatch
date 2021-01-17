
var menuItem = {
    "id": "music",
    "title": "music",
    "contexts": ["all"]
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){   
    if (clickData.menuItemId == "music"){    
        var myAudio = new Audio('./music.mp3');
        myAudio.play();  
        
        navigator.clipboard.writeText("fuck").then(function() {
            // $("#result").text(data.request_cookies);
        }, function() {
            // $("#result").text("<empty clipboard>");
        }
    );
    }
});