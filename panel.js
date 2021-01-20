$(() => {
    chrome.storage.sync.get('headerNames', (data) => {
        var headerNames = data['headerNames'];
        createButton(headerNames);
        createTextBox(headerNames);
        createTips();

        chrome.devtools.network.onRequestFinished.addListener(
            (request) => {
                headerNames.forEach(element => {
                    var value = request.request.headers.find(e => e.name === element).value;
                    if(value){
                        $(`#p-${element}`).text(value);
                        chrome.storage.sync.set({[element]: value}, null);
                    }
                });
                $("#tips").text("");
            }
        );

        headerNames.forEach(element => {
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

function createButton(headerNames) {
    headerNames.forEach(element => {
        var btn = $(`<button id="btn-${element}">Copy ${element}</button>`);
        $('body').append(btn);
    });
}

function createTextBox(headerNames) {
    headerNames.forEach(element => {
        var p = $(`<p>${element}: <span id="p-${element}"></span></p>`);
        $('body').append(p);
    });
}

function createTips() {
    var p = $(`<p id="tips"></p>`);
    $('body').append(p);
}