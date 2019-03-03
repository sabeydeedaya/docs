Adding Branch to your Launch Property will allow you to use core functionality from the Web SDK to convert web traffic to mobile traffic effortlessly.

## Prerequisites

- Have the [Adobe Experience Platform Launch SDK](https://docs.adobelaunch.com/) integrated into your site.
- Have a Branch app created for your company: https://dashboard.branch.io.
	- One Branch app per Launch Property is recommended.
- Have the Branch [iOS SDK](/apps/ios) and/or [Android SDK](/apps/android) integrated into your mobile apps.
- Have [Link Settings](https://dashboard.branch.io/link-settings) in Branch’s Dashboard correctly configured

If these steps have not been completed, please refer to Adobe Launch’s [documentation](https://developer.adobelaunch.com/). For Branch integration issues, please reach out to integrations@branch.io.

## Installing the Branch Plugin

To install the Branch Plugin in your Launch Property:

1. Log into Launch
2. Navigate to the Extensions tab from the Property that you’d wish to install the plugin to
3. From the Extensions tab, click on Catalog and search for Branch
4. Push the Install button
5. During the Installation phase, you’ll be asked to input your Branch Key
6. Log into dashboard.branch.io, click on Account Settings, click on App and copy your Branch Key into the text field.
7. Hit the Save button
8. Now when the Branch plugin is initialized on your Launch Property, it will be tied to your Branch App.

![image](/_assets/img/pages/apps/adobe-launch-web-plugin/adobe-launch-web1.png)

### Initialize Branch

Before using actions related to Branch, you’ll need to **initialize** the plugin on your site. Best practice is to initialize Branch on **DOM Ready**. Here’s an example that uses the Core plugin’s DOM Ready event to initialize Branch.

![image](/_assets/img/pages/apps/adobe-launch-web-plugin/adobe-launch-web2.png)

Note: The Branch initialization action does not have a configuration screen. When you add it to a rule, you’ll want to select the following options:

![image](/_assets/img/pages/apps/adobe-launch-web-plugin/adobe-launch-web3.png)

**Extension**: Branch Experiences and Measurement

**Action Type**: Initialize Branch

Once configured, please remember to publish your changes!

## Show a Journey to Users on Your Mobile Website

Branch provides out-of-box support to show a mobile banner/Journey on your website. During the initialization process, Branch will fire an event to determine whether a page is eligible to display a Journey on. If it is eligible, then users on that page will see it.

There are myriad of ways that your Journey banners can be configured. To set one up, follow [this guide](/web/journeys/#create-journey-banner-or-interstitial).

Once your Journey is setup in Branch’s Dashboard and you’ve configured Branch to initialize through a rule in Adobe Launch, a Journey banner should appear on various pages of your mobile website (depending on how you’ve set up your Journey’s Audience Rules). Furthermore, a click by one of your users on the CTA button (“GET” in the screenshot) will take users to the App/Play Store to download the app. If the app is already installed, then they will get Deep Linked to it.

## Automatically Open the App When Installed

To have Branch automatically Deep Link users to your mobile app when installed, use the **Auto-Open Native App** action. It is advisable to chain this action to the action that initializes Branch because you’ll want to transport users into the app immediately when installed. The UX for a user that has your app installed, will include a prompt to open your app. Upon acknowledgement, they will get transported into it and data configured within the action’s view will be passed into it. Conversely, if a user does not have the app installed, the user will remain on mobile web.

![image](/_assets/img/pages/apps/adobe-launch-web-plugin/adobe-launch-web4.png)

Note: Deep Link Data, Tags, Campaign and Channel can be sourced from Data Elements. Simply use %<Data_Element_Name>% notation.

## Send Desktop Users an SMS to Download App

If you’ve got Desktop users signing up on your website and would like to push them to your mobile app, you can use the **SMS Link to Download App** action. This action has a view similar to the one above but with an additional piece - a user’s phone number. One should use Data Elements to supply the phone number.

When this action is triggered, a user will be sent an SMS with a link to download your app. A click on the link with the app not installed will take the user to the App/Play Store to download it. Upon entering the app, data from the action’s view will be delivered into it.

Here’s a screenshot of what the SMS action looks like:

![image](/_assets/img/pages/apps/adobe-launch-web-plugin/adobe-launch-web5.png)

Note: Deep Link Data, Tags, Campaign and Channel can also be sourced from Data Elements. Simply use %<Data_Element_Name>% notation.

## Track an Event

If you’d like to track an event in Branch then you can do so via the Track an Event action. With this action, you’ll be able to track commerce events (purchase, add to cart, etc), content events (search, view content items, etc) user lifecycle events (complete registration, unlock achievement, etc), other custom events. The view configuration is straightforward and looks like the following:

![image](/_assets/img/pages/apps/adobe-launch-web-plugin/adobe-launch-web6.png)

As you cycle through the event types from the drop down (up top), the types of fields that you can send with events will also change. Additionally, there is a validation built into the view so that correct data types are sent with the event.

Note: This validation is for static/hard coded values only and not for Data Elements.
