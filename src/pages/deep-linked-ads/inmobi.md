## Overview

Track your [InMobi](https://www.inmobi.com//) campaigns using Universal Ads. Universal Ads provides everything you need for complete tracking.

The basic InMobi integration involves three parts:

1. Integrating the SDKs and tracking in-app events
1. Enabling the integration and selecting postbacks
1. Creating tracking links

## Setup

### Integrating the SDKs and tracking in-app events

The Branch SDKs for iOS and Android allow you to get up and running quickly.  InMobi has some custom configurations to be aware of when you get set up.

If you haven't already integrated Branch, follow the below guides.

1. Start by following the integration guides for Android and iOS:
	- [Android](/pages/apps/android/){:target="\_blank"}
	- [iOS](/pages/apps/ios/){:target="\_blank"}
1. Once this is complete, you can test your basic integration by going to our [Liveview page](https://dashboard.branch.io/liveview/events){:target="\_blank"}. Set a filter for **OPEN** to verify that the Branch SDK is recording app opens.

	!!! warning "Limitations with setDebug and seeing data in Branch"
		When integrating the SDKs, it's often useful to use setDebug to verify that your app is able to communicate with Branch servers, and is receiving deep link data. However, our upstream systems don't register test events sent using setDebug, so events will not appear in Liveview or Analytics, nor will they fire postbacks. You should disable setDebug when looking at Liveview or testing postbacks.
       
#### Track conversion events

{! ingredients/deep-linked-ads/integrate_branch_sdk.md !}

{! ingredients/deep-linked-ads/conversion_events_tracking.md !}
 
### Enable integration with InMobi

1. Visit the [Ads page](https://dashboard.branch.io/ads) on the Branch dashboard.
2. Select [Partner Management](https://dashboard.branch.io/ads/partner-management) from the sidebar.
3. Search for the InMobi


![image](/img/pages/deep-linked-ads/inmobi/inmobi1.png)


!!! tip "Enable postbacks"
    Basic postbacks will automatically be activated for events like _Install_ and _Purchase_ when you enable your ad partner. You can then [add additional postbacks](#adding-more-postbacks), for example, if you wanted to add postbacks for custom events that are specific to your app like _Account Created_. You can also [edit postbacks](#advanced-editing-postbacks) if there's additional data you really need to pass along to your ad partner.

### Create an ad link

Once you've enabled an integration with InMobi, it's time to create a tracking link.

1. First, select an ad format. For App Install or App Engagement campaigns you'll want to select the **App Only** format. For Search or Display campaigns where the user should go to web if they don't have the app, then you should select **Cross-Platform Search** or **Cross-Platform Display**. **Product Links** are for shopping or dynamic remarketing campaigns and will take you to create a Deep Linked Product Feed.

    ![image](/img/pages/deep-linked-ads/inmobi/inmobi2.png)

1. At this point you need to name your link. Select something that will make it easy to find if you need it later. Your Ad Format and Ad Partner should be selected already, but feel free to choose one if they aren't. It's important that you select the right Ad Partner for analytics later on. Click **Configure Options** to continue.

    ![image](/img/pages/deep-linked-ads/inmobi/inmobi3.png)

1. This is your chance to add deep link data and analytics tags. Analytics tags are important for later segmentation, so click the **Analytics** sub tab to add a Channel and Campaign value.

    ![image](/img/pages/deep-linked-ads/inmobi/inmobi4.png)

    !!! tip "Set Analytics tags"

        It's easier to slice your data in our analytics platform if you properly assign analytics parameters to your link. _Channels_ generally correspond to ad networks, and _Campaigns_ correspond to marketing initiatives that you're launching. For example: _Channel_: "YouTube", _Campaign_: "Summer 2017 Shoe Discounts."

1. Click **Create Link Now**, and you have your tracking link! Take this link and give it to your Ad Partner's Account Manager or paste it into the tracking section of your campaign yourself. If you'd like to try our view-through attribution beta, please contact integrations@branch.io.

    ![image](/img/pages/deep-linked-ads/inmobi/inmobi5.png)

{! ingredients/deep-linked-ads/view-ad-link-data.md !}

{! ingredients/deep-linked-ads/people-based-attribution.md !}

{! ingredients/deep-linked-ads/view-through-attribution.md !}

## Advanced

### Add more postbacks

When you enable an ad partner, your ad partner postbacks can be found under the **Postbacks** tab for that ad partner. It's easy to add additional postbacks.

!!! tip "Send All events"

        if you want to send **All Events** not only events attributed to the partner - you can change this setting at the top if the screen.

![image](/img/pages/deep-linked-ads/inmobi/inmobi6.png)

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
