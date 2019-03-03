The Branch Universal Ads Analytics Dashboard is made up of two main sections, the high-level graph at the top of the page, and the more granular table breakdown below. Each view lets you filter and compare various different in-app and web events by a set of analytics parameters associated with your Branch ad links. Whenever you create a Branch ad link, you'll include a campaign, channel, and a set of tags (and Branch will automatically include a feature and ad partner). These can then be used to filter resulting events in either view.

## Top Menu

At the top of the page, you'll see a menu of options that applies to both the graph and table views. Here, you can set the date range you'd like to see data for. This date range will apply to both the graph and table views on the page. You won't be able to see data from prior to October 14th, 2017, as that is the date Branch switched to our updated attribution model and data pipeline. [For more information on this, click here.](/dashboard/people-based-attribution/#cutoff-date)

Additionally, you can share your current dashboard view using the share button, preserving filters and time windows. This is useful for circulating a specific set of filters among your team or with your Branch Technical Account Manager.

![image](/_assets/img/pages/analytics/paid-ads0.png)


## Graph View

Here you can see a visual breakdown of where your various in-app and web events are originating from. See the appendix for a breakdown of each event and filter type. These events can be further filtered by the various analytics tags from their originating ad campaigns. For example:

To see which ad networks are leading to your installs (default view):

![image](/_assets/img/pages/analytics/paid-ads1.png)


To see which campaigns for a specific ad network (GlobalWide Media in this case) got the most clicks:

![image](/_assets/img/pages/analytics/paid-ads2.png)


To see which ad networks lead to the most in-app iOS purchases:

![image](/_assets/img/pages/analytics/paid-ads3.png)


## Table View

The Table View lets you see a more granular view of your event data. Here you can filter and compare fields by the same parameters as in the graph view, and see a side by side view of your events. Use the three vertical column button to select which events you'd like to see in this table.

![image](/_assets/img/pages/analytics/paid-ads4.png)


Some examples of table views:

View which ad networks and campaigns are leading to the most purchases:

![image](/_assets/img/pages/analytics/paid-ads5.png)


View your impression-driven app events:

![image](/_assets/img/pages/analytics/paid-ads6.png)


## Tips and Tricks

- You can export your current table view as a csv file using the download button on the top right of the table.

	![image.half-width](/_assets/img/pages/analytics/paid-ads7.png)

- The Unique checkbox on both the graph and table views allows you to restrict reports to one event of each type per user. For example, take a user who clicked an ad link, then opened the app 7 times within the attribution window for that link. With the Unique box checked, we'd report one of those opens, with it unchecked, we'd report all 7. [Click here to read more about unique events.](/dashboard/people-based-attribution/#unique-behavior)

- When an event is attributed to an ad in a CSV export, **"last_attributed_touch_data_tilde_feature=paid advertising"** and **"last_attributed_touch_data_tilde_advertising_partner_name=ad_partner_name".**
