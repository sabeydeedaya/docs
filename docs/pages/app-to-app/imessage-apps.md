---
title: Marketing your iOS 10 iMessage app
description: A quick guide on how to configure your Branch links to track installs and deep link your iOS 10 iMessage app.
path: tree/master/src/app-to-app
source: imessage-apps.md
---
## Overview

With iOS 10, Branch has [added support](https://blog.branch.io/setting-up-your-ios-10-imessages-app-with-attribution-and-deep-linking){:target="\_blank"} for extension type apps so that you can bundle the SDK into your iMessage app. Apple didn't build full deep linking support into extension apps, so unfortunately the use cases are limited to driving new installs for now. We'll wait patiently to observe updates over time

iMessage apps are now completely separate from your main App Store app, and should be treated as such. Thus, there is some common confusion that we wanted to clear up regarding how to use Branch with your iMessage app. Here's a list of best practices to ensure your integration is successful.

## Setup

### Best practices

#### Create a separate Branch app for the messages app

We highly recommend that you create a _separate_ Branch app via the dashboard for your iMessage app than your full iOS app. Why? Because there's no technical way to handle deep link routing elegantly between your core app and the messages app. Apple has not built support for this use case.

Configure one Branch app's settings to link to your messages app in the iMessage App Store, then configure another Branch app settings to link to your core app in the main App Store. This means you'll integrate the SDK into your messages app with a different Branch key than your main app.

#### Only use Branch for driving installs of messages apps

Apple did not build support for the use case where a user clicks a link and the messages app opens. Therefore, Branch cannot open up the existing, pre-installed messages app. Branch can only link to the messages app in the iMessage App Store, even when it's already installed.

Because of this, you should primarily use Branch for tracking installs and deep linking through install. Don't expect a high quality user experience if the app is already installed.

#### Market your messages app separately from your main app

Because there's no good way to intelligently route to the main App Store, iMessages App Store and existing app depending on the context, we recommend you market your messages app with different links from your main App Store app. So, message to a user you're going to link them to your messages app differently than when you're linking to the App Store app.

### Configuring redirects

#### Introductory concept on messages redirects

If you've read the above, you know that the iMessage App Store is a completely different store than the main App Store. In order to link users to your app in the iMessage App Store, you simply need to append `?app=messages` to the link. You can try this on any iOS 10 phone with the links below:

1. iMessages App Store: https://itunes.apple.com/us/app/classic-mac/id1127542169?app=messages
2. Main App Store: https://itunes.apple.com/us/app/classic-mac/id1127542169

#### Configure your Branch links

First, create an entirely new app via the [Branch dashboard](https://dashboard.branch.io/). You can do this in the pull down selector that shows your app name in the top right section. Then head to the [link settings page](https://dashboard.branch.io/link-settings) and scroll to the iOS section to configure it as follows:

![dashboard settings](/_assets/img/pages/app-to-app/imessage-apps/dashboard_link_settings.png){ .full-width }

Ensure you do the following:

- Uncheck “I have an iOS App”
- Disable Universal Links
- Paste the App Store URL with `?app=messages` appended into the URL field
- Click Save

You're all set! All of your Branch links will correctly link to the iMessages App Store.

## Troubleshooting

### Tracking installs

To track installs and personalize the first time user experience, you simply need to follow the instructions in the [SDK integration guide](/apps/ios/) for iMessage apps. You'll integrate the SDK just as you have for your main App Store app.
