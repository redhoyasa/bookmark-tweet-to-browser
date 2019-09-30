chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    switch(request.type) {
      case "create":
        chrome.bookmarks.create({
          'title': request.url,
          'url': request.url
        })
        sendResponse({status: "ok"});
        break;

      case "get":
        var c = 0;
        chrome.bookmarks.search(request.url, function(results){
          let hasBeenAdded = (results.length > 0) ? true : false;
          sendResponse({status: "ok", hasBeenAdded: hasBeenAdded});
        })
        break;
    }
    return true;
  }
);
