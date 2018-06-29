### Prerequisites

This guide requires you to have already integrated the Branch SDK into your app:
- [iOS](https://docs.branch.io/pages/apps/ios/)
- [Android](https://docs.branch.io/pages/apps/android/)

Contact your Branch Account Manager or [accounts@branch.io](mailto:accounts@branch.io) at any time for assistance with the setup steps.

### How Deep Links Work with Adobe Campaign Standard

#### Setting up your click tracking domain

The click-tracking domain is a key component to set up a deep linked email. Normally, when clients setup the click tracking domain, they provide a customized domain name and point it to the Adobe Campaign Standard tracking server.

![image](/img/pages/email/click-tracking-1.png)

To make deep links work, the click tracking domain must be pointed to Branch - so Branch will receive the clicks, proxy requests to Adobe Campaign Standard and redirect users to the app or website. Branch recommends that a new click tracking domain is set up for all new campaigns that will use Branch.

![image](/img/pages/email/click-tracking-2.png)

#### Interaction with the mobile app

When integrating the Branch SDK, Branch will generate and host a file, which associates the click-tracking domain domain with the client’s native app (Apple App Site Association for Apple, assetlinks.json for Android )The Mobile OS recognizes the click tracking domain as a Universal/Application Link, and opens the app immediately without the browser opening. Once the app has opened, Branch will collect the referring URL that opened the app (at this time, it will be the click tracking url). Inside the app, Branch will automatically “click” the link, registering the click with the ESP, and providing the Branch link information to the Branch SDK inside the app. This information is then used to deep link the user to the correct in-app content. 

## Integration Guide

### One-Time Setup

#### Create a new click tracking domain

To enable deep links, you need to create a new the click tracking domain and point it to Branch. This way Branch can proxy requests from the custom click tracking domain through to Adobe Campaign Standard.

Pointing the click tracking domain to Branch is very easy. Using your domain management system - add a CNAME record and point the click tracking domain to `thirdparty.bnc.lt`.

![image](/img/pages/email/click-tracking-3.png)

You can check the CNAME setting using this [DNS verification tool](https://toolbox.googleapps.com/apps/dig/#CNAME/).

Apple recognizes the click tracking domain as a Universal Link, and opens the app immediately without opening the browser. Once the app has opened, Branch will collect the referring URL that opened the app (at this time, it will be the click tracking URL). Inside the app, Branch will automatically “click” the link, registering the click with Adobe Campaign Standard, and returning the Branch link information to the Branch SDK inside the app. This information is then used to deep link the user to the correct in-app content.

#### Configure the External Tracking Server 

Open the Brand Configuration page in Adobe Campaign Standard and find the field called **External URL of the tracking server**.

![image](/img/pages/email/adobe-campaign-external-setup.png)

#### Update the External Tracking Server URL

Open the Brand Configuration page (in Adobe Campaign Standard) and Replace the External Tracking Server URL with the new click tracking domain, generated at **Step 1**.

#### Tell Us Your Click Tracking Domain

Copy your new click tracking domain into the click tracking domain setting for the Adobe Campaign Standard integration in the [Branch Dashboard](https://branch.dashboard.branch.io/email/manager).

![image](/img/pages/email/adobe-campaign-internal-setup.png)

### Technical Setup

#### Add association of click tracking domain to you mobile app

**iOS:** Add click tracking domain to your app's list of **Associated Domains**

To enable Universal Links on your click tracking domain, you'll need to add the click tracking domain to your Associated Domains entitlement.

1. In Xcode, go to the `Capabilities` tab of your project file.
1. Scroll down and enable `Associated Domains` if it is not already enabled.

    ![image](/img/pages/email/enable-associated-domains.png)

1. Copy your click tracking domain from the [email you received from Branch](#configure-your-app-for-your-click-tracking-domain), or retrieve it from your ESP's settings.
1. In the `Domains` section, click the `+` icon and add your click tracking domain. For example, if your click tracking domain is `email.example.com`, add an entry for `applinks:email.example.com`.

    ![image](/img/pages/email/add-domain.png)

!!! protip "Having trouble or new to Universal Links?"
    Follow [these instructions](/pages/deep-linking/universal-links/) for more details on enabling Universal Links in the Branch dashboard and in Xcode.

**Android:** Add click tracking domain to intent filter in **AndroidManifest.xml**

![image](/img/pages/email/android-manifest.png)

#### Add the deep link handler to the mobile app

**iOS:** Add the following code inside the `deepLinkHandler` code block in `application:didFinishLaunchingWithOptions`

```objc
[branch initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {
  // params are the deep linked params associated with the link that the user clicked before showing up.
  if (params[@"$3p"] && params[@"$web_only"]) {
            NSURL *url = [NSURL URLWithString:params[@"$original_url"]];
            if (url) {
                [application openURL:url]; // check to make sure your existing deep linking logic, if any, is not executed, perhaps by returning early
            }
  } else { 
    // it is a deep link
    GDLog(@"branch deep link: %@", [params description]); 
    [self handleBranchDeeplink:params];
  }
}];
```

**Android** Add the following code inside `protected void onStart()`

```java
String webOnlyParam = linkProperties.getControlParams().get("$web_only");
String is3pParam = linkProperties.getControlParams().get("$3p");
if(!TextUtils.isEmpty(webOnlyParam) && !TextUtils.isEmpty(is3pParam)) {
   if(Boolean.parseBoolean(webOnlyParam) ) {
       String url = linkProperties.getControlParams().get("$original_url");
       Intent i = new Intent(Intent.ACTION_VIEW);
       i.setData(Uri.parse(url));
       startActivity(i);
   }
}
```

### Ongoing Execution

#### Add link markup to email links

Add the deep links markup to your links in the email to separate web links from deep links:
- Every link with a `$web_only=true` tag will direct users to the web page:
```html
<a href="https://links.example.com?$web_only=true">Link to your web page</a>
```
- Every link with a `$deep_link=true` tag will direct users to the app:
```html
<a href="https://links.example.com?$deep_link=true">Link to your app</a>
```

## Conclusion

Congratulations, you are now ready to start sending deep linked email campaigns! For help with any steps in this process, please contact your Branch or Adobe account management team.
