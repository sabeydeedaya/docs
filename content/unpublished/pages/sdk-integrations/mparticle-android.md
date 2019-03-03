## Integrate Branch

This documentation explains how to send **mParticle events to your Branch dashboard**. If you'd like to send Branch installs to your mParticle dashboard, please review the [Branch/mParticle Data Integration](/pages/integrations/mparticle).

!!! warning "These instructions apply to any integration below mParticle SDK version 5"
    mParticle introduced a new attribution & deep linking API in v5 of their SDK (http://docs.mparticle.com/developers/sdk/android/getting-started/#upgrade-to-version-5-of-the-sdk), so please contact your Branch or mParticle Account Managers for more details, if you have mParticle SDK v5+ installed in your app.

- ### Configure Branch

    - Complete your [Branch Dashboard](https://dashboard.branch.io/settings/link)

        ![image](/img/pages/dashboard/android.png)
        ![image](/img/pages/dashboard/link-domain.png)

- ### Install Branch

    - Import the Branch SDK to your `build.gradle`

        ```java hl_lines="32"
        apply plugin: 'com.android.application'

        android {
            compileSdkVersion 25
            buildToolsVersion "25.0.2"
            defaultConfig {
                applicationId "com.eneff.branchandroid"
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

            compile 'com.mparticle:android-core:4.+'

            compile 'com.mparticle:android-branch-kit:4+'
        }
        ```

- ### Enable Branch on mParticle

    - Retrieve your Branch Key on the [App Settings](https://dashboard.branch.io/account-settings/app) page of the Branch dashboard.
    - From your [mParticle dashboard](https://app.mparticle.com/) navigate to the Services page. (The paper airplane icon on the left side)
    - Scroll down to the Branch tile, or enter Branch in the search bar.
    - Click on the Branch tile and then select "Activate a Platform".
    - Click on the Android icon, then toggle the status ON.
    - Enter your Branch key in the marked field and click "Save".

- ### Configure app

    - Add Branch to your `AndroidManifest.xml`

        ```xml hl_lines="9 17 26 27 28 29 30 31 32 34 35 36 37 38 39 40"
        <?xml version="1.0" encoding="utf-8"?>
        <manifest xmlns:android="http://schemas.android.com/apk/res/android"
            package="com.eneff.branchandroid">

            <uses-permission android:name="android.permission.INTERNET" />

            <application
                android:allowBackup="true"
                android:name="com.eneff.branchandroid.CustomApplicationClass"
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
                        <data android:scheme="branchandroid" />
                        <action android:name="android.intent.action.VIEW" />
                        <category android:name="android.intent.category.DEFAULT" />
                        <category android:name="android.intent.category.BROWSABLE" />
                    </intent-filter>

                    <!-- Branch App Links (optional) -->
                    <intent-filter android:autoVerify="true">
                        <action android:name="android.intent.action.VIEW" />
                        <category android:name="android.intent.category.DEFAULT" />
                        <category android:name="android.intent.category.BROWSABLE" />
                        <data android:scheme="https" android:host="uobg.app.link" />
                    </intent-filter>
                </activity>

            </application>

        </manifest>
        ```

    - Replace the following with values from your [Branch Dashboard](https://dashboard.branch.io/settings/link)
        - `branchandroid`
        - `uobg.app.link`

- ### Handle Incoming Links

    Open the `Activity` for which you registered the `Intent Filter` in the previous section, and hook into the `onStart` lifecycle method by adding this override:

    ```java hl_lines="3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20"
    @Override
    public void onStart() {
      MParticle.getInstance().checkForDeepLink(new DeepLinkListener() {
        @Override
        public void onResult(DeepLinkResult result) {
          // Check for the existence of a given key in the link data and route accordingly.
          try {
            if ((result.getParameters().has("my_custom_key")) && (result.getParameters().get("my_custom_key").equals("custom value"))) {
              // Send user to intended path
            }
          } catch (JSONException e) {
          }
        }

        @Override
        public void onError(DeepLinkError error) {
          // If an error occurred, it will be surfaced via a DeepLinkError.
          Log.d("my log tag", error.toString());
        }
      });
    }
    ```

- ### Initialize Branch

    As with any kit, mParticle will automatically handle initializing Branch sessions. However, to ensure all possible use cases are accounted for, ensure MParticle.start() is called in your Application class (this should already be accounted for in your base mParticle integration). At this point you should start seeing your Branch session data - including installs, re-opens, and any custom events - in your Branch dashboard.

- ### Test deep link

    - Create a deep link from the [Branch Dashboard](https://dashboard.branch.io/marketing)

    - Delete your app from the device

    - Compile your app to your device

    - Paste deep link in `Google Hangouts`

    - Click on the deep link to open your app

## Implement features

- ### Create content reference

    ```java
    BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
        // The identifier is what Branch will use to de-dupe the content across many different Universal Objects
       .setCanonicalIdentifier("item/12345")

       // The canonical URL for SEO purposes (optional)
       .setCanonicalUrl("https://branch.io/deepviews")

       // This is where you define the open graph structure and how the object will appear on Facebook or in a deepview
       .setTitle("My Content Title")
       .setContentDescription("My Content Description")
       .setContentImageUrl("https://example.com/mycontent-12345.png")

       // You use this to specify whether this content can be discovered publicly - default is public
       .setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)

        // Here is where you can add custom keys/values to the deep link data
       .setContentMetadata(new ContentMetadata().addCustomMetadata("property1", "blue")
            .addCustomMetadata("property2", "red"));
    ```

- ### Create deep link

    ```java
    LinkProperties linkProperties = new LinkProperties()
       .setChannel("facebook")
       .setFeature("sharing")
       .addControlParameter("$desktop_url", "http://example.com/home")
       .addControlParameter("$ios_url", "http://example.com/ios");

    branchUniversalObject.generateShortUrl(this, linkProperties, new     BranchLinkCreateListener() {
        @Override
        public void onLinkCreate(String url, BranchError error) {
           if (error == null) {
               Log.i("MyApp", "got my Branch link to share: " + url);
           }
        }
    });
    ```

- ### Share deep link

    ```java
    ShareSheetStyle shareSheetStyle = new ShareSheetStyle(MainActivity.this, "Check this out!", "This stuff is awesome: ")
        .setCopyUrlStyle(getResources().getDrawable(android.R.drawable.ic_menu_send), "Copy", "Added to clipboard")
        .setMoreOptionStyle(getResources().getDrawable(android.R.drawable.ic_menu_search), "Show more")
        .addPreferredSharingOption(SharingHelper.SHARE_WITH.FACEBOOK)
        .addPreferredSharingOption(SharingHelper.SHARE_WITH.EMAIL)
        .setAsFullWidthStyle(true)
        .setSharingTitle("Share With");

    branchUniversalObject.showShareSheet(this,
                                          linkProperties,
                                          shareSheetStyle,
                                           new Branch.BranchLinkShareListener() {
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

- ### Read deep link

    - Retrieve Branch data from a deep link

    - Best practice to receive data from the `listener` (to prevent a race condition)

    - Returns [deep link properties](/pages/links/integrate/#read-deep-links)

        ```java
        @Override
        public void onStart() {
          MParticle.getInstance().checkForDeepLink(new DeepLinkListener() {
            @Override
            public void onResult(DeepLinkResult result) {
              try {
                Log.d("BRANCH SDK", result.getParameters.toString());
              } catch (JSONException e) {
              }
            }

            @Override
            public void onError(DeepLinkError error) {
              // If an error occurred, it will be surfaced via a DeepLinkError.
              Log.d("BRANCH SDK", error.toString());
            }
          });
        }
        ```

- ### Navigate to content

    - Do stuff with the Branch deep link data.

        ```java
        @Override
        public void onStart() {
          MParticle.getInstance().checkForDeepLink(new DeepLinkListener() {
            @Override
            public void onResult(DeepLinkResult result) {
              try {
                JSONObject referringParams = result.getParameters();

                // Option 1: Log data
                Log.i("BRANCH SDK", referringParams.toString());

                // Option 2: Save data to be used later
                SharedPreferences preferences = .getSharedPreferences("MyPreferences", Context.MODE_PRIVATE);
                SharedPreferences.Editor editor = preferences.edit();
                editor.putString("branchData", referringParams.toString(2));
                editor.commit();

                // Option 3: Navigate to page
                Intent intent = new Intent(MainActivity.this, OtherActivity.class);
                intent.putExtra("branchData", referringParams.toString(2));
                startActivity(intent);

                // Option 4: Display data
                Toast.makeText(this, referringParams.toString(2), Toast.LENGTH_LONG).show();
              } catch (JSONException e) {
              }
            }

            @Override
            public void onError(DeepLinkError error) {
              // If an error occurred, it will be surfaced via a DeepLinkError.
              Log.d("BRANCH SDK", error.toString());
            }
          });
        }
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

    - Call method on Branch Universal Object

        ```java
        buo.listOnGoogleSearch(this);
        ```


- ### Track content

    - Track how many times a piece of content is viewed

    - Needs a [Branch Universal Object](#create-content-reference)

    - Uses [Track content properties](#track-content-properties)

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/content)

        ```java
        // Option 1 - track with Branch SDK:
        BranchEvent(BRANCH_STANDARD_EVENT.VIEW_ITEM).addContentItems(buo).logEvent(context);

        // Option 2 - track with mParticle SDK:
        MParticle.getInstance().logScreen("screen_name", eventInfo);
        ```

- ### Track users

    ```java
    // Your user ID should not exceed 127 characters.
    // The IdentityType CustomerId will automatically propagate to Branch.
    MParticle.getInstance().setUserIdentity(MParticle.IdentityType.CustomerId, "your_user_id");
    ```

    ```java
    MParticle.getInstance().logout();
    ```

- ### Track events

    - Registers a custom event

    - Events named `open`, `close`, `install`, and `referred session` are Branch restricted

    - `63` character max for event name

    - Best to [Track users](#track-users) before [Track events](#track-events) to associate a custom event to a user

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/events)

    ```java
    // Option 1:
    MParticle.getInstance().logEvent(new MPEvent.Builder("your_custom_event", mpEventType));

    // Option 2: with metadata
    Map<String, String> metaData = new HashMap<>();
    metaData.put("key", "value");
    MParticle.getInstance().logEvent(new MPEvent.Builder("your_custom_event", mpEventType).info(metaData));
    ```

- ### Track commerce

    - Registers a custom commerce event

    - Uses [Commerce properties](https://github.com/BranchMetrics/android-branch-deep-linking/blob/7fb24798d06f02a90acc3c73ec907dbb769caae1/Branch-SDK/src/io/branch/referral/util/CurrencyType.java) for `Currency` 
    
    - Uses [Commerce properties](https://github.com/BranchMetrics/android-branch-deep-linking/blob/65f8c34ccc6705331b50348f99a66a13da19cf8c/Branch-SDK/src/io/branch/referral/util/ProductCategory.java) for `Category`

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/commerce)

    - Ensure to add `revenue` field to track purchase. All other fields are optional

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

- ### Handle referrals

    - Referral points are obtained from referral rules on the [Branch Dashboard](https://dashboard.branch.io/referrals/rules)

    - Validate on the [Branch Dashboard](https://dashboard.branch.io/referrals/analytics)

    - Reward credits

        -  [Referral guide](/pages/dashboard/analytics/#referrals)

    - Redeem credits

        ```java
        Branch.getInstance().redeemRewards(5);
        ```

    - Load credits

        ```java
        Branch.getInstance().loadRewards(new BranchReferralStateChangedListener() {
            @Override
            public void onStateChanged(boolean changed, Branch.BranchError error) {
                int credits = branch.getCredits();
            }
        });
        ```

    - Load history

        ```java
        Branch.getInstance().getCreditHistory(new BranchListResponseListener() {
            public void onReceivingResponse(JSONArray list, Branch.BranchError error) {
                if (error != null) {
                    Log.i("BRANCH SDK", "Branch load rewards failed. Caused by -" + error.message)
                } else {
                    Log.i("BRANCH SDK", list);
                }
            }
        });
        ```

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

        - Do not use `TestMode` in production or in the Google Play Store

    - Uninstall your app from the device

    - Click on any Branch deep link (will navigate to the fallback URL since the app is not installed)

    - Reinstall your app

    - Read deep link data from `MParticle.getInstance().checkForDeepLink()` for `+is_first_session=true`

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
        
- ### Generate signing certificate

    - Used for Android `App Link` deep linking

    - Navigate to your keystore file

    - Run `keytool -list -v -keystore my-release-key.keystore`

    - Will generate a value like `AA:C9:D9:A5:E9:76:3E:51:1B:FB:35:00:06:9B:56:AC:FB:A6:28:CE:F3:D6:65:38:18:E3:9C:63:94:FB:D2:C1`

    - Copy this value to your [Branch Dashboard](https://dashboard.branch.io/link-settings)

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

- ### Proguard warning or errors with AppIndexing module

    - The Branch SDK has an optional dependency on Firebase app indexing classes to provide new Firebase content listing
        features. This may cause a proguard warning depending on your proguard settings. Please add the following to your
        proguard file to solve this issue `-dontwarn com.google.firebase.appindexing.**`.

- ### Unable to open this link error

    - Happens whenever URI Scheme redirection fails.
    - Make sure you do not have `$deeplink_path` or you have a `$deeplink_path` which your `AndroidManifest.xml` can accept
