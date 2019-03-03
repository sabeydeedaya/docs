
<script>window.location = "/pages/deep-linked-ads/google-ads-overview/"</script>

---
title: Google Shopping Ads
description: A guide to using Branch in Google Shopping Ad Campaigns
path: tree/master/src/pages/deep-linked-ads
source: google-shopping-ads.md
---
# Google Shopping Ads

## Overview

This guide will walk through how to use Branch links in a Google Shopping Ads feed stored in Merchant Center.

This documentation supports the following Google Campaign types:

Google Campaign | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Shopping | Web and App Purchases | Cross Platform

#### OS Support and Major Differences

Operating System | Supported by AdWords Shopping Ads? | Key Differences
--- | --- | ---
iOS | Yes | Uses Branch link, must redirect to web
Android | Yes | Uses Branch link, must redirect to web
Web | Yes | Uses Branch link, must redirect to web

{! ingredients/deep-linked-ads/link-to-google-ads-overview.md !}

## Setup

!!! warning "Prerequisites"
	* [x] To track installs from Google Ads you should [integrate the Branch SDK](/pages/apps/ios/#integrate-branch) into your app.
	* [x] If you want to deep link from your ads directly to content, you should [configure deep link routing](/pages/deep-linking/routing/).
	* [x] Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality.

{! ingredients/deep-linked-ads/enable-google-ad-partner.md !}

### Feed Creation

#### Manual Method

If you need more customization for any reason, you can also convert your feed manually.

1. Tell your Branch account manager, or support@branch.io, that you'd like to use Google Shopping Ads so they can enable your account.
1. Find your Branch base domain by going to the [Link Settings Page](https://branch.dashboard.branch.io/link-settings) of your Branch Dashboard.
<img src="/_assets/img/pages/dashboard/link-domain.png" alt="Link Domain" class="three-quarters center">
1. Take the link in the `link` column of your existing product feed, and URL encode it.
1. Prepend the encoded link from the previous step with your Branch base domain and the following parameters:
```3p?$3p=a_google_adwords&~advertising_partner_name=Google%20AdWords&~campaign_id={campaignid}&~ad_set_id={adgroupid}&~keyword_text={keyword}&~placement={placement}&$original_url=```

For example, if your Branch base domain was `example.app.link`, your initial link:

```https://www.example.com/?foo=bar```

Would become:

```https://example.app.link/3p?$3p=a_google_adwords&~advertising_partner_name=Google%20AdWords&~campaign_id={campaignid}&~ad_set_id={adgroupid}&~keyword_text={keyword}&~placement={placement}&$original_url=https%3A%2F%2Fwww.example.com%2F%3Ffoo%3Dbar&~campaign=GoogleShoppingCampaign```

Finally, replace the column `adwords_redirect` in your feed with the resulting link (create the column if it is absent). Repeat for each row in your feed.

!!! note "Include all link data"
    If you want to track analytics in Branch, and you want to deep link to specific content in the app, be sure to append all necessary parameters, including deep link data and analytics tags, to the end of the link as URI encoded query parameters. In the example above, the customer uses `$original_url` as their deep link key, and `~campaign` to set the campaign name that will appear in analytics.

Now that you have your feed, it's time to upload it to Google Merchant Center and use it in an Adwords Campaign.

### Using Your Feed

!!! warning "Prerequisites"
	* [x] Be sure you have both a Google Adwords account, and a Google Merchant Center account, and that the two accounts are linked.

#### Uploading to Google Merchant Center

1. In Google Merchant Center, navigate to `Products` then `Feeds`.
<img src="/_assets/img/pages/deep-linked-ads/google-xplatform-shopping-ads/google-merchant-center-home.png" alt="Merchant Center Home" class="three-quarters center">
1. Click the large blue plus button to add a new feed.
1. Follow the prompts to name your feed, select feed language, and upload or connect your feed.
1. Once your feed has been created, Merchant Center will take a few minutes to process it. Once that has finished, you're feed is ready to be used in your Adwords campaigns.

#### Using your Merchant Center Feed in Adwords

1. In your Adwords dashboard, navigate to the All Campaigns page.
<img src="/_assets/img/pages/deep-linked-ads/google-xplatform-shopping-ads/google-adwords-campaign-view.png" alt="AdWords Campaign View" class="three-quarters center">
1. Click the red campaign button, and create a new Shopping Campaign.
1. On the Shopping Ads Setup page, make sure the correct Merchant Identifier is selected (this should match the value in your Merchant Center Dashboard).
<img src="/_assets/img/pages/deep-linked-ads/google-xplatform-shopping-ads/google-adwords-merchant-identifier.png" alt="AdWords Merchant Identifier" class="three-quarters center">
1. Complete the ad configuration and name your ad group.
1. You should see your new Campaign and Ad Group.

Adwords will automatically pull products from your Primary Feeds defined in Google Merchant Center for these Shopping campaigns.

{! ingredients/deep-linked-ads/view-ad-link-data.md !}

## Troubleshooting

{! ingredients/deep-linked-ads/adwords-valuetrack-info.md !}

#### FAQ / Debugging

**Q: Why is my feed not being approved in Google Merchant Center?**

**A:** Take not of the warnings shown. Often these errors come from incorrect formatting of the original feed. Additionally, make sure your site ownership has been verified on Google Merchant Center.
