---
---

## Overview

You can use Branch links in email campaigns to launch your app or gracefully fall back to the App or Play Store download page. For more advanced purposes, you can even deep link users directly to content after your app opens.

![image](/img/pages/email/self-serve/email.png)

## Guide

### Prerequisites

- To track installs from Branch links in email campaigns, you need to integrate the Branch SDK into your app.
- If you want to deep link directly content, you should configure deep link routing.

### Disable third-party click tracking

Many third-party providers add redirects to your URLs. This facilitates click tracking and analytics on those platforms, but will break Universal Link and App Link functionality. To make Universal Links and App Links work, **you will need to disable click tracking** in the third-party system. Here are instructions for some common platforms:

- [MailChimp](http://kb.mailchimp.com/reports/enable-and-view-click-tracking#Turn-Click-Tracking-On-or-Off){:target="\_blank"}

!!! proptip "Want to deep link your emails without sacrificing click tracking?"
    To keep click tracking *and* deep link on all devices, try one of our [Deep Linked Email integrations](https://dashboard.branch.io/email){:target="\_blank"}. If you do not see your ESP there, let us know [here](https://dashboard.branch.io/email){:target="\_blank"}:

    ![image](/img/pages/email/no-esp.png)

    And let your ESP know, too!

### Create Quick Links on the Branch dashboard

1. Open the [Quick Link creator](https://dashboard.branch.io/quick-links/qlc/define) on the Branch dashboard.
1. Pick a **Link Name** for later reference. For example: "Launch Email".
1. Paste in the web URL from your email template.
1. Add analytics tags. For "Where will you post this link?" it's recommended to use `Email` as the channel.
1. In **Configure Options** > **Redirects**, select **Web URL** for each platform.
1. Click **Create Link Now**, and then copy the created link into your email template.

Repeat this for each URL in your email template that you would like to deep link.

!!! protip "Optional: Deep Link Routing (Advanced)"
    You can use the **Configure Options** > **Deep Linking** section to specify custom link parameters that will be deep linked into the app after install. These could include a coupon code or a page identifier to route the user. Visit the [Deep Link Routing]({{base.url}}/getting-started/deep-link-routing) page to learn more.

### Conclusion

It's that simple! The [Branch dashboard](https://dashboard.branch.io/sources){:target="\_blank"} will track clicks for this link based on the channel, campaign and any other tags you created. Users who have the app will be linked straight to the app, and users who don't will be taken to the App/Play Store to download it, depending on your [settings](https://dashboard.branch.io/link-settings){:target="\_blank"}.

!!! protip "Creating links dynamically"
    If you need more flexibility, you might also be interested in building links by [appending query parameters](/pages/links/integrate/#custom-link-behavior).
