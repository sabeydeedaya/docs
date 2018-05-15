## Integrate Branch

- ### Configure Branch

    - Complete the `Basic integration` within [Configure your dashboard](/pages/dashboard/integrate/)

    - Make sure `Always try to open app` and `I have an Android App` are both enabled

        ![image](/img/pages/dashboard/android.png)

- ### Install Branch

    - Import the Branch SDK to your `build.gradle`

        ```java hl_lines="30 31 33 34 35 36"
        apply plugin: 'com.android.application'

        android {
            compileSdkVersion 25
            buildToolsVersion "25.0.2"
            defaultConfig {
                applicationId "com.eneff.branch.example.android"
                minSdkVersion 15
                targetSdkVersion 25
                versionCode 1
                versionName "1.0"
                testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
            }
            buildTypes {
                release {
                    minifyEnabled false
                    proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
                }
            }
        }

        dependencies {
            compile fileTree(dir: 'libs', include: ['*.jar'])
            androidTestCompile('com.android.support.test.espresso:espresso-core:2.2.2', {
                exclude group: 'com.android.support', module: 'support-annotations'
            })
            compile 'com.android.support:appcompat-v7:25.2.0'
            compile 'com.android.support:design:25.2.0'

            // required
            compile 'io.branch.sdk.android:library:2.+'

            // optional
            compile 'com.android.support:customtabs:23.3.0' // Chrome Tab matching
            compile 'com.google.android.gms:play-services-ads:9+' // GAID matching
            compile 'com.google.android.gms:play-services-appindexing:9.+' // App indexing

            testCompile 'junit:junit:4.12'
        }
        ```

- ### Configure app

    - Add Branch to your `AndroidManifest.xml`

        ```xml hl_lines="9 17 26 27 28 29 30 31 32 34 35 36 37 38 39 40 44 45 46 47 49 50 51 52 53 54"
        <?xml version="1.0" encoding="utf-8"?>
        <manifest xmlns:android="http://schemas.android.com/apk/res/android"
            package="com.eneff.branch.example.android">

            <uses-permission android:name="android.permission.INTERNET" />

            <application
                android:allowBackup="true"
                android:name="com.eneff.branch.example.android.CustomApplicationClass"
                android:icon="@mipmap/ic_launcher"
                android:label="@string/app_name"
                android:supportsRtl="true"
                android:theme="@style/AppTheme">

                <activity
                    android:name=".MainActivity"
                    android:launchMode="singleTask"
                    android:label="@string/app_name"
                    android:theme="@style/AppTheme.NoActionBar">

                    <intent-filter>
                        <action android:name="android.intent.action.MAIN" />
                        <category android:name="android.intent.category.LAUNCHER" />
                    </intent-filter>

                    <!-- Branch URI Scheme -->
                    <intent-filter>
                        <data android:scheme="androidexample" />
                        <action android:name="android.intent.action.VIEW" />
                        <category android:name="android.intent.category.DEFAULT" />
                        <category android:name="android.intent.category.BROWSABLE" />
                    </intent-filter>

                    <!-- Branch App Links (optional) -->
                    <intent-filter android:autoVerify="true">
                        <action android:name="android.intent.action.VIEW" />
                        <category android:name="android.intent.category.DEFAULT" />
                        <category android:name="android.intent.category.BROWSABLE" />
                        <data android:scheme="https" android:host="example.app.link" />
                        <data android:scheme="https" android:host="example-alternate.app.link" />
                    </intent-filter>
                </activity>

                <!-- Branch init -->
                <meta-data android:name="io.branch.sdk.BranchKey" android:value="key_live_kaFuWw8WvY7yn1d9yYiP8gokwqjV0Sw" />
                <meta-data android:name="io.branch.sdk.BranchKey.test" android:value="key_test_hlxrWC5Zx16DkYmWu4AHiimdqugRYMr" />
                <meta-data android:name="io.branch.sdk.TestMode" android:value="false" /> <!-- Set to true to use Branch_Test_Key -->

                <!-- Branch install referrer tracking (optional) -->
                <receiver android:name="io.branch.referral.InstallListener" android:exported="true">
                    <intent-filter>
                        <action android:name="com.android.vending.INSTALL_REFERRER" />
                    </intent-filter>
                </receiver>

            </application>

        </manifest>
        ```

    - Replace the following with values from your [Branch Dashboard](https://dashboard.branch.io/account-settings/app)
        - `androidexample`
        - `example.app.link`
        - `key_live_kaFuWw8WvY7yn1d9yYiP8gokwqjV0Sw`
        - `key_test_hlxrWC5Zx16DkYmWu4AHiimdqugRYMr`

    !!! warning "Single Task launch mode required"
        If there is no singleTask Activity instance in the system yet, a new one would be created and simply placed on top of the stack in the same Task. If you are using the Single Task mode as is, it should not restart your entire app. The Single Task mode instantiates the Main/Splash Activity only if it does not exist in the Activity Stack. If the Activity exists in the background, every subsequent intent to the Activity just brings it to the foreground. You can read more about Single Task mode [here](https://developer.android.com/guide/components/activities/tasks-and-back-stack.html#TaskLaunchModes).

- ### Initialize Branch

    - Add Branch to your `MainActivity.java`

    - *Java*

        ```java hl_lines="3 9 14 16 17 31 32 33 34 35 36 37 38 39 40 41 44 45 46 47"
        package com.eneff.branch.example.android;

        import android.content.Intent;
        import android.os.Bundle;
        import android.support.design.widget.FloatingActionButton;
        import android.support.design.widget.Snackbar;
        import android.support.v7.app.AppCompatActivity;
        import android.support.v7.widget.Toolbar;
        import android.util.Log;
        import android.view.View;
        import android.view.Menu;
        import android.view.MenuItem;

        import org.json.JSONObject;

        import io.branch.referral.Branch;
        import io.branch.referral.BranchError;

        public class MainActivity extends AppCompatActivity {

            @Override
            protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                setContentView(R.layout.activity_main);
            }

            @Override
            public void onStart() {
                super.onStart();

                // Branch init
                Branch.getInstance().initSession(new Branch.BranchReferralInitListener() {
                    @Override
                    public void onInitFinished(JSONObject referringParams, BranchError error) {
                        if (error == null) {
                            Log.i("BRANCH SDK", referringParams.toString());
                        } else {
                            Log.i("BRANCH SDK", error.getMessage());
                        }
                    }
                }, this.getIntent().getData(), this);
            }

            @Override
            public void onNewIntent(Intent intent) {
                this.setIntent(intent);
            }
        }
        ```

    - *Kotlin*

        ```java hl_lines="3 9 14 16 17 29 30 31 32 33 34 35 36 37 38 41 42 43"
        package com.eneff.branch.example.android

        import android.content.Intent
        import android.os.Bundle
        import android.support.design.widget.FloatingActionButton
        import android.support.design.widget.Snackbar
        import android.support.v7.app.AppCompatActivity
        import android.support.v7.widget.Toolbar
        import android.util.Log
        import android.view.View
        import android.view.Menu
        import android.view.MenuItem

        import org.json.JSONObject

        import io.branch.referral.Branch
        import io.branch.referral.BranchError

        class MainActivity : AppCompatActivity() {

            override fun onCreate(savedInstanceState: Bundle?) {
                super.onCreate(savedInstanceState)
                setContentView(R.layout.activity_main)
            }

            override fun onStart() {
                super.onStart()

                // Branch init
                Branch.getInstance().initSession(object : BranchReferralInitListener {
                    override fun onInitFinished(referringParams: JSONObject, error: BranchError?) {
                        if (error == null) {
                            Log.e("BRANCH SDK", referringParams.toString)
                        } else {
                            Log.e("BRANCH SDK", error.message)
                        }
                    }
                }, this.intent.data, this)
            }

            public override fun onNewIntent(intent: Intent) {
                this.intent = intent
            }
        }
        ```

    !!! warning "Only initialize Branch in the Launcher activity"
        The app will open through the Launcher activity, where Branch will initialize and retrieve the deep link data from the link click.

    !!! warning "Always intialize Branch in `onStart()`"
        Initializing Branch in other Android lifecyle methods, like `onResume()`, will lead to unintended behavior. `onStart()` is what makes the activity visible to the user, as the app prepares for the activity to enter the foreground and become interactive. Learn more [here](https://developer.android.com/guide/components/activities/activity-lifecycle.html).

- ### Load Branch

    - Add Branch to your `CustomApplicationClass.java`

    - *Java*

        ```java hl_lines="4 11 12 14 15"
        package com.eneff.branch.example.android;

        import android.app.Application;
        import io.branch.referral.Branch;

        public class CustomApplicationClass extends Application {
            @Override
            public void onCreate() {
                super.onCreate();

                // Branch logging for debugging
                Branch.enableLogging();

                // Branch object initialization
                Branch.getAutoInstance(this);
            }
        }
        ```

    - *Kotlin*

        ```java hl_lines="4 10 11 13 14"
        package com.eneff.branch.example.android

        import android.app.Application
        import io.branch.referral.Branch

        class CustomApplicationClass : Application() {
            override fun onCreate() {
                super.onCreate()

                // Branch logging for debugging
                Branch.enableLogging()

                // Branch object initialization
                Branch.getAutoInstance(this)
            }
        }
        ```

- ### Test deep link

    - Create a deep link from the [Branch Dashboard](https://dashboard.branch.io/marketing)

    - Delete your app from the device

    - Compile your app to your device

    - Paste deep link in `Google Hangouts`

    - Click on the deep link to open your app

    !!! tip "Testing deferred deep linking"
    	Deferred deep linking is simply deep linking into an app that is not yet installed. Once the app is installed, the context is preserved and the user's first app-open will have the deep link data from the original Branch link. To test this, uninstall the app from your device, click the Branch link, and manually launch the app from Android Studio. You should be routed to the correct content within your app.

## Implement features

- ### Create content reference

    - The `Branch Universal Object` encapsulates the thing you want to share (content or user)

    - Uses the [Universal Object Properties](#/pages/links/integrate/#universal-object)

    - *Java*

        ```java
        BranchUniversalObject buo = new BranchUniversalObject()
            .setCanonicalIdentifier("content/12345")
            .setTitle("My Content Title")
            .setContentDescription("My Content Description")
            .setContentImageUrl("https://lorempixel.com/400/400")
            .setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)
            .setLocalIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)
            .setContentMetadata(new ContentMetadata().addCustomMetadata("key1", "value1"));
        ```

    - *Kotlin*

        ```java
        val buo = new BranchUniversalObject()
            .setCanonicalIdentifier("content/12345")
            .setTitle("My Content Title")
            .setContentDescription("My Content Description")
            .setContentImageUrl("https://lorempixel.com/400/400")
            .setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)
            .setLocalIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)
            .setContentMetadata(ContentMetadata().addCustomMetadata("key1", "value1"))
        ```

- ### Create deep link

    - Creates a deep link URL with encapsulated data

    - Needs a [Branch Universal Object](#create-content-reference)

    - Uses [Deep Link Properties](/pages/links/integrate/)

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/links)

    - *Java*

        ```java
        LinkProperties lp = new LinkProperties()
            .setChannel("facebook")
            .setFeature("sharing")
            .setCampaign("content 123 launch")
            .setStage("new user")
            .addControlParameter("$desktop_url", "http://example.com/home")
            .addControlParameter("custom", "data")
            .addControlParameter("custom_random", Long.toString(Calendar.getInstance().getTimeInMillis()));

        buo.generateShortUrl(this, lp, new Branch.BranchLinkCreateListener() {
            @Override
            public void onLinkCreate(String url, BranchError error) {
                if (error == null) {
                    Log.i("BRANCH SDK", "got my Branch link to share: " + url);
                }
            }
        });
        ```

    - *Kotlin*

        ```java
        val lp = new LinkProperties()
            .setChannel("facebook")
            .setFeature("sharing")
            .setCampaign("content 123 launch")
            .setStage("new user")
            .addControlParameter("$desktop_url", "http://example.com/home")
            .addControlParameter("custom", "data")
            .addControlParameter("custom_random", Long.toString(Calendar.getInstance().getTimeInMillis()))

        buo.generateShortUrl(this, lp, BranchLinkCreateListener { url, error ->
            if (error == null) {
                Log.i("BRANCH SDK", "got my Branch link to share: " + url)
            }
        })
        ```

- ### Share deep link

    -  Will generate a Branch deep link and tag it with the channel the user selects

    - Needs a [Branch Universal Object](#create-content-reference)

    - Uses [Deep Link Properties](/pages/links/integrate/)

    - *Java*

        ```java
        LinkProperties lp = new LinkProperties()
            .setChannel("facebook")
            .setFeature("sharing")
            .setCampaign("content 123 launch")
            .setStage("new user")
            .addControlParameter("$desktop_url", "http://example.com/home")
            .addControlParameter("custom", "data")
            .addControlParameter("custom_random", Long.toString(Calendar.getInstance().getTimeInMillis()));

        ShareSheetStyle ss = new ShareSheetStyle(MainActivity.this, "Check this out!", "This stuff is awesome: ")
            .setCopyUrlStyle(ContextCompat.getDrawable(this, android.R.drawable.ic_menu_send), "Copy", "Added to clipboard")
            .setMoreOptionStyle(ContextCompat.getDrawable(this, android.R.drawable.ic_menu_search), "Show more")
            .addPreferredSharingOption(SharingHelper.SHARE_WITH.FACEBOOK)
            .addPreferredSharingOption(SharingHelper.SHARE_WITH.EMAIL)
            .addPreferredSharingOption(SharingHelper.SHARE_WITH.MESSAGE)
            .addPreferredSharingOption(SharingHelper.SHARE_WITH.HANGOUT)
            .setAsFullWidthStyle(true)
            .setSharingTitle("Share With");

        buo.showShareSheet(this, lp,  ss,  new Branch.BranchLinkShareListener() {
            @Override
            public void onShareLinkDialogLaunched() {
            }
            @Override
            public void onShareLinkDialogDismissed() {
            }
            @Override
            public void onLinkShareResponse(String sharedLink, String sharedChannel, BranchError error) {
            }
            @Override
            public void onChannelSelected(String channelName) {
            }
        });
        ```

    - *Kotlin*

        ```java
        var lp = new LinkProperties()
            .setChannel("facebook")
            .setFeature("sharing")
            .setCampaign("content 123 launch")
            .setStage("new user")
            .addControlParameter("$desktop_url", "http://example.com/home")
            .addControlParameter("custom", "data")
            .addControlParameter("custom_random", Long.toString(Calendar.getInstance().getTimeInMillis()))

        var ss = new ShareSheetStyle(this@MainActivity, "Check this out!", "This stuff is awesome: ")
            .setCopyUrlStyle(resources.getDrawable(this, android.R.drawable.ic_menu_send), "Copy", "Added to clipboard")
            .setMoreOptionStyle(resources.getDrawable(this, android.R.drawable.ic_menu_search), "Show more")
            .addPreferredSharingOption(SharingHelper.SHARE_WITH.FACEBOOK)
            .addPreferredSharingOption(SharingHelper.SHARE_WITH.EMAIL)
            .addPreferredSharingOption(SharingHelper.SHARE_WITH.MESSAGE)
            .addPreferredSharingOption(SharingHelper.SHARE_WITH.HANGOUT)
            .setAsFullWidthStyle(true)
            .setSharingTitle("Share With")

        buo.showShareSheet(this, lp, ss, object : Branch.BranchLinkShareListener {
            override fun onShareLinkDialogLaunched() {}
            override fun onShareLinkDialogDismissed() {}
            override fun onLinkShareResponse(sharedLink: String, sharedChannel: String, error: BranchError) {}
            override fun onChannelSelected(channelName: String) {}
        })
        ```

- ### Read deep link

    - Retrieve Branch data from a deep link

    - Best practice to receive data from the `listener` (to prevent a race condition)

    - Returns [deep link properties](/pages/links/integrate/#read-deep-links)

    - *Java*

        ```java
        // listener (within Main Activity's onStart)
        Branch.getInstance().initSession(new Branch.BranchReferralInitListener() {
            @Override
            public void onInitFinished(JSONObject referringParams, BranchError error) {
                if (error == null) {
                    Log.i("BRANCH SDK", referringParams.toString());
                } else {
                    Log.i("BRANCH SDK", error.getMessage());
                }
            }
        }, this.getIntent().getData(), this);

        // latest
        JSONObject sessionParams = Branch.getInstance().getLatestReferringParams();

        // first
        JSONObject installParams = Branch.getInstance().getFirstReferringParams();
        ```

    - *Kotlin*

        ```java
        // listener (within Main Activity's onStart)
        Branch.getInstance().initSession(object : BranchReferralInitListener {
            override fun onInitFinished(referringParams: JSONObject, error: BranchError?) {
                if (error == null) {
                    Log.e("BRANCH SDK", referringParams.toString)
                } else {
                    Log.e("BRANCH SDK", error.message)
                }
            }
        }, this.intent.data, this)

        // latest
        val sessionParams = Branch.getInstance().latestReferringParams

        // first
        val installParams = Branch.getInstance().firstReferringParams
        ```

- ### Navigate to content

    - Do stuff with the Branch deep link data

    - *Java*

        ```java
        // listener (within Main Activity's onStart)
        Branch.getInstance().initSession(new Branch.BranchReferralInitListener() {
            @Override
            public void onInitFinished(JSONObject referringParams, BranchError error) {
                if (error == null) {
                    // option 1: log data
                    Log.i("BRANCH SDK", referringParams.toString());

                    // option 2: save data to be used later
                    SharedPreferences preferences = .getSharedPreferences("MyPreferences", Context.MODE_PRIVATE);
                    SharedPreferences.Editor editor = preferences.edit();
                    editor.putString("branchData", referringParams.toString(2));
                    editor.commit();

                    // option 3: navigate to page
                    Intent intent = new Intent(MainActivity.this, OtherActivity.class);
                    intent.putExtra("branchData", referringParams.toString(2));
                    startActivity(intent);

                    // option 4: display data
                    Toast.makeText(this, referringParams.toString(2), Toast.LENGTH_LONG).show();
                } else {
                    Log.i("BRANCH SDK", error.getMessage());
                }
            }
        }, this.getIntent().getData(), this);
        ```

    - *Kotlin*

        ```java
        // listener (within Main Activity's onStart)
        Branch.getInstance().initSession(object : BranchReferralInitListener {
            override fun onInitFinished(referringParams: JSONObject, error: BranchError?) {
                if (error == null) {
                    // option 1: log data
                    Log.i("BRANCH SDK", referringParams.toString())

                    // option 2: save data to be used later
                    val preferences =  getSharedPreferences("MyPreferences", Context.MODE_PRIVATE)
                    val editor = preferences.edit()
                    editor.putString("branchData", referringParams.toString(2))
                    editor.commit()

                    // option 3: navigate to page
                    val intent = Intent(this, MainActivity2::class.java)
                    intent.putExtra("branchData", referringParams.toString(2))
                    startActivity(intent)

                    // option 4: display data
                    Toast.makeText(this, referringParams.toString(2), Toast.LENGTH_SHORT).show()
                } else {
                    Log.e("BRANCH SDK", error.message)
                }
            }
        }, this.intent.data, this)
        ```

- ### Display content

    - List content on `Google Search` with `App Indexing`

    - Enable App Indexing on the [Branch Dashboard](#https://dashboard.branch.io/search)

    - Validate with the [App indexing validator](https://branch.io/resources/app-indexing/)

    - Needs a [Branch Universal Object](#create-content-reference)

    - Needs `build.gradle` library

        ```java
        compile 'com.google.android.gms:play-services-appindexing:9.+'
        ```

    - *Java*

        ```java
        buo.listOnGoogleSearch(this);
        ```

    - *Kotlin*

        ```java
        buo.listOnGoogleSearch(this)
        ```


- ### Track content

    - Track how many times a piece of content is viewed

    - Needs a [Branch Universal Object](#create-content-reference)

    - Uses [Track content properties](#track-content-properties)

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/content)

    - *Java*

        ```java
        new BranchEvent(BRANCH_STANDARD_EVENT.VIEW_ITEM).addContentItems(buo).logEvent(context);
        ```

    - *Kotlin*

        ```java
        BranchEvent(BRANCH_STANDARD_EVENT.VIEW_ITEM).addContentItems(buo).logEvent(context)
        ```

- ### Track users

    - Sets the identity of a user (email, ID, UUID, etc) for events, deep links, and referrals

    - `127` character max for user id

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/identities)

    - *Java*

        ```java
        // login
        Branch.getInstance().setIdentity("your_user_id");

        // logout
        Branch.getInstance().logout();
        ```

    - *Kotlin*

        ```java
        // login
        Branch.getInstance().setIdentity("your_user_id")

        // logout
        Branch.getInstance().logout()
        ```

- ### Track events

    - Registers a custom event

    - Events named `open`, `close`, `install`, and `referred session` are Branch restricted

    - `63` character max for event name

    - Best to [Track users](#track-users) before [Track events](#track-events) to associate a custom event to a user

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/events)

    - *Java*

        ```java
        // option 1:
        new BranchEvent("your_custom_event").logEvent(MainActivity.this);

        // option 2: with metadata
        new BranchEvent("your_custom_event")
                        .addCustomDataProperty("your_custom_key", "your_custom_value")
                        .logEvent(MainActivity.this);
        ```

    - *Kotlin*

        ```java
        // option 1:
        BranchEvent("your_custom_event").logEvent(context)

        // option 2: with metadata
        BranchEvent("your_custom_event")
                .addCustomDataProperty("your_custom_key", "your_custom_value")
                .logEvent(context)
        ```

- ### Track commerce

    - Registers a custom commerce event

    - Uses [Commerce properties](https://github.com/BranchMetrics/android-branch-deep-linking/blob/7fb24798d06f02a90acc3c73ec907dbb769caae1/Branch-SDK/src/io/branch/referral/util/CurrencyType.java) for `Currency` 
    
    - Uses [Commerce properties](https://github.com/BranchMetrics/android-branch-deep-linking/blob/65f8c34ccc6705331b50348f99a66a13da19cf8c/Branch-SDK/src/io/branch/referral/util/ProductCategory.java) for `Category`

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/commerce)

    - Ensure to add `revenue` field to track purchase. All other fields are optional

    - *Java*

        ```java
        BranchUniversalObject buo = new BranchUniversalObject()
            .setCanonicalIdentifier("myprod/1234")
            .setCanonicalUrl("https://test_canonical_url")
            .setTitle("test_title")
            .setContentMetadata(
                new ContentMetadata()
                .addCustomMetadata("custom_metadata_key1", "custom_metadata_val1")
                .addCustomMetadata("custom_metadata_key1", "custom_metadata_val1")
                .addImageCaptions("image_caption_1", "image_caption2", "image_caption3")
                .setAddress("Street_Name", "test city", "test_state", "test_country", "test_postal_code")
                .setRating(5.2, 6.0, 5)
                .setLocation(-151.67, -124.0)
                .setPrice(10.0, CurrencyType.USD)
                .setProductBrand("test_prod_brand")
                .setProductCategory(ProductCategory.APPAREL_AND_ACCESSORIES)
                .setProductName("test_prod_name")
                .setProductCondition(ContentMetadata.CONDITION.EXCELLENT)
                .setProductVariant("test_prod_variant")
                .setQuantity(1.5)
                .setSku("test_sku")
                .setContentSchema(BranchContentSchema.COMMERCE_PRODUCT))
                .addKeyWord("keyword1")
                .addKeyWord("keyword2");

        new BranchEvent(BRANCH_STANDARD_EVENT.ADD_TO_CART)
                .setAffiliation("test_affiliation")
                .setCoupon("Coupon Code")
                .setCurrency(CurrencyType.USD)
                .setDescription("Customer added item to cart")
                .setShipping(0.0)
                .setTax(9.75)
                .setRevenue(1.5)
                .setSearchQuery("Test Search query")
                .addCustomDataProperty("Custom_Event_Property_Key1", "Custom_Event_Property_val1")
                .addCustomDataProperty("Custom_Event_Property_Key2", "Custom_Event_Property_val2")
                .addContentItems(buo)
                .logEvent(context);
        ```

    - *Kotlin*

        ```java
        val buo = BranchUniversalObject()
                .setCanonicalIdentifier("myprod/1234")
                .setCanonicalUrl("https://test_canonical_url")
                .setTitle("test_title")
                .setContentMetadata(
                        ContentMetadata()
                                .addCustomMetadata("custom_metadata_key1", "custom_metadata_val1")
                                .addCustomMetadata("custom_metadata_key1", "custom_metadata_val1")
                                .addImageCaptions("image_caption_1", "image_caption2", "image_caption3")
                                .setAddress("Street_Name", "test city", "test_state", "test_country", "test_postal_code")
                                .setRating(5.2, 6.0, 5)
                                .setLocation(-151.67, -124.0)
                                .setPrice(10.0, CurrencyType.USD)
                                .setProductBrand("test_prod_brand")
                                .setProductCategory(ProductCategory.APPAREL_AND_ACCESSORIES)
                                .setProductName("test_prod_name")
                                .setProductCondition(ContentMetadata.CONDITION.EXCELLENT)
                                .setProductVariant("test_prod_variant")
                                .setQuantity(1.5)
                                .setSku("test_sku")
                                .setContentSchema(BranchContentSchema.COMMERCE_PRODUCT))
                .addKeyWord("keyword1")
                .addKeyWord("keyword2")

        BranchEvent(BRANCH_STANDARD_EVENT.ADD_TO_CART)
                .setAffiliation("test_affiliation")
                .setCoupon("Coupon Code")
                .setCurrency(CurrencyType.USD)
                .setDescription("Customer added item to cart")
                .setShipping(0.0)
                .setTax(9.75)
                .setRevenue(1.5)
                .setSearchQuery("Test Search query")
                .addCustomDataProperty("Custom_Event_Property_Key1", "Custom_Event_Property_val1")
                .addCustomDataProperty("Custom_Event_Property_Key2", "Custom_Event_Property_val2")
                .addContentItems(buo)
                .logEvent(this@MainActivity)
        ```

- ### Handle referrals

    - Referral points are obtained from referral rules on the [Branch Dashboard](https://dashboard.branch.io/referrals/rules)

    - Validate on the [Branch Dashboard](https://dashboard.branch.io/referrals/analytics)

    - Reward credits

        -  [Referral guide](/pages/dashboard/analytics/#referrals)

    - Redeem credits

        - *Java*

            ```java
            Branch.getInstance().redeemRewards(5);
            ```

        - *Kotlin*

            ```java
            Branch.getInstance().redeemRewards(5)
            ```

    - Load credits

        - *Java*

            ```java
            Branch.getInstance().loadRewards(new BranchReferralStateChangedListener() {
                @Override
                public void onStateChanged(boolean changed, Branch.BranchError error) {
                    int credits = branch.getCredits();
                }
            });
            ```

        - *Kotlin*

            ```java
            Branch.getInstance().loadRewards { changed, error ->
                if (error != null) {
                    Log.i("BRANCH SDK", "branch load rewards failed. Caused by -" + error.message)
                } else {
                    Log.i("BRANCH SDK", "changed = " + changed)
                    Log.i("BRANCH SDK", "rewards = " + branch.credits)
                }
            }
            ```

    - Load history

        - *Java*

            ```java
            Branch.getInstance().getCreditHistory(new BranchListResponseListener() {
                public void onReceivingResponse(JSONArray list, Branch.BranchError error) {
                    if (error != null) {
                        Log.i("BRANCH SDK", "branch load rewards failed. Caused by -" + error.message)
                    } else {
                        Log.i("BRANCH SDK", list);
                    }
                }
            });
            ```

        - *Kotlin*

            ```java
            Branch.getInstance().getCreditHistory { history, error ->
                if (error != null) {
                    Log.i("BRANCH SDK", "branch load credit history failed. Caused by -" + error.message)
                } else {
                    if (history.length() > 0) {
                        Log.i("BRANCH SDK", history.toString(2))
                    } else {
                        Log.i("BRANCH SDK", "no history found")
                    }
                }
            }
            ```

- ### Handle push notification

    - Deep link to content from GCM push notifications just by adding a Branch link to your result intent

    - *Java*

        ```java
        Intent resultIntent = new Intent(this, TargetClass.class);
        intent.putExtra("branch","http://xxxx.app.link/testlink");
        intent.putExtra("branch_force_new_session",true);
        PendingIntent resultPendingIntent =  PendingIntent.getActivity(this, 0, resultIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        ```

    - *Kotlin*

        ```java
        val resultIntent = Intent(this, TargetClass::class.java)
        intent.putExtra("branch", "http://xxxx.app.link/testlink")
        val resultPendingIntent = PendingIntent.getActivity(this, 0, resultIntent, PendingIntent.FLAG_UPDATE_CURRENT)
        intent.putExtra("branch_force_new_session", true)
        ```

- ### Handle links in your own app

    - Allows you to deep link into your own app from your app itself by launching a Chrome intent

    - *Java*

        ```java
        Intent intent = new Intent(this, ActivityToLaunch.class);
        intent.putExtra("branch","http://xxxx.app.link/testlink");
        intent.putExtra("branch_force_new_session",true);
        startActivity(intent);
        ```

    - *Kotlin*

        ```java
        val intent = Intent(this, ActivityToLaunch::class.java)
        intent.putExtra("branch", "http://xxxx.app.link/testlink")
        intent.putExtra("branch_force_new_session", true)
        startActivity(intent)
        ```
        
    - Replace "http://xxxx.app.link/testlink" with your own link URL

!!! warning
    Handling a new deep link in your app will clear the current session data and a new referred "open" will be attributed.

- ### Enable 100% matching

    - Uses `Chrome Tabs` to increase attribute matching success

    - Add `compile 'com.android.support:customtabs:23.3.0'` to your `build.gradle`

- ### Enable / Disable User Tracking

    If you need to comply with a user's request to not be tracked, utilize this field to prevent Branch from sending network requests. By calling the below function, this will persist at the SDK level.

    ```java
    Branch.getInstance().disableTracking(true);
    ```

    You can choose to call this throughout the lifecycle of the app. Once called, network requests will not be sent from the SDKs. Link generation will continue to work, but will not contain identifying information about the user. In addition, deep linking will continue to work, but will not track analytics for the user.


## Troubleshoot issues

- ### Sample testing apps

    - [Branchsters](https://github.com/BranchMetrics/Branch-Example-Deep-Linking-Branchster-Android)

    - [Testbed](https://github.com/BranchMetrics/android-branch-deep-linking/tree/master/Branch-SDK-TestBed)

- ### Simulate an install

    - Need to bypass the device's hardware_id

        - Set `true` in your `AndroidManifest.xml`

            ```xml
            <meta-data android:name="io.branch.sdk.TestMode" android:value="true" />
            ```
        - *[or]* add `Branch.enableTestMode();` before your `Branch.getInstance().initSession()`

        - Do not use `TestMode` in production or in the Google Play Store

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
                 <data android:scheme="https" android:host="bnc.lt" android:pathPrefix="/LVeu" />
                 <data android:scheme="https" android:host="bnc.lt" android:pathPrefix="/eVeu" />
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
                 <data android:scheme="https" android:host="your.app.com" android:pathPrefix="/LVeu" />
                 <data android:scheme="https" android:host="your.app.com" android:pathPrefix="/eVeu" />
            </intent-filter>
        </activity>
        ```

    - Change the following values to match your [Branch Dashboard](https://dashboard.branch.io/settings/link)

        - `/LVeu` (live)
        - `/eVeu` (test)
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
            if (requestCode === resources.getInteger(R.integer.AutoDeeplinkRequestCode)) {
                //Decide here where  to navigate  when an auto deep linked activity finishes.
                //For e.g. Go to HomeActivity or a  SignUp Activity.
                val i = Intent(applicationContext, CreditHistoryActivity::class.java)
                startActivity(i)
            }
        }
        ```

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

- ### Unable to open this link error

    - Happens whenever URI Scheme redirection fails.
    - Make sure you do not have `$deeplink_path` or you have a `$deeplink_path` which your `AndroidManifest.xml` can accept
