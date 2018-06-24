## Overview

![Sparkpost](https://branchmetrics.github.io/docs/img/pages/email/sparkpost/sparkpost.png)

This guide will walk you through how to setup your email campaings with **[Sparkpost](https://sparkpost.com)** using Branch Universal Email to automatically convert your email links into **multi-platform deep links**

{! ingredients/email/overview-steps.md !}

## Setup

### Prerequisites

{! ingredients/email/prerequisites.md !}

### Configure your ESP

#### Setup a custom click tracking domain

1. Add and verify a custom click tracking domain in the **[Tracking Domains](https://app.sparkpost.com/account/tracking-domains){:target="\_blank"}** section of your SparkPost account:

    ![image](/img/pages/email/sparkpost-create-domain.png)

For more information on how to set up your domain, please visit Sparkpost's [documentation](https://www.sparkpost.com/docs/tech-resources/enabling-multiple-custom-tracking-domains/){:target="\_blank"}.

!!! tip "Adding a custom click-tracking domain"
    If you need help with setting up a custom click-tracking domain - please ask your account manager or request support at your ESP.

#### Set up your click tracking domain

{! ingredients/email/cname.md !}

### Activate integration

#### Choose your email service provider

Navigate to the [Deep Linked Email](https://dashboard.branch.io/email){:target="\_blank"} section of the Branch dashboard. Select **XXX** and click **Enable**.

#### Set up Deep Linking

{! ingredients/email/link-setup.md !}

#### Tell us your click tracking domain

You can retrieve your click tracking domain from the **[Tracking Domains](https://XXX.com){:target="\_blank"}** section of your XXX account. If you have not added a custom click tracking domain yet, follow the instructions [here](#setup-a-custom-click-tracking-domain). 

![image](/img/pages/email/sparkpost/setup-config.png)

#### Configure your app for your click tracking domain

{! ingredients/email/technical-setup.md !}

Click Next to proceed to Valdate and test the integration
	
#### Validate and Test

{! ingredients/email/validate-test.md !}

Once it's done the AASA file and SSL certificate - required for Universal Links - specific to that domain will be generated.

{! ingredients/email/usage-auto.md !}

### Configure your mobile app

#### Add your click tracking domain to your Associated Domains

{! ingredients/email/associated-domains.md !}

#### Handle links for web-only content

{! ingredients/email/bounce-web.md !}


## Using Universal email

{! ingredients/email/usage.md !}

#### Flag your deep links

{! ingredients/email/usage-auto-bounce-deep.md !}

#### Flag your web-only links

{! ingredients/email/usage-auto-bounce-web.md !}

## Support

{! ingredients/email/support.md !}
