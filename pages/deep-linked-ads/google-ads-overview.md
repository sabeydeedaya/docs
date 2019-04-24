!!! info "<img src="../../../_assets/img/pages/deep-linked-ads/google/google-ads-logo.png" width="50"/> Google Ads Resources"
		- **Google Ads Overview (this page)**
		- [Enabling the Integration](/deep-linked-ads/google-ads-enable/)
		- [App Install Campaigns](/deep-linked-ads/google-ads-uac/)
		- [App Engagement Campaigns](/deep-linked-ads/google-ads-app-engagement/)
		- [Web-based Ads (non-UAC)](/deep-linked-ads/google-ads-non-uac/)
		- [Troubleshooting & FAQs](/deep-linked-ads/google-ads-troubleshooting/)

##Google Ads + Branch Use Cases

With Branch, you can integrate with **[Google Ads](https://ads.google.com/home/)**, improving conversion rates and letting you measure the impact of your campaigns right on the Branch dashboard.

![image](/_assets/img/pages/deep-linked-ads/google/google-ads-branch-overview.png)

## Google Ads Campaign Support

!!! warning "**Enabling Required**"
		Before you can leverage our integration with Google Ads, you must **[Enable the Google Ads integration](/deep-linked-ads/google-ads-enable/)** in your Branch dashboard.

Our integration with Google Ads supports the following:

### [App Install Campaigns](/deep-linked-ads/google-ads-uac/)
- Full attribution for:
	- App Installs
- No 3rd Party Links
- No Deep Linking
- Destinations:
	- App Stores only

### [App Engagement Campaigns](/deep-linked-ads/google-ads-app-engagement/)
- Full attribution for:
	- In-app Events
- No 3rd Party Links
- Deep Linking via Universal Links (iOS), App Links (Android), custom URI Scheme
- Destinations:
	- In-app experiences

### [Web-based Ads (non-App Campaigns)](/deep-linked-ads/google-ads-non-uac/)
- Includes **Search**, **Display**, **Shopping** and **Video Ads** Campaign types
- Full attribution for:
	- App conversions (opens & in-app events)
	- Web (Mobile & Desktop) conversions
- Deep Linking via Branch Links
- Destinations:
	- Web (Mobile & Desktop) Only
		- Requires the [Branch Web SDK](/web/integrate/)
	- App (if installed)
		- Requires [Universal Links](/deep-linking/universal-links/) and/or [App Links](/deep-linking/android-app-links/)

## Data Mapping between Google Ads & Branch

Branch maps the following data fields from Google Ads to Branch.

Google Data | Branch Data | Definition | Possible Values
--- | --- | --- | ---
campaign_id | ~campaign_id | The numeric campaign ID of the campaign that produced the ad event. This value is guaranteed unique. | Google Ads Campaign ID
campaign_name | ~campaign  | The advertiser-defined campaign name of the campaign that produced the ad event. This value is not guaranteed unique. | Google Ads Campaign Name
ad_type | ~ad_format | The type of ad that resulted in the ad event. This value can be used to distinguish between various types of inventory as follows. | ClickToDownload<br/>AppDeepLink<br/>AppDeepLinkContinue<br/> Unknown
network_type | ~channel | This field will identify the Google Ads advertising network the ad event occurred on. | Search<br/>Display<br/>YouTube
network_subtype | ~secondary_publisher | This field will identify the “subtype” of the Google Ads advertising network the ad event occurred on. The possible values vary by primary network type. | Google Search, Search Partners, mGDN, Google AdMob, YouTubeVideos, YouTubeSearch, VideoPartners; `null` when campaign_type is UAC and network_type is Display.
campaign_type | ~tags | This field will identify the type of campaign that produced the ad event. | UAC, UACe,
Search, Display, Video, Shopping
ad_group_id | ~ad_set_id | The numeric ID of the ad group that produced with the ad event. Only provided when campaign_type is not UAC. | Google Ads Ad Group ID
creative_id | ~ad_id | The numeric ID of the creative ad unit that produced the ad event. Only provided when campaign_type is not UAC. | Google Ads Creative ID


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

In order to track these events, please refer to this document for further [information](/apps/v2event/#v2-event).

{! ingredients/deep-linked-ads/cost-data.md !}
