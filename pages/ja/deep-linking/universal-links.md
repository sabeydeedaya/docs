## Overview

Branch makes it simple to enable Universal Links all while greatly improving on them, offering full attribution, supporting edge cases where Universal Links fail (common) and allowing you to deep link when the user doesn't have your app installed.

![image](/_assets/img/pages/deep-linking/universal-links/how_branch_improves.png)

## Setup

### Enable Universal Links on the Branch dashboard

1. Navigate to [Link Settings](https://dashboard.branch.io/link-settings) in the Branch Dashboard.
1. Check the box to `Enable Universal Links` from iOS redirects.
1. Type in your App’s Bundle Identifier.
1. Type in your Apple App Prefix (found by clicking your app on [this page](https://developer.apple.com/account/ios/identifier/bundle) in Apple's Developer Portal).
1. Scroll down and click on the `Save` button.

![image](/_assets/img/pages/deep-linking/universal-links/dashboard_enable_universal_links.png)

### Enable Associated Domains in Xcode

1. Go to the `Capabilities` tab of your project file.
1. Scroll down and enable `Associated Domains`. ![image](/_assets/img/pages/deep-linking/universal-links/enable_ass_domains.png)

!!! tip "If you see an error after this step"
	![image](/_assets/img/pages/deep-linking/universal-links/enable_ass_domains_error.png)

	Please ensure...

	- The right team selected for your Xcode project.
	- The Bundle Identifier of your Xcode project matches the one used to register the App Identifier with Apple.

### Add your Branch link domains

1. Go to the [Link Settings](https://dashboard.branch.io/link-settings) page on the dashboard.
1. Scroll down to the `Link Domain` area.
1. Copy your domain name.![image](/_assets/img/pages/deep-linking/universal-links/subdomain-setting.png)
1. In the `Domains` section, click the `+` icon and add the following entries: (making sure that `xxxx` matches the subdomain prefix you've been assigned or selected for yourself)
	* `applinks:xxxx.app.link`
	* `applinks:xxxx-alternate.app.link`
	* `applinks:xxxx.test-app.link`
	* `applinks:xxxx-alternate.test-app.link`

![image](/_assets/img/pages/deep-linking/universal-links/add_domain.png)

!!! warning "Support for legacy links"
	If the **Default domain name** box shows the legacy `bnc.lt` domain, you should use the following entry instead: `applinks:bnc.lt`

!!! tip "Using a custom domain or subdomain?"
	If you use a [custom domain or subdomain for your Branch links](/dashboard/integrate/#change-link-domain), you should instead add entries for `applinks:[mycustomdomainorsubdomain]` and `XXXX-alternate.app.link`. If you're unsure of your Branch-assigned app.link subdomain, contact integrations@branch.io, and we can provide it.

## Advanced

### Apps/browsers that support Universal Links

Unfortunately Universal Links don't work everywhere yet. We have compiled the Universal Links support status of some of the more popular apps.

#### Apps that always work

If you open a Universal Link in one of these apps, it should work correctly all the time.

| App/Browser | Status
| --- | ---
| Messages | works
| Mail | works
| WhatsApp | works
| Gmail | works
| Inbox | works

#### Apps limited by Apple

Apple has limited Universal Links in certain situations, apparently to avoid confusing users:

- Universal Links will not work if you paste the link into the browser URL field.
- Universal Links work with a user driven `<a href="...">` element click *across domains*. Example: if there is a Universal Link on google.com pointing to bnc.lt, it will open the app.
- Universal Links will not work with a user driven `<a href="...">` element click on the *same domain*. Example: if there is a Universal Link on google.com pointing to a different Universal Link on google.com, it will not open the app.
- Universal Links cannot be triggered via Javascript (in `window.onload` or via a `.click()` call on an `<a>` element), unless it is part of a user action.

| App/Browser | Status
| --- | ---
| Safari | works conditionally
| Chrome | works conditionally

#### Apps that work sometimes

Apps with built-in webviews (Google, Twitter, Facebook, Facebook Messenger, WeChat, etc.) work with Universal Links only when a webview is already open. In other words, Universal Links do not work in-app from the feed or main app views.

To work around this limitation, your links must have [deepviews](/web/deep-views/) or something similar enabled, with a call-to-action link/button that has a Universal Link behind it. This way, clicking a link from the app feed will open a webview containing your deepview page, and the user can then click the link/button to launch your app. All of Apple's limitations (in the section above) still apply for the deepview page.

| App/Browser | Status
| --- | ---
| Google | works conditionally
| Facebook | works conditionally
| Facebook Messenger | works conditionally
| WeChat | works conditionally
| Twitter | works conditionally
| LinkedIn | works conditionally
| Any app using `SFSafariViewController` | works conditionally

#### Apps with special cases

| App/Browser | Status
| --- | ---
| Slack | works if configured to open links in Safari. Otherwise, works conditionally as in the above section.


#### Apps that do not work

| App/Browser | Status
| --- | ---
| Pinterest | broken
| Instagram | broken
| Telegram | broken

### Common issues that cause Universal Links to fail

!!! tip "Automated Validation for Your Xcode Project"
	You can check if your Xcode project is correctly configured by using our [Universal Links Validator](/resources/validation-tools/#universal-link-validator).

##### Are you testing by manually entering into Safari?
Universal Links don't work properly when entered into Safari. Use Notes or iMessage for testing.

##### Are you wrapping Branch links with another link and redirecting?
In most cases, Universal Links won't open the app when they are "wrapped" by click tracking links. Universal links, including Branch links, must be freestanding. If you want Universal Links to work in all situations, do not use other links that redirect to your Branch links.

##### Do your Team ID & Bundle ID match those on your dashboard?
You can find them in the Dashboard under Settings > Link Settings, in the iOS section next to "Enable Universal Links." They should match your Team ID and Bundle ID. Team ID can be found here [https://developer.apple.com/membercenter/index.action#accountSummary](https://developer.apple.com/membercenter/index.action#accountSummary). Your Bundle ID is found in Xcode, in the `General` tab for the correct build target. If your Apple App Prefix is different from your Team ID, you should use your App Prefix. Your app prefix can be found from App IDs on Apple's Developer Portal.

##### Have you deleted the app and reinstalled it?
iOS does not re-scrape the apple-app-site-association file unless you delete and reinstall the app. (The only exception to this is App Store updates. iOS does rescrape on every update. This means that when users update to a version of your app with the applinks entitlement, Universal Links will start working for them.)

##### Universal Links can be disabled, unfortunately.
If you are successfully taken into your app via a Universal Link, you'll see "app.link" (or your domain) and a forward button in the top right corner of the status bar. If you click that button, Apple will no longer activate Universal Links in the future. To re-enable Universal Links, long press on the link in Messages (iOS 9 only due to iMessage revamp in 10) or Notes (iOS 10/9) and choose 'Open in <<App>>'.

##### Using a custom domain?
Make sure it's configured correctly. You can find configuration issues by using our [Universal Link Validator](http://branch.io/resources/aasa-validator/).

The following error message will appear in your OS-level logs if your domain doesn't have SSL set up properly:

```js
Sep 21 14:27:01 Derricks-iPhone swcd[2044] <Notice>: 2015-09-21 02:27:01.878907 PM [SWC] ### Rejecting URL 'https://examplecustomdomain.com/apple-app-site-association' for auth method 'NSURLAuthenticationMethodServerTrust': -6754/0xFFFFE59E kAuthenticationErr
```

These logs can be found for physical devices connected to Xcode by navigating to Window > Devices > choosing your device and then clicking the "up" arrow in the bottom left corner of the main view.

If you're using a custom subdomain, your CNAME should point to `custom.bnc.lt` under [Link Settings](https://dashboard.branch.io/link-settings) in the Branch dashboard.

### Return YES to continueUserActivity

When users enter your app via a Universal Link, we check to see to see if the link URL contains `app.link`. If so, `handledByBranch` will return `YES`. If not, `handledByBranch` will return `NO`. This allows us to explicitly confirm the incoming link is from Branch without making a server call.

For most implementations this will never be an issue, since your deep links will be routed correctly either way. However, if you use a custom link domain *and* you rely on `handledByBranch` to return `YES` for every incoming Branch-generated Universal Link, you can inform the Branch SDK by following these steps:

1. In your **Info.plist** file, create a new key called `branch_universal_link_domains`.
1. Add your custom domain(s) as a string. ![image](/_assets/img/pages/deep-linking/universal-links/branch-universal-link-domain.png)
1. Save the file.

!!! tip "Multiple custom domains"
	If you have an unusual situation with multiple custom link domains, you may also configure `branch_universal_link_domains` as an array of strings. ![image](/_assets/img/pages/deep-linking/universal-links/branch-universal-link-domains.png)
