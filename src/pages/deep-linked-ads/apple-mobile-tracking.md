## Overview

![Apple_Search_Ads](https://cdn.branch.io/branch-assets/ad-partner-manager/388787843096400122/search_ads-1528501330030.png)

Branch can help track your **[Apple Search Ad](https://searchads.apple.com/)** campaigns by fetching the search ad attribution from Apple at app install.  You can then use the parameters you've set in the Apple Search Ad dashboard, parameters such as the campaign name, and take special action in you app after an install, or simply track the effectiveness of a campaign in the Branch dashboard, along with other your other Branch statistics, such as total installs, referrals, and app link statistics.

+ [Apple Search Ads](https://searchads.apple.com/)
+ [Apple Search Ads for Developers](https://developer.apple.com/app-store/search-ads/)
+ [Apple Search Ads WWDC](https://developer.apple.com/videos/play/wwdc2016/302/)

## Setup

In order to check if the user came from an Apple Search Ad, you must make the attribution call before Branch initializes. As a warning, Apple's API is extremely slow, often taking more than 1 second round trip. This means that your call to Branch's initSession to the execution of the callback block may be delayed by this additional 1 second.

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

### Change attribution windows

Attribution windows can be specified at the global account level or on a per link basis with the link level window taking priority. See the below instructions for setup.

#### Account Level Attribution Windows

You can edit your attribution windows under Link Settings > Attribution Windows.

   ![image](/img/pages/dashboard/people-based-attribution/attribution-windows.png)

Learn more about account level attribution windows in [People-Based Attribution](/pages/dashboard/people-based-attribution/#attribution-windows).

#### Ad Network Attribution Windows

You can edit your attribution windows at the ad network level, if your ad network requires it. This is recommended when you enable networks like Apple, Facebook and Google, who may have different windows for installs. With this, you can preserve your Account Level Attribution Windows, as well.

   ![image](/img/pages/deep-linked-ads/branch-universal-ads/anaw_clear.png)

## Support

### Install discrepancies when compared with Apple Search Ads dashboard

There are a few possible causes of discrepancies with Apple Search Ads. Due to the low customizability of Apple Search Ads' attribution settings, discrepancies are often higher on Apple Search Ads than other platforms, even though performance may be solid and reporting may be working as expected.

- *Time zones.* Ensure your Apple Search Ads time zone (in Settings > Overview > Account Information ) matches your Branch Dashboard time zone (visible under Account Settings).
- *Limit Ad Tracking (LAT) On.* Apple doesn't report installs to third parties if the user has Limit Ad Tracking enabled. However the Apple Search Ads dashboard shows all installs, regardless of limit ad tracking state. You can see the approximate quantity of Limit Ad Tracking On installs by adding that column in the Apple Search Ads Reporting API. Those installs will not appear in Branch's dashboard.
- *Attribution Windows.* Apple attributes all installs within 30 days of an Apple Search Ads click to itself. Branch's default click to install attribution window is 7 days. You can modify Branch's click to install window. You can modify your [Apple Search Ads attribution windows](#change-attribution-windows). 
- *Last-click attribution.* Apple attributes all installs within 30 days of an Apple Search Ads click to itself. Branch will attribute to the last click within its attribution windows, which can often be a different source than Apple Search Ads.
- *Reinstalls.* Apple counts reinstalls as conversions, but Branch calls these installs "REINSTALLS."
- *Attribution API timeouts or delays.* Apple's API can be slow to respond. Although customers can edit the timeout, the default Branch timeout in the code above is just over 1 second. If Apple responds after this timeout, Branch will not attribute the install to Apple.
- *Opens vs. installs* Branch considers the first open to be the install. Apple considers the time that the user downloaded the app to be an install. This can cause discrepancies in counts and date of install.

### Adding deep linking to Apple Search Ads

Since this integration doesn't utilize Branch links, options for deep linking are limited. We'll pass back the value you use for `campaign` in the Apple Ads dashboard. Since this value is controlled by you, you can put anything there, but it will reflect on the Apple ads dashboard. We will track installs regularly.

### Installs or conversion events appearing without keywords in Branch dashboard

There are "Keyword" and "Search Match" match sources for Apple Search Ads. Search Matches are where Apple decides to show an ad to a user based on your app store listing, rather than a rubric of preassigned keywords. Installs attributed to Search Matches do not have keywords associated with them. Search Match can be enabled & disabled at the Ad Group level in the Apple Search Ads dashboard.
