---
---

{! ingredients/email/email-configure-esp.md !}

You can retrieve your click tracking domains from your Sendgrid settings:

1. Log in to your SendGrid account.
1. Go to Settings > Sender Authentication > [Links](https://app.sendgrid.com/settings/sender_auth/links).
1. Find your email link whitelabeled domain, click on the three-dot icon, and click "View" (or create a new whitelabel).

    ![image](/img/pages/email/sendgrid/configure_sendgrid_1.png)

1. Note the "Host" email click tracking domain (e.g. email.mydomain.com) and the SendGrid domain under "Data".

    ![image](/img/pages/email/sendgrid/configure_sendgrid_2.png)

1. Enter both the click tracking domain and the SendGrid domain in item 1 of this step:

    ![image](/img/pages/email/sendgrid/configure-sendgrid-1.png)
   
On **Done** click, an AASA file - required for Universal Links - specific to that domain will be generated.

{! ingredients/email/email-technical-setup.md !}

#### Validate your click tracking domain in SendGrid

Before you CNAME to Branch, you must CNAME your click tracking domain to sendgrid.net and validate the domain in Whitelabel > Email Links within SendGrid. Once there is a green checkmark indicating that the domain is valid, then you can proceed to the next step.

{! ingredients/email/email-cname.md !}

{! ingredients/email/email-associated-domains.md !}

{! ingredients/email/email-validate-test.md !}

{! ingredients/email/email-usage.md !}

{! ingredients/email/email-usage-auto-universal.md !}

{! ingredients/email/email-usage-auto.md !}

## Troubleshoot issues

- ### Error validating whitelabel: Expect CNAME record
    If you are seeing this [error message](/img/pages/email/sendgrid/sendgrid_error.png), the reason is that SendGrid will only consider the CNAME sendgrid.net valid. To get rid of this error, please:

    1. CNAME your subdomain to sendgrid.net
    1. Validate records on SendGrid dashboard
    1. CNAME your subdomain to thirdparty.bnc.lt
    1. Do not validate records on SendGrid after Step 3


{! ingredients/email/email-support.md !}
