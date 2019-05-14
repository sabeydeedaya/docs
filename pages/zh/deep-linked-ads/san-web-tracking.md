# A guide to web tracking with SANs

## Overview

Branch offers a truly cross-platform measurement solution that allows customers to track either web or app campaigns. Branch helps you navigate the different tracking configurations available across the major ad networks so you can ensure accurate tracking in all your campaigns.

This article covers the generic setup & troubleshooting steps for Facebook & Google web campaigns, but applies to other SANs such as Snap.

!!! info
	This article is about tracking web campaigns with Self-Attributing Networks (SANs), particularly Google and Facebook. "Web" campaigns means ads that serve on either mobile web or app inventory but direct to a website rather than an app.

	For tracking app campaigns, please see the relevant documentation for [Google](/deep-linked-ads/google-ads-overview/#other-campaigns) and [Facebook](/deep-linked-ads/facebook-ads-overview/).

	For non-SAN web campaigns (for example, affiliate web tracking), please find the relevant partner's documentation in the Branch docs sidebar.

## Generic Setup

### Integrate the Web SDK

First, you'll want to ensure you are capturing web conversions by [integrating the Branch Web SDK](/web/integrate/#overview) and the [relevant conversion events for web](/web/integrate/#track-commerce). When the SDK is integrated, important metrics such as *web session starts* are automatically captured, and you should add additional conversion events as noted above.

### Creating links

1. Navigate to the relevant partner (e.g. Google) to [create an ad link](/deep-linked-ads/google-xplatform-search-ads/#standard-search-ads).
1. Ensure all the redirects are set to *websites* to avoid any policy violations.
1. **IMPORTANT**. Ensure that the link has the following properties:
    1. **All desired analytics tags**. If you don't add analytics tags, you won't see clicks alongside downstream conversion events in the Branch dashboard later. At a minimum you will want to set the *Campaign* (*~campaign* as query parameter or link data), but if you want to filter by other analytics tags, please add those.

        !!! success
            In order to line up *impressions*, *clicks* and *cost* with all downstream events, analytics tags must be present on the link and the values must *exactly* match the values in the Ad Network's dashboard.

    1. **Campaign ID** (*~campaign_id* in link data). Campaign ID is required to avoid duplicating clicks. More on this in the troubleshooting section.

			1. For Google, the Campaign ID can be dynamically filled in using the `{campaignid}` ValueTrack Parameter *~campaign_id={campaignid}*.

			An example link for Google might look like this, where the campaign is set to the exact campaign name in link data (`"~campaign":"WL Web Traffic Campaign 10-23"`) and the Campaign ID macro will be dynamically populated.
	    *https://branchster.app.link/An3S78aUa?%243p=a_google_adwords&~campaign_id={campaignid}*

			For more information on available dynamic parameters for Google, please [Google's ValueTrack Parameter documentation](https://support.google.com/google-ads/answer/6305348).

			1. For Facebook, the Campaign ID can by dynamically filled in using the `{campaign.id}` dynamic parameter.

			An example link for Facebook might look like this, where the campaign is set to the exact campaign name in link data (`"~campaign":"WL Web Traffic Campaign 10-23"`) and the Campaign ID macro will be dynamically populated.
      *https://branchster.app.link/M34SLszUZ1?%243p=a_facebook&campaign_id={{campaign.id}}*

		  For more information on available dynamic parameters for Facebook, please [Facebook's URL Parameters documentation](https://www.facebook.com/business/help/1016122818401732).


    As with all links, you don't have to use short links created through the dashboard, as long as you have long links with the relevant properties (*$3p*, *~feature=paid%20advertising*, *~campaign* etc.) then you can create long links dynamically.

### Placing links in campaigns

As a general rule, links for Google campaigns will be placed in the *tracking template* field at the relevant level, and links for Facebook campaigns will be placed in the *Website URL* field.

If you're a Google expert, you may notice ways to scale the deployment of tracking links. For example, you can use the campaign-level tracking template field, and [custom parameters](https://support.google.com/google-ads/answer/6325879) for ad-level macros. In all cases, as long as the right analytics tags are placed in the right locations, tracking will be maintained and full-funnel data will be visible in Branch.

## Troubleshooting

If you follow the above steps, you shouldn't have any issues. However, if you miss a step you might see unexpected data. You should know that clicks, impressions and cost data can be ingested into the Branch dashboard via the reporting APIs provided by SANs, and *clicks* can also appear through the links you set up as described above. Branch therefore has two sources for clicks. This is because app campaigns (such as Google UACs or Facebook App Install campaigns) *do not* allow links and therefore we must ingest click data via API.

Here are some things to know:

1. If a campaign ID has a downstream event (attributed open, install, reinstall or web session start) then we'll show the click data from links or API on the dashboard. If there is no downstream event, then the campaign (along with its click, impression and cost data) will not appear in the dashboard.
1. If link clicks containing campaign ID are recorded, we *won't* show any click data *ingested via API* in the dashboard, to avoid double counting link clicks & API-ingested clicks. So, if you put links in some, but not all, ads in a campaign you can expect to see missing clicks.
1. If you have a link with a campaign name matching the ad network's campaign name, but *no campaign ID on the link*, you will see duplicate click numbers in the dashboard.
1. For link-tracked web campaigns, you can only compare by values that are present as an analytics tag on the link. So if you have a campaign ID, but don't have ~campaign or ~ad_name etc. on the link, you can't compare by campaign name in the dashboard, and data might seem "missing."
