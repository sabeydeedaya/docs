## Integrate Branch

!!! warning "Inconsistent Universal links behavior on iOS 11.2"
    After updating a device to iOS 11.2, we found that the app's AASA file is no longer downloaded reliably onto your user’s device after an app install. As a result, clicking on Universal links will no longer open the app consistenly. You can set [forced uri redirect mode](/links/integrate/#forced-redirections) on your Branch links to open the app with URI schemes. View details of the issue on the [Apple Bug report](http://www.openradar.me/radar?id=4999496467480576).

- ### Configure Branch

    - Complete your [Branch Dashboard](https://dashboard.branch.io/settings/link)

        ![image](/_assets/img/pages/apps/unity-configure.png)

    - Customize your app.link domain:

        ![image](/_assets/img/pages/apps/unity-link-domain.png)

- ### Get the Branch SDK

    - [Download the latest SDK version](https://s3-us-west-1.amazonaws.com/branchhost/BranchUnityWrapper.unitypackage) or clone our [open-source GitHub repository](https://github.com/BranchMetrics/unity-branch-deep-linking).

    - Import the **BranchUnityWrapper.unitypackage** into your project by clicking `Assets -> Import Package`.

- ### Configure app

    - Add the Branch prefab asset to the **first scene** of your Unity project

    - ##### Update your Branch prefab

        ![image](/_assets/img/pages/apps/unity-settings.png)

        > Do not forget to click on the **Update iOS Wrapper** and the **Update Android Manifest** buttons once you are done.

    - ##### Prefab fields

        |   Field name  | Description |
        |:-----------------------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
        | **Simulate Fresh Installs** | This checkbox enables debug mode. This allows you to simulate fresh every time you uninstall and reinstall the app. Please make sure to uncheck this box before releasing your app. |
        | **Test Mode** | This checkbox picks the test key from your Branch prefab. If this box is unchecked, by default, your live Branch key is used.|
        | **Test Branch Key** | This is the test Branch key found on the [App Settings page](https://dashboard.branch.io/account-settings/app) of your Test Branch app|
        | **Test Branch URI** | This is the test URI scheme that you have set for your app on the [Link Settings page](https://dashboard.branch.io/link-settings) for your Test Branch app|
        | **Test Android Path Prefix** | This field is only applicable if you are on the `bnc.lt` domain of your Test Branch app. You can find it underneath the field labeled SHA256 Cert Fingerprints on the [Link Settings page](https://dashboard.branch.io/link-settings) once you’ve enabled App Links. It will look something like this: `/WSuf` (the initial / character should be included).|
        | **Test App Links** | This field is applicable if you want to enable `APPLINKS` and `UNIVERSAL LINKS` for your domain. Please make sure to add the correct domain found on the bottom of the [Link Settings page](https://dashboard.branch.io/link-settings) of your Test Branch app. Add the -alternate domain to have your Branch links deeplink from your [Deepviews](/web/deep-views/) and [Journeys](/web/journeys/). If you are not using a `app.links` domain please write into [integrations@branch.io](mailto:integrations@branch.io)|
        | **Live Branch Key** | This is the Live Branch key found on the [App Settings page](https://dashboard.branch.io/account-settings/app) of your Live Branch app|
        | **Live Branch URI** | This is the Live URI scheme that you have set for your app on the [Link Settings page](https://dashboard.branch.io/link-settings) for your Live Branch app|
        | **Live Android Path Prefix** | This field is only applicable if you are on the `bnc.lt` domain [Link Settings page](https://dashboard.branch.io/link-settings) for your Live Branch app. You can find it underneath the field labeled SHA256 Cert Fingerprints on the [Link Settings page](https://dashboard.branch.io/link-settings) once you’ve enabled App Links. It will look something like this: `/WSuf` (the initial / character should be included).|
        | **Live App Links** | This field is applicable if you want to enable `APPLINKS` and `UNIVERSAL LINKS` for your domain. Please make sure to add the correct domain found on the bottom of the [Link Settings page](https://dashboard.branch.io/link-settings) of your Live Branch app. Add the -alternate domain to have your Branch links deeplink from your [Deepviews](/web/deep-views/) and [Journeys](/web/journeys/). If you are not using a `app.links` domain please write into [integrations@branch.io](mailto:integrations@branch.io)|

        - Note for Android
        >   Occasionally, Android will barf after you add our library due to generic issues unrelated to Branch. Please see this [Android troubleshooting section](/apps/android/#troubleshoot-issues)

- ### Initialize Branch

    - Add Branch to your `Monobehavior` script of your **first Scene**

        ```csharp hl_lines="8 11 12 13 14 15 16 17 18 19 20 21 22 23"
        using UnityEngine;
        using System.Collections;

        public class Spin : MonoBehaviour {

            // Use this for initialization
            void Start () {
                Branch.initSession(CallbackWithBranchUniversalObject);
            }

            void CallbackWithBranchUniversalObject(BranchUniversalObject buo,
                                                    BranchLinkProperties linkProps,
                                                    string error) {
                if (error != null) {
                    System.Console.WriteLine("Error : "
                                            + error);
                } else if (linkProps.controlParams.Count > 0) {
                    System.Console.WriteLine("Deeplink params : "
                                            + buo.ToJsonString()
                                            + linkProps.ToJsonString());
                }
            }

            // Update is called once per frame
            void Update () {
                //rotate 90 degress per second
                transform.Rotate(Vector3.up * Time.deltaTime*90);
            }
        }
        ```

- ### Test deep link

    - [Create a Quick link](https://dashboard.branch.io/quick-links/qlc/define) on the Branch Dashboard

    - Delete your app from the device

    - Paste Quick link in `Google Hangouts (Android)` or `Notes (iOS)`

    - Click on the Quick link to open your app

    - Compile and download your app to your device

    - You should see deferred deep link data show in your app


## Implement features

- ### Create content reference

    - The `Branch Universal Object` encapsulates the thing you want to share with your link

        ```csharp
        BranchUniversalObject universalObject = new BranchUniversalObject();
        // Content index mode: 0 - private mode, 1 - public mode
        universalObject.contentIndexMode = 1;
        //Identifier that helps Branch dedupe across many instances of the same content.
        universalObject.canonicalIdentifier = "id12345";
        // OG title
        universalObject.title = "id12345 title";
        // OG Description
        universalObject.contentDescription = "My awesome piece of content!";
        // OG Image
        universalObject.imageUrl = "https://s3-us-west-1.amazonaws.com/branchhost/mosaic_og.png";
        // User defined key value pair
        universalObject.metadata.Add("foo", "bar");
        ```

- ### Create deep link

    - After you have created a `Branch Universal Object`, Define Link Properties

        ```csharp
        BranchLinkProperties linkProperties = new BranchLinkProperties();
        linkProperties.tags.Add("tag1");
        linkProperties.tags.Add("tag2");
        // Feature link is associated with. Eg. Sharing
        linkProperties.feature = "invite";
        // The channel where you plan on sharing the link Eg.Facebook, Twitter, SMS etc
        linkProperties.channel = "Twitter";
        // The Campaign that drives this link
        linkProperties.campaign = "referral";
        linkProperties.stage = "2";
        // Parameters used to control Link behavior
        linkProperties.controlParams.Add("$desktop_url", "http://example.com");
        ```

    - Generate a Branch link

        ```csharp
        Branch.getShortURL(universalObject, linkProperties, (params, error) => {
            if (error != null) {
                Debug.LogError("Branch.getShortURL failed: " + error);
            } else if (params != null) {
                Debug.Log("Branch.getShortURL shared params: " + url);
            }
        });
        ```

- ### Share deep link

    - Share deep links between users and apps

        ```csharp
        Branch.shareLink(universalObject, linkProperties, "Sharing link: ", (parameters, error) => {
            if (error != null) {
                Debug.LogError("Branch.shareLink failed: " + error);
            } else if (parameters != null) {
					Debug.Log("Branch.shareLink: " + parameters["sharedLink"].ToString() + " " + parameters["sharedChannel"].ToString());
	    }
        });
        ```

- ### Read deep link

    - Read Deeplink params from a **BUO** in your `BranchInitSession callback`

    - Returns [deep link properties](/links/integrate/#read-deep-links)


        ```csharp
        public void CallbackWithBranchUniversalObject(BranchUniversalObject universalObject, BranchLinkProperties linkProperties, string error) {
            if (error != null) {
                Debug.LogError("Branch Error: " + error);
            } else {
                Debug.Log("Branch initialization completed: ");
                Debug.Log("Universal Object: " + universalObject.ToJsonString());
                Debug.Log("Link Properties: " + linkProperties.ToJsonString());
            }
        }
        ```

        > This refereshes with every session (App Installs and App Opens)

        ##### Read install (install or open) parameters from anywhere after Branch initsession

        ```csharp
        BranchUniversalObject obj = Branch.getFirstReferringBranchUniversalObject();
        BranchLinkProperties link = Branch.getFirstReferringBranchLinkProperties();
        ```

- ### Navigate and Display content

    - Use the link parameters to decide which view you wish to load

        ```csharp
        public class MyCoolBehaviorScript : MonoBehaviour {
            void Start () {
                Branch.initSession(delegate(Dictionary<string, object> parameters, string error) {
                    if (parameters.ContainsKey("picture_id") {
                        // load the Scene to show the picture
                        SceneManager.LoadSceneAsync("ImageScene", LoadSceneMode.Additive);
                    } else {
                        // load your normal Scene
                        SceneManager.LoadSceneAsync("NormalScene", LoadSceneMode.Single);
                    }
                });
            }
        }
        ```

- ### Track content

    - If you want to track the number of times a user views a BUO content

        ```csharp
        Branch.registerView(universalObject);
        ```

- ### Track users

    - ##### Set User-Ids on Login/Register

        ```csharp
        Branch.setIdentity("your user id");
        ```

    - ##### UnSet User-Ids on logout

        ```csharp
        Branch.logout();
        ```

- ### Tracking User Actions and Events

Use BranchEvent class to track special user actions or application specific events beyond app installs, opens, and sharing. You can track events such as when a user adds an item to an on-line shopping cart, or searches for a keyword etc. BranchEvent provides an interface to add content(s) represented by a BranchUniversalObject in order to associate content(s) with events. You can view analytics for the BranchEvents you fire on the Branch dashboard. BranchEventType enumerate the most commonly tracked events and event parameters that can be used with BranchEvent for the best results. You can always use custom event names and event parameters.

```csharp
BranchEvent e01 = new BranchEvent (BranchEventType.COMPLETE_REGISTRATION);

e01.SetAffiliation("my_affilation");
e01.SetCoupon("my_coupon");
e01.SetCurrency(BranchCurrencyType.USD);
e01.SetTax(10.0f);
e01.SetRevenue(100.0f);
e01.SetShipping(1000.0f);
e01.SetDescription("my_description");
e01.SetSearchQuery("my_search_query");
e01.AddCustomData("custom_data_key01", "custom_data_value01");
e01.AddContentItem(universalObject);

Branch.sendEvent (e01);


BranchEvent e02 = new BranchEvent ("MY_CUSTOM_EVENT");

e02.SetAffiliation("my_affilation");
e02.SetCoupon("my_coupon");
e02.SetCurrency(BranchCurrencyType.USD);
e02.SetTax(10.0f);
e02.SetRevenue(100.0f);
e02.SetShipping(1000.0f);
e02.SetDescription("my_description");
e02.SetSearchQuery("my_search_query");
e02.AddCustomData("custom_data_key01", "custom_data_value01");
e02.AddContentItem(universalObject);

Branch.sendEvent (e02);
```


- ### Handle referrals

    - ##### Typical Referral Flow

        1. Setup a Reward rule on your [Branch Dashboard](https://dashboard.branch.io/referrals/rules).
        2. Referrer has his/her identity set at [login/signup](/apps/unity/#set-user-ids-on-loginregister)
        3. Referrer [creates](/apps/unity/#create-deep-link) a Branch link.
        4. Referrer [shares](/apps/unity/#create-deep-link) the Branch link.
        5. Referee clicks on the Branch link, installs the app.
        6. The referee has his/her identity set at [login/signup](/apps/unity/#set-user-ids-on-loginregister)
        7. Referee [triggers a custom event](/apps/unity/#track-events) after login/Signup.
        8. Use the following SDK methods to see a user's [current credits](/apps/unity/#get-reward-balance), [redeem credits](/apps/unity/#redeem-rewards) and check a user's entire [credit history](/apps/unity/#get-credit-history).

    - ##### Get Reward balance

        ```csharp
        Branch.loadRewards(delegate(bool changed, string error) {
            // changed boolean will indicate if the balance changed from what is currently in memory

            // will return the balance of the current user's credits
            int credits = Branch.getCredits();
        });
        ```

    - ##### Redeem Rewards

        ```csharp
        Branch.redeemRewards(5);
        ```

    - ##### Get Credit History

        ```csharp
        Branch.getCreditHistory(delegate(List<string> historyItems, string error) {
            if (error == null) {
            // process history
            }
        });
        ```

## Troubleshoot issues

- ### iOS + Unity 4.6 Note

    Branch requires ARC, and we don’t intend to add checks thoughout the SDK to try and support pre-ARC.
    However, you can add flags to the project to compile the Branch files with ARC. If you wish to do this
    add `-fobjc-arc` to all Branch files.

    > Note: we by default have this flag checked, but please check before building for iOS.

- ### Android - Using your own Custom Application Class

    If you are using your own Custom Application class, you will need to add Branch android library into your project and call the following in method OnCreate():

    ```Java
    Branch.getAutoInstance(this.getApplicationContext());
    ```

    If you are using your own custom Activity class, please make sure that you are overridding the following Activities:

    ```Java
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onNewIntent(Intent intent) {
        this.setIntent(intent);
    }
    ```

- ### Support Branch with different Plugins

    The Branch SDK has its own custom `activity` and `application` class. Other plugins that use their own
    custom activity and application classes can cause "conflicts" between these classes. To resolve these conflicts:

    1. Create a empty android library
    2. Add the Branch plugin along with the other plugins into your project
    3. Create a custom Activity and Application class that will contain the custom logic for all your plugins
    4. Build your library
    5. Add your library into Unity project
    6. Change android:name to name of your custom Application class in the `application` tag of your Manifest
    7. Change android:name to name of your custom Activity class in the `activity` tag of your Manifest

- ### Support several IMPL_APP_CONTROLLER_SUBCLASS

    The Branch Unity SDK plugin uses its own UnityAppController that expands default AppController. This is used to catch Universal Links.

    ```csharp
    @interface BranchAppController : UnityAppController
    {
    }
    @end

    @implementation BranchAppController

    - (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *))restorationHandler {
        BOOL handledByBranch = [[BranchUnityWrapper sharedInstance] continueUserActivity:userActivity];
        return handledByBranch;
    }

    @end

    IMPL_APP_CONTROLLER_SUBCLASS(BranchAppController)
    ```

    Some Plugins expand the default AppController the same was as Branch does like Cardboard SDK plugin. To resolve conflicts:

    1. Merge all custom AppControllers in one.
    2. Comment code in other AppControllers (or delete other AppControllers).


- ### Sample app

    - [Branch Testbed app](https://github.com/BranchMetrics/unity-branch-deep-linking/tree/master/BranchUnityTestBed)
    - [Code Samples](https://github.com/BranchMetrics/unity-branch-deep-linking/tree/master/ThirdPartySolutions) for resolving conflicts with other 3rd party plugins
