## Understand deep linking

- ### Default link behavior

    - #### Your app is not installed

        - User `clicks` on a Branch deep link

        - Device `navigates` to the [fallback](#custom-link-behavior) (e.g. an app store or website)

        - User `installs` and `opens` your app

        - Branch passes deep link `data` into your app

    - #### Your app is installed

        -  User `clicks` on a Branch deep link

        -  Device `opens` your app or navigates to [expected link behavior](#expected-link-behavior)

        -  Branch passes deep link `data` into your app

    - #### Expected link behavior
    
        - Expected link behavior is dependent on whether or not the app supports deep linking

        - `*Able to force app open` using [`$uri_redirect_mode`](#forced-redirections) or enabling a [Deepview](/pages/web/deep-views/)

            | App | iOS | Notes | Android | Notes
            | --- | :-: | :-: | :-: | :-:
            | Facebook Newsfeed | Fallback | *Able to force app open | App |
            | Facebook Browser | App | | App |
            | Facebook Messenger | Fallback | *Able to force app open | App |
            | Facebook Messenger browser | App | | App |
            | Instagram | Fallback | *Able to force app open | App |
            | Snapchat | Fallback | *Able to force app open | App |
            | Twitter | Fallback | *Able to force app open | App |
            | Pinterest | Fallback | | Fallback |
            | Chrome browser | App | | App |
            | Safari browser | App |
            | Firefox browser | Fallback | | App |
            | UC browser | | | App |
            | Naver browser | | | App |
            | Kakao browser | | | App |
            | Opera browser | App | | App |
            | Ghostery browser | App | | Fallback | Query strings must be encoded ($ = %24)
            | Safari address bar | Fallback | [App open blocked by Apple](https://blog.branch.io/the-problem-with-safari-app-redirects/)
            | Chrome address bar | Fallback | | Fallback | Deep link data will not pass into the app
            | Firefox address bar | Fallback | | App
            | Hangouts | App | | App |
            | iMessage | App |
            | Apple Business Chat | App |
            | Slack | App | Must configure Slack to open links with Safari | App |
            | WeChat | Fallback | Customize [WeChat fallback urls](#redirections) | Fallback | Customize [WeChat fallback urls](#redirections)
            | WhatsApp | App | `app.link` require https/http to be clickable | App | `app.link` require https/http to be clickable
            | LINE | Fallback | *Able to force app open | App |
            | Apple Mail | App |
            | Gmail | App | | App
            | Yahoo Mail | Fallback | *Able to force app open | App

- ### Custom link behavior

    - #### Pass data from link to app

        - Add [link data](#configure-deep-links) to each deep link

        - Add key-values pairs to your [Quick Links](/pages/dashboard/analytics/#quick-links)

        - Append query strings `https://example.app.link/fzmLEhobLD?$custom_data=123&hello=world`

    - #### Fallback to a specific URL

        - Determine where a deep link will navigate to if either

            - Your app is not installed

            - *[or]* Another app prevent links from deep linking outside their app

        - Fallback overrides *(ordered by precedence)*
            - Add query string `https://example.app.link?$ios_url=https://example.com`
            - Add link data `$ios_url = 'https://example.com'` ([docs](/pages/links/integrate/#redirections))
            - Add link data for a deep view `$ios_deepview = 'deepviewId'`  ([docs](/pages/links/integrate/#deepview))
            - Enable a `Deep View` globally on the [Branch Dashboard](https://dashboard.branch.io/web/deepviews)
            - Add link data `$fallback_url = 'https://example.com'` ([docs](/pages/links/integrate/#redirections))
            - Add `iOS/Android Custom URL` on the [Branch Dashboard](https://dashboard.branch.io/link-settings)
            - Add `Default URL` (`$fallback_url`) on the [Branch Dashboard](https://dashboard.branch.io/link-settings)

    - #### Open web instead of app
        - Your app is not installed
            - Device `navigates` to the [fallback](#custom-link-behavior) (e.g. an app store or website)
        - Your app is installed
            - *iOS:* need to override `Universal Links`
                - Add `$web_only = true` ([docs](/pages/links/integrate/#redirections))
                - Add redirect `$ios_url = 'https://google.com'` ([docs](/pages/links/integrate/#redirections))
                - *[or]* Append `/e/` to the deep link
                    - e.g. `https://example.app.link/fzmLEhobLD` -> `https://example.app.link/e/fzmLEhobLD`
            - *Android:* need to override `App Links`
                - Uncheck `Enable App Links` and then hit `Save` the [Branch Dashboard](https://dashboard.branch.io/link-settings)
                - Add redirect `$android_url = 'https://google.com'` ([docs](/pages/links/integrate/#redirections))
                - Add a broken URI Scheme with `$android_deeplink_path = 'random'` ([docs](/pages/links/integrate/#deep-linking))

- ### Social link behavior
    - Use [OG Tags](#open-graph) to display content as a preview card in Facebook, Twitter, Pinterest, iMessage, etc.
        - Basics are `$og_title`, `$og_description`, and `$og_image_url`
    - Use [Deep Views]() to display content as a website
        - Increases [install attribution](https://branch.io/deepview/)
        - Completes deep linking experience in [certain apps](#default-link-behavior)

## Create deep links

- ### Short links
    - Short links are the most common deep link
    - Short links encapsulate [link data](#configure-deep-links) inside them on link creation
        - e.g. existing link `https://example.app.link/fzmLEhobLD`
    - Short links can have additional data appended to them
        - e.g. dynamic link `https://example.app.link/fzmLEhobLD?content_id=123`
    - Methods of creating short links
        - Use [Quick Links](/pages/dashboard/analytics/#quick-links) for fast link creation and easy tracking
        - Use our [App SDK](#dialog-code?ios=create-deep-link&android=create-deep-link&adobe=create-deep-link&cordova=create-deep-link&mparticleAndroid=create-deep-link&mparticleIos=create-deep-link&titanium=create-deep-link&reactNative=create-deep-link&unity=create-deep-link&xamarin=create-deep-link) to create and share links within your app
        - Use our [Web SDK](/pages/web/integrate/#create-deep-link) to create links which help convert your web users to app users
        - Use our [HTTP API](/pages/apps/api/#link-create) to programmatically create links from your server
        - Use our [Chrome Extension](https://chrome.google.com/webstore/detail/branch-link-creator/pekdpppibljpmpbcjelehhnldnfbglgf) to generate links from your browser

- ### Long links
    - Long links can be created without a network call to Branch
    - Long links need [link data](#configure-deep-links) to be added as a query string. Be sure to URI encode any urls in the link.
        - e.g. existing link `https://example.app.link/fzmLEhobLD?foo=bar&baz=456&$fallback_url=https%3A%2F%2Fbranch.io%2F`
        - e.g. dynamic link `https://example.app.link/?foo=bar&baz=456&$fallback_url=https%3A%2F%2Fbranch.io%2F`
    - Long links need a `/a/` and a [Branch Key](/pages/dashboard/integrate/#understand-the-branch-key) if you use a `custom link domain`
        - e.g. existing link `https://link.example.com/5NPh/p4M09KRLrD?foo=bar&baz=456&$fallback_url=https%3A%2F%2Fbranch.io%2F`
        - e.g. dynamic link `https://link.example.com/a/key_live_kaFuWw8WvY7yn1d9yYiP8gokwqjV0Swt?foo=bar&baz=456&$fallback_url=https%3A%2F%2Fbranch.io%2F`
    - Long links need a `/a/` and a [Branch Key](/pages/dashboard/integrate/#understand-the-branch-key) if you use a `bnc.lt`
        - e.g. existing link `https://bnc.lt/5NPh/p4M09KRLrD?foo=bar&baz=456&$fallback_url=https%3A%2F%2Fbranch.io%2F`
        - e.g. dynamic link `https://bnc.lt/a/key_live_kaFuWw8WvY7yn1d9yYiP8gokwqjV0Swt?foo=bar&baz=456&$fallback_url=https%3A%2F%2Fbranch.io%2F`
    - When adding `tags` to a dynamic link, enter each tag separately
        - e.g. https://example.app.link/?foo=bar&tags=tag1&tags=tag2

## Configure deep links

- ### Analytical labels

    - These labels allow you to filter and organize your deep links

        | Key | Default | Usage
        | --- | --- | ---
        | ~channel | | Use channel to tag the route that your link reaches users. For example, tag links with `'Facebook'` or `'LinkedIn'` to help track clicks and installs through those paths separately
        | ~feature | | This is the feature of your app that the link might be associated with. For example, if you had built a referral program, you would label links with the feature 'referral'
        | ~campaign | | Use this field to organize the links by actual campaign. For example, if you launched a new feature or product and want to run a campaign around that
        | ~stage | | Use this to categorize the progress or category of a user when the link was generated. For example, if you had an invite system accessible on level 1, level 3 and 5, you could differentiate links generated at each level with this parameter
        | ~tags | | This is a free form entry with unlimited values `['string']`. Use it to organize your link data with labels that don't fit within the bounds of the above
        | alias | | Specify a link alias to replace of the standard encoded short URL (e.g. `https://example.app.link/aQXXDHaxKF` -> `https://example.app.link/youralias`). Link aliases must be unique (a `409 error` will occur if you create an alias already taken). Appending a `/` will break the alias. `bnc.lt` link domain alias links are incompatible with Universal Links and Spotlight.
        | type | `0` | Must be an `int`. Set to `1` to limit deep link to a single use. Set to `2` to make the link show up under [Quick Links](https://dashboard.branch.io/marketing) while adding `$marketing_title` to `data`. Does not work with the Native SDKs.

    - These labels allow you to customize attribution windows for a single link

        | Key | Default | Usage
        | --- | --- | ---
        | $click_install_window_days | 7 | Time between a click or a web to app auto redirect and an install or reinstall. (i.e., https://branchster.app.link/hpNVE52gxE?$click_install_window_days=3)
        | $click_session_start_window_days | 1 | Time between a click or a web to app auto redirect and an open or web session start. (i.e., https://branchster.app.link/hpNVE52gxE?$click_session_start_window_days=7)
        | $click_conversion_window_days | 30 | Time between a click or a web to app auto redirect and a conversion event. Conversion events include commerce events (e.g. purchase, add to cart), all custom events, and all view events like pageviews & content views. (i.e., https://branchster.app.link/hpNVE52gxE?$click_session_start_window_days=30)
        | $impression_install_window_days | 1 | Time between an ad impression and an install or reinstall. (i.e., https://branchster.app.link/hpNVE52gxE?$impression_install_window_days=3)
        | $impression_session_start_window_days | 1 | Time between an ad impression and an open or web session start. (i.e., 	https://branchster.app.link/hpNVE52gxE?$impression_session_start_window_days=1)
        | $impression_conversion_window_days | 7 | Time between an ad impression and a conversion event. Conversion events include commerce events (e.g. purchase, add to cart), all custom events, and all view events like pageviews & content views. (i.e., https://branchster.app.link/hpNVE52gxE?$impression_session_start_window_days=7)

- ### Custom data

    - Pass any custom data to be read inside your app

        | Key | Value | Usage
        | --- | --- | ---
        | random | `123` | Any key-value pair
        | custom_data | `true` | Any key-value pair
        | any_value | `{ 'random': 'dictionary' }` | Any key-value pair
        | look_at | `[1,2,3,4,5,6]` | Any key-value pair
        | nav_here | `content/123` | Any key-value pair

- ### Redirections

    - Navigate to different locations based on device information
    - Navigation URLs must be websites, not deep links

        | Key | Default | Usage
        | --- | --- | ---
        | $fallback_url | | Change the redirect endpoint for all platforms - so you don't have to enable it by platform. Note that Branch will forward all robots to this URL, which **overrides any OG tags** entered in the link.  System-wide Default URL (set in Link Settings)
        | $fallback_url_xx | | Change the redirect endpoint for all platforms based on a [lower-case Alpha-2 country code](https://www.iso.org/obp/ui/#search). For example, `$fallback_url_de="..."` would redirect Germany deep link clicks. You should also set `$fallback_url` to act as the global redirect in addition to the country-specifc ones.
        | $desktop_url | | Change the redirect endpoint on desktops Text-Me-The-App page (set in Link Settings)
        | $ios_url | | Change the redirect endpoint for iOS  App Store page for your app (set in Link Settings)
        | $ipad_url | | Change the redirect endpoint for iPads `$ios_url` value
        | $android_url  | | Change the redirect endpoint for Android Play Store page for your app (set in Link Settings)
        | $samsung_url  | | Redirect to Samsung Galaxy Store on Samsung devices. Only link level control. Format should be `http://www.samsungapps.com/appquery/appDetail.as?appId=YOUR.PACKAGE.NAME`
        | $windows_phone_url  | | Change the redirect endpoint for Windows OS Windows Phone default URL (set in Link Settings)
        | $blackberry_url | | Change the redirect endpoint for Blackberry OS  BlackBerry default URL (set in Link Settings)
        | $fire_url | | Change the redirect endpoint for Amazon Fire OS Fire default URL (set in Link Settings)
        | $ios_wechat_url | | Change the redirect endpoint for WeChat on iOS devices `$ios_url` value
        | $android_wechat_url | | Change the redirect endpoint for WeChat on Android devices  `$android_url` value
        | $web_only | `false` | Force to open the `$fallback_url` instead of the app

- ### Forced redirections

    - Prevent error messages from other apps when Branch deep links are clicked

        | Key | Value | Usage
        | --- | --- | ---
        | $uri_redirect_mode | **0** | This is the default value that yields the standard behavior where we don't try to open the app if the user can see an error.
        | $uri_redirect_mode | **1** | Smart redirect mode. Same behavior as 0 until we know the user has the app installed through Branch persona data. In that case, force URI schemes to open the app.
        | $uri_redirect_mode | **2** | Forceful redirect mode. Always try to force open the app, even if it risks showing an [error message](/img/pages/links/uri-error-message.png) when the app is not installed.

    - Supported Apps

        - Facebook newsfeed iOS
        - Instagram iOS
        - Twitter iOS
        - Safari iOS
        - Firefox iOS & Android

- ### Deep linking

    - Navigate to different locations based on device information

        | Key | Default | Usage
        | --- | --- | ---
        | $deeplink_path | `open?link_click_id=1234` | Set the deep link path for all platforms - so you don't have to enable it by platform. When the Branch SDK receives a link with this parameter set, it will automatically load the custom URI path contained within
        | $android_deeplink_path | | Set the deep link path for Android apps. When the Branch SDK receives a link with this parameter set, it will automatically load the custom Android URI path contained within
        | $ios_deeplink_path | | Set the deep link path for iOS apps. When the Branch SDK receives a link with this parameter set, it will automatically load the custom iOS URI path contained within
        | $desktop_deeplink_path | | Set the deep link path for Desktop apps. You will have to fetch this parameter and route the user accordingly
        | $match_duration | `7200` | Lets you control the snapshotting match timeout (the time that a click will wait for an app open to match) also known as attribution window. Specified in seconds
        | $always_deeplink | `true` | Set to `false` to make links always fall back to your mobile site. Does not apply to Universal Links or Android App Links.
        | $ios_redirect_timeout | `750` | Control the timeout that the client-side JS waits after trying to open up the app before redirecting to the App Store. Specified in milliseconds
        | $android_redirect_timeout | `750` | Control the timeout that the client side JS waits after trying to open up the app before redirecting to the Play Store. Specified in milliseconds
        | $custom_sms_text | | Text for SMS link sent for desktop clicks to this link. Must contain `{{ link }}` Value of Text me the app page in Settings
        | $marketing_title | | Set the marketing title for the deep link in the [Quick Links](https://dashboard.branch.io/marketing) when creating links from the API with `type` = `2`

- ### Content

    - Handle content properties

        | Key | Default | Usage
        | --- | --- | ---
        | $publicly_indexable | `1` | Cannot modify here. Needs to be set by the Branch Universal Object
        | ~keyword | | Keywords for which this content should be discovered by. Just assign an array of strings with the keywords you'd like to use
        | $canonical_identifier | | This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities
        | $exp_date | `0` | The date when the content will not longer be available or valid. The value must be an epoch timestamp in milliseconds (e.g. `1512000420`) within the Branch Universal Object. The click will be attributed, but the install/open will not be
        | $content_type | | This is a label for the type of content present. Apple recommends that you use uniform type identifier as described here
        | $do_not_process | `false` | This will prevent click tracking and storage of link analytics. Deep link data will still flow into the app from link click to app open.

- ### Deepview

    - Enable / control [active deepview](/pages/web/deep-views/#active-deepviews) properties

        | Key | Default | Usage
        | --- | --- | ---
        | $ios_deepview | `branch_default` | The name of the deepview template to use for iOS
        | $android_deepview | `branch_default` | The name of the deepview template to use for Android
        | $desktop_deepview | `branch_default` | The name of the deepview template to use for the Desktop

    - Control [passive deepview](/pages/web/deep-views/#passive-deepviews) templates

        | Key | Value | Default
        | --- | --- | ---
        | $ios_passive_deepview | The name of the template to use for iOS. | `branch_default`
        | $android_passive_deepview | The name of the template to use for Android. | `branch_default`

- ### Open Graph

    - Handle Facebook properties

        | Key | Default | Usage
        | --- | --- | ---
        | $og_title | Set on dashboard | Set the title of the link as it will be seen in social media displays
        | $og_description | Set on dashboard | Set the description of the link as it will be seen in social media displays
        | $og_image_url | Set on dashboard | Set the image of the link as it will be seen in social media displays
        | $og_image_width | | Set the image's width in pixels for social media displays
        | $og_image_height | | Set the image's height in pixels for social media displays
        | $og_video | | Set a video as it will be seen in social media displays
        | $og_url | | Set the base URL of the link as it will be seen in social media displays
        | $og_type | | Set the type of custom card format link as it will be seen in social media displays. Don't set this property when sharing deep links on Facebook
        | $og_redirect | | (Advanced, not recommended) Set a custom URL that we redirect the social media robots to in order to retrieve all the appropriate tags
        | $og_app_id | Set on dashboard | (Rarely used) Sets the app id tag

- ### Twitter

    - Handle Twitter properties

        | Key | Default | Usage
        | --- | --- | ---
        | $twitter_card | | Set the Twitter card type of the link (e.g. `player`) (you must whitelist your deep link with the [Twitter Card Validator](https://cards-dev.twitter.com/validator)
        | $twitter_title | Set on dashboard | Set the title of the Twitter card
        | $twitter_description | Set on dashboard | Set the description of the Twitter card
        | $twitter_image_url | Set on dashboard | Set the image URL for the Twitter card
        | $twitter_site | | Set the site for Twitter
        | $twitter_app_country | | Set the app country for the app card
        | $twitter_player | | Set the video player's URL. Defaults to the value of `$og_video`.
        | $twitter_player_width | | Set the player's width in pixels
        | $twitter_player_height | | Set the player's height in pixels

- ### Custom Tags

    - Handle custom meta tags

        | Key | Value
        | --- | ---
        | $custom_meta_tags | Valid stringified JSON dictionary of the tags’ keys and values

    - Valid dictionary example: "{\"twitter:player:stream\": \"https://branch.io\"}". This will result in the following meta tag: `<meta property="twitter:player:stream" content="https://branch.io" />`
    - If you create the link via the Dashboard, don’t worry about stringifying the dictionary. It will be done automatically.
    - apple_touch_icon is a special key in the dictionary. If you set it, we will add a `<link rel="apple-touch-icon" href="<url>" />` tag to the scraped HTML page. This will allow you to show a custom icon for previews in iMessage, Safari Bookmarks, Slack, etc.

- ### Universal Object

    - Properties for the Branch Universal Object within your [app](#dialog-code?ios=create-content-reference&android=create-content-reference&adobe=create-deep-link&cordova=create-content-reference&mparticleAndroid=create-content-reference&mparticleIos=create-content-reference&titanium=create-content-reference&reactNative=create-content-reference&unity=create-content-reference&xamarin=create-content-reference) integration

        | Key | Default | Usage | Link Property
        | --- | :-: | --- | :-:
        | canonicalIdentifier | | **(Required)** This is the unique identifier for content that will help Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities | `$canonical_identifier`
        | canonicalUrl | | The canonical URL, used for SEO purposes | `$canonical_url`
        | title | | The name for the piece of content | `$og_title`
        | contentDescription | | A description for the content | `$og_description`
        | contentImageUrl | | The image URL for the content. Must be an absolute path | `$og_image_url `
        | price | | The price of the item | `$amount`
        | currency | | The currency representing the price in ISO 4217 currency code | `$currency`
        | contentIndexingMode | `"public"` | Can be set to either `"public"` or `"private"`. Public indicates that you'd like this content to be discovered by other apps. | `$publicly_indexable`
        | contentMetadata | | Any custom key-value data e.g. `{ "custom": "data" }`

    - Best practices for the Branch Universal Object
        - Do
            - Set the `canonicalIdentifier` to a unique, de-duped value across instances of the app
            - Ensure that the `title`, `contentDescription` and `imageUrl` properly represent the object
            - Initialize the Branch Universal Object and call logEvent with the `VIEW_ITEM` event on page load
            - Call showShareSheet and createShortLink later in the life cycle, when the user takes an action that needs a link
            - Call the additional object events (purchase, share completed, etc) when the corresponding user action is taken
        - Do not
            - Set the same `title`, `contentDescription` and `imageUrl` across all objects
            - Wait to initialize the object and register views until the user goes to share
            - Wait to initialize the object until you conveniently need a link
            - Create many objects at once and register views in a `for` loop.


## Read deep links

- Deep link data gets sent from your link to your [app](#dialog-code?ios=read-deep-link&android=read-deep-link&adobe=read-deep-link&cordova=read-deep-link&mparticleAndroid=read-deep-link&mparticleIos=read-deep-link&titanium=read-deep-link&reactNative=read-deep-link&unity=read-deep-link&xamarin=read-deep-link) or [website](/pages/web/integrate/) integration

- ### Data structure

    - Example deep link data structure

        ```json
        {
          "identity_id": "427469360685348303",
          "link": "https://example.app.link?%24identity_id=427469360685348303",
          "session_id": "429691081177874743",
          "data": {
            "$canonical_identifier": "item/1503684554354.28",
            "$desktop_url": "http://example.com/home",
            "$exp_date": 0,
            "$identity_id": "427469360685348303",
            "$og_description": "My Content Description",
            "$og_image_url": "http://lorempixel.com/200/200/",
            "$og_title": "46D6D28E-0390-40E4-A856-BD74F34D24C8",
            "$publicly_indexable": 1,
            "+click_timestamp": 1503684563,
            "+clicked_branch_link": true,
            "+is_first_session": false,
            "+match_guaranteed": true,
            "custom": "blue",
            "random": "FE848A5B-78F7-42EC-A253-9F795FE91692",
            "added": "1503684554354.33",
            "~campaign": "new launch",
            "~channel": "facebook",
            "~creation_source": 3,
            "~feature": "sharing",
            "~id": 429691043152332059,
            "~referring_link": "https://example.app.link/X7OsnWv9TF",
            "~stage": "new person",
            "~tags": [
              "one",
              "two"
            ]
          }
        }
        ```

- ### Reserved prefixes

    - Branch adds additional properties to your deep link data to explain the link

        | Prefix | Usage |
        | --- | --- |
        | $ | Branch reserved keyword
        | ~ | Branch analytical data
        | + | Branch added values

- ### Callback values

    - Additional properties read from the `initSession` within your [app](#dialog-code?ios=initialize-branch&android=initialize-branch&adobe=initialize-branch&cordova=initialize-branch&mparticleAndroid=initialize-branch&mparticleIos=initialize-branch&titanium=initialize-branch&reactNative=initialize-branch&unity=initialize-branch&xamarin=initialize-branch) and [website](/pages/web/integrate/) integrations

        | Key | Default | Usage
        | --- | --- | ---
        | ~id | | Automatically generated 18 digit ID number for the link that drove the install/open, if present (0 for dynamic and 3P links)
        | ~referring_link | | The referring link that drove the install/open, if present
        | ~creation_source | |  Where the link was created (`0` API , `1` Quick Link, `2` SDK, `3` iOS SDK , `4` Android SDK , `5` Web SDK, `6` Dynamic, `7` Third party)
        | +match_guaranteed | | If the match was made with 100% accuracy
        | +referrer | | The referrer for the link click, if a link was clicked
        | +phone_number | | The phone number of the user, if the user texted himself/herself the app
        | +is_first_session | `false` | `true` if first session (install), `false` if any other session (open)
        | +clicked_branch_link | `false` | Whether or not the user clicked a Branch link that triggered this session
        | +non_branch_link | | App was opened from a non Branch link (third party, invalid Branch deep link, or Branch key mismatch)

## Troubleshoot issues

- ### Deep links do not open app
    - Make sure you are clicking on a deep link (e.g. `https://example.app.link/fzmLEhobLD`)
    - Make sure you are not pasting a deep link in the address bar (in most cases, deep links must be clicked on)
    - Make sure the deep link is not wrapped (e.g. `http://bit.ly/2yz3b8D` instead of `https://example.app.link/fzmLEhobLD`)
    - Make sure you have [configure your dashboard](/pages/dashboard/integrate/) and [configure your app](#dialog-code)
    - Make sure the `Branch key` [in your app](#dialog-code) matches the `Branch key` [in your deep link](#view-deep-link-data)
    - Make sure you have not [disabled universal linking on iOS](/pages/apps/ios/#re-enable-universal-linking)
    - Make sure you understand the [expected behavior of deep links](#default-link-behavior)
    - Make sure the deep link domain matches your [link domain](https://dashboard.branch.io/link-settings) (e.g. link domain = `example.app.link`, deep link = `https://example.app.link/fzmLEhobLD`)

- ### View deep link data
    - Add `?debug=1` to the end of your deep link
    - For example: https://example.app.link/aQXXDHaxKF?debug=1
    
- ### View deep link stats
    - Add `?stats=1` to the end of your deep link
    - For example: https://example.app.link/aQXXDHaxKF?stats=1
