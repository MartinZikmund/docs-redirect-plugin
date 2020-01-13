const regex = /(.*docs.microsoft.com\/)([a-z][a-z]\-[a-z][a-z]]*)(\/.*)/g;

function getFirstGroup(regexp, str) {
    return Array.from(str.matchAll(regexp), m => {
      if (m.length > 2){
        return m[2]
      } else{
        return [];
      };
    });
  }

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var group = getFirstGroup(regex, details.url);        
        if (group.length > 0 && group[0].toLowerCase() != "en-us"){
            var newUrl = details.url.replace(regex, "$1en-us$3");
            return { redirectUrl: newUrl }
        } 
      }, { urls: ['*://docs.microsoft.com/*'] }, ['blocking']
);