## Overview

![SendGrid](/img/pages/email/sendgrid/sendgrid.png)

This guide will walk you through how to setup your email campaigns with **[SendGrid](https://sendgrid.com/){:target="\_blank"}** using Branch Universal Email to automatically convert your email links into **multi-platform deep links**

{! ingredients/email/overview-steps.md !}

## Setup

{! ingredients/email/prerequisites.md !}

## Configure your ESP

### Setup a custom click tracking domain

1. Add and verify a custom click tracking domain in the **[Tracking Domains](https://app.sendgrid.com/settings/sender_auth/links){:target="\_blank"}** section of your SendGrid account:

    ![image](/img/pages/email/sendgrid/create-domain.png)

For more information on how to set up your domain, please visit SendGrid's [documentation](https://sendgrid.com/docs/User_Guide/Settings/Sender_authentication/How_to_set_up_link_branding.html){:target="\_blank"}.

!!! tip "Adding a custom click-tracking domain"
    If you need help with setting up a custom click-tracking domain - please ask your account manager or request support at SendGrid.

{! ingredients/email/cname.md !}

## Activate integration

### Choose your email service provider

Navigate to the [Deep Linked Email](https://dashboard.branch.io/email){:target="\_blank"} section of the Branch dashboard. Select **SendGrid** and click **Enable**.

{! ingredients/email/link-setup.md !}

### Tell us your click tracking domain

You can retrieve your click tracking domain from the **[Tracking Domains](https://app.sendgrid.com/settings/sender_auth/links){:target="\_blank"}** section of your SendGrid account. If you have not added a custom click tracking domain yet, follow the instructions [here](#setup-a-custom-click-tracking-domain). 

![image](/img/pages/email/sendgrid/setup-config.png)

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
