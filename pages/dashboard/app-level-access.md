- ### Configure user
    - Go to [Account settings](https://dashboard.branch.io/account-settings/user) on the Branch Dashboard
    - Handle your Branch user account with email, password, and user id
    - Connect your Github account to your Branch dashboard for easier sign in

- ### Configure billing
    - Go to [Account settings](https://dashboard.branch.io/account-settings/billing) on the Branch Dashboard
    - Set your billing information for Branch premium features

- ### Configure team
    - Go to [Account settings](https://dashboard.branch.io/account-settings/team) on the Branch Dashboard
    - Add and update team members to your Branch dashboard
        - Set users' [dashboard permissions](/dashboard/access-level)

- ### Change advanced settings
    - Go to [Link Settings](https://dashboard.branch.io/link-settings) on the Branch Dashboard
    - Set `Match type` to either `unique` or `normal` (default)
        - Recommended `Normal`. Selecting `Unique` means that Branch will only make a deep link through install match if there is a single, unique outstanding footprint. For example, if you and your twin both have iPhone 5s with the same OS/version, etc and click different links for the same app, then open the app up at the same time, we won’t deep link when Unique is selected. You probably don’t want this as it’s mostly for very special circumstances.
    - Set `Duration` to seconds
        - Duration is how long a `click` will live in our system before it is consumed by either an app `open` or system delete. Modifying this value will change how long we wait to fingerprint a user. If a user is fingerprinted within the set duration, then deep link data will flow into the app. The default the expiration is 2 hours (7200 seconds).
    - Set `UTM tags`
        - Recommend `disabled`. If you enable this, Branch will automatically set channel, feature, campaign, tags and $keywords based on UTM params. This only applies to dynamically created links, not links generated through the Dashboard, API or SDKs.

            | UTM parameter | Branch parameter
            | --- | --- |
            | utm_source | Channel
            | utm_medium | Feature
            | utm_campaign | Campaign
            | utm_content | Tags
            | utm_term | Keywords (not visible on Dashboard)
