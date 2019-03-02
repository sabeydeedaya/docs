---
---

{! ingredients/email/email-configure-esp.md !}

You can retrieve your click tracking domain from the **[Your domains](https://my.rapidmail.com/userhost/new.html){:target="\_blank"}** section of your Rapidmail account. If you have not added a custom click tracking domain yet, follow the instructions [here](#create-a-custom-click-tracking-domain). 

On **Done** click, an AASA file - required for Universal Links - specific to that domain will be generated.

{! ingredients/email/email-technical-setup.md !}

#### Create a custom click tracking domain

1. Add and verify a custom click tracking domain in the **[Your domains](https://my.rapidmail.com/userhost/new.html){:target="\_blank"}** section of your Rapidmail account:

    ![image](/img/pages/email/rapidmail-create-domain.png)

1. Create a new CNAME record in your DNS zone file and set the host of your domain to the value `tools-cname.emailsys.net`

{! ingredients/email/email-cname.md !}

{! ingredients/email/email-associated-domains.md !}

{! ingredients/email/email-bounce-web.md !}

{! ingredients/email/email-validate-test.md !}

{! ingredients/email/email-usage.md !}

{! ingredients/email/email-usage-auto-bounce.md !}

{! ingredients/email/email-usage-auto.md !}

{! ingredients/email/email-support.md !}
