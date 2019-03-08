The "App" level of a Branch account is the third level of access and includes access (either edit or read-only) to the following functionality:

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
		<th><b>App Level</b></th>
		<th></th>
		<th></th>
		<th></th>
    <th></th>
	</tr>
  <tr>
		<th><b>Ads</b></th>
		<td><a href="/dashboard/app-level-access/#partner-management">Partner<br/>Management</a></td>
		<td></td>
		<td></td>
    <td></td>
	</tr>
	<tr>
		<th><b>Link<br/>Settings</b></th>
		<td><a href="/dashboard/app-level-access/#general">General</a></td>
    <td><a href="/dashboard/app-level-access/#attribution-windows">Attribution<br/>Windows</a></td>
		<td></td>
    <td></td>
  </tr>
	<tr>
		<th><b>Account<br/>Settings</b></th>
		<td><a href="/dashboard/app-level-access/#managing-your-app-profile">Profile</a></td>
		<td><a href="/dashboard/app-level-access/#managing-your-user-profile">User</a></td>
    <td><a href="/dashboard/app-level-access/#viewing-billing">Billing</a></td>
    <td><a href="/dashboard/app-level-access/#managing-your-app-team">Team</a></td>
  </tr>
</table>

## Account Settings

### Managing your App Profile

![image](/_assets/img/pages/dashboard/access-levels/app-level-profile.png)

If you are an Admin, you have edit access to the **Profile** tab.

- **Branch Key** - provided by Branch; resettable.
- **Branch Secret** - provided by Branch; resettable.
- **App Name** - provided by you; editable.
- **App ID** - assigned by Branch; not editable.
- **Time Zone** - Your time zone affects your dashboard analytics and how your Branch data matches up with external data sources. Use the drop-down to select the appropriate time zone.

### Managing your User Profile

![image](/_assets/img/pages/dashboard/access-levels/org-user.png)

Any user type - Admin, Team Member, Full Read, Limited Read - has the ability to edit the **User** tab.

- **Dashboard UID** - assigned by Branch; not editable.
- **First and Last Names** - provided by you; editable.
- **Email Address** - provided by you; editable.
- **Change Password** - provided by you; editable.

### Viewing Billing

### Managing Your App's Team

If you are an Admin, you have edit access to the **Team** tab.

#### Adding an App Team User

![image](/_assets/img/pages/dashboard/access-levels/app-team-add.gif)

To add a new App Team User:

1. Click the **Add App Team Member** button.
2. In the **Add App Team Member** modal:
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

#### Defining Permissions

Each access level - as defined above - comes with predefined permissions which you can edit if you choose.

!!! tip "Modifying Permissions"
	If you want to modify a predefined access level, click the pencil icon to (de)select the available options.

- **Link-level Settings** - Settings or features that can impact functionality for single links.
- **Channel-level Settings** - Settings or features that can impact functionality across a marketing channel.
- **App-level Settings** - Settings or features that can impact functionality app-wide.
- **Aggregate Data** - Summary data that contains no granular data.
- **Sensitive Data** - Data that can contain user-identifying, payment-related, or secret information.

#### Modifying an App Team Member

![image](/_assets/img/pages/dashboard/access-levels/app-team-edit.png)

To modify an existing App Team Member:

1. Find the App Team member you want to modify and click the **...** button in the **Actions** column for that user.
1. To edit the App Team member:
	1. Click **Edit** and modify any of the following:
		- Email
		- First and Last names
		- Access Level
	1. Click **Save**.
1. To resend the invitation to join the account:
	1. Click **Resend Invite**.
1. To delete the App Team member:
	1. Click **Delete**.
	1. In the **Are you sure you want to delete?** modal, click **Yes, Delete**.

## Link Settings

### General

If you are an Admin, you have edit access to the **General** tab.

#### General Redirect Settings

 ![image](/_assets/img/pages/dashboard/access-levels/general-redirect-settings.png)

#### iOS Redirects

![image](/_assets/img/pages/dashboard/access-levels/ios-redirects.png)

#### Android Redirects

![image](/_assets/img/pages/dashboard/access-levels/android-redirects.png)

#### Fire Redirects

![image](/_assets/img/pages/dashboard/access-levels/fire-redirects.png)

#### Default URL

![image](/_assets/img/pages/dashboard/access-levels/default-url.png)

#### Desktop Redirects

![image](/_assets/img/pages/dashboard/access-levels/desktop-redirects.png)

#### Advanced Mobile Redirects

![image](/_assets/img/pages/dashboard/access-levels/advanced-mobile-redirects.png)

#### Advanced Settings

![image](/_assets/img/pages/dashboard/access-levels/advanced-settings.png)

- **Match Type**
    - Recommended `Normal`. Selecting `Unique` means that Branch will only make a deep link through install match if there is a single, unique outstanding footprint. For example, if you and your twin both have iPhone 5s with the same OS/version, etc and click different links for the same app, then open the app up at the same time, we won’t deep link when Unique is selected. You probably don’t want this as it’s mostly for very special circumstances.
- **Use UTM tags for analytics (for dynamically-created links)**
    - Recommend `disabled`. If you enable this, Branch will automatically set channel, feature, campaign, tags and $keywords based on UTM params. This only applies to dynamically created links, not links generated through the Dashboard, API or SDKs.

        | UTM parameter | Branch parameter
        | --- | --- |
        | utm_source | Channel
        | utm_medium | Feature
        | utm_campaign | Campaign
        | utm_content | Tags
        | utm_term | Keywords (not visible on Dashboard)

- **Enable Link Scraping**
    - If you enable this, Branch will automatically add data from your website's meta tags.

#### Social Media Display Customization

![image](/_assets/img/pages/dashboard/access-levels/social-media-display-customization.png)

#### Link Domain

![image](/_assets/img/pages/dashboard/access-levels/link-domain.png)

### Attribution Windows

!!! info "Default Attribution Window Settings"
		Each attribution window has its own default measured in days.  Please refer to the image below for these defaults.

![image](/_assets/img/pages/dashboard/people-based-attribution/attribution-windows.png)

- `Deep Linking Duration` refers to the duration of time someone is eligible to receive deep link data. This includes anyone clicking a Branch link, or being automatically redirected to the app through a Branch Web SDK call. Measured in minutes.

- `Click to x` refers to events that occur after someone clicks a Branch link. If someone clicks and installs from a link, and comes back 10 days later to purchase, we would count that as a conversion, and it would surface in our dashboard. Measured in days.

- `Impression to x` refers to events that occur after someone views a Branch impression link. Measured in days.

- `Re-engagement Inactivity` defines the period between two events that a user must be inactive in order to define the later event as a re-engagement. Used in re-engagement cohort analysis but not activity analysis.

## Ads

### Partner Management
