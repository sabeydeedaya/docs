---
title: Dashboard analytics
---

## Understand tracking

- ### Analytical behavior
    - Whenever a user `clicks` on a deep link and `opens` the app
    - This triggers an `install` or an `open` (`re-open`)
        - `installs` represent Branch recognizing the app_id and device_id for the first time
        - `installs` represent new app users and the success rate of your Branch deep links
        - `installs` do **not** represent App Store downloads
        - `non-Branch installs` are installs outside of Branch deep link clicks
        - `opens` are non-installs
        - If a user uninstalls and reinstalls the app, this will be an `open` because Branch recognizes the device
        - If a user has the app and clicks a Branch deep link, this will be an `open` because the user is not new

- ### Dashboard behavior
    - The [Branch Dashboard](https://dashboard.branch.io/) is a great tool for measuring growth and engagement of your app
    - Branch tracks `click`, `installs`, and `opens` (`re-opens`) for both Branch related events and non-Branch related events
    - The values of the dropdowns are limited to the data within the `date range`
    - The `date range` filters for any any events (e.g. `clicks`, `installs`, `purchases`) in the selected date range. For example, this means the dashboard will show all attributed `purchases` that occurred during the selected date range, regardless of the date of click that lead to those purchases.
    - `Untracked` means this metric is non-Branch related (e.g. installs that don't come from Branch deep links)
    - `Unique` are the same unique user/browser based off fingerprint id and the time frame
    - `Unspecified` means that this metric does not have the selected filter (e.g. the Campaign field for the deep link is blank)

## Common Analytics Objectives

- ### User value attribution
    - Measure app growth through automatic `event tracking` and `user identity` tracking
    - Use [Configure you app](#dialog-code?ios=track-events&android=track-events&adobe=track-events&cordova=track-events&mparticleAndroid=track-events&mparticleIos=track-events&titanium=track-events&reactNative=track-events&unity=track-events&xamarin=track-events) to send events and user information (`email`, `ID`, `UUID`, etc) from your app to the [Branch dashboard](https://dashboard.branch.io/)
    - The `identity` is retroactively associated with any previously recorded events
    - Define all the custom events (`signups`, `purchases`, `shares`, etc.) you want to track
    - Branch automatically creates certain events whenever a user accesses your site or your app:

        | Key | Value
        | --- | ---
        | `install` | Triggered the first time a user launches your app
        | `open` | Triggered whenever the app becomes active (includes reinstalls)
        | `referred session` | Triggered in addition to install, open or web session start if a user comes from a Branch link
        | `web session start` | Triggered when the user views a webpage using the Branch Web SDK.

- ### Growth attribution
    + You can measure your app growth in the [Dashboard](https://dashboard.branch.io) through automatic event tracking and user identity tracking.
    + You can also define as many custom events (signups, purchases, shares, etc.) as you wish - see the [User Value Attribution](/dashboard/analytics/#user-value-attribution) guide for more on tracking custom events. You can see these events as they occur on the Live View > Events page.

    - You can measure your app growth in the [Dashboard](https://dashboard.branch.io) through automatic event tracking and user identity tracking.
        - You can also define as many custom events (signups, purchases, shares, etc.) as you wish - see the [User Value Attribution](/dashboard/analytics/#user-value-attribution) guide for more on tracking custom events. You can see these events as they occur on the Live View > Events page.

        - You must [identify your users](#dialog-code?ios=track-users&android=track-users&adobe=track-users&cordova=track-users&mparticleAndroid=track-users&mparticleIos=track-users&titanium=track-users&reactNative=track-users&unity=track-users&xamarin=track-users) in order for the `User ID` column to be populated. The `Branch ID` refers to the internal Branch ID associated with that user. The `Developer ID` is the value you assign when you set the identity
        - You must [setting identities](#dialog-code?ios=track-users&android=track-users&adobe=track-users&cordova=track-users&mparticleAndroid=track-users&mparticleIos=track-users&titanium=track-users&reactNative=track-users&unity=track-users&xamarin=track-users) within your app

        - Measuring influencers
        The [Analytics](https://dashboard.branch.io/referrals/analytics) page on the dashboard will show you who is driving the most new signups.

            ![image](/_assets/img/pages/dashboard/referrals.png)


## Dashboard pages

- ### Summary
    - The [Dashboard Summary](https://dashboard.branch.io/) shows a high level overview of the success of your deep linking
    - View `Installs` which show both Branch and non-Branch installs
    - View `Click flow` to discover where your deep links are being clicked at
    - View `Journeys` to see you Journey funnel from `view` to `click` to either `install` or `open`
    - View `Deepviews` to see you Deepview funnel from `view` to `click` to either `install` or `open`
    - Note [Dashboard behavior](#dashboard-behavior)

- ### Journey Banners
    - The [Dashboard Journey](https://dashboard.branch.io/) allows you to create, configure, and add a banner to your website to convert mobile users to app users
    - Find more information in [Journey app banners](/web/journeys/) and [Journey Amp banners](/web/amp-journeys/)

- ### Deepview Preview
    - The [Dashboard Preview](https://dashboard.branch.io/) is a content preview for your app to increase app install conversion
    - Find more information in [Deepviews](/web/deep-views/)
    - Deepviews also help deep links work in all platforms [Supported Platforms](/links/integrate/#expected-redirect-behavior)

- ### Desktop SMS
    - The [Dashboard Text Me The App](https://dashboard.branch.io/) allows you to send a deep link with in a text message to users to convert desktop users to app users
    - Find more information in [Text Me The App](/web/text-me-the-app/)

- ### Ads
    - [Dashboard Ads](https://dashboard.branch.io/email) allows you to easily integrate Branch deep links with your email providers
    - Find more information in [Ads](/deep-linked-ads/dynamic-product-feeds/)

- ### Emails
    - [Dashboard Emails](https://dashboard.branch.io/email) allows you to easily integrate Branch deep links with your email providers
    - Find more information in [Emails](/emails/braze/)

- ### Organic Search

    - [Dashboard Organic Search](https://dashboard.branch.io/search) shows you how your deep links and content are being scraped by search engines
    - Use [app indexing](/organic-search/firebase/) within your app to enable
    - Validate with the [App indexing validator](https://branch.io/resources/app-indexing/)

- ### Referrals

    - [Dashboard Referrals](https://dashboard.branch.io/referrals/analytics) allows you to track referrals between users

    - The dashboard updates every 4 hours

    - ##### Implementing

        - Referrer has their [identity set](#dialog-code?ios=track-users&android=track-users&adobe=track-users&cordova=track-users&mparticleAndroid=track-users&mparticleIos=track-users&titanium=track-users&reactNative=track-users&unity=track-users&xamarin=track-users)
        - Referrer `creates` a deep link
        - Referrer `shares` the deep link
        - Referee `clicks` on the deep link
        - Referee has their [identity set](#dialog-code?ios=track-users&android=track-users&adobe=track-users&cordova=track-users&mparticleAndroid=track-users&mparticleIos=track-users&titanium=track-users&reactNative=track-users&unity=track-users&xamarin=track-users)
        - Referee triggers a [custom event](#dialog-code?ios=track-events&android=track-events&adobe=track-events&cordova=track-events&mparticleAndroid=track-events&mparticleIos=track-events&titanium=track-events&reactNative=track-events&unity=track-events&xamarin=track-events)
        - The custom event triggers a [Reward rule](https://dashboard.branch.io/referrals/rules) to assign referral points

    - ##### Troubleshooting

        - The Referrer and Referee are connected by the `deep link`
        - Referring points happen whenever the `custom event` occurs in the app which triggers the `referral rule`
        - It is best to assign referring points on a `custom event` rather than Branch events (install and open) to prevent referral abuse
        - Make sure you set the identity of both the referrer and referee to prevent anonymous users from showing up in your [Referral analytics](https://dashboard.branch.io/referrals/analytics)
        - Referrals are based on a `session`, not a device. If a user closes and opens the app before triggering the referral rule, then the referral points will not be delivered
        - If your referrals are based on custom install event, then you will need to uninstall the app and [simulate a Branch install](#dialog-code) to test referrals
        - A [Reward rule](https://dashboard.branch.io/referrals/rules) with `All acting users` will trigger credits even if a referral did not happen. To only reward credits on a referral, use `Referring users` or `Referred acting users`

    - ##### Tracking
        - Use the [Referral analytics](https://dashboard.branch.io/referrals/analytics)
        - Use the [LiveView export](https://dashboard.branch.io/liveview/link_clicks) to get data as a `.csv`
        - Create a [Webhook](/exports/webhooks/) to send data to your server

    - ##### Querying
        - Query the events export the custom referral event that triggered the referral rule
        - The `developer identity` of this event is your referee
        - The `session referring developer identity` is your referrer

- ### Quick Links
    - [Dashboard Quick Links](https://dashboard.branch.io/quick-links) allows you to quickly create deep links and track their analytics in the dashboard
    - Use the `Create Link` button in the header to generate a quick link
    - Use the `Event` dropdown to see a funnel of your analytics to a [custom event](#dialog-code?ios=track-events&android=track-events&adobe=track-events&cordova=track-events&mparticleAndroid=track-events&mparticleIos=track-events&titanium=track-events&reactNative=track-events&unity=track-events&xamarin=track-events) inside your app
    - Use the `Export` button to get a email with a `.csv` of your quick link data
    - Use the `Bulk Create Links` to upload a `.csv` file with deep link to be created
    - Use the `...` button to `Edit`, `View stats`, `Debug`, `Duplicate`, or `Archive` quick links

- ### Link Settings
    - [Dashboard Link Settings](https://dashboard.branch.io/link-settings) allow you to make configurations to your default link behavior
    - Find more information in [Configure your dashboard](/dashboard/integrate/)

- ### Sources
    - [Dashboard Sources](https://dashboard.branch.io/sources) display `clicks`, `installs`, `sessions`, and `custom events` per [analytical label](/links/integrate/#analytical-labels)
    - Updates every 1.5 hours
    - Use the `Event` dropdown to see a funnel of your analytics to a [custom event](#dialog-code?ios=track-events&android=track-events&adobe=track-events&cordova=track-events&mparticleAndroid=track-events&mparticleIos=track-events&titanium=track-events&reactNative=track-events&unity=track-events&xamarin=track-events) inside your app
    - Use the `Export` button to get a email with a `.csv` of your source data
    - Use the `Slice by platform` to remove robot traffic from your analytics
    - Use the `filter` dropdowns to limit data

- ### Content
    - [Dashboard Content](https://dashboard.branch.io/content) tracks the attribution per content
    - Updates every 1.5 hours
    - Content is tracked whenever deep links are shared (clicks which lead to open/installs)
    - Each content must be meaningful unique attributes
        - `$deeplink_path`
        - `$desktop_url`
        - `$canonical_identifier`
        - `$og_title` + `$og_description` + `$og_image_url`
        - (not all required. ordered by precedence)

- ### Data Integrations
    - [Dashboard Integrations](https://dashboard.branch.io/data-import-export/integrations) allows you to create data integrations to send Branch data to third party vendors
    - Find more information in [Data Integrations](/integrations/adobe-analytics/)

- ### Webhooks
    - [Dashboard Webhooks](https://dashboard.branch.io/data-import-export/webhooks) allows you to create webhooks to send Branch data to your servers
    - Find more information in [Webhooks](/exports/webhooks/)
    - Best to test with [Liveview](#liveview)

- ### LiveView
    - [Dashboard Liveview](https://dashboard.branch.io/liveview/links) allows you to view real time data for everything related to Branch
    - `Export` and filter liveview data based on `Links`, `Clicks`, `Identities`, `Events`, `Credits`, `Content`, and `Commerce`

- ### Account settings
    - [Dashboard Account Setting](https://dashboard.branch.io/account-settings/app) is where you find your `Branch Keys`, `User information`, `Billing`, and `Team`
    - Find more information in [Configure your dashboard](/dashboard/integrate/#advance-integration)

