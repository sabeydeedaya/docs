---
---

{! ingredients/email/email-configure-esp.md !}

You can retrieve your click tracking domain from the **[Tracking Domains](https://app.sparkpost.com/account/tracking-domains){:target="\_blank"}** section of your SparkPost account. If you have not added a custom click tracking domain yet, follow the instructions [here](#create-a-custom-click-tracking-domain). 

On **Done** click, an AASA file - required for Universal Links - specific to that domain will be generated.

{! ingredients/email/email-technical-setup.md !}

#### Create a custom click tracking domain

1. Add and verify a custom click tracking domain in the **[Tracking Domains](https://app.sparkpost.com/account/tracking-domains){:target="\_blank"}** section of your SparkPost account:

    ![image](/img/pages/email/sparkpost-create-domain.png)

1. Create a new CNAME record in your DNS zone file and set the host of your domain to the value `spgo.io`

For more information on how to set up your domain, please visit SparkPost's [documentation](https://www.sparkpost.com/docs/tech-resources/enabling-multiple-custom-tracking-domains/){:target="\_blank"}.

{! ingredients/email/email-cname.md !}

{! ingredients/email/email-associated-domains.md !}

{! ingredients/email/email-bounce-web.md !}

{! ingredients/email/email-validate-test.md !}

{! ingredients/email/email-usage.md !}

{! ingredients/email/email-usage-auto-bounce.md !}

{! ingredients/email/email-usage-auto.md !}

{! ingredients/email/email-support.md !}
