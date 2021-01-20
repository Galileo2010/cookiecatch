var domains = ['stackoverflow.com'];
var headerNames = ['referer', 'cookie'];
var targetDomain = 'https://developer.chrome.com/*';

chrome.storage.sync.set({'domains': domains}, null);
chrome.storage.sync.set({'headerNames': headerNames}, null);
chrome.storage.sync.set({'targetDomain': targetDomain}, null);

var newHeaders = [];
headerNames.forEach(element => {
  chrome.storage.sync.get(element, (data) => {
    newHeaders.push({name: element, value: data[element]});
  });
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  beforeSendHeadersListener,
  {urls: [targetDomain]},
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
  if (area == "sync" && 'headerNames' in changes) {
    headerNames = changes.headerNames.newValue;
  }
  if (area == "sync" && 'targetDomain' in changes) {
    targetDomain = changes.targetDomain.newValue;
  }
  newHeaders.forEach(header => {
    if (area == "sync" && header.name in changes) {
      header.value = changes[header.name].newValue;
    }
  });
});