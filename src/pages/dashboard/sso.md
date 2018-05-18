---
title: Single Sign-on for the Branch dashboard
description: How to set up SAML with the Branch dashboard and your identity provider.
path: tree/master/src/pages/dashboard
source: sso.md
---
# Single Sign-on

## Overview

Branch offers Security Assertion Markup Language (SAML) / Single Sign-on (SSO) support for the dashboard. This allows you to use your identity provider (IdP) to centralize access to various services for your team and leverage existing directory systems and security groups.

!!! warning "Chrome Security bug"
    Due to Google's plans to deprecate support for the Symantec certificate authority (including Symantec-owned brands like Thawte, VeriSign, Equifax, GeoTrust, and RapidSSL), SSL/TLS certificate from the Legacy Symantec PKI will stop functioning on Chrome 66+. If connecting to your site displays a certificate error or a warning in DevTools, you’ll need to replace your certificate. View details of the issue on the [Google Bug report](https://security.googleblog.com/2018/03/distrust-of-symantec-pki-immediate.html).

### Prerequisites

- Single Sign-on support for the Branch dashboard is a Premium feature. [Learn more](#how-much-does-sso-cost).

## Guide

### Contact Branch

SSO for the Branch dashboard restricts access for designated email domains to a specific dashboard subdomain. Contact your account manager or [support](https://support.branch.io/support/tickets/new){:target="\_blank"} when you are ready to get started. Please provide:

1. **The email domain(s)** that you and your team use and will be required to sign in via SSO.
1. **The Branch dashboard subdomain** you would like your team to use to log in. For example, if you chose `company`, then your dashboard subdomain would be `https://company.dashboard.branch.io`. 
1. **The email addresses of any SSO admins** that will be allowed to configure SAML for your team. These SSO admins will also be allowed to log in both via SSO and via regular dashboard login after SSO is enabled, so that you have a fallback option to gain access to your account if the configuration goes wrong in some way.

### Add Branch to your identity provider

If you want the dashboard to provide SSO for your team, You will need to add Branch to your IdP. Once this is complete, your IdP will provide you with details that you'll need to add to the Branch dashboard in order to enable SSO.

Branch currently works with Okta and OneLogin, and should also be compatible with any identity provider that supports SAML. 

When you add Branch to your identity provider, add the following SAML attribute mappings:

| SAML attribute | Field it should map to in your IdP 
| --- | ---
| email | User's first name
| firstName | User's first name
| lastName | User's last name

Here is some initial information that your IdP might ask for:

| IdP Field | Value
| --- | ---
| Platform | Web
| Sign-on method | SAML 2.0
| Application name | Branch
| Logo | [Download here](https://branch.io/press/#kit){:target="\_blank"} 

Ask your account manager or [support](https://support.branch.io/support/tickets/new){:target="\_blank"} for the additional configuration information that you need.

### Copy your details back to Branch

When you have added Branch, your IdP should provide you with an **Identity provider Entity ID**, an **Identity provider SSO URL**, and a **Public x509 certificate**. Go to [Account Settings > SSO](https://dashboard.branch.io/account-settings/sso){:target="\_blank"} and paste in the information:

![image](/img/pages/dashboard/sso/configure-saml.png)

Click **Save** to save your information. SSO will not be enabled for your team yet.

If you do not see the above fields, likely Branch has not finished enabling your account yet. Please contact your account manager or [support](https://support.branch.io/support/tickets/new){:target="\_blank"}.

### Add users to Branch in your IdP

Give the appropriate users access to Branch in your identity provider. If users are on your Branch team in the dashboard but are not given access in your IdP, then they will no longer be able to log in to the Branch dashboard when SSO is enabled.

When you add users to Branch via your IdP in future, you will also have to add them to the team for the appropriate apps in the Branch dashboard. You can do this on the [Account Settings > Team](https://dashboard.branch.io/account-settings/team){:target="\_blank"} page for each app that you want the user to have access to.

Branch does not currently support just-in-time or SCIM provisioning. [Learn More](#does-branch-support-just-in-time-or-scim-account-provisioning).

### Enable SSO

Return to the [Account Settings > SSO](https://dashboard.branch.io/account-settings/sso){:target="\_blank"} page and toggle SAML/SSO to **On**. When you click **Save** at the bottom, SSO will be enabled and users will have to login via your branded subdomain:

![image](/img/pages/dashboard/sso/enable-saml.png)

Users on your claimed email domain(s) trying to log in, reset password, or sign up the regular way via `https://dashboard.branch.io`, will be redirected to your branded subdomain and your IdP login page.

## FAQ

### Is there a fallback option to sign in to the dashboard when SSO is enabled?

Yes! You can designate SSO admins that will be able to log in via your branded subdomain or https://dashboard.branch.io when SSO is enabled. These admins will be able to sign in with a password and turn SSO off if necessary. Designate SSO admins when you [contact Branch](#contact-branch).

In addition, users on your team that are not on your claimed email domain(s) will still be able to log in without SSO and access your Branch app. If this is not desired, be sure to remove these users from your team or add them to the list of claimed email domains.

### Does Branch support just-in-time or SCIM account provisioning?

Not currently. One user can belong to multiple Branch apps, so admins must decide which users on their claimed email domain should have access to which apps in Branch at this time. Please let us know if you're interested in this via your account manager or [support](https://support.branch.io/support/tickets/new){:target="\_blank"}.

### How much does SSO cost?

Single Sign-on support for the Branch dashboard is a Premium feature. If you are already paying for any Branch product, SSO is free for you and your team. Please [contact support](https://support.branch.io/support/tickets/new){:target="\_blank"} or your account manager for more information.
