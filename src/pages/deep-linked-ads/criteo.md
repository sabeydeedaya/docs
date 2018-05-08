## Overview

Track your Criteo campaigns using Branch's Universal Ads product. Universal Ads provides everything you need for complete tracking, including rich data for the Criteo Engine to opimtize against.

The basic Criteo integration involves three parts:

1. Integrating the SDKs and tracking in-app events
1. Enabling the integration and selecting postbacks
1. Creating tracking links

## Setup

### Integrating the SDKs and tracking in-app events

The Branch SDKs for iOS and Android allow you to get up and running quickly. Criteo has some custom configurations to be aware of when you get set up.

If you haven't already integrated Branch, follow the below guides.

1. Start by following the integration guides for Android and iOS:
	- [Android](/pages/apps/android/){:target="\_blank"}
	- [iOS](/pages/apps/ios/){:target="\_blank"}
1. Once this is complete, you can test your integration by going to our [Liveview page](https://dashboard.branch.io/liveview/events){:target="\_blank"}. Set a filter for opens to verify that the Branch SDK is recording installs. 

	!!! warning "Limitations with setDebug and seeing data in Branch"
		When integrating the SDKs, it's often useful to use setDebug to verify that your app is able to communicate with Branch servers, and is receiving deep link data. However, our upstream systems don't register test events sent using setDebug, so events will not appear in Liveview or Analytics, nor will they fire postbacks. Disable setDebug when looking at Liveview or testing postbacks.

#### Customize initialization

##### Sending non-Branch deep links

Criteo requests all deep links (including non-Branch links) to be sent to their servers upon app open. Branch doesn't provide this by default, so you'll need to update your SDK initialization to support this.

**If you use any authentication or login libraries, please ensure you strip out all tokens, passwords and other sensitive information before passing this information to Branch.**

To pass the `$criteo_deep_link_url` to Branch, add this code to your AppDelegate or the relevant Activity/Application:

**Objective-C**

Inside *didFinishLaunchingWithOptions*

```objc
//TODO: Get deep link value

Branch *branch = [Branch getInstance];
[branch setRequestMetadataKey:@"$criteo_deep_link_url" value:[TODO]];
```

**Swift**

Inside *didFinishLaunchingWithOptions*

```swift

//TODO: Get deep link value

if let branch = Branch.getInstance() {
    branch.setRequestMetadataKey("$criteo_deep_link_url", value:{TODO});
}
```

**Android**

Before you initialize in your Application#onCreate or Deep Link Activity's #onCreate.

```java

// TODO: Get deep link value

Branch branch = Branch.getInstance();
branch.setRequestMetadata("$criteo_deep_link_url", TODO);

...

Branch.initSession(...);
```

##### Identifying users with setIdentity

Branch allows you to identify your users and will send those user identities to Criteo. 

The method used to identify users is called `setIdentity`, and the value you set is called the `developer_identity`. Set this upon a user login event in your app, and Branch will use it for all subsequent events attributed to that user.

- [Android](/pages/apps/android/#track-users){:target="\_blank"}
- [iOS](/pages/apps/ios/#track-users){:target="\_blank"}

!!! warning "Do not send emails or PII with setIdentity"
	To respect user privacy, please do not use names, emails or other identifiable information as your developer identity.


#### Track conversion events

Install and open events are automatically tracked using just the Branch SDK integration. However, to track other events, such as registration events, or purchase events, you'll want to add more tracked events in the SDK. 

Please reference the general Branch V2 Event tracking guide as well as the Criteo specific information below. This will help ensure that you've integrated the right Branch events with the correct metadata, and the postbacks to Criteo will be preconfigured for you.
	- [V2 Event Tracking Guide](/pages/apps/v2event/#overview)

!!! note "Testing your events with Liveview"
	You can test your integration by going to our [Liveview page](https://dashboard.branch.io/liveview/events){:target="\_blank"}. Set a filter with the event name to verify that the Branch SDK is recording each event. 

##### Branch and Criteo Event Mapping

Branch supports the full suite of Criteo events. Please talk to your Criteo Solutions Consultant to ensure you've identified the right events for your app. 

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
VIEW_PRODUCTS | View Listing | Content Event | None
VIEW_ITEM | View Product | Content Event | None
VIEW_CART | View Basket | Commerce Event | None
PURCHASE | Track Transaction | Commerce Event | None
ACHIEVE_LEVEL | UI Level | User Lifecycle Event | `ui_level`
UNLOCK_ACHIEVEMENT | UI Achievement  | User Lifecycle Event |  `ui_achievement`
COMPLETE_REGISTRATION | Registration  | User Lifecycle Event | None
UI_STATUS | UI Status  | **Custom Event** |  `ui_status`
UI_LOGIN | UI Login  | **Custom Event** |  None
SUBSCRIPTION | Subscription  | **Custom Event** |  None
TUTORIAL_FINISHED | Tutorial Finished  | **Custom Event**  | None
LOW_PRIORITY | Low Priority  | **Custom Event**  | None
HIGH_PRIORITY | High Priority  | **Custom Event**  | None
ABANDONED_BASKET | Abandoned Basket  | **Custom Event**  | None
STATIC_TRANSACTION | Static Transaction  | PURCHASE*  | None

*\* The Static Transaction Postback is available as a custom version of the PURCHASE postback. Please see information below for setup.*


### 1. Enabling the integration and selecting postbacks

1. If you're successfully registering events, it's 

#### Grab Tags for Events

Go to the **Floodlight activities** tab. For all the events you want to track, grab the **Activity tag String** and **Group tag String**.

![image](/img/pages/deep-linked-ads/doubleclick/cat-type.png)

In the above screenshot, the two values for **Activity tag String** are *act-ios* and *act-android*. The one value for **Group tag String** is *sales*. Do this for all activities you want to track.

Once you're done with this exercise, you should have at least 4 unique values:

- Server to Server token
- Advertiser ID
- Activity tag String (per event)
- Group tag String (per event)

### Branch Dashboard Setup

Let's take these values and place them in Branch's dashboard. Begin by navigating to the [partners page](https://dashboard.branch.io/ads/partner-management/a_doubleclick).

#### Enable

Find doubleclick in the search box. Hit enable. In the **Account Settings** tab, insert your **Server to Server token**.

#### Map Events

At this point, you have enabled Branch to communicate with Doubleclick. Now we need to map Branch events to **Floodlight Activities** found on the Doubleclick dashboard. Click the **Postback Config** tab. You should see a URL for the event **Install**. For demonstration purposes, we will assume you have a corresponding Install event on the Doubleclick dashboard, but this applies to any event you add.

Start by grabbing your **Advertiser ID**, **Activity tag String**, and **Group tag String**.

In the screenshot above, we have two events, "In App Activations - Android", and "In App Activations - iOS", which correspond to the Branch Install event. For this example, the **Activity tag Strings** are *act-and* and *act-ios*. The **Group tag String** is *sales*.

Copy the existing URL in Install, and replace the *src*, *cat*, and *type* variables. Your end result should look exactly like this:

`https://ad.doubleclick.net/ddm/s2s/appactivity/src=6637276;cat=<#if user_data.os=="IOS">act-ios</#if><#if user_data.os=="ANDROID">act-and</#if>;type=sales;ord=${ (id)! }`

If you don't have two different tags for iOS and Android, then it will look simpler:

`https://ad.doubleclick.net/ddm/s2s/appactivity/src=6637276;cat=act-tag;type=sales;ord=${ (id)! }`

![image](/img/pages/deep-linked-ads/doubleclick/final-postback-doubleclick.png)

Simply update and hit save.

### Run campaigns

At this point, you can now create a link for the Doubleclick network and send data back. Take your Branch link, and place it as the Click Through URL for your placement.
