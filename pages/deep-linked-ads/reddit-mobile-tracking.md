## Overview

![Reddit](https://cdn.branch.io/branch-assets/ad-partner-manager/388787843096400122/reddit-1-logo-png-transparent-1535415950775.png)

This guide will walk you through how to setup your campaigns with **[Reddit](http://www.reddit.com)** using Branch Universal Ads and track ad conversions across **every device, platform, and channel**.

Branch Universal Ads provides everything you need for complete tracking.

The basic integration involves two parts:

1. Integrating the SDKs and tracking in-app events
1. Creating tracking links

## Setup

{! ingredients/deep-linked-ads/integrate-branch-sdk.md !}

{! ingredients/deep-linked-ads/conversion-events-tracking.md !}

{! ingredients/deep-linked-ads/enable-partner.md !}

![image](/_assets/img/pages/deep-linked-ads/reddit/reddit-enable.png)

{! ingredients/deep-linked-ads/create-ad-link.md !}

!!! caution "Platform-specific Ad Links"
    You should created a separate links to track iOS and Android campaigns.

!!! warning "Non-App Install Campaigns on iOS"
    If you run campaign types other than for app installs, you must make sure to add  `$use_https_app_store:true`to your ad link for iOS campaigns. Doing so ensures that users are still redirected to the app store if you have the redirect set to app store for iOS devices. 

### Reddit Campaign Ad Settings

Once you've created your Branch link, create a new campaign in your Reddit account and ensure the following:

- Select the `App Install` campaign objective.
- Place your Branch link in the `Ad Click Tracker` field.
- Place your app's App Store URL in the 'Link' field.

![image](/_assets/img/pages/deep-linked-ads/reddit/reddit-campaign-setup.png)

{! ingredients/deep-linked-ads/view-ad-link-data.md !}

{! ingredients/deep-linked-ads/people-based-attribution.md !}

{! ingredients/deep-linked-ads/view-through-attribution.md !}

{! ingredients/deep-linked-ads/granting-partner-access.md !}

## Advanced

{! ingredients/deep-linked-ads/tracking-link-params.md !}

{! ingredients/deep-linked-ads/attribution-windows.md !}

{! ingredients/deep-linked-ads/reset-ad-settings.md !}

{! ingredients/deep-linked-ads/support.md !}
