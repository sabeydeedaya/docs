title: Web SDK Troubleshooting

<div class="page-ul">
  <div class="page-li"><a href="/branch-web-sdk/basic-integration/">Basic Integration</a></div>
  <div class="page-li"><a href="/branch-web-sdk/advanced-features">Advanced Features</a></div>
  <div class="page-li"><a href="/branch-web-sdk/testing">Testing</a></div>
  <div class="page-li">
    <div class="page-active">
      <a href="/branch-web-sdk/troubleshooting">Troubleshooting</a>
    </div>
  </div>
  <div class="page-li"><a href="/branch-web-sdk/version-history">Version History</a></div>
  <div class="page-li"><a href="/branch-web-sdk/full-reference">Full Reference</a></div>
</div>

## Troubleshoot issues

### Browser support

- The Branch Web SDK requires native browser Javascript and has been tested in all modern browsers with sessionStorage capability. No 3rd party libraries are needed to make use of the SDK as is it 100% native Javascript.

      | Chrome | Firefox | Safari | IE
      | --- | --- | --- | ---
      | &#10004; | &#10004; |  &#10004; | 9, 10, 11

### Bower or Npm compatibility

- Use `bower install branch-sdk` or `npm install branch-sdk`

### CommonJS and RequireJS compatibility

- Add `require('branch')` or `define(['branch'], function(branch) { ... });`

### Branch init options

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
    | nonce | *optional* - `string`. A nonce value that will be included on any script or style tags Branch adds to your site. Used to whitelist these tags in your Content Security Policy.

### Testing read deep link

- Used for [Read deep link](#read-deep-link)

- Make a deep link redirect to your website

    ```json
    https://example.app.link/kJNbhZ1PrF?$fallback_url=https://example.com
    ```

- Website will open to [$fallback_url](/links/integrate/#redirections) with `_branch_match_id`

    ```
    https://example.app.link/kJNbhZ1PrF?$fallback_url=https://www.website.com/&_branch_match_id=418480444086051524
    ```

- Read `_branch_match_id` from that `$fallback_url` website

    ```js
    branch.init('key_live_YOUR_KEY_GOES_HERE', function(err, data) {
      console.log(err, data);
    });
    ```

### Journey not sticking to nav

- Navigate to [Dashboard Journey Page](https://branch.dashboard.branch.io/web/journeys)
- Select Journey -> Edit -> Configure Views -> Banner -> Page Placement
- Banner Scroll = `sticky`
- Press `Save & Close`
- Add the following div to your nav

    ```html
    <div class="branch-journeys-top"></div>
    ```

### Create call to action

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

### No Access-Control Error

- Make sure the Branch key is the same within the deep link and website

    ```
    XMLHttpRequest cannot load https://api2.branch.io/v1/open. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access. The response had HTTP status code 400.
    ```

### Browser Fingerprint ID

- In case you need to access your user's Browser Fingerprint ID for user deletion, use the function below.

    ```
    branch.getBrowserFingerprintId(function(err, data) { console.log(data); });
    ```

### Content Security Policy Violations

- Generate a dynamic nonce value, and include that value as a `script-src` and `style-src` exception within your Content Security Policy
- Pass that same value to `branch.init()`

    ```
    branch.init(YOUR_BRANCH_KEY, {'nonce': 'GENERATED_NONCE_VALUE' });
    ```
