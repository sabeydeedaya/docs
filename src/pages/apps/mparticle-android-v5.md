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

- Configure your [Branch Dashboard](https://dashboard.branch.io/settings/link)

    ![image](/img/pages/dashboard/android.png)
    ![image](/img/pages/dashboard/link-domain.png)

- Add the following intent filter for the Branch URI scheme to your Android Manifest
  ```
  <!-- Branch URI Scheme -->
            <intent-filter>
                <data android:scheme="androidexample" />
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
            </intent-filter>
  ```

- Add the following intent filter for the Branch app.link domains to your Android manifest
  ```
  <!-- Branch App Links (optional) -->
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="https" android:host="example.app.link" />
                <data android:scheme="https" android:host="example-alternate.app.link" />
            </intent-filter>
  ```

- Add `android:launchMode="singleTask"` to the `LauncherActivity`
  ```
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
  ```

## mParticle Setup

### Install the mParticle Branch Kit

- [mParticle Github](https://github.com/mparticle-integrations/mparticle-android-integration-branchmetrics)

#### Import the Android Support Libraries

- `'com.android.support:customtabs:23.3.0'`
- `'com.google.android.gms:play-services-ads:9+'`
- `'com.google.android.gms:play-services-appindexing:9.+'`

### Initializing Branch in the mParticle Kit

As with any kit, mParticle will automatically handle initializing Branch sessions. Please ensure `mParticle.start()` is called in your Android Application class (this should already be accounted for in your base mParticle integration).

!!! warning "Requirements"
	* [x] As with any attribution-related integration, be sure that you have added the mParticle `ReferrerReceiver` to your app’s `AndroidManifest.xml`

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

Please refer to mParticle's [marking direct calls to kits]( https://docs.mparticle.com/developers/sdk/android/kits/#making-direct-calls-to-kits) documentation for how to access the kit via the mParticle SDK.

Direct calls to the Branch SDK will also require using `.getAutoInstance()`, rather than `.getInstance()`.

Please refer to Branch's [native iOS SDK](/pages/apps/ios/#implement-features) documentation for how to implement secondary functionality.

## Sample testing apps

- [Sample Application](https://github.com/mparticle-integrations/mparticle-android-integration-branchmetrics/tree/master/SampleApplication)

## Troubleshooting

Please refer to the [Branch Android SDK troubleshooting section](/pages/apps/android/#troubleshoot-issues).
