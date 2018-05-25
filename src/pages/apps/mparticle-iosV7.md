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

        ```swift 
        import UIKit
import mParticle_Apple_SDK
import mParticle_BranchMetrics
import Branch

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication,
            didFinishLaunchingWithOptions launchOptions:[UIApplicationLaunchOptionsKey: Any]?
        ) -> Bool {

        // Turn on all the debug output for testing:
        BNCLogSetDisplayLevel(.all)

        // Start mParticle
        let mParticle = MParticle.sharedInstance()
        mParticle.logLevel = .debug
        let options = MParticleOptions.init(
            key: "",
            secret: ""
        )
        let request = MPIdentityApiRequest.withEmptyUser()
        request.email = "foo@example.com"
        request.customerId = "cust_123456"
        options.identifyRequest = request
        options.environment = .production
        options.onAttributionComplete = {
        (attributionResult: MPAttributionResult?, error: Error?) -> Void in
            self.attribution(result: attributionResult, error: error)
        }
        mParticle.start(with: options)

        return true
    }

    func attribution(result: MPAttributionResult?, error: Error?) {
        if  let error = error {
            self.window?.rootViewController?.showAlert(
                title: "Attribution Error",
                message: error.localizedDescription
            )
            return
        }
        // Handle the Branch Data
        if  let result = result,
            let linkWasClicked = result.linkInfo[BRANCH_INIT_KEY_CLICKED_BRANCH_LINK] as? Bool,
            linkWasClicked,
            let name = result.linkInfo["name"] as! String?,
            let message = result.linkInfo["message"] as! String? {
            self.fortuneViewController?.showFortune(name: name, message: message)
        }
    }
}


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

- ### User Events
```swift
// MARK: - User Events

    @IBAction func enableTracking(toggle: UISwitch?) {
        if  let toggle = toggle,
            let cell = toggle.superview as! UITableViewCell?,
            let row = self.tableData.rowFor(tableView: self.tableView, cell: cell) {
            let val = toggle.isOn as Bool
            MParticle.sharedInstance().optOut = val
            row.integerValue = val ? 1 : 0
            self.tableData.update(tableView:self.tableView, row:row)
        }
    }

    @IBAction func setIdentity(row: AnyObject) {
        let request = MPIdentityApiRequest.withEmptyUser()
        request.email = "foo@example.com"
        request.customerId = "cust_123456"
        request.setUserIdentity("bar-id", identityType: MPUserIdentity.other)
        MParticle.sharedInstance().identity.login(request, completion: nil)
    }

    @IBAction func startSetIdentityAlias(row: AnyObject) {
        self.promptForAlias { (alias) in
            if let alias = alias, alias.count > 0 {
                self.finishSetIdentityAlias(alias: alias)
            }
        }
    }

    func promptForAlias(completion: ((String?) -> Void)?) {
        if self.keyboardEditor != nil { return }
        self.keyboardEditor = APKeyboardEditor.presentFromViewController(
            viewController: self,
            completion: { (resultText) in
                completion?(resultText)
                self.keyboardEditor = nil
            }
        )
    }

    func finishSetIdentityAlias(alias: String) {
        let request = MPIdentityApiRequest.withEmptyUser()
        request.setUserIdentity(alias, identityType: MPUserIdentity.other)
        request.onUserAlias = { (previousUser, newUser) -> Void in

            //copy anything that you want from the previous to the new user
            //this snippet would copy everything

            newUser.userAttributes = previousUser.userAttributes

            let products = previousUser.cart.products() ?? []
            if (products.count > 0) {
                newUser.cart.addAllProducts(products, shouldLogEvents: false)
            }
        }
        MParticle.sharedInstance().identity.login(request, completion: nil)
    }

    @IBAction func logUserOut(row: AnyObject) {
        MParticle.sharedInstance().identity.logout { (result, error) in
            NSLog("Log out") // EBS
        }
    }
```



- ### Screen Events
```swift
    // MARK: - Screen Events

    @IBAction func logScreenSimple(row: AnyObject) {
        MParticle.sharedInstance().logScreen("Awesome Screen Simple", eventInfo: [
            "modal":    "false",
            "color":    "green"
        ])
    }

    @IBAction func logScreenComplex(row: AnyObject) {
        if let event = MPEvent.init(name: "Awesome Screen Complex", type: .userContent) {
            event.info = [
                "modal": "false",
                "color": "green"
            ]
            MParticle.sharedInstance().logScreenEvent(event)
        }
    }
```


- ### Standard Events
```swift
    // MARK: - Standard Events

    func createEvent(name: String, type: MPEventType) -> MPEvent {
        let e = MPEvent.init(name: name, type: type) ?? MPEvent.init()
        e.category = "Toys & Games"
        e.addCustomFlag("CustomFlag", withKey:"CustomValue")
        if (e.info == nil) {
            e.info = ["InfoVal": "InfoKey"]
        } else {
            e.info?["InfoVal"] = "InfoKey"
        }
        return e
    }
```


- ### Commerce Events
```swift
    // MARK: - Commerce Events

    func createProduct(number: Int) -> MPProduct {
        /*
        @property (nonatomic, strong, nullable) NSString *brand;
        @property (nonatomic, strong, nullable) NSString *category;
        @property (nonatomic, strong, nullable) NSString *couponCode;
        @property (nonatomic, strong, nonnull) NSString *name;
        @property (nonatomic, strong, nullable) NSNumber *price;
        @property (nonatomic, strong, nonnull) NSString *sku;
        @property (nonatomic, strong, nullable) NSString *variant;
        @property (nonatomic, unsafe_unretained) NSUInteger position;
        @property (nonatomic, strong, nonnull) NSNumber *quantity;
        */

        let p = MPProduct.init()
        p.brand = "Brand-\(number)"
        p.category = "Category-\(number)"
        p.couponCode = "Coupon-\(number)"
        p.name = "Name-\(number)"
        p.price = NSNumber.init(value: number)
        p.sku = "Sku-\(number)"
        p.variant = "Variant-\(number)"
        p.position = UInt(number)
        p.quantity = NSNumber.init(value: number)
        return p
    }

    func products() -> [MPProduct] {
        var products: [MPProduct] = []
        for i in 1...2 {
            let p = self.createProduct(number: i)
            products.append(p)
        }
        return products
    }

    func createCommerceEvent(action: MPCommerceEventAction) -> MPCommerceEvent {
        /*
        Commerce event fields:

        @property (nonatomic, strong, nullable) NSString *checkoutOptions;
        @property (nonatomic, strong, nullable) NSString *currency;
        @property (nonatomic, strong, readonly, nullable) NSDictionary<NSString *, __kindof NSSet<MPProduct *> *> *impressions;
        @property (nonatomic, strong, readonly, nullable) NSArray<MPProduct *> *products;
        @property (nonatomic, strong, nullable) MPPromotionContainer *promotionContainer;
        @property (nonatomic, strong, nullable) NSString *productListName;
        @property (nonatomic, strong, nullable) NSString *productListSource;
        @property (nonatomic, strong, nullable) NSString *screenName;
        @property (nonatomic, strong, nullable) MPTransactionAttributes *transactionAttributes;
        @property (nonatomic, unsafe_unretained) MPCommerceEventAction action;
        @property (nonatomic, unsafe_unretained) NSInteger checkoutStep;
        @property (nonatomic, unsafe_unretained) BOOL nonInteractive; // Non-interactive refund.

        - (nonnull instancetype)initWithPromotionContainer:(nullable MPPromotionContainer *)promotionContainer;
        - (void)addImpression:(nonnull MPProduct *)product listName:(nonnull NSString *)listName;
        - (void)addProduct:(nonnull MPProduct *)product;
        - (void)setCustomAttributes:(nullable NSDictionary<NSString *, NSString *> *)customAttributes;
        */

        let e = MPCommerceEvent.init(action: action) ?? MPCommerceEvent.init()
        e.checkoutOptions = "Checkout Options"
        e.currency = "USD"
        e.productListName = "List-Name"
        e.productListSource = "List-Source"
        e.screenName = "Screen-Name"
        e.checkoutStep = 1
        e.nonInteractive = true

        // Add products --
        e.addProducts(self.products())

        // Add custom attibutes --
        e.setCustomAttributes(["CustomKey": "CustomValue"])

        // Add a transaction --
        /*
        @property (nonatomic, strong, nullable) NSString *affiliation;
        @property (nonatomic, strong, nullable) NSString *couponCode;
        @property (nonatomic, strong, nullable) NSNumber *shipping;
        @property (nonatomic, strong, nullable) NSNumber *tax;
        @property (nonatomic, strong, nullable) NSNumber *revenue;
        @property (nonatomic, strong, nullable) NSString *transactionId;
        */
        let t = MPTransactionAttributes()
        t.affiliation = "T-Affiliation-1"
        t.couponCode = "T-Coupon-1"
        t.shipping = 1.00
        t.tax = 2.00
        t.revenue = 3.00
        t.transactionId = "T-Transaction-Id"
        e.transactionAttributes = t

        return e
    }

    @IBAction func promotionViewEvent(row: AnyObject) {
        /*
        @property (nonatomic, strong, nullable) NSString *creative;
        @property (nonatomic, strong, nullable) NSString *name;
        @property (nonatomic, strong, nullable) NSString *position;
        @property (nonatomic, strong, nullable) NSString *promotionId;
        */
        let promotion = MPPromotion.init()
        promotion.promotionId = "my_promo_1"
        promotion.creative = "sale_banner_1"
        promotion.name = "App-wide 50% off sale"
        promotion.position = "dashboard_bottom"

        let container = MPPromotionContainer.init(action:.view, promotion: promotion)
        let event = MPCommerceEvent.init(promotionContainer: container)
        MParticle.sharedInstance().logCommerceEvent(event)
    }

    @IBAction func promotionClickEvent(row: AnyObject) {
        /*
        @property (nonatomic, strong, nullable) NSString *creative;
        @property (nonatomic, strong, nullable) NSString *name;
        @property (nonatomic, strong, nullable) NSString *position;
        @property (nonatomic, strong, nullable) NSString *promotionId;
        */
        let promotion = MPPromotion.init()
        promotion.promotionId = "my_promo_1"
        promotion.creative = "sale_banner_1"
        promotion.name = "App-wide 50% off sale"
        promotion.position = "dashboard_bottom"

        let container = MPPromotionContainer.init(action:.click, promotion: promotion)
        let event = MPCommerceEvent.init(promotionContainer: container)
        MParticle.sharedInstance().logCommerceEvent(event)
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


## Troubleshoot issues

- If you are running into an issue with no data being received from the attribution callback on warm starts it could be a breakdown in the continueUserActivity connection. Adding the following should resolve the issue.
```swift						
func application(_ application: UIApplication, continue userActivity:
  NSUserActivity, restorationHandler: @escaping ([Any]?) -> Void) -> Bool {
      MParticle.sharedInstance().continue(userActivity, restorationHandler: restorationHandler)						
return true
						
}
```

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

    - [Swift testbed](https://github.com/mparticle-integrations/mparticle-apple-integration-branchmetrics/tree/master/Examples/mParticle-Branch-Example)



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
