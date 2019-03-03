## Overview

Google's App Indexing is a project that attempts to expose app results in Google searches performed on mobile devices. This project is formally called Firebase App Indexing.

At a high level, App Indexing has two themes to consider.

- Results, ranking and relevancy are based upon web scraping. App Indexing does not improve relevancy in results.
- App Indexing makes it so that web results _also_ open up your app.

When enabling App Indexing, you will likely want to make these changes to your website, as well:

- Make your existing website support Apple's Universal Links and Android's App Links. After this, all of your links will correctly open the app and you're done.
 - Add the undocumented header `<link rel="alternate" ..` tags to your website for when Google crawls the page. Branch can assist with this using `autoAppIndex()`, documented below.

If Google knows your website opens the app, when it shows up in a search result, and the user has the app installed, the app will open instead of the website, therefore achieveing App Indexing results in organic search portals.

Branch's App Indexing integration is designed for businesses that don't have a website, and want Branch to host their site for them. If you have a website, Branch can dynamically inject App Indexing tags through the WebSDK function `autoAppIndex()` described [here](/organic-search/firebase/#alternative-have-the-websdk-inject-app-indexing-tags-into-your-webpage).

Note that in order for you to get traffic from this feature, your Branch link will need to appear in search results. We've just now supercharged our app indexing feature with AMP tech to leverage Google's new prioritization of these pages.

## Setup

### Define Your Content

The first step to listing your app content in Google is to tell Branch what the content is and how it should appear in search. Assuming you followed our get started guide, you have already indexed your content by creating **Branch Universal Objects**. You can create these objects using the native SDKs, where you simply need to set the OG tag parameters. Below are few examples, but you can [see every platform here](#dialog-code?ios=create-content-reference&android=create-content-reference&adobe=create-deep-link&cordova=create-content-reference&mparticleAndroid=create-content-reference&mparticleIos=create-content-reference&titanium=create-content-reference&reactNative=create-content-reference&unity=create-content-reference&xamarin=create-content-reference).

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

### Enable App Indexing

 Enable automatic sitemap generation on the [Organic Search](https://dashboard.branch.io/search) page of the Branch Dashboard. Check the `Automatic sitemap generation` checkbox.

![image](/_assets/img/pages/organic-search/firebase/db-settings.png)

Once you enable this, your app will be included in our nightly job to automatically generate sitemaps. These sitemaps can be scraped by Google, and all of the included links can then be indexed.

After you've enabled App Indexing, this page will showcase the following data:

1. The date the sitemap files were last generated (and included at least one of your links)
2. The total number of links to unique pieces content that Branch has included in sitemaps
3. The date Google last scraped your links
4. The total number of times that Google has scraped links to your content

Both the sitemap itself and statistics about Google scraping your links are updated via nightly map-reduce jobs.

![image](/_assets/img/pages/organic-search/firebase/db-summary.png)

!!! note "Google does not scrape sitemaps for apps with custom domains"
    If you're using a custom domain for your Branch links, Google will not scrape your auto-generated sitemap.

## Advanced

### Configure existing website for App Indexing

If you already have your own website, we recommend that you configure your own site for App Indexing rather than use Branch's hosted App Indexing. You want your main website, with your domain and SEO juice to appear in Google rather than try to push your `app.link` domain into search results. Therefore, we recommend you go through a few steps to configure your site for App Indexing.

App Indexing, despite the confusing amount of literature out there, simply opens up your app when installed and falls back to your website when not. You actually don't need to use any of Google's tools (Firebase App Indexing) to accomplish this. Merely configuring your domain for Universal Links on iOS and App Links on Android will do the trick. Here are more details:

#### Recommended: Add Universal Link and App Link support to your domain

This is by far the easiest way to take advantage of Google App Indexing, and the recommended way per conversations that we've had with their team. All you need to do is configure Universal Links and Android App Links on your domain and your corresponding apps.

We've put together some handy guides on our blogs:
- [Enable Universal Links on your domain](https://blog.branch.io/how-to-setup-universal-links-to-deep-link-on-apple-ios-9)
- [Enable Android App Links on your domain](https://blog.branch.io/how-to-set-up-android-m-6.0-marshmallow-app-links-with-deep-linking)

Feel free to drop us a line if you need help with this stuff.

#### Alternative: Have the WebSDK inject App Indexing tags into your Webpage

If you don’t want to implement Universal or App Links then you can allow the WebSDK to inject App Indexing meta tags between the head section of your webpage. These tags allow Google's web crawling bots to index your app content by launching your app through URI schemes.

This requires:

1. Branch to be integrated for URI based deep linking. Please ensure that steps 1, 2, 3 and 4 (*iOS* only) of the following guides are completed:
    - [Android SDK Integration Guide](/apps/android/)
    - [iOS SDK Integration Guide](/apps/ios/)

2. A call to `autoAppIndex()` (a WebSDK function) to be made with the appropriate parameters (see below).

 Ensure that you've placed the snippet from [here](https://github.com/BranchMetrics/web-branch-deep-linking#quick-install) somewhere between the `<head></head>` tags of your webpage. Then position `branch.autoAppIndex({..})` below `branch.init()` and with the optional parameters below:

| Key | Value
| --- | ---
| "androidPackageName" | Android App's package name
| "androidURL" | A custom scheme for your Android App such as: `example/home/cupertino/12345` where `example` is the App's URI scheme and `home/cupertino/12345` routes to unique content in the App
| "iosAppId" | iTunes App Store ID for your iOS App
| "iosURL" | A custom scheme for your iOS App such as: `example/home/cupertino/12345`
| "data" | Any additional deep link data that you would like to pass to your App


```javascript
branch.autoAppIndex({
    iosAppId:'123456789',
    iosURL:'example/home/cupertino/12345',
    androidPackageName:'com.somecompany.app',
    androidURL:'example/home/cupertino/12345',
    data:{"walkScore":65, "transitScore":50}
}, function(err) { console.log(err); });
```

After the WebSDK has initialized, the function will inject Firebase App Indexing tags between the head section of your webpage with the following format:

```html
<html>
<head>
  ...
  <link rel="alternate" href="android-app://{androidPackageName}/{androidURL}?{branch_tracking_params_and_additional_deep_link_data}"/>
  <link rel="alternate" href="ios-app://{iosAppId}/{iosURL}?{branch_tracking_params_and_additional_deep_link_data}"/>
  ...
</head>
<body> … </body>
```

**Note**: If optional parameters from above are not specified, Branch will try to build Firebase App Indexing tags using your page's [App Links](http://applinks.org/documentation/) tags.

Alternatively, if optional parameters are specified but Firebase App Indexing tags already exist then this function will append Branch tracking params to the end of those tags and ignore what is passed into `.autoAppIndex()`.

For debugging purposes, you can check that the method is correctly inserting these tags by right clicking anywhere on your webpage in Chrome then clicking on inspect. After that, toggle the head section of your page's HTML and you should see the dynamically generated Firebase App Indexing tags.

Analytics related to Google's attempts to index your App's content via these tags can be found from Source Analytics in Dashboard where `channel` is `Firebase App Indexing` and `feature` is `Auto App Indexing`.

!!! note "Testing with webmaster tools"
    We have read on Google's official blog that Googlebot renders javascript before it indexes webpages however, there are times where it may choose not to. The reasons why are unclear to us. Therefore, dynamically generated App Indexing meta tags created as part of this function may or may not appear in your tests with Webmaster Tools when you try to fetch and render as Googlebot.

### Attribute app traffic to organic search

Curious as to how well your content is performing -- how many clicks and installs it is driving?

We automatically tag clicks on these links as coming from Google App Indexing. In the Click Flow section of our Dashboard's [Summary](http://dashboard.branch.io/) page, you can filter for these clicks. Just select either `channel: google_search` or `feature: google_app_index`.

### Hiding content from the index

Not all content is public, and not all content should be publicly indexed. If you want to enable Branch's automatic sitemap generation but exclude certain pieces of content, you can mark that content as private. You should set the content indexing mode for the individual Branch Universal Object. This property is called *contentIndexMode*.

- *iOS - Objective C*

    ```obj-c
    BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
    branchUniversalObject.contentIndexMode = ContentIndexModePrivate;
    ```

- *iOS - Swift*

    ```swift
    let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "item/12345")
    branchUniversalObject.contentIndexMode = ContentIndexModePrivate
    ```

- *Android - Java*

    ```java
     BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                    .setCanonicalIdentifier("item/12345")
                    .setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PRIVATE);
    ```

You can see other platform coding examples of this on the [respective sections of the integration docs](#dialog-code?ios=create-content-reference&android=create-content-reference&adobe=create-deep-link&cordova=create-content-reference&mparticleAndroid=create-content-reference&mparticleIos=create-content-reference&titanium=create-content-reference&reactNative=create-content-reference&unity=create-content-reference&xamarin=create-content-reference).
