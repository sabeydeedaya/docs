title: Google Marketing Platform App Conversion Tracking

![image](https://cdn.branch.io/branch-assets/ad-partner-manager//gmp-logo-1557768658464.png)

## Overview

Branch links can be used together with Google Marketing Platform app conversion ads, allowing you to track ad-driven app conversion (installs and in-app events) on the Branch dashboard.

!!! warning "Google Marketing Platform"
	The [Google Marketing Platform](https://support.google.com/dcm/answer/9015629?hl=en) includes the following products: Display & Video 360 (Formerly DoubleClick Bid Manager), Campaign Manager (Formerly DoubleClick Campaign Manager) and Search Ads 360 (formerly DoubleClick Search).

	Please make sure to use `Google Marketing Platform` in your Branch dashboard and not `Doubleclick` which is the legacy integration and does not include server-side attribution responses.

By connecting your Google Marketing Platform and Branch accounts, the following is enabled:

- App conversion data collected by the Branch SDK sent to Google Marketing Platform for attribution.
- `Read-only` access to app conversion data (not cost/click/impression data) from Google Marketing Platform Ads in your Branch account.

## Prerequisites

!!! warning "Prerequisites"
	* [x] To track conversions from Google Marketing Platform Ads you should [integrate the Branch SDK](https://docs.branch.io/resources/native-sdks-and-plugins/) into your app, and/or if you are using S2S, ensure that advertising ID's are being passed to Branch. 
	* [x] You must request whitelisting from your Google rep for the new 'App Analytics' section of Floodlight Configuration in CM in order to generate link ID's for this integration

## Configure Branch as App Analytics Partner in Google Marketing Platform

!!! warning "Required Before Enabling Integration in Branch"
	After your Google representative has confirmed whitelisting, use the guide provided by their team to configure Branch as an App Analytics Partner and generate a link ID for the iOS and Android versions of your app.

## Enable Google Marketing Platform in Branch

!!! note ""
	Completing this section will result in Branch sending app conversion to Google in order to attribute them back to Google Marketing Platform campaigns.

1. Navigate to the [Partner Management tab](https://dashboard.branch.io/ads/partner-management) and search for **Google Marketing Platform**.

1. Provide the **Link IDs** for your Android/iOS apps respectively.
	![image](/_assets/img/pages/deep-linked-ads/google-marketing-platform/google-marketing-platform-enable.png)
1. Click **Save and Enable**.

1. Finally, to create a Google Marketing Platform Ads link click the **Create Google Marketing Platform Link** button in the top right hand corner.

## Creating a Google Marketing Platform Ads Campaign

Please follow Google's documentation on how to set up a [Campaign](https://support.google.com/dcm/answer/2838056?visit_id=636933638406934064-1262523168&ref_topic=2834022&rd=1).

{! ingredients/deep-linked-ads/add-agency-prefix-san-only.md !}

## Data Mapping between Google Marketing Platform & Branch

Branch maps the following data fields from the Google Marketing Platform to Branch.

Google Marketing Platform | Branch Data | Possible Values
--- | --- | ---
n/a | ~advertising_partner_name | “Google Marketing Platform”
product_type | ~channel | This field reports the product that is responsible for the conversions, either “DBM” or “DCM”.
creative_id | ~creative_id | The numeric ID of the creative ad unit that produced the ad event. This value is guaranteed unique. When product is DBM, this field represents the DBM Creative ID. When product is DCM, this field represents the DCM Creative ID.
placement_id | ~placement | The ID of the placement tag that calls an ad server for ad content when users visit a site. DCM serves ads when users visit a site with DCM placement tags. DCM generates a unique tag for each placement in an ad campaign. This value is only provided when product is DCM.
line_item_id | ~ad_id | Line items in DBM can be used for targeting, bidding and assigning creatives. This is the ID of the line item that produced the ad event. This value is guaranteed unique within the DBM universe. This value is only provided when product is DBM
line_item_name | ~ad_name | Name of the line items in DBM that produced the ad event. This value is only provided when product is DBM.

## Forwarding Events to Google Marketing Platform

Once you begin tracking events through the Branch SDK, we will start sending them to the Google Marketing Platform.

Branch will forward in-app events to the Google Marketing Platform for campaign optimization. In addition, Branch will receive attribution data for rich analysis in the Branch dashboard.

Branch Event Name | Google Marketing Platform Conversion Type
--- | ---
INSTALL | FIRST_OPEN
PURCHASE | ECOMMERCE_PURCHASE / IN_APP_PURCHASE
INITIATE_PURCHASE | CUSTOM
ADD_TO_CART | ADD_TO_CART
VIEW_ITEM | VIEW_ITEM
ADD_PAYMENT_INFO | CUSTOM
COMPLETE_REGISTRATION | CUSTOM
SEARCH | VIEW_SEARCH_RESULTS
ACHIEVE_LEVEL | CUSTOM
OPEN, REINSTALL | SESSION_START
COMPLETE_TUTORIAL | CUSTOM
ADD_TO_WISHLIST | CUSTOM
UNLOCK_ACHIEVEMENT | CUSTOM
SHARE | CUSTOM
SPEND_CREDITS | CUSTOM
RATE | CUSTOM
UPDATE | CUSTOM
RESERVE | CUSTOM
LOGIN | CUSTOM
INVITE | CUSTOM

In order to track these events, please refer to the [v2 Event document](/apps/v2event/#v2-event) for further information.
