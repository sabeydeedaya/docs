## Overview

With a push of a button you can send your Branch data to your Google Analytics dashboard, helping you understand the power of Branch as an acquisition pathway. If you're interested in the segment of users coming into your apps through Branch and want to measure their events against your other cohorts, this guide can help.

### How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which links are leading to installs, re-opens, and users' actions. Enabling this integration and providing your Google Analytics Tracking Id will result in Branch automatically forwarding referred events to Google Analytics, in the exact format Google Analytics expects. This includes automatically setting various UTM tags that can be used to determine the source of new users.

### What events does Branch send?

Branch will send *referred* **installs** and **opens**, as well as any **custom events** you track with Branch. Non-referred events, clicks, web session starts, and pageviews will be excluded. Branch also sends over analytics data that is attached to the link, whether it's UTM tags or fields set on the Branch Dashboard (e.g. Campaign, Channel, Feature). This will allow you to analyze which campaigns, channels, etc. are helping you acquire and engage users. You can see the list of fields that we send to Google Analytics [here](#what-branch-sends-to-google-analytics).

### What does it look like?

Branch events will appear alongside your other tracked events in Google Analytics. Here is an example of the Sources screen with test information set.

![image](/_assets/img/pages/integrations/google-analytics/google-analytics-sources.png)

To view referred **installs** and **opens**, as well as any custom events you track with Branch as they are occur, navigate to Real-Time > Events. The event category for all referred Branch events is **BranchEvent**.

![image](/_assets/img/pages/integrations/google-analytics/google-analytics-open.png)

## Setup

### Prerequisites
- This guide requires you to have already integrated the Branch mobile SDKs and the Google Analytics SDK into your app.

### Enter your Google Analytics Tracking ID

For the basic, codeless integration: find your Google Analytics Tracking ID (tid) and enter it into the Branch Dashboard.

1. To locate your Google Analytics Tracking ID, navigate to https://analytics.google.com and log in.
1. Click on **Home** in the navigation bar at the top of the page. You should see your app(s), with accompanying Tracking ID.
1. Copy the Tracking ID of whichever app you’re going to use with Branch. This is also known as the Property ID, and it is of the form UA-XXXXXX-YY (e.g. UA-000000-01). Here’s an example: ![image](/_assets/img/pages/integrations/google-analytics/tid.png)

### Configure the Branch Dashboard

1. On the Branch Dashboard (dashboard.branch.io), navigate to the [Integrations page](https://dashboard.branch.io/integrations).
1. Locate Google Analytics and choose **Enable**.
  * If you have not yet entered billing information, please do so now.
1. Enter your Google Analytics Tracking ID and hit **Save**

![image](/_assets/img/pages/integrations/google-analytics/enable-ga.png)

!!! warning "Please test your integration!"
    Branch is not responsible for inaccurate API keys.

### Mandatory: pass Client ID to Branch

!!! warning "Required for integration"
    If you don't include the below code snippet, events will be sent to Google but Google Analytics will not ingest them and they will not be visible on the Google Analytics dashboard.

Please specify `$google_analytics_client_id`. We will pass that to Google (as *cid*) so Google can match the events we send them to a specific user.

**iOS:**

Please add the following before initializing the Branch session:

Swift:
```swift
let branch = Branch.getInstance();
let val = gai.tracker(withTrackingId: "key")
branch.setRequestMetadataKey("$google_analytics_client_id", value:val?.get("&cid"))
```

**Android:**

Please call the following line right after you instantiate Branch in your Application’s #onCreate or Activity’s #onCreate (and before you call initSession):

```java
mTracker = sAnalytics.newTracker("UA-XXXXXXXX-1");

String client_id = mTracker.get("&cid");
Branch.getInstance().setRequestMetadata("$google_analytics_client_id",client_id);
```

## Advanced

### Optional Parameter - User ID

If you specify `$google_analytics_user_id`, we can pass that to Google (as `uid`).

**iOS:**

You can add the following before initializing the Branch session:

```obj-c
[[Branch getInstance] setRequestMetadataKey:@"$google_analytics_user_id" value:@"USER-ID-HERE"];
```

**Android:**

You can call the following line right after you instantiate Branch in your Application’s #onCreate or Activity’s #onCreate (and before you call initSession):

```java
Branch.getInstance().setRequestMetadata("$google_analytics_user_id", "USER-ID-HERE");
```

### What Branch Sends to Google Analytics

| Property Name | Value | Sourced from | Example | Req
| --- | --- | --- | --- | ---
| v | API version | [fixed] | 1 | Y
| tid | Tracking ID | Branch Dashboard | UA-XXXXXX-Y | Y
| ds | Source (mobile SDK) | [fixed] | app | Y
| an | Application Name | [fixed] | BRANCH-APP | Y
| t | Type | [fixed] | event | Y
| ec | Event Category | [fixed] | BranchEvent | Y
| cid | Client ID | (discussed above, includes $google_analytics_client_id) | AEBE52E7-03EE-455A-B3C4-E57283966239 | Y
| uid | User Id | $google_analytics_user_id | User A | N
| cn | Campaign Name | utm_campaign -or- Branch campaign  | "Beaches and breezes" | N
| cs | Campaign Source | utm_source -or- Branch channel | "Twitter" | N
| cm | Campaign Medium | utm_medium -or- Branch feature  | "480banner" | N
| ck | Campaign Keywords | utm_term -or- Branch $keywords | ["Keyword1", "keyword3"] | N
| cc | Campaign Content | utm_content -or- Branch tags | "Some content" | N
| ea | Event Action (Name) | event name | install | Y
| uip | User’s IP Address | collected by Branch SDK | 111.111.111.111 | N
| z | Cache buster | [unix time + random number] | 1461878903666 | N

!!! protip "Anonymous Client ID"
    If for some reason Branch does not receive an advertising identifier or hardware identifier, and you do not explicitly specify a `$google_analytics_client_id`, then Branch will send `anonymous` as the Client ID (`cid`). This is a required field by Google Analytics.

## Troubleshooting

### Very short or nonexistent session lengths

Google Analytics will automatically start a session when Branch sends over installs and opens. Because of this, you should remove any code that creates a new session when your application starts up. For example, on iOS, you may be firing an event with the following:

```objc
[builder set:@"start" forKey:kGAISessionControl];
```

You should remove this so that your app does not start a new session. Otherwise you may see zero second sessions and your average session length drop.

### Data not appearing in Google Analytics

1. Check your property ID in the Branch dashboard matches the property ID in Google Analytics
1. Ensure you are looking at the right part of the Google Analytics dashboard. The data should appear in `Acquisition > Sources > All`
1. Check that your Google Analytics Views don't have any filters on them. For example, if your View filters out users in the United Kingdom, and your Branch opens are from users in the United Kingdom, you won't see this Branch data in your View.
