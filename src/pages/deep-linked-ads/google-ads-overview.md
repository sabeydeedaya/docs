---
title: Google Adwords Overview
description: An overview page of using Branch in your Google Adwords campaigns.
path: tree/master/src/pages/deep-linked-ads
source: google-ads-overview.md
---
# Google Adwords Overview

## Overview

![Google_Adwords](https://cdn.branch.io/branch-assets/ad-partner-manager/386574786681131050/adwords-1528518485386.png)

With Branch, you can integrate with **[AdWords](https://adwords.google.com/)**, improving conversion rates and letting you measure the impact of your campaigns right on the Branch dahsboard.

This document covers the new AdWords experience. If you are using the old experience, be sure to switch to the new experience.

Once you have completed set up below, you will be able to track Universal App Campaigns and forward events to AdWords for optimization. You will also be able to create links for non Universal App Install campaigns on AdWords.

In all cases, Branch will forward in-app events to AdWords for campaign optimization. In addition, Branch will receive attribution data for rich analysis in the Branch dashboard.

## Setup

Before you begin, be sure the following is confirmed.

1. First, the Branch SDK must be integrated into your app, for both iOS and Android. 
1. You must also collect the IDFA on iOS, or the AAID on Android. For specifics, refer to the set up guide for [iOS](/pages/apps/ios/#install-branch) and [Android](/pages/apps/android/#install-branch) respectively.
1. Make sure to track all necessary events through the SDKs, with instructions [here](#forward-events-to-adwords)

You must also have admin access to your AdWords account. You will generate Link IDs in AdWords.

### OAuth

The first step is connecting Branch & AdWords together. By connecting these accounts, Branch will have read-only access to import click and impression data at the aggregate level. This will also let Branch track metrics across your different AdWords accounts, which means your manager (MCC) and children accounts.

It is not necessary to connect all AdWords accounts. However, you must connect the AdWords account that owns in-app conversions for your mobile app. Often, this is the MCC account.

#### OAuth AdWords Setup

1. Log in to your [AdWords dashboard](https://adwords.google.com/aw/overview){:target="\_blank"} account that has the highest level of access. You will have the ability to connect all your AdWords accounts with Branch.
1. Go to `Settings > Linked Accounts`.
<img src="/img/pages/deep-linked-ads/google/linked-accounts.png" alt="Linked Accounts" class="three-quarters center">
1. Create a new link ID: Go to `Third Party App Analytics > +`.
1. Add a new provider: Select "other" in the drop down. Input Branch's provider ID: `3404357870`.
1. Select iOS or Android.
1. Create Link IDs for all platforms you run campaigns on.
<img src="/img/pages/deep-linked-ads/google/link-id.png" alt="Link IDs" class="three-quarters center">

**Note** you must be an admin in your AdWords account in order to generate Link IDs!

Store these Link IDs for easy access. The next step requires you to input them.

#### OAuth Branch Setup

Once you're done with AdWords, navigate to the [partner management](https://dashboard.branch.io/ads/partner-management){:target="\_blank"} tab and click `Connect with Google`. Choose the email address that is tied to the AdWords accounts you want to connect.

![Connect Google](/img/pages/deep-linked-ads/google/connect-with-google.png)

Select all the necessary accounts, and continue.

![Connect Accounts](/img/pages/deep-linked-ads/google/connect-accounts.png)

Finally, paste the Link IDs from earlier.

![Create Link IDs](/img/pages/deep-linked-ads/google/link-ids.png)

### Set Attribution Windows

After you hit save, go to your [Partner Management dashboard](https://dashboard.branch.io/ads/partner-management/a_google_adwords?tab=attribution_windows){:target="\_blank"}, and navigate to Attribution Windows.

For example, if a user clicked an ad 8 days ago, and Google claims credit, we would *not* count attribution, because our default is 7 days from click. However, it is ultimately up to you which attribution window you would like to use. Below is simply a **recommendation**:

- Click to Install : 30 days
- Click to Conversion Event : 90 days
- Click to Open : 90 days

### Import Events In AdWords

All that remains is importing Branch events into AdWords. After you have set both Branch & AdWords up, wait ~20 minutes, and go back to the AdWords dashboard. You can expedite this process if you open your app and simulate the events you want forwarded. Navigate back to the AdWords dashboard.

1. Go to `Conversions`.
<img src="/img/pages/deep-linked-ads/google/conversions.png" alt="Linked Accounts" class="three-quarters center">
1. Add a new conversion: `+ > App > Third Party App Analytics`.
<img src="/img/pages/deep-linked-ads/google/create-conversion.png" alt="Linked Accounts" class="three-quarters center">
1. Import your Branch specific events. Click `Import and Continue`.

That's it! All of your campaigns with mobile conversions will be tracked in Branch's dashboard. You can now track as many Universal App Campaigns as you want, automatically.

## Migration

You may have onboarded to Branch using the old style of AdWords. If you have ever used conversion IDs, conversion labels, or postback URLs, then this applies to you. Read this section below to learn what has changed, and what steps you may need to take to remove legacy information. Be sure to complete the set up listed above before going through this guide.

### What Changed

While AdWords got a user experience change, it also deprecated the old functionality of conversion IDs and labels. As such, the new AdWords experience does not give you the option to enable conversion events using postback URLs. This means the only way to track AdWords campaigns using the new interface (Universal App Campaigns + search, display, video) is to connect via OAuth, as outlined above.

You can confirm if you are on the new experience if your AdWords user interface looks like the image below:

![new adwords](/img/pages/deep-linked-ads/google/newtype.png)

AdWords also removed the old App Install campaigns, as they have been superceded by Universal App Campaigns. **You can only track app install campaigns in AdWords using Universal App Campaigns**. This includes search, display, and video install ads, rolled into one campaign type.

Google Campaign | Uses Tracking Link | Google Status | Branch Status
--- | --- | --- | ---
Search Install Ads | Yes | Removed | Removed support
Display Install Ads | Yes | Removed | Removed support
Video Install Ads | Yes | Removed | Removed support
Universal App Campaigns | No | Active | Active
Search Ads | Yes | Active | Active
Display Ads | Yes | Active | Active
App Engagement Ads | Yes | Active | Active

As such, tracking links only work in non-app install ads. Universal App Campaigns will not return deep link data when the app is installed and opened. However, if you rely on this data to make it back to your own systems, you can set a webhook up.

### Remove Conversions From Adwords

The first step of migrating from the old AdWords experience to the new is removing conversions events from AdWords. Go to your conversions in AdWords, and find all events created by Branch. If they contain a postback URL, either mark "Include in conversions" as **NO**, or simply remove / delete them. Example below:

![old conversion](/img/pages/deep-linked-ads/google/old-conversion.png)

Your new events will **not** contain a box for Postback URL. They will also contain a field called **Analytics Provider**, which will say Branch. Example below:

![new conversion](/img/pages/deep-linked-ads/google/new-conversion.png)

Once you have removed old conversions from AdWords, you will go to Branch's dashboard.

### Remove Conversions From Branch

There are two places you should remove conversion IDs and labels from. The first is a legacy option that may not be available on your dashboard anymore. If it isn't, then simply ignore that step.

#### Remove From Link Settings

This is a legacy option that may not be on your dashboard. If it isn't, then go to the step below.

Navigate to this section of your [dashboard](https://dashboard.branch.io/link-settings), and remove all entries under *Google Ads Conversions*. Hit save.

#### Remove From Ads Partner Manager

Go to this [section](https://dashboard.branch.io/ads/partner-management/a_google_adwords?tab=legacy) of the Branch dashboard. Remove all fields found here.

Next, click *Postback Config*, and uncheck all the checkboxes. Hit save.

The new integration will automatically forward events without you having to configure postbacks for each. Check [the section](#forward-events-to-adwords) to learn how we do this.

You can safely ignore all links created using the old integration. You're done!

### Benefits

If you're wondering why we're asking you to migrate from the legacy system to the new system, there are a handful of benefits you should know.

First, Branch had limitations using this old method of tracking. Those included being able to track 1 Universal App Campaign per platform, and receiving very limited data in the Branch dashboard.

With the new integration, we can now track all your Universal App Campaigns.

We can also forward data from AdWords' dashboard into Branch. This means campaign name, channels the ad was displayed on, and more are visible in the Branch dashboard.

## Data Mapping

Branch maps the following data fields from AdWords to Branch.

Google Data | Branch Data |
--- | --- |
Campaign ID | ~campaign_id |
Campaign Name | ~campaign  |
ad_type | ~ad_type |
network_type | ~channel
network_subtype | ~secondary_publisher

## Forward Events to AdWords

Once you begin tracking events through the Branch SDK, you can select which events to import in AdWords. AdWords has pre-defined events that map to pre-defined Branch events, listed below. Reference this [doc](https://developers.google.com/app-conversion-tracking/api/) for more information.

Google Event | Branch Event
--- | ---
first_open | install
session_start | open 
in_app_purchase | purchase
view_item_list | view_items
view_item | view_item
view_search_results | search
add_to_cart | add_to_cart
ecommerce_purchase | purchase
custom | any custom event tracked through Branch

In order to track these events, please refer to this document for further [information](/pages/apps/v2event/#v2-event). 

## Other Campaigns

The above guide covered what was necessary to track Universal App Campaigns. If you are looking to track non app-install campaigns, click through below.

Google Campaign | Campaign Type/Objective | Branch Documentation Link | Branch Ad Format
--- | --- | --- | ---
Search Network | Mobile app engagement | **[link](/pages/deep-linked-ads/google-search-engagement-ads/#overview)** | App Only: Engagement
Search Network | Standard  | **[link](/pages/deep-linked-ads/google-xplatform-search-ads/#standard-search-ads)** | Cross-platform Search
Search Network | Dynamic Search Ads  | **[link](/pages/deep-linked-ads/google-xplatform-search-ads/#dynamic-search-ads)** | Cross-platform Search
Display Network | Engage with your mobile app | **[link](/pages/deep-linked-ads/google-display-engagement-ads/#overview)** | App Only: Engagement
Display Network | Others (Visit your website, Influence, etc.)  | **[link](/pages/deep-linked-ads/google-xplatform-display-ads/#overview)** | Cross-platform Display
Video | Standard | **[link](/pages/deep-linked-ads/google-video-ads/#video-standard-ads)** | Cross-platform Display
Shopping | Web and App Purchases | **[link](/pages/deep-linked-ads/google-shopping-ads/#overview)** | Cross-platform Display

## Troubleshooting

### Adwords Campaign Limitations

#### Product Listing Ads (PLA) - Attribution
- Branch's dashboard will attribute app events to PLA campaigns via the click tracking links used in the adwords_redirect field of the product catalog. However, Google's Conversion API currently does not support app attribution data for PLA/Shopping campaigns, so the data in AdWords dashboard may not show app conversions such as installs or app purchases.
- Deep linking is supported

#### App Extensions - Deep Linking through Install
- App Extensions currently do not allow Deep Linking, as the setup only accepts app store links [link](https://support.google.com/adwords/answer/2402582?hl=en)
- Attribution is supported

#### Universal App Campaigns (UAC) - Deep Linking through Install
- Deferred deep linking is currently not possible with UAC, as it does not accept any links
- Attribution is supported

#### Universal App Campaigns (UAC) - Click Reporting
- As links are not accepted into the AdWords UAC UI, we will only report on clicks in aggregate (via Google's reporting API)
- Individual UAC clicks will not appear in Branch's liveview dashboard, webhooks, or exports
- 'Unique' UAC data cannot be viewed on the ads analytics dashboard (Non-UACs, like regular Search campaigns, will report on clicks in all Branch dashboards)
- Reporting on UAC clicks is done every 3 hours
- Branch only reports on clicks from an AdWords campaign that led to an install or app engagement

### FAQ

**Q: I'm getting discrepancy between conversion counts in Branch and Google Adwords**

**A:** While we should always expect around a 5% discrepancy due to time zone differences and the like, if you are seeing significant discrepancies, it could be an indication of a broader problem.

The first thing to do is to make sure your attribution window in Branch lines up with Google. Go to [Link Settings](https://dashboard.branch.io/link-settings), and navigate down to the Attribution Windows section. Here, you should set the attribution window for `click to install`, `click to session start`, and `click to conversion event` to be 30, 90, and 90 days respectively. This aligns with Google's default attribution windows, but if you'd like to make them shorter, feel free.

Another source of discrepancies is the fact that attribution is based upon *click* time in AdWords, whereas it is based upon *install* time in the Branch dashboard. This isn't a discrepancy per se, but will sometimes show different numbers in the two dashboards.

Finally, AdWords can delay reporting up to 24 hours. It's best to measure campaigns in a trailing manner.

**Q: My campaign is reporting a number of conversions much higher than the number of conversions shown in the conversion table in Adwords**

**A:** When viewing a campaign, it shows the sum of all conversion events that apply to it. To view by conversion, navigate to `Segment` > `Conversions` > `Conversion name`, in order to clearly see the breakdown of your campaign's conversions.

<img src="/img/pages/deep-linked-ads/google-conversions/conversion-segment.png" alt="Adwords Conversion Segment" class="center">
