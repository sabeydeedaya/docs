---
---

{! ingredients/email/email-configure-esp.md !}

You can retrieve your click tracking domain from the **Mail Domains page, in the Tracking Domains** section of your Iterable account. If you have not added a custom click tracking domain yet, follow the instructions [here](#create-a-custom-click-tracking-domain). 

On **Done** click, an AASA file - required for Universal Links - specific to that domain will be generated.

{! ingredients/email/email-technical-setup.md !}

#### Create a custom click tracking domain

1. Add and verify a custom click tracking domain on the Mail Domains page, in the Tracking Domains section of your Iterable account:

    ![image](/img/pages/email/iterable-create-domain.png)

1. Create a new CNAME record in your DNS zone file and set the host of your domain to the value `links.iterable.com`

For more information on how to set up your domain, please visit Iterables's [documentation](https://support.iterable.com/hc/en-us/articles/115002651226-Setting-Up-Mail-Domains#trackingdomains){:target="\_blank"}.

{! ingredients/email/email-cname.md !}

{! ingredients/email/email-associated-domains.md !}

{! ingredients/email/email-bounce-web.md !}

{! ingredients/email/email-validate-test.md !}

{! ingredients/email/email-usage.md !}

{! ingredients/email/email-usage-auto-bounce.md !}

{! ingredients/email/email-usage-auto.md !}

{! ingredients/email/email-support.md !}
