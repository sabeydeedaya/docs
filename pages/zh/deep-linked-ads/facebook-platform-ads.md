---
title: Facebook Platform Ads
description: An overview page of using Branch in your Facebook Platform Ad campaigns.
path: tree/master/src/deep-linked-ads
source: facebook-platform-ads.md
---
# Facebook Platform Ads

## Overview

Branch links can be used together with a variety of Facebook ads, allowing you to track ad performance on the Branch dashboard and to deep link new users from ad-driven installs directly to content the first time they open your app.

Note: This documentation applies for Ad placements across Facebook and the Audience Network.

This documentation supports the following Facebook Ad Campaign types:

Facebook Campaign Category | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Awareness | Brand Awareness | Cross-platform Display
Awareness | Reach | Cross-platform Display
Consideration | Video Views | Cross-platform Display
Consideration | Lead Generation | Cross-platform Display

#### Facebook Campaign Advert Format Support Table

Facebook Campaign Type | Photo | Video | Carousel | Slideshow | Collection | Dynamic | Canvas
--- | --- | --- | --- | --- | --- | --- | ---
Brand Awareness | ✔︎ | ✔︎ | ✔︎ | ✔︎ |  |  | ✔︎
Reach | ✔︎ | ✔︎ | ✔︎ | ✔︎ |  |  | ✔︎
Video Views |  | ✔︎ | ✔︎ | ✔︎ |  |  | ✔︎
Lead Generation | ✔︎ | ✔︎ | ✔︎ | ✔︎ |  |  |

{! ingredients/deep-linked-ads/link-to-facebook-ads-overview.md !}

## Setup

!!! warning "Prerequisites"
	* [x] To track installs from Facebook Ads you should [integrate the Branch SDK](/apps/ios/#integrate-branch) into your app.
	* [x] To use Branch links in Facebook App Install Ads ensure you have Universal Links set up on iOS or App Links enabled on Android to ensure correct routing behavior. For setup, checkout [Universal](/deep-linking/universal-links/) and [App Links](/deep-linking/android-app-links/).
	* [x] If you want to deep link from your ads directly to content, you should [configure deep link routing](/deep-linking/routing/).
	* [x] Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality.

{! ingredients/deep-linked-ads/enable-facebook-ad-partner.md !}

#### Create an Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management){:target="_blank"}'s `Create Facebook Link` button under the Facebook Partner and select `Create Display Link` or `Create Display Link` depending on your campaign type.
<img src="/_assets/img/pages/deep-linked-ads/reusable-images/create-link-display.png" alt="Link Creation" class="three-quarters center">
1. Pick a Link Name for later reference.
1. Configure the link the Ad Partner set to **Facebook** and the Ad Format set to **Cross-Platform Display** or **Cross-platform Display**.
![Create Ad Link](/_assets/img/pages/deep-linked-ads/facebook-platform-ads/link-setup.png)
1. Under the Configure Options tab, navigate to the Redirects sub section and ensure that the iOS/Android and Desktop redirects are set to the desired destinations being promoted by the ad campaign.
![Create Ad Link](/_assets/img/pages/deep-linked-ads/reusable-images/example-link-redirect.png)
1. Under the Analytics Tags sub section additional tags can be set. It is recommended to fill in these fields as they can be used as filters in Branch's Ads Analytics view. To best connect your ad link with your Facebook Campaign, set the channel field to Facebook Ads and set the campaign field to the same ad campaign name used in Facebook Ads.
![Analytics Tags](/_assets/img/pages/deep-linked-ads/reusable-images/facebook-analytics-tags.png)

!!! warning ""
	In order for your campaign to run effectively, be sure to disable Deepviews. You can either [disable Deepviews](/web/deep-views/) for your entire account or [disable Deepviews for one link](/web/deep-views/).

!!! note "Optional: Deep Link Data"
	You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing](/deep-linking/routing/) page to learn more.

### Brand Awareness Campaign Setup

#### Configure an Ad

To set up Facebook Brand Awareness Campaigns, you will need to insert your Branch Ad Link as the Website destination for the created ad. Facebook's Ad guide for Brand Awareness Campaigns is available **[here](https://www.facebook.com/business/ads-guide/brand-awareness){:target="_blank"}**.

#### Create Your Campaign
1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create){:target="_blank"} while logged in to the account that owns your Facebook app.
1. Select **Brand Awareness** as the campaign marketing objective.
![Campaign Selection](/_assets/img/pages/deep-linked-ads/facebook-platform-ads/brand-awareness/campaign-selection.png)
1. Continue with campaign creation selecting the app to advertise, audience, placement, and budget. Then press continue to enter the Advert creation step.
1. Now select an advertisement format and customize your ad
1. Now add your Branch link to your advertisement
    - Select the `Add a Website URL` checkbox and copy your Branch Ad Link into the **Website URL** field.

	![Deep Link Placement](/_assets/img/pages/deep-linked-ads/facebook-platform-ads/brand-awareness/ad-deep-link.png)

    - If you selected to add a full screen Canvas advertisement, add your Branch Ad link as the **Destination URL** for your canvas advertisement components
1. Complete the rest of the ad campaign setup.

!!! note "Optional: Ad formats with Multiple Links"
	Some ad formats such as Carousel format can handle multiple deep links. To have link performance data on each image or component of the advertisement, create multiple Branch Ad links to be used in each part of the multiple link advertisement format. This format is useful if you want to drive customers to different content pieces or products.

### Reach Campaign Setup

#### Configure an Ad

To set up Facebook Reach Campaigns, you will need to insert your Branch Ad Link as the Website destination for the created ad. Facebook's Ad guide for Reach Campaigns is available **[here](https://www.facebook.com/business/ads-guide/reach){:target="_blank"}**.

#### Create Your Campaign
1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create){:target="_blank"} while logged in to the account that owns your Facebook app.
1. Select **Reach** as the campaign marketing objective.
![Campaign Selection](/_assets/img/pages/deep-linked-ads/facebook-platform-ads/reach/campaign-selection.png)
1. Continue with campaign creation selecting the app to advertise, audience, placement, and budget. Then press continue to enter the Advert creation step.
1. Now select an advertisement format and customize your ad
1. Now add your Branch link to your advertisement
    - Select the `Add a Website URL` checkbox and copy your Branch Ad Link into the **Website URL** field.

	![Deep Link Placement](/_assets/img/pages/deep-linked-ads/facebook-platform-ads/reach/ad-deep-link.png)

    - If you selected to add a full screen Canvas advertisement, add your Branch Ad link as the **Destination URL** for your canvas advertisement components
1. Complete the rest of the ad campaign setup.

!!! note "Optional: Ad formats with Multiple Links"
	Some ad formats such as Carousel format can handle multiple deep links. To have link performance data on each image or component of the advertisement, create multiple Branch Ad links to be used in each part of the multiple link advertisement format. This format is useful if you want to drive customers to different content pieces or products.

### Video Views Campaign Setup

#### Configure an Ad

To set up Facebook Video Views Campaigns, you will need to insert your Branch Ad Link as the Website destination for the created ad. Facebook's Ad guide for Video Views Campaigns is available **[here](https://www.facebook.com/business/ads-guide/video-views/){:target="_blank"}**.

#### Create Your Campaign
1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create){:target="_blank"} while logged in to the account that owns your Facebook app.
1. Select **Video Views** as the campaign marketing objective.
![Campaign Selection](/_assets/img/pages/deep-linked-ads/facebook-platform-ads/video-views/campaign-selection.png)
1. Continue with campaign creation selecting the app to advertise, audience, placement, and budget. Then press continue to enter the Advert creation step.
1. Now select an advertisement format and customize your ad
1. Now add your Branch link to your advertisement
    - Select the `Add a Website URL` checkbox and copy your Branch Ad Link into the **Website URL** field.

	![Deep Link Placement](/_assets/img/pages/deep-linked-ads/facebook-platform-ads/video-views/ad-deep-link.png)

    - If you selected to add a full screen Canvas advertisement, add your Branch Ad link as the **Destination URL** for your canvas advertisement components
1. Complete the rest of the ad campaign setup.

!!! note "Optional: Ad formats with Multiple Links"
	Some ad formats such as Carousel format can handle multiple deep links. To have link performance data on each image or component of the advertisement, create multiple Branch Ad links to be used in each part of the multiple link advertisement format. This format is useful if you want to drive customers to different content pieces or products.

### Lead Generation Campaign Setup

#### Configure an Ad

To set up Facebook Lead Generation Campaigns, you will need to insert your Branch Ad Link as the Website destination for the created ad. After users fill out the lead form, they'll be directed to your website or app after through the Branch Ad link. Facebook's Ad guide for Lead Generation Campaigns is available **[here](https://www.facebook.com/business/ads-guide/lead-generation){:target="_blank"}**.

#### Create Your Campaign
1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create){:target="_blank"} while logged in to the account that owns your Facebook app.
1. Select **Lead Generation** as the campaign marketing objective.
![Campaign Selection](/_assets/img/pages/deep-linked-ads/facebook-platform-ads/lead-generation/campaign-selection.png)
1. Continue with campaign creation selecting the app to advertise, audience, placement, and budget. Then press continue to enter the Advert creation step.
1. Now select an advertisement format and customize your ad
1. Enter the Lead form creation portal and setup your form.
1. On the final "Thank you" screen, locate and paste your Branch Ad Link into the **Website link** field.
![Campaign Selection](/_assets/img/pages/deep-linked-ads/facebook-platform-ads/lead-generation/ad-deep-link.png)
1. Complete the rest of the ad campaign setup.

{! ingredients/deep-linked-ads/view-fb-link-data.md !}

## Troubleshooting

{! ingredients/deep-linked-ads/fb-ads-support.md !}
