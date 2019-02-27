!!! info "<img src="../../../img/pages/deep-linked-ads/google/google-ads-logo.png" width="50"/> Google Ads Resources"
		- **Google Ads Overview (this page)**
		- [Enabling the Integration](/pages/deep-linked-ads/google-ads-enable.md)
		- [Universal App Campaigns (UAC)](/pages/deep-linked-ads/google-ads-uac.md)
		- [Web-based Ads (non-UAC)](/pages/deep-linked-ads/google-ads-non-uac.md)
		- [Troubleshooting & FAQs](/pages/deep-linked-ads/google-ads-troubleshooting.md)  

##Google Ads + Branch Use Cases

With Branch, you can integrate with **[Google Ads](https://ads.google.com/home/)**, improving conversion rates and letting you measure the impact of your campaigns right on the Branch dashboard.

![image](/img/pages/deep-linked-ads/google/branch-google-ads.png)

## Google Ads Campaign Support

!!! warning "**Enabling Required**"
		Before you can leverage our integration with Google Ads, you must **[Enable the Google Ads integration](/pages/deep-linked-ads/google-ads-enable.md)** in your Branch dashboard.

Our integration with Google Ads supports the following:

### [Universal App Campaigns (UAC)](/pages/deep-linked-ads/google-ads-uac.md)
- Full attribution for:
	- App Installs only
- No 3rd Party Links
- No Deep Linking
- Destinations:
	- App Stores only

### [Web-based Ads (non-UAC)](/pages/deep-linked-ads/google-ads-non-uac.md)
- Includes **Search**, **Display**, **Shopping** and **Video Ads** Campaign types
- Full attribution for:
	- App conversions (opens & in-app events)
	- Web (Mobile & Desktop) conversions
- Deep Linking via Branch Links
- Destinations:
	- Web (Mobile & Desktop) Only
		- Requires the [Branch Web SDK](/pages/web/integrate.md)
	- App (if installed)
		- Requires [Universal Links](/pages/deep-linking/universal-links/) and/or [App Links](/pages/deep-linking/android-app-links/)

## Data Mapping between Google Ads & Branch

Branch maps the following data fields from Google Ads to Branch.

Google Data | Branch Data | Definition | Possible Values
--- | --- | --- | ---
campaign_id | ~campaign_id | The numeric campaign ID of the campaign that produced the ad event. This value is guaranteed unique. | Google Ads Campaign ID
campaign_name | ~campaign  | The advertiser-defined campaign name of the campaign that produced the ad event. This value is not guaranteed unique. | Google Ads Campaign Name
ad_type | ~ad_format | The type of ad that resulted in the ad event. This value can be used to distinguish between various types of inventory as follows. | ClickToDownload<br/>AppDeepLink<br/>AppDeepLinkContinue<br/> Unknown
network_type | ~channel | This field will identify the Google Ads advertising network the ad event occurred on. | Search<br/>Display<br/>YouTube
network_subtype | ~secondary_publisher | This field will identify the “subtype” of the Google Ads advertising network the ad event occurred on. The possible values vary by primary network type. | Google Search, Search Partners, mGDN, Google AdMob, YouTubeVideos, YouTubeSearch, VideoPartners; `null` when campaign_type is UAC and network_type is Display.

## Forwarding Events to Google Ads

Once you begin tracking events through the Branch SDK, you can select which events to import in Google Ads. Google Ads has pre-defined events that map to pre-defined Branch events, listed below. Reference this [doc](https://developers.google.com/app-conversion-tracking/api/) for more information.

Regardless of campaign type, Branch will forward in-app events to Google Ads for campaign optimization. In addition, Branch will receive attribution data for rich analysis in the Branch dashboard.

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

{! ingredients/deep-linked-ads/cost-data.md !}
