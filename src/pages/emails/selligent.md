---
---

### Prerequisites
* Customers need to be on Message Studio v10.0 to be upgraded to the service pack containing the integration. Any customers that are currently on previously release lines will first need to upgrade to the base version.
* Customers that wish to go ahead with the integration will need to reach out to their Selligent Relationship Managers to proceed.

{! ingredients/email/email-configure-esp.md !}

Please reach out to Selligent support to request a new custom tracking domain for your account. Once you have a custom tracking domain, enter it on the Configure ESP step of email onboarding. When you click **Done**, an AASA file - required for Universal Links - specific to that domain will be generated.

{! ingredients/email/email-technical-setup.md !}

Also be sure to send a request to Selligent support to update the redirection logic - you'll want to send redirection URL as an HTTP location header instead of JavaScript redirection.

{! ingredients/email/email-cname.md !}

{! ingredients/email/email-associated-domains.md !}

{! ingredients/email/email-bounce-web.md !}

{! ingredients/email/email-validate-test.md !}

{! ingredients/email/email-usage.md !}

{! ingredients/email/email-usage-auto-bounce.md !}

{! ingredients/email/email-usage-auto.md !}

{! ingredients/email/email-support.md !}
