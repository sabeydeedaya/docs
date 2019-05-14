# Query API

!!! protip "Getting started"
    For newcomers to this API, we strongly suggest you check out our [Query Recipe Book](/exports/query-recipe-book/). It has screenshots of Dashboard visualizations, accompanied by what queries you need to make to pull the same data. It's a quick way to get up and running with this API.

The Query API is an HTTP API that can be used for programmatically querying pre-aggregated analytics. It can be used to fetch the same data displayed in your Branch dashboard, without having to access the Dashboard itself.

An individual query is constructed from three types of parameters:

- Authentication parameters that control the access to the data
- Data selection keys which define which events are eligible to be counted in the results (eg, filters)
- Result format specifiers that define which results are included in the HTTP response, and how the result is returned (eg, sorting)

An example query could look like:
```js
{
  // Authentication
  "branch_key":"<YOUR_BRANCH_KEY>",
  "branch_secret":"<YOUR_BRANCH_SECRET>",
  // Data selection
  "start_date": "2017-12-12",
  "end_date": "2017-12-18",
  "data_source": "eo_click",
  "dimensions": [
    "last_attributed_touch_data_tilde_feature",
    "last_attributed_touch_data_tilde_channel",
    "last_attributed_touch_data_tilde_campaign",
    "last_attributed_touch_data_plus_current_feature"
  ],
  "filters": {
    "!last_attributed_touch_data_plus_current_feature": [
      "MOBILE_DEEPVIEWS",
      "DESKTOP_DEEPVIEWS"
    ]
  },
  // Result format
  "ordered": "descending",
  "ordered_by": "unique_count",
  "aggregation": "unique_count",
  "zero_fill": true
}
```

## Endpoint Definition
```
POST /v1/query/analytics
Content-Type: application/json
Host: api2.branch.io
```

## Parameters

### Authentication

**branch_key**

_description_: The Branch key of the app analytics information is being pulled for.

_required_: true

_location_: body

_format_: string

**branch_secret**

_description_: The Branch secret of the app, used for authentication.

_required_: true

_location_: body

_format_: string

### Data selection

**start_date**

_description_: A timestamp representing the oldest date to return data for.

_required_: true

_location_: body

_restrictions_: Cannot be before 2017-10-14

_format_: An ISO-8601 compliant date-time string. Eg: "2017-10-24T16:00:00-08:00"

**end_date**

_description_: The last timestamp (exclusive) to return data for. No events that triggered after the end_date will be counted in the query results.

_required_: true

_location_: body

_restrictions_: Cannot be more than 7 days after the start_date

_format_: An ISO-8601 compliant date-time string. Eg: "2017-10-24T16:00:00-08:00"

**data_source**

_description_: The type of event to query for, prefixed with the source (eg 'eo_' + 'open' pulls Branch app opens)

_required_: true

_location_: body

_valid values_:
Branch data sources
```
[
  "eo_impression",
  "eo_click",
  "eo_web_to_app_auto_redirect",
  "eo_branch_cta_view",
  "eo_sms_sent",
  "eo_open",
  "eo_install",
  "eo_reinstall",
  "eo_web_session_start",
  "eo_pageview",
  "eo_commerce_event",
  "eo_custom_event",
  "eo_content_event",
  "eo_user_lifecycle_event"
]
```

**aggregation**

_description_: How to count events towards the final result count. When using unique_count, each event is only counted if an event by that user has not already been seen. Eg, if 10 users each trigger 3 opens:
```
total_count = 30
unique_count = 10
```
When querying with a datasource of "eo_commerce_event", the aggregation may also be specified as "revenue", in which case the counts returned are the sum of revenue from matching events, and not the number of events themselves.

_required_: true

_location_: body

_format_: string

_possible values_:
```
[
  "unique_count",
  "total_count",
  "revenue"
]
```

**dimensions**

_description_: List of event fields to use as splits for the query. Results counts are returned grouped with other events that have matchings values for each key provided in "dimensions".

_required_: true

_location_: body

_format_: array<string>

_possible element values_:
General info:
```
[
  "name",
  "origin",
  "timestamp",
  "deep_linked",
  "from_desktop",
]
```
User information:
```
[
  "user_data_os",
  "user_data_country",
  "user_data_language",
  "user_data_platform",
  "user_data_environment",
  "user_data_geo_dma_code",
  "user_data_geo_country_code",
]
```
Last attributed touch:
```
[
  "last_attributed_touch_type",
  "last_attributed_touch_data_tilde_tags",
  "last_attributed_touch_data_tilde_secondary_publisher",
  "last_attributed_touch_data_plus_current_feature",
  "last_attributed_touch_data_plus_via_features",
  "last_attributed_touch_data_tilde_campaign",
  "last_attributed_touch_data_tilde_advertising_partner_name",
  "last_attributed_touch_data_tilde_feature",
  "last_attributed_touch_data_tilde_creative_name",
  "last_attributed_touch_data_plus_web_format",
  "last_attributed_touch_data_tilde_creative_id",
  "last_attributed_touch_data_tilde_ad_name",
  "last_attributed_touch_data_tilde_ad_id",
  "last_attributed_touch_data_tilde_campaign_id",
  "last_attributed_touch_data_tilde_stage",
  "last_attributed_touch_data_tilde_channel",
  "last_attributed_touch_data_tilde_ad_set_name",
  "last_attributed_touch_data_tilde_ad_set_id",
]
```
Last CTA view information:
```
[
  "last_cta_view_data_tilde_ad_name",
  "last_cta_view_data_tilde_secondary_publisher",
  "last_cta_view_data_tilde_campaign",
  "last_cta_view_data_tilde_advertising_partner_name",
  "last_cta_view_data_tilde_feature",
  "last_cta_view_data_tilde_ad_set_name",
  "last_cta_view_data_tilde_ad_set_id",
  "last_cta_view_data_tilde_campaign_id",
  "last_cta_view_data_tilde_creative_name",
  "last_cta_view_data_tilde_creative_id",
  "last_cta_view_data_plus_via_features",
  "last_cta_view_data_dollar_3p",
  "last_cta_view_data_tilde_tags",
  "last_cta_view_data_plus_web_format",
  "last_cta_view_data_tilde_channel",
  "last_cta_view_data_tilde_ad_id",
  "last_cta_view_data_tilde_stage"
]
```
Other:
```
[
  "days_from_last_attributed_touch_to_event",
  "days_from_last_cta_view_to_event",
  "event_data_product_categories",
  "first_event_for_user",
]
```

**filters**

_description_: An object where each key is a valid "dimension", and each value is an array of string values. If a key is prefixed with a '!', then any event with a dimension value contained in the value of that key is excluded. Otherwise, only events with dimension values matching the filter will be counted.

_required_: false

_location_: body

_format_: Object<String, Array<String>>, For example, a query with filters specified as:
```
{
  "filters": {
    "last_attributed_touch_data_plus_current_feature": [
      "MOBILE_DEEPVIEWS",
      "DESKTOP_DEEPVIEWS"
    ],
    "!user_data_os": [ "iOS" ]
  }
}
```
would count only events where
  - last_attributed_touch_data_plus_current_feature was equal to "MOBILE_DEEPVIEWS" or "DESKTOP_DEEPVIEWS"

_and_

  - user_data_os was **not** equal to "iOS"

_possible keys_: See "dimensions" definition for valid key values. Any key may also be used with a "!" prefix

### Result formatting

**granularity**

_description_: Range of time to roll multiple events into a single result count. Eg, with a value of "day" the counts for each day are returned independently, where "all" would return a single count for the entire time range.

_required_: false

_location_: body

_default value_: "all"

_format_: string

_possible values_:
```
[
  "all",
  "day"
]
```

**ordered_by**

_description_: Which key of result to sort results on. Only supports 1 sort key

_required_: false

_location_: body

_default value_: value of query "aggregation" property, or "total_count" if not defined

_format_: string

_possible values_: Any element of query "dimensions" or the value of "aggregation" in the query

**ordered**

_description_: Which direction to order the results

_required_: false

_location_: body

_default value_: "descending""

_format_: string

_possible values_:
```
[
  "ascending",
  "descending"
]
```

**A note on sorts and the ordered_by parameter:**

It is not possible to provide an explicit sort method to the query, so the sort type is chosen automatically based on the value of "ordered_by". Behavior for comparison of equal values is left undefined, and as such the sort is not considered order stable for identical values.
ordered_by value sort choices:
  - unique_count, total_count, revenue -> numerically sorted
  - timestamp -> chronologically ordered
  - everything else -> lexicographically sorted

**zero_fill**

_description_: Whether to return result objects where the result count was 0. If set to false, results with count = 0 will be omitted from the response.

_required_: false

_location_: body

_default value_: false

_format_: boolean

**limit**

_description_: Maximum number of results to return in the response

_required_: false

_location_: URL query

_default value_: 100

_max value_: 1000

_format_: integer

**after**

_description_: A pagination parameter indicating the index of the first result to return in the response. Eg, with 100 results returned, setting "after" to 50 would return elements 51-100

_required_: false

_location_: URL

_default value_: 0

_format_: integer

**query_id**

_description_: Returned as query parameter on the "paging" object next_url and previous_url. Locks the last event to count for a query, so new events that occur between queries are not added to the results (prevents count change over time)

_required_: false

_location_: URL

_default value_: null

_format_: string

**Note:** The query id should be treated as ephemeral, and should only be used when retrieving pages of an existing query where the pagination URLs already have query_id set as a query parameter. You should not attempt to change the id between requests or include a query id with a different query request.


## Example Usage

Basic query for pulling installs per day, split by OS of the device the user installed on, limited to 5 results:

```
curl -X POST -H "Content-Type: application/json" -d '{
  "branch_key":"<YOUR_BRANCH_KEY>",
  "branch_secret":"<YOUR_BRANCH_SECRET>",
  "start_date": "2017-12-12",
  "end_date": "2017-12-18",
  "data_source": "eo_install",
  "dimensions": [
    "user_data_os"
  ],
  "granularity": "day",
  "aggregation": "total_count"
}' "http://api2.branch.io/v1/query/analytics?limit=5"
```

Example results:

```
{
  "results": [
    {
      "result": {
        "user_data_os": "ANDROID",
        "total_count": 144
      },
      "timestamp": "2017-12-18T00:00:00.000Z"
    },
    {
      "result": {
        "user_data_os": "IOS",
        "total_count": 142
      },
      "timestamp": "2017-12-18T00:00:00.000Z"
    },
    {
      "result": {
        "user_data_os": "IOS",
        "total_count": 191
      },
      "timestamp": "2017-12-17T00:00:00.000Z"
    },
    {
      "result": {
        "user_data_os": "ANDROID",
        "total_count": 194
      },
      "timestamp": "2017-12-17T00:00:00.000Z"
    },
    {
      "result": {
        "user_data_os": "ANDROID",
        "total_count": 246
      },
      "timestamp": "2017-12-16T00:00:00.000Z"
    }
  ],
  "paging": {
    "next_url": "/v1/query/analytics?query_id=CqdBOb&limit=5&after=5",
    "total_count": 14
  }
}
```

More complex query for pulling unique click counts, split by the last touch channel, campaign, feature and the +via_current_features values.

Has a filter specified to filter out any clicks where last_attributed_touch_data_plus_current_feature was MOBILE_DEEPVIEWS or DESKTOP_DEEPVIEWS.

A maximum of 5 results should be returned, in descending order of unique_count, with days that had 0 clicks returned (not filtered out):

```
curl -X POST -H "Content-Type: application/json" -d '{
  "branch_key":"<YOUR_BRANCH_KEY>",
  "branch_secret":"<YOUR_BRANCH_SECRET>",
  "start_date": "2017-12-12",
  "end_date": "2017-12-18",
  "data_source": "eo_click",
  "dimensions": [
    "last_attributed_touch_data_tilde_feature",
    "last_attributed_touch_data_tilde_channel",
    "last_attributed_touch_data_tilde_campaign",
    "last_attributed_touch_data_plus_current_feature"
  ],
  "filters": {
    "!last_attributed_touch_data_plus_current_feature": [
      "MOBILE_DEEPVIEWS",
      "DESKTOP_DEEPVIEWS"
    ]
  },
  "ordered": "descending",
  "ordered_by": "unique_count",
  "aggregation": "unique_count",
  "zero_fill": true
}' "http://api2.branch.io/v1/query/analytics?limit=5"
```

Example Results:

```
{
  "results": [
    {
      "timestamp": "2017-12-12T00:00:00.000Z",
      "result": {
        "last_attributed_touch_data_tilde_channel": "Facebook#2",
        "last_attributed_touch_data_tilde_campaign": "Facebook#2",
        "last_attributed_touch_data_tilde_feature": "paid advertising",
        "last_attributed_touch_data_plus_current_feature": "ADS",
        "unique_count": 750
      }
    },
    {
      "timestamp": "2017-12-12T00:00:00.000Z",
      "result": {
        "last_attributed_touch_data_tilde_channel": "taptica#1",
        "last_attributed_touch_data_tilde_campaign": "taptica#1",
        "last_attributed_touch_data_tilde_feature": "paid advertising",
        "last_attributed_touch_data_plus_current_feature": "ADS",
        "unique_count": 723
      }
    },
    {
      "timestamp": "2017-12-12T00:00:00.000Z",
      "result": {
        "last_attributed_touch_data_tilde_channel": "Journeys",
        "last_attributed_touch_data_tilde_campaign": "Default Banner",
        "last_attributed_touch_data_tilde_feature": "journeys",
        "last_attributed_touch_data_plus_current_feature": "MOBILE_JOURNEYS",
        "unique_count": 553
      }
    },
    {
      "timestamp": "2017-12-12T00:00:00.000Z",
      "result": {
        "last_attributed_touch_data_tilde_channel": "Apple App Store",
        "last_attributed_touch_data_tilde_campaign": null,
        "last_attributed_touch_data_tilde_feature": "paid advertising",
        "last_attributed_touch_data_plus_current_feature": "ADS",
        "unique_count": 432
      }
    },
    {
      "timestamp": "2017-12-12T00:00:00.000Z",
      "result": {
        "last_attributed_touch_data_tilde_channel": null,
        "last_attributed_touch_data_tilde_campaign": null,
        "last_attributed_touch_data_tilde_feature": "marketing",
        "last_attributed_touch_data_plus_current_feature": "QUICK_LINKS",
        "unique_count": 201
      }
    }
  ],
  "paging": {
    "next_url": "/v1/query/analytics?query_id=EDdBOb&limit=5&after=5",
    "total_count": 143
  }
}
```

## Rate Limits

- 5 requests per second
- 20 requests per minute
- 150 requests per hour
