## Overview

![Criteo](https://cdn.branch.io/branch-assets/ad-partner-manager/386574786681131050/criteo-1528518282717.png)

This guide will walk you through how to setup your campaigns with **[Criteo](http://www.criteo.com)** using Branch Universal Ads and track ad conversions across **every device, platform, and channel**. Universal Ads provides everything you need for complete tracking, including rich data for the Criteo Engine to optimize against.

The basic Criteo integration involves three parts:

1. Integrating the SDKs and tracking in-app events
1. Enabling the integration and selecting postbacks
1. Creating tracking links

## Setup

### Integrating the SDKs and tracking in-app events

The Branch SDKs for iOS and Android allow you to get up and running quickly. Criteo has some custom configurations to be aware of when you get set up.

If you haven't already integrated Branch, follow the below guides.

1. Start by following the integration guides for Android and iOS:
	- [Android](/apps/android/){:target="\_blank"}
	- [iOS](/apps/ios/){:target="\_blank"}
1. Once this is complete, you can test your basic integration by going to our [Liveview page](https://dashboard.branch.io/liveview/events){:target="\_blank"}. Set a filter for **OPEN** to verify that the Branch SDK is recording app opens.

	!!! warning "Limitations with setDebug and seeing data in Branch"
		When integrating the SDKs, it's often useful to use setDebug to verify that your app is able to communicate with Branch servers, and is receiving deep link data. However, our upstream systems don't register test events sent using setDebug, so events will not appear in Liveview or Analytics, nor will they fire postbacks. You should disable setDebug when looking at Liveview or testing postbacks.

#### Customize initialization

##### Sending non-Branch deep links

Criteo requests all deep links (including non-Branch links) to be sent to their servers upon app open. Branch doesn't provide this by default, so you'll need to update your SDK initialization to support this.

**If you use any authentication or login libraries, please ensure you strip out all tokens, passwords and other sensitive information before passing this information to Branch.**

To pass the `$criteo_deep_link_url` to Branch, add this code to your AppDelegate or the relevant Activity/Application. You may already have some of this code inside you files, so simply copy the relevant Branch pieces.

**Objective-C**

Inside *AppDelegate.m*, copy and paste the following snippets.

```objc

- (BOOL)application:(UIApplication *)application
continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray *))restorationHandler {

    // NOTE: you should sanitize and ensure no sensitive is passed from
    // userActivity.webpageURL.absolutelString.

    [[Branch getInstance] setRequestMetadataKey:@"$criteo_deep_link_url" value:userActivity.webpageURL.absoluteString];
    [[Branch getInstance] continueUserActivity:userActivity];

    // Process non-Branch userActivities here...
    return YES;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {

    // NOTE: you should sanitize and ensure no sensitive is passed from
    // url.absolutelString.

    [[Branch getInstance] setRequestMetadataKey:@"$criteo_deep_link_url" value:url.absoluteString];
    // Required. Returns YES if Branch link, else returns NO
    [[Branch getInstance]
        application:application
            openURL:url
  sourceApplication:sourceApplication
         annotation:annotation];

    // Process non-Branch URIs here...
    return YES;
}

```

**Swift**

Inside *AppDelegate.swift*

```swift

// repond to universal link URLs
func application(_
        application: UIApplication,
        continue userActivity: NSUserActivity,
        restorationHandler: @escaping ([Any]?) -> Void
    ) -> Bool {

        // NOTE: you should sanitize the webpage URL to ensure no sensitive data is passed.
        Branch.getInstance().setRequestMetadataKey("$criteo_deep_link_url", value: userActivity.webpageURL?.absoluteString);
        let branchHandled = Branch.getInstance().continue(userActivity)
        if (userActivity.activityType == NSUserActivityTypeBrowsingWeb) {
            if let url = userActivity.webpageURL,
               !branchHandled {
               // handle other universal links here.
            }
        }

        // Apply your logic to determine the return value of this method
        return true
    }

    // Respond to URL scheme links
    func application(_ application: UIApplication,
                     open url: URL,
                     sourceApplication: String?,
                     annotation: Any) -> Bool {
        // NOTE: you should sanitize the URI scheme to ensure no sensitive data is passed.
        Branch.getInstance().setRequestMetadataKey("$criteo_deep_link_url", value: url.absoluteString)
        let branchHandled = Branch.getInstance().application(application,
                                                             open: url,
                                                             sourceApplication: sourceApplication,
                                                             annotation: annotation
        )
        if(!branchHandled) {
            // If not handled by Branch, do other deep link routing for the Facebook SDK, Pinterest SDK, etc
        }
        return true
    }
```

**Android**

Before you initialize in your Application#onCreate or Deep Link Activity's #onStart.
You will want to persist the value from #onCreate, or #onNewIntent. mIntentData is a String field defined in the activity.

```java
@Override
protected void onCreate() {
    // NOTE: be sure to remove sensitive / PII data from the intent data coming in.
    mIntentData = this.getIntent().getData().toString();
    // other operations below
}

@Override
public void onNewIntent(Intent intent) {
    // NOTE: be sure to remove sensitive / PII data from the intent data coming in.
    mIntentData = this.getIntent().getData().toString();
    // other operations below
}
```

```java

Branch.getInstance().setRequestMetadata("$criteo_deep_link_url", mIntentData);

...

Branch.initSession(...);
```

##### Identifying users with setIdentity

Branch allows you to identify your users and will send those user identities to Criteo.

The method used to identify users is called `setIdentity`, and the value you set is called the `developer_identity`. Set this upon a user login event in your app, and Branch will use it for all subsequent events attributed to that user.

- [Android](/apps/android/#track-users){:target="\_blank"}
- [iOS](/apps/ios/#track-users){:target="\_blank"}

!!! warning "Do not send emails or PII with setIdentity"
	To respect user privacy, please do not use names, emails or other identifiable information as your developer identity.


#### Track conversion events

Install and open events are automatically tracked using just the Branch SDK integration. However, to track other events, such as registration or purchase events, you'll want to add more tracked events in your app.

Please reference the general Branch V2 Event tracking guide as well as the Criteo specific information below. This will help ensure that you've integrated the right Branch events with the correct metadata, and the postbacks to Criteo will be preconfigured for you.

- [V2 Event Tracking Guide](/apps/v2event/#overview)

!!! note "Testing your events with Liveview"
	You can test your integration by going to our [Liveview page](https://dashboard.branch.io/liveview/events){:target="\_blank"}. Set a filter with the event name to verify that the Branch SDK is recording each event.

##### Branch and Criteo Event Mapping

Branch supports the full suite of Criteo events. Please talk to your Criteo Solutions Engineer to ensure you've identified the right events for your app.

!!! example "Important implementation details"
	- For events with Branch Event Categorization of "Custom Event," you must name the event as laid out in the below table.
	- For events with Additional Metadata Keys, you must set the Custom Data on the event with a specific key so the postback is configured correctly for you.

	For example, for "UI_STATUS" the code snippet looks like this:

	- *Swift*

	    ```swift
	    let event = BranchEvent.customEventWithName("UI_STATUS")
	    event.customData       = [
	    	"ui_status": "subscriber"
		]
		event.logEvent() // Log the event.
	    ```

	- *Objective-C*

	    ```obj-c
	    BranchEvent *event     = [BranchEvent customEventWithName:@"UI_STATUS"];
	    event.customData       = (NSMutableDictionary*) @{
	    	"ui_status": "subscriber"
	    };
		event.logEvent() // Log the event.
	    ```

	- Android

	```Java
	new BranchEvent("UI_STATUS")
	    .addCustomDataProperty("ui_status", "subscriber")
	    .logEvent(MainActivity.this);
	```

Branch Event Name | Criteo Name | Branch Event Categorization | Additional Metadata Keys
--- | --- | --- | ---
OPEN | View Home & appDeeplink | SDK Default | `$criteo_deep_link_url`
INSTALL | Install | SDK Default | None
VIEW_ITEMS | View Listing | Content Event | None
VIEW_ITEM | View Product | Content Event | None
VIEW_CART | View Basket | Commerce Event | None
PURCHASE | Track Transaction | Commerce Event | None
PURCHASE* | Static Track Transaction  | Commerce Event  | None
ACHIEVE_LEVEL | UI Level | User Lifecycle Event | `ui_level`
UNLOCK_ACHIEVEMENT | UI Achievement  | User Lifecycle Event |  `ui_achievement`
COMPLETE_REGISTRATION | Registration  | User Lifecycle Event | None
COMPLETE_TUTORIAL | Tutorial Finished  | User Lifecycle Event  | None
UI_STATUS | UI Status  | **Custom Event** |  `ui_status`
UI_LOGIN | UI Login  | **Custom Event** |  None
SUBSCRIPTION | Subscription  | **Custom Event** |  None
LOW_PRIORITY | Low Priority  | **Custom Event**  | None
HIGH_PRIORITY | High Priority  | **Custom Event**  | None
ABANDONED_BASKET | Abandoned Basket  | **Custom Event**  | None


*\* The Static Track Transaction Postback is available as a custom version of the PURCHASE postback. Please see [advanced configuration](#editing-postbacks) for setup.*

### Enabling the integration and selecting postbacks

Once you've integrated the SDK and configured the relevant events, you can enable Criteo in the dashboard. Follow the steps below for enabling an ad partner, and select Criteo from the list.

1. Visit the [Ads page](https://dashboard.branch.io/ads) on the Branch dashboard.
2. Select [Partner Management](https://dashboard.branch.io/ads/partner-management) from the sidebar.
3. Search for Criteo.

![image](/_assets/img/pages/deep-linked-ads/criteo/search-criteo.png)

4. Click **Save and Enable** in the bottom right hand corner.

![image](/_assets/img/pages/deep-linked-ads/criteo/enable-criteo.png)

!!! tip "Enable postbacks"
    Postbacks will automatically be activated for the events listed above when you enable the integration. You can always [add additional postbacks](#adding-postbacks) or [edit postbacks](#editing-postbacks), as described below in the Advanced section.

#### Sending unattributed events to Criteo

It is possible to opt in to send all events occurring in your app to Criteo, not just events attributed to a Criteo campaign. Customers generally do this for the purposes of allowing Criteo insight into users who would be good candidates for retargeting based on their actions in the app.

To send all events to Criteo, switch the "Send Postbacks For" toggle under the **Postback Config** in the [Ads Partner Manager](https://dashboard.branch.io/ads/partner-management/a_criteo?tab=postback) to **All events**.

![image](/_assets/img/pages/deep-linked-ads/criteo/all-events-toggle.png)

### Link creation for deep linking and measurement

#### Option 1: Catalog deep links

*Recommended*

Branch links function as Universal Links or App Links, as well as deferred deep links, meaning better conversions on all Criteo campaigns.

The same Branch link will do measurement as well as deep linking, so there's no need for additional "tracking-only" links. In fact, if you're using Branch links as your campaign links, you shouldn't use additional server to server tracking as well.

Criteo accepts a catalog with product details and links. We recommend replacing your web links with Branch links.

##### Creating http deep links for your catalog

The easiest way to create deep links for your product feed is to create a ["long link"](/links/integrate/#long-links) for each product.

1. Take your base domain, e.g. `https://example.app.link`
1. Add your deep link data as query parameters. Be sure to URI encode each query parameter! e.g. `https://example.app.link?product_id=123&category=shoes`
1. Add any [fallback urls](/links/integrate/#fallback-to-a-specific-url) for if the app isn't installed e.g. `https://example.app.link?product_id=123&category=shoes&$fallback_url=https%3A%2F%2Fbranch.io%2Funiversal-ads%2F`
1. Finally, add this string, which contains the [analytics parameters](/links/integrate/#analytical-labels) needed to categorize your data accurately. If you want to add more, go for it! `%243p=a_criteo&~feature=paid%20advertising`.

Your final link looks like this, and additional query parameters can be added.

`https://example.app.link?product_id=123&category=shoes&$fallback_url=https%3A%2F%2Fbranch.io%2Funiversal-ads%2F&%243p=a_criteo&~feature=paid%20advertising`

##### Creating URI scheme deep links for your catalog

Some types of Criteo campaign require URI scheme style deep linking instead of HTTP deep links. Fortunately, you can also create Branch compatible, URI scheme tracking links.

1. Start with your URI scheme `example://`
1. Append `open?link_click_id=a-`. For example: `example://open?link_click_id=a-`
1. Create a JSON blob of your link data, including `"~feature":"paid advertising", "$3p":"a_criteo"`
    For example:
    ```code
    {"~feature":"paid advertising", "$3p":"a_criteo", "~campaign":"My Summer Campaign", "product_id":1234, "category":"shoes"}
    ```
1. Base64 encode your JSON blob.
    ```code
    eyJ+ZmVhdHVyZSI6InBhaWQgYWR2ZXJ0aXNpbmciLCAiJDNwIjoiYV9jcml0ZW8iLCAifmNhbXBhaWduIjoiTXkgU3VtbWVyIENhbXBhaWduIiwgInByb2R1Y3RfaWQiOjEyMzQsICJjYXRlZ29yeSI6InNob2VzIn0=
    ```
1. Append that to your base link, and you're done!
    ```code
    example://link_click_id=a-eyJ+ZmVhdHVyZSI6InBhaWQgYWR2ZXJ0aXNpbmciLCAiJDNwIjoiYV9jcml0ZW8iLCAifmNhbXBhaWduIjoiTXkgU3VtbWVyIENhbXBhaWduIiwgInByb2R1Y3RfaWQiOjEyMzQsICJjYXRlZ29yeSI6InNob2VzIn0=
    ```

#### Option 2: Static campaign deep links

Just need a single link? It's easy to use the Branch dashboard to create a one-off link. The flow below provides examples of how to create links, but you'll want to consult with your Criteo Solutions Engineer to specify what you require.

1. First, click **Create Ad Link** in the top right hand side of the Criteo Partner Manager UI.

    ![image](/_assets/img/pages/deep-linked-ads/criteo/criteo-create-link.png)

1. First, select an ad format. For App Install or App Engagement campaigns you'll want to select the **App Only** format.

    To bulk create links for Dynamic Product Ads, select **Product Links**, which are for shopping or dynamic remarketing campaigns. This will take you to create a [Deep Linked Product Feed](/deep-linked-ads/dynamic-product-feeds/) for Criteo with Universal Links and URI schemes.

    ![image](/_assets/img/pages/deep-linked-ads/criteo/criteo-link-chooser.png)

1. If you've select a simple App Engagement link, you'll start with a name for it. Select something that will make it easy to find if you need it later. Your Ad Format and Ad Partner should be selected already, but feel free to choose one if they aren't. It's important that you select the right Ad Partner for analytics later on. Click **Configure Options** to continue.

    ![image](/_assets/img/pages/deep-linked-ads/criteo/criteo-engagement-link.png)

1. This is your chance to add deep link data and analytics tags.

    - Deep Link Data is used to provide the app with product information, so the app can take customers to the right content in the app.
    - Analytics tags are important for later segmentation, so click the **Analytics** sub tab to add a Channel and Campaign value.

    ![image](/_assets/img/pages/deep-linked-ads/criteo/criteo-analytics-tags.png)

    !!! tip "Set Analytics tags"

        It's easier to slice your data in our analytics platform if you properly assign analytics parameters to your link. _Channels_ generally correspond to ad networks, and _Campaigns_ correspond to marketing initiatives that you're launching. For example: _Channel_: "Criteo", _Campaign_: "Summer 2017 Shoe Discounts."

1. Click **Create Link Now**, and you have your tracking link! Take this link and give it to your Criteo Solutions Engineer as an example.

    ![image](/_assets/img/pages/deep-linked-ads/branch-universal-ads/finished-ad-link.png)

#### Option 3: Server to server tracking links

If you just need a server to server tracking link, you can use the same flow as Option 2, above.

However, at the end, add `%24s2s=true` to your link, so we know it's a server to server to link.


### View your data with People-Based Attribution

The [Ads Analytics Page](https://dashboard.branch.io/ads/analytics) on the Branch dashboard shows the performance of your ad campaigns _across both web and app_. You can view performance over time, including purchase and other custom events.

Events are attributed using Branch's unified last-click attribution model. This means that Branch will attribute to the last click across channels, and across platforms.

For example, if a customer clicks a Branch email link, and then clicks an ad, installs the the app and purchases an item, Branch will attribute the install and the purchase to the last clicked ad link.

If the customer then goes on to purchase an item on web within the attribution window, Branch will also attribute the web purchase to the same ad link, connecting the web and app actions taken by a single user for a more accurate view of your marketing channels and customer behavior.

![image](/_assets/img/pages/deep-linked-ads/branch-universal-ads/install-by-secondary-pub.png)

{! ingredients/deep-linked-ads/granting-partner-access.md !}

## Advanced Configurations

#### Adding postbacks

If you'd like to track additional events, you can set up a custom event and [add a new postback](/deep-linked-ads/branch-universal-ads/#add-more-postbacks).

By default, postbacks not listed in [the table above](#branch-and-criteo-event-mapping) are created with a generic template, but you can copy templates from any of the existing postbacks and paste that template into your new event.

#### Editing postbacks

If you'd like to send more data in your Criteo postbacks, you can [customize your postbacks](/deep-linked-ads/branch-universal-ads/#edit-postbacks).

!!! example "Adding Static Track Transaction"
	*Static Track Transaction* is a custom template that replaces the default PURCHASE (Track Transaction) template. You should see STATIC_TRACK_TRANSACTION as an event under the **Postback Config** in the Criteo Partner Manager UI. You can copy the postback template from STATIC_TRACK_TRANSACTION, and paste it into the PURCHASE postback, replacing the previous postback. Click *Save* at the bottom of the screen, and you're good to go!

#### Change attribution windows

If you need to change the default attribution windows, you can [edit attribution windows](/deep-linked-ads/branch-universal-ads/#change-attribution-windows) for all your Criteo campaigns, and also specific campaigns at a link-level.

#### Sending dates for Travel campaigns

Criteo can optimize campaigns based on travel search dates. To report travel search dates to Criteo, follow these steps:

1. In your app, add [custom metadata](#branch-and-criteo-event-mapping) to your events with keys `din` and `dout`, and a date string in format `'YYYY-MM-DD'` for the date of the inbound and outbound flight respectively.
1. In the Branch dashboard, navigate to **Postback Config** within the Criteo entry of the Ads Partner Manager.
1. Find the postback you want to edit, and add the following string in the relevant place. For _VIEW\_ITEM_ for example, it's another event in the events array.
	``` code
	,{"event":"vs","din":<@json>${(custom_data.din)!}</@json>,"dout":<@json>${(custom_data.dout)!}</@json>}
	```

#### Sending hashed emails

Criteo accepts hashed emails from your ad campaigns. To send hashed emails, please follow the below logic.

1. In your app, add [custom metadata](#branch-and-criteo-event-mapping) to your events with keys `md5_hashed_email`, and a value of an MD5 hashed email address. Please do **not** send unhashed emails to Branch.
1. In the Branch dashboard, navigate to **Postback Config** within the Criteo entry of the Ads Partner Manager.
1. Find the postback you want to edit, and add the following string in the relevant place. This will generally be as another event in the `"events"` array. Please note that _OPEN_ and _INSTALL_ events do not support this parameter.
	``` code
	,{"event":"setHashedEmail", "email":[<@json>${(custom_data.md5_hashed_email)!}</@json>]}
	```
