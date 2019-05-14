## Overview

When a Branch link is opened, either your app launches or users are taken to the App/Play store to download it. Deep links improve this process by routing users directly to specific content after your app launches. With Branch, this still works even if users have to stop and download the app first (a.k.a., "deferred deep links").

Deep links are an incredibly important part of delivering a high quality user experience. With deep links, you can take users to the exact thing they clicked on or even offer a customized onboarding experience.

## Option 1: Build custom routing inside the routing callback

### Route immediately on app open

Inside the deep link handler callback that you register in initSession, you will want to examine the params dictionary to determine whether the user opened a Branch link. Below is an example assuming that the links correspond to pictures. Below are some examples from iOS and Android where we're using the `pictureId` key to route, but you can see more code snippets for [the other platforms here](#dialog-code?ios=initialize-branch&android=initialize-branch&adobe=initialize-branch&cordova=initialize-branch&mparticleAndroid=initialize-branch&mparticleIos=initialize-branch&titanium=initialize-branch&reactNative=initialize-branch&unity=initialize-branch&xamarin=initialize-branch).

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

### Branch-added parameters

In addition to any custom key/value pairs specified in the link data dictionary, Branch also returns some other useful parameters every time a session is initialized. These parameters will be returned every time `initSession` is called, even if the user has not clicked on a Branch link. Here is a list, and a description of what each represents.

* `~` denotes analytics
* `+` denotes information added by Branch
* This data will not be available for deeplinks from Facebook or other Self Attributing Networks
* (for the curious, `$` denotes reserved keywords used for controlling how the Branch service behaves. Read more about control parameters on the [Configuring Links page](/links/integrate/#configure-deep-links)


| **Parameter** | **Meaning** |
| ---: | --- |
| **+is_first_session** | Denotes whether this is the first session (install) or any other session (re-install, open)
| **+clicked_branch_link** | Denotes whether or not the user clicked a Branch link that triggered this session
| **+match_guaranteed** | True or false as to whether the match was made with 100% accuracy
| **+referrer** | The referrer for the link click, if a link was clicked
| **+click_timestamp** | Epoch timestamp of when the click occurred
| **+url** | The full URL of the link that drove the install/open, if present (e.g. yourapp.app.link/abcde12345)
| **~channel** | The channel on which the link was shared, specified at link creation time
| **~feature** | The feature, such as `invite` or `share`, specified at link creation time
| **~tags** | Any tags, specified at link creation time
| **~campaign** | The campaign the link is associated with, specified at link creation time
| **~creation_source** | Where the link was created ('API', 'Dashboard', 'SDK', 'iOS SDK', 'Android SDK', or 'Web SDK')
| **~id** | Automatically generated 18 digit ID number for the link that drove the install/open, if present (0 for dynamic and 3P links)

### Access deep link parameters later on

You can retrieve the deep link data at any time from the Branch singleton by calling one of the below methods. This would be the route to use if you wanted to deep link the user after prompting them to log in or something. You can see the [code snippets for other platforms here](#dialog-code?ios=read-deep-link&android=read-deep-link&adobe=read-deep-link&cordova=read-deep-link&mparticleAndroid=read-deep-link&mparticleIos=read-deep-link&titanium=read-deep-link&reactNative=read-deep-link&unity=read-deep-link&xamarin=read-deep-link).

#### Get latest session referring params

This returns the latest set of deep link data from the most recent link that was clicked. If you minimize the app and reopen it, the session will be cleared and so will this data.

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


#### Get first session referring params

This returns the first set of deep link data that ever referred the user. Once it's been set for a given user, it can never be updated. This is useful for referral programs.

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

## Option 2: Let Branch use your existing deep link routing

If your app already supports deep linking using URI paths, you can populate the `$deeplink_path`, `$ios_deeplink_path` or `$android_deeplink_path` link parameters with the URI path of the content to be displayed within the app. When the Branch SDK receives a link containing one of these parameters it will automatically load the specified URI path.

!!! warning "Incomplete support on iOS"
	[Universal Links](/deep-linking/universal-links/) and [Spotlight](/organic-search/spotlight/) do not support deep linking via URI paths. If you use `$deeplink_path` or `$ios_deeplink_path`, you will need to implement some custom logic. [Click here for more information](#how-to-handle-uri-paths-with-universal-links-or-app-links).


### How to insert custom deep link routes into a Branch link

All of the examples below create links that will cause Branch to display `myapp://content/1234` after launch. Please do not add the URI scheme on the `$deeplink_path` parameters; we automatically append the scheme specified in the Link Settings of dashboard.

!!! example "When creating links dynamically"

	If you're creating a link by appending query parameters, just append the control parameters to the URL. Please make sure to URL encode everything, lest the link will break.

	```js
	"https://[branchsubdomain]?%24deeplink_path=content%2F1234"
	```

!!! example "When using a mobile SDK"

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

!!! example "When creating Quick Links on the Branch dashboard"

	You can specify the control parameters for individual Quick Links by inserting the keys and values into the _Deep Link Data (Advanced)_ section.

	![image](/_assets/img/pages/deep-linking/routing/deep-link_path.png)


### How to handle URI paths with Universal Links or App Links

Because Universal Links, Spotlight and Android App Links do not use URI schemes for deep link routing. If you populate `$deeplink_path`, `$ios_deeplink_path` or `$android_deeplink_path` with a URI path, you will need to a bit of additional work to ensure that Branch links route according to your original schema.

1. Call initSession as described in [the app configuration steps](#dialog-code?ios=initialize-branch&android=initialize-branch&adobe=initialize-branch&cordova=initialize-branch&mparticleAndroid=initialize-branch&mparticleIos=initialize-branch&titanium=initialize-branch&reactNative=initialize-branch&unity=initialize-branch&xamarin=initialize-branch)
1. In the callback function, add some custom code to read the appropriate `$deeplink_path` parameter in the `params`
1. Use this value to call your existing routing logic to route users to the correct place in your app

## Option 3: Use Branch's easy config deep link routing

### Auto-routing in iOS

#### Configure View Controller to accept deep links

Open the view controller that you want to appear when a user clicks a link. For example, this could be a view to show a product. First, import the Branch framework:

- *Objective C*

	```obj-c
	#import "Branch.h"
	```

- *Swift*

	```swift
	import Branch
	```

Register your view controller for the delegate `BranchDeepLinkingController`:

- *Objective C*

	```obj-c
	@interface ExampleDeepLinkingController : UIViewController <BranchDeepLinkingController>
	```

- *Swift*

	```swift
	class ExampleDeepLinkingController: UIViewController, BranchDeepLinkingController {
	```

Receive the delegate method that will be called when the view controller is loaded from a link click:

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

!!! tip "What is a link data key?"
	The example key `product_picture` is a parameter from the [data dictionary](/links/integrate/#custom-data) of the link that was clicked, and would have been defined when the link [was created](#dialog-code?ios=create-deep-link&android=create-deep-link&adobe=create-deep-link&cordova=create-deep-link&mparticleAndroid=create-deep-link&mparticleIos=create-deep-link&titanium=create-deep-link&reactNative=create-deep-link&unity=create-deep-link&xamarin=create-deep-link).

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

#### Register View Controller for deep link routing

Lastly, you need to tell Branch about the view controller you just configured, and which key it is using from the link's data dictionary.

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

Remove it, and insert this snippet in the same place:

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

Now whenever your app launches from a Branch link that has the `product_picture` key set in its data dictionary, the `ExampleDeepLinkingController` view controller will be displayed!

| **Option** | **Meaning** |
| ---: | --- |
| **BNCViewControllerOptionShow** | This option pushes view controller onto the navigation stack in a similar way as the showViewController
| **BNCViewControllerOptionPush** | This option pushes view controller onto the navigation stack in a similar way as the pushViewController
| **BNCViewControllerOptionPresent** | This option presents view controller onto the root view controller of window in a similar way as the presentViewController

!!! note
	**BNCViewControllerOptionShow** or **BNCViewControllerOptionPush** option would only push a view controller if the root view controller of window is of type **UINavigationViewController**. Or else, the view controller would be presented by default.

### Auto-routing in Android

#### Configure Activity to accept deep links

Open the Activity that you want to appear when a user clicks a link. For example, this could be an Activity to show a product. Insert the following code snippet to display your content when the Activity is loaded from a link click:

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

!!! tip "What is a link data key?"
	The example key `product_picture` is a parameter from the [data dictionary](/links/integrate/#custom-data) of the link that was clicked, and would have been defined when the link [was created](#dialog-code?ios=create-deep-link&android=create-deep-link&adobe=create-deep-link&cordova=create-deep-link&mparticleAndroid=create-deep-link&mparticleIos=create-deep-link&titanium=create-deep-link&reactNative=create-deep-link&unity=create-deep-link&xamarin=create-deep-link).

#### Register Activity for deep link routing

Lastly, you need to tell Branch about the Activity you just configured, and which key it is using from the link's data dictionary. In your Manifest file, locate the definition for the Activity above and add this meta-data tag:

```xml
<meta-data android:name="io.branch.sdk.auto_link_keys" android:value="product_picture" />
```

Now whenever your app launches from a Branch link that has the `product_picture` key set in its data dictionary, this Activity will be displayed!
