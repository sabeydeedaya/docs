## Overview

Listing your app content on Apple's new Spotlight search with Branch is easy. Note that this guide will list on both _cloud search_ and _local spotlight search_.

!!! warning
    Some older devices cannot index content. iPad minis, for example, cannot use CoreSpotlight. The SDK includes a check for these devices and will return an error message if you attempt to index content on them.


## Setup

### Prerequisites

This guide requires you to have already [integrated the Branch SDK](/apps/ios/) into your app. For Spotlight search results to function as intended, you should also [configure deep link routing](/apps/ios/#navigate-to-content).


### List Content

Content can be added to Spotlight search by using the `BranchUniversalObject`. We'd recommend that you put this on every page that renders a piece of content for your users. This way, a user could rediscover a previous thing that they had viewed.

First, define the content that you'd like to have listed by describing it with a `BranchUniversalObject`. We'd recommend that you do as early as possible, in `viewDidLoad`.

Then call the `registerView` method on your `BranchUniversalObject`. You will want to do this every single time a user views a page in your app, so we recommend putting this in `viewDidAppear`, which means you must initialize the Branch Universal Object with all appropriate metadata before `viewDidAppear`.

- *Swift 3*

    ```swift
    // Describe your content with a BranchUniversalObject:
    let branchUniversalObject: BranchUniversalObject = BranchUniversalObject(canonicalIdentifier: "item/12345")
    branchUniversalObject.title = "My Content Title"
    branchUniversalObject.contentDescription = "My Content Description"
    branchUniversalObject.imageUrl = "https://example.com/mycontent-12345.png"
    branchUniversalObject.addMetadataKey("property1", value: "blue")
    branchUniversalObject.addMetadataKey("property2", value: "red")

    // Set this to true if you'd like the content to be publicly searchable through Google and Apple search:
    branchUniversalObject.publiclyIndex = true

    // Important! Set this flag to true for local spotlight indexing:
    branchUniversalObject.locallyIndex = true

    ...

    // Next, register the content view, perhaps in your `viewDidAppear` method:
    branchUniversalObject.registerView()
    ```

- *Objective C*

    ```obj-c
    // Describe your content with a BranchUniversalObject:
    BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
    branchUniversalObject.title = @"My Content Title";
    branchUniversalObject.contentDescription = @"My Content Description";
    branchUniversalObject.imageUrl = @"https://example.com/mycontent-12345.png";
    [branchUniversalObject addMetadataKey:@"property1" value:@"blue"];
    [branchUniversalObject addMetadataKey:@"property2" value:@"red"];

    // Set this to true if you'd like the content to be publicly searchable through Google and Apple search:
    branchUniversalObject.publiclyIndex = YES;

    // Important! Set this flag to true for local spotlight indexing:
    branchUniversalObject.locallyIndex = YES;

    ...

    // Next, register the content view, perhaps in your `viewDidAppear` method:
      [branchUniversalObject registerView];
    ```

This will create the appropriate NSUserActivity and tell Apple that a view occurred, adding it to the local Spotlight index if not already present in addition to increasing it's ranking in the global index. To read more about this, check out [this blog post](https://blog.branch.io/ios-10-spotlight-app-discovery-nsuseractivity-and-search-relevancy).

### Handle incoming traffic from Spotlight

Open your **AppDelegate.m** file and add the following method. If you completed the basic SDK integration guide, this is likely already present.

- *Swift 3*

    ```swift
    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([Any]?) -> Void) -> Bool {
        // pass the url to the handle deep link call
        return Branch.getInstance().continueUserActivity(userActivity)

        return true
    }
    ```

- *Objective C*

    ```obj-c
    - (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
        [[Branch getInstance] continueUserActivity:userActivity];

        return YES;
    }
    ```

## Advanced

### Use deepviews for user acquisition

If the user doesn't have the app installed and finds your content through search, Spotlight will open up the browser. In this situation, you can [show a Deepview](/web/deep-views/), which is an automatically-generated, mobile web render of the app content.

### Customize content

- You can use our identifier when indexing to perform advanced customizations of the content being listed.

     - *Swift 3*

        ```swift
        branch.getSpotlightUrl(withParams: ["$og_title": "My App",
                                            "$og_description": "My app is disrupting apps",
                                            "$og_thumb": "https://s3-us-west-1.amazonaws.com/branchhost/mosaic_og.png",
                                            "object_id": "1234"],
                                 callback: { (params, error) in

                if let params = params {
                        // params will contain @"url" and @"spotlight_identifier"
                        // the example below shows where to use them

                        // Index via the NSUserActivity strategy
                        // you must set the new NSUserActivity to the property of a UIViewController
                        self.userActivity = NSUserActivity(activityType: params["spotlight_identifer"] as! String)
                        self.userActivity.webpageURL = URL(string: params["url"] as! String)
                        self.userActivity.becomeCurrent()
                }
        })
        ```

    - *Objective-C*

        ```obj-c
        [branch getSpotlightUrlWithParams:@{@"$og_title": @"My App",
                                                @"$og_description": @"My app is disrupting apps",
                                                @"$og_thumb": @"https://s3-us-west-1.amazonaws.com/branchhost/mosaic_og.png",
                                                @"object_id": @"1234"}
                                     callback:^(NSDictionary *params, NSError *error) {
                if (!error && params) {
                    // params will contain @"url" and @"spotlight_identifier"
                    // the example below shows where to use them

                    // Index via the NSUserActivity strategy
                    // you must set the new NSUserActivity to the property of a UIViewController
                    self.userActivity = [[NSUserActivity alloc] initWithActivityType:params[@"spotlight_identifer"]];
                    self.userActivity.webpageURL = [NSURL URLWithString:params[@"url"]];
                    [self.userActivity becomeCurrent];
                }
        }];
        ```

### Index content at scale

If the goal is to simply index the content of the app without creating a `BranchUniversalObject` or if you want index content at scale then we recommend using the following method:

- *Swift 3*

    ```swift
    let set:BranchCSSearchableItemAttributeSet = BranchCSSearchableItemAttributeSet()
    set.title = "My Content Title"
    set.contentDescription = "My Content Description"
    set.params = ["property1" : "blue", "property2" : "red"]
    set.keywords = ["array", "of", "keywords"]
    set.thumbnailURL = URL(string: "https://example.com/mycontent-12345.png")
    set.index { (url, spotlightIdentifier, error) in
        print("url \(String(describing: url)), spotlightIdentifier \(String(describing: spotlightIdentifier)), error \(error.debugDescription)")
    }
    ```

- *Objective-C*
    ```obj-c
    BranchCSSearchableItemAttributeSet *set = [[BranchCSSearchableItemAttributeSet alloc] init];
    set.title = @"My Content Title";
    set.contentDescription = @"My Content Description";
    set.params = @{@"property1" : @"blue", @"property2" : @"red"};
    set.keywords = [NSSet setWithArray:@["array", "of", "keywords"]];
    set.thumbnailURL = @"https://example.com/mycontent-12345.png";
    [set indexWithCallback:^(NSString * _Nullable url, NSString * _Nullable spotlightIdentifier, NSError * _Nullable error) {
        NSLog(@"url %@, spotlightIdentifier %@, error %@ ", url, spotlightIdentifier, error);
    }];
    ```

### Index content using Branch Universal Object on Spotlight

- Index single Branch Universal Object

    - *Swift 3*

        ````swift
        universalObject.listOnSpotlight(with: linkProperty) { (url, error) in
            if (!error) {
                print("Successfully indexed on spotlight")
             }
        }
        ```

    - *Objective-C*
        ```obj-c
        [universalObject listOnSpotlightWithLinkProperties:linkProperties callback:^(NSString * _Nullable url, NSError * _Nullable error) {
            if (!error) {
                 NSLog(@"Successfully indexed on spotlight");
            }
        }];
        ```
!!! note
    Content would be indexed using NSUserActivity if contentIndexMode of BranchUniversalObject is Public, otherwise it would be indexed using CSSearchableIndex

- Index batch of Branch Universal Objects on Spotlight using CSSearchableIndex

    - *Swift 3*

        ```swift
        Branch.getInstance().indexOnSpotlight(usingSearchableItems: universalObjects,
                                                completion: { (universalObjects, error) in
             if (!error) {
                // Successfully able to index all the BUO on spotloght
            }
        })
        ```

    - *Objective-C*
        ```obj-c
        [[Branch getInstance] indexOnSpotlightUsingSearchableItems:universalObjects
                                                    completion:^(NSArray<BranchUniversalObject *> *universalObjects,
                                                                 NSError *error) {
                if (!error) {
                   // Successfully able to index all the BUO on spotloght
                }
        }];
        ```

!!! note
    All the Branch Universal Objects will be indexed using CSSearchableIndex irrespective of it's contentIndexMode

- Remove single Branch Universal Object from Spotlight if privately indexed

    - *Swift 3*

        ```swift
        universalObject.removeFromSpotlight { (error) in
            if(!error) {
                print("BUO successfully removed")
            }
        }
        ```

    - *Objective-C*

        ```obj-c
        [universalObject removeFromSpotlightWithCallback:^(NSError * _Nullable error) {
            if (!error) {
                NSLog(@"universal Object removed from spotlight");
            }
        }];
        ```

- Remove batch of Branch Universal Objects from Spotlight if privately indexed

    - *Swift 3*

        ```swift
        Branch.getInstance().removeSearchableItems(with: [BUO1,BUO2]) { (error) in
            if (!error) {
                print("An array of BUOs removed from spotlight")
            }
        }
        ```

    - *Objective-C*

        ```obj-c
        [[Branch getInstance] removeSearchableItemsWithBranchUniversalObjects:@[BUO1,BUO2] callback:^(NSError *error) {
            if (!error) {
                NSLog(@"An array of BUOs removed from spotlight");
            }
        }];
        ```

!!! note
    "spotlightIdentifier" member variable of Branch Universal Object should contain the spotlight indentifier which was used to index content to successfully remove indexing.

- Remove all the content from Spotlight if privately indexed using Branch SDK

    - *Swift 3*

        ```swift
        Branch.getInstance().removeAllPrivateContentFromSpotLight { (error) in
            if (!error) {
                print("All branch privately indexed content removed from spotlight")
            }
        }
        ```

    - *Objective-C*

        ```obj-c
        [[Branch getInstance] removeAllPrivateContentFromSpotLightWithCallback:^(NSError *error) {
            if (!error) {
                NSLog(@"All branch privately indexed content removed from spotlight");
            }
        }];
        ```
