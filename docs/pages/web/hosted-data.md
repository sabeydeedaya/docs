## Why

- Make it easier for your marketers to create deep links whenever they create [Journeys](/web/journeys/), [Universal Emails](/emails/braze/), [Quick links](/dashboard/analytics/#quick-links), or use the [Chrome Extension](https://chrome.google.com/webstore/detail/branch-link-creator/pekdpppibljpmpbcjelehhnldnfbglgf).

## What

- If you host deep link data in your website source code, Branch can automatically convert a simple web URL into a corresponding Branch link that deep links to relevant content in your mobile app.
- Branch will also parse your Content Analytics data and provide you with more valuable information about which content is driving clicks, installs, opens, and in-app engagement.

## How

- ### Understand your web and app content

    - The first step to successfully putting deep link data on your website is to understand how your deep links correspond to your web URLs. Ask yourself the following questions, and group your content accordingly.

        - Do you have any content on web that doesn’t exist in the app? Examples include: time-sensitive promotions, splash pages, micro-sites.
        - For content that has corresponding app content, what type of pages do you have? Examples include: search result pages, category homepages, product pages.
        - If you’ve already set up deep linking (if you haven’t set up deep linking skip this step): what does your deep linking schema look like? Do you use different keys for different content? Do you have required key/value pairs that aren’t content specific? Examples include: `productPage` or `categoryPage` keys, or `product_view=true`.

- ### Add metatags to your site

    - This will become the key-value pair in your deep link data, for example:

        | Example URL | URL data | Metatags to add to your site
        | --- | --- | ---
        | https://shop.com/shoes/brown-loafers | productId=1234, productView=true | `<meta name="branch:deeplink:productId" content="1234" />`, `<meta name="branch:deeplink:productView" content="true" />`
        | https://shop.com/shoes | categoryId=5678 | `<meta name="branch:deeplink:categoryId" content="5678" />`
        |https://shop.com/your-mother-is-great | No corresponding app content ([open web](/links/integrate/#open-web-instead-of-app)) | `<meta name="branch:deeplink:$web_only" content="true" />`

## Troubleshoot

- ### Facebook App Links Metatags
    - If you have [Facebook App Links metatags](https://developers.facebook.com/docs/applinks) on your site and working with your app, then you can skip these instructions. Branch will automatically fetch App Links tags and add them to your deep link data.

- ### Google Tag Manager
    - Do not use Google Tag Manager (GTM) to insert your content metatags. GTM requires JavaScript to load on the page, and the Branch link data scraper does not support JavaScript execution.
