- ### Change advanced settings
    - Go to [Link Settings](https://dashboard.branch.io/link-settings) on the Branch Dashboard
    - Set `Match type` to either `unique` or `normal` (default)
        - Recommended `Normal`. Selecting `Unique` means that Branch will only make a deep link through install match if there is a single, unique outstanding footprint. For example, if you and your twin both have iPhone 5s with the same OS/version, etc and click different links for the same app, then open the app up at the same time, we won’t deep link when Unique is selected. You probably don’t want this as it’s mostly for very special circumstances.
    - Set `Duration` to seconds
        - Duration is how long a `click` will live in our system before it is consumed by either an app `open` or system delete. Modifying this value will change how long we wait to fingerprint a user. If a user is fingerprinted within the set duration, then deep link data will flow into the app. The default expiration is 2 hours (7200 seconds).
    - Set `UTM tags`
        - Recommend `disabled`. If you enable this, Branch will automatically set channel, feature, campaign, tags and $keywords based on UTM params. This only applies to dynamically created links, not links generated through the Dashboard, API or SDKs.

            | UTM parameter | Branch parameter
            | --- | --- |
            | utm_source | Channel
            | utm_medium | Feature
            | utm_campaign | Campaign
            | utm_content | Tags
            | utm_term | Keywords (not visible on Dashboard)

- ### Change link domain
    - Go to [Link Settings](https://dashboard.branch.io/link-settings) on the Branch Dashboard

    - ##### Use app.link domain
        - Understand [Domain change warning](#domain-change-warning)
        - Make changes to [Link settings](https://dashboard.branch.io/link-settings) or contact support

    - ##### Use custom subdomain
        - Understand [Domain change warning](#domain-change-warning)
        - Understand [Custom domain warning](#custom-domain-warning)
        - Understand [Custom domain debugging](#custom-domain-debugging)
        - Change your link domain to your custom subdomain on [Link settings](https://dashboard.branch.io/link-settings)
        - Update your `CNAME` record on your custom subdomain
            - `CNAME` = `custom.bnc.lt`
        - Click `Confirm` on [Link settings](https://dashboard.branch.io/link-settings)
        - If you are configuring the domain through AWS's Route 53, make sure you are editing the nameservers under the `Registered Domains` tab, and not the `Hosted zones` section

    - ##### Use custom root domain
        - Understand [Domain change warning](#domain-change-warning)
        - Understand [Custom domain warning](#custom-domain-warning)
        - Understand [Custom domain debugging](#custom-domain-debugging)
        - Change your link domain to your custom root domain on [Link settings](https://dashboard.branch.io/link-settings)
        - Update your `NS` records on your custom root domain
            - These values are unique per app, below is an example
                - `ns-1371.awsdns-43.org`
                - `ns-1695.awsdns-19.co.uk`
                - `ns-991.awsdns-59.net`
                - `ns-428.awsdns-53.com`
        - Click `Confirm` on [Link settings](https://dashboard.branch.io/link-settings)
        - If you are configuring the domain through AWS's Route 53, make sure you are editing the nameservers under the `Registered Domains` tab, and not the `Hosted zones` section

## Troubleshoot issues

- ### Domain change warning
    - Used for [Change link domain](#change-link-domain)
    - From `app.link` to `app.link`
        - Your old `app.link` deep links will fail
        - Your old `app.link` deep links will navigate to a File Not Found website and not open your app.
        - Your new `app.link` deep links will open your app after your [update your code](#dialog-code?ios=configure-associated-domains&android=configure-app&adobe=configure-app&cordova=configure-app&mparticleAndroid=configure-app&mparticleIos=configure-associated-domains&titanium=configure-app&reactNative=configure-app&unity=configure-app&xamarin=configure-app) to append the new link domain
        - If your old `app.link` are active, it is recommend to switch to a `custom link domain instead`
    - From `app.link` to `custom link domain`
        - Your old `app.link` deep links will still work
        - Your new `custom link domain` deep links will open your app after your [update your code](#dialog-code?ios=configure-associated-domains&android=configure-app&adobe=configure-app&cordova=configure-app&mparticleAndroid=configure-app&mparticleIos=configure-associated-domains&titanium=configure-app&reactNative=configure-app&unity=configure-app&xamarin=configure-app) to append the new link domain
    - From `custom link domain` to `custom link domain`
        - Your old `custom link domain` deep links will fail
        - Your new `custom link domain` deep links will open your app after your [update your code](#dialog-code?ios=configure-associated-domains&android=configure-app&adobe=configure-app&cordova=configure-app&mparticleAndroid=configure-app&mparticleIos=configure-associated-domains&titanium=configure-app&reactNative=configure-app&unity=configure-app&xamarin=configure-app) to append the new link domain
    - From legacy `bnc.lt` to `custom link domain`
        - Both your `bnc.lt` and `custom link domain` deep links will work
        - Your new `custom link domain` deep links will open your app after your [update your code](#dialog-code?ios=configure-associated-domains&android=configure-app&adobe=configure-app&cordova=configure-app&mparticleAndroid=configure-app&mparticleIos=configure-associated-domains&titanium=configure-app&reactNative=configure-app&unity=configure-app&xamarin=configure-app) to append the new link domain

- ### Custom domain warning
    - Used for [Change link domain](#change-link-domain)
    - The `NS` or `CNAME` records of your `custom link domain` will need to point to Branch if you want to use your own domain for your deep links
    - Whenever you change your `NS` or `CNAME` records of a domain, you are making Branch the authoritative registrar for your domain. This will grant Branch control of your domain and you will lose all access to that `custom root domain` or `custom subdomain`. The web page will become blank, and the control of the domain will change to Branch
    - Branch will use your domain to route all deep linked traffic. Branch will also host your AASA file and SSL certificates
    - If you have content on your `custom root domain` (e.g. https://example.com/), Branch recommends using an unused `custom subdomain` instead (e.g. https://link.example.com/)

- ### Custom domain debugging
    - Used for [Change link domain](#change-link-domain)
    - You can test your domain record changes with `dig ns <domain>` or `dig cname <domain>`
    - We recommend that you choose one domain or subdomain to use with Branch and stick with it, as switching can cause significant problems with your existing links
    - If you are configuring the domain through AWS's Route 53, make sure you are editing the nameservers under the `Registered Domains` tab, and not the `Hosted zones` section
    - You cannot use your main website domain for hosting Branch links
    - Do not include `www` when adding your custom link domain
    - If you have CAA records set for your domain, add letsencrypt.org to the list
