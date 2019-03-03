## Overview

We've partnered with Localytics to provide an easy way to deliver Branch installs and attributions to your Localytics dashboard. This is great for segmenting your users and providing higher granularity for your organic cohorts vs paid cohorts.

### How it works

We have built a custom integration to automatically send all Branch install data to Localytics without any extra work on your side (besides integrating both SDKs). We just need some configuration information from your Localytics account, and we'll take care of the rest.

!!! protip "How do we differentiate Localytics and Branch installs?"
    We rely on a Branch link being clicked which leads to an install. This sets an internal boolean that an install came from Branch.

## Setup

### Prerequisites

- This guide requires you to have already integrated the Branch mobile SDK into your app.
- You also need to [sign up for a Localytics account](https://www.localytics.com/free-trial-signup/) and [install the Localytics SDK](http://docs.localytics.com/).

### Set up Localytics

1. On the Localytics dashboard, navigate to the **Attribution** section, click the **•••** (overflow) button, and select **Settings**.
![image](/_assets/img/pages/integrations/localytics/localytics-more.png)
1. Once there, you'll need to add your **Store ID** (iTunes for iOS, Play Store for Android).
1. Under the section **Ad Tracking Setup**, check the box labeled **Third-party Attribution**. This will enable an **Attribution ID** for you. Copy it, and have it handy for the next steps.
![image](/_assets/img/pages/integrations/localytics/localytics-attr-settings.png)

!!! protip "What does this mean?"
    Once you have selected to allow third-party attribution, Localytics will attribute non-Localytics installs to your dashboard. **This information is delayed by 10 minutes.**



### Configure the Branch Dashboard

1. On the Branch Dashboard (dashboard.branch.io), navigate to the [Integrations page](https://dashboard.branch.io/integrations).
1. Locate Localytics and choose **Enable**.
  * If you have not yet entered billing information, please do so now.
1. Enter your Localytics Attribution ID for each platform and hit **Save**

![image](/_assets/img/pages/integrations/localytics/enable-localytics-integration.png)

!!! warning "Please test your integration!"
    Branch is not responsible for inaccurate API keys.

## Advanced

### What Branch sends to Localytics

Branch Analytics Tag | Localytics Data Placeholder Tag
--- | ---
Campaign | campaign

Branch will also send any arbitrary parameters you attach to a link on to Localytics.  All Branch data will appear in the Localytics "Attribution" dashboard, but not the "Events" dashboard.

## Support

### Debugging strategies

When debugging Localytics, be sure to wait 10 minutes after you simulate an install. Also be sure to collect IDFA or Google Advertising ID.
