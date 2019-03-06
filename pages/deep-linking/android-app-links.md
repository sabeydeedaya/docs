## Overview

Branch makes it simple to enable Android App Links all while greatly improving on them, offering full attribution, supporting edge cases where Android App Links fail (common) and allowing you to deep link when the user doesn't have your app installed. Note that Android App Links only work on Android 6+. Don't worry, Branch will handle all the other edge cases.

## Setup

### Generate signing certificate fingerprint

Start by generating a SHA256 fingerprint of your app's signing certificate.

1. Navigate to your keystore file. This is the file that you use to build the debug and production version of your APK file before deploying it.
1. Run this command on it to generate the fingerprint: `keytool -list -v -keystore my-release-key.keystore`
1. You'll see a value like `14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5` come out the other end. Copy this.

### Enable App Links on the Branch dashboard

1. Head to the [Link Settings page](https://dashboard.branch.io/link-settings) on the Branch dashboard.
1. Toggle the **Enable App Links** checkbox in the Android section.
1. Paste the copied fingerprint value into the **SHA256 Cert Fingerprints** field that appears. ![image](/_assets/img/pages/deep-linking/universal-links/enable_app_links.png)
1. Scroll down and click `Save`.

!!! tip "Using multiple fingerprints"
	You can insert both your debug and production fingerprints for testing. Simply separate them with a comma.

### Add Intent Filter to Manifest

1. Go to the [Link Settings](https://dashboard.branch.io/link-settings) page on the dashboard.
1. Scroll down to the `Link Domain` area.
1. Copy your domain name. ![image](/_assets/img/pages/deep-linking/universal-links/subdomain-setting.png)
1. Choose the `Activity` you want to open up when a link is clicked. This is typically your `SplashActivity` or a `BaseActivity` that all other activities inherit from (and likely the same one you selected in the [SDK integration guide](/apps/android/#configure-app)).
1. Inside your `AndroidManifest.xml`, locate where the selected `Activity` is defined.
1. Within the `Activity` definition, insert the intent filter provided below (making sure that `xxxx` matches the subdomain prefix you've been assigned or selected for yourself). Be sure to add this as its own separate intent filter.

!!! tip "Using a custom domain or subdomain?"
	If you use a [custom domain or subdomain for your Branch links](/dashboard/integrate/#change-link-domain), you should also add an entry for:

	```xml
	<data android:scheme="https" android:host="mycustomdomainorsubdomain" />
	```

```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="xxxx.app.link" />
    <data android:scheme="https" android:host="xxxx-alternate.app.link" />
    <data android:scheme="https" android:host="xxxx.test-app.link" />
    <data android:scheme="https" android:host="xxxx-alternate.test-app.link" />
</intent-filter>
```

!!! warning "Domain Validation"
	The system must be able to verify every host specified in the app’s URL intent filters’ data elements against the Digital Asset Links files hosted on all the respective web domains. If any verification fails, the app is not verified to be a default handler for any of the URL patterns defined in the app's intent filters. You can use Google's [Statement List Asset Generator](https://developers.google.com/digital-asset-links/tools/generator) to test your existing statement file.

### Get APK SHA256 Fingerprints

Run: `keytool -printcert -jarfile my_app.apk` on your APK file.
