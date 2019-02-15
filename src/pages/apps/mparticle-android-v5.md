This documentation explains how to send **mParticle events to your Branch dashboard**. If you'd like to send Branch installs to your mParticle dashboard, please review the [Branch/mParticle Data Integration](/pages/integrations/mparticle).

!!! info "These instructions apply to the mParticle SDK version 5+ integration"
    mParticle introduced a new attribution & deep linking API in v5 of their SDK (http://docs.mparticle.com/developers/sdk/android/getting-started/#upgrade-to-version-5-of-the-sdk), so please contact your Branch or mParticle Account Managers for more details, if you have mParticle SDK <v5 installed in your app.

## Technical Requirements

- [mParticle SDK for Android](https://docs.mparticle.com/developers/sdk/android/getting-started/)
- [mParticle Branch Kit](https://github.com/mparticle-integrations/mparticle-android-integration-branchmetrics)
- [Retrieve Deep Link Data via mParticle](http://docs.mparticle.com/developers/sdk/android/kits#deep-linking)
- [Enable App Links in Branch](https://docs.branch.io/pages/deep-linking/android-app-links/#add-intent-filter-to-manifest)

## Branch Setup

### Configure Branch

- Complete your [Branch Dashboard](https://dashboard.branch.io/settings/link)

    ![image](/img/pages/dashboard/android.png)
    ![image](/img/pages/dashboard/link-domain.png)

## mParticle Setup

### Install the mParticle Branch Kit

- [mParticle Github](https://github.com/mparticle-integrations/mparticle-android-integration-branchmetrics)

#### Import the Android Support Libraries

- `'com.android.support:appcompat-v7:25.2.0'`
- `'com.android.support:design:25.2.0'`
- `'io.branch.sdk.android:library:3.+'`
- `'com.android.support:customtabs:23.3.0'`
- `'com.google.android.gms:play-services-ads:9+'`
- `'com.google.android.gms:play-services-appindexing:9.+'`

### Initializing Branch in the mParticle Kit

As with any kit, mParticle will automatically handle initializing Branch sessions. Please ensure `mParticle.start()` is called in your Android Application class (this should already be accounted for in your base mParticle integration).

!!! warning ""
    mParticle’s `ReferrerReceiver` should be registered in the `Android Manifest`.

### Enable Branch on mParticle

- Before you can enable Branch in your mParticle dashboard, you must retrieve your Branch Key on the [Link Settings](https://dashboard.branch.io/settings/link) page of your Branch dashboard.

- Please follow mParticle's documentation on how to [Connect an Event Output](https://docs.mparticle.com/guides/getting-started/connect-an-event-output/); i.e. enable the Branch integration.

Once you have added the kit and configured your branch API key in the mParticle dashboard, the mParticle SDKs will take care of initializing the Branch SDK and forwarding the appropriate application lifecycle events to handle deep links.

At this point you should start seeing your Branch session data - including installs, re-opens, and any custom events - in your Branch dashboard.

### Test deep link

- Create a deep link from the [Branch Dashboard](https://dashboard.branch.io/marketing)

- Delete your app from the device

- Compile your app to your device

- Paste deep link in `Google Hangouts`

- Click on the deep link to open your app

## Implementing features

Please refer to mParticle's [marking direct calls to kits]( https://docs.mparticle.com/developers/sdk/ios/kits/#making-direct-calls-to-kits) documentation for how to access the kit via the mParticle SDK.

Please refer to Branch's [native iOS SDK](/pages/apps/ios/#implement-features) documentation for how to implement secondary functionality.

## Troubleshooting

### Sample testing apps

- [Branchsters](https://github.com/BranchMetrics/Branch-Example-Deep-Linking-Branchster-Android)

- [Testbed](https://github.com/BranchMetrics/android-branch-deep-linking/tree/master/Branch-SDK-TestBed)

### Simulate an install

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

### Track content properties

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

### Using bnc.lt or a custom link domain

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

### Generate signing certificate

- Used for Android `App Link` deep linking

- Navigate to your keystore file

- Run `keytool -list -v -keystore my-release-key.keystore`

- Will generate a value like `AA:C9:D9:A5:E9:76:3E:51:1B:FB:35:00:06:9B:56:AC:FB:A6:28:CE:F3:D6:65:38:18:E3:9C:63:94:FB:D2:C1`

- Copy this value to your [Branch Dashboard](https://dashboard.branch.io/link-settings)

### Enable multidexing

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

### InvalidClassException, ClassLoadingError or VerificationError

- Often caused by a `Proguard` bug. Try the latest Proguard version or disable Proguard optimization by setting `-dontoptimize`

### Proguard warning or errors with AppIndexing module

- The Branch SDK has an optional dependency on Firebase app indexing classes to provide new Firebase content listing
    features. This may cause a proguard warning depending on your proguard settings. Please add the following to your
    proguard file to solve this issue `-dontwarn com.google.firebase.appindexing.**`.

### Unable to open this link error

- Happens whenever URI Scheme redirection fails.
- Make sure you do not have `$deeplink_path` or you have a `$deeplink_path` which your `AndroidManifest.xml` can accept
