## Overview

![Aura Ironsource](https://s3.amazonaws.com/platform_static_files/adnetwork_logos/ironsourceaura_new.png)

This guide will walk you through how to setup your campaigns with **[Aura Ironsource](https://company.ironsrc.com/enterprise-solutions/)** using Branch Universal Ads and track ad conversions across **every device, platform, and channel**.

{! ingredients/deep-linked-ads/overview-steps.md !}

## Setup

### Integrating the Branch Android SDK and tracking in-app events

The Branch SDK for Android allows you to get up and running quickly.

If you haven't already integrated Branch SDK into your application, please follow our integration guide to integrate Branch SDK into your application:

- Documentation for [Android](/apps/android/)

- iOS not supported

!!! warning "Limitations with setDebug and seeing data in Branch"
	When integrating the SDKs, it's often useful to use setDebug to verify that your app is able to communicate with Branch servers, and is receiving deep link data. However, our upstream systems don't register test events sent using setDebug, so events will not appear in Liveview or Analytics, nor will they fire postbacks. You should disable setDebug when looking at Liveview or testing postbacks.

{! ingredients/deep-linked-ads/conversion-events-tracking.md !}

{! ingredients/deep-linked-ads/enable-partner.md !}

![image](/_assets/img/pages/deep-linked-ads/aura-ironsource/auraironsource-enable.png)

{! ingredients/deep-linked-ads/add-credentials.md !}

{! ingredients/deep-linked-ads/enable-partner-tip.md !}

![image](/_assets/img/pages/deep-linked-ads/aura-ironsource/auraironsource-postbacks.png)

{! ingredients/deep-linked-ads/aura-ironsource-create-ad-link.md !}

{! ingredients/deep-linked-ads/view-ad-link-data.md !}

{! ingredients/deep-linked-ads/people-based-attribution.md !}

{! ingredients/deep-linked-ads/view-through-attribution.md !}

{! ingredients/deep-linked-ads/granting-partner-access.md !}

## Advanced

{! ingredients/deep-linked-ads/add-more-postbacks-short.md !}

{! ingredients/deep-linked-ads/all-events-toggle.md !}

{! ingredients/deep-linked-ads/whitelist-ip.md !}

{! ingredients/deep-linked-ads/edit-postbacks.md !}

### Tracking Link Parameters

Branch Tracking links allow tracking many parameters about the performance of your ad campaigns and individual ads. Additional parameters for advanced analysis may be added to the link after the '?' or '&' character, to trace extra information.

!!! tip "Example Tracking Link with Additional Parameters"
    Example Branch link including additional parameters to pass Agency and Sub Publisher information:`https://tracking.app.link?%243p=a_partner&~agency=myAgency&~secondary_publisher=best_publisher`

The following parameters are available to use within the pre-generated tracking link:

#### Campaign Information

Branch Parameter | Description
--- | ---
~agency | Agency name
~secondary_publisher | Sub Publisher
~campaign | Campaign name
~campaign_id | Campaign ID
~channel | Channel
~feature | Feature
~stage | Stage
~tags | Tags
~creative_name | Creative name
~creative_id | Creative ID
~ad_set_name | Ad set name
~ad_set_id | Ad set ID
~ad_name | Ad unit name
~ad_id | Ad unit ID
~banner_dimensions | Banner Dimension
~placement | Placement
~keyword_id | Keyword ID
~keyword_text | Keyword Text

#### Device Information

Branch Parameter | Description
--- | ---
%24aaid | Google AAID

#### Spend Calculation

!!! info "Cost Data Availability"
    Cost data passed via these macros is available in exports but is not visible in the Branch dashboard.

Branch Parameter | Description
--- | ---
~cost_model | Cost Model
~cost_value | Cost Value
~cost_currency | Cost Currency


{! ingredients/deep-linked-ads/attribution-windows.md !}

{! ingredients/deep-linked-ads/reset-ad-settings.md !}

{! ingredients/deep-linked-ads/support.md !}
