---
title: Google Search App Engagement Ads
description: A guide to using Branch in Adwords Search Network App Engagement Campaigns.
path: tree/master/src/pages/deep-linked-ads
source: google-search-engagement-ads.md
---
# Google Search App Engagement Ads

## Overview

If you're running Google AdWords Search Mobile Engagement Campaigns, you'll find everything you need right here.

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Search Network | Mobile App Engagement | App Only: Engagement

#### OS Support and Major Differences

Operating System | Supported by AdWords Search Engagement Ads? | Key differences | Documentation
--- | --- | --- | ---
iOS | No | Google's Search Mobile Engagement Campaign type is not available in iOS | [link](https://support.google.com/adwords/answer/6167172?hl=en)
Android | Yes | Uses Final URL with ValueTrack Parameters, no tracking template |  [link](/pages/deep-linked-ads/google-search-engagement-ads/#android)

{! ingredients/deep-linked-ads/link-to-google-ads-overview.md !}

## Setup

!!! warning "Prerequisites"
	* [x] To track installs from Google Ads you should [integrate the Branch SDK](/pages/apps/android/#integrate-branch) into your app.
	* [x] If you want to deep link from your ads directly to content, you should [configure deep link routing](/pages/deep-linking/routing/).
	* [x] Ensure you have entered your Android application's URI scheme under `Link Settings > Android URI Scheme` in your Branch dashboard.
	* [x] Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality.

### Android

#### Create an Ad Link

- Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management){:target="\_blank"}'s `Create Google Adwords Link` button under the Google Adwords Partner and select `App Install or Engagement`

![image](/img/pages/deep-linked-ads/reusable-images/create-link-install-engagement.png)

- Under the Define Section, pick a Link Name for later reference

- Configure the link with the Ad Format set to **App Only**, the Ad Partner set to **Google Adwords**, and the Secondary Ad Format set to **Google Search App Engagement Android**.

![Create Ad Link](/img/pages/deep-linked-ads/google-search-engagement-ads/android/ad-link-setup.png)

- Under the Analytics Tags sub section additional tags can be set. It is recommended to fill in these fields as they can be used as filters in Branch's Ads Analytics view. To best connect your ad link with your Adwords Campaign, set the channel field to Google Adwords and set the campaign field to the same ad campaign name used in Adwords.

![Analytics Tags](/img/pages/deep-linked-ads/reusable-images/adwords-analytics-tags.png)

!!! tip "Setting Attribution Windows"
	You can specify the attribution windows for your links either at an overall account or per link level. Use these windows to accurately measure attribution data for your Branch links. Refer to [Changing attribution windows](/pages/deep-linked-ads/branch-universal-ads/#change-attribution-windows) for instructions.

#### Configure an Ad

To set up a Search Network Mobile App Engagement Campaign on Android, you will need to first create your campaign and then setup a tracking template on the ad. Adwords campaign creation documentation is available **[here](https://support.google.com/adwords/answer/6310671?hl=en){:target="_blank"}**.

#### Create Your Campaign

- Select `Search Network only` on Adwords

![image](/img/pages/deep-linked-ads/reusable-images/adwords-search-network.png)

- For the type of Search campaign select `Mobile app engagement`

![Adwords Setup](/img/pages/deep-linked-ads/google-search-engagement-ads/adwords-search-engagement.png)

- Continue setting the campaign and ad group parameters

#### Ad Creation

- Copy the Branch Ad link from the first section and ensure that it is in the format _App URI://open?link_click_id=link-..._. Refer to the [Create A Branch Ad Link](#create-an-ad-link) section if the link is not in this format to ensure the link creation was setup properly.

![Example Link](/img/pages/deep-linked-ads/google-search-engagement-ads/android/full-branch-link.png)

- In the Ad creator, locate the **Scheme** field and enter the scheme portion of the Branch Ad link. This should be the portion of the link before the **://** symbol.

- Now locate the **Host and path** field and enter the rest of your Branch Ad link following the **://** symbol.

![Example Ad](/img/pages/deep-linked-ads/google-search-engagement-ads/android/adwords-configuration.png)

{! ingredients/deep-linked-ads/view-ad-link-data.md !}

## Troubleshooting

#### FAQ / Debugging

**Q: Why is my advertisement being disapproved on Adwords?**

**A:** For App Install/Engagement Campaigns, sometimes your ad may be disapproved if the Branch link does not re-direct to Google Play or App Store when clicked on a desktop. Please ensure that for the Branch link you're using to track installs, Deepviews are disabled and a desktop redirect is set to either the App / Play store.

**Q: Can I run a Adwords Search Network Mobile Engagement Campaign for iOS?**

**A:** As of June 2017, Google Adwords currently does not support this campaign type. We'll update our documentation if the campaign type gets supported in the future!

**Q: How can I test the Branch Ad link?**

**A:** On the Adwords Ad creator page or the when editing your ad, locate and click the `Test this app URI` button. With an Android phone that has your mobile app installed, use a QR code reader application to read the generated QR code to simulate a click on your Ad. Now you can verify that your Branch Ad link works and deep linked data is passed through to the app.

![image](/img/pages/deep-linked-ads/google-search-engagement-ads/android/debug-uri.png)
