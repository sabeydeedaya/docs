## Overview

![Amazon-SES](/_assets/img/pages/email/amazon-ses/amazon-ses.png)

This guide will walk you through how to setup your email campaigns with **[Amazon Simple Email Service](https://aws.amazon.com/ses/){:target="\_blank"}** using Branch Universal Email to automatically convert your email links into **multi-platform deep links**

{! ingredients/email/overview-steps.md !}

## Setup

{! ingredients/email/prerequisites.md !}

## Configure your ESP

### Setup a custom click tracking domain

Add and verify an email domain in the **Domains** section of your Amazon SES account:

   ![image](/_assets/img/pages/email/amazon-ses-domain.png)

For more information on how to set up a click tracking domain please visit Amazon SES's [documentation](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/configure-custom-open-click-domains.html){:target="\_blank"}.

!!! tip "Adding a custom click-tracking domain"
    If you need help with setting up a custom click-tracking domain - please ask your account manager or request support at Amazon Simple Email Service.

{! ingredients/email/cname.md !}

## Activate integration

### Choose your email service provider

Navigate to the [Universal Email](https://dashboard.branch.io/email){:target="\_blank"} section of the Branch dashboard. Select **Amazon Simple Email Service** and click **Enable**.

{! ingredients/email/link-setup.md !}

### Tell us your click tracking domain

You will also need to add your AWS tracking domain next to your click tracking domain in the **Amazon SES Domain** field in the Configure ESP step. It should be one of the following:

| AWS Region | AWS tracking domain
| --- | ---
| US West (Oregon) | r.us-west-2.awstrack.me
| US East (N. Virginia) | r.us-east-1.awstrack.me
| EU (Ireland) | r.eu-west-1.awstrack.me

![image](/_assets/img/pages/email/amazon-ses/setup-config.png)

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
