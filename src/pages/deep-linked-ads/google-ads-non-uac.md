!!! info "<img src="../../../img/pages/deep-linked-ads/google/google-ads-logo.png" width="50"/> Google Ads Resources"
		- [Google Ads Overview](/pages/deep-linked-ads/google-ads-overview.md)
		- [Enabling the Integration](/pages/deep-linked-ads/google-ads-enable.md)
		- [Universal App Campaigns (UAC)](/pages/deep-linked-ads/google-ads-uac.md)
		- **Web-based Ads** (this page)
		- [Troubleshooting & FAQs](/pages/deep-linked-ads/google-ads-troubleshooting.md)  

!!! warning "**Enabling Required**"
		Before you can leverage our integration with Google Ads, you must **[Enable the Google Ads integration](/pages/deep-linked-ads/google-ads-enable.md)** in your Branch dashboard.

Whereas Universal App Campaigns are focused solely on the single conversion type of app download, you can leverage other Google Ads campaign types - **Search, Display, Shopping, Video Ads** - to expand your marketing efforts that enable both app and web conversions.

## Parallel Tracking Specifics for Web-based Ads

While parallel tracking does not impact UAC campaigns as your Final URL must be an app store URL, it does impact all other campaign types which do allow you to use other destinations as conversions can occur in web-based settings, not just the app store.

To ensure your desired routing functionality via Branch links is not impacted by parallel tracking in web-based settings, Branch has two solutions depending on your preferences and technical setup.

Once you've [enabled the Google Ads integration](/pages/deep-linked-ads/google-ads-overview/#enabling-the-integration) and completed the [Basic Integration Prerequisites](#basic-integration-prerequisites), please complete either:

- [Prerequisites for Non-UAC (Web Routing Only)](#prerequisites-for-non-uac-web-routing-only)
- [Recommended for Non-UAC (Web + App Routing)](#recommended-for-non-uac-web-app-routing)

![image](/img/pages/deep-linked-ads/google/google-ads-non-uac.png)

## Requirements & Recommendations

### Basic Integration Prerequisites
* [x] Branch SDK integrated into your app.
* [x] Collect the IDFA on iOS, or the AAID on Android. For specifics, refer to the set up guide for [iOS](/pages/apps/ios/#install-branch) and [Android](/pages/apps/android/#install-branch) respectively.
* [x] Track all necessary events through the SDKs, with instructions [here](#forwarding-events-to-google-ads).
* [x] Have admin access to your Google Ads account; required for generating Link IDs in Google Ads.

### Prerequisites for Non-UAC (Web Routing Only)

!!! info "For Search, Display, Shopping and Video Campaigns"
	If you are running non-UACs and want to leverage the power of Branch's web routing capabilities **(desktop and mobile web) via Branch links**, please make sure you also complete the following.

* [x] [Branch Web SDK v2.48.0+](/pages/web/integrate/)

### Recommended for Non-UAC (Web + App Routing)

!!! info "For Search, Display, Shopping and Video Campaigns"
	If you are running non-UACs and want to leverage the full power of Branch's routing capabilities **(deep linking into apps, desktop/mobile web) via Branch links**, please make sure you also complete the following.

* [x] [Branch Web SDK v2.48.0+](/pages/web/integrate/)
* [x] [App links (Android)](/pages/deep-linking/android-app-links/) and/or [Universal Links (iOS)](/pages/deep-linking/universal-links/) implemented.


## Setup

### Create a Branch Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s `Create Google Ads Link` button under the Google Ads Partner and select `Create Search/Display Link` depending on the type of Google Ads campaign you are running.
<img src="/img/pages/deep-linked-ads/reusable-images/create-link-display.png" alt="Link Creation" class="three-quarters center">
1. Under the Define Section, pick a Link Name for later reference
1. Configure the link with the Ad Format set to **Search** or **Display** and the Ad Partner set to **Google Ads**.
![Create Ad Link](/img/pages/deep-linked-ads/google-xplatform-display-ads/link-setup.png)
1. Under the Configure Options tab, navigate to the Redirects sub section and ensure that the Web redirect is set to the desired final website promoted by the ad campaign.
![Create Ad Link](/img/pages/deep-linked-ads/reusable-images/example-link-redirect.png)
1. Under the Analytics Tags sub section additional tags can be set. It is recommended to fill in these fields as they can be used as filters in Branch's Ads Analytics view. To best connect your ad link with your Adwords Campaign, set the channel field to Google Adwords and set the campaign field to the same ad campaign name used in Adwords.
![Analytics Tags](/img/pages/deep-linked-ads/reusable-images/adwords-analytics-tags.png)

!!! note "Optional: Deep Link Data"
	You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing](/pages/deep-linking/routing/) page to learn more.

!!! tip "Setting Attribution Windows"
	You can specify the attribution windows for your links either at an overall account or per link level. Use these windows to accurately measure attribution data for your Branch links. Refer to [Changing attribution windows](/pages/deep-linked-ads/branch-universal-ads/#change-attribution-windows) for instructions.

### Create Your Campaign

Please follow Google Ads help documentation on how to create a new [Google Ads campaign](https://support.google.com/google-ads/answer/6324971?co=ADWORDS.IsAWNCustomer%3Dtrue&oco=0).

For additional information on Google Ads campaigns, please see [Create ads and campaigns](https://support.google.com/google-ads/topic/3119116?hl=en&ref_topic=311907).

### Modifying your Final URL to Include Your Branch Link as a Query Parameter

!!! note ""
	Because the **Final URL** for your campaigns must match your display URL and not contain any cross-domain redirects, you cannot put a Branch link directly in that box. However, you can append query parameters to the Final URL in order to pass the required data needed for Branch to route and attribute your users properly.

1. Copy your Branch Ad Link from the last section and ensure the copied link has the appropriate additional params (~campaign_id, ~ad_set_id, lpurl, etc.) which should be automatically generated on your Branch dashboard.
1. URL encode the Branch Ad Link you just created and copied.
1. Append `&branchify_url=URL ENDCODED BRANCH LINK` to your Final URL.

{! ingredients/deep-linked-ads/view-ad-link-data.md !}

## Search Ads Specifics

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Search Network | Standard | Cross-platform Search
Search Network | Dynamic Search Ads | Cross-platform Search

### OS Support and Major Differences

Operating System | Supported by Google Ads Search Network Ads?
--- | ---
Web | Yes
iOS | Yes
Android | Yes

{! ingredients/deep-linked-ads/link-to-google-ads-overview.md !}

## Display Ads Specifics

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Display Network | Build Awareness: See your ad | Cross-platform Display
Display Network | Influence Consideration: Engage with your content | Cross-platform Display
Display Network | Influence Consideration: Visit your website | Cross-platform Display
Display Network | Drive Action: Buy on your website | Cross-platform Display
Display Network | Drive Action: Take an action on your website | Cross-platform Display

### OS Support and Major Differences

Operating System | Supported by Google Ads Display Network Ads?
--- | ---
Web | Yes
iOS | Yes
Android | Yes

{! ingredients/deep-linked-ads/link-to-google-ads-overview.md !}


## Shopping Ads Specifics

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Shopping | Web and App Purchases | Cross Platform

### OS Support and Major Differences

Operating System | Supported by Google Ads Shopping Ads?
--- | ---
iOS | Yes
Android | Yes
Web | Yes

{! ingredients/deep-linked-ads/link-to-google-ads-overview.md !}

### Using Your Feed

!!! warning "Prerequisites"
	* [x] Be sure you have both a Google Adwords account, and a Google Merchant Center account, and that the two accounts are linked.

#### Uploading to Google Merchant Center

1. In Google Merchant Center, navigate to `Products` then `Feeds`.
<img src="/img/pages/deep-linked-ads/google-xplatform-shopping-ads/google-merchant-center-home.png" alt="Merchant Center Home" class="three-quarters center">
1. Click the large blue plus button to add a new feed.
1. Follow the prompts to name your feed, select feed language, and upload or connect your feed.
1. Once your feed has been created, Merchant Center will take a few minutes to process it. Once that has finished, you're feed is ready to be used in your Adwords campaigns.

#### Using your Merchant Center Feed in Adwords

1. In your Adwords dashboard, navigate to the All Campaigns page.
<img src="/img/pages/deep-linked-ads/google-xplatform-shopping-ads/google-adwords-campaign-view.png" alt="AdWords Campaign View" class="three-quarters center">
1. Click the red campaign button, and create a new Shopping Campaign.
1. On the Shopping Ads Setup page, make sure the correct Merchant Identifier is selected (this should match the value in your Merchant Center Dashboard).
<img src="/img/pages/deep-linked-ads/google-xplatform-shopping-ads/google-adwords-merchant-identifier.png" alt="AdWords Merchant Identifier" class="three-quarters center">
1. Complete the ad configuration and name your ad group.
1. You should see your new Campaign and Ad Group.

Adwords will automatically pull products from your Primary Feeds defined in Google Merchant Center for these Shopping campaigns.

## Video Ads Specifics

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Video | Standard - Instream | Cross-platform Search
Video | Standard - Bumper | Cross-platform Search
Video | Mobile App Install - Instream | App Only: Install

### OS Support and Major Differences

Operating System | Supported by Adwords Video Ads?
--- | ---
Web | Yes
iOS | Yes
Android | Yes  

{! ingredients/deep-linked-ads/link-to-google-ads-overview.md !}
