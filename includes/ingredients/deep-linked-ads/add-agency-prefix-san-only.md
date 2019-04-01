## Adding the Agency Prefix to Campaign Name

Only agencies managing advertising campaigns on behalf of a client must prepend their `Agency ID` to the campaign name when creating advertising campaigns for Self-Attributing Networks (SANs).  

!!! error "Agency ID Required"
	Failure to prepend the campaign name with the `Agency ID` will result in any subsequent conversion not being properly attributed to the responsible agency.

### Finding Your Agency ID

You can find your Agency ID under Account Settings in the [Agency view](/dashboard/agency-view/#managing-your-agency-profile).

### Creating Your Agency Prefix

Your agency prefix **must** adhere to the following format:

	`agency_id_{{YOUR AGENCY ID HERE}}_`

!!! info "Example Campaign with Agency Prefix"
 	`agency_id_{{1234567890}}_My_SAN_Ad_Campaign`
