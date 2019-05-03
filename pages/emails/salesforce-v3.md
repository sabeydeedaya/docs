## Overview

![Salesforce v3](https://cdn.branch.io/branch-assets/email-providers//salesforce-1555435810148.png)

This guide will walk you through how to setup your email campaigns with **[Salesforce v3](https://www.salesforce.com/products/marketing-cloud/overview/){:target="\_blank"}** using Branch Universal Email to automatically convert your email links into **multi-platform deep links**

{! ingredients/email/overview-steps.md !}

## Setup

!!! caution "Sender Authentication"
    You must have the **Sender Authentication Package** activated and host your DNS Settings instead of delegating the domain to Salesforce.
    If you've already delegated your domain to Salesforce, please ask your account manager to change domain settings and send your DNS settings.

{! ingredients/email/prerequisites.md !}

## Configure your ESP

### Setup a Sender Authentication Package

1. Configure the Sender Authentication Package for your Salesforce Marketing Cloud account using instructions from your Salesforce account manager.

    ![image](/_assets/img/pages/email/salesforce_dns/create-domain.png)

For more information on how to set up your domain, please visit Salesforce Marketing Cloud's [documentation](https://help.salesforce.com/articleView?id=mc_es_subdomain_delegation_guide.htm&type=5){:target="\_blank"}.

!!! tip "Updating DNS settings"
    As soon as you've configured and verified the Sender Authentication Package with the Salesforce team, please find the **click** record in your DNS settings so we can update your DNS settings.

2. Next, confirm your Salesforce Data Domain from your Salesforce account manager.  You will need this later when you enable the integration in Branch.

{! ingredients/email/cname.md !}

## Activate integration

### Choose your email service provider

Navigate to the [Universal Email](https://dashboard.branch.io/email){:target="\_blank"} section of the Branch dashboard. Select **Salesforce Marketing Cloud** and click **Enable**.

{! ingredients/email/link-setup.md !}

### Tell us your click tracking domain

You can retrieve your click tracking domain from the **[Authenticated Domains]** section of your settings at Salesforce Marketing Cloud account. If you have not added a custom click tracking domain yet, follow the instructions [here](#setup-a-custom-click-tracking-domain).

You will also need to register your Salesforce Data Domain (retrieved from your Salesforce account manager), which is the domain Salesforce uses to collect click data.

![image](/_assets/img/pages/email/salesforce_dns/setup-config.png)

{! ingredients/email/technical-setup.md !}

{! ingredients/email/validate-test.md !}

{! ingredients/email/usage-auto.md !}

## Configure your mobile app

{! ingredients/email/technical-setup-app.md !}

{! ingredients/email/associated-domains.md !}

## Using Universal email

{! ingredients/email/usage.md !}

### Flag your deep links

For the email links that you would like to deep link to content, add mc-deep-link="false" to HTML and $deep_link=true to the URL as a query parameter, for example:

```html
<a mc-deep-link="false" href="links.example.com?$deep_link=true" >Link to your app!</a>
```

This will ensure that your links are converted to Branch links that will open the app on iOS and Android, with full tracking and attribution.



## Support

{! ingredients/email/support.md !}
