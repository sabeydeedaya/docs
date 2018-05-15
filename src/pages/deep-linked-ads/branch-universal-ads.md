## Overview

Branch Universal Ads help you drive results for web and app campaigns.

- Create Ad Links with tracking parameters and deep linking
- Enable Ad Partners to send them preconfigured conversion postbacks
- View ad performance with web and app analytics

!!! note "Paid Product"
    Ads is a premium product priced on Monthly Active Users. [Sign up](https://branch.io/universal-ads/) for the Ads product to enable this functionality.

### Ad Partners

Here is a list of integrated [Ad Partners](/pages/ad-networks/ad-networks-list/).

## Setup

### Prerequisites

To track installs from Ads you should integrate the Branch SDK into your app. If you want to deep link from your ads directly to content, you should configure deep link routing.

### Enable an ad partner

1. Visit the [Ads page](https://dashboard.branch.io/ads) on the Branch dashboard.
2. Select [Partner Management](https://dashboard.branch.io/ads/partner-management) from the sidebar.
3. Search for the Ad Partner that you'd like to enable.

![image](/img/pages/deep-linked-ads/branch-universal-ads/find-applovin.png)

4. Enter any credentials that may be required, and click **Save and Enable** in the bottom right hand corner.

![image](/img/pages/deep-linked-ads/branch-universal-ads/save-and-enable.png)

!!! tip "Enable postbacks"
    Basic postbacks will automatically be activated for events like _Install_ and _Purchase_ when you enable your ad partner. You can then [add additional postbacks](#adding-more-postbacks), for example, if you wanted to add postbacks for custom events that are specific to your app like _Account Created_. You can also [edit postbacks](#advanced-editing-postbacks) if there's additional data you really need to pass along to your ad partner.

### Create an ad link

Once you've enabled an ad partner, it's time to create a tracking link.

1. First, select an ad format. For App Install or App Engagement campaigns you'll want to select the **App Only** format. For Search or Display campaigns where the user should go to web if they don't have the app, then you should select **Cross-Platform Search** or **Cross-Platform Display**. **Product Links** are for shopping or dynamic remarketing campaigns and will take you to create a Deep Linked Product Feed.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/choose-ad-format.png)

1. At this point you need to name your link. Select something that will make it easy to find if you need it later. Your Ad Format and Ad Partner should be selected already, but feel free to choose one if they aren't. It's important that you select the right Ad Partner for analytics later on. Click **Configure Options** to continue.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/name-ad-link.png)

1. This is your chance to add deep link data and analytics tags. Analytics tags are important for later segmentation, so click the **Analytics** sub tab to add a Channel and Campaign value.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/add-analytics-tags.png)

    !!! tip "Set Analytics tags"

        It's easier to slice your data in our analytics platform if you properly assign analytics parameters to your link. _Channels_ generally correspond to ad networks, and _Campaigns_ correspond to marketing initiatives that you're launching. For example: _Channel_: "YouTube", _Campaign_: "Summer 2017 Shoe Discounts."

1. Click **Create Link Now**, and you have your tracking link! Take this link and give it to your Ad Partner's Account Manager or paste it into the tracking section of your campaign yourself.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/finished-ad-link.png)

### View your data with People-Based Attribution

The [Ads Analytics Page](https://dashboard.branch.io/ads/analytics) on the Branch dashboard shows the performance of your ad campaigns _across both web and app_. You can view performance over time, including purchase and other custom events.

Events are attributed using Branch's unified last-click attribution model. This means that Branch will attribute to the last click across channels, and across platforms.

For example, if a customer clicks a Branch email link, and then clicks an ad, installs the the app and purchases an item, Branch will attribute the install and the purchase to the last clicked ad link.

If the customer then goes on to purchase an item on web within the attribution window, Branch will also attribute the web purchase to the same ad link, connecting the web and app actions taken by a single user for a more accurate view of your marketing channels and customer behavior.

![image](/img/pages/deep-linked-ads/branch-universal-ads/install-by-secondary-pub.png)

You can read more about [People-Based Attribution here](/pages/dashboard/people-based-attribution/).

### View-Through Attribution with Impression Pixels

View-through attribution allows you to track installs, session starts and conversion events back to an ad impression, even if the ad was never clicked on. Our view-through attribution logic is currently as follows for any given event:

- If there's a click within a valid attribution window, give credit to the click.
- If there's no click within a valid attribution window, give credit to the last impression that was within a valid attribution window.

Currently, impression pixels are only supported with server to server tracking, so server to server macros and device IDs are required when using impression pixels. To create a pixel, simply [create an ad link](#create-an-ad-link), and grab the pixel from the final step of link creation.

!!! tip "Impression Pixel Formatting"

        Make sure the impression pixel returned by Branch's dashboard has `%24s2s=true` and an `%24idfa` or `%24aaid` macro. If you have questions, just contact integrations@branch.io.

## Advanced

### Add more postbacks

When you enable an ad partner, your ad partner postbacks can be found under the **Postbacks** tab for that ad partner. It's easy to add additional postbacks.

![image](/img/pages/deep-linked-ads/branch-universal-ads/postbacks-tab.png)

1. Click the **Add New Postback** button at the bottom of the screen.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/add-new-postback-button.png)

1. A modal will appear with Branch default events, as well as any commerce or custom events you've set up. Select an event, enter a postback URL if you're asked to, and click **Save**. This will be the event that triggers your new postback.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/add-new-postback-modal.png)

### Edit postbacks

For advanced integrations, you may want to provide additional information in your postback that isn't there by default. You can edit postbacks by following our [postback templating instructions](/pages/exports/ua-webhooks/#templating-your-postback-url), then clicking save. The postbacks in the Universal Ads interface follow the same syntax as Webhooks in Data Feeds. When the postback is saved, it is then validated - if you enter an invalid postback, you'll get an error at the top of your screen.

!!! tip "Reset Postbacks"

    We all make mistakes from time to time. If you need to reset your postbacks and your credentials, navigate to the **Account Settings** tab and look for the **Reset all settings** button. Be careful though! This will disable the ad partner, clear out all credentials and postbacks that you've set up, and return the ad partner to its basic configuration. You can then start afresh.

### Change attribution windows

Attribution windows can be specified at the global account level or on a per link basis with the link level window taking priority. See the below instructions for setup.

For customer experience and data accuracy, please do not set your deep linking window longer than the other attribution windows.

#### Account Level Attribution Windows

You can edit your attribution windows under Link Settings > Attribution Windows.

   ![image](/img/pages/dashboard/people-based-attribution/attribution-windows.png)

Learn more about account level attribution windows in [People-Based Attribution](/pages/dashboard/people-based-attribution/#attribution-windows).

#### Ad Network Attribution Windows

You can edit your attribution windows at the ad network level, if your ad network requires it. This is recommended when you enable networks like Facebook and Google, who may have different windows for installs. With this, you can preserve your Account Level Attribution Windows, as well.

   ![image](/img/pages/deep-linked-ads/branch-universal-ads/anaw.png)

#### Link Level Attribution Windows

To set attribution windows on a link level, you can append the following parameters to your generated Branch link.

Key | Example Link
--- | ---
$click_install_window_days| https://branchster.app.link/hpNVE52gxE?$click_install_window_days=3
$click_session_start_window_days | https://branchster.app.link/hpNVE52gxE?$click_session_start_window_days=7
$click_conversion_window_days | https://branchster.app.link/hpNVE52gxE?$click_session_start_window_days=30
$impression_install_window_days| https://branchster.app.link/hpNVE52gxE?$impression_install_window_days=3
$impression_session_start_window_days | https://branchster.app.link/hpNVE52gxE?$impression_session_start_window_days=1
$impression_conversion_window_days | https://branchster.app.link/hpNVE52gxE?$impression_session_start_window_days=7

!!! warning "Link Level Attribution Support for Standard Branch links"
    As of July 2017, link level attribution window setting is only available on standard Branch links. Special Branch links such as the ones used for Google's Universal App Campaign or Play Store links with Branch link id parameters are currently not supported.

## Support

### How do I debug a discrepancy?

Navigate to the [Analytics](https://dashboard.branch.io/ads/analytics) page to see data.
