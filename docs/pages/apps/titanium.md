
## Integrate Branch
- ### Configure Branch
    - Complete your [Branch Dashboard](https://dashboard.branch.io/settings/link)

        ![image](/_assets/img/pages/apps/cordova-configure.png)
        ![image](/_assets/img/pages/apps/cordova-link-domain.png)

- ### Configure App
    - iOS

        - Add your Branch key and register a URI scheme

            - In your project’s tiapp.xml file, insert the snippet below. Change yourapp to the URI scheme you’ve selected.

              ```
              <ios>
                 <plist>
                     <entitlements>
                         <dict>
                             <!-- Add domains to support Universal Links -->
                             <key>com.apple.developer.associated-domains</key>
                             <array>
                                 <string>applinks:xxxx.app.link</string>
                                 <string>applinks:xxxx-alternate.app.link</string>
                                 <string>applinks:xxxx.test-app.link</string>
                                 <string>applinks:xxxx-alternate.test-app.link</string>
                             </array>
                         </dict>
                     </entitlements>
                     <dict>
                         <!-- Add branch key as key-value pair -->
                         <key>branch_key</key>
                         <string>key_live_xxxxxxxxxxxxxxx</string>
                         <!-- Add unique string for direct deep links -->
                         <key>CFBundleURLTypes</key>
                         <array>
                             <dict>
                                 <key>CFBundleURLSchemes</key>
                                 <array>
                                     <string>yourapp</string>
                                 </array>
                             </dict>
                         </array>
                         <!-- Required step for Universal Links on cold start -->
                         <key>NSUserActivityTypes</key>
                         <array>
                             <string>io.branch.testbed.universalLink</string>
                         </array>
                     </dict>
                 </plist>
              </ios>
              ```

    - Android

        - Add your Branch Key and register a URI Scheme

            - Open your tiapp.xml and add the following <meta-data> tag:
            ```
                <application>
                    <!-- Other existing entries -->
                    <meta-data android:name="io.branch.sdk.BranchKey" android:value="key_live_xxxxxxxxxxxxxxx" />
                </application>
            ```

            - Within your Deep Link Activity's definition, insert the intent filter provided below. Change yourapp under android:scheme to the URI scheme you’ve selected.

            ```
                <intent-filter>
                  <data android:scheme="yourapp" android:host="open" />
                  <action android:name="android.intent.action.VIEW" />
                  <category android:name="android.intent.category.DEFAULT" />
                  <category android:name="android.intent.category.BROWSABLE" />
                </intent-filter>
            ```

- ### Initialize Branch

    - Initialize the SDK by inserting the following snippet into your index.js file:

        ```
        $.initialize = function(params) {
               $.window.open();

               $.initializeViews();
               $.initializeHandlers();

               Ti.API.info("start initSession");
               branch.initSession();
               branch.addEventListener("bio:initSession", $.onInitSessionFinished);

               if (OS_ANDROID) {
                   Ti.Android.currentActivity.addEventListener("newintent", function(e) {
                       Ti.API.info("inside newintent: " + e);
                       $.window.open();
                       branch.initSession();
                   });
               }

               if (OS_IOS) { // Don't forget this condition.
                  var activity = Ti.App.iOS.createUserActivity({
                      activityType:'io.branch.testbed.universalLink'
                  });

                  activity.becomeCurrent();

                  Ti.App.iOS.addEventListener('continueactivity', function(e) {
                      if (e.activityType === 'io.branch.testbed.universalLink') {
                          branch.continueUserActivity(e.activityType, e.webpageURL, e.userInfo);
                      }
                  });
              }
           };

           $.onInitSessionFinished = function(data) {
               Ti.API.info("inside onInitSessionFinished");
               for (key in data) {
                   if ((key != "type" && key != "source" && key != "bubbles" && key != "cancelBubble") && data[key] != null) {
                       Ti.API.info(key + data["key"]);
                   }
               }
           }
        ```

- ### Test deep link iOS

    - Create a deep link from the [Branch Marketing Dashboard](https://dashboard.branch.io/marketing)

    - Delete your app from the device

    - Compile your app

    - Paste deep link in `Apple Notes`

    - Long press on the deep link *(not 3D Touch)*

    - Click `Open in "APP_NAME"` to open your app *([example](/_assets/img/pages/apps/ios-notes.png))*

- ### Test deep link Android

    - Create a deep link from the [Branch Dashboard](https://dashboard.branch.io/marketing)

    - Delete your app from the device

    - Compile your app

    - Paste deep link in `Google Hangouts`

    - Click on the deep link to open your app

## Implement features

- ### Create content reference

	- The `Branch Universal Object` encapsulates the thing you want to share

	- Uses the Universal Object Properties listed below:

	    | **Key** | Type | **Meaning**
        | --- | --- |---
        | canonicalIdentifier | `string` | The identifier of the object
        | title | `string` | The title of the object
        | contentDescription | `string` | The short description of the object
        | contentImageUrl | `string` | URL of the image used by the object
        | contentIndexingMode | `string` | Indexing mode of the object. Set as "private" or "public".
        | contentMetadata | `dictionary` | Custom keys and values as metadata of the object

        ```js
            var branchUniversalObject = branch.createBranchUniversalObject({
                "canonicalIdentifier" : "content/12345",
                "title" : "My Content Title",
                "contentDescription" : "My Content Description",
                "contentImageUrl" : "https://example.com/mycontent-12345.png",
                "contentIndexingMode" : "public",
                "contentMetadata" : {
                    "product_picture" : "12345",
                    "user_id" : "6789"
                },
            });
        ```

- ### Create deep link

    - Creates a deep link URL with encapsulated data

    - Needs a [Branch Universal Object](#create-content-reference)

    - Uses [Deep Link Properties](/links/integrate/)

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/links)

    ```js
        branchUniversalObject.generateShortUrl({
          "feature" : "sample-feature",
          "channel" : "sample-channel",
          "stage" : "sample-stage"
        }, {
          "$desktop_url" : "http://desktop-url.com",
        }, function (res) {
            Ti.API.info('Completed link generation');
            Ti.API.info(res);
        });
    ```

    - The event listener bio:generateShortUrl returns a string object containing the generated link:
    ```js
        branchUniversalObject.addEventListener("bio:generateShortUrl", $.onGenerateUrlFinished);
    ```
- ### Share deep link
    -  Will generate a Branch deep link and tag it with the channel the user selects

    - Needs a [Branch Universal Object](#create-content-reference)

    - Uses [Deep Link Properties](/links/integrate/)

    ```js

        branchUniversalObject.showShareSheet({
          "feature" : "sample-feature",
          "channel" : "sample-channel",
          "stage" : "sample-stage",
        }, {
          "$desktop_url" : "http://desktop-url.com",
        });

    ```

    - Android only (Callbacks in iOS are ignored. There is no need to implement them as the events are handled by UIActivityViewController)

    ```js

        branchUniversalObject.shareLinkDialogLaunched(function () {
          console.log('Share sheet launched');
        });

    ```

    ```js

        branchUniversalObject.shareLinkDialogDismissed(function () {
         console.log('Share sheet dimissed');
       });

    ```

    ```js

        branchUniversalObject.shareLinkResponse(function (res) {
          console.log('Share link response: ' + JSON.stringify(res));
        });

    ```

    ```js

        branchUniversalObject.shareChannelSelected(function (res) {
          console.log('Channel selected: ' + JSON.stringify(res));
        });

    ```

- ### Read deep link

    - Refer to `$.onInitSessionFinished()` in [Initialize Branch](#initialize-branch)

    - Returns [deep link properties](/links/integrate/#read-deep-links)

- ### Track content

    - Track how many times a piece of content is viewed

    - Needs a [Branch Universal Object](#create-content-reference)

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/content)

    ```js

        branchUniversalObject.registerView();

    ```

- ### Track users

    - Sets the identity of a user (email, ID, UUID, etc) for events, deep links, and referrals

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/identities)

        ```js

            var userId = '123456';
            branch.setIdentity(userId);

        ```

    - Removes the identity of a user

        ```js

            branch.logout();

        ```

- ### Track events

    - Registers a custom event

    - Events named `open`, `close`, `install`, and `referred session` are Branch restricted

    - Best to [Track users](#track-users) before [Track events](#track-events) to associate a custom event to a user

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/events)

    ```js

        var eventName = 'clicked_on_this';
        branch.logEvent(eventName);

    ```

- ### Handle referral

    - Referral points are obtained from referral rules on the [Branch Dashboard](https://dashboard.branch.io/referrals/rules)

    - Validate on the [Branch Dashboard](https://dashboard.branch.io/referrals/analytics)

    - Reward credits

        -  [Referral guide](/dashboard/analytics/#referrals)

    - Redeem credits

    ```js

        int value = 10;
        branch.redeemRewards(value);

    ```

    - Load credits

    ```js

        var bucket = 'this_bucket'
        branch.loadRewards(bucket);

    ```

    ```js

        branch.loadRewards();

    ```

    To implement the callback, you must add a listener to the event bio:loadRewards. The event returns a dictionary object containing the balance.

   - Load history

    ```branch.getCreditHistory();```

    Implement the callback, by adding a listener to the event bio:getCreditHistory.

## Troubleshoot issues
- ### Sample app

    - [Branch testbed app](https://github.com/BranchMetrics/titanium-branch-deep-linking/tree/master/testbed)
