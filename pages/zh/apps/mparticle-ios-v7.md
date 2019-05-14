This documentation explains how to send **mParticle events to your Branch dashboard**. If you'd like to send Branch installs to your mParticle dashboard, please review the [Branch/mParticle Data Integration](/integrations/mparticle).

!!! info "These instructions apply to the mParticle SDK version 7+ integration"
    mParticle introduced a new attribution & deep linking API in v7 of their SDK (http://docs.mparticle.com/developers/sdk/ios/getting-started/#upgrade-to-version-7-of-the-sdk), so please contact your Branch or mParticle Account Managers for more details, if you have mParticle SDK < v7 installed in your app.

!!! warning "Inconsistent Universal links behavior on iOS 11.2"
    After updating a device to iOS 11.2, we found that the app's AASA file is no longer downloaded reliably onto your user’s device after an app install. As a result, clicking on Universal links will no longer open the app consistenly. You can set [forced uri redirect mode](/links/integrate/#forced-redirections) on your Branch links to open the app with URI schemes. View details of the issue on the [Apple Bug report](http://www.openradar.me/radar?id=4999496467480576).

## Technical Requirements

- [mParticle SDK for iOS](https://docs.mparticle.com/developers/sdk/ios/getting-started/)
- [mParticle Branch Kit](https://github.com/mparticle-integrations/mparticle-apple-integration-branchmetrics)

## Branch Setup

### Configure bundle identifier

- Make sure Bundle Id matches your [Branch Dashboard](https://dashboard.branch.io/settings/link)

    ![image](/_assets/img/pages/apps/ios-bundle-id.png)

### Confirm app prefix

- From your [Apple Developer Account](https://developer.apple.com/account/ios/identifier/bundle)

    ![image](/_assets/img/pages/apps/ios-team-id.png)

### Configure Branch Dashboard & Enable Universal Links

- Enter a URI scheme in the [Branch Dashboard](https://dashboard.branch.io/settings/link) and [enable Universal Links](/deep-linking/universal-links/#enable-universal-links-on-the-branch-dashboard)

    ![image](/_assets/img/pages/dashboard/ios.png)
    ![image](/_assets/img/pages/dashboard/link-domain.png)

### Configure associated domains

- Add your link domains from your [Branch Dashboard](https://dashboard.branch.io/settings/link)
- `-alternate` is needed for Universal Linking with the [Web SDK](/web/integrate/) inside your Website
- `test-` is needed if you need use a [test key](#use-test-key)
- If you use a [custom link domain](/dashboard/integrate/#change-link-domain), you will need to include your old link domain, your `-alternate` link domain, and your new link domain

    ![image](/_assets/img/pages/apps/ios-entitlements.png)

### Configure entitlements

- Confirm entitlements are within target

  ![image](/_assets/img/pages/apps/ios-package.png)

### Configure info.pList

- Add [Branch Dashboard](https://dashboard.branch.io/account-settings/app) values

    - Add `branch_app_domain` with your live key domain
    - Add your URI scheme as `URL Types` -> `Item 0` -> `URL Schemes`
    - Do NOT add your API keys to the file (mParticle handles this via the dashboard)

    ![image](/_assets/img/pages/apps/ios-plist.png)

## mParticle Setup

### Enable Branch on mParticle

- Before you can enable Branch in your mParticle dashboard, you must retrieve your Branch Key on the [Link Settings](https://dashboard.branch.io/settings/link) page of your Branch dashboard.

- Please follow mParticle's documentation on how to [Connect an Event Output](https://docs.mparticle.com/guides/getting-started/connect-an-event-output/); i.e. enable the Branch integration.

- If you have enabled Apple Search Ads for your Branch implementation, you must also check `Enable Apple Search Ads` in the Connection Settings.

Once you have added the kit and configured your branch API key in the mParticle dashboard, the mParticle SDKs will take care of initializing the Branch SDK and forwarding the appropriate application lifecycle events to handle deep links.

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

### Import iOS Support Libraries

- `AdSupport`
- `SafariServices`
- `MobileCoreServices`
- `CoreSpotlight`
- `iAd`

### Initializing Branch in the mParticle Kit

The mParticle iOS SDK (version 5.4.1 and later) will automatically call the following methods of the Branch Kit:

- `initSessionWithLaunchOptions:` within `application:didFinishLaunchingWithOptions:`
- `handleDeepLink:` within `application:openURL:options:`
- `continueUserActivity:` within `application:continueUserActivity:restorationHandler:`

This means mParticle will automatically handle initializing Branch sessions. However, please ensure `.onAttributionComplete` is enabled in the `mParticleOptions` object.

!!! warning "mParticle appDelegate proxy not enabled"
    If the mParticle appDelegate proxy is not enabled, you must add mParticle's [URI & Domain relays](https://docs.mparticle.com/developers/sdk/ios/getting-started/#uiapplication-delegate-proxy) to the appDelegate.

At this point you should start seeing your Branch session data - including installs, re-opens, and any custom events - in your Branch dashboard.

### Retrieve Deep Link Data via mParticle

Our integration with mParticle supports the creation and attribution of deep links to install and open an app. A deep link will typically contain some additional information to be used when the user ultimately opens your application, so that you can properly route the user to the appropriate content, or otherwise customize their experience.

Please ensure you've followed [mParticle's documentation](http://docs.mparticle.com/developers/sdk/ios/kits#deep-linking) to ensure your deep link data is being retrieved.

!!! info "mParticle in React Native"
    If you integrate mParticle in React Native, you will still integrate the Branch kit as a Native module and follow the setup steps above.  However, instead of retrieving deep link data in the the native layer, you'll retrieve deep link data via [mParticle's React Native function found here](https://github.com/mParticle/react-native-mparticle/blob/master/README.md#attribution).

### Test deep link

- Create a deep link from the [Branch Dashboard](https://dashboard.branch.io/marketing)
- Delete your app from the device
- Compile and test on a device
- Paste deep link in `Apple Notes`
- Long press on the deep link (not 3D Touch)
- Click `Open in "APP_NAME"` to open your app ([example](/_assets/img/pages/apps/ios-notes.png))

## Implementing features

- Please refer to mParticle's [making direct calls to kits]( https://docs.mparticle.com/developers/sdk/ios/kits/#making-direct-calls-to-kits) documentation for how to access the Branch kit via the mParticle SDK.

- Once you have a reference to the Branch kit, refer to Branch's [native iOS SDK](/apps/ios/#implement-features) documentation on how to implement secondary functionality.

## Sample testing apps

- [Example Applications](https://github.com/mparticle-integrations/mparticle-apple-integration-branchmetrics/tree/master/Examples)

## Troubleshooting

Please refer to the [Branch iOS SDK troubleshooting section](/apps/ios/#troubleshoot-issues).
