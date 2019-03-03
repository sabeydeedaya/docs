
## Overview

A Deepview is a mobile web splash page, hosted by Branch, that gives a preview of the in-app content behind a given Branch link. When a visitor opens one of your Branch links and does not have your app installed, you can show them a Deepview instead of sending them directly to the App/Play Store.

Deepviews are discoverable in all search portals (Google, Apple Spotlight, Bing, etc), opening up new mechanisms for people to find your app, and drive much higher conversions to install than sending visitors to the App/Play Store directly. Here's an example flow:

![image](/_assets/img/pages/deepviews/deepviews_allthecooks.gif)

!!! note "Intended for apps without a mobile website"
    If you already have a mobile website with content, [Journeys](/web/journeys/) is better suited.

## Setup

### Enable Deepviews

1. Head to the [Deepviews configuration page](https://dashboard.branch.io/web/deepviews) on the Branch dashboard.
1. Deepviews are configured separately for visitors on each platform (iOS, Android, and desktop). Select the platforms you want and click **Enable**.

![image](/_assets/img/pages/deepviews/deepviews_enable.png)

!!! warning
    To enable desktop Deepviews, be sure to select "Branch-hosted SMS Landing Page" for Desktop redirects on [Link Settings](https://dashboard.branch.io/link-settings).

    ![image](/_assets/img/pages/deepviews/deepviews_desktop.png)

    Note that this will override any [Text-Me-The-App](/web/text-me-the-app/) page you have configured.

!!! note "Changing the app icon"
    If we pulled the wrong app icon, you can upload a new one in the _Social Media Display Customization_ section of the [dashboard Settings](https://dashboard.branch.io/link-settings).

### View Analytics

Branch lets you track the flow of users through Deepviews. You can find this information on the [summary page](https://dashboard.branch.io/) of the Branch dashboard.

![image](/_assets/img/pages/deepviews/deepview_analytics.png)

There are various metrics to understand when deep linking from your mobile website.

- **Views:** a user viewed the mobile site.
- **Clicks:** a user clicked on the Deepview CTA
- **Installs:** a user installed the app for the first time
- **Upgrades:** a user re-opened or upgraded the app from a previous version

Only users who do not have the app will go through this flow. You can view the total counts and conversion rate from each step on this chart.

## Advanced

### Customizing Deepviews

The default Deepview template simply displays the content from three of the link's [control parameters](/links/integrate/#redirections). You can specify the content of these parameters when creating your link to control what will display in that link’s Deepview. If nothing is set for a particular link, we will gracefully fall back to the OG values set for your entire app in _Settings > Link Settings > Social Media Display Customization._

| Key | Value
| --- | ---
| **$og_title** | The title you'd like to appear on the deepview
| **$og_description** | The description you'd like to appear on the deepview
| **$og_image_url** | The URL for the image you'd like to appear on the deepview

!!! tip "Hosting your own OG tags"
    If you want to use OG tags you host elsewhere, leave these parameters empty and specify a **$desktop_url** control parameter when you create the link. Branch will perform a one-time scrape to populate the Deepview using the OG tags from the URL you specify.

If you're creating a link by appending query parameters, just append the parameters to the URL. Please make sure to URL encode everything, lest the link will break.

```javascript
"https://[branchsubdomain]?%24og_title=MyApp%20is%20disrupting%20apps&$og_image_url=http%3A%2F%2Fmyapp.com%2Fimage.png"
```

When you create links via a mobile SDK, you simply need to set the OG tag parameters. Below are few examples, but you can [see every platform here](#dialog-code?ios=create-content-reference&android=create-content-reference&adobe=create-deep-link&cordova=create-content-reference&mparticleAndroid=create-content-reference&mparticleIos=create-content-reference&titanium=create-content-reference&reactNative=create-content-reference&unity=create-content-reference&xamarin=create-content-reference).

- *iOS - Objective C*

    ```obj-c

    BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
    // Facebook OG tags -- this will overwrite any defaults you set up on the Branch Dashboard
    branchUniversalObject.title = @"My Content Title";
    branchUniversalObject.contentDescription = @"My Content Description";
    branchUniversalObject.imageUrl = @"https://example.com/mycontent-12345.png";

    // Add any additional custom OG tags here
    [branchUniversalObject addMetadataKey:@"$og_video" value:@"http://mysite/video.mpg"];
    ```

- *iOS - Swift*

    ```swift
    let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "item/12345")
    // Facebook OG tags -- this will overwrite any defaults you set up on the Branch Dashboard
    branchUniversalObject.title = "My Content Title"
    branchUniversalObject.contentDescription = "My Content Description"
    branchUniversalObject.imageUrl = "https://example.com/mycontent-12345.png"

    // Add any additional custom OG tags here
    branchUniversalObject.addMetadataKey("$og_video", value: "http://mysite/video.mpg")
    ```

- *Android*

    ```java
     BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                    .setCanonicalIdentifier("item/12345")
    // Facebook OG tags -- This will overwrite any defaults you have set on the Branch Dashboard
                    .setTitle("My Content Title")
                    .setContentDescription("My Content Description")
                    .setContentImageUrl("https://example.com/mycontent-12345.png")

    // Add any additional custom OG tags here
                    .setContentMetadata(new ContentMetadata().addCustomMetadata("$og_video", "http://mysite/video.mpg"));
    ```


Edit the Title, Description and Image URL in the _Social Media_ section.

![image](/_assets/img/pages/deepviews/deepviews_social_media_descriptions.png)

**Note:** the _Deep Link_ section accepts most link control parameters, but `$og_title`, `$og_description` and `$og_image_url` **cannot** be specified there.


### Enable per-link Deepviews

If you don't want to enable Deepviews globally, you can do it for each platform on a per link basis by inserting custom link control parameters [link control parameters](/links/integrate/#deepview).

Enable Desktop Deepviews by appending query parameters:

```javascript
"https://[branchsubdomain]?%24desktop_deepview=default_template&%24ios_deepview=default_template"
```

Enable iOS and Android Deepviews through the SDK. Below are few examples, but you can [see every platform here](#dialog-code?ios=create-link-reference&android=create-link-reference&adobe=create-deep-link&cordova=create-link-reference&mparticleAndroid=create-link-reference&mparticleIos=create-link-reference&titanium=create-link-reference&reactNative=create-link-reference&unity=create-link-reference&xamarin=create-link-reference)

- *iOS - Objective C*

    ```obj-c
    BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
    linkProperties.feature = @"sharing";
    linkProperties.channel = @"facebook";
    [linkProperties addControlParam:@"$ios_deepview" withValue:@"default_template"];
    [linkProperties addControlParam:@"$android_deepview" withValue:@"default_template"];
    ```

- *iOS - Swift*

    ```swift
    let linkProperties: BranchLinkProperties = BranchLinkProperties()
    linkProperties.feature = "sharing"
    linkProperties.channel = "facebook"
    linkProperties.addControlParam("$ios_deepview", withValue: "default_template")
    linkProperties.addControlParam("$android_deepview", withValue: "default_template")
    ```

- *Android*

    ```android
    LinkProperties linkProperties = new LinkProperties()
                   .setChannel("facebook")
                   .setFeature("sharing")
                   .addControlParameter("$ios_deepview", "default_template")
                   .addControlParameter("$android_deepview", "default_template");
    ```

Finally, enable Deepviews for an individual link on the [Marketing dashboard](https://dashboard.branch.io/quick-links/mlc/define) by selecting Deepviews as a redirect option under the second page.

![image](/_assets/img/pages/deepviews/deepviews-mlc.png)


### Disable per-link Deepviews

If you've enabled Deepviews globally, it's likely that you'll want to disable them now and again for specific use cases. To do so, just follow the instructions for [_enabling Deepviews for one link_](#enable-per-link-deepviews) and set one or more of the key values to `false`.

| Key | Value |
| --- | --- |
| **$ios_deepview** | `false` |
| **$android_deepview** | `false` |
| **$desktop_deepview** | `false` |

**When creating Quick Links on the Branch dashboard**

You can disable Deepviews for an individual link on the [Marketing dashboard](https://dashboard.branch.io/quick-links/mlc/define) by selecting Deepviews as a redirect option in Configure Options > Redirects and setting it to false.

![image](/_assets/img/pages/deepviews/deepviews-disable-mlc.png)

### Create New Deepview Templates

You can create new Deepview templates using the [Deepviews configuration page](https://dashboard.branch.io/web/deepviews) on the Branch dashboard, either by duplicating the default Branch Public Template, or by creating a new one from scratch. New Deepview templates are shared between all platforms (iOS, Android, and desktop), and cannot be deleted after creation.

![image](/_assets/img/pages/deepviews/deepview-create-template.png)

The Deepview editing screen contains two tabs: **Basic** and **Editor**.

**Basic**

The Basic tab displays your new template, and allows you to modify the default fallback OG tags used if none are specified for a link.

![image](/_assets/img/pages/deepviews/deepviews_editor_basic.png)

**Deepview Settings**

| Setting | Usage |
| --- | --- |
| Title | Internal name for your reference |
| Key | The value that you will reference when creating a link. E.g., `$ios_deepview: [key]` |

**App Settings**

!!! warning ""
    These fields are duplicates of the _Social Media_ section of your app's [main link settings page](https://dashboard.branch.io/link-settings). Any updates will be applied in both locations.


| Setting | Usage |
| --- | --- |
| OG Title | Default value used if `$og_title` is not specified for a link.
| OG Description | Default value used if `$og_description` is not specified for a link.
| OG Image Url | Default value used if `$og_image_url` is not specified for a link.

### Edit Deepview Templates

You can use the Deepview editor to edit created templates. You cannot edit pre-created templates. The Editor tab allows you to edit the raw HTML and CSS for your template. The rendered template will update as you modify the markup.

![image](/_assets/img/pages/deepviews/deepviews_editor_code.png)

!!! failure "Javascript not allowed"
    Before rendering the template, we sanitize the markup of Javascript for security reasons. This includes script tags and event attributes on tags.

### Inject Other Data Into Deepviews

By customizing your Deepview template, you have the ability to pass through other parameters from your link's [data dictionary](/links/integrate/#configure-deep-links).

Here's a full list of liquid available tags:

**app**

This is the App object, which contains app data not specific to any link. This will allow you to surface information like your app name or other properties. You can surface this object in your Deepview like so:

```
{{app}}
```

| Key | Usage |
| --- | --- |
| `app.branch_key` | Your Branch key from [Settings](https://dashboard.branch.io/#/settings).
| `app.name` | The name of your app from [Settings](https://dashboard.branch.io/#/settings).
| `app.og_title` | The **Link Title** set in the _Social Media Display Customization_ section of your app's [Link Settings](https://dashboard.branch.io/#/settings/link).
| `app.og_description` | The **Description** set in the _Social Media Display Customization_ section of your app's [Link Settings](https://dashboard.branch.io/#/settings/link).
| `app.og_image_url` | The **Thumbnail Image** set in the _Social Media Display Customization_ section of your app's [Link Settings](https://dashboard.branch.io/#/settings/link).

!!! success ""
    If you want to show your app's name inside a Deepview, you would expose it like so: `<h1>Get {% raw %}{{app.name}}{% endraw %}</h1>`


**link data**

Link Object, which contains all of your link's parameters, including your deep link values from the data dictionary. See the [Configuring Links](/links/integrate/#configure-deep-links) page for more information. You can surface this object in your Deepview like so:

```
{{link_data}}
```

!!! success ""
    If you want to expose a key value pair of `'welcome_message' : 'Welcome to my App'`, you would do the following: `<h1>{% raw %}{{link_data.welcome_message}}{% endraw %}</h1>`, and this would render `Welcome to my App`.

**action**

The URL of the Branch link itself. If you create a new call to action in your Deepview, use this. You can surface this object in your Deepview like so:

```
{{action}}
```

!!! success ""
    Create a new call to action link: `<a href="{% raw %}{{action}}{% endraw %}">Click</a>`.

## Glossary

#### Active Deepviews

Active deepviews should only show when the app is _not_ installed (or when direct deep linking doesn't work like in the Facebook webview), and pause on the deepview page. These let the user preview the content, ultimately deciding if they want to install the app. The user must click the call-to-action of `Get The App` in order to be sent to the appropriate App or Play Store page.

| Key | Value | Default Template
| --- | --- | ---
| $ios_deepview | The name of the template to use for iOS. | `default_template`
| $android_deepview | The name of the template to use for Android. | `default_template`
| $desktop_deepview | The name of the template to use for the desktop. | `default_template`

#### Passive Deepviews

Passive deepviews should also only appear when the app is _not_ installed, but instead of pausing on the deepview page, they will attempt to redirect to the App/Play Store immediately without the user taking action. These should be used when you don't want a blank white screen to be left in a browser after the user clicks a link to go install your app. Note that these are automatically enabled in Safari iOS 10.3 and Facebook iOS webviews if you're attempting to redirect to your Store page.

To disable passive deepviews, simply set the value to `false` in the link data.

| Key | Value | Default
| --- | --- | ---
| $ios_passive_deepview | The name of the template to use for iOS. | `default_template`
| $android_passive_deepview | The name of the template to use for Android. | `default_template`

To enable another template as the default passive deepview, select the 'Set as Passive Default' option. You can also change the template **on a link level** by providing the template name in the [control parameters](/links/integrate/#deepview). If you're creating a link by appending query parameters, you simply need to append the parameters to the URL. Please make sure to URL encode everything, lest the link will break.
