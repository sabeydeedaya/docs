## Overview

![Salesforce v2](https://cdn.branch.io/branch-assets/email-providers//salesforce-1555435761516.png)

This guide will walk you through how to setup your email campaigns with **[Salesforce v2](https://www.salesforce.com/products/marketing-cloud/overview/){:target="\_blank"}** using Branch Universal Email to automatically convert your email links into **multi-platform deep links**

{! ingredients/email/overview-steps.md !}

## Setup

!!! caution "Sender Authentication"
    You must have the **Sender Authentication Package** activated and host your DNS Settings instead of delegating the domain to Salesforce.
    If you've already delegated your domain to Salesforce, please ask your account manager to change domain settings and send your DNS settings.

{! ingredients/email/prerequisites.md !}

## Configure your ESP

### Setup a Sender Authentication Package

1. Configure the Sender Authentication Package for your Salesforce Marketing Cloud account using instructions form your Salesforce account manger.

    ![image](/_assets/img/pages/email/salesforce_dns/create-domain.png)

For more information on how to set up your domain, please visit Salesforce Marketing Cloud's [documentation](https://help.salesforce.com/articleView?id=mc_es_subdomain_delegation_guide.htm&type=5){:target="\_blank"}.

!!! tip "Updating DNS settings"
    As soon as you've configured and verified the Sender Authentication Package with the Salesforce team, please find the **click** record in your DNS settings so we can update your DNS settings.

{! ingredients/email/cname.md !}

## Activate integration

### Choose your email service provider

Navigate to the [Universal Email](https://dashboard.branch.io/email){:target="\_blank"} section of the Branch dashboard. Select **Salesforce Marketing Cloud** and click **Enable**.

{! ingredients/email/link-setup.md !}

### Tell us your click tracking domain

You can retrieve your click tracking domain from the **[Authenticated Domains]** section of your settings at Salesforce Marketing Cloud account. If you have not added a custom click tracking domain yet, follow the instructions [here](#setup-a-custom-click-tracking-domain).

![image](/_assets/img/pages/email/salesforce_dns/setup-config.png)

{! ingredients/email/technical-setup.md !}

{! ingredients/email/validate-test.md !}

{! ingredients/email/usage-auto.md !}

## Configure your mobile app

{! ingredients/email/technical-setup-app.md !}

{! ingredients/email/associated-domains.md !}

## Using Universal email

{! ingredients/email/usage.md !}

{! ingredients/email/usage-auto-bounce-deep.md !}

### Flag your web-only links

With your email service provider, you need to explicitly mark web links. Just add mc-deep-link="false" to your HTML code for every web link, for example:

`<a href="links.example.com" mc-deep-link="false" >Link to your app!</a>`

## Support

{! ingredients/email/support.md !}
