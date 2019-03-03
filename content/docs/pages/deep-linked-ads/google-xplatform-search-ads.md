<script>window.location = "/pages/deep-linked-ads/google-ads-overview/"</script>

---
title: Google Search Network Ads
description: A guide to using Branch in Adwords Search Network Campaigns.
path: tree/master/src/pages/deep-linked-ads
source: google-xplatform-search-ads.md
---
# Google Search Network Ads

## Overview

If you're running Google AdWords Search Network ads, you'll find everything you need right here.

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Search Network | Standard | Cross-platform Search
Search Network | Dynamic Search Ads | Cross-platform Search

#### OS Support and Major Differences

Operating System | Supported by AdWords Search Network Ads? | Key Differences | Documentation
--- | --- | --- | ---
Web | Yes | Uses tracking template, must redirect to to Final Website | [link](/pages/deep-linked-ads/google-xplatform-search-ads/#standard-search-ads)
iOS | Yes | Uses tracking template, must redirect to iOS app store | [link](/pages/deep-linked-ads/google-xplatform-search-ads/#standard-search-ads)
Android | Yes | Uses tracking template, must redirect to Google Play store | [link](/pages/deep-linked-ads/google-xplatform-search-ads/#standard-search-ads)

{! ingredients/deep-linked-ads/link-to-google-ads-overview.md !}

## Setup

!!! warning "Prerequisites"
	* [x] To track installs from Google Ads you should [integrate the Branch SDK](/pages/apps/ios/#integrate-branch) into your app.
	* [x] If you want to deep link from your ads directly to content, you should [configure deep link routing](/pages/deep-linking/routing/).
	* [x] Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality.

### Standard Search Ads

#### Create an Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management){:target="\_blank"}'s `Create Google Adwords Link` button under the Google Adwords Partner and select `Create Search Link`
<img src="/img/pages/deep-linked-ads/reusable-images/create-link-search.png" alt="Link Creation" class="three-quarters center">
1. Under the Define Section, pick a Link Name for later reference
1. Configure the link with the Ad Format set to **Search** and the Ad Partner set to **Google Adwords**.
![Create Ad Link](/img/pages/deep-linked-ads/google-xplatform-search-ads/link-setup.png)
1. Under the Configure Options tab, navigate to the Redirects sub section and ensure that the Web redirect is set to the desired final website promoted by the ad campaign.
![Create Ad Link](/img/pages/deep-linked-ads/reusable-images/example-link-redirect.png)
1. Under the Analytics Tags sub section additional tags can be set. It is recommended to fill in these fields as they can be used as filters in Branch's Ads Analytics view. To best connect your ad link with your Adwords Campaign, set the channel field to Google Adwords and set the campaign field to the same ad campaign name used in Adwords.
![Analytics Tags](/img/pages/deep-linked-ads/reusable-images/adwords-analytics-tags.png)

!!! note "Optional: Deep Link Data"
	You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing](/pages/deep-linking/routing/) page to learn more.

!!! tip "Setting Attribution Windows"
	You can specify the attribution windows for your links either at an overall account or per link level. Use these windows to accurately measure attribution data for your Branch links. Refer to [Changing attribution windows](/pages/deep-linked-ads/branch-universal-ads/#change-attribution-windows) for instructions.

#### Configure an Ad

To set up a Search Network Campaign, you will need to first create your campaign and then setup a tracking template on the ad. Additional Adwords information on Search Network campaigns can be found **[here](https://support.google.com/adwords/answer/6340430?hl=en){:target="_blank"}**.

#### Create Your Campaign

1. Select `Search Network only` on Adwords
<img src="/img/pages/deep-linked-ads/reusable-images/adwords-search-network.png" alt="Adwords Network" class="half center">
1. Select the `Standard` campaign type
![Adwords Setup](/img/pages/deep-linked-ads/google-xplatform-search-ads/standard/adwords-search-standard.png)
1. Continue setting the campaign and ad group parameters

#### Ad Creation

1. For Standard Search Ads first copy your generated Branch Ad link from the previous section.
1. In the ad editor, locate the `Ad URL options (advanced)` section and expand it. Now paste your link into the **Tracking Template** field.
*Note: The `Ad URL options (advanced)` may not be available in the campaign set up procedure. In this case, finish setting up the campaign and then access the ad editor after for access to the advanced URL options.*

![Example Link](/img/pages/deep-linked-ads/google-xplatform-search-ads/full-branch-link.png)

![Example Adwords Config](/img/pages/deep-linked-ads/google-xplatform-search-ads/standard/adwords-configuration.png)

!!! note ""
	Because the **Final URL** for your app install campaigns must match your app store domain, you cannot put a Branch link in that box. However, capturing installs and deep linking users through content is still possible due to the **Tracking template** configuration.

### Dynamic Search Ads

#### Create an Ad Link

1. Create a Branch Ad link from the [Partner Management page](https://dashboard.branch.io/ads/partner-management){:target="\_blank"}'s `Create Google Adwords Link` button under the Google Adwords Partner and select `Create Search Link`
<img src="/img/pages/deep-linked-ads/reusable-images/create-link-search.png" alt="Link Creation" class="three-quarters center">
1. Under the Define Section, pick a Link Name for later reference
1. Configure the link with the Ad Format set to **Search** and the Ad Partner set to **Google Adwords**.
![Create Ad Link](/img/pages/deep-linked-ads/google-xplatform-search-ads/link-setup.png)
1. Under the Configure Options tab, navigate to the Redirects sub section and ensure that the Web redirect is set to the desired final website promoted by the ad campaign.
![Create Ad Link](/img/pages/deep-linked-ads/reusable-images/example-link-redirect.png)
1. Under the Analytics Tags sub section additional tags can be set. It is recommended to fill in these fields as they can be used as filters in Branch's Ads Analytics view. To best connect your ad link with your Adwords Campaign, set the channel field to Google Adwords and set the campaign field to the same ad campaign name used in Adwords.
![Analytics Tags](/img/pages/deep-linked-ads/reusable-images/adwords-analytics-tags.png)

!!! note "Optional: Deep Link Data"
	You can use this configuration section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing](/pages/deep-linking/routing/) page to learn more.

!!! tip "Setting Attribution Windows"
	You can specify the attribution windows for your links either at an overall account or per link level. Use these windows to accurately measure attribution data for your Branch links. Refer to [Changing attribution windows](/pages/deep-linked-ads/branch-universal-ads/#change-attribution-windows) for instructions.

#### Configure an Ad

To set up a Dynamic Search Network Campaign, you will need to first create your campaign and then setup a tracking template on the ad. Additional Adwords information on Dynamic Search campaigns can be found **[here](https://support.google.com/adwords/answer/2471185?hl=en){:target="_blank"}**.

#### Create Your Campaign

1. Select `Search Network only` on Adwords
<img src="/img/pages/deep-linked-ads/reusable-images/adwords-search-network.png" alt="Adwords Network" class="half center">
1. Select the `Dynamic Search Ads` campaign type
![Adwords Setup](/img/pages/deep-linked-ads/google-xplatform-search-ads/dynamic/adwords-search-dynamic.png)
1. Set the **Website** field to equal to the final website that the dynamic ads will route to. This should be the same website that your Branch link redirects to on desktop.
![Adwords Final Website](/img/pages/deep-linked-ads/google-xplatform-search-ads/dynamic/final-website.png)
1. Continue setting the campaign and ad group parameters

#### Ad Creation

1. In the ad editor, locate the `Ad URL options (advanced)` section and expand it. Now copy your Branch Ad link from the previous step into the **Tracking Template** field.

![Example Link](/img/pages/deep-linked-ads/google-xplatform-search-ads/full-branch-link.png)

![Example Adwords Config](/img/pages/deep-linked-ads/google-xplatform-search-ads/dynamic/adwords-configuration.png)

!!! note ""
	Because the **Final URL** for your app install campaigns must match your app store domain, you cannot put a Branch link in that box. However, capturing installs and deep linking users through content is still possible due to the **Tracking template** configuration.

{! ingredients/deep-linked-ads/view-ad-link-data.md !}

## Troubleshooting

#### FAQ / Debugging

{! ingredients/deep-linked-ads/adwords-valuetrack-info.md !}

**Q: Why is my advertisement being disapproved on Adwords?**

**A:** For Cross Platform campaigns, sometimes your ad may be disapproved if the Branch link does not re-direct to your Final destination URL specified in the ad. Please ensure that your Branch link redirects to your Final URL specified in your ad. To ensure install tracking is functional please ensure that for the Branch link you're using to track installs, Deepviews are disabled and your Branch link's iOS/Android redirects are set to their respective App / Play Store.
