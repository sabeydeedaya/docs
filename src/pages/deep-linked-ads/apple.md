## Overview

Branch can help track your Apple Search Ad campaigns by fetching the search ad attribution from Apple at app install.  You can then use the parameters you've set in the Apple Search Ad dashboard, parameters such as the campaign name, and take special action in you app after an install, or simply track the effectiveness of a campaign in the Branch dashboard, along with other your other Branch statistics, such as total installs, referrals, and app link statistics.

+ [Apple Search Ads](https://searchads.apple.com/)
+ [Apple Search Ads for Developers](https://developer.apple.com/app-store/search-ads/)
+ [Apple Search Ads WWDC](https://developer.apple.com/videos/play/wwdc2016/302/)

## Setup

In order to check if the user came from an Apple Search Ad, you must make the attribution call before Branch initializes. As a warning, Apple's API is extremely slow often taking more than 1 second round trip. This means that your call to Branch's initSession to the execution of the callback block will be delayed by this additional 1 second.

## Import iAd and AdSupport

You must add Apple's **iAd.framework** and **AdSupport.framework** to your **Linked Frameworks** in your Xcode project to enable Apple Search Ad checking.

![image](/img/pages/apps/ios-frameworks.png)

### Enable Apple Search Ads Check

To enable this check, add a `delayInitToCheckForSearchAds` call to your **AppDelegate.m** (or **AppDelegate.swift**) file after you create the Branch singleton, but *before* you call `initSession`. Your code will end up looking something like this:

```obj-c
Branch *branch = [Branch getInstance];
[branch delayInitToCheckForSearchAds];
[branch initSession.....
```

```swift
let branch: Branch = Branch.getInstance()
branch.delayInitToCheckForSearchAds()
branch.initSession.....
```

If you're concerned about the additional 1 second latency, the call to `delayInitToCheckForSearchAds` can be called conditionally at run time. So, if you want to only check on first install, or the like, then just don't call this method.

### Apple Search Ads Debug

We've also added a debug mode which will demonstrate the functionality. You can enable it like so, but just remember to remove this before release!

```obj-c
Branch *branch = [Branch getInstance];
[branch setAppleSearchAdsDebugMode];
[branch delayInitToCheckForSearchAds];
[branch initSession.....
```

```swift
let branch: Branch = Branch.getInstance()
branch.setAppleSearchAdsDebugMode()
branch.delayInitToCheckForSearchAds()
branch.initSession.....
```

### View Attribution on Dashboard

All the attribution can be visible on the [Branch dashboard summary page](https://dashboard.branch.io/). All installs and opens registered from this channel will automatically be tagged with the `channel`: `Apple App Store` and the `Ad Partner`: `Apple Search Ads`. The `campaign` will be set to the Campaign Name you've configured in the Apple Search Ads dashboard.

- Installs might not be accurate, but installs + open events should match what Apple reports
- Due to API limitations, it may take up to 30 days for full attribution of a device

Note that these stats are **limited to the date range** at the top of the page. You can expand the range if you'd like.

## Support

### Adding deep linking to Apple Search Ads

Since this integration doesn't utilize Branch links, options for deep linking are limited. We'll pass back the value you use for `campaign` in the Apple Ads dashboard. Since this value is controlled by you, you can put anything there, but it will reflect on the Apple ads dashboard. We will track installs regularly.

### No Keywords appearing in Branch Dashboard

There are "keyword matches" and "search matches" for Apple Search Ads.  Search Matches are where Apple decides to show an ad to a user based on your app store listing, rather than a rubric of preassigned keywords.  This ad delivery type can be enabled & disabled in the Apple Search Ads dashboard, but will never relay any keyword data.
