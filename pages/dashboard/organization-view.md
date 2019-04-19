The "Organization" view of a Branch account is an additional level of entity access and is intended for Branch accounts with a portfolio of distinctly managed apps tied to a single organizational entity. Organization view allows companies to manage separate teams associated with their distinct apps and maintain autonomy. Organization team members can switch between the Organization view and the App view at any time.

!!! info "INFO"
    Depending on your business and how you manage your apps, you may elect to add the Organization Entity to your Branch account.

    All TUNE migrated accounts include the Organization entity in their Branch account.

**The Organization view is for managing account-level functionality; e.g. managing org team members and access.  Toggle to the [App view](app-view.md) to access the majority of your day-to-day needs for creating links and viewing reporting.**

## Organization View Overview

When viewing your Branch account via the Organization entity, you can access (either edit or read-only) the following functionality:

<table>
  <tr>
    <th rowspan="6"><img src="/_assets/img/pages/dashboard/access-levels/org-level-nav.png"></th>
  </tr>
	<tr>
		<th></th>
		<th></th>
		<th></th>
		<th></th>
    <th></th>
    <th></th>
	</tr>
	<tr>
		<th><b>Org Entity Access</b></th>
		<th></th>
		<th></th>
		<th></th>
    <th></th>
    <th></th>
	</tr>
  <tr>
		<th><b>Ads</b></th>
		<td><a href="/dashboard/organization-level-access/#partner-management">Partner<br/>Management</a></td>
		<td></td>
		<td></td>
    <td></td>
    <td></td>
	</tr>
	<tr>
		<th><b>Link<br/>Settings</b></th>
		<td><a href="/dashboard/organization-level-access/#attribution-windows">Attribution<br/>Windows</a></td>
    <td></td>
		<td></td>
    <td></td>
    <td></td>
  </tr>
	<tr>
		<th><b>Account<br/>Settings</b></th>
		<td><a href="/dashboard/organization-level-access/#managing-your-organization-profile">Profile</a></td>
		<td><a href="/dashboard/organization-level-access/#managing-your-user-profile">User</a></td>
    <td><a href="/dashboard/organization-level-access/#managing-your-organizations-team">Team</a></td>
    <td><a href="/dashboard/organization-level-access/#managing-agency-access">Agencies</a></td>
    <td><a href="/dashboard/organization-level-access/#single-sign-on">SSO</a></td>
  </tr>
</table>

## Ads

### Partner Management

!!! info "COMING SOON"
	Allow enabling and editing of ad networks at the org level.

## Link Settings

### Attribution Windows

!!! info "Default Attribution Window Settings"
		Each attribution window has its own default measured in days.  Please refer to the image below for these defaults.

![image](/_assets/img/pages/dashboard/people-based-attribution/attribution-windows.png)

- `Deep Linking Duration` refers to the duration of time someone is eligible to receive deep link data. This includes anyone clicking a Branch link, or being automatically redirected to the app through a Branch Web SDK call. Measured in minutes.

- `Click to x` refers to events that occur after someone clicks a Branch link. If someone clicks and installs from a link, and comes back 10 days later to purchase, we would count that as a conversion, and it would surface in our dashboard. Measured in days.

- `Impression to x` refers to events that occur after someone views a Branch impression link. Measured in days.

- `Re-engagement Inactivity` defines the period between two events that a user must be inactive in order to define the later event as a re-engagement. Used in re-engagement cohort analysis but not activity analysis.

## Account Settings

### Managing your Organization Profile

![image](/_assets/img/pages/dashboard/access-levels/org-profile.png)

If you are an Organization Admin, you have edit access to the **Profile** tab.

- **Organization Name** - provided by you; editable.
- **Organization ID** - assigned by Branch; not editable.
- **Time Zone** - Your time zone affects your dashboard analytics and how your Branch data matches up with external data sources. Use the drop-down to select the appropriate time zone.

### Managing your User Profile

![image](/_assets/img/pages/dashboard/access-levels/org-user.png)

Any user type - Admin, Team Member, Full Read, Limited Read - has the ability to edit the **User** tab.

- **Dashboard UID** - assigned by Branch; not editable.
- **First and Last Names** - provided by you; editable.
- **Email Address** - provided by you; editable.
- **Change Password** - provided by you; editable.

### Managing Your Organization's Team

If you are an Organization Admin, you have edit access to the **Team** tab.

#### Adding an Organization User

![image](/_assets/img/pages/dashboard/access-levels/org-team-add.gif)

To add a new Organization User:

1. Click the **Add Organization Team Member** button.
2. In the **Add Organization Team Member** modal:
	1. Provide the user's **Email Address**
	1. Provide the user's **First** and **Last** names
	1. Select the appropriate **Access Level**
		- **Admin** - Edit access to all settings and export access to all data.
		- **Team Member** - Edit access to channels and links, read-only access to app settings, and access to aggregate data.
		- **Full Read** - Read-only access to all settings and access to aggregate data.
		- **Limited Read**  - Access to aggregate data only.
		- **Custom** - Customize settings and data access.
		- **No Access** - no dashboard access.
	1. Click **Invite**.
  1. In the **Organization Settings** modal, select either:
    - All apps that inherit from the organization
    - All apps
  1. Click **Save**

#### Defining Permissions

Each access level - as defined above - comes with predefined permissions which you can edit if you choose.

!!! tip "Modifying Permissions"
	If you want to modify a predefined access level, click the pencil icon to (de)select the available options.

- **Link-level Settings** - Settings or features that can impact functionality for single links.
- **Channel-level Settings** - Settings or features that can impact functionality across a marketing channel.
- **App-level Settings** - Settings or features that can impact functionality app-wide.
- **Aggregate Data** - Summary data that contains no granular data.
- **Sensitive Data** - Data that can contain user-identifying, payment-related, or secret information.

#### Modifying an Organization Team Member

![image](/_assets/img/pages/dashboard/access-levels/org-team-edit.png)

To modify an existing Organization Team Member:

1. Find the Organization Team member you want to modify and click the **...** button in the **Actions** column for that user.
1. To edit the Organization Team member:
	1. Click **Edit** and modify any of the following:
		- Email
		- First and Last names
		- Access Level
	1. Click **Save**.
1. To resend the invitation to join the account:
	1. Click **Resend Invite**.
1. To delete the Organization Team member:
	1. Click **Delete**.
	1. In the **Are you sure you want to delete?** modal, click **Yes, Delete**.

### Managing Agency Access

If you are an Organization Admin, you have full edit access to all of the Account Settings mentioned above including the ability to add an Agency - both a Full Access and/or Limited Access Agency - to your Branch account.

!!! info "Additional Info"
	You can only add agencies via the **Agencies** tab. Trying to add agencies via the **Team** tab will throw an error as only non-agency users should be added via the Team Tab.

#### Adding an Agency

To add an Agency:

1. Go to **Account Settings** and click on the **Agencies** tab.
1. On the **Agencies** tab, click the **Add New Agency** button.
1. In the **Add New Agency** modal:
	1. Select the Agency name from the drop-down.
	1. Select the appropriate level of access.
		- **Admin** - Edit access to all settings and export access to all data.
		- **Team Member** - Edit access to channels and links, read-only access to app settings, and access to aggregate data.
		- **Full Read** - Read-only access to all settings and access to aggregate data.
		- **Limited Read**  - Access to aggregate data only.
		- **Custom** - Customize settings and data access.
		- **No Access** - no dashboard access.
	1. Click "Invite".
	1. All Agency Admins on the agency account will receive an invitation email, and any of those Agency Admins can accept the invitation on behalf of their agency.

!!! warning "Granting agencies Sensitive Data & App-Level Settings permissions"
	Agencies with Sensitive Data & App-Level Settings permissions to an Org or App will have access to that Org/App's API keys, which can be used to access Branch's [HTTP](https://docs.branch.io/apps/deep-linking-api/) and [Data Export](https://docs.branch.io/exports/api-v3/#__search) APIs. Agency data filters (e.g. Only Show Agency-tagged Data) will not apply to data accessed via the Data Export API, so we recommend against granting agencies these permissions and providing them with API keys.

#### Defining Permissions

Each access level - as defined above - comes with predefined permissions which you can edit if you choose.

!!! tip "Modifying Permissions"
	If you want to modify a predefined access level, click the pencil icon to (de)select the available options.

- **Link-level Settings** - Settings or features that can impact functionality for single links.
- **Channel-level Settings** - Settings or features that can impact functionality across a marketing channel.
- **App-level Settings** - Settings or features that can impact functionality app-wide.
- **Aggregate Data** - Summary data that contains no granular data.
- **Sensitive Data** - Data that can contain user-identifying, payment-related, or secret information.

#### Additional Data Filters

During the process of granting an agency access to your Branch account, you can also impose limitations around what data is available to the agency at any given time.

- **Only Show Agency-tagged Data** - When toggled on, agency users can only see events tagged with their Agency ID.
- **Restrict Access to Revenue Data** - When toggled on, agency users cannot view revenue data.
- **Only Show Data from Specific Ad Networks** - When toggled on, agency users can only view events from a specific list of ad networks.
- **Only Show Data from Specific Locations** - When toggled on, agency users can only view events that have taken place in a specific list of countries.

!!! warning "Agency Invitation"
	Once you've defined the appropriate levels of access for your Agency, you must **Invite** them to access the Branch dashboard. Only Organization Admins can invite an Agency to access the Branch dashboard.

#### Modifying an Agency Team Member

To modify an existing Agency Team member:

1. Find the Agency Team member you want to modify and click the **...** button in the **Actions** column for that user.
1. To edit the Agency member:
	1. Click **Edit** and modify any of the following:
		- Email
		- First and Last names
		- Access Level
	1. Click **Save**.
1. To resend the invitation to join the Agency account:
	1. Click **Resend Invite**.
1. To delete the Agency member:
	1. Click **Delete**.
	1. In the **Are you sure you want to delete?** modal, click **Yes, Delete**.

### Single Sign On

Branch offers Security Assertion Markup Language (SAML) / Single Sign-on (SSO) support for the dashboard. This allows you to use your identity provider (IdP) to centralize access to various services for your team and leverage existing directory systems and security groups.

Please see [Enabling Single Sign On](/dashboard/sso/) for instructions.
