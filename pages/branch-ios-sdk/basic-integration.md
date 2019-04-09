title: iOS SDK Basic Integration

<div class="page-ul">
  <div class="page-li">
    <div class="page-active">
      <a href="/branch-ios-sdk/basic-integration/">Basic Integration</a>
    </div>
  </div>
  <div class="page-li"><a href="/branch-ios-sdk/advanced-features">Advanced Features</a></div>
  <div class="page-li"><a href="/branch-ios-sdk/testing">Testing</a></div>
  <div class="page-li"><a href="/branch-ios-sdk/troubleshooting">Troubleshooting</a></div>
  <div class="page-li"><a href="/branch-ios-sdk/version-history">Version History</a></div>
  <div class="page-li"><a href="/branch-ios-sdk/full-reference">Full Reference</a></div>
</div>

!!! info "Current SDK Version 0.26.0"
    Please see the [iOS SDK Version History](/branch-ios-sdk/version-history) to view change log.

## Integrate Branch

!!! warning "Inconsistent Universal links behavior on iOS 11.2+"
    After updating a device to iOS 11.2+, we found that the app's AASA file is no longer downloaded reliably onto your user’s device after an app install. As a result, clicking on Universal Links will no longer open the app consistently. You can set [forced uri redirect mode](/links/integrate/#forced-redirections) on your Branch links to open the app with URI schemes. View details of the issue on the [Apple Bug report](http://www.openradar.me/radar?id=4999496467480576).

### Configure Branch

- [Configure the default link settings](/links/default-link-behavior/) for your app

- Make sure `I have an iOS app` is enabled

    ![image](/_assets/img/pages/dashboard/ios.png)

### Configure bundle identifier

- Make sure Bundle Id matches your [Branch Dashboard](https://dashboard.branch.io/settings/link)

    ![image](/_assets/img/pages/apps/ios-bundle-id.png)

### Configure associated domains

- Add your link domains from your [Branch Dashboard](https://dashboard.branch.io/settings/link)
- `-alternate` is needed for Universal Linking with the [Web SDK](/web/integrate/) inside your Website
- `test-` is needed if you need use a [test key](#use-test-key)
- If you use a [custom link domain](/dashboard/integrate/#change-link-domain), you will need to include your old link domain, your `-alternate` link domain, and your new link domain

    ![image](/_assets/img/pages/apps/ios-entitlements.png)

### Configure entitlements

- Confirm entitlements are within target (This file is configured automatically when completing the steps above in [Capabilities tab of Xcode](https://developer.apple.com/documentation/security/password_autofill/setting_up_an_app_s_associated_domains#3001207))

    ![image](/_assets/img/pages/apps/ios-package.png)

### Configure Info.plist

- Add [Branch Dashboard](https://dashboard.branch.io/account-settings/app) values

    - Add `branch_app_domain` with your live key domain
    - Add `branch_key` with your current Branch key
    - Add your URI scheme as `URL Types` -> `Item 0` -> `URL Schemes`

    ![image](/_assets/img/pages/apps/ios-plist.png)

### Confirm app prefix

- From your [Apple Developer Account](https://developer.apple.com/account/ios/identifier/bundle)

    ![image](/_assets/img/pages/apps/ios-team-id.png)

### Install Branch

- Option 1: [CocoaPods](https://cocoapods.org/)

    ```sh hl_lines="7"
    platform :ios, '8.0'

    target 'APP_NAME' do
      # if swift
      use_frameworks!

      pod 'Branch'
    end
    ```

    ```sh
    pod install && pod update
    ```

- Option 2: [Carthage](https://github.com/Carthage/Carthage)

    ```sh
    github "BranchMetrics/ios-branch-deep-linking"
    ```

- Option 3: Manually install the [source code](https://github.com/BranchMetrics/ios-branch-deep-linking/releases) with dependencies

    - Drag and drop `Branch.framework` into `Embedded Binaries` (select `Copy items if needed`)
    - Import `AdSupport`, `SafariServices`, `MobileCoreServices`, `CoreSpotlight`, and `iAd` into `Linked Frameworks`

    ![image](/_assets/img/pages/apps/ios-frameworks.png)

### Initialize Branch

- *Swift 4.2*

    ```swift hl_lines="2 10 11 12 13 14 15 16 21 22 27 28 33 34"
    import UIKit
    import Branch

    @UIApplicationMain
    class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
      // if you are using the TEST key
      Branch.setUseTestBranchKey(true)
      // listener for Branch Deep Link data
      Branch.getInstance().initSession(launchOptions: launchOptions) { (params, error) in
        // do stuff with deep link data (nav to page, display content, etc)
        print(params as? [String: AnyObject] ?? {})
      }
      return true
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
      Branch.getInstance().application(app, open: url, options: options)
      return true
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
      // handler for Universal Links
      Branch.getInstance().continue(userActivity)
      return true
    }

    func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
      // handler for Push Notifications
      Branch.getInstance().handlePushNotification(userInfo)
    }
    ```

- *Swift 3*

    ```swift hl_lines="2 10 11 12 13 14 15 16 21 22 27 28 33 34"
    import UIKit
    import Branch

    @UIApplicationMain
    class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
      // if you are using the TEST key
      Branch.setUseTestBranchKey(true)
      // listener for Branch Deep Link data
      Branch.getInstance().initSession(launchOptions: launchOptions) { (params, error) in
        // do stuff with deep link data (nav to page, display content, etc)
        print(params as? [String: AnyObject] ?? {})
      }
      return true
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool {
      Branch.getInstance().application(app, open: url, options: options)
      return true
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([Any]?) -> Void) -> Bool {
      // handler for Universal Links
      Branch.getInstance().continue(userActivity)
      return true
    }

    func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
      // handler for Push Notifications
      Branch.getInstance().handlePushNotification(userInfo)
    }
    ```

- *Objective-C*

    ```objc hl_lines="2 11 12 13 14 15 16 17 22 23 28 29 34 35"
    #import "AppDelegate.h"
    #import "Branch/Branch.h"

    @interface AppDelegate ()

    @end

    @implementation AppDelegate

    - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
      // if you are using the TEST key
      [Branch setUseTestBranchKey:YES];
      // listener for Branch Deep Link data
      [[Branch getInstance] initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary * _Nonnull params, NSError * _Nullable error) {
        // do stuff with deep link data (nav to page, display content, etc)
        NSLog(@"%@", params);
      }];
      return YES;
    }

    - (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
      [[Branch getInstance] application:app openURL:url options:options];
      return YES;
    }

    - (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler {
      // handler for Universal Links
      [[Branch getInstance] continueUserActivity:userActivity];
      return YES;
    }

    - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
      // handler for Push Notifications
      [[Branch getInstance] handlePushNotification:userInfo];
    }

    @end
        ```

### Test deep link

- Create a deep link from the [Branch Dashboard](https://dashboard.branch.io/marketing)
- Delete your app from the device
- Compile and test on a device
- Paste deep link in `Apple Notes`
- Long press on the deep link (not 3D Touch)
- Click `Open in "APP_NAME"` to open your app ([example](/_assets/img/pages/apps/ios-notes.png))

!!! tip "Testing deferred deep linking"
    Deferred deep linking is simply deep linking into an app that is not yet installed. Once the app is installed, the context is preserved and the user's first app-open will have the deep link data from the original Branch link. To test this, uninstall the app from your device, click the Branch link, and manually launch the app from Xcode. You should be routed to the correct content within your app.
