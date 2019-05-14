# Event Ontology Data Schema

## Overview

[People-Based Attribution](/dashboard/people-based-attribution/) relies on a new, unified data format. We refer to this as Branch's Event Ontology.  This unified format is shared across all Branch products:

- Dashboard
- [Data Feeds](/exports/data-feeds/):
    - [Webhooks](/exports/ua-webhooks/)
    - [Data Integrations](/integrations/data-integrations/)
    - [Data Export API](/exports/api-v3/)

Previously, we had different formats for Webhooks vs Data Integrations vs Exports. With the release of People-Based Attribution, we have reconciled these differences.

## Events Included


We split out events into logical groupings. We now have the following distinct event groupings:

- impression
- click
- web-to-app auto-redirect
- Branch CTA view
- sms sent
- open
- install
- reinstall
- web session start
- pageview
- commerce event
- custom event
- content event
- user lifecycle event

The last four are groupings of multiple events.

- **Custom events** are any events you choose to track with Branch that fall outside our list of standard events.
- **Commerce events** include a short list of events such as PURCHASE that involve e-commerce.
-  **Content events** include a short list of events such as VIEW_ITEM that involve content and are not directly related to e-commerce.
-  **User lifecycle events** are events marking a distinct action completed by a user as they progress through your app, such as COMPLETE_REGISTRATION.

### Branch Standard Events

Here is a full breakdown of standard events trackable by Branch.

| *event grouping* | *events* |
| - | - |
| commerce event | ADD_TO_CART, ADD_TO_WISHLIST, VIEW_CART, INITIATE_PURCHASE, ADD_PAYMENT_INFO, PURCHASE, SPEND_CREDITS |
| content event | SEARCH, VIEW_ITEM, VIEW_ITEMS, RATE, SHARE |
| user lifecycle event | COMPLETE_REGISTRATION, COMPLETE_TUTORIAL, ACHIEVE_LEVEL, UNLOCK_ACHIEVEMENT |

## Fields included

On each event, we provide a considerable amount of information. The following table has an overview. Several of the fields below are objects which themselves have many fields.

| *field* | *format* | *definition* |
| - | - | - |
| id | string | a unique id for the event |
| name | string | the name of the event, such as "CLICK", "INSTALL", "PURCHASE", or custom event names like "signup" |
| timestamp | long | unix timestamp in milliseconds for the event |
| days_from_last_attributed_touch_to_event | int | number of days between when the last touch occurred and when this event subsequently occurred |
| last_attributed_touch_type | enum { CLICK, WEB_TO_APP_AUTO_REDIRECT, IMPRESSION } | whether the last attributed touch was an impression, a click, or a web to app auto redirect |
| last_attributed_touch_timestamp | long | unix timestamp in milliseconds for the last attributed touch |
| last_attributed_touch_data | object | If an impression, click, web to app auto redirect, branch cta view, or sms sent, this field contains the link data directly associated with the event. For all other events, this is the data associated with the last qualifying touch (click, impression, etc) to occur before this event. Subject to attribution windows, within which the last click or web to app auto redirect trumps a more recent impression. |
| days_from_last_cta_view_to_event | int | number of days between when the last Branch CTA view occurred and when this event subsequently occurred (see datasource definition of cta view) |
| last_cta_view_timestamp | long | unix timestamp in milliseconds for the last Branch CTA view |
| last_cta_view_data | object | This is the data associated with the last qualifying Branch CTA View to occur before this event. Subject to attribution windows, within which the last click or web to app auto redirect trumps a more recent impression. |
| first_event_for_user | boolean | if this is the first time for this persona that this event has been triggered (not yet supported)|
| deep_linked | boolean | true if the current app or web session resulted in the user being deep linked |
| user_data | object | data associated with the user who triggered the event |
| event_data | object | data associated with commerce or content events, but not specific to any one item |
| content_items | array of object | Array of content items. A content item is any distinct item, whether a product, piece of content, restaurant, service, flight, hotel, or any kind of media (text, visual, audio) |
| custom_data | object | partner-specified custom key-value pairs associated with an event, excluding Touches, Branch CTA view and SMS sent |

## Full list of fields

If you are building an integration with Branch or simply wish to learn more about the fields we offer, please download one of the CSV files below. They provide a comprehensive list of events and fields, along with definitions and data types.

[Full Event Ontology for Webhooks, Data Integrations and Exports](full-event-ontology.csv)
