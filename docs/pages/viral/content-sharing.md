## Overview

If your users are creating content in your app, they will probably want to share that content with their friends. You can encourage this by making it easy to generate sharing links that open your app *and* route back exactly to the piece of content that was originally shared. This will even work when the user who opens the link doesn't have your app installed yet.

## Guide

Let's say you have developed an app called **Branch Monster Factory**. You want your users to share the monsters they create with their friends, and see the monster that was shared as soon as your app opens. Let's get started!

### Generate shareable links

The first thing we need to do is allow your users to create links. These links will contain references to the content being shared, which generate analytics data and allow your app to route straight back to that content when a link is opened.

Start by importing the relevant Branch frameworks into the view controller you will be using:

- *iOS - Objective C*

    ```obj-c
    #import "BranchUniversalObject.h"
    #import "BranchLinkProperties.h"
    ```

- *iOS - Swift*

    ```obj-c
    {% highlight objective-c %}
    #import "BranchUniversalObject.h"
    #import "BranchLinkProperties.h"
    #import "BranchConstants.h"
    ```

Create a `BranchUniversalObject` containing details about the content that is being shared. You can find examples for the [other platforms here](#dialog-code?ios=create-content-reference&android=create-content-reference&adobe=create-deep-link&cordova=create-content-reference&mparticleAndroid=create-content-reference&mparticleIos=create-content-reference&titanium=create-content-reference&reactNative=create-content-reference&unity=create-content-reference&xamarin=create-content-reference).

- *iOS - Objective C*

    ```obj-c
    BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"monster/12345"];
    branchUniversalObject.title = @"Meet Mr. Squiggles";
    branchUniversalObject.contentDescription = @"Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!";
    branchUniversalObject.imageUrl = @"https://example.com/monster-pic-12345.png";
    [branchUniversalObject addMetadataKey:@"userId" value:@"12345"];
    [branchUniversalObject addMetadataKey:@"userName" value:@"Josh"];
    [branchUniversalObject addMetadataKey:@"monsterName" value:@"Mr. Squiggles"];
    ```

- *iOS - Swift*

    ```swift
    let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "monster/12345")
    branchUniversalObject.title = "Meet Mr. Squiggles"
    branchUniversalObject.contentDescription = "Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!"
    branchUniversalObject.imageUrl = "https://example.com/monster-pic-12345.png"
    branchUniversalObject.contentMetadata.customMetadata = ["custom":"123"]
    branchUniversalObject.contentMetadata.customMetadata = ["anything":"everything"]
    ```

- *Android*

    ```java
     BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                    .setCanonicalIdentifier("monster/12345")
                    .setTitle("Meet Mr. Squiggles")
                    .setContentDescription("Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!")
                    .setContentImageUrl("https://example.com/monster-pic-12345.png")
                    .setContentMetadata(new ContentMetadata().addCustomMetadata("userId", "12345")
                        .addCustomMetadata("userName", "Josh")
                        .addCustomMetadata("monsterName", "Mr. Squiggles"));
    ```

!!! tip
    The `canonicalIdentifier` or `canonicalUrl` parameter greatly improves the content analytics data Branch captures. It should be unique to that piece of content and helps Branch dedupe across many instances of the same thing. Suitable options: a website with pathing, or a database with identifiers for entities.

Then define the properties of the link. In the example, our properties reflect that this is shared content and the user selected Facebook as the destination. You can find examples of [the other platforms here](#dialog-code?ios=create-link-reference&android=create-link-reference&adobe=create-deep-link&cordova=create-link-reference&mparticleAndroid=create-link-reference&mparticleIos=create-link-reference&titanium=create-link-reference&reactNative=create-link-reference&unity=create-link-reference&xamarin=create-link-reference).

- *iOS - Objective C*

    ```obj-c
    BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
    linkProperties.feature = @"share";
    linkProperties.channel = @"facebook";
    ```

- *iOS - Swift*

    ```swift
    let linkProperties: BranchLinkProperties = BranchLinkProperties()
    linkProperties.feature = "share"
    linkProperties.channel = "facebook"
    ```

- *Android*

    ```java
    LinkProperties linkProperties = new LinkProperties()
                   .setChannel("facebook")
                   .setFeature("sharing")
    ```

Note that on Android, you can customize the styling with the ShareSheetStyle class. Since iOS share sheet is baked into the platform, it's not customizable.

**Android**
```java
ShareSheetStyle shareSheetStyle = new ShareSheetStyle(MainActivity.this, "Check this out!", "This stuff is awesome: ")
                        .setCopyUrlStyle(getResources().getDrawable(android.R.drawable.ic_menu_send), "Copy", "Added to clipboard")
                        .setMoreOptionStyle(getResources().getDrawable(android.R.drawable.ic_menu_search), "Show more")
                        .addPreferredSharingOption(SharingHelper.SHARE_WITH.FACEBOOK)
                        .addPreferredSharingOption(SharingHelper.SHARE_WITH.EMAIL)
                        .setAsFullWidthStyle(true)
                        .setSharingTitle("Share With");
```

Then, trigger the share sheet to appear without having to create a link. Calling this method will automatically generate a Branch link with the appropriate analytics channel when the user selects a sharing destination. You can find examples of [the other platforms here](#dialog-code?ios=share-deep-link&android=share-deep-link&adobe=create-deep-link&cordova=share-deep-link&mparticleAndroid=share-deep-link&mparticleIos=share-deep-link&titanium=share-deep-link&reactNative=share-deep-link&unity=share-deep-link&xamarin=share-deep-link).

- *iOS - Objective C*

    ```obj-c
    [branchUniversalObject showShareSheetWithLinkProperties:linkProperties
                                               andShareText:@"Super amazing thing I want to share!"
                                         fromViewController:self
                                                completion:^(NSString *activityType, BOOL completed) {
        NSLog(@"finished presenting");
    }];
    ```

- *iOS - Swift*

    ```swift
    branchUniversalObject.showShareSheet(with: linkProperties,
                                         andShareText: "Super amazing thing I want to share!",
                                         from: self) { (activityType, completed) in
        if (completed) {
            print(String(format: "Completed sharing to %@", activityType!))
        } else {
            print("Link sharing cancelled")
        }
    }
    ```

- *Android*

    ```java
    branchUniversalObject.showShareSheet(this,
                                          linkProperties,
                                          shareSheetStyle,
                                           new Branch.BranchLinkShareListener() {
        @Override
        public void onShareLinkDialogDismissed() {
        }
    });
    ```

Here's an example of what you'll see with iOS on the left and Android on the right:

![image](/_assets/img/pages/viral/content-sharing/combined_share_sheet.png)

!!! note "To learn more about the concepts we used, visit these pages"
    - [Creating Links in Apps](#dialog-code?ios=create-deep-link&android=create-deep-link&adobe=create-deep-link&cordova=create-deep-link&mparticleAndroid=create-deep-link&mparticleIos=create-deep-link&titanium=create-deep-link&reactNative=create-deep-link&unity=create-deep-link&xamarin=create-deep-link)
    - [Configuring Links](/links/integrate/#configure-deep-links)
    - [Branch Universal Object](#dialog-code?ios=create-content-reference&android=create-content-reference&adobe=create-deep-link&cordova=create-content-reference&mparticleAndroid=create-content-reference&mparticleIos=create-content-reference&titanium=create-content-reference&reactNative=create-content-reference&unity=create-content-reference&xamarin=create-content-reference)
    - [Deep Link Routing](/deep-linking/routing/)

### Route incoming users directly to content

Now that your user has created a link and sent it to a friend, you should detect the incoming link when that friend opens your app, and route directly to the shared content. Read more about how to do this on the [Deep Link Routing](/deep-linking/routing/) page.

If you want to give a preview of the content to users who have not yet downloaded your app, try out [Deepviews](/web/deep-views/).

### Viewing live data on the Branch dashboard

The [Analytics page](https://dashboard.branch.io/content) on the Branch dashboard allows you to see data on content your users are sharing, and which pieces of content are the most popular. You can also use the dashboard's [Live View page](https://dashboard.branch.io/liveview/links) to see links and link clicks in real time.

!!! tip "Measure influencers"
    The [Influencers page](https://dashboard.branch.io/referrals/analytics) on the dashboard will show you who is driving the most new signups.

## Advanced

### Creating dynamic links without the share sheet

If you've built your own share sheet and you want to just create a Branch link for an individual share message or have another use case, you can create deep links directly with the following call:

- *iOS - Objective C*

    ```obj-c
    [branchUniversalObject getShortUrlWithLinkProperties:linkProperties andCallback:^(NSString *url, NSError *error) {
        if (!error) {
            NSLog(@"got my Branch invite link to share: %@", url);
        }
    }];
    ```

- *iOS - Swift*

    ```swift
    branchUniversalObject.getShortUrl(with: linkProperties) { (url, error) in
        if (error == nil) {
            print("Got my Branch link to share: (url)")
        } else {
            print(String(format: "Branch error : %@", error! as CVarArg))
        }
    }
    ```

- *Android*

    ```java
    branchUniversalObject.generateShortUrl(this, linkProperties, new BranchLinkCreateListener() {
        @Override
        public void onLinkCreate(String url, BranchError error) {
            if (error == null) {
                Log.i("MyApp", "got my Branch link to share: " + url);
            }
        }
    });
    ```

You can find examples of `linkProperties` above. You would next use the returned link and help the user post it to (in this example) Facebook.

### Specifying a shared email subject

The majority of share options only include one string of text, except email, which has a subject and a body. The share text will fill in the body and you can specify the email subject in the link properties as shown below.

- *iOS - Objective C*

    ```obj-c
    BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
    linkProperties.feature = @"share";
    linkProperties.channel = @"facebook";
    [linkProperties addControlParam:@"$email_subject" withValue:@"Your Awesome Deal"];
    ```

- *iOS - Swift*

    ```swift
    let linkProperties: BranchLinkProperties = BranchLinkProperties()
    linkProperties.feature = "share"
    linkProperties.channel = "facebook"
    linkProperties.addControlParam("$email_subject", withValue: "Your Awesome Deal")
    ```

- *Android*

    ```java
    ShareSheetStyle shareSheetStyle = new ShareSheetStyle(MainActivity.this, "Your Awesome Deal", "You will never believe what happened next!")
                            .setCopyUrlStyle(getResources().getDrawable(android.R.drawable.ic_menu_send), "Copy", "Added to clipboard")
                            .setMoreOptionStyle(getResources().getDrawable(android.R.drawable.ic_menu_search), "Show more")
                            .addPreferredSharingOption(SharingHelper.SHARE_WITH.FACEBOOK)
                            .addPreferredSharingOption(SharingHelper.SHARE_WITH.EMAIL)
                            .setAsFullWidthStyle(true)
                            .setSharingTitle("Share With");
    ```

### Previewing and debugging links

- You can debug any Branch link by appending `?debug=true` to the link and pasting it into your desktop browser. It shows
    - All deep link parameters and analytics tags
    - Specific routing guidance across many browsers
- Facebook's [OG tag tester tool](https://developers.facebook.com/tools/debug/og/object) will show you all the meta data for your link, and a preview of what it will look like when shared on Facebook or other social media platforms.
