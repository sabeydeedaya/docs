!!! protip "Want to see a Query API reference?"
    For an exhaustive list of options for this Query API, flip over to the [Query API](/exports/query-api/) reference page.

You can find your Branch Key and Branch Secret on the [Account Settings](https://dashboard.branch.io/account-settings/app) page of the Branch Dashboard. Give the curls below a try from any terminal!

## Summary Page - Installs

- ### All Installs

    ![image](/_assets/img/pages/exports/query-api/summary-installs-all.png)

    - *Request*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-11-29",
          "end_date": "2017-12-05",
          "data_source": "eo_install",
          "granularity": "day",
          "dimensions": [
            "timestamp"
          ],
          "filters": {
            "!user_data_platform": [
              "ROBOT"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response*

        ```js
        {
          "results" : [ {
            "timestamp" : "2017-12-05T08:00:00.000Z",
            "result" : {
              "unique_count" : 246
            }
          }, {
            "timestamp" : "2017-12-04T08:00:00.000Z",
            "result" : {
              "unique_count" : 302
            }
          }, {
            "timestamp" : "2017-12-03T08:00:00.000Z",
            "result" : {
              "unique_count" : 277
            }
          }, {
            "timestamp" : "2017-12-02T08:00:00.000Z",
            "result" : {
              "unique_count" : 300
            }
          }, {
            "timestamp" : "2017-12-01T08:00:00.000Z",
            "result" : {
              "unique_count" : 264
            }
          }, {
            "timestamp" : "2017-11-30T08:00:00.000Z",
            "result" : {
              "unique_count" : 208
            }
          }, {
            "timestamp" : "2017-11-29T08:00:00.000Z",
            "result" : {
              "unique_count" : 225
            }
          } ],
          "paging" : {
            "total_count" : 7
          }
        }
        ```

- ### Attributed Installs

    ![image](/_assets/img/pages/exports/query-api/summary-installs-attributed.png)

    - *Request*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-11-29",
          "end_date": "2017-12-05",
          "data_source": "eo_install",
          "granularity": "day",
          "dimensions": [
            "timestamp"
          ],
          "filters": {
            "!user_data_platform": [
              "ROBOT"
            ],
            "!days_from_last_attributed_touch_to_event": [
              "null"
            ]
          },
          "aggregation": "total_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response*

        ```js
        {
          "results" : [ {
            "timestamp" : "2017-12-05T08:00:00.000Z",
            "result" : {
              "total_count" : 248.0
            }
          }, {
            "timestamp" : "2017-12-04T08:00:00.000Z",
            "result" : {
              "total_count" : 296.0
            }
          }, {
            "timestamp" : "2017-12-03T08:00:00.000Z",
            "result" : {
              "total_count" : 284.0
            }
          }, {
            "timestamp" : "2017-12-02T08:00:00.000Z",
            "result" : {
              "total_count" : 291.0
            }
          }, {
            "timestamp" : "2017-12-01T08:00:00.000Z",
            "result" : {
              "total_count" : 263.0
            }
          }, {
            "timestamp" : "2017-11-30T08:00:00.000Z",
            "result" : {
              "total_count" : 214.0
            }
          }, {
            "timestamp" : "2017-11-29T08:00:00.000Z",
            "result" : {
              "total_count" : 227.0
            }
          } ],
          "paging" : {
            "total_count" : 7
          }
        }
        ```

- ### Attributed Installs, Split by Campaign

    ![image](/_assets/img/pages/exports/query-api/summary-installs-by-campaign.png)

    - *Request*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-11-29",
          "end_date": "2017-12-05",
          "data_source": "eo_install",
          "granularity": "day",
          "dimensions": [
            "last_attributed_touch_data_tilde_campaign"
          ],
          "filters": {
            "!user_data_platform": [
              "ROBOT"
            ],
            "!days_from_last_attributed_touch_to_event": [
              "null"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response*

        ```js
        {
          "results" : [ {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : null,
              "unique_count" : 171
            },
            "timestamp" : "2017-12-01T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : null,
              "unique_count" : 158
            },
            "timestamp" : "2017-12-04T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : null,
              "unique_count" : 157
            },
            "timestamp" : "2017-12-02T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : null,
              "unique_count" : 148
            },
            "timestamp" : "2017-12-03T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : null,
              "unique_count" : 144
            },
            "timestamp" : "2017-12-05T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : null,
              "unique_count" : 124
            },
            "timestamp" : "2017-11-29T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : null,
              "unique_count" : 120
            },
            "timestamp" : "2017-11-30T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "Default Ads Journeys",
              "unique_count" : 77
            },
            "timestamp" : "2017-12-04T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "Default Ads Journeys",
              "unique_count" : 76
            },
            "timestamp" : "2017-12-02T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "Default Ads Journeys",
              "unique_count" : 68
            },
            "timestamp" : "2017-12-03T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "Default Ads Journeys",
              "unique_count" : 43
            },
            "timestamp" : "2017-12-05T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "taptica#1",
              "unique_count" : 40
            },
            "timestamp" : "2017-12-05T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "Default Ads Journeys",
              "unique_count" : 39
            },
            "timestamp" : "2017-11-29T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "taptica#1",
              "unique_count" : 37
            },
            "timestamp" : "2017-12-01T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "taptica#1",
              "unique_count" : 35
            },
            "timestamp" : "2017-11-30T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "taptica#1",
              "unique_count" : 35
            },
            "timestamp" : "2017-11-29T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "taptica#1",
              "unique_count" : 34
            },
            "timestamp" : "2017-12-02T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "taptica#1",
              "unique_count" : 33
            },
            "timestamp" : "2017-12-04T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "Default Ads Journeys",
              "unique_count" : 32
            },
            "timestamp" : "2017-12-01T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "taptica#1",
              "unique_count" : 32
            },
            "timestamp" : "2017-12-03T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "CampaignName",
              "unique_count" : 26
            },
            "timestamp" : "2017-12-02T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "Default Ads Journeys",
              "unique_count" : 25
            },
            "timestamp" : "2017-11-30T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "Testing Campaign #1",
              "unique_count" : 25
            },
            "timestamp" : "2017-11-30T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "Testing Campaign #1",
              "unique_count" : 23
            },
            "timestamp" : "2017-11-29T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "CampaignName",
              "unique_count" : 23
            },
            "timestamp" : "2017-12-03T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "CampaignName",
              "unique_count" : 22
            },
            "timestamp" : "2017-12-04T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "CampaignName",
              "unique_count" : 12
            },
            "timestamp" : "2017-12-05T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "CampaignName",
              "unique_count" : 8
            },
            "timestamp" : "2017-12-01T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "Testing Campaign #1",
              "unique_count" : 5
            },
            "timestamp" : "2017-12-01T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "qa0",
              "unique_count" : 5
            },
            "timestamp" : "2017-12-01T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "qa0",
              "unique_count" : 3
            },
            "timestamp" : "2017-12-04T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "qa0",
              "unique_count" : 3
            },
            "timestamp" : "2017-11-30T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "qa0",
              "unique_count" : 2
            },
            "timestamp" : "2017-11-29T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "qa0",
              "unique_count" : 2
            },
            "timestamp" : "2017-12-03T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "qa0",
              "unique_count" : 2
            },
            "timestamp" : "2017-12-05T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "qa0",
              "unique_count" : 2
            },
            "timestamp" : "2017-12-02T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "v4o4endh3v1m583m",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-02T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "k7eemxrdnk12a1p9",
              "unique_count" : 1
            },
            "timestamp" : "2017-11-30T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "vyzsy23zcctimd0c",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-05T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "2zx7s0ubz3kt9cu8",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-03T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "s9q1mtr614p09yxk",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-01T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "y6gadrelf15prahr",
              "unique_count" : 1
            },
            "timestamp" : "2017-11-29T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "ngp33osyfxclcfz2",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-01T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "f5tfpbaipwbaukk3",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-03T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "hzzlo3l0mqk1fj2g",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-03T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "07xe6qth3vckasq8",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-05T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "6zcs44qwj4m0ei5v",
              "unique_count" : 1
            },
            "timestamp" : "2017-11-30T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "eu6q00cdnsa81mib",
              "unique_count" : 1
            },
            "timestamp" : "2017-11-29T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "ud3ux85ax566k8gr",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-01T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "tsgh43d5m52uphci",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-04T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "3mmub272xazx8gag",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-05T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "bifwkqw9y6cnlg5m",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-03T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "obpfj155rlog98v0",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-01T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "a853s9xge85rpv8b",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-02T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "dvev0bpog6lwyd4k",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-01T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "a4g#1",
              "unique_count" : 1
            },
            "timestamp" : "2017-11-29T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 56
          }
        }
        ```

- ### Attributed Installs, With Filter on Campaign

    ![image](/_assets/img/pages/exports/query-api/summary-installs-with-filter.png)

    - *Request*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-08",
          "end_date": "2017-12-14",
          "data_source": "eo_install",
          "granularity": "day",
          "dimensions": [
            "last_attributed_touch_data_tilde_campaign"
          ],
          "filters": {
            "!user_data_platform": [
              "ROBOT"
            ],
            "!days_from_last_attributed_touch_to_event": [
              "null"
            ],
            "last_attributed_touch_data_tilde_campaign": [
              "09slukxuhqn8f821",
              "0x230602kyi18keo"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response*

        ```js
        {
          "results" : [ {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "09slukxuhqn8f821",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-11T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "0x230602kyi18keo",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-13T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 2
          }
        }
        ```


- ### Attributed Installs, Split by Campaign, With Filter on Campaign

    ![image](/_assets/img/pages/exports/query-api/summary-installs-by-campaign-with-filter.png)

    - *Request*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-08",
          "end_date": "2017-12-14",
          "data_source": "eo_install",
          "granularity": "day",
          "dimensions": [
            "last_attributed_touch_data_tilde_campaign"
          ],
          "filters": {
            "!user_data_platform": [
              "ROBOT"
            ],
            "!days_from_last_attributed_touch_to_event": [
              "null"
            ],
            "last_attributed_touch_data_tilde_campaign": [
              "09slukxuhqn8f821",
              "0x230602kyi18keo"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response*

        ```js
        {
          "results" : [ {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "09slukxuhqn8f821",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-11T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "0x230602kyi18keo",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-13T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 2
          }
        }
        ```


## Summary Page - Click Flow

- ### No filters

    ![image](/_assets/img/pages/exports/query-api/summary-click-flow.png)

    Pulling this data requires 6 requests. For ease of understanding, we show the requests and responses below that correspond exactly to the data above.

    "Click" includes both eo_click and eo_web_to_app_auto_redirect.

    "Re-open" includes both eo_open and eo_reinstall.

    *Click*

    - *Request 1*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_click",
          "granularity": "all",
          "dimensions": [
            "user_data_platform",
            "from_desktop"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_WEB",
              "ANDROID_WEB",
              "DESKTOP_WEB"
            ],
            "!last_attributed_touch_data_plus_current_feature": [
              "MOBILE_DEEPVIEWS",
              "DESKTOP_DEEPVIEWS"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 1*

        ```js
        {
          "results" : [ {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "user_data_platform" : "ANDROID_WEB",
              "from_desktop" : "false",
              "unique_count" : 683
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "user_data_platform" : "IOS_WEB",
              "from_desktop" : "false",
              "unique_count" : 675
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "user_data_platform" : "ANDROID_WEB",
              "from_desktop" : "true",
              "unique_count" : 49
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "user_data_platform" : "IOS_WEB",
              "from_desktop" : "true",
              "unique_count" : 44
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "user_data_platform" : "DESKTOP_WEB",
              "from_desktop" : "false",
              "unique_count" : 17
            }
          } ],
          "paging" : {
            "total_count" : 5
          }
        }
        ```

    *Web-to-App Auto-Redirect*

    - *Request 2*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_web_to_app_auto_redirect",
          "granularity": "all",
          "dimensions": [
            "user_data_platform",
            "from_desktop"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_WEB",
              "ANDROID_WEB",
              "DESKTOP_WEB"
            ],
            "!last_attributed_touch_data_plus_current_feature": [
              "MOBILE_DEEPVIEWS",
              "DESKTOP_DEEPVIEWS"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 2*

        ```js
        {
          "results" : [ {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "user_data_platform" : "IOS_WEB",
              "from_desktop" : "false",
              "unique_count" : 6
            }
          } ],
          "paging" : {
            "total_count" : 1
          }
        }
        ```

    *SMS Sent*

    - *Request 3*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_sms_sent",
          "granularity": "all",
          "dimensions": [
            "user_data_platform"
          ],
          "filters": {
            "user_data_platform": [
              "DESKTOP_WEB"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 3*

        ```js
        {
          "results" : [ {
            "result" : {
              "user_data_platform" : "DESKTOP_WEB",
              "unique_count" : 17
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 1
          }
        }
        ```

    *Install*

    - *Request 4*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_install",
          "granularity": "all",
          "dimensions": [
            "user_data_platform",
            "from_desktop"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_APP",
              "ANDROID_APP"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 4*

        ```js
        {
          "results" : [ {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "user_data_platform" : "ANDROID_APP",
              "from_desktop" : "false",
              "unique_count" : 657
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "user_data_platform" : "IOS_APP",
              "from_desktop" : "false",
              "unique_count" : 473
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "user_data_platform" : "ANDROID_APP",
              "from_desktop" : "true",
              "unique_count" : 49
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "user_data_platform" : "IOS_APP",
              "from_desktop" : "true",
              "unique_count" : 46
            }
          } ],
          "paging" : {
            "total_count" : 4
          }
        }
        ```

    *Open*

    - *Request 5*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_open",
          "granularity": "all",
          "dimensions": [
            "user_data_platform",
            "from_desktop"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_APP",
              "ANDROID_APP"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 5*

        ```js
        {
          "results" : [ {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "user_data_platform" : "IOS_APP",
              "from_desktop" : "false",
              "unique_count" : 436
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "user_data_platform" : "ANDROID_APP",
              "from_desktop" : "false",
              "unique_count" : 395
            }
          } ],
          "paging" : {
            "total_count" : 2
          }
        }
        ```

    *Reinstall*

    - *Request 6*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_reinstall",
          "granularity": "all",
          "dimensions": [
            "user_data_platform",
            "from_desktop"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_APP",
              "ANDROID_APP"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 6*

        ```js
        {
          "results" : [ {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "user_data_platform" : "IOS_APP",
              "from_desktop" : "false",
              "unique_count" : 361
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "user_data_platform" : "ANDROID_APP",
              "from_desktop" : "false",
              "unique_count" : 283
            }
          } ],
          "paging" : {
            "total_count" : 2
          }
        }
        ```


- ### Filter on Campaign

    ![image](/_assets/img/pages/exports/query-api/summary-click-flow-with-filter.png)

    This example looks at feature: journeys. For a full list of dimensions that can be queried against, see our [Query API](/exports/query-api/) reference docs.

    *Click, with a filter for feature: journeys*

    - *Request*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_click",
          "granularity": "all",
          "dimensions": [
            "user_data_platform",
            "from_desktop"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_WEB",
              "ANDROID_WEB",
              "DESKTOP_WEB"
            ],
            "!last_attributed_touch_data_plus_current_feature": [
              "MOBILE_DEEPVIEWS",
              "DESKTOP_DEEPVIEWS"
            ],
            "last_attributed_touch_data_tilde_feature": [
              "journeys"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response*

        ```js
        {
          "results" : [ {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "user_data_platform" : "ANDROID_WEB",
              "from_desktop" : "false",
              "unique_count" : 167
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "user_data_platform" : "IOS_WEB",
              "from_desktop" : "false",
              "unique_count" : 166
            }
          } ],
          "paging" : {
            "total_count" : 2
          }
        }
        ```


- ### Filter for an individual Quick Link

    ![image](/_assets/img/pages/exports/query-api/quick-link-click-flow.png)

    It’s also possible to pull Click Flow statistics for individual Quick Links. You simply need the id of the Quick Link, which can be found in the URL when viewing the individual link stats page. In the screenshot above, the Quick Link’s ID is 271026075193177506.

    Simply plug in the link id into the request below.

    *Click, with a filter for id: 271026075193177506*

    - *Request*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-14",
          "end_date": "2017-12-20",
          "data_source": "eo_click",
          "granularity": "all",
          "dimensions": [
            "user_data_platform",
            "from_desktop"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_WEB",
              "ANDROID_WEB",
              "DESKTOP_WEB"
            ],
            "!last_attributed_touch_data_plus_current_feature": [
              "MOBILE_DEEPVIEWS",
              "DESKTOP_DEEPVIEWS"
            ],
            "last_attributed_touch_data_tilde_id": [
              "271026075193177506"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response*

        ```js
        {
          "results" : [ {
            "timestamp" : "2017-12-14T08:00:00.000Z",
            "result" : {
              "user_data_platform" : "IOS_WEB",
              "from_desktop" : "false",
              "unique_count" : 1
            }
          } ],
          "paging" : {
            "total_count" : 1
          }
        }
        ```


## Summary Page - Journeys

- ### No filters

    ![image](/_assets/img/pages/exports/query-api/summary-journeys.png)

    Pulling this data requires 6 requests. For ease of understanding, we show the requests and responses below that correspond exactly to the data above.

    "Clicks" includes both eo_click and eo_web_to_app_auto_redirect.

    "Opens" includes both eo_open and eo_reinstall.

    *Branch CTA View*

    - *Request 1*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_branch_cta_view",
          "granularity": "all",
          "dimensions": [
            "user_data_platform"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_WEB",
              "ANDROID_WEB"
            ],
            "last_attributed_touch_data_plus_current_feature": [
              "MOBILE_JOURNEYS"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 1*

        ```js
        {
          "results" : [ {
            "result" : {
              "user_data_platform" : "IOS_WEB",
              "unique_count" : 406
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "user_data_platform" : "ANDROID_WEB",
              "unique_count" : 390
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 2
          }
        }
        ```

    *Click*

    - *Request 2*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_click",
          "granularity": "all",
          "dimensions": [
            "user_data_platform"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_WEB",
              "ANDROID_WEB"
            ],
            "last_attributed_touch_data_plus_current_feature": [
              "MOBILE_JOURNEYS"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 2*

        ```js
        {
          "results" : [ {
            "result" : {
              "user_data_platform" : "ANDROID_WEB",
              "unique_count" : 167
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "user_data_platform" : "IOS_WEB",
              "unique_count" : 166
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 2
          }
        }
        ```


    *Web-to-App Auto-Redirect*

    - *Request 3*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_web_to_app_auto_redirect",
          "granularity": "all",
          "dimensions": [
            "user_data_platform"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_WEB",
              "ANDROID_WEB"
            ],
            "last_attributed_touch_data_plus_current_feature": [
              "MOBILE_JOURNEYS"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 3*

        ```js
        {
          "results" : [ ],
          "paging" : {
            "total_count" : 0
          }
        }
        ```


    *Install*

    - *Request 4*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_install",
          "granularity": "all",
          "dimensions": [
            "user_data_platform"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_APP",
              "ANDROID_APP"
            ],
            "last_attributed_touch_data_plus_via_features": [
              "MOBILE_JOURNEYS"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 4*

        ```js
        {
          "results" : [ {
            "result" : {
              "user_data_platform" : "ANDROID_APP",
              "unique_count" : 167
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "user_data_platform" : "IOS_APP",
              "unique_count" : 10
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 2
          }
        }
        ```


    *Open*

    - *Request 5*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_open",
          "granularity": "all",
          "dimensions": [
            "user_data_platform"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_APP",
              "ANDROID_APP"
            ],
            "last_attributed_touch_data_plus_via_features": [
              "MOBILE_JOURNEYS"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 5*

        ```js
        {
          "results" : [ ],
          "paging" : {
            "total_count" : 0
          }
        }
        ```


    *Reinstall*

    - *Request 6*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_reinstall",
          "granularity": "all",
          "dimensions": [
            "user_data_platform"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_APP",
              "ANDROID_APP"
            ],
            "last_attributed_touch_data_plus_via_features": [
              "MOBILE_JOURNEYS"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 6*

        ```js
        {
          "results" : [ {
            "result" : {
              "user_data_platform" : "IOS_APP",
              "unique_count" : 156
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "user_data_platform" : "ANDROID_APP",
              "unique_count" : 75
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 2
          }
        }
        ```

- ### Filter on Tags

    ![image](/_assets/img/pages/exports/query-api/summary-journeys-with-filter.png)

    This example looks at tags: tag1. For a full list of dimensions that can be queried against, see our [Query API](/exports/query-api/) reference docs.

    *Branch CTA View, with a filter for tags: tag1*

    - *Request*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_branch_cta_view",
          "granularity": "all",
          "dimensions": [
            "user_data_platform"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_WEB",
              "ANDROID_WEB"
            ],
            "last_attributed_touch_data_plus_current_feature": [
              "MOBILE_JOURNEYS"
            ],
            "last_attributed_touch_data_tilde_tags": [
              "tag1"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response*

        ```js
        {
          "results" : [ {
            "result" : {
              "user_data_platform" : "ANDROID_WEB",
              "unique_count" : 373
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "user_data_platform" : "IOS_WEB",
              "unique_count" : 6
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 2
          }
        }
        ```


## Summary Page - Deepviews

- ### No filters

    ![image](/_assets/img/pages/exports/query-api/summary-deepviews.png)

    Pulling this data requires 6 requests. For ease of understanding, we show the requests and responses below that correspond exactly to the data above.

    "Clicks" includes both eo_click and eo_web_to_app_auto_redirect.

    "Upgrades" includes both eo_open and eo_reinstall.


    *Branch CTA View*

    - *Request 1*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_branch_cta_view",
          "granularity": "all",
          "dimensions": [
            "user_data_platform"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_WEB",
              "ANDROID_WEB"
            ],
            "last_attributed_touch_data_plus_current_feature": [
              "MOBILE_DEEPVIEWS"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 1*

        ```js
        {
          "results" : [ {
            "result" : {
              "user_data_platform" : "ANDROID_WEB",
              "unique_count" : 529
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "user_data_platform" : "IOS_WEB",
              "unique_count" : 361
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 2
          }
        }
        ```

    *Click*

    - *Request 2*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_click",
          "granularity": "all",
          "dimensions": [
            "user_data_platform"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_WEB",
              "ANDROID_WEB"
            ],
            "last_attributed_touch_data_plus_current_feature": [
              "MOBILE_DEEPVIEWS"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 2*

        ```js
        {
          "results" : [ {
            "result" : {
              "user_data_platform" : "ANDROID_WEB",
              "unique_count" : 529
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "user_data_platform" : "IOS_WEB",
              "unique_count" : 440
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 2
          }
        }
        ```

    *Web-to-App Auto-Redirect*

    - *Request 3*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_web_to_app_auto_redirect",
          "granularity": "all",
          "dimensions": [
            "user_data_platform"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_WEB",
              "ANDROID_WEB"
            ],
            "last_attributed_touch_data_plus_current_feature": [
              "MOBILE_DEEPVIEWS"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 3*

        ```js
        {
          "results" : [ ],
          "paging" : {
            "total_count" : 0
          }
        }
        ```

    *Install*

    - *Request 4*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_install",
          "granularity": "all",
          "dimensions": [
            "user_data_platform"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_APP",
              "ANDROID_APP"
            ],
            "last_attributed_touch_data_plus_via_features": [
              "MOBILE_DEEPVIEWS"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 4*

        ```js
        {
          "results" : [ {
            "result" : {
              "user_data_platform" : "ANDROID_APP",
              "unique_count" : 435
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "user_data_platform" : "IOS_APP",
              "unique_count" : 393
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 2
          }
        }
        ```

    *Open*

    - *Request 5*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_open",
          "granularity": "all",
          "dimensions": [
            "user_data_platform"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_APP",
              "ANDROID_APP"
            ],
            "last_attributed_touch_data_plus_via_features": [
              "MOBILE_DEEPVIEWS"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 5*

        ```js
        {
          "results" : [ {
            "result" : {
              "user_data_platform" : "ANDROID_APP",
              "unique_count" : 167
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "user_data_platform" : "IOS_APP",
              "unique_count" : 151
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 2
          }
        }
        ```

    *Reinstall*

    - *Request 6*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_reinstall",
          "granularity": "all",
          "dimensions": [
            "user_data_platform"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_APP",
              "ANDROID_APP"
            ],
            "last_attributed_touch_data_plus_via_features": [
              "MOBILE_DEEPVIEWS"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 6*

        ```js
        {
          "results" : [ {
            "result" : {
              "user_data_platform" : "ANDROID_APP",
              "unique_count" : 8
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "user_data_platform" : "IOS_APP",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 2
          }
        }
        ```

- ### Filter on Stage

    ![image](/_assets/img/pages/exports/query-api/summary-deepviews-with-filter.png)

    This example looks at stage: stage88. For a full list of dimensions that can be queried against, see our [Query API](/exports/query-api/) reference docs.

    *Branch CTA View, with a filter for stage: stage88*

    - *Request*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_branch_cta_view",
          "granularity": "all",
          "dimensions": [
            "user_data_platform"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_WEB",
              "ANDROID_WEB"
            ],
            "last_attributed_touch_data_plus_current_feature": [
              "MOBILE_DEEPVIEWS"
            ],
            "last_attributed_touch_data_tilde_stage": [
              "stage88"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response*

        ```js
        {
          "results" : [ {
            "result" : {
              "user_data_platform" : "ANDROID_WEB",
              "unique_count" : 90
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "user_data_platform" : "IOS_WEB",
              "unique_count" : 86
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 2
          }
        }
        ```


## Quick Links

- ### No filters

    ![image](/_assets/img/pages/exports/query-api/quick-links.png)

    Pulling this data requires 6 requests. For ease of understanding, we show the requests and responses below that correspond exactly to the data above.

    "Clicks" includes both eo_click and eo_web_to_app_auto_redirect.

    "Opens" includes both eo_open and eo_reinstall.

    *Click*

    - *Request 1*

        ```bash
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
              "458794678159033945",
              "456130187302684655",
              "400390887617834597",
              "271026075193177506"
            ],
            "!user_data_platform": [
              "ROBOT"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 1*

        ```js
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

    *Web-to-App Auto-Redirect*

    - *Request 2*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-14",
          "end_date": "2017-12-20",
          "data_source": "eo_web_to_app_auto_redirect",
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
              "458794678159033945",
              "456130187302684655",
              "400390887617834597",
              "271026075193177506"
            ],
            "!user_data_platform": [
              "ROBOT"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 2*

        ```js
        {
          "results" : [ ],
          "paging" : {
            "total_count" : 0
          }
        }
        ```

    *Install*

    - *Request 3*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-14",
          "end_date": "2017-12-20",
          "data_source": "eo_install",
          "granularity": "all",
          "dimensions": [
            "last_attributed_touch_data_tilde_id"
          ],
          "filters": {
            "last_attributed_touch_data_tilde_id": [
              "458794678159033945",
              "456130187302684655",
              "400390887617834597",
              "271026075193177506"
            ],
            "!user_data_platform": [
              "ROBOT"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 3*

        ```js
        {
          "results" : [ ],
          "paging" : {
            "total_count" : 0
          }
        }
        ```

    *Open*

    - *Request 4*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-14",
          "end_date": "2017-12-20",
          "data_source": "eo_open",
          "granularity": "all",
          "dimensions": [
            "last_attributed_touch_data_tilde_id"
          ],
          "filters": {
            "last_attributed_touch_data_tilde_id": [
              "458794678159033945",
              "456130187302684655",
              "400390887617834597",
              "271026075193177506"
            ],
            "!user_data_platform": [
              "ROBOT"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 4*

        ```js
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

    *Reinstall*

    - *Request 5*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-14",
          "end_date": "2017-12-20",
          "data_source": "eo_reinstall",
          "granularity": "all",
          "dimensions": [
            "last_attributed_touch_data_tilde_id"
          ],
          "filters": {
            "last_attributed_touch_data_tilde_id": [
              "458794678159033945",
              "456130187302684655",
              "400390887617834597",
              "271026075193177506"
            ],
            "!user_data_platform": [
              "ROBOT"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 5*

        ```js
        {
          "results" : [ ],
          "paging" : {
            "total_count" : 0
          }
        }
        ```

    *Web Session Start*

    - *Request 6*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-14",
          "end_date": "2017-12-20",
          "data_source": "eo_web_session_start",
          "granularity": "all",
          "dimensions": [
            "last_attributed_touch_data_tilde_id"
          ],
          "filters": {
            "last_attributed_touch_data_tilde_id": [
              "458794678159033945",
              "456130187302684655",
              "400390887617834597",
              "271026075193177506"
            ],
            "!user_data_platform": [
              "ROBOT"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 6*

        ```js
        {
          "results" : [ ],
          "paging" : {
            "total_count" : 0
          }
        }
        ```


## Source Analytics

- ### No filters

    ![image](/_assets/img/pages/exports/query-api/source-analytics.png)

    Pulling this data requires 6 requests. For ease of understanding, we show the requests and responses below that correspond exactly to the data above.

    If you add additional columns, then you will need to adjust the requests accordingly. For a full list of events and dimensions that can be queried against, see our [Query API](/exports/query-api/) reference docs. If you are still not sure how to query for data, write in to integrations@branch.io and we’ll (1) get you a response, and (2) add to this documentation.

    "Clicks" does *not* include eo_web_to_app_auto_redirect on this visualization. This is different from the Summary page charts and Quick Links. Those visualizations have historically included Web-to-App Auto-Redirects, folded into the Clicks number. This visualization breaks them out separately.

    "Opens" does *not* include eo_reinstall on this visualization. This is different from the Summary page charts and Quick Links. Those visualizations have historically included Reinstalls, folded into the Opens number. This visualization breaks them out separately.

    *Click*

    - *Request 1*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_click",
          "granularity": "all",
          "dimensions": [
            "last_attributed_touch_data_tilde_campaign"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_WEB",
              "ANDROID_WEB",
              "DESKTOP_WEB"
            ],
            "!last_attributed_touch_data_plus_current_feature": [
              "MOBILE_DEEPVIEWS",
              "DESKTOP_DEEPVIEWS"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 1*

        ```js
        {
          "results" : [ {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "taptica#1",
              "unique_count" : 495
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "a4g#1",
              "unique_count" : 490
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "Default Ads Journeys",
              "unique_count" : 330
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "CampaignName",
              "unique_count" : 193
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : null,
              "unique_count" : 30
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 5
          }
        }
        ```

    *Install*

    - *Request 2*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_install",
          "granularity": "all",
          "dimensions": [
            "last_attributed_touch_data_tilde_campaign"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_APP",
              "ANDROID_APP"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 2*

        ```js
        {
          "results" : [ {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "taptica#1",
              "unique_count" : 425
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "a4g#1",
              "unique_count" : 328
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "Default Ads Journeys",
              "unique_count" : 201
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : null,
              "unique_count" : 82
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "CampaignName",
              "unique_count" : 66
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "qa0",
              "unique_count" : 54
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "v2x6mfmep5t3429d",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "uws6ibt9bdmjs93h",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "ukmfqoai5jt05h90",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "ugpaf50d40w3h7nv",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "tj88zdgl87btlsew",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "swmbrfb8uetcceca",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "qf01mu2skor5276c",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "pevfjx3yhmkl6q20",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "nkq4sewytblugtyx",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "ndef09e4tqogta3e",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "moueuf2f2gng0xtt",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "lof2d8phlxib2jsu",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "l0tj5y7vywpbnqrt",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "ktjp5fkmqlaynmhu",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "kbsi96yyu2luxro0",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "k0ri60p6h1wfdlsg",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "jiqqk1szmwu3389k",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "ink7z7o2niwpt1l3",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "ifutq3dwfb9e9s4p",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "iezqkvwev3iwvofe",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "htlpek2btalb9b6h",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "hiefuih5ijsczi2n",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "gdo2nsb41isjwecn",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "gcfsu5d45fespfrg",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "fq78bun0gild6e3s",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "fokhum3bshzewf70",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "f6lf2d6sb1gfwq0b",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "dj07vvjvhz0zz72b",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "d2770bus2fspnep2",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "chyq5jrmxl7x3f4r",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "bmvlp0xk09rycm2v",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "airra0l6vv815g3j",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "ai0xr4ywznoqxch5",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "9jc8zostyp21ywnz",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "91n80s0wkot3swh7",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "8ph9zt5rsoigi3gu",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "7pflpco7e54h4mmf",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "4tmmfp6pcu6znx9t",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "4b211n6wyjgefsrs",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "3ti2mxbgr6jb2p7s",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "3ieqalbk7u6amb09",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "2qplxc9p8cz5q49i",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "1o1n3gznt58aggbh",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "1l65lo2mc5arkz2v",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "0yqw86ud220cg88d",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "0x230602kyi18keo",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "09slukxuhqn8f821",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "xkeeamlknxevem2q",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "xc4ssq0dooex0yj0",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "y2tn5sg4dlnxeven",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "w2fgkfquzdk805mq",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "x9fvq4hg87169r8f",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 58
          }
        }
        ```

    *Open*

    - *Request 3*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_open",
          "granularity": "all",
          "dimensions": [
            "last_attributed_touch_data_tilde_campaign"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_APP",
              "ANDROID_APP"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 3*

        ```js
        {
          "results" : [ {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "a4g#1",
              "unique_count" : 312
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "taptica#1",
              "unique_count" : 284
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "CampaignName",
              "unique_count" : 194
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "qa0",
              "unique_count" : 17
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : null,
              "unique_count" : 16
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "moueuf2f2gng0xtt",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "ink7z7o2niwpt1l3",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "iezqkvwev3iwvofe",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "htlpek2btalb9b6h",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "hiefuih5ijsczi2n",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "gcfsu5d45fespfrg",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "f6lf2d6sb1gfwq0b",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "dj07vvjvhz0zz72b",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "bmvlp0xk09rycm2v",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "airra0l6vv815g3j",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "4b9ra2zzxxq4lzj6",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "3ti2mxbgr6jb2p7s",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "2qplxc9p8cz5q49i",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "1o1n3gznt58aggbh",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "1l65lo2mc5arkz2v",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "09slukxuhqn8f821",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "ugpaf50d40w3h7nv",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "xc4ssq0dooex0yj0",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "x9fvq4hg87169r8f",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "pevfjx3yhmkl6q20",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 25
          }
        }
        ```

    *Web Session Start*

    - *Request 4*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_web_session_start",
          "granularity": "all",
          "dimensions": [
            "last_attributed_touch_data_tilde_campaign"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_APP",
              "ANDROID_APP",
              "DESKTOP_WEB"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 4*

        ```js
        {
          "results" : [ {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : null,
              "unique_count" : 15
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "a4g#1",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 2
          }
        }
        ```

    *Purchase*

    - *Request 5*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_commerce_event",
          "granularity": "all",
          "dimensions": [
            "last_attributed_touch_data_tilde_campaign",
            "name"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_WEB",
              "ANDROID_WEB",
              "DESKTOP_WEB",
              "IOS_APP",
              "ANDROID_APP"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 5*

        ```js
        {
          "results" : [ {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "Default Ads Journeys",
              "name" : "ADD_TO_CART",
              "unique_count" : 268
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "a4g#1",
              "name" : "PURCHASE",
              "unique_count" : 169
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "CampaignName",
              "name" : "PURCHASE",
              "unique_count" : 154
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "taptica#1",
              "name" : "PURCHASE",
              "unique_count" : 131
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : null,
              "name" : "PURCHASE",
              "unique_count" : 68
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "qa0",
              "name" : "PURCHASE",
              "unique_count" : 25
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "gcfsu5d45fespfrg",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "x9fvq4hg87169r8f",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "ugpaf50d40w3h7nv",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "tj88zdgl87btlsew",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "3ti2mxbgr6jb2p7s",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "xc4ssq0dooex0yj0",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "xkeeamlknxevem2q",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "pevfjx3yhmkl6q20",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "moueuf2f2gng0xtt",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "ukmfqoai5jt05h90",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "jiqqk1szmwu3389k",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "iezqkvwev3iwvofe",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "hiefuih5ijsczi2n",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "fq78bun0gild6e3s",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "fokhum3bshzewf70",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "f6lf2d6sb1gfwq0b",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "bmvlp0xk09rycm2v",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "airra0l6vv815g3j",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "l0tj5y7vywpbnqrt",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "2qplxc9p8cz5q49i",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "1xosk74azwbxtdyn",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "4b9ra2zzxxq4lzj6",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "swmbrfb8uetcceca",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "y2tn5sg4dlnxeven",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "1o1n3gznt58aggbh",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "0x230602kyi18keo",
              "name" : "PURCHASE",
              "unique_count" : 1
            }
          } ],
          "paging" : {
            "total_count" : 32
          }
        }
        ```

    *Revenue*

    Note that revenue also has data_source `eo_purchase`, but with a different `aggregation`.

    - *Request 6*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_commerce_event",
          "granularity": "all",
          "dimensions": [
            "last_attributed_touch_data_tilde_campaign",
            "name"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_WEB",
              "ANDROID_WEB",
              "DESKTOP_WEB",
              "IOS_APP",
              "ANDROID_APP"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "revenue"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 6*

        ```js
        {
          "results" : [ {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "a4g#1",
              "revenue" : 220439.2490234375,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "CampaignName",
              "revenue" : 182050.3577928543,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "taptica#1",
              "revenue" : 170676.8486328125,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : null,
              "revenue" : 43980.580078125,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "qa0",
              "revenue" : 32342.879272460938,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "tj88zdgl87btlsew",
              "revenue" : 4041.510009765625,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "ugpaf50d40w3h7nv",
              "revenue" : 2680.56005859375,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "l0tj5y7vywpbnqrt",
              "revenue" : 2350.080078125,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "hiefuih5ijsczi2n",
              "revenue" : 1853.0899658203125,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "xkeeamlknxevem2q",
              "revenue" : 1679.3199462890625,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "fokhum3bshzewf70",
              "revenue" : 1504.2099609375,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "3ti2mxbgr6jb2p7s",
              "revenue" : 1455.699951171875,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "gcfsu5d45fespfrg",
              "revenue" : 1434.8599853515625,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "x9fvq4hg87169r8f",
              "revenue" : 1346.8199462890625,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "fq78bun0gild6e3s",
              "revenue" : 981.6799926757812,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "swmbrfb8uetcceca",
              "revenue" : 914.9199829101562,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "jiqqk1szmwu3389k",
              "revenue" : 874.25,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "0x230602kyi18keo",
              "revenue" : 533.5800170898438,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "iezqkvwev3iwvofe",
              "revenue" : 499.9200134277344,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "1xosk74azwbxtdyn",
              "revenue" : 469.5299987792969,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "y2tn5sg4dlnxeven",
              "revenue" : 463.69000244140625,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "airra0l6vv815g3j",
              "revenue" : 449.54998779296875,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "pevfjx3yhmkl6q20",
              "revenue" : 321.9800109863281,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "1o1n3gznt58aggbh",
              "revenue" : 231.3300018310547,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "2qplxc9p8cz5q49i",
              "revenue" : 202.74000549316406,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "moueuf2f2gng0xtt",
              "revenue" : 30.950000762939453,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "bmvlp0xk09rycm2v",
              "revenue" : 20.050000190734863,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "xc4ssq0dooex0yj0",
              "revenue" : 16.290000915527344,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "ukmfqoai5jt05h90",
              "revenue" : 13.979999542236328,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "4b9ra2zzxxq4lzj6",
              "revenue" : 13.9399995803833,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "f6lf2d6sb1gfwq0b",
              "revenue" : 11.399999618530273,
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "Default Ads Journeys",
              "revenue" : 0.0,
              "name" : "ADD_TO_CART"
            }
          } ],
          "paging" : {
            "total_count" : 32
          }
        }
        ```

- ### Filter on Ad Partner

    ![image](/_assets/img/pages/exports/query-api/source-analytics-with-filter.png)

    This example looks at ad partner name: Taptica. For a full list of dimensions that can be queried against, see our [Query API](/exports/query-api/) reference docs.

    *Click, with a filter for ad partner name: Taptica*

    - *Request*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_click",
          "granularity": "all",
          "dimensions": [
            "last_attributed_touch_data_tilde_campaign"
          ],
          "filters": {
            "user_data_platform": [
              "IOS_WEB",
              "ANDROID_WEB",
              "DESKTOP_WEB"
            ],
            "!last_attributed_touch_data_plus_current_feature": [
              "MOBILE_DEEPVIEWS",
              "DESKTOP_DEEPVIEWS"
            ],
            "last_attributed_touch_data_tilde_advertising_partner_name": [
              "Taptica"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response*

        ```js
        {
          "results" : [ {
            "result" : {
              "last_attributed_touch_data_tilde_campaign" : "taptica#1",
              "unique_count" : 495
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 1
          }
        }
        ```

## Ads Analytics - Trends

- ### Installs, Split by Campaign

    ![image](/_assets/img/pages/exports/query-api/ads-analytics-trends.png)

    *Install*

    - *Request*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-11-29",
          "end_date": "2017-12-05",
          "data_source": "eo_install",
          "granularity": "day",
          "dimensions": "last_attributed_touch_data_tilde_advertising_partner_name",
          "filters": {
            "last_attributed_touch_data_tilde_feature": [
              "paid advertising"
            ],
            "!user_data_platform": [
              "ROBOT"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response*

        ```js
        {
          "results" : [ {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 40
            },
            "timestamp" : "2017-12-05T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 37
            },
            "timestamp" : "2017-12-01T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 35
            },
            "timestamp" : "2017-11-30T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 35
            },
            "timestamp" : "2017-11-29T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 34
            },
            "timestamp" : "2017-12-02T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 33
            },
            "timestamp" : "2017-12-04T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 32
            },
            "timestamp" : "2017-12-03T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Apple Search Ads",
              "unique_count" : 26
            },
            "timestamp" : "2017-12-02T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Apple Search Ads",
              "unique_count" : 23
            },
            "timestamp" : "2017-12-03T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Apple Search Ads",
              "unique_count" : 22
            },
            "timestamp" : "2017-12-04T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "unique_count" : 20
            },
            "timestamp" : "2017-11-29T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "unique_count" : 15
            },
            "timestamp" : "2017-12-01T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Apple Search Ads",
              "unique_count" : 12
            },
            "timestamp" : "2017-12-05T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "unique_count" : 12
            },
            "timestamp" : "2017-12-03T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "unique_count" : 11
            },
            "timestamp" : "2017-12-04T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "unique_count" : 10
            },
            "timestamp" : "2017-11-30T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "unique_count" : 9
            },
            "timestamp" : "2017-12-05T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Apple Search Ads",
              "unique_count" : 8
            },
            "timestamp" : "2017-12-01T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "unique_count" : 7
            },
            "timestamp" : "2017-12-02T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "A4G",
              "unique_count" : 1
            },
            "timestamp" : "2017-11-29T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 20
          }
        }
        ```

- ### Installs, Split by Campaign, With Filter on Platform

    ![image](/_assets/img/pages/exports/query-api/ads-analytics-trends-with-filter.png)

    *Install*

    - *Request*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-11-29",
          "end_date": "2017-12-05",
          "data_source": "eo_install",
          "granularity": "day",
          "dimensions": "last_attributed_touch_data_tilde_advertising_partner_name",
          "filters": {
            "last_attributed_touch_data_tilde_feature": [
              "paid advertising"
            ],
            "!user_data_platform": [
              "ROBOT"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ],
            "user_data_platform": [
              "IOS_APP"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response*

        ```js
        {
          "results" : [ {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Apple Search Ads",
              "unique_count" : 26
            },
            "timestamp" : "2017-12-02T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Apple Search Ads",
              "unique_count" : 23
            },
            "timestamp" : "2017-12-03T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Apple Search Ads",
              "unique_count" : 22
            },
            "timestamp" : "2017-12-04T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "unique_count" : 20
            },
            "timestamp" : "2017-11-29T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "unique_count" : 15
            },
            "timestamp" : "2017-12-01T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Apple Search Ads",
              "unique_count" : 12
            },
            "timestamp" : "2017-12-05T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "unique_count" : 12
            },
            "timestamp" : "2017-12-03T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "unique_count" : 11
            },
            "timestamp" : "2017-12-04T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "unique_count" : 10
            },
            "timestamp" : "2017-11-30T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "unique_count" : 9
            },
            "timestamp" : "2017-12-05T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Apple Search Ads",
              "unique_count" : 8
            },
            "timestamp" : "2017-12-01T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "unique_count" : 7
            },
            "timestamp" : "2017-12-02T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 5
            },
            "timestamp" : "2017-12-01T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 5
            },
            "timestamp" : "2017-12-05T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 2
            },
            "timestamp" : "2017-11-29T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 2
            },
            "timestamp" : "2017-11-30T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 2
            },
            "timestamp" : "2017-12-04T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 2
            },
            "timestamp" : "2017-12-02T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "A4G",
              "unique_count" : 1
            },
            "timestamp" : "2017-11-29T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 1
            },
            "timestamp" : "2017-12-03T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 20
          }
        }
        ```


## Ads Analytics - Events

- ### Split by Ad Partner

    ![image](/_assets/img/pages/exports/query-api/ads-analytics-events.png)

    Pulling this data requires 7 requests. For ease of understanding, we show the requests and responses below that correspond exactly to the data above.

    If you add additional columns, then you will need to adjust the requests accordingly. For a full list of events and dimensions that can be queried against, see our [Query API](/exports/query-api/) reference docs. If you are still not sure how to query for data, write in to integrations@branch.io and we’ll (1) get you a response, and (2) add to this documentation.

    "Clicks" does *not* include eo_web_to_app_auto_redirect on this visualization. This is different from the Summary page charts and Quick Links. Those visualizations have historically included Web-to-App Auto-Redirects, folded into the Clicks number. This visualization breaks them out separately.

    "Opens" does *not* include eo_reinstall on this visualization. This is different from the Summary page charts and Quick Links. Those visualizations have historically included Reinstalls, folded into the Opens number. This visualization breaks them out separately.

    *Click*

    - *Request 1*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_click",
          "granularity": "all",
          "dimensions": [
            "last_attributed_touch_data_tilde_advertising_partner_name"
          ],
          "filters": {
            "last_attributed_touch_data_tilde_feature": [
              "paid advertising"
            ],
            "!user_data_platform": [
              "ROBOT"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 1*

        ```js
        {
          "results" : [ {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "A4G",
              "unique_count" : 579
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 507
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Apple Search Ads",
              "unique_count" : 193
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "unique_count" : 30
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 4
          }
        }
        ```

    *Install*

    - *Request 2*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_install",
          "granularity": "all",
          "dimensions": [
            "last_attributed_touch_data_tilde_advertising_partner_name"
          ],
          "filters": {
            "last_attributed_touch_data_tilde_feature": [
              "paid advertising"
            ],
            "!user_data_platform": [
              "ROBOT"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 2*

        ```js
        {
          "results" : [ {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 425
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "A4G",
              "unique_count" : 328
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "unique_count" : 188
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Apple Search Ads",
              "unique_count" : 66
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 4
          }
        }
        ```

    *Open*

    - *Request 3*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_open",
          "granularity": "all",
          "dimensions": [
            "last_attributed_touch_data_tilde_advertising_partner_name"
          ],
          "filters": {
            "last_attributed_touch_data_tilde_feature": [
              "paid advertising"
            ],
            "!user_data_platform": [
              "ROBOT"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 3*

        ```js
        {
          "results" : [ {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "A4G",
              "unique_count" : 312
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 284
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Apple Search Ads",
              "unique_count" : 194
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "unique_count" : 54
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 4
          }
        }
        ```

    *Reinstall*

    - *Request 4*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_reinstall",
          "granularity": "all",
          "dimensions": [
            "last_attributed_touch_data_tilde_advertising_partner_name"
          ],
          "filters": {
            "last_attributed_touch_data_tilde_feature": [
              "paid advertising"
            ],
            "!user_data_platform": [
              "ROBOT"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 4*

        ```js
        {
          "results" : [ {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "A4G",
              "unique_count" : 123
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 119
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Apple Search Ads",
              "unique_count" : 108
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "unique_count" : 57
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 4
          }
        }
        ```

    *Web Session Start*

    - *Request 5*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_web_session_start",
          "granularity": "all",
          "dimensions": [
            "last_attributed_touch_data_tilde_advertising_partner_name"
          ],
          "filters": {
            "last_attributed_touch_data_tilde_feature": [
              "paid advertising"
            ],
            "!user_data_platform": [
              "ROBOT"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 5*

        ```js
        {
          "results" : [ {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 190
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "A4G",
              "unique_count" : 179
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          }, {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "unique_count" : 60
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 3
          }
        }
        ```

    *Purchase*

    - *Request 6*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_commerce_event",
          "granularity": "all",
          "dimensions": [
            "last_attributed_touch_data_tilde_advertising_partner_name",
            "name"
          ],
          "filters": {
            "last_attributed_touch_data_tilde_feature": [
              "paid advertising"
            ],
            "!user_data_platform": [
              "ROBOT"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 6*

        ```js
        {
          "results" : [ {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "A4G",
              "name" : "PURCHASE",
              "unique_count" : 169
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Apple Search Ads",
              "name" : "PURCHASE",
              "unique_count" : 154
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "name" : "PURCHASE",
              "unique_count" : 131
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "name" : "PURCHASE",
              "unique_count" : 122
            }
          } ],
          "paging" : {
            "total_count" : 4
          }
        }
        ```

    *Revenue*

    Note that revenue also has data_source `eo_purchase`, but with a different `aggregation`.

    - *Request 7*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_commerce_event",
          "granularity": "all",
          "dimensions": [
            "last_attributed_touch_data_tilde_advertising_partner_name",
            "name"
          ],
          "filters": {
            "last_attributed_touch_data_tilde_feature": [
              "paid advertising"
            ],
            "!user_data_platform": [
              "ROBOT"
            ],
            "!days_from_last_attributed_touch_to_event": [
              null
            ]
          },
          "aggregation": "revenue"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response 7*

        ```js
        {
          "results" : [ {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "revenue" : 220439.2490234375,
              "last_attributed_touch_data_tilde_advertising_partner_name" : "A4G",
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "revenue" : 182050.3577928543,
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Apple Search Ads",
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "revenue" : 170676.8486328125,
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "name" : "PURCHASE"
            }
          }, {
            "timestamp" : "2017-12-07T08:00:00.000Z",
            "result" : {
              "revenue" : 100719.38818359375,
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Applovin",
              "name" : "PURCHASE"
            }
          } ],
          "paging" : {
            "total_count" : 4
          }
        }
        ```


- ### Split by Ad Partner, With Filter on Ad Partner

    ![image](/_assets/img/pages/exports/query-api/ads-analytics-events-with-filter.png)

    This example looks at ad partner name: Taptica. For a full list of dimensions that can be queried against, see our [Query API](/exports/query-api/) reference docs.

    *Click, with a filter for ad partner name: Taptica*

    - *Request*

        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
          "branch_key": "<YOUR_BRANCH_KEY>",
          "branch_secret": "<YOUR_BRANCH_SECRET>",
          "start_date": "2017-12-07",
          "end_date": "2017-12-13",
          "data_source": "eo_click",
          "granularity": "all",
          "dimensions": [
            "last_attributed_touch_data_tilde_advertising_partner_name"
          ],
          "filters": {
            "last_attributed_touch_data_tilde_feature": [
              "paid advertising"
            ],
            "!user_data_platform": [
              "ROBOT"
            ],
            "last_attributed_touch_data_tilde_advertising_partner_name": [
              "Taptica"
            ]
          },
          "aggregation": "unique_count"
        }' "http://api2.branch.io/v1/query/analytics?limit=100"
        ```

    - *Response*

        ```js
        {
          "results" : [ {
            "result" : {
              "last_attributed_touch_data_tilde_advertising_partner_name" : "Taptica",
              "unique_count" : 507
            },
            "timestamp" : "2017-12-07T08:00:00.000Z"
          } ],
          "paging" : {
            "total_count" : 1
          }
        }
        ```

