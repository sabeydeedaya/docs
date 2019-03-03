
!!! warning "iOS 11.2+ 에서 Universal Link의 액션이 일치하지 않은 이슈에 대한 설명"
    일반적으로 Universal Link 가 정상적으로 작동하려면 사용자가 앱을 설치한 이후 iOS에서 해당 앱의 AASA 파일을 다운로드합니다. 하지만 iOS 11.2+ 로 업데이트되면서 Branch 에서는 AASA 파일이 사용자의 디바이스에 확실하게 다운로드되지 않을 때가 있는 것을 발견했습니다. 그 결과로, iOS 11.2+ 에서 Universal Link 를 클릭할 때 항상 앱이 실행되는 것은 아닙니다. 그러므로 광고주께서는 Branch 링크 생성 때 forced uri redirect mode 를 설정하여 URI 스키마로 앱을 실행할 수 있습니다. 해당 이슈에 대한 상세내용은 Apple Bug report 를 참고하기 바랍니다.

- ### Branch 설정

    - [Configure your dashboard](/dashboard/integrate/) 내에서 기본 연동을 완료합니다.

    - `I have an iOS app` 을 체크합니다.

        ![image](/_assets/img/pages/dashboard/ios.png)

- ### Bundle Identifier 설정

    - 앱에 설정한 Bundle Identifier 와 [Branch Dashboard](https://dashboard.branch.io/settings/link) 에 설정한 것이 반드시 일치해야 합니다.

        ![image](/_assets/img/pages/apps/ios-bundle-id.png)

- ### Associated domain 설정

    - Branch Dashboard](https://dashboard.branch.io/settings/link) 로부터 받은 링크 도메인을 추가합니다.
    - `-alternate` 는 귀사의 웹 사이트 내에서 저희 [Web SDK](/web/integrate/)를 통해 Universal Link 연결하는데 반드시 필요합니다.
    - 만약 test key](#use-test-key) 를 사용하신다면 `test-` 도 필요합니다.
    - 만약 귀사에서 [custom link domain](/dashboard/integrate/#change-link-domain) 을 사용한다면 옛 링크 도메인, `-alternate` 링크 도메인, 새로운 링크 도메인 등을 포함시켜야 합니다.

        ![image](/_assets/img/pages/apps/ios-entitlements.png)

- ### Entitlements 설정

    - Entitlements 가 타겟에 포함되어 있는지 확인합니다.

        ![image](/_assets/img/pages/apps/ios-package.png)

- ### Info.plist 설정

    - [Branch Dashboard](https://dashboard.branch.io/account-settings/app) 값들을 추가합니다.

        - `branch_app_domain` 이라는 Key를 생성하고 live key domain 의 값을 추가합니다.
        - `branch_key` 라는 key 를 생성하고 앱의 Branch Key 를 값으로 추가합니다.
        - `URL Types` -> `Item 0` -> `URL Schemes` 에 귀사의 URI 스키마를 추가합니다.

        ![image](/_assets/img/pages/apps/ios-plist.png)

- ### App prefix 를 확인

    - [Apple Developer Account](https://developer.apple.com/account/ios/identifier/bundle) 에서 확인합니다.

        ![image](/_assets/img/pages/apps/ios-team-id.png)

- ### Branch 설치

    - 옵션 1: [CocoaPods](https://cocoapods.org/)

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

    - 옵션 2: [Carthage](https://github.com/Carthage/Carthage)

        ```sh
        github "BranchMetrics/ios-branch-deep-linking"
        ```

    - 옵션 3: 수동으로 [source code](https://github.com/BranchMetrics/ios-branch-deep-linking/releases) 를 설치하고 관련 dependencies 들을 추가합니다.

        - `Branch.framework` 을 `Embedded Binaries` 로 드래그합니다. (필요하면 `Copy items` 를 선택할 수 있음)
        - `AdSupport`, `SafariServices`, `MobileCoreServices`, `CoreSpotlight`, 와 `iAd` 를 `Linked Frameworks`에 추가합니다.

        ![image](/_assets/img/pages/apps/ios-frameworks.png)

- ### Branch SDK 초기화

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

- ### 딥링크 테스트

    - [Branch Dashboard](https://dashboard.branch.io/marketing)로부터 딥링크를 생성합니다.
    - 앱을 디바이스에서 삭제합니다.
    - 디바이스에서 앱을 컴파일하고 설치하여 테스트합니다.
    - 딥링크를 복사하여 `Apple Notes` 에 붙여넣습니다.
    - 딥링크를 길게 누릅니다. (3D Touch 아님)
    - `Open in "APP_NAME"` 을 클릭하여 앱을 실행합니다.([예시](/_assets/img/pages/apps/ios-notes.png))

    !!! tip "디퍼드 딥링크 테스트"
        디퍼드 딥링킹은 앱을 설치하지 않은 사용자의 딥링킹을 지원해주는 기능입니다. 사용자가 링크를 클릭하고 앱을 설치하는 동시에 링크에 대한 컨텍스트가 보존했다가 앱을 최초 실행할 때 클릭했던 Branch Link 의 데이터를 전달 받아서 딥링크에 사용하는 것을 가리킵니다. 이것을 테스트하려면 디바이스에서 앱을 제거한 다음 Branch Link 를 클릭하고 XCode 에서 수동으로 앱을 설치하고 실행합니다. 정확하게 구현했다면 앱 내의 해당 컨텐츠로 정확하게 라우팅 될 것입니다.


## 기능 구현

- ### Content reference 생성

    - `Branch Universal Object` 는 공유하고자는 컨텐츠를 포장할 수 있습니다.

    - [Universal Object properties](/links/integrate/#universal-object) 를 사용합니다.

    - *Swift 3*

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

- ### Link reference 생성

    - 딥링크의 속성들을 생성합니다.

    - [딥링크 생성](#create-deep-link)과 [딥링크 공유](#share-deep-link)에 사용됩니다.

    - [링크 데이터 설정](/links/integrate/#configure-deep-links)과 커스텀 데이터에 사용됩니다.

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

- ### 딥링크 생성

    - 앱 내에서 딥링크를 생성합니다.

    - Branch Universal Object 가 필요합니다.

    - Branch LInk Properties(Link Reference) 가 필요합니다.

    - [Branch Dashboard](https://dashboard.branch.io/liveview/links) 와 인증이 필요합니다.

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


- ### 딥링크 공유

    - Branch Link 를 생성하고 사용자가 선택한 채널로 태킹합니다.

    - Branch Universal Object 가 필요합니다.

    - Branch Link Properties(Link Reference) 가 필요합니다.

    - [Deep Link Properties](/links/integrate/)를 사용해야 합니다.

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

- ### 딥링크 읽어오기

    - 딥링크로부터 Branch 데이터를 가져옵니다.

    - `listener` 로부터 데이터를 전달 받을 때의 Best Practice 는 Race Condition 을 피하는 것입니다.

    - [deep link properties](/links/integrate/#read-deep-links)(딥링크 속성) 을 반환합니다.

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

- ### 컨텐츠로 이동

    - `Branch.initSession()` 내에서 핸들링 됩니다.

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

    - 컨텐츠를 `iOS Spotlight` 에 리스팅합니다.

    - Branch Universal Object 가 필요합니다.

    - *Swift 3*

        ```swift
        buo.automaticallyListOnSpotlight = true
        ```

    - *Objective-C*

        ```objc
        buo.automaticallyListOnSpotlight = YES;
        ```

- ### 컨텐츠 트래킹

    - 어떤 컨텐츠가 몇번 보여졌는지를 트래킹합니다.

    - Branch Universal Object 가 필요합니다.

    - [Branch Dashboard](https://dashboard.branch.io/liveview/content) 와 인증합니다.

    - *Swift 3*

        ```swift
        BranchEvent.standardEvent(.viewItem, withContentItem: buo).logEvent()
        ```

    - *Objective-C*

        ```objc
        [[BranchEvent standardEvent:BranchStandardEventViewItem withContentItem:buo] logEvent];
        ```

- ### 사용자 트래킹(사용자 아이디 설정)

    - 이벤트, 딥링크, 추천(Referrals)를 위해 사용자의 식별자를 설정합니다. (Email, ID, UUID 등)

    - [Branch Dashboard](https://dashboard.branch.io/liveview/identities) 와 검증합니다.

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


- ### 이벤트 트래킹

    - 커스텀 이벤트 하나를 등록합니다.

    - `open`, `install`, `referred session` 은 Branch 에서 사용하고 있는 이벤트명이므로 사용하실 수 없습니다.

    - 가능하면 이벤트를 트래킹하기 전에 해당 사용자의 식별자를 설정하는 것이 좋습니다.

    - [Branch Dashboard](https://dashboard.branch.io/liveview/events) 와 검증합니다.


    {! ingredients/sdk/v2-events.md !}


- ### 추천(Referrals) 를 핸들링

    - Referral points(추천 포인트) 는  [Branch Dashboard](https://dashboard.branch.io/referrals/rules) 에 설정한 Referral rules에 의해 얻을 수 있습니다.

    - [Branch Dashboard](https://dashboard.branch.io/referrals/analytics) 에서 검증합니다.

    - Reward credits

        -  [Referral guide](/dashboard/analytics/#referrals)

    - Credits 보상

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

    - Credits 로딩

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

    - 히스토리(과거이력) 로딩

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

- ### Push Notification(푸시 알림) 핸들링

    - Push Notification에서 Branch Link 를 트래킹할 수 있게 합니다.

    - Branch Push Notification handler 를 Branch SDK 초기화 단계에 포함시킵니다.

    - Branch deep link 를 귀사에서 발송한 Push Notification 의 Payload 에 추가합니다.

        ```json hl_lines="6"
        {
          "aps": {
            "alert": "Push notification with a Branch deep link",
            "badge": "1"
          },
          "branch": "https://example.app.link/u3fzDwyyjF"
        }
        ```

        - `https://example.app.link/u3fzDwyyjF` 를 귀사에서 캠페인 진행중인 Branch Link 로 치환하시면 됩니다.

    - Branch SDK 초기화 때 initSession 으로부터 딥링크 데이터를 읽어옵니다.

- ### 앱 내 다른 컨텐츠으로 딥링크

    - 앱 내에서 자기 자신에게 딥링크 할 수 있습니다.  (나 자신->나 자신)

    - *Swift 3*

        ```swift
        Branch.getInstance().handleDeepLink(withNewSession: URL(string: "https://example.app.link/u3fzDwyyjF"))
        ```

    - *Objective C*

        ```objc
        [[Branch getInstance] handleDeepLinkWithNewSession:[NSURL URLWithString:@"https://example.app.link/u3fzDwyyjF"]];
        ```

!!! warning
    앱 내에서 새로운 딥링킹을 핸들링 했을 때 앱은 현재 세션 데이터를 모두 지울 것이고 새로운 Referred open으로 귀속될 것입니다.


- ### Apple Search Ads 트래킹

    - Branch 가 Apple Search Ads 딥링킹 분석을 트래킹할 수 있게 합니다.

    - Apple 의 API 로부터 진행되는 분석은 늦게 저희의 분석속도에 영향을 미칩니다. 추가로 Apple 의 API는 매번마다 광고의 모든 데이터를 전송해주지 않으므로 저희가 트래킹한 광고가 포괄적인 캠페인 정보만 보여줄 때도 있습니다.

    - 다음 코드를 Branch SDK 초기화 때 `initSession` 의 앞에 추가합니다.

        - *Swift 3*

            ```swift
            Branch.getInstance().delayInitToCheckForSearchAds()
            ```

        - *Objective C*

            ```objc
            [[Branch getInstance] delayInitToCheckForSearchAds];
            ```

    - 가상의 캠페인 파라미터로 테스트합니다. (제품에서는 테스트하지 말 것)

        - *Swift 3*

            ```swift
            Branch.getInstance().setAppleSearchAdsDebugMode()
            ```

        - *Objective C*

            ```objc
            [[Branch getInstance] setAppleSearchAdsDebugMode];
            ```

- ### 100% 매칭 활성화

    - `SFSafariViewController` 를 사용하여 attribution 매칭 성공율을 향상시킬 수 있습니다.

    - 사실 100% 매칭은 부적절한 명칭입니다. 오직 사용자가 Sarari 브라우저에서 클릭했을 때 100%입니다. 저희가 분석한 바에 따르면 각 활용사례를 통털어 50~75%의 클릭이 Safari에서 발생합니다. 예를 들면 Facebook, Gmail, Chrome에서 클릭하면 100%의 매칭을 일으킬 수 없습니다. 하지만 이는 여전히 매칭 정확도 향상에 유익하므로 이것을 사용할 것을 추천합니다.

    - 커스텀 도메인을 사용할 때 Info.plist에 `branch_app_domain` 이라는 문자열의 Key 를 추가하고 커스텀 도메인을 값으로 하여 100% 매칭을 활성화시킬 수 있습니다.

    - 만약에 `SafariServices.framework`가 앱의 Dependencies 에 포함되어 있다면 iOS 9, iOS 10에서 쿠키 기반의 매칭이 기본적으로 활성화 되어 있습니다. 그리고 앱은 app.link 서브 도메인을 사용하거나 Info.plist에 `branch_app_domain` 을 설정합니다. 이것은 SDK의 메서드 호출을 통해 비활성화 할 수 있습니다.

    - Branch SDK 초기화 단계에서 initSession 이전에 추가합니다.

    - *Swift 3*

        ```swift
        Branch.getInstance().disableCookieBasedMatching()
        ```

    - *Objective C*

        ```objc
        [[Branch getInstance] disableCookieBasedMatching];
        ```

- ### 사용자 트래킹 활성화/비활성화

    - 만약 귀사에서 GDPR 준수목적에 의해 사용자가 트래킹 금지요청을 처리하거나 기타 규정 또는 목적에 의해 사용자를 트래킹하려면 본 필드를 이용하여 Branch 가 네트워크 요청을더 이상 보내는 않도록 설정할 수 있습니다. 본 세팅은 특정 링크를 위한 모든 사용자 또는 귀사의 모든 Branch Links 에 활성화할 수 있습니다.

    - *Swift*

        ```swift
        Branch.setTrackingDisabled(true)
        ```

    - *Objective C*

        ```objc
        [Branch setTrackingDisabled:YES];
        ```

    - 귀사는 또한 앱의 라이프 사이클 곳곳에서 본 메서드를 호출하는 것을 선택할 수 있습니다. 본 메서드를 호출하는 동시에 Branch SDK 로부터 발송되는 네트워크 요청은 없을 것입니다. Link 생성은 여전히 작동할 것이지만 사용자 식별자 정보가 포함되지 않을 것입니다. 추가로, 딥링킹은 계속 작동할 것이지만 사용자 분석을 위한 트래킹이 이루어지지 않을 것입니다.

## Troubleshoot issues

- ### Branch 연동 테스트

    - AppDelegate 에서 `validateSDKIntegration`을 호출하여 Branch 연동을 테스트할 수 있습니다. XCode 로그를 체크하면서 모든 SDK 연동 테스트가 통과할 것을 보장합니다. 앱을 실제 제품으로 출시할 때 `validateSDKIntegration` 을 반드시 제거하거나 주석처리해야 합니다.

    - *Swift*

        ```swift
        Branch.getInstance().validateSDKIntegration()
        ```

    - *Objective C*

        ```objc
        [[Branch getInstance] validateSDKIntegration];
        ```

- ### AASA 파일이 성공적으로 다운로드 되었는지 검증

    - MAC에서 테스트 디바이스를 연결합니다.
		- 앱을 제거합니다.
		- MAC Console에서 디바이스의 Console output을 확인합니다.
		- 앱을 설치하고 실행합니다.
		- “Swcd” 로 Console output 을 필터링합니다.
		- 만약 AASA 파일이 성공적으로 다운로드되었다면 아래 스크린샷과 같은 화면을 볼 수 있습니다. (만약 AASA파일이 다운로드되지 않았다면 앱을 제거하고 디바이스를 다시 시작하고 앱을 재설치해야 합니다. )

    ![image](https://cdn.branch.io/branch-assets/1520880422940-og_image.png)

- ### 앱을 App Store에 제출

    - 앱을 제출할 때 app uses IDFA or GAID 를 선택해야 합니다. (더 나은 딥링크 매칭을 위함)

- ### 앱이 실행되지 않음

    - 본 연동 가이드를 참고하여 연동작업을 다시 한번 확인합니다.

    - 디바이스가 Universal Link를 비활성화하지는 않았는지 조사합니다. ([Re-enable universal linking](#re-enable-universal-linking))

    - 링크 관련 이슈가 아닌지 확인합니다. ([Deep links do not open app](/links/integrate/#deep-links-do-not-open-app))

    - [Universal links validator](https://branch.io/resources/universal-links/) 를 사용합니다.

    - [AASA validator](https://branch.io/resources/aasa-validator/) 를 사용합니다.

    - [Test deep link](#test-deep-link) 를 사용합니다.

- ### 앱이 데이터를 전송하지 않음

    - 앱이 실행되지 않은 이슈와 관련된 것은 아닌지 확인합니다.

    - Branch Console Logs 를 조사합니다. ([Enable logging](#enable-logging))

- ### Install 시뮬레이션

    - 앱 삭제

    - iPhone Device -> Settings -> Privacy -> Advertising -> Reset Advertising Identifier -> Reset Identifier

    - Branch SDK 초기화 단계의 `initSession()``이 호출되기전에 `Branch.setDebug(true)`를 추가합니다.

    - 딥링크를 클릭하여 `$fallback_url` 로 이동합니다. (앱이 설치되지 않았기 때문임)

    - 앱 설치

    - 앱 실행

    - `initSession`으로부터 `params`를 읽고 `+is_first_session=true`를 확인합니다.

- ### 딥링크가 길다

    - 앱이 Branch 서버와 연결할 수 없을 때 발생합니다.

		- 긴 링크는 여전히 앱을 실행하고 데이터를 전송합니다.

- ### 샘플 앱

    - [Swift testbed](https://github.com/BranchMetrics/ios-branch-deep-linking/tree/master/Branch-TestBed-Swift)

    - [Objective C testbed](https://github.com/BranchMetrics/ios-branch-deep-linking/tree/master/Branch-TestBed)

- ### Track content properties

    - 컨텐츠 트래킹에 사용됩니다.

        | Key | Value
        | --- | ---
        | BNCRegisterViewEvent | 사용자가 오브젝트를 봤음
        | BNCAddToWishlistEvent | 사용자가 오브젝트를 Wishlist 에 추가함
        | BNCAddToCartEvent | 사용자가 오브젝트를 장바구니에 추가함
        | BNCPurchaseInitiatedEvent | 사용자가 체크아웃을 시작함
        | BNCPurchasedEvent | 사용자가 해당 아이템을 구매함
        | BNCShareInitiatedEvent | 사용자가 해당 오브젝트 공유 시작함
        | BNCShareCompletedEvent | 사용자가 공유를 완료했음

- ### 로깅 활성화

    - Branch `live key` 대신에 Branch `test key` 를 사용합니다.

    - `initSession` [Initialize Branch](#initialize-branch) 이전에 추가합니다.

    - 프로덕트 릴리즈 이전에 제거해야 합니다.

    - *Swift 3*

        ```swift
        Branch.getInstance().setDebug()
        ```

    - *Objective C*

        ```objc
        [[Branch getInstance] setDebug];
        ```

    - `OS_ACTIVITY_MODE` 가 비활성화 되도록 해야 합니다.([링크](https://stackoverflow.com/a/39503602/2690774))

- ### Test Key 사용

    - Branch `live key` 대신에 Branch `test key` 를 사용합니다.

    - `initSession` [Initialize Branch](#initialize-branch) 이전에 다음 코드를 추가합니다.

    - `Info.plist` 에서 `branch_key` 를 dictionary 로 업데이트 합니다. (예시)(https://github.com/BranchMetrics/ios-branch-deep-linking/blob/master/Branch-TestBed/Branch-TestBed/Branch-TestBed-Info.plist#L58-L63))

    - 앱의 `Test Key` 는 반드시 Branch Deep Link 의 `Test Key` 와 매칭되어야 합니다.

    - 프로덕트 릴리즈 이전에 제거해야 합니다.

    - *Swift 3*

        ```swift
        Branch.setUseTestBranchKey(true)
        ```

    - *Objective C*

        ```objc
        [Branch setUseTestBranchKey:YES];
        ```

- ### Universal Linking 재활성화

    - iOS 9 과 iOS 10 에서 Apple 은 사용자들이 앱별, 디바이스별로 Universal Linking 을 비활성화할 수 있게 합니다. (iOS 11 에 고정됨)

    - [Test deep link](#test-deep-link) 를 사용하여 해당 디바이스에서 Universal Linking 을 다시 활성화 할 수 있습니다.

- ### Branch ViewController 로 딥링크 라우팅하기

    - 아래 코드를 initSession [Initialize Branch](#initialize-branch) 이전에 추가합니다.

    - [Navigate to content](#navigate-to-content) 로 이 부분을 대체할 것을 추천합니다.

    - *Swift 3*

        ```swift
        Branch.getInstance().registerDeepLinkController(ViewController(), forKey: "my-key", withPresentation: .optionShow)
        ```

    - *Objective C*

        ```objc
        [[Branch getInstance] registerDeepLinkController:customViewController forKey:@"my-key"withPresentation:BNCViewControllerOptionShow];
        ```

- ### Branch Link 의 딥링크 라우팅 테스트

    - 테스트하고자는 임의의 Branch Link 뒤에 ``?bnc_validate=true` 를 추가하고 모바일 디바이스(시뮬레이터가 아님)에서 해당 링크를 클릭하여 테스트를 시작합니다. 예를 들면 다음과 같습니다.
		- 테스트하고자는 링크: `"https://<yourapp\>.app.link/NdJ6nFzRbK"` 테스트 때 클릭할 링크:` "https://<yourapp\>.app.link/NdJ6nFzRbK?bnc_validate=true"`


- ### 네트워크 통신을 하지 않고 딥링크가 Branch 에 의한 것인지 판단

    - Universal Linking 에 사용되고 Branch Network Call 을 통하지 않고 `continueUserActivity` 메서드 내에서 `Branch.getInstance().continue(userActivity)` 를 호출하여 `true/false` 값을 얻음으로써 Universal Linking 이 Branch 에 의한 것이 맞는지 판단할 수 있습니다.
    - 오직 귀사에서 커스텀 링크 도메인을 가지고 있을 때만 사용합니다.
    - `Info.plist` 에 `branch_universal_link_domains` 를 추가하고 [Branch Dashboard](https://dashboard.branch.io/settings/link) 에 등록된 링크 도메인을 배열로 추가합니다.

        ![image](/_assets/img/pages/apps/ios-link-domains.png)

- ### 이메일로 공유하는 옵션

    - 이메일로 공유할 때 딥링크 행위를 변경합니다.

    - [Share deep link](#share-deep-link) 가 필요합니다.

    - *Swift 3*

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

- ### 메시지를 동적으로 공유하기

    - 사용자가 선택한 소스에 기반하여 공유한 메시지를 변경합니다.

    - [Share deep link](#share-deep-link) 가 필요합니다.

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
