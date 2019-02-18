---
title: Google Video Ads
description: A guide to using Branch in Adwords Video Network Campaigns.
path: tree/master/src/pages/deep-linked-ads
source: google-video-ads.md
---
# Google Video Ads

## Overview

If you're running Google AdWords Video Campaigns, you'll find everything you need right here.

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Video | Standard - Instream | Cross-platform Search
Video | Standard - Bumper | Cross-platform Search
Video | Mobile App Install - Instream | App Only: Install

#### OS Support and Major Differences

Operating System | Supported by Adwords Video Ads? | Key Differences | Documentation
--- | --- | --- | ---
Web | Yes | Uses tracking template, must redirect to Final Website | [link](/pages/deep-linked-ads/google-video-ads/#video-standard-ads)
iOS | Yes | Uses tracking template, must redirect to iOS app store | [link](/pages/deep-linked-ads/google-video-ads/#video-app-install-ads)
Android | Yes | Uses tracking template, must redirect to Google Play store | [link](/pages/deep-linked-ads/google-video-ads/#video-app-install-ads)

{! ingredients/deep-linked-ads/link-to-google-ads-overview.md !}

## Setup

!!! warning "Prerequisites"
	* [x] To track installs from Google Ads you should [integrate the Branch SDK](/pages/apps/ios/#integrate-branch) into your app.
	* [x] If you want to deep link from your ads directly to content, you should [configure deep link routing](/pages/deep-linking/routing/).
	* [x] Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality.

### Video App Install Ads

#### Create an Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)s `Create Google Adwords Link` button under the Google Adwords Partner and select `Create Display Link`

	![Create Display Link](/img/pages/deep-linked-ads/reusable-images/create-display-search.png)

1. Under the Define Section, pick a Link Name for later reference
1. Configure the link with the Ad Format set to **Display** and the Ad Partner set to **Google Adwords**.

	![Create Ad Link](/img/pages/deep-linked-ads/google-video/link-setup.png)

1. Under the Configure Options tab, navigate to the Redirects sub section and ensure that the iOS/Android redirect is set to the desired app being promoted by the ad campaign.

	![Create Ad Link](/img/pages/deep-linked-ads/reusable-images/example-link-redirect.png)

1. Under the Analytics Tags sub section additional tags can be set. It is recommended to fill in these fields as they can be used as filters in Branch's Ads Analytics view. To best connect your ad link with your Adwords Campaign, set the channel field to Google Adwords and set the campaign field to the same ad campaign name used in Adwords.

![Analytics Tags](/img/pages/deep-linked-ads/reusable-images/adwords-analytics-tags.png)

!!! note "Optional: Deep Link Data"
	You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing](/pages/deep-linking/routing/) page to learn more.

!!! tip "Setting Attribution Windows"
	You can specify the attribution windows for your links either at an overall account or per link level. Use these windows to accurately measure attribution data for your Branch links. Refer to [Changing attribution windows](/pages/deep-linked-ads/branch-universal-ads/#change-attribution-windows) for instructions.

#### Configure an Ad

To set up a Video Campaign, you will need to first create your campaign and then setup a tracking template on the ad. Additional Adwords information on Video campaigns can be found **[here](https://support.google.com/adwords/answer/6340491?hl=en){:target="_blank"}**. To set up a Video App Install campaign, you must first complete the entire creation flow for the campaign and ad on Google Adwords.

#### Create Your Campaign

1. Select `Video` on Adwords

	<img src="/img/pages/deep-linked-ads/reusable-images/adwords-video-network.png" alt="Adwords Network" class="half center">

1. Select the 'Mobile app installs' campaign type

	![Adwords Setup](/img/pages/deep-linked-ads/google-video/install/video-install.png)

1. Complete the rest of the ad campaign setup

#### Ad Creation

!!! warning "Video Discovery Ad Support"
	As of June 2017, Adwords does not support Tracking Templates on Video discovery ads. This means Branch links won't work for this specific ad type.

1. Navigate to the Video ad to edit on the Adwords portal.
1. Select the ad and select `Edit > Change URL options`.
1. In the Change URL options window, copy and paste your Branch Ad link from the previous section into the Tracking template field and confirm the change.

![Example Link](/img/pages/deep-linked-ads/google-video/full-branch-link.png)

![Example Adwords Config](/img/pages/deep-linked-ads/google-video/install/configuration-instream.png)

!!! note ""
	Because the video ad directly links to the App store to install the app, Branch links can't be used as the video link directly. However, capturing installs and deep linking users through content is still possible due to the **Tracking template** configuration.

### Video Standard Ads

#### Create an Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management)'s `Create Google Adwords Link` button under the Google Adwords Partner and select `Create Display Link`
<img src="/img/pages/deep-linked-ads/reusable-images/create-link-display.png" alt="Link Creation" class="three-quarters center">
1. Under the Define Section, pick a Link Name for later reference
1. Configure the link with the Ad Format set to **Display** and the Ad Partner set to **Google Adwords**.
![Create Ad Link](/img/pages/deep-linked-ads/google-video/link-setup.png)
1. Under the Configure Options tab, navigate to the Redirects sub section and ensure that the iOS/Android redirect is set to the desired app being promoted by the ad campaign.
![Create Ad Link](/img/pages/deep-linked-ads/reusable-images/example-link-redirect.png)
1. Under the Analytics Tags sub section additional tags can be set. It is recommended to fill in these fields as they can be used as filters in Branch's Ads Analytics view. To best connect your ad link with your Adwords Campaign, set the channel field to Google Adwords and set the campaign field to the same ad campaign name used in Adwords.
![Analytics Tags](/img/pages/deep-linked-ads/reusable-images/adwords-analytics-tags.png)

!!! note "Optional: Deep Link Data"
	You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing](/pages/deep-linking/routing/) page to learn more.

!!! tip "Setting Attribution Windows"
	You can specify the attribution windows for your links either at an overall account or per link level. Use these windows to accurately measure attribution data for your Branch links. Refer to [Changing attribution windows](/pages/deep-linked-ads/branch-universal-ads/#change-attribution-windows) for instructions.

#### Configure an Ad

To set up a Video Campaign, you will need to first create your campaign and then setup a tracking template on the ad. Additional Adwords information on Video campaigns can be found **[here](https://support.google.com/adwords/answer/6340491?hl=en){:target="_blank"}**.

#### Create Your Campaign

1. Select `Video` on Adwords

	<img src="/img/pages/deep-linked-ads/reusable-images/adwords-video-network.png" alt="Adwords Network" class="half center">

1. Select the 'Standard' campaign type

	![Adwords Setup](/img/pages/deep-linked-ads/google-video/standard/video-standard.png)

1. Complete the rest of the campaign and ad group setup

#### Ad Creation

!!! warning "Video Discovery Ad Support"
	As of June 2017, Adwords does not support Tracking Templates on Video discovery ads. This means Branch links won't work for this specific ad type.

1. On the ad creation section, select your desired Video ad format and fill in the **Final URL** field with the final website URL of your ad
1. Locate the `Ad URL options (advanced)` section and expand it. Now copy your Branch Ad link from the previous step into the **Tracking Template** field.

	![Example Link](/img/pages/deep-linked-ads/google-video/full-branch-link.png)

#### Instream Video Setup

![Example Adwords Config](/img/pages/deep-linked-ads/google-video/standard/configuration-instream.png)

#### Bumper Video Setup

![Example Adwords Config](/img/pages/deep-linked-ads/google-video/standard/configuration-bumper.png)

!!! note ""
	Because the video ad directly links to the App store to install the app, Branch links can't be used as the video link directly. However, capturing installs and deep linking users through content is still possible due to the **Tracking template** configuration.

{! ingredients/deep-linked-ads/view-ad-link-data.md !}

#### Troubleshooting

{! ingredients/deep-linked-ads/adwords-valuetrack-info.md !}

**Q: Why is my advertisement being disapproved on Adwords?**

**A:** For Video Campaigns, sometimes your ad may be disapproved if the Branch link does not re-direct to Google Play or App Store when clicked on a desktop. Please ensure that for the Branch link you're using to track installs, Deepviews are disabled and a desktop redirect is set to either the App / Play store.

For Cross Platform campaigns, sometimes your ad may be disapproved if the Branch link does not re-direct to your Final destination URL specified in the ad. Please ensure that your Branch link redirects to your Final URL specified in your ad. To ensure install tracking is functional please ensure that for the Branch link you're using to track installs, Deepviews are disabled and your Branch link's iOS/Android redirects are set to their respective App / Play Store.

**Q: Why can't I use a Branch link in a Video discovery ad?**

**A:** As of June 2017, Adwords does not support Tracking Templates on Video discovery ads. This means Branch links won't work for this specific ad type. However, we're working on support in the future and will update these docs accordingly.
