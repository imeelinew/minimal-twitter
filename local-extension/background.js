// Used by the manifest v3 extension

const forkBootstrapPreferences = {
  extensionStatus: "on",
  timelineWidth: 800,
  timelineBorders: "off",
  tweetBorders: "off",
  stickyHeader: "on",
  writerMode: "off",
  followingTimeline: "off",
  hideViewCount: "on",
  recentMedia: "off",
  trendsHomeTimeline: "off",
  removePromotedPosts: "on",
  removeTopicsToFollow: "on",
  hideTimelineComposer: "off",
  removeTimelineTabs: "off",
  typefullyEnhancementsButtons: "on",
  followCount: "show",
  replyCount: "show",
  retweetCount: "show",
  likeCount: "show",
  sidebarLogo: "off",
  navigationButtonsLabels: "hover",
  navigationCenter: "on",
  navigationHorizontalOffset: 0,
  unreadCountBadge: "off",
  hideGrokDrawer: "on",
  interFont: "on",
  searchBar: "off",
  transparentSearch: "off",
  titleNotifications: "off",
  tweetButton: "off",
  homeButton: "on",
  exploreButton: "on",
  notificationsButton: "off",
  messagesButton: "off",
  grokButton: "off",
  xPremiumButton: "off",
  listsButton: "off",
  bookmarksButton: "on",
  jobsButton: "off",
  accountSwitcherButton: "off",
  communitiesButton: "off",
  articles: "off",
  topicsButton: "off",
  verifiedOrgsButton: "off",
  typefullyGrowTab: "off",
  profileButton: "off",
  customCss: "",
};

const seedForkSettingsIfNeeded = () => {
  chrome.storage.local.get(null, (items) => {
    if (chrome.runtime.lastError) {
      console.error("Failed to read extension storage", chrome.runtime.lastError);
      return;
    }

    if (Object.keys(items).length > 0) {
      return;
    }

    chrome.storage.local.set(forkBootstrapPreferences, () => {
      if (chrome.runtime.lastError) {
        console.error(
          "Failed to seed fork bootstrap preferences",
          chrome.runtime.lastError
        );
      }
    });
  });
};

seedForkSettingsIfNeeded();

chrome.runtime.onInstalled.addListener((object) => {
  seedForkSettingsIfNeeded();

  if (object.reason !== "install") {
    return;
  }

  const targetUrl = `https://typefully.com/minimal-twitter/welcome`;

  if (targetUrl) {
    chrome.tabs.create({
      url: targetUrl,
    });

    // Reload any open Twitter/X tabs
    chrome.tabs.query({ url: "*://twitter.com/*" }, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.reload(tab.id);
      });
    });
    chrome.tabs.query({ url: "*://x.com/*" }, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.reload(tab.id);
      });
    });
  }
});
