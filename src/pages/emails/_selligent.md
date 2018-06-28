## Overview

![Selligent](/img/pages/email/selligent/selligent.png)

This guide will walk you through how to setup your email campaings with **[Selligent](https://www.selligent.com/){:target="\_blank"}** using Branch Universal Email to automatically convert your email links into **multi-platform deep links**

{! ingredients/email/overview-steps.md !}

## Setup

{! ingredients/email/prerequisites.md !}

## Configure your ESP

### Setup a custom click tracking domain

Please reach out to Selligent support to request a new custom tracking domain for your account

!!! tip "Adding a custom click-tracking domain"
    If you need help with setting up a custom click-tracking domain - please ask your account manager or request support at Selligent.

{! ingredients/email/cname.md !}

## Activate integration

### Choose your email service provider

Navigate to the [Deep Linked Email](https://dashboard.branch.io/email){:target="\_blank"} section of the Branch dashboard. Select **Selligent** and click **Enable**.

{! ingredients/email/link-setup.md !}

### Tell us your click tracking domain

You can retrieve your click tracking domain from the account settings section of your Selligent account. If you have not added a custom click tracking domain yet, follow the instructions [here](#setup-a-custom-click-tracking-domain). 

![image](/img/pages/email/selligent/setup-config.png)

!!! tip "Update Redirection logic"
    Don't forget to send a request to Selligent support to update the redirection logic - you'll want to send redirection URL as an HTTP location header instead of JavaScript redirection.

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
