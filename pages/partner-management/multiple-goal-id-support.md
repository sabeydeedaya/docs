##Overview

Branch provides the ability to send different postbacks for an in-app or pre-defined event depending on the multiple Goal IDs specified in the tracking link.

This feature supports networks using HasOffers, CAKE or any other network that wants to receive different in-app event postbacks for a single SDK in-app event.

On the Integrated Partners page of Branch's dashboard clients must map each of their Events to their preferred dynamic Event Postback for each Goal ID.

This enables the integrated ad networks to open multiple campaigns with a separate dynamic event tag (example: HasOffers calls this a "goal_id") for each campaign. The dynamic event tags are then passed to the ad network in the Postback based on the value that was placed in the click URL.

## Branch Tracking Link Example

```
https://branchster.app.link/bKzQX2KCcS?%243p=partner_id&~click_id={clickid}&goalid_1={XXX}&goalid_2={YYY}&goalid_3={ZZZ}
```

The advertiser must map all of the Goal_IDs in the Postback events section under Postback Config (see below) according to the network's instructions.

In the example below, the HasOffers Postbacks are mapped as follows:

*   OPEN is mapped with **goalid_1**
*   PURCHASE is mapped with **goalid_2**
*   PAGEVIEW is mapped with **goalid_3**

![image](/_assets/img/pages/deep-linked-ads/partner-resources/multiple-goal-ids.png)

This means that when a user triggers an OPEN event via the tracking link above, Branch returns the relevant value (XXX) and sends it in the Postback URL.

If the same or a different user then completes a PURCHASE event, Branch again returns to the tracking link and dynamically populates the goal_id with the relevant value (in this case YYY) and sends it in the postback. The same logic applies to PAGEVIEW and other Events mapped to Goal IDs on the Branch Dashboard.
