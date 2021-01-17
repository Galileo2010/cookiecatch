
$(function(){
    chrome.devtools.network.onRequestFinished.addListener(
        function(request) {
            var request_cookies = request.request.headers.find(e => e.name === 'cookie').value;
            if(request_cookies){
                $("#text").text(request_cookies);
                $("#result").text("");
                chrome.storage.sync.set({'request_cookies': request_cookies}, function(){});    
            }
        }
    );

    $("#copy-cookies").click(function (e) { 
        chrome.storage.sync.get('request_cookies',function(data){
            copyTextToClipboard(data.request_cookies);
            $("#result").text("Copied!");
        });
    });
});

// Copy provided text to the clipboard.
function copyTextToClipboard(text) {
    var copyFrom = $('<textarea/>');
    copyFrom.text(text);
    $('body').append(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.remove();
}

// function copyTextToClipboard(text) {
//     navigator.clipboard.writeText(data.request_cookies)
//         .then(function() {
//             $("#result").text(data.request_cookies);
//         }, function() {
//             $("#result").text("<empty clipboard>");
//         }
//     );
// }