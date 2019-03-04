An essential part of the Universal Ad Partners verification process is to confirm that the integration works as expected and we deliver the best user experience. This enables Branch to guarantee the highest quality of Ad Partnership integrations and verify data accuracy.

Once we've provided you with the Click/Impression Tracking URLs via email, please follow the steps below so we can verify that postback URLs are coming through correctly on your end.

## Click Tracking & Postback URL Testing

1. Add the previously emailed tracking link to your system to generate a *ClickID* and other *parameters* specified in the Branch tracking URL, e.g.: `https://branchster.app.link/bKzQX2KCcS?%243p=partner_id&~click_id={clickid}&parameter1={XXX}&parameter2={YYY}&parameter3={ZZZ}`
2. Click on the tracking URL that now contains the filled key-value parameters.
3. You'll be redirected to web page with Branch Monster Factory application.
4. Please initiate the following actions - *Install*, *Open* and *Purchase* events - following the guide specifications below.
5. Once we register those events, we will pass to you a predefined postback with populated parameters.
6. Please check your system to ensure we passed the correct postback parameters back to you.
7. Notify us via email to verify integration.

Please refer to the following screenshots below based on the iOS and Android Mobile Platforms per Event Type:

## Test application - Branch Monster Factory

iOS:https://itunes.apple.com/us/app/branch-monster-factory/id917737838?mt=8
Android: https://play.google.com/store/apps/details?id=io.branch.branchster


## INSTALL

### Android
Tap on the test click URL.
At the bottom of page click on `Install Full App` to install the Branch Monster Factory app.
You will be redirected to Google Play Store. Click on `Install` button to initiate INSTALL event

![image](/_assets/img/pages/deep-linked-ads/partner-resources/test-install-android.png)

### iOS
Tap on the test click URL. The iOS prompts to open in App Store.
When redirected to App Store click on the `Cloud` download icon. Once the app is installed the INSTALL event  initiated.

![image](/_assets/img/pages/deep-linked-ads/partner-resources/test-install-ios.png)

## OPEN

### Android
To open the Branch Monster Factory app, find it on your Phone or navigate to Google Play and click the `Open` button. Once the Branch Monster Factory app opens, the OPEN event is initiated.

![image](/_assets/img/pages/deep-linked-ads/partner-resources/test-open-android.png)

### iOS
Make sure the Branch Monster Factory app is installed. Find it on your phone or tap on `Open` button in App Store
Once Monster Factory app opened the OPEN event initiated.

![image](/_assets/img/pages/deep-linked-ads/partner-resources/test-open-ios.png)


## PURCHASE

### Android
Open the installed Branch Monster Factory app and tap on the `Share` icon. The share window pops up with multiple options. Tap on the `Copy to clipboard` item. When you see the `Copied to clipboard` notice, the PURCHASE event is initiated.

![image](/_assets/img/pages/deep-linked-ads/partner-resources/test-purchase-android.png)

### iOS
Open the installed Branch Monster Factory app and tap on the `Share Your Monster` link at the bottom. The share window pops up with multiple options. Tap on the `Copy` item. When you see the `Copied to clipboard` notice , the PURCHASE event initiated.

![image](/_assets/img/pages/deep-linked-ads/partner-resources/test-purchase-ios.png)
