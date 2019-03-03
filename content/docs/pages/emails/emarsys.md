## Overview

![Emarsys](https://cdn.branch.io/branch-assets/email-providers/386574786681131050/emarsys-1537315326046.png)

This guide will walk you through how to setup your email campaigns with **[Emarsys](https://www.emarsys.com/){:target="\_blank"}** using Branch Universal Email to automatically convert your email links into **multi-platform deep links**

{! ingredients/email/overview-steps.md !}

## Setup

{! ingredients/email/prerequisites.md !}

## Configure your ESP

### Setup a custom click tracking domain

Request a new custom click tracking domain from your Account team:

!!! tip "Adding a custom click-tracking domain"
    If you need help with setting up a custom click-tracking domain - please ask your account manager or request support at Emarsys.

{! ingredients/email/cname.md !}

## Activate integration

### Choose your email service provider

Navigate to the [Universal Email](https://dashboard.branch.io/email){:target="\_blank"} section of the Branch dashboard. Select **Emarsys** and click **Enable**.

{! ingredients/email/link-setup.md !}

### Tell us your click tracking domain

If you have not added a custom click tracking domain yet, follow the instructions [here](#setup-a-custom-click-tracking-domain).

![image](/_assets/img/pages/email/emarsys/setup-config.png)

!!! caution "Update Redirection logic"
    Don't forget to send a request to Emarsys support to update the redirection logic - you have to use a Server-Side redirect.

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
