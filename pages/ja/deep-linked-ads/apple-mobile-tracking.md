## Overview

![Apple Search Ads](/_assets/img/pages/deep-linked-ads/apple-search/search-ads-reduced-logo.png)

Branch can help track your **[Apple Search Ads](https://searchads.apple.com/)** campaigns by fetching the Apple Search Ads Attribution API.  You can then use the parameters you've set in the Apple Search Ads dashboard, parameters such as the campaign name, and take special action in your app after an install, or simply track the effectiveness of a campaign in the Branch dashboard, along with other your other Branch statistics, such as total installs, referrals, and app link statistics.

+ [Apple Search Ads](https://searchads.apple.com/)
+ [Apple Search Ads WWDC](https://developer.apple.com/videos/play/wwdc2016/302/)

## Setup

In order to check if the user came from an Apple Search Ads, you must make the attribution call before Branch initializes. As a warning, Apple's Search Ads Attribution API may take more than 1 second round trip. This means that your call to Branch's initSession to the execution of the callback block may be delayed by this additional 1 second.

### Import iAd and AdSupport

You must add Apple's **iAd.framework** and **AdSupport.framework** to your **Linked Frameworks** in your Xcode project to enable Apple Search Ads checking.

![image](/_assets/img/pages/apps/ios-frameworks.png)

#### Enable Apple Search Ads Check

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

#### Apple Search Ads Debug

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

## Cost Data Setup

1. Navigate to the [Apple Search Ads UI > Settings > API](https://app.searchads.apple.com/cm/app/settings/apicertificates). *Verify you have selected the correct account by using the account selector in the top right hand corner.*

    ![image](/_assets/img/pages/deep-linked-ads/apple-search/apple-api-screen.png)

1. Create an API certificate

    ![image](/_assets/img/pages/deep-linked-ads/apple-search/apple-search-api.png)

1. Download the API certificate to your computer. You'll unzip the folder and get one `.key` and one `.pem` file.

    ![image](/_assets/img/pages/deep-linked-ads/apple-search/apple-download-certs.png)

1. Navigate to the [Apple Search Ads partner manager](https://dashboard.branch.io/ads/partner-management/a_apple?tab=settings) in the Branch dashboard.
1. Upload the certificates there, selecting each file, and then clicking the blue upload arrow to upload the files. Click *Next* to continue.

    ![image](/_assets/img/pages/deep-linked-ads/apple-search/apple-upload-certs.png)

1. Select the organizations for which you would like to ingest data and click *Save* to enable Apple Search Ads with Cost Data.

{! ingredients/deep-linked-ads/cost-data.md !}

### Cost Data Support

#### "Next" button not clickable

Please ensure you've both selected the correct files *and* pressed the blue upload arrows to complete your upload.

#### Cost, click and impression data not appearing

Verify that you have selected the right certificates:

- *Did you create the certificate for the right accounts?* You can toggle the accounts that you are viewing in the top right hand side of the Apple Search Ads UI.
- *Does your certificate have relevant permissions?* Your certificate must have read-only permissions or higher to retrieve Apple Search Ads data.

Still not working? Try downloading a new certificate and uploading that to Branch.

{! ingredients/deep-linked-ads/cost-data-discrepancies.md !}

{! ingredients/deep-linked-ads/add-agency-prefix-san-only.md !}

## Apple Search Ads Data Mapped to Branch

Branch receives and maps the following parameters from the Apple Search Ads Attribution API:

| Apple Search Ads Parameter | Branch Mapped Field                           |
|----------------------------|-----------------------------------------------|
| iad-campaign-name          | last_attributed_touch_data_tilde_campaign     |
| iad-campaign-id            | last_attributed_touch_data_tilde_campaign_id  |
| iad-adgroup-name           | last_attributed_touch_data_tilde_ad_set_name  |
| iad-adgroup-id             | last_attributed_touch_data_tilde_ad_set_id    |
| iad-keyword                | last_attributed_touch_data_tilde_keyword_text |

## View Attribution on Dashboard

All the attribution can be visible on the [Branch dashboard summary page](https://dashboard.branch.io/). All installs and opens registered from this channel will automatically be tagged with the `channel`: `Apple App Store` and the `Ad Partner`: `Apple Search Ads`. The `campaign` will be set to the Campaign Name you've configured in the Apple Search Ads dashboard.

- Installs might not be accurate, but installs + open events should match what Apple Search Ads reports.
- Due to API limitations, it may take up to 30 days for full attribution of a device.

Note that these stats are **limited to the date range** at the top of the page. You can expand the range if you'd like.

### Change attribution windows

Attribution windows can be specified at the global account level or on a per link basis with the link level window taking priority. See the below instructions for setup.

#### Account Level Attribution Windows

You can edit your attribution windows under Link Settings > Attribution Windows.

   ![image](/_assets/img/pages/dashboard/people-based-attribution/attribution-windows.png)

Learn more about account level attribution windows in [People-Based Attribution](/dashboard/people-based-attribution/#attribution-windows).

#### Ad Network Attribution Windows

You can edit your attribution windows at the ad network level, if your ad network requires it. This is recommended when you enable networks like Apple Search Ads, Facebook and Google, who may have different windows for installs. With this, you can preserve your Account Level Attribution Windows, as well.

   ![image](/_assets/img/pages/deep-linked-ads/branch-universal-ads/anaw_clear.png)

## Integration Support

### Install discrepancies when compared with Apple Search Ads dashboard

There are a few possible causes of discrepancies with Apple Search Ads. Due to the low customizability of Apple Search Ads' attribution settings, discrepancies are often higher on Apple Search Ads than other platforms, even though performance may be solid and reporting may be working as expected. The best way to attempt reconciliation with ASA installs and Branch is to look at 'New Download' counts, but subtract the percentage of LAT on users found by grouping LAT on/off in reporting. This will give an estimate of new downloads with LAT off, while Branch reports first opens from those downloads. 

- *Time zones.* Ensure your Apple Search Ads time zone (in Settings > Overview > Account Information ) matches your Branch Dashboard time zone (visible under Account Settings).
- *Limit Ad Tracking (LAT) On.* Apple Search Ads doesn't report installs to third parties if the user has Limit Ad Tracking enabled. However the Apple Search Ads dashboard shows all installs by default, regardless of limit ad tracking state. You can see the approximate quantity of Limit Ad Tracking On and Limit Ad Tracking off installs by adding those columns in the Apple Search Ads Reporting Dashboard. Those installs will not appear in Branch's dashboard.
- *Attribution Windows.* Apple Search Ads attributes all installs within 30 days of an Apple Search Ads click to itself. Branch's default click to install attribution window is 7 days. You can modify Branch's click to install window. You can modify your [Apple Search Ads attribution windows](#change-attribution-windows) in Branch.
- *Last-click attribution.* Apple Search Ads attributes all installs within 30 days of an Apple Search Ads click to itself. Branch will attribute to the last click within its attribution windows, which can often be a different source than Apple Search Ads.
- *Reinstalls.* Apple Search Ads' dashboard shows reinstalls as conversions in its default view, but Branch calls these installs "REINSTALLS." In the Apple dashboard, select New Downloads or Redownloads in the column selector to align data.
- *Attribution API timeouts or delays.* Apple Search Ads Attribution API can be slow to respond. Although customers can edit the timeout, the default Branch timeout in the code above is just over 1 second. If Apple Search Ads responds after this timeout, Branch will not attribute the install to Apple Search Ads.
- *Opens vs. installs.* Branch considers the first open to be the install. Apple Search Ads considers the time that the user downloaded the app to be an install. This can cause discrepancies in counts and date of install.

### Adding deep linking to Apple Search Ads

Since this integration doesn't utilize Branch links, options for deep linking are limited. We'll pass back the value you use for `campaign` in the Apple Search Ads dashboard. Since this value is controlled by you, you can put anything there, but it will reflect on the Apple Search Ads dashboard. We will track installs regularly.

### Installs or conversion events appearing without keywords in Branch dashboard

There are "Keyword" and "Search Match" match sources for Apple Search Ads. The Search Match feature automatically matches your ad to relevant user searches on the App Store, rather than a rubric of preassigned keywords. Installs attributed to Search Matches do not have keywords associated with them. Search Match can be enabled & disabled at the Ad Group level in the Apple Search Ads dashboard.
