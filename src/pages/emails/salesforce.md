## Overview

![Salesforce](/img/pages/email/salesforce/salesforce.png)

This guide will walk you through how to setup your email campaigns with **[Salesforce](https://www.salesforce.com/products/marketing-cloud/overview/){:target="\_blank"}** using Branch Universal Email to automatically convert your email links into **multi-platform deep links**

{! ingredients/email/overview-steps.md !}

## Setup

!!! tip "SFMC Pre-requisite"
	You must have the **[Salesforce Marketing Cloud Sender Authentication Package (SAP)](https://help.salesforce.com/articleView?id=mc_es_sender_authentication_package.htm&type=5){:target="\_blank"}** in order to benefit from Universal Links + click tracking functionality.

{! ingredients/email/prerequisites.md !}

## Configure your ESP

### Setup a custom click tracking domain

You can retrieve your click tracking domain from your Salesforce settings. We **highly** recommend using a new click tracking domain for this implementation to ensure that the user experience for pre-Branch links on the original click tracking domain doesn't break.

!!! tip "Adding a custom click-tracking domain"
    If you need help with setting up a custom click-tracking domain - please ask your account manager or request support at Salesforce.

#### Configure your AASA file in Salesforce Marketing Cloud

Your Salesforce account must be configured to correctly handle Universal Links. Configure the settings in Deep Linking under the Admin section in Email Studio. Ensure you're in the account corresponding to the correct click tracking domain [you selected](#tell-us-your-click-tracking-domain) above.

![image](/img/pages/email/salesforce/salesforce-aasa-toolbar.png)

1. Enter the AppID value
1. Check the "Exclude Profile" and "Unsub Center" checkboxes to force links to these items to open in the browser and not the app, if desired.
1. Click "Save" to save the configuration.
1. Let Salesforce and Branch know that you've finished this step and your Technical Account Manager will verify that everything looks good.

![image](/img/pages/email/salesforce/salesforce-aasa-form.png)

## Activate integration

### Choose your email service provider

Navigate to the [Universal Email](https://dashboard.branch.io/email){:target="\_blank"} section of the Branch dashboard. Select **Salesforce** and click **Enable**.

{! ingredients/email/link-setup.md !}

### Tell us your click tracking domain

You can retrieve your click tracking domain from your Salesforce settings. If you have not added a custom click tracking domain yet, follow the instructions [here](#setup-a-custom-click-tracking-domain). 

![image](/img/pages/email/salesforce/setup-config.png)

{! ingredients/email/technical-setup.md !}
	
{! ingredients/email/validate-test.md !}

{! ingredients/email/simplified-usage-auto.md !}

## Configure your mobile app

{! ingredients/email/technical-setup-app.md !}

{! ingredients/email/associated-domains.md !}

## Using Universal email

{! ingredients/email/usage.md !}

### Options for generating Branch links for email

There are a few different ways you can create Branch links that are compatible with Universal Email + Salesforce. You will need to replace the web URLs in your templates with these. To create Branch links, you can either:

1. [Add a new Content Area for easy deep linking](#add-a-new-content-area-for-easy-deep-linking)
1. [Making regular Branch links compatible with email](#making-regular-branch-links-compatible-with-email)
1. [Create email links via API without changing your email templates](#create-email-links-via-api-without-changing-your-email-templates)
1. [Convert all web links in your email to deep links](#convert-all-web-links-in-your-email-to-deep-links)

#### Add a new Content Area for easy deep linking

In this step, we'll add a new Content Area in Salesforce that makes it very easy to create deep links in your emails.

1. Work with your Branch account manager to modify the following code snippet, replacing `DOMAIN-HERE` with your Branch base domain:

    ```
    %%[ VAR @deeplink, @branch_base_url SET @branch_base_url = "https://DOMAIN-HERE/3p?%243p=e_et" SET @deeplink = CONCAT(@branch_base_url, CONCAT("&%24original_url=", URLEncode(@link_to_be_wrapped, 1, 1))) ]%%
    ```

1. After logging into Salesforce Marketing Cloud, click on **Email Studio** and then a sub-menu will appear. Click on **Email** in the dropdown menu:

    ![image](/img/pages/email/salesforce/salesforce-dropdown.png)

1. This will take you to the landing page for the Email section. Click on **Content** in the menu bar to navigate to the Content section:

    ![image](/img/pages/email/salesforce/salesforce-menu-bar.png)

1. In the Content section, you will see a list of folders on the left side. Right click on the **My Contents** folder and choose **New Folder** in the context menu:

    ![image](/img/pages/email/salesforce/salesforce-folders.png)

1. Name the folder `Branch`:

    ![image](/img/pages/email/salesforce/salesforce-name-folder.png)

1. Once the folder is created, click on the **Branch** folder. On the right side, you will see a menu bar for the Branch folder. Click on **Create** and in the sub menu, click **Content** to create new content:

    ![image](/img/pages/email/salesforce/salesforce-new-content.png)

1. In the Create Content window that appears, enter `deeplink` in the text field named Content Name. Click on **Next** after you enter the text:

    ![image](/img/pages/email/salesforce/salesforce-deeplink.png)

1. The next screen will ask you to select the format of the content. Choose **Free Form** and then click **Next**:

    ![image](/img/pages/email/salesforce/salesforce-format.png)

1. In the next screen, paste in the snippet you generated in **1**:

    ![image](/img/pages/email/salesforce/salesforce-snippet.png)

1. Click **Save**. You will now be back at your list of folders in the Content section with the file **deeplink** listed:

    ![image](/img/pages/email/salesforce/salesforce-saved.png)

You have now successfully created the deep linking script.  

!!! example "Code snippet"
    The snippet will follow this format:
    ```
    %%[ VAR @deeplink, @branch_base_url SET @branch_base_url = "BASE URL FROM BRANCH" SET @deeplink = CONCAT(@branch_base_url, CONCAT("&%24original_url=", URLEncode(@link_to_be_wrapped, 1, 1))) ]%%
    ```
    The code above has a placeholder for `@branch_base_url`. Replace it with yours.

##### Configure your Salesforce email templates

This section covers how to convert individual links in your existing email templates to use Branch deep links.  You will need to determine which links in your email template that you want to convert to Branch deep links.  

To convert a link to a Branch deep link, let's use an example:
```
<a style="border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #fff;background-color: #00afd1;font-family: sans-serif;" href="https://www.blueapron.com/recipes/five-spice-chicken-vermicelli-with-mushrooms-collard-greens-baby-fennel">I want it!</a>
```

This is what the link will look like **after** you have modified it to support Branch deep links:
```
%%[ SET @link_to_be_wrapped = "https://www.blueapron.com/recipes/five-spice-chicken-vermicelli-with-mushrooms-collard-greens-baby-fennel" ContentAreaByName("My Contents\deeplink") ]%%
<a style="border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #fff;background-color: #00afd1;font-family: sans-serif;"  href="%%=RedirectTo(@deeplink)=%%">I want this!</a>
```

We recommend you create the deep link in a separate document and then paste it back into the HTML editor in Salesforce marketing cloud. To begin:

1. Log in to Salesforce Marketing Cloud
2. Click on **Email Studio** and then a sub-menu will appear. Click on **Email** in the dropdown menu:

    ![image](/img/pages/email/salesforce/salesforce-dropdown.png)

1. This will take you to the landing page for the Email section. Click on **Content** in the menu bar to navigate to the Content section:

    ![image](/img/pages/email/salesforce/salesforce-menu-bar.png)

1. Navigate to your folder containing your emails and open an existing email. Make sure the email is in HTML layout as shown below:

    ![image](/img/pages/email/salesforce/salesforce-email-html.png)

1. Choose a link that you want to convert to a Branch deep link. Copy the text right after the `href=` in your email template, and paste it into a separate document. In the example, it is:

    **`"https://www.blueapron.com/recipes/five-spice-chicken-vermicelli-with-mushrooms-collard-greens-baby-fennel"`**

1. Add `%%[ SET @link_to_be_wrapped = ` before the link in your separate document. In the example, this is now:

    **`%%[ SET @link_to_be_wrapped = `**`"https://www.blueapron.com/recipes/five-spice-chicken-vermicelli-with-mushrooms-collard-greens-baby-fennel"`

1. Add `ContentAreaByName("My Contents\deeplink")]%%` after the link:

    `%%[ SET @link_to_be_wrapped = "https://www.blueapron.com/recipes/five-spice-chicken-vermicelli-with-mushrooms-collard-greens-baby-fennel"`**`ContentAreaByName("My Contents\deeplink")]%%`**

1. From the original link in your template, copy the text from and including `<a` until the `href=`.  Add it to the text after `%%` in the last step. Please include the `<a` but not the `href=`:

    `%%[ SET @link_to_be_wrapped = "https://www.blueapron.com/recipes/five-spice-chicken-vermicelli-with-mushrooms-collard-greens-baby-fennel" ContentAreaByName("My Contents\deeplink") ]%%`**`<a style="border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #fff;background-color: #00afd1;font-family: sans-serif;"`**

1. Add `href="%%=RedirectTo(@deeplink)=%%"` to the end:

    `%%[ SET @link_to_be_wrapped = "https://www.blueapron.com/recipes/five-spice-chicken-vermicelli-with-mushrooms-collard-greens-baby-fennel" ContentAreaByName("My Contents\deeplink") ]%% <a style="border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #fff;background-color: #00afd1;font-family: sans-serif;"`**`href="%%=RedirectTo(@deeplink)=%%"`**

1. From the original link in your template, copy the end of the tag, the link text, and the closing tag (`>I want it!</a>` in the example) and add it to the end:

    `%%[ SET @link_to_be_wrapped = "https://www.blueapron.com/recipes/five-spice-chicken-vermicelli-with-mushrooms-collard-greens-baby-fennel" ContentAreaByName("My Contents\deeplink") ]%% <a style="border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #fff;background-color: #00afd1;font-family: sans-serif;" href="%%=RedirectTo(@deeplink)=%%"`**`>I want it!</a>`**

1. Copy your final result from the separate document back into your email template, replacing everything inside and including the `<a></a>` tags in the template.

1. Repeat this for all your links in your email template that you want to convert to Branch deep links.

These links are complete and will deep link to content in your app.  

This converted code is referred to as the "Branch script" - this script will convert your web URLs to deep links. The script uses the [Content Area](#add-a-new-content-area-for-easy-deep-linking) to turn your web URL into a deep link.

!!! example "Adding the Branch script"
    Wherever you are using `<a>` tags in your email templates, replace those with a short snippet for web URLs that you would like to deep link.
    ```
    %%[SET @link_to_be_wrapped = "ADD YOUR LINK HERE" ContentAreaByName("My Contents\deeplink")]%%
    <a href="%%=RedirectTo(@deeplink)=%%">Click Me</a>
    ```
    For example, **before:**
    `<a href="https://branch.io/product/1234">Example link</a>`
    **After:**
    `%%[ SET @link_to_be_wrapped = "https://branch.io/product/1234" ContentAreaByName("My Contents\deeplink") ]%%`
    `<a href="%%=RedirectTo(@deeplink)=%%">Example link</a>`

!!! caution "Content Area folder"
    Make sure your `deeplink` Content Area [is in the right folder](#add-a-new-content-area-for-easy-deep-linking). Either change the folder to "My Contents" or change the path used by "ContentAreaByName" in the Branch script.

{! ingredients/email/email-link-options.md !}

### Flag your web-only links

If you want any web-only links to not open the app on iOS, Salesforce has a special attribute that you can apply to these links.

Add ```mc-deep-link="false"``` to your link tag like this:

```html
<a mc-deep-link="false" href="https://my.app.link/3p?$3p=e_et&$original_url=..." >This link will not open the app.</a>
```

To ensure that the app does not open on other platforms, add `%24web_only%3Dtrue` to your links as a query parameter, for example:

```html
<a href="https://vza3.app.link/3p?%243p=e_xx&%24original_url=http%3A%2F%2Fexample.com%2F%3Ffoo%3Dbar%24web_only%3Dtrue" >Link to your app!</a>
```

## Support

{! ingredients/email/support.md !}
