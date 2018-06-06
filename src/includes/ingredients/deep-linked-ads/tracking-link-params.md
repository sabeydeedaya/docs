Branch Tracking links allow tracking many parameters about the performance of your ad campaigns and individual ads. Additional parameters for advanced analysis may be added to the link after the '?' or '&' character, to trace extra information. 

### Tracking Link Parameters
The following parameters are available to use within the pre-generated tracking link:

#### Campaign Information

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

#### Device Information
Branch Parameter | Description 
--- | --- 
%24aaid | Apple AAID
%24idfa | Google IDFA

#### Spend Calculation
Branch Parameter | Description 
--- | --- 
~cost_model | Cost Model
~cost_value | Cost Value
~cost_currency | Cost Currency

!!! tip "Tracking link with additional parameters"
    Here is the example how to pass Agency and Sub Publisher with Tracking link:
    https://tracking.app.link?%243p=a_partner&~agency=myAgency&~secondary_publisher=best_publisher
