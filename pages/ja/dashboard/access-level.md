In order to ensure that teams have granular control over which parts of the Branch dashboard their team members can and cannot access, Branch provides a robust dashboard access control system.

This system allows account administrators to set and modify access levels for other members, and thus to control what those users can view, edit, and export when using the dashboard.

### Permissions Definitions

Access to pages, actions and data in the dashboard is controlled using a number of different permissions. Those permissions, along with their definitions, are below:

#### Entity Views

- **[App Access](app-view.md)**: The "App" view of a Branch account is the standard level of entity access and can include access to the entire Branch dashboard for that app, based on access resource settings and access role type. All accounts include the App view and any user regardless of access role type can access it (to varying degrees).
- **[Organization Access](organization-view.md)**: The "Organization" view of a Branch account is an additional level of entity access and is intended for Branch accounts with a portfolio of distinctly managed apps tied to a single organizational entity. Organization view allows companies to manage separate teams associated with their distinct apps and maintain autonomy. Organization team members can switch between the Organization view and the App view at any time.
- **[Agency Access](agency-view.md)**: The "Agency" view of a Branch account is another additional level of entity access and is intended for Branch accounts that work with agencies - both full AORs and limited - that buy media on their behalf. Agency view allows the Agency to manage its own team within the Branch dashboard. Agency team members can switch between the Agency view and the App view at any time.

!!! info "Entity Views Access"
    While all team members have access to the App view, which additional entity view - Organization and/or Agency - a team member has access to depends entirely upon which view that team member was created within.  

    For example, an Agency team member added within the Organization view will also inherit access to the Organization view in addition to the App view and the Agency view.  If that same Agency team member were instead added within the App view, said Agency team member would only be able to access the App view and the Agency view.


#### Resource Access

- **[App-level Settings](app-level-access.md)**: Settings or features that can impact functionality app-wide.
- **[Channel-level Settings](/dashboard/channel-level-access/)**: Settings or features that can impact functionality across a marketing channel (e.g. Journeys configuration).
- **[Link-level Settings](link-level-access.md)**: Settings or features that can impact functionality for single links (e.g. configuration of individual Quick Links).
- **[Aggregate Data](aggregate-data-access.md)**: Summary data that contains no granular information (e.g. data on Sources page).
- **[Sensitive Data](sensitive-data-access.md)** Data that can contain user-identifying, payment-related, or secret information (e.g. Branch Key and Secret).
- **Export:** Allows a user to export Sensitive Data from pages they can view.

Each page on the dashboard has its own access requirements. For example, in order to view the Summary page of the dashboard, a user must have view access to Aggregate Data. In order to view the Data Feeds Manager page, on the other hand, a user must have view access to both Channel-level Settings and Sensitive Data.

#### Access Roles

Each dashboard user will have an access role that determines what they will and will not be able to access in the dashboard. We provide several default profiles with predefined access levels, and we also offer the option of creating custom roles to give you as much flexibility as possible when assigning access. The default profiles, along with their permissions, are below:

  | Role | App-level Settings | Channel-level settings | Link-level Settings | Aggregate Data | Sensitive Data | Export
  | --- | :-: | :-: | :-: | :-: | :-: | :-: |
  | Admin | Edit | Edit | Edit | View | View | Access
  | Team Member | View | Edit | Edit | View | No Access | No Access
  | Full Read | View | View | View | View | No Access | No Access
 	| Limited Read | No Access | No Access | No Access | View | No Access | No Access

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
  | Ads/Fraud | Aggregate Data | All |
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
  | Account Settings/Agencies | App-level Settings, Sensitive Data | Admin |
  | Account Settings/SSO | App-level Settings | Admin, Team Member, Full Read |
  | Set up SDK | App-level Settings, Sensitive Data | Admin |

### Getting More Permissions

As a non-Admin user, you may not be able to access/use certain sections of the Branch dashboard. If you’d like more access, please contact an Admin user on your account to ask for more permissions.

If you need further assistance, feel free to reach out to integrations@branch.io.
