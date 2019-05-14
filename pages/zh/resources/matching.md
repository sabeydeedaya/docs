## Overview

There are several mechanisms Branch uses to pass data through to the app and attribute app sessions back to the source. We always use the method with the highest match confidence rate. When we are 100% confident, the deep link data will contain the variable `+match_guaranteed=true`.

### Methods with 100% match accuracy

#### Direct deeplinking

If the app is currently installed on the phone, and you've configured your Branch links with your app's URI scheme (`myapp://`) or to use Universal or App Links, we will open the app immediately and pass a click identifier through to our native library. This click identifier is then sent to the Branch servers to retrieve the dictionary of data associated with the link.

For example, we'd call `myapp://open?link_click_id=123456` to open the app immediately. The Branch native library parses out `link_click_id: 123456` and passes it back to the Branch API to retrieve the data dictionary associated with that link click.

#### Device ID token matching across the Branch Network

When a user clicks a Branch link for your app, and we've seen that user click a link for _another_ app on our partner network, we've already matched them up to a corresponding device identifier. This means that when they install the app, we know with 100% certainty that they just came from that link click.

The fact that we have such a global network of apps with hundreds of millions of users clicking links, means that when you join the platform, you can benefit from the crowd-sourced accuracy gained through all our apps contributing the browser-app profiles. Read more about how important this is on [our blog](https://blog.branch.io/the-importance-of-matching-accuracy-in-deep-linking).

#### Leveraging other match techniques

We've built out custom deep linking mechanisms that are specific to each platform to ensure that deep linking is accurate. Here are some of those techniques we use:

| Match Method | Implementation Details
| --- | ---
| **Facebook deferred deep linking API** | We've built a custom integration with Facebook where if a user originates from an app invite or advertisement, we connect with Facebook's API to know with 100% certainty if the install originated from this source. You'll need to authenticate with Facebook on the Branch dash if you want to support this.
| **Android Google Play referrer** | Google Play supports passing a referrer through the install process that we listen for. It's notoriously unreliable and currently unsupported when redirecting from Chrome. However, we'll use it when available. Enabling this method is covered in the [SDK Integration Guide](/apps/android/#configure-app).
| **iOS 9/10 Safari cookie passthrough** | We built a custom technique into our iOS SDK that will guarantee 100% accuracy on iOS 9/10 when a user clicks from the Safari browser. This only applies if you include SafariServices.framework in your app. Please see our new recommended [path to use this feature](/resources/matching/#configuring-your-ios-app-for-100-match-ios-10-only). Note that this method has some risks due to a policy change on iOS on 9/1/16.
| **Android Chrome Tabs cookie passthrough** | We built a custom technique into our Android SDK that will guarantee 100% accuracy when a user originates from the Chrome browser. We're automatically cookie match based on app.link, but you can configure the domain depending on your use case. Please see [the guide here](/resources/matching/#configuring-your-android-app-for-100-match).

### Methods without 100% match accuracy

#### Browser to app fingerprint match

Branch collects information about devices both when a user is in the browser -- via a click on a Branch link -- and then after they open the app. This information includes **IP Address (including v6)**, **OS**, **OS version**, **device model** and other parameters. This is the user's **_digital fingerprint_** and can be obtained in the browser and in the app.

When no 100% match method is available, we connect the unique fingerprint collected in the app to the unique fingerprint collected in the browser to determine where user originated.

!!! tip "Customize the fingerprint matching criteria"
    If you are concerned that users may potentially have the same fingerprint, you can choose to have us not match users if two identical fingerprints are outstanding. On the Dashboard's [Link Settings](https://dashboard.branch.io/link-settings) page, under advanced options, you should set **Match Type** to `Unique`. You can also modify the 7200 second (2 hour) default expiration for all links, or [configure it for individual links](/links/integrate/#deep-linking) by using the `$match_duration` control parameter.

    ![image](/_assets/img/pages/resources/matching/match_type.png)

    This means that if two users with the same fingerprint, on the same wifi, were to click a Branch link for your app, we would blacklist those digital fingerprints for the expiration duration. Therefore, when either user opens up your app, no match would be made.

## Configuring Your iOS App for 100% Match ( > iOS 10 only)

!!! warning "Applies only to iOS 10 and below"
    100% match is a bit of a misnomer, as it is only 100% match from when a user clicks from the Safari browser. According to our analysis, clicking through Safari happens about 50-75% of the time depending on the use case. For example, clicking from Facebook or Chrome won't trigger a 100% match here. However, it's still beneficial to the matching accuracy, so we recommend employing it.

### Include SafariServices.framework

First off, you'll need to include the `SafariServices.framework` into your app to leverage this. Currently, as soon as you add the Framework, Branch will start triggering the Safari-based 100% match technique. To add the framework, simply go to your Xcode project:

- Select the right build target
- Select the `General` tab
- Scroll down to `Linked Frameworks and Libraries`
- Click the `+` button
- Add `SafariServices.framework`

### Set the matching domain to app.link

Because our Safari View Controller matching method works based on comparing the cookie Branch set on a click to the cookie set with the View Controller, the domains must be consistent. iOS assumes that you're on the `bnc.lt` domain, so if you're using `app.link` domain as your default (most apps), you must specify this domain in your PLIST file.

Please set the `branch_app_domain` to `app.link` in your PLIST as shown below:

![image](/_assets/img/pages/resources/matching/branch_app_domain.png)

### Need to disable SafariViewController?

Note that this mechanism can be **disabled** using the following method, which should be called _before_ `initSession`.

- *Objective-C*

	```objc
	[[Branch getInstance] disableCookieBasedMatching];
	```

- *Swift*

	```swift
	Branch.getInstance().disableCookieBasedMatching()
	```


## Configuring Your Android App for 100% Match

Similar to iOS, 100% match is a bit of a misnomer since this method will only work if a user clicks via the Chrome browser. Other browsers such as Facebook and Twitter will not benefit from this method. We haven't pull the stats on usage like we do on iOS, but we'd assume it's similar to Safari (50-75% of clicks).

### Enable cookie matching

Add `compile 'com.android.support:customtabs:23.3.0'` to the dependencies section of your `build.gradle` file.

### Use the legacy bnc.lt domain for cookie matching

Unlike on iOS where we assume that your domain is on `bnc.lt`, on Android we assume it is the `app.link` domain. If you want to override it, you must set the domain you want via a call to Branch like so:

```java
// call before calling getAutoInstance in the Application class
Branch.enableCookieBasedMatching("bnc.lt");
Branch.getAutoInstance(this);
```
