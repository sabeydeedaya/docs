## Overview

![Mailjet](/_assets/img/pages/email/mailjet/mailjet.png)

This guide will walk you through how to setup your email campaigns with **[Mailjet](https://www.mailjet.com/){:target="\_blank"}** using Branch Universal Email to automatically convert your email links into **multi-platform deep links**

{! ingredients/email/overview-steps.md !}

## Setup

{! ingredients/email/prerequisites.md !}

## Configure your ESP

### Setup a custom click tracking domain

1. Add and verify a custom click tracking domain in the **[Sender domains & addresses](https://app.mailjet.com/account/sender){:target="\_blank"}** section of your Mailjet account:

    ![image](/_assets/img/pages/email/mailjet/create-domain.png)

!!! tip "Adding a custom click-tracking domain"
    If you need help with setting up a custom click-tracking domain - please ask your account manager or request support at Mailjet.

{! ingredients/email/cname.md !}

## Activate integration

### Choose your email service provider

Navigate to the [Universal Email](https://dashboard.branch.io/email){:target="\_blank"} section of the Branch dashboard. Select **Mailjet** and click **Enable**.

{! ingredients/email/link-setup.md !}

### Tell us your click tracking domain

You can retrieve your click tracking domain from the **[Sender domains & addresses](https://app.mailjet.com/account/sender){:target="\_blank"}** section of your Mailjet account. If you have not added a custom click tracking domain yet, follow the instructions [here](#setup-a-custom-click-tracking-domain).

![image](/_assets/img/pages/email/mailjet/setup-config.png)

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
