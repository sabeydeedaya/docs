!!! info "<img src="../../../_assets/img/pages/deep-linked-ads/google/google-ads-logo.png" width="50"/> Google Ads Resources"
		- [Google Ads Overview](/deep-linked-ads/google-ads-overview/)
		- **Enabling the Integration** (this page)
		- [App Install Campaigns](/deep-linked-ads/google-ads-uac/)
		- [App Engagement Campaigns](/deep-linked-ads/google-ads-app-engagement/)
		- [Web-based Ads (non-UAC)](/deep-linked-ads/google-ads-non-uac/)
		- [Troubleshooting & FAQs](/deep-linked-ads/google-ads-troubleshooting/)

## Overview

By connecting your Google Ads and Branch accounts, the following is enabled:

- App conversion data collected by the Branch SDK sent to Google Ads for attribution.
- `Read-only` access to import click and impression data at the aggregate level from Google Ads into your Branch account.
- Viewing Google Ads - your manager (MCC) and children accounts - metrics in your Branch dashboard.

## Linking Branch in Google Ads

To link Branch to your Google Ads account, please follow Google's **[Link a third-party app analytics provider and Google Ads](https://support.google.com/google-ads/answer/7365001?hl=en&ref_topic=7280929)**.

!!! tip "Branch's Provider ID"
	Please make sure to provide Branch's Provider ID - **3404357870** - during the linking process

**Things to Keep in Mind**

- You’ll need to create a different link ID for each app you track with Branch. Once you've generated the link ID and shared it with Branch you'll be able to import conversion events into Google Ads.
- You must be an admin in your Google Ads account in order to generate link IDs.
- If you manage campaigns for the same app in multiple Google Ads accounts either:
	- Use [cross-account conversion tracking](https://support.google.com/google-ads/answer/3030657) and setting up a link ID with your third-party app analytics provider in your manager account. Ensure after setting up the link ID and conversions at MCC level, that you have appropriately set the manager as the conversion account for each sub-account you will run app ads on under Accounts>Management in Google Ads. 
	- Share a single link ID with another Google Ads account.
		- The account you share from will be the “owner” of the link ID. Only the “owner” of the link ID can share their link ID with other accounts. Any account that has accepted the owner's invite will be able to import conversions from the corresponding third-party app analytics provider for the app associated with the shared link ID.

Store these Link IDs for easy access as you will need them to finish enabling the integration.

## Connecting with Google Ads in Branch

Once you've linked Branch in Google Ads:

1. Navigate to Branch's [partner management](https://dashboard.branch.io/ads/partner-management){:target="\_blank"} tab and click `Connect with Google`. Choose the email address that is tied to the Google Ads accounts you want to connect.
![Connect Google](/_assets/img/pages/deep-linked-ads/google/connect-with-google.png)
1. Select all the necessary accounts, and continue.
![Connect Accounts](/_assets/img/pages/deep-linked-ads/google/connect-accounts.png)
1. Finally, paste the Link IDs from earlier.
![Create Link IDs](/_assets/img/pages/deep-linked-ads/google/link-ids.png)

## Importing Events Into Google Ads

After you have set both Branch & Google Ads up, wait ~20 minutes, and go back to the Google Ads dashboard. NOTE: You can expedite this process if you open your app and simulate the events you want forwarded.

To import your app conversion data as measured by the Branch SDK, please follow Google's **[Track app conversion with third-party analytics providers](https://support.google.com/google-ads/answer/7382633)**.

!!! warning "Include in Conversions"
	For any **first open** event conversions, please ensure you've marked `Include in Conversions` to `YES`. Doing so includes the `first open` conversion action’s data in your `Conversions` reporting column in Google Ads. This is important as Branch reports `first open` events to Google Ads, whereas Google Ads reports on app installs.

For more information, please refer to Google's [About the "Include in 'Conversions'" setting](https://support.google.com/google-ads/answer/4677036?hl=en&co=ADWORDS.IsAWNCustomer%3Dtrue&oco=0).

## Setup FAQs

### Do I have to set attribution windows?

For example, if a user clicked an ad 8 days ago, and Google claims credit for the resulting app install, we would *not* count the install attribution, because our default is 7 days from click. However, it is ultimately up to you which attribution window you would like to use. Below is simply a **recommendation**:

- Click to Install : 30 days
- Click to Conversion Event : 90 days
- Click to Open : 90 days

### How do I handle multiple Google Ads accounts?

Firstly, it is not necessary to connect all Google Ads accounts. However, you must connect the Google Ads account that owns in-app conversions for your mobile app. Often, this is the MCC account.

!!! tip
	Inside an MCC, it is possible to configure which account (the MCC or the child account) is responsible for conversions. Ensure that you create link IDs with the account that is noted as the Conversion Account under the `MCC > Management` tab.

	![MCC Accounts](/_assets/img/pages/deep-linked-ads/google/mcc-conversion-account.png)

If you only have access to the child account (but that account is attached to an MCC), you can see which account is recording conversions within the child account as well, by going to `Tools > Conversions > Settings > Conversion Account` in Google Ads.
