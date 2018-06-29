---
---

{! ingredients/email/email-configure-esp.md !}

You can retrieve your click tracking domain from the **Domains** section of your Amazon SES account. If you have not added a custom click tracking domain yet, follow the instructions [here](#create-a-custom-click-tracking-domain). 

You will also need to add your AWS tracking domain next to your click tracking domain in the **Amazon SES Domain** field in the Configure ESP step. It should be one of the following:

| AWS Region | AWS tracking domain
| --- | ---
| US West (Oregon) | r.us-west-2.awstrack.me
| US East (N. Virginia) | r.us-east-1.awstrack.me
| EU (Ireland) | r.eu-west-1.awstrack.me

On **Done** click, an AASA file - required for Universal Links - specific to that domain will be generated.

{! ingredients/email/email-technical-setup.md !}

#### Create a custom click tracking domain

Add and verify an email domain in the **Domains** section of your Amazon SES account:

   ![image](/img/pages/email/amazon-ses-domain.png)

For more information on how to set up a click tracking domain please visit Amazon SES's [documentation](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/configure-custom-open-click-domains.html){:target="\_blank"}.

{! ingredients/email/email-cname.md !}

{! ingredients/email/email-associated-domains.md !}

{! ingredients/email/email-bounce-web.md !}

{! ingredients/email/email-validate-test.md !}

{! ingredients/email/email-usage.md !}

{! ingredients/email/email-usage-auto-bounce.md !}

{! ingredients/email/email-support.md !}
