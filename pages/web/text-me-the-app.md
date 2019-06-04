## Overview

When users click your links on desktop, they have the option to text themselves a link to download your app. We provide this by default on every Branch link, but you can also create your own fully-branded Text Me The App page.

![image](/_assets/img/pages/text-me-the-app/default-and-drafted.png)

Left: Branch default. Right: a customized version.

This document will cover how to create a custom Text Me The App page, as well as a general FAQ for this product.

## Usage Policies

Branch reserves the right to limit your use of the Text Me The App service and charge for SMS costs at its own discretion. To understand Branch's policies in this regard, please contact your Branch Account Manager or accounts@branch.io at any time for assistance.

## Setup

If you don't want to use Branch's default Text Me The App Page or show a desktop deepview, follow these instructions. This will let you customize a Text Me The App page using Branch.

### Set Destination URL

1. Visit the [Desktop SMS](https://dashboard.branch.io/web/sms) page on the Branch dashboard.
1. Select `Custom Landing Page with SMS`, after you toggle to `On`.
1. Enter the destination URL.

![image](/_assets/img/pages/text-me-the-app/desktop-routing.png)

!!! note "Make sure you can access this page"
    Because you will be making changes to this URL, be sure you have access to the page and can make changes to its HTML.

### Insert SendSMS() snippet into your page

When you have set your destination URL from the previous step, go to that page and edit the HTML. Paste the following code snippet into it; this is a fully-functional web page that you can use as a template for your Text Me The App page.

```
<!DOCTYPE HTML>
<html lang="en-US">
<head>
<meta charset="UTF-8">
    <script type="text/javascript">
        (function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="https://cdn.branch.io/branch-latest.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener applyCode banner closeBanner creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode".split(" "), 0);

        branch.init('YOUR-BRANCH-KEY');
            function sendSMS(form) {
                var phone = form.phone.value;
                var linkData = {
                    tags: [],
                    channel: 'Website',
                    feature: 'TextMeTheApp',
                    data: {
                        'foo': 'bar'
                    }
                };
                var options = {};
                var callback = function(err, result) {
                    if (err) {
                        alert("Sorry, something went wrong.");
                    }
                    else {
                        alert("SMS sent!");
                    }
                };
                branch.sendSMS(phone, linkData, options, callback);
                form.phone.value = "";
            }
    </script>
</head>
<body>
        Send SMS
        <form onsubmit="sendSMS(this); return false;">
            <input id="phone" name="phone" type="tel" placeholder="(650) 123-4567" />
            <br/>
            <input type="submit"/>
        </form>
    </body>
</html>
```

And that's it. From here, you can customize the HTML and CSS, and Branch will take care of the rest. If you want to further customize the page or SMS message itself, read further.

## Advanced

### Use Twilio SMS service

In order to get set up with your Twilio account, Branch needs the following information to enable the integration.

- Branch App ID
- Account SID
- Auth Tokens
- Twilio Phone numbers to send from

Please reach out to support@branch.io or your CSM with the above information to enable the Twilio integration.

!!! note "Phone number retention policy"
    Phone numbers are redacted from Branch's Twilio instance, but if you use your own SMS provider, phone numbers may be stored either temporarily or indefinitely by that provider.

### Use a custom form with SendSMS()

If you have an existing form for users to input their phone number, you can put our Text Me The App behind it. Add the following code somewhere inside the `<head></head>` tags on your website.

```javscript
<script type="text/javascript">
function sendSMS(form) {
  branch.sendSMS(
    phone: form.phone.text,
    {
      channel: 'Website',
      feature: 'Text-Me-The-App',
      data: {
        foo: 'bar'
      }
    },
    { make_new_link: false }, // Default: false. If set to true, sendSMS will generate a new link even if one already exists.
    function(err) { console.log(err); }
  );
}
</script>
```

Call sendSMS when someone enters something into your form.

### Customize SMS message content

The default text for SMS messages is "Click here to download [App Name] {{ link }}".

If you want to customize this, Branch allows you to set a default for all messages, or customize the message for each link.

#### Customize all messages

You can create your own custom default message that will be sent if the specific link someone clicks doesn't have a customized message itself. Navigate back to the Desktop SMS page on the [Branch dashboard](https://dashboard.branch.io/web/sms). You should see the following section below.

![image](/_assets/img/pages/text-me-the-app/default-message.png)

 Editing this field will modify **all** SMS messages sent.

#### Custom link-specific messages

If you don't want to edit the global SMS text, you can define a special SMS message for each individual link. Whether you want to switch the language of a message for a different region or include device specific date, you can specify the message in the *Deep Link Data* section at the bottom of the link editing screen.

![image](/_assets/img/pages/text-me-the-app/deeplink-data.png)

Use the **$custom_sms_text** parameter and then enter your custom message in the value section. Make sure to include the **{{ link }}** tag in your custom message! Read the following scenario below to see this in action.

*The developer of FlowerPower wants to customize the SMS messages based on the country of the recipient. For each Branch link, they would specify in the deep link data a different custom message.*

For ads in France:
**Cliquez pour télécharger FlowerPower ici {{ link }}**

For ads in Spain:
**Haz click aquí para descargar FlowerPower {{ link }}**

For ads in Germany:
**Klicken Sie auf das FlowerPower hier herunterladen {{ link }}**

#### Use liquid tags to further customize messages

You can access almost any value of your link's parameters by using liquid tags. The customization options are only limited to your imagination.

   - The tag **{{ link }}** is replaced with your Branch link
   - **{{ link.channel }}** and **{{ link.campaign }}** output the channel and campaign, if these were set when creating the link.
   - **{{ link.data.key }}** will output a parameter of your link's data dictionary, where `key` is the name of the parameter

Here's an example to illustrate this scenario.

*Dmitri is creating Branch links to deep link to each of the different flowers in his app FlowerPower. He creates each link with a key/value pair of the key `flower` and the flower name, e.g. `Flower : Rose`, `Flower : Tulip`. He wants to customize his SMS messages based on name of the flower, so he sets his custom link messages as:*

**{{ link.data.flower }}**s on the mind? Click here to buy some for your home! **{{ link }}**

![image](/_assets/img/pages/text-me-the-app/key-value.png)

## Glossary

### SendSMS() parameters

The `sendSMS()` method requires a phone number and [link parameters](/links/integrate/#configure-deep-links). You may optionally specify configuration options and a callback.

```javascript
branch.sendSMS(
    phone,
    linkData,
    options,
    callback (err, data)
);
```

Your call to this method, once filled in with the user's phone number, could look like the following:

```javascript
branch.sendSMS(
    phone: '9999999999',
    {
        tags: ['tag1', 'tag2'],
        channel: 'facebook',
        feature: 'dashboard',
        stage: 'new user',
        data: {
            foo: 'bar'
        }
    },
    { make_new_link: false }, // Default: false. If set to true, sendSMS will generate a new link even if one already exists.
    function(err) { console.log(err); }
});
```

### Setting default replacement values for liquid tags
If a specific tag isn't always going to be filled, you can use a `|` character to specify a default to fallback on if the tag is missing from your link dictionary.

E.g. `{{ link.data.author | default:"Alex" }}`

If the `link.data.author` information isn't found, the tag will just be replaced with _Alex_ instead of being replaced by an empty string.


## FAQ

### What are the SMS rate limits?

We enforce the following rate limits when sending SMS through Branch:

1. 5 texts to the same number within an hour.
1. 100 texts from the same IP within an hour.

### Can I use this service for international phone numbers?

Yes. Branch uses Twilio to send SMS messages, which means SMS will be delivered all around the world. However, please note that the number the SMS has to be delivered to, must be in the same country the SMS is being sent from.


### I've sent myself multiple texts just now and only received the first few, what's going on?

This occurs when a carrier filters you SMS out due to spam. We try our hardest to rate limit a specific user, however, if bypassed, carriers may block your SMS. The reason is that carriers will aggressively block content if it's similar and repeatedly sent to the same number. The solution is to wait 24-48 hours.

### How come my (non US) phone number isn't working?

With full numbers, you are required to use "+" and the country code. If you know your users are only in a certain country, you can automatically prepend "+" and the country code so that they only need to enter their regular number. To do this, you must create a custom text-me-the-app page. Then, you can alter the code snippet in [step 2](#insert-sendsms-snippet-into-your-page) with the following:

```javascript
    var phone = "+91" + form.phone.value;
```

In the example above, "+91" is the code for the country your users are based in.

### Why have the SMS links sent from Text Me The App expired?

All links generated from the Text Me The App feature will expire after 7 days.
