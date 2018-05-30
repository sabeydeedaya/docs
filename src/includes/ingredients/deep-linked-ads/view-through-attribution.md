### View-Through Attribution (VTA) with Impression Pixels

View-through attribution allows you to track installs, session starts and conversion events back to an ad impression, even if the ad was never clicked on. 

Our view-through attribution logic is currently as follows for any given event:

- If there's a click within a valid attribution window, give credit to the click.
- If there's no click within a valid attribution window, give credit to the last impression that was within a valid attribution window.

Currently, view through attribution is supported for Self Attributing Networks (SANs), such as Facebook and Google, and non-SAN networks with server to server impression link support. To create a impression tracking link for non-SAN networks, simply [create an ad link](#create-an-ad-link), and grab the impression link from the final step of link creation. SAN networks support VTA without any additional links.

!!! tip "Impression Link Formatting for VTA"

        For view through attribution, make sure the impression pixel returned by Branch's dashboard has `%24s2s=true` and an `%24idfa` or `%24aaid` macro. If you just want to count impressions, without attribution, these macros are not needed. Questions? Contact integrations@branch.io.