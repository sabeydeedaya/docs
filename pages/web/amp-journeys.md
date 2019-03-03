## Overview

[Accelerated Mobile Pages (AMP)](https://www.ampproject.org/) are a way to build pages that serve static content so that they load in Google search results much faster. Google uses AMP to quickly serve content on mobile devices without users having to click through to a website to view the content, and AMP pages often appear at the top of mobile search results.

AMP pages by design make it difficult for users to go anywhere except back to Google search, and difficult for you to convert users to your website or your app. With AMP-compatible Journeys, you can convert mobile web traffic from Google search results to your app and take advantage of extra traffic from AMP pages. Select Journeys templates can be shown on your AMP-compatible website.

!!! note "Pre-reqs"
    - To host AMP Journeys and show in Google search as an AMP page, your webpage must be [AMP](https://www.ampproject.org/docs/)-compatible.
    - Journeys uses your alternate domain for Universal Links. Make sure you include your `xxxx-alternate.app.link` domain in your [Associated Domains](/apps/ios/#configure-associated-domains). If you’re unsure of your Branch-assigned app.link subdomain, [contact support](https://support.branch.io/support/tickets/new)

## Setup

### Add the Branch AMP SDK to your site

The AMP SDK consists of 2-3 snippets that you can insert into your AMP page.

Add the following snippet between the AMP page’s `<head></head>` tags

```html
   <style amp-custom>#branch-amp-journey{bottom:0;left:0;width:100%;height:77px;position:fixed;}.hideme{width:100%;height:77px;left:24px;background-color:none;position:fixed;}.close{width:24px;height:100%;left:0;z-index:10000;background-color:none;position:fixed;}.branch-amp-journey-inner{position:relative;width:100%;height:100%;z-index:9999;}.donotdisplay{display:none;}</style>
```

Modify the following snippet to include your domain (`xxxx.app.link`) instead of **`DOMAIN_HERE`** and your Branch key instead of **`BRANCH_KEY_HERE`** - in both the `amp-list` tag and the `amp-iframe` tag. You can find these in [Link Settings](https://dashboard.branch.io/link-settings){:target="\_blank"} and [Account Settings](https://dashboard.branch.io/account-settings){:target="\_blank"}.

```
<amp-list tabindex=0 role="" on="tap:branch-amp-journey.hide" id="branch-amp-journey" src="https://DOMAIN-HERE/branch-amp-journeys-pre?branch_key=BRANCH_KEY_HERE&__aj_cid=CLIENT_ID(_s)&__amp_viewer=VIEWER&__aj_source_url=SOURCE_URL&__aj_canonical_url=CANONICAL_URL&__aj_v=1.0.0" layout=fixed-height height="77px"><template type="amp-mustache" id="journey-template"><a class="close" on="tap:branch-amp-journey.hide"></a><div class="hideme" ></div><amp-iframe class="branch-amp-journey-inner {{do_not_display}}" layout="fixed-height" height="77px" resizable src="https://DOMAIN-HERE/branch-amp-journeys?branch_key=BRANCH_KEY_HERE&__aj_cid={{__aj_cid}}&__aj_source_url={{__aj_source_url}}&__aj_canonical_url={{__aj_canonical_url}}&_audience_rule_id={{_audience_rule_id}}&_branch_view_id={{_branch_view_id}}&__aj_v=1.0.0" sandbox="allow-scripts allow-top-navigation allow-same-origin" frameborder="0"><div overflow></div></amp-iframe></template></amp-list>
```
Then add the modified snippet between the `<body></body>` tags of your AMP page, preferably near or at the bottom.

Finally, if you do not already have the following AMP scripts on your page, add them between the AMP page's `<head></head>` tags:
```
<script async src="https://cdn.ampproject.org/v0/amp-list-0.1.js" custom-element="amp-list"></script><script async src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js" custom-template="amp-mustache"></script><script async src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js" custom-element="amp-iframe"></script>
```

!!! protip "Include canonical URL for SEO and deep linking"
    [Google recommends](https://www.ampproject.org/docs/guides/discovery){:target="\_blank"} that on your AMP page, you include a reference to the canonical URL of the non-AMP page with the same content. For example, you should include a tag like this in the `<head></head>` section of your AMP page: `<link rel="canonical" href="https://example.com/article.html">`. This helps make your AMP page discoverable, and likely helps ensure that SEO information is shared between these two pages. Additionally, Branch automatically embeds the canonical URL in the Journey link data, leading to better identification of content and the ability to use this key for deep linking.


### Target AMP Web in your audience

AMP Journeys can be created as part of the normal [Journeys creation flow](https://dashboard.branch.io/web/journeys/audiencerule/new){:target="\_blank"}. You can target users on AMP pages by checking the box **AMP Web** on the Select Audience step:

![image](/_assets/img/pages/journeys/amp-checkbox.png)

See the [Journeys Guide](/web/journeys/#select-audience){:target="\_blank"} for more information on selecting your audience.

### Select an AMP-compatible template

Once you have your audience selected, you can configure your templates. Currently, only **Branch Standard Banner Bottom** is supported on AMP because Google requires that banners not show in the top 75% of an AMP page. Over time, Branch will add support for more Journeys templates.

When you click **Select Template** from the **Configure Views** step, the **standard bottom banner** view type should already be selected, showing you the Journeys templates that are compatible with AMP:

![image](/_assets/img/pages/journeys/amp-select-template.png)

Hover over the template and click **Create**.

### Validate & Test your AMP Journey

On the **Validate & Test** step, you will see AMP-specific messages if you have targeted **AMP Web** users on the [Select Audience](#target-amp-web-in-your-audience) step.

![image](/_assets/img/pages/journeys/amp-validation.png)

#### The selected template is not AMP-compatible

If Branch has detected that you have selected a template that is not compatible with AMP, you will see an error on the **Validate & Test** step. [See which templates are currently compatible](#customization-limitations).

### Track Analytics

Analytics for AMP Journeys works the [same way as for regular Journeys](/web/journeys/#visualizing-journeys-performance), in that you can see clicks, opens, installs, and custom events tied to your Journey by clicking **View Performance** from the actions menu for your AMP Journey.

![image](/_assets/img/pages/journeys/view-performance.png)

## Advanced

### Targeting Audiences with a URL

With AMP, Google will serve your page from the Google AMP cache. This means that the URL that serves your AMP page will look something like `https://www.google.com/amp/s/www.example.com/amp/doc.html`. However, Branch passes through your original source URL, and this is what you should use for audience targeting. For the advanced audience filter **Is viewing a page URL**, you'll want to use the original URL where you host the AMP page. In this example, that would be `https://www.example.com/amp/doc.html`.

### Deep linking with AMP

You can [configure links] with deep link data on AMP in two ways:

1. Add query parameters to your Branch link in the AMP SDK
1. Add deep link data to a Journey in the dashboard

!!! protip "Use $canonical_url for deep linking"
    AMP Journeys, along with regular Journeys and the Quick Link Creator, automatically embeds `$canonical_url` in your link data based on meta tags on your web or AMP page. If you use this key to route to specific content in your app, you do not have to add anything extra for AMP.


#### Add query parameters in the AMP SDK

To deep link to specific content in your app, you can add query parameters to your Branch link within the `amp-iframe`. Here is what the `amp-iframe` looks like without any query parameters:

```
<amp-iframe class="branch-amp-journey-inner {{do_not_display}}" layout="fixed-height" height="77px" resizable src="https://DOMAIN-HERE/branch-amp-journeys?branch_key=BRANCH_KEY_HERE&__aj_cid={{__aj_cid}}&__aj_source_url={{__aj_source_url}}&__aj_canonical_url={{__aj_canonical_url}}&_audience_rule_id={{_audience_rule_id}}&_branch_view_id={{_branch_view_id}}&__aj_v=1.0.0" sandbox="allow-scripts allow-top-navigation allow-same-origin" frameborder="0"><div overflow></div></amp-iframe>
```

If your deep linking keys were **productId** and **category**, for example, you would add `&productId=1234&category=shoes` to your `amp-iframe` like this:

```
<amp-iframe class="branch-amp-journey-inner {{do_not_display}}" layout="fixed-height" height="77px" resizable src="https://DOMAIN-HERE/branch-amp-journeys?branch_key=BRANCH_KEY_HERE&__aj_cid={{__aj_cid}}&__aj_source_url={{__aj_source_url}}&__aj_canonical_url={{__aj_canonical_url}}&_audience_rule_id={{_audience_rule_id}}&_branch_view_id={{_branch_view_id}}&__aj_v=1.0.0&productId=1234&category=shoes" sandbox="allow-scripts allow-top-navigation allow-same-origin" frameborder="0"><div overflow></div></amp-iframe>
```

If you are generating AMP pages programmatically, it makes sense to generate these keys as query params at the same time.

#### Dynamic layout customization

You can customize the appearance of a Journey dynamically using query parameters on your `amp-iframe` link. These are the fields currently supported for dynamic layout customization on AMP:

| **Link Data Key** | **Value** | **Example** |
| ---: | --- | --- |
| `$journeys_button_get_has_app` | The call to action button when the app is currently installed | `$journeys_button_get_has_app=Download` |
| `$journeys_button_get_no_app` | The call to action button when the app is **not** currently installed | `$journeys_button_get_no_app=Read` |
| `$journeys_description` | This is the description or subtitle in the frame | `$journeys_description=Continue+reading+in+the+app.` |

#### Add deep link data in the Journeys dashboard

You can also add deep link data to a Journey in the dashboard. In the **Customize Template** screen, click the button and add your key:value pairs in the deep link data fields. For example if your deep linking key was **productId**:

![image](/_assets/img/pages/journeys/amp-deep-link-data.png)

## Support

### AMP-specific Restrictions

Because javascript is limited on AMP and cookies are restricted on both AMP and iOS, AMP Journeys does not support all of standard Journeys functionality. The following Journeys features are affected:

* Event-based audience rules work within AMP only or after a Branch link click on an AMP page. [Read more](#audience-rule-limitations).
* Only templates on the bottom of the page and equal to 76px in height show on AMP. [Read more](#customization-limitations).
* [Dismiss period](/web/journeys/#dismiss) is not supported - after dismiss, Journeys will show again during the next AMP session.
* [Client-side javascript controls](/web/journeys/#clientside-javascript-journeys-controls) are not supported.
* Auto-opening the app with open_app: true is not supported.
* [Deep linking with setBranchViewData](/web/journeys/#deep-linking-from-the-banner-or-interstitial) is not supported. [Learn how](#deep-linking-with-amp) you can deep link to content from AMP pages.
* [Branch hosted deep link data](/web/hosted-data/#add-metatags-to-your-site) will not be scraped. This also means that the [Is viewing a page with metadata key](web/journeys/#is-viewing-a-page-with-metadata-key) filter will not be supported.
* If your site uses a template engine like Jinja that looks for and replaces liquid tags (ex: {{ yourObject }}), then you should confirm that it does not remove Branch tags on render. For Jinja specifically, you should wrap the Branch code on your AMP page with raw tags:
```
{% raw %}
<amp-list tabindex=0 role="" on="tap:branch-amp-journey.hide" id="branch-amp-journey" src="https://DOMAIN-HERE/branch-amp-journeys-pre?branch_key=BRANCH_KEY_HERE&_aj_cid=CLIENT_ID(_s)&amp_viewer=VIEWER&aj_source_url=SOURCE_URL&aj_canonical_url=CANONICAL_URL&aj_v=1.0.0" layout=fixed-height height="77px"><template type="amp-mustache" id="journey-template"><a class="close" on="tap:branch-amp-journey.hide"></a><div class="hideme" ></div><amp-iframe class="branch-amp-journey-inner do_not_display" layout="fixed-height" height="77px" resizable src="https://DOMAIN-HERE/branch-amp-journeys?branch_key=BRANCH_KEY_HERE&aj_cid=aj_cid&aj_source_url=aj_source_url&aj_canonical_url=aj_canonical_url&_audience_rule_id=_audience_rule_id&_branch_view_id=_branch_view_id&_aj_v=1.0.0" sandbox="allow-scripts allow-top-navigation allow-same-origin" frameborder="0"><div overflow></div></amp-iframe></template></amp-list>
{% endraw %}
```

### Targeting Limitations

Because cookies are restricted on both AMP and iOS, event-based audience rules on AMP Journeys are cookie-restricted. Practically, this means that targeting works *only within AMP* for the following rules:

* Has completed event
* Has visited web
* Has visited the app
* Has the app installed

Once a user has clicked a Branch link outside of AMP, event-based audience rules will adhere to the regular web cookie for that user, and will work across AMP and non-AMP web.

### Banner Limitations

For the time being, only banners of a fixed height and placement (bottom of the page) are compatible with AMP. This includes **Branch Banner Bottom**, or other custom banners with page placement on the bottom of the page and height of 76px.
