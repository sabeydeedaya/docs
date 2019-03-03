---
title: Field-by-field guide for migrating from legacy webhooks (old)
---

# Field-by-field guide for migrating from legacy webhooks

## Introduction

Branch will completely discontinue the functionality of its legacy Export API on in the future. Before then, we are advising all partners using webhooks to switch to our new webhooks.

This document is a guide to help you understand the differences in structure between the legacy and current webhooks. We will use two examples: a click and an install. In the legacy webhook format, these were fairly different (read: inconsistent, messy). In the current webhook format, clicks and installs share the same format.

The following is a field-by-field guide for moving from the legacy webhooks to the new webhooks.

## Case 1: Clicks

Clicks in our legacy system included events that wouldn't strictly be considered clicks, such as views of a deepview. In Branch's new analytics system, these are clearly separated into different topics.

This example is focused on a click as opposed to a deepview view, etc.

### Legacy click request body

```json
{
  "metadata": {
    "ip": "18.144.35.70",
    "userAgent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5X Build/MDA89E) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36",
    "brand": "LG",
    "model": "Nexus 5",
    "type": "mobile",
    "os": "Android",
    "os_version": "6.0",
    "browser": "Mobile Safari",
    "is_mobile": "true"
  },
  "os": "Android",
  "click_id": 540565867979576184,
  "os_version": "6.0",
  "query": {
    "machine_name": "a_a4g",
    "$3p": "a_a4g",
    "beta_min": "",
    "_branch_match_id": "540565867908273666",
    "referrer": "link_click_id%3D540565867908273666%26utm_source%3Da4g%231%26utm_campaign%3Da4g%231%26utm_feature%3Dpaid%20advertising",
    "_t": "540565867908273666"
  },
  "link_data": {
    "date_ms": 1498681928532,
    "date_sec": 1498681928,
    "date": "2017-06-28T20:32:08.532Z",
    "data": {
      "$3p": "a_a4g",
      "machine_name": "a_a4g",
      "~feature": "paid advertising",
      "$link_title": "A4G #1",
      "~id": "408708508817796747",
      "~campaign": "a4g#1",
      "~channel": "a4g#1",
      "$android_deepview": "branch_default",
      "~keyword": "DLA-2295",
      "~advertising_partner_name": "A4G",
      "+click_timestamp": 1530119172,
      "_branch_match_id": "540565867908273666",
      "$desktop_deepview": "branch_default",
      "+url": "https://gm2g.app.link/DjCmNEi3lE?machine_name=a_a4g&%243p=a_a4g&tags=alc&tags=201806270941&tags=deepview&tags=Android&%7Echannel=ddltkmsw4vemke6w&_branch_match_id=540565867908273666&referrer=link_click_id%253D540565867908273666%2526utm_source%253Da4g%25231%2526utm_campaign%253Da4g%25231%2526utm_feature%253Dpaid%2520advertising",
      "referrer": "link_click_id%3D540565867908273666%26utm_source%3Da4g%231%26utm_campaign%3Da4g%231%26utm_feature%3Dpaid%20advertising",
      "~tags": [],
      "$one_time_use": false,
      "~branch_ad_format": "App Only",
      "$ios_deepview": "branch_default",
      "beta_min": ""
    },
    "feature": "paid advertising",
    "branch_id": "408708508817796747",
    "domain": "gm2g.app.link",
    "channel": "a4g#1",
    "campaign": "a4g#1",
    "state": 1,
    "tags": []
  },
  "event": "click",
  "event_timestamp": "2018-06-27T17:06:20.227Z"
}
```

### Current click request body

```json
{
  "name": "CLICK",
  "user_data": {
    "os": "ANDROID",
    "os_version": "6.0",
    "environment": "FULL_WEB",
    "platform": "ANDROID_WEB",
    "limit_ad_tracking": false,
    "user_agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5X Build/MDA89E) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36",
    "ip": "18.144.35.70",
    "language": "EN",
    "brand": "LG",
    "model": "Nexus 5",
    "geo_dma_code": 506,
    "browser": "Mobile Safari",
    "geo_country_code": "US"
  },
  "last_attributed_touch_data": {
    "$3p": "a_a4g",
    "~keyword": "DLA-2295",
    "~advertising_partner_name": "A4G",
    "+current_feature": "MOBILE_DEEPVIEWS",
    "~feature": "paid advertising",
    "~campaign": "a4g#1",
    "~branch_ad_format": "App Only",
    "~channel": "a4g#1",
    "+click_timestamp": 1530119172,
    "machine_name": "a_a4g",
    "_branch_match_id": "540565867908273666",
    "+domain": "gm2g.app.link",
    "referrer": "link_click_id%3D540565867908273666%26utm_source%3Da4g%231%26utm_campaign%3Da4g%231%26utm_feature%3Dpaid%20advertising",
    "+url": "https://gm2g.app.link/DjCmNEi3lE?machine_name=a_a4g&%243p=a_a4g&tags=alc&tags=201806270941&tags=deepview&tags=Android&%7Echannel=ddltkmsw4vemke6w&_branch_match_id=540565867908273666&referrer=link_click_id%253D540565867908273666%2526utm_source%253Da4g%25231%2526utm_campaign%253Da4g%25231%2526utm_feature%253Dpaid%2520advertising",
    "$desktop_deepview": "branch_default",
    "$link_title": "A4G #1",
    "$one_time_use": false,
    "$ios_deepview": "branch_default",
    "$android_deepview": "branch_default",
    "+via_features": [
      "ADS"
    ]
  },
  "timestamp": 1530119180227
}
```

### Click field-by-field comparison

#### In both legacy and current click

The following fields exist in both the legacy and current postbacks.

| Description | legacy field location | current field location | sample value |
| -- | -- | -- | -- |
| event type/name | event | name | "click" (legacy) or "CLICK" (current) |
| time of event | event_timestamp | timestamp | "2018-06-27T17:06:20.227Z" (legacy) or 1530119180227 (current) |
| IP address | metadata.ip | user_data.ip | "18.144.35.70" |
| user agent | metadata.userAgent | user_data.user_agent | "Mozilla/5.0 (Linux; Android 6.0; Nexus 5X Build/MDA89E) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36" |
| brand | metadata.brand | user_data.brand | "LG" |
| model | metadata.model | user_data.model | "Nexus 5" |
| OS | (multiple places) os, metadata.os | user_data.os | "Android" (legacy) or "ANDROID" (current) |
| OS version | (multiple places) os_version, metadata.os_version | user_data.os_version | "6.0" |
| browser | metadata.browser | user_data.browser | "Mobile Safari" |
| link data including query params | (multiple places) query, link_data, link_data.data | last_attributed_touch_data | { "foo": "bar" } |
| (link data) campaign (same applies to channel, feature, stage, tags) * | (multiple places) query.~campaign, link_data.data.~campaign, link_data.campaign | last_attributed_touch_data.~campaign | "a4g#1" |
| link id (for Quick Links only) | (multiple places) link_data.branch_id, link_data.data.~id | last_attributed_touch_data.~id | 408708508817796747 |

#### Legacy click removed fields

The following fields in the legacy click postback are no longer supported.

| Description | legacy field location | sample value | substitute if any
| -- | -- | -- | -- |
| "type" | metadata.type | "mobile" | look at user_data.platform, an enum from which you can tell whether the event occurred on mobile |
| "is_mobile" | metadata.is_mobile | "true" | look at user_data.platform, an enum from which you can tell whether the event occurred on mobile |
| click id for tying attributed events back to exact click | click_id | 540565867979576184 | no replacement at present, refer to last_attributed_touch_data on the attributed event instead |
| query params as a separate entity | query | { "$3p": "a_a4g" } | these values are automatically included in the current system's last_attributed_touch_data |
| link id for non-Quick Links | (multiple places) link_data.branch_id, link_data.data.~id | 408708508817796747 | We only expose link-level data for Quick Links - create more Quick Links! |

#### New fields not present in legacy click

The following fields were not present in the legacy click postback but are available in the new system.

| Description | current field location | sample value |
| -- | -- | -- |
| runtime environment where the event occurred, which can distinguish between e.g. full app vs instant app. specified by the client. | user_data.environment | "FULL_WEB", "FULL_APP", "IMESSAGE_APP", or "INSTANT_APP" |
| "platform" - convenience field for distinguishing web vs app, desktop vs mobile, and iOS vs Android | user_data.platform | "DESKTOP_WEB", "IOS_WEB", "IOS_APP", "ANDROID_WEB", "ANDROID_APP", "OTHER", or "ROBOT" |
| whether a user has opted to limit ad tracking | user_data.limit_ad_tracking | true |
| DMA code, based on IP address | user_data.geo_dma_code | 506 |
| Two-letter country code, based on IP address | user_data.geo_country_code | "US" |
| language specified in the user_agent string (or in some cases other headers), specified by the client. | user_data_language | "EN" |

## Case 2: Events (e.g. installs)

Legacy events included many different types of events. In our current system, events are split into many topics:

* open
* install
* reinstall
* web session start
* pageview
* commerce event
* custom event
* content event
* user lifecycle event

Read more about that [here](dashboard/people-based-attribution/).

As an example, here we focus on an example install event.

### Legacy event request body

```json
{
  "limited_ad_tracking_status": "1",
  "metadata": {
    "reinstall": false,
    "ip": "18.144.35.70",
    "referred": true
  },
  "os": "iOS",
  "os_version": "10.0",
  "session_referring_click_query": {
    "__branch_flow_type": "viewapp",
    "__branch_flow_id": "540565559746262959",
    "__branch_mobile_deepview_type": "1",
    "~click_id": "594174602",
    "tt_adv_id": "800031976",
    "tt_adv_sub": "3inssblx",
    "$aaid": "",
    "$idfa": "27AFDDCC-15DA-3A32-EF33-D0469D36A673",
    "$3p": "a_taptica",
    "tags": "alc",
    "machine_name": "a_taptica"
  },
  "first_referring_click_timestamp": "2018-06-27T17:04:59.258Z",
  "event_timestamp": "2018-06-27T17:06:05.665Z",
  "ad_tracking_enabled": "true",
  "session_referring_click_timestamp": "2018-06-27T17:04:59.258Z",
  "session_referring_click_id": 540565559746262959,
  "first_referring_link_data": {
    "date_ms": 1504818497868,
    "date_sec": 1504818497,
    "date": "2017-09-07T21:08:17.868Z",
    "data": {
      "$3p": "a_taptica",
      "~advertising_partner_name": "Taptica",
      "~click_id": "594174602",
      "+click_timestamp": 1530119099,
      "machine_name": "a_taptica",
      "~feature": "paid advertising",
      "taptica": "testing",
      "+url": "https://gm2g.app.link/xcLwHN3VfG?%7Eclick_id=594174602&tt_adv_id=800031976&tt_adv_sub=3inssblx&%24idfa=27AFDDCC-15DA-3A32-EF33-D0469D36A673&%243p=a_taptica&tags=alc&machine_name=a_taptica",
      "$desktop_deepview": "branch_default",
      "~tags": [
        "alc"
      ],
      "tt_adv_sub": "3inssblx",
      "$link_title": "Taptica #1",
      "$idfa": "27AFDDCC-15DA-3A32-EF33-D0469D36A673",
      "$aaid": "",
      "$one_time_use": false,
      "~id": "434447146129992167",
      "~campaign": "taptica#1",
      "~branch_ad_format": "App Only",
      "~channel": "taptica#1",
      "$ios_deepview": "branch_default",
      "tt_adv_id": "800031976",
      "$android_deepview": "branch_default"
    },
    "feature": "paid advertising",
    "branch_id": "434447146129992167",
    "channel": "taptica#1",
    "campaign": "taptica#1",
    "state": 1,
    "tags": [
      "alc"
    ]
  },
  "event": "install",
  "session_referring_link_data": {
    "date_ms": 1504818497868,
    "date_sec": 1504818497,
    "date": "2017-09-07T21:08:17.868Z",
    "data": {
      "$3p": "a_taptica",
      "~advertising_partner_name": "Taptica",
      "~click_id": "594174602",
      "+click_timestamp": 1530119099,
      "machine_name": "a_taptica",
      "~feature": "paid advertising",
      "taptica": "testing",
      "+url": "https://gm2g.app.link/xcLwHN3VfG?%7Eclick_id=594174602&tt_adv_id=800031976&tt_adv_sub=3inssblx&%24idfa=27AFDDCC-15DA-3A32-EF33-D0469D36A673&%243p=a_taptica&tags=alc&machine_name=a_taptica",
      "$desktop_deepview": "branch_default",
      "~tags": [
        "alc"
      ],
      "tt_adv_sub": "3inssblx",
      "$link_title": "Taptica #1",
      "$idfa": "27AFDDCC-15DA-3A32-EF33-D0469D36A673",
      "$aaid": "",
      "$one_time_use": false,
      "~id": "434447146129992167",
      "~campaign": "taptica#1",
      "~branch_ad_format": "App Only",
      "~channel": "taptica#1",
      "$ios_deepview": "branch_default",
      "tt_adv_id": "800031976",
      "$android_deepview": "branch_default"
    },
    "feature": "paid advertising",
    "branch_id": "434447146129992167",
    "channel": "taptica#1",
    "campaign": "taptica#1",
    "state": 1,
    "tags": [
      "alc"
    ]
  },
  "hardware_id": "27AFDDCC-15DA-3A32-EF33-D0469D36A673"
}
```

### Current event request body

```json
{
  "name": "INSTALL",
  "deep_linked": "true",
  "user_data": {
    "os": "IOS",
    "os_version": "10.0",
    "environment": "FULL_APP",
    "platform": "IOS_APP",
    "idfa": "27AFDDCC-15DA-3A32-EF33-D0469D36A673",
    "limit_ad_tracking": false,
    "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_0 like Mac OS X) AppleWebKit/602.1.32 (KHTML, like Gecko) Version/10.0 Mobile/14A5261v Safari/602.1",
    "ip": "18.144.35.70",
    "language": "EN",
    "sdk_version": "0.20.2",
    "app_version": "1.2.3",
    "brand": "Apple",
    "model": "iPhone8,1",
    "geo_dma_code": 506,
    "geo_country_code": "US"
  },
  "last_cta_view_data": {
    "$3p": "a_taptica",
    "~advertising_partner_name": "Taptica",
    "~feature": "paid advertising",
    "~branch_ad_format": "App Only",
    "~campaign": "taptica#1",
    "~channel": "taptica#1",
    "~click_id": "594174602",
    "+click_timestamp": 1530119099,
    "machine_name": "a_taptica",
    "taptica": "testing",
    "+domain": "gm2g.app.link",
    "$desktop_deepview": "branch_default",
    "+url": "https://gm2g.app.link/xcLwHN3VfG?%7Eclick_id=594174602&tt_adv_id=800031976&tt_adv_sub=3inssblx&%24idfa=27AFDDCC-15DA-3A32-EF33-D0469D36A673&%243p=a_taptica&tags=alc&machine_name=a_taptica",
    "tt_adv_sub": "3inssblx",
    "$link_title": "Taptica #1",
    "$idfa": "27AFDDCC-15DA-3A32-EF33-D0469D36A673",
    "$one_time_use": false,
    "$ios_deepview": "branch_default",
    "tt_adv_id": "800031976",
    "$android_deepview": "branch_default",
    "~tags": [
      "alc"
    ]
  },
  "last_attributed_touch_timestamp": 1532725477000,
  "last_attributed_touch_data": {
    "$3p": "a_taptica",
    "~advertising_partner_name": "Taptica",
    "~feature": "paid advertising",
    "~branch_ad_format": "App Only",
    "~campaign": "taptica#1",
    "~channel": "taptica#1",
    "~click_id": "594174602",
    "+click_timestamp": 1530119099,
    "machine_name": "a_taptica",
    "taptica": "testing",
    "+domain": "gm2g.app.link",
    "$desktop_deepview": "branch_default",
    "+url": "https://gm2g.app.link/xcLwHN3VfG?%7Eclick_id=594174602&tt_adv_id=800031976&tt_adv_sub=3inssblx&%24idfa=27AFDDCC-15DA-3A32-EF33-D0469D36A673&%243p=a_taptica&tags=alc&machine_name=a_taptica",
    "tt_adv_sub": "3inssblx",
    "$link_title": "Taptica #1",
    "$idfa": "27AFDDCC-15DA-3A32-EF33-D0469D36A673",
    "$one_time_use": false,
    "$ios_deepview": "branch_default",
    "tt_adv_id": "800031976",
    "$android_deepview": "branch_default",
    "~tags": [
      "alc"
    ],
    "+via_features": [
      "ADS",
      "MOBILE_DEEPVIEWS"
    ]
  },
  "timestamp": 1530119165665
}
```

### Install field-by-field comparison

#### In both legacy and current event

The following fields exist in both the legacy and current postbacks.

| Description | legacy field location | current field location | sample value |
| -- | -- | -- | -- |
| event type/name | event | name | "install" (legacy) or "INSTALL" (current) |
| time of event | event_timestamp | timestamp | "2018-06-27T17:06:05.665Z" (legacy) or 1530119165665 (current) |
| whether a user has opted to limit ad tracking | (multiple locations) limited_ad_tracking_status, ad_tracking_enabled | user_data.limit_ad_tracking | "1", "true" (legacy), false (current) |
| IP address | metadata.ip | user_data.ip | "18.144.35.70" |
| whether this event was driven by a deep link | metadata.referred | deep_linked | true |
| OS | os | user_data.os | "Android" (legacy) or "ANDROID" (current) |
| OS version | os_version | user_data.os_version | "6.0" |
| link data including query params | (multiple places) session_referring_click_query, session_referring_link_data, session_referring_link_data.data | last_attributed_touch_data | { "foo": "bar" } |
| (link data) campaign (same applies to channel, feature, stage, tags) * | (multiple places) session_referring_click_query.~campaign, session_referring_link_data.data.~campaign, session_referring_link_data.campaign | last_attributed_touch_data.~campaign | "a4g#1" |
| link id (for Quick Links only) | (multiple places) session_referring_link_data.branch_id, session_referring_link_data.data.~id | last_attributed_touch_data.~id | 408708508817796747 |
| time of last touch (e.g. click) | session_referring_click_timestamp | last_attributed_touch_timestamp | "2018-06-27T17:04:59.258Z" (legacy) or 1531773474130 (current) |
| advertising id | hardware_id | (multiple places) user_data.idfa, user_data.aaid, user_data.idfv, user_data.android_id | "27AFDDCC-15DA-3A32-EF33-D0469D36A673" (example of an IDFA) |

#### Legacy event removed fields

The following fields in the legacy event postback are no longer supported.

| Description | legacy field location | sample value | substitute if any
| -- | -- | -- | -- |
| whether this is a reinstall | metadata.reinstall | false | No longer needed. By definition, in the current system, reinstalls are separated from installs and published to a completely separate pipeline with name "REINSTALL" |
| first referring link data | first_referring_click_timestamp, first_referring_link_data | {} | no replacement at present, as our attribution model is based on last click. Instead look at last_attributed_touch_data for the last click. |
| click id for tying attributed events back to exact click | session_referring_click_id | 540565867979576184 | no replacement at present, refer to last_attributed_touch_data instead |
| query params as a separate entity | session_referring_click_query | { "$3p": "a_a4g" } | these values are automatically included in the current system's last_attributed_touch_data |
| link id for non-Quick Links | (multiple places) session_referring_link_data.branch_id, session_referring_link_data.data.~id | 408708508817796747 | We only expose link-level data for Quick Links - create more Quick Links! |

#### New fields not present in legacy event

The following fields were not present in the legacy event postback but are available in the new system.

| Description | current field location | sample value |
| -- | -- | -- |
| runtime environment where the event occurred, which can distinguish between e.g. full app vs instant app. specified by the client. | user_data.environment | "FULL_WEB", "FULL_APP", "IMESSAGE_APP", or "INSTANT_APP" |
| "platform" - convenience field for distinguishing web vs app, desktop vs mobile, and iOS vs Android | user_data.platform | "DESKTOP_WEB", "IOS_WEB", "IOS_APP", "ANDROID_WEB", "ANDROID_APP", "OTHER", or "ROBOT" |
| user agent |  user_data.user_agent | "Mozilla/5.0 (Linux; Android 6.0; Nexus 5X Build/MDA89E) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36" |
| Two-letter country code, based on IP address | user_data.geo_country_code | "US" |
| language specified in the user_agent string (or in some cases other headers), specified by the client. | user_data_language | "EN" |
| Branch SDK version | user_data.sdk_version | "0.20.2" |
| App version | user_data.app_version | "1.2.3" |
| brand | user_data.brand | "LG" |
| model | user_data.model | "Nexus 5" |
| DMA code, based on IP address | user_data.geo_dma_code | 506 |
| Two-letter country code, based on IP address | user_data.geo_country_code | "US" |
