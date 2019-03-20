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

### Filtering by Agency

When viewing analytics, data is filterable by `Agency` via:

- Ads Analytics, Journeys Analytics, Quick Links and Sources
- An advanced filter in Webhooks
- An `agency_name` column in exported CSVs (Data Export API, dashboard CSV exports)

!!! note "Viewing other Agencies Data"
	Only Agencies given the ability to view other Agencies data will be able to filter analytics by Agency.

### Default Agency Restrictions

Due to the nature of allowing third parties access to your data -  as well as what data you don't want them to access - when an Agency team member is in App view, they will not be able to access certain aspects of the Branch account regardless of the access levels applied to the user.

- Agency users cannot add/remove team members to/from their customers’ dashboards.
- Agency users are not allowed to reset app keys or delete apps.
- Agency users are not allowed to add/remove agency access.
- Agency users are allowed to create apps in the Organization view, but not stand-alone apps in the App view.
	- This means agencies don’t actually “own” apps; rather they’ll just be able to manage the apps of others.
- Agency users do not have access to the Billing and SSO sections of their customers’ dashboards.
- Agency users cannot export log-level data via the Data Import & Export section.
- Agency users do not have access to an app's revenue data.

!!! info "Disabled Functionality"
	Any restricted functionality - either due to default Agency restrictions or selected access levels - in the Branch dashboard will be (1) grayed out, (2) not clickable, (3) include a pop up modal informing the user about restricted access.
