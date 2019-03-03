## Overview

Sending events from Segment to Branch will allow you to attribute downstream conversions like purchases across web and app to Branch link clicks. Events imported from Segment to Branch will be available wherever you can normally use events within Branch, including dashboard visualizations, Data Feeds, Universal Ads postbacks, Journeys targeting, Liveview and more.

This guide walks through the server-side integration for data import from Segment to Branch. For the client-side integration, see [Segment's documentation](https://segment.com/docs/destinations/branch-metrics/){:target="\_blank"}. For data export from Branch to Segment, go [here](/integrations/segment).

### What events does Branch import?

Branch will import events that are not auto-tracked with the Branch SDKs. This includes commerce, content, user lifecycle, and custom events, and excludes events like clicks and installs. See the full list of supported events and associated mappings [here](#supported-events). Branch will only import events that can be [tied to a user](#identifiers).

## Setup

1. [Contact Branch](https://support.branch.io){:target="\_blank"} to configure Branch to receive events from Segment. Please note that a subscription to [Data Feeds](https://branch.io/data-feeds/){:target="\_blank"} is required to enable data import from Segment to Branch.
1. Navigate to the [Data Integrations page](https://dashboard.branch.io/data-import-export/data-feeds/integrations){:target="\_blank"} of the Branch dashboard.
    1. Select **Segment** from the menu on the left.
    1. Select the platforms you would like to import events from and click **Save**.

    ![image](/_assets/img/pages/integrations/segment/segment-import.png)

1. Navigate to your your Segment UI’s Destinations page.
    1. Click on **Add Destination**.
    1. Search for Branch within the Destinations Catalog and confirm the Source you’d like to connect to.
    1. Enter your Branch Key. This can be found in the [Account Settings > App](https://dashboard.branch.io/account-settings/app){:target="\_blank"} section of the Branch dashboard.
    1. Enter your Branch Secret. This can be found in the [Account Settings > App](https://dashboard.branch.io/account-settings/app){:target="\_blank"} section of the Branch dashboard.

For server-side event import, **you can ignore the SDK integration instructions**.

!!! warning "Avoid duplicate data"
    To avoid duplicate data, you should either [track conversion events directly with Branch](/apps/v2event) or track events with Segment and then enable import to Branch, not both. Branch will warn you if you try to import events to Branch that you are already tracking.


### Track

The Branch integration supports some of the events tracked with Segment’s [Track](https://segment.com/docs/spec/track/){:target="\_blank"} method. The track API call is how you record any actions your users perform, along with any properties that describe the action.

Each action is known as an event. Each event has a name, like Registered, and properties, for example a Registered event might have properties like plan or accountType. Here’s the payload of a typical track call with most common fields removed:

```
{
  "type": "track",
  "event": "Registered",
  "properties": {
    "plan": "Pro Annual",
    "accountType" : "Facebook"
  }
}
```

And here’s the corresponding Javascript event that would generate the above payload:

```javascript
analytics.track("Registered", {
  plan: "Pro Annual",
  accountType: "Facebook"
});
```

See Segment's [Track documentation](https://segment.com/docs/spec/track/){:target="\_blank"} for more details and examples.

#### Supported events

Branch will only import events from Segment that are not already auto-tracked with the Branch  SDK. This means that events like click and install cannot be imported. The following outlines how Segment events are mapped to Branch events, and which will be imported to Branch:

| Segment Event | Branch Event | Branch Event Category | Imported |
| --- | --- | --- | --- |
| Product Added | Add To Cart | Commerce Event | **Yes** |
| Product Added to Wishlist | Add To Wishlist | Commerce Event | **Yes** |
| Cart Viewed | View Cart | Commerce Event | **Yes** |
| Payment Info Entered | Add Payment Info | Commerce Event | **Yes** |
| Checkout Started | Initiate Purchase | Commerce Event | **Yes** |
| Order Completed | Purchase | Commerce Event | **Yes** |
| *use the Branch event name* | Spend Credits | Commerce Event | **Yes** |
| Products Searched | Search | Content Event | **Yes** |
| Product Viewed | View Item | Content Event | **Yes** |
| Product List Viewed | View Items | Content Event | **Yes** |
| Product Reviewed | Rate | Content Event | **Yes** |
| Product Shared | Share | Content Event | **Yes** |
| *use the Branch event name* | Complete Registration | Lifecycle Event | **Yes** |
| *use the Branch event name* | Complete Tutorial | Lifecycle Event | **Yes** |
| *use the Branch event name* | Achieve Level | Lifecycle Event | **Yes** |
| *use the Branch event name* | Unlock Achievement | Lifecycle Event | **Yes** |
| *any event name* | Custom | Custom Event | **Yes** |
| Deep Link Clicked | Click | - | No |
| Install Attributed | Install | - | No |
| Deep Link Opened | Reinstall | - | No |
| Deep Link Opened | Open | - | No |
| - | SMS Sent | - | No |
| - | Pageview | - | No |
| - | Web Session Start | - | No |
| - | Branch CTA View | - | No |
| - | Impression | - | No |
| - | Web to App Auto Redirect | - | No |
| Application Installed | - | - | No |
| Application Opened | - | - | No |
| Application Updated | - | - | No |
| Application Backgrounded | - | - | No |
| Application Crashed | - | - | No |
| Application Uninstalled | - | - | No |
| Push Notification Received | - | - | No |
| Push Notification Tapped | - | - | No |
| Push Notification Bounced | - | - | No |


#### Identifiers

Identifiers are required for events to be imported to Branch. You must include:

* userId OR
* context.device.advertisingId AND context.device.type OR
* context.device.id AND context.device.type

Branch maps Segment's identifiers to the following:

| Segment field | Branch field |
| --- | --- |
| userId | developer_identity |
| context.device.advertisingId | idfa or aaid |
| context.device.id | idfv or android_id |
| context.device.type | os |

If using User ID with Segment, Branch will automatically map this to [developer identity](/apps/ios/#track-users). Check out Segment's [User ID docs](https://segment.com/docs/spec/identify#user-id){:target="\_blank"} for more details.

At this time, Branch does not map Segment's anonymous ID to any field, and [will not attribute logged out web events](#attribution-for-logged-out-users-on-web) received from the server-to-server integration. Anonymous ID [can still be attached to events](#attaching-anonymous-id-to-events).

#### Validating the integration

Once you have import turned on in both Segment and Branch, events should come through. You will see a green dot on the import card if Branch has seen events:

![image](/_assets/img/pages/integrations/segment/segment-import-status.png)

To see more information on the events that are coming in, you can look at events with **origin** `SEGMENT` in [Liveview](https://dashboard.branch.io/liveview/events){:target="\_blank"}:

![image](/_assets/img/pages/integrations/segment/segment-import-liveview.png)

Branch imports events from Segment as [commerce, user lifecycle, content, or custom events](#supported-events).

#### Using imported events

Events imported from Segment to Branch will be available wherever you can normally use events within Branch. This includes dashboard visualizations, Data Feeds (including Data Integrations, Query API, Webhooks, and Data Export API), Universal Ads postbacks, Journeys targeting, Liveview and more.

## Advanced

### Attaching anonymous ID to events

Events imported from Segment with anonymous ID attached will retain that value on the event, and will be available in the custom_data field if exported back out from Branch. To attach anonymous ID to events auto-tracked by Branch (installs, opens, etc.), follow the instructions [here](/integrations/segment/#pass-segment-anonymous-id).

### Attribution for logged out users on web

Branch uses a custom, in-house identifier for logged out users on web. If you enable the server to server integration from Segment to Branch, you will not be able to attribute logged out web events to a campaign run with Branch. For this reason, you may want to track web events directly with the Branch web SDK, while still sending app events server to server from Segment. Branch allows you to then toggle web event import off to prevent duplicate data.
