## 개요

Branch Link가 클릭될 때 사용자의 디바이스에 설치한 앱이 실행되거나 App Store/Google Play로 랜딩됩니다. 딥링크는 사용자가 앱을 실행할 때 바로 특정 컨텐츠로 라우팅하는 방법으로 이런 프로세스를 향상시킵니다. Branch Link 를 사용하면 사용자가 앱을 다운로드하고 실행할 때도 특정 컨텐츠로 라우팅시킬 수 있습니다. 이것을 디퍼드 딥링크(Deferred Deep Link라고 함)

딥링크는 사용자에게 양질의 경험을 제공하는데 가장 중요한 부분입니다. 딥링크를 사용하면 사용자가 클릭한 내용으로 정확히 라우팅할 수 있거나 커스터마이징된 온보딩 경험을 제공할 수도 있습니다.

## 옵션1: 라우팅 콜백 내에서 커스텀 라우팅을 빌드

### 앱 실행 때 즉시 라우팅

Branch SDK 의 initSession() 에 등록한 딥링크 핸들러 콜백 내에서 params dictionary의 값을 확인하여 사용자가 Branch Link를 클릭/오픈하였는지 판단할 수 있습니다. 다음 예시는 이미지와 관련된 링크를 클릭했다고 가정한 것입니다. iOS와 Android에서 `pictureId` 라는 Key를 사용하여 라우팅하는 예시를 보여주고 있습니다. 물론 다른 플랫폼에 대한 코드 스냅샷도 본 [링크](#dialog-code?ios=initialize-branch&android=initialize-branch&adobe=initialize-branch&cordova=initialize-branch&mparticleAndroid=initialize-branch&mparticleIos=initialize-branch&titanium=initialize-branch&reactNative=initialize-branch&unity=initialize-branch&xamarin=initialize-branch) 에서 확인할 수 있습니다.

- *iOS - Objective C*

	```obj-c
	- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

	  // initialize the session, setup a deep link handler
	  [[Branch getInstance] initSessionWithLaunchOptions:launchOptions
	                          andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {

	    // start setting up the view controller hierarchy
	    UINavigationController *navC = (UINavigationController *)self.window.rootViewController;
	    UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
	    UIViewController *nextVC;

	    // If the key 'pictureId' is present in the deep link dictionary
	    // then load the picture screen with the appropriate picture
	    NSString *pictureId = [params objectForKey:@"pictureId"];
	    if (pictureId) {
	      nextVC = [storyboard instantiateViewControllerWithIdentifier:@"PicVC"];
	      [nextVC setNextPictureId:pictureId];
	    } else {
	      nextVC = [storyboard instantiateViewControllerWithIdentifier:@"MainVC"];
	    }

	    // navigate!
	    [navC setViewControllers:@[nextVC] animated:YES];
	  }];

	  return YES;
	}
	```

- *iOS - Swift*

	```swift
	func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
	    let branch: Branch = Branch.getInstance()
			branch.initSession(launchOptions: launchOptions, andRegisterDeepLinkHandler: {params, error in
	        // If the key 'pictureId' is present in the deep link dictionary
	        if error == nil && params["+clicked_branch_link"] != nil && params["pictureId"] != nil {
	            print("clicked picture link!")
	            // load the view to show the picture
	        } else {
	            // load your normal view
	        }
	    })
	    return true
	}
	```

- *Android*

	```java
	@Override
	public void onStart() {
	    super.onStart();

	    Branch branch = Branch.getInstance();

	    branch.initSession(new BranchReferralInitListener(){
	        @Override
	        public void onInitFinished(JSONObject referringParams, Branch.BranchError error) {
	            if (error == null) {
	                // params are the deep linked params associated with the link that the user clicked before showing up
	                // params will be empty if no data found
	                String pictureID = referringParams.optString("picture_id", "");
	                if (pictureID.equals("")) {
	                    startActivity(new Intent(this, HomeActivity.class));
	                }
	                else {
	                    Intent i = new Intent(this, ViewerActivity.class);
	                    i.putExtra("picture_id", pictureID);
	                    startActivity(i);
	                }
	            } else {
	                Log.e("MyApp", error.getMessage());
	            }
	        }
	    }, this.getIntent().getData(), this);
	}
	```

### Branch 에서 추가하는 파라미터

Link Data Dictionary 에 정의한 커스텀 Key/value 외에 Branch에서는 앱 세션 초기화 때  여러가지 유용한 데이터를 반환하고 있습니다. 이런 파라미터들은 매번 `initSession`이 호출될 때 반환되고 심지어 사용자가 Branch Link를 클릭하지 않았을 때도 반환됩니다. 다음은 해당 파라미터 및 정의를 나열했습니다.

* `~` 로 시작한 것은 Analytics 용도로 제공하는 파라미터입니다.
* `+` 로 시작한 것은 Branch에서 추가한 정보를 나타냅니다.
* 참고로 `$`로 시작한 파라미터는 Branch 서비스 액션/여정을 제어하기 위해 보류한 파라미터입니다. 이런 제어 파라미터에 대한 더 많은 정보는 [Configuring Links page](/getting-started/configuring-links))를 참고하시기 바랍니다.


| **Parameter** | **Meaning** |
| ---: | --- |
| **+is_first_session** | 해당 세션이 최초 세션(Install)인지 다른 세션(re-install, open）인지를 나타냅니다.
| **+clicked_branch_link** | 사용자가 Branch Link를 클릭함으로 해당 세션이 시작된 것이 맞는지 나타냅니다.
| **+match_guaranteed** | 100% 정확도를 보장하는 매칭방식으로 매칭된 것인지를 나타냅니다.
| **+referrer** | 링크가 클릭되었다고 할 때 해당 링크 클릭에 대한 referrer 값입니다.
| **+click_timestamp** | 클릭이 발생한 시기의 타임스템프입니다.
| **+url** | Install/Open을 유도한 Branch Link 의 Full URL입니다. (예. yourapp.app.link/abcde12345)
| **~channel** | 어떤 채널(매체)에 관한 링크인지 나타내고 링크 생성단계에 지정합니다. 전환을 발생시킨 매체로 봐도 무방합니다.
| **~feature** | 링크 생성단계에 지정한 feature 를 나타냅니다. (예. Invite, share 등)
| **~tags** | 링크 생성단계에 지정한 태그를 나타냅니다.
| **~campaign** | 링크에 해당되는 캠페인 정보를 나타내고 링크 생성단계에 지정합니다.
| **~stage** | 링크 생성단계에 지정한 stage정보입니다.
| **~creation_source** | 링크가 어떤 경로로 생성되었는지를 나타냅니다. (“API”, “Dashboard”, “SDK”, “iOS SDK”, “Android SDK”, “Web SDK”)
| **~id** | install/open 을 유도한 링크의 식별자를 나타내는 18자리 ID번호이고 자동으로 생성됩니다. (dynamic 과 3P 링크일 때는 0입니다.)

### 딥링크 파라미터를 향후에 접근하기

필요에 따라 언제든지 Branch singleton으로부터 딥링크 데이터를 가져올 수 있습니다. 그러므로 사용자를 로그인하도록 유도하거나 기타 액션을 진행한 후에 딥링크 데이터를 가져와서 특정 컨텐츠로 라우팅할 수 있습니다. 각 플랫폼에 대한 코드 스냅샷은 본 [링크](#dialog-code?ios=read-deep-link&android=read-deep-link&adobe=read-deep-link&cordova=read-deep-link&mparticleAndroid=read-deep-link&mparticleIos=read-deep-link&titanium=read-deep-link&reactNative=read-deep-link&unity=read-deep-link&xamarin=read-deep-link)를 참고하시기 바랍니다.

#### 최근 세션의 파라미터를 접근하기

본 메서드를 사용하면 가장 최근에 클릭한 링크로부터 딥링크 데이터 셋을 가져올 수 있습니다.

- *iOS - Objective C*

	```obj-c
	NSDictionary *params = [[Branch getInstance] getLatestReferringParams];
	```

- *iOS - Swift*

	```swift
	let sessionParams = Branch.getInstance().getLatestReferringParams()
	```

- *Android*

	```java
	JSONObject sessionParams = Branch.getInstance().getLatestReferringParams();
	```


#### 최초 세션의 파라미터를 접근하기

해당 사용자를 최초로 데려온 딥링크의 데이터 셋을 반환합니다. 본 정보는 사용자에게 설정된 이후 영원히 업데이트되지 않습니다. Referral (추천 프로그램)에 유용합니다.

- *iOS - Objective C*

	```obj-c
	NSDictionary *params = [[Branch getInstance] getFirstReferringParams];
	```

- *iOS - Swift*

	```swift
	let firstParams = Branch.getInstance().getFirstReferringParams()
	```

- *Android*

	```java
	JSONObject installParams = Branch.getInstance().getFirstReferringParams();
	```

## 옵션2: Branch 가 귀사에서 이미 구현한 딥링크 라우팅을 사용하게 한다

만약 귀사의 앱이 이미 URI 를 통한 딥링킹을 지원한다면 `$deeplink_path`, `$ios_deeplink_path`, `$android_deeplink_path` 파라미터에 앱내 컨텐츠에 라우팅할 수 있는 딥링크 URI 를 추가할 수 있습니다. Branch SDK가 위 파라미터 중 하나가 포함한 링크를 받았을 때 자동으로 지정한 URI 를 로딩합니다.

!!! warning "iOS 에서의 불완전한 지원"
	[Universal Links](/deep-linking/universal-links/) 와 [Spotlight](/organic-search/spotlight/) 는 URI path 를 통한 딥링킹을 지원하지 않습니다. 만약 `$deeplink_path` 또는 `ios_deeplink_path`를 사용하고 있다면 커스텀 로직 구현이 필요합니다. [여기](#how-to-handle-uri-paths-with-universal-links-or-app-links)를 클릭하여 상세한 정보를 확인하실 수 있습니다.

### 커스텀 딥링크 라우팅을 Branch Link 에 추가하는 방법

아래의 모든 예시에서 생성한 링크는 Branch 가 앱 실행후 `myapp://content/1234`를 보여주도록 합니다. `$deeplink_path` 파라미터에 꼭 URI Scheme 부분은 추가하지 않도록 유의하셔야 합니다. Branch에서 Branch Dashboard 의 Link Settings 에 설정한 URI Scheme 를 자동으로 추가합니다.

!!! example "링크를 다이나믹하게 생성할 때"

	쿼리 파라미터를 추가하는 방식으로 링크를 생성하고 있다면 제어 파라미터를 URL에 직접 추가하시면 됩니다. 그리고 모든 것을 인코딩하여 URL 에 추가해야 합니다.

	```js
	"https://[branchsubdomain]?%24deeplink_path=content%2F1234"
	```

!!! example "모바일 SDK를 사용할 때"

	- *iOS - Objective C*

		```obj-c
		BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
		linkProperties.feature = @"sharing";
		linkProperties.channel = @"facebook";
		[linkProperties addControlParam:@"$deeplink_path" withValue:@"content/1234"];
		```

	- *iOS - Swift*

		```swift
		let linkProperties: BranchLinkProperties = BranchLinkProperties()
		linkProperties.feature = "sharing"
		linkProperties.channel = "facebook"
		linkProperties.addControlParam("$deeplink_path", withValue: "content/1234")
		```

	- *Android*

		```java
		LinkProperties linkProperties = new LinkProperties()
		               .setChannel("facebook")
		               .setFeature("sharing")
		               .addControlParameter("$deeplink_path", "content/1234");
		```

!!! example "Branch Dashboard에서 Quick Link를 생성할 때"

	Branch Dashboard 에서 Quick Link 를 생성할 때 _Deep Link Data(Advanced)_ 섹션에서 제어 파라미터를 Key/Value 형식으로 입력함으로써 특정 딥링크 URI 를 Branch Link 에 추가할 수 있습니다.

	![image](/_assets/img/pages/deep-linking/routing/deep-link_path.png)


### Universal Link 와 App Link 에서 딥링크 URI Path 를 핸들링하는 방법

Universal Link, Spotlight 및 App Link는 URI Scheme 를 딥링크 라우팅에 사용하지 않습니다. `$deeplink_path`, `$ios_deeplink_path` 또는 `$android_deeplink_path` 파라미터로 URI Path 를 전달하고 있다고 할 때  Branch Link 가 오리지널 URI Scheme 에 의해 라우팅되게 하려면 어느 정도의 추가작업이 필요할 수 있습니다.

1. Branch SDK 초기화와 함께 initSession 메서드를 호출합니다.
1. initSession 의 콜백함수 내에서 코드를 추가하여 `params`로부터 `$deeplink_path` 파라미터의 값을 읽어와야 합니다.
1. 읽어온 값(URI Path)를 기존 라우팅 로직에 적용하여 앱 내의 정확한 위치로 라우팅해줘야 합니다.

## Option 3: 옵션3: Branch 의 쉬운 설정을 통해 딥링크 라우팅

### iOS에서 자동 라우팅

#### View Controller 를 설정하여 딥링크를 받아들입니다.

사용자가 링크를 클릭했을 때 보여줄 화면의 View Controller 를 오픈합니다. 예를 들면 제품을 보여주는 View 가 될 수 있습니다. 먼저 Branch Framework 을 임포팅합니다.

- *Objective C*

	```obj-c
	#import "Branch.h"
	```

- *Swift*

	```swift
	import Branch
	```

해당 화면의 View Controller 에서 `BranchDeepLinkingController` 프로토콜을 상속합니다.

- *Objective C*

	```obj-c
	@interface ExampleDeepLinkingController : UIViewController <BranchDeepLinkingController>
	```

- *Swift*

	```swift
	class ExampleDeepLinkingController: UIViewController, BranchDeepLinkingController {
	```

아래 메서드를 오버라이드하여 구현하면 링크 클릭에 의해 View Controller 가 로딩될 때 호출됩니다.

- *Objective C*

	```obj-c
	@synthesize deepLinkingCompletionDelegate;
	- (void)configureControlWithData:(NSDictionary *)data {
		NSString *pictureUrl = data[@"product_picture"];

		// show the picture
		dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
			NSData *imageData = [NSData dataWithContentsOfURL:[NSURL URLWithString:pictureUrl]];
			UIImage *image = [UIImage imageWithData:imageData];
			dispatch_async(dispatch_get_main_queue(), ^{
				self.productImageView.image = image;
			});
		});
	}
	```

- *Swift*

	```swift
	func configureControl(withData params: [AnyHashable: Any]!) {
	    let dict = params as Dictionary
	    if dict["product_picture"] != nil {
		   // show the picture
	    }
	}
	```

!!! tip "Link Data Key는 무엇인가?"
	예시에서 `product_picture`라는 Key 는 클릭된 링크의 [data dictionary](/links/integrate/#custom-data)에 포함된 파라미터이고 [Branch Link 생성](#dialog-code?ios=create-deep-link&android=create-deep-link&adobe=create-deep-link&cordova=create-deep-link&mparticleAndroid=create-deep-link&mparticleIos=create-deep-link&titanium=create-deep-link&reactNative=create-deep-link&unity=create-deep-link&xamarin=create-deep-link)단계에 이미 정의되었을 것입니다.

딥링크 된 화면의 View Controller 에서 다음 Delegate 함수를 호출하여 딥링크 된 ViewController  해제를 처리할 수 있게 합니다. (상속한 BranchDeepLinkingControllerCompletionDelegate는 Delegate의 역할을 합니다. )

- *Objective C*

```obj-c
- (IBAction)closePressed {
    [self.deepLinkingCompletionDelegate deepLinkingControllerCompleted];
}
```

- *Swift*

```swift
var deepLinkingCompletionDelegate: BranchDeepLinkingControllerCompletionDelegate?
func closePressed() {
    self.deepLinkingCompletionDelegate!.deepLinkingControllerCompleted()
}
```

#### 딥링크 라우팅을 위해 View Controller 를 등록합니다.

마지막으로 Branch 에게 위에서 이미 설정하신 View Controller에 대해 알려주어야 하고, 링크 데이터의 dictionary 에서 어떤 Key 를 사용할지를 알려주어야 합니다.

먼저 아래의 초기화 코드를 제거한다.

- *Objective C*

	```obj-c
	[branch initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {
	    if (!error && params) {
	        // params are the deep linked params associated with the link that the user clicked -> was re-directed to this app
	        // params will be empty if no data found
	        // ... insert custom logic here ...
	        print(@"params: %@", params.description);
	    }
	}];
	```

- *Swift*

	```swift
	branch.initSession(launchOptions: launchOptions, deepLinkHandler: { params, error in
	    if error == nil {
	        // params are the deep linked params associated with the link that the user clicked -> was re-directed to this app
	        // params will be empty if no data found
	        // ... insert custom logic here ...
	        print("params: %@", params.description)
	    }
	})
	```

위에서 제거한 초기화 코드의 위치에 아래 코드를 삽입합니다.

- *Objective C*

	```obj-c
	ExampleDeepLinkingController *controller = [[UIStoryboard storyboardWithName:@"Main" bundle:[NSBundle mainBundle]] instantiateViewControllerWithIdentifier:@"DeepLinkingController"];

	[branch registerDeepLinkController:controller forKey:@"product_picture" withPresentation:BNCViewControllerOptionShow];
	[branch initSessionWithLaunchOptions:launchOptions automaticallyDisplayDeepLinkController:YES];
	```

- *Swift*

	```swift
	var controller = UIStoryboard.init("Main", NSBundle.mainBundle()).instantiateViewControllerWithIdentifier("DeepLinkingController")

	branch.registerDeepLinkController(controller, forKey: "product_picture", withPresentation: .optionShow)
	branch.initSession(launchOptions: launchOptions, automaticallyDisplayDeepLinkController: true)
	```

이제부터 앱이 Branch Link 의 의해 실행되고 해당 링크 데이터에 `product_picture` Key 가 설정되어 있을 때마다 `ExampleDeepLinkingController` 가 보여집니다.

| **옵션** | **의미** |
| ---: | --- |
| **BNCViewControllerOptionShow** | showViewController 와 유사한 방법으로 View Controller 를 Navigation 스택 위에 밀어넣습니다.
| **BNCViewControllerOptionPush** | pushViewController 와 유사한 방법으로 View Controller를 Navigation 스택 위에 밀어넣습니다.
| **BNCViewControllerOptionPresent** | presentViewController 와 유사한 방법으로 View Controller 를 Window 의 루트 View Controller 위에서 보여줍니다.

!!! note
	만약 Window의 루트 ViewController 가 **UINavigationViewController** 타입이라면 **BNCViewControllerOptionShow** 와 **BNCViewControllerOptionPush** 옵션은 오직 ViewController 만 푸시할 것입니다. 또는 해당 View Controller 가 디폴트로 보여집니다.

### Android에서 자동 라우팅

#### Activity 를 설정하여 딥링크를 받아들입니다.

사용자가 광고를 클릭했을 때 보여줄 Activity 를 오픈합니다. 예를 들면 하나의 상품정보를 보여주는 Activity 가 될 수 있습니다. 다음 코드 스탭샷을 추가하여 해당 Activity 가 광고 클릭에 의해 로딩되었을 해당 내용을 보여줍니다.

```java
@Override
protected void onResume() {
    super.onResume();
    if (Branch.isAutoDeepLinkLaunch(this)) {
        try {
            String autoDeeplinkedValue = Branch.getInstance().getLatestReferringParams().getString("product_picture");
            launch_mode_txt.setText("Launched by Branch on auto deep linking!"
                    + "\n\n" + autoDeeplinkedValue);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    } else {
        launch_mode_txt.setText("Launched by normal application flow");
    }
}
```

!!! tip "Link Data Key는 무엇인가?"
	예시에서 `product_picture`라는 Key 는 클릭된 링크의 [data dictionary](/links/integrate/#custom-data)에 포함된 파라미터이고 [Branch Link 생성](#dialog-code?ios=create-deep-link&android=create-deep-link&adobe=create-deep-link&cordova=create-deep-link&mparticleAndroid=create-deep-link&mparticleIos=create-deep-link&titanium=create-deep-link&reactNative=create-deep-link&unity=create-deep-link&xamarin=create-deep-link)단계에 이미 정의되었을 것입니다.

#### Activity 를 등록하여 딥링크 라우팅합니다.

마지막으로 어떤 Activity 에 대해 설정하였는지와 링크 데이터의 dictionary 로부터 어떤 Key를 사용할 것인지를 Branch 에게 알려주어야 합니다. Manifest 파일에서 위에서 설정한 Activity 의 부분으로 가서 다음 meta-data태그를 추가합니다.

```xml
<meta-data android:name="io.branch.sdk.auto_link_keys" android:value="product_picture" />
```

이제부터 앱이 Branch Link 의 의해 실행되고 해당 링크 데이터에 `product_picture` Key 가 설정되어 있을 때마다 위에 설정한 Activity가 실행됩니다.
