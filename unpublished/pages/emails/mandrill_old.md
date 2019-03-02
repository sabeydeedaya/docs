---
---

{! ingredients/email/email-configure-esp.md !}

You can retrieve your click tracking domain from the **[Tracking & Return Path Domains](https://mandrillapp.com/settings/tracking-domains){:target="\_blank"}** section of your Mandrill account. If you have not added a custom click tracking domain yet, follow the instructions [here](#create-a-custom-click-tracking-domain).

On **Done** click, an AASA file - required for Universal Links - specific to that domain will be generated.

{! ingredients/email/email-technical-setup.md !}

#### Create a custom click tracking domain

1. Add and verify a custom click tracking domain in the **[Tracking & Return Path Domains](https://mandrillapp.com/settings/tracking-domains){:target="\_blank"}** section of your Mandrill account:

    ![image](/img/pages/email/mandrill-create-domain.png)

1. To enable tracking on a subdomain, you must set up a CNAME record in DNS pointing your subdomain to `mandrillapp.com`.

For more information on how to set up a tracking domain please visit Mandrill's [documentation](https://mandrill.zendesk.com/hc/en-us/articles/205582917-Can-I-customize-the-domain-used-for-open-and-click-tracking-){:target="\_blank"}.

{! ingredients/email/email-cname.md !}

{! ingredients/email/email-associated-domains.md !}

{! ingredients/email/email-bounce-web.md !}

{! ingredients/email/email-validate-test.md !}

{! ingredients/email/email-usage.md !}

{! ingredients/email/email-usage-auto-bounce.md !}

{! ingredients/email/email-usage-auto.md !}

{! ingredients/email/email-support.md !}
