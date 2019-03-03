## What is Content Analytics?

Content Analytics provides views, links, clicks, installs, and opens for your app at the _content_-level. 'Content' is a general term, and what qualifies as a single piece of content will vary based on what's inside your app. Content could be an article, or a photo, or a video, or a recipe, or a user-generated post—or it could be one of many other items.

A piece of content could even be a monster! Yes, in the case of Branch Monster Factory (the Branch team's app), a piece of content is a single monster created by a user:

![image](/_assets/img/pages/analytics/content-analytics0.png)


## Why does Content Analytics matter to me?

Your content is your app's most valuable asset—it's what draws users in and what keeps them coming back. There's significant value in understanding which content is most effectively driving installs at any given time, as this is the content that you, the app owner, should be promoting in marketing and growth efforts. Provide potential users with a preview of the very best of what's inside your app, rather than a high-level, generic description of your app.

## What types of links work with Content Analytics?

Any Branch link that deep links to content will be included in for Content Analytics. This covers, but is not limited to, content sharing links, invite/referral links, mobile web smart banner links, and marketing links.

To be clear, the key takeaway is that Content Analytics provides data and insights from _links that deep link to content._

## How does Branch identify my content?

First, it's possible right now for developers to identify a piece of content themselves using BranchUniversalObject, which is supported in our most up-to-date SDKs and is documented for **[iOS here](https://dev.branch.io/recipes/content_sharing/ios/#creating-links-programmatically-to-share-content)** and for **[Android here](https://dev.branch.io/recipes/content_sharing/android/#creating-links-programmatically-to-share-content)**. We encourage our partners to use BranchUniversalObject because it provides maximum accuracy for content classification because you, the developer, tell Branch exactly what constitutes a piece of content.

But Content Analytics doesn't require that you use BranchUniversalObject. Branch will automatically parse your links, looking for parameters that deep link to content, and we will populate Content Analytics using this data. By default, Branch will scan for content in the following link parameters, in this order:

1) $deeplink_path

2) $desktop_url

3) $\_og_override/$\__og_override

4) $og_title+$og_description+$og_image_url

To summarize: if you're not seeing Content Analytics data in the dashboard, we recommend that you use BranchUniversalObject _or_ pass your content through one of the four parameters listed above.

## How frequently does Content Analytics data update in the dashboard?

Content Analytics data (views, clicks, installs, opens) for existing content that's already visible in the dashboard will update **_once per hour_**.

In addition, Branch will parse for new top content and add it to the dashboard **_once per hour_** as well.
