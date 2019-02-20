!!! info "<img src="../../../img/pages/deep-linked-ads/google/google-ads-logo.png" width="50"/> Google Ads Resources"
		- [Google Ads Overview](/pages/deep-linked-ads/google-ads-overview.md)
		- **Enabling the Integration** (this page)
		- [Universal App Campaigns (UAC)](/pages/deep-linked-ads/google-ads-uac.md)
		- [Web-based Ads (non-UAC)](/pages/deep-linked-ads/google-ads-non-uac.md)
		- [Troubleshooting & FAQs](/pages/deep-linked-ads/google-ads-troubleshooting.md)  


## OAuth

The first step is connecting Branch & Google Ads together. By connecting these accounts, Branch will have read-only access to import click and impression data at the aggregate level. This will also let Branch track metrics across your different Google Ads accounts, which means your manager (MCC) and children accounts.

It is not necessary to connect all Google Ads accounts. However, you must connect the Google Ads account that owns in-app conversions for your mobile app. Often, this is the MCC account.

!!! tip
	Inside an MCC, it is possible to configure which account (the MCC or the child account) is responsible for conversions. Ensure that you create link IDs with the account that is noted as the Conversion Account under the MCC > Management tab.

	![MCC Accounts](/img/pages/deep-linked-ads/google/mcc-conversion-account.png)

	If you only have access to the child account (but that account is attached to an MCC), you can see which account is recording conversions within the child account as well, by going to _Tools > Conversions > Settings > Conversion Account_ in Google Ads.


### OAuth Google Ads Setup

1. Log in to your [Google Ads dashboard](https://adwords.google.com/aw/overview){:target="\_blank"} account that is responsible for conversions (usually the highest level account). You will have the ability to connect all your Google Ads accounts with Branch.
1. Go to `Settings > Linked Accounts`.
<img src="/img/pages/deep-linked-ads/google/linked-accounts.png" alt="Linked Accounts" class="three-quarters center">
1. Create a new link ID: Go to `Third Party App Analytics > +`.
1. Add a new provider: Select "other" in the drop down. Input Branch's provider ID: `3404357870`.
1. Select iOS or Android.
1. Create Link IDs for all platforms you run campaigns on.
<img src="/img/pages/deep-linked-ads/google/link-id.png" alt="Link IDs" class="three-quarters center">

!!! tip
	- You must be an admin in your Google Ads account in order to generate link IDs.
	- If you are creating link IDs in an MCC, you must share those link IDs with the child account to record conversions. Do this by going to _Options > Share with another account_ and enter the child account ID.

Store these Link IDs for easy access. The next step requires you to input them.

####OAuth Branch Setup

Once you're done with Google Ads, navigate to the [partner management](https://dashboard.branch.io/ads/partner-management){:target="\_blank"} tab and click `Connect with Google`. Choose the email address that is tied to the Google Ads accounts you want to connect.

![Connect Google](/img/pages/deep-linked-ads/google/connect-with-google.png)

Select all the necessary accounts, and continue.

![Connect Accounts](/img/pages/deep-linked-ads/google/connect-accounts.png)

Finally, paste the Link IDs from earlier.

![Create Link IDs](/img/pages/deep-linked-ads/google/link-ids.png)

## Setting Attribution Windows

After you hit save, go to your [Partner Management dashboard](https://dashboard.branch.io/ads/partner-management/a_google_adwords?tab=attribution_windows){:target="\_blank"}, and navigate to Attribution Windows.

For example, if a user clicked an ad 8 days ago, and Google claims credit, we would *not* count attribution, because our default is 7 days from click. However, it is ultimately up to you which attribution window you would like to use. Below is simply a **recommendation**:

- Click to Install : 30 days
- Click to Conversion Event : 90 days
- Click to Open : 90 days

## Importing Events In Google Ads

All that remains is importing Branch events into Google Ads. After you have set both Branch & Google Ads up, wait ~20 minutes, and go back to the Google Ads dashboard. You can expedite this process if you open your app and simulate the events you want forwarded. Navigate back to the Google Ads dashboard.

1. Go to `Conversions`.
<img src="/img/pages/deep-linked-ads/google/conversions.png" alt="Linked Accounts" class="three-quarters center">
1. Add a new conversion: `+ > App > Third Party App Analytics`.
<img src="/img/pages/deep-linked-ads/google/create-conversion.png" alt="Linked Accounts" class="three-quarters center">
1. Import your Branch specific events. Click `Import and Continue`.
1. For any first open event conversions, mark `Include in Conversions` to `YES`.
