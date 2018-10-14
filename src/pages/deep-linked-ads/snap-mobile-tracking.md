## Overview

![Snap](https://cdn.branch.io/branch-assets/ad-partner-manager/104632553691939011/Group_2-1538714318018.png)

!!! info 
    The Snap integration is in private beta. For access, please contact your Branch Account manager or [integrations@branch.io](mailto:integrations@branch.io).

Branch can help track your **[Snap Ad](https://forbusiness.snapchat.com/ad-products)** campaigns through our integration with Snap. 

Snap is a self-attributing network (SAN).

Snap campaign tracking can show you how many installs and conversion events were attributed to Snap, allowing you to make informed decisions with your advertising dollars.

## Setup

Before you begin, be sure the following is confirmed.

1. First, the Branch SDK must be integrated into your app, for both iOS and Android. 
1. You must also collect the IDFA on iOS, or the AAID on Android. For specifics, refer to the set up guide for [iOS](/pages/apps/ios/#install-branch) and [Android](/pages/apps/android/#install-branch) respectively.
1. Make sure to track all necessary events through the SDKs, with instructions [here](#forward-events-to-snap)

### Authenticate with Snap

1. Navigate to the [partner management](https://dashboard.branch.io/ads/partner-management){:target="\_blank"} tab and search for Snap.
1. Select the tile with the ghost logo.

    ![Find Snap](/img/pages/deep-linked-ads/snap/find-snap.png)

1. Click `Log in with Snapchat`.
1. Read and accept the Snap Advertiser Agreement terms if you haven't already.

    !!! info 
        You must be an Admin on the Branch account in order to accept the Snap Advertiser Agreement terms. You must accept the terms to track your Snap advertising.

    ![Accept Terms](/img/pages/deep-linked-ads/snap/sign-terms.png)


1. Log in to Snap. Once logged in, accept permissions and click `Continue`.

    ![Log in to Snap](/img/pages/deep-linked-ads/snap/log-in-to-snap.png)
    ![Continue OAuth](/img/pages/deep-linked-ads/snap/accept-oauth.png)

    !!! warning 
        Due to an issue with Snap Login, if you see the Snap "My Account" screen after logging in, you'll need to manually return to the Branch dashboard at [https://dashboard.branch.io/ads/partner-management/a_snap?tab=settings](https://dashboard.branch.io/ads/partner-management/a_snap?tab=settings){:target="\_blank"}. Click `Log in with Snapchat` again in the same browser, and you should see the `Continue` button instead of the login screen.

        ![Snap - My Account](/img/pages/deep-linked-ads/snap/snap-my-account.png)

1. Click `Continue` to return to the Branch dashboard.

    ![Snap - My Account](/img/pages/deep-linked-ads/snap/oauth-redirect-return.png)

1. Confirm the ad accounts that you would like to track.

    ![Snap - My Account](/img/pages/deep-linked-ads/snap/snap-select-accounts.png)

1. Click **Save** to finish.

    ![Snap - My Account](/img/pages/deep-linked-ads/snap/snap-complete.png)

**Note:** The Snap measurement integration requires you to have configured your Android and iOS apps on the Link Settings page. If those have not been set up, you will not be able to track ads and you may see a validation warning.

### View Attribution on Dashboard

All the attribution can be visible on the [Branch dashboard summary page](https://dashboard.branch.io/). All installs and opens registered from this channel will automatically be tagged with `Ad Partner`: `Snap`. Other analytics tags will reflect the campaign, ad squad and ad names you set up in the Snap Ads dashboard.

Note that these stats are **limited to the date range** at the top of the page. You can expand the range if you'd like.

### Change attribution windows

You can edit your attribution windows for Snap only. With this, you can preserve your Account Level Attribution Windows, but the attribution windows set for Snap will take precedence for Snap campaigns.

   ![image](/img/pages/deep-linked-ads/branch-universal-ads/anaw_clear.png)

To edit your app's global attribution windows, go to Link Settings > Attribution Windows.

   ![image](/img/pages/dashboard/people-based-attribution/attribution-windows.png)

Learn more about account level attribution windows in [People-Based Attribution](/pages/dashboard/people-based-attribution/#attribution-windows).

#### Mapping of Branch event names to Snap events

Branch supports sending [Standard and Custom Events](/pages/apps/v2event/#v2-event){target:"\_blank"} to Snap. Here are the mappings for Branch events to Snap events.

By default, all events in the below table will be sent to Snap.

| Branch event name | Snap event name
| --- | ---
| INSTALL | APP_INSTALL
| VIEW_ITEM | VIEW_CONTENT
| ADD_TO_CART | ADD_CART
| INITIATE_PURCHASE | START_CHECKOUT
| PURCHASE | PURCHASE
| ADD_PAYMENT_INFO | ADD_BILLING
| COMPLETE_REGISTRATION | SIGN_UP
| SEARCH | SEARCH
| ACHIEVE_LEVEL | LEVEL_COMPLETE
| OPEN, REINSTALL | APP_OPEN

The below events can be sent to Snap by registering [custom events ](/pages/apps/v2event/#track-custom-events){target:"\_blank"} that exactly match the Branch custom event name below. Snap does not accept other custom events, so they will not be sent to Snap.

| Branch custom event name | Snap event name
| --- | ---
| SAVE | SAVE
| PAGE_VIEW | PAGE_VIEW

