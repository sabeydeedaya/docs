## Overview

Branch has invested a lot of time and effort to ensure that we only help with SEO and search rankings while delivering our value. We've very thoughtfully designed how we treat Google and other search engine bots that crawl links to ensure that SEO juice is properly passed on to your website domain and not ours.

## Branch redirects don't affect SEO / rankings

Commonly, you'll want to put Branch links on social and other public platforms to get the benefit of Branch's deep linking and attribution. You might configure your Branch link to send your users to the website when the app is not installed by using `$fallback_url` or one of the platform fallbacks like `$desktop_url` or `$ios_url`.

There's no need to worry about SEO in this case. Branch uses HTTP 307 redirects to fallback to your website when the app is not installed and a Google representative has [commented publicly](http://searchengineland.com/google-no-pagerank-dilution-using-301-302-30x-redirects-anymore-254608) that these do not harm SEO or rankings.

## Best practices for using Branch to enhance SEO

If you're not using using `$fallback_url` or one of the platform fallbacks like `$desktop_url` or `$ios_url` to redirect users, you can still configure your Branch links to contribute SEO juice to a website. You merely need to configure the `$canonical_url` field of the link to the web URL you'd like us to send to search engine bots. This doesn't affect redirect behavior but does affect SEO.

This can be set via the native libaries while using the BUO as shown below. For other platforms, you can see the appropriate code in the following [docs](#dialog-code?ios=create-content-reference&android=create-content-reference&adobe=create-deep-link&cordova=create-content-reference&mparticleAndroid=create-content-reference&mparticleIos=create-content-reference&titanium=create-content-reference&reactNative=create-content-reference&unity=create-content-reference&xamarin=create-content-reference).

- *iOS - Objective C*

    ```obj-c

    BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
    branchUniversalObject.canonicalUrl = @"https://example.com/item/12345";
    ```

- *iOS - Swift*

    ```swift
    let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "item/12345")
    branchUniversalObject.canonicalUrl = "https://example.com/item/12345"
    ```

- *Android*

    ```java
     BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                    .setCanonicalIdentifier("item/12345")
                    .setCanonicalUrl("https://example.com/item/12345")
    ```

## Journeys banners and other web integrations

The other common concern is around Branch's web products such as [Journeys banners](/web/journeys/) or the [web library](/web/integrate/). After deploying your banners to the wild, you can check your Branch-integrated site using Google's [Page Speed analyzer](https://developers.google.com/speed/pagespeed/). You'll be pleased to know that Branch is fully optimized.

You'll find that all assets such as images, text and image are compressed and optimized for page loads speed. Plus, our static assets are cached in our CDN to deliver fast load times globally. We won't be a hindrance to your site performance.
