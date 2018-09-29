# View Apple Search Ads Cost Data

## Overview

![Apple_Search_Ads](https://cdn.branch.io/branch-assets/ad-partner-manager/388787843096400122/search_ads-1528501330030.png)

See your **[Apple Search Ad](https://searchads.apple.com/)** cost data in your Branch dashboard to see your campaign ROI in a single place.

+ [Apple Search Ads](https://searchads.apple.com/)
+ [Apple Search Ads for Developers](https://developer.apple.com/app-store/search-ads/)
+ [Apple Search Ads WWDC](https://developer.apple.com/videos/play/wwdc2016/302/)

## Setup

1. Request access to the Cost Data beta through your account manager and it will be enabled in your dashboard.
1. Navigate to the [Apple Search Ads UI > Settings > API](https://app.searchads.apple.com/cm/app/settings/apicertificates){:target="_blank"}. *Verify you have selected the correct account by using the account selector in the top right hand corner.*

    ![image](/img/pages/deep-linked-ads/apple-search/apple-api-screen.png)

1. Create an API certificate

    ![image](/img/pages/deep-linked-ads/apple-search/apple-search-api.png)

1. Download the API certificate to your computer. You'll unzip the folder and get one `.key` and one `.pem` file.

    ![image](/img/pages/deep-linked-ads/apple-search/apple-download-certs.png)

1. Navigate to the [Apple Search Ads partner manager](https://dashboard.branch.io/ads/partner-management/a_apple?tab=settings){:target="_blank"} in the Branch dashboard. 
1. Upload the certificates there, selecting each file, and then clicking the blue upload arrow to upload the files. Click *Next* to continue.

    ![image](/img/pages/deep-linked-ads/apple-search/apple-upload-certs.png)

1. Select the organizations for which you would like to ingest data and click *Save* to enable Apple Search Ads with Cost Data.

{! ingredients/deep-linked-ads/cost-data.md !}

## Support

### "Next" button not clickable

Please ensure you've both selected the correct files *and* pressed the blue upload arrows to complete your upload.

### Cost, click and impression data not appearing

Verify that you have selected the right certificates:

- *Did you create the certificate for the right accounts?* You can toggle the accounts that you are viewing in the top right hand side of the Apple Search Ads UI.
- *Does your certificate have relevant permissions?* Your certificate must have read-only permissions or higher to retrieve Apple Search Ads data.

Still not working? Try downloading a new certificate and uploading that to Branch.

### Cost data not matching the Apple Search Ads dashboard

The Apple Search Ads dashboard is fixed to a specific time zone. Please ensure that you've selected the same time zone in your Apple Search Ads dashboard and your Branch dashboard.

### CPI metric doesn't match between Apple Search Ads and Branch, although cost metric does

The Apple Search Ads Attribution API can cause discrepancies in install counts that in turn cause discrepancies in CPI metrics. Verify whether your cost and install metrics match the Apple Search Ads dashboard. If there is an install discrepancy, it could be caused by one of the [common sources of install discrepancies](/pages/deep-linked-ads/apple-mobile-tracking/#install-discrepancies-when-compared-with-apple-search-ads-dashboard).


