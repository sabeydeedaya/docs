## Overview

  - Push notifications are a great way to engage your existing app users. The Branch platform does not actually send push notifications, but you can add Branch links to your push notifications to get the benefit of deep linking and attribution.

## Configure

- ### Prerequisites

    - This guide requires you to have already [integrated the Branch SDK](#dialog-code) into your app for tracking.

- ### Receive push notification links

    - Please ensure that your Branch SDK is correctly configured to receive the push notification and parse out the link. You can find the specific methods needed on [this page of the integration guide](#dialog-code?ios=handle-push-notifications&android=handle-push-notification). Only native iOS and Android supported.

- ### Create a Branch powered push message

    - Now that your app is setup, you just need to [create a Branch deep link](/links/integrate/) and place it into your push message. Simply add the link as additional key/value to your payload. Use the key `branch` and place the link as the value.
