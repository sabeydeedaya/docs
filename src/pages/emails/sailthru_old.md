---
---

{! ingredients/email/email-configure-esp.md !}

You can retrieve your click tracking domain from your Sailthru settings:

1. Log in to your Sailthru account
1. Go to Settings > Setup > Domains:

    ![image](/img/pages/email/sailthru/sailthru-view-domain.png)

1. Note or copy the value in the Link Domain field
1. Enter the domain in item 1 of this step:

    ![image](/img/pages/email/sailthru/configure-sailthru-1.png)

1. Click **Done**

On **Done** click, an AASA file - required for Universal Links - specific to that domain will be generated.

{! ingredients/email/email-send-aasa.md !}

{! ingredients/email/email-technical-setup.md !}

#### Upload your AASA file

Sailthru will host an Apple App Site Association (AASA) file for you, so that your click tracking domain appears to Apple as a Universal Link, and the app will open and deep link.

To set up your AASA file, download the AASA file from the [email you received from Branch](#configure-your-app-for-your-click-tracking-domain), and follow the [instructions provided by Sailthru](https://getstarted.sailthru.com/mobile/apple-ios-app-universal-links/){:target="\_blank"} for setting up the HTTPS certificates.

{! ingredients/email/email-associated-domains.md !}

{! ingredients/email/email-bounce-web.md !}

{! ingredients/email/email-validate-test.md !}

{! ingredients/email/email-usage.md !}

### Options for generating Branch links for email

There are a few different ways you can create Branch links that are compatible with Deep Linked Email + Sailthru. You will need to replace the web URLs in your templates with these. To create Branch links, you can either:

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

{! ingredients/email/email-link-options.md !}

{! ingredients/email/email-usage-bounce.md !}

{! ingredients/email/email-support.md !}
