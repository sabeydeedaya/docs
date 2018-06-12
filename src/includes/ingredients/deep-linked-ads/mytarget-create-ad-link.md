### Create an ad link

Once you've enabled an integration it's time to create a tracking link.

1. First, select an ad format. For App Install or App Engagement campaigns you'll want to select the **App Only** format. For Search or Display campaigns where the user should go to web if they don't have the app, then you should select **Cross-Platform Search** or **Cross-Platform Display**. **Product Links** are for shopping or dynamic remarketing campaigns and will take you to create a Deep Linked Product Feed.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/create-link.png)

1. At this point you need to name your link. Select something that will make it easy to find if you need it later. Your Ad Format and Ad Partner should be selected already, but feel free to choose one if they aren't. It's important that you select the right Ad Partner for analytics later on. Click **Configure Options** to continue.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/create-link-name.png)

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

1. This is your chance to add deep link data and analytics tags. Analytics tags are important for later segmentation, so click the **Analytics** sub tab to add a Channel and Campaign value.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/create-link-tags.png)

    !!! tip "Set Analytics tags"

        It's easier to slice your data in our analytics platform if you properly assign analytics parameters to your link. _Channels_ generally correspond to ad networks, and _Campaigns_ correspond to marketing initiatives that you're launching. For example: _Channel_: "YouTube", _Campaign_: "Summer 2017 Shoe Discounts."

1. Click **Create Link Now**, and you have your tracking link! Take this link and give it to your Ad Partner's Account Manager or paste it into the tracking section of your campaign yourself.

    ![image](/img/pages/deep-linked-ads/branch-universal-ads/create-link-completed.png)

	!!! tip "Server to server tracking links"
		If you just need a server to server tracking link just add `%24s2s=true` at the end of your link, so we know it's a server to server link.


