!!! warning "BETA Only"
	Tracking impression-level revenue data in your Branch account is currently in BETA.  Please contact your MoPub account representative to have this feature enabled in your account.

## Overview

MoPub’s impression-level revenue data solution (ILRD) enables publishers to leverage data to better understand their users and optimize paid acquisition by providing the following benefits:

- **Access to user revenue data at the impression level**: Revenue data in real-time once an ad impression is triggered; including a number of other data fields such as the demand source, ad placement, currency, and country information.

- **Clarity into revenue precision**: Flag indicating whether revenue is exact or estimated, giving publishers more visibility into the data.

- **Data ingestion and processing flexibility**: Process the data yourself or send it to third party partners for deeper analysis and reporting.

By completing the following, you can view your MoPub Impression-level Revenue Data in your Branch dashboard as a “Purchase” commerce event for further analysis and export.

!!! info "Things to Keep in Mind"
	- Volumes can be very high depending on your traffic. If you have any concerns, please reach out to your Account Manager for further details.

	- If you already recording purchase commerce events, you can create a custom event with custom data to track the ILRD from MoPub instead by editing the code snippets below.

## Requirements

- [x] Contact your MoPub account representative to have this feature enabled in your account
- [x] MoPub SDK 5.7.0
- [x] Branch-specific Listener Code Implemented in Your App
- [x] Branch SDK using v2 events
	- [x] iOS SDK v0.21.9+
	- [x] Android SDK v2.14+

## Branch-specific Listener Code Samples

In order for Branch to receive impression-level revenue data from MoPub, you must include listeners into your app to send this data to Branch. Please use the below-referenced code samples when implementing the listener into your app.

Please refer to MoPub’s [developer documentation](https://developers.mopub.com/publishers/best-practices/ilrd-guide/#enable-ilrd) for more detail.

### Android Code

MoPub SDK v5.7.0 and above has the public interface, `ImpressionListener`. This listener is notified when an impression is fired for any format of ad shown.

```
protected void trackMoPubImpression(ImpressionData impression) {
        BranchEvent event = new BranchEvent(BRANCH_STANDARD_EVENT.PURCHASE);
        event.setRevenue(impression.getPublisherRevenue());
        event.setDescription(impression.getAdGroupType());


        String precision = impression.getPrecision();
        String json = impression.getJsonRepresentation().toString();
        String encodedJson = Base64.encodeToString(json.getBytes(), Base64.DEFAULT);

        event.addCustomDataProperty("precision", precision);
        event.addCustomDataProperty("mopub_ad_information", encodedJson);

        // modify with appropriate context
        event.logEvent(getApplicationContext());
    }
```

### iOS Code

There are two approaches to receive Impression data, one is register to `NSNotificationCenter` to receive impression data and the other approach is to set the impression callback delegate which is the most convenient way for publishers to receive callback for every impression.

A unified ad delegate is used by all formats except for rewarded video, which uses `MPRewardedVideoDelegate`.

```
- (void)trackMoPubImpression:(MPImpressionData *)data {

    BranchEvent *event = [BranchEvent standardEvent:BranchStandardEventPurchase];
    event.revenue = [NSDecimalNumber decimalNumberWithDecimal:[data.publisherRevenue decimalValue]];
    event.eventDescription = data.adGroupType;

    NSString *precision = [NSNumber numberWithInteger:data.precision].stringValue;
    NSString *json = [data.jsonRepresentation base64EncodedStringWithOptions:0];
    if (json && precision) {
        event.customData = (NSMutableDictionary *) @{ @"precision": precision, @"mopub_ad_information": json };
    }
    [event logEvent];
}
```

## MoPub <> Branch Data Mappings

| MoPub Parameter    | Branch PURCHASE parameter        |
|--------------------|----------------------------------|
| publisher_revenue  | revenue                          |
| precision          | custom_data.precision            |
| adgroup_type       | eventDescription                 |
| [entire JSON blob] | custom_data.mopub_ad_information |


## ILRD in Reporting & Exports

As MoPub impression-level revenue data is imported as a standard purchase commerce event:

- The revenue value is provided in your Ads Analytics and Cohorts reporting.

- Postbacks & Exports include the entire JSON blob provided by MoPob within Branch custom_data for the PURCHASE commerce event.

- NOTE: Revenue value will be a base64 encoded string.
