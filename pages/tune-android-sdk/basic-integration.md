title: Android SDK Basic Integration

<div class="page-ul">
  <div class="page-li">
    <div class="page-active">
      <a href="/tune-android-sdk/basic-integration/">Basic Integration</a>
    </div>
  </div>
  <div class="page-li"><a href="/tune-android-sdk/advanced-features">Advanced Features</a></div>
  <div class="page-li"><a href="/tune-android-sdk/testing">Testing</a></div>
  <div class="page-li"><a href="/tune-android-sdk/troubleshooting">Troubleshooting</a></div>
  <div class="page-li"><a href="/tune-android-sdk/version-history">Version History</a></div>
  <div class="page-li"><a href="/tune-android-sdk/full-reference">Full Reference</a></div>
</div>

!!! info "Current SDK Version 6.1.1"
    Please see the [Android SDK Version History](/tune-android-sdk/version-history) to view change log.

The TUNE SDK for the native Android™ platform provides application session and event logging functionality.

The TUNE SDK for Android is available in the form of a gradle dependency. Our SDK is compatible with all Android devices running Android [API 14](https://developer.android.com/guide/topics/manifest/uses-sdk-element.html#ApiLevels) and above and is approximately 128 KB in size.

If you are migrating from an SDK version that includes now deprecated In-App Marketing capabilities, please follow [Migrating from 5.X.X to 6.X.X](/sdk/migrating-from-5-x-x-to-6-x-x/).

## Installing the SDK with Gradle

Install via the TUNE jCenter distribution:

1.  Ensure that jCenter is included as a repository in your Gradle file:

```
buildscript {
    repositories {
        [...]
        jcenter()
    }
    [...]
}
```

2.  Add the following line to your Gradle dependency stanza:

```
api 'com.tune:tune-marketing-console-sdk:6.0.3'
```

This automatically adds the TUNE SDK to your project.

Note: To manually install the TUNE Android SDK via the AAR distribution, please follow [these instructions](/sdk/manually-installing-android-sdk-aar/).

## Code Changes

### Google Play Services

Install the [Google Play Services SDK](http://developer.android.com/google/play-services/setup.html) and import it into your project in order for the SDK to collect the [Google Advertising ID](https://support.google.com/googleplay/android-developer/answer/6048248). If you’re using Gradle, you may choose to add only the ads library to your dependencies:

```
implementation 'com.google.android.gms:play-services-ads:X.X.X'
```

Replace X.X.X with the latest version from [https://developers.google.com/android/guides/setup](https://developers.google.com/android/guides/setup "Follow link"). You can use any version of Google Play Services greater than 4.0.0

**Notes:**

*   When integrating the TUNE Android SDK, it's required that you set your `compileSDKVersion` to at least 27\. It's NOT required to update your `targetSDKVersion`.
    *   Always compile against that latest Android version even if you don't increase your `targetSDKVersion`. More information about these gradle properties on [https://developer.android.com/studio/build/index.html#module-level](https://developer.android.com/studio/build/index.html#module-level "Follow link").
*   If you are already including the full Google Play Services library (`implementation 'com.google.android.gms:play-services:X.X.X'`) then you do not need to add the `-basement` subpackage.

### ProGuard

If using [ProGuard](http://developer.android.com/tools/help/proguard.html), exclude the TUNE and Google Advertising ID classes from obfuscation in your ProGuard configuration file with the following lines:  

```
-keep public class com.google.android.gms.ads.identifier.** { *; }
```

To further reduce the size of the SDK, you can:

```
-assumenosideeffects class android.util.Log {
    public static boolean isLoggable(java.lang.String, int);
    public static int v(...);
    public static int d(...);
}
```

If you wish to do further optimization, view our article on [Avoiding the Dalvik 65K Method Limit](/sdk/avoiding-the-dalvik-65k-method-limit/).

### Android Manifest File

Add the following sections to your <tt>AndroidManifest.xml</tt> file:

```
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>     
<application ... >        
    <receiver android:name="com.tune.TuneTracker">        
        <intent-filter>       
            <action android:name="com.android.vending.INSTALL_REFERRER" />        
        </intent-filter>
    </receiver>
</application>
```

**Things to Keep In Mind**:

*   TUNE uses the BroadcastReceiver for attribution if your application is running a TUNE SDK version below 4.15.0 and therefore cannot rely on the [Google Play App Install Referrer API](https://developer.android.com/google/play/installreferrer/library.html) to return the Install Referrer plus timestamp.
*   If you have multiple SDKs implemented in your Android app that do install attribution, then you may have multiple Android INSTALL_REFERRER receivers as described at [Multiple Android Install Referrers](/sdk/using-multiple-android-install-referrers/).
*   To ensure that the INSTALL_REFERRER is collected properly, please visit our [Testing the Google Play Install Referrer](/sdk/testing-the-google-play-install-referrer/) article.

### Initialize TUNE SDK

Create a new [Application](http://developer.android.com/reference/android/app/Application.html) class, or update an existing class, to extend from `TuneApplication`, and initialize the TUNE SDK:

```
import com.tune.Tune;
import com.tune.application.TuneApplication;

public class MyApplication extends TuneApplication {
    @Override
    public void onCreate() {
        super.onCreate();

        // Initialize TMC
        Tune.init(this, "your_advertiser_ID", "your_conversion_key");
    }
}
```

**Note:** The “_your_advertiser_ID_” and the “_your_conversion_key_” values correlate with the Advertiser ID and Conversion Key that TUNE provides when you created your Mobile App in TMC. For information about the advertiser ID and conversion key, please see our article [Finding Advertiser ID and Conversion Key](/sdk/finding-your-advertiser-id-and-conversion-key/).

If your **Application** class already extends another class, you may instead call `registerActivityLifecycleCallbacks` with `TuneActivityLifecycleCallbacks` after `Tune.init` :

```
import com.tune.Tune;
import com.tune.application.TuneActivityLifecycleCallbacks;

public class MyApplication extends SomeOtherClass {
    @Override
    public void onCreate() {
        super.onCreate();

        // Initialize TMC
        Tune.init(this, "your_advertiser_ID", "your_conversion_key");

        if (Build.VERSION.SDK_INT >= 14) {
            // Make sure you register this AFTER Tune.init
            registerActivityLifecycleCallbacks(new TuneActivityLifecycleCallbacks());
        }
    }
}
```

Modify the **AndroidManifest.xml** by adding an `android:name` field to the `<application>` tag in order to use the custom **Application** you created (unless already set).

```
<application
    android:name=".MyApplication" />
```


## Testing & Troubleshooting

*   To test the TUNE SDK implementation in your mobile app, you can do so straight from the Attribution Analytics platform itself rather than creating a test environment. Please visit our [Testing Your Mobile App](/sdk/testing-your-mobile-app/) article.
*   Setting a TuneListener in your app can be useful for when you are integrating the SDK and want to make sure that events are being measured and transmitted correctly. Please visit our [Reading Server Responses](/sdk/reading-server-responses/#code-platform-android).
*   If your app already has a pre-existing user base (people who have already installed your app), TUNE has several options to flag these users as Pre-Existing Users to prevent attributing these users to a marketing partner. For information about migrating existing users, please visit [handle existing users prior to SDK implementation](http://developers.tune.com/sdk/handling-existing-users-prior-to-sdk-implementation/).

## Measuring Events

After you implement the TUNE SDK in your mobile app and start logging sessions, you can move on to logging a wide variety of in-app events such as registrations and in-app purchases.

The Tune SDK natively supports measurement of the following [In-App events](/sdk/measuring-in-app-events/).

To build your own custom event, please visit our [Event Builder](/sdk/event-builder/) article.
