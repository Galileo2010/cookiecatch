chrome.storage.sync.get('domains', (data) => {
    var domains = data['domains'];
    var eval = `/${domains.map(domain => `(^${domain})`).join('|')}/.test(document.domain)`;

    chrome.devtools.inspectedWindow.eval(eval, (reuslt, isException) => {
        if(reuslt && !isException){
            chrome.devtools.panels.create('CookieCaptor', null, 'panel.html');
        }
    });
});

