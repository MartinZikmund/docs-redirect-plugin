const regex = new RegExp(/(.*docs.microsoft.com\/)([a-z][a-z]\-[a-z][a-z]]*)(\/.*)/);
const str = `https://docs.microsoft.com/cs-cz/aspnet/core/mvc/views/tag-helpers/authoring?view=aspnetcore-3.1`;
let m;

function getFirstGroup(regexp, str) {
    return Array.from(str.matchAll(regexp), m => m[2]);
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