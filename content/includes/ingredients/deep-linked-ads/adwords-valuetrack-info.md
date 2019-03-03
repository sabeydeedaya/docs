#### Google Adwords Valuetrack Parameters

Branch utilizes Google's Valuetrack parameters to collect more detailed information on the source of an ad click. Furthermore, we dynamically map Adword's **campaign id** and **network parameters** to a Branch link's campaign analytics `Campaign` and `Channel` tags respectively. Leave these tags blank to have them dynamically mapped.

See below for a table of Valuetrack parameters collected by default through Branch's Ad links and refer to the table in [Google's Valuetrack docs](https://support.google.com/adwords/answer/6305348){:target="_blank"} for more parameters to append.

Default Valuetrack Parameters on Branch Ad links | What it returns
--- | ---
\{campaignid\} | The ad's campaign ID
\{adgroupid\} | The ad's ad group ID
\{keyword\} | For the Search Network: the keyword from your account that matches the search query, unless you are using a Dynamic Search ad, which returns a blank value. For the Display Network: the keyword from your account that matches the content.
\{placement\} | The content site where your ad was clicked (for keyword-targeted campaigns), or the matching placement targeting criteria for the site where your ad was clicked (for placement-targeted campaigns)
\{network\} | Where the click came from: "g" for Google search, "s" for a search partner, or "d" for the Display Network
\{lpurl\} | The final URL of the ad link clicked
