chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch(request.type) {

      case "create":
        chrome.storage.sync.get(["bookmarkFolder"], function(result) {
          if (result.bookmarkFolder) {
            chrome.bookmarks.create({
              'parentId': result.bookmarkFolder,
              'title': request.url,
              'url': request.url
            });
          } else {
            chrome.bookmarks.create({
              'title': request.url,
              'url': request.url
            });
          }
          
          sendResponse({status: "ok"});
        });        
        break;

      case "get":
        chrome.bookmarks.search(request.url, function(results){
          let bookmarked = (results.length > 0) ? true : false;
          sendResponse({status: "ok", bookmarked: bookmarked});
        })
        break;
      
      case "remove":
        chrome.bookmarks.search(request.url, function(results){
          for (let res of results) {
            chrome.bookmarks.remove(res.id);
          }
          sendResponse({status: "ok", bookmarked: false});
        })
        break;
    }
    return true;
  }
);
