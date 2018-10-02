## Overview

![Salesforce Marketing Cloud](https://cdn.branch.io/branch-assets/email-providers/386574786681131050/salesforce-marketing-cloud-1538249523926.png)

This guide will walk you through how to setup your email campaigns with **[Salesforce Marketing Cloud](https://www.salesforce.com/products/marketing-cloud/overview/){:target="\_blank"}** using Branch Universal Email to automatically convert your email links into **multi-platform deep links**

{! ingredients/email/overview-steps.md !}

## Setup

!!! caution "Sender Authentication"
    You must have **Sender Authentication Package** activated and host your DNS Settings instead of delegatng domain to Salesforce.
    If you plearedy delegated your domain to Salesforce Marketing Cloud - please ask your account manager to changes domain settings and send you DNS settings.

{! ingredients/email/prerequisites.md !}

## Configure your ESP

### Setup a Sender Authentication Package

1. Configure the Sender Authentication Package for your Salesforce Marketing Cloud account using instructions form your Salesforce account manger. 

    ![image](/img/pages/email/salesforce_dns/create-domain.png)

For more information on how to set up your domain, please visit Salesforce Marketing Cloud's [documentation](https://help.salesforce.com/articleView?id=mc_es_subdomain_delegation_guide.htm&type=5){:target="\_blank"}.

!!! tip "Updating DNS settings"
    As soon as you configured and verified Sender Authentication Package with Salesforce team, please find **click** record in you DNS settings we will update DNS settings for this domain at the next step.

{! ingredients/email/cname.md !}

## Activate integration

### Choose your email service provider

Navigate to the [Deep Linked Email](https://dashboard.branch.io/email){:target="\_blank"} section of the Branch dashboard. Select **Salesforce Marketing Cloud** and click **Enable**.

{! ingredients/email/link-setup.md !}

### Tell us your click tracking domain

You can retrieve your click tracking domain from the **[Authenticated Domains]** section of your settings at Salesforce Marketing Cloud account. If you have not added a custom click tracking domain yet, follow the instructions [here](#setup-a-custom-click-tracking-domain). 

![image](/img/pages/email/salesforce_dns/setup-config.png)

{! ingredients/email/technical-setup.md !}
	
{! ingredients/email/validate-test.md !}

{! ingredients/email/usage-auto.md !}

## Configure your mobile app

{! ingredients/email/technical-setup-app.md !}

{! ingredients/email/associated-domains.md !}

{! ingredients/email/bounce-web.md !}

## Using Universal email

{! ingredients/email/usage.md !}

{! ingredients/email/usage-auto-bounce-deep.md !}

{! ingredients/email/usage-auto-bounce-web.md !}

## Support

{! ingredients/email/support.md !}
