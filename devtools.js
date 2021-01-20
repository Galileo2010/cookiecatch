chrome.storage.sync.get('domains', (data) => {
    var domains = data['domains'];
    if(!domains){
        domains = 'stackoverflow.com';
    }
    domains = domains.split(';').map(domain => `(^${domain})`).join('|');
    var eval = `/${domains}/.test(document.domain)`;

    chrome.devtools.inspectedWindow.eval(eval, (reuslt, isException) => {
        if(reuslt && !isException){
            chrome.devtools.panels.create('CookieCaptor', null, 'panel.html');
        }
    });
});

