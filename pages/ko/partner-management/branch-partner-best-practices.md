Universal Ads integrated ad partners (i.e. ad networks and affiliate networks) are encouraged to follow the below best practices to optimize measurement of mobile ad campaign effectiveness.

## Pre-Launch

- Set goals for CVR (Click to Conversion) and LTV (Lifetime Value) before the campaign launches
	- It is recommended to run optimized campaigns using Universal Ads click URLs. Universal Ads charges on all performance attributions: clicks, paid installs, and all post-install events. Poorly performing campaigns may result in customer incurring increased tracking fees due to high click count with low install volume.
- Complete end-to-end test and campaign preparation
	- Measurement URL template
	- Postback URL template
	- Test profile
- Partner should set up a creative with the Branch link and perform a test conversion, checking that they receive proper confirmation of the conversion via postback.
- Using Branch links
	- Clicks
		- Must have different macros for device identifiers.
		- Clicks ONLY to be tracked on CTA (Call to Action). Clicks should not be used in the Impression URL field because Universal Ads charges customers for each click. If clicks are tracked in the impression field, customers will experience increased tracking costs when a click tracker is fired on each view.
		- Must have device ID macros. Server-side clicks are the preferred method to improve user experience if networkMust  wants to avoid redirecting through Universal Ads then to the app store
		- Publisher names or IDs should be stored in the Universal Ads sub-site or sub-publisher parameters to isolate individual affiliate performance
		- Impressions
		- Impressions are to be tracked in the Impression URL field of an ad server. It’s appropriate to measure pre-loaded ads with an Impression URL.
		- If using quartiles, Client needs to set specific quartile for view-through attribution
		- Universal ads allows view-through impression tracking up to 30 days if collecting IDFA or Google Ad ID

## Post-Launch

- Campaign Report Checks
	- Within the first 24 hours, the customer and ad partner should check Gross and Unique clicks to ensure frequency capping is within expected range
	- After the initial 24 hour review, check in on a weekly basis to monitor overall performance and drill down to affiliate performance.
	- Preferred: Ad partners have systems in place to call out affiliates that are dropping their network performance below 0.5% click to install rates
	- Ad partners need to address negligence with their affiliates if it occurs – ad partners can’t claim they have no control of their affiliates, ad partners are ultimately responsible for their affiliates actions. Branch can help manage sub partners if primary partners send data on sub-publishers and sub-sites.
- Policy on Campaign Implementation Issues
	- If Branch links are misused and overages result in increased costs to app marketers, Universal Ads is not liable for any partner’s mistakes and we will not be able to provide a credit to the customer.
	- Partners should follow our best practices outlined above to avoid tracking issues, discrepancies, and misrepresentation of campaign performance in the Universal Ads dashboard.
