## Overview

![Epsilon](/_assets/img/pages/email/epsilon/epsilon.png)

This guide will walk you through how to setup your email campaigns with **[Epsilon](https://www.epsilon.com/){:target="\_blank"}** using Branch Universal Email to automatically convert your email links into **multi-platform deep links**

{! ingredients/email/overview-steps.md !}

## Setup

{! ingredients/email/prerequisites.md !}

## Configure your ESP

### Setup a custom click tracking domain

You can retrieve your click tracking domain from your Epsilon settings. We recommend creating a new click tracking domain for the Epsilon Harmony integration. You can switch over your production click tracking domain to Epsilon but we recommend testing with a different domain to get started.

For Epsilon, you may also need an IP address. Notify your Epsilon Harmony Account Manager that you plan to use Branch Universal Email, and ask your Harmony Account Manager to provide the IP that you set your click tracking domains to. Add that next to your click tracking domain in this step.

!!! tip "Adding a custom click-tracking domain"
    If you need help with setting up a custom click-tracking domain - please ask your account manager or request support at Epsilon.

{! ingredients/email/epsilon-cname.md !}

## Activate integration

### Choose your email service provider

Navigate to the [Universal Email](https://dashboard.branch.io/email){:target="\_blank"} section of the Branch dashboard. Select **Epsilon** and click **Enable**.

{! ingredients/email/link-setup.md !}

### Tell us your click tracking domain

You can retrieve your click tracking domain from your Epsilon settings. If you have not added a custom click tracking domain yet, follow the instructions [here](#setup-a-custom-click-tracking-domain).

![image](/_assets/img/pages/email/epsilon/setup-config.png)

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
