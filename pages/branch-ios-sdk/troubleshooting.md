title: iOS SDK Troubleshooting

<div class="page-ul">
  <div class="page-li"><a href="/branch-ios-sdk/basic-integration/">Basic Integration</a></div>
  <div class="page-li"><a href="/branch-ios-sdk/advanced-features">Advanced Features</a></div>
  <div class="page-li"><a href="/branch-ios-sdk/testing">Testing</a></div>
  <div class="page-li">
    <div class="page-active">
      <a href="/branch-ios-sdk/troubleshooting">Troubleshooting</a>
    </div>
  </div>
  <div class="page-li"><a href="/branch-ios-sdk/version-history">Version History</a></div>
  <div class="page-li"><a href="/branch-ios-sdk/full-reference">Full Reference</a></div>
</div>

## Troubleshoot issues

### Test your Branch Integration

Test your Branch Integration by calling `validateSDKIntegration` in your AppDelegate. Check your Xcode logs to make sure all the SDK Integration tests pass. Make sure to comment out or remove `validateSDKIntegration` in your production build.

- *Swift*

    ```swift
    Branch.getInstance().validateSDKIntegration()
    ```

- *Objective C*

    ```objc
    [[Branch getInstance] validateSDKIntegration];
    ```

### To validate if AASA file successfully downloaded

- Connect a test device to your MAC

- Uninstall the app

- View the device's console output in the MAC console

- Install your app and let it launch

- Filter the console output by "swcd"

- If the AASA downloaded sucessfully, you'll see something like the screenshot below (If the AASA did not download, you must uninstall the app, restart the device, and then reinstall the app)

![image](https://cdn.branch.io/branch-assets/1520880422940-og_image.png)

### Submitting to the App Store

- Need to select `app uses IDFA or GAID` when publishing your app (for better deep link matching)

### App not opening

- Double check [Integrate Branch](#integrate-branch)

- Investigate if the device disabled universal links ([Re-enable universal linking](#re-enable-universal-linking))

- Investigate if it is a link related issue ([Deep links do not open app](/links/integrate/#deep-links-do-not-open-app))

- Use [Universal links validator](https://branch.io/resources/universal-links/)

- Use [AASA validator](https://branch.io/resources/aasa-validator/)

- Use [Test deep link](#test-deep-link)

### App not passing data

- See if issue is related to [App not opening](#app-not-opening)

- Investigate Branch console logs ([Enable logging](#enable-logging))

### Deep links are long

- Happens whenever the app cannot make a connection to the Branch servers

- The long deep links will still open the app and pass data

### Sample apps

- [Swift testbed](https://github.com/BranchMetrics/ios-branch-deep-linking/tree/master/Branch-TestBed-Swift)

- [Objective C testbed](https://github.com/BranchMetrics/ios-branch-deep-linking/tree/master/Branch-TestBed)

### Track content properties

- Used for [Track content](#track-content)

    | Key | Value
    | --- | ---
    | BNCRegisterViewEvent | User viewed the object
    | BNCAddToWishlistEvent | User added the object to their wishlist
    | BNCAddToCartEvent | User added object to cart
    | BNCPurchaseInitiatedEvent | User started to check out
    | BNCPurchasedEvent | User purchased the item
    | BNCShareInitiatedEvent | User started to share the object
    | BNCShareCompletedEvent | User completed a share

### Re-enable universal linking

- Apple allows users to disable universal linking on a per app per device level on iOS 9 and iOS 10 (fixed in iOS 11)

- Use [Test deep link](#test-deep-link) to re-enable universal linking on the device

### Deep link routing with a Branch ViewController

- Add before `initSession` [Initialize Branch](#initialize-branch)

- Recommend to [Navigate to content](#navigate-to-content) instead

- *Swift*

    ```swift
    Branch.getInstance().registerDeepLinkController(ViewController(), forKey: "my-key", withPresentation: .optionShow)
    ```

- *Objective C*

    ```objc
    [[Branch getInstance] registerDeepLinkController:customViewController forKey:@"my-key"withPresentation:BNCViewControllerOptionShow];
    ```

### Test Deeplink routing for your Branch links

Append `?bnc_validate=true` to any of your app's Branch links and click it on your mobile device (not the Simulator!) to start the test. For instance, to validate a link like: `"https://<yourapp\>.app.link/NdJ6nFzRbK"` click on: `"https://<yourapp\>.app.link/NdJ6nFzRbK?bnc_validate=true"`


### Determine if deep link is from Branch without network

- Use for Universal Linking if you want to get the `true/false` response from `Branch.getInstance().continue(userActivity)` within `continueUserActivity` without a Branch network call
- Use only if you have a custom link domain
- Add `branch_universal_link_domains` to your `info.plist` with an array of your link domain from your [Branch Dashboard](https://dashboard.branch.io/settings/link)

    ![image](/_assets/img/pages/apps/ios-link-domains.png)

### Share to email options

- Change the way your deep links behave when shared to email

- Needs a [Share deep link](#share-deep-link)

- *Swift*

    ```swift
    lp.addControlParam("$email_subject", withValue: "Your Awesome Deal")
    lp.addControlParam("$email_html_header", withValue: "<style>your awesome CSS</style>\nOr Dear Friend,")
    lp.addControlParam("$email_html_footer", withValue: "Thanks!")
    lp.addControlParam("$email_html_link_text", withValue: "Tap here")
    ```

- *Objective C*

    ```objc
    [lp addControlParam:@"$email_subject" withValue:@"This one weird trick."];
    [lp addControlParam:@"$email_html_header" withValue:@"<style>your awesome CSS</style>\nOr Dear Friend,"];
    [lp addControlParam:@"$email_html_footer" withValue:@"Thanks!"];
    [lp addControlParam:@"$email_html_link_text" withValue:@"Tap here"];
    ```

### Share message dynamically

- Change the message you share based on the source the users chooses

- Needs a [Share deep link](#share-deep-link)

- *Swift*

    ```swift
    // import delegate
    class ViewController: UITableViewController, BranchShareLinkDelegate

    func branchShareLinkWillShare(_ shareLink: BranchShareLink) {
      // choose shareSheet.activityType
      shareLink.shareText = "\(shareLink.linkProperties.channel)"
    }
    ```

- *Objective C*

    ```objc
    // import delegate
    @interface ViewController () <BranchShareLinkDelegate>

    - (void) branchShareLinkWillShare:(BranchShareLink*)shareLink {
      // choose shareSheet.activityType
      shareLink.shareText = [NSString stringWithFormat:@"@%", shareLink.linkProperties.channel];
    }
    ```
