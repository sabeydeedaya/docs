---
---

{! ingredients/email/email-configure-esp.md !}

You can retrieve your click tracking domain from your Epsilon settings. We recommend creating a new click tracking domain for the Epsilon Harmony integration. You can switch over your production click tracking domain to Epsilon but we recommend testing with a different domain to get started.

For Epsilon, you may also need an IP address. Notify your Epsilon Harmony Account Manager that you plan to use Branch Deep Linked Email, and ask your Harmony Account Manager to provide the IP that you set your click tracking domains to. Add that next to your click tracking domain in this step.

On **Done** click, an AASA file - required for Universal Links - specific to that domain will be generated.

{! ingredients/email/email-technical-setup.md !}

#### Set up your click tracking domain

Only do this step after you've [provided your click tracking domain](#tell-us-your-click-tracking-domain) to Branch.

1. Create a CNAME for your subdomain and point it to `epsilon.thirdparty.bnc.lt`
1. Confirm with your Branch Account Manager that the domain is working correctly.

{! ingredients/email/email-associated-domains.md !}

{! ingredients/email/email-bounce-web.md !}

{! ingredients/email/email-validate-test.md !}

{! ingredients/email/email-usage.md !}

{! ingredients/email/email-usage-auto-bounce.md !}

{! ingredients/email/email-usage-auto.md !}

{! ingredients/email/email-support.md !}
