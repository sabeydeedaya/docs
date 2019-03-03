---
title: Facebook Dynamic Ads
description: An overview page of using Branch in Facebook Dynamic Ad campaigns.
path: tree/master/src/deep-linked-ads
source: facebook-dynamic-ads.md
---
# Facebook Dynamic Ads

## Overview

Branch links can be used in conjunction with Facebook's dynamic advertisements. Dynamic remarketing campaigns on desktop have been proven to deliver 16x return on ad spend. Now you can easily set up Facebook Dynamic Ads on mobile to drive incredible results.

Note: This documentation applies for Ad placements across Facebook and the Audience Network.

This documentation supports the following Facebook Ad Campaign types:

Facebook Campaign Category | Campaign Type/Objective | Branch Ad Format
--- | --- | ---
Conversion | Product Catalogue Sales | Cross-platform Product Links

#### Facebook Campaign Advert Format Support Table

Facebook Campaign Type | Photo | Video | Carousel | Slideshow | Collection | Dynamic | Canvas
--- | --- | --- | --- | --- | --- | --- | ---
Product Catalogue Sales | ✔︎ |  | ✔︎ |  |  |  |

{! ingredients/deep-linked-ads/link-to-facebook-ads-overview.md !}

!!! warning "Prerequisites"
	* [x] To track installs from Facebook Ads you should [integrate the Branch SDK](/apps/ios/#integrate-branch) into your app.
	* [x] To use Branch links in Facebook App Install Ads ensure you have Universal Links set up on iOS or App Links enabled on Android to ensure correct routing behavior. For setup, checkout [Universal](/deep-linking/universal-links/) and [App Links](/deep-linking/android-app-links/).
	* [x] If you want to deep link from your ads directly to content, you should [configure deep link routing](/deep-linking/routing/).
	* [x] Use [Branch Deep Linked Feeds](/deep-linked-ads/dynamic-product-feeds/) to create your Facebook Dynamic Ad compatible deep links.
	* [x] Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality.

{! ingredients/deep-linked-ads/enable-facebook-ad-partner.md !}

## Setup

#### Create a Deep Linked Ad Feed

Branch makes it easy for you to create and manage feeds with Facebook-compatible deep links.

1. Create a Branch Deep Linked Ad Feed from the [Partner Management page](https://dashboard.branch.io/ads/partner-management){:target="_blank"}'s `Create Ad Link` button under the Facebook Partner and select `Create Product Link`
<img src="/_assets/img/pages/deep-linked-ads/reusable-images/create-link-product.png" alt="Link Creation">
1. Enter a Deep Linked Feed Name.
1. Enter a already set up feed source or upload a new source.
1. Configure the feed with the Ad Partner set to **Facebook**, and the Ad Format set to **Product**.
![Ad Link Setup](/_assets/img/pages/deep-linked-ads/facebook-dynamic-ads/feed-setup.png)
1. On the next section, select any keys from your feed that you'd like to include in the deep linked data contained in the generated links.
<img src="/_assets/img/pages/deep-linked-ads/facebook-dynamic-ads/feed-keys-setup.png">
1. If you used a Feed Source hosted on a URL (recommended), you will see two options for accessing your feed. We recommend selecting “Schedule Refresh.” If you select this option, Branch will host a URL for your Deep Linked Feed that will update itself from your Feed Source URL at regular intervals.
<img src="/_assets/img/pages/deep-linked-ads/facebook-dynamic-ads/hosted-dlf.png">
1. Download the feed data or copy the deep linked feed URL (for hosted feeds) to be used in your Ad Campaign.

#### Upload your feed to Facebook

To set up a Facebook Product Catalogue campaign, you will need to first create your campaign and use a Branch link as the Deep Link URL for the advertisements. Facebook Dynamic Ads information is available **[here](https://www.facebook.com/business/help/455326144628161){:target="_blank"}**.

!!! info
    Branch accepts Feed Sources that are compatible with Facebook’s [feed format](https://developers.facebook.com/docs/marketing-api/dynamic-product-ads/product-catalog#feed-format). Please use [Facebook’s Product Feed Debug Tool](https://business.facebook.com/ads/product_feed/debug) to test and debug your Product Feed format.

    While Branch requires you have at least a column for the field `link` in your Feed Source containing the link to the merchant's site where the item can be bought, Facebook requires several more fields. Please make sure you've included all of [these fields](https://developers.facebook.com/docs/marketing-api/dynamic-product-ads/product-catalog#required-fields) in your product feed.

    The largest file size accepted by the tool is 50MB. Please contact [integrations@branch.io](mailto:integrations@branch.io) if you need to upload a larger file.

1. Navigate to your [Facebook Ads Manager](https://www.facebook.com/ads/manager/){:target="_blank"}.
1. In the top left hand corner, click into the menu, select **All tools**, and select **Product Catalogues**.
![Facebook Product Catalogues](/_assets/img/pages/deep-linked-ads/facebook-dynamic-ads/fb-product-catalogs.png)
1. From the drop down menu click "Create new catalog...", name it (remember this name, you'll need it later) and select "Products sold online".
<img src="/_assets/img/pages/deep-linked-ads/facebook-dynamic-ads/create-new-catalog.png" alt="Facebook Create New Product Catalogue">
1. Now that you have a product catalog, you can add a new feed. Click "Add Product Feed."
![Add New Feed](/_assets/img/pages/deep-linked-ads/facebook-dynamic-ads/add-new-feed.png)
1. If you have a [Hosted Deep Linked Feed](/features/deep-linked-feeds/guide/#schedule-refresh){:target="_blank"} (recommended), select the option "Scheduled recurring uploads." Paste your Branch-provided URL into the **Feed URL** text field.
![Feed URL option](/_assets/img/pages/deep-linked-ads/facebook-dynamic-ads/new-feed-settings.png)
![Feed URL settings](/_assets/img/pages/deep-linked-ads/facebook-dynamic-ads/upload-feed-url.png)
1. If you've created a Deep Linked Feed CSV file to upload, select the option "Single upload: Upload a single file feed now." Select the Deep Linked Feed URL or CSV file you would like to upload to Facebook, and click "Upload".
![Feed Uploaded](/_assets/img/pages/deep-linked-ads/facebook-dynamic-ads/successful-feed-upload.png)
1. Wait for the upload to complete successfully. If you'd like to create a "Product set" (a subset of products in your catalog for use in specific ad sets) you can do that now.

#### Setting up App Events and the Facebook Pixel

Facebook requires you to report events about your users interacting with your content, for example: viewing, adding to cart, and purchasing. To add the Facebook Pixel to your website, and event tracking using the Branch SDK (which forwards to Facebook) to your app, follow these instructions:

- [Sending App Events with the Branch SDK](/deep-linked-ads/facebook-ads-faq/#tracking-other-conversion-events)
- [Sending Web Events with the Facebook Pixel](https://developers.facebook.com/docs/marketing-api/facebook-pixel/v2.8){:target="_blank"}

Use the "Product events" tab in your Product Catalog view to ensure that Facebook is registering the events against your Product Catalog items correctly.

#### Creating a Dynamic Ad Campaign

1. Navigate to [https://www.facebook.com/ads/create](https://www.facebook.com/ads/create){:target="_blank"} while logged in to the account that owns your Facebook app.
1. Choose **Product Catalog Sales**. Select the Product Catalog to which you uploaded your Deep Linked Feed.
![Feed Uploaded](/_assets/img/pages/deep-linked-ads/facebook-dynamic-ads/campaign-selection.png)
1. Select the targeting, bid, budget and placements that you'd like.
1. Select your desired ad format and launch your campaign. The Branch deep linked feed will be automatically set up in your Facebook product catalogue ads.

!!! note "Driving Installs with Dynamic Ads"
	By default, Facebook sends customers without the app to your mobile website. To drive installs, you can send customers without your app the app store by adding a `web_should_fallback` column to your Feed Source and setting each row to `false`. Then, after you've created your campaign, edit the ad within your ad set. Under "Creative," set your "App link destination" to "Deep link, app store backup."

{! ingredients/deep-linked-ads/view-fb-link-data.md !}

## Troubleshooting

{! ingredients/deep-linked-ads/fb-ads-support.md !}
