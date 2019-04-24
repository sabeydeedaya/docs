title: Google Ads App Engagement

!!! info "<img src="../../../_assets/img/pages/deep-linked-ads/google/google-ads-logo.png" width="50"/> Google Ads Resources"
		- [Google Ads Overview](/deep-linked-ads/google-ads-overview/)
		- [Enabling the Integration](/deep-linked-ads/google-ads-enable/)
		- [App Install Campaigns](/deep-linked-ads/google-ads-uac/)
		- **App Engagement Campaigns** (this page)
		- [Web-based Ads (non-UAC)](/deep-linked-ads/google-ads-non-uac/)
		- [Troubleshooting & FAQs](/deep-linked-ads/google-ads-troubleshooting/)

App engagement campaigns help you re-engage customers who are already using your app. Ads can appearing across Google Search, YouTube, and within other apps on the Display Network.

Unlike most Google Ads campaigns, you don't design individual ads for App engagement campaigns. Instead, Google Ads use your ad text ideas, the images and videos you provide, and assets from your app's store listing to design a variety of ads across several formats and networks.

## Prerequisites

!!! info "For App Engagement Only"
	Branch's integration with Google Ads supports linking and attribution for App Engagement campaigns without the use of Branch links. Please make sure you complete the following.

* [x] Branch SDK integrated into your app.
* [x] Collect the IDFA on iOS, or the AAID on Android. For specifics, refer to the set up guide for [iOS](/apps/ios/#install-branch) and [Android](/apps/android/#install-branch) respectively.
* [x] Track all necessary events through the SDKs, with instructions [here](#forwarding-events-to-google-ads).
* [x] Have admin access to your Google Ads account; required for generating Link IDs in Google Ads.
* [x] Have a universal deep link (iOS), an app link (Android), or custom URI scheme.

!!! warning "**Enabling Required**"
		Before you can leverage our integration with Google Ads, you must **[Enable the Google Ads integration](/deep-linked-ads/google-ads-enable/)** in your Branch dashboard.

## Creating an App Engagement Campaign

Please follow Google Ads' documentation on how to [set up an App Engagement Campaign](https://support.google.com/google-ads/answer/9234102).

!!! info "Required for App Engagement Campaigns"
	* [x] Have [assets such as text, video and image](https://support.google.com/google-ads/answer/9234183).
	* [x] Have a universal deep link (iOS), an app link (Android), or custom URI scheme.
	* [x] Use an [audience list](https://support.google.com/google-ads/answer/9234182) of app users.
	* [x] Have [mobile app conversion tracking](https://support.google.com/google-ads/answer/6100665) set up and [a supported third party](https://support.google.com/google-ads/answer/7382633) (Branch) to track conversions.

For more detailed information, please see [Google Ads' help documentation](https://support.google.com/google-ads/answer/9234180).

## Routing & Attribution

As App Engagement campaigns link users directly within apps, Branch links are not needed during campaign creation. Google Ads will automatically route the user to the appropriate app screen, upon which the user (hopefully) completes the intended conversion.  With the Branch SDK implemented in your app, we measure said conversion and match the data we receive from our SDK to the information we receive directly from Google Ads via their Conversion API.

![image](/_assets/img/pages/deep-linked-ads/google/google-ads-app-engagement.png)

!!! warning "Not Yet Supported"
	Viewing click/impression/cost data in your Branch dashboard is not yet supported for App Engagement campaigns.

!!! question "Why Can't I Use Branch Links?"
	Google App Engagement adds rely solely on universal deep links for iOS, App Links for Android and custom URI schemes. Please read Google's article for more information on [deep linking](https://support.google.com/google-ads/answer/6046977) into your app.
