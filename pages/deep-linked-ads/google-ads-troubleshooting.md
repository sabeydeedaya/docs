!!! info "<img src="../../../_assets/img/pages/deep-linked-ads/google/google-ads-logo.png" width="50"/> Google Ads Resources"
		- [Google Ads Overview](/deep-linked-ads/google-ads-overview/)
		- [Enabling the Integration](/deep-linked-ads/google-ads-enable/)
		- [App Install Campaigns](/deep-linked-ads/google-ads-uac/)
		- [App Engagement Campaigns](/deep-linked-ads/google-ads-app-engagement/)
		- [Web-based Ads (non-UAC)](/deep-linked-ads/google-ads-non-uac/)
		- **Troubleshooting & FAQs** (this page)

## What is Parallel Tracking?

!!! warning "Since October 30, 2018, parallel tracking is required for all Google Ads accounts."

In the past, Google Ads' non-UAC campaign clicks were tracked through “sequential tracking” (i.e. a client-side redirect). When an ad was clicked, the customer’s browser would go to the tracking URL, and then the tracking URL was responsible for forwarding the browser on to the Final URL.

![image](/_assets/img/pages/deep-linked-ads/google/legacy-sequential-tracking.png)

With the change to “parallel tracking”, Google sends the customer directly to the Final URL, and uses the new Beacon API to "click" the Tracking URL (including following any server side redirects) in the background. The key here is that the Tracking URL (and redirects) are still being visited by the end user's browser, but because this happens “in parallel” (i.e., not visible to the customer), the user experience is better. For browsers without Beacon API support, Google will fall back to legacy sequential tracking.

![image](/_assets/img/pages/deep-linked-ads/google/new-parallel-tracking.png)

### How Does Parallel Tracking Work?

If you are running a Universal App Install Campaign, parallel tracking does not come into play as this campaign type directs users solely to the respective app store and does not include a third party link.

If you are running a non-UAC Web-based Ad (Display, Search, Shopping, Video), and using a Branch link as either the `Final URL` or `Tracking Template`, parallel tracking ensures your users are directly routed to the final destination while also allowing Branch to properly measure and attribute the resulting actions/conversions.

![image](/_assets/img/pages/deep-linked-ads/google/google-ads-non-uac.png)

### How Does This Impact Me?

Attribution is unaffected because, although the Branch link is no longer the referring URL to the domain, parallel tracking still allows Branch link clicks to happen. This means the Branch Match ID parameter is still appended to the link that is being "clicked", and Branch can still store (and access) the Match ID in local storage because the web SDK can still load and read query parameters, even in the background.

Furthermore, this is in line with Google & Safari’s expectations of how clicks should be tracked (i.e., using query parameters instead of third-party cookies), and is compliant with current policy.

### Google Ads Campaign Limitations

#### Product Listing Ads (PLA) - Attribution
- Branch's dashboard will attribute app events to PLA campaigns via the click tracking links used in the adwords_redirect field of the product catalog. However, Google's Conversion API currently does not support app attribution data for PLA/Shopping campaigns, so the data in Google Ads dashboard may not show app conversions such as installs or app purchases.
- Deep linking is supported

#### App Extensions - Deep Linking through Install
- App Extensions currently do not allow Deep Linking, as the setup only accepts app store links [link](https://support.google.com/adwords/answer/2402582?hl=en)
- Attribution is supported

#### Universal App Campaigns (UAC) - Deep Linking through Install
- Deferred deep linking is currently not possible with UAC, as it does not accept any links
- Attribution is supported

#### Universal App Campaigns (UAC) - Click Reporting
- As links are not accepted into the Google Ads UAC UI, we will only report on clicks in aggregate (via Google's reporting API)
- Individual UAC clicks will not appear in Branch's liveview dashboard, webhooks, or exports
- 'Unique' UAC data cannot be viewed on the ads analytics dashboard (Non-UACs, like regular Search campaigns, will report on clicks in all Branch dashboards)
- Reporting on UAC clicks is done every 3 hours
- Branch only reports on clicks from an Google Ads campaign that led to an install or app engagement

#### Universal App Campaigns (UAC) - Limited Campaign Information
These campaign parameters are not supported by UAC and will not be available in reports:

Google parameter | Branch parameter
--- | ---
keyword | ~keyword_id
placement | ~placement
ad_group_id | ~ad_set_id
creative_id | ~creative_id

{! ingredients/deep-linked-ads/adwords-valuetrack-info.md !}

### FAQ

#### I'm seeing a discrepancy between conversion counts in Branch and Google Ads

**A:** While we should always expect around a 5% discrepancy due to time zone differences and the like, if you are seeing significant discrepancies, it could be an indication of a broader problem.

The first thing to do is to make sure you have enabled the `Use Ad Partner Attribution Windows` setting for Google Ads. Go to [Link Settings](https://branch.dashboard.branch.io/ads/partner-management/a_google_adwords?tab=attribution_windows), and navigate down to the Attribution Windows section. Here, you should set the attribution window for `click to install`, `click to session start`, and `click to conversion event` to be 30, 90, and 90 days respectively. This aligns with Google's default attribution windows, but if you'd like to make them shorter, feel free.

Another source of discrepancies is the fact that attribution is based upon *click* time in Google Ads, whereas it is based upon *install* time in the Branch dashboard. This isn't a discrepancy per se, but will sometimes show different numbers in the two dashboards.

Finally, Google Ads can delay reporting up to 24 hours. It's best to measure campaigns in a trailing manner.

#### Post-install events are attributed to Google Ads in the Branch dashboard but are not appearing in Google Ads

**A:** Ensure that, in the [Google Ads dashboard, you have imported all Branch events](/deep-linked-ads/google-ads-overview/#import-events-in-adwords) that you want to see in Google Ads.

#### My UAC data looks misaligned when I compare by certain filters

**A:** Google _installs_ should have the full range of compare by options in the dashboard. However, _clicks, impressions and cost_ data for UAC are imported via the Google Ads Reporting API, as noted above. The Google Ads Reporting API does not necessarily provide the same breakdowns that Branch can create with raw install events, so there may be cases where the Branch Dashboard cannot compare by the same dimensions for clicks vs installs.

#### My click data is missing or duplicated for my web campaign

**A:** Click data for web campaigns is available with full breakdowns, but there are specific requirements for setting up web campaigns. Please see the [SAN Web Tracking](/deep-linked-ads/san-web-tracking) guide for more information on setting up web campaigns.

#### My campaign is reporting a number of conversions much higher than the number of conversions shown in the conversion table in Google Ads

**A:** When viewing a campaign, it shows the sum of all conversion events that apply to it. To view by conversion, navigate to `Segment` > `Conversions` > `Conversion name`, in order to clearly see the breakdown of your campaign's conversions.

<img src="/_assets/img/pages/deep-linked-ads/google-conversions/conversion-segment.png" alt="Google Ads Conversion Segment" class="center">

#### Why is my advertisement being disapproved on Google Ads?

**A:** For Video Campaigns, sometimes your ad may be disapproved if the Branch link does not re-direct to Google Play or App Store when clicked on a desktop. Please ensure that for the Branch link you're using to track installs, Deepviews are disabled and a desktop redirect is set to either the App / Play store.

For Cross Platform campaigns, sometimes your ad may be disapproved if the Branch link does not re-direct to your Final destination URL specified in the ad. Please ensure that your Branch link redirects to your Final URL specified in your ad. To ensure install tracking is functional please ensure that for the Branch link you're using to track installs, Deepviews are disabled and your Branch link's iOS/Android redirects are set to their respective App / Play Store.

#### Why can't I use a Branch link in a Video discovery ad?

**A:** As of June 2017, Google Ads does not support Tracking Templates on Video discovery ads. This means Branch links won't work for this specific ad type. However, we're working on support in the future and will update these docs accordingly.

{! ingredients/deep-linked-ads/cost-data-discrepancies.md !}
