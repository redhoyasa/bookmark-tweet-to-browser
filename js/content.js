const TWEET_XPATH = "section > div > div > div > div article > div";
const REACTION_GROUP_XPATH = "> div:last-child > div:last-child > div:last-child";
const TWEET_INFO_XPATH = "> div:last-child > div:last-child > div:first-child > div:first-child > a";

const STAR_THIN_CLASSES = "BookmarkButton";
const STAR_FILLED_CLASSES = "jeje aw";

const STAR_THIN_ICON = `<svg class="${STAR_THIN_CLASSES}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/></svg>`;
const STAR_FILLED_ICON = `<svg class="${STAR_FILLED_CLASSES}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>`;


$(document).arrive(TWEET_XPATH, function(tweet) {
  generateBookmarkButton(tweet);
});

function generateBookmarkButton(tweet) {
  let id = Math.random().toString(36).substring(7);

  // get reaction section of tweet
  let tweetUrl = $(tweet).find(TWEET_INFO_XPATH)[0].href;
  let lastReaction = $(tweet).find(REACTION_GROUP_XPATH).children().last();

  chrome.runtime.sendMessage({type: "get", url: tweetUrl}, function(response) {
    console.log(response);
  });

  let htmlContent = `
    <div id="bookmarkButton-${id}" data-permalink-path="${tweetUrl}">
      <div class="BookmarkButtonContainer" type="button">
        ${STAR_THIN_ICON}
      </div>
    </div>
  `

  // append button
  $(htmlContent).insertBefore(lastReaction);

  // bind click event
  $(tweet).on("click", `#bookmarkButton-${id}`, function(event){
    event.preventDefault();

    chrome.runtime.sendMessage({type: "create", url: tweetUrl}, function(response) {
      console.log(response.status);
    });
  });
}
