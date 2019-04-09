title: Android SDK Basic Integration

<div class="page-ul">
  <div class="page-li">
    <div class="page-active">
      <a href="/branch-android-sdk/basic-integration/">Basic Integration</a>
    </div>
  </div>
  <div class="page-li"><a href="/branch-android-sdk/advanced-features">Advanced Features</a></div>
  <div class="page-li"><a href="/branch-android-sdk/testing">Testing</a></div>
  <div class="page-li"><a href="/branch-android-sdk/troubleshooting">Troubleshooting</a></div>
  <div class="page-li"><a href="/branch-android-sdk/version-history">Version History</a></div>
  <div class="page-li"><a href="/branch-android-sdk/full-reference">Full Reference</a></div>
</div>

!!! info "Current SDK Version 3.1.0"
    Please see the [Android SDK Version History](/branch-android-sdk/version-history) to view change log.

## Integrate Branch

- ### Configure Branch

    - [Configure the default link settings](/links/default-link-behavior/) for your app

    - Make sure `Always try to open app` and `I have an Android App` are both enabled

        ![image](/_assets/img/pages/dashboard/android.png)

- ### Install Branch

    - Import the Branch SDK to your `build.gradle`

        ```java hl_lines="30 31 33 34 35 36"
        apply plugin: 'com.android.application'

        android {
            compileSdkVersion 25
            buildToolsVersion "25.0.2"
            defaultConfig {
                applicationId "com.eneff.branch.example.android"
                minSdkVersion 16
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
            implementation fileTree(dir: 'libs', include: ['*.jar'])
            androidTestImplementation ('com.android.support.test.espresso:espresso-core:2.2.2', {
                exclude group: 'com.android.support', module: 'support-annotations'
            })
            implementation 'com.android.support:appcompat-v7:25.2.0'
            implementation 'com.android.support:design:25.2.0'

            // required
            implementation 'io.branch.sdk.android:library:3.+'

            // optional
            implementation 'com.android.support:customtabs:23.3.0' // Chrome Tab matching
            implementation 'com.google.android.gms:play-services-ads:9+' // GAID matching
            implementation 'com.google.android.gms:play-services-appindexing:9.+' // App indexing

            testImplementation 'junit:junit:4.12'
        }
        ```

!!! warning "Google Mobile Ads SDK 17+"
    If you decide to implement the Google Mobile Ads SDK version 17+, you have to declare your app is an Ad Manager app. See [Google Developer Docs](https://developers.google.com/ad-manager/mobile-ads-sdk/android/quick-start#update_your_androidmanifestxml) on how to do so. Failure to add this <meta-data> tag results in a crash with the message: "The Google Mobile Ads SDK was initialized incorrectly."


- ### Configure app

    - Add Branch to your `AndroidManifest.xml`

        ```xml hl_lines="18 26 27 28 29 30 31 32 33 35 36 37 38 39 40 41 42 44 45 46 47 48 50 51 52 53 54 55"
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

                <!-- Launcher Activity to handle incoming Branch intents -->
                <activity
                    android:name=".LauncherActivity"
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

    - Replace the following with values from your Branch Dashboard [App settings](https://dashboard.branch.io/account-settings/app) and [Link settings](https://dashboard.branch.io/link-settings)
        - `androidexample`
        - `example.app.link`
        - `example-alternate.app.link`
        - `key_live_kaFuWw8WvY7yn1d9yYiP8gokwqjV0Sw`
        - `key_test_hlxrWC5Zx16DkYmWu4AHiimdqugRYMr`

    !!! warning "Google Play App Install Referrer API"
        Branch can use the [Google Play App Install Referrer API](https://developer.android.com/google/play/installreferrer/library.html) to return the Install Referrer click timestamp and the install-begin timestamp. Please make sure you include the `Branch install referrer tracking (optional)` receiver in the AndroidManifest.xml file as per the above code sample.

    !!! warning "Single Task launch mode required"
        If there is no singleTask Activity instance in the system yet, a new one would be created and simply placed on top of the stack in the same Task. If you are using the Single Task mode as is, it should not restart your entire app. The Single Task mode instantiates the Main/Splash Activity only if it does not exist in the Activity Stack. If the Activity exists in the background, every subsequent intent to the Activity just brings it to the foreground. You can read more about Single Task mode [here](https://developer.android.com/guide/components/activities/tasks-and-back-stack.html#TaskLaunchModes).

- ### Initialize Branch

    - Add Branch to your `LauncherActivity.java`

    - *Java*

        ```java hl_lines="16 17 31 32 33 34 35 36 37 38 39 40 41 42 43 46 47 48 49"
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

        public class LauncherActivity extends AppCompatActivity {

            @Override
            protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                setContentView(R.layout.activity_launcher);
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
                            // Retrieve deeplink keys from 'referringParams' and evaluate the values to determine where to route the user
                            // Check '+clicked_branch_link' before deciding whether to use your Branch routing logic
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

        ```java hl_lines="16 17 29 30 31 32 33 34 35 36 37 38 39 40 43 44 45"
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

        class LauncherActivity : AppCompatActivity() {

            override fun onCreate(savedInstanceState: Bundle?) {
                super.onCreate(savedInstanceState)
                setContentView(R.layout.activity_launcher)
            }

            override fun onStart() {
                super.onStart()

                // Branch init
                Branch.getInstance().initSession(object : BranchReferralInitListener {
                    override fun onInitFinished(referringParams: JSONObject, error: BranchError?) {
                        if (error == null) {
                            Log.e("BRANCH SDK", referringParams.toString)
                            // Retrieve deeplink keys from 'referringParams' and evaluate the values to determine where to route the user
                            // Check '+clicked_branch_link' before deciding whether to use your Branch routing logic
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
                Branch.enableDebugMode();

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
                Branch.enableDebugMode()

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
