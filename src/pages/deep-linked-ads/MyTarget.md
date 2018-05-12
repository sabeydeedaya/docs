## Overview

This guide will walk you through how to integrate [MyTarget](https://target.my.com/) with Branch. 
It is best to familiarize yourself with Branch Universal Ads product first by following [this documentation](pages/deep-linked-ads/branch-universal-ads.md) first.

Universal Ads provides everything you need for complete tracking, including rich data for the MyTarget Engine to opimtize against.

The basic MyTarget integration involves three parts:

1. Integrating the SDKs and tracking in-app events
1. Enabling the integration and selecting postbacks
1. Creating tracking links

## Setup

### Integrating the SDKs and tracking in-app events

{! ingredients/deep-linked-ads/integrate_branch_sdk.md !}

#### Track conversion events

{! ingredients/deep-linked-ads/conversion_events_tracking.md !}

### Enabling the integration and selecting postbacks

Once you've integrated the SDK and configured the relevant events, you can enable MyTarget in the dashboard. Follow the steps below for enabling an ad partner, and select MyTarget from the list.

1. Visit the [Ads page](https://dashboard.branch.io/ads) on the Branch dashboard.
2. Select [Partner Management](https://dashboard.branch.io/ads/partner-management) from the sidebar.
3. Search for MyTarget.

![image](/img/pages/deep-linked-ads/MyTarget/search-mytarget.png)

4. Click **Save and Enable**.

![image](/img/pages/deep-linked-ads/MyTarget/mytarget-postbacks.png)

!!! tip "Enable postbacks"
    Postbacks will be automatically activated for the events listed above when you enable the integration. You can always [add additional postbacks](#adding-postbacks) or [edit postbacks](#editing-postbacks), as described below in the Advanced section.

________________________________________________________________________________________________________________________

### Creating tracking links

MyTarget requires separate links for every platform - to create a tracking follow the normal link creation flow and add platform and partner specific parameters on Deep Linking tab.

{! ingredients/deep-linked-ads/view-ad-link-data.md !}

## Advanced Configurations

#### Adding postbacks

If you'd like to track additional events, you can set up a custom event and [add a new postback](/pages/deep-linked-ads/branch-universal-ads/#add-more-postbacks).

By default, postbacks not listed in [the table above](#branch-and-criteo-event-mapping) are created with a generic template, but you can copy templates from any of the existing postbacks and paste that template into your new event.

#### Editing postbacks

If you'd like to send more data in your Criteo postbacks, you can [customize your postbacks](/pages/deep-linked-ads/branch-universal-ads/#edit-postbacks).

!!! example "Adding Static Track Transaction"
	*Static Track Transaction* is a custom template that replaces the default PURCHASE (Track Transaction) template. You should see STATIC_TRACK_TRANSACTION as an event under the **Postback Config** in the Criteo Partner Manager UI. You can copy the postback template from STATIC_TRACK_TRANSACTION, and paste it into the PURCHASE postback, replacing the previous postback. Click *Save* at the bottom of the screen, and you're good to go!

#### Change attribution windows

If you need to change the default attribution windows, you can [edit attribution windows](/pages/deep-linked-ads/branch-universal-ads/#change-attribution-windows) for all your Criteo campaigns, and also specific campaigns at a link-level.

#### Sending dates for Travel campaigns

Criteo can optimize campaigns based on travel search dates. To report travel search dates to Criteo, follow these steps:

1. In your app, add [custom metadata](#branch-and-criteo-event-mapping) to your events with keys `din` and `dout`, and a date string in format `'YYYY-MM-DD'` for the date of the inbound and outbound flight respectively.
1. In the Branch dashboard, navigate to **Postback Config** within the Criteo entry of the Ads Partner Manager.
1. Find the postback you want to edit, and add the following string in the relevant place. For _VIEW\_ITEM_ for example, it's another event in the events array.
	``` code
	,{"event":"vs","din":<@json>${(custom_data.din)!}</@json>,"dout":<@json>${(custom_data.dout)!}</@json>}
	```

