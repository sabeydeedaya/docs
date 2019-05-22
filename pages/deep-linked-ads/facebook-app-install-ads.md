## Overview

Branch links can be used together with Facebook App Install Campaign ads, allowing you to track ad-driven installs on the Branch dashboard and deep link those new users directly to content the first time they open your app.

Note: This documentation applies for Ad placements across Facebook and the Audience Network.

This documentation supports the following Facebook Ad Campaign types:

Facebook Campaign Category | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Consideration | App Installs | App Only: Install

### Facebook Campaign Advert Format Support Table

Facebook Campaign Type | Photo | Video | Carousel | Slideshow | Collection | Dynamic | Canvas
--- | --- | --- | --- | --- | --- | --- | ---
App Installs | ✔︎ | ✔︎ | ✔︎ | ✔︎ | - | - | ✔︎

{! ingredients/deep-linked-ads/link-to-facebook-ads-overview.md !}

## Setup

!!! warning "Prerequisites"
	* [x] To track installs from Facebook Ads you should [integrate the Branch SDK](/apps/ios/#integrate-branch) into your app.
	* [x] To use Branch links in Facebook App Install Ads ensure you have:
		* [x] URI schemes configured on iOS
		* [x] URI schemes configured on Android
		* [x] iOS App Store ID set
		* [x] Android Package Name set
		* [x] Social Media Settings filled out (i.e. OG tags at the bottom of [Link Settings](/links/default-link-behavior/#social-media))
	* [x] If you want to deep link from your ads directly to content, you should [configure deep link routing](/deep-linking/routing/).
	* [x] Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality.

{! ingredients/deep-linked-ads/enable-facebook-ad-partner.md !}

## Branch <> Facebook Field Mappings

Branch maps the following data fields from Facebook App Install Ads to Branch.

Facebook Data | Branch Data | Possible Values
--- | --- | ---
n/a | ~advertising_partner_name | “Facebook”
n/a | ~channel | “Facebook” if null or last touch
na/a | ~feature | "Paid Advertising"
campaign_name | ~campaign | Light Bright Launch
campaign_id | ~campaign_id | 15292426
publisher_platform | ~secondary_publisher | facebook / instagram / audience_network
creative_name | ~creative_name | Light Bright Vertical
creative_id | ~creative_id | 1234567890
ad_set_name | ~ad_set_name | Light Bright
ad_set_id | ~ad_set_id | 12345567890
ad_name | ~ad_name | Light Bright

{! ingredients/deep-linked-ads/add-agency-prefix-san-only.md !}

{! ingredients/deep-linked-ads/cost-data.md !}

{! ingredients/deep-linked-ads/view-fb-link-data.md !}

## Optional: Deep link your app install campaign

This section is **not required for measurement** if you are running app-only ads. We will automatically pull in campaign, ad set, ad, and creative information from Facebook. However, if you want users to be deep linked, you should follow the instructions in this section.

### Configure your app to read Facebook App Install deep links

1. Unfortunately, we've found that the direct S2S mechanism for retrieving deep links is rather unreliable. We recommend that you have the Facebook [Android](https://developers.facebook.com/docs/android/getting-started) / [iOS](https://developers.facebook.com/docs/ios/getting-started) SDKs installed so Branch can work directly with them on the client side for the best outcome.
1. On Android, if you are using Proguard, make sure you add the necessary inclusions to keep the Facebook SDK during build time.

	```xml
	-keep class com.facebook.applinks.** { *; }
	-keepclassmembers class com.facebook.applinks.** { *; }
	-keep class com.facebook.FacebookSdk { *; }
	```

1. Tell Branch to use the Facebook SDK to read the App Links on initialization

	- *iOS - Objective C*

		```objc
		// This goes BEFORE initSession is called in didFinishLaunchingWithOptions
		[[Branch getInstance] registerFacebookDeepLinkingClass:[FBSDKAppLinkUtility class]]
		```

	- *Android - Java*

		```java
		// This goes in the getAutoInstance call in your Application class
		Branch.getAutoInstance(this).enableFacebookAppLinkCheck();
		```

### Create an Ad Link for deep linking

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management) `Create Facebook Link` button under the Facebook Partner and select `App Install or Engagement`
<img src="/_assets/img/pages/deep-linked-ads/reusable-images/create-link-install-engagement.png" alt="Link Creation" class="half left">
1. Enter a Link Name for later reference.
1. Configure the link with the Ad Format set to **App Only**, the Ad Partner set to **Facebook**, and the Secondary Ad Format set to **App Install Ads**.
![Create Ad Link](/_assets/img/pages/deep-linked-ads/facebook-app-install-ads/link-setup.png)

1. Under the Configure Options tab, use the deep link data input section to add your deep linking parameters. You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing](/deep-linking/routing/) page to learn more.
![Create Ad Link](/_assets/img/pages/deep-linked-ads/reusable-images/create-link-deep-link-data.png)

1. Because this is an app install ad, the redirect section will be largely ignored. We highly recommend that you leave this section untouched.
1. Analytics will be automatically pulled in from the direct Facebook integration above, and so you can ignore the analytics section of the configuration.

!!! warning ""
	In order for your campaign to run effectively, be sure to disable Deepviews. You can either [disable Deepviews](/web/deep-views/) for your entire account or [disable Deepviews for one link](/web/deep-views/#disable-per-link-deepviews).

### Configure your campaign to deep link the Ad Link

1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create) while logged in to the account that owns your Facebook app.
1. Select **App Installs** as the campaign marketing objective.
![Campaign Selection](/_assets/img/pages/deep-linked-ads/facebook-app-install-ads/campaign-selection.png)
1. Continue with campaign creation selecting the app to advertise, audience, placement, and budget. Then press continue to enter the Advert creation step.
1. Now select an advertisement format and customize your ad
1. Under the **Destination** field, you can select to direct your advertisement to the App Store or a Facebook Canvas Advertisement.
	- If you select the App Store, fill in the **Deep Link** field with your Branch Ad link

	![Deep Link Placement](/_assets/img/pages/deep-linked-ads/facebook-app-install-ads/deep-link.png)

	- If you select Canvas, add your Branch Ad link as the **Destination** Website URL for your canvas advertisement components

	![Canvas Setup](/_assets/img/pages/deep-linked-ads/facebook-app-install-ads/facebook-canvas-setup.png)

1. Complete the rest of the ad campaign setup.

Your Facebook Ad Campaign is now setup to use Branch Links to handle App Installs!

!!! note "Optional: Ad formats with Multiple Links"
	Some ad formats such as Carousel format can handle multiple deep links. To have link performance data on each image or component of the advertisement, create multiple Branch Ad links to be used in each part of the multiple link advertisement format. This format is useful if you want to drive customers to different content pieces or products.

### Testing Deep Linking from Ads

Unfortunately, the demo/preview ads used during the ads creation flow on Facebook use a different mechanism than live Facebook ads. **This prevents you from testing deep linking from your Facebook ads**. Do not waste time trying to get this to work. We've confirmed with Facebook representatives that this is broken.

The only way to test the deep linking functionality is outside of the actual ads system is a helper tool from Facebook. Follow these instructions to test the deep linking functionality:

1. Head to the [Ads tester tool](https://developers.facebook.com/tools/app-ads-helper/)
1. Choose the app that you're advertising with
1. Scroll down to the button that says 'Test Deep Link'
1. Paste in the Branch link
1. Check 'Send Deferred'
1. Click 'Send to iOS/Android'
1. Install the app and it should deep link!

!!! note "Note the following common mistakes for testing"
	1. If you reset the GAID or IDFA on a device, you must uninstall Facebook and re-install prior to testing. Facebook does not update the IDFA/GAID every time it's opened.
	2. Send deferred does not require a notification to be sent or to be clicked. Checking "Send Deferred" will automatically queue up a match for the test device with the deep link data. The notification is completely separate from deferred deep linking.
	3. The Facebook account on the desktop where you click "Send Deferred" must match the account logged into the test device for deferred deep link data to be queued up. Note that we've observed issues where you log in and out of multiple accounts on test devices that cause Facebook to not correctly queue up a match.
	4. If you see that someone liked your ad, do not bother trying to click and test it. Clicking your own, live advertisement that shows up in notifications will not deep link.

## Troubleshooting

{! ingredients/deep-linked-ads/fb-ads-support.md !}

{! ingredients/deep-linked-ads/cost-data-discrepancies.md !}

### Troubleshooting deep linking

#### Intercepting Deep Links Before Branch

If you use Branch deep links in Facebook app ads, please check the following.

We recently discovered an issue where an app was calling Facebook's SDK to fetch the deferred app link within their iOS and Android app. Branch calls uses this same mechanism via a direct API integration, but if Facebook's SDK retrieves it before we do, Branch will not see any deep link data. Please ensure to comment out any calls to the following API within your app:

- [Android: fetchDeferredAppLink](https://developers.facebook.com/docs/reference/android/current/class/AppLinkData/)
- [iOS: fetchDeferredAppLink](https://developers.facebook.com/docs/reference/ios/current/class/FBSDKAppLinkUtility/)

#### Issues Reading Facebook App Links

If Facebook is having trouble reading the App Links from the Branch link, you might see messages like these while trying to test out the flow. This means that there is something corrupted in the OG tags causing Facebook to not parse your link.

<img src="/_assets/img/ingredients/deep-linked-ads/fb-ads-support/invalid-app-links-error.png" alt="Invalid App Links" class="left half">
<img src="/_assets/img/ingredients/deep-linked-ads/fb-ads-support/missing_applinks.png" alt="Troubleshooting" class="left">

**Rescrape the OG Tags**

You can test the OG tags using the [OG tag tester tool](https://developers.facebook.com/tools/debug/og/object) provided by Facebook:

1. Paste the Branch Link into the Input URL box.
1. Click on the Show existing scrape information button.
1. Examine errors regarding App Links from the output window.
1. Click on the Fetch New Scrape Information button. This last step typically resolves this problem if you are certain that your Branch Link Settings are correct.

!!! tip ""
	You can further automate the rescraping process by using this command after you create a new link and before you use it for any ads:

	``` sh
	curl --insecure "https://graph.facebook.com/?id=[YOUR-URL-TO-SCRAPE]&scrape=true"
	```

**If the OG tag tester continues to report problems**

1. Examine your [Link Settings](https://dashboard.branch.io/#/settings/link) and ensure that for all platforms (for which an app is available), that a URI scheme and a link to the app in the Play/App Store is configured. If you are using a Custom URL for your iOS Redirect, then you need to append `?id[10-digit App Store ID]` to the URL. This is necessary in order to fully generate the App Links and OG tags that the Facebook scraper expects to find.
    - For example, if your App Store URL is `https://itunes.apple.com/us/app/my-app-name/id1234567890`, then your Custom URL value should be `https://example.com?id1234567890`
1. If errors from the output window pertain to OG tags i.e. missing title, description etc. then examine link OG tags by appending `?debug=true` as described on the [Integration Testing page]({{base.url}}/getting-started/integration-testing/guide/#debugging-an-individual-link).
1. If you haven't set OG tags on a per link level, then please check your Dashboard's global Social Media Display Customization settings from the [Link Settings](https://dashboard.branch.io/#/settings/link) page.

**Use a direct deep link**

As a last resort, you can manually input a direct deep link. To retrieve this:

1. Go to Facebook's [Open Graph Object Debugger](https://developers.facebook.com/tools/debug/og/object/)
1. Input the Branch link you want to use for your ad
1. Click **Fetch new scrape information**
1. Find the `al:ios:url` line (it should look like `<meta property="al:ios:url" content="myapp://open?link_click_id=link-242052337263342024" />`)
1. Copy the value of this (`myapp://open?link_click_id=link-242052337263342024`) and input it as the Deep Link value of your ad

If none of these approaches work, please reach out to integrations@branch.io immediately.

#### Known Issue with App Restrictions

We recently discovered a bug within the Facebook system that prevents App Links from being read by the robot if you change any of these values from the defaults in your Advanced Facebook App Settings tab. Please make sure

- Contains Alcohol is set to **No**
- Age Restriction is set to **Anyone (13+)**
- Social Discovery is set to **Yes**
- Country Restricted is set to **No**

It has to look like this **exactly**:

![App Restrictions Troubleshooting](/_assets/img/ingredients/deep-linked-ads/fb-ads-support/app_restrictions.png)
