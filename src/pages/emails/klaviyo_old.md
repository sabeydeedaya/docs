---
---

{! ingredients/email/email-configure-esp.md !}

Setting up a dedicated click tracking domain requires adding additional CNAME records to your DNS settings with your [hosting provider](https://help.klaviyo.com/hc/en-us/articles/360001550572-Setting-Up-Dedicated-Click-Tracking)

After you've updated your DNS records, you still need to reach out to Klaviyo support in order for us to validate and activate your records. Please contact us if you are updating your records.

{! ingredients/email/email-technical-setup.md !}

{! ingredients/email/email-cname.md !}

{! ingredients/email/email-associated-domains.md !}

{! ingredients/email/email-validate-test.md !}

{! ingredients/email/email-usage.md !}

### Flag your deep links

For the email links that you would like to deep link to content, add `universal="true"` to the URL in the HTML. For example:

```html
<a href="links.example.com" universal="true">Link to your app!</a>
```

This will ensure that your links are converted to Branch links that will open the app on iOS and Android, with full tracking and attribution.

If there is no `universal` tag, links will remain web-only and will drive users to the web page. This allows links without in-app content, such as unsubscribe links or password reset links, to not open the app. 

{! ingredients/email/email-support.md !}

