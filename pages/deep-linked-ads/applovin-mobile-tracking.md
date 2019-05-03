## Overview

![Applovin](https://cdn.branch.io/branch-assets/ad-partner-manager/386574786681131050/AppLovin-1525376288411.png)

This guide will walk you through how to setup your campaigns with **[Applovin](https://www.applovin.com/)** using Branch Universal Ads and track ad conversions across **every device, platform, and channel**.

{! ingredients/deep-linked-ads/overview-steps.md !}

## Setup

{! ingredients/deep-linked-ads/integrate-branch-sdk.md !}

{! ingredients/deep-linked-ads/conversion-events-tracking.md !}

{! ingredients/deep-linked-ads/enable-partner.md !}

![image](/_assets/img/pages/deep-linked-ads/applovin/applovin-enable.png)

#### Provide account credentials

Enter any credentials that may be required, and click Save and Enable in the bottom right hand corner.

!!! tip "Applovin SDK Key"
	You can find your SDK Key in the Account > Keys section on Applovin UI

{! ingredients/deep-linked-ads/enable-partner-tip.md !}

![image](/_assets/img/pages/deep-linked-ads/applovin/applovin-postbacks.png)

{! ingredients/deep-linked-ads/create-ad-link.md !}

!!! info "OS Targeting"
	If you are targeting specific OS devices, please note that you have to remove `%24aaid={AAID}` for iOS campaigns and `%24idfa={IDFA}` for Android campaigns.

{! ingredients/deep-linked-ads/view-ad-link-data.md !}

{! ingredients/deep-linked-ads/people-based-attribution.md !}

{! ingredients/deep-linked-ads/view-through-attribution.md !}

{! ingredients/deep-linked-ads/granting-partner-access.md !}

## Advanced

{! ingredients/deep-linked-ads/add-more-postbacks-short.md !}

{! ingredients/deep-linked-ads/all-events-toggle.md !}

{! ingredients/deep-linked-ads/whitelist-ip.md !}

{! ingredients/deep-linked-ads/edit-postbacks.md !}

{! ingredients/deep-linked-ads/tracking-link-params.md !}

{! ingredients/deep-linked-ads/attribution-windows.md !}

{! ingredients/deep-linked-ads/reset-ad-settings.md !}

{! ingredients/deep-linked-ads/support.md !}
