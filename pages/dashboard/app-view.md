The "App" view of a Branch account is the standard level of entity access and can include access to the entire Branch dashboard for that app, based on access resource settings and access role type.

## App View Overview

All accounts include the App view and any user regardless of access role type can access it (to varying degrees).

<table>
  <tr>
    <th rowspan="7"><img src="/_assets/img/pages/dashboard/access-levels/app-level-nav.png"></th>
  </tr>
	<tr>
		<th></th>
		<th></th>
		<th></th>
		<th></th>
    <th></th>
	</tr>
	<tr>
		<th><b>App Entity Access</b></th>
		<th></th>
		<th></th>
		<th></th>
    <th></th>
	</tr>
  <tr>
		<th><b>Summary</b></th>
		<td><a href="/dashboard/analytics">Summary</a></td>
		<td></td>
		<td></td>
    <td></td>
	</tr>
	<tr>
		<th><b>Channels & Links</b></th>
		<td><a href="/resources/branch-channels/">Channels Overview</a></td>
    <td><a href="/links/branch-links-overview/">Links Overview</a></td>
		<td></td>
    <td></td>
  </tr>
	<tr>
		<th><b>Cross Channel Analytics</b></th>
		<td><a href="/activity-reports-analytics/content-analytics/">Content Analytics</a></td>
		<td>Sources Analytics</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
		<th><b>Setup & Testing</b></th>
		<td><a href="/exports/data-feeds-overview/">Data Import & Export</a></td>
		<td><a href="/exports/pba-liveview/">Liveview</a></td>
    <td><a href="/dashboard/account-settings/">Account Settings</a></td>
    <td><a href="/resources/native-sdks-and-plugins/">Set up SDK</a></td>
  </tr>
</table>

!!! info "App Entity Access vs App-level Settings"
	Despite the similar nomenclature, App Entity Access (this page) should not be confused with [App-level Settings](/dashboard/app-level-access/) that control functionality once viewing the dashboard via the app entity.

## Agencies in App View

### Agency-tagged Data

When an Agency users saves an ad link/Journey/Quick Link, that ad link/Journey/Quick Link is associated with that Agency via a unique `agency_id`.

- For ad links/Quick Links, `agency_id` is included as a key-value in deep linking setup.

![image](/_assets/img/pages/dashboard/access-levels/app-view-link-agency-id.png)

- For Journeys, `agency_id` is included as a key-value in template-level link data.

![image](/_assets/img/pages/dashboard/access-levels/app-view-journeys-agency-id.png)

### Agency Association to Self Attributing Networks (SANs)

!!! warning "Agency ID Prefix Required"
	If the Agency user does not prepend their Agency ID to the campaign name when setting up the campaign in the partner's dashboard, Branch cannot associate any resulting conversions to the agency.

While most partners rely on a Branch link for the measuring and attributing of ad clicks/impressions for your mobile app, a handful of partners don’t use links at all. Instead they rely on sending and receiving attribution data via a server-to-server integration. This means that, for these partners, agency-managed campaigns don’t inherently include these partners’ conversion statistics.

In order to associate an Agency with campaigns run on SANs, Agency users must prepend campaign names with their Agency ID - `agency_{agency_id}_` - within the partner platform; e.g. `agency_1234_My_SAN_Campaign`.

!!! info "Finding Your Agency ID"
	You can find your Agency ID under Account Settings in the [Agency view](/dashboard/agency-view/#managing-your-agency-profile).

### Filtering by Agency

When viewing analytics, data is filterable by `Agency` via:

- Ads Analytics, Journeys Analytics, Quick Links and Sources
- An advanced filter in Webhooks
- An `agency_name` column in exported CSVs (Data Export API, dashboard CSV exports)

!!! note "Viewing other Agencies Data"
	Only Agencies given the ability to view other Agencies data will be able to filter analytics by Agency.
