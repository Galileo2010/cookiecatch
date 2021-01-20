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
        chrome.storage.sync.get('headerNames', (data) => {
            var headerNames = data['headerNames'];
            chrome.storage.sync.get('targetDomain', (data) => {
                var targetDomain = data['targetDomain'];
                $("#domains").val(domains.join(';'));
                $("#headers").val(headerNames.join(';'));
                $("#target").val(targetDomain);
            });
        });
    });
}

function save() {
    chrome.storage.sync.set({'domains': $('#domains').val().split(';')}, null);
    chrome.storage.sync.set({'headerNames': $('#headers').val().split(';')}, null);
    chrome.storage.sync.set({'targetDomain': $('#target').val()}, null);
}