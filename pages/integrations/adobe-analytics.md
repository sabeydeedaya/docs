## Overview

With a push of a button you can send your Branch data to your Adobe Analytics dashboard, helping you understand the power of Branch as an acquisition pathway.

### How does it work?

Once the Branch SDK is integrated into an app, Branch can detect which links are leading to installs, re-opens, and users' actions. Enabling this integration and providing your Adobe Analytics Information will result in Branch automatically forwarding referred events to Adobe Analytics through a server to server integration.

### What events does Branch send?

Branch will send *referred* **installs** and **opens**, as well as any **custom events** you track with Branch. Non-referred events, clicks, web session starts, and pageviews will be excluded. Branch also sends all the analytics tags that are attached to the link that drove the referred event. This will allow you to analyze which campaigns, channels, etc. are helping you acquire and engage users.

### What does it look like?

Branch events will appear on the Adobe Analytics dashboard through `Reports > Custom Conversion > Branch eVar`. Note, this will automatically appear once the Branch Data Connector is enabled through the Adobe Analytics dashboard.

You'll have the flexibility to analyze data as needed in the Adobe Analytics platform, as the data Branch sends maps in Adobe Analytics to a top level eVar. This eVar contains campaign, channel, target, event name, and action property, which are your analytics tags.

![image](/_assets/img/pages/integrations/adobe-analytics/adobe-analytics-conversion.png)

Branch events are similar to Adobe Analytics events in that they can be used to build custom reports and are tracked on the various pages and dashboards. However, unlike normal events, Branch events contain valuable information about how users ended up in your app in the first place.

## Setup

### Prerequisites

- This guide requires you to have integrated the Branch SDK in your mobile apps.
- You also need to be a Adobe Analytics customer and have the Adobe Analytics SDK integrated.

### Activate the Branch Data Connector

In your Adobe Analytics dashboard, under the *Admin* tab, find *Data Connectors*.

![image](/_assets/img/pages/integrations/adobe-analytics/select-data-connectors.png)

Click *+Add New*, search for "Branch," and click *Activate*.

![image](/_assets/img/pages/integrations/adobe-analytics/activate-connector.png)

### Configure the Branch Data Connector

#### Integration Settings

These are automatically configured when you activate the Data Connector.

#### Variable Mappings

Map your Branch events to your chosen eVar. In the example below, it will be mapped to `Custom eVar 1`, renamed to the SiteCatalyst metric `Branch`.

![image](/_assets/img/pages/integrations/adobe-analytics/variable-mappings.png)

#### Data Settings

Branch has provided a default classification rule set for the Branch data that will be ingested. This maps Branch analytics data to Adobe classifications as follows. You can change this classification rule set if you would like to, but editing is not required. We also include Branch tags so you can create a new rule that further segments your analytics data for advanced visibility.

Adobe Classification | Branch Analytics Tag | Example
--- | ---
Source | Channel | Our Website
Campaign | Campaign | Journeys Test Campaign
Medium | Feature | Journeys
Action | Branch Event Name | Install
Action Property| Branch Tags | tag=bar&tag2=1234

![image](/_assets/img/pages/integrations/adobe-analytics/data-settings.png)

#### Review Summary

Finally, review the integration, scroll to the bottom of the screen and click *Activate Now* to enable the integration.

![image](/_assets/img/pages/integrations/adobe-analytics/final-activation.png)

### Configure the Branch Dashboard

#### Retrieve your Adobe Analytics Information

Before navigating to Branch, in your Adobe Analytics dashboard, navigate to the Mobile Marketing UI and find your app.

Under Manage App Setting -> SDK Analytics Options, find the following data

Branch field | Adobe field value
--- | ---
Protocol | Use HTTPS Check Box (if checked, select HTTPS)
Analytics Server Domain | Tracking Server
Omniture iOS/Android Server Key | Report Suite ID for that app
Timestamp | Offline Tracking

For `Analytics Server Domain`, please do not include `http` or `https`. If your value for this is `http://test.com`, simply put in `test.com`. This means no extra slashes, and no protocol.

#### Enter Adobe Analytics Information

1. On the Branch Dashboard (dashboard.branch.io), navigate to the [Integrations page](https://dashboard.branch.io/integrations).
1. Locate Adobe Analytics and choose **Enable**.
  * If you have not yet entered billing information, please do so now.
1. Enter your Adobe Analytics information and hit **Save**.

### Pass Adobe IDs to Branch

You'll need to pass through all user IDs configured with Adobe, to the Branch SDKs (There are three possible Adobe IDs this integration can track).  First, figure out which ID you use by asking your Adobe Consultant, and then pass that value to Branch by calling `setRequestMetadataKey` (iOS) or `.setRequestMetadata` (Android) on the Branch SDK, **BEFORE** calling *initSession* on the Branch SDK.

For example, if your Adobe integration uses the Marketing Cloud Visitor ID, retrieve the ID's value from Adobe's SDK, and pass it to Branch's SDK with a key called *$marketing_cloud_visitor_id*.  Sample snippets for all 3 ID types below:

#### Marketing Cloud Visitor ID

Value sent to Branch using *$marketing_cloud_visitor_id* key.  Value sent to Adobe as _`mid`_

- *iOS - Objective C*

```obj-c
//Inside *didFinishLaunchingWithOptions*
Branch *branch = [Branch getInstance];
[branch setRequestMetadataKey:@"$marketing_cloud_visitor_id" value:[ADBMobile visitorMarketingCloudID]];

...

[branch initSessionWithLaunchOptions...];
```

- *iOS - Swift*

```swift
//Inside *didFinishLaunchingWithOptions*
if let branch = Branch.getInstance() {
    branch.setRequestMetadataKey("$marketing_cloud_visitor_id", value:ADBMobile.visitorMarketingCloudID());

    ...

    branch.initSession(...);
}
```

- *Android*

```java
//Before you initialize in your Application #onCreate or Deep Link Activity's #onCreate.
Branch branch = Branch.getInstance();
branch.setRequestMetadata("$marketing_cloud_visitor_id", Visitor.getMarketingCloudId());

...

Branch.initSession(...);
```

#### Analytics Custom Visitor ID

Value sent to Branch using the *$analytics_visitor_id* key.  Value sent to Adobe as _`vid`_.  This is a custom user ID that can be set using the Adobe SDK.

- *iOS - Objective C*

```objc
//Inside *didFinishLaunchingWithOptions*

//Setting the Identifier with Adobe
[ADBMobile setUserIdentifier:@"Whipple"];

//Passing the Identifier to Branch
Branch *branch = [Branch getInstance];
[branch setRequestMetadataKey:@"$analytics_visitor_id" value:[ADBMobile userIdentifier]]

...

[branch initSessionWithLaunchOptions...]
```

- *iOS - Swift*

```swift
//Inside *didFinishLaunchingWithOptions*

//Setting the Identifier with Adobe
ADBMobile.setUserIdentifier("Whipple")

//Passing the Identifier to Branch
if let branch = Branch.getInstance() {
    branch.setRequestMetadataKey("$analytics_visitor_id", value:ADBMobile.userIdentifier())

    ...

    branch.initSession(...);
}
```

- *Android*

```java
//Before you initialize in your Application#onCreate or Deep Link Activity's #onCreate.

//Setting the Identifier with Adobe
Config.setUserIdentifier("Whipple");

//Passing the Identifier to Branch
Branch branch = Branch.getInstance();
Branch.getInstance().setRequestMetadata("$analytics_visitor_id", Config.getUserIdentifier());

...

Branch.initSession(...);
```

#### Analytics Visitor ID

Value sent to Branch using the *$adobe_visitor_id* key.  Value sent to Adobe as _`aid`_.

- *iOS - Objective C*

```objc
//Inside *didFinishLaunchingWithOptions*

Branch *branch = [Branch getInstance];
[branch setRequestMetadataKey:@"$adobe_visitor_id" value:[ADBMobile trackingIdentifier]];

...

[branch initSessionWithLaunchOptions...]
```

- *iOS - Swift*

```swift
//Inside *didFinishLaunchingWithOptions*

if let branch = Branch.getInstance() {
    branch.setRequestMetadataKey("$adobe_visitor_id", value:ADBMobile.trackingIdentifier());

    ...

    branch.initSession(...);
}
```

- *Android*

```java
//Before you initialize in your Application#onCreate or Deep Link Activity's #onCreate.

Branch branch = Branch.getInstance();
branch.setRequestMetadata("$adobe_visitor_id", Analytics.getTrackingIdentifier());

...

Branch.initSession(...);
```

## Advanced

#### What Branch Sends to Adobe Analytics

Branch sends the following values from Branch link data in the Adobe Context Data:

| Adobe Classification | Branch Analytics Tag | Example
| --- | --- | ---
| Source | Channel | Our Website
| Campaign | Campaign | Journeys Test Campaign
| Medium | Feature | Journeys
| Action | Branch Event Name | Install
| Action Property| Branch Tags | tag=bar&tag2=1234

If you create a Quick Link and specify analytics, those analytics will appear in the Adobe Analytics reporting suite.

## Support

There are common strategies to take while trouble shooting.

### Data isn't appearing after simulating an event

With Adobe Analytics' dashboard, it may take up to ~2 hours for data to appear. We'd recommend you simulate 10-15 events in one testing session, and validate that they show up two hours later, so that feedback is transparent and obvious.

If you're not seeing an Adobe ID appended to the Branch events in Adobe's dashboard, you can call *setDebug* on the Branch SDK and inspect the requests to `v1/open` in app to confirm the ID is being sent.  The key you want to find in this request payload is either `$adobe_visitor_id`, `$marketing_cloud_visitor_id`, or `$analytics_visitor_id`.

### What is Context Data and where does Branch provide it to Adobe?

When sending server to server calls to Adobe, Context Data is the part in between `&c.` and `&.c` in the server call. This call cannot be seen via the client (for example, it is not available via Charles Proxy). To see the detailed Branch server calls, please reach out to your Branch Account Manager. In general, values sent in Context Data can be visualized in the Adobe dashboard, and values outside of Context Data cannot. Values like the user identity (e.g.`vid`, `mid` or `aid`) are sent to Adobe, but not in Context Data, so they can’t be visualized in the Adobe Report Suite. However, they are appropriately formatted for Adobe to log events for that user in Adobe.
