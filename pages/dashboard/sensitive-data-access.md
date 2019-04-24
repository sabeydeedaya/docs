The "Sensitive Data" level of a Branch account is the fifth level of access and includes access (either view or no access) to the following functionality:

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
	</tr>
	<tr>
		<th><b>Sensitive Data</b></th>
		<th></th>
		<th></th>
		<th></th>
    <th></th>
	</tr>
  <tr>
		<th><b>Data Import & Export</b></th>
		<td><a href="/dashboard/sensitive-data-access/#data-feeds-manager">Data Feeds Manager</a></td>
		<td><a href="/dashboard/sensitive-data-access/#data-integrations">Data Integrations</a></td>
		<td><a href="/dashboard/sensitive-data-access/#webhooks">Webhooks</a></td>
    <td></td>
	</tr>
	<tr>
		<th><b>Account<br/>Settings</b></th>
		<td><a href="/dashboard/sensitive-data-access/#managing-your-team">Team</a></td>
		<td></td>
    <td></td>
    <td></td>
  </tr>
	<tr>
		<th><b>Testing</b></th>
		<td><a href="/dashboard/sensitive-data-access/#liveview">Liveview</a></td>
    <td><a href="/dashboard/sensitive-data-access/#set-up-sdk">Set up SDK</a></td>
		<td></td>
    <td></td>
  </tr>
</table>

## Data Import & Export

If you are an Admin, you have edit access to the sections below.

### Data Feeds Manager

!!! warning "Channel Level Access Required"
	Access to the Data Feeds Manager tab also requires [Channel Level Access](channel-level-access.md).

![image](/_assets/img/pages/dashboard/access-levels/channel-data-feeds-manager.png)

- **Data Export API** - Programmatically access Branch event data with granular details like timestamp, OS, and more.
- **Query API** - Programmatically query for any of the pre-aggregated Branch event data that you can see on the dashboard.

### Data Integrations

!!! warning "Channel Level Access Required"
	Access to the Data Feeds Manager tab also requires [Channel Level Access](channel-level-access.md).

![image](/_assets/img/pages/dashboard/access-levels/channel-data-integrations.png)

!!! info "Enabling a Data Integration"
	Please refer to Branch's [List of Data Integrations](/integrations/data-integrations-list/) article to view a complete list of our Data Integrations and instructions on how to enable each integration.

### Webhooks

!!! warning "Channel Level Access Required"
	Access to the Data Feeds Manager tab also requires [Channel Level Access](channel-level-access.md).

You can add new webhooks, edit existing webhooks and archive unwanted webhooks.

![image](/_assets/img/pages/dashboard/access-levels/channel-webhooks1.png)

!!! info "Webhook Setup"
	Please refer to the [Webhooks](/exports/ua-webhooks/) article for an in-depth tutorial on how to configure webhooks.

## Account Settings

### Managing Your Team

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

## Testing

### Liveview

If you are an Admin, you have view access to the **Liveview** tab.

Liveview enables you to debug the following objects:

Events
Links
Webhook records
Credits

!!! info "Getting Started with Liveview"
	Please refer to the [Liveview](/exports/pba-liveview/) article for an in-depth tutorial on how use Liveview.

### Set up SDK

If you are an Admin, you have view access to the **Set Up SDK** tab.

![image](/_assets/img/pages/dashboard/access-levels/sensitive-set-up-sdk.gif)

!!! info "Full Integration Guides"
	Please refer to Branch's [SDK Integration](/resources/native-sdks-and-plugins/) guides for in-depth tutorials on how to integrate any of the native Branch SDKs as well as supported plugins.
