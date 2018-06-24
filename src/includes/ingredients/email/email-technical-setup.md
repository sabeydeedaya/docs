#### Configure your app for your click tracking domain

![image](/img/pages/email/send-email.png)

In this prompt, enter the email of someone on your team who is qualified to modify your iOS app, and then click **Send**. They will complete the [technical setup](#technical-setup) steps below.

### Technical setup

The following app changes ensure that your email integration supports [Universal Links](/getting-started/universal-app-links/). You will need access to your app code to make these changes.

You should have [received an email from Branch](#configure-your-app-for-your-click-tracking-domain) with your ESP's click tracking domain. If not, likely you or someone on your team still needs to complete the [Deep Linked Email setup flow](https://dashboard.branch.io/email){:target="\_blank"}.

!!! protip "How does it work?"
    Apple recognizes the click tracking domain as a Universal Link, and opens the app immediately without the browser opening. Once the app has opened, Branch will collect the referring URL that opened the app (at this time, it will be the click tracking url). Inside the app, Branch will robotically “click” the link, registering the click with the ESP, and returning the Branch link information to the Branch SDK inside the app. This information is then used to deep link the user to the correct in-app content. See the [Support](#support) section for more information.
