## Overview

With a push of a button you can send your Branch data to your Segment dashboard, helping you to understand the power of Branch as an acquisition pathway, export your data to your entire suite of analytics tools and build custom audiences upon Branch data.

This documentation explains how to send **Branch-referred events to Segment**. If you'd like to send Segment events to your Branch dashboard, please review the Branch/segment SDK Kit integration documentation for [iOS](https://github.com/BranchMetrics/Segment-Branch-iOS) and [Android](https://github.com/BranchMetrics/Segment-Branch-Android).

### How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which links are leading to installs, re-opens, and users' actions. Enabling this integration and providing your Segment credentials will result in Branch automatically forwarding attributed events to Segment, in the exact format Segment expects.

### What events does Branch send?

Branch will send *attributed* **installs** and **opens**, as well as any **custom events** and **commerce events** you track with Branch. Non-referred events, clicks, web session starts, and pageviews will be excluded. Branch also sends all the data that is attached to the link that drove the referred event. This will allow you to analyze which campaigns, channels, etc. are helping you acquire and engage users. You can see the list of fields that we send to Segment [here](#what-branch-sends-to-segment).

!!! warning "WebSDK events not supported"
    We do not support Segment export for Branch WebSDK events. 

### What does it look like?

Branch events will appear as an event prepended with **branch_** in your Segment debugger.

![image](/_assets/img/pages/integrations/segment/segment-debugger_1.png)

Additionally, individual events, such as those seen in Live View or visible when looking at People, will have Branch link data included. Here's an example:

![image](/_assets/img/pages/integrations/segment/segment-debugger_2.png)

## Setup

### Prerequisites
- This guide requires you to have already integrated the Branch and Segment mobile SDK(s).

### Retrieve Segment Token

Find your Segment Token and enter it into the Branch Dashboard.

1. Navigate to [https://app.segment.com](https://app.segment.com/) and log into the Dashboard.
1. In the dashboard, navigate to your desired Workspace.
1. In that Workspace, navigate to **Sources** and select the Source that has your app listed. Branch is not yet an independent Source, so Branch events appear within your app's Source.

    ![image](/_assets/img/pages/integrations/segment/segment-sources.png)

1. Click through to _Settings > API Keys_

    ![image](/_assets/img/pages/integrations/segment/segment-keys.png)

1. Copy your key and secret - you'll enter it into the Branch dashboard in a minute.


### Configure Branch Dashboard

{! ingredients/data-integrations/enable-data-integrations.md !}

1. On the Branch Dashboard (dashboard.branch.io), navigate to the [Integrations page](https://dashboard.branch.io/integrations).
1. Search for Segment and click on the tile.
1. Enter your Segment Token and hit **Enable**.

    ![image](/_assets/img/pages/integrations/segment/enable-segment.png)

!!! warning "Please test integration!"
    Branch is not responsible for inaccurate API keys.

### Pass Segment Anonymous ID

When you're ready to send data through Branch, you'll need to make sure you pass through the configured Segment Anonymous ID the Branch SDKs. In order to do so, you'll ask the Segment SDK to provide you with the Segment Anonymous ID, and pass this value through `setRequestMetadataKey` on the Branch SDKs.

Here's a sample snippet showing this. **NOTE** you must set the correct key before calling *initSession*. You must also initialize the Segment SDK before setting the request metadata in the Branch SDK.

**iOS**

Inside *didFinishLaunchingWithOptions*

```objc

Branch *branch = [Branch getInstance];
[[Branch getInstance] setRequestMetadataKey:@"$segment_anonymous_id" value:[[SEGAnalytics sharedAnalytics] getAnonymousId]];
```

**Swift**

Inside *didFinishLaunchingWithOptions*

```swift

if let branch = Branch.getInstance() {
    branch.setRequestMetadataKey("$segment_anonymous_id", value:"1234" as NSObject!);
}
```

**Android**

Before you initialize in your Application#onCreate or Deep Link Activity's #onCreate.

```java

Branch.getInstance().setRequestMetadata("$segment_anonymous_id", com.segment.analytics.Analytics.with(this).getAnalyticsContext().traits().anonymousId());

...

Branch.initSession(...);
```

In the above snippet, `this` is the Activity context.


## Advanced

### What Branch Sends to Segment

| Property | Value | Sourced from | Example
| --- | --- | --- | ---
| event | Branch event | event name | branch_OPEN
| event_id | Unique ID for the event | Branch event ID | 469939270182891107
| properties | Branch Link Data Dictionary | Last Attributed Touch Data for the link to which the event was attributed | "campaign": "Segment test", "channel": "Slack"
| device_info | Device Data, like OS | Branch User Data for the device | "os": "ANDROID"
| anonymousId | Segment Anonymous ID | Segment SDK provided Anonymous ID | 12356
| IP | IP of the event | Device | 192.82.115.928

All of the above properties are received as flat _properties[key]_, even though some are stored as dictionaries in Branch. They are grouped in our documentation for legibility.
