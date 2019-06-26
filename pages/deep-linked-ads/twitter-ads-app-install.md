title: Twitter Ads App Install Measurement

![image](/_assets/img/pages/deep-linked-ads/twitter-ads/twitter-ads-logo.png)

## Overview

Branch links can be used together with Twitter App Install Campaign ads, allowing you to track ad-driven installs on the Branch dashboard.

By connecting your Twitter Ads and Branch accounts, the following is enabled:

- App conversion data collected by the Branch SDK sent to Twitter Ads for attribution.
- `Read-only` access to install data (not cost/click/impression data) from Twitter Ads in your Branch account.

## Prerequisites

!!! warning "Prerequisites"
	* [x] To track installs from Twitter Ads you should [integrate the Branch SDK](/apps/ios/#integrate-branch) into your app OR send events via server to server integration including device IDs (Google AID or Apple IFA).
	* [x] To use Twitter App Install Ads ensure you have:
		* [x] URI schemes configured on iOS
		* [x] URI schemes configured on Android
		* [x] iOS App Store ID set
		* [x] Android Package Name set
	* [x] Ads is a premium product priced on Monthly Active Users. Sign up for the Ads product to enable this functionality.

## Enable Twitter Ads for Measurement

!!! note ""
	Completing this section -- "Enable Twitter Ads for Measurement" -- will result in Branch sending app events to Twitter in order to attribute them back to Twitter ad campaigns. At this time, the integration does not support deep linking new users directly to content the first time they open your app.

1. Navigate to the [Partner Management tab](https://dashboard.branch.io/ads/partner-management) and search for **Twitter**.

1. Click `Log in with Twitter`

    ![image](/_assets/img/pages/deep-linked-ads/twitter-ads/twitter-ads-enable.png)

1. Provide your Twitter credentials to begin the authorization process.

1. Agree to the Advertising Terms & Conditions by checking the `I agree to the Twitter Ads Terms & Conditions`.

    ![image](/_assets/img/pages/deep-linked-ads/twitter-ads/twitter-ads-tocs.png)

1. Authorize Branch Twitter Ads Manager to use your account by clicking `Authorize app`.

    ![image](/_assets/img/pages/deep-linked-ads/twitter-ads/twitter-ads-authorize.png)

1. Select the ad accounts for which you want to run app install ads and click `Save`.

    ![image](/_assets/img/pages/deep-linked-ads/twitter-ads/twitter-ads-accounts.png)

1. Finally, to create a Twitter Ads link click the `Create Twitter Link` button in the top right hand corner.


## Creating a Twitter Ads Campaign

Please follow Twitter's documentation on how to set up an [App Install Ad Campaign](https://business.twitter.com/en/help/campaign-setup/create-an-app-installs-or-app-engagement-campaign.html).

{! ingredients/deep-linked-ads/add-agency-prefix-san-only.md !}

## Data Mapping between Twitter Ads & Branch

Branch maps the following data fields from Twitter Ads to Branch.

Twitter Data | Branch Data | Possible Values
--- | --- | ---
n/a | ~advertising_partner_name | “Twitter”
tpn_attribution | ~channel | “Twitter” if null or last touch, or “Twitter Audience Platform” if TAP is last touch
engagement_time | last_attributed_touch_timestamp | 1455675372963
campaign_name | ~campaign | Light Bright Launch
campaign_id | ~campaign_id | 15292426
engagement_type | last_touch_type | CLICK or IMPRESSION
country_code | ~user_data_geo_country_code | US

## Forwarding Events to Twitter Ads

Once you begin tracking events through the Branch SDK, we will start sending them to Twitter Ads. Twitter Ads has pre-defined events that map to pre-defined Branch events, listed below.

Branch will forward in-app events to Twitter Ads for campaign optimization. In addition, Branch will receive attribution data for rich analysis in the Branch dashboard.

Branch Event Name | Twitter Conversion Type
--- | ---
INSTALL | INSTALL
PURCHASE | PURCHASE
INITIATE_PURCHASE | CHECKOUT_INITIATED
ADD_TO_CART | ADD_TO_CART
VIEW_ITEM | CONTENT_VIEW
ADD_PAYMENT_INFO | ADDED_PAYMENT_INFO
COMPLETE_REGISTRATION | SIGN_UP
SEARCH | SEARCH
ACHIEVE_LEVEL | LEVEL_ACHIEVED
OPEN, REINSTALL | RE_ENGAGE
COMPLETE_TUTORIAL | TUTORIAL_COMPLETE
ADD_TO_WISHLIST | ADD_TO_WISHLIST
UNLOCK_ACHIEVEMENT | ACHIEVEMENT_UNLOCKED
SHARE | SHARE
SPEND_CREDITS | SPENT_CREDITS
RATE | RATED
UPDATE | UPDATE
RESERVE | RESERVATION
LOGIN | LOGIN
INVITE | INVITE

In order to track these events, please refer to the [v2 Event document](/apps/v2event/#v2-event) for further information.

## Twitter Data Sharing

Twitter has a data agreement with TUNE, and there are several layers of data that are concealed and can be exposed depending on who is accessing the data, and how the data is being accessed or exported.

### Data Levels

**Source Level** > Source level is the source information including Partner name (Twitter Ads) and Partner Site (PROMOTED, ORGANIC, TAP).

**Campaign Level** > Campaign level includes campaign information such as Partner Campaign (campaign name), Partner Ad (Tweet ID), Partner Ad Group (Line Item ID)

### Accessible Data

#### Clients

**Branch API/UI**:

 - [x] Can access source and campaign level data by default in aggregate reports.
 - [x] Source and campaign level data is not accessible in exports.

**Postbacks**:

 - [x] Can receive source level data with identifiers by default to an *internal BI endpoint only* Data can not be sent to third party analytics (see below for third parties) – the postback must be whitelisted for source level data by contacting support.
 - [x] Campaign level data can not be sent to internal endpoints by default, please speak with your Twitter account manager for more information.

#### Partners

Only official Twitter partners can be attributed to and access Twitter data, those found at partners.twitter.com.

**Branch API/UI**:

 - [x] Can see source and campaign level data without identifiers for conversions they are attributed to (Twitter conversions that contain their attribution string in the campaign name).
 - [x] Identifiers are never accessible.

**Postbacks**:

 - [x] Can receive source and campaign level data to their endpoints, and identifiers will be scrubbed out, no exceptions. This occurs by default and does not need whitelisting for a partner that has Twitter enabled on their integration.

#### Third parties (analytics providers)

 - [x] Third parties (not client or official Twitter partner) **can not receive Twitter data, no exceptions**.
 - [x] Postbacks set up to analytics providers will scrub source and campaign level information by default, identifiers will still pass through, and the conversions will appear organic to the third party.

#### Agencies

Agencies can access Twitter data under the following circumstances:

 - [x] If they have been provided full agency access by the client.
 - [x] If they are an official Twitter partner.
 - [x] If they append their agency attribution code to the Twitter campaign they are running.


## Troubleshooting

**Why am I seeing an onboarding error or not seeing an ad account?**

- You must have permissions to configure ad accounts.
- You must not have another MMP configured for your app/ad account combination.
- You can only track apps that are configured with store IDs & package names in Link Settings.

**Why are there so many events?**

We configure all permissible events at time of enablement so there’s no delay in tracking new events when they’re set up.

**Why can't I view cost/click/impression data?**

Twitter does not currently allow MMPs to access this data. We’re in active discussions. Please tell your Twitter AM if you’d like this data available in Branch.
