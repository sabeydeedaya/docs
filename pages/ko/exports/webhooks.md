!!! warning "Legacy Functionality"
	Please use the [Webhooks Migration Guide](/exports/webhooks-migration-guide/) to upgrade to the current version.

## Overview

!!! note
    You are viewing docs for our legacy Webhooks system. We recommend viewing docs on the newer [Webhooks](/exports/ua-webhooks/) offering, which is powered by [People-Based Attribution](/dashboard/people-based-attribution).

Branch’s webhook system allows you to receive install and down funnel event data from us as it occurs, for install attribution or conversion funnels in your own database. You simply need to specify a URL for us to send all this data to.

The webhook system is very powerful and customizable. You can register to only receive notifications for specific events, as well as specific subsections of events, filtered by link data, user data or event properties. You can specify to only receive an event for the first time a user completes it, or every time. You can also specify to only receive events in the case of referrals.

## Setup

### Register webhook

1. Open the [Webhooks](https://dashboard.branch.io/data-import-export/webhooks) page on the Branch dashboard.
1. Click **+ Add A New Webhook**:

![image](/_assets/img/pages/exports/add.png)

### Configure webhook criteria

![image](/_assets/img/pages/exports/edit.png)

Here are explanations of what each field on this screen controls:

- **Webhook URL:** Enter the URL where you would like the events to be sent.
- **Postback Method:** Events can be sent either via POST or GET.
- **Event Frequency:** You can choose to receive a webhook for ever single event occurrence, or only for the first time that even is triggered for each unique user.
- **Event Trigger:** You may select between the following default events:

| Event | Description
| --- | ---
| **install** | Triggered the first time a user launches your app
| **open** | Triggered whenever the app becomes active
| **referred session** | Triggered in _addition_ to install, open or web session start if a user comes from a Branch link
| **web session start** | Triggered when the user views a webpage using the Branch Web SDK
| **click** | Triggered whenever a Branch link is clicked on any platform
| **-- other --** | Enter an event you created through the Branch SDK.

!!! tip
	The **referred session** and **web session start** options will only appear after at least one event of that type has been recorded.

- **Filter (Advanced):** See the [Advanced](#advanced) page to read about customizing when events are sent.

### Testing

To test whether your webhook is configured correctly, you can use [requestbin.com](https://requestbin.com/). RequestBin gives you a URL that accepts events and allows you to see exactly what Branch is sending.

1. Go to [requestbin.com](https://requestbin.com/) and click **+ Create a RequestBin**:

	![image](/_assets/img/pages/exports/requestbin_create.png)

1. Copy the **Bin URL**:

	![image](/_assets/img/pages/exports/requestbin_inspect.png)

1. Paste this into the URL field of your Branch webhook's configuration screen:

	![image](/_assets/img/pages/exports/requestbin_add_webhook.png)

1. Now whenever your webhook is triggered, you will see a full report on RequestBin:

	![image](/_assets/img/pages/exports/requestbin_response.png)

## Advanced

### Sample webhook POST body syntax

There are two types of events that you can listen for, and each has a different format of webhook POST. The two are:

- **Click** webhooks: Clicks are the way users interact with your Branch links. Please note that a click does not always have to take place in a browser. For example, clicking a Universal Link will open up the app directly, and therefore no browser metadata information will be present.
- **Event** webhooks: Events are user events that either Branch generates or you generate via a call to our event tracking API. Examples are shown on the previous page of this guide.

### Sample POST body for **Click** webhooks

```javascript
POST
User-agent: Branch Metrics API
Content-Type: application/json
{
    click_id: <a unique identififer>,
    event: 'click',
    event_timestamp: '<link click timestamp>',
    os: 'iOS' | 'Android',
    os_version: 'the OS version',
    metadata: {
        ip: '<click IP>',
        userAgent: '<click UA>',
        browser: '<browser>',
        browser_version: '<browser version>',
        brand: '<phone brand>',
        model: '<phone model>',
        os: '<browser OS>',
        os_version: '<OS version>'
    },
    query: { <any query parameters appeneded to the link> },
    link_data: { <link data dictionary - see below> }
}

// link data dictionary example
{
    branch_id: '<unique identifier for unique link>',
    date_ms: '<link creation date with millisecond>',
    date_sec: '<link creation date with second>',
    date: '<link creation date>',
    domain: '<domain label>',
    data: {
        +url: <the Branch link>,
        ... <other deep link data>
    },
    campaign: '<campaign label>',
    feature: '<feature label>',
    channel: '<channel label>'
    tags: [<tags array>],
    stage: '<stage label>',
}
```

### Sample POST body for **Event** webhooks

```javascript
POST
User-agent: Branch Metrics API
Content-Type: application/json
{
    event: '<event name>'
    event_timestamp: '<time stamp for the event>'
    os: 'iOS' | 'Android',
    os_version: '<the OS version>',
    metadata: {
        '< ... event metadata  - specified in userCompletedAction withState >'
        ip: '<IP of the user>',
        referred: 'true' | 'false', // if event is install / open / web session start
        reinstall: 'true' | 'false', if event is install / open
    },
    hardware_id: 'IDFA' (iOS) | 'Android ID' (Android),
    google_advertising_id: 'GAID' (Android if present),


    // optionally included:
    identity: '<user ID>', // specified in setIdentity

    // the referrer who created the new user
    first_referring_click_timestamp: '<the first click timestamp>',
    first_referring_click_query: { <any query parameters appeneded to the link> },
    first_referring_identity: '<user ID who created the referring link>' - specified in setIdentity
    first_referring_hardware_id: '<hardware identifier who created the referring link'
    first_referring_link_data: { <link data dictionary - see below> }

    // the referrer who referred this session
    session_referring_click_timestamp: '<the session click timestamp>',
    session_referring_click_query: { <any query parameters appeneded to the link> },
    session_referring_identity: '<user ID who created the referring link>'
    session_referring_hardware_id: '<hardware identifier who created the referring link'
    session_referring_link_data: { <link data dictionary - see below> }
}

// link data dictionary example
{
    branch_id: 'unique identifier for unique link',
    date_ms: 'link creation date with millisecond',
    date_sec: 'link creation date with second',
    date: 'link creation date',
    domain: 'domain label',
    data: {
        +url: <the Branch link>,
        ... <other deep link data>
    },
    campaign: 'campaign label',
    feature: 'feature label',
    channel: 'channel label'
    tags: [tags array],
    stage: 'stage label',
}
```

### Filter Webhooks

Filters allow you to specify when a webhook gets sent to your URL based off criteria matches. You can configure your filters to use any webhook keyword value by using liquid tags following this convention: `{{ param.name }}`.

!!! tip "Wildcard Filtering"
	If you want to filter on just a key being present, you can put a `*` in the value box.

!!! note "Example: Filtering installs by referring link campaign"
	Let’s say you’re interested in receiving a webhook for every **install** event that is referred from a Branch link where you set the **Campaign** field to **App Install Campaign**. You would configure a filter to fire a webhook only when **~campaign** is equal to **App Install Campaign**. The key would equal **session.link_data.~campaign** and the value would equal **App Install Campaign**.

	![image](/_assets/img/pages/exports/session-filter.png)

!!! note "Example: Filtering clicks by link channel"
	Let’s say you’re interested in receiving a webhook for every **click** event that is referred from a Branch link where you set the **Channel** field to **AppLovin**. You would configure a filter to fire a webhook only when **~channel** is equal to **AppLovin**. The key would equal **click.link_data.~channel** and the value would equal **AppLovin**.

	![image](/_assets/img/pages/exports/click-filter.png)

!!! note "Example: Filtering custom signup event by location"
	Let’s say you’re interested in receiving a webhook for every **sign_up** event that is triggered via the **userCompletedAction** method in the SDKs, but only in a specific market, like Chicago. Your event metadata will look something like the following:

	```javascript
	event: {
    	name: "sign_up",
    	metadata: {
        	"city" : "Chicago",
        	"username" : "john_smith_1",
    	}
	}
	```

	You would configure a filter to fire a webhook only when **city** is equal to **Chicago**. The key would equal **event.metadata.city** and the value would equal **Chicago**.

	![image](/_assets/img/pages/exports/filters.png)

### Templating your Postback URL

If you plan on sending click or install data to a third party, you’ll likely need to create one of our templated Postback URLs along side the aforementioned filters. These work very similarly to filters and use the same liquid tags structure: `{{ param.name }}`. Once the webhook is eligible, the correct value will be filled in to the slot.

!!! note "Example: Creating a dynamic conversion postback for an ad agency"
    Let’s say you have created a Branch link in the Ads tab specifically for SEM campaigns and you’re going to give the link to an advertising agency. This ad agency wants to receive install conversion events from Branch by tracking your Branch link with specific query parameters. Your Branch link might potentially look something like this: `http://branch.app.link/my-sf-campaign?clickId=12345`.

    Now, you want to report conversions back to the agency or your backend, and you know the structure of the desired Postback URL. For example, lets say you want to send a Postback to `http://myagency.com/tracking?event=install&clickId=12345&idfa=`.

    With that information, it’s very easy to setup the correct, dynamic Postback URL using our templates. In this case, you need 3 fields to be dynamically populated:

    - event name
    - clickId
    - IDFA value

    Branch can easily populate those fields dynamically (and potentially add a lot more as described in the next section) using the following template keys:

    - `{{ event.name }}`
    - `{{ session.link_click.query.clickId }}`
    - `{{ device.hardware_id }}`

    You can create your dynamic Postback URL by using those above tags in place of where the value should go. So, in keeping with the example, the dynamic Postback URL to give to Branch would be and should be pasted into the webhook creation URL field:

    - `http://myagency.com/tracking?event={{ event.name }}&clickId={{ session.link_click.query.clickId }}&idfa={{ device.hardware_id }}`

    ![image](/_assets/img/pages/exports/templates.png)

    Additionally, since you don’t want to send them _every_ install event, let’s add a [filter](#filtering-which-webhooks-are-sent) to only send the installs that are referred by links which have a **clickId** in the query parameter. In this case, we use a wildcard parameter (`*`) for the key **session.link_click.query.clickId**, which tells Branch to only trigger this webhook when an **install** event was referred by a link with a **clickId**.

    ![image](/_assets/img/pages/exports/template-filters.png)

    And with that, we’re finished creating our postback!

    ![image](/_assets/img/pages/exports/template-finished.png)

### Keys available for templating/filtering **Click** webhooks

When a Branch link is opened, triggering a **click** event, you may access:

- Properties of the visitor who opened the link.
- Properties of the link that was opened.

| Key | Description
| --- | ---
| **click.query.key** | Any key that was appended to the link when opened. To retrieve **value1** from **https://[branchsubdomain]/test?param1=value1**, you would use **click.query.param1**
| **click.browser.branch_id** | The Branch ID we have for a user's unique broswer
| **click.browser.metadata.userAgent** | The user agent of the browser
| **click.device.hardware_id** | For iOS, this is the Advertising ID. For Android, this is the Android ID
| **click.device.metadata.google_advertising_id** | Android only. The Google Advertising ID, if known
| **click.device.metadata.os** | The OS of the device
| **click.device.metadata.os_version** | The OS version
| **click.date** | Time of link click

!!! note ""
    **click.device** will only be available for Universal/App Links without a browser redirect. Similarly, **click.browser** will only be available for non-Universal/App Links. Handle this appropriately in your code.

| Key | Description
| --- | ---
| **click.link_data.~id** | ID of the link (0 for dynamic and 3P links)
| **click.link_data.~creation_source** | How the link was created, e.g. iOS SDK, API, etc.
| **click.link_data.~tags** | Tags of the link
| **click.link_data.~campaign** | Campaign of the link
| **click.link_data.~channel** | Channel of the link
| **click.link_data.~feature** | Feature of the link
| **click.link_data.~stage** | Stage of the link
| **click.link_data.$one_time_use** | Whether this was a one time use link of not
| **click.link_data.$one_time_use_used** | Whether this one time use link was used or not
| **click.link_data.$identity_id** | Branch internal identity of user who generated the link
| **click.link_data.$match_duration** | Length of time (in milliseconds) that a match could have occured
| **click.link_data.+url** | The full URL of the link, e.g. [branchsubdomain]/m/abcde12345
| **click.link_data.key** | Any key value you specified in the link’s data dictionary
| **click.referring_identity.id** | ID you set for the user who created this link

### Keys available for templating/filtering **Event** webhooks

When a user triggers an event inside your app, either one [created by you](/apps/ios/#track-events) or one tracked by Branch automatically (**install**, **open**, **referred session**, and **web session start**), you may access:

- Properties of the event.
- Identity properties of the user who triggered the event.
- Session properties of the user who triggered the event.

!!! Note "Identity vs. Session"
    **Identity properties** are _set once_, the very first time Branch sees a user. Once set for each user, these are never changed. **Session properties** are the data of the _most recent_ record Branch has for a user.

    For an initial **install** event, identity and session properties will be the same. For **open** events, session properties will be different if the user has subsequently opened another Branch link.

Event Data

| Key | Description
| --- | ---
| **event.name** | The name of the event (e.g., **install** or **my_custom_event**)
| **event.metadata.referred** | Equals **true** if user installed app after opening a Branch link
| **event.metadata.ip** | The IP address of the user
| **event.metadata.key** | Data defined as **key** when creating a custom event
| **event.date** | Timestamp of when the event occurred

Device Data

- Device data provides access to the device snapshot. Branch collects this snapshot both when a user is in the browser (via a click on a Branch link) and then after the user opens the app.

| Key | Description
| --- | ---
| **device.metadata.os** | The OS of the device
| **device.metadata.os_version** | The OS version of the device
| **device.metadata.ip** | The IP address of the device
| **device.metadata.model** | The model of the device

Identity Data

- Identity data is unique for each user Branch tracks. These values are permanently tied to that user, meaning if a link with a campaign of 'google' drives an install, then that user will have a permanent **identity.link_data.~campaign** value equal to 'google'.

!!! note ""
    Except for identity.id, these will not be populated if the user installed your app without opening a Branch link first.

| Key | Description
| --- | ---
| **identity.link_data.~id** | ID of the link (0 for dynamic and 3P links)
| **identity.link_data.~creation_source** | How the link was created, e.g. iOS SDK, API, etc.
| **identity.link_data.~tags** | Tags of the link
| **identity.link_data.~campaign** | Campaign of the link
| **identity.link_data.~channel** | Channel of the link
| **identity.link_data.~feature** | Feature of the link
| **identity.link_data.~stage** | Stage of the link
| **identity.link_data.$one_time_use** | Whether this was a one time use link of not
| **identity.link_data.$one_time_use_used** | Whether this one time use link was used or not
| **identity.link_data.$identity_id** | Branch internal identity of user who generated the link
| **identity.link_data.$match_duration** | Length of time (in milliseconds) that a match could have occured
| **identity.link_data.+url** | The full URL of the link, e.g. [branchsubdomain]/m/abcde12345
| **identity.link_data.key** | Any key value you specified in the link’s data dictionary

Session Data

- Session data refers to the _most recent_ record Branch has for each user, regardless of whether it reflects an **install** or an **open** event. These will not be populated if the session was not initiated by opening a Branch link.

| Key | Description
| --- | ---
| **session.link_click.query.key** | Any key that was appended to the link when opened. To retrieve **value1** from **https://[branchsubdomain]/test?param1=value1**, you would use **session.click.query.param1**.

| Key | Description
| --- | ---
| **session.link_data.~id** | ID of the link (0 for dynamic and 3P links)
| **session.link_data.~creation_source** | How the link was created, e.g. iOS SDK, API, etc.
| **session.link_data.~tags** | Tags of the link
| **session.link_data.~campaign** | Campaign of the link
| **session.link_data.~channel** | Channel of the link
| **session.link_data.~feature** | Feature of the link
| **session.link_data.~stage** | Stage of the link
| **session.link_data.$one_time_use** | Whether this was a one time use link of not
| **session.link_data.$one_time_use_used** | Whether this one time use link was used or not
| **session.link_data.$identity_id** | Branch internal identity of user who generated the link
| **session.link_data.$match_duration** | Length of time (in milliseconds) that a match could have occured
| **session.link_data.+url** | The full URL of the link, e.g. [branchsubdomain]/m/abcde12345
| **session.link_data.key** | Any key value you specified in the link’s data dictionary

### Authenticating webhook events

If you need to whitelist the webhook server IP addresses for security purposes, they are listed below.

- 52.9.159.121/32
- 52.9.176.205/32

Reserved for future use:

- 52.9.188.221/32
- 52.9.188.236/32

You can also create events through the Branch SDK, and specify a secret key inside the event metadata to pass into the URL of the webhook itself.

## Support

### FAQs

##### Why is my app not sending a device ID?

Check to see if you are in [Test Mode](/apps/ios/#simulate-an-install) with your SDK. If we are sending a fake ID to simulate installs, we will not send it inside a webhook.

##### What is the difference between first referring data and session referring data?

Because webhooks are event based, and tie back to a unique user, we send you data from the link that first drove this unique user into your app. Then, if they click another Branch link later, we also send you session referring data from this second link. For an initial install event, these should be the same. For any subsequent events, session referring data may be different.
