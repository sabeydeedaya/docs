title: iOS SDK Advanced Features

<div class="page-ul">
    <div class="page-li"><a href="/branch-ios-sdk/basic-integration/">Basic Integration</a></div>
    <div class="page-li">
      <div class="page-active">
        <a href="/branch-ios-sdk/advanced-features">Advanced Features</a>
      </div>
    </div>
    <div class="page-li"><a href="/branch-ios-sdk/testing">Testing</a></div>
    <div class="page-li"><a href="/branch-ios-sdk/troubleshooting">Troubleshooting</a></div>
    <div class="page-li"><a href="/branch-ios-sdk/version-history">Version History</a></div>
    <div class="page-li"><a href="/branch-ios-sdk/full-reference">Full Reference</a></div>
</div>

## Implement features

### Create content reference

- The `Branch Universal Object` encapsulates the thing you want to share

- Uses [Universal Object properties](/links/integrate/#universal-object)

- *Swift*

    ```swift
    let buo = BranchUniversalObject.init(canonicalIdentifier: "content/12345")
    buo.title = "My Content Title"
    buo.contentDescription = "My Content Description"
    buo.imageUrl = "https://lorempixel.com/400/400"
    buo.publiclyIndex = true
    buo.locallyIndex = true
    buo.contentMetadata.customMetadata["key1"] = "value1"
    ```

- *Objective-C*

    ```objc
    BranchUniversalObject *buo = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"content/12345"];
    buo.title = @"My Content Title";
    buo.contentDescription = @"My Content Description";
    buo.imageUrl = @"https://lorempixel.com/400/400";
    buo.publiclyIndex = YES;
    buo.locallyIndex = YES;
    buo.contentMetadata.customMetadata[@"key1"] = @"value1";
    ```

### Create link reference

- Generates the analytical properties for the deep link

- Used for [Create deep link](#create-deep-link) and [Share deep link](#share-deep-link)

- Uses [Configure link data](/links/integrate/#configure-deep-links) and custom data

- *Swift*

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

### Create deep link

- Generates a deep link within your app

- Needs a [Create content reference](#create-content-reference)

- Needs a [Create link reference](#create-link-reference)

- Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/links)

- *Swift*

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

### Share deep link

-  Will generate a Branch deep link and tag it with the channel the user selects

- Needs a [Create content reference](#create-content-reference)

- Needs a [Create link reference](#create-link-reference)

- Uses [Deep Link Properties](/links/integrate/)

 - *Swift*

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

### Read deep link

- Retrieve Branch data from a deep link

- Best practice to receive data from the `listener` (to prevent a race condition)

- Returns [deep link properties](/links/integrate/#read-deep-links)

- *Swift*

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

### Navigate to content

- Handled within `Branch.initSession()`

- *Swift*

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

### Display

- List content on `iOS Spotlight`

- Needs a [Create content reference](#create-content-reference)

- *Swift*

    ```swift
    buo.automaticallyListOnSpotlight = true
    ```

- *Objective-C*

    ```objc
    buo.automaticallyListOnSpotlight = YES;
    ```

### Track content

- Track how many times a piece of content is viewed

- Needs a [Create content reference](#create-content-reference)

- Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/content)

- *Swift*

    ```swift
    BranchEvent.standardEvent(.viewItem, withContentItem: buo).logEvent()
    ```

- *Objective-C*

    ```objc
    [[BranchEvent standardEvent:BranchStandardEventViewItem withContentItem:buo] logEvent];
    ```

### Track users

- Sets the identity of a user (email, ID, UUID, etc) for events, deep links, and referrals

- Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/identities)

- *Swift*

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

### Track events

- All events related to a customer purchasing are bucketed into a "Commerce" class of data items

- All events related to users interacting with your in-app content are bucketed to a "Content" class of data items.

- All events related to users progressing in your app are bucketed to a "Lifecycle" class of data items.

- To track custom events - not found in the table below - please see [Track Custom Events](/apps/v2event/#track-custom-events)

- Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/events)

{! ingredients/sdk/v2-events.md !}


### Handle referrals

- Referral points are obtained from referral rules on the [Branch Dashboard](https://dashboard.branch.io/referrals/rules)

- Validate on the [Branch Dashboard](https://dashboard.branch.io/referrals/analytics)

- Reward credits

    -  [Referral guide](/dashboard/analytics/#referrals)

- Redeem credits

    - *Swift*

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

    - *Swift*

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

    - *Swift*

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

### Handle push notifications

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

### Handle links in your own app

- Allows you to deep link into your own from your app itself

- *Swift*

    ```swift
    Branch.getInstance().handleDeepLink(withNewSession: URL(string: "https://example.app.link/u3fzDwyyjF"))
    ```

- *Objective C*

    ```objc
    [[Branch getInstance] handleDeepLinkWithNewSession:[NSURL URLWithString:@"https://example.app.link/u3fzDwyyjF"]];
    ```

!!! warning
    Handling a new deep link in your app will clear the current session data and a new referred "open" will be attributed.

### Track Apple Search Ads

- Allows Branch to track Apple Search Ads deep linking analytics

- Analytics from Apple's API have been slow which will make our analytics lower. Additionally, Apple's API does not send us all the data of an ad every time which will make ads tracked by us to show a generic campaign sometimes.

- Add before `initSession` [Initialize Branch](#initialize-branch)

    - *Swift*

        ```swift
        Branch.getInstance().delayInitToCheckForSearchAds()
        ```

    - *Objective C*

        ```objc
        [[Branch getInstance] delayInitToCheckForSearchAds];
        ```

- **Faking ASA calls** Create Apple Search Ads events with fake campaign parameters. However, this feature only shows data in Liveview for Branch "live" apps (not "test" apps). Remember to remove this before production release.

    - *Swift*

        ```swift
        Branch.getInstance().setAppleSearchAdsDebugMode()
        ```

    - *Objective C*

        ```objc
        [[Branch getInstance] setAppleSearchAdsDebugMode];
        ```

### Enable 100% matching

- Use the `SFSafariViewController` to increase the attribution matching success

- The 100% match is a bit of a misnomer, as it is only 100% match from when a user clicks from the Safari browser. According to our analysis, clicking through Safari happens about 50-75% of the time depending on the use case. For example, clicking from Facebook, Gmail or Chrome won’t trigger a 100% match here. However, it’s still beneficial to the matching accuracy, so we recommend employing it.

- When using a custom domain, add a `branch_app_domain` string key in your Info.plist with your custom domain
to enable 100% matching.

- By default, cookie-based matching is enabled on iOS 9 and 10 if the `SafariServices.framework`
is included in an app's dependencies, and the app uses an app.link subdomain or sets the `branch_app_domain`
in the Info.plist. It can be disabled with a call to the SDK.

- Add before `initSession` [Initialize Branch](#initialize-branch)

- *Swift*

    ```swift
    Branch.getInstance().disableCookieBasedMatching()
    ```

- *Objective C*

    ```objc
    [[Branch getInstance] disableCookieBasedMatching];
    ```

### Enable / Disable User Tracking

If you need to comply with a user's request to not be tracked for GDPR purposes, or otherwise determine that a user should not be tracked, utilize this field to prevent Branch from sending network requests. This setting can also be enabled across all users for a particular link, or across your Branch links.

- *Swift*

    ```swift
    Branch.setTrackingDisabled(true)
    ```

- *Objective C*

    ```objc
    [Branch setTrackingDisabled:YES];
    ```

You can choose to call this throughout the lifecycle of the app. Once called, network requests will not be sent from the SDKs. Link generation will continue to work, but will not contain identifying information about the user. In addition, deep linking will continue to work, but will not track analytics for the user.
