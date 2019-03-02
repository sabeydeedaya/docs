## Overview

![Sailthru](/img/pages/email/sailthru/sailthru.png)

This guide will walk you through how to setup your email campaigns with **[Sailthru](https://www.sailthru.com/){:target="\_blank"}** using Branch Universal Email to automatically convert your email links into **multi-platform deep links**

{! ingredients/email/overview-steps.md !}

## Setup

{! ingredients/email/prerequisites.md !}

## Configure your ESP

### Setup a custom click tracking domain

1. Add and verify a custom click tracking domain in the **Domain** section of your Sailthru account:

    ![image](/img/pages/email/sailthru/create-domain.png)

!!! tip "Adding a custom click-tracking domain"
    If you need help with setting up a custom click-tracking domain - please ask your account manager or request support at Sailthru.

## Activate integration

### Choose your email service provider

Navigate to the [Universal Email](https://dashboard.branch.io/email){:target="\_blank"} section of the Branch dashboard. Select **Sailthru** and click **Enable**.

{! ingredients/email/link-setup.md !}

### Tell us your click tracking domain

You can retrieve your click tracking domain from the **Domain** section of your Sailthru account. If you have not added a custom click tracking domain yet, follow the instructions [here](#setup-a-custom-click-tracking-domain). 

![image](/img/pages/email/sailthru/setup-config.png)

{! ingredients/email/technical-setup.md !}

### Upload your AASA file

Sailthru will host an Apple App Site Association (AASA) file for you, so that your click tracking domain appears to Apple as a Universal Link, and the app will open and deep link.

To set up your AASA file, download the AASA file from the [email you received from Branch](#configure-your-app-for-your-click-tracking-domain), and follow the [instructions provided by Sailthru](https://getstarted.sailthru.com/mobile/apple-ios-app-universal-links/){:target="\_blank"} for setting up the HTTPS certificates.
	
{! ingredients/email/validate-test.md !}

{! ingredients/email/simplified-usage-auto.md !}

## Configure your mobile app

{! ingredients/email/send-aasa.md !}

{! ingredients/email/technical-setup-app.md !}

{! ingredients/email/associated-domains.md !}

{! ingredients/email/bounce-web.md !}

## Using Universal email

{! ingredients/email/usage.md !}

### Options for generating Branch links for email

There are a few different ways you can create Branch links that are compatible with Universal Email + Sailthru. You will need to replace the web URLs in your templates with these. To create Branch links, you can either:

1. [Automatically populate emails with content via Zephyr](#automatically-populate-emails-with-content-via-zephyr)
1. [Making regular Branch links compatible with email](#making-regular-branch-links-compatible-with-email)
1. [Create email links via API without changing your email templates](#create-email-links-via-api-without-changing-your-email-templates)
1. [Convert all web links in your email to deep links](#convert-all-web-links-in-your-email-to-deep-links)

#### Automatically populate emails with content via Zephyr

Sailthru allows you to automatically populate emails with content via Zephyr. This means that you can create a template once, then have all subsequent emails automatically configured to convert normal web URLs into deep links.

The Sailthru integration requires you to add code in two places:

1. At the top of an email template
1. Immediately before a hyperlink

##### Prepare your template

At the top of each email template, you should simply copy and paste the following snippet. It specifies a variable that is used to automatically contruct deep links, `branch_base_url`. This snippet will be provided by your Branch Account Manager.

Copy the below snippet and paste it above the `<head>` tag:

```html
{branch_base_url='BASE URL FROM BRANCH'}
```

Enter the base url provided by your Branch account manager.

!!! example "Example"
    ```html
    {branch_base_url='http://bnc.lt/abcd/3p?%243p=e_st'}
    ```

##### Create deep links
Before each hyperlink, you’ll need to include a short amount of code. Put the original link (which will automatically be converted to a deep link) on the first line of the code snippet.

Before:

```html
<a href="ORIGINAL URL">Click me</a>
```

After:

```html
{link='ORIGINAL URL'}

{*Branch deeplink builder*}{deeplink=branch_base_url + "&%24original_url=" + u(link)}{*end Branch deeplink builder*}

<a href="{deeplink}">Click me</a>
```

!!! example "Example"
    ```html
    {link='http://example.com/?utm=y'}

    {*Branch deeplink builder*}{deeplink=branch_base_url + "&%24original_url=" + u(link)}{*end Branch deeplink builder*}

    <a href="{deeplink}">Click me</a>
    ```

![image](/img/pages/email/sailthru/deep-linked-email-sailthru.png)

!!! protip "Using Branch Links with Zephyr"
    The Branch deep link script also works with Sailthru's Zephyr personalization language. Here's an example with the correct syntax.

    ```html
    {link=content[0].url}

    {*Branch deeplink builder*}{deeplink=branch_base_url + "&%24original_url=" + u(link)}{*end Branch deeplink builder*}

    <a href="{deeplink}">Click me</a>
    ```

{! ingredients/email/link-options.md !}

{! ingredients/email/usage-bounce.md !}

## Support

{! ingredients/email/support.md !}
