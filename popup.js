$(function(){
    init();
    $('#save').click(function (e) { 
        save();
        $('#tips').text('Saved!');
    });
});

function init() {
    chrome.storage.sync.get('domains', (data) => {
        var domains = data['domains'];
        if(!domains){
            domains = 'stackoverflow.com';
        }
        chrome.storage.sync.get('headers', (data) => {
            var headers = data['headers'];
            if(!headers){
                headers = 'referer;cookie';
            }
            $("#domains").val(domains);
            $("#headers").val(headers);
        });
    });
}

function save() {
    chrome.storage.sync.get('domains', (data) => {
        var domains = data['domains'];
        if(!domains){
            domains = 'stackoverflow.com';
        }
        chrome.storage.sync.get('headers', (data) => {
            var headers = data['headers'];
            if(!headers){
                headers = 'referer;cookie';
            }
            $("#domains").val(domains);
            $("#headers").val(headers);
        });
    });

    chrome.storage.sync.set({'domains': $('#domains').val()}, null);
    chrome.storage.sync.set({'headers': $('#headers').val()}, null);
}