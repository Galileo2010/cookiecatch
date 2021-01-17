$(function(){
    $("#play").click(function (e) { 
        chrome.storage.sync.get('request_cookies',function(data){
            navigator.clipboard.writeText(data.request_cookies)
                .then(function() {
                    $("#result").text(data.request_cookies);
                }, function() {
                    $("#result").text("<empty clipboard>");
                }
            );
        });  
    });
});