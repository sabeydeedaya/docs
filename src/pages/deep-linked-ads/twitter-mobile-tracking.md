## Overview

![Twitter_Ads](https://cdn.branch.io/branch-assets/ad-partner-manager/386574786681131050/a_twitter-1528518381508.png)


Twitter App Install and Engagement campaigns are under review and are not currently supported. Please reach out to your Account Manager for more information.

The steps below show how to create a Twitter Ad Link for use in *web* campaigns only.


## Setup

### Prerequisites

To track installs from Twitter you should integrate the Branch SDK into your app. If you want to deep link from your ads directly to content, you should configure deep link routing.

### Enable Twitter as an ad partner

1. Visit the [Ads page](https://dashboard.branch.io/ads) on the Branch dashboard.
2. Select [Partner Management](https://dashboard.branch.io/ads/partner-management) from the sidebar.
3. Search for Twitter and click **Save and Enable** in the bottom right hand corner. 

    ![image](/img/pages/deep-linked-ads/twitter/find-twitter.png)

### Create an ad link

Once you've enabled an Twitter, it's time to create a tracking link.

1. Select **Cross-Platform Display** from the dropdown

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/choose-ad-format.png)

1. At this point you need to name your link. Select something that will make it easy to find if you need it later. Click **Configure Options** to continue.

    ![image](/img/pages/deep-linked-ads/twitter/twitter-ad-link.png)

1. Set all redirects to your website URLs.

1. This is your chance to add deep link data and analytics tags. Analytics tags are important for later segmentation, so click the **Analytics** sub tab to add a Channel and Campaign value.

    ![image](/img/pages/deep-linked-ads/twitter/configure-twitter-link.png)

    !!! tip "Set Analytics tags"

        It's easier to slice your data in our analytics platform if you properly assign analytics parameters to your link. _Channels_ generally correspond to ad networks, and _Campaigns_ correspond to marketing initiatives that you're launching. For example: _Channel_: "Twitter", _Campaign_: "Summer 2017 Shoe Discounts."

1. Click **Create Link Now**, and you have your tracking link! Take this link and follow the instructions below.

## Configure ad campaign on Twitter

![image](/img/pages/deep-linked-ads/twitter/twitter_screenshot_0.png)

### Select campaign type

Go to Twitter and set up a new ad campaign. When selecting the campaign type that you want, select **Website Clicks or Conversions**.

### Set the device targeting

Set the device targeting as desired.

### Enter Branch Ad Link

On the ad creation card, enter the Branch Quick Link you created in the **Website URL** field.

![image](/img/pages/deep-linked-ads/twitter/twitter_screenshot_1.png)


### View your data with People-Based Attribution

The [Ads Analytics Page](https://dashboard.branch.io/ads/analytics) on the Branch dashboard shows the performance of your ad campaigns _across both web and app_. You can view performance over time, including purchase and other custom events.

Events are attributed using Branch's unified last-click attribution model. This means that Branch will attribute to the last click across channels, and across platforms.

For example, if a customer clicks a Branch email link, and then clicks an ad, installs the the app and purchases an item, Branch will attribute the install and the purchase to the last clicked ad link.

If the customer then goes on to purchase an item on web within the attribution window, Branch will also attribute the web purchase to the same ad link, connecting the web and app actions taken by a single user for a more accurate view of your marketing channels and customer behavior.

![image](/img/pages/deep-linked-ads/branch-universal-ads/install-by-secondary-pub.png)

You can read more about [People-Based Attribution here](/pages/dashboard/people-based-attribution/).

