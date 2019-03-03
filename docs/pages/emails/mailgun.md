## Overview

![Mailgun](/_assets/img/pages/email/mailgun/mailgun.png)

This guide will walk you through how to setup your email campaigns with **[Mailgun](https://www.mailgun.com/){:target="\_blank"}** using Branch Universal Email to automatically convert your email links into **multi-platform deep links**

{! ingredients/email/overview-steps.md !}

## Setup

{! ingredients/email/prerequisites.md !}

## Configure your ESP

### Setup a custom click tracking domain

1. Add and verify a custom click tracking domain in the **[Domains](https://app.mailgun.com/app/domains){:target="\_blank"}** section of your Mailgun account:

    ![image](/_assets/img/pages/email/mailgun/create-domain.png)

For more information on how to set up your domain, please visit Mailgun's [documentation](https://help.mailgun.com/hc/en-us/articles/202052074-How-do-I-verify-my-domain-){:target="\_blank"}.

!!! tip "Adding a custom click-tracking domain"
    If you need help with setting up a custom click-tracking domain - please ask your account manager or request support at Mailgun.

{! ingredients/email/cname.md !}

## Activate integration

### Choose your email service provider

Navigate to the [Universal Email](https://dashboard.branch.io/email){:target="\_blank"} section of the Branch dashboard. Select **Mailgun** and click **Enable**.

{! ingredients/email/link-setup.md !}

### Tell us your click tracking domain

You can retrieve your click tracking domain from the **[Domains](https://app.mailgun.com/app/domains){:target="\_blank"}** section of your Mailgun account. If you have not added a custom click tracking domain yet, follow the instructions [here](#setup-a-custom-click-tracking-domain).

![image](/_assets/img/pages/email/mailgun/setup-config.png)

{! ingredients/email/technical-setup.md !}

{! ingredients/email/validate-test.md !}

{! ingredients/email/usage-auto.md !}

## Configure your mobile app

{! ingredients/email/technical-setup-app.md !}

{! ingredients/email/associated-domains.md !}

## Using Universal email

{! ingredients/email/usage.md !}

{! ingredients/email/usage-auto-deeplink.md !}

## Support

{! ingredients/email/support.md !}
