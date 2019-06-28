## Requirements

Before testing, make sure of the following:

*   The [Branch SDK](https://docs.branch.io/resources/native-sdks-and-plugins/) is implemented in your app.
*   [Default link behavior](https://docs.branch.io/links/default-link-behavior/) and attribution windows are configured.
*   [Universal Ads Partners](https://docs.branch.io/deep-linked-ads/ad-networks-list/) are enabled.


## 1. Create a Branch Link

Please follow the [Creating Ad Links](https://docs.branch.io/links/creating-ad-links/) instructions.

To ensure your ad link template itself works properly for testing, please make sure the created ad link template passes the initial validation check before using.

Your Branch Ad Link should look similar to the following (but will vary depending on your selected ad partner) :

`https://branchster.app.link/Y2E3bNSaCX?%243p=a_youappi&%24aaid=<ANDROID_ID>&%24idfa=<IDFA>&trackertoken=<trackertoken>&ya_reen_id=<ya_reen_id>&~campaign=<campaignname>&~campaign_id=<campaignid>&~click_id=<params>&~secondary_publisher=<publisherid>`


## 2. Pass in Required Link Data via Macros

As you are testing the link yourself - rather than it being used by your Ad Partner for a live campaign - you will need to manually pass in the relevant values for proper attribution and postbacks. Not passing in the link data will result in the subsequent postbacks returning empty values to your partner.

Using the sample Branch Ad Link above, filling in the macros would result in the following link:

`https://branchster.app.link/Y2E3bNSaCX?%243p=a_youappi&%24aaid=38400000-8cf0-11bd-b23e-10b96e40000d&%24idfa=00000000-0000-0000-0000-000000000000&trackertoken=1234&ya_reen_id=2345&~campaign=my_test_campaign&~campaign_id=9876&~click_id=1111&~secondary_publisher=45678`

For a complete list of the macros that Branch supports in postbacks, please see [Postback Macros & Functions](https://docs.branch.io/resources/postback-macros-and-functions/).


### Common Ad Link Validation Scenarios

| Link Status                  | Reason                                                                       | Sample Test Link                                                                                                                                                                                                                                                                                                                                |
|------------------------------|------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Client side**                  |                                                                              |                                                                                                                                                                                                                                                                                                                                                 |
| Broken                       | Clicked raw link directly from UI                                            | `https://branchster.app.link/Y2E3bNSaCX?%243p=a_youappi&%24aaid=<ANDROID_ID>&%24idfa=<IDFA>&trackertoken=<trackertoken>&ya_reen_id=<ya_reen_id>&~campaign=<campaignname>&~campaign_id=<campaignid>&~click_id=<params>&~secondary_publisher=<publisherid>`                                                                                         |
| Broken                       | Left both device ID macros in without filling them out                       | `https://branchster.app.link/Y2E3bNSaCX?%243p=a_youappi&%24aaid=<ANDROID_ID>&%24idfa=<IDFA>&trackertoken=<trackertoken>&ya_reen_id=<ya_reen_id>&~campaign=<campaignname>&~campaign_id=<campaignid>&~click_id=<params>&~secondary_publisher=<publisherid>`                                                                                         |
| Broken                       | Filled out one device ID, left the other one as a macro                      | `https://branchster.app.link/Y2E3bNSaCX?%243p=a_youappi&%24aaid=<ANDROID_ID>&%24idfa=6D92078A-8246-4BA4-AE5B-76104861E7DC&trackertoken=<trackertoken>&ya_reen_id=<ya_reen_id>&~campaign=<campaignname>&~campaign_id=<campaignid>&~click_id=<params>&~secondary_publisher=<publisherid>`                                                           |
| Working                      | Filled out one device ID, left the other blank                               | `https://branchster.app.link/Y2E3bNSaCX?%243p=a_youappi&%24aaid=&%24idfa=6D92078A-8246-4BA4-AE5B-76104861E7DC&trackertoken=<trackertoken>&ya_reen_id=<ya_reen_id>&~campaign=<campaignname>&~campaign_id=<campaignid>&~click_id=<params>&~secondary_publisher=<publisherid>`                                                                       |
| Working                      | Not S2S, specified both AAID & IDFA (OS is figured out from the client)      | `https://branchster.app.link/Y2E3bNSaCX?%243p=a_youappi&%24aaid=38400000-8cf0-11bd-b23e-10b96e40000d&%24idfa=6D92078A-8246-4BA4-AE5B-76104861E7DC&trackertoken=%3Ctrackertoken%3E&ya_reen_id=%3Cya_reen_id%3E&~campaign=%3Ccampaignname%3E&~campaign_id=%3Ccampaignid%3E&~click_id=%3Cparams%3E&~secondary_publisher=%3Cpublisherid%3E`           |
|                              |                                                                              |                                                                                                                                                                                                                                                                                                                                                 |
| **Server to server ($s2s=true)** |                                                                              |                                                                                                                                                                                                                                                                                                                                                 |
| Broken                       | Clicked raw link directly from UI                                            | `https://branchster.app.link/Y2E3bNSaCX?%243p=a_youappi&%24aaid=<ANDROID_ID>&%24idfa=<IDFA>&trackertoken=<trackertoken>&ya_reen_id=<ya_reen_id>&~campaign=<campaignname>&~campaign_id=<campaignid>&~click_id=<params>&~secondary_publisher=<publisherid>`                                                                                         |
| Broken                       | Has a $S2S param but didn't provide a device ID                              | `https://branchster.app.link/Y2E3bNSaCX?%243p=a_youappi&%24aaid=&%24idfa=&trackertoken=%3Ctrackertoken%3E&ya_reen_id=%3Cya_reen_id%3E&~campaign=%3Ccampaignname%3E&~campaign_id=%3Ccampaignid%3E&~click_id=%3Cparams%3E&~secondary_publisher=%3Cpublisherid%3E&$s2s=true`                                                                         |
| Broken                       | S2S, specified both AAID & IDFA (means we can't figure out the OS)           | `https://branchster.app.link/Y2E3bNSaCX?%243p=a_youappi&%24aaid=38400000-8cf0-11bd-b23e-10b96e40000d&%24idfa=6D92078A-8246-4BA4-AE5B-76104861E7DC&trackertoken=%3Ctrackertoken%3E&ya_reen_id=%3Cya_reen_id%3E&~campaign=%3Ccampaignname%3E&~campaign_id=%3Ccampaignid%3E&~click_id=%3Cparams%3E&~secondary_publisher=%3Cpublisherid%3E&$s2s=true` |
| Working                      | S2S with a device ID (doesn't redirect, by design, as it's server to server) | `https://branchster.app.link/Y2E3bNSaCX?%243p=a_youappi&%24aaid=&%24idfa=6D92078A-8246-4BA4-AE5B-76104861E7DC&trackertoken=%3Ctrackertoken%3E&ya_reen_id=%3Cya_reen_id%3E&~campaign=%3Ccampaignname%3E&~campaign_id=%3Ccampaignid%3E&~click_id=%3Cparams%3E&~secondary_publisher=%3Cpublisherid%3E&$s2s=true`                                     |


## 3. Perform a Click & Download App

To test the Branch Ad Link and appropriate routing, email yourself the Ad link. On your device, open the email and click the link (or ad that embeds it). If you're testing on your office Wifi, we recommend turning Wifi off and using LTE/Cell to ensure we get a unique fingerprint of your device.

This click should redirect you through the Branch system to the appropriate app store and/or destination where you can download your app.

Open the app so that Branch captures your device information and matches the install event with the click event.


## 4. Check Liveview for Associated Actions

Liveview allows you to validate and debug your setup by including advanced filtering that allows you to restrict down to specific events (i.e. clicks, installs, purchases) as well as webhook/postback records.

### Liveview for Events

1. In the left-hand navigation, under **Setup & Testing** click on **Liveview**.
2. By default, Liveview loads the **Events** object.
3. Using the filter in the upper-left hand corner, choose the event type you want to view. This allows you to find your test click and/or resulting app download.
4. We recommend adding additional filters - Device ID and/or Ad Partner and/or Campaign Name - to help you more quickly identify the ad link you’re testing.
5. Click **Update Session** to view new selection.

![image](/_assets/img/pages/resources/events-liveview.png)

### Liveview for Webhooks/Postbacks

1. In the left-hand navigation, under **Setup & Testing** click on **Liveview**.
2. Click the **Webhooks Record** tab to load the Webhook/Postbacks object.
3. Click the **Add Filter** button, and select **Webhook Partner Key** from the drop-down and insert the relevant value for the partner.
4. Click the columns button to add both the **Webhook Response Code** and **Webhook Response Body** as columns.
5. Click **Update Session** to view the filtered results.

![image](/_assets/img/pages/resources/liveview-webhooks.png)

#### What to Look For When Validating

*   Check the expected macros are populated AND the response code. Most importantly, you'll want to verify the IDFA/AAID and the Click ID are populated.
*   We recommend verifying the event with the ad partner even when the Response Code is 200 (successful). To do so, send them the event name, the webhook request URL, device ID, timestamp, webhook response code and webhook response body.
*   If you can’t find the webhook you’re looking for, we recommend testing your ad link several more times to trigger the subsequent webhook/postback.  If you are still unable to find the correct wehbook/postback record, please contact [support@branch.io](mailto:support@branch.io).


#### How to Find a Partner’s Webhook Key

In order to filter the webhook records by partner to validate the postback is firing correctly, you need to find the partner’s webhook key.

To find the partner’s webhook key:

1. In the left-hand navigation, under **Channels & Links**, click **Ads** and then **Partner Management**.
2. Search for the corresponding partner and click on it to select it.
3. Once the partner is selected and you’re viewing the **AdPartner Settings** page, look to the URL window of your browser where you will find the URL of the current Branch dashboard page.
4. The partner webhook key is the first parameter after `/partner-management/` and begins with `a_`; e.g. `a_youappi`.

![image](/_assets/img/pages/resources/partner-webhook-key.png)
