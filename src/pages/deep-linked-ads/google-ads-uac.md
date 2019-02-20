!!! info "<img src="../../../img/pages/deep-linked-ads/google/google-ads-logo.png" width="50"/> Google Ads Resources"
		- [Google Ads Overview](/pages/deep-linked-ads/google-ads-overview.md)
		- [Enabling the Integration](/pages/deep-linked-ads/google-ads-enable.md)
		- **Universal App Campaigns (UAC)**  (this page)
		- [Web-based Ads (non-UAC)](/pages/deep-linked-ads/google-ads-non-uac.md)
		- [Troubleshooting & FAQs](/pages/deep-linked-ads/google-ads-troubleshooting.md)  


Universal App campaigns allow you to promote your app across Google Search, Google Play, YouTube, Gmail, and within other apps and mobile websites on the Display Network.

Unlike most Google Ads campaigns, you don't design individual ads for Universal App campaigns (UAC). Instead, Google Ads use your ad text ideas and assets from your app's store listing to design a variety of ads across several formats and networks.

## Prerequisites

!!! info "For UAC Only"
	Branch's integration with Google Ads supports linking and attribution for Universal App Campaigns without the use of Branch links. As all UACs direct users to the respective app store, please make sure you complete the following.

* [x] Branch SDK integrated into your app.
* [x] Collect the IDFA on iOS, or the AAID on Android. For specifics, refer to the set up guide for [iOS](/pages/apps/ios/#install-branch) and [Android](/pages/apps/android/#install-branch) respectively.
* [x] Track all necessary events through the SDKs, with instructions [here](#forwarding-events-to-google-ads).
* [x] Have admin access to your Google Ads account; required for generating Link IDs in Google Ads.


## Creating a Universal App Campaign

Please follow Google Ads' documentation on how to [set up a Universal App Campaign](https://support.google.com/google-ads/answer/6291545?co=ADWORDS.IsAWNCustomer%3Dtrue&oco=0).


For more detailed information, please see [Google Ads' help documentation](https://support.google.com/google-ads/answer/6247380?hl=en).

## Routing & Attribution

As Universal App Campaigns link users directly to the respective app store, Branch links are not needed during campaign creation. Google Ads will automatically route the user to the app store, upon which the user (hopefully) downloads the app.  With the Branch SDK implemented in your app, we measure said app download once the app opens and match the data we receive from our SDK to the information we receive directly from Google Ads via their Conversion API.

![image](/img/pages/deep-linked-ads/google/google-ads-uac.png)
