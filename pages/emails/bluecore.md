## Overview

![BlueCore](https://cdn.branch.io/branch-assets/email-providers//bluecore-logo-blue-horizontal-1561137049672.png)

This guide will walk you through how to setup your email campaigns with **[BlueCore](https://www.bluecore.com/)** using Branch Universal Email to automatically convert your email links into **multi-platform deep links**

{! ingredients/email/overview-steps.md !}

## Setup

{! ingredients/email/prerequisites.md !}

## Configure your ESP

### Setup a custom click tracking domain

1. Add a custom click tracking domain in the  section of your BlueCore account.

2. Validate the new click tracking domain in BlueCore's dashboard, and also retrieve the secondary domain from the final step of that validation process (this secondary domain will be needed when you enable the Branch integration).

!!! tip "Adding a custom click-tracking domain"
    This domain must be validated in BlueCore, before you can enable the Branch integration.  For more information on how to validate a new domain in BlueCore, please contact your BlueCore account manager.

{! ingredients/email/cname.md !}

## Activate integration

### Choose your email service provider

Navigate to the [Universal Email](https://dashboard.branch.io/email){:target="\_blank"} section of the Branch dashboard. Select **BlueCore** and click **Enable**.

{! ingredients/email/link-setup.md !}

### Tell us your click tracking domain

Retrieve your click tracking domain from your BlueCore account. If you have not added a custom click tracking domain yet, follow the instructions [here](#setup-a-custom-click-tracking-domain).

{! ingredients/email/technical-setup.md !}

{! ingredients/email/validate-test.md !}

{! ingredients/email/usage-auto.md !}

## Configure your mobile app

{! ingredients/email/technical-setup-app.md !}

{! ingredients/email/associated-domains.md !}

## Using Universal email

{! ingredients/email/usage.md !}

{! ingredients/email/usage-auto-universal.md !}

## Support

{! ingredients/email/support.md !}
