Bracnh Tracking links allows to track many paramemers about performance you ad campaign and ads. Additional parameters for advanced analysis may be added to the link after the '?' character, to trace extra information. 

## Tracking Link Parameters
The following parameters are available to use within the generated tracking link:

### Campaign Info

Branch Parameter | Description 
--- | --- 
~agency | Agency name
~secondary_publisher | Sub Publisher
~campaign | Campaign name
~campaign_id | Campaign ID
~channel | Channel
~feature | Feature
~stage | Stage
~tags | Tags
~creative_name | Creative name
~creative_id | Creative ID
~ad_set_name | Ad set name
~ad_set_id | Ad set ID
~ad_name | Ad unit name
~ad_id | Ad unit ID
~banner_dimensions | Banner Dimension
~placement | Placement
~keyword_id | Keyword ID

### Spend Calculation
Branch Parameter | Description 
--- | --- 
~cost_model | Cost Model
~cost_value | Cost Value
~cost_currency | Cost Currency

!!! tip "Tracking link with additional parameters"
    Here is the example how to pass Agency and SubPublisher info with Tracking link:
    https://tracking.app.link?~agency=myAgency&~secondary_publisher=best_publisher