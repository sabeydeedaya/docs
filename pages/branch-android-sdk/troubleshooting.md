title: Android SDK Troubleshooting

<div class="page-ul">
  <div class="page-li"><a href="/branch-android-sdk/basic-integration/">Basic Integration</a></div>
  <div class="page-li"><a href="/branch-android-sdk/advanced-features">Advanced Features</a></div>
  <div class="page-li"><a href="/branch-android-sdk/testing">Testing</a></div>
  <div class="page-li">
    <div class="page-active">
      <a href="/branch-android-sdk/troubleshooting">Troubleshooting</a>
    </div>
  </div>
  <div class="page-li"><a href="/branch-android-sdk/version-history">Version History</a></div>
  <div class="page-li"><a href="/branch-android-sdk/full-reference">Full Reference</a></div>
</div>

## Troubleshoot issues

- ### Enable logging

    - *Java*

        ```java
        Branch.enableDebugMode();
        ```

- ### Test your Branch Integration

    Test your Branch Integration by calling `IntegrationValidator.validate` in your MainActivity's onStart(). Check your ADB Logcat to make sure all the SDK Integration tests pass. Make sure to comment out or remove `IntegrationValidator.validate` in your production build.

    - *Java*

        ```java
        IntegrationValidator.validate(MainActivity.this);
        ```


- ### Sample testing apps

    - [Branchsters](https://github.com/BranchMetrics/Branch-Example-Deep-Linking-Branchster-Android)

    - [Testbed](https://github.com/BranchMetrics/android-branch-deep-linking/tree/master/Branch-SDK-TestBed)

- ### Simulate an install

    - Need to bypass the device's hardware_id

        - Set `true` in your `AndroidManifest.xml`

            ```xml
            <meta-data android:name="io.branch.sdk.TestMode" android:value="true" />
            ```
            - Do not use `TestMode` in production or in the Google Play Store

        **OR**

        - add `Branch.enableSimulateInstalls()`; called before `initSession` in `onStart()`

          - Can be used on Live and Test apps

    - Uninstall your app from the device

    - Click on any Branch deep link (will navigate to the fallback URL since the app is not installed)

    - Reinstall your app

    - Read deep link data from `Branch.getInstance().initSession()` for `+is_first_session=true`

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

- ### Using bnc.lt or a custom link domain

    - *bnc.lt link domain*

        ```xml
        <activity android:name="com.yourapp.your_activity">
            <!-- App Link your activity to Branch links-->
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                 <data android:scheme="https" android:host="bnc.lt" />
                 <data android:scheme="https" android:host="bnc.lt" />
            </intent-filter>
        </activity>
        ```

    - *custom link domain*

        ```xml
        <activity android:name="com.yourapp.your_activity">
            <!-- App Link your activity to Branch links-->
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                 <data android:scheme="https" android:host="your.app.com" />
                 <data android:scheme="https" android:host="your.app.com" />
            </intent-filter>
        </activity>
        ```

    - Change the following values to match your [Branch Dashboard](https://dashboard.branch.io/settings/link)

        - `your.app.com`

 - ### Branch with Fabric Answers

    - If you do not want to import `answers-shim`

        ```
        compile ('io.branch.sdk.android:library:2.+') {
          exclude module: 'answers-shim'
        }
        ```

- ### Deep link routing

    - Loads a specific URI Scheme path, for example
        - `$deeplink_path="content/123"`
        - `$android_deeplink_path="content/123"`

    - Recommend to use [Navigate to content](#navigate-to-content) instead

        ```xml
        <meta-data android:name="io.branch.sdk.auto_link_path" android:value="content/123/, another/path/, another/path/*" />
        ```

- ### Deep link routing in app

    - Used for `WebView` and `ChromeTab` within the app to render HTML normally

    - Branch links within the `WebView` will route internally within your app, while other contents will continue to route externally

    - Launch Branch deep links with `Web View`

        - *Java*

            ```java
            @Override
            protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                setContentView(R.layout.activity_main);
                WebView webView = (WebView) findViewById(R.id.webView);
                webView.setWebViewClient(new BranchWebViewController(YOUR_DOMAIN, MainActivity.class)); //YOUR_DOMAIN example: appname.app.link
                webView.loadUrl(URL_TO_LOAD);
            }

            public class BranchWebViewController extends WebViewClient {

                private String myDomain_;
                private Class activityToLaunch_;

                BranchWebViewController(@NonNull String myDomain, Class activityToLaunch) {
                    myDomain_ = myDomain;
                    activityToLaunch_ = activityToLaunch;
                }

                @Override
                public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                    String url = request.getUrl().toString();

                    if (url.contains(myDomain_)) {
                        Intent i = new Intent(view.getContext(), activityToLaunch_);
                        i.putExtra("branch", url);
                        i.putExtra("branch_force_new_session", true);
                        startActivity(i);
                        //finish(); if launching same activity
                    } else {
                        view.loadUrl(url);
                    }

                    return true;
                }
            }
            ```

        - *Kotlin*

            ```java
            override fun onCreate(savedInstanceState: Bundle?) {
                super.onCreate(savedInstanceState)
                setContentView(R.layout.activity_main)
                val webView = findViewById(R.id.webView) as WebView
                webView!!.webViewClient = BranchWebViewController("appname.app.link", MainActivity2::class.java)
                webView!!.loadUrl(URL_TO_LOAD)
            }

            inner class BranchWebViewController internal constructor(private val myDomain_: String, private val activityToLaunch_: Class<*>) : WebViewClient() {

                override fun onLoadResource(view: WebView, url: String) {
                    super.onLoadResource(view, url)
                }

                override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                    val url = request.url.toString()

                    if (url.contains(myDomain_)) {
                        val i = Intent(view.context, activityToLaunch_)
                        i.putExtra("branch", url)
                        i.putExtra("branch_force_new_session", true)
                  //finish(); if launching same activity
                        startActivity(i)
                    } else {
                        view.loadUrl(url)
                    }

                    return true
                }
            }
            ```

    - Launch Branch deep links with `Chrome Tabs`

        - *Java*

            ```java
            CustomTabsIntent.Builder builder = new CustomTabsIntent.Builder();
            CustomTabsIntent customTabsIntent = builder.build();
            customTabsIntent.intent.putExtra("branch", BRANCH_LINK_TO_LOAD);
            customTabsIntent.intent.putExtra("branch_force_new_session", true);
            customTabsIntent.launchUrl(MainActivity.this, Uri.parse(BRANCH_LINK_TO_LOAD));
            //finish(); if launching same activity
            ```

        - *Kotlin*

            ```java
            val builder = CustomTabsIntent.Builder()
            val customTabsIntent = builder.build()
            customTabsIntent.intent.putExtra("branch", BRANCH_LINK_TO_LOAD)
            customTabsIntent.intent.putExtra("branch_force_new_session", true)
            customTabsIntent.launchUrl(this@MainActivity2, Uri.parse(BRANCH_LINK_TO_LOAD))
            //finish() if launching same activity
            ```

- ### Deep link activity finishes

    - Be notified when the deep link Activity finishes

        ```xml
        <meta-data android:name="io.branch.sdk.auto_link_request_code" android:value="@integer/AutoDeeplinkRequestCode" />
        ```

    - *Java*

        ```java
        @Override
        protected void onActivityResult(int requestCode, int resultCode, Intent data) {
            super.onActivityResult(requestCode, resultCode, data);

            // Checking if the previous activity is launched on branch Auto deep link.
            if(requestCode == getResources().getInteger(R.integer.AutoDeeplinkRequestCode)){
                //Decide here where  to navigate  when an auto deep linked activity finishes.
                //For e.g. Go to HomeActivity or a  SignUp Activity.
                Intent i = new Intent(getApplicationContext(), CreditHistoryActivity.class);
                startActivity(i);
            }
        }
        ```

    - *Kotlin*

        ```java
        override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
            super.onActivityResult(requestCode, resultCode, data)

            // Checking if the previous activity is launched on branch Auto deep link.
            if (requestCode == resources.getInteger(R.integer.AutoDeeplinkRequestCode)) {
                //Decide here where  to navigate  when an auto deep linked activity finishes.
                //For e.g. Go to HomeActivity or a  SignUp Activity.
                val i = Intent(applicationContext, CreditHistoryActivity::class.java)
                startActivity(i)
            }
        }
        ```

- ### Test Deeplink routing for your Branch links

    Append `?bnc_validate=true` to any of your app's Branch links and click it on your mobile device (not the Simulator!) to start the test. For instance, to validate a link like: `"https://<yourapp\>.app.link/NdJ6nFzRbK"` click on: `"https://<yourapp\>.app.link/NdJ6nFzRbK?bnc_validate=true"`


- ### Pre Android 15 support

    - Use `Branch SDK 1.14.5`

    - Add to `onStart()` and `onStop()`

    - *Java*

        ```java
        @Override
        protected void onStart() {
            super.onStart();
            Branch.getInstance(getApplicationContext()).initSession();
        }

        @Override
        protected void onStop() {
            super.onStop();
            branch.closeSession();
        }
        ```

    - *Kotlin*

        ```java
        override fun onStart() {
            super.onStart()
            Branch.getInstance().initSession()
        }

        override fun onStop() {
            super.onStop()
            Branch.getInstance().closeSession()
        }
        ```

- ### Using the default application class

    - If your app does not have an application class

        ```xml
        <application android:name="io.branch.referral.BranchApp">
        ```

- ### Custom install referrer class

    - Google only allows one `BroadcastReceiver` per application

    - Add to your `AndroidManifest.xml`

        ```xml
        <receiver android:name="com.BRANCH SDK.CustomInstallListener" android:exported="true">
          <intent-filter>
            <action android:name="com.android.vending.INSTALL_REFERRER" />
          </intent-filter>
        </receiver>
        ```

    - Create an instance of `io.branch.referral.InstallListener` in `onReceive()`

    - *Java*

        ```java
        InstallListener listener = new InstallListener();
        listener.onReceive(context, intent);
        ```

    - *Kotlin*

        ```java
        val listener = InstallListener()
        listener.onReceive(context, intent)
        ```

- ### Generate signing certificate

    - Used for Android `App Link` deep linking

    - Navigate to your keystore file

    - Run `keytool -list -v -keystore my-release-key.keystore`

    - Will generate a value like `AA:C9:D9:A5:E9:76:3E:51:1B:FB:35:00:06:9B:56:AC:FB:A6:28:CE:F3:D6:65:38:18:E3:9C:63:94:FB:D2:C1`

    - Copy this value to your [Branch Dashboard](https://dashboard.branch.io/link-settings)

- ### Matching through the install listener

    - Enable the ability to pass `link_click_id` from Google Play to Branch

    - This will increase attribution and deferred deep linking accuracy

    - Branch default is `1.5` seconds to wait for Google Play analytics

    - You can optimize the performance based on needs (e.g. `0`, `5000`, `10000`)

    - Add to your application class before `getAutoInstance` ([Load Branch](#load-branch))

    - *Java*

        ```java
        Branch.setPlayStoreReferrerCheckTimeout(5000);
        ```

    - *Kotlin*

        ```java
        Branch.setPlayStoreReferrerCheckTimeout(5_000)
        ```

    - Test

        ```sh
        adb shell am broadcast -a com.android.vending.INSTALL_REFERRER -n io.branch.androidexampledemo/io.branch.referral.InstallListener --es "referrer" "link_click_id=123"
        ```

- ### Enable multidexing

    - Adding additional dependencies may overrun the dex limit and lead to `NoClassDefFoundError` or `ClassNotFoundException`

    - Add to your `build.gradle`

        ```java
        defaultConfig {
            multiDexEnabled true
        }
        ```

    - Add to your `Application class` and make sure it extends `MultiDexApplication`

    - *Java*

        ```java
        @Override
        protected void attachBaseContext(Context base) {
            super.attachBaseContext(base);
            MultiDex.install(this);
        }
        ```

    - *Kotlin*

        ```java
        override fun attachBaseContext(base: Context?) {
            super.attachBaseContext(base)
            MultiDex.install(this)
        }
        ```

- ### InvalidClassException, ClassLoadingError or VerificationError

    - Often caused by a `Proguard` bug. Try the latest Proguard version or disable Proguard optimization by setting `-dontoptimize`

- ### Proguard warning or errors with answers-shim module

    - Often caused when you exclude the `answers-shim`. Try adding `-dontwarn com.crashlytics.android.answers.shim.**` to your `Proguard` file

- ### Proguard warning or errors with AppIndexing module

    - The Branch SDK has an optional dependency on Firebase app indexing and Android install referrer classes to provide new Firebase content listing features and support new Android install referrer library. This may cause a proguard warning depending on your proguard settings. Please add the following to your proguard file to solve this issue
    `-dontwarn com.google.firebase.appindexing.**`  `-dontwarn com.android.installreferrer.api.**`

- ### Proguard rules without Play Services Ads module

  - The Branch SDK has an optional dependency on Play Services Ads for GAID matching. Using Proguard without using this library can create issue in fetching the GAID while creating Branch session and events. Please add the following to your proguard file to solve this issue
`-keep class com.google.android.gms.ads.identifier.AdvertisingIdClient {
com.google.android.gms.ads.identifier.AdvertisingIdClient$Info getAdvertisingIdInfo(android.content.Context);
}`
`-keep class com.google.android.gms.ads.identifier.AdvertisingIdClient$Info {
java.lang.String getId();
boolean isLimitAdTrackingEnabled();
}`

- ### Unable to open this link error

    - Happens whenever URI Scheme redirection fails.
    - Make sure you do not have `$deeplink_path` or you have a `$deeplink_path` which your `AndroidManifest.xml` can accept

- ### Stuck in `initState_ == SESSION_STATE.INITIALISING`

    - Often caused because Branch does not have the right application context from your activity. To fix this, pass in the singleton class when you access the Branch instance:

    ```java
    Branch.getInstance(getApplicationContext());
    ```
- ### Minimum versions
    If you'd like to support down to API version 9 on Android, please pin to version 1.14.5. If you'd like to support API level 15, please pin to a 2.x version. The minimum version we support for 3.x is Android version 16.
