$(() => {
    chrome.storage.sync.get('headers', (data) => {
        var temp = data['headers'] || 'referer;cookie';
        var headers = temp.split(';');
        createButton(headers);
        createTextBox(headers);
        createTips();

        chrome.devtools.network.onRequestFinished.addListener(
            (request) => {
                headers.forEach(element => {
                    var value = request.request.headers.find(e => e.name === element).value;
                    if(value){
                        $(`#p-${element}`).text(value);
                        chrome.storage.sync.set({[element]: value}, null);
                    }
                });
                $("#tips").text("");
            }
        );

        headers.forEach(element => {
            $(`#btn-${element}`).click((e) => { 
                chrome.storage.sync.get(element, (data) => {
                    copyTextToClipboard(data[element]);
                    $("#tips").text(`${element} Copied!`);
                });
            });
        });
    });
});

function copyTextToClipboard(text) {
    var copyFrom = $('<textarea/>');
    copyFrom.text(text);
    $('body').append(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.remove();
}

function createButton(headers) {
    headers.forEach(element => {
        var btn = $(`<button id="btn-${element}">Copy ${element}</button>`);
        $('body').append(btn);
    });
}

function createTextBox(headers) {
    headers.forEach(element => {
        var p = $(`<p>${element}: <span id="p-${element}"></span></p>`);
        $('body').append(p);
    });
}

function createTips() {
    var p = $(`<p id="tips"></p>`);
    $('body').append(p);
}