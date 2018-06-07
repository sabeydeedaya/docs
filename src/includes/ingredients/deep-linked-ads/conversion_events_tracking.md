#### Track conversion events

Install and open events are automatically tracked using just the Branch SDK integration. However, to track custom events, such as registration or purchase, you will need to integrate them into your application.

!!! warning "Sending event metadata from your application"
	Please make sure that you setup and pass event metadata from the application to the ad partner. Follow up with your ad partner to get the list of required parameters.

Please reference the general [V2 Event Tracking Guide](/pages/apps/v2event/#overview). This will help ensure that you've integrated the right Branch events with the correct metadata.


!!! note "Testing your events with Liveview"
	You can test your integration by going to our [Liveview page](https://dashboard.branch.io/liveview/events){:target="\_blank"}. Set a filter with the event name to verify that the Branch SDK is recording each event.