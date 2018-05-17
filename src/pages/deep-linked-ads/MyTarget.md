## Overview

This guide will walk you through how to integrate [MyTarget](https://target.my.com/) with Branch. 

Universal Ads provides everything you need for complete tracking, including rich data for the MyTarget Engine to opimtize against.

The basic MyTarget integration involves three parts:

1. Integrating the SDKs and tracking in-app events
1. Enabling the integration and selecting postbacks
1. Creating tracking links

## Setup

{! ingredients/deep-linked-ads/integrate_branch_sdk.md !}

{! ingredients/deep-linked-ads/conversion_events_tracking.md !}

### Enabling the integration and selecting postbacks

Once you've integrated the SDK and configured the relevant events, you can enable MyTarget in the dashboard. Follow the steps below for enabling an ad partner, and select MyTarget from the list.

1. Visit the [Ads page](https://dashboard.branch.io/ads) on the Branch dashboard.
1. Select [Partner Management](https://dashboard.branch.io/ads/partner-management) from the sidebar.
1. Search for MyTarget.
    
    ![image](/img/pages/deep-linked-ads/mytarget/search-mytarget.png)

1. Click **Save and Enable**.

    ![image](/img/pages/deep-linked-ads/mytarget/mytarget-postbacks.png)

    !!! note "Enable postbacks"
        Postbacks will be automatically activated for the events listed above when you enable the integration. You can always [add additional postbacks](#adding-postbacks) or [edit postbacks](#editing-postbacks), as described below in the Advanced section.

    !!! warning "Limitations with setDebug and seeing data in Branch"
        When integrating the SDKs, it's often useful to use setDebug to verify that your app is able to communicate with Branch servers, and is receiving deep link data. However, our upstream systems don't register test events sent using setDebug, so events will not appear in Liveview or Analytics, nor will they fire postbacks. You should disable setDebug when looking at Liveview or testing postbacks.



### Creating tracking links

MyTarget requires separate links for every platform - to create a tracking follow the normal link creation flow and add platform and partner specific parameters on Deep Linking tab.

1. First, select an ad format. For App Install or App Engagement campaigns you'll want to select the **App Only** format. For Search or Display campaigns where the user should go to web if they don't have the app, then you should select **Cross-Platform Search** or **Cross-Platform Display**. **Product Links** are for shopping or dynamic remarketing campaigns and will take you to create a Deep Linked Product Feed.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/choose-ad-format.png)

1. At this point you need to name your link. Select something that will make it easy to find if you need it later. Your Ad Format and Ad Partner should be selected already, but feel free to choose one if they aren't. It's important that you select the right Ad Partner for analytics later on. Click **Configure Options** to continue.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/name-ad-link.png)

1. In the Deep Linking tab of the link creator make sure to add the following key-value pairs, based on which platform the link is going to be used for. If these values are not added to the link, myTarget will block your links.

#### iOS 
Key | Value 
--- | --- 
$redirect_store_id | iTunes ID (example id917737838)
$http_redirect_only | true 

![image](/img/pages/deep-linked-ads/mytarget/ios-link-data.png)

#### Android
Key | Value 
--- | --- 
$redirect_store_id | Android App ID (example io.branch.branchster)
$http_redirect_only | true 

![image](/img/pages/deep-linked-ads/mytarget/android-link-data.png)

1. This is also your chance to add deep link data and analytics tags. Analytics tags are important for later segmentation, so click the **Analytics** sub tab to add a Channel and Campaign value.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/add-analytics-tags.png)

    !!! tip "Set Analytics tags"

        It's easier to slice your data in our analytics platform if you properly assign analytics parameters to your link. _Channels_ generally correspond to ad networks, and _Campaigns_ correspond to marketing initiatives that you're launching. For example: _Channel_: "YouTube", _Campaign_: "Summer 2017 Shoe Discounts."

1. Click **Create Link Now**, and you have your tracking link! Take this link and give it to your Ad Partner's Account Manager or paste it into the tracking section of your campaign yourself. If you'd like to try our view-through attribution beta, please contact integrations@branch.io.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/finished-ad-link.png)


### Create MyTarget campaign

1. Access your [myTarget dashboard](https://target.my.com/campaigns/full/) and start creating a new campaign.

1. Obtain the Ad Link you created earlier from Branch, and remove all URL query parameters except %243p=a_mytarget, as myTarget will add these parameters later.

For example Example:
Original link from Branch:
https://branchster.app.link/yNC2Q06utF?%243p=a_mytarget&%24aaid={gaid}&%24idfa={idfa}&~click_id={clickid}

Final link for modified to fit myTarget's standards: 
https://branchster.app.link/yNC2Q06utF?%243p=a_mytarget

1. Paste this modified link into the URL field.

![image](/img/pages/deep-linked-ads/MyTarget/create-campaign.png)

{! ingredients/deep-linked-ads/view-ad-link-data.md !}

{! ingredients/deep-linked-ads/ua-advanced-setup.md !}