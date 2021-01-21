$(function(){
    init();
    $('#save').click(function (e) { 
        save();
    });
});

function init() {
    chrome.storage.sync.get(['domains', 'headerNames', 'targetDomain'], (data) => {
        $("#domains").val(data['domains'].join(';'));
        $("#headers").val(data['headerNames'].join(';'));
        $("#target").val(data['targetDomain']);
    });
}

function save() {
    chrome.storage.sync.set(
        {
            'domains': $('#domains').val().split(';'),
            'headerNames': $('#headers').val().split(';'),
            'targetDomain': $('#target').val()
        }, 
        null
    );
    $('#save').val('Saved!');
}