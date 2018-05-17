## Integrate Branch

!!! warning "Inconsistent Universal links behavior on iOS 11.2+"
    After updating a device to iOS 11.2+, we found that the app's AASA file is no longer downloaded reliably onto your user’s device after an app install. As a result, clicking on Universal Links will no longer open the app consistently. You can set [forced uri redirect mode](/pages/links/integrate/#forced-redirections) on your Branch links to open the app with URI schemes. View details of the issue on the [Apple Bug report](http://www.openradar.me/radar?id=4999496467480576).

- ### Configure Branch

    - Complete the `Basic integration` within [Configure your dashboard](/pages/dashboard/integrate/)

    - Make sure `I have an iOS app` is enabled

        ![image](/img/pages/dashboard/ios.png)

- ### Configure bundle identifier

    - Make sure Bundle Id matches your [Branch Dashboard](https://dashboard.branch.io/settings/link)

        ![image](/img/pages/apps/ios-bundle-id.png)

- ### Configure associated domains

    - Add your link domains from your [Branch Dashboard](https://dashboard.branch.io/settings/link)
    - `-alternate` is needed for Universal Linking with the [Web SDK](/pages/web/integrate/) inside your Website
    - `test-` is needed if you need use a [test key](#use-test-key)
    - If you use a [custom link domain](/pages/dashboard/integrate/#change-link-domain), you will need to include your old link domain, your `-alternate` link domain, and your new link domain

        ![image](/img/pages/apps/ios-entitlements.png)

- ### Configure entitlements

    - Confirm entitlements are within target

        ![image](/img/pages/apps/ios-package.png)

- ### Configure info.pList

    - Add [Branch Dashboard](https://dashboard.branch.io/account-settings/app) values

        - Add `branch_app_domain` with your live key domain
        - Add `branch_key` with your current Branch key
        - Add your URI scheme as `URL Types` -> `Item 0` -> `URL Schemes`

        ![image](/img/pages/apps/ios-plist.png)

- ### Confirm app prefix

    - From your [Apple Developer Account](https://developer.apple.com/account/ios/identifier/bundle)

        ![image](/img/pages/apps/ios-team-id.png)

- ### Install Branch

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

        ![image](/img/pages/apps/ios-frameworks.png)

- ### Initialize Branch

    - *Swift 3*

        ```swift hl_lines="2 10 11 12 13 14 15 16 21 22 27 28 33 34"
        import UIKit
        import Branch

        @UIApplicationMain
        class AppDelegate: UIResponder, UIApplicationDelegate {

        var window: UIWindow?

        func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
          // if you are using the TEST key
          // Branch.setUseTestBranchKey(true)
          // for debug and development only
          Branch.getInstance().setDebug()
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
          // [Branch setUseTestBranchKey:YES];
          // for debug and development only
          [[Branch getInstance] setDebug];
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

- ### Test deep link

    - Create a deep link from the [Branch Dashboard](https://dashboard.branch.io/marketing)
    - Delete your app from the device
    - Compile and test on a device
    - Paste deep link in `Apple Notes`
    - Long press on the deep link (not 3D Touch)
    - Click `Open in "APP_NAME"` to open your app ([example](/img/pages/apps/ios-notes.png))

    !!! tip "Testing deferred deep linking"
        Deferred deep linking is simply deep linking into an app that is not yet installed. Once the app is installed, the context is preserved and the user's first app-open will have the deep link data from the original Branch link. To test this, uninstall the app from your device, click the Branch link, and manually launch the app from Xcode. You should be routed to the correct content within your app.

## Implement features

- ### Create content reference

    - The `Branch Universal Object` encapsulates the thing you want to share

    - Uses [Universal Object properties](/pages/links/integrate/#universal-object)

    - *Swift 3*

        ```swift
        // required: canonicalIdentifier or title
        // recommended: title, contentDescription, imageUrl for social media cards
        let buo = BranchUniversalObject(canonicalIdentifier: "content/123")
        buo.canonicalUrl = "https://example.com/content/123"
        buo.title = "Content 123 Title"
        buo.contentDescription = "Content 123 Description \(Date())"
        buo.imageUrl = "http://lorempixel.com/400/400/"
        buo.keywords = ["awesome", "things"]

        // index on Apple Spotlight
        buo.locallyIndex = true

        // index on Google, Branch, etc
        buo.publiclyIndex = true

        // additional object details
        buo.contentMetadata.contentSchema = .commerceRestaurant
        buo.contentMetadata.quantity = 12
        buo.contentMetadata.price = 33.44
        buo.contentMetadata.currency = .USD
        buo.contentMetadata.sku = "123"
        buo.contentMetadata.productName = "grapes"
        buo.contentMetadata.productBrand = "welch"
        buo.contentMetadata.productCategory = BNCProductCategory.foodBeverageTobacco
        buo.contentMetadata.productVariant = "bulk"
        buo.contentMetadata.condition = .good
        buo.contentMetadata.ratingAverage = 4.5
        buo.contentMetadata.ratingCount = 78
        buo.contentMetadata.ratingMax = 5
        buo.contentMetadata.addressStreet = "123 Over Here"
        buo.contentMetadata.addressCity = "Austin"
        buo.contentMetadata.addressRegion = "Texas"
        buo.contentMetadata.addressCountry = "USA"
        buo.contentMetadata.addressPostalCode = "76035"
        buo.contentMetadata.latitude = 30.267153
        buo.contentMetadata.longitude = -97.743061

        // custom key-value pairs
        buo.contentMetadata.imageCaptions = ["awesome", "things"]
        buo.contentMetadata.customMetadata = ["custom": "123"]
        buo.contentMetadata.customMetadata = ["anything": "everything"]
        ```

    - *Objective-C*

        ```objc
        // only canonical identifier is required
        BranchUniversalObject *buo = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"content/123"];
        buo.title = @"Content 123 Title";
        buo.contentDescription = @"Content 123 Description";
        buo.imageUrl = @"https://lorempixel.com/400/400";
        buo.price = 12.12;
        buo.currency = @"USD";
        buo.contentIndexMode = ContentIndexModePublic;
        buo.automaticallyListOnSpotlight = YES;
        [buo addMetadataKey:@"custom" value:[[NSUUID UUID] UUIDString]];
        [buo addMetadataKey:@"anything" value:@"everything"];
        ```

- ### Create link reference

    - Generates the analytical properties for the deep link

    - Used for [Create deep link](#create-deep-link) and [Share deep link](#share-deep-link)

    - Uses [Configure link data](/pages/links/integrate/#configure-deep-links) and custom data

    - *Swift 3*

        ```swift
        let lp: BranchLinkProperties = BranchLinkProperties()
        lp.channel = "facebook"
        lp.feature = "sharing"
        lp.campaign = "content 123 launch"
        lp.stage = "new user"
        lp.tags = ["one", "two", "three"]

        lp.addControlParam("$desktop_url", withValue: "http://example.com/desktop")
        lp.addControlParam("$ios_url", withValue: "http://example.com/ios")
        lp.addControlParam("$ipad_url", withValue: "http://example.com/ios")
        lp.addControlParam("$android_url", withValue: "http://example.com/android")
        lp.addControlParam("$match_duration", withValue: "2000")

        lp.addControlParam("custom_data", withValue: "yes")
        lp.addControlParam("look_at", withValue: "this")
        lp.addControlParam("nav_to", withValue: "over here")
        lp.addControlParam("random", withValue: UUID.init().uuidString)
        ```

    - *Objective-C*

        ```objc
        BranchLinkProperties *lp = [[BranchLinkProperties alloc] init];
        lp.feature = @"facebook";
        lp.channel = @"sharing";
        lp.campaign = @"content 123 launch";
        lp.stage = @"new user";
        lp.tags = @[@"one", @"two", @"three"];

        [lp addControlParam:@"$desktop_url" withValue: @"http://example.com/desktop"];
        [lp addControlParam:@"$ios_url" withValue: @"http://example.com/ios"];
        [lp addControlParam:@"$ipad_url" withValue: @"http://example.com/ios"];
        [lp addControlParam:@"$android_url" withValue: @"http://example.com/android"];
        [lp addControlParam:@"$match_duration" withValue: @"2000"];

        [lp addControlParam:@"custom_data" withValue: @"yes"];
        [lp addControlParam:@"look_at" withValue: @"this"];
        [lp addControlParam:@"nav_to" withValue: @"over here"];
        [lp addControlParam:@"random" withValue: [[NSUUID UUID] UUIDString]];
        ```

- ### Create deep link

    - Generates a deep link within your app

    - Needs a [Create content reference](#create-content-reference)

    - Needs a [Create link reference](#create-link-reference)

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/links)

    - *Swift 3*

        ```swift
        buo.getShortUrl(with: lp) { (url, error) in
          print(url ?? "")
        }
        ```

    - *Objective-C*

        ```objc
        [buo getShortUrlWithLinkProperties:lp andCallback:^(NSString* url, NSError* error) {
            if (!error) {
                NSLog(@"@", url);
            }
        }];
        ```


- ### Share deep link

    -  Will generate a Branch deep link and tag it with the channel the user selects

    - Needs a [Create content reference](#create-content-reference)

    - Needs a [Create link reference](#create-link-reference)

    - Uses [Deep Link Properties](/pages/links/integrate/)

     - *Swift 3*

        ```swift
        let message = "Check out this link"
        buo.showShareSheet(with: lp, andShareText: message, from: self) { (activityType, completed) in
          print(activityType ?? "")
        }
        ```

    - *Objective C*

        ```objc
        [buo showShareSheetWithLinkProperties:lp andShareText:@"Super amazing thing I want to share!" fromViewController:self completion:^(NSString* activityType, BOOL completed) {
            NSLog(@"finished presenting");
        }];
        ```

- ### Read deep link

    - Retrieve Branch data from a deep link

    - Best practice to receive data from the `listener` (to prevent a race condition)

    - Returns [deep link properties](/pages/links/integrate/#read-deep-links)

    - *Swift 3*

        ```swift
        // listener (within AppDelegate didFinishLaunchingWithOptions)
        Branch.getInstance().initSession(launchOptions: launchOptions) { params, error in
          print(params as? [String: AnyObject] ?? {})
        }

        // latest
        let sessionParams = Branch.getInstance().getLatestReferringParams()

        // first
        let installParams = Branch.getInstance().getFirstReferringParams()
        ```

    - *Objective C*

        ```objc
        [[Branch getInstance] initSessionWithLaunchOptions:launchOptions
                                andRegisterDeepLinkHandler:^(NSDictionary * _Nullable params,
                                                             NSError * _Nullable error) {
            if (!error) {
                //Referring params
                NSLog(@"Referring link params %@",params);
            }
        }];

        // latest
        NSDictionary *sessionParams = [[Branch getInstance] getLatestReferringParams];

        // first
        NSDictionary *installParams =  [[Branch getInstance] getFirstReferringParams];

        ```

- ### Navigate to content

    - Handled within `Branch.initSession()`

    - *Swift 3*

        ```swift
        // within AppDelegate application.didFinishLaunchingWithOptions
        Branch.getInstance().initSession(launchOptions: launchOptions) { params , error in
          // Option 1: read deep link data
          guard let data = params as? [String: AnyObject] else { return }

          // Option 2: save deep link data to global model
          SomeCustomClass.sharedInstance.branchData = data

          // Option 3: display data
          let alert = UIAlertController(title: "Deep link data", message: "\(data)", preferredStyle: .alert)
          alert.addAction(UIAlertAction(title: "Okay", style: .default, handler: nil))
          self.window?.rootViewController?.present(alert, animated: true, completion: nil)

          // Option 4: navigate to view controller
          guard let options = data["nav_to"] as? String else { return }
          switch options {
              case "landing_page": self.window?.rootViewController?.present( SecondViewController(), animated: true, completion: nil)
              case "tutorial": self.window?.rootViewController?.present( SecondViewController(), animated: true, completion: nil)
              case "content": self.window?.rootViewController?.present( SecondViewController(), animated: true, completion: nil)
              default: break
          }
        }
        ```

    - *Objective C*

        ```objc
        // within AppDelegate application.didFinishLaunchingWithOptions
        [[Branch getInstance] initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary * _Nonnull params, NSError * _Nullable error) {
          // Option 1: read deep link data
          NSLog(@"%@", params);

          // Option 2: save deep link data to global model
          NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
          [defaults setObject:params.description forKey:@"BranchData"];
          [defaults synchronize];

          // Option 3: display data
          UIAlertController * alert = [UIAlertController alertControllerWithTitle:@"Title" message:params.description preferredStyle:UIAlertControllerStyleAlert];
          UIAlertAction *button = [UIAlertAction actionWithTitle:@"Deep Link Data" style:UIAlertActionStyleDefault handler:nil];
          [alert addAction:button];
          [self.window.rootViewController presentViewController:alert animated:YES completion:nil];

          // Option 4: navigate to view controller
          if ([params objectForKey:@"navHere"]) {
            ViewController *anotherViewController = [[ViewController alloc] initWithNibName:@"anotherViewController" bundle:nil];
            [self.window.rootViewController presentViewController:anotherViewController animated:YES completion:nil];
          }
        }];
        ```

- ### Display

    - List content on `iOS Spotlight`

    - Needs a [Create content reference](#create-content-reference)

    - *Swift 3*

        ```swift
        buo.automaticallyListOnSpotlight = true
        ```

    - *Objective-C*

        ```objc
        buo.automaticallyListOnSpotlight = YES;
        ```

- ### Track content

    - Track how many times a piece of content is viewed

    - Needs a [Create content reference](#create-content-reference)

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/content)

    - *Swift 3*

        ```swift
        BranchEvent.standardEvent(.viewItem, withContentItem: buo).logEvent()
        ```

    - *Objective-C*

        ```objc
        [[BranchEvent standardEvent:BranchStandardEventViewItem withContentItem:buo] logEvent];
        ```

- ### Track users

    - Sets the identity of a user (email, ID, UUID, etc) for events, deep links, and referrals

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/identities)

    - *Swift 3*

        ```swift
        // login
        Branch.getInstance().setIdentity("your_user_id")

        // logout
        Branch.getInstance().logout()
        ```

    - *Objective-C*

        ```objc
        // login
        [[Branch getInstance] setIdentity:@"your_user_id"];

        // logout
        [[Branch getInstance] logout];
        ```


- ### Track events

    - Registers a custom event

    - Events named `open`, `close`, `install`, and `referred session` are Branch restricted

    - Best to [Track users](#track-users) before [Track events](#track-events) to associate a custom event to a user

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/events)

    - *Swift 3*

        ```swift
        // option 1
        BranchEvent.customEvent(withName: "your_custom_event", contentItem: buo).logEvent()

        // option 2
        let event = BranchEvent.customEvent(withName: "your_custom_event", contentItem: buo)
        event.customData["key"] = "value"
        event.logEvent()
        ```

    - *Objective-C*

        ```objc
        // option 1
        [[BranchEvent customEventWithName:@"your_custom_event" contentItem:buo] logEvent];

        // option 2
        BranchEvent *event = [BranchEvent customEventWithName:@"your_custom_event" contentItem:buo];
        event.customData[@"key"] = @"value";
        [event logEvent];
        ```

- ### Track commerce

    - Registers a custom commerce event

    - Uses [Track commerce properties](#commerce-properties) for `Currency` and `Category`

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/commerce)

    - *Swift 3*

        ```swift
        // Create a BranchUniversalObject with your content data:
        let branchUniversalObject = BranchUniversalObject.init()

        // ...add data to the branchUniversalObject as needed...
        branchUniversalObject.canonicalIdentifier = "item/12345"
        branchUniversalObject.canonicalUrl        = "https://branch.io/item/12345"
        branchUniversalObject.title               = "My Item Title"

        // Create a BranchEvent:
        let event = BranchEvent.standardEvent(.purchase)

        // Add the BranchUniversalObjects with the content:
        event.contentItems     = [ branchUniversalObject ]

        // Add relevant event data:
        event.transactionID    = "12344555"
        event.currency         = .USD;
        event.revenue          = 1.5
        event.shipping         = 10.2
        event.tax              = 12.3
        event.coupon           = "test_coupon";
        event.affiliation      = "test_affiliation";
        event.eventDescription = "Event_description";
        event.searchQuery      = "item 123"
        event.customData       = [
            "Custom_Event_Property_Key1": "Custom_Event_Property_val1",
            "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
        ]
        event.logEvent() // Log the event.
        ```

    - *Objective C*

        ```objc
        // Create a BranchUniversalObject with your content data:
        BranchUniversalObject *branchUniversalObject = [BranchUniversalObject new];

        // ...add data to the branchUniversalObject as needed...
        branchUniversalObject.canonicalIdentifier = @"item/12345";
        branchUniversalObject.canonicalUrl        = @"https://branch.io/item/12345";
        branchUniversalObject.title               = @"My Item Title";

        // Create an event and add the BranchUniversalObject to it.
        BranchEvent *event     = [BranchEvent standardEvent:BranchStandardEventAddToCart];

        // Add the BranchUniversalObjects with the content:
        event.contentItems     = (id) @[ branchUniversalObject ];

        // Add relevant event data:
        event.transactionID    = @"12344555";
        event.currency         = BNCCurrencyUSD;
        event.revenue          = [NSDecimalNumber decimalNumberWithString:@"1.5"];
        event.shipping         = [NSDecimalNumber decimalNumberWithString:@"10.2"];
        event.tax              = [NSDecimalNumber decimalNumberWithString:@"12.3"];
        event.coupon           = @"test_coupon";
        event.affiliation      = @"test_affiliation";
        event.eventDescription = @"Event_description";
        event.searchQuery      = @"item 123";
        event.customData       = (NSMutableDictionary*) @{
            @"Custom_Event_Property_Key1": @"Custom_Event_Property_val1",
            @"Custom_Event_Property_Key2": @"Custom_Event_Property_val2"
        };
        [event logEvent];
        ```

- ### Handle referrals

    - Referral points are obtained from referral rules on the [Branch Dashboard](https://dashboard.branch.io/referrals/rules)

    - Validate on the [Branch Dashboard](https://dashboard.branch.io/referrals/analytics)

    - Reward credits

        -  [Referral guide](/pages/dashboard/analytics/#referrals)

    - Redeem credits

        - *Swift 3*

            ```swift
            // option 1 (default bucket)
            let amount = 5
            Branch.getInstance().redeemRewards(amount)

            // option 2
            let bucket = "signup"
            Branch.getInstance().redeemRewards(amount, forBucket: bucket)
            ```

        - *Objective C*

            ```objc
            // option 1 (default bucket)
            NSInteger amount = 5;
            [[Branch getInstance] redeemRewards:amount];

            // option 2
            NSString *bucket = @"signup";
            [[Branch getInstance] redeemRewards:amount forBucket:bucket];
            ```

    - Load credits

        - *Swift 3*

            ```swift
            Branch.getInstance().loadRewards { (changed, error) in
              // option 1 (defualt bucket)
              let credits = Branch.getInstance().getCredits()

              // option 2
              let bucket = "signup"
              let credits = Branch.getInstance().getCreditsForBucket(bucket)
            }
            ```

        - *Objective C*

            ```objc
            [[Branch getInstance] loadRewardsWithCallback:^(BOOL changed, NSError * _Nullable error) {
                if (changed) {
                // option 1 (defualt bucket)
                NSInteger credits = [[Branch getInstance] getCredits];

                // option 2
                NSString *bucket = @"signup";
                NSInteger credit = [[Branch getInstance] getCreditsForBucket:bucket];
                }
            }];

            ```

    - Load history

        - *Swift 3*

            ```swift
            Branch.getInstance().getCreditHistory { (creditHistory, error) in
               print(creditHistory ?? {})
             }
            ```

        - *Objective C*

            ```objc
            [[Branch getInstance] getCreditHistoryWithCallback:^(NSArray * _Nullable creditHistory, NSError * _Nullable error) {
                NSLog(@"%@",creditHistory);
            }];
            ```

- ### Handle push notifications

    - Allows you to track Branch deep links in your push notifications

    - Include the Branch push notification handler in [Initialize Branch](#initialize-branch)
    - Add a Branch deep link in your push notification  `payload`

        ```json hl_lines="6"
        {
          "aps": {
            "alert": "Push notification with a Branch deep link",
            "badge": "1"
          },
          "branch": "https://example.app.link/u3fzDwyyjF"
        }
        ```

        - Replace `https://example.app.link/u3fzDwyyjF` with your deep link

    - Read deep link data from `initSession` [Initialize Branch](#initialize-branch)

- ### Handle links in your own app

    - Allows you to deep link into your own from your app itself

    - *Swift 3*

        ```swift
        Branch.getInstance().handleDeepLink(withNewSession: URL(string: "https://example.app.link/u3fzDwyyjF"))
        ```

    - *Objective C*

        ```objc
        [[Branch getInstance] handleDeepLinkWithNewSession:[NSURL URLWithString:@"https://example.app.link/u3fzDwyyjF"]];
        ```

!!! warning
    Handling a new deep link in your app will clear the current session data and a new referred "open" will be attributed.

- ### Track Apple Search Ads

    - Allows Branch to track Apple Search Ads deep linking analytics

    - Analytics from Apple's API have been slow which will make our analytics lower. Additionally, Apple's API does not send us all the data of an ad every time which will make ads tracked by us to show a generic campaign sometimes.

    - Add before `initSession` [Initialize Branch](#initialize-branch)

        - *Swift 3*

            ```swift
            Branch.getInstance().delayInitToCheckForSearchAds()
            ```

        - *Objective C*

            ```objc
            [[Branch getInstance] delayInitToCheckForSearchAds];
            ```

    - Test with fake campaign params (do not test in production)

        - *Swift 3*

            ```swift
            Branch.getInstance().setAppleSearchAdsDebugMode()
            ```

        - *Objective C*

            ```objc
            [[Branch getInstance] setAppleSearchAdsDebugMode];
            ```

- ### Enable 100% matching

    - Use the `SFSafariViewController` to increase the attribution matching success

    - The 100% match is a bit of a misnomer, as it is only 100% match from when a user clicks from the Safari browser. According to our analysis, clicking through Safari happens about 50-75% of the time depending on the use case. For example, clicking from Facebook, Gmail or Chrome won’t trigger a 100% match here. However, it’s still beneficial to the matching accuracy, so we recommend employing it.

    - When using a custom domain, add a `branch_app_domain` string key in your Info.plist with your custom domain
    to enable 100% matching.

    - By default, cookie-based matching is enabled on iOS 9 and 10 if the `SafariServices.framework`
    is included in an app's dependencies, and the app uses an app.link subdomain or sets the `branch_app_domain`
    in the Info.plist. It can be disabled with a call to the SDK.

    - Add before `initSession` [Initialize Branch](#initialize-branch)

    - *Swift 3*

        ```swift
        Branch.getInstance().disableCookieBasedMatching()
        ```

    - *Objective C*

        ```objc
        [[Branch getInstance] disableCookieBasedMatching];
        ```

- ### Enable / Disable User Tracking

    If you need to comply with a user's request to not be tracked, utilize this field to prevent Branch from sending network requests. By calling the below function, this will persist at the SDK level.

    - *Swift*

        ```swift
        Branch.setTrackingDisabled(true)
        ```

    - *Objective C*    

        ```objc
        [Branch setTrackingDisabled:YES];
        ```

    You can choose to call this throughout the lifecycle of the app. Once called, network requests will not be sent from the SDKs. Link generation will continue to work, but will not contain identifying information about the user. In addition, deep linking will continue to work, but will not track analytics for the user.

## Troubleshoot issues

- ### To validate if AASA file successfully downloaded

    - Connect a test device to your MAC

    - Uninstall the app

    - View the device's console output in the MAC console

    - Install your app and let it launch

    - Filter the console output by "swcd"

    - If the AASA downloaded sucessfully, you'll see something like the screenshot below (If the AASA did not download, you must uninstall the app, restart the device, and then reinstall the app)

    ![image](https://cdn.branch.io/branch-assets/1520880422940-og_image.png)

- ### Submitting to the App Store

    - Need to select `app uses IDFA or GAID` when publishing your app (for better deep link matching)

- ### App not opening

    - Double check [Integrate Branch](#integrate-branch)

    - Investigate if the device disabled universal links ([Re-enable universal linking](#re-enable-universal-linking))

    - Investigate if it is a link related issue ([Deep links do not open app](/pages/links/integrate/#deep-links-do-not-open-app))

    - Use [Universal links validator](https://branch.io/resources/universal-links/)

    - Use [AASA validator](https://branch.io/resources/aasa-validator/)

    - Use [Test deep link](#test-deep-link)

- ### App not passing data

    - See if issue is related to [App not opening](#app-not-opening)

    - Investigate Branch console logs ([Enable logging](#enable-logging))

- ### Simulate an install

    - Delete your app

    - iPhone Device -> Settings -> Privacy -> Advertising -> Reset Advertising Identifier -> Reset Identifier

    - Add `Branch.setDebug(true)` before `initSession` ([Initialize Branch Features](#initialize-branch-features))

    - Click on a deep link to navigate to your `$fallback_url` because your app is not installed

    - Install your app

    - Open your app

    - Read from `params` within `initSession` for `+is_first_session = true`

- ### Deep links are long

    - Happens whenever the app cannot make a connection to the Branch servers

    - The long deep links will still open the app and pass data

- ### Sample apps

    - [Swift testbed](https://github.com/BranchMetrics/ios-branch-deep-linking/tree/master/Branch-TestBed-Swift)

    - [Objective C testbed](https://github.com/BranchMetrics/ios-branch-deep-linking/tree/master/Branch-TestBed)

- ### Track content properties

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

- ### Enable logging

    - Use the Branch test key instead of the live key

    - Add before `initSession` [Initialize Branch](#initialize-branch)

    - Remove before releasing to production

    - *Swift 3*

        ```swift
        Branch.getInstance().setDebug()
        ```

    - *Objective C*

        ```objc
        [[Branch getInstance] setDebug];
        ```

    - Make sure `OS_ACTIVITY_MODE` is not disabled ([link](https://stackoverflow.com/a/39503602/2690774))

- ### Use test key

    - Use the Branch `test key` instead of the `live key`

    - Add before `initSession` [Initialize Branch](#initialize-branch)

    - Update `branch_key` in your `Info.plist` to a dictionary ([example](https://github.com/BranchMetrics/ios-branch-deep-linking/blob/master/Branch-TestBed/Branch-TestBed/Branch-TestBed-Info.plist#L58-L63))

    - The `test key` of your app must match the `test key` of your deep link

    - Remove before releasing to production

    - *Swift 3*

        ```swift
        Branch.setUseTestBranchKey(true)
        ```

    - *Objective C*

        ```objc
        [Branch setUseTestBranchKey:YES];
        ```

- ### Re-enable universal linking

    - Apple allows users to disable universal linking on a per app per device level on iOS 9 and iOS 10 (fixed in iOS 11)

    - Use [Test deep link](#test-deep-link) to re-enable universal linking on the device

- ### Deep link routing with a Branch ViewController

    - Add before `initSession` [Initialize Branch](#initialize-branch)

    - Recommend to [Navigate to content](#navigate-to-content) instead

    - *Swift 3*

        ```swift
        Branch.getInstance().registerDeepLinkController(ViewController(), forKey: "my-key", withPresentation: .optionShow)
        ```

    - *Objective C*

        ```objc
        [[Branch getInstance] registerDeepLinkController:customViewController forKey:@"my-key"withPresentation:BNCViewControllerOptionShow];
        ```

- ### Determine if deep link is from Branch without network

    - Use for Universal Linking if you want to get the `true/false` response from `Branch.getInstance().continue(userActivity)` within `continueUserActivity` without a Branch network call
    - Use only if you have a custom link domain
    - Add `branch_universal_link_domains` to your `info.plist` with an array of your link domain from your [Branch Dashboard](https://dashboard.branch.io/settings/link)

        ![image](/img/pages/apps/ios-link-domains.png)

- ### Share to email options

    - Change the way your deep links behave when shared to email

    - Needs a [Share deep link](#share-deep-link)

    - *Swift 3*

        ```swift
        lp.addControlParam("$email_subject", withValue: "Therapists hate him.")
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

- ### Share message dynamically

    - Change the message you share based on the source the users chooses

    - Needs a [Share deep link](#share-deep-link)

    - *Swift 3*

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
