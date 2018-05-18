## Overview

On a daily basis, Google Search drives **more app installs** than all of Facebook's paid install products combined. Converting your mobile web visitors into native app users is one of the most effective acquisition channels available, and Branch's Journeys App Banners platform makes this easy.

![image](/img/pages/journeys/journeys-examples.png)

- **Customizable presentation.** WYSIWYG designer for smart banner or full-page interstitial, with more coming soon.
- **Powerful targeting rules.** Want to show your Journey only visitors without your app installed already? All iOS users from Japan? Just users viewing your checkout page? Android users who have visited your website twice AND purchased something using your app? The possibilities are infinite.
- **AMP-compatible.** You can convert mobile search traffic to your app by [showing Journeys on AMP pages](/pages/web/amp-journeys/).
- **Run A/B tests.** Design multiple campaign versions to see which converts most effectively.
- **Optimized user experience.** If installed, your app will open and users can be routed directly to the content they expect. If not, the App/Play store will open and users can still be routed directly to the content they expect after installing.
- **Comprehensive analytics.** Measure the downstream performance and retention of every Journeys campaign.


!!! note "Journeys is a paid product"
    Journeys introduces many more advanced features on top of the basic smart app banner functionality, but **you can still create an Android and iOS smart app banner for free if your MAU are under 20k**. After 20k MAU, we'd ask that you pay a small fee for use. Premium-only advanced features (including the option to run multiple Journeys simultaneously) are available through a 14 day trial.

!!! note "Pre-reqs"
    You should integrate the Branch SDK into your app and configure deep link routing for deferred deep linking and attribution before implementing Journeys.

## Setup

!!! note "Include your alternate domain for Universal Links"
    Journeys uses your alternate domain for Universal Links. Make sure you include your `xxxx-alternate.app.link` domain in your [Associated Domains](/pages/apps/ios/#configure-associated-domains). If you use a custom domain or subdomain for your Branch links, you should instead add entries for `applinks:[mycustomdomainorsubdomain]` and `XXXX-alternate.app.link`. If you’re unsure of your Branch-assigned app.link subdomain, [contact support](https://support.branch.io), and we can provide it.

### Add the Branch Web SDK to your site

Add the following code somewhere inside the `<head></head>` tags on your website. We recommend loading the SDK as early as possible for optimal Journeys performance. More information about this SDK can be found in the [Github README](https://github.com/BranchMetrics/web-branch-deep-linking).

```html
<script type="text/javascript">
{! partials/web-sdk-init.md !}
</script>
```

{! partials/replace-branch-key.md !}

!!! note “GDPR considerations”
    In order to help our customers comply with [GDPR](https://branch.io/gdpr/), we’ve updated our Web SDK with a [Do Not Track mode](https://docs.branch.io/pages/web/integrate/#enable-do-not-track-mode). This way, if a user indicates that they want to remain private on your website, you can continue to make use of the Branch Web SDK (e.g. for creating Branch links) while not tracking that user. Click [here](https://docs.branch.io/pages/web/journeys/#journeys-and-gdpr) for information on how this mode impacts Journeys.


### Deep linking from the banner or interstitial

Like all Branch deep links, you can pass custom parameters by specifying keys in the link's [data dictionary](/pages/links/integrate/#configure-deep-links). This is useful if you are showing the Smart Banner on a website page with equivalent in-app content, because you can route directly to that content in your app.

This example will take the visitor straight to a picture with id “12345” after installing and opening the app.

```javascript
branch.setBranchViewData({
    data: {
        '$deeplink_path': 'picture/12345',
        'picture_id': '12345',
        'user_id': '45123'
    }
});
```


Alternatively, you can dynamically specify the deep link path depending on which website page is loaded.

```javascript
branch.setBranchViewData({
    data: {
        '$deeplink_path': window.location.pathname + window.location.search + window.location.hash,
        'user_id': '45123'
    }
});
```

If a user is referred to a page running Journeys via a Branch link, then referring link data will be passed into the Journeys call-to-action by default. If you’re using setBranchViewData() to specify link data for Journeys on that page, the only data from setBranchViewData() that will be used are [dynamic Journeys layout parameters](/pages/web/journeys/#dynamic-journeys-layout-customization); all other data in that call will be ignored, unless `make_new_link` is set to `true` in `branch.init()`. You can find more information [here](/pages/web/journeys/#preserve-or-discard-referring-link-data).

### Create Journey banner or interstitial

1. Head to the [Journeys page](http://dashboard.branch.io/journeys) on the Branch dashboard.
2. Click the **Create New Journey** button to get started.

![image](/img/pages/journeys/create-journey-button.png)

3. In the **Journey Name:** field, enter a name to use for internal reference (this will never be shown to your users).

![image](/img/pages/journeys/journeys-name.png)

### Select audience

You can customize the audience that will see your Journey by choosing target platforms and device types, and by adding additional targeting rules.

![image](/img/pages/journeys/audience-rules.png)

| Option | Description |
| --- | --- |
| Platform | Branch currently offers Journeys on one platform: **Mobile web**. This will display for mobile users on your website. _More options coming soon._
| Devices | Which devices would you like to target? For example, if you only have an iOS app, then you might want to show a Journey only to users viewing your mobile website on iOS.
| Additional Filters | Read about advanced filtering criteria [here](/pages/web/journeys/#advanced-audience-rules).

### Select and style the banner or interstitial

1. First, click the **Select a Template** button. ![image](/img/pages/journeys/select-template.png)
1. Next, click to select the type of template that you want to show. There are three template options:
    - Smart Banner at bottom of screen.
    - Smart Banner at top of screen
    - Full Screen Interstitial (SEO friendly!)
    - _The fourth option shown is an alternate preconfiguration of the full screen interstitial_![image](/img/pages/journeys/select-template-type.png)
1. Click **Customize** to make changes to the template.
1. In the **Customize Template** heading, you may edit the the name to use for internal reference.
1. Click any object in the preview to edit it. To see documentation on all customization options, [click here](/pages/web/journeys/#template-customization-options).
1. When finished, click **Save & Close** button to continue.

**Note about generic deep linking params** If you are running a generic download campaign or a site-wide discount offer, your users would go to the same place inside your app regardless of where they originated on your website. You can configure this destination by setting **Deep Link Data** for the **Button** element when you [customize your template options](/pages/web/journeys/#template-customization-options).

### Validate & Test

This screen allows you to preview your Journey variations, and is where you can perform final validation and testing on your Journey before publishing it.

![image](/img/pages/journeys/validate-and-test.png)

#### Preview

Use the dropdown menu to switch between your Journey variations.

![image](/img/pages/journeys/select-preview-variation.png)

To preview your Journey in your live, production website, enter your website URL in the **Test on your mobile device** field, and press the copy button. **The URL you enter must have the Branch Web SDK integrated and be using your Branch Key.**

![image](/img/pages/journeys/test-on-device.png)

!!! protip "How does this work?"
    The Branch SDK integrated into your website listens for a unique, one-time URL parameter that is generated by the preview tool. It looks something like `_branch_view_id=296449069883323397`. When this parameter is detected, the SDK loads a temporary preview of that specific Journey. This parameter is only valid for your Branch Key, and will not work on any other website even if the Branch SDK is integrated.

#### Validation

![image](/img/pages/journeys/validation-messages.png)

There are a number of errors and warnings you may encounter.

#### Web SDK errors

You must have the web SDK installed on your website to run a Journey.

#### App SDK warnings

If you choose to target iOS or Android users but haven’t integrated those SDKs, your Journeys will still show on the correct devices and direct users to your app. However, you won’t be able to get any install or event attribution for your Journeys, and you will not be able to deep link users to content inside your app. Be sure to integrate the Branch SDK into your app.

#### Audience rule warnings

You will see a warning if your audience rules do not add up to 100%. If less than 100%, the remainder will see whatever is normal behavior for your website. Your Journey will still run.

#### Premium account warnings
If you have built a Journey that includes premium-only functionality, you will see a warning, as certain features are only available by purchasing.

### Managing your Journeys App Banners

The [Journeys Manager](https://dashboard.branch.io/journeys) is your homepage for all of the personalized experiences create. You can turn Journeys on and off, clone them, or view performance.

![image](/img/pages/journeys/journeys-manager.png)

A Journey can have one of four states:

| State | Meaning | Next Stage |
| --- | --- | --- |
| Draft | Not yet published, editable | **Active** |
| Active | Live for your users, editable | **Stopped** |
| Stopped | Not live for your users, editable | **Active** or **Archived** |
| Archived | Not live for your users, editable | _none_ |

You can activate a journey directly from the creation flow, or from **Start** in the Actions menus in the Journeys Manager.

![image](/img/pages/journeys/edit-journeys.png)

!!! protip "Editing a live Journey"

You may edit Journeys in all states; if you do, however, your Journeys' performance and analytics may change. If you do decide to make a change, we recommend making a note of what you changed and when you made the change.


### Prioritizing Journeys

The Journeys Priority View allows you to set the priority of multiple Journeys when they **overlap**. They **overlap** when a single person is eligible to see multiple Journeys. You can prioritize the Journey that should show ahead of any others.

Let's say you have two Journeys that may reach the same audience.

1. A half page interstitial that promotes an offer on your "Shoes" category page.
2. A smart banner that should show for all visitors.

In general, you'd like the interstitial to show ahead of the smart banner on the "Shoes" category page (where both audience segments overlap).

To prioritize Journeys, switch to the Priority View by clicking on the toggle.

![image](/img/pages/journeys/priority-view-toggle.png)

You're now in Priority View.

1. Drag and drop Journeys in the order you'd like them to show. The lower numbers mean higher priority (i.e. a Journey with priority 1 is going to show ahead of a Journey with priority 2).

![image](/img/pages/journeys/first-priority-view.png)

2. Click the **Save** button.

![image](/img/pages/journeys/save-priority.png)

3. Your Journeys have now been prioritized.

![image](/img/pages/journeys/final-priority-view.png)

!!! warning "Caution"

    When you save Journeys priorities, **ALL** Journeys will be prioritized in the order they appear in the table.


For more detailed Journeys prioritization questions, visit our [Advanced section](/pages/web/journeys/#prioritization).


### Visualizing Journeys performance

#### Analytics & attribution

Journeys map to [standard Branch analytics labels](/getting-started/configuring-links/#analytics-labels):

- All Journeys: `feature` = `journeys`
- Each Journey: `campaign` = `[Journey Name]`
- Individual Templates: `tags` = `[Template Name]` (+ any additional tags you specify during configuration)

You can access your Journey’s performance by selecting **View Performance** from the actions menu in the Journeys Manager.

![image](/img/pages/journeys/view-performance.png)

#### Using Source Analytics

You can also access Journeys analytics by selecting the above filters from the [Source Analytics](http://dashboard.branch.io/analytics/source) page of the Branch dashboard.

![image](/img/pages/journeys/view-source-analytics.png)

##### To compare all of your Journeys

1. Filter by `feature` = `journeys`

##### To compare variations within one Journey

1. Filter by `feature` = `journeys`
2. Filter by `campaign` = `[Journey Name]`

!!! protip "Attribute Journeys events to referring links"

    By default, when users arrive on a page running Journeys via a Branch link, then any interaction with the Journey (click/install/re-open) will be attributed to the referring Branch link, rather than to the Journey. [Learn how](/pages/web/journeys/#preserve-or-discard-referring-link-data) to attribute this data to the Journey instead.


## Advanced

### Advanced audience rules

You can target users on a more granular level - based on behavior like where they came from, whether they already have your app installed, and what they’ve done on your website or in your app. We've created a bunch of great examples on the [next tab](/pages/web/journeys/#examples).

![image](/img/pages/journeys/advanced-audience-rules.png)

#### Has completed event

If you have [custom event tracking](/pages/apps/ios/#track-events) set up, you can target users based on events that you define. For instance, you might want to show a Journey to users who have completed a purchase within the last week, or who add an item to their shopping cart more than three times.

<!-- #### Referred from site

You can target a user based on the last touch point before they entered your website. For example, if you want to target users that found you through Google Search, you can select “Referred from site” and fill in `google.com`. Currently, we only support domain names in the Referred from site field. -->

#### Is located

Use this filter to target (or exclude) users viewing your website in different regions. Target by country, state/province, or city.

#### Is viewing a page url

You can define which subsets of your website the Journey will appear. For example, maybe you have a page `yoursite.com/settings` and `yoursite.com/products/1234`. You could fill in `products` here and only users visiting a URL with that substring present would see the Journey.

#### Has visited web

Here, you can use website visits to determine who to target. For instance, you might decide that someone who visits your site five times is ready to see a Journey with some extra incentive to open the app.

#### Has visited the app

Similar to visited web, you can target users by number of app visits. For example, someone who has visited the app two times and opens up the mobile web could be lured back into the app with a Journey.

#### Has the app installed

You might choose to only show a Journey that asks a user to open the app to those that already have it installed.

#### Has clicked on ad

A user is grouped into "Has clicked on Ad" when they've clicked a link from [Deep Linked Feeds](/pages/deep-linked-ads/dynamic-product-feeds/).

Use this to target users who have been part of an ad campaign to improve your ROI; maybe with a specific call to action to open the app and buy something if they've also never made a purchase in the app.

The technical definition is that they've clicked on a link with an Ad Network's custom `$3p` value in link data, but you just need to consider the way the link is created - in this case, through Deep Linked Feeds.

#### Has clicked on email

A user is grouped into "Has clicked on Email" when they've clicked a link from [Deep Linked Email](https://dashboard.branch.io/email).

Use this to target users who have been part of an email campaign; maybe with a specific call to action to get them download the app if they don't have it and they've landed on mobile web.

The technical definition is that they've clicked on a link with an Email Service Provider's custom `$3p` value in link data, but you just need to consider the way the link is created - in this case, through a Deep Linked Email integration.

#### Is viewing a page with metadata key

Use this filter to target users viewing web pages with certain metadata specified. This data can be specified in HTML `<meta>` tags on a webpage, passed in as options in the `init()` call that you use to initialize the Branch web SDK, or passed in using the `track()` call in Branch’s web SDK. Note that if you opt to use HTML `<meta>` tags, your tags should be formatted as [Branch hosted deep link data](/pages/web/hosted-data/#add-metatags-to-your-site).

For example, you could target users on pages containing the metadata key “foo” and value “bar” by adding this tag to the page’s HTML: `<meta name="branch:deeplink:foo" content="bar" />`

Or by initializing Branch’s web SDK with the following options object:

```javascript
branch.init( 'BRANCH_KEY',
    {
        metadata : {
            'foo' : 'bar'
        }
    }
);
```

Or, finally, by using the track() call to [programmatically trigger a Journey to show](https://branchmetrics.github.io/docs/pages/web/journeys/#trigger-a-journey-to-show-by-firing-an-event):

```javascript
branch.track(‘pageview’,
    {
        ‘foo’ : ‘bar’
    }
);
```

Once metadata has been specified on a page in any or all of the three locations specified above, you can target users on that page using the “Is viewing a page with metadata key” audience filter. If metadata with the same key has been specified in either `init()` or `track()` _and_ in an HTML `meta` tag, the metadata passed into either `init()` or `track()` will take precedence.

### Set up split testing

Note that if you are planning on just using the free banner, you can skip this section. This feature allows you to run A/B tests by designing multiple templates and assigning a percentage of your audience to each one.

1. Click the **Add Variation** button to add another design variation. ![image](/img/pages/journeys/add-variation.png)
1. To remove an unwanted variation, click the `-` button. ![image](/img/pages/journeys/remove-variation.png)
1. Use the percentage fields to control the ratio of your audience that will see each variation.![image](/img/pages/journeys/multiple-templates.png)

!!! protip "Variation Display Limitations"
    You may have up to three variations in each Journey. Your total percentage allocation must not equal more than **100%**. Your total percentage allocation may be _less_ than **100%**. In this situation, the remainder of your audience will be shown your standard website without a Journey. This allows you to A/B test against your non-Journeys website experience.

### Auto-open

You can auto-open the app for users have your app installed with Journeys. You can find this setting by selecting the CTA in the template editor:

![image](/img/pages/journeys/auto-open-find.png)

When this box is checked, if a user views this Journey variation on your website and they have the app installed, the app will automatically open without them clicking.

![image](/img/pages/journeys/auto-open.png)

As opening the app automatically is the best user experience in most cases, this is checked by default for all new templates. 

!!! caution "Web SDK open app setting"
    If you use the open_app setting within the web SDK, this setting will still work for old Journeys (older than 10/25). For all new Journeys, the template setting will take precedence.
    
!!! caution "Open app behavior in in-app webviews"
    Please avoid using the Branch Web SDK on webpages inside of native webviews. The Branch Web SDK's auto-open can cause unexpected user experiences.

#### Auto-open the app on iOS

The auto-open setting in the template editor will work on iOS Chrome and Android. Because auto-open is powered by URI schemes and these can lead to error messages on iOS Safari for users without your app, this is not enabled on iOS by default. 

If you would like the app to open automatically on iOS Safari as well, you'll need to use a setting called `$uri_redirect_mode`. Since Branch has a massive pool of cookies tied to device identifiers, we know if your app is installed when the user clicks a link. We use this intelligence to determine when to use URI schemes. If we have the history that the user installed your app, we’ll use URI schemes to open up the app. 

You can [reach out to support](https://support.branch.io/support/tickets/new){:target="\_blank"} to enable this behavior across all your links, or set it just for Journeys in the web SDK:

```
<script type="text/javascript">
// load the Branch web lib
(function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="build.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener applyCode banner closeBanner creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode".split(" "), 0);
// init Branch and pass in your preference to open the app
branch.init('BRANCH_KEY');
// Trigger your Journeys banner to use the correct redirect mode
branch.setBranchViewData({
        '$uri_redirect_mode': 1
});
</script>
```

Or, set it for individual templates by adding deep link data `$uri_redirect_mode:1`:

![image](/img/pages/journeys/uri-redirect-mode.png)

[Read our blog](https://blog.branch.io/making-uri-schemes-great-again-uri_redirect_mode/){:target="\_blank"} to learn more about the challenges of URI schemes on iOS and the URI redirect mode feature.

### Preserve or discard referring link data

By default, when users arrive on a page running Journeys via a Branch link and `make_new_link` is not set to `true`, then any interaction with the Journey (click/install/re-open) will be attributed to the referring Branch link, rather than to the Journey. If `make_new_link` is set to `true`, the same events will be attributed to the Journey, instead.

This can help you collect data on how the referring links are contributing to app growth/engagement, even when users aren’t installing from those links directly. For example, if a user clicked a Branch link on Facebook, landed on your website, and installed from a Journey, this would allow you to attribute the install to the link on Facebook. If the original link was also configured to deep link into your app, that deep link would be preserved, too.

Branch will pass the referring link into Journeys by default. In order to discard referring link data, include the `make_new_link` flag, with a value of  `true`, into the options during initialization:

```javascript
branch.init( 'BRANCH_KEY',
    {
        'make_new_link' : true
    }
);
```

### Prioritization

#### When do my Journeys prioritization rules apply?
Prioritization only takes effect when two Journeys are overlapping. If you have a Journey targeting iOS users and a Journey targeting Android users, the prioritization won't matter. If you update the Journey targeting iOS to now target iOS and Android users, the higher priority Journey will show to Android users.

#### What happens if a user dismisses a banner or interstitial?
When a user is on a webpage, they will always be shown the highest-priority Journey whose targeting criteria apply to that user, assuming that Journey has not already been dismissed. If the user dismisses that Journey, that Journey will not display again for the amount of time specified in the Journey's [dismissal settings](/pages/web/journeys/#dismiss).

If the user loads another page on the website, Branch will again determine the highest-priority Journey whose targeting criteria apply to that user. **If that Journey has been already been dismissed, no Journey will display.** If, however, the highest-priority Journey has not been dismissed, that Journey will display.

To maximize Journeys visibility, make your audience rules narrow (for example, showing on specific URLs), and decrease the priority of your least broad audience rules.

#### Why do I have to prioritize Stopped and Draft Journeys?
We ask you to prioritize all non-Archived Journeys because Journeys can be set live from *Draft* or *Stopped* mode.

#### What happens if I have some Journeys with priorities set and some without?
We recommend setting priority for all Journeys. All new Journeys you create will automatically have the lowest priority assigned to them, as well as *Draft* or *Stopped* Journeys *without priority* that are set live (Journeys with priority will not have their priority changed unless you explicitly set them). If you don't set a priority for all your Journeys, then any matching Journey (i.e. Journey passing the audience filter you set) without priority will be picked at random to show.

### Scheduling

You can set a time when your Journey will become active and be visible to your users and/or a time when it will no longer be displayed. You can also schedule Journeys on a recurring basis. 

You can access this feature from the **Validate & Test** step or directly from the action menu on the Journeys manager page.

![image](/img/pages/journeys/schedule-action.png)

!!! example "Example: Scheduling a Journey"
    Imagine you want to show your users a Journey during the month of November that advertises a 25% sale if they download your app. You can set it to start at 12 AM on November 1st, and end at 12 AM on December 1st:
    
    
    ![image](/img/pages/journeys/schedule-modal.png)

!!! example "Example: Recurring Schedules"
    Imagine you have a show that airs from 9-10 PM every Sunday, and you want to encourage users to view the episode in-app during that time. You can set a start time of 9 PM on the upcoming Sunday, set a stop time of 10 PM that same day, and then set it to repeat weekly:
    
    
    ![image](/img/pages/journeys/schedule-modal-recurring.png)

#### Scheduling FAQ

1. **When does my scheduled Journey become active or stopped?**
   There can be up to a 5 minute delay between a scheduled time and your Journey becoming active or stopped.
1. **How do I set an end date for a Journey with a recurring schedule?**
   This is not supported with scheduling at this time. To do this, set a start and stop time for your Journey and add your repeat rules. When you want the Journey to stop for good, stop it from the action menu or Edit Schedule > Delete.


### Dynamic Journeys layout customization

We now support the use case where you can customize the appearance of a Journey depending on which link referred the web session. So, you can create a Branch link with a set of defined keys and values that will change properties such as the title or images when the user is referred to your website from this link.

| **Link Data Key** | **Value** | **Example Value** |
| ---: | --- | --- |
| `$journeys_button_get_has_app` | The call to action button when the app is currently installed | "Open App" |
| `$journeys_button_get_no_app` | The call to action button when the app is **not** currently installed | "Install App" |
| `$journeys_title` | The title or main text of your Journey | "Download Appsolutely today" |
| `$journeys_description` | This is the description or subtitle in the frame | "This app is disrupting apps" |
| `$journeys_icon_image_url` | The app icon displayed in the layout | "https://mysite.com/image.png" |

Note that not all template support all override keys. For example, the floating button does not support title, description or icon image url (floating buttons will support the custom liquid tags detailed below though). If a template is to be rendered and the key you've specified does not exist, we'll simply ignore it while rendering the template.

#### Custom tags for dynamic Journeys layout customization

In addition to using [pre-defined keys](/pages/web/journeys/#dynamic-journeys-layout-customization) (e.g. $journeys_title) to dynamically customize the appearance/content of a Journey, you can use custom liquid tags. Custom tags can be inserted in both the View Editor and the CSS Editor when you’re setting up a Journeys template. Then, you can use `setBranchViewData()` to dynamically provide values for these tags.  You can also embed those values statically on a page with [Branch Meta Tags](https://docs.branch.io/pages/web/hosted-data/#add-metatags-to-your-site).

**Note that if you include custom liquid tags in your templates and also set a value for a pre-defined key (e.g. $journeys_title) in `setBranchViewData()`, the value of the pre-defined key will take precedence.**

The format for a custom liquid tag is as follows. Note that a default value must be specified for every custom tag you include:

```
{{ key_name | default_value }}
```

For example, if you were adding a custom liquid tag in CSS to dynamically control the font size of one of your Journeys’ title, you might use a tag like the one below:

```
{{ fontSize | 12px }}
```
![image](/img/pages/journeys/custom-tags-1.png)

And if you were adding a custom liquid tag in your template text, you might use a tag like the one below:
```
{{ adjective | best }}
```
![image](/img/pages/journeys/custom-tags-2.png)

Then, to dynamically update values for the “fontSize” and “adjective” variables, you would set values for those variables using `setBranchViewData()`:

```
branch.setBranchViewData({
    data: {
        'fontSize': '20px',
        'adjective': 'most entertaining',
    }
});
```

Or, you can set the values by embedding Branch Meta Tags on the page:

```
<meta name="branch:deeplink:fontSize" content="20px" />
<meta name="branch:deeplink:adjective" content="most entertaining" />
```

### Clientside Javascript Journeys controls

There are a number of clientside APIs to help you build quality user experiences. See below:

#### Use Javascript to block a Journey from showing

You can prevent Journeys from showing on a certain page by inserting `no_journeys` with the value of `true` into the options during initialization.

```
<script type="text/javascript">
// load the Branch SDK file
branch.init('BRANCH_KEY',
    {
      'no_journeys': true
    }
);
</script>
```

### Closing a Journey Programmatically

Journeys include a close button the user can click, but you may want to close the Journey with a timeout, or via some other user interaction with your web app.
In this case, closing the Journey is very simple by calling:


```javascript
branch.closeJourney(function(err) { console.log(err); });
```

### Trigger a Journey to Show by Firing an Event

If you block or programatically close a Journey via one the calls above, then you can trigger a Journey to show by firing the following event:

```Javascript
branch.track('pageview');
```

**Note:** If a user has closed a Journey in the past, then firing the aforementioned event will not override a user's preference.

### Disable Journeys Animations

You can disable Journeys animations on a page by setting two flags - `disable_entry_animation` and `disable_exit_animation` - when you’re calling either init() or track() with Branch’s Web SDK.

Journeys animations can be disabled in order to reduce the amount of time it takes to load a Journey on a page. They can also be disabled in order to improve Journeys UX on single-page web apps, where Journeys animations can be jarring. When switching between multiple Journeys on a single-page web app, remember to use [setBranchViewData()](/pages/web/journeys/#deep-linking-from-the-banner-or-interstitial) to change the link behind the CTA.

To disable animations during initialization, insert `disable_entry_animation` and/or `disable_exit_animation`, with values of `true`, into the options:

```javascript
branch.init(‘BRANCH_KEY’,
    {
        ‘disable_entry_animation’ : true,
        ‘disable_exit_animation’ : true
    }
);
```

To disable animations using track(), insert `disable_entry_animation` and/or `disable_exit_animation`, with values of `true`, into the event metadata:

```javascript
branch.track(
    ‘pageview’,
    {},
	{
	    ‘disable_entry_animation’ : true,
        ‘disable_exit_animation’ : true
    }
);
```

### Listen to Journeys lifecycle events

You can easily listen to Journeys lifecycle events by registering listener functions like so:

```javascript
var listener = function(event) { console.log(event); }

// Specify an event to listen for
branch.addListener('willShowJourney', listener);

// Listen for all events
branch.addListener(listener);
```


| Listener Name | Description |
| --- | --- |
| willShowJourney | Journey is about to be shown. |
| didShowJourney | Journey's entrance animation has completed and it is being shown to the user. |
| willNotShowJourney | Journey will not be shown and no other events will be emitted. |
| didClickJourneyCTA | User clicked on Journey's CTA button. |
| didClickJourneyClose | User clicked on Journey's close button. |
| willCloseJourney | Journey close animation has started. |
| didCloseJourney | Journey's close animation has completed and it is no longer visible to the user. |

### Journeys text localization

#### Client-side

You can easily customize the Journey text dynamically client side using `setBranchViewData` and by reading the browser's language.

```javascript
var lang_code;
if (navigator.languages && navigator.languages.length>0) {
    lang_code = navigator.languages[0];
} else if (navigator.language) {
    lang_code = navigator.language;
}

// Change Journeys text if language is Spanish (ES)
if (lang_code == 'es') {
    branch.setBranchViewData(
        {
            data: {
                 "$journeys_title": 'Mi App',
                 "$journeys_description": 'Mi descripción',
                 "$journeys_button_get_has_app": 'Avrir',
                 "$journeys_button_get_no_app": 'Ver',
             }
         }
    );
}
```

#### Server-side
Journeys now has an entire localization framework server-side. Due to the complexity of this offering, we're not exposing it directly to partners. Please reach out to your account manager or integrations@branch.io to receive access to this functionality.

### CSS Editor

If you have an upgraded premium account, you may also modify your CSS code directly in addition to using the WYSIWYG View Editor. To do so, go to the **Configure Views** step, click to edit a template, and then select the **CSS Editor** tab on the **Customize Template** screen.

![image](/img/pages/journeys/view-css-editor.png)

#### Custom fonts with Journeys

1) Go to [Google Fonts](https://fonts.google.com/) and select a font.

![image](/img/pages/journeys/font_embedding.png)

2) Add to CSS EDITOR in Journeys. Please note: trailing semicolon on @import line is important. It's always good to have a fallback web font in case the google font fails to load.

![image](/img/pages/journeys/custom_font.png)

### Template customization options

The customization options available depend on the template chosen:

- [Smart Banner](/pages/web/journeys/#smart-banner)
- [Full Screen Interstitial](/pages/web/journeys/#full-screen-interstitial)
- [Half Page Interstitial](/pages/web/journeys/#full-screen-interstitial)
- Floating Button

#### Smart Banner

The available configuration options are identical for banners at both the top and the bottom of the screen.

##### Background

![image](/img/pages/journeys/customize-banner-background.png)

| Option | Usage |
| --- | --- |
| Text Color | Specify the text color for elements without a specific setting. _Not currently used_ |
| Background Color | Set the background color of the banner |

##### Title

![image](/img/pages/journeys/customize-banner-title.png)

| Option | Usage |
| --- | --- |
| Formatting Bar | WYSIWYG styling for title text |
| Title | The text of the title. Maximum 35 characters |

##### Description

![image](/img/pages/journeys/customize-banner-description.png)

| Option | Usage |
| --- | --- |
| Formatting Bar | WYSIWYG styling for description text |
| Description | The text of the description. Maximum 60 characters, will wrap to two lines |

##### Rating

![image](/img/pages/journeys/customize-banner-rating.png)

| Option | Usage |
| --- | --- |
| Formatting Bar | WYSIWYG styling for rating stars. Primarily useful for changing color |
| Rating Star Count | The number of stars of your App/Play Store rating average. We encourage you to be honest! |

##### Reviews

![image](/img/pages/journeys/customize-banner-reviews.png)

| Option | Usage |
| --- | --- |
| Formatting Bar | WYSIWYG styling for reviews count |
| Reviews | The number of reviews of your app on the App/Play Store. We encourage you to be honest! |

##### Button

![image](/img/pages/journeys/customize-banner-button.png)

| Option | Usage |
| --- | --- |
| Text Color | Change the color of the button text and button outline |
| Background Color | Change the color of the button background
| Button Text | Change the text shown when the app is installed and not installed. |
| Channel | Set the **[Channel](/pages/links/integrate/#analytical-labels)** for the Branch link attached to the button. For example, `website`
| Tags | Set the **[Tags](/pages/links/integrate/#analytical-labels)** for the Branch link attached to the button. For example, `purchase` and `fall-sale`
| Deep Link Data | Insert deep link data and advanced link control parameters. Can contain any [Branch link parameter](/pages/links/integrate/#configure-deep-links)

##### Dismiss

![image](/img/pages/journeys/customize-banner-dismiss.png)

| Option | Usage |
| --- | --- |
| Dismiss Period | Control how long the banner should be hidden once dismissed by the user. Options are `1 day`, `1 week`, `1 month`, `Never Again`, and `Custom`. [Learn more](/pages/web/journeys/#what-happens-if-a-user-dismisses-a-banner-or-interstitial). |

##### App Icon

![image](/img/pages/journeys/customize-banner-icon.png)

| Option | Usage |
| --- | --- |
| App Icon | Enter the URL for your app icon, or upload an image |

#### Full screen interstitial

##### Background

![image](/img/pages/journeys/customize-fullpage-background.png)

| Option | Usage |
| --- | --- |
| Text Color | Specify the text color for elements without a specific setting. _Not currently used_ |
| Background Color | Set the background color of the interstitial |
| Background | Enter the URL for your background graphic, or upload an image |
| Image Position | Control the vertical alignment of the background graphic |
| Content Position | Control the vertical alignment of the content block |

| Image Position | Usage |
| --- | --- |
| Top | Pin to top of screen, scale to full screen width |
| Center | Pin to middle of screen, scale to full screen width |
| Bottom | Pin to bottom of screen, scale to full screen width |
| Cover | Anchor to top of screen, scale to fill entire screen |

The content block contains everything except for the background image. Dimensions _within_ this block are preset and cannot be modified.

| Content Position | Usage |
| --- | --- |
| Top | Pin to top of screen |
| Center | Pin to center of 'safe' screen height (accounting for browser controls and device dimensions) |
| Bottom | Pin to bottom of 'safe' screen height (accounting for browser controls and device dimensions) |
| Custom | Position by relative percentage. Be sure to test for appropriate real-world alignment

##### Title

![image](/img/pages/journeys/customize-fullpage-title.png)

| Option | Usage |
| --- | --- |
| Formatting Bar | WYSIWYG styling for title text |
| Title | The text of the title. Maximum 35 characters, will wrap to multiple lines |

##### Description

![image](/img/pages/journeys/customize-fullpage-description.png)

| Option | Usage |
| --- | --- |
| Formatting Bar | WYSIWYG styling for description text |
| Description | The text of the description. Maximum 60 characters, will wrap to multiple lines |

##### Button

![image](/img/pages/journeys/customize-fullpage-button.png)

| Option | Usage |
| --- | --- |
| Text Color | Change the color of the button text and button outline |
| Background Color | Change the color of the button background
| Button Text | Change the text shown when the app is installed and not installed. |
| Channel | Set the **[Channel](/pages/links/integrate/#analytical-labels)** for the Branch link attached to the button. For example, `website`
| Tags | Set the **[Tags](/pages/links/integrate/#analytical-labels)** for the Branch link attached to the button. For example, `purchase` and `fall-sale`
| Deep Link Data | Insert deep link data and advanced link control parameters. Can contain any [Branch link parameter](/pages/links/integrate/#configure-deep-links)

##### Dismiss

![image](/img/pages/journeys/customize-fullpage-dismiss.png)

| Option | Usage |
| --- | --- |
| Dismiss Text | Text to show users wanting to continue to your mobile website instead of downloading the app.
| Dismiss Period | Control how long before the same visitor should see the Journey again. Options are `1 day`, `1 week`, `1 month`, `Never Again`, and `Custom`. [Learn more](/pages/web/journeys/#what-happens-if-a-user-dismisses-a-banner-or-interstitial). |

### Premium journeys functionality

All Journeys features are available to upgraded apps, and are charged per event with a 14 day free trial. Visit [this page](https://branch.io/pricing) for full pricing information.

#### Limitations for apps with free accounts

- Any number of Journeys may be created in **Draft** mode using all features.
- An invitation to upgrade will be displayed when premium-only functionality is enabled
- Only a single Journey using the Smart Banner template (either top or bottom position) may be **Active** at any one time.
- To enable a different Journey, the currently active Journey must first be put into **Stopped** mode.
- Any Journey using premium-only features cannot be placed into **Active** mode until the app has been upgraded.

## Web to app routing without Journeys

If you maintain a mobile website, Branch allows you to deep link mobile visitors directly into your app, or easily and automatically give them the option of downloading it.

### Open app if installed

Add the following code somewhere inside the `<head></head>` tags on your website and customize the [link parameters](/pages/links/integrate/#configure-deep-links) to suit your needs.

!!! protip
    What this script does is move a lot of the Branch redirection logic to the Javascript on your own page, effectively 'clicking a Branch link' on page load.


```javascript
<script type="text/javascript">
// load the Branch SDK file
{! partials/web-sdk-init.md !}
// define the deepview structure
branch.deepview(
    {
      'channel': 'mobile_web',
      'feature': 'deepview',
      data : {
        '$deeplink_path': 'page/1234',
        'user_profile': '7890',
        'page_id': '1234',
        'custom_data': 1234
      }
    },
    {
      'open_app': true  // If true, Branch attempts to open your app immediately when the page loads. If false, users will need to press a button. Defaults to true
    }
);
</script>
```

{! partials/replace-branch-key.md !}

### Add an install call to action

Trigger the `branch.deepviewCta()` function with a button or hyperlink on your page. Executing this function (whether by button, link, or some other method) 'clicks' the link you defined using `branch.deepview()` above.

| Platform | Result of Call To Action
| --- | ---
| Mobile, app installed | Open app, deep link directly to content. This is a failsafe action in case the 'link click' on page load didn't fire correctly.
| Mobile, app NOT installed | Open App Store or Play Store page for your app, deep link directly to content after download.
| Desktop | Redirect to `$desktop_url` specified in the `deepview()` call, or fall back to your default web url from [Link Settings](https://dashboard.branch.io/link-settings).


Here's how to add a simple hyperlink call to action:

```html
<a id='downloadapp' onclick='branch.deepviewCta()'>View this in app</a>
```

## Troubleshooting

### Calls to [branchsubdomain] blocked

{! ingredients/branchsubdomain.md !}

Please make sure to add `[branchsubdomain]` to the CSP header for your pages. We've seen some browsers that attempt to block it outright. You can deliver this in an HTTP header from your web server or you can add a simple metatag to your site like so:

```html
<meta http-equiv="Content-Security-Policy" content="default-src https://[branchsubdomain]; child-src 'none'; object-src 'none'">
```

### Non-mobile optimized sites

If you're not using a mobile viewport tag (`<meta name="viewport" content="width=device-width initial-scale=1, maximum-scale=1, user-scalable=no">`) because your site isn't mobile optimized, Journeys will look shrunken and weird. Don't worry, we have you covered:

1. design the banner as you would like it to look on your site
2. Go to the CSS editor and scroll to the bottom of the CSS code
3. Add two properties to the #branch-banner selector
    - `height: 228;`
    - `zoom: 3;`

The image will not look scaled properly in the editor view. This is because the dashboard is mobile optimized. Use the preview test link on the validation page to make sure the banner looks right

### Prevent overlap between top banners and persistent navigation bars

- Navigate to [Dashboard Journey Page](https://branch.dashboard.branch.io/web/journeys)
- Select Journey -> Edit -> Configure Views -> Banner -> Page Placement
- Banner Scroll = `sticky`
- Press `Save & Close`
- Add the following div to your nav

    ```html
    <div class="branch-journeys-top"></div>
    ```

    ![image](/img/pages/journeys/sticky.png)


## Examples

### Example audiences

The Journeys audience tool is extremely powerful, but sometimes a few examples can help kickstart your creative juices. Here are are a couple common audience use cases to help you get started.

1. [New users](/pages/web/journeys/#example-new-users)
2. [Loyal users](/pages/web/journeys/#example-loyal-users)
3. [Retargeting users who have taken some action](/pages/web/journeys/#example-retargeting-users)
4. [Users from Google (for SEO)](/pages/web/journeys/#example-seo-friendly)
5. [iOS users from English-speaking countries](/pages/web/journeys/#example-english-speaking-ios-users)

All of these examples require you to configure advanced audience rules, which is a premium feature. You can add any set of complex rules using the following button:

![image](/img/pages/journeys/examples/advanced_add_filter.png)

#### New Users

In this example, you'll configure an audience to target people who have visited your site **less than 3 times** historically. Anyone who had visited more than this will be excluded. First, you'll add a new rule for `Has visted web` in the advanced section.

![image](/img/pages/journeys/examples/new_users_0.png)

Next, you'll choose the `Less than or equal to` in the middle section:

![image](/img/pages/journeys/examples/new_users_1.png)

Finally, you'll enter 2 in the last part to indicate you want to target people who have visited less than 3 times historically.

![image](/img/pages/journeys/examples/new_users_2.png)

Save and continue!

#### Loyal Users

In this example, you'll configure an audience to target people who have visited your site **more than 4 times** historically. Anyone who had visited less than this will be excluded. First, you'll add a new rule for `Has visted web` in the advanced section.

![image](/img/pages/journeys/examples/new_users_0.png)

Next, you'll choose the `More than or equal to` in the middle section:

![image](/img/pages/journeys/examples/loyal_users_1.png)

Finally, you'll enter 5 in the last part to indicate you want to target people who have visited more than 4 times historically.

![image](/img/pages/journeys/examples/loyal_users_2.png)

Save and continue!

#### Retargeting Users

In this example, you'll configure an audience to target people who have completed some action on your site in a past or current session. For example, if a user had added something to their cart or had previously completed a purchase. You can retarget these users with a custom call to action to download. We'll use a generic event called `MyAction` in the example. First, you'll add a new rule for `Has completed event` in the advanced section.

![image](/img/pages/journeys/examples/retargeting_users_0.png)

In this next dropdown, you'll choose the custom event to retarget from. Here, we'll use a generic event called `MyAction` but you would select `Purchase` or something more meaningful to your use case.

![image](/img/pages/journeys/examples/retargeting_users_1.png)

Next, you'll choose the `More than or equal to` in the middle section:

![image](/img/pages/journeys/examples/retargeting_users_2.png)

Finally, you'll enter 3 in the last part to indicate you want to target people who have completed `MyAction` more than 2 times historically.

![image](/img/pages/journeys/examples/retargeting_users_3.png)

Save and continue!

#### SEO Friendly

Google has recently announced that it will begin punishing sites that show a full page interstitial when a user comes from search. Because of this, you'll likely need to treat Google search traffic differently than traffic that comes from any other source. In this example, you'll set up an audience specific to users who come from Google. First, you'll add a new rule for `Came directly from a url` in the advanced section.

![image](/img/pages/journeys/examples/seo_friendly_0.png)

Next, you'll choose the `starts with` in the middle section to match a substring:

![image](/img/pages/journeys/examples/seo_friendly_1.png)

Finally, you'll enter `google.com` to target users who came from Google search (where the referrer starts with google.com):

![image](/img/pages/journeys/examples/seo_friendly_2.png)

Alternatively, you can target users who did NOT come from Google search (where the referrer doesn't start with google.com):

![image](/img/pages/journeys/examples/seo_friendly_3.png)

#### Example: English speaking iOS users

In this example, you'll restrict the audience to users in countries where English is the native language who are on the iOS operating system. Note that this is not in the advanced audience section, but rather in the top section. First, select `iOS` of the mobile OS checkboxes.

![image](/img/pages/journeys/examples/ios_english_0.png)

Next, go through and choose the following countries: `United States`, `Canada`, `United Kingdom` and `Australia`.

![image](/img/pages/journeys/examples/ios_english_1.png)

Save and continue!

## Journeys and GDPR
In order to help our customers comply with [GDPR](https://branch.io/gdpr/), we’ve updated our Web SDK with a [Do Not Track mode](https://docs.branch.io/pages/web/integrate/#enable-do-not-track-mode). This way, if a user indicates that they want to remain private on your website, you can continue to make use of the Branch Web SDK (e.g. for creating Branch links) while not tracking that user. 

If you enable that mode, you can still display some Journeys to your users. Whether or not a Journey will display for users in Do Not Track mode depends on the targeting criteria you’ve defined for that Journey. If the Journey uses any of the following audience filters, it will *not* display for users in Do Not Track mode. Otherwise, the Journey will display.
* Has completed event
* Has visited web
* Has visited the app
* Has clicked on email
* Has clicked on ad
* Has the app installed

If a Journey does display for a user in Do Not Track mode, any analytics related to the Journey’s display or the user’s interactions with that Journey *will not be published in the Branch dashboard.*
