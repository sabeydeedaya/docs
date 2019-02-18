This documentation explains how to send **mParticle events to your Branch dashboard**. If you'd like to send Branch installs to your mParticle dashboard, please review the [Branch/mParticle Data Integration](/pages/integrations/mparticle).

!!! info "These instructions apply to the mParticle SDK version 7+ integration"
    mParticle introduced a new attribution & deep linking API in v7 of their SDK (http://docs.mparticle.com/developers/sdk/ios/getting-started/#upgrade-to-version-7-of-the-sdk), so please contact your Branch or mParticle Account Managers for more details, if you have mParticle SDK < v7+ installed in your app.

!!! warning "Inconsistent Universal links behavior on iOS 11.2"
    After updating a device to iOS 11.2, we found that the app's AASA file is no longer downloaded reliably onto your user’s device after an app install. As a result, clicking on Universal links will no longer open the app consistenly. You can set [forced uri redirect mode](/pages/links/integrate/#forced-redirections) on your Branch links to open the app with URI schemes. View details of the issue on the [Apple Bug report](http://www.openradar.me/radar?id=4999496467480576).

## Technical Requirements

- [mParticle SDK for iOS](https://docs.mparticle.com/developers/sdk/ios/getting-started/)
- [mParticle Branch Kit](https://github.com/mparticle-integrations/mparticle-apple-integration-branchmetrics)
- [Retrieve Deep Link Data via mParticle](http://docs.mparticle.com/developers/sdk/ios/kits#deep-linking)
- [Enable Universal Links in Branch](https://docs.branch.io/pages/deep-linking/universal-links/#enable-associated-domains-in-xcode)

## Branch Setup

### Configure Branch Dashboard

- Configure your [Branch Dashboard](https://dashboard.branch.io/settings/link)

    ![image](/img/pages/dashboard/ios.png)
    ![image](/img/pages/dashboard/link-domain.png)

## mParticle Setup

### Install the mParticle Branch Kit

- Option 1: [CocoaPods](https://cocoapods.org/)

    ```sh hl_lines="7"
    platform :ios, '8.0'

    target 'APP_NAME' do
      # if swift
      use_frameworks!

      ‘pod 'mParticle-BranchMetrics', '~> 7'
    end
    ```

- Option 2: [Carthage](https://github.com/Carthage/Carthage)

    ```sh
    github "mparticle-integrations/mparticle-apple-integration-branchmetrics"
    ```
#### Configure bundle identifier

- Make sure Bundle Id matches your [Branch Dashboard](https://dashboard.branch.io/settings/link)

    ![image](/img/pages/apps/ios-bundle-id.png)

#### Configure associated domains

- Add your link domains from your [Branch Dashboard](https://dashboard.branch.io/settings/link)
- `-alternate` is needed for Universal Linking with the [Web SDK](/pages/web/integrate/) inside your Website
- `test-` is needed if you need use a [test key](#use-test-key)
- If you use a [custom link domain](/pages/dashboard/integrate/#change-link-domain), you will need to include your old link domain, your `-alternate` link domain, and your new link domain

    ![image](/img/pages/apps/ios-entitlements.png)

#### Configure entitlements

- Confirm entitlements are within target

  ![image](/img/pages/apps/ios-package.png)

#### Configure info.pList

- Add [Branch Dashboard](https://dashboard.branch.io/account-settings/app) values

    - Add `branch_app_domain` with your live key domain
    - Add your URI scheme as `URL Types` -> `Item 0` -> `URL Schemes`

    ![image](/img/pages/apps/ios-plist.png)

#### Confirm app prefix

- From your [Apple Developer Account](https://developer.apple.com/account/ios/identifier/bundle)

    ![image](/img/pages/apps/ios-team-id.png)

The mParticle iOS SDK (version 5.4.1 and later) will automatically call the following methods of the Branch Metrics SDK:

- `initSessionWithLaunchOptions:` within `application:didFinishLaunchingWithOptions:`
- `handleDeepLink:` within `application:openURL:options:`
- `continueUserActivity:` within `application:continueUserActivity:restorationHandler:`

#### Import iOS Support Libraries

- `AdSupport`
- `SafariServices`
- `MobileCoreServices`
- `CoreSpotlight`
- `iAd`

### Initializing Branch in the mParticle Kit

As with any kit, mParticle will automatically handle initializing Branch sessions. Please ensure `.onAttributionComplete` is enabled in `mParticleOptions`.

!!! warning "mParticle appDelegate proxy not enabled"
    If the mParticle appDelegate proxy is not enabled, you must add mParticle [URI & Domain relays](https://docs.mparticle.com/developers/sdk/ios/getting-started/#uiapplication-delegate-proxy) to the appDelegate.

### Enable Branch on mParticle

- Before you can enable Branch in your mParticle dashboard, you must retrieve your Branch Key on the [Link Settings](https://dashboard.branch.io/settings/link) page of your Branch dashboard.

- Please follow mParticle's documentation on how to [Connect an Event Output](https://docs.mparticle.com/guides/getting-started/connect-an-event-output/); i.e. enable the Branch integration.

- If you have enabled Apple Search Ads for your Branch implementation, you must also check `Enable Apple Search Ads` in the Connection Settings.

Once you have added the kit and configured your branch API key in the mParticle dashboard, the mParticle SDKs will take care of initializing the Branch SDK and forwarding the appropriate application lifecycle events to handle deep links.

At this point you should start seeing your Branch session data - including installs, re-opens, and any custom events - in your Branch dashboard.

### Test deep link

- Create a deep link from the [Branch Dashboard](https://dashboard.branch.io/marketing)
- Delete your app from the device
- Compile and test on a device
- Paste deep link in `Apple Notes`
- Long press on the deep link (not 3D Touch)
- Click `Open in "APP_NAME"` to open your app ([example](/img/pages/apps/ios-notes.png))

## Implementing features

Please refer to mParticle's [marking direct calls to kits]( https://docs.mparticle.com/developers/sdk/ios/kits/#making-direct-calls-to-kits) documentation for how to access the kit via the mParticle SDK.

Please refer to Branch's [native iOS SDK](/pages/apps/ios/#implement-features) documentation for how to implement secondary functionality.

## Sample testing apps

- [Examples](https://github.com/mparticle-integrations/mparticle-apple-integration-branchmetrics/tree/master/Examples)

## Troubleshooting

Please refer to the [Branch iOS SDK troubleshooting section](/pages/apps/ios/#troubleshoot-issues).
