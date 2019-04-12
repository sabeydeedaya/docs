title: Android SDK Version History

<div class="page-ul">
  <div class="page-li"><a href="/tune-android-sdk/basic-integration/">Basic Integration</a></div>
  <div class="page-li"><a href="/tune-android-sdk/advanced-features">Advanced Features</a></div>
	<div class="page-li"><a href="/tune-android-sdk/testing">Testing</a></div>
	<div class="page-li"><a href="/tune-android-sdk/troubleshooting">Troubleshooting</a></div>
  <div class="page-li">
    <div class="page-active">
      <a href="/tune-android-sdk/version-history">Version History</a>
    </div>
  </div>
  <div class="page-li"><a href="/tune-android-sdk/full-reference">Full Reference</a></div>
</div>
<br/>
### v6.1.1 

**(2019-March-26)**

- Ensure that no PII data is sent to Branch Servers. This is to revisit an issue where "user id" was incorrectly redacted instead of "user name" in v6.1.0

### v6.1.0 

**(2019-March-15)**

- Ensure that no PII data is sent to Branch Servers.  Methods that were sending PII data have been deprecated and will be removed in v7.0.0.
- Newer developer tools uncovered a JSON issue, where a boolean value was incorrectly being read as a String ("true") and thus throwing an exception.

### v6.0.3 

**(2018-December-19)**

*   Fixed an issue with parameter initialization, when the package name supplied does not match the PackageManager. This caused some parameters to not be initialized correctly.
*   Added the Branch domain (app.link) to the default list within the TUNE SDK to support attribution of Branch.io links by the TUNE SDK.

### v6.0.2 

**(2018-September-26)**

*   Fixed several security-related issues around the use of logging and HTTP.
*   Removed md5 and sha1 hashing algorithm usage for PII fields (user email, user phone and username).
    *   **NOTE**: Only sha256 hashing algorithm available.

### v6.0.1 

**(2018-September-13)**

*   Enhanced debugging support.
*   Enhanced support for Kotlin's increased null-safety standards.

### v6.0.0 

**(2018-August-02)**

*   IAM has been fully removed from the SDK.
*   Smartwhere Integration has been removed.
*   The Tune class has been refactored into an ITune interface.
*   Reorganization of supporting class package structure.
*   Removal of deprecated APIs.
*   Reduced external library dependencies.
*   Stability enhancements and code cleanup.
*   Full Javadoc Support.

### v5.3.0 

**(2018-June-04)**

*   Marked all IAM functionality as Deprecated. All IAM will be removed in Android v6.0.0.
*   Fixed an issue where email collection cannot be turned off once turned on.
*   Fixed an issue with occational failures to receive a deferred deeplink because the Google AID thread has not completed by the time the deferred deeplink request has been made.
*   Fixed an issue where – in some locales – SDKTYPEs were being reported incorrectly.

### v5.2.3 

**(2018-April-30)**

*   Added handling around the Google Play App Install Referrer API that raises unexpected RunTime exceptions.

### v5.2.2 

**(2018-April-26)**

*   Fixed an Android file and class case-sensitive name conflict .

### v5.2.1 

**(2018-April-11)**

*   Fixed an issue where timestamps were sometimes sent with scientific notation. These have been standardized as long integer values.

### v5.2.0 

**(2018-April-04)**

*   Added SDK version string declaration.

### v5.1.1 

**(2018-March-14)**

*   Fixed an issue where the action parameter should not be redacted for Tune Link clicks if the profile is privacy protected due to COPPA.
    *   **NOTE**: Android SDK v4.15.2-v5.0.2 incorrectly redacts the action parameter if the profile is privacy protected, which breaks all AA measurement.
*   Added getIAMDeviceIdentifier and getIAMAppId to the Android SDK public API. Note that the IAM DeviceId and AppId are different than the Tune AppId and DeviceId.
*   Improved Logging.

### v5.0.2 

**(2018-February-28)**

*   Fixed an issue where the action parameter should not be redacted of the profile is privacy protected due to COPPA.
    *   **NOTE**: Android SDK v4.15.2-v5.0.1 incorrectly redacts the action parameter if the profile is privacy protected, which breaks all AA measurement.
*   Fixed an issue with In-App Messaging respecting Android Immersive Mode.

### v5.0.1 

**(2018-February-22)**

*   Fixed an issue with auto-collecting location data that caused random exceptions.
*   Fixed an issue with updated playlists potentially missing data from the cache version.
*   **NOTE**: Android SDK v5.0.1 incorrectly redacts the action parameter if the profile is privacy protected, which breaks all AA measurement.

### v5.0.0 

**(2018-February-07)**

*   Removed Smartwhere as a hard gradle dependency.
    *   The Tune SDK will include all the code for working together with Smartwhere if present (Smartwhere SDK required), but without the hard dependency/bundling.
*   Fixed issues with push notifications rendering on Android O, including changing the TuneNotificationBuilder signature to support channels.
*   Removed deprecated methods
    *   public void measureSession();
    *   public void measureEvent(int eventId);
    *   public void setReferralSources(final Activity act);
    *   public void checkForDeferredDeeplink(TuneDeeplinkListener listener);
    *   public void setDeeplinkListener(TuneDeeplinkListener listener);
    *   public TuneEvent(int eventId); // Constructor
    *   public int getEventId();
    *   public synchronized String getSdkVersion();
*   Fixed several issues around measuring events and setting custom profile values with `null` values.
    *   setCustomProfileStringValue, setCustomProfileDate, and setCustomProfileGeolocation – if the value is `null` will have the same effect as calling `clearCustomProfileVariable()`
    *   measureEvent(String eventName) – if the eventName is null, this will now throw an exception (debug only).
*   **NOTE**: Android SDK v5.0.0 incorrectly redacts the action parameter if the profile is privacy protected, which breaks all AA measurement.

### v4.16.0 

**(2018-January-17)**

*   Published a 'lite' version of the Android Tune SDK with minimal dependencies required.
    *   Example usage:

        <pre>compile 'com.tune:tune-marketing-console-sdk-lite:4.16.0'</pre>

*   Fixed an issue where Deferred Deeplinks can fail to notify the listener of an error when the device is offline.
*   The SDK will now report its version in the debug logs.
*   Bug fixes related to In-App Message banner presentation.
*   **NOTE**: Android SDK v4.16.0 incorrectly redacts the action parameter if the profile is privacy protected, which breaks all AA measurement.

### v4.15.3 

**(2017-December-14)**

*   Added a flag on the IAM user profile to assist in segmentation for devices that have been automatically or manually flagged as privacy protected to enhance our existing server-side protections. Because of this and other improvements we recommend that customers upgrade to this SDK version for maximum client-side privacy protection.
*   Added handling around the Google Play App Install Referrer API that raises exceptions given a bad Context.
*   **NOTE**: Android SDK v4.15.3 incorrectly redacts the action parameter if the profile is protected, which breaks all AA measurement.

### v4.15.2 

**(2017-December-13)**

*   Added client-side redaction of known personal information for devices that have been automatically or manually flagged as privacy protected to complement our existing server-side protections.
*   **NOTE**: Android SDK v4.15.2 incorrectly redacts the action parameter if the profile is protected, which breaks all AA measurement.

### v4.15.1 

**(2017-November-21)**

*   Migrated the reference to the [Google Play App Install Referrer API](https://developer.android.com/google/play/installreferrer/library.html) from an included library to the official gradle dependency provided by Google. This is a difference in library packaging only.

### v4.15.0 

**(2017-November-20)**

*   Included Google Play App Install Referral API
    *   Google has provided an API to determine discrete timestamp for download of an application from the Google Play store. Paired with our own data on the initial open, we can determine the time between initial download and our install, as well as activity - such as clicks - that occur between those two timestamps.
*   Fixed an issue with set/get parameters, where parameters were not immediately available after set().
*   Fixed an issue where some user profile values were not persisting across app instances.

### v4.14.0 

**(2017-November-02)**

*   Upgraded to EventBus 3.0.
    *   Note that if you were previously including the Tune SDK via. a gradle dependency, there should be no additional changes needed after including this new Tune SDK update.
    *   If Tune was being included as a JAR or AAR, there is a change required in the applications build.gradle file.
        *   EventBus changed from 'de.greenrobot:eventbus' to 'org.greenrobot:eventbus'. The new compile line is:

            <pre>compile 'org.greenrobot:eventbus:3.0.0'</pre>

    *   See updated instructions in the Android Quick Start: [https://developers.tune.com/sdk/android-quick-start/](https://developers.tune.com/sdk/android-quick-start/)
*   Fixed an issue where Tune-enabled applications auto start when the lock screen is dismissed.
    *   SDK versions between 4.11.0 and 4.13.0 have an extra BroadcastReceiver that was introduced that caused applications to auto-start the Application node when the receiver was called, even when the application was not running. This version addresses that issue.
*   Check for collisions between custom IAM profile variables and Tune system variables.
    *   Tune has some profile variable names that are reserved, and cannot be used as IAM CustomProfile variables. While these variables are case sensitive, to remove confusion it will be no longer permitted to use a case-sensitive (but otherwise identical) version of reserved variable names.

### v4.13.0 

**(2017-October-19)**

*   Allow manual flagging of device users for Children's Online Privacy Protection Rule (COPPA)

### v4.12.1 

**(2017-Oct-11)**

*   Updated Smartwhere dependency to v17258 which removes Google Play Services dependency.

### v4.12.0 

**(2017-Sept-13)**

*   Added support for the new generation of In-App Messaging Campaigns for IAM. For more information or early access to this feature in the Tune Marketing Console please contact your CSM!

### v4.11.1 

**(2017-Aug-02)**

*   Simplified Smartwhere API

### v4.11.0 

**(2017-July-27)**

*   Added the [Smartwhere](https://smartwhere.com/) SDK as a dependency to the Tune SDK. Customers can opt-in to connecting their Tune account with Smartwhere for location-based attribution analytics.
*   Additionally, customers can opt-in to sharing Tune SDK event data with Smartwhere for location-based message triggering.
*   See our [Android Quick Start](https://developers.tune.com/sdk/android-quick-start/) and Smartwhere Integration articles for more information.
*   Fixed a Location collection crash.

### v4.10.2 

**(2017-June-28)**

*   Fixed invoke_id retrieval latency
*   Added thread safety to campaign state management

### v4.10.1 

**(2017-Mar-15)**

*   Added null check for Tune.getInstance() in TuneActivity onResume

### v4.10.0 

**(2017-Feb-09)**

*   IAM: Added silent push notification support

### v4.9.0 

**(2017-Jan-12)**

*   Added Smartwhere integration
*   Collect Fire Advertising Id on Amazon Fire devices

### v4.8.1 

**(2016-Dec-14)**

*   Collect device locale and build
*   Return full, encrypted request url in `enqueuedRequest` callback

### v4.8.0 

**(2016-Nov-22)**

*   SDK integration has been updated for all customers and will require code changes if you update to this or later versions of the Tune SDK. For information on migrating see [migrating from 4.x to 4.8 and above](/sdk/migrating-to-android-4-8-0-and-above/).
*   IAM: Fix bug in tracking event with attributes. If set, the event tag with the name "attribute2" was incorrectly being recorded with the value of the event tag "attribute1".
*   IAM: Fix bug for Power Hook `getValueForHookById` to always return the last updated value from the Tune servers, even if the value is requested before the first Tune server response is returned after launch.

### v4.7.1 

**(2016-Oct-11)**

*   IAM: Do not mark user as push enabled until a device token is retrieved

### v4.7.0 

**(2016-Sep-27)**

*   AA: Stop location autocollection when location is manually set
*   AA: Check for null location in `onLocationChanged`
*   IAM: Use default sound and vibration settings for push notifications
*   IAM: Add `executeDeepAction` method to manually invoke a deep action

### v4.6.0 

**(2016-Sep-06)**

*   AA: Return non-null values for getters if not set
*   IAM: Allow setting sound and vibration in TuneNotificationBuilder
*   IAM: Fix isUserInSegment NullPointerException if user is not in any segments

### v4.5.1 

**(2016-Aug-30)**

*   Validate `measureEvent` event names are not empty
*   Fix location permissions crash on OnePlus2 devices
*   IAM: Send events for when push is enabled or disabled

### v4.5.0 

**(2016-Aug-10)**

*   AA: Deprecate `measureEvent` with event ids. Events should only be measured by name
*   IAM: Add `isUserInSegmentId` API
*   IAM: Persist custom profile variables across sessions
*   IAM: Correctly pass boolean profile variables to server

### v4.4.0 

**(2016-Jul-20)**

*   AA: Add `enqueuedRequest(String url, JSONObject postData)` callback to TuneListener
*   Update support libraries to v24

### v4.3.1 

**(2016-Jul-13)**

*   IAM: Fix `setPushNotificationRegistrationId` setter

### v4.3.0 

**(2016-Jul-06)**

*   IAM: Remove unused tagging from `TuneEventItem` API
*   IAM: Remove unused geolocation tagging from `TuneEvent` API
*   IAM: Hash username, user email, phone number fields
*   IAM: Fix race condition for when multiple analytics events are created when app is opened, not all of them get sent (for example via push)

### v4.2.0 

**(2016-Jun-21)**

*   IAM: Add `didSessionStartFromTunePush()`, `getTunePushInfoForSession()` for getting session opened from push notification information

### v4.1.3 

**(2016-Jun-08)**

*   AA: Fix location provider enabled check for API < Lollipop
*   AA: Remove deprecated global getRefId, getRevenue methods
*   IAM: Add public AppId getter for debugging
*   IAM: Fix AppId generation when IAM is disabled for the app
*   IAM: Enable power hook preview
*   IAM: Save tags' cleaned/pretty name

### v4.1.2 

**(2016-May-19)**

*   Fire playlist downloaded callbacks immediately if In-App Marketing is disabled for the account
*   Javadoc updates for clarity around playlist download callback usage

### v4.1.1 

**(2016-May-19)**

*   Prevent playlist download callbacks from firing while app is backgrounded
*   Fail gracefully on empty playlists
*   Ensure playlist download callbacks are executed after power hook values are received
*   Prevent null session ids and mat ids on first session for In-App Marketing
*   Use uppercase country codes for In-App Marketing

### v4.1.0 

**(2016-Apr-22)**

*   Always fire playlist download callbacks upon first playlist and registration
*   Add default 3s timeout for playlist download callbacks
*   Only allow one callback in onPowerhooksChanged
*   targetSdkVersion < 23 support
*   Don't hash empty string values

### v4.0.3 

**(2016-Apr-08)**

*   Check for internet permission before enabling In-App Marketing
*   Check for null intent in TunePushService
*   Push images support

### v4.0.2 

**(2016-Mar-17)**

*   Read event ID from TuneEvent, if present, for In-App Marketing events

### v4.0.1 

**(2016-Mar-03)**

*   Format location coordinates in Locale.US
*   Add setLocation overload with TuneLocation parameter

### v4.0.0 

**(2016-Mar-03)**

*   Addition of In-App Marketing capability, including:
    *   Targeted push notifications.
    *   Event auto-collection and analysis.
    *   User segmentation and profiling.
    *   A/B testing.
    *   Power Hooks and on-the-fly app editing capability.
*   Replaced the com.mobileapptracker.MobileAppTracker class with the com.tune.Tune class.
*   MATEvent and MATEventItem have also been replaced with TuneEvent and TuneEventItem, respectively.
*   Incorporated EventBus for internal SDK message routing. The TUNE SDK now also requires the Android support JAR (if not already present).  
    Note the new Gradle dependencies:  

    <div class="tuned-code-wrap">

    <div class="tuned-code-block-wrap tuned-code-block-android-4-0 " style="display:inherit;">

        compile 'de.greenrobot:eventbus:2.4.0'
        compile 'com.android.support:support-v4-:23.+'

    </div>

    <div class="tuned-code-block-wrap tuned-code-block-missing" style="display:none;">

    <div class="missing-message">Unable to load code example.</div>

    </div>

    <div class="tuned-code-block-wrap tuned-code-block-select-preferred" style="display:none;">

        Select a preferred platform.

    </div>

    </div>

*   Auto-collects device location if app has already permitted location access.
*   Deferred deeplink listener callbacks are always invoked on failure.
*   Added the TUNE Android SDK to jCenter. The TMC Android SDK can now be installed via the following Gradle dependency:  

    <div class="tuned-code-wrap">

    <div class="tuned-code-block-wrap tuned-code-block-android-4-0 " style="display:inherit;">

        compile 'com.tune:tune-marketing-console-sdk:4.0.0'

    </div>

    <div class="tuned-code-block-wrap tuned-code-block-missing" style="display:none;">

    <div class="missing-message">Unable to load code example.</div>

    </div>

    <div class="tuned-code-block-wrap tuned-code-block-select-preferred" style="display:none;">

        Select a preferred platform.

    </div>

    </div>

*   Updated the ProGuard exceptions required for the TMC Android SDK:  

    <div class="tuned-code-wrap">

    <div class="tuned-code-block-wrap tuned-code-block-android-4-0 " style="display:inherit;">

        -keep public class com.tune.** { public *; }
        -keep public class com.google.android.gms.ads.identifier.** { *; }
        -keep public class com.google.android.gms.gcm.** { *; }
        -keep public class com.google.android.gms.common.** { *; }

        -keepclassmembers class ** {
         public void onEvent(**);
        }

    </div>

    <div class="tuned-code-block-wrap tuned-code-block-missing" style="display:none;">

    <div class="missing-message">Unable to load code example.</div>

    </div>

    <div class="tuned-code-block-wrap tuned-code-block-select-preferred" style="display:none;">

        Select a preferred platform.

    </div>

    </div>

### v3.11.4 

**(2015-Dec-03)**

*   Use system user agent instead of WebView if possible, for more reliability and less UI thread impact
*   In getDefaultUserAgent fallback, add try/catch for Alcatel and other devices that have custom WebView implementation

### v3.11.3 

**(2015-Nov-17)**

*   Use WebSettings.getDefaultUserAgent on devices > API 17
*   When debug mode is enabled, show toast for when measureSession is called

### v3.11.2 

**(2015-Oct-29)**

*   Add setReferralUrl method to support manually setting deeplink
*   Add backwards support for FB SDK 3.x event logging
*   Try to load AsyncTask before accessing WebView (prevent rare device-specific issue)

### v3.11.1 

**(2015-Sep-10)**

*   Add Cross-Promo event logging

### v3.11.0 

**(2015-Aug-26)**

*   Update Cross-Promo API endpoints
*   Remove custom banner size option, banners are now fixed based on device screensize
*   Output ad server response status if debug mode enabled, in addition to notifying listener

### v3.10.1 

**(2015-Aug-03)**

*   Hotfix for preserving user values through setters
*   Add deep link listener for easier, more transparent implementation

### v3.10.0 

**(2015-Jul-21)**

*   Update Facebook event logging for FB SDK 4.0+
*   Add timeout status in deferred deep link callback
*   Cross-Promo ads
*   Updated minimum SDK version to 9

### v3.9.1 

**(2015-Apr-28)**

*   Add Agency ID as an option for preloaded app attribution
*   Refactor network calls from HttpClient (deprecated in Android 5.0) to HttpURLConnection
*   Remove dependency on INSTALL_REFERRER for deferred deep links, always use API endpoint

### v3.9 

**(2015-Apr-07)**

*   Auto-collect GAID, ANDROID_ID if GAID not available
*   Fully deprecated measureAction methods

### v3.8 

**(2015-Mar-05)**

*   Hash personal data fields for ePrivacy certs
*   MobileAppTracker constructor builder helper functions
*   measureEvent with MATEvent class and constructor helper functions, intended to replace measureAction
*   MATEventItem constructor helper functions

### v3.7.1 

**(2015-Jan-23)**

*   checkForDeferredDeeplink uses INSTALL_REFERRER for Google Play apps

### v3.7 

**(2015-Jan-14)**

*   Add checkForDeferredDeeplink function to open deferred deep links

### v3.6.2 

**(2015-Jan-08)**

*   setEmailCollection hotfix for Android API level < 19

### v3.6.1 

**(2014-Nov-11)**

*   setEmailCollection collects other available email addresses on device

### v3.6 

**(2014-Nov-11)**

*   Add optional setEmailCollection function to collect primary Gmail address as user email
*   Requires GET_ACCOUNTS permission to succeed, if permission is missing, will not try to collect

### v3.5 

**(2014-Oct-20)**

*   Add setAndroidIdMd5, setAndroidIdSha1, setAndroidIdSha256 functions

### v3.4.2 

**(2014-Oct-02)**

*   Rewrite clearer debug LogCat output messages on failed requests

### v3.4.1 

**(2014-Sep-29)**

*   Init parameters sequentially to prevent rare race condition with accessing param values

### v3.4 

**(2014-Sep-14)**

*   Support foreign characters encoding in MAT event items
*   More consistent user agent collection

### v3.3.3 

**(2014-Jul-28)**

*   delay first session call up to 60s to wait for GAID and INSTALL_REFERRER to be set (if both are received in that time, send request immediately)

### v3.3.2 

**(2014-Jul-17)**

*   fix non-thread-safe getCurrencyCode
*   fix for appending open log id

### v3.3 

*   collect device CPU type
*   measureAction overloads with event ID as int
*   added setters for pre-loaded app attribution

### v3.2.4 

*   remove Android id, device id, mac address autocollect (use setAndroidId, setDeviceId, setMacAddress if continuing to use identifiers)

### v3.2.3 

*   collect store app installer package name
*   send request retry count for failed queued requests
*   lower retry frequency for subsequent failures

### v3.2.2 

*   fix for occasional NullPointerException when requesting an internal parameter immediately after initializing

### v3.2 

*   persist userId, userName, userEmail to disk to make re-engagement attribution easier
*   add setEventContentType, setEventContentId, setEventLevel, setEventQuantity, setEventSearchString, setEventRating, setEventDate1, and setEventDate2 methods

### v3.1 

*   Changed trackSession and trackAction to measureSession and measureAction
*   Send is_paying_user=1 if the user has ever produced revenue (measureAction with revenue > 0)

### v3.0.5 

*   Send system times in Unix epoch format
*   Retry (enqueue) HTTP connections with almost all error states
*   Require Google Play Ad ID limitation enablement setting

### v3.0.3 changes

*   Added setUserName, setUserEmail methods

### v3.0 changes

*   Replace install/update tracking with sessions
*   Added Google Advertising Id and isLimitAdTrackingEnabled setters
*   Reworked MobileAppTracker to be a singleton
*   Added new trackAction with event item overloads
*   Removed setAdvertiserId, setKey – only pass via init
*   Removed setRefId, setRevenue – only pass via trackAction

### v2.7 changes

*   Add Facebook, Google, Twitter user id setters
*   Add getSDKVersion
*   setAppAdTracking renamed to setLimitAdTrackingEnabled
*   Recommend passing Application Context over Activity Context

### v2.6 changes

*   Auto-get referral source package and url
*   Make ref id thread-safe, add ref id as overloaded trackAction param
*   Fix for in-app purchase validation with IAP data
*   Only collect device ID/MAC address if required permissions are detected

### v2.5 changes

*   Add Google Play In-App purchase parameters for verification in trackAction

### v2.4.1 changes

*   Add setAppAdTracking setter for app-level ad opt-out

### v2.4 changes

*   Better exception handling and added more informative debug output
*   Improve offline event queue synchronization

### v2.3 changes

*   Add age, gender, latitude, longitude, altitude setters
*   Add MATEventItem class for trackAction use

### v2.2 changes

*   Separate debug and allow duplicate settings
*   Add MATResponse interface for reading platform responses
*   Show alert dialog warning if debug mode is on
*   Add event_referrer setter for app that caused open

### v2.1 changes

*   Add platform response to debug log output
*   Make revenue input into Double
*   Add site_id setter
*   Add “trackPurchase” method for store purchase events
