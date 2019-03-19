!!! warning "Invite Required"
	For any Agency to access a Branch account, an invitation from an Admin user at the [Organization](/dashboard/organization-view/#adding-an-agency) or [App](/dashboard/app-view/#adding-an-agency) entity level of access is required.

	An Agency does not have access to change their own permissions, access billing or SSO.

The "Agency" view of a Branch account is another additional level of entity access and is intended for Branch accounts that work with agencies - both full AORs and limited - that buy media on their behalf. Agency view allows the Agency to manage its own team within the Branch dashboard. Agency team members can switch between the Agency view and the App view at any time.

**The Agency view is for managing account-level functionality; e.g. managing agency team members and access.  Toggle to the [App view](app-view.md) to access the majority of your day-to-day needs for creating links and viewing reporting.**

!!! info "Agencies in App View"
	Due to the nature of allowing third parties access to your data, we've included certain restrictions for Agency users when in App View.  For more detail, please see [Agencies in App View](/dashboard/app-view/#agencies-in-app-view)

When viewing your Branch account via the Agency entity, you can access (either edit or read-only) the following functionality:

<table>
  <tr>
    <th rowspan="5"><img src="/_assets/img/pages/dashboard/access-levels/agency-nav.png"></th>
  </tr>
	<tr>
		<th><b>Agency Entity Access</b></th>
		<th></th>
		<th></th>
		<th></th>
		<th></th>
	</tr>
  <tr>
		<th></th>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<th></th>
		<td></td>
    <td></td>
		<td></td>
		<td></td>
  </tr>
	<tr>
		<th><b>Account<br/>Settings</b></th>
		<td><a href="/dashboard/agency-level-access/#managing-your-agency-profile">Profile</a></td>
		<td><a href="/dashboard/agency-level-access/#managing-your-user-profile">User</a></td>
    <td><a href="/dashboard/agency-level-access/#managing-your-agency-team">Team</a></td>
		<td></td>
  </tr>
</table>

## Account Settings

### Managing your Agency Profile

If you are an Agency Admin, you have edit access to the **Profile** tab.

![image](/_assets/img/pages/dashboard/access-levels/agency-profile.png)

- **Agency Name** - provided by you; editable.
- **Agency ID** - assigned by Branch; not editable.

### Managing your User Profile

Any user type - Agency Admin, Agency Team Member - has the ability to edit the **User** tab.

![image](/_assets/img/pages/dashboard/access-levels/agency-user.png)

- **Dashboard UID** - assigned by Branch; not editable.
- **First and Last Names** - provided by you; editable.
- **Email Address** - provided by you; editable.
- **Change Password** - provided by you; editable.

### Managing Your Agency Team

If you are an Agency Admin, you have edit access to the **Agencies** tab.

![image](/_assets/img/pages/dashboard/access-levels/agency-team-add.gif)

#### Adding an Agency User

To add a new Agency (Admin or Team Member) User:

1. Click the **Add Agency Team Member** button.
2. In the **Add Agency Team Member** modal:
	1. Provide the user's **Email Address**
	1. Provide the user's **First** and **Last** names
	1. Select the appropriate **Access Level**
		- **Agency Admin** - Full access to Account Settings tab, including the ability to add, edit, and remove team members.
		- **Agency Team Member** - Read-only access Account Settings tab.
	1. Click **Invite**.

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
