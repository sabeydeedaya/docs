## Overview

Branch recommends creating fraud rules to block erroneous attribution credit in real-time. While Branch still performs last-click attribution, it will not send the ad network a postback when the attribution is flagged as fraudulent.

This has two benefits:

- You can see how many fraudulent events come from each ad partner and sub-publisher.
- You do not have to try to recoup losses from the ad network, because the payout never happened in the first place.

Blocked events are also separated from normal traffic in your Branch dashboard, so you can see all events in one place (the fraud dashboard), while healthy analytics are not distorted by bad traffic.

But not to worry, blocked events are still deep linked, so blocking would not affect the user experience of a real user.

!!! warning "Enabling Fraud Rules"
	This feature is not available via your dashboard. Please contact [Support](mailto:support@branch.io) if you want to enable fraud rules on your account.

## Recommended Fraud Rules

### Device Conflict

The device information on the click and the install are different. A real user clicks and installs on the same device, so this is highly suspicious.

### Country Conflict

The click and the install occur in different countries. Theoretically this could happen for a real user, but it is extremely unlikely. It’s much more likely that the click or install was simulated.

### Suspicious IP

Branch automatically blocks events coming from TOR networks.

### Suspicious Click-to-Install Time

Very short click-to-install times are suspicious - this is typically caused by faked clicks taking attribution credit for real installs. We recommend blocking CTI times below 30 seconds, but you can configure it to be up to 60 seconds. On the Branch Fraud Dashboard, you can see CTI time distribution by ad partner to determine if this threshold seems to be working.

### Suspicious Persona

This is based on Branch’s cross-platform persona graph. We use proprietary algorithms to dynamically block attributions on browsers and devices showing suspicious behavior.

### Invalidated - No Receipt

When an install or purchase occurs, we send a request to the App store or Play store. If they have no record of the event, we consider the event to be fraudulent and block it.

### Attribution Hijacked

If the App / Play store receipt records an install beginning before the most recent click, we consider the attribution to be fraudulent (the click was faked after the conversion began). We block the attribution on the install. The user may be real, but their experience will not be impacted.

### Event-level Characteristics

We can block on any attribute stored at the event level. Examples:
Device Pattern: For example, “OS version + Country + Model”. It’s common for device farms to use the same devices over and over, making it easy to pick out specific device characteristics to block
