## Overview

Track your [Jampp](https://jampp.com/) campaigns using Universal Ads. Universal Ads provides everything you need for complete tracking.

The basic Jampp integration involves three parts:

1. Integrating the SDKs and tracking in-app events
1. Enabling the integration and selecting postbacks
1. Creating tracking links

## Setup

### Integrating the SDKs and tracking in-app events

The Branch SDKs for iOS and Android allow you to get up and running quickly.  Jampp has some custom configurations to be aware of when you get set up.

If you haven't already integrated Branch, follow the below guides.

1. Start by following the integration guides for Android and iOS:
	- [Android](/pages/apps/android/){:target="\_blank"}
	- [iOS](/pages/apps/ios/){:target="\_blank"}
1. Once this is complete, you can test your basic integration by going to our [Liveview page](https://dashboard.branch.io/liveview/events){:target="\_blank"}. Set a filter for **OPEN** to verify that the Branch SDK is recording app opens.

	!!! warning "Limitations with setDebug and seeing data in Branch"
		When integrating the SDKs, it's often useful to use setDebug to verify that your app is able to communicate with Branch servers, and is receiving deep link data. However, our upstream systems don't register test events sent using setDebug, so events will not appear in Liveview or Analytics, nor will they fire postbacks. You should disable setDebug when looking at Liveview or testing postbacks.
       
#### Track conversion events

Install and open events are automatically tracked using just the Branch SDK integration. However, to track other events, such as purchase events, you'll want to add more tracked events in your app.

Please reference the general Branch V2 Event tracking guide as well as the Jampp specific information below. This will help ensure that you've integrated the right Branch events with the correct metadata, and the postbacks to Jampp will be preconfigured for you.

- [V2 Event Tracking Guide](/pages/apps/v2event/#overview)

!!! note "Testing your events with Liveview"
	You can test your integration by going to our [Liveview page](https://dashboard.branch.io/liveview/events){:target="\_blank"}. Set a filter with the event name to verify that the Branch SDK is recording each event.
  
 
### Enable integration with Jampp

1. Visit the [Ads page](https://dashboard.branch.io/ads) on the Branch dashboard.
2. Select [Partner Management](https://dashboard.branch.io/ads/partner-management) from the sidebar.
3. Search for the Jampp


![image](/img/pages/deep-linked-ads/jampp/jampp1.png)


!!! tip "Enable postbacks"
    Basic postbacks will automatically be activated for events like _Install_ and _Purchase_ when you enable your ad partner. You can then [add additional postbacks](#adding-more-postbacks), for example, if you wanted to add postbacks for custom events that are specific to your app like _Account Created_. You can also [edit postbacks](#advanced-editing-postbacks) if there's additional data you really need to pass along to your ad partner.

### Create an ad link

Once you've enabled an integration with Jampp, it's time to create a tracking link.

1. First, select an ad format. For App Install or App Engagement campaigns you'll want to select the **App Only** format. For Search or Display campaigns where the user should go to web if they don't have the app, then you should select **Cross-Platform Search** or **Cross-Platform Display**. **Product Links** are for shopping or dynamic remarketing campaigns and will take you to create a Deep Linked Product Feed.

    ![image](/img/pages/deep-linked-ads/jampp/jampp2.png)

1. At this point you need to name your link. Select something that will make it easy to find if you need it later. Your Ad Format and Ad Partner should be selected already, but feel free to choose one if they aren't. It's important that you select the right Ad Partner for analytics later on. Click **Configure Options** to continue.

    ![image](/img/pages/deep-linked-ads/jampp/jampp3.png)

1. This is your chance to add deep link data and analytics tags. Analytics tags are important for later segmentation, so click the **Analytics** sub tab to add a Channel and Campaign value.

    ![image](/img/pages/deep-linked-ads/jampp/jampp4.png)

    !!! tip "Set Analytics tags"

        It's easier to slice your data in our analytics platform if you properly assign analytics parameters to your link. _Channels_ generally correspond to ad networks, and _Campaigns_ correspond to marketing initiatives that you're launching. For example: _Channel_: "YouTube", _Campaign_: "Summer 2017 Shoe Discounts."

1. Click **Create Link Now**, and you have your tracking link! Take this link and give it to your Ad Partner's Account Manager or paste it into the tracking section of your campaign yourself. If you'd like to try our view-through attribution beta, please contact integrations@branch.io.

    ![image](/img/pages/deep-linked-ads/jampp/jampp5.png)

### View your data with People-Based Attribution

The [Ads Analytics Page](https://dashboard.branch.io/ads/analytics) on the Branch dashboard shows the performance of your ad campaigns _across both web and app_. You can view performance over time, including purchase and other custom events.

Events are attributed using Branch's unified last-click attribution model. This means that Branch will attribute to the last click across channels, and across platforms.

For example, if a customer clicks a Branch email link, and then clicks an ad, installs the the app and purchases an item, Branch will attribute the install and the purchase to the last clicked ad link.

If the customer then goes on to purchase an item on web within the attribution window, Branch will also attribute the web purchase to the same ad link, connecting the web and app actions taken by a single user for a more accurate view of your marketing channels and customer behavior.

![image](/img/pages/deep-linked-ads/branch-universal-ads/install-by-secondary-pub.png)

You can read more about [People-Based Attribution here](/pages/dashboard/people-based-attribution/).

### View-Through Attribution with Impression Pixels

_If you'd like to try our view-through attribution beta, please contact integrations@branch.io._

View-through attribution allows you to track installs, session starts and conversion events back to an ad impression, even if the ad was never clicked on. Our view-through attribution logic is currently as follows for any given event:

- If there's a click within a valid attribution window, give credit to the click.
- If there's no click within a valid attribution window, give credit to the last impression that was within a valid attribution window.

Currently, impression pixels are only supported with server to server tracking, so server to server macros and device IDs are required when using impression pixels. To create a pixel, simply [create an ad link](#create-an-ad-link), and grab the pixel from the final step of link creation.

!!! tip "Impression Pixel Formatting"

        if you are going to use Impreion pixel for Attribution - please make sure the impression pixel returned by Branch's dashboard has `%24s2s=true` and an `%24idfa` or `%24aaid` macro, in the case if you just want to count impressions you can skip this.


!!! warning "Using Impression Pixel for Attribution"
        You'll receive the warning if neither **%24idfa** nor **%24aaid** are present on the link:
        
        This impression link doesn't have a device ID, which means it will only count impressions, but won't provide view through attribution. To get view through attribution, please append a device ID macro such as %24idfa or %24aaid.

## Advanced

### Add more postbacks

When you enable an ad partner, your ad partner postbacks can be found under the **Postbacks** tab for that ad partner. It's easy to add additional postbacks.

!!! tip "Send All events"

        if you want to send **All Events** not only events attributed to the partner - you can change this setting at the top if the screen.

![image](/img/pages/deep-linked-ads/jampp/jampp6.png)

1. Click the **Add New Postback** button at the bottom of the screen.

1. A modal will appear with Branch default events, as well as any commerce or custom events you've set up. Select an event, enter a postback URL if you're asked to, and click **Save**. This will be the event that triggers your new postback.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/add-new-postback-modal.png)

{! ingredients/deep-linked-ads/edit-postbacks.md !}

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
