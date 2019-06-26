## Overview

![Facebook](https://cdn.branch.io/branch-assets/ad-partner-manager/386574786681131050/Facebook-Logo-PNG-Clipart-1528503483289.png)

Branch links can be used together with **[Facebook](http://facebook.com/)**  ads, allowing you to track ad-driven installs on the Branch dashboard and deep link those new users directly to content the first time they open your app. Refer to [Facebook's Ad Guide](https://www.facebook.com/business/ads-guide){:target="\_blank"} to learn more.

Facebook's Ad Platform supports numerous campaign types and a shared set of advertisement formats. To help you navigate Facebook's Advertisement Platform we created this guide detailing how to use Branch links in all major Facebook ad types.

## Supported Facebook Ad Campaigns

This documentation supports the following Facebook Ad Campaigns:

Facebook Campaign Category | Campaign Type/Objective | Link users to | Branch Documentation Link | Branch Ad Format
--- | --- | --- | --- | ---
Awareness | Brand Awareness | Web | **[link](/deep-linked-ads/facebook-platform-ads/#brand-awareness-campaign-setup)** | Cross-platform Display
Awareness | Reach | Web | **[link](/deep-linked-ads/facebook-platform-ads/#reach-campaign-setup)** | Cross-platform Display
Consideration | Traffic | Web or App | **[link](/deep-linked-ads/facebook-traffic-conversion-ads/#traffic-campaign-setup)** | Cross-platform Display
Consideration | App Installs | App | **[link](/deep-linked-ads/facebook-app-install-ads/)** | App Only: Installs
Consideration | Video Views | Web | **[link](/deep-linked-ads/facebook-platform-ads/#video-views-campaign-setup)** | Cross-platform Display
Consideration | Lead Generation | Web x | **[link](/deep-linked-ads/facebook-platform-ads/#lead-generation-campaign-setup)** | Cross-platform Display
Conversion | Conversions | Web or App | **[link](/deep-linked-ads/facebook-traffic-conversion-ads/#conversions-campaign-setup)** | Cross-platform Display
Conversion | Product Catalogue Sales | Web or App | **[link](/deep-linked-ads/facebook-dynamic-ads/)** | Cross-platform Product Links

[x] Facebook has indicated that links are not supported in all placements.

## Sharing Facebook Data

There are many ways to access data pertaining to Facebook.

You can see analytics on impressions, clicks, installs, opens and conversion events on various pages of the [Branch Dashboard](https://dashboard.branch.io){:target="\_blank"}, as well as the [Query API](/exports/query-api).

### Facebook's Advanced Mobile Measurement Agreement

If you have signed Facebook's ["Advanced Mobile Measurement" agreement ("Data Use Terms for Advanced Mobile App Measurement")](https://www.facebook.com/ads/manage/advanced_mobile_measurement/tos), then you can get device level data out via:

- [Webhooks](/exports/ua-webhooks/)
- [Data Export API](/exports/api-v3/)
- [CSV Exports](https://dashboard.branch.io/data-import-export/csv-exports)

!!! warning " Agreement not Signed"
	If you have not signed this agreement, any event attributed to a Facebook ad will look like an organic event when accessed via Webhooks, the Data Export API, and CSV Exports.

### Data Limitations

- [x] We cannot send device-level Facebook attribution data to third parties.
- [x] We cannot send events attributed to Facebook via Data Integrations. Please instead consider analyzing this data in-house (using Webhooks, the Data Export API, or CSV Exports), or using the Branch Dashboard for all of your analytics and attribution needs.
- [x] This data is also not returned in the deeplink initSession callback within the app. If you have analytics needs that are not met by the Branch Dashboard, please [contact us](https://support.branch.io/support/tickets/new) and include "Facebook MMP + Feature Request" in the subject.

| **Branch feature** | **Facebook data included** |
| - | - |
| [Dashboard visualizations](https://dashboard.branch.io/){:target="\_blank"} | Pre-aggregated analytics |
| [Query API](/exports/query-api/) | Pre-aggregated analytics |
| [Liveview](https://dashboard.branch.io/liveview){:target="\_blank"} | Device-level analytics x |
| [Data Export API](/exports/api-v3/) | Device-level analytics x |
| [CSV Exports](https://branch.dashboard.branch.io/data-import-export/csv-exports){:target="\_blank"} | Device-level analytics x |
| [Webhooks](/exports/ua-webhooks/) | Device-level analytics x |
| [Data Integrations](/integrations/data-integrations/) | Not supported |

[x] You must have signed you have signed Facebook's ["Advanced Mobile Measurement" agreement ("Data Use Terms for Advanced Mobile App Measurement")](https://www.facebook.com/ads/manage/advanced_mobile_measurement/tos) to view this data.

Here is the page where you can see which ad accounts have signed the AMM agreement:

![AMM](/_assets/img/pages/deep-linked-ads/facebook-ads-faq/amm.png)

## Troubleshooting

We also have a document with [FAQs and Advanced Options](/deep-linked-ads/facebook-ads-faq/) for Facebook Ads. We recommend starting with one of the guides above, then jumping into the FAQ and Advanced Options when you have questions or need to troubleshoot.
