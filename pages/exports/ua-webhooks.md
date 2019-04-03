## Overview

Branch’s new webhook system for People-Based Attribution allows you to export install and down-funnel event data as it occurs. You can import this data into your internal systems for analysis. You simply need to specify a URL for the POST or GET requests.

If you are looking for postback integrations for ad networks, please visit our [Universal Ads documentation](/deep-linked-ads/branch-universal-ads/). For pre-configured integrations into popular analytics tools, please visit our [Data Integrations documentation](/integrations/amplitude/).

The webhook system is highly customizable. You can register to only receive notifications for specific events, as well as specific subsections of events, filtered by link data, user data or event properties.

Our new webhook infrastructure supports for all Branch events. The data is formatted according to our updated event naming and metadata format which will get you through implementation and onto analysis in no time.

!!! note "Data Feeds is a premium solution"
    The Webhooks are included in Branch’s [Data Feeds](/exports/data-feeds/) offering, which can be purchased according to Branch’s [pricing schedule](https://branch.io/pricing/){:target="\_blank"}, and is available at no additional charge to customers who are on Launch and Startup plans for [Journeys](https://branch.io/journeys/){:target="\_blank"}, [Universal Email](https://branch.io/email/){:target="\_blank"}, or [Universal Ads](https://branch.io/attribution/){:target="\_blank"}. Without Data Feeds, you can still export Branch data in CSV form directly from the Branch dashboard via [Sources](https://dashboard.branch.io/sources){:target="\_blank"} or [CSV Exports](https://dashboard.branch.io/data-import-export/csv-exports){:target="\_blank"}.

    **If you are looking for legacy webhooks**, please see [these docs](/exports/webhooks/).

## Setup

### Register webhook

1. Open the [Webhooks](https://dashboard.branch.io/data-import-export/webhooks) page on the Branch dashboard.
1. Click **+ Add New Webhook**:

![image](/_assets/img/pages/exports/ua-webhooks/add-new-webhook.png)

### Configure webhook criteria

![image](/_assets/img/pages/exports/ua-webhooks/edit-webhook.png)

As you fill out the configuration, you'll see the following options:

- **Send a webhook to:** Enter the URL where you would like the events to be sent. This URL can be written with Freemarker syntax to dynamically populate parameters and execute simple, logical expressions. There is more information on Freemarker support below.
- **using a GET/POST:** Events can be sent either via POST or GET. POST events will be created with a default POST body. There is more information on POST bodies below.
- **users trigger event:** When the selected event occurs, a webhook will fire:

| Event | Description
| --- | ---
| **install** | Triggered the first time a user ever launches your app on their device.
| **reinstall** | Triggered if a user deletes and reinstalls your app on their device.
| **open** | Triggered whenever the app is opened (and the open is neither an install or reinstall)
| **web session start** | Triggered when the user views a webpage using the Branch Web SDK
| **click** | Triggered whenever a Branch link is clicked on any platform
| **-- additional events --** | A complete list of events you track through the Branch Web or App SDKs.

!!! tip
    Events will only appear in the event dropdown if at least one of those events has been recorded in the past 30 days.

For an exhaustive list of events and more detailed definitions of each event, please see the [Event Ontology Data Schema](/exports/event_ontology_data_schema/).

!!! warning "Warning"
    Event frequency is not yet supported. At this time webhooks can only be sent every time an event occurs.

#### Basic filtering

In the **Advanced** section of the page you can create a filter. Only events that *pass the filter criteria* will be sent.

You'll notice a default filter that checks to see whether the event is **not** triggered by a known crawler/robot. To do this, we check if the Operating System does not equal "robots." With that filter applied, only events without OS equal to robots (i.e. iOS and Android) will trigger a webhook.

The most popular filter options are available in a dropdown. This should help you get up and running quickly, while also providing an example structure for more [advanced filtering](#advanced-filtering) if you need it.

To create a filter:

1. Click the **Add Filter** button
1. Select the metadata you'd like to filter on. For example, if you only want **iOS** installs, select "Operating System" from the dropdown. You'll see the text field to the right populate with the correct key. When doing advanced filtering later you will select "Custom" and manually set this key.
1. Select "equals" or "does not equal" from next dropdown.
1. Finally, set the **value** of the key that you'd like to filter in or out. For example, if you want iOS installs, you'll have set up "equals" and "IOS" in the dropdowns. In this example, the robots filter is redundant, so let's remove it using the minus button.

This should be your final view before saving:

![image](/_assets/img/pages/exports/ua-webhooks/basic-filtering.png)

!!! note "Example: Filtering installs by attributed link campaign"
    Let’s say you’re interested in receiving a webhook for every **install** event that is referred from a Branch link where you set the **Campaign** field to **App Install Campaign**. You would configure a filter to fire a webhook only when **Campaign** is equal to **"App Install Campaign"**. You would select **Campaign** from the dropdown, the key would be be autofilled and would equal **last_attributed_touch_data.~campaign**. Finally, you'd set the value equal to **App Install Campaign**.

    ![image](/_assets/img/pages/exports/ua-webhooks/campaign-install-filter.png)

!!! note "Example: Filtering clicks by link channel"
    Let’s say you’re interested in receiving a webhook for every **click** event that is referred from a Branch link where you set the **Channel** field to **AppLovin**. You would configure a filter to fire a webhook only when **Channel** is equal to **AppLovin**. You would select **Channel** from the dropdown, the key would be be autofilled and would equal **last_attributed_touch_data.~channel**. Finally, you'd set the value equal to **AppLovin**.

    ![image](/_assets/img/pages/exports/ua-webhooks/channel-click-filter.png)


See the [Advanced Filtering](#advanced-filtering) page to read more about customizing when events are sent.


### Testing

To test whether your webhook is configured correctly, you can use [RequestBin](https://requestbin.fullcontact.com/). RequestBin gives you a URL that accepts events for 24 hours and allows you to see exactly what Branch is sending.

1. Go to [RequestBin](https://requestbin.fullcontact.com/) and click **+ Create a RequestBin**:

	![image](/_assets/img/pages/exports/requestbin_create.png)

1. Copy the **Bin URL**:

	![image](/_assets/img/pages/exports/requestbin_inspect.png)

1. Paste this into the URL field of your Branch webhook's configuration screen:

    ![image](/_assets/img/pages/exports/ua-webhooks/requestbin.png)

1. Now whenever your webhook is triggered, you will see a full report on RequestBin:

	![image](/_assets/img/pages/exports/requestbin_response.png)

    !!! caution
        Please archive your Requestbin webhook when you have finished testing. Requestbins only last for 24 hours and return errors once they expire.


## Data Format

One of the major advantages of People-Based Attribution's data format is that metadata is consistently located across all events. We call this schema the [Event Ontology Data Schema](/exports/event_ontology_data_schema/). This consistent schema makes it easy to replicate Branch dashboards in your internal warehouse and compare large sets of data for different events.

Setting up Advanced Filters or Freemarker macros requires an understanding of the Event Ontology data format. Before diving into the schema, you should understand some high level concepts about event metadata structure:

- Each event has top level fields, such as "name" and "id" that are not nested
- Link data is generally nested in "Last Attributed Touch Data"
- User data (including device and OS data) is nested in "User Data"
- Product or content level data is nested in "Content Items"
- Transaction and generic content data is nested in "Event Data"
- Journeys or Deepviews view data (e.g. Journey banners loads, not clicks) is "Last CTA View Data"
- Client-specified custom data (e.g. internal fields your company requires on specific events) is nested in "Custom Data"

You can find an [overview of critical fields](/exports/event_ontology_data_schema/#fields-included) in that documentation, as well as an [exhaustive list of fields](/exports/event_ontology_data_schema/#full-list-of-fields).

### Sample webhook POST body syntax

The POST body for all webhooks follows the same structure:


```javascript
POST
User-agent: Branch Metrics API
Content-Type: application/json
{
    "name": "<event name e.g. open>",
    "user_data": {},
    "last_cta_view_data": {},
    "last_attributed_touch_data": {},
    "custom_data": {},
    "event_data": {},
    "content_items": {},
    "timestamp": 'example timestamp (int)'
}
```

If any of these objects are empty, they will not appear in the POST body.

Here's a POST body with example data for an attributed open:

```javascript

// Attributed open
POST
User-agent: Branch Metrics API
Content-Type: application/json

{
  "name": "open",
  "user_data": {
    "os": "IOS",
    "os_version": "11.1.2",
    "environment": "FULL_APP",
    "platform": "IOS_APP",
    "idfa": "F520B35A-4165-4426-98F6-64F12F47E9BZ",
    "idfv": "C6B869E7-7B0A-4A93-1C3D-960E8859DP5D",
    "limit_ad_tracking": false,
    "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_2 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Mobile/15B202",
    "ip": "50.200.105.218",
    "developer_identity": "DB8C86A6-8B7C-4192-BD29-8107A5B788A1",
    "country": "US",
    "language": "EN",
    "brand": "Apple"
  },
  "last_cta_view_data": {
    "~id": 457624031399716729,
    "~campaign": "_test",
    "~feature": "journeys",
    "+domain": "branchster.app.link",
    "+url": "https://branchster.app.link/jeMczRn5XH",
    "$deeplink_path": "open/item/1234",
    "~creation_source": 5,
    "+referrer": "https://store.com/products/green-table",
    "foo": "bar",
    "$canonical_url": "https://store.com/products/green-table",
    "mydata": "set_branch_view_data_value",
    "~tags": [
      "tag1",
      "tag2",
      "bottom_banner_style"
    ]
  },
  "last_attributed_touch_data": {
    "~id": 467391383381228204,
    "~feature": "marketing",
    "~campaign": "december_test",
    "~channel": "Facebook Organic",
    "product_id": "XBA8198j",
    "product_name": "Green Table AB10",
    "+url": "https://branchster.app.link/test_linking",
    "$marketing_title": "Deep Link Testing",
    "$ios_deepview": "branch_default",
    "+via_features": [
      "QUICK_LINKS"
    ]
  },
  "custom_data": {
    "reinstall": "false",
    "ip": "50.200.105.218",
    "referred": "false"
  },
  "timestamp": 1512681005807
}
```

### Advanced Filtering

In [Basic Filtering](#basic-filtering) we covered what filters do, and how to set basic filters. Branch supports more advanced filtering which allows customers to set filters based on almost any event metadata.

Make sure you've taken a look at the [data format](#data-format) before you attempt to set advanced filters.

To create a filter:

1. Click the **Add Filter** button
1. Select the metadata you'd like to filter on. For advanced filtering, choose "Custom"
1. Type in the key that you'd like to filter on. To find the key you'd like to filter on, reference our quick introduction to the [People-Based Attribution's data format](#data-format) to figure out where your key is likely nested. Another foolproof way to find your key is looking at your data in full before setting up your filter. You can do this by doing a [CSV export](https://dashboard.branch.io/data-import-export/csv-exports), [API export](/exports/api-v3/) or send a single webhook with a POST body, and locate your key in that POST body.
1. Unless your key is part of the top level data (e.g. **timestamp** or **id**), it will likely be nested one level deep. Most keys will be of the format **object_name.key**. For example, if you want to filter for a custom key in deep link data called "product_deeplink_id", that would take the form **last_attributed_touch_data.product_deeplink_id**.

!!! note "Example: Filtering purchases for a specific coupon"
	Let’s say you’re interested in receiving a webhook for every **Purchase** event using a specific coupon. When you set up the Purchase event in your app or on your website, you [added a specific piece of metadata for "coupon"](/apps/v2event/#track-commerce-events). In the [Event Ontology Schema](/exports/event_ontology_data_schema/#full-list-of-fields) you saw that "coupon" is inside "event_data". To configure your filter to fire a webhook only when **coupon** is equal to **SUMMERDEALS10** you will:

    1. Select "Custom" from the filter key dropdown
    1. Make the key **event_data.coupon**
    1. Select "equals" on the equivalency dropdown
    1. Enter a value of **SUMMERDEALS10**

	![image](/_assets/img/pages/exports/ua-webhooks/coupon-filter-purchase.png)

!!! caution "Array filtering not yet available"
	Currently, webhooks do not support filtering on values inside arrays. Example arrays that cannot be filtered by value are **tags**, **+via_features** and **content_items**.

### Templating your Postback URL

If you'd like to template your postback URL, you’ll likely need to create one of our templated Postback URLs along side the aforementioned filters. These work very similarly to filters but use Freemarker syntax.

#### Getting started with templates

To start, we can add a simple template. Let's say we want to add campaign as a query parameter. The correct syntax is

`https://webhook.com?campaign=${(last_attributed_touch_data.~campaign)!}`

Let's walk through the syntax:

1. First, find the key for the value you want to template in. As with filtering, to find the key, reference our quick introduction to the [People-Based Attribution's data format](#data-format) to figure out where your key is likely nested. Another foolproof way to find your key is looking at your data in full before setting up your filter. You can do this by doing a [CSV export](https://dashboard.branch.io/data-import-export/csv-exports), [API export](/exports/api-v3/) or send a single webhook with a POST body, and locate your key in that POST body.
1. This exercise tells us that Campaign is nested inside `last_attributed_touch_data` and is represented by `last_attributed_touch_data.~campaign`.
1. The additional syntax around `last_attributed_touch_data.~campaign` is because Branch's templating engine uses Freemarker. In Freemarker, you can print variables by surrounding them with `${}`. Finally, we add `()!` to the variable because we want to prevent errors in the case that there is no value.
1. This leaves us with `${(last_attributed_touch_data.~campaign)!}`.

Here is some more example Freemarker for common templates:

| Parent object | Common name | Freemarker |
| - | - | - |
| Bundle | Android Package Name | `${(bundle.android.package_name)!}` |
| Bundle | iOS Bundle ID | `${(bundle.ios.bundle_id)!}` |
| Last Attributed Touch Data | Feature | `${(last_attributed_touch_data.~feature)!}` |
| Last Attributed Touch Data | Channel | `${(last_attributed_touch_data.~channel)!}` |
| Last Attributed Touch Data | Campaign | `${(last_attributed_touch_data.~campaign)!}` |
| Last Attributed Touch Data | Ad Partner Name | `${(last_attributed_touch_data.~advertising_partner_name)!}` |
| User Data | OS | `${(user_data.os)!}` |
| User Data | Platform | `${(user_data.platform)!}` |
| User Data | IDFA | `${(user_data.idfa)!}` |
| User Data | IDFV | `${(user_data.idfv)!}` |
| User Data | Android Advertising ID | `${(user_data.aaid)!}` |

#### Freemarker expressions

Due to security restrictions, Branch does not support the full list of Freemarker expressions.

Here is a list of blocked expressions:
```
"<#import>", "<#visit>", "<#include>", "?eval", "<#recurse>", "<#setting>", "<#macro>", "<#function>", "<#nested>", "<#return>", "<#list>"
```


### Authenticating webhook events

To request authentication headers for your webhooks, please contact `integrations@branch.io`.

## Support

### FAQs

##### Why is my webhook not firing?

Check to see if you are in [Test Mode](/apps/ios/#simulate-an-install) with your SDK. If you are in test mode, we will not send a webhook.
