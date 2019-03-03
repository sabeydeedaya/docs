## Overview

The Kochava integration sends **all clicks on a Branch link** from Branch to Kochava, for the enabled platform. Now you can see your valuable Branch attribution data in your Kochava dashboard.

Kochava offers unique, holistic and unbiased app measurement. From attribution and analytics to optimization, the Kochava platform provides precise, real-time visualization of campaign and app performance from ad impression through user lifetime value. Kochava customers enjoy a suite of optimization tools including Configurable Attribution, Fraud Detection and over 2200 certified network & publisher integrations including super publishers like Facebook, Instagram, Google and Pandora.

## Setup

### Prerequisites
- This guide requires you to have already integrated the Branch mobile SDKs into your app.
- You also need to be a Kochava customer and have the [Kochava SDK installed](http://support.kochava.com/sdk-integration) in your app.

### Create Campaign IDs in Kochava

For each platform (iOS and Android) you should create campaign IDs. You will do this in the Kochava dashboard.

#### Create a campaign

1. Log in to Kochava.
1. Select the desired app .
1. Select `App Tools > Campaign Manager`
1. Click `Add a Campaign`
1. Enter a unique Campaign name.

#### Create a Segment

1. Select `Campaign Tools>New Segment`
1. Enter a Segment Name.
1. Click submit

#### Create a tracker

1. Click `Segment Tools > New Tracker`
1. Enter the Tracker Name.
1. Select `Tracker Type>3rd Party Tracking` (default setting)
1. Select `Select A Network > Branch`
1. Click submit. (If no further trackers need to be created).

Once you've clicked `Submit` you should see a screen with the campaign ID.

![image](/_assets/img/pages/integrations/kochava/kochava-dashboard.png)

### Configure the Branch Dashboard

1. In the Branch dashboard, go to the [Integrations page](https://dashboard.branch.io/integrations) and look for the **Kochava** card.
1. Click **Enable** on the card
1. Enter your Kochava campaign ID for the relevant platform
1. Hit **Save**

![image](/_assets/img/pages/integrations/kochava/enable-kochava-integration.png)

## Advanced

### Advanced network segmentation with Kochava

If you are interested in advanced network attribution segmentation in Kochava, you can use the same attribution parameters from a Kochava Click URL with your Branch link, and switch out campaign_ids. Please note that using this method will override the default attribution of Branch links to their default campaign in Kochava (only the specific Branch links that you do this for will not attribute to the default campaign).


1. Start with an existing Branch link, for example, a [ Quick Link](../../dashboard/analytics/#quick-links).
1. Next, [create a Kochava Click URL](http://support.kochava.com/campaign-management/create-an-install-campaign){:target="\_blank"} in the Kochava Dashboard with the parameters you'd like to capture.
	- Select the "Click" URL (as opposed to the Impression URL)
	- After creating the URL, copy everything after **click** value and append the parameters to the end of your Branch link.

**Example**

Here's an example of a finalized link for Branch and Kochava:

```
https://mylinks.app.link/8AHjQx0fyv?
	campaign_id=kokochavabranchdemo90128398&
	network=Bing
```

## Support

### General debugging tips

When working with Kochava, be sure you are **not** using test mode.
