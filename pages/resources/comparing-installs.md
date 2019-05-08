## iTunes Connect Reports

### Timezones

iTunes Connect reports operate in different timezones for different territories. While the Attribution Analytics platform reports all installs using the account or user timezone, iTunes has different timezone for reporting. iTunes Connect reports uses the following:

- US, Canada, Latin America: Pacific Standard Time (PST)
- Europe, Middle East, Africa, Asia Pacific: Central Europe Time (CET)
- Japan: Japan Standard Time (JST)
- Australia, New Zealand: Western Standard Time (WST)

Reports are generated after the close of business in the final time zone (which is PST). As such, reports are generally available by 8:00 AM PST for the previous day. In order to reconcile platform reports with iTunes Connect reports, you must reconcile territory by territory. For PST, first set your user timezone to PST if it is not already. When you change the timezone setting, you must logout and log back in for the timezone change to take effect for your Attribution Analytics reports. Then generate a report in the platform for US, Canada, and Latin America. Now you can compare these install numbers to iTunes Connect reports for these territories. For CET, set your user timezone to CET and generate a similar report for the territory, etc.

### App Units are listed under the “Sales” Measure

-  Some apps on the store are paid, but this measure includes downloads for both an app that is free and an app that is paid. In the case of a free app, the app unit is counted as expected (it just won’t have a dollar amount tied to it). You should therefore definitely see App Units recorded for your app.

- Please note that [App Units](http://help.apple.com/itc/appanalytics/en.lproj/static.html#itc3519b4793) (unlike Installations) are counted upon download (not upon app open) and do not include re-downloads. Also, App Units are counted at the account level and not device level (i.e. if I download the same app on my iPad and on my iPhone, that will only count as one App Unit, but will count as 2 Installations)

### Differences between App Analytics and Sales & Trends

- The App Units measure in App Analytics only include downloads from iOS8 and tvOS 9 and later, while App Units in Sales & Trends includes data from all OS versions
- Metrics in App Analytics may also not match exactly with what appears in Sales and Trends because of the time zones selected. To more closely match the numbers in App Analytics with those in Sales and Trends, set the time zone in Sales and Trends to UTC, the time zone used by App Analytics. If you still see any concerning discrepancies, please let us know and we can help investigate further.

### Installations

- This is indeed the measure closest to what developers track through other third parties, as it is counted upon app open, and includes re-downloads. However, please note that Installations are only reported based on opt-in in App Analytics, so they will always appear lower in App Analytics when compared to another service.
- Users may download the app, but may not run it or may run it after a [look-back period](http://help.tune.com/marketing-console/setting-your-attribution-windows/) expires from the click.
- Users may download the app, but run it on a different day. (Apples reports vary by reason and fiscal time frames.)
- Users may download the app, but only run it when they don't have network access. Our Attribution Analytics SDK tries to mitigate this issue by queuing the network request and trying it up to 5 times when the device connects.
- Users with jailbroken devices may get the app from a different source and install it, which results in an organic install in Attribution Analytics.
- Users download the app once, but get a new phone and download the app again on the new phone, which results in an organic install.
- Users may download an app multiple times, but run it on the same device (for example, a device that connects to multiple iTunes accounts).
- Attribution Analytics reports the date time based on first app open, while iTunes uses the date time of the download instead (which can cause some variation when comparing on a daily basis).

## Google Play Reports

### Timezones

Google Play lets you define the timezone for your developer account. All installs globally are reported by Google Play using this timezone. To compare Google Play reports to Branch reports, get the timezone for your Google Play developer account. Then ensure the timezone for your user in the Branch dashboard is set to the same timezone as Google Play. When you change the setting in your Branch account, you must logout and log back in for the timezone change to take effect in your reports. Now you can compare Google Play reports to Branch reports because both systems are displaying data in the same timezone.

### Installs at Download vs App Open

There may still be discrepancies because the Google Play reports measure Installs at Download while Branch measures them when the app is first run. There may be a lag between the two events. It is also much easier on Android to download from other app stores than it is on iOS, so if you have a paid app that is being pirated we will record the first run even though Google Play never saw a download.

### Installs per Google Account

On a related note, Google Play only counts one download per app per Google account.  This means if a user were to install the same app on another device using the same google account, Google Play would not count it as a new download. Branch, on the other hand, counts installs per device which means we do not take the google account into consideration and will count an app install on a new device even if the same google account is used.
