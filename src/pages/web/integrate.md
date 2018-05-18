## Overview

  - The `Branch Web SDK` allows you to create and share deep links with a banner, over SMS, or your own methods. It also offers event tracking, access to referrals, and management of credits. The SDK is only ~13K gzipped.

## Integrate Branch

- ### Configure Branch

    - Complete the `Basic integration` within [Configure your dashboard](/pages/dashboard/integrate/)

        ![image](/img/pages/dashboard/fallback.png)

- ### Integrate app

    - Complete [Integrate your app](#dialog-code)

- ### Initialize Branch

    ```html hl_lines="4 8 9 10 11 12 13"
    <!doctype html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title></title>
      <script>
        // load Branch
        (function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="https://cdn.branch.io/branch-latest.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener applyCode autoAppIndex banner closeBanner closeJourney creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode trackCommerceEvent".split(" "), 0);
        // init Branch
        branch.init('key_live_kaFuWw8WvY7yn1d9yYiP8gokwqjV0Swt');
      </script>
    </head>
    <body>
    </body>
    </html>
    ```

    - Change `key_live_kaFuWw8WvY7yn1d9yYiP8gokwqjV0Swt` to match your [Branch Dashboard](https://dashboard.branch.io/account-settings/app)

#### Enable Do Not Track mode
In order to help our customers comply with [GDPR](https://branch.io/gdpr/), we’ve updated our Web SDK with a Do Not Track mode. This way, if a user indicates that they want to remain private on your website, you can continue to make use of the Branch Web SDK (e.g. for creating Branch links) while not tracking that user. This state is persistent, meaning that it’s saved for the user across browser sessions for the web site.

To enable Do Not Track Mode during initialization, include the `tracking_disabled` flag, with a value of `true`, into the options during initialization:

```javascript
branch.init( 'BRANCH_KEY',
    {
        ‘tracking_disabled’ : true
    }
);
```

To enable Do Not Track Mode following initialization, call `disableTracking(true)`. If you call `disableTracking()` with no argument, it will default to `disableTracking(true)`. Use `disableTracking(false)` to resume tracking.

## Implement features

- ### Initialize Branch features

    - Loads Branch into your app

    - Uses [Branch init options](#branch-init-options)

        ```js
        branch.init('key_live_kaFuWw8WvY7yn1d9yYiP8gokwqjV0Swt', function(err, data) {
          console.log(err, data); 
        });
        ```

        ```js
        var options = { no_journeys: true };
        branch.init('key_live_kaFuWw8WvY7yn1d9yYiP8gokwqjV0Swt', options, function(err, data) {
          console.log(err, data); 
        });
        ```

    - Returns the following inside the `data` object

    | Key | Value
    | --- | ---
    | data_parsed | `object`. If the user was referred from a link, and the link has associated data, the data is passed in here.
    | has_app | `boolean`. Does the user have the app installed already, using Branch's persona data.
    | identity | *optional* - `string`. Unique string that identifies the user, if set from `setIdentity`
    | referring_link | `string`. The referring link clicked, if available.
    | referring_identity | `string`. If the user was referred from a link, and the link was created by a user with an identity, that identity is here.

- ### Create deep link

    - Creates a deep link URL with encapsulated data

    - Uses [Deep Link Properties](/pages/links/integrate/)

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/links)

        ```js
        var linkData = {
          campaign: 'content 123',
          channel: 'facebook',
          feature: 'dashboard',
          stage: 'new user',
          tags: [ 'tag1', 'tag2', 'tag3' ],
          alias: '',
          data: {
            'custom_bool': true,
            'custom_int': Date.now(),
            'custom_string': 'hello',
            '$og_title': 'Title',
            '$og_description': 'Description',
            '$og_image_url':'http://lorempixel.com/400/400'
          }
        };

        branch.link(linkData, function(err, link) {
          console.log(link);
        });
        ```

- ### Share deep link

    -  Will generate a Branch deep link and tag it with the channel the user selects

    - Uses [Deep Link Properties](/pages/links/integrate/)

        ```html
        <!-- shareable elements -->
        <button id="button">deep link</button>
        <a id="anchor" href="#">deep link</a>
        ```

        ```js
        var linkData = {
          campaign: 'content 123',
          channel: 'facebook',
          feature: 'dashboard',
          stage: 'new user',
          tags: [ 'tag1', 'tag2', 'tag3' ],
          alias: '',
          data: {
            'custom_bool': true,
            'custom_int': Date.now(),
            'custom_string': 'hello',
            '$og_title': 'Title',
            '$og_description': 'Description',
            '$og_image_url':'http://lorempixel.com/400/400'
          }
        };

        branch.link(linkData, function(err, link) {
          // bind elements
          document.getElementById('button').onclick = function() {
            window.open(link || err);
          };
          document.getElementById('anchor').href = link || err;
        });
        ```

- ### Read deep link

    - Retrieve Branch data from a deep link

    - Best practice to receive data from the `listener` (to prevent a race condition)

    - Validate with [Testing read deep link](#testing-read-deep-link)

    - Listener

        ```js
        branch.init('key_live_kaFuWw8WvY7yn1d9yYiP8gokwqjV0Swt', function(err, data) {
          console.log(err, data); 
        });
        ```

    - Latest data

        ```js
        branch.data(function(err, data) {
          console.log(err, data); 
        });
        ```

    - First data

        ```js
        branch.first(function(err, data) {
          console.log(err, data); 
        });
        ```

- ### Create Journeys banner

    - Converts mobile users to app users

    - Create a `Journey` on the [Branch Dashboard](https://dashboard.branch.io/web/journeys)

    - Validate by testing your website on a mobile device

    - Append additional deep link data to the Journey button

        ```js
        // optional additional deep link data
        var linkData = {
          campaign: 'content 123',
          channel: 'facebook',
          feature: 'dashboard',
          stage: 'new user',
          tags: [ 'tag1', 'tag2', 'tag3' ],
          alias: '',
          data: {
            'custom_bool': true,
            'custom_int': Date.now(),
            'custom_string': 'hello',
            '$og_title': 'Title',
            '$og_description': 'Description',
            '$og_image_url':'http://lorempixel.com/400/400'
          }
        };

        branch.setBranchViewData(linkData);
        ```

        ```js
        // close
        branch.closeJourney(function(err, data) { 
          console.log(err, data); 
        });

        // reopen
        branch.track("pageview");
        ```

- ### Create text message

    - Converts desktop users to app users

    - Sends a SMS text message with a deep link to a phone number

    - Feature has certain [SMS limits](/pages/web/text-me-the-app/#what-are-the-sms-rate-limits)

    - Validate with [Branch Dashboard](https://dashboard.branch.io/liveview/clicks) for `+phone_number`

        ```js
        var phoneNumber = '9999999999' // +919812345678, +442071234567
        
        var linkData = {
          campaign: 'content 123',
          channel: 'facebook',
          feature: 'dashboard',
          stage: 'new user',
          tags: [ 'tag1', 'tag2', 'tag3' ],
          alias: '',
          data: {
            'custom_bool': true,
            'custom_int': Date.now(),
            'custom_string': 'hello',
            '$og_title': 'Title',
            '$og_description': 'Description',
            '$og_image_url':'http://lorempixel.com/400/400'
          }
        };

        var linkOptions = {
          make_new_link: false // don't create a new deep link if one already exists (e.g. _branch_match_id is in the address bar)
        };

        branch.sendSMS(phoneNumber, linkData, linkOptions, function(err, data) {
          console.log(err);
        });
        ```

- ### Host deep link data
  
    - Make it easier for marketers to create deep links
    - Used for [Journeys](/pages/web/journeys/), [Deep Linked Emails](/pages/emails/braze/), [Quick links](/pages/dashboard/analytics/#quick-links), and the [Chrome Extension](https://chrome.google.com/webstore/detail/branch-link-creator/pekdpppibljpmpbcjelehhnldnfbglgf)
    - Branch will scrape the web URL for deep link data on link creation
    - Validate by creating a [Quick Link](https://dashboard.branch.io/quick-links) and fill in `web URL` to your web page

        | Example URL | URL data | Metatags to add to your site
        | --- | --- | --- 
        | https://shop.com/shoes/brown-loafers | productId=1234, productView=true | `<meta name="branch:deeplink:productId" content="1234" />`, `<meta name="branch:deeplink:productView" content="true" />`
        | https://shop.com/shoes | categoryId=5678 | `<meta name="branch:deeplink:categoryId" content="5678" />`
        |https://shop.com/your-mother-is-great | No corresponding app content ([open web](/pages/links/integrate/#open-web-instead-of-app)) | `<meta name="branch:deeplink:$web_only" content="true" />`

- ### Track users

    - Sets the identity of a user (email, ID, UUID, etc) for events, deep links, and referrals
    
    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/identities)  

        ```js
        branch.setIdentity('123456');
        ```

        ```js
        branch.setIdentity('123456', function (err, data) {
          console.log(err, data);
        });
        ```

    - Removes the identity of a user

        ```js
        branch.logout();
        ```

        ```js
        branch.logout(function(err, data) {
          console.log(err, data);
        });
        ```

- ### Track events

    - Registers a custom event
    
    - Events named `open`, `close`, `install`, and `referred session` are Branch restricted

    - Best to [Track users](#track-users) before [Track events](#track-events) to associate a custom event to a user
    
    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/events)

        ```js        
        branch.track('signup');
        ```

        ```js
        branch.track('signup', { metadata: '123' });
        ```

        ```js
        branch.track('signup', { custom: '123' }, function (err, data) {
          console.log(err, data); 
        });
        ```

- ### Track commerce

    - Registers a custom commerce event

    - Validate with the [Branch Dashboard](https://dashboard.branch.io/liveview/commerce)

        ```js
        // only revenue is required
        var commerceData = {
          "revenue": 50.0,
          "currency": "USD",
          "transaction_id": "foo-transaction-id",
          "shipping": 0.0,
          "tax": 5.0,
          "affiliation": "foo-affiliation",
          "products": [
            {
              "sku": "foo-sku-1",
              "name": "foo-item-1",
              "price": 45.00,
              "quantity": 1,
              "brand": "foo-brand",
              "category": "Electronics",
              "variant": "foo-variant-1"
            },
            {
              "sku": "foo-sku-2",
              "price": 2.50,
              "quantity": 2
            }
          ]
        };

        // optional
        var metadata =  { 
          "foo": "bar" 
        };

        branch.trackCommerceEvent('purchase', commerceData, metadata, function(err, data) {
          console.log(err, data); 
        });
        ```

- ### Handle referrals

    - Referral points are obtained from referral rules on the [Branch Dashboard](https://dashboard.branch.io/referrals/rules)
    
    - Validate on the [Branch Dashboard](https://dashboard.branch.io/referrals/analytics)

    - Reward credits

        -  [Referral guide](/pages/dashboard/analytics/#referrals)

    - Redeem credits

        ```js
        var amount = 10;
        var bucket = 'this_bucket';
        branch.redeem(amount, bucket, function (err, data) {
          console.log(err, data); 
        });
        ```

        ```js
        var amount = 10;
        branch.redeem(amount, function (err, data) {
          console.log(err, data); 
        });
        ```

    - Load credits

        ```js
        branch.credits(amount, function (err, data) {
          console.log(err, data); 
        });
        ```

    - Load history

        ```js
        branch.creditHistory(function (err, data) {
          console.log(err, data); 
        });
        ```

        ```js
        var options = {
          "length":50,
          "begin_after_id":"123456789012345",
          "bucket":"default"
        };
        branch.creditHistory(options, function (err, data) {
          console.log(err, data); 
        });
        ```

        | Key | Default | Usage 
        | --- | --- | ---
        | bucket |  | The bucket from which to retrieve credit transactions (63 max characters)
        | begin_after_id | | The credit transaction id of the last item in the previous retrieval
        | length | `100` | The number of credit transactions to retrieve
        | direction | `0` | The order of credit transactions to retrieve (**deprecated**)

- ### Handle listeners

    - Subscribe and unsubscribe to Branch events

        ```js
        // all Branch events
        branch.addListener(listener);
        ```

        ```js
        branch.addListener('willShowJourney', listener);
        ```

        ```js
        branch.removeListener(listener);
        ```

        | Key | Usage
        | --- | ---
        | willShowJourney | Journey is about to be shown.
        | didShowJourney | Journey's entrance animation has completed and it is being shown to the user.
        | willNotShowJourney | Journey will not be shown and no other events will be emitted.
        | didClickJourneyCTA | User clicked on Journey's CTA button.
        | didClickJourneyClose | User clicked on Journey's close button.
        | willCloseJourney | Journey close animation has started.
        | didCloseJourney | Journey's close animation has completed and it is no longer visible to the user.
        | didCallJourneyClose | Emitted when developer calls branch.closeJourney() to dismiss Journey.

- ### Handle Firebase App Indexing

    - Inserts Firebase App Indexing tags on your website which will help Google index and surface content from your App to Google Search

        - For example:
            
            ```html
            <link rel="alternate" href="android-app://{androidPackageName}/{androidURL}?{branch_tracking_params_and_additional_deep_link_data}"/>
            <link rel="alternate" href="ios-app://{iosAppId}/{iosURL}?{branch_tracking_params_and_additional_deep_link_data}"/>
            ```

    - If optional parameters above are not specified, Branch will try to build Firebase App Indexing tags using your page's App Links tags. Alternatively, if optional parameters are specified but Firebase App Indexing tags already exist on your webpage then Branch tracking params will be appended to the end of these tags and ignore what is passed into `Branch.autoAppIndex()`.

    - Analytics related to Google's attempts to index your App's content via this method can be found on your [Branch Dashboard](https://dashboard.branch.io/sources) where channel is `Firebase App Indexing` and feature is `Auto App Indexing`

        ```js
        branch.autoAppIndex({
            iosAppId:'123456789',
            iosURL:'example/home/cupertino/12345',
            androidPackageName:'com.somecompany.app',
            androidURL:'example/home/cupertino/12345',
            data: {
              "walkScore": 65, 
              "transitScore": 50
            }
        }, function(err, data) {
          console.log(err, data); 
        });
        ```


        | Key | Usage
        | --- | ---
        | "androidPackageName" | Android App's package name
        | "androidURL" | A custom scheme for your Android App such as: `example/home/cupertino/12345` where `example` is the App's URI scheme and `home/cupertino/12345` routes to unique content in the App
        | "iosAppId" | iTunes App Store ID for your iOS App
        | "iosURL" | A custom scheme for your iOS App such as: `example/home/cupertino/12345`
        | "data" | Any additional deep link data that you would like to pass to your App


## Troubleshoot issues

- ### Sample testing apps

    - https://cdn.branch.io/example.html
    - http://cdn.branch.io/branchster-angular

- ### Browser support

    - The Branch Web SDK requires native browser Javascript and has been tested in all modern browsers with sessionStorage capability. No 3rd party libraries are needed to make use of the SDK as is it 100% native Javascript.

          | Chrome | Firefox | Safari | IE 
          | --- | --- | --- | --- 
          | &#10004; | &#10004; |  &#10004; | 9, 10, 11

- ### Bower or Npm compatibility

    - Use `bower install branch-sdk` or `npm install branch-sdk`

- ### CommonJS and RequireJS compatibility

    - Add `require('branch')` or `define(['branch'], function(branch) { ... });`

- ### Branch init options
  
    - Properties which you can pass within `branch.initSession()`

    - Used for [Initialize Branch features](#initialize-branch-features)

        | Key | Value
        | --- | ---
        | branch_match_id | *optional* - `string`. The current user's browser-fingerprint-id. The value of this parameter should be the same as the value of ?_branch_match_id (automatically appended by Branch after a link click). _Only necessary if ?_branch_match_id is lost due to multiple redirects in your flow_.
        | branch_view_id | *optional* - `string`. If you would like to test how Journeys render on your page before activating them, you can set the value of this parameter to the id of the view you are testing. _Only necessary when testing a view related to a Journey_.
        | no_journeys | *optional* - `boolean`. When true, prevents Journeys from appearing on current page.
        | disable_entry_animation | *optional* - `boolean`. When true, prevents a Journeys entry animation.
        | disable_exit_animation | *optional* - `boolean`. When true, prevents a Journeys exit animation.
        | open_app | *optional* - `boolean`. Whether to try to open the app passively through Journeys (as opposed to opening it upon user clicking); defaults to false.

- ### Testing read deep link

    - Used for [Read deep link](#read-deep-link)

    - Make a deep link redirect to your website 

        ```json
        https://example.app.link/kJNbhZ1PrF?$fallback_url=https://example.com
        ```

    - Website will open to [$fallback_url](/pages/links/integrate/#redirections) with `_branch_match_id`

        ```
        https://example.app.link/kJNbhZ1PrF?$fallback_url=https://www.website.com/&_branch_match_id=418480444086051524
        ```

    - Read `_branch_match_id` from that `$fallback_url` website

        ```js
        branch.init('key_live_kaFuWw8WvY7yn1d9yYiP8gokwqjV0Swt', function(err, data) {
          console.log(err, data); 
        });
        ```

- ### Journey not sticking to nav

    - Navigate to [Dashboard Journey Page](https://branch.dashboard.branch.io/web/journeys)
    - Select Journey -> Edit -> Configure Views -> Banner -> Page Placement
    - Banner Scroll = `sticky`
    - Press `Save & Close`
    - Add the following div to your nav

        ```html
        <div class="branch-journeys-top"></div>
        ```

- ### Create call to action
  
    - (**Deprecated**) Recommend to use [Share deep link](#share-deep-link) instead

        ```html
        <a href="#" onclick="branch.deepviewCta()">deep link</a>
        <button onclick="branch.deepviewCta()">deep link</button>
        ```

        ```js
        var linkData = {
          campaign: String(Date.now())
        };
        var linkOptions = {
          make_new_link: false, // don't create a new deep link if one already exists (e.g. _branch_match_id is in the address bar)
          open_app: true  // will attempt to open the app if install (URI Scheme deep linking only - will not work with Safari)
        };
        branch.deepview(linkData, linkOptions, function(err, data) {
          console.log(err, data);
        });
        ```

- ### No Access-Control Error

    - Make sure the Branch key is the same within the deep link and website

        ```
        XMLHttpRequest cannot load https://api.branch.io/v1/open. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access. The response had HTTP status code 400.
        ```
