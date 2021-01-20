var headerNames = [];
var newHeaders = [];

chrome.storage.sync.get('headers', (data) => {
  var temp = data['headers'] || 'referer;cookie';
  headerNames = temp.split(';');

  headerNames.forEach(element => {
    chrome.storage.sync.get(element, (data) => {
      newHeaders.push({name: element, value: data[element]});
    });
  });
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  beforeSendHeadersListener,
  {urls: ['https://developer.chrome.com/*']},
  [ 'blocking', 'requestHeaders', 'extraHeaders']
);

function beforeSendHeadersListener(details) {
  newHeaders.forEach(header => updateHeaders(details.requestHeaders, header));
  return {requestHeaders: details.requestHeaders};
}

function updateHeaders(headers, header) {
  if(header.value == undefined){
    return;
  }

  var oldHeader = headers.find(e => e.name === header.name);
  if (oldHeader == undefined){
    headers.push(header);
  } else {
    oldHeader.value = header.value;
  }
}

chrome.storage.onChanged.addListener(function(changes, area) {
  if (area == "sync" && 'headers' in changes) {
    headerNames = changes.headers.newValue.split(';');
  }
  newHeaders.forEach(header => {
    if (area == "sync" && header.name in changes) {
      header.value = changes[header.name].newValue;
    }
  });
});