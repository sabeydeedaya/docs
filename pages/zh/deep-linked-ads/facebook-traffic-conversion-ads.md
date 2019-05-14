---
title: Facebook Traffic and Conversion Ads
description: An overview page of using Branch in your Facebook Traffic and Conversion ad campaigns.
path: tree/master/src/deep-linked-ads
source: facebook-traffic-conversion-ads.md
---
# Facebook Traffic and Conversion Ads

## Overview

Branch links can be used together with Facebook Traffic and Conversion ads, allowing you to track engagement with your advertisements and ad-driven installs which deep link new users directly to content the first time they open your app.

Note: This documentation applies for Ad placements across Facebook and the Audience Network.

This documentation supports the following Facebook Ad Campaign types:

Facebook Campaign Category | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Consideration | Traffic | Cross-platform Display
Conversion | Conversions | Cross-platform Display

#### Facebook Campaign Advert Format Support Table

Facebook Campaign Type | Photo | Video | Carousel | Slideshow | Collection | Dynamic | Canvas
--- | --- | --- | --- | --- | --- | --- | ---
Traffic | ✔︎ | ✔︎ | ✔︎ | ✔︎ | ✔︎ | ✔︎ | ✔︎
Conversion | ✔︎ | ✔︎ | ✔︎ | ✔︎ |  |  | ✔︎

{! ingredients/deep-linked-ads/link-to-facebook-ads-overview.md !}

!!! warning "Prerequisites"
	* [x] To track installs from Facebook Ads you should [integrate the Branch SDK](/apps/ios/#integrate-branch) into your app.
	* [x] To use Branch links in Facebook App Install Ads ensure you have Universal Links set up on iOS or App Links enabled on Android to ensure correct routing behavior. For setup, checkout [Universal](/deep-linking/universal-links/) and [App Links](/deep-linking/android-app-links/).
	* [x] If you want to deep link from your ads directly to content, you should [configure deep link routing](/deep-linking/routing/).
	* [x] Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality.

{! ingredients/deep-linked-ads/enable-facebook-ad-partner.md !}

## Setup

## Create an Ad Link

!!! Note
	This section is optional if you are running app-only ads. We will automatically pull in campaign, ad set, ad, and creative information from Facebook. However, if you want users to be deep linked, you should follow the instructions in this section.

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management){:target="_blank"}'s `Create Facebook Link` button under the Facebook Partner and select `Create Display Link`
<img src="/_assets/img/pages/deep-linked-ads/reusable-images/create-link-display.png" alt="Link Creation" class="three-quarters center">
1. Under the Define Section, pick a Link Name for later reference.
1. Configure the link with the Ad Partner set to **Facebook**, and the Ad Format set to **Cross-platform Display**.
![Create Ad Link](/_assets/img/pages/deep-linked-ads/facebook-traffic-conversion-ads/link-setup.png)
1. Under the Configure Options tab, navigate to the Redirects sub section and ensure that the iOS/Android and Desktop redirects are set to the desired destinations being promoted by the ad campaign.
![Create Ad Link](/_assets/img/pages/deep-linked-ads/reusable-images/example-link-redirect.png)
1. Under the Analytics Tags sub section additional tags can be set. It is recommended to fill in these fields as they can be used as filters in Branch's Ads Analytics view. To best connect your ad link with your Adwords Campaign, set the channel field to Facebook Ads and set the campaign field to the same ad campaign name used in Facebook Ads.
![Analytics Tags](/_assets/img/pages/deep-linked-ads/reusable-images/facebook-analytics-tags.png)

!!! warning ""
	In order for your campaign to run effectively, be sure to disable Deepviews. You can either [disable Deepviews](/web/deep-views/#setup) for your entire account or [disable Deepviews for one link](/web/deep-views/#disable-per-link-deepviews).

!!! note "Optional: Deep Link Data"
	You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing](/deep-linking/routing/) page to learn more.

### Traffic Campaign Setup

#### Configure an Ad

To set up a Facebook Traffic campaign, you will need to first create your campaign and use a Branch link as the Deep Link URL for the advertisements. Facebook Traffic Campaign information is available **[here](https://www.facebook.com/business/ads-guide/traffic){:target="_blank"}**.

#### Create Your Campaign
1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create){:target="_blank"} while logged in to the account that owns your Facebook app.
1. Select **Traffic** as the campaign marketing objective.
![Campaign Selection](/_assets/img/pages/deep-linked-ads/facebook-traffic-conversion-ads/traffic/campaign-selection.png)
1. Select either to drive traffic to your `Website` or your `App`
1. Continue with campaign creation selecting the app to advertise, audience, placement, and budget. Then press continue to enter the Advert creation step.
1. Now select an advertisement format and customize your ad
1. Add your Branch Ad Link to your advertisement
	- If you chose to drive traffic to an App, locate the **Deep Link** field and copy and paste your Branch link there.

		![Campaign Selection](/_assets/img/pages/deep-linked-ads/facebook-traffic-conversion-ads/traffic/link-setup-app.png)

	- If you chose to drive traffic to a Website, paste your Branch Ad link into the **Website URL** field.

		![Campaign Selection](/_assets/img/pages/deep-linked-ads/facebook-traffic-conversion-ads/traffic/link-setup-web.png)

	- If you chose to drive traffic to a Website and are using a full-screen Canvas, add your Branch Ad link as the **Destination URL** for your canvas advertisement components.
1. Complete the rest of the ad campaign setup.

!!! note "Optional: Ad formats with Multiple Links"
	Some ad formats such as Carousel format can handle multiple deep links. To have link performance data on each image or component of the advertisement, create multiple Branch Ad links to be used in each part of the multiple link advertisement format. This format is useful if you want to drive customers to different content pieces or products.

### Conversions Campaign Setup

#### Configure an Ad

To set up a Facebook Conversions campaign, you will need to first create your campaign and use a Branch link as the Deep Link URL for the advertisements. Facebook Conversions Campaign information is available **[here](https://www.facebook.com/business/ads-guide/conversions){:target="_blank"}**.

!!! warning "Prerequisites"
	As a prerequisite, Facebook requires you to report events about your users interacting with your content, for example: viewing, adding to cart, and purchasing. To add the Facebook Pixel to your website, and event tracking using the Branch SDK (which forwards to Facebook) to your app, follow these instructions:

	- [Sending App Events with the Branch SDK](/deep-linked-ads/facebook-ads-faq/#tracking-other-conversion-events)
	- [Sending Web Events with the Facebook Pixel](https://developers.facebook.com/docs/marketing-api/facebook-pixel/v2.8){:target="_blank"}

#### Create Your Campaign
1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create){:target="_blank"} while logged in to the account that owns your Facebook app.
1. Select **Conversions** as the campaign marketing objective.
![Campaign Selection](/_assets/img/pages/deep-linked-ads/facebook-traffic-conversion-ads/conversions/campaign-selection.png)
1. Select either to have the goal of having conversions on a `Website` or in an `App`
1. Continue with campaign creation selecting audience, placement, and budget. Then press continue to enter the Advert creation step.
1. Now select an advertisement format and customize your ad
1. Add your Branch Ad Link to your advertisement
	- If you chose app conversions App, locate the **Deep Link** field and copy and paste your Branch link there.

		![Campaign Selection](/_assets/img/pages/deep-linked-ads/facebook-traffic-conversion-ads/conversions/link-setup-app.png)

	- If you chose Website conversions, paste your Branch Ad link into the **Website URL** field.

		![Campaign Selection](/_assets/img/pages/deep-linked-ads/facebook-traffic-conversion-ads/conversions/link-setup-web.png)

	- If you chose Website conversions and are using a full-screen Canvas, add your Branch Ad link as the **Destination URL** for your canvas advertisement components.
1. Complete the rest of the ad campaign setup.

!!! note "Optional: Ad formats with Multiple Links"
	Some ad formats such as Carousel format can handle multiple deep links. To have link performance data on each image or component of the advertisement, create multiple Branch Ad links to be used in each part of the multiple link advertisement format. This format is useful if you want to drive customers to different content pieces or products.

{! ingredients/deep-linked-ads/view-fb-link-data.md !}

## Troubleshooting

{! ingredients/deep-linked-ads/fb-ads-support.md !}
