!!! info "<img src="../../../_assets/img/pages/deep-linked-ads/google/google-ads-logo.png" width="50"/> Google Ads Resources"
		- [Google Ads Overview](/deep-linked-ads/google-ads-overview/)
		- [Enabling the Integration](/deep-linked-ads/google-ads-enable/)
		- **App Install Campaigns**  (this page)
		- [App Engagement Campaigns](/deep-linked-ads/google-ads-app-engagement/)
		- [Web-based Ads (non-UAC)](/deep-linked-ads/google-ads-non-uac/)
		- [Troubleshooting & FAQs](/deep-linked-ads/google-ads-troubleshooting/)

App Install Campaigns allow you to promote your app across Google Search, Google Play, YouTube, Gmail, and within other apps and mobile websites on the Display Network.

Unlike most Google Ads Campaigns, you don't design individual ads for App Install Campaigns. Instead, Google Ads use your ad text ideas and assets from your app's store listing to design a variety of ads across several formats and networks.

## Prerequisites

!!! info "For App Install Campaigns Only"
	Branch's integration with Google Ads supports linking and attribution for App Install Campaigns without the use of Branch links. As all App Install Campaigns direct users to the respective app store, please make sure you complete the following.

* [x] Branch SDK integrated into your app.
* [x] Collect the IDFA on iOS, or the AAID on Android. For specifics, refer to the set up guide for [iOS](/apps/ios/#install-branch) and [Android](/apps/android/#install-branch) respectively.
* [x] Track all necessary events through the SDKs, with instructions [here](#forwarding-events-to-google-ads).
* [x] Have admin access to your Google Ads account; required for generating Link IDs in Google Ads.

!!! warning "**Enabling Required**"
		Before you can leverage our integration with Google Ads, you must **[Enable the Google Ads integration](/deep-linked-ads/google-ads-enable/)** in your Branch dashboard.

## Creating an App Install Campaign

Please follow Google Ads' documentation on how to [set up an App Install Campaign](https://support.google.com/google-ads/answer/6291545?co=ADWORDS.IsAWNCustomer%3Dtrue&oco=0).


For more detailed information, please see [Google Ads' help documentation](https://support.google.com/google-ads/answer/6247380?hl=en).

{! ingredients/deep-linked-ads/add-agency-prefix-san-only.md !}

## Routing & Attribution

As App Install Campaigns link users directly to the respective app store, Branch links are not needed during campaign creation. Google Ads will automatically route the user to the app store, upon which the user (hopefully) downloads the app.  With the Branch SDK implemented in your app, we measure said app download once the app opens and match the data we receive from our SDK to the information we receive directly from Google Ads via their Conversion API.

![image](/_assets/img/pages/deep-linked-ads/google/google-ads-uac.png)
