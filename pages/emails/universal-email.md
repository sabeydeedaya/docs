## Overview

Deep Linked Email allows you to automatically convert your email links into multi-platform deep links that take users directly to content in the app on mobile devices, while still maintaining the same web experience for desktop and mobile users without the app.

<center>
![image](/_assets/img/pages/email/universal-email/universal-email-1.png)
</center>

Using Branch you can have deeper insights into engagement with consumers, not just clicks, but also application installs, opens, purchase etc. Driving your customers into the app will significantly increase user engagement as demonstrated in case studies from [Airbnb](http://www2.branch.io/rs/315-FTT-121/images/CS-Airbnb.pdf) and [Instacart](https://www2.branch.io/rs/315-FTT-121/images/CS-Instacart-DLE.pdf), who are already using Branch link in their emails.

## How it Works

Traditionally, getting links to work in email has always been fairly time-consuming and sometimes futile process. If you use an Email Service Provider (ESP) to send your marketing emails, deep linking into your app has always been out of the question as it simply doesn’t work - due to broken Domain-App association - thus users can only be routed to your mobile web content.

<center>
![image](/_assets/img/pages/email/universal-email/branch-universal-email.png)
</center>

Branch solves this problem by integrating directly with your ESP and acting as a proxy between your ESP’s server and your customized domain name. As the proxy, Branch not only forwards all of the information associated with the link and click to your ESP, but also receives information back including personalized content which Branch uses when redirecting the user to your app or mobile web.

## Deep Linking Settings for Email

The following are all the possible settings you can configure for deep linking with email.

### Link Behavior for User with App

Setting | Example | Link Data Result
--- | --- | ---
**Open the app homepage** | No settings configured to generate deep link data for email; email links will route to the app homepage.
**Open to specific app content** | Deep link to specific app content based on one or more of the following settings.
Translate query parameters on URLs into Branch link data | **URL:** `https://shop.com/shoes/brown-loafers&product_id=123456` | `product_id: 123456`
Translate web URL into Branch link data: <br> Full URL for key ______ | **URL:** `https://shop.com/shoes/brown-loafers` <br> **Key:** `$canonical_url` | `$canonical_url: https://shop.com/shoes/brown-loafers`
Translate web URL into Branch link data: <br> URL path for key ______ | **URL:** `https://shop.com/shoes/brown-loafers` <br> **Key:** `$deeplink_path` | `$deeplink_path: shoes/brown-loafers`
Retrieve hosted deep link data from website and translate into Branch link data | **URL:** `https://shop.com/shoes/brown-loafers` <br> **Meta Tags:** `<meta name="branch:deeplink:product_id" content="123456" />` | `product_id: 123456`
Strip protocol (http:// or https://): <br> from $deeplink_path <br> from $ios_deeplink_path <br> from $android_deeplink_path <br> *Note: Typically used with one of the other settings.* | **URL:** `https://shop.com/shoes/brown-loafers` <br> **Other Settings:** Translate web URL into Branch link data: Full URL for key `$deeplink_path` | `$deeplink_path: shop.com/shoes/brown-loafers`
Translate query parameters on URLs into Branch link data from parameter ______ to key ______ <br> *Note: Not configurable in the UI. [Contact support](https://support.branch.io/support/tickets/new){:target="_blank"} to use this setting.* | **URL:** `https://shop.com/shoes/brown-loafers&product_id=123456&utm_content=shoes` <br> **Parameter:** `utm_content` <br> **Key:** `category` | `category: shoes`

### Link behavior for Users Without App

Setting | Description
--- | ---
Open to specific web content | Route to the original URL specified in the email.
Open to default redirects | Route to defaults specified in [Link Settings](https://dashboard.branch.io/link-settings){:target="_blank"}.

##Getting Started

Using Branch Universal Email involves four basic steps:

- Configuring your ESP
- Activating the integration and setting up desired link behavior
- Configuring your mobile app
- Updating the links in your email

Find your ESP - a [Branch Universal Email Partner](/emails/email-partners-list/) - and get started today!
