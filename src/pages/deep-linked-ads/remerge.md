## Overview

Track your Remerge campaigns using Universal Ads. Universal Ads provides everything you need for complete tracking.

The basic Remerge integration involves three parts:

1. Integrating the SDKs and tracking in-app events
1. Enabling the integration and selecting postbacks
1. Creating tracking links

## Setup

{! ingredients/deep-linked-ads/integrate_branch_sdk.md !}

{! ingredients/deep-linked-ads/conversion_events_tracking.md !}

### Enable integration with Remerge

1. Visit the [Ads page](https://dashboard.branch.io/ads) on the Branch dashboard.
2. Select [Partner Management](https://dashboard.branch.io/ads/partner-management) from the sidebar.
3. Search for Remerge and enable it


![image](/img/pages/deep-linked-ads/remerge/find-remerge.png)

!!! tip "Enable postbacks"
    Basic postbacks will automatically be activated for events like _Install_ and _Purchase_ when you enable your ad partner. You can then [add additional postbacks](#adding-more-postbacks), for example, if you wanted to add postbacks for custom events that are specific to your app like _Account Created_. You can also [edit postbacks](#advanced-editing-postbacks) if there's additional data you really need to pass along to your ad partner.

{! ingredients/deep-linked-ads/send-all-events.md !}

![image](/img/pages/deep-linked-ads/remerge/send-all-events.png)

### Create an ad link

Once you've enabled an integration with Remerge, it's time to create a tracking link.

1. First, select an ad format. For App Install or App Engagement campaigns you'll want to select the **App Only** format. For Search or Display campaigns where the user should go to web if they don't have the app, then you should select **Cross-Platform Search** or **Cross-Platform Display**. **Product Links** are for shopping or dynamic remarketing campaigns and will take you to create a Deep Linked Product Feed.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/choose-ad-format.png)

1. At this point you need to name your link. Select something that will make it easy to find if you need it later. Your Ad Format and Ad Partner should be selected already, but feel free to choose one if they aren't. It's important that you select the right Ad Partner for analytics later on. Click **Configure Options** to continue.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/name-ad-link.png)

1. This is your chance to add deep link data and analytics tags. Analytics tags are important for later segmentation, so click the **Analytics** sub tab to add a Channel and Campaign value.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/add-analytics-tags.png)

    !!! tip "Set Analytics tags"

        It's easier to slice your data in our analytics platform if you properly assign analytics parameters to your link. _Channels_ generally correspond to ad networks, and _Campaigns_ correspond to marketing initiatives that you're launching. For example: _Channel_: "YouTube", _Campaign_: "Summer 2017 Shoe Discounts."

1. Click **Create Link Now**, and you have your tracking link! Take this link and give it to your Ad Partner's Account Manager or paste it into the tracking section of your campaign yourself. If you'd like to try our view-through attribution beta, please contact integrations@branch.io.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/finished-ad-link.png)

{! ingredients/deep-linked-ads/view-ad-link-data.md !}

{! ingredients/deep-linked-ads/people-based-attribution.md !}

{! ingredients/deep-linked-ads/view-through-attribution.md !}

{! ingredients/deep-linked-ads/ua-advanced-setup.md !}