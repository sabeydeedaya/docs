## Overview

A Branch link is the vehicle that ensures seamless user experiences while also providing you with full attribution and analytics across email, referrals, paid advertising, social, organic search, and desktop to mobile.

If you are running paid advertising campaigns, you'll want to create a Branch Ad link so we can accurately attribute resulting app conversions to the appropriate advertising partner. Branch Ad Links support deferred deep linking, Android App Links and iOS Universal Links, as well as web and app conversions.

## Creating an Ad Link

!!! warning "Enabled Ad Partner Required"
	As all Branch Ad Links are uniquely built to a specific advertising partner, you can only create an Ad link for enabled ad partners.

To create a Branch Ad Link:

1. From within the Ads section in your Branch dashboard, click **Create Ad Link** in the upper right-hand corner.

### Selecting Ad Format Types

1.  In the **Create Ad Link** modal, select one of the following ad formats:
	- App Install or Engagement
	- Create Display Link
	- Create Product Link
	- Create Search Link

	!!! tip "Format Types"
		For App Install or App Engagement campaigns you'll want to select the App Only format. For Search or Display campaigns where the user should go to web if they don't have the app, then you should select Cross-Platform Search or Cross-Platform Display. Product Links are for shopping or dynamic remarketing campaigns and will take you to create a Deep Linked Product Feed.

	![image](/_assets/img/pages/deep-linked-ads/branch-universal-ads/create-link.png)

1. Click **Continue**.

### Defining Ad Link Domain & Ad Partner

1. In the **Define** section, please provide the following:
	- Choose which link domain you want to use (available for ex-TUNE clients only):
		- **Branch domain** - Create a link using your Branch domain. Note that links created with this domain will use Branch link parameters by default.
		- **TUNE domain** - Create a link using your TUNE domain. Note that links created with this domain will use TUNE link parameters/macros by default.
	- Name Your Link
	- Select the ad partner the link is for

	![image](/_assets/img/pages/links/ad-link-define.png)

### Configuring Options

1. Click **Configure Options**.
1. In the **Configure Options** section, please provide the following:
	- Define your **Link Alias**; this cannot be changed after you create the ad link.
	- Provide any of the following if applicable:
		- **Deep Linking**
		- **Redirects**
		- **Analytics Tags**

		![image](/_assets/img/pages/links/ad-link-configure-options.gif)

		!!! tip "Set Analytics tags"
			It's easier to slice your data in our analytics platform if you properly assign analytics parameters to your link. _Channels_ generally correspond to ad networks, and _Campaigns_ correspond to marketing initiatives that you're launching. For example: _Channel_: "YouTube", _Campaign_: "Summer 2017 Shoe Discounts."

1. Click **Create Link Now**.

## Validating Your Ad Link

Once you've created your Ad link, we will automatically validate it's settings to make sure your link works as you expect.

If we recognize an issue with your ad link, you will see an error message with what needs to be fixed before sharing your link.

![image](/_assets/img/pages/links/ad-link-validation.png)

Click on the error message to go back and fix the offending setting.

Once no issues exist, you should only see green checks next to your links settings.

## Sharing Your Ad Link

We provide you with a Branch link for both clicks and impressions.  Simply copy and paste the links in the tracking section of your campaign tool or email to your Ad Partner's account manager.

![image](/_assets/img/pages/links/ad-link-share.png)

You can also text yourself (or someone else) the link by providing a phone number and clicking **Send**.
