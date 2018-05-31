## DEPRECATED

This plug-in is deprecated. Fabric no longer supports the integration. Customers that enabled before May 31st 2018 will continue to see data in Fabric. Customers going forward won't have the ability to integrate Fabric with Branch.

## Overview

Integration with Fabric's Answers is totally automatic as long as you've integrated both Branch and Answers. Branch will automatically send the following three events to Answers:

- `Branch Install`: This event is sent when a user installs your app after clicking a Branch link.
- `Branch Open`: This event is sent when a user clicks a Branch link but already has your app installed.
- `Branch Share`: This event is sent when the has shared a link on a channel using the [Branch share sheet]({{base.url}}/getting-started/branch-universal-object/guide/ios/#showsharesheetwithlinkproperties).

With every single event that's recorded, the following custom Branch link analytics labels are sent as Answers event attributes *if present*:

- `channel`
- `campaign`
- `feature`
- `stage`
- `tags`
- `referring_link`

## Enable Answers

If you're looking to get started on this, it's very simple. Just follow the simple step by step instructions:

1. Integrate the Branch SDKs and start using links! Make sure you're using iOS 0.12.3+ or Android 1.13.2+.
2. Head to your [Fabric dashboard](https://fabric.io/home)
3. Find the `Answers` kit on the left hand nav bar
4. Click it and accept terms of service for Answers.
5. Start getting critical Branch growth insights in your Answers dash
