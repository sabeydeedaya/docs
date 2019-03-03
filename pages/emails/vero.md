## Overview

![Vero](/_assets/img/pages/email/vero/vero.png)

This guide will walk you through how to setup your email campaigns with **[Vero](https://www.getvero.com/){:target="\_blank"}** using Branch Universal Email to automatically convert your email links into **multi-platform deep links**

{! ingredients/email/overview-steps.md !}

## Setup

{! ingredients/email/prerequisites.md !}

## Configure your ESP

### Setup a custom click tracking domain

1. Add and verify a custom click tracking domain in the **Email Delivery** section of your Vero account:

#### If you use Vero as your sending provider

You will need to request a custom click tracking domain from Vero.

1. Branch recommends that you setup a new click tracking domain in order to not affect any existing email campaigns which may have been sent prior to integration.
1. You should create new click tracking domain at your domain registrar dashboard.
1. Email Vero (support@getvero.com) and request a second / new click tracking domain at your domain. Vero will set this up and email back the DKIM and SPF DNS details for configuring this domain.
1. Verify the click tracking domain using the configuration provided by Vero

#### If you plug Vero into your own Mailgun or Sendgrid account

You will still need to request a custom click tracking domain from Vero, but with slightly different setup steps.

1. Branch recommends that you create a new click tracking domain in order to not affect any existing email campaigns which may have been sent prior to integration.
1. You should create new click tracking domain at your domain registrar dashboard.
1. Email Vero (support@getvero.com) with your new click tracking domain and ask them to set up the separate click tracking domain
	1. [Mailgun](/emails/mailgun/#configure-your-esp){:target="\_blank"}
	1. [Sendgrid](/emails/sendgrid/#configure-your-esp){:target="\_blank"}
1. Log into Vero and go to Settings > Email Providers. Add a new Mailgun "account" and input the domain name you have just verified. Vero will now allow you to set this as the default, or use this on a per-campaign basis.

For more information on how to set up your domain, please visit Vero's [documentation](https://help.getvero.com/articles/how-to-setup-my-domain-signing-and-remove-via-getveromail-com-from-your-emails.html){:target="\_blank"}.

!!! tip "Adding a custom click-tracking domain"
    If you need help with setting up a custom click-tracking domain - please ask your account manager or request support at Vero.

{! ingredients/email/cname.md !}

## Activate integration

### Choose your email service provider

Navigate to the [Universal Email](https://dashboard.branch.io/email){:target="\_blank"} section of the Branch dashboard. Select **Vero** and click **Enable**.

{! ingredients/email/link-setup.md !}

### Tell us your click tracking domain

You can retrieve your click tracking domain from the **Email Delivery** section of your Vero account. If you have not added a custom click tracking domain yet, follow the instructions [here](#setup-a-custom-click-tracking-domain).

![image](/_assets/img/pages/email/vero/setup-config.png)

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
