## Overview

In order to ensure that teams have granular control over which parts of the Branch dashboard their team members can and cannot access, Branch provides a robust dashboard access control system. This system allows account administrators to set and modify access levels for other members, and thus to control what those users can view, edit, and export when using the dashboard.

### Permissions Definitions

Access to pages and actions in the dashboard is controlled using a number of different permissions. Those permissions, along with their definitions, are below:

- **App-level Settings:** Settings or features that can impact functionality app-wide.
- **Channel-level Settings:** Settings or features that can impact functionality across a marketing channel (e.g. Journeys configuration).
- **Link-level Settings:** Settings or features that can impact functionality for single links (e.g. configuration of individual Quick Links).
- **Aggregate Data:** Summary data that contains no granular information (e.g. data on Sources page).
- **Sensitive Data:** Data that can contain user-identifying, payment-related, or secret information (e.g. Branch Key and Secret).
- **Export:** Allows a user to export Sensitive Data from pages they can view.

Each page on the dashboard has its own access requirements. For example, in order to view the Summary page of the dashboard, a user must have view access to Aggregate Data. In order to view the Data Feeds Manager page, on the other hand, a user must have view access to both Channel-level Settings and Sensitive Data. 

### Access Roles

Each dashboard user will have an access role that determines what they will and will not be able to access in the dashboard. We provide several default profiles with predefined access levels, and we also offer the option of creating custom roles to give you as much flexibility as possible when assigning access. The default profiles, along with their permissions, are below:

  | Role | App-level Settings | Channel-level settings | Link-level Settings | Aggregate Data | Sensitive Data | Export
  | --- | :-: | :-: | :-: | :-: | :-: | :-:
  | Admin | Edit | Edit | Edit | View | View | Access
  | Team Member | View | Edit | Edit | View | No Access | No Access
  | Full Read | View | View | View | View | No Access | No Access
 	| Limited Read | No Access | No Access | No Access | View | No Access | No Access

### Access Level Definitions

For each type of permission (e.g. App-level Settings), there are a number of levels of access. Those levels are described below:

**App-level Settings, Channel-level Settings, Link-level Settings**

- Edit: user can see the information and edit it
- View: user can see the information but not edit it
- No Access: user cannot see or edit the information

**Aggregate Data, Sensitive Data**

- View: user can see the data
- No Access: user cannot see the data

**Export**

- Access: user can export sensitive data from pages they can view
- No Access: user cannot export sensitive data, even from pages they can view

### Required Permissions by Dashboard Page

  | Page | Required Permissions (to view) | Default Profiles (to view)
  | --- | :-: | :-:
  | Summary | Aggregate Data | All
  | Web to App/Journeys Banners/Analytics | Aggregate Data | All |
  | Web to App/Journeys Banners/Manager | Channel-level Settings | Admin, Team Member, Full Read |
  | Web to App/Deepviews Previews | Channel-level Settings | Admin, Team Member, Full Read |
  | Web to App/Desktop SMS | Channel-level Settings | Admin, Team Member, Full Read |
  | Ads/Analytics | Aggregate Data | All |
  | Ads/Partner Management | Channel-level Settings | Admin, Team Member, Full Read |
  | Ads/Links | Link-level Settings | Admin, Team Member, Full Read |
  | Email/Analytics | Aggregate Data | All |
  | Email/Manager | Channel-level Settings | Admin, Team Member, Full Read |
  | Organic Search | Channel-level Settings, Aggregate Data | Admin, Team Member, Full Read |
  | Referrals/Analytics | Aggregate Data | All |
  | Referrals/Reward Rules | Channel-level Settings | Admin, Team Member, Full Read |
  | Quick Links | Link-level Settings, Aggregate Data | Admin, Team Member, Full Read |
  | Link Settings | App-level Settings | Admin |
  | Sources | Aggregate Data | All |
  | Content | Aggregate Data | All |
  | Data Import & Export/Data Feeds/Manager | Channel-level Settings, Sensitive Data | Admin |
  | Data Import & Export/Data Feeds/Data Integrations | Channel-level Settings, Sensitive Data | Admin |
  | Data Import & Export/Data Feeds/Webhooks | Channel-level Settings, Sensitive Data | Admin |
  | Data Import & Export/CSV Exports | Sensitive Data, Export | Admin |
  | Liveview | Sensitive Data | Admin |
  | Account Settings/App | App-level Settings | Admin, Team Member, Full Read |
  | Account Settings/User | | All | 
  | Account Settings/Billing | App-level Settings | Admin, Team Member, Full Read |
  | Account Settings/Team | App-level Settings, Sensitive Data | Admin |
  | Account Settings/SSO | App-level Settings | Admin, Team Member, Full Read |
  | Set up SDK | App-level Settings, Sensitive Data | Admin |

### Setting/Modifying Access Roles

You can set a user’s access levels when adding that user to your team in the dashboard, and you can edit existing users’ access levels anytime thereafter (if you have the permissions required to do so).

When adding a new team member, you will be presented with a modal that allows you to select a default profile from a dropdown; if you select the Custom profile from the dropdown, you will have full control over which permissions a user has.

![image](/img/pages/dashboard/access-control-invitation.png)

If you’d like to change the access levels of an existing user, navigate to the Team tab of the Account Settings section of the dashboard and click the “Edit” button next to the user whose access levels you’d like to modify. You will be presented with the same modal.

### Changes to Old Access Roles

Branch previously had only two different access roles for users: Admin and Reports. With the introduction of new access roles, dashboard users with the Admin role were migrated to the new Admin role, and should not experience any change in dashboard access. Meanwhile, users with the old Reports role were migrated to the new Full Read role. 

While the Reports and Full Read roles have similar permission levels, Full Read users do not have access to several sections/actions on the Branch dashboard which were available to Reports users. Full Read users are not able to create, duplicate, or edit links, and they are not able to view or export Sensitive Data in the dashboard, like that in the Account Settings, Liveview, CSV Exports, and Data Integrations sections of the dashboard.

### Getting More Permissions

As a non-Admin user, you may not be able to access/use certain sections of the Branch dashboard. If you’d like more access, please contact an Admin user on your account to ask for more permissions.

If you need further assistance, feel free to reach out to integrations@branch.io.
