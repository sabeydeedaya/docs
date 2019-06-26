## Overview

![TrafficGuard](https://cdn.branch.io/branch-assets/ad-partner-manager//trafficguard-1550889602563.png)

This guide will walk you through how to send your Branch data to **[TrafficGuard](https://www.trafficguard.ai/)** using Branch Data Intgeration.

{! ingredients/deep-linked-ads/overview-steps.md !}

## TrafficGuard Setup

!!! info ""
	You need to be a TrafficGuard customer & must have set up your [Properties within TrafficGuard](https://support.trafficguard.ai/docs/managing-your-properties).

To link your Branch account with TrafficGuard, you will need the following:

- Property ID (of the App you want to link)
- Organization ID
- Measurement API key

### Finding Your Property ID  

1. Open the TrafficGuard Portal.
 2. Go to Properties in the Side Navigation.
3. Select the property you want to link with Branch MMP.
4. Click on Settings or Copy the Property ID.

![image](/_assets/img/pages/integrations/trafficguard/trafficguard-property-id.png)

### Finding Your Organization ID & Measurement API Key

1. Open the TrafficGuard Portal.
2. Go to Settings in the Side Navigation.
3. Copy the Identifier (i.e Organization ID) and the Measurement API key.

![image](/_assets/img/pages/integrations/trafficguard/trafficguard-id-api-key.png)

## Branch Setup

{! ingredients/data-integrations/integrate-branch-sdk.md !}

{! ingredients/data-integrations/enable-partner.md !}

{! ingredients/data-integrations/add-credentials.md !}

### What Branch sends to TrafficGuard

* Install
* Click
* Open
* Commerce Events
* Custom Events

## Advanced

{! ingredients/data-integrations/reset-di-settings.md !}
