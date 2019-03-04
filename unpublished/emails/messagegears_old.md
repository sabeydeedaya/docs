---
---

{! ingredients/email/email-configure-esp.md !}

First create a new custom tracking domain. In order to add and verify a custom click tracking domain:
1. Navigate to Account
2. Click to open a specific account
3. Edit Account Settings
4. Enter the subdomain you've selected in the Tracking Domain box and Save the change

Next, create a new CNAME record in your DNS zone file and set the host to your tracking sub-domain with the value: "www.messagegears.net"
For more information on how to setup tracking domain please visit MessageGears' [documentation](https://support.messagegears.com/hc/en-us/articles/236281188-Whitelabeling-and-Dedicated-IPs#customtrackingdomain).

Once you have a custom tracking domain, enter it on the Configure ESP step of email onboarding in the Branch dashboard. When you click Done, an AASA file - required for Universal Links - specific to that domain will be generated.

{! ingredients/email/email-technical-setup.md !}

{! ingredients/email/email-cname.md !}

{! ingredients/email/email-associated-domains.md !}

{! ingredients/email/email-validate-test.md !}

{! ingredients/email/email-usage.md !}

{! ingredients/email/email-usage-auto-bounce.md !}

{! ingredients/email/email-usage-auto.md !}

{! ingredients/email/email-support.md !}
