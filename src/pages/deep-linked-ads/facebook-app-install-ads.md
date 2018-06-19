---
title: Facebook App Install Ads
description: An overview page of using Branch in your Facebook App Install campaigns.
path: tree/master/src/pages/deep-linked-ads
source: facebook-app-install-ads.md
---
# Facebook App Install Ads

## Overview

Branch links can be used together with Facebook App Install Campaign ads, allowing you to track ad-driven installs on the Branch dashboard and deep link those new users directly to content the first time they open your app.

Note: This documentation applies for Ad placements across Facebook and the Audience Network.

This documentation supports the following Facebook Ad Campaign types:

Facebook Campaign Category | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Consideration | App Installs | App Only: Install

#### Facebook Campaign Advert Format Support Table

Facebook Campaign Type | Photo | Video | Carousel | Slideshow | Collection | Dynamic | Canvas
--- | --- | --- | --- | --- | --- | --- | ---
App Installs | ✔︎ | ✔︎ | ✔︎ | ✔︎ | - | - | ✔︎

{! ingredients/deep-linked-ads/link-to-facebook-ads-overview.md !}

## Setup

!!! warning "Prerequisites"
	* [x] To track installs from Facebook Ads you should [integrate the Branch SDK](/pages/apps/ios/#integrate-branch) into your app.
	* [x] To use Branch links in Facebook App Install Ads ensure you have Universal Links set up on iOS or App Links enabled on Android to ensure correct routing behavior. For setup, checkout [Universal](/pages/deep-linking/universal-links/) and [App Links](/pages/deep-linking/android-app-links/).
	* [x] If you want to deep link from your ads directly to content, you should [configure deep link routing](/pages/deep-linking/routing/).
	* [x] Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality.

{! ingredients/deep-linked-ads/enable-facebook-ad-partner.md !}

#### Create an Ad Link

!!! Note
	This section is optional if you are running app-only ads. We will automatically pull in campaign, ad set, ad, and creative information from Facebook. However, if you want users to be deep linked, you should follow the instructions in this section.

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management){:target="_blank"}'s `Create Facebook Link` button under the Facebook Partner and select `App Install or Engagement`
<img src="/img/pages/deep-linked-ads/reusable-images/create-link-install-engagement.png" alt="Link Creation" class="three-quarters center">
1. Enter a Link Name for later reference.
1. Configure the link with the Ad Format set to **App Only**, the Ad Partner set to **Facebook**, and the Secondary Ad Format set to **App Install Ads**.
![Create Ad Link](/img/pages/deep-linked-ads/facebook-app-install-ads/link-setup.png)
1. Under the Configure Options tab, navigate to the Redirects sub section and ensure that the iOS/Android redirect is set to the desired app being promoted by the ad campaign.
![Create Ad Link](/img/pages/deep-linked-ads/reusable-images/example-link-redirect.png)
1. Under the Analytics Tags sub section additional tags can be set. It is recommended to fill in these fields as they can be used as filters in Branch's Ads Analytics view. To best connect your ad link with your Adwords Campaign, set the channel field to Facebook Ads and set the campaign field to the same ad campaign name used in Facebook Ads.
![Analytics Tags](/img/pages/deep-linked-ads/reusable-images/facebook-analytics-tags.png)

!!! warning ""
	In order for your campaign to run effectively, be sure to disable Deepviews. You can either [disable Deepviews](/pages/web/deep-views/) for your entire account or [disable Deepviews for one link](/pages/web/deep-views/#disable-per-link-deepviews).

!!! note "Optional: Deep Link Data"
	You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing](/pages/deep-linking/routing/) page to learn more.

#### Configure an Ad

To set up a Facebook App Install campaign, you will need to first create your campaign and use a Branch link as the Deep Link URL for the advertisements. Facebook App Install Campaign information is available **[here](https://www.facebook.com/business/ads-guide/app-installs){:target="_blank"}**.

#### Create Your Campaign
1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create){:target="_blank"} while logged in to the account that owns your Facebook app.
1. Select **App Installs** as the campaign marketing objective.
![Campaign Selection](/img/pages/deep-linked-ads/facebook-app-install-ads/campaign-selection.png)
1. Continue with campaign creation selecting the app to advertise, audience, placement, and budget. Then press continue to enter the Advert creation step.
1. Now select an advertisement format and customize your ad
1. Under the **Destination** field, you can select to direct your advertisement to the App Store or a Facebook Canvas Advertisement.
	- If you select the App Store, fill in the **Deep Link** field with your Branch Ad link
	![Deep Link Placement](/img/pages/deep-linked-ads/facebook-app-install-ads/deep-link.png)
	- If you select Canvas, add your Branch Ad link as the **Destination** Website URL for your canvas advertisement components
	![Canvas Setup](/img/pages/deep-linked-ads/facebook-app-install-ads/facebook-canvas-setup.png)
1. Complete the rest of the ad campaign setup.

Your Facebook Ad Campaign is now setup to use Branch Links to handle App Installs!

!!! note "Optional: Ad formats with Multiple Links"
	Some ad formats such as Carousel format can handle multiple deep links. To have link performance data on each image or component of the advertisement, create multiple Branch Ad links to be used in each part of the multiple link advertisement format. This format is useful if you want to drive customers to different content pieces or products.

{! ingredients/deep-linked-ads/view-fb-link-data.md !}

## Troubleshooting

{! ingredients/deep-linked-ads/fb-ads-support.md !}
