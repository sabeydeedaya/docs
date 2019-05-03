## Overview

![Oath](https://cdn.branch.io/branch-assets/ad-partner-manager/386574786681131050/oath-1544044998484.png)

Branch is able to support the attribution of Gemini/Native & Search inventory from Oath Ad Platforms using Branch links, and is able to send data to Oath which can attribute both Gemini and DSP inventory.

Oath Ad Platforms has two main products/channels relevant to mobile advertising and attribution - (Yahoo!) Gemini/Native & Search, and the (formerly Brightroll) DSP.

Yahoo Gemini used to operate as a standard integration (driving clicks with identifiers and receiving postbacks after attribution), but added Self-Attributing Network (SAN) functionality which also covers DSP inventory.

Because Branch is not yet ready to fully ingest the SAN response for attribution, we operate a hybrid approach utilizing the legacy Gemini integration for attribution in Branch, while pushing all data to the SAN endpoint which can attribute both channels.

This guide will walk you through how to setup your campaigns with **[Oath](https://gemini.yahoo.com/advertiser/home)** using Branch Universal Ads and track ad conversions across **every device, platform, and channel**.

{! ingredients/deep-linked-ads/overview-steps.md !}

## Setup

{! ingredients/deep-linked-ads/integrate-branch-sdk.md !}

{! ingredients/deep-linked-ads/conversion-events-tracking.md !}

{! ingredients/deep-linked-ads/enable-partner.md !}

![image](/_assets/img/pages/deep-linked-ads/oath/oath-enable.png)

{! ingredients/deep-linked-ads/enable-partner-tip.md !}

![image](/_assets/img/pages/deep-linked-ads/oath/oath-postbacks.png)

!!! warning "Send All Events"
	By default, postbacks to Oath are enabled to send all events to Oath, not just those events attributed to them. This allows Oath to attribute on Gemini and DSP inventory. Please ensure this setting remains set to `All Events`.

{! ingredients/deep-linked-ads/create-ad-link.md !}

{! ingredients/deep-linked-ads/add-agency-prefix-san-only.md !}

{! ingredients/deep-linked-ads/view-ad-link-data.md !}

!!! tip "Viewing Oath Attributions"
	When viewing attributions in your Oath reporting, you will notice attributions for both the Yahoo Gemini channel as well as their DSP Brightroll.  As Branch links can only be used for the Yahoo Gemini channel, Branch analytics can only show attributions specific to Yahoo Gemini.

{! ingredients/deep-linked-ads/view-through-attribution.md !}

{! ingredients/deep-linked-ads/granting-partner-access.md !}

## Advanced

{! ingredients/deep-linked-ads/add-more-postbacks-short.md !}

{! ingredients/deep-linked-ads/all-events-toggle.md !}

{! ingredients/deep-linked-ads/tracking-link-params.md !}

{! ingredients/deep-linked-ads/attribution-windows.md !}

{! ingredients/deep-linked-ads/reset-ad-settings.md !}

{! ingredients/deep-linked-ads/support.md !}
