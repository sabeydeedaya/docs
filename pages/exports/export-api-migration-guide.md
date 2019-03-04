---
title: Field-by-field guide for migrating from legacy Export API (old)
---

# Field-by-field guide for migrating from legacy Export API

## Introduction

Branch will completely discontinue the functionality of its legacy Export API on in the future. Before then, we are advising all partners using this API to switch to our new [Export API](/exports/api-v3/#search).

This document is a guide to help you understand the differences in structure between the legacy and current Export API. We will use two examples: a click and an install. In the legacy format, click & install were fairly different (read: inconsistent, messy). In the current Export API format, clicks and installs share the same format.

Note: please do not assume the position of the columns is fixed. Branch will occasionally add additional data to exports! Columns may also be re-ordered to to internal changes. Make sure your ETL jobs load data based on column name, not column position.

The following is a field-by-field guide for moving from the legacy Export API to the new Export API.

## Case 1: Clicks

Clicks in our legacy system included events that wouldn't strictly be considered clicks, such as views of a deepview. In Branch's new analytics system, these are clearly separated into different topics.

This example is focused on a click as opposed to a deepview view, etc.

### Comparison

| legacy field name | legacy sample value | current field name | current sample value | notes |
| -- | -- | -- | -- | -- |
|- | - | id | 545393003749720048 | - |
|- | - | name | CLICK | - |
|click_timestamp | 2018-07-11T00:47:31 | timestamp_iso | 2018-07-11 00:47:31+0000 | - |
|- | - | timestamp | 1531270051599 | - |
|- | - | origin | BRANCH | - |
|branch_link_click_id | 545393003720359919 | - | - | Branch internal only field, removed. See di_match_click_token for similar functionality (for Data Integrations only) |
|branch_browser_fingerprint_id | 545393003690999790 | - | - | Branch internal only field, removed |
|os | Android | user_data_os | ANDROID | - |
|os_version | 6 | user_data_os_version | 6 | - |
|model | iPhone | user_data_model | - | - |
|browser | Chrome | user_data_browser | - | - |
|user_agent | Mozilla/5.0 (Linux; Android 6.0; M6 Lite Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.85 Mobile Safari/537.36 | user_data_user_agent | Mozilla/5.0 (Linux; Android 6.0; M6 Lite Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.85 Mobile Safari/537.36 | - |
|ip_address | 1.1.1.1 | user_data_ip | 1.1.1.1 | - |
|stage | MOBILE_CLICK | - | - | Branch internal only field, removed |
|sms_from_desktop | False | - | - | - |
|phone_number | - | - | PII, removed |
|redirect_method | MOBILE_CHROME_INTENT_307 | - | - | Branch internal only field, removed |
|link_creation_timestamp | 2018-05-07T22:51:49 | - | - | - |
|link_channel | Website | last_attributed_touch_data_tilde_channel | Website | - |
|link_feature | marketing | last_attributed_touch_data_tilde_feature | marketing | - |
|link_campaign | Red Carpet | last_attributed_touch_data_tilde_campaign | Red Carpet | - |
|- | - | last_attributed_touch_data_tilde_campaign_id | 12345 | - |
|link_stage | example stage | last_attributed_touch_data_tilde_stage | example stage | - |
|link_tags | [] | last_attributed_touch_data_tilde_tags | [] | - |
|- | - | last_attributed_touch_data_tilde_advertising_partner_name | GlobalWide Media | - |
|- | - | last_attributed_touch_data_tilde_secondary_publisher | 11888499 | - |
|- | - | last_attributed_touch_data_tilde_creative_name | BranchAds88 | - |
|- | - | last_attributed_touch_data_tilde_creative_id | 1027999 | - |
|- | - | last_attributed_touch_data_tilde_ad_set_name | BranchAdSet88 | - |
|- | - | last_attributed_touch_data_tilde_ad_set_id | 44546866099 | - |
|- | - | last_attributed_touch_data_tilde_ad_name | BranchAd88 | - |
|- | - | last_attributed_touch_data_tilde_ad_id | 6667999 | - |
|- | - | last_attributed_touch_data_plus_current_feature | QUICK_LINKS | - |
|- | - | last_attributed_touch_data_plus_via_features | ["QUICK_LINKS"] | - |
|- | - | last_attributed_touch_data_dollar_3p | a_globalwide_media | - |
|- | - | last_attributed_touch_data_plus_web_format | AMP | - |
|- | - | last_attributed_touch_data_tilde_keyword | +keyword1 +keyword2 | - |
|link_data | {"$og_app_id":"1633239056950945","~campaign":"Red Carpet","$android_url":"https:\/\/example.com\/learn-more","~creation_source":1.0,"$og_title":"Example \u00b7 Learn More”,”~tags”:[],"~stage":"example stage”,”~channel":"Website","~feature":"marketing","$desktop_url":"https:\/\/www.example.com\/api\/v2_0\/user\/transitionToMix?auto=true&userid=auto&from=pdstatic","$og_description":"","$one_time_use":false,"+click_timestamp":1531270051.0,"+referrer":"https:\/\/www.example.com\/transition","$marketing_title":"Example","~marketing":true,"~id":"522171064433131572","$ios_url":"https:\/\/example.com\/learn-more","+domain":"abcd.app.link","+url":"https:\/\/abcd.app.link\/transition","+alias":"transition"} | last_attributed_touch_data_custom_fields | {"$og_title":"Example","$marketing_title":"Example","~creation_source":1,"+referrer":"https:\/\/www.example.com\/transition","+click_timestamp":1531270051,"+alias":"transition","+domain":"abcd.app.link","$og_app_id":"1633239056950945","+url":"https:\/\/abcd.app.link\/transition","$desktop_url":"https:\/\/www.example.com\/api\/v2_0\/user\/transitionTo?auto=true&userid=auto&from=pdstatic","~marketing":true,"$one_time_use":false,"$ios_url":"https:\/\/example.com\/learn-more"} | legacy “link_data” includes all fields (duplicating many of the fields already in the CSV). new “last_attributed_touch_data_custom_fields” only includes fields that have not already been split out. For example, “last_attributed_touch_data_custom_fields” does not include “~campaign”, since that was already split out as “last_attributed_touch_data_tilde_campaign” |
|link_creation_source | Dashboard | - | - | Branch internal only field, removed |
|link_url | https://abcd.app.link/transition | - | - | see last_attributed_touch_data_custom_fields["+url"] |
|link_branch_identity_id | 522171064433131000 | - | - | Branch internal only field, removed |
|link_id | 522171064433131572 | last_attributed_touch_data_tilde_id | 522171064433131572 | in the new system, this is only present for Quick Links |
|query_params | {} | - | - | Will appear in last_attributed_touch_data_* fields instead |
|branch_device_fingerprint_id | 444171064433131000 | - | - | Branch internal only field, removed |
|hardware_id | 6D92078A-8246-4BA4-AE5B-76104861E7DC | - | - | in the new system, this can be found in user_data_aaid, user_data_idfa, user_data_idfv, or user_data_android_id.  |
|google_advertising_id | 9a726648-a483-4e1d-8a85-08ef90dddddd | user_data_aaid | 9a726648-a483-4e1d-8a85-08ef90dddddd | - |
|device_metadata | {} | - | - | see user_data_* fields instead |
|- | - | user_data_environment | FULL_WEB | - |
|- | - | user_data_platform | ANDROID_WEB | - |
|- | - | user_data_idfa | 6D92078A-8246-4BA4-AE5B-76104861E7DC | - |
|- | - | user_data_idfv | 6D92078A-8246-4BA4-AE5B-76104861E7DC | - |
|- | - | user_data_android_id | 171caed696dddddd | - |
|- | - | user_data_limit_ad_tracking | true | - |
|- | - | user_data_language | EN | - |
| - | - | user_data_geo_country_code | AU | - |
| - | - | user_data_geo_dma_code | 501 | - |
| - | - | di_match_click_token | 545393003720359919 | - |



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

### Comparison

| legacy field name | legacy sample value | current field name | current sample value | notes |
| -- | -- | -- | -- | -- |
| id | 545527767643652573 | id | 545527767643652573 | - |
| name | install | name | INSTALL | - |
| - | - | origin | BRANCH | - |
| metadata | {“reinstall”:false,”ip":"1.1.1.1","referred":true} | - | - | reinstall -> event will be in “Reinstall” CSV file and have name “REINSTALL”; ip -> see user_data_ip; referred -> see deep_linked |
| timestamp | 2018-07-11T09:43:01 | timestamp_iso | 2018-07-11 09:43:01+0000 | - |
| - | - | timestamp | 1531302181873 | - |
| - | - | last_attributed_touch_type | CLICK | old system did not have view through attribution, so this field was unnecessary |
| - | - | days_from_last_attributed_touch_to_event | 0 | days between touch (e.g. click) and event (e.g. install) |
| - | - | hours_from_last_attributed_touch_to_event | 0 | hours between touch (e.g. click) and event (e.g. install). CAPPED AT 24 HOURS, used primarily for detecting anomalous behavior. |
| - | - | minutes_from_last_attributed_touch_to_event | 45 | minutes between touch (e.g. click) and event (e.g. install). CAPPED AT 60 MINUTES, used primarily for detecting anomalous behavior. |
| - | - | seconds_from_last_attributed_touch_to_event | 60 | seconds between touch (e.g. click) and event (e.g. install). CAPPED AT 60 SECONDS, used primarily for detecting anomalous behavior. |
| branch_identity_id | 545527767836000000 | - | - | Branch internal only field, removed |
| developer_identity | user11 | user_data_developer_identity | user11 | - |
| identity_creation_timestamp | 2018-07-11T09:43:01 | - | - | Branch internal only field, removed |
| branch_session_id | 545527767853000000 | - | - | Branch internal only field, removed |
| app_version | 0.5.57 | user_data_app_version | - | - |
| ip_address | 1.1.1.1 | user_data_ip | 1.1.1.1 | - |
| session_start_timestamp | 2018-07-11T09:43:01 | - | - | Branch internal only field, removed |
| branch_device_fingerprint_id | 545527767673000000 | - | - | Branch internal only field, removed |
| device_first_seen_timestamp | 2018-07-11T09:43:01 | - | - | Branch internal only field, removed |
| device_os | iOS | user_data_os | IOS | - |
| device_os_version | 11.4 | user_data_os_version | 11.4 | - |
| device_metadata | {"brand":"Apple","user_agent":"Mozilla\/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit\/605.1.15 (KHTML, like Gecko) Mobile\/15F79","screen_width":"1125","os":"iOS","country_code":"AU","model":"iPhone10,3","ad_tracking_enabled":"false","ios_vendor_id":"6D92078A-8246-4BA4-AE5B-76104861E7DC","screen_height":"2436","os_version":"11.4","local_ip":"10.63.106.107","ip":"211.30.195.4","language_code":"en","hardware_id_type":"VENDOR_ID"} | - | - | see user_data_* instead |
| hardware_id | 6D92078A-8246-4BA4-AE5B-76104861E7DC | - | - | in the new system, this can be found in user_data_aaid, user_data_idfa, user_data_idfv, or user_data_android_id.  |
| google_advertising_id | 9a726648-a483-4e1d-8a85-08ef90dddddd | user_data_aaid | 9a726648-a483-4e1d-8a85-08ef90dddddd | - |
| branch_browser_fingerprint_id | - | - | - | Branch internal only field, removed |
| browser_first_seen_timestamp | - | - | - | Branch internal only field, removed |
| browser_os | - | - | - | see user_data_os (above) |
| browser_os_version | - | - | - | see user_data_os_version (above) |
| user_agent | Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79 | user_data_user_agent | Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79 | - |
| first_referring_click_timestamp | 2018-07-11T09:41:37 | - | - | new system is last touch only. see last_attributed_touch_* instead |
| first_referring_click_query_params | {} | - | - | new system is last touch only. see last_attributed_touch_* instead |
| first_referring_branch_identity_id | - | - | - | new system is last touch only. see last_attributed_touch_* instead |
| first_referring_developer_identity | - | - | - | new system is last touch only. see last_attributed_touch_* instead |
| first_referring_hardware_id | - | - | - | new system is last touch only. see last_attributed_touch_* instead |
| first_referring_branch_link_id | 525772686656477006 | - | - | new system is last touch only. see last_attributed_touch_* instead |
| first_referring_link_creation_timestamp | 2018-05-17T21:23:23 | - | - | new system is last touch only. see last_attributed_touch_* instead |
| first_referring_link_channel | Email | - | - | new system is last touch only. see last_attributed_touch_* instead |
| first_referring_link_feature | marketing | - | - | new system is last touch only. see last_attributed_touch_* instead |
| first_referring_link_campaign | Download Page | - | - | new system is last touch only. see last_attributed_touch_* instead |
| first_referring_link_stage | - | - | - | new system is last touch only. see last_attributed_touch_* instead |
| first_referring_link_tags | ['iOS'] | - | - | new system is last touch only. see last_attributed_touch_* instead |
| first_referring_link_data | {"$og_app_id":"116556461780510","~campaign":"Download Page","~creation_source":1,"~feature":"marketing","$desktop_url":"https:\/\/itunes.apple.com\/app\/id1092817691","$og_description":"All your favorite things. All in one place.","$one_time_use":false,"utm_source":"Mix","$canonical_url":"https:\/\/itunes.apple.com\/us\/app\/mix-discover-collect-share\/id1092817691?mt=8","~marketing":true,"~id":"525772686656477006","utm_medium":"email","$og_type":"website","$android_url":"https:\/\/itunes.apple.com\/app\/id1092817691","$og_title":"Mix - Discover, Collect, Share on the App\u00a0Store","~tags":["iOS"],"~channel":"Email","$marketing_title":"Mix - iOS App","$og_image_url":"https:\/\/is4-ssl.mzstatic.com\/image\/thumb\/Purple115\/v4\/a0\/92\/b3\/a092b32d-853e-7210-0af2-eef35afed912\/AppIcon-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-6.png\/1200x630wa.jpg","$ios_url":"https:\/\/itunes.apple.com\/app\/id1092817691","+click_timestamp":1531302097,"+url":"https:\/\/link.mix.com\/MsxUG9Uc0M?utm_source=Mix&utm_campaign=b616a94743-MC_chrome_extension&utm_medium=email&utm_term=0_4000b11711-b616a94743-128616325","utm_campaign":"b616a94743-MC_chrome_extension","utm_term":"0_4000b11711-b616a94743-128616325"} | - | - | new system is last touch only. see last_attributed_touch_* instead |
| first_referring_link_creation_source | 1 | - | - | new system is last touch only. see last_attributed_touch_* instead |
| first_referring_link_url | https://link.mix.com/MsxUG9Uc0M?utm_source=Mix&utm_campaign=b616a94743-MC_chrome_extension&utm_medium=email&utm_term=0_4000b11711-b616a94743-128616325 | - | - | new system is last touch only. see last_attributed_touch_* instead |
| session_referring_click_timestamp | 2018-07-11T09:41:37 | last_attributed_touch_timestamp_iso | 2018-07-11 09:41:37+0000 | - |
| - | - | last_attributed_touch_timestamp | 1531302097000 | - |
| session_referring_click_query_params | {"utm_source":"Mix","utm_term":"0_4000b11711-b616a94743-128616325","utm_medium":"email","utm_campaign":"b616a94743-MC_chrome_extension"} | - | - | Will appear in last_attributed_touch_data_* fields instead |
| session_referring_branch_identity_id | - | - | - | Branch internal only field, removed |
| session_referring_developer_identity | - | - | - | - |
| session_referring_hardware_id | - | - | - | - |
| session_referring_branch_link_id | 525772686656477006 | last_attributed_touch_data_tilde_id | 525772686656477006 | in the new system, this is only present for Quick Links |
| session_referring_link_creation_timestamp | 2018-05-17T21:23:23 | - | - | - |
| session_referring_link_channel | Email | last_attributed_touch_data_tilde_channel | Email | - |
| session_referring_link_feature | marketing | last_attributed_touch_data_tilde_feature | marketing | - |
| session_referring_link_campaign | Download Page | last_attributed_touch_data_tilde_campaign | Download Page | - |
| - | - | last_attributed_touch_data_tilde_campaign_id | 12345 | - |
| session_referring_link_stage | example stage | last_attributed_touch_data_tilde_stage | example stage | - |
| session_referring_link_tags | ['iOS'] | last_attributed_touch_data_tilde_tags | ["iOS"] | - |
| - | - | last_attributed_touch_data_tilde_advertising_partner_name | GlobalWide Media | - |
| - | - | last_attributed_touch_data_tilde_secondary_publisher | 11888499 | - |
| - | - | last_attributed_touch_data_tilde_creative_name | BranchAds88 | - |
| - | - | last_attributed_touch_data_tilde_creative_id | 1027999 | - |
| - | - | last_attributed_touch_data_tilde_ad_set_name | BranchAdSet88 | - |
| - | - | last_attributed_touch_data_tilde_ad_set_id | 44546866099 | - |
| - | - | last_attributed_touch_data_tilde_ad_name | BranchAd88 | - |
| - | - | last_attributed_touch_data_tilde_ad_id | 6667999 | - |
| - | - | last_attributed_touch_data_plus_current_feature | QUICK_LINKS | - |
| - | - | last_attributed_touch_data_plus_via_features | ["QUICK_LINKS"] | - |
| - | - | last_attributed_touch_data_dollar_3p | a_globalwide_media | - |
| - | - | last_attributed_touch_data_plus_web_format | AMP | - |
| - | - | last_attributed_touch_data_tilde_keyword | +keyword1 +keyword2 | - |
| session_referring_link_data | {"$og_app_id": "116556461780510", "~campaign": "Download Page", "~creation_source": 1, "~feature": "marketing", "$desktop_url": "https://itunes.apple.com/app/example", "$og_description": "Example", "$one_time_use": false, "utm_source": "Example", "$canonical_url": "https://itunes.apple.com/us/app/example", "~marketing": true, "~id": "525772686656477006", "utm_medium": "email", "$og_type": "website", "$android_url": "https://itunes.apple.com/app/example", "$og_title": "Example", "~tags": ["iOS"], "~channel": "Email", "$marketing_title": "Example - iOS App", "$og_image_url": "https://example.com/image/thumb/Purple115/v4/a0/92/b3/a092b32d-853e-7210-0af2-eef35afed912/AppIcon-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-6.png/1200x630wa.jpg", "$ios_url": "https://itunes.apple.com/app/example", "+click_timestamp": 1531302097, "+url": "https://link.example.com/MsxUG9Uc0M?utm_source=Example&utm_campaign=b616a94743-MC_chrome_extension&utm_medium=email&utm_term=0_4000b11711-b616a94743-128616325", "utm_campaign": "b616a94743-MC_chrome_extension", "utm_term": "0_4000b11711-b616a94743-128616325", "~stage": "example stage"} | last_attributed_touch_data_custom_fields | {"$og_title": "Example", "$marketing_title": "Example", "utm_campaign": "b616a94743-MC_chrome_extension", "~creation_source": 1, "utm_medium": "email", "$og_description": "Example", "+click_timestamp": 1531302097, "$og_image_url": "https://example.com/image/thumb/Purple115/v4/a0/92/b3/a092b32d-853e-7210-0af2-eef35afed912/AppIcon-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-6.png/1200x630wa.jpg", "$og_type": "website", "utm_term": "0_4000b11711-b616a94743-128616325", "$og_app_id": "116556461780510", "+url": "https://link.example.com/MsxUG9Uc0M?utm_source=Example&utm_campaign=b616a94743-MC_chrome_extension&utm_medium=email&utm_term=0_4000b11711-b616a94743-128616325", "$desktop_url": "https://itunes.apple.com/app/example", "~marketing": true, "$one_time_use": false, "$canonical_url": "https://itunes.apple.com/us/app/example", "$android_url": "https://itunes.apple.com/app/example", "$ios_url": "https://itunes.apple.com/app/example", "utm_source": "Example"} | legacy “session_referring_link_data” includes all fields (duplicating many of the fields already in the CSV). new “last_attributed_touch_data_custom_fields” only includes fields that have not already been split out. For example, “last_attributed_touch_data_custom_fields” does not include “~campaign”, since that was already split out as “last_attributed_touch_data_tilde_campaign” |
| session_referring_link_creation_source | 1 | - | - | Branch internal only field, removed |
| session_referring_link_url | https://link.example.com/MsxUG9Uc0M?utm_source=Example&utm_campaign=b616a94743-MC_chrome_extension&utm_medium=email&utm_term=0_4000b11711-b616a94743-128616325 | - | - | see last_attributed_touch_data_custom_fields["+url"] |
| - | - | last_cta_view_* | - | Similar to last_attributed_touch_* fields, but for the last Journey or Deepview view proceeding the event. There is no equivalent in the legacy system.  |
| first_referring_click_id | 545527414016428889 | - | - | Branch internal only field, removed |
| session_referring_click_id | 545527414016428889 | - | - | Branch internal only field, removed |
| - | - | deep_linked | true | - |
| - | - | first_event_for_user | true | - |
| - | - | user_data_environment | FULL_APP | - |
| - | - | user_data_platform | IOS_APP | - |
| - | - | user_data_idfa | 6D92078A-8246-4BA4-AE5B-76104861E7DC | - |
| - | - | user_data_idfv | 6D92078A-8246-4BA4-AE5B-76104861E7DC | - |
| - | - | user_data_android_id | 171caed696dddddd | - |
| - | - | user_data_limit_ad_tracking | true | - |
| - | - | user_data_language | EN | - |
| - | - | user_data_geo_country_code | AU | - |
| - | - | user_data_sdk_version | 0.24.2 | - |
| - | - | user_data_geo_dma_code | 501 | - |
| - | - | event_data_* | - | Newly added fields such as revenue! |
| - | - | custom_data | { “foo”: “bar” } | Contains developer-specified key-value pairs for the event. |
