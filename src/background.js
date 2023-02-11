const regex = /(.*(learn\.microsoft\.com|docs\.microsoft\.com)\/)([a-z][a-z]-[a-z][a-z])(\/.*)/g;

function getLocalizationGroup(regexp, str) {
    return Array.from(str.matchAll(regexp), m => {
      if (m.length > 3){
        return m[3]
      } else{
        return [];
      };
    });
  }

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var group = getLocalizationGroup(regex, details.url);        
        if (group.length > 0 && group[0].toLowerCase() != "en-us"){
            var newUrl = details.url.replace(regex, "$1en-us$4");
            return { redirectUrl: newUrl }
        } 
      }, { urls: ['*://docs.microsoft.com/*', '*://learn.microsoft.com/*'] }, ['blocking']
);