#### Add your click tracking domain to your Associated Domains

To enable Universal Links on your click tracking domain, you'll need to add the click tracking domain to your Associated Domains entitlement.

1. In Xcode, go to the `Capabilities` tab of your project file.
1. Scroll down and enable `Associated Domains` if it is not already enabled.

    ![image](/img/pages/email/enable-associated-domains.png)

1. Copy your click tracking domain from the [email you received from Branch](#configure-your-app-for-your-click-tracking-domain), or retrieve it from your ESP's settings.
1. In the `Domains` section, click the `+` icon and add your click tracking domain. For example, if your click tracking domain is `email.example.com`, add an entry for `applinks:email.example.com`.

    ![image](/img/pages/email/add-domain.png)

!!! protip "Having trouble or new to Universal Links?"
    Follow [these instructions](/pages/deep-linking/universal-links/) for more details on enabling Universal Links in the Branch dashboard and in Xcode.
