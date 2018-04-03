---
---

{! ingredients/email/email-overview.md !}

### Prerequisites

- This guide requires you to have already integrated the Branch SDK into your app.

Contact your Branch Account Manager or [accounts@branch.io](mailto:accounts@branch.io) at any time for assistance with the setup steps.

### Choose your email service provider

Navigate to the [Deep Linked Email](https://dashboard.branch.io/email){:target="\_blank"} section of the Branch dashboard. Select SendGrid or Mailgun as your email service provider and click **Get Started**. If you do not know which ESP to select, please contact your Vero account manager. Then, follow the [SendGrid](/pages/emails/sendgrid/) or [Mailgun](/pages/emails/mailgun/) setup steps.

![image](/img/pages/email/choose-esp.png)

### Tell us your click tracking domain

#### If you use Vero as your sending provider

You will need to request a custom click tracking domain from Vero.

1. Branch recommends that you setup a new click tracking domain in order to not affect any existing email campaigns which may have been sent prior to integration.
1. You should create new click tracking domain at your domain registrar dashboard.
1. Email Vero (support@getvero.com) and request a second / new click tracking domain at your domain. Vero will set this up and email back the DKIM and SPF DNS details for configuring this domain.
1. Verify the click tracking domain using the configuration provided by Vero

#### If you plug Vero into your own Mailgun account

You will still need to request a custom click tracking domain from Vero, but with slightly different setup steps. 

1. Branch recommends that you create a new click tracking domain in order to not affect any existing email campaigns which may have been sent prior to integration.
1. You should create new click tracking domain at your domain registrar dashboard.
1. Email Vero (support@getvero.com) with your new click tracking domain and ask them to set up the separate click tracking domain
1. [Add and verify](https://help.mailgun.com/hc/en-us/articles/202052074-How-do-I-verify-my-domain-){:target="\_blank"} your new custom click tracking domain in the Mailgun dashboard
1. Log into Vero and go to Settings > Email Providers. Add a new Mailgun "account" and input the domain name you have just verified. Vero will now allow you to set this as the default, or use this on a per-campaign basis.

{! ingredients/email/email-technical-setup.md !}

{! ingredients/email/email-cname.md !}

{! ingredients/email/email-associated-domains.md !}

{! ingredients/email/email-validate-test.md !}

{! ingredients/email/email-support.md !}
