## Overview

![Oath](https://cdn.branch.io/branch-assets/ad-partner-manager/386574786681131050/oath-1544044998484.png)

This guide will walk you through how to setup your campaigns with **[Oath](https://gemini.yahoo.com/advertiser/home)** using Branch Universal Ads and track ad conversions across **every device, platform, and channel**.

{! ingredients/deep-linked-ads/overview-steps.md !}

## Setup

{! ingredients/deep-linked-ads/integrate-branch-sdk.md !}

{! ingredients/deep-linked-ads/conversion-events-tracking.md !}

{! ingredients/deep-linked-ads/enable-partner.md !}

![image](/img/pages/deep-linked-ads/oath/oath-enable.png)

{! ingredients/deep-linked-ads/add-credentials.md !}

{! ingredients/deep-linked-ads/enable-partner-tip.md !}

![image](/img/pages/deep-linked-ads/oath/oath-postbacks.png)

!!! warning "Send All Events"
	By default, postbacks to Oath are enabled to send all events to Oath, not just those events attributed to them.  Please ensure this setting remains set to `All Events`.

{! ingredients/deep-linked-ads/create-ad-link.md !}

{! ingredients/deep-linked-ads/view-ad-link-data.md !}

{! ingredients/deep-linked-ads/people-based-attribution.md !}

!!! tip "Viewing Oauth Attributions"
	When viewing attributions in your Oauth reporting, you will notice attributions for both the Yahoo Gemini channel as well as their DSP Brightroll.  As Branch links can only be used for the Yahoo Gemini channel, Branch analytics can only show attributions specific to Yahoo Gemini.

{! ingredients/deep-linked-ads/view-through-attribution.md !}

## Advanced

{! ingredients/deep-linked-ads/add-more-postbacks-short.md !}

{! ingredients/deep-linked-ads/all-events-toggle.md !}

{! ingredients/deep-linked-ads/whitelist-ip.md !}

{! ingredients/deep-linked-ads/edit-postbacks.md !}

{! ingredients/deep-linked-ads/tracking-link-params.md !}

{! ingredients/deep-linked-ads/attribution-windows.md !}

{! ingredients/deep-linked-ads/reset-ad-settings.md !}

{! ingredients/deep-linked-ads/support.md !}
