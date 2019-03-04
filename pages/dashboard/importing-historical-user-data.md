Any time the Branch SDK sees a user we've never seen before, Branch logs a new install record for that user. While perfect for new apps being introduced to the app stores, this presents a problem for existing apps in the app store, but new to Branch.

If your app already has an established user base before you implement the Branch SDK, you will encounter issues with false positives (new installs) that are actually not new to your app, only new to Branch.

To avoid unnecessary discrepancies and ensure your existing users are not attributed as new installs, use the Persona Data Import Tool to inform Branch about your pre-existing users.

## How It Works

1. Format your historical data to adhere to the supported [JSON line text format](http://jsonlines.org/).
	- See Import File Format section below for information on required and optional fields.
	- Branch can ingest historical data from any source - other attribution providers, third party analytics providers and internal BI systems - as long as this data conforms to the file format requirement containing the mandatory fields.
2. Contact your CSM or reach out to <support@branch.io> to begin the import process.
3. Once your historical data has been imported and verified, your CSM or Support contact will send notification of a successful import.

## Things to Keep in Mind

- Downstream analytics remain unaffected → no spike in installs on day of import.
- According to our privacy policy, users who have no attribution data recorded on the Branch platform for 30 days after import, or no activity at all for 90 days after import, will be deleted.
- The following functionality is currently not supported:
	- Attribution to clicks that were recorded before import.
	- Analysis / viewing of historical data within dashboard or exports.

## Import File Format
Before Branch can ingest your historical user data, please ensure your data conforms to the [JSON line text format](http://jsonlines.org/).

!!! warning "JSON Line Text Format Required"
		We are unable to translate or ingest data in other formats.

Each individual log should be captured in single line json object including the following required fields:
```
{
	"timestamp": <unix epoch milliseconds long>(required),
	"app_id": <app ID long>(required; your Branch App ID),
	"idfa": "<idfa string>" (required for iOS devices),
	"gaid": "<google ad id string> (required for Android devices),
	"windows_aid": "<windows ad id string>" (required for Windows devices),
	"kindle_aid": "<kindle hardware id string>" (required for Kindle devices),
	"touch_type": "click/impression" (required if not organic)
}
```
Optional supported fields:
```
"idfv": "<idfv string>",
“android_id”: <google android id string>,
"developer_id": "<customer user id string">,
"os_version": string,
"sdk_version": string,
"country_code": string,
“region_name": string,
"skip_record": 0 (=>1 to exclude record from import),
```
