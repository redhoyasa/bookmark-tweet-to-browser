chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.bookmarks.create({
      'title': request.url,
      'url': request.url
    })
    sendResponse({status: "ok"});
  }
);
