## Configure your ESP

### Set up an additional click tracking domain

Request a new RTS domain from your Account team. The RTS domain (typically a sub-domain on your actual domain) should be the same name used in the subsequent step of creating a CNAME record.

### Tell us your click tracking domain

Once you have a custom tracking domain, enter it on the Configure ESP step of email onboarding. On Done click, an AASA file - required for Universal Links - specific to that domain will be generated.

### Point the click tracking domain to Branch

To enable deep links, the click tracking domain (RTS Server) must point to Branch. This way Branch can proxy requests from the custom click tracking domain through to Cheetah Digital Marketing Suite.

Pointing the click tracking domain to Branch is very easy. All you need to do is to add a CNAME record and point the click tracking domain to `thirdparty.bnc.lt`.

You can check the CNAME setting using this [DNS verification tool](https://toolbox.googleapps.com/apps/dig/#CNAME/).

Apple recognizes the click tracking domain as a Universal Link, and opens the app immediately without opening the browser. Once the app has opened, Branch will collect the referring URL that opened the app (at this time, it will be the click tracking URL). Inside the app, Branch will automatically “click” the link, registering the click with Cheetah Digital Marketing Suite, and returning the Branch link information to the Branch SDK inside the app. This information is then used to deep link the user to the correct in-app content.

## Technical setup

### Integrate the mobile SDKs

This guide requires you to have already integrated the Branch SDK into your app:
- [iOS](https://docs.branch.io/pages/apps/ios/)
- [Android](https://docs.branch.io/pages/apps/android/)

Contact your Branch Account Manager or [accounts@branch.io](mailto:accounts@branch.io) at any time for assistance with the setup steps.

{! ingredients/email/email-associated-domains.md !}

### Add the deep link handler to the mobile app

**iOS:** Add the following code inside the `deepLinkHandler` code block in `application:didFinishLaunchingWithOptions`

```objc
[branch initSessionWithLaunchOptions:launchOptions
    andRegisterDeepLinkHandlerUsingBranchUniversalObject:
        ^ (BranchUniversalObject *BUO, BranchLinkProperties *linkProperties, NSError *error) {

            if (linkProperties.controlParams[@"$3p"] &&
                linkProperties.controlParams[@"$web_only"]) {
                NSURL *url = [NSURL URLWithString:linkProperties.controlParams[@"$original_url"]];
                if (url) {
                        //Open the WebView using url string
                }
            }
```

**Android:** Add the following code inside `protected void onStart()`

```java
if (linkProperties != null && !TextUtils.isEmpty(linkProperties.getControlParams().get("$web_only"))&& !TextUtils.isEmpty(linkProperties.getControlParams().get("$3p"))) {
   String webOnlyParam = linkProperties.getControlParams().get("$web_only");
   String is3pParam = linkProperties.getControlParams().get("$3p");
   if (!TextUtils.isEmpty(webOnlyParam) && !TextUtils.isEmpty(is3pParam)) {
       if (Boolean.parseBoolean(webOnlyParam)) {
           String url = linkProperties.getControlParams().get("$original_url");

          //Open the WebView using url string
       }
   }
```

## Ongoing Execution

### Add link markup to email links

Add the deep links markup to your links in the email to separate web links from deep links:
- Every link with a `$web_only=true` tag will direct users to the web page:
```html
<a href="https://links.example.com?$web_only=true">Link to your web page</a>
```
- Every link with a `$deep_link=true` tag will direct users to the app:
```html
<a href="https://links.example.com?$deep_link=true">Link to your app</a>
```

## Troubleshooting

### CNAME

- `CNAME` records of your custom click tracking domain will need to point to Branch in order to properly deep link on all platforms
- A `CNAME` is a type of DNS record that maps an alias name to a true or canonical domain name and is as simple as a subdomain web redirect
- `CNAME` does not affect your original NS records or IP warming
