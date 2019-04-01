## Overview

![Snap](https://cdn.branch.io/branch-assets/ad-partner-manager/104632553691939011/Group_2-1538714318018.png)

Branch can help track your **[Snap Ad](https://forbusiness.snapchat.com/ad-products)** campaigns through our integration with Snap.

Snap is a self-attributing network (SAN).

Snap campaign tracking can show you how many installs and conversion events were attributed to Snap, allowing you to make informed decisions with your advertising dollars.

Branch supports attribution for the following Snap campaign types:
  - App Installs
  - Drive Traffic to App

## Prerequisites

Before you begin, be sure the following is confirmed.

- [x] First, the Branch SDK must be integrated into your app, for both iOS and Android.
- [x] You must also collect the IDFA on iOS, or the AAID on Android. For specifics, refer to the set up guide for [iOS](/apps/ios/#install-branch) and [Android](/apps/android/#install-branch) respectively.
- [x] Make sure to track all necessary events through the SDKs, with instructions [here](#forward-events-to-snap)

## Authenticate with Snap

1. Navigate to the [partner management](https://dashboard.branch.io/ads/partner-management){:target="\_blank"} tab and search for Snap.
1. Select the tile with the ghost logo.

    ![Find Snap](/_assets/img/pages/deep-linked-ads/snap/find-snap.png)

1. Click `Log in with Snapchat`.
1. Read and accept the Snap Advertiser Agreement terms if you haven't already.

    !!! info
        You must be an Admin on the Branch account in order to accept the Snap Advertiser Agreement terms. You must accept the terms to track your Snap advertising.

    ![Accept Terms](/_assets/img/pages/deep-linked-ads/snap/sign-terms.png)


1. Log in to Snap. Once logged in, accept permissions and click `Continue`.

    ![Log in to Snap](/_assets/img/pages/deep-linked-ads/snap/log-in-to-snap.png)
    ![Continue OAuth](/_assets/img/pages/deep-linked-ads/snap/accept-oauth.png)

    !!! warning
        Due to an issue with Snap Login, if you see the Snap "My Account" screen after logging in, you'll need to manually return to the Branch dashboard at [https://dashboard.branch.io/ads/partner-management/a_snap?tab=settings](https://dashboard.branch.io/ads/partner-management/a_snap?tab=settings){:target="\_blank"}. Click `Log in with Snapchat` again in the same browser, and you should see the `Continue` button instead of the login screen.

        ![Snap - My Account](/_assets/img/pages/deep-linked-ads/snap/snap-my-account.png)

1. Click `Continue` to return to the Branch dashboard.

    ![Snap - My Account](/_assets/img/pages/deep-linked-ads/snap/oauth-redirect-return.png)

1. Confirm the ad accounts that you would like to track.

    ![Snap - My Account](/_assets/img/pages/deep-linked-ads/snap/snap-select-accounts.png)

1. Click **Save** to finish.

    ![Snap - My Account](/_assets/img/pages/deep-linked-ads/snap/snap-complete.png)

**Note:** The Snap measurement integration requires you to have configured your Android and iOS apps on the Link Settings page. If those have not been set up, you will not be able to track ads and you may see a validation warning.

## Using Branch Links in Snap Campaigns

While the `App Installs` campaign type does not require the use of Branch links, you can insert Branch links into the `Drive Traffic to App` campaign type for ensuring proper routing including deferred deep linking.

To use Branch links in your `Drive Traffic to App` campaigns:

1. Generate/fetch your Branch link from the Branch dashboard.
1. Set up your Snap campaign, selecting `Drive Traffic to App`.
  ![image](/_assets/img/pages/deep-linked-ads/snap/drive-traffic-to-app.png)
1. On the `Build Your Ads` page:
    1. Paste your Branch link into the `DEEPLINK URI` field.
    1. Select `Web Site` as the `FALLBACK TYPE` to ensure deferred deep linking via your Branch link.
  ![image](/_assets/img/pages/deep-linked-ads/snap/build-your-ad.png)
1. Finish building your Snap campaign.

!!! warning "Web Site as Fallback Required for Deferred Deep Linking"
    Please ensure you choose `Web Site` as the `FALLBACK TYPE` and inserting the same Branch link into the provided field.  If you choose `App Install` as the `FALLBACK TYPE`, users not properly routed will be sent to the App Store without the Branch link and deferred deep linking will not occur.

{! ingredients/deep-linked-ads/add-agency-prefix-san-only.md !}

## View Attribution on Dashboard

All the attribution can be visible on the [Branch dashboard summary page](https://dashboard.branch.io/). All installs and opens registered from this channel will automatically be tagged with `Ad Partner`: `Snap`. Other analytics tags will reflect the campaign, ad squad and ad names you set up in the Snap Ads dashboard.

Note that these stats are **limited to the date range** at the top of the page. You can expand the range if you'd like.

### Changing attribution windows

You can edit your attribution windows for Snap only. With this, you can preserve your Account Level Attribution Windows, but the attribution windows set for Snap will take precedence for Snap campaigns.

   ![image](/_assets/img/pages/deep-linked-ads/branch-universal-ads/anaw_clear.png)

!!! info
      Please make sure your Branch attribution windows for Snap match those in your Snap account. See the Troubleshooting section for more detail.
      
## Data Mapping between Snap & Branch

Branch maps the following data fields from Snap to Branch.

Snap Data | Branch Data
--- | ---
ad_campaign_name | ~campaign
ad_campaign_id | ~campaign_id
ad_squad_name | ~ad_set_name
ad_squad_id | ~ad_set_id
ad_name | ~ad_name
ad_id | ~ad_id

## Mapping of Branch event names to Snap events

Branch supports sending [Standard and Custom Events](/apps/v2event/#v2-event){target:"\_blank"} to Snap. Here are the mappings for Branch events to Snap events.

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

The below events can be sent to Snap by registering [custom events ](/apps/v2event/#track-custom-events){target:"\_blank"} that exactly match the Branch custom event name below. Snap does not accept other custom events, so they will not be sent to Snap.

| Branch custom event name | Snap event name
| --- | ---
| SAVE | SAVE
| PAGE_VIEW | PAGE_VIEW


{! ingredients/deep-linked-ads/cost-data.md !}

## Troubleshooting

### Discrepancies

- Snap Ads Manager time zones are set at the time your ad account is created. You can see your Snap time zone in your Snap Ad Account Settings, but you cannot change it. You can change your Branch dashboard time zone in [Account Settings](https://dashboard.branch.io/account-settings/app) to match.
- Verify your Snap attribution windows match your Branch attribution windows. Ask your Snap account manager for your attribution windows. Your Branch windows are visible either in Link Settings (global windows) or in the [Attribution Windows](https://dashboard.branch.io/ads/partner-management/a_snap?tab=attribution_windows) section of the Snap entry in Ads Partner Manager. Snap windows can be configured under "Customize Columns" in the Snap UI.

    ![Snap - Attribution Windows](/_assets/img/pages/deep-linked-ads/snap/snap-attribution-windows.png)

- When deep linking, create a link via the Branch dashboard. If you are running an app campaign, please ensure your link has `%24deeplink_no_attribution=true` as a query parameter to remove that link's ability to claim attribution, otherwise the link may claim attribution over the SAN claim. The link will still deep link.
- Snap's reporting API does not provide any "compare by" functionality outside of the ads analytics tags. So, you cannot compare Snap click + impression data by platform, OS or country, for example.

{! ingredients/deep-linked-ads/cost-data-discrepancies.md !}

###Exporting Snap Data

!!! warning
        Data integrations will never include events attribution to Snap. This is because we cannot share device-level Snap attribution data with third parties.


There are many ways to access data pertaining to Snap.

You can see analytics on impressions, clicks, installs, opens and conversion events on various pages of the Branch Dashboard, as well as the Query API.

We cannot send device-level Snap attribution data to third parties. Thus we cannot send events attributed to Snap via Data Integrations. Please instead consider analyzing this data in-house (using Webhooks, the Data Export API, or CSV Exports), or using the Branch Dashboard for all of your analytics and attribution needs.
