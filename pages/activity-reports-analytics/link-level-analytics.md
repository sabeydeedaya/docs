## Dashboard


### Link Stats View

Simply append ?stats=true to any link and you will see a breakdown of trends over any period of time.

![image](/_assets/img/pages/analytics/link-level-analytics0.png)


### Click Flow

You will also see a breakdown of clicks, installs, and re-opens by platform.

![image](/_assets/img/pages/analytics/link-level-analytics1.png)


### Quick Links

If you created a marketing link on the Quick Links page, you can see a breakdown of analytics for that specific link.

![image](/_assets/img/pages/analytics/link-level-analytics2.png)


## API

To use any form of the API, you need the link ID. You can simply request it from [https://api2.branch.io/v1/url](https://api2.branch.io/v1/url?url=https://example.app.link/WgiqvsepqF&branch_key=key_live_kaFuWw8WvY7yn1d9yYiP8gokwqjV0Swt), for example:

Request:

HTML


```
curl -XGET 'https://api2.branch.io/v1/url?url=https://example.app.link/WgiqvsepqF&branch_key=key_live_kaFuWw8WvY7yn1d9yYiP8gokwqjV0Swt'
```


Response:

HTML


```
{
  "campaign": "new product",
  "channel": "facebook",
  "feature": "onboarding",
  "stage": "new user",
  "tags": [
    "one",
    "two",
    "three"
  ],
  "data": {
    "$canonical_identifier": "content/123",
    "$desktop_url": "http://www.example.com",
    "$og_description": "Description from Deep Link",
    "$og_image_url": "http://www.lorempixel.com/400/400/",
    "$og_title": "Title from Deep Link",
    "$one_time_use": false,
    "custom_array": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "custom_boolean": true,
    "custom_integer": 1243,
    "custom_object": {
      "random": "dictionary"
    },
    "custom_string": "everything",
    "~campaign": "new product",
    "~channel": "facebook",
    "~creation_source": 0,
    "~feature": "onboarding",
    "~id": "423196192848102356",
    "~stage": "new user",
    "~tags": [
      "one",
      "two",
      "three"
    ],
    "url": "https://example.app.link/WgiqvsepqF"
  },
  "type": 0,
  "alias": null
}
```


Grab the **~id** from the response


### **CSVs: Manual export or Data  Export API**



*   With the id, you can look at the** last_attributed_touch_data_tilde_id **column for any attributed events.


### **Query API**

If you just want to look at the just counts via the query API by specifying the **last_attributed_touch_data_tilde_id,** for example:

Request:

HTML


```
curl -X POST -H "Content-Type: application/json" -d '{

  "branch_key": "<YOUR_BRANCH_KEY>",

  "branch_secret": "<YOUR_BRANCH_SECRET>",

  "start_date": "2017-12-14",

  "end_date": "2017-12-20",

  "data_source": "eo_click",

  "granularity": "all",

  "dimensions": [

    "last_attributed_touch_data_tilde_id"

  ],

  "filters": {

    "!last_attributed_touch_data_plus_current_feature": [

      "MOBILE_DEEPVIEWS",

      "DESKTOP_DEEPVIEWS"

    ],

    "last_attributed_touch_data_tilde_id": [

      "458794678159033945"

    ],

    "!user_data_platform": [

      "ROBOT"

    ]

  },

  "aggregation": "unique_count"

}' "http://api.branch.io/v1/query/analytics?limit=100"
```


Response:

HTML


```
{

  "results" : [ {

    "result" : {

      "last_attributed_touch_data_tilde_id" : "271026075193177506",

      "unique_count" : 1

    },

    "timestamp" : "2017-12-14T08:00:00.000Z"

  } ],

  "paging" : {

    "total_count" : 1

  }

}
```

[/exports/query-recipe-book/#no-filters_3](/exports/query-recipe-book/#no-filters_3)
