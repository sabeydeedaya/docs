## Integrate Branch

This documentation explains how to send **mParticle events to your Branch dashboard**. If you'd like to send Branch installs to your mParticle dashboard, please review the [Branch/mParticle Data Integration](/pages/integrations/mparticle). 

!!! warning "Inconsistent Universal links behavior on iOS 11.2"
    After updating a device to iOS 11.2, we found that the app's AASA file is no longer downloaded reliably onto your user’s device after an app install. As a result, clicking on Universal links will no longer open the app consistenly. You can set [forced uri redirect mode](/pages/links/integrate/#forced-redirections) on your Branch links to open the app with URI schemes. View details of the issue on the [Apple Bug report](http://www.openradar.me/radar?id=4999496467480576).


!!! warning "These instructions apply to any integration below mParticle SDK version 7"
    mParticle introduced a new attribution & deep linking API in v7 of their SDK (http://docs.mparticle.com/developers/sdk/ios/getting-started/#upgrade-to-version-7-of-the-sdk), so please contact your Branch or mParticle Account Managers for more details, if you have mParticle SDK v7+ installed in your app.

- ### Configure Branch

    - Complete your [Branch Dashboard](https://dashboard.branch.io/settings/link)

        ![image](/img/pages/dashboard/ios.png)
        ![image](/img/pages/dashboard/link-domain.png)


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

- ### Install Branch Kit

    - Option 1: [CocoaPods](https://cocoapods.org/)

        ```sh hl_lines="7"
        platform :ios, '8.0'

        target 'APP_NAME' do
          # if swift
          use_frameworks!

          pod 'mParticle-BranchMetrics'
        end
        ```

    - Option 2: [Carthage](https://github.com/Carthage/Carthage)

        ```sh
        github "mparticle-integrations/mparticle-apple-integration-branchmetrics"
        ```

- ### Enable Branch on mParticle

    - Retrieve your Branch Key on the [Link Settings](https://dashboard.branch.io/settings/link) page of the Branch dashboard.
    - From your [mParticle dashboard](https://app.mparticle.com/) navigate to the Services page. (The paper airplane icon on the left side)
    - Scroll down to the Branch tile, or enter Branch in the search bar.
    - Click on the Branch tile and then select "Activate a Platform".
    - Click on the Apple icon, then toggle the status ON.
    - Enter your Branch key in the marked field and click "Save".

- ### Handle Incoming Links

    - *Swift 3*

        ```swift hl_lines="12 17 18 19 20 21 22 23 24 25 26 27 30 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60"
        import UIKit

        @UIApplicationMain
        class AppDelegate: UIResponder, UIApplicationDelegate {

        var window: UIWindow?

        func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

          // This observer must be added before initializing the mParticle session.
          // Failure to do so will cause some deep links to be missed.
          NotificationCenter.default.addObserver(self, selector: #selector(handleKitDidBecomeActive(_:)), name: Notification.Name.mParticleKitDidBecomeActive, object: nil)

          return true
        }

        func handleKitDidBecomeActive(_ notification: Notification) {
            guard let kitNumber = notification.userInfo?[mParticleKitInstanceKey] as? NSNumber else { return }
            guard let kitInstance = MPKitInstance(rawValue: kitNumber.uintValue) else { return }

            switch kitInstance {
                case .branchMetrics:
                    checkForDeeplink()
                default:
                    break
            }
        }

        func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([Any]?) -> Void) -> Bool {
            MParticle.sharedInstance().continue(userActivity, restorationHandler: restorationHandler)
            checkForDeeplink()
            return true
        }

        func checkForDeeplink() {
            MParticle.sharedInstance().checkForDeferredDeepLink { linkInfo, error in
                // A few typical scenarios where this block would be invoked:
                //
                // (1) Base case:
                //     - User does not tap on a link, and then opens the app (either after a fresh install or not)
                //     - This block will be invoked with Branch Metrics' response indicating that this user did not tap on a link
                //
                // (2) Deferred deep link:
                //     - User without the app installed taps on a link
                //     - User is redirected from Branch Metrics to the App Store and installs the app
                //     - User opens the app
                //     - This block will be invoked with Branch Metrics' response containing the details of the link
                //
                // (3) Deep link with app installed:
                //     - User with the app already installed taps on a link
                //     - Application opens via openUrl/continueUserActivity, mParticle forwards launch options etc to Branch
                //     - This block will be invoked with Branch Metrics' response containing the details of the link
                //
                // If the user navigates away from the app without killing it, this block could be invoked several times:
                // once for the initial launch, and then again each time the user taps on a link to re-open the app.

                guard let linkInfo = linkInfo else { return }

                print("params:" + linkInfo)
            }
        }
        ```

    - *Objective-C*

        ```objc hl_lines="14 15 16 17 18 23 24 25 26 27 28 29 30 31 34 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68"
        #import "AppDelegate.h"
        #import "Branch/Branch.h"

        @interface AppDelegate ()

        @end

        @implementation AppDelegate

        - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

          // This observer must be added before initializing the mParticle session.
          // Failure to do so will cause some deep links to be missed.
          NSNotificationCenter *notificationCenter = [NSNotificationCenter defaultCenter];
          [notificationCenter addObserver:self
                                 selector:@selector(handleKitDidBecomeActive:)
                                     name:mParticleKitDidBecomeActiveNotification
                                   object:nil];

          return YES;
        }

        - (void)handleKitDidBecomeActive:(NSNotification *)notification {
          NSDictionary *userInfo = [notification userInfo];
          NSNumber *kitNumber = userInfo[mParticleKitInstanceKey];
          MPKitInstance kitInstance = (MPKitInstance)[kitNumber integerValue];

          if (kitInstance == MPKitInstanceBranchMetrics) {
            [self checkForDeeplink];
          }
        }

        - (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler {
            [[MParticle sharedInstance] continueUserActivity:userActivity restorationHandler:^(NSArray * _Nullable restorableObjects) {
                [self checkForDeeplink];
                }];
            return YES;
        }

        - (void)checkForDeeplink {
          MParticle * mParticle = [MParticle sharedInstance];

          [mParticle checkForDeferredDeepLinkWithCompletionHandler:^(NSDictionary<NSString *,NSString *> * _Nullable params, NSError * _Nullable error) {
            //
            // A few typical scenarios where this block would be invoked:
            //
            // (1) Base case:
            //     - User does not tap on a link, and then opens the app (either after a fresh install or not)
            //     - This block will be invoked with Branch Metrics' response indicating that this user did not tap on a link
            //
            // (2) Deferred deep link:
            //     - User without the app installed taps on a link
            //     - User is redirected from Branch Metrics to the App Store and installs the app
            //     - User opens the app
            //     - This block will be invoked with Branch Metrics' response containing the details of the link
            //
            // (3) Deep link with app installed:
            //     - User with the app already installed taps on a link
            //     - Application opens via openUrl/continueUserActivity, mParticle forwards launch options etc to Branch
            //     - This block will be invoked with Branch Metrics' response containing the details of the link
            //
            // If the user navigates away from the app without killing it, this block could be invoked several times:
            // once for the initial launch, and then again each time the user taps on a link to re-open the app.

            if (params) {
              //Insert custom logic to inspect the params and route the user/customize the experience.
              NSLog(@"params: %@", params.description);
            }
          }];
        }

        @end
        ```

- ### Initialize Branch

    As with any kit, mParticle will automatically handle initializing Branch sessions. At this point you should start seeing your Branch session data - including installs, re-opens, and any custom events - in your Branch dashboard.

- ### Test deep link

    - Create a deep link from the [Branch Dashboard](https://dashboard.branch.io/marketing)
    - Delete your app from the device
    - Compile and test on a device
    - Paste deep link in `Apple Notes`
    - Long press on the deep link (not 3D Touch)
    - Click `Open in "APP_NAME"` to open your app ([example](/img/pages/apps/ios-notes.png))

## Implement features

- ### Create content reference

    - The `Branch Universal Object` encapsulates the thing you want to share

    - Uses [Universal Object properties](/pages/links/integrate/#universal-object)

    - *Swift 3*

        ```swift
        // only canonicalIdentifier is required
        let buo = BranchUniversalObject(canonicalIdentifier: "content/123")
        buo.canonicalUrl = "https://example.com/content/123"
        buo.title = "Content 123 Title"
        buo.contentDescription = "Content 123 Description \(Date())"
        buo.imageUrl = "http://lorempixel.com/400/400/"
        buo.price = 12.12
        buo.currency = "USD"
        buo.contentIndexMode = .public
        buo.automaticallyListOnSpotlight = true
        buo.addMetadataKey("custom", value: "123")
        buo.addMetadataKey("anything", value: "everything")
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
        func checkForDeeplink() {
            MParticle.sharedInstance().checkForDeferredDeepLink { linkInfo, error in
                guard let linkInfo = linkInfo else { return }
                print(linkInfo as? [String: AnyObject] ?? {})
            }
        }

        // Latest
        let sessionParams = Branch.getInstance().getLatestReferringParams()

        // First
        let installParams = Branch.getInstance().getFirstReferringParams()
        ```

    - *Objective C*

        ```objc
        - (void)checkForDeeplink {
            MParticle * mParticle = [MParticle sharedInstance];

            [mParticle checkForDeferredDeepLinkWithCompletionHandler:^(NSDictionary<NSString *,NSString *> * _Nullable params, NSError * _Nullable error) {
                if (params) {
                    NSLog(@"Referring Link Params: %@", params.description);
                }
            }];
        }

        // latest
        NSDictionary *sessionParams = [[Branch getInstance] getLatestReferringParams];

        // first
        NSDictionary *installParams =  [[Branch getInstance] getFirstReferringParams];

        ```

- ### Navigate to content

    - Handled within `checkForDeferredDeepLinkWithCompletionHandler`

    - *Swift 3*

        ```swift
        func checkForDeeplink() {
            MParticle.sharedInstance().checkForDeferredDeepLink { linkInfo, error in
                // Option 1: Read deep link data
                guard let data = linkInfo as? [String: AnyObject] else { return }

                // Option 2: Save deep link data to global model
                SomeCustomClass.sharedInstance.branchData = data

                // Option 3: Display data
                let alert = UIAlertController(title: "Deep link data", message: "\(data)", preferredStyle: .alert)
                alert.addAction(UIAlertAction(title: "Okay", style: .default, handler: nil))
                self.window?.rootViewController?.present(alert, animated: true, completion: nil)

                // Option 4: Navigate to view controller
                guard let options = data["nav_to"] as? String else { return }
                switch options {
                    case "landing_page": self.window?.rootViewController?.present( SecondViewController(), animated: true, completion: nil)
                    case "tutorial": self.window?.rootViewController?.present( SecondViewController(), animated: true, completion: nil)
                    case "content": self.window?.rootViewController?.present( SecondViewController(), animated: true, completion: nil)
                    default: break
                }
            }
        }
        ```

    - *Objective-C*

        ```objc
        - (void)checkForDeeplink {
            MParticle * mParticle = [MParticle sharedInstance];

            [mParticle checkForDeferredDeepLinkWithCompletionHandler:^(NSDictionary<NSString *,NSString *> * _Nullable params, NSError * _Nullable error) {
                // Option 1: Read deep link data
                NSLog(@"%@", params);

                // Option 2: Save deep link data to global model
                NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
                [defaults setObject:params.description forKey:@"BranchData"];
                [defaults synchronize];

                // Option 3: Display data
                UIAlertController * alert = [UIAlertController alertControllerWithTitle:@"Title" message:params.description preferredStyle:UIAlertControllerStyleAlert];
                UIAlertAction *button = [UIAlertAction actionWithTitle:@"Deep Link Data" style:UIAlertActionStyleDefault handler:nil];
                [alert addAction:button];
                [self.window.rootViewController presentViewController:alert animated:YES completion:nil];

                // Option 4: Navigate to view controller
                if ([params objectForKey:@"navHere"]) {
                    ViewController *anotherViewController = [[ViewController alloc] initWithNibName:@"anotherViewController" bundle:nil];
                    [self.window.rootViewController presentViewController:anotherViewController animated:YES completion:nil];
                }
            }}];
        }
        ```

- ### Display content

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

    - MParticle propagates the MPUserIdentityCustomerId ID to Branch

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/identities)

    - *Swift 3*

        ```swift
        // login
        MParticle.sharedInstance().setUserIdentity("your_user_id", identityType: MPUserIdentityCustomerId)

        // logout
        MParticle.sharedInstance().logout()
        ```

    - *Objective-C*

        ```objc
        // Login
        [[MParticle sharedInstance] setUserIdentity:@"your_user_id" identityType:MPUserIdentityCustomerId];

        // logout
        [[MParticle sharedInstance] logout];
        ```

- ### Track events

    - Registers a custom event

    - Events named `open`, `close`, `install`, and `referred session` are Branch restricted

    - Best to [Track users](#track-users) before [Track events](#track-events) to associate a custom event to a user

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/events)

    - *Swift 3*

        ```swift
        var event = MPEvent().initWithName("Food Order" type:MPEventTypeTransaction)

        event.info = [
            "spice":"hot",
            "menu":"weekdays"]

        MParticle.sharedInstance().logEvent(event)
        ```

    - *Objective-C*

        ```objc
        MPEvent *event = [[MPEvent alloc] initWithName:@"Food Order"
                                              type:MPEventTypeTransaction];

        event.info = @{@"spice":@"hot",
                   @"menu":@"weekdays"}; // optional

        [[MParticle sharedInstance] logEvent:event];
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

## Troubleshoot issues

- ### Submitting to the App Store

    - Need to select `app uses IDFA or GAID` when publishing your app (for better deep link matching)

- ### App not opening

    - Double check [Integrate Branch](#integrate-branch)

    - Investigate if the device disabled universal links ([Re-enable universal linking](##re-enable-universal-linking))

    - Investigate if it is a link related issue ([Deep links do not open app](/pages/links/integrate/#deep-links-do-not-open-app))

    - Use [Universal links validator](https://branch.io/resources/universal-links/)

    - Use [AASA validator](https://branch.io/resources/aasa-validator/)

    - Use [Test deep link](#test-deep-link)

- ### App not passing data

    - See if issue is related to [App not opening](#app-not-opening)

    - Investigate Branch console logs ([Enable logging](#enable-logging))

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

- ### Re-enable universal linking

    - Apple allows users to disable universal linking on a per app per device level on iOS 9 and iOS 10 (fixed in iOS 11)

    - Use [Test deep link](#test-deep-link) to re-enable universal linking on the device

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
